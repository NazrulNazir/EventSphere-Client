import { Award, Heart, Shield, TrendingUp } from "lucide-react";

function WhyChoose() {
  const reasons = [
    {
      Icon: Shield,
      title: "Guaranteed Authentic Tickets",
      desc: "Every ticket on Eventix is verified through our blockchain-based authentication system. No fakes, no scams.",
    },
    {
      Icon: TrendingUp,
      title: "Best Price Guarantee",
      desc: "We match or beat any listed price. If you find it cheaper, we'll refund the difference within 24 hours.",
    },
    {
      Icon: Award,
      title: "Curated Selection",
      desc: "Our editorial team handpicks the most exciting events so you discover things you didn't know you needed.",
    },
    {
      Icon: Heart,
      title: "Community First",
      desc: "Built by event lovers, for event lovers. Every feature is driven by community feedback and real use cases.",
    },
  ];

  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-20 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border text-xs font-mono text-muted-foreground mb-6">
            WHY EVENTIX
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-foreground">
            The platform built for real event lovers
          </h2>
          <p className="text-muted-foreground mb-10">
            {"We didn't build another generic ticketing tool. We built a home for culture, community, and unforgettable experiences."}
          </p>

          <div className="space-y-7">
            {reasons.map(({ Icon, title, desc }, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-display font-bold mb-1 text-foreground">{title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative hidden md:block">
          <div className="rounded-3xl overflow-hidden h-[520px] bg-muted">
            <img
              src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=700&h=800&fit=crop&auto=format"
              alt="Crowd enjoying a live outdoor event at night with colorful lights"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent rounded-3xl" />
          </div>
          <div className="absolute bottom-8 left-6 right-6 bg-card/90 backdrop-blur-md border border-border rounded-2xl p-5">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[
                  "from-violet-500 to-purple-700",
                  "from-cyan-400 to-blue-600",
                  "from-pink-400 to-rose-600",
                  "from-amber-400 to-orange-500",
                ].map((g, i) => (
                  <div
                    key={i}
                    className={`w-10 h-10 rounded-full bg-gradient-to-br ${g} border-2 border-card`}
                  />
                ))}
              </div>
              <div>
                <div className="font-display font-bold text-foreground">
                  8,291 people joined this week
                </div>
                <div className="text-xs text-muted-foreground font-mono">
                  ↑ 23% from last week
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default WhyChoose;