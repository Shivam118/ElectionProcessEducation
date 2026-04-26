import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const title = "Election Compass | Understand Registration, Timeline, and Voting Steps";
const description =
  "Election Compass is an interactive assistant that helps users understand election timelines, registration deadlines, and voting steps in an accessible way.";

export const metadata: Metadata = {
  metadataBase: new URL("https://example.org"),
  title,
  description,
  keywords: [
    "election process",
    "voter registration",
    "election timeline",
    "civic education",
    "google gemini",
    "google civic information api",
    "google maps"
  ],
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "Election Compass",
    locale: "en_US"
  },
  twitter: {
    card: "summary_large_image",
    title,
    description
  },
  alternates: {
    canonical: "/"
  },
  robots: {
    index: true,
    follow: true
  }
};

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        {children}
        {gaMeasurementId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${gaMeasurementId}', { anonymize_ip: true });`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
