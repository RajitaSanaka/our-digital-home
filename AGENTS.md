<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep static educational catalogue rows in `src/data/catalogue.ts` and normalize profiles in `src/data/products.ts`; this preserves original craft IDs and avoids suggesting unverified commerce data is live.
- Use the shared `CatalogueGrid` and pure catalogue filtering helper for all-product and collection pages so search, ranking, favourites and progressive loading behave consistently.
- Collection pages use `/collections/$collectionId`, while existing product detail URLs stay under `/explore/$productId`, preserving navigation and saved links.
- Product sharing uses the shared helper to handle native-share cancellation and clipboard failures consistently.
