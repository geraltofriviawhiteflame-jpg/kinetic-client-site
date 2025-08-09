import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/restaurant", label: "Restaurant" },
  { to: "/clinic", label: "Clinic" },
  { to: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-gradient-primary shadow-glow" aria-hidden />
          <span className="font-display text-lg">Studio Nova</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6" aria-label="Main Navigation">
          {navItems.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                `text-sm transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'} story-link`
              }
            >
              {n.label}
            </NavLink>
          ))}
          <Button asChild variant="hero" size="sm" className="ml-2">
            <Link to="/contact">Get a Quote</Link>
          </Button>
        </nav>
        <button
          className="md:hidden inline-flex items-center justify-center rounded-md border p-2 hover:bg-accent"
          aria-label="Toggle Menu"
          onClick={() => setOpen((v) => !v)}
        >
          <Menu />
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t bg-background">
          <div className="container py-4 flex flex-col gap-3">
            {navItems.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `text-sm ${isActive ? 'text-primary' : 'text-foreground'} hover-scale`
                }
              >
                {n.label}
              </NavLink>
            ))}
            <Button asChild variant="hero">
              <Link to="/contact" onClick={() => setOpen(false)}>Get a Quote</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
