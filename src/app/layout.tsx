import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TopNavbar } from "@/components/homePage/Navbar";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/homePage/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Event Sphere",
  description: "Event Management Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen overflow-x-hidden bg-background text-foreground"
      >
        <ThemeProvider>
          <SidebarProvider>
            <div className="w-full">
              <TopNavbar/>
              <main className="">{children}</main>
              <Toaster position="top-right" reverseOrder={false} />
              <Footer/>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
