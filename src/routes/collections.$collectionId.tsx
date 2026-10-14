import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { COLLECTIONS, PRODUCTS } from "@/data/products";
import { CatalogueGrid } from "@/components/CatalogueGrid";

export const Route = createFileRoute("/collections/$collectionId")({
  loader: ({ params }) => { const collection = COLLECTIONS.find((c) => c.id === params.collectionId); if (!collection) throw notFound(); return { collection }; },
  head: ({ loaderData }) => {
    const title = `${loaderData?.collection.name ?? "Collection unavailable"} — BharatRoots AI`;
    const description = loaderData?.collection.description ?? "Browse Indian heritage collections on BharatRoots AI.";
    return { meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }, ...(loaderData ? [] : [{ name: "robots", content: "noindex" }])] };
  },
  notFoundComponent: () => <main className="mx-auto max-w-xl px-4 py-20 text-center"><h1 className="font-heading text-3xl text-primary">Collection unavailable</h1><Link to="/explore" className="mt-6 inline-block text-accent">Back to Explore</Link></main>,
  component: CollectionPage,
});
function CollectionPage() {
  const { collection } = Route.useLoaderData();
  const products = PRODUCTS.filter((p) => p.collections.includes(collection.id));
  return <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6"><Link to="/explore" className="inline-flex items-center gap-1 text-sm text-accent"><ArrowLeft className="h-4 w-4" />Back to all crafts</Link><p className="mt-8 text-xs font-bold uppercase tracking-widest text-accent">Heritage collection</p><h1 className="mt-2 max-w-4xl font-heading text-3xl font-bold text-primary md:text-4xl">{collection.name}</h1><p className="mt-3 text-muted-foreground">{collection.description}</p><p className="mt-4 border-l-2 border-gold pl-4 text-sm text-muted-foreground">Sample catalogue · Illustrative images and prices. Popularity, likes and significance rankings are demonstration data, not verified metrics. No sellers or availability are listed.</p><CatalogueGrid products={products} /></main>;
}