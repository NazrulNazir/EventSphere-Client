'use client'

import { ChevronDown } from "lucide-react";
import { useState } from "react";

function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const faqs = [
    {
      q: "How do I get my tickets after purchase?",
      a: "Tickets are delivered instantly to your email and stored in your Eventix account. Access them anytime via the app or web — no printing needed.",
    },
    {
      q: "What is your refund policy?",
      a: "We offer a 48-hour cancellation window for most events. Refund eligibility depends on the organizer's policy, which is always displayed clearly before checkout.",
    },
    {
      q: "Can I sell tickets on behalf of an organizer?",
      a: "Yes. Our Organizer plan lets you manage and sell tickets for unlimited events, with full control over pricing, seating maps, and promotional campaigns.",
    },
    {
      q: "Are tickets protected against fraud?",
      a: "Every ticket is blockchain-verified and linked to your account. Our system detects duplicate scans and invalid entries in real time at venue gates.",
    },
    {
      q: "Do you support international events?",
      a: "Absolutely. Eventix supports 40+ currencies, multi-language event pages, and localized tax handling for events in 150+ countries worldwide.",
    },
    {
      q: "How do organizers receive payouts?",
      a: "Payouts are processed 2 business days after your event ends, via bank transfer or Stripe Connect. There are no hidden deductions beyond the agreed service fee.",
    },
  ];

  return (
    <section className="py-24 bg-secondary/20 border-t border-border">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border text-xs font-mono text-muted-foreground mb-4">
            FAQ
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            Common questions
          </h2>
        </div>

        <div className="space-y-2">
          {faqs.map((f, i) => (
            <div key={i} className="border border-border rounded-xl overflow-hidden">
              <button
                className="w-full flex items-center justify-between p-5 text-left hover:bg-card transition-colors"
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
              >
                <span className="font-display font-semibold text-foreground pr-4">{f.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200 ${
                    openIdx === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIdx === i && (
                <div className="px-5 pb-5 text-muted-foreground text-sm leading-relaxed">
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default FAQ;