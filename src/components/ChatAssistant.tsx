"use client";

import React from "react";
import { FormEvent, useState } from "react";

type Status = "idle" | "loading" | "error";

export function ChatAssistant() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(
    "Ask a question about deadlines, registration, ID requirements, or voting methods."
  );
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setStatus("loading");

    const response = await fetch("/api/assistant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question })
    });

    if (!response.ok) {
      setStatus("error");
      setAnswer("Unable to fetch response. Please retry.");
      return;
    }

    const data = (await response.json()) as { answer: string };
    setAnswer(data.answer);
    setStatus("idle");
  };

  return (
    <section aria-labelledby="assistant-heading" className="card">
      <h2 id="assistant-heading">Interactive Election Assistant (Gemini)</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="question">Your question</label>
        <textarea
          id="question"
          name="question"
          required
          minLength={4}
          maxLength={1000}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Example: How can I vote by mail in my state?"
        />
        <button type="submit" disabled={status === "loading" || question.length < 4}>
          {status === "loading" ? "Getting answer..." : "Ask assistant"}
        </button>
      </form>

      <div role="status" aria-live="polite" className="assistant-response">
        <p>{answer}</p>
        {status === "error" && (
          <p>
            Tip: set <code>GEMINI_API_KEY</code> to enable Google Gemini AI responses.
          </p>
        )}
      </div>
    </section>
  );
}
