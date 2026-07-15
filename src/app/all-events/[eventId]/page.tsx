"use client";

import { getSingleEvent } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Users,
  Ticket,
  Mail,
} from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Event {
  _id: string;
  name: string;
  image: string;
  category: string;
  email: string;
  venue: string;
  date: string;
  time: string;
  description: string;
  capacity: number;
  bookings: number;
  price: number;
}

const DetailsPage = () => {
  const { eventId } = useParams();

  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    const loadEvent = async () => {
      const data = await getSingleEvent(eventId as string);
      setEvent(data);
    };

    if (eventId) {
      loadEvent();
    }
  }, [eventId]);

  if (!event) {
    return (
      <div className="flex h-screen items-center justify-center text-xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <section className="container mx-auto px-5 py-10">
      <div className="grid gap-10 lg:grid-cols-2">

        {/* Image */}
        <div className="flex justify-center items-center">
          <Image
        src={event.image || `https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200`}
            alt={event.name}
            width={700}
            height={700}
            className="h-125 w-full rounded-3xl object-cover"
          />
        </div>

        {/* Content */}
        <div>

          <Badge className="mb-4">
            {event.category}
          </Badge>

          <h1 className="text-4xl font-bold">
            {event.name}
          </h1>

          <p className="mt-4 text-muted-foreground leading-7">
            {event.description}
          </p>

          <div className="mt-8 grid gap-5">

            <Card className="flex items-center gap-4 p-4">
              <CalendarDays className="text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p>{event.date}</p>
              </div>
            </Card>

            <Card className="flex items-center gap-4 p-4">
              <Clock3 className="text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Time</p>
                <p>{event.time}</p>
              </div>
            </Card>

            <Card className="flex items-center gap-4 p-4">
              <MapPin className="text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Venue</p>
                <p>{event.venue}</p>
              </div>
            </Card>

            <Card className="flex items-center gap-4 p-4">
              <Ticket className="text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">
                  Ticket Price
                </p>
                <p>${event.price}</p>
              </div>
            </Card>

            <Card className="flex items-center gap-4 p-4">
              <Users className="text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">
                  Capacity
                </p>
                <p>
                  {event.bookings} / {event.capacity} Booked
                </p>
              </div>
            </Card>

            <Card className="flex items-center gap-4 p-4">
              <Mail className="text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">
                  Organizer
                </p>
                <p>{event.email}</p>
              </div>
            </Card>

          </div>

          <Button className="mt-8 h-12 w-full text-lg">
            Book Ticket
          </Button>

        </div>
      </div>
    </section>
  );
};

export default DetailsPage;