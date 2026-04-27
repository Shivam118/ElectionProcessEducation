export type PollingLocation = {
  locationName: string;
  line1: string;
  city: string;
  state: string;
  zip: string;
};

export type VoterInfo = {
  election: {
    name: string;
    electionDay: string;
  };
  pollingLocations: PollingLocation[];
};

export type CivicResource = {
  title: string;
  link: string;
  snippet: string;
};

const defaultVoterInfo: VoterInfo = {
  election: {
    name: "US General Election (Sample Data)",
    electionDay: "2026-11-03"
  },
  pollingLocations: [
    {
      locationName: "Downtown Community Center",
      line1: "123 Main St",
      city: "Springfield",
      state: "IL",
      zip: "62701"
    }
  ]
};

const defaultResources: CivicResource[] = [
  {
    title: "Vote.gov: Register to vote",
    link: "https://vote.gov/",
    snippet: "Official U.S. government voter registration guidance by state."
  },
  {
    title: "U.S. Election Assistance Commission",
    link: "https://www.eac.gov/voters",
    snippet: "Federal voting resources, FAQs, and election administration support."
  },
  {
    title: "National Association of Secretaries of State",
    link: "https://www.nass.org/can-I-vote",
    snippet: "Find state election offices and trusted voter information links."
  }
];

const mapPollingLocations = (payload: unknown): PollingLocation[] => {
  const source = payload as { pollingLocations?: Array<Record<string, unknown>> };
  if (!Array.isArray(source.pollingLocations) || source.pollingLocations.length === 0) {
    return defaultVoterInfo.pollingLocations;
  }

  return source.pollingLocations.slice(0, 3).map((entry) => {
    const address = (entry.address as Record<string, string> | undefined) ?? {};

    return {
      locationName: String(address.locationName ?? "Polling Location"),
      line1: String(address.line1 ?? "Address unavailable"),
      city: String(address.city ?? ""),
      state: String(address.state ?? ""),
      zip: String(address.zip ?? "")
    };
  });
};

export const getVoterInfoByAddress = async (address: string): Promise<VoterInfo> => {
  const apiKey = process.env.GOOGLE_CIVIC_API_KEY;
  if (!apiKey) return defaultVoterInfo;

  const params = new URLSearchParams({
    key: apiKey,
    address,
    electionId: "2000"
  });

  const response = await fetch(
    `https://www.googleapis.com/civicinfo/v2/voterinfo?${params.toString()}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json"
      },
      cache: "no-store"
    }
  );

  if (!response.ok) {
    return defaultVoterInfo;
  }

  const payload = (await response.json()) as {
    election?: { name?: string; electionDay?: string };
  };

  return {
    election: {
      name: payload.election?.name ?? defaultVoterInfo.election.name,
      electionDay: payload.election?.electionDay ?? defaultVoterInfo.election.electionDay
    },
    pollingLocations: mapPollingLocations(payload)
  };
};

export const createGoogleMapsEmbedUrl = (location: PollingLocation) => {
  const query = `${location.line1}, ${location.city}, ${location.state} ${location.zip}`;
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
};

export const createGoogleMapsDirectionsUrl = (location: PollingLocation) => {
  const destination = `${location.line1}, ${location.city}, ${location.state} ${location.zip}`;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
};

export const createGoogleCalendarElectionUrl = (election: VoterInfo["election"]) => {
  const startDate = election.electionDay.replaceAll("-", "");
  const end = new Date(`${election.electionDay}T00:00:00Z`);
  end.setUTCDate(end.getUTCDate() + 1);
  const endDate = end.toISOString().slice(0, 10).replaceAll("-", "");
  const text = `${election.name} - Voting Day`;
  const details = "Remember to verify polling location, hours, and required voter identification.";

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(text)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(details)}`;
};

export const getCivicResourcesByQuery = async (query: string): Promise<CivicResource[]> => {
  const apiKey = process.env.GOOGLE_SEARCH_API_KEY;
  const searchEngineId = process.env.GOOGLE_SEARCH_ENGINE_ID;
  if (!apiKey || !searchEngineId) return defaultResources;

  const params = new URLSearchParams({
    key: apiKey,
    cx: searchEngineId,
    q: `${query} voter education election site:.gov OR site:.org`,
    num: "5",
    safe: "active"
  });

  const response = await fetch(`https://www.googleapis.com/customsearch/v1?${params.toString()}`, {
    method: "GET",
    headers: {
      Accept: "application/json"
    },
    cache: "no-store"
  });

  if (!response.ok) {
    return defaultResources;
  }

  const payload = (await response.json()) as {
    items?: Array<{ title?: string; link?: string; snippet?: string }>;
  };

  if (!payload.items?.length) {
    return defaultResources;
  }

  return payload.items
    .filter((item) => item.link?.startsWith("http"))
    .slice(0, 5)
    .map((item) => ({
      title: item.title ?? "Election resource",
      link: item.link ?? "https://vote.gov/",
      snippet: item.snippet ?? "Official voter education resource."
    }));
};
