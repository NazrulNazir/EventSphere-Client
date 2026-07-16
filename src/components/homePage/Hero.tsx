'use client'
import { Check, Search } from "lucide-react";
import { useState } from "react";

// import { TopNavbar } from "@/components/top-navbar";
function Hero() {
  const [search, setSearch] = useState("");

  return (
    <section className="relative min-h-screen flex items-center sm:pt-16 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(124,58,237,0.18),transparent)]" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center w-full">
        {/* Left */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-mono mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            10,000+ Events Listed This Month
          </div>

          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6 text-foreground">
            Discover &amp;<br />
            Book{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Extraordinary
            </span>
            <br />
            Events
          </h1>

          <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-md">
            From intimate workshops to sold-out concerts — find, create, and manage events
            that leave people talking.
          </p>

          <div className="flex flex-col sm:flex-row gap-2 bg-card border border-border rounded-xl p-2 mb-10 max-w-lg">
            <div className="flex items-center gap-2 flex-1 px-3">
              <Search className="w-4 h-4 text-muted-foreground shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search events, artists, venues..."
                className="bg-transparent text-sm outline-none flex-1 placeholder:text-muted-foreground text-foreground"
              />
            </div>
            <button className="px-5 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap">
              Search Events
            </button>
          </div>

          <div className="flex gap-10">
            {[
              { value: "500K+", label: "Attendees" },
              { value: "10K+", label: "Events" },
              { value: "150+", label: "Cities" },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-display font-bold text-2xl text-foreground">{s.value}</div>
                <div className="text-xs text-muted-foreground font-mono mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: floating event cards */}
        <div className="relative hidden md:flex items-center justify-center h-[540px]">
          {/* Main card */}
          <div className="absolute top-4 right-0 w-72 bg-card border border-border rounded-2xl overflow-hidden shadow-2xl shadow-primary/10">
            <div className="h-44 bg-muted relative">
              <img
                src="https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=400&h=220&fit=crop&auto=format"
                alt="Live concert with colorful stage lights"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3">
                <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-mono rounded-md">
                  MUSIC
                </span>
              </div>
            </div>
            <div className="p-5">
              <div className="text-xs text-muted-foreground font-mono mb-1.5">
                SAT, AUG 23 · BERLIN
              </div>
              <div className="font-display font-bold text-base mb-3">
                Neon Nights Festival 2025
              </div>
              <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                  {["from-violet-500 to-purple-700", "from-cyan-400 to-blue-600", "from-pink-400 to-rose-600"].map(
                    (grad, i) => (
                      <div
                        key={i}
                        className={`w-6 h-6 rounded-full bg-gradient-to-br ${grad} border-2 border-card`}
                      />
                    )
                  )}
                  <div className="w-6 h-6 rounded-full bg-muted border-2 border-card flex items-center justify-center text-[9px] text-muted-foreground">
                    +8k
                  </div>
                </div>
                <span className="font-bold text-primary">€49</span>
              </div>
            </div>
          </div>

          {/* Secondary card */}
          <div className="absolute bottom-8 left-0 w-60 bg-card border border-border rounded-2xl overflow-hidden shadow-2xl shadow-black/40">
            <div className="h-32 bg-muted relative">
              <img
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=320&h=160&fit=crop&auto=format"
                alt="Technology conference on stage"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3">
                <span className="px-2 py-1 bg-accent/90 text-accent-foreground text-xs font-mono rounded-md">
                  TECH
                </span>
              </div>
            </div>
            <div className="p-4">
              <div className="text-xs text-muted-foreground font-mono mb-1">
                TUE, SEP 9 · AMSTERDAM
              </div>
              <div className="font-display font-semibold text-sm mb-1">DevSummit 2025</div>
              <div className="text-xs text-muted-foreground">2,400 attending</div>
            </div>
          </div>

          {/* Floating confirmation badge */}
          <div className="absolute top-1/2 left-1/2 -translate-x-8 -translate-y-1/2 bg-card border border-border rounded-xl px-4 py-3 shadow-xl flex items-center gap-3 whitespace-nowrap">
            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
              <Check className="w-4 h-4 text-green-400" />
            </div>
            <div>
              <div className="text-xs font-bold text-foreground">Ticket Confirmed!</div>
              <div className="text-[10px] text-muted-foreground font-mono">
                Order #EVX-88291
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;