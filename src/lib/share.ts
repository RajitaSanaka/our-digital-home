import { toast } from "sonner";

export async function shareProduct(title: string, url: string) {
  if (navigator.share) {
    try { await navigator.share({ title, url }); return; }
    catch (error) { if (error instanceof DOMException && error.name === "AbortError") return; }
  }
  try { await navigator.clipboard.writeText(url); toast.success("Link copied to clipboard"); }
  catch { toast.error("Could not copy the link. Copy the product address from your browser."); }
}