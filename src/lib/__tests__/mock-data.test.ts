import { describe, expect, it } from "vitest";
import { electionSteps, electionTimeline, faqs } from "@/lib/mock-data";

describe("mock election data", () => {
  it("contains timeline entries with dates and descriptions", () => {
    expect(electionTimeline.length).toBeGreaterThanOrEqual(4);
    electionTimeline.forEach((entry) => {
      expect(entry.date.length).toBeGreaterThan(4);
      expect(entry.description.length).toBeGreaterThan(10);
    });
  });

  it("has actionable step links", () => {
    expect(electionSteps.length).toBeGreaterThanOrEqual(4);
    electionSteps.forEach((step) => {
      expect(step.actionLink.startsWith("https://")).toBe(true);
    });
  });

  it("contains at least one FAQ", () => {
    expect(faqs.length).toBeGreaterThan(0);
  });
});
