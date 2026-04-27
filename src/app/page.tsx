import { ChatAssistant } from "@/components/ChatAssistant";
import { FAQSection } from "@/components/FAQSection";
import { GoogleIdentityPanel } from "@/components/GoogleIdentityPanel";
import { GoogleServicesPanel } from "@/components/GoogleServicesPanel";
import { StepsChecklist } from "@/components/StepsChecklist";
import { Timeline } from "@/components/Timeline";

export default function HomePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Election Compass",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Any",
    description:
      "Interactive election assistant with timelines, steps, FAQs, and Gemini AI powered question answering."
  };

  return (
    <main id="main-content" className="container">
      <header className="hero">
        <p className="eyebrow">Civic Education Assistant</p>
        <h1>Understand the Election Process with Confidence</h1>
        <p>
          Follow election timelines, complete important voting steps, and ask AI-powered
          questions in plain language.
        </p>
      </header>

      <ChatAssistant />
      <Timeline />
      <StepsChecklist />
      <GoogleServicesPanel />
      <GoogleIdentityPanel />
      <FAQSection />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </main>
  );
}
