'use client'
import { Ticket } from "lucide-react";
import { usePathname } from "next/navigation";
import { RiInstagramFill, RiLinkedinBoxFill, RiTwitterFill, RiYoutubeFill } from "react-icons/ri";

function Footer() {
  const pathName = usePathname();
    if (pathName.includes("dashboard")) {
      return null;
    }
  const cols = [
    {
      heading: "Platform",
      links: ["Browse Events", "Create Event", "Pricing", "Mobile App", "API Docs"],
    },
    {
      heading: "Company",
      links: ["About Us", "Blog", "Careers", "Press Kit", "Contact"],
    },
    {
      heading: "Support",
      links: ["Help Center", "Refund Policy", "Terms of Service", "Privacy Policy", "Cookies"],
    },
  ];

  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Ticket className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-lg text-foreground">Even<span className="text-primary">Sphere</span></span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              The event platform built for culture, community, and unforgettable moments.
            </p>
            <div className="flex gap-3">
              {[RiTwitterFill, RiInstagramFill, RiLinkedinBoxFill, RiYoutubeFill].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary/20 hover:text-primary transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.heading}>
              <h4 className="font-display font-bold text-sm mb-5 text-foreground">
                {col.heading}
              </h4>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-xs text-muted-foreground font-mono">
            © 2025 Eventix Inc. All rights reserved.
          </span>
          <div className="flex gap-6">
            {["Terms", "Privacy", "Cookies"].map((l) => (
              <a
                key={l}
                href="#"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;