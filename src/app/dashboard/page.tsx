"use client";
// import { createFileRoute } from "@tanstack/react-router";
// import { useState } from "react";
import {
  CalendarDays,
  Clock,
  Ticket,
  DollarSign,
  Plus,
  TrendingUp,
  ArrowUpRight,
  Circle,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import Link from "next/link";

// export const Route = createFileRoute("/")({
//   component: DashboardPage,
// });

const analytics = [
  { m: "Jan", revenue: 28000 },
  { m: "Feb", revenue: 34000 },
  { m: "Mar", revenue: 41000 },
  { m: "Apr", revenue: 39000 },
  { m: "May", revenue: 52000 },
  { m: "Jun", revenue: 61000 },
  { m: "Jul", revenue: 58000 },
];

const categories = [
  { name: "Music", value: 32, color: "var(--chart-1)" },
  { name: "Business", value: 24, color: "var(--chart-2)" },
  { name: "Sports", value: 18, color: "var(--chart-3)" },
  { name: "Arts", value: 14, color: "var(--chart-4)" },
  { name: "Technology", value: 12, color: "var(--chart-5)" },
];

const recent = [
  {
    name: "Neon Frequencies Fest",
    date: "Jun 28",
    category: "Music",
    cat: "chart-1",
    bookings: 1248,
    revenue: "$42,110",
    status: "Live",
  },
  {
    name: "Future of Work Summit",
    date: "Jul 3",
    category: "Business",
    cat: "chart-2",
    bookings: 842,
    revenue: "$12,638",
    status: "Completed",
  },
  {
    name: "Urban Marathon Series",
    date: "Jul 8",
    category: "Sports",
    cat: "chart-3",
    bookings: 3120,
    revenue: "$78,400",
    status: "Live",
  },
  {
    name: "Modern Canvas Expo",
    date: "Jul 12",
    category: "Arts",
    cat: "chart-4",
    bookings: 512,
    revenue: "$8,220",
    status: "Scheduled",
  },
  {
    name: "AI & Robotics Expo",
    date: "Jul 18",
    category: "Technology",
    cat: "chart-5",
    bookings: 1904,
    revenue: "$63,600",
    status: "Scheduled",
  },
];

const upcoming = [
  {
    name: "AI & Robotics Expo 2026",
    venue: "Tech Arena, Austin",
    days: "8d",
    progress: 78,
  },
  {
    name: "Coastal Jazz Weekend",
    venue: "Harbor Stage, Miami",
    days: "14d",
    progress: 62,
  },
  {
    name: "Founders Retreat",
    venue: "Lake Tahoe Lodge",
    days: "21d",
    progress: 41,
  },
];

const timeline = [
  {
    t: "12m ago",
    text: "New booking on Neon Frequencies Fest (+4 tickets)",
    color: "chart-1",
  },
  {
    t: "38m ago",
    text: "Ticket tier 'VIP Lounge' sold out for AI & Robotics Expo",
    color: "chart-5",
  },
  {
    t: "2h ago",
    text: "Coastal Jazz Weekend hit 60% of capacity",
    color: "chart-3",
  },
  {
    t: "5h ago",
    text: "Refund issued for Order #48221 — Modern Canvas Expo",
    color: "chart-4",
  },
  {
    t: "Yesterday",
    text: "Urban Marathon Series broke $75K in revenue",
    color: "chart-2",
  },
];

function DashboardPage() {
  const [range, setRange] = useState("revenue");

  return (
    <div className="flex w-full min-w-0 flex-col gap-6 p-4 md:p-6">
      {/* MAIN */}
      <div className="flex min-w-0 flex-1 flex-col gap-6">
        {/* Greeting */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-semibold text-foreground">
              Good morning, Alexandra
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Friday, July 10, 2026 ·{" "}
              <span className="text-foreground">12 active events</span> this
              month
            </p>
          </div>
          <Link href={'/dashboard/add-event'}>
            <Button className="h-10 rounded-full bg-primary px-5 text-primary-foreground glow-primary hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" /> Create Event
          </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Total Events"
            value="134"
            icon={<CalendarDays className="h-4 w-4" />}
            trend="+8.2%"
            trendPositive
            sub="vs last month"
            tint="primary"
          />
          <StatCard
            label="Upcoming Events"
            value="12"
            icon={<Clock className="h-4 w-4" />}
            sub={
              <span>
                This month ·{" "}
                <span className="text-foreground">3 happening this week</span>
              </span>
            }
            tint="warning"
          />
          <StatCard
            label="Total Bookings"
            value="8,427"
            icon={<Ticket className="h-4 w-4" />}
            trend="+14.6%"
            trendPositive
            sub="vs last month"
            tint="success"
          />
          <StatCard
            label="Total Revenue"
            value="$304.8K"
            icon={<DollarSign className="h-4 w-4" />}
            trend="+22.3%"
            trendPositive
            sub="vs last month"
            tint="pink"
          />
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <Card className="surface-gradient col-span-1 border-border/60 p-5 lg:col-span-3">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-lg font-semibold">
                  Monthly Analytics
                </h3>
                <p className="text-xs text-muted-foreground">Jan — Jul 2026</p>
              </div>
              <Tabs value={range} onValueChange={setRange}>
                <TabsList className="h-9 rounded-full bg-muted/60 p-1">
                  <TabsTrigger
                    value="revenue"
                    className="rounded-full px-3 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    Revenue
                  </TabsTrigger>
                  <TabsTrigger
                    value="bookings"
                    className="rounded-full px-3 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    Bookings
                  </TabsTrigger>
                  <TabsTrigger
                    value="events"
                    className="rounded-full px-3 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    Events
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="mt-4 h-[260px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={analytics}
                  margin={{ top: 10, right: 8, left: -12, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="0%"
                        stopColor="var(--primary)"
                        stopOpacity={0.5}
                      />
                      <stop
                        offset="100%"
                        stopColor="var(--primary)"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    stroke="var(--border)"
                    strokeDasharray="4 4"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="m"
                    tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `$${v / 1000}K`}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "var(--popover)",
                      border: "1px solid var(--border)",
                      borderRadius: 12,
                      color: "var(--foreground)",
                      fontSize: 12,
                    }}
                    formatter={
                      ((value: any) => {
                        const amount =
                          typeof value === "number" ? value : Number(value);
                        return Number.isNaN(amount)
                          ? ["", "Revenue"]
                          : [`$${amount.toLocaleString()}`, "Revenue"];
                      }) as any
                    }
                    cursor={{ stroke: "var(--primary)", strokeOpacity: 0.4 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="var(--primary)"
                    strokeWidth={2.5}
                    fill="url(#rev)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="surface-gradient col-span-1 border-border/60 p-5 lg:col-span-2">
            <div>
              <h3 className="font-display text-lg font-semibold">
                Event Categories
              </h3>
              <p className="text-xs text-muted-foreground">
                Distribution by type
              </p>
            </div>
            <div className="mt-2 flex flex-col items-center gap-4 sm:flex-row">
              <div className="h-[200px] w-[200px] shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categories}
                      dataKey="value"
                      innerRadius={55}
                      outerRadius={85}
                      paddingAngle={3}
                      stroke="none"
                    >
                      {categories.map((c) => (
                        <Cell key={c.name} fill={c.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: "var(--popover)",
                        border: "1px solid var(--border)",
                        borderRadius: 12,
                        fontSize: 12,
                      }}
                      formatter={
                        ((value: any, name: any) => {
                          const percent =
                            typeof value === "number" ? value : Number(value);
                          return Number.isNaN(percent)
                            ? ["", name]
                            : [`${percent}%`, name];
                        }) as any
                      }
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-2">
                {categories.map((c) => (
                  <div
                    key={c.name}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ background: c.color }}
                      />
                      <span className="text-foreground">{c.name}</span>
                    </div>
                    <span className="text-muted-foreground">{c.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Recent + Upcoming */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="surface-gradient border-border/60 p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-semibold">
                Recent Events
              </h3>
              <button className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:opacity-80">
                View all <ArrowUpRight className="h-3 w-3" />
              </button>
            </div>
            <div className="mt-3 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/60 hover:bg-transparent">
                    <TableHead className="text-[11px] uppercase tracking-wider text-muted-foreground">
                      Event
                    </TableHead>
                    <TableHead className="text-[11px] uppercase tracking-wider text-muted-foreground">
                      Date
                    </TableHead>
                    <TableHead className="text-[11px] uppercase tracking-wider text-muted-foreground">
                      Category
                    </TableHead>
                    <TableHead className="text-right text-[11px] uppercase tracking-wider text-muted-foreground">
                      Bookings
                    </TableHead>
                    <TableHead className="text-right text-[11px] uppercase tracking-wider text-muted-foreground">
                      Revenue
                    </TableHead>
                    <TableHead className="text-[11px] uppercase tracking-wider text-muted-foreground">
                      Status
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recent.map((e) => (
                    <TableRow
                      key={e.name}
                      className="border-border/40 hover:bg-muted/30"
                    >
                      <TableCell className="font-medium text-foreground">
                        {e.name}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {e.date}
                      </TableCell>
                      <TableCell>
                        <span
                          className="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium"
                          style={{
                            background: `color-mix(in oklab, var(--${e.cat}) 20%, transparent)`,
                            color: `var(--${e.cat})`,
                          }}
                        >
                          {e.category}
                        </span>
                      </TableCell>
                      <TableCell className="text-right text-foreground">
                        {e.bookings.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right text-foreground">
                        {e.revenue}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={e.status} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>

          <Card className="surface-gradient border-border/60 p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-semibold">
                Upcoming Events
              </h3>
              <button className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:opacity-80">
                See all <ArrowUpRight className="h-3 w-3" />
              </button>
            </div>
            <div className="mt-4 space-y-4">
              {upcoming.map((u) => (
                <div
                  key={u.name}
                  className="rounded-xl border border-border/50 bg-card/60 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate font-medium text-foreground">
                        {u.name}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        📍 {u.venue}
                      </p>
                    </div>
                    <Badge className="rounded-full bg-primary/15 text-primary hover:bg-primary/20">
                      {u.days}
                    </Badge>
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <Progress
                      value={u.progress}
                      className="h-1.5 bg-muted [&>div]:bg-primary"
                    />
                    <span className="w-10 text-right text-xs text-muted-foreground">
                      {u.progress}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Activity Timeline */}
        <Card className="surface-gradient border-border/60 p-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-lg font-semibold">
                Activity Timeline
              </h3>
              <p className="text-xs text-muted-foreground">
                Latest events across your workspace
              </p>
            </div>
            <Badge
              variant="outline"
              className="rounded-full border-border/60 text-muted-foreground"
            >
              Live
            </Badge>
          </div>
          <ol className="mt-5 space-y-4 border-l border-border/60 pl-5">
            {timeline.map((t, i) => (
              <li key={i} className="relative">
                <span
                  className="absolute -left-[26px] top-1 flex h-3 w-3 items-center justify-center rounded-full ring-4 ring-background"
                  style={{ background: `var(--${t.color})` }}
                />
                <p className="text-sm text-foreground">{t.text}</p>
                <p className="text-xs text-muted-foreground">{t.t}</p>
              </li>
            ))}
          </ol>
        </Card>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  trend,
  trendPositive,
  sub,
  tint,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
  trendPositive?: boolean;
  sub: React.ReactNode;
  tint: "primary" | "warning" | "success" | "pink";
}) {
  const tintVar =
    tint === "primary"
      ? "var(--primary)"
      : tint === "warning"
        ? "var(--warning)"
        : tint === "success"
          ? "var(--success)"
          : "var(--pink)";
  return (
    <Card className="surface-gradient relative overflow-hidden border-border/60 p-5">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          {label}
        </p>
        <div
          className="flex h-8 w-8 items-center justify-center rounded-lg"
          style={{
            background: `color-mix(in oklab, ${tintVar} 20%, transparent)`,
            color: tintVar,
          }}
        >
          {icon}
        </div>
      </div>
      <p className="mt-3 font-display text-3xl font-semibold text-foreground">
        {value}
      </p>
      <div className="mt-2 flex items-center gap-2 text-xs">
        {trend && (
          <span
            className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 font-medium ${
              trendPositive
                ? "bg-success/15 text-success"
                : "bg-destructive/15 text-destructive"
            }`}
          >
            <TrendingUp className="h-3 w-3" /> {trend}
          </span>
        )}
        <span className="text-muted-foreground">{sub}</span>
      </div>
    </Card>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { bg: string; fg: string; dot: string }> = {
    Live: { bg: "bg-success/15", fg: "text-success", dot: "bg-success" },
    Completed: { bg: "bg-info/15", fg: "text-info", dot: "bg-info" },
    Scheduled: { bg: "bg-warning/15", fg: "text-warning", dot: "bg-warning" },
  };
  const s = map[status] ?? map.Scheduled;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium ${s.bg} ${s.fg}`}
    >
      <Circle className={`h-1.5 w-1.5 fill-current ${s.dot}`} />
      {status}
    </span>
  );
}

export default DashboardPage;
