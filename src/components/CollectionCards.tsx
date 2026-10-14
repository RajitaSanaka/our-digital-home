import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { COLLECTIONS, PRODUCTS } from "@/data/products";
import { Button } from "@/components/ui/button";

export function CollectionCards() {
  return <section className="mt-12" aria-label="Heritage collections">
    <div className="mb-6"><p className="text-xs font-bold uppercase tracking-widest text-accent">Curated journeys</p><h2 className="mt-2 font-heading text-2xl font-bold text-primary">25 Heritage Collections</h2></div>
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {COLLECTIONS.map((collection) => {
        const products = PRODUCTS.filter((p) => p.collections.includes(collection.id));
        const cover = products[0];
        return <article key={collection.id} className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-warm">
          <Link to="/collections/$collectionId" params={{ collectionId: collection.id }} aria-label={collection.name} className="block aspect-[2/1] overflow-hidden">{cover && <img src={cover.image} alt={collection.name} width={480} height={240} loading="lazy" className="h-full w-full object-cover" />}</Link>
          <div className="flex flex-1 flex-col p-4"><p className="text-xs font-medium text-accent">{products.length} sample products</p><h3 className="mt-2 font-heading text-lg font-semibold leading-snug text-primary">{collection.name}</h3><p className="mt-2 text-sm text-muted-foreground">{collection.description}</p><Button asChild variant="link" className="mt-4 h-auto justify-start p-0 text-accent"><Link to="/collections/$collectionId" params={{ collectionId: collection.id }}>View All <ArrowRight /></Link></Button></div>
        </article>;
      })}
    </div>
  </section>;
}