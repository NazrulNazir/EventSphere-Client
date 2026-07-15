import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, MapPin, Ticket} from "lucide-react";
// import { headers } from "next/headers";
// import { auth } from "@/lib/auth";
import { getAllEvent } from "@/lib/api";
import Link from "next/link";

interface Event {
  _id: string;
  name: string;
  category: string;
  venue: string;
  date: string;
  time: string;
  description: string;
  capacity: number | string;
  bookings?: number;
  price: number;
  email: string;
}

const statusColor: Record<string, string> = {
  Live: "bg-green-500/15 text-green-600",
  Completed: "bg-blue-500/15 text-blue-600",
  Scheduled: "bg-yellow-500/15 text-yellow-600",
};

const getStatus = (date: string) => {
  const eventDate = new Date(date);
  const today = new Date();

  eventDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  if (eventDate.getTime() === today.getTime()) {
    return "Live";
  }

  if (eventDate > today) {
    return "Scheduled";
  }

  return "Completed";
};

const AllEventsPages = async () => {
  // const session = await auth.api.getSession({
  //   headers: await headers(),
  // });

  // const email = session?.user?.email;

  const events: Event[] = await getAllEvent();

  return (
    <div className="w-full min-w-0 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-semibold">All Events</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Everything you&apos;re hosting. {events.length} total events.
          </p>
        </div>
      </div>

      {/* Empty State */}
      {events.length === 0 ? (
        <Card className="mt-8 flex h-60 items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold">No Events Found</h2>

            <p className="mt-2 text-muted-foreground">
              You haven&apos;t created any event yet.
            </p>
          </div>
        </Card>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {events.map((e) => {
            const status = getStatus(e.date);

            return (
              <Card
                key={e._id}
                className="surface-gradient border-border/60 p-5"
              >
                {/* Top */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="line-clamp-1 font-display text-lg font-semibold">
                      {e.name}
                    </h3>

                    <p className="mt-1 text-xs text-muted-foreground">
                      {e.category}
                    </p>
                  </div>

                  <Badge className={`rounded-full ${statusColor[status]}`}>
                    {status}
                  </Badge>
                </div>

                {/* Body */}
                <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" />
                    {e.date}
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {e.venue}
                  </div>

                  <div className="flex items-center gap-2">
                    <Ticket className="h-4 w-4" />

                    <span className="font-medium text-foreground">
                      {(e.bookings ?? 0).toLocaleString()}
                    </span>

                    <span>/ {Number(e.capacity).toLocaleString()} booked</span>
                  </div>
                  <div className="mt-5 flex gap-2 justify-between">
                    <div></div>
                   <div className="">
                     <Link href={`/all-events/${e._id}`}>
                      <Button variant="secondary" size="sm" className="flex-1">
                        Details
                      </Button>
                    </Link>
                   </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AllEventsPages;
