"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

type GoogleCredentialResponse = {
  credential?: string;
};

type GoogleAccounts = {
  id: {
    initialize: (options: {
      client_id: string;
      callback: (response: GoogleCredentialResponse) => void;
      ux_mode?: "popup" | "redirect";
    }) => void;
    renderButton: (
      parent: HTMLElement,
      options: { theme?: "outline" | "filled_blue"; size?: "large" | "medium"; text?: string }
    ) => void;
    prompt: () => void;
  };
};

declare global {
  interface Window {
    google?: {
      accounts: GoogleAccounts;
    };
  }
}

const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

export function GoogleIdentityPanel() {
  const buttonContainerRef = useRef<HTMLDivElement | null>(null);
  const [message, setMessage] = useState(
    "Use Google Identity Services to sign in quickly and personalize civic reminders."
  );

  useEffect(() => {
    if (!clientId || !window.google?.accounts.id || !buttonContainerRef.current) {
      return;
    }

    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: (response: GoogleCredentialResponse) => {
        if (response.credential) {
          setMessage("Google sign-in token received. Connect this token to your backend session flow.");
        } else {
          setMessage("Google sign-in did not return a credential. Please retry.");
        }
      },
      ux_mode: "popup"
    });

    buttonContainerRef.current.innerHTML = "";
    window.google.accounts.id.renderButton(buttonContainerRef.current, {
      theme: "outline",
      size: "large",
      text: "signin_with"
    });
    window.google.accounts.id.prompt();
  }, []);

  return (
    <section aria-labelledby="google-identity-heading" className="card">
      <h2 id="google-identity-heading">Google Identity Services</h2>
      <p>
        Optional sign-in integration for saved preferences, reminder subscriptions, and personalized
        voting education experiences.
      </p>

      {!clientId && (
        <p>
          Add <code>NEXT_PUBLIC_GOOGLE_CLIENT_ID</code> to enable the real Google sign-in button.
        </p>
      )}

      <div ref={buttonContainerRef} aria-label="Google Sign-In button container" />

      <div role="status" aria-live="polite" className="assistant-response">
        <p>{message}</p>
      </div>

      <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" />
    </section>
  );
}
