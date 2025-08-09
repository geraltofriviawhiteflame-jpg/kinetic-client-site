import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

export default function Contact() {
  useEffect(() => { document.title = "Contact — Studio Nova"; }, []);

  return (
    <main className="container py-16" aria-labelledby="contact-heading">
      <h1 id="contact-heading" className="font-display text-4xl mb-2">Contact Us</h1>
      <p className="text-muted-foreground mb-8 max-w-2xl">Tell us about your project — timelines, goals, and any reference websites you like. We'll get back within 24h.</p>
      <form
        className="grid gap-4 max-w-2xl"
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.currentTarget as HTMLFormElement;
          const data = new FormData(form);
          const name = String(data.get('name') || '');
          const email = String(data.get('email') || '');
          const message = String(data.get('message') || '');
          try {
            const { submitContactMessage } = await import("@/lib/contact");
            await submitContactMessage({ name, email, message });
            toast({ title: "Message sent", description: `Thanks ${name}, we'll reach out soon.` });
            form.reset();
          } catch (err: any) {
            toast({ title: "Unable to send", description: err?.message || "Please try again later." });
          }
        }}
      >
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" placeholder="Your name" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" name="email" placeholder="you@example.com" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="message">Project details</Label>
          <Textarea id="message" name="message" placeholder="What are you building?" rows={6} required />
        </div>
        <Button variant="hero" size="xl">Send Message</Button>
      </form>
    </main>
  );
}
