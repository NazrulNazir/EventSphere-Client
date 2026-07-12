import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, MapPin, Ticket, Plus } from "lucide-react";

const events = [
  {
    name: "Neon Frequencies Fest",
    date: "Jun 28, 2026",
    venue: "Warehouse 9, Brooklyn",
    category: "Music",
    bookings: 1248,
    capacity: 1500,
    status: "Live",
  },
  {
    name: "Future of Work Summit",
    date: "Jul 3, 2026",
    venue: "Convention Center, SF",
    category: "Business",
    bookings: 842,
    capacity: 1000,
    status: "Completed",
  },
  {
    name: "Urban Marathon Series",
    date: "Jul 8, 2026",
    venue: "Downtown Loop, Chicago",
    category: "Sports",
    bookings: 3120,
    capacity: 3500,
    status: "Live",
  },
  {
    name: "AI & Robotics Expo",
    date: "Jul 18, 2026",
    venue: "Tech Arena, Austin",
    category: "Technology",
    bookings: 1904,
    capacity: 2500,
    status: "Scheduled",
  },
  {
    name: "Coastal Jazz Weekend",
    date: "Jul 24, 2026",
    venue: "Harbor Stage, Miami",
    category: "Music",
    bookings: 612,
    capacity: 1000,
    status: "Scheduled",
  },
];

const statusColor: Record<string, string> = {
  Live: "bg-success/15 text-success",
  Completed: "bg-info/15 text-info",
  Scheduled: "bg-warning/15 text-warning",
};

function MyEventsPage() {
  return (
    <div className="w-full min-w-0 p-4 md:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-semibold">My Events</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Everything you&apos;re hosting. {events.length} total events.
          </p>
        </div>
        <Button className="h-10 rounded-full bg-primary px-5 text-primary-foreground glow-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" /> New Event
        </Button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {events.map((e) => (
          <Card key={e.name} className="surface-gradient border-border/60 p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="truncate font-display text-lg font-semibold">
                  {e.name}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {e.category}
                </p>
              </div>
              <Badge className={`rounded-full ${statusColor[e.status]}`}>
                {e.status}
              </Badge>
            </div>
            <div className="mt-4 space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4" /> {e.date}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> {e.venue}
              </div>
              <div className="flex items-center gap-2">
                <Ticket className="h-4 w-4" />
                <span className="text-foreground">
                  {e.bookings.toLocaleString()}
                </span>
                <span>/ {e.capacity.toLocaleString()} booked</span>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                className="flex-1 rounded-lg"
              >
                View
              </Button>
              <Button variant="outline" size="sm" className="flex-1 rounded-lg">
                Edit
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default MyEventsPage;
