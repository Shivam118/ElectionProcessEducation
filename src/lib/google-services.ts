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
