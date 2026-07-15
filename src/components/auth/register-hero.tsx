import { CalendarDays, Ticket, Sparkles, Users } from "lucide-react";

export function RegisterHero() {
  return (
    <div className="relative hidden overflow-hidden bg-gradient-to-br from-primary via-violet-700 to-indigo-950 lg:flex">
      {/* Background Blur */}
      <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-pink-500/20 blur-3xl" />

      <div className="relative flex h-full w-full flex-col justify-between px-12 py-10 text-white">
        {/* Top */}
        <div>
          <div className="flex items-center gap-3 justicy-center">
            <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
              <Sparkles className="h-7 w-7" />
            </div>

            <div className="font-display text-4xl font-bold flex flex-col items-center">
             <h2> Welcome to</h2>
              <h2>EventSphere</h2>
            </div>
          </div>

          <p className="mt-5 max-w-md text-base leading-5 text-white/80">
            Build, manage and grow your events with a modern event management
            platform designed for organizers.
          </p>
        </div>

        {/* Middle */}
        <div className="space-y-4">
          <FeatureCard
            icon={<CalendarDays className="h-8 w-8 text-cyan-300" />}
            title="Create Unlimited Events"
            description="Organize conferences, concerts, workshops and more."
          />

          <FeatureCard
            icon={<Ticket className="h-8 w-8 text-yellow-300" />}
            title="Ticket Management"
            description="Sell tickets and monitor bookings in real time."
          />

          <FeatureCard
            icon={<Users className="h-8 w-8 text-green-300" />}
            title="Audience Analytics"
            description="Track attendees, revenue and event performance."
          />
        </div>

        {/* Bottom */}
        <p className="text-sm text-white/60">
          © 2026 EventSphere. All rights reserved.
        </p>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
          {icon}
        </div>

        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="mt-1 text-sm text-white/70">{description}</p>
        </div>
      </div>
    </div>
  );
}
