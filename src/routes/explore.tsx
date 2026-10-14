import { createFileRoute } from "@tanstack/react-router";
import { Heart, MapPin, Search, SearchX } from "lucide-react";
import { useMemo, useState } from "react";
import { CATEGORIES, PRODUCTS, STATES } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { useFavourites } from "@/lib/favorites";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore Indian Heritage — BharatRoots AI" },
      {
        name: "description",
        content:
          "Browse traditional Indian products by state and category — Kalamkari, Pochampally Ikat, Blue Pottery, Madhubani and more.",
      },
      { property: "og:title", content: "Explore Indian Heritage — BharatRoots AI" },
      {
        property: "og:description",
        content: "Discover GI-tagged crafts, their cultural stories and traditional making methods.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ExplorePage,
});

const selectClass =
  "rounded-full border border-input bg-card px-4 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring";

function ExplorePage() {
  const [query, setQuery] = useState("");
  const [state, setState] = useState("all");
  const [category, setCategory] = useState("all");
  const [showFavs, setShowFavs] = useState(false);
  const [locationQuery, setLocationQuery] = useState("");
  const [locationSearched, setLocationSearched] = useState("");
  const { favourites } = useFavourites();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      if (state !== "all" && p.state !== state) return false;
      if (category !== "all" && p.category !== category) return false;
      if (showFavs && !favourites.includes(p.id)) return false;
      if (
        q &&
        ![p.name, p.state, p.category, p.description].some((f) =>
          f.toLowerCase().includes(q),
        )
      )
        return false;
      return true;
    });
  }, [query, state, category, showFavs, favourites]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <p className="text-xs font-bold uppercase tracking-widest text-accent">Heritage Catalogue</p>
      <h1 className="mt-2 font-heading text-3xl font-bold text-primary md:text-4xl">
        Explore Indian Heritage
      </h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Browse traditional crafts by state and category. Each product carries its cultural
        story, materials and the traditional method behind it.
      </p>

      {/* Filters */}
      <div className="mt-8 flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-warm">
        <div className="relative min-w-52 flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search crafts, states, categories…"
            className="w-full rounded-full border border-input bg-background py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <select value={state} onChange={(e) => setState(e.target.value)} className={selectClass} aria-label="Filter by state">
          <option value="all">All states</option>
          {STATES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className={selectClass} aria-label="Filter by category">
          <option value="all">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <button
          onClick={() => setShowFavs(!showFavs)}
          className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            showFavs
              ? "bg-accent text-accent-foreground"
              : "border border-input bg-card text-foreground hover:bg-secondary"
          }`}
        >
          <Heart className={`h-4 w-4 ${showFavs ? "fill-current" : ""}`} /> Favourites
        </button>
      </div>

      {/* Results */}
      {results.length === 0 ? (
        <div className="mt-16 flex flex-col items-center rounded-2xl border border-dashed border-border bg-card py-16 text-center">
          <SearchX className="h-10 w-10 text-muted-foreground" />
          <h2 className="mt-4 font-heading text-xl font-semibold text-foreground">
            No crafts found
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Try a different search term or clear the filters.
          </p>
          <button
            onClick={() => {
              setQuery("");
              setState("all");
              setCategory("all");
              setShowFavs(false);
            }}
            className="mt-5 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

      {/* Artisan location search */}
      <section className="mt-16 rounded-2xl border border-border bg-secondary/50 p-6 pattern-mandala md:p-10">
        <h2 className="font-heading text-2xl font-bold text-primary">
          Find Artisans Near You
        </h2>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          Enter a city or region to explore craft clusters associated with it. This is a
          demonstration directory of well-known craft regions — it does not list real
          seller addresses or verified vendors.
        </p>
        <form
          className="mt-5 flex flex-wrap gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            setLocationSearched(locationQuery.trim());
          }}
        >
          <div className="relative min-w-52 flex-1">
            <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
              placeholder="e.g. Jaipur, Varanasi, Kondapalli…"
              className="w-full rounded-full border border-input bg-card py-2.5 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <button
            type="submit"
            className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            Search region
          </button>
        </form>

        {locationSearched && (
          <div className="mt-6">
            {(() => {
              const q = locationSearched.toLowerCase();
              const matches = PRODUCTS.filter(
                (p) =>
                  p.state.toLowerCase().includes(q) ||
                  p.name.toLowerCase().includes(q) ||
                  p.method.toLowerCase().includes(q) ||
                  p.significance.toLowerCase().includes(q),
              );
              return matches.length > 0 ? (
                <>
                  <p className="text-sm font-medium text-foreground">
                    Craft traditions linked to “{locationSearched}”:
                  </p>
                  <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                    {matches.map((p) => (
                      <li
                        key={p.id}
                        className="rounded-xl border border-border bg-card p-4 text-sm"
                      >
                        <span className="font-semibold text-primary">{p.name}</span>
                        <span className="text-muted-foreground"> — {p.state}</span>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p className="rounded-xl border border-dashed border-border bg-card p-4 text-sm text-muted-foreground">
                  No craft clusters in our demonstration catalogue match “{locationSearched}”.
                  Try a state like Rajasthan, Bihar or Telangana.
                </p>
              );
            })()}
          </div>
        )}
      </section>
    </main>
  );
}
