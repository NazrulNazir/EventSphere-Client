import { BarChart3, Clock, Globe, Headphones, Shield, Zap } from "lucide-react";

function Features() {
  const features = [
    {
      Icon: Zap,
      title: "Instant Ticketing",
      desc: "Real-time seat selection and instant digital ticket delivery. No waiting, no delays.",
    },
    {
      Icon: Shield,
      title: "Buyer Protection",
      desc: "Every ticket is verified and backed by our 100% money-back guarantee.",
    },
    {
      Icon: Globe,
      title: "Global Reach",
      desc: "Discover events in 150+ cities worldwide with localized pricing and language support.",
    },
    {
      Icon: BarChart3,
      title: "Organizer Analytics",
      desc: "Deep insights into sales, demographics, and attendance patterns for your events.",
    },
    {
      Icon: Clock,
      title: "24/7 Support",
      desc: "Our team is always on standby to resolve issues before, during, and after events.",
    },
    {
      Icon: Headphones,
      title: "Artist Tools",
      desc: "Dedicated tools for performers to connect with fans and manage tour logistics.",
    },
  ];

  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border text-xs font-mono text-muted-foreground mb-4">
          PLATFORM FEATURES
        </div>
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-foreground">
          Everything you need to
          <br />
          run great events
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          A complete toolkit for organizers, attendees, and artists — built for scale,
          designed for delight.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden">
        {features.map(({ Icon, title, desc }, i) => (
          <div
            key={i}
            className="bg-card p-8 hover:bg-secondary transition-colors group"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-display font-bold text-lg mb-2 text-foreground">{title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features