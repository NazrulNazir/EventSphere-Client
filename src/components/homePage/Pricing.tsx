'use client'
import { Check } from "lucide-react";
import { useState } from "react";

function Pricing() {
  const [yearly, setYearly] = useState(false);

  const plans = [
    {
      name: "Attendee",
      desc: "Perfect for individual event-goers",
      monthly: 0,
      yearly: 0,
      features: [
        "Browse all events",
        "Digital tickets",
        "Basic calendar sync",
        "Email support",
      ],
      cta: "Get started free",
      highlight: false,
    },
    {
      name: "Organizer",
      desc: "For teams running professional events",
      monthly: 49,
      yearly: 39,
      features: [
        "Unlimited event listings",
        "Advanced analytics",
        "Custom branded pages",
        "Priority support",
        "Bulk ticket management",
        "Embedded widgets",
      ],
      cta: "Start 14-day trial",
      highlight: true,
    },
    {
      name: "Enterprise",
      desc: "For large-scale productions",
      monthly: 199,
      yearly: 159,
      features: [
        "Everything in Organizer",
        "Dedicated account manager",
        "Custom integrations",
        "SLA guarantee",
        "White-label solution",
        "Multi-team access",
      ],
      cta: "Contact sales",
      highlight: false,
    },
  ];

  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border text-xs font-mono text-muted-foreground mb-4">
          PRICING
        </div>
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-3 text-foreground">
          Simple, honest pricing
        </h2>
        <p className="text-muted-foreground mb-8">No hidden fees. Cancel anytime.</p>

        <div className="inline-flex items-center gap-1 bg-card border border-border rounded-full p-1">
          <button
            onClick={() => setYearly(false)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              !yearly
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setYearly(true)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-1.5 ${
              yearly
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Yearly
            <span className="text-xs text-green-400 font-mono">-20%</span>
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((p, i) => (
          <div
            key={i}
            className={`relative rounded-2xl p-8 flex flex-col gap-6 ${
              p.highlight
                ? "bg-primary border-2 border-primary text-primary-foreground"
                : "bg-card border border-border"
            }`}
          >
            {p.highlight && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-accent-foreground text-xs font-mono font-bold rounded-full whitespace-nowrap">
                MOST POPULAR
              </div>
            )}

            <div>
              <div
                className={`text-xs font-mono mb-2 ${
                  p.highlight ? "text-primary-foreground/60" : "text-muted-foreground"
                }`}
              >
                {p.name.toUpperCase()}
              </div>
              <div className="font-display font-bold text-4xl mb-1">
                {p.monthly === 0 ? "Free" : `$${yearly ? p.yearly : p.monthly}`}
                {p.monthly > 0 && (
                  <span
                    className={`text-base font-normal ml-1 ${
                      p.highlight ? "text-primary-foreground/60" : "text-muted-foreground"
                    }`}
                  >
                    /mo
                  </span>
                )}
              </div>
              <div
                className={`text-sm ${
                  p.highlight ? "text-primary-foreground/70" : "text-muted-foreground"
                }`}
              >
                {p.desc}
              </div>
            </div>

            <ul className="space-y-3 flex-1">
              {p.features.map((f, j) => (
                <li key={j} className="flex items-center gap-2.5 text-sm">
                  <Check
                    className={`w-4 h-4 shrink-0 ${
                      p.highlight ? "text-primary-foreground" : "text-primary"
                    }`}
                  />
                  {f}
                </li>
              ))}
            </ul>

            <button
              className={`w-full py-3 rounded-xl text-sm font-medium transition-opacity hover:opacity-90 ${
                p.highlight
                  ? "bg-primary-foreground text-primary"
                  : "bg-primary text-primary-foreground"
              }`}
            >
              {p.cta}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
export default Pricing;