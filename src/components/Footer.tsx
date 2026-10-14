import { Link } from "@tanstack/react-router";
import { Sprout } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <Sprout className="h-6 w-6 text-gold" />
            <span className="font-heading text-lg font-bold">BharatRoots AI</span>
          </div>
          <p className="mt-3 text-sm text-primary-foreground/80">
            Discover India's Heritage. Empower Local Entrepreneurs.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gold">Explore</h3>
          <ul className="mt-3 space-y-2 text-sm text-primary-foreground/80">
            <li><Link to="/explore" className="hover:text-gold">Traditional Products</Link></li>
            <li><Link to="/dashboard" className="hover:text-gold">Entrepreneur Dashboard</Link></li>
            <li><Link to="/assistant" className="hover:text-gold">AI Business Assistant</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gold">Note</h3>
          <p className="mt-3 text-sm text-primary-foreground/80">
            This is a demonstration platform. All products, statistics and assistant
            responses are illustrative sample content.
          </p>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15 py-4 text-center text-xs text-primary-foreground/60">
        © 2026 BharatRoots AI — Demonstration Project
      </div>
    </footer>
  );
}
