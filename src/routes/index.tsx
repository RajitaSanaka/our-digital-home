import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Compass, HandHeart, Rocket, Sparkles, Users } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BharatRoots AI — Discover India's Heritage. Empower Local Entrepreneurs." },
      {
        name: "description",
        content:
          "BharatRoots AI promotes Indian traditional products, supports local artisans, and helps aspiring entrepreneurs start and grow their businesses.",
      },
      { property: "og:title", content: "BharatRoots AI — Discover India's Heritage" },
      {
        property: "og:description",
        content: "Explore traditional Indian crafts and get guidance to start your own business.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const STATS = [
  { value: "7", label: "Craft traditions showcased" },
  { value: "28+", label: "States & UTs represented (demo)" },
  { value: "120+", label: "Artisan stories to be featured (demo)" },
  { value: "6", label: "Step startup roadmap" },
];

const SUPPORT = [
  {
    icon: Compass,
    title: "Discover Heritage",
    text: "Explore GI-tagged crafts by state and category, and learn the cultural story, materials and methods behind each product.",
  },
  {
    icon: HandHeart,
    title: "Support Artisans",
    text: "Every craft profile highlights the artisan communities who keep these traditions alive, helping conscious buyers choose authentic work.",
  },
  {
    icon: Rocket,
    title: "Launch Your Business",
    text: "A step-by-step dashboard, mentor guidance and a demo AI assistant help aspiring entrepreneurs turn craft ideas into ventures.",
  },
];

function HomePage() {
  const featured = PRODUCTS.slice(0, 3);

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={hero}
            alt="Traditional Indian handicrafts — textiles, pottery and wooden toys"
            width={1920}
            height={1088}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/30" />
        </div>
        <div className="relative mx-auto flex max-w-7xl flex-col justify-center px-4 py-24 sm:px-6 md:py-36">
          <p className="animate-fade-up inline-flex w-fit items-center gap-2 rounded-full border border-gold bg-card/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold-foreground">
            <Sparkles className="h-3.5 w-3.5 text-accent" /> Celebrating Indian Craftsmanship
          </p>
          <h1 className="animate-fade-up mt-6 max-w-2xl text-balance text-4xl font-bold leading-tight text-primary sm:text-5xl md:text-6xl">
            Discover India's Heritage.{" "}
            <span className="text-accent">Empower Local Entrepreneurs.</span>
          </h1>
          <p className="animate-fade-up mt-5 max-w-xl text-lg text-muted-foreground">
            BharatRoots AI connects you with India's traditional crafts and the artisan
            communities behind them — and gives aspiring founders the guidance to build
            businesses rooted in heritage.
          </p>
          <div className="animate-fade-up mt-8 flex flex-wrap gap-4">
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-primary-foreground shadow-warm transition-transform hover:scale-105"
            >
              Explore Indian Heritage <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-accent-foreground shadow-warm-lg transition-transform hover:scale-105"
            >
              Start Your Business <Rocket className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-secondary/60 pattern-mandala">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-heading text-4xl font-bold text-primary">{s.value}</p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {s.label}
              </p>
            </div>
          ))}
        </div>
        <p className="pb-4 text-center text-[11px] text-muted-foreground">
          Statistics shown are demonstration data for illustration.
        </p>
      </section>

      {/* Featured products */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-accent">Handpicked</p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-primary md:text-4xl">
              Featured Traditional Products
            </h2>
          </div>
          <Link
            to="/explore"
            className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-accent hover:underline sm:inline-flex"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="mt-8 text-center sm:hidden">
          <Link to="/explore" className="text-sm font-semibold text-accent hover:underline">
            View all products →
          </Link>
        </div>
      </section>

      {/* How we support */}
      <section className="bg-primary py-16 text-primary-foreground md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-center font-heading text-3xl font-bold md:text-4xl">
            How BharatRoots AI <span className="text-gold">Supports You</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-primary-foreground/80">
            Two journeys, one platform — for lovers of Indian craft and for the entrepreneurs
            who carry it forward.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {SUPPORT.map((s) => (
              <div
                key={s.title}
                className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-6 backdrop-blur transition-colors hover:border-gold/50"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/20 text-gold">
                  <s.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-heading text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-primary-foreground/75">{s.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              to="/assistant"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-gold-foreground transition-transform hover:scale-105"
            >
              <Users className="h-4 w-4" /> Try the AI Business Assistant
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
