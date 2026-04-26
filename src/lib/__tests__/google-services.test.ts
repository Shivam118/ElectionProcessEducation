import { createGoogleMapsEmbedUrl } from "@/lib/google-services";
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
});
