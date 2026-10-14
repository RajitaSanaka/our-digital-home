import { useMemo, useState } from "react";
import { Heart, Search, SearchX, SlidersHorizontal, Plus, RotateCcw } from "lucide-react";
import { CATEGORIES, STATES, PRODUCT_TYPES, type Product } from "@/data/products";
import { DEFAULT_FILTERS, filterCatalogue, type CatalogueFilters } from "@/lib/catalogue";
import { useFavourites } from "@/lib/favorites";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";

const selectClass = "w-full rounded-full border border-input bg-card px-4 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring";
export function CatalogueGrid({ products }: { products: Product[] }) {
  const [filters, setFilters] = useState<CatalogueFilters>({ ...DEFAULT_FILTERS });
  const [visible, setVisible] = useState(12);
  const { favourites } = useFavourites();
  const results = useMemo(() => filterCatalogue(products, filters, favourites), [products, filters, favourites]);
  function change<K extends keyof CatalogueFilters>(key: K, value: CatalogueFilters[K]) { setFilters((f) => ({ ...f, [key]: value })); setVisible(12); }
  const active = Object.entries(filters).some(([key, value]) => value !== DEFAULT_FILTERS[key as keyof CatalogueFilters]);
  function reset() { setFilters({ ...DEFAULT_FILTERS }); setVisible(12); }
  return <section className="mt-8" aria-label="Product catalogue">
    <div className="space-y-4 border-y border-border py-5">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-0 flex-1 basis-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input aria-label="Search products" value={filters.query} onChange={(e) => change("query", e.target.value)} placeholder="Search crafts, states, materials…" className="w-full rounded-full border border-input bg-card py-2.5 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <Button variant={filters.favouritesOnly ? "default" : "outline"} className="rounded-full" aria-pressed={filters.favouritesOnly} onClick={() => change("favouritesOnly", !filters.favouritesOnly)}><Heart className={filters.favouritesOnly ? "fill-current" : ""} /> Favourites</Button>
        {active && <Button variant="ghost" className="rounded-full" onClick={reset}><RotateCcw />Clear filters</Button>}
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <Filter label="State / union territory" value={filters.state} change={(v) => change("state", v)} options={STATES} all="All states & UTs" />
        <Filter label="Category" value={filters.category} change={(v) => change("category", v)} options={CATEGORIES} all="All categories" />
        <Filter label="Product type" value={filters.type} change={(v) => change("type", v)} options={PRODUCT_TYPES} all="All product types" />
        <label className="space-y-1 text-xs font-medium text-muted-foreground">Sample price range<select aria-label="Filter by price range" className={selectClass} value={filters.price} onChange={(e) => change("price", e.target.value)}><option value="all">All sample prices</option><option value="budget">Up to ₹1,000</option><option value="mid">₹1,001 – ₹5,000</option><option value="premium">₹5,001 – ₹15,000</option><option value="luxury">Above ₹15,000</option></select></label>
        <label className="space-y-1 text-xs font-medium text-muted-foreground">Demo popularity<select aria-label="Filter by popularity" className={selectClass} value={filters.popularity} onChange={(e) => change("popularity", e.target.value)}><option value="all">All products</option><option value="popular">Popular samples</option><option value="liked">Most-liked samples</option></select></label>
      </div>
    </div>
    <div className="my-6 flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm text-muted-foreground" role="status">{results.length} {results.length === 1 ? "product" : "products"} · {Math.min(visible, results.length)} shown</p>
      <label className="flex items-center gap-2 text-sm text-muted-foreground"><SlidersHorizontal className="h-4 w-4" /><select aria-label="Sort products" className={selectClass} value={filters.sort} onChange={(e) => change("sort", e.target.value)}><option value="featured">Featured</option><option value="popular">Most popular</option><option value="highest">Highest price</option><option value="lowest">Lowest price</option><option value="newest">Newest</option><option value="liked">Most liked</option><option value="traditional">Traditional significance</option></select></label>
    </div>
    {results.length ? <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{results.slice(0, visible).map((p) => <ProductCard key={p.id} product={p} />)}</div>
      {visible < results.length && <div className="mt-8 text-center"><Button size="lg" className="rounded-full" onClick={() => setVisible((v) => v + 12)}><Plus />Load more products</Button></div>}
    </> : <div className="flex flex-col items-center py-16 text-center"><SearchX className="h-10 w-10 text-muted-foreground" /><h2 className="mt-4 font-heading text-xl font-semibold">No crafts found</h2><p className="mt-2 text-sm text-muted-foreground">Try another search or a different filter.</p><Button className="mt-5 rounded-full" onClick={reset}>Clear all filters</Button></div>}
  </section>;
}
function Filter({ label, value, change, options, all }: { label: string; value: string; change: (value: string) => void; options: string[]; all: string }) {
  return <label className="space-y-1 text-xs font-medium text-muted-foreground">{label}<select aria-label={`Filter by ${label.toLowerCase()}`} className={selectClass} value={value} onChange={(e) => change(e.target.value)}><option value="all">{all}</option>{options.map((v) => <option key={v}>{v}</option>)}</select></label>;
}