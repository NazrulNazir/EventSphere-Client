import { Camera, Laptop, Music, Palette, Trophy, Utensils } from "lucide-react";

function Categories() {
  const cats = [
    {
      Icon: Music,
      label: "Music",
      count: 3420,
      grad: "from-violet-500/15 to-pink-500/15 border-violet-500/20",
    },
    {
      Icon: Laptop,
      label: "Technology",
      count: 980,
      grad: "from-cyan-500/15 to-blue-500/15 border-cyan-500/20",
    },
    {
      Icon: Trophy,
      label: "Sports",
      count: 2100,
      grad: "from-green-500/15 to-emerald-500/15 border-green-500/20",
    },
    {
      Icon: Utensils,
      label: "Food & Drink",
      count: 1560,
      grad: "from-orange-500/15 to-amber-500/15 border-orange-500/20",
    },
    {
      Icon: Camera,
      label: "Film & Media",
      count: 740,
      grad: "from-yellow-500/15 to-orange-500/15 border-yellow-500/20",
    },
    {
      Icon: Palette,
      label: "Art & Culture",
      count: 1280,
      grad: "from-pink-500/15 to-rose-500/15 border-pink-500/20",
    },
  ];

  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border text-xs font-mono text-muted-foreground mb-4">
          BROWSE BY CATEGORY
        </div>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
          Find your scene
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {cats.map(({ Icon, label, count, grad }) => (
          <button
            key={label}
            className={`flex flex-col items-center gap-3 p-6 rounded-2xl border bg-gradient-to-b ${grad} hover:scale-105 transition-transform text-center cursor-pointer`}
          >
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
              <Icon className="w-6 h-6 text-foreground" />
            </div>
            <div>
              <div className="font-display font-semibold text-sm text-foreground">{label}</div>
              <div className="text-xs text-muted-foreground font-mono mt-0.5">
                {count.toLocaleString()} events
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
export default Categories;