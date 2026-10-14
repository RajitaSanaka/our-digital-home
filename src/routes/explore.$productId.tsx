import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Hammer, Heart, Landmark, Layers, MapPin, Share2 } from "lucide-react";
import { toast } from "sonner";
import { PRODUCTS } from "@/data/products";
import { useFavourites } from "@/lib/favorites";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/explore/$productId")({
  loader: ({ params }) => {
    const product = PRODUCTS.find((p) => p.id === params.productId);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    const title = p ? `${p.name} from ${p.state} — BharatRoots AI` : "Craft not found — BharatRoots AI";
    const description = p?.description ?? "This craft could not be found.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(p ? [] : [{ name: "robots", content: "noindex" }]),
      ],
    };
  },
  notFoundComponent: () => (
    <main className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="font-heading text-3xl font-bold text-primary">Craft not found</h1>
      <p className="mt-2 text-muted-foreground">We couldn't find that product in our catalogue.</p>
      <Link to="/explore" className="mt-6 inline-block rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground">
        Back to Explore
      </Link>
    </main>
  ),
  component: ProductDetail,
});

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const { isFavourite, toggle } = useFavourites();
  const fav = isFavourite(product.id);
  const related = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.state === product.state || p.category === product.category),
  ).slice(0, 3);

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: product.name, url });
        return;
      } catch {
        /* cancelled */
      }
    }
    await navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard");
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Link to="/explore" className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline">
        <ArrowLeft className="h-4 w-4" /> Back to all crafts
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-3xl border border-border shadow-warm-lg">
          <img src={product.image} alt={product.name} width={1024} height={1024} className="h-full w-full object-cover" />
        </div>

        <div className="animate-fade-up">
          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
            {product.category}
          </span>
          <h1 className="mt-4 font-heading text-3xl font-bold text-primary md:text-4xl">{product.name}</h1>
          <p className="mt-2 flex items-center gap-1 text-sm font-medium text-accent">
            <MapPin className="h-4 w-4" /> {product.state}
          </p>
          <p className="mt-4 text-muted-foreground">{product.description}</p>
          <p className="mt-4 text-lg font-semibold text-primary">
            {product.price} <span className="text-xs font-normal text-muted-foreground">(indicative market range)</span>
          </p>

          <div className="mt-6 flex gap-3">
            <button
              onClick={() => toggle(product.id)}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                fav ? "bg-accent text-accent-foreground" : "border border-input bg-card text-foreground hover:bg-secondary"
              }`}
            >
              <Heart className={`h-4 w-4 ${fav ? "fill-current" : ""}`} />
              {fav ? "Saved to favourites" : "Add to favourites"}
            </button>
            <button
              onClick={share}
              className="inline-flex items-center gap-2 rounded-full border border-input bg-card px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary"
            >
              <Share2 className="h-4 w-4" /> Share
            </button>
          </div>

          <div className="mt-8 space-y-4">
            <InfoBlock icon={Landmark} title="Cultural Significance">
              {product.significance}
            </InfoBlock>
            <InfoBlock icon={Layers} title="Materials">
              <ul className="flex flex-wrap gap-2">
                {product.materials.map((m) => (
                  <li key={m} className="rounded-full bg-muted px-3 py-1 text-xs text-foreground">{m}</li>
                ))}
              </ul>
            </InfoBlock>
            <InfoBlock icon={Hammer} title="Traditional Making Method">
              {product.method}
            </InfoBlock>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-heading text-2xl font-bold text-primary">You may also like</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

function InfoBlock({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Landmark;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <h3 className="flex items-center gap-2 font-heading text-lg font-semibold text-primary">
        <Icon className="h-5 w-5 text-gold" /> {title}
      </h3>
      <div className="mt-2 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </div>
  );
}
