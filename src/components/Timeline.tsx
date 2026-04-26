import { electionTimeline } from "@/lib/mock-data";

export function Timeline() {
  return (
    <section aria-labelledby="timeline-heading" className="card">
      <h2 id="timeline-heading">Election Timeline</h2>
      <ol className="timeline" aria-label="Election timeline with key dates">
        {electionTimeline.map((item) => (
          <li key={item.id} className="timeline-item">
            <p className="date" aria-label={`Date ${item.date}`}>
              {item.date}
            </p>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
