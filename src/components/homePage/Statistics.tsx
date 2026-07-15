function Statistics() {
  const stats = [
    { value: "500K+", label: "Happy Attendees", sub: "across all events" },
    { value: "10K+", label: "Events Hosted", sub: "every month globally" },
    { value: "98%", label: "Satisfaction Rate", sub: "from post-event surveys" },
    { value: "150+", label: "Cities Covered", sub: "and growing worldwide" },
  ];

  return (
    <section className="py-24 bg-primary/5 border-y border-border">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="font-display text-5xl md:text-6xl font-bold text-primary mb-2">
              {s.value}
            </div>
            <div className="font-semibold text-foreground mb-1">{s.label}</div>
            <div className="text-xs text-muted-foreground font-mono">{s.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Statistics;