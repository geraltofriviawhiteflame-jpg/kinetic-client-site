import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import restaurantHero from "@/assets/hero-restaurant.jpg";
import dish1 from "@/assets/dish-1.jpg";
import dish2 from "@/assets/dish-2.jpg";
import dish3 from "@/assets/dish-3.jpg";

const dishes = [
  { id: 1, name: "Truffle Arancini", price: 12, category: "Starters", img: dish1, desc: "Crispy risotto balls, parmesan, basil aioli." },
  { id: 2, name: "Herb Roasted Salmon", price: 24, category: "Main", img: dish2, desc: "Seasonal greens, lemon beurre blanc." },
  { id: 3, name: "Chocolate Lava Cake", price: 10, category: "Dessert", img: dish3, desc: "Warm center, vanilla bean ice cream." },
];

const categories = Array.from(new Set(dishes.map(d => d.category)));

export default function Restaurant() {
  const [filter, setFilter] = useState<string>("All");
  const visible = useMemo(() => filter === "All" ? dishes : dishes.filter(d => d.category === filter), [filter]);

  useEffect(() => { document.title = "Restaurant Demo — Studio Nova"; }, []);

  return (
    <main>
      <section className="relative">
        <img src={restaurantHero} alt="Elegant restaurant interior" className="h-[40vh] w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/20" />
        <div className="container -mt-16 relative">
          <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="font-display text-4xl md:text-5xl">
            Aurora Bistro
          </motion.h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">Fine dining with a seasonal menu. Reserve your table below or explore our signature dishes.</p>
        </div>
      </section>

      <section className="container py-12" aria-labelledby="menu-heading">
        <div className="flex items-center justify-between mb-6">
          <h2 id="menu-heading" className="font-display text-3xl">Menu</h2>
          <div className="flex gap-2">
            <Button variant={filter === "All" ? "hero" : "outline"} onClick={() => setFilter("All")}>All</Button>
            {categories.map(c => (
              <Button key={c} variant={filter === c ? "hero" : "outline"} onClick={() => setFilter(c)}>{c}</Button>
            ))}
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((d) => (
            <Dialog key={d.id}>
              <DialogTrigger asChild>
                <Card className="cursor-pointer hover-scale overflow-hidden">
                  <img src={d.img} alt={`${d.name} plated dish`} className="h-40 w-full object-cover" loading="lazy" />
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{d.name}</span>
                      <span className="text-primary">${d.price}</span>
                    </CardTitle>
                  </CardHeader>
                </Card>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{d.name}</DialogTitle>
                </DialogHeader>
                <p className="text-muted-foreground">{d.desc}</p>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </section>

      <section className="container py-12 grid gap-8 md:grid-cols-2" aria-labelledby="reserve-heading">
        <div>
          <h2 id="reserve-heading" className="font-display text-3xl mb-4">Reservation</h2>
          <form
            className="grid gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget as HTMLFormElement);
              const name = data.get('name') as string;
              toast({ title: "Reservation requested", description: `Thanks ${name}, we'll confirm shortly.` });
              (e.currentTarget as HTMLFormElement).reset();
            }}
          >
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="Jane Doe" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" name="email" placeholder="jane@example.com" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" name="date" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="guests">Guests</Label>
              <Input id="guests" type="number" min={1} max={10} name="guests" required />
            </div>
            <Button variant="hero" className="mt-2">Book a Table</Button>
          </form>
        </div>
        <div>
          <h3 className="font-display text-2xl mb-4">Gallery & Testimonials</h3>
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground">“The best dining experience we’ve had this year. Flawless service.” — Blue Harbor Cafe</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
