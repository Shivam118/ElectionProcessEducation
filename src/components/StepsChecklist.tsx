"use client";

import { electionSteps } from "@/lib/mock-data";
import { useId, useState } from "react";

export function StepsChecklist() {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const groupId = useId();

  return (
    <section aria-labelledby="steps-heading" className="card">
      <h2 id="steps-heading">Step-by-Step Voting Guide</h2>
      <ul className="steps" role="list">
        {electionSteps.map((step) => {
          const inputId = `${groupId}-${step.id}`;
          return (
            <li key={step.id} className="step-item">
              <div>
                <input
                  id={inputId}
                  type="checkbox"
                  checked={Boolean(completed[step.id])}
                  onChange={() =>
                    setCompleted((prev) => ({
                      ...prev,
                      [step.id]: !prev[step.id]
                    }))
                  }
                />
                <label htmlFor={inputId}>{step.title}</label>
              </div>
              <p>{step.description}</p>
              <a
                href={step.actionLink}
                target="_blank"
                rel="noreferrer"
                aria-label={`Read more about ${step.title}`}
              >
                Learn more
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
