"use client";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/components/theme-provider";
import { toast } from "sonner";

function SettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="w-full min-w-0 p-4 md:p-6">
      <h1 className="font-display text-3xl font-semibold">Settings</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Manage preferences for your workspace.
      </p>

      <Card className="surface-gradient mx-auto mt-6 max-w-3xl border-border/60 p-6">
        <h3 className="font-display text-lg font-semibold">Appearance</h3>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <Label>Dark mode</Label>
            <p className="text-xs text-muted-foreground">
              Use a dark color palette.
            </p>
          </div>
          <Switch
            checked={theme === "dark"}
            onCheckedChange={(c) => setTheme(c ? "dark" : "light")}
          />
        </div>
      </Card>

      <Card className="surface-gradient mx-auto mt-6 max-w-3xl border-border/60 p-6">
        <h3 className="font-display text-lg font-semibold">Notifications</h3>
        <div className="mt-4 space-y-4">
          {[
            {
              label: "New bookings",
              desc: "Get notified when someone books a ticket.",
            },
            {
              label: "Weekly summary",
              desc: "A recap of your events every Monday.",
            },
            {
              label: "Payout alerts",
              desc: "When revenue is transferred to your account.",
            },
          ].map((row, i) => (
            <div key={row.label}>
              <div className="flex items-center justify-between">
                <div>
                  <Label>{row.label}</Label>
                  <p className="text-xs text-muted-foreground">{row.desc}</p>
                </div>
                <Switch defaultChecked={i !== 2} />
              </div>
              {i < 2 && <Separator className="mt-4" />}
            </div>
          ))}
        </div>
      </Card>

      <Card className="surface-gradient mx-auto mt-6 max-w-3xl border-destructive/40 p-6">
        <h3 className="font-display text-lg font-semibold text-destructive">
          Danger zone
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Permanent actions. These cannot be undone.
        </p>
        <Button
          variant="destructive"
          className="mt-4 rounded-lg"
          onClick={() =>
            toast.error("Account deletion is disabled in demo mode.")
          }
        >
          Delete account
        </Button>
      </Card>
    </div>
  );
}

export default SettingsPage;
