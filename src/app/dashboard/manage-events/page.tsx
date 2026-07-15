"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Search, Pencil, Trash2 } from "lucide-react";

import { useSession } from "@/lib/auth-client";
import { getEvent } from "@/lib/api";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Event {
  _id: string;
  name: string;
  category: string;
  venue: string;
  date: string;
  time: string;
  description: string;
  capacity: number;
  bookings: number;
  price: number;
  email: string;
}

const statusColor: Record<string, string> = {
  Live: "bg-green-500/15 text-green-600",
  Scheduled: "bg-yellow-500/15 text-yellow-600",
  Completed: "bg-blue-500/15 text-blue-600",
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

export default function ManageEventsPage() {
  const { data } = useSession();

  const email = data?.user?.email;

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    if (!email) return;

    const loadEvents = async () => {
      try {
        const result = await getEvent(email);

        setEvents(result);
      } catch (err) {
        console.log(err);
        toast.error("Failed to load events");
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [email]);

  const filteredEvents = useMemo(() => {
    return events.filter((event) =>
      event.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [events, search]);

  const pendingEvent = events.find((e) => e._id === deleteId);
  return (
    <div className="w-full min-w-0 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-semibold">Manage Events</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Edit or delete your created events.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 rounded-full pl-10"
          />
        </div>
      </div>

      <Card className="surface-gradient mt-6 border-border/60 p-4">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event</TableHead>

                <TableHead>Date</TableHead>

                <TableHead>Category</TableHead>

                <TableHead className="text-right">Bookings</TableHead>

                <TableHead>Status</TableHead>

                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-10 text-center">
                    Loading events...
                  </TableCell>
                </TableRow>
              ) : filteredEvents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-10 text-center">
                    No events found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredEvents.map((event) => {
                  const status = getStatus(event.date);

                  return (
                    <TableRow key={event._id} className="hover:bg-muted/30">
                      <TableCell className="font-medium">
                        {event.name}
                      </TableCell>

                      <TableCell>{event.date}</TableCell>

                      <TableCell>{event.category}</TableCell>

                      <TableCell className="text-right">
                        {(event.bookings ?? 0).toLocaleString()}
                      </TableCell>

                      <TableCell>
                        <Badge
                          className={`rounded-full ${statusColor[status]}`}
                        >
                          {status}
                        </Badge>
                      </TableCell>

                      <TableCell className="text-right">
                        <div className="inline-flex gap-1">
                          {/* <Button
                            size="icon"
                            variant="ghost"
                            onClick={() =>
                              toast.info("Edit feature coming soon")
                            }
                          >
                            <Pencil className="h-4 w-4" />
                          </Button> */}

                          <Button
                            size="icon"
                            variant="ghost"
                            className="text-red-500 hover:text-red-600"
                            onClick={() => setDeleteId(event._id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
      <AlertDialog
        open={!!deleteId}
        onOpenChange={(open) => {
          if (!open) setDeleteId(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Event?</AlertDialogTitle>

            <AlertDialogDescription>
              {pendingEvent
                ? `Are you sure you want to delete "${pendingEvent.name}"?`
                : "This action cannot be undone."}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={async () => {
                if (!deleteId) return;

                try {
                  const res = await fetch(
                    `http://localhost:5000/dashboard/events/${deleteId}`,
                    {
                      method: "DELETE",
                    },
                  );

                  const result = await res.json();

                  if (result.deletedCount) {
                    setEvents((prev) => prev.filter((e) => e._id !== deleteId));

                    toast.success("Event deleted successfully");
                  } else {
                    toast.error("Delete failed");
                  }
                } catch (error) {
                  console.log(error);
                  toast.error("Something went wrong");
                } finally {
                  setDeleteId(null);
                }
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
