"use client";

import Link from "next/link";
import {
  Bell,
  Moon,
  Sun,
  User,
  Settings,
  LogOut,
  LucideLayoutDashboard,
  HomeIcon,
} from "lucide-react";
import { RiCalendarEventLine, RiMenu3Line } from "react-icons/ri";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// import { SidebarTrigger } from "@/components/ui/sidebar";
// import { Input } from "@/components/ui/input";
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
import { useTheme } from "../theme-provider";
import { usePathname, useRouter } from "next/navigation";
import { FaRegUserCircle } from "react-icons/fa";
import { signOut, useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";

export function TopNavbar() {
  const { theme, toggleTheme } = useTheme();
  const pathName = usePathname();

  const { data } = useSession();
  const router = useRouter();
  const user = data?.user;
  const name = user?.name;
  const email = user?.email;
  const image = user?.image;

  if (pathName.includes("dashboard")) {
    return null;
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border/60 bg-background/80 px-4 backdrop-blur-xl md:px-6">
      {/* Left */}
      <div className="flex items-center gap-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <RiMenu3Line className="text-2xl" />
            </Button>
          </SheetTrigger>

          

          <SheetContent side="left" className="w-72">
          <div className="text-xl font-bold flex items-start -mt-2 cursor-pointer">Event<span className="text-primary">Sphere</span></div>
            <div className="mt-7 flex flex-col gap-5">
              <Link
                href="/"
                className={`text-lg font-medium hover:bg-secondary hover:text-white px-3 py-1.5 rounded-md ${
                  pathName === "/" ? " bg-secondary" : "text-muted-foreground"
                }`}
              >
                <div className="flex gap-3 items-center"><HomeIcon/> Home</div>
              </Link>

              <Link
                href="/all-events"
                className={`text-lg font-medium hover:bg-secondary hover:text-white px-3 py-1.5 rounded-md ${
                  pathName === "/all-events"
                    ? "bg-secondary"
                    : "text-muted-foreground"
                }`}
              >
                <div className="flex gap-3 items-center"><RiCalendarEventLine/> All Events</div>
              </Link>

              <hr />

              {user ? (
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 text-lg"
                >
                  <LucideLayoutDashboard className="h-5 w-5" />
                  Dashboard
                </Link>
              ) : (
                <Link href="/login" className="flex items-center gap-2 text-lg">
                  <FaRegUserCircle />
                  Login
                </Link>
              )}
            </div>
          </SheetContent>
        </Sheet>

        <Link href="/">
          <h1 className="hidden text-xl font-bold sm:block">
            Event<span className="text-primary">Sphere</span>
          </h1>
        </Link>
      </div>

      {/* Center */}
      <nav className="hidden md:flex items-center gap-8 font-medium">
        <Link
          href="/"
          className={`transition-colors hover:text-primary ${
            pathName === "/" ? "text-primary" : "text-muted-foreground"
          }`}
        >
          Home
        </Link>

        <Link
          href="/all-events"
          className={`transition-colors hover:text-primary ${
            pathName === "/all-events"
              ? "text-primary"
              : "text-muted-foreground"
          }`}
        >
          All Events
        </Link>
      </nav>

      {/* Right */}
      <div className="flex items-center gap-2">
        {/* Theme Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="h-10 w-10 rounded-full"
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </Button>

        {/* Notification */}
        <Button
          variant="ghost"
          size="icon"
          className="relative h-10 w-10 rounded-full"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary ring-2 ring-background" />
        </Button>

        {/* ===== তোমার আগের User/Login Code ===== */}
        <div>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-full p-0.5"
                >
                  <Avatar className="h-10 w-10 ring-2 ring-primary/40">
                    <AvatarImage src={image || ""} alt={name || "User"} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
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
                    <span className="font-semibold">{name}</span>
                    <span className="text-xs text-muted-foreground">
                      {email}
                    </span>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <Link href="/dashboard">
                    <LucideLayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
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
                  className="text-destructive"
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
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
