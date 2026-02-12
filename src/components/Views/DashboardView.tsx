export function DashboardView({ counts }: { counts: Record<string, number> }) {
  return (
    <section className="grid metrics">
      {Object.entries(counts).map(([label, value]) => (
        <article key={label} className="metric">
          <p>{label}</p>
          <h3>{value}</h3>
        </article>
      ))}
    </section>
  );
}
