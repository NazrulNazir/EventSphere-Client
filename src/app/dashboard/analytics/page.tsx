"use client";
import { Card } from "@/components/ui/card";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
} from "recharts";

const bookings = [
  { m: "Jan", v: 420 },
  { m: "Feb", v: 580 },
  { m: "Mar", v: 690 },
  { m: "Apr", v: 640 },
  { m: "May", v: 890 },
  { m: "Jun", v: 1120 },
  { m: "Jul", v: 980 },
];

const revenue = [
  { m: "Jan", v: 28000 },
  { m: "Feb", v: 34000 },
  { m: "Mar", v: 41000 },
  { m: "Apr", v: 39000 },
  { m: "May", v: 52000 },
  { m: "Jun", v: 61000 },
  { m: "Jul", v: 58000 },
];

function AnalyticsPage() {
  return (
    <div className="w-full min-w-0 p-4 md:p-6">
      <h1 className="font-display text-3xl font-semibold">Analytics</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Performance across all your events.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="surface-gradient border-border/60 p-5">
          <h3 className="font-display text-lg font-semibold">
            Bookings by Month
          </h3>
          <p className="text-xs text-muted-foreground">Total tickets sold</p>
          <div className="mt-4 h-70 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={bookings}
                margin={{ top: 10, right: 8, left: -12, bottom: 0 }}
              >
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
                />
                <Tooltip
                  contentStyle={{
                    background: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="v" fill="var(--primary)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="surface-gradient border-border/60 p-5">
          <h3 className="font-display text-lg font-semibold">Revenue Trend</h3>
          <p className="text-xs text-muted-foreground">
            Monthly revenue in USD
          </p>
          <div className="mt-4 h-70 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={revenue}
                margin={{ top: 10, right: 8, left: -12, bottom: 0 }}
              >
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
                    fontSize: 12,
                  }}
                  formatter={(value: unknown) => {
                    const amount =
                      typeof value === "number" ? value : Number(value ?? 0);
                    return [
                      `$${Number.isNaN(amount) ? 0 : amount.toLocaleString()}`,
                      "Revenue",
                    ];
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="v"
                  stroke="var(--primary)"
                  strokeWidth={2.5}
                  dot={{ fill: "var(--primary)" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { label: "Conversion", value: "6.8%" },
          { label: "Avg ticket price", value: "$36" },
          { label: "Repeat attendees", value: "24%" },
          { label: "Refund rate", value: "1.2%" },
        ].map((s) => (
          <Card key={s.label} className="surface-gradient border-border/60 p-4">
            <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
              {s.label}
            </p>
            <p className="mt-2 font-display text-2xl font-semibold">
              {s.value}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default AnalyticsPage;
