import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, Sparkles, GaugeCircle, Layout, Wand2, ShoppingCart } from "lucide-react";

const services = [
  { icon: <Layout />, title: "Web Design", desc: "Conversion‑focused, responsive layouts." },
  { icon: <Code2 />, title: "Web Development", desc: "Robust React + TypeScript builds." },
  { icon: <GaugeCircle />, title: "Performance", desc: "Lighthouse‑green, best practices." },
  { icon: <Sparkles />, title: "Animations", desc: "Framer Motion micro‑interactions." },
  { icon: <Wand2 />, title: "Branding", desc: "Cohesive visual systems & tone." },
  { icon: <ShoppingCart />, title: "E‑commerce", desc: "Headless storefronts that scale." },
];

const clients = [
  "Blue Harbor Cafe", "Urban Greens", "Vista Dental", "Peak Fitness",
  "Paper & Ink", "Sunrise Clinic", "Magma Bistro", "Nordic Spa"
];

const Index = () => {
  useEffect(() => {
    document.title = "Studio Nova — Modern Web Experiences";
  }, []);

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Studio Nova",
    url: "/",
    logo: "/favicon.ico",
    sameAs: ["https://lovable.dev"],
  };

  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-20" aria-hidden />
        <div className="container min-h-[70vh] flex items-center py-20">
          <div className="max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-display text-4xl md:text-6xl leading-tight"
            >
              We build modern, animated websites that convert
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-4 text-lg text-muted-foreground"
            >
              Explore two live demos — a Restaurant site and a Clinic booking system —
              showcasing UI depth, motion, and usability.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 flex items-center gap-3"
            >
              <Button asChild variant="hero" size="xl" className="hover-scale">
                <Link to="/restaurant">View Restaurant Demo</Link>
              </Button>
              <Button asChild variant="outline" size="xl">
                <Link to="/clinic">Explore Clinic Demo</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="container py-16" aria-labelledby="services-heading">
        <h2 id="services-heading" className="font-display text-3xl mb-8">Services</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Card key={s.title} className="hover-scale">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <span className="text-primary">{s.icon}</span>
                  {s.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">{s.desc}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="container py-16" aria-labelledby="portfolio-heading">
        <h2 id="portfolio-heading" className="font-display text-3xl mb-8">Featured Demos</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Restaurant Experience</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Hero, animated menu, reservation form, gallery + testimonials.</p>
              <Button asChild variant="hero">
                <Link to="/restaurant">Open Restaurant Demo</Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Clinic Booking System</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Doctors catalog, filters, calendar booking, animated forms.</p>
              <Button asChild variant="hero">
                <Link to="/clinic">Open Clinic Demo</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="container py-16" aria-labelledby="clients-heading">
        <h2 id="clients-heading" className="font-display text-3xl mb-8">Clients</h2>
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
          {clients.map((c) => (
            <div key={c} className="rounded-md border p-4 text-center text-sm">{c}</div>
          ))}
        </div>
      </section>

      <section className="container py-16 text-center">
        <div className="rounded-xl border p-10 bg-popover">
          <h3 className="font-display text-2xl mb-3">Ready to elevate your website?</h3>
          <p className="text-muted-foreground mb-6">Let's create something beautiful and effective together.</p>
          <Button asChild variant="hero" size="xl">
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
    </main>
  );
};

export default Index;
