"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { getSingleEvent } from "@/lib/api";

import toast from "react-hot-toast";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Plus } from "lucide-react";

interface Event {
  _id: string;
  name: string;
  category: string;
  venue: string;
  date: string;
  time: string;
  description: string;
  capacity: number;
  price: number;
  bookings: number;
  email: string;
}

function UpdateEventPage() {
  const router = useRouter();

  const { data } = useSession();
  const user = data?.user;

  const { eventEdit } = useParams();

  const [loading, setLoading] = useState(false);

  const [event, setEvent] = useState<Event | null>(null);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!category) {
    toast.error("Please select a category");
    return;
  }

  setLoading(true);

  const formData = new FormData(e.currentTarget);
  const data = Object.fromEntries(formData.entries());

  const updateEvent = {
    name: data.name,
    category,
    venue: data.venue,
    date: data.date,
    time: data.time,
    description: data.desc,
    capacity: Number(data.capacity),
    price: Number(data.price),
    email: user?.email,
  };

  try {
    const res = await fetch(
      `http://localhost:5000/my-event/${eventEdit}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateEvent),
      }
    );

    const result = await res.json();
    console.log('result', result)

    if (result.modifiedCount > 0) {
      toast.success("Event updated successfully!");

      router.push("/dashboard/my-events");
      router.refresh();
    } else {
      toast("No changes were made.");
    }
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong.");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getSingleEvent(eventEdit as string);

        setEvent(data);

        setName(data.name);
        setCategory(data.category);

        
      } catch (error) {
        console.log(error);
        toast.error("Failed to load event");
      }
    };

    if (eventEdit) {
      fetchEvent();
    }
  }, [eventEdit]);

  if (!event) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        Loading...
      </div>
    );
  }
  return (
    <div className="w-full min-w-0 p-4 md:p-6">
      <div>
        <h1 className="font-display text-3xl font-semibold">Update Event</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Update your event information.
        </p>
      </div>

      <Card className="surface-gradient mx-auto mt-6 max-w-3xl border-border/60 p-6">
        <form
          onSubmit={onSubmit}
          className="grid grid-cols-1 gap-5 md:grid-cols-2"
        >
          {/* Event Name */}
          <div className="md:col-span-2">
            <Label htmlFor="name">Event Name</Label>

            <Input
              id="name"
              name="name"
              required
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1.5"
            />
          </div>

          {/* Venue */}
          <div>
            <Label htmlFor="venue">Venue</Label>

            <Input
              id="venue"
              name="venue"
              required
              defaultValue={event.venue}
              className="mt-1.5"
            />
          </div>

          {/* Category */}
          <div>
            <Label>Category</Label>

            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Music">Music</SelectItem>
                <SelectItem value="Business">Business</SelectItem>
                <SelectItem value="Sports">Sports</SelectItem>
                <SelectItem value="Arts">Arts</SelectItem>
                <SelectItem value="Technology">Technology</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date */}
          <div>
            <Label htmlFor="date">Date</Label>

            <Input
              id="date"
              name="date"
              type="date"
              required
              defaultValue={event.date}
              className="mt-1.5"
            />
          </div>

          {/* Time */}
          <div>
            <Label htmlFor="time">Time</Label>

            <Input
              id="time"
              name="time"
              type="time"
              required
              defaultValue={event.time}
              className="mt-1.5"
            />
          </div>

          {/* Capacity */}
          <div>
            <Label htmlFor="capacity">Capacity</Label>

            <Input
              id="capacity"
              name="capacity"
              type="number"
              required
              defaultValue={event.capacity}
              className="mt-1.5"
            />
          </div>

          {/* Price */}
          <div>
            <Label htmlFor="price">Ticket Price ($)</Label>

            <Input
              id="price"
              name="price"
              type="number"
              required
              defaultValue={event.price}
              className="mt-1.5"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <Label htmlFor="desc">Description</Label>

            <Textarea
              id="desc"
              name="desc"
              rows={5}
              required
              defaultValue={event.description}
              className="mt-1.5"
            />
          </div>

          <div className="md:col-span-2 flex justify-end">
            <Button type="submit" disabled={loading}>
              <Plus className="mr-2 h-4 w-4" />

              {loading ? "Updating..." : "Update Event"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default UpdateEventPage;