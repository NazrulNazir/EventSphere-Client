"use client";
import { useState, type FormEvent } from "react";
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
import { toast } from "sonner";
import { Plus } from "lucide-react";

function AddEventPage() {
  const [name, setName] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    toast.success("Event created", {
      description: name
        ? `"${name}" was added to your events.`
        : "Draft saved locally.",
    });
    setName("");
  };

  return (
    <div className="w-full min-w-0 p-4 md:p-6">
      <div>
        <h1 className="font-display text-3xl font-semibold">Add Event</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Fill in the details to publish a new event.
        </p>
      </div>

      <Card className="surface-gradient mx-auto mt-6 max-w-3xl border-border/60 p-6">
        <form
          onSubmit={onSubmit}
          className="grid grid-cols-1 gap-5 md:grid-cols-2"
        >
          <div className="md:col-span-2">
            <Label htmlFor="name">Event name</Label>
            <Input
              id="name"
              placeholder="e.g. Autumn Design Conference"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1.5"
            />
          </div>

          <div>
            <Label htmlFor="date">Date</Label>
            <Input id="date" type="date" className="mt-1.5" />
          </div>

          <div>
            <Label htmlFor="time">Start time</Label>
            <Input id="time" type="time" className="mt-1.5" />
          </div>

          <div>
            <Label htmlFor="venue">Venue</Label>
            <Input id="venue" placeholder="Location" className="mt-1.5" />
          </div>

          <div>
            <Label>Category</Label>
            <Select>
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="Choose category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="music">Music</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="sports">Sports</SelectItem>
                <SelectItem value="arts">Arts</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="capacity">Capacity</Label>
            <Input
              id="capacity"
              type="number"
              placeholder="500"
              className="mt-1.5"
            />
          </div>

          <div>
            <Label htmlFor="price">Ticket price ($)</Label>
            <Input
              id="price"
              type="number"
              placeholder="49"
              className="mt-1.5"
            />
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="desc">Description</Label>
            <Textarea
              id="desc"
              placeholder="Tell attendees what to expect…"
              rows={5}
              className="mt-1.5"
            />
          </div>

          <div className="md:col-span-2 flex justify-end gap-2">
            <Button type="button" variant="outline" className="rounded-lg">
              Save draft
            </Button>
            <Button
              type="submit"
              className="rounded-lg bg-primary text-primary-foreground glow-primary hover:bg-primary/90"
            >
              <Plus className="mr-2 h-4 w-4" /> Publish event
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default AddEventPage;
