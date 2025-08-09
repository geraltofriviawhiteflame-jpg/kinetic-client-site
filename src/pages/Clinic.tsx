import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DayPicker } from "react-day-picker";
import 'react-day-picker/dist/style.css';
import { toast } from "@/hooks/use-toast";
import clinicHero from "@/assets/hero-clinic.jpg";
import doctor1 from "@/assets/doctor-1.jpg";
import doctor2 from "@/assets/doctor-2.jpg";
import doctor3 from "@/assets/doctor-3.jpg";

const doctors = [
  { id: 1, name: "Dr. Aisha Khan", specialty: "Dentist", photo: doctor1 },
  { id: 2, name: "Dr. Liam Patel", specialty: "General Physician", photo: doctor2 },
  { id: 3, name: "Dr. Sofia Marin", specialty: "Cardiologist", photo: doctor3 },
];

const specialties = ["All", ...Array.from(new Set(doctors.map(d => d.specialty)))];

export default function Clinic() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedDoc, setSelectedDoc] = useState<number | null>(null);

  const visible = useMemo(() => {
    return doctors.filter(d => (filter === 'All' || d.specialty === filter) && d.name.toLowerCase().includes(query.toLowerCase()));
  }, [query, filter]);

  useEffect(() => { document.title = "Clinic Demo — Studio Nova"; }, []);

  return (
    <main>
      <section className="relative">
        <img src={clinicHero} alt="Clinic reception area" className="h-[40vh] w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/20" />
        <div className="container -mt-16 relative">
          <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="font-display text-4xl md:text-5xl">
            Willow Health Clinic
          </motion.h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">Search doctors, filter by specialty, and book your appointment smoothly.</p>
        </div>
      </section>

      <section className="container py-12" aria-labelledby="doctors-heading">
        <div className="flex flex-col md:flex-row md:items-end gap-3 justify-between mb-6">
          <div>
            <h2 id="doctors-heading" className="font-display text-3xl">Doctors</h2>
            <p className="text-muted-foreground">Trusted specialists ready to help.</p>
          </div>
          <div className="flex gap-2">
            {specialties.map(s => (
              <Button key={s} variant={filter === s ? 'hero' : 'outline'} onClick={() => setFilter(s)}>{s}</Button>
            ))}
          </div>
        </div>

        <div className="mb-6 max-w-md">
          <Label htmlFor="search">Search</Label>
          <Input id="search" placeholder="Search by name" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((d) => (
            <Card key={d.id} className="hover-scale overflow-hidden">
              <img src={d.photo} alt={`${d.name} — ${d.specialty}`} className="h-48 w-full object-cover" loading="lazy" />
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{d.name}</span>
                  <span className="text-primary text-sm">{d.specialty}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="hero" onClick={() => setSelectedDoc(d.id)}>Book Now</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Book Appointment — {d.name}</DialogTitle>
                    </DialogHeader>
                    <BookingForm doctor={d.name} />
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}

function BookingForm({ doctor }: { doctor: string }) {
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState<string | null>(null);
  const times = ["09:00", "10:30", "12:00", "14:00", "16:00"];

  return (
    <div className="grid gap-6">
      <div>
        <Label className="mb-2 block">Choose a Date</Label>
        <DayPicker mode="single" selected={date} onSelect={setDate} />
      </div>
      <div>
        <Label className="mb-2 block">Time Slot</Label>
        <div className="flex flex-wrap gap-2">
          {times.map(t => (
            <button
              key={t}
              className={`px-3 py-2 rounded-md border ${time === t ? 'bg-primary text-primary-foreground' : ''}`}
              onClick={() => setTime(t)}
              type="button"
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <form
        className="grid gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          const data = new FormData(e.currentTarget as HTMLFormElement);
          const name = data.get('name') as string;
          if (!date || !time) {
            return toast({ title: 'Select date & time', description: 'Please choose a date and a time slot.' });
          }
          toast({ title: 'Appointment requested', description: `${name}, ${doctor} will see you on ${date.toDateString()} at ${time}.` });
          (e.currentTarget as HTMLFormElement).reset();
        }}
      >
        <div className="grid gap-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" name="name" placeholder="John Doe" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" name="email" placeholder="john@example.com" required />
        </div>
        <Button variant="hero" className="mt-2">Confirm Appointment</Button>
      </form>
    </div>
  );
}
