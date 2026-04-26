"use client";

import { FormEvent, useMemo, useState } from "react";
import { createGoogleMapsEmbedUrl, PollingLocation, VoterInfo } from "@/lib/google-services";

type Status = "idle" | "loading" | "error";

const initialMessage = "Enter your address to load election day details and polling location guidance.";

export function GoogleServicesPanel() {
  const [address, setAddress] = useState("1600 Pennsylvania Avenue NW, Washington, DC");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState(initialMessage);
  const [voterInfo, setVoterInfo] = useState<VoterInfo | null>(null);

  const mapUrl = useMemo(() => {
    const first: PollingLocation | undefined = voterInfo?.pollingLocations[0];
    return first ? createGoogleMapsEmbedUrl(first) : "";
  }, [voterInfo]);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setStatus("loading");

    const response = await fetch("/api/voter-info", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address })
    });

    if (!response.ok) {
      setStatus("error");
      setMessage("Could not load voter info. Try another address.");
      return;
    }

    const data = (await response.json()) as VoterInfo;
    setVoterInfo(data);
    setMessage(`Loaded election guidance for ${data.election.name}.`);
    setStatus("idle");
  };

  return (
    <section aria-labelledby="google-services-heading" className="card">
      <h2 id="google-services-heading">Google Civic + Maps Services</h2>
      <p>
        Uses Google Civic Information API for voter context and Google Maps for polling-place
        visualization. Falls back to safe mock data when keys are not configured.
      </p>

      <form onSubmit={onSubmit}>
        <label htmlFor="address">Address lookup</label>
        <input
          id="address"
          name="address"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          minLength={5}
          maxLength={200}
          required
        />
        <button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Checking voter info..." : "Find polling guidance"}
        </button>
      </form>

      <div role="status" aria-live="polite" className="assistant-response">
        <p>{message}</p>
      </div>

      {voterInfo && (
        <div className="google-services-grid">
          <article>
            <h3>Election snapshot</h3>
            <p>
              <strong>{voterInfo.election.name}</strong>
            </p>
            <p>Election day: {voterInfo.election.electionDay}</p>
          </article>

          <article>
            <h3>Polling locations</h3>
            <ul>
              {voterInfo.pollingLocations.map((location) => (
                <li key={`${location.locationName}-${location.line1}`}>
                  {location.locationName}: {location.line1}, {location.city}, {location.state}{" "}
                  {location.zip}
                </li>
              ))}
            </ul>
          </article>
        </div>
      )}

      {mapUrl && (
        <iframe
          title="Google Maps polling location"
          src={mapUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="map-frame"
        />
      )}
    </section>
  );
}
