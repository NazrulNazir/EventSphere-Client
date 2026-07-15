import { Star } from "lucide-react";

function Testimonials() {
  const testimonials = [
    {
      quote:
        "Eventix transformed how we run our annual tech conference. Ticket sales were seamless, and the analytics gave us insights we'd never had before.",
      name: "Sarah Chen",
      role: "Head of Events, NovaTech",
      initials: "SC",
      grad: "from-violet-500 to-purple-700",
      rating: 5,
    },
    {
      quote:
        "Found three incredible events in my city I had no idea about. Bought tickets in under two minutes. The experience is genuinely delightful.",
      name: "Marcus Okonkwo",
      role: "Music Enthusiast, Berlin",
      initials: "MO",
      grad: "from-cyan-400 to-blue-600",
      rating: 5,
    },
    {
      quote:
        "As an independent artist, having a platform that promotes you to a relevant audience — not just dumps you in a sea of listings — is everything.",
      name: "Lena Vossler",
      role: "Electronic Artist & Producer",
      initials: "LV",
      grad: "from-pink-400 to-rose-600",
      rating: 5,
    },
  ];

  return (
    <section className="py-24 bg-secondary/20 border-y border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border text-xs font-mono text-muted-foreground mb-4">
            TESTIMONIALS
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            Loved by organizers,
            <br />
            artists &amp; fans
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-2xl p-8 flex flex-col gap-5"
            >
              <div className="flex gap-1">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-foreground/80 leading-relaxed text-sm flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div
                  className={`w-10 h-10 rounded-full bg-linear-to-br ${t.grad} flex items-center justify-center text-white text-xs font-bold shrink-0`}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="font-display font-semibold text-sm text-foreground">
                    {t.name}
                  </div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default Testimonials;