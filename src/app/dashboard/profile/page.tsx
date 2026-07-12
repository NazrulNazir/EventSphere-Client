"use client";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { toast } from "sonner";

function ProfilePage() {
  return (
    <div className="w-full min-w-0 p-4 md:p-6">
      <h1 className="font-display text-3xl font-semibold">Profile</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Your public organizer profile.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="surface-gradient border-border/60 p-6 text-center lg:col-span-1">
          <Avatar className="mx-auto h-24 w-24 ring-4 ring-primary/30">
            <AvatarFallback className="bg-primary/25 text-2xl font-semibold text-foreground">
              AC
            </AvatarFallback>
          </Avatar>
          <h2 className="mt-4 font-display text-xl font-semibold">
            Alexandra Chen
          </h2>
          <p className="text-xs text-muted-foreground">
            Event Organizer · San Francisco
          </p>
          <div className="mt-2 flex items-center justify-center gap-1 text-xs">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-warning text-warning" />
            ))}
            <span className="ml-1 text-muted-foreground">4.9</span>
          </div>
          <div className="mt-5 grid grid-cols-3 divide-x divide-border/60 rounded-xl border border-border/60 bg-card/60 py-3">
            <div className="px-2">
              <p className="font-display text-base font-semibold">134</p>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Events
              </p>
            </div>
            <div className="px-2">
              <p className="font-display text-base font-semibold">8.4k</p>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Bookings
              </p>
            </div>
            <div className="px-2">
              <p className="font-display text-base font-semibold">4.9</p>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Rating
              </p>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <Badge variant="secondary" className="rounded-full">
              Music
            </Badge>
            <Badge variant="secondary" className="rounded-full">
              Tech
            </Badge>
            <Badge variant="secondary" className="rounded-full">
              Business
            </Badge>
          </div>
        </Card>

        <Card className="surface-gradient border-border/60 p-6 lg:col-span-2">
          <h3 className="font-display text-lg font-semibold">Edit profile</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Profile updated");
            }}
            className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2"
          >
            <div>
              <Label htmlFor="fname">First name</Label>
              <Input id="fname" defaultValue="Alexandra" className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="lname">Last name</Label>
              <Input id="lname" defaultValue="Chen" className="mt-1.5" />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                defaultValue="alex@evently.io"
                className="mt-1.5"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="loc">Location</Label>
              <Input
                id="loc"
                defaultValue="San Francisco, CA"
                className="mt-1.5"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                rows={4}
                defaultValue="Organizing memorable events since 2018 — from intimate jazz nights to 3000-person tech summits."
                className="mt-1.5"
              />
            </div>
            <div className="md:col-span-2 flex justify-end">
              <Button
                type="submit"
                className="rounded-lg bg-primary text-primary-foreground glow-primary hover:bg-primary/90"
              >
                Save changes
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default ProfilePage;
