import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ChatAssistant } from "@/components/ChatAssistant";

describe("ChatAssistant", () => {
  it("disables submit until valid input length", () => {
    render(<ChatAssistant />);
    const button = screen.getByRole("button", { name: /ask assistant/i });
    expect(button).toBeDisabled();

    fireEvent.change(screen.getByLabelText(/your question/i), {
      target: { value: "How?" }
    });

    expect(button).toBeEnabled();
  });

  it("renders API response", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ answer: "You can vote early in many states." })
      })
    );

    render(<ChatAssistant />);

    fireEvent.change(screen.getByLabelText(/your question/i), {
      target: { value: "How do I vote early?" }
    });

    fireEvent.click(screen.getByRole("button", { name: /ask assistant/i }));

    await waitFor(() => {
      expect(screen.getByText(/vote early/i)).toBeInTheDocument();
    });
  });
});
