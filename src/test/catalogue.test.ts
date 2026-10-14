import { describe, expect, it } from "vitest";
import { PRODUCTS, COLLECTIONS, STATES } from "@/data/products";
import { DEFAULT_FILTERS, filterCatalogue } from "@/lib/catalogue";

describe("Expanded heritage catalogue", () => {
  it("contains unique illustrated profiles, all collections and every Indian state and UT", () => {
    expect(PRODUCTS.length).toBeGreaterThanOrEqual(100);
    expect(new Set(PRODUCTS.map((p) => p.id)).size).toBe(PRODUCTS.length);
    expect(COLLECTIONS).toHaveLength(25);
    expect(STATES).toHaveLength(36);
    for (const c of COLLECTIONS) expect(PRODUCTS.filter((p) => p.collections.includes(c.id)).length).toBeGreaterThanOrEqual(5);
    for (const p of PRODUCTS) { expect(p.image).toBeTruthy(); expect(p.materials.length).toBeGreaterThan(0); expect(p.price).toContain("sample price"); expect(p.significance).toBeTruthy(); }
  });
  it("preserves original product URLs", () => {
    for (const id of ["kalamkari-textiles", "kondapalli-toys", "pochampally-ikat", "jaipur-blue-pottery", "madhubani-painting", "channapatna-toys", "banarasi-silk-saree"]) expect(PRODUCTS.some((p) => p.id === id)).toBe(true);
  });
  it("combines material search, region, price, type, popularity and favourites", () => {
    expect(filterCatalogue(PRODUCTS, { ...DEFAULT_FILTERS, query: "bamboo", state: "Assam" }, []).every((p) => p.state === "Assam")).toBe(true);
    const p = PRODUCTS[0]; if (!p) throw new Error("Missing sample");
    expect(filterCatalogue(PRODUCTS, { ...DEFAULT_FILTERS, favouritesOnly: true }, [p.id])).toEqual([p]);
    expect(filterCatalogue(PRODUCTS, { ...DEFAULT_FILTERS, price: "budget" }, []).every((p) => p.demoPrice <= 1000)).toBe(true);
    expect(filterCatalogue(PRODUCTS, { ...DEFAULT_FILTERS, type: "Food & pantry", popularity: "popular" }, []).every((p) => p.productType === "Food & pantry" && p.popularity >= 70)).toBe(true);
  });
  it("sorts all six requested rankings", () => {
    const rankings = { highest: "demoPrice", lowest: "demoPrice", popular: "popularity", newest: "addedOrder", liked: "likes", traditional: "traditionalRank" } as const;
    for (const [sort, field] of Object.entries(rankings)) {
      const result = filterCatalogue(PRODUCTS, { ...DEFAULT_FILTERS, sort }, []);
      for (let i = 1; i < result.length; i++) { const prev = result[i - 1]; const current = result[i]; if (!prev || !current) continue; expect(sort === "lowest" ? prev[field] <= current[field] : prev[field] >= current[field]).toBe(true); }
    }
  });
});