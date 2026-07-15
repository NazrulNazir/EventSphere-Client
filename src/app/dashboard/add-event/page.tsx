"use client";

import { useRef, useState, type FormEvent } from "react";
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
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";
import Image from "next/image";
import { FcRotateCamera } from "react-icons/fc";

function AddEventPage() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];

    if (!image) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await res.json();

      if (data.success) {
        setImageUrl(data.data.url);
        toast.success("Image uploaded successfully");
      }
    } catch (error) {
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const { data } = useSession();
  const user = data?.user;
  // console.log(user);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    if (!category) {
      toast.error("Please select a category");
      return;
    }

    setLoading(true);

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const addEvent = {
      name: data.name,
      image: imageUrl,
      category,
      email: user?.email,
      venue: data.venue,
      date: data.date,
      time: data.time,
      description: data.desc,
      capacity: Number(data.capacity),
      bookings: 0,
      price: Number(data.price),
      createdAt: new Date(),
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addEvent),
      });

      if (!res.ok) {
        throw new Error("Failed to create event");
      }

      const result = await res.json();

      if (result.insertedId) {
        toast.success("Event created successfully!");

        form.reset();
        setName("");
        setCategory("");

        return;
      }

      toast.error("Failed to create event.");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
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
          {/* image upload */}
          <div className="flex justify-center">
            <div className="mb-6 flex flex-col justify-center items-center">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />

              <div className="relative">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="flex h-32 w-32 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-border bg-muted transition-all duration-300 hover:border-primary hover:bg-accent"
                >
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt="Event Image"
                      width={128}
                      height={128}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-muted-foreground"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.118a7.5 7.5 0 0115 0"
                      />
                    </svg>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-1 right-1 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background shadow transition hover:bg-accent"
                >
                  <FcRotateCamera className="text-lg" />
                </button>
              </div>

              <h3 className="mt-4 text-base font-semibold text-foreground">
                Event Image
              </h3>

              <p className="mt-1 text-center text-sm text-muted-foreground">
                Click the image or camera icon to upload
              </p>
            </div>
          </div>

          {/* Event Name */}
          <div className="md:col-span-2">
            <Label htmlFor="name">Event Name</Label>

            <Input
              required
              id="name"
              name="name"
              placeholder="Autumn Design Conference"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1.5"
            />
          </div>

          {/* Date */}
          <div>
            <Label htmlFor="date">Date</Label>

            <Input
              required
              id="date"
              name="date"
              type="date"
              className="mt-1.5"
            />
          </div>

          {/* Time */}
          <div>
            <Label htmlFor="time">Start Time</Label>

            <Input
              required
              id="time"
              name="time"
              type="time"
              className="mt-1.5"
            />
          </div>

          {/* Venue */}
          <div>
            <Label htmlFor="venue">Venue</Label>

            <Input
              required
              id="venue"
              name="venue"
              placeholder="Event Location"
              className="mt-1.5"
            />
          </div>

          {/* Category */}
          <div>
            <Label>Category</Label>

            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="Choose category" />
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

          {/* Capacity */}
          <div>
            <Label htmlFor="capacity">Capacity</Label>

            <Input
              required
              id="capacity"
              name="capacity"
              type="number"
              placeholder="500"
              className="mt-1.5"
            />
          </div>

          {/* Price */}
          <div>
            <Label htmlFor="price">Ticket Price ($)</Label>

            <Input
              required
              id="price"
              name="price"
              type="number"
              placeholder="49"
              className="mt-1.5"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <Label htmlFor="desc">Description</Label>

            <Textarea
              required
              id="desc"
              name="desc"
              rows={5}
              placeholder="Tell attendees what to expect..."
              className="mt-1.5"
            />
          </div>

          {/* Buttons */}
          <div className="md:col-span-2 flex justify-end gap-3">
            <Button type="button" variant="outline">
              Save Draft
            </Button>

            <Button
              type="submit"
              disabled={loading}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Plus className="mr-2 h-4 w-4" />

              {loading ? "Publishing..." : "Publish Event"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default AddEventPage;
