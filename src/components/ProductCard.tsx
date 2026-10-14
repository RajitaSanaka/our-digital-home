import { Link } from "@tanstack/react-router";
import { Heart, MapPin, Share2 } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/data/products";
import { useFavourites } from "@/lib/favorites";

export function ProductCard({ product }: { product: Product }) {
  const { isFavourite, toggle } = useFavourites();
  const fav = isFavourite(product.id);

  const share = async () => {
    const url = `${window.location.origin}/explore/${product.id}`;
    const text = `${product.name} — ${product.state} | BharatRoots AI`;
    if (navigator.share) {
      try {
        await navigator.share({ title: product.name, text, url });
        return;
      } catch {
        /* user cancelled */
      }
    }
    await navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard");
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-warm transition-transform hover:-translate-y-1">
      <Link
        to="/explore/$productId"
        params={{ productId: product.id }}
        className="relative block aspect-square overflow-hidden"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={1024}
          height={1024}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-background/85 px-3 py-1 text-xs font-medium text-primary backdrop-blur">
          {product.category}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <Link
            to="/explore/$productId"
            params={{ productId: product.id }}
            className="font-heading text-lg font-semibold leading-snug text-foreground hover:text-accent"
          >
            {product.name}
          </Link>
          <div className="flex shrink-0 gap-1">
            <button
              onClick={() => toggle(product.id)}
              aria-label={fav ? "Remove from favourites" : "Add to favourites"}
              className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-accent"
            >
              <Heart className={`h-5 w-5 ${fav ? "fill-accent text-accent" : ""}`} />
            </button>
            <button
              onClick={share}
              aria-label="Share product"
              className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
            >
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>

        <p className="mt-1 flex items-center gap-1 text-xs font-medium text-accent">
          <MapPin className="h-3.5 w-3.5" /> {product.state}
        </p>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{product.description}</p>

        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-sm font-semibold text-primary">{product.price}</span>
          <Link
            to="/explore/$productId"
            params={{ productId: product.id }}
            className="rounded-full bg-secondary px-4 py-1.5 text-xs font-semibold text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            View details
          </Link>
        </div>
      </div>
    </article>
  );
}
