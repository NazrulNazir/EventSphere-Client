"use client";

import { SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { TopNavbar } from "@/components/top-navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <div className="flex h-screen flex-1 bg-background">
        <AppSidebar />

        <SidebarInset className="flex h-screen w-full min-w-0 flex-1 flex-col overflow-hidden bg-background">
          <TopNavbar />

          <section className="flex-1 min-h-0 min-w-0 overflow-y-auto p-6">
            {children}
          </section>
        </SidebarInset>
      </div>
    </div>
  );
}
