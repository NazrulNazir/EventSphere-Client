'use client'
import { Check, Mail } from "lucide-react";
import { useState } from "react";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  return (
    <section className="py-24 relative overflow-hidden border-t border-border">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_50%,rgba(124,58,237,0.12),transparent)]" />
      <div className="relative max-w-2xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border text-xs font-mono text-muted-foreground mb-6">
          NEWSLETTER
        </div>
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-foreground">
          Never miss an event
        </h2>
        <p className="text-muted-foreground mb-10">
          Weekly picks, early-bird drops, and exclusive discounts — straight to your inbox.
        </p>

        {submitted ? (
          <div className="flex items-center justify-center gap-3 py-4">
            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
              <Check className="w-4 h-4 text-green-400" />
            </div>
            <span className="font-display font-semibold text-foreground">
              {"You're in! Check your inbox."}
            </span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
          >
            <div className="flex items-center gap-2 flex-1 bg-card border border-border rounded-xl px-4">
              <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="bg-transparent py-3 text-sm outline-none flex-1 placeholder:text-muted-foreground text-foreground"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-primary text-primary-foreground text-sm font-medium rounded-xl hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        )}
        <p className="text-xs text-muted-foreground mt-4 font-mono">
          No spam, ever. Unsubscribe with one click.
        </p>
      </div>
    </section>
  );
}
export default Newsletter;