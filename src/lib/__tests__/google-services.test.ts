import {
  createGoogleCalendarElectionUrl,
  createGoogleMapsDirectionsUrl,
  createGoogleMapsEmbedUrl
} from "@/lib/google-services";
import { describe, expect, it } from "vitest";

describe("google services helpers", () => {
  it("builds an embeddable google maps url", () => {
    const url = createGoogleMapsEmbedUrl({
      locationName: "City Hall",
      line1: "100 State St",
      city: "Boston",
      state: "MA",
      zip: "02108"
    });

    expect(url).toContain("google.com/maps");
    expect(url).toContain(encodeURIComponent("100 State St, Boston, MA 02108"));
  });

  it("builds a google maps directions url", () => {
    const url = createGoogleMapsDirectionsUrl({
      locationName: "City Hall",
      line1: "100 State St",
      city: "Boston",
      state: "MA",
      zip: "02108"
    });

    expect(url).toContain("google.com/maps/dir/");
    expect(url).toContain(encodeURIComponent("100 State St, Boston, MA 02108"));
  });

  it("builds a google calendar url for election day", () => {
    const url = createGoogleCalendarElectionUrl({
      name: "General Election",
      electionDay: "2026-11-03"
    });

    expect(url).toContain("calendar.google.com/calendar/render");
    expect(url).toContain("20261103/20261104");
  });
});
