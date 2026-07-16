"use client";

import Link from "next/link";
import { Bell, Search, Moon, Sun, User, Settings, LogOut } from "lucide-react";
import { FaRegUserCircle } from "react-icons/fa";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "./theme-provider";
import { signOut, useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { RiHomeGearLine } from "react-icons/ri";
// import { useTheme } from "@/components/theme-provider";

export function TopNavbar() {
  const { theme, toggleTheme } = useTheme();
  const { data } = useSession();
  const router = useRouter();
  // const handleLogout = () => {};
  const user = data?.user;
  const name = user?.name;
  const email = user?.email;
  const image = user?.image;

  return (
    <header className="sticky top-0 z-30 flex justify-between h-16 w-full min-w-0 items-center gap-3 border-b border-border/60 bg-background/80 px-4 backdrop-blur-xl md:px-6">
      <SidebarTrigger className="text-muted-foreground hover:text-foreground" />

      <div className="relative ml-2 hidden max-w-md flex-1 min-w-0 sm:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          placeholder="Search events, bookings, attendees..."
          className="h-10 rounded-full border-border/60 bg-card/70 pl-10 text-sm placeholder:text-muted-foreground/70 focus-visible:ring-primary/40"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="h-10 w-10 rounded-full text-muted-foreground hover:text-foreground"
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </Button>
        <span className="hidden sm:inline text-sm font-medium text-muted-foreground">
          {theme === "dark" ? "Dark" : "Light"}
        </span>

        <Button
          variant="ghost"
          size="icon"
          className="relative h-10 w-10 rounded-full text-muted-foreground hover:text-foreground"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary ring-2 ring-background" />
        </Button>

        <div>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  aria-label="Open profile menu"
                  className="flex items-center gap-2 rounded-full p-0.5 outline-none ring-primary/40 focus-visible:ring-2"
                >
                  <Avatar className="h-10 w-10 ring-2 ring-primary/40">
                    <AvatarImage src={image || ""} alt={name || "User"} />

                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                      {name
                        ?.split(" ")
                        .map((word) => word[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">{name}</span>
                    <span className="text-xs font-normal text-muted-foreground">
                      {email}
                    </span>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <Link
                    href="/"
                    className="flex items-center gap-2"
                  >
                    <RiHomeGearLine className="h-4 w-4" />
                    Home
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link
                    href="/dashboard/profile"
                    className="flex items-center gap-2"
                  >
                    <User className="h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link
                    href="/dashboard/settings"
                    className="flex items-center gap-2"
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={async () => {
                    await signOut();

                    toast.success("Logout successfully.");

                    router.push("/");
                    router.refresh();
                  }}
                  className="text-destructive focus:text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-primary-foreground hover:bg-primary/90"
            >
              <FaRegUserCircle className="h-5 w-5" />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
