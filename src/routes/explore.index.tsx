import { createFileRoute } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { useState } from "react";
import { PRODUCTS } from "@/data/products";
import { CatalogueGrid } from "@/components/CatalogueGrid";
import { CollectionCards } from "@/components/CollectionCards";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/explore/")({
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

function ExplorePage() {
  const [locationQuery, setLocationQuery] = useState("");
  const [locationSearched, setLocationSearched] = useState("");

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

      <p className="mt-4 border-l-2 border-gold pl-4 text-sm text-muted-foreground">
        Sample catalogue · Illustrative images and prices. Popularity, likes and significance
        rankings are demonstration data, not verified metrics. No sellers or availability are listed.
      </p>
      <CatalogueGrid products={PRODUCTS} />
      <CollectionCards />

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
          <Button
            type="submit"
            className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            Search region
          </Button>
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
