import type { Metadata } from "next";
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
    "google gemini"
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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
