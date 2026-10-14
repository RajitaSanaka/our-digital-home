import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Sprout, X } from "lucide-react";
import { useState } from "react";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/explore", label: "Explore Heritage" },
  { to: "/dashboard", label: "Entrepreneur Dashboard" },
  { to: "/assistant", label: "AI Assistant" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Sprout className="h-5 w-5" />
          </span>
          <span className="font-heading text-xl font-bold text-primary">
            BharatRoots <span className="text-accent">AI</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                pathname === l.to
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-secondary"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          className="rounded-md p-2 text-foreground md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-border bg-background px-4 py-3 md:hidden">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={`block rounded-lg px-4 py-3 text-sm font-medium ${
                pathname === l.to
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-secondary"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
