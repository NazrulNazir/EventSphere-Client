function Trusted() {
  const brands = [
    "Spotify",
    "Live Nation",
    "AEG Presents",
    "Eventbrite",
    "Bandsintown",
    "SeatGeek",
    "StubHub",
    "Dice.fm",
  ];

  return (
    <section className="border-y border-border py-12">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-xs text-muted-foreground font-mono uppercase tracking-widest mb-8">
          Trusted by teams at
        </p>
        <div className="flex gap-10 items-center justify-center flex-wrap">
          {brands.map((brand) => (
            <span
              key={brand}
              className="text-muted-foreground/30 font-display font-bold text-base md:text-lg hover:text-muted-foreground/60 transition-colors cursor-default whitespace-nowrap"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Trusted;