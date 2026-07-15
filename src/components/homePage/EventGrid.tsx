import { ArrowRight, Star, Users } from "lucide-react";
import Image from "next/image";

const events = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&h=360&fit=crop&auto=format",
    alt: "Crowd at a summer music festival",
    category: "MUSIC",
    badgeCls: "bg-primary/20 text-primary",
    date: "AUG 14–16, 2025",
    title: "Glastonwick Summer Festival",
    location: "Manchester, UK",
    price: "£89",
    attendees: "12,400",
    rating: 4.9,
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=360&fit=crop&auto=format",
    alt: "Technology conference keynote session",
    category: "TECH",
    badgeCls: "bg-cyan-500/20 text-cyan-400",
    date: "SEP 9, 2025",
    title: "DevSummit 2025",
    location: "Amsterdam, NL",
    price: "€299",
    attendees: "2,400",
    rating: 4.8,
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=360&fit=crop&auto=format",
    alt: "Outdoor food festival market stalls",
    category: "FOOD",
    badgeCls: "bg-orange-500/20 text-orange-400",
    date: "OCT 4–5, 2025",
    title: "Street Food World Summit",
    location: "Barcelona, ES",
    price: "€25",
    attendees: "8,200",
    rating: 4.7,
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&h=360&fit=crop&auto=format",
    alt: "Marathon runners in stadium",
    category: "SPORTS",
    badgeCls: "bg-green-500/20 text-green-400",
    date: "NOV 22, 2025",
    title: "Marathon World Invitational",
    location: "Berlin, DE",
    price: "€120",
    attendees: "45,000",
    rating: 4.9,
  },
  {
    id: 5,
    img: "https://images.unsplash.com/photo-1578926375939-38e60e0d1b6b?w=600&h=360&fit=crop&auto=format",
    alt: "Contemporary art gallery opening night",
    category: "ART",
    badgeCls: "bg-pink-500/20 text-pink-400",
    date: "AUG 28, 2025",
    title: "Contemporary Art Fair 2025",
    location: "Paris, FR",
    price: "€40",
    attendees: "3,600",
    rating: 4.6,
  },
  {
    id: 6,
    img: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&h=360&fit=crop&auto=format",
    alt: "Outdoor cinema night screening",
    category: "FILM",
    badgeCls: "bg-yellow-500/20 text-yellow-400",
    date: "SEP 19–21, 2025",
    title: "Cannes Under the Stars",
    location: "Nice, FR",
    price: "€55",
    attendees: "1,800",
    rating: 4.8,
  },
];

function EventGrid() {
  return (
    <section className="py-24 bg-secondary/30 border-y border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border text-xs font-mono text-muted-foreground mb-4">
              UPCOMING EVENTS
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              {"Don't miss out"}
            </h2>
          </div>
          <a
            href="#"
            className="hidden md:flex items-center gap-2 text-sm text-primary hover:opacity-80 transition-opacity"
          >
            View all events <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((e) => (
            <div
              key={e.id}
              className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5"
            >
              <div className="relative h-44 overflow-hidden bg-muted">
                <Image
                width={200}
                height={200}
                  src={e.img}
                  alt={e.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span
                    className={`px-2 py-1 rounded-md text-xs font-mono backdrop-blur-sm ${e.badgeCls}`}
                  >
                    {e.category}
                  </span>
                </div>
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-md px-2 py-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-xs text-white font-mono">{e.rating}</span>
                </div>
              </div>
              <div className="p-5">
                <div className="text-xs text-muted-foreground font-mono mb-1.5">
                  {e.date} · {e.location}
                </div>
                <h3 className="font-display font-bold text-base mb-3 leading-snug text-foreground">
                  {e.title}
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Users className="w-3.5 h-3.5" />
                    {e.attendees} going
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-display font-bold text-lg text-primary">
                      {e.price}
                    </span>
                    <button className="px-3 py-1.5 bg-primary/10 text-primary text-xs font-medium rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors">
                      Book
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10 md:hidden">
          <a href="#" className="inline-flex items-center gap-2 text-sm text-primary">
            View all events <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default EventGrid;