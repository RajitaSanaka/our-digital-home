import { createFileRoute } from "@tanstack/react-router";
import { Loader2, RotateCcw, Sparkles } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title: "AI Business Assistant — BharatRoots AI" },
      {
        name: "description",
        content:
          "Get a structured business plan for your craft venture: idea improvements, target customers, branding, product description and roadmap.",
      },
      { property: "og:title", content: "AI Business Assistant — BharatRoots AI" },
      {
        property: "og:description",
        content: "Turn your craft business idea into a structured plan.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AssistantPage,
});

interface FormState {
  idea: string;
  category: string;
  budget: string;
  customers: string;
  location: string;
}

const CATEGORIES = ["Textiles & Handloom", "Pottery & Ceramics", "Toys & Decor", "Art & Paintings", "Food & Spices", "Jewellery", "Other"];
const BUDGETS = ["Under ₹50,000", "₹50,000 – ₹2 lakh", "₹2 – ₹10 lakh", "Above ₹10 lakh"];

const inputClass =
  "w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring";

function budgetAdvice(budget: string): string {
  if (budget.startsWith("Under")) return "Start lean: pre-orders, one marketplace, and small batches to test demand before investing in inventory.";
  if (budget.startsWith("₹50")) return "You can afford a small curated catalogue, basic branding, and one or two craft-fair stalls alongside online sales.";
  if (budget.startsWith("₹2")) return "Consider a dedicated website, professional photography, and a working-capital buffer for artisan payments.";
  return "With this budget you can build a strong brand, hire part-time help, and explore export or corporate gifting channels.";
}

function AssistantPage() {
  const [form, setForm] = useState<FormState>({ idea: "", category: CATEGORIES[0] ?? "", budget: BUDGETS[0] ?? "", customers: "", location: "" });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<FormState | null>(null);
  const [error, setError] = useState("");

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const generate = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.idea.trim() || !form.customers.trim() || !form.location.trim()) {
      setError("Please fill in your business idea, target customers and location.");
      return;
    }
    setLoading(true);
    setResult(null);
    // Simulated thinking delay for the demo assistant
    setTimeout(() => {
      setResult(form);
      setLoading(false);
    }, 1200);
  };

  const reset = () => {
    setResult(null);
    setForm({ idea: "", category: CATEGORIES[0] ?? "", budget: BUDGETS[0] ?? "", customers: "", location: "" });
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <p className="text-xs font-bold uppercase tracking-widest text-accent">Plan Your Venture</p>
      <h1 className="mt-2 font-heading text-3xl font-bold text-primary md:text-4xl">
        AI Business Assistant
      </h1>
      <div className="mt-3 inline-flex items-start gap-2 rounded-xl border border-gold/50 bg-gold/10 px-4 py-2.5 text-sm text-foreground">
        <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
        <span>
          <strong>Demo assistant:</strong> responses are generated from predefined templates
          based on your inputs — not from a real AI model.
        </span>
      </div>

      {!result ? (
        <form onSubmit={generate} className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-warm md:p-8">
          <div className="grid gap-5 md:grid-cols-2">
            <label className="block md:col-span-2">
              <span className="mb-1.5 block text-sm font-semibold text-foreground">Your business idea *</span>
              <input value={form.idea} onChange={set("idea")} placeholder="e.g. Selling hand-painted Kalamkari dupattas online" className={inputClass} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-foreground">Product category</span>
              <select value={form.category} onChange={set("category")} className={inputClass}>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-foreground">Budget</span>
              <select value={form.budget} onChange={set("budget")} className={inputClass}>
                {BUDGETS.map((b) => <option key={b}>{b}</option>)}
              </select>
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-foreground">Target customers *</span>
              <input value={form.customers} onChange={set("customers")} placeholder="e.g. Urban women 25–45 who value handcrafted fashion" className={inputClass} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-foreground">Location *</span>
              <input value={form.location} onChange={set("location")} placeholder="e.g. Hyderabad" className={inputClass} />
            </label>
          </div>

          {error && (
            <p className="mt-4 rounded-xl bg-destructive/10 px-4 py-2.5 text-sm font-medium text-destructive">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3 text-sm font-bold uppercase tracking-wide text-accent-foreground shadow-warm-lg transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Crafting your plan…
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" /> Generate my business plan
              </>
            )}
          </button>
        </form>
      ) : (
        <div className="animate-fade-up mt-8 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-2xl font-bold text-primary">Your Business Plan</h2>
            <button onClick={reset} className="inline-flex items-center gap-1.5 rounded-full border border-input bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary">
              <RotateCcw className="h-4 w-4" /> Start over
            </button>
          </div>

          <PlanCard title="Business Idea Improvements">
            <ul className="list-disc space-y-1.5 pl-5">
              <li>Sharpen your niche: instead of general {result.category.toLowerCase()}, focus on a signature line from <strong>{result.location}</strong> that buyers can't find elsewhere.</li>
              <li>Add a story layer: name the artisan cluster and craft tradition behind every product.</li>
              <li>Offer limited-edition festive collections to create urgency and repeat visits.</li>
            </ul>
          </PlanCard>

          <PlanCard title="Target Customer Suggestions">
            <ul className="list-disc space-y-1.5 pl-5">
              <li>Primary: {result.customers}.</li>
              <li>Secondary: corporate gifting buyers and interior stylists looking for authentic Indian craft.</li>
              <li>Reach them via Instagram reels of the making process and weekend craft pop-ups in {result.location}.</li>
            </ul>
          </PlanCard>

          <PlanCard title="Branding & Marketing Ideas">
            <ul className="list-disc space-y-1.5 pl-5">
              <li>Use a warm palette — cream, deep green and terracotta — with the craft's region in your tagline.</li>
              <li>Photograph products in natural light with the artisan's hands in frame.</li>
              <li>Run a "meet the maker" content series; authenticity is your strongest differentiator.</li>
            </ul>
          </PlanCard>

          <PlanCard title="Sample Product Description">
            <p>
              "Handcrafted in {result.location}, this {result.category.toLowerCase().replace(/ & .*/, "")} piece carries
              generations of skill in every detail. Made with traditional methods and natural
              materials, each item is slightly unique — a small piece of India's living heritage
              for your home and wardrobe."
            </p>
          </PlanCard>

          <PlanCard title="Basic Business Roadmap">
            <ol className="list-decimal space-y-1.5 pl-5">
              <li>Month 1: Validate demand with 20 customer conversations and a small pilot batch.</li>
              <li>Month 2: Register your business (Udyam/MSME) and set up one sales channel.</li>
              <li>Month 3: Launch with 10–15 products, gather reviews, refine pricing.</li>
              <li>Months 4–6: Add a second channel (marketplace or craft fairs) and a festive collection.</li>
            </ol>
          </PlanCard>

          <PlanCard title="Budget Guidance & Next Steps">
            <ul className="list-disc space-y-1.5 pl-5">
              <li>{budgetAdvice(result.budget)}</li>
              <li>Write a one-page business summary and share it with a potential mentor.</li>
              <li>Visit or contact the craft cluster nearest to {result.location} to discuss sourcing.</li>
              <li>Revisit the Entrepreneur Dashboard to track your startup checklist.</li>
            </ul>
          </PlanCard>
        </div>
      )}
    </main>
  );
}

function PlanCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-warm">
      <h3 className="font-heading text-lg font-semibold text-accent">{title}</h3>
      <div className="mt-3 text-sm leading-relaxed text-foreground">{children}</div>
    </section>
  );
}
