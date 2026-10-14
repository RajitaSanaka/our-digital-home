import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BadgeCheck,
  Calendar,
  CheckCircle2,
  Circle,
  Lightbulb,
  Megaphone,
  Package,
  Sparkles,
  TrendingUp,
  Truck,
  UserRound,
} from "lucide-react";
import { useEffect, useState } from "react";
import { PRODUCTS } from "@/data/products";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Entrepreneur Dashboard — BharatRoots AI" },
      {
        name: "description",
        content:
          "Business ideas, step-by-step startup guidance, supplier discovery, mentors, workshops and marketing tips for craft entrepreneurs.",
      },
      { property: "og:title", content: "Entrepreneur Dashboard — BharatRoots AI" },
      {
        property: "og:description",
        content: "Everything you need to start and grow a heritage-craft business in India.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

const IDEAS = [
  { title: "Handloom D2C Brand", budget: "₹1–5 lakh", tag: "Textiles", text: "Partner with weaving clusters and sell Ikat or Kalamkari directly to urban buyers online." },
  { title: "Eco Toy Subscription", budget: "₹50k–2 lakh", tag: "Toys", text: "Curated monthly boxes of Channapatna and Kondapalli toys for children and gifting." },
  { title: "Craft Home Décor Studio", budget: "₹2–8 lakh", tag: "Decor", text: "Blue pottery and Madhubani-inspired home décor for cafés, hotels and offices." },
  { title: "Heritage Craft Workshops", budget: "₹30k–1 lakh", tag: "Experiences", text: "Host weekend workshops with artisans for tourists, schools and corporate teams." },
];

const STEPS = [
  { title: "Validate your idea", text: "Talk to 20 potential customers; confirm they would pay for your product." },
  { title: "Register your business", text: "Choose a structure (sole proprietorship, LLP, Pvt Ltd) and get Udyam (MSME) registration." },
  { title: "Source ethically", text: "Partner with artisan clusters and agree on fair pricing and timelines." },
  { title: "Build your brand", text: "Create a name, logo, story and product photography that honours the craft." },
  { title: "Start selling", text: "Launch on a website, marketplaces and social media; attend craft fairs." },
  { title: "Measure & grow", text: "Track sales, customer feedback and repeat purchases; expand thoughtfully." },
];

const SUPPLIER_TYPES = [
  { icon: Package, title: "Raw material suppliers", text: "Look for local yarn, wood and natural dye cooperatives near your craft cluster." },
  { icon: Truck, title: "Logistics & packaging", text: "Compare courier aggregators and eco-friendly packaging providers for fragile crafts." },
  { icon: BadgeCheck, title: "Government programmes", text: "Explore schemes from the Development Commissioner (Handicrafts) and state handloom boards." },
];

const MENTOR_TOPICS = [
  { name: "Sourcing & artisan partnerships", focus: "How to build fair, long-term relationships with craft clusters." },
  { name: "Brand storytelling", focus: "Turning cultural heritage into a compelling, respectful brand story." },
  { name: "Online selling & marketplaces", focus: "Listing, pricing and fulfilment on e-commerce platforms." },
];

const WEBINARS = [
  { date: "Nov 6, 2026", title: "Pricing Handmade Products Fairly", mode: "Online" },
  { date: "Nov 20, 2026", title: "Instagram for Craft Brands", mode: "Online" },
  { date: "Dec 4, 2026", title: "Export Basics for Artisans", mode: "Online" },
];

const MARKETING = [
  "Tell the artisan's story on every product page — buyers pay more for authenticity.",
  "Use natural-light photography on cream or earthy backgrounds.",
  "Post short reels showing the making process; these perform well on social media.",
  "Partner with festival and wedding gifting seasons (Diwali, Sankranti, Onam).",
];

const GROWTH = [
  { title: "Add a corporate gifting line", text: "Bulk orders during festivals can stabilise cash flow." },
  { title: "Collect customer reviews", text: "Social proof increases conversion for first-time buyers." },
  { title: "Explore GI-tag marketing", text: "Highlight GI certification to signal authenticity." },
];

const STORAGE_KEY = "bharatroots-steps";

function Dashboard() {
  const [done, setDone] = useState<number[]>([]);
  useEffect(() => {
    try {
      setDone(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]"));
    } catch {
      /* ignore */
    }
  }, []);
  const toggleStep = (i: number) => {
    const next = done.includes(i) ? done.filter((d) => d !== i) : [...done, i];
    setDone(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };
  const progress = Math.round((done.length / STEPS.length) * 100);

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <p className="text-xs font-bold uppercase tracking-widest text-accent">For Founders</p>
      <h1 className="mt-2 font-heading text-3xl font-bold text-primary md:text-4xl">
        Entrepreneur Dashboard
      </h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Your toolkit for building a business rooted in Indian heritage — from first idea to
        steady growth.
      </p>

      {/* Ideas */}
      <Section icon={Lightbulb} title="Business Idea Explorer">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {IDEAS.map((i) => (
            <div key={i.title} className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-warm">
              <span className="w-fit rounded-full bg-secondary px-3 py-0.5 text-xs font-semibold text-secondary-foreground">{i.tag}</span>
              <h3 className="mt-3 font-heading text-lg font-semibold text-foreground">{i.title}</h3>
              <p className="mt-1 flex-1 text-sm text-muted-foreground">{i.text}</p>
              <p className="mt-3 text-xs font-semibold text-accent">Est. budget: {i.budget}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Steps */}
      <Section icon={CheckCircle2} title="Step-by-Step Startup Guidance">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-warm">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-foreground">Your progress</span>
            <span className="font-semibold text-primary">{progress}%</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${progress}%` }} />
          </div>
          <ol className="mt-6 grid gap-3 md:grid-cols-2">
            {STEPS.map((s, i) => {
              const isDone = done.includes(i);
              return (
                <li key={s.title}>
                  <button
                    onClick={() => toggleStep(i)}
                    className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-colors ${
                      isDone ? "border-primary bg-secondary" : "border-border hover:bg-muted"
                    }`}
                  >
                    {isDone ? (
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    ) : (
                      <Circle className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
                    )}
                    <span>
                      <span className="block text-sm font-semibold text-foreground">
                        {i + 1}. {s.title}
                      </span>
                      <span className="block text-sm text-muted-foreground">{s.text}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </Section>

      {/* Showcase */}
      <Section icon={Sparkles} title="Product Showcase — Inspiration">
        <div className="flex gap-4 overflow-x-auto pb-2">
          {PRODUCTS.map((p) => (
            <Link
              key={p.id}
              to="/explore/$productId"
              params={{ productId: p.id }}
              className="w-48 shrink-0 overflow-hidden rounded-2xl border border-border bg-card"
            >
              <img src={p.image} alt={p.name} loading="lazy" width={1024} height={1024} className="aspect-square w-full object-cover" />
              <p className="p-3 text-sm font-semibold text-foreground">{p.name}</p>
            </Link>
          ))}
        </div>
      </Section>

      <div className="grid gap-x-8 lg:grid-cols-2">
        {/* Suppliers */}
        <Section icon={Truck} title="Vendor & Supplier Discovery">
          <div className="space-y-3">
            {SUPPLIER_TYPES.map((s) => (
              <div key={s.title} className="flex gap-4 rounded-2xl border border-border bg-card p-4">
                <s.icon className="h-6 w-6 shrink-0 text-accent" />
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.text}</p>
                </div>
              </div>
            ))}
            <p className="text-xs text-muted-foreground">
              We don't list specific vendors yet — this is general guidance on where to look.
            </p>
          </div>
        </Section>

        {/* Mentors */}
        <Section icon={UserRound} title="Mentor & Expert Guidance">
          <div className="space-y-3">
            {MENTOR_TOPICS.map((m) => (
              <div key={m.name} className="rounded-2xl border border-border bg-card p-4">
                <h3 className="text-sm font-semibold text-foreground">{m.name}</h3>
                <p className="text-sm text-muted-foreground">{m.focus}</p>
              </div>
            ))}
            <button
              disabled
              className="w-full cursor-not-allowed rounded-full border border-dashed border-border px-4 py-2.5 text-sm text-muted-foreground"
            >
              Mentor booking — coming soon
            </button>
          </div>
        </Section>
      </div>

      {/* Webinars */}
      <Section icon={Calendar} title="Upcoming Webinars & Workshops">
        <div className="grid gap-4 md:grid-cols-3">
          {WEBINARS.map((w) => (
            <div key={w.title} className="rounded-2xl border border-border bg-card p-5 shadow-warm">
              <p className="text-xs font-bold uppercase tracking-wide text-accent">{w.date} · {w.mode}</p>
              <h3 className="mt-2 font-heading text-lg font-semibold text-foreground">{w.title}</h3>
              <span className="mt-3 inline-block rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                Sample event — registration coming soon
              </span>
            </div>
          ))}
        </div>
      </Section>

      <div className="grid gap-x-8 lg:grid-cols-2">
        <Section icon={Megaphone} title="Marketing Guidance">
          <ul className="space-y-3 rounded-2xl border border-border bg-card p-5">
            {MARKETING.map((m) => (
              <li key={m} className="flex gap-3 text-sm text-foreground">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold" /> {m}
              </li>
            ))}
          </ul>
        </Section>

        <Section icon={TrendingUp} title="Business Growth Recommendations">
          <div className="space-y-3">
            {GROWTH.map((g) => (
              <div key={g.title} className="rounded-2xl border border-border bg-card p-4">
                <h3 className="text-sm font-semibold text-foreground">{g.title}</h3>
                <p className="text-sm text-muted-foreground">{g.text}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>

      <div className="mt-14 rounded-3xl bg-primary p-8 text-center text-primary-foreground md:p-12">
        <h2 className="font-heading text-2xl font-bold md:text-3xl">Have a business idea?</h2>
        <p className="mt-2 text-primary-foreground/80">Get a tailored plan from our demo AI Business Assistant.</p>
        <Link to="/assistant" className="mt-6 inline-block rounded-full bg-gold px-7 py-3 text-sm font-bold uppercase tracking-wide text-gold-foreground">
          Open the Assistant
        </Link>
      </div>
    </main>
  );
}

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Lightbulb;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12">
      <h2 className="mb-4 flex items-center gap-2 font-heading text-2xl font-bold text-primary">
        <Icon className="h-6 w-6 text-accent" /> {title}
      </h2>
      {children}
    </section>
  );
}
