import React from "react";
import { act } from "react";
import { createRoot, Root } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ChatAssistant } from "@/components/ChatAssistant";

let container: HTMLDivElement;
let root: Root;

afterEach(() => {
  act(() => {
    root.unmount();
  });
  vi.unstubAllGlobals();
});

describe("ChatAssistant", () => {
  it("keeps submit disabled for short input", async () => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);

    await act(async () => {
      root.render(<ChatAssistant />);
    });

    const button = container.querySelector('button[type="submit"]') as HTMLButtonElement;
    const textarea = container.querySelector("textarea") as HTMLTextAreaElement;

    expect(button.disabled).toBe(true);

    await act(async () => {
      textarea.value = "How";
      textarea.dispatchEvent(new Event("input", { bubbles: true }));
      textarea.dispatchEvent(new Event("change", { bubbles: true }));
    });

    expect(button.disabled).toBe(true);
  });

  it("renders API response", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ answer: "You can vote early in many states." })
      })
    );

    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);

    await act(async () => {
      root.render(<ChatAssistant />);
    });

    const textarea = container.querySelector("textarea") as HTMLTextAreaElement;
    const form = container.querySelector("form") as HTMLFormElement;

    await act(async () => {
      textarea.value = "How do I vote early?";
      textarea.dispatchEvent(new Event("input", { bubbles: true }));
    });

    await act(async () => {
      form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    });

    expect(container.textContent).toContain("vote early");
  });
});
