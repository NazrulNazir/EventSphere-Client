"use client";
import { useState } from "react";
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
import { Search, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

type EventRow = {
  id: string;
  name: string;
  date: string;
  category: string;
  bookings: number;
  status: "Live" | "Scheduled" | "Completed" | "Draft";
};

const initial: EventRow[] = [
  {
    id: "e1",
    name: "Neon Frequencies Fest",
    date: "Jun 28",
    category: "Music",
    bookings: 1248,
    status: "Live",
  },
  {
    id: "e2",
    name: "Future of Work Summit",
    date: "Jul 3",
    category: "Business",
    bookings: 842,
    status: "Completed",
  },
  {
    id: "e3",
    name: "Urban Marathon Series",
    date: "Jul 8",
    category: "Sports",
    bookings: 3120,
    status: "Live",
  },
  {
    id: "e4",
    name: "Modern Canvas Expo",
    date: "Jul 12",
    category: "Arts",
    bookings: 512,
    status: "Scheduled",
  },
  {
    id: "e5",
    name: "AI & Robotics Expo",
    date: "Jul 18",
    category: "Technology",
    bookings: 1904,
    status: "Scheduled",
  },
  {
    id: "e6",
    name: "Coastal Jazz Weekend",
    date: "Jul 24",
    category: "Music",
    bookings: 612,
    status: "Scheduled",
  },
  {
    id: "e7",
    name: "Indie Film Nights",
    date: "Aug 2",
    category: "Arts",
    bookings: 0,
    status: "Draft",
  },
];

const statusColor: Record<EventRow["status"], string> = {
  Live: "bg-success/15 text-success",
  Scheduled: "bg-warning/15 text-warning",
  Completed: "bg-info/15 text-info",
  Draft: "bg-muted text-muted-foreground",
};

function ManageEventsPage() {
  const [rows, setRows] = useState(initial);
  const [q, setQ] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = rows.filter((r) =>
    r.name.toLowerCase().includes(q.toLowerCase()),
  );

  const pendingRow = deleteId ? rows.find((r) => r.id === deleteId) : null;

  const confirmRemove = () => {
    if (!deleteId) return;
    const name = rows.find((r) => r.id === deleteId)?.name;
    setRows((r) => r.filter((x) => x.id !== deleteId));
    setDeleteId(null);
    toast.success(name ? `"${name}" deleted` : "Event deleted");
  };

  return (
    <div className="w-full min-w-0 p-4 md:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-semibold">Manage Events</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Edit, delete or update statuses.
          </p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search events…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="h-10 rounded-full pl-10"
          />
        </div>
      </div>

      <Card className="surface-gradient mt-6 w-full border-border/60 p-4">
        <div className="w-full overflow-x-auto">
          <Table className="w-full">
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
                <TableHead className="text-[11px] uppercase tracking-wider text-muted-foreground">
                  Status
                </TableHead>
                <TableHead className="text-right text-[11px] uppercase tracking-wider text-muted-foreground">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((r) => (
                <TableRow
                  key={r.id}
                  className="border-border/40 hover:bg-muted/30"
                >
                  <TableCell className="font-medium text-foreground">
                    {r.name}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {r.date}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {r.category}
                  </TableCell>
                  <TableCell className="text-right text-foreground">
                    {r.bookings.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge className={`rounded-full ${statusColor[r.status]}`}>
                      {r.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="inline-flex gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => toast.info(`Editing ${r.name}`)}
                        aria-label="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setDeleteId(r.id)}
                        aria-label="Delete"
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="py-8 text-center text-sm text-muted-foreground"
                  >
                    No events match "{q}".
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      <AlertDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
      >
        <AlertDialogContent className="border-border/60 bg-background">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete event?</AlertDialogTitle>
            <AlertDialogDescription>
              {pendingRow
                ? `This will permanently remove "${pendingRow.name}". This action cannot be undone.`
                : "This action cannot be undone."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteId(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmRemove}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default ManageEventsPage;
