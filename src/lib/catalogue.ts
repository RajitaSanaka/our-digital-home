import type { Product } from "@/data/products";

export interface CatalogueFilters { query: string; state: string; category: string; type: string; price: string; popularity: string; sort: string; favouritesOnly: boolean; }
export const DEFAULT_FILTERS: CatalogueFilters = { query: "", state: "all", category: "all", type: "all", price: "all", popularity: "all", sort: "featured", favouritesOnly: false };
export function filterCatalogue(products: Product[], filters: CatalogueFilters, favourites: string[]) {
  const query = filters.query.trim().toLowerCase();
  const results = products.filter((p) => {
    if (filters.state !== "all" && p.state !== filters.state) return false;
    if (filters.category !== "all" && p.category !== filters.category) return false;
    if (filters.type !== "all" && p.productType !== filters.type) return false;
    if (filters.favouritesOnly && !favourites.includes(p.id)) return false;
    if (filters.popularity === "popular" && p.popularity < 70) return false;
    if (filters.popularity === "liked" && p.likes < 150) return false;
    if (filters.price === "budget" && p.demoPrice > 1000) return false;
    if (filters.price === "mid" && (p.demoPrice <= 1000 || p.demoPrice > 5000)) return false;
    if (filters.price === "premium" && (p.demoPrice <= 5000 || p.demoPrice > 15000)) return false;
    if (filters.price === "luxury" && p.demoPrice <= 15000) return false;
    return !query || [p.name, p.state, p.category, p.description, ...p.materials].some((v) => v.toLowerCase().includes(query));
  });
  return results.sort((a, b) => {
    switch (filters.sort) {
      case "popular": return b.popularity - a.popularity;
      case "highest": return b.demoPrice - a.demoPrice;
      case "lowest": return a.demoPrice - b.demoPrice;
      case "newest": return b.addedOrder - a.addedOrder;
      case "liked": return b.likes - a.likes;
      case "traditional": return b.traditionalRank - a.traditionalRank;
      default: return a.addedOrder - b.addedOrder;
    }
  });
}