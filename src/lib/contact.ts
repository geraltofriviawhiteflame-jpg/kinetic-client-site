export type ContactPayload = { name: string; email: string; message: string };

export async function submitContactMessage(payload: ContactPayload) {
  const url = (window as any).__SUPABASE_URL;
  const key = (window as any).__SUPABASE_ANON_KEY;

  if (url && key) {
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(url, key);
    const { error } = await supabase.from("contact_messages").insert({
      name: payload.name,
      email: payload.email,
      message: payload.message,
    });
    if (error) throw error;
    return { ok: true, method: "supabase" as const };
  }

  // Fallback: store locally so the form remains functional during setup
  const entry = { ...payload, createdAt: new Date().toISOString() };
  try {
    const raw = localStorage.getItem("contact_messages");
    const list = raw ? JSON.parse(raw) : [];
    list.push(entry);
    localStorage.setItem("contact_messages", JSON.stringify(list));
  } catch {}
  return { ok: true, method: "local" as const };
}
