import { Link } from "react-router-dom";

export function SiteFooter() {
  return (
    <footer className="border-t mt-16">
      <div className="container py-10 grid gap-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="h-6 w-6 rounded bg-gradient-primary" aria-hidden />
            <span className="font-display">Studio Nova</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-sm">
            We craft modern, animated, high‑performance websites using React.
          </p>
        </div>
        <nav className="grid gap-2" aria-label="Footer Navigation">
          <Link to="/restaurant" className="text-sm story-link">Restaurant Demo</Link>
          <Link to="/clinic" className="text-sm story-link">Clinic Demo</Link>
          <Link to="/contact" className="text-sm story-link">Contact</Link>
        </nav>
        <div className="text-sm text-muted-foreground md:text-right">
          © {new Date().getFullYear()} Studio Nova. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
