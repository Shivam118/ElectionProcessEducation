import { faqs } from "@/lib/mock-data";

export function FAQSection() {
  return (
    <section aria-labelledby="faq-heading" className="card">
      <h2 id="faq-heading">Frequently Asked Questions</h2>
      <div className="faq-grid">
        {faqs.map((faq) => (
          <details key={faq.id}>
            <summary>{faq.question}</summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
