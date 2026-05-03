import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, CheckCircle, Loader2, Send } from "lucide-react";
import { useSiteContent, DEFAULT_CONTENT } from "@/hooks/useSiteContent";

type Status = "idle" | "loading" | "success" | "error";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const { data: content } = useSiteContent();
  const s = content?.settings ?? DEFAULT_CONTENT.settings;

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json() as { success?: boolean; error?: string };
      if (data.success) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setErrorMsg(data.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Could not connect. Please check your connection and try again.");
    }
  };

  const contactItems = [
    { icon: Mail, label: "Email", value: s.email },
    { icon: Phone, label: "Phone", value: s.phone },
    { icon: MapPin, label: "Headquarters", value: s.address },
  ];

  return (
    <section id="contact" className="bg-foreground text-background">
      <div className="grid lg:grid-cols-2">

        {/* Left: Info + Form */}
        <div className="p-8 md:p-16 lg:p-24 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-block px-3 py-1 rounded-full bg-background/10 text-background text-sm font-bold tracking-wider mb-6 uppercase">
              Get In Touch
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-8 text-background" data-testid="heading-contact">
              Let's create change together.
            </h2>

            <div className="flex flex-col gap-5 mb-12">
              {contactItems.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-4 text-background/80">
                  <div className="w-12 h-12 rounded-full bg-background/10 flex items-center justify-center text-secondary flex-shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-background/50">{label}</p>
                    <p className="text-base font-semibold">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-background/5 border border-background/20 rounded-3xl p-10 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#F5C619]/20 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-[#F5C619]" />
                </div>
                <h3 className="text-2xl font-black text-background mb-2">Message Sent!</h3>
                <p className="text-background/60 text-sm mb-6">
                  Thank you for reaching out. We'll get back to you as soon as possible.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="bg-[#F5C619] text-[#061A32] px-6 py-3 rounded-full font-black text-sm hover:bg-[#F5C619]/90 transition-all"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form className="space-y-5" onSubmit={handleSubmit} data-testid="form-contact">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-background/60 uppercase tracking-wider">Full Name *</label>
                    <input
                      value={form.name}
                      onChange={set("name")}
                      placeholder="John Doe"
                      required
                      data-testid="input-name"
                      className="w-full bg-background/5 border border-background/20 text-background placeholder-background/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#F5C619]/60 transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-background/60 uppercase tracking-wider">Email Address *</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={set("email")}
                      placeholder="john@example.com"
                      required
                      data-testid="input-email"
                      className="w-full bg-background/5 border border-background/20 text-background placeholder-background/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#F5C619]/60 transition-colors"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-background/60 uppercase tracking-wider">Subject</label>
                  <input
                    value={form.subject}
                    onChange={set("subject")}
                    placeholder="How can we help?"
                    className="w-full bg-background/5 border border-background/20 text-background placeholder-background/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#F5C619]/60 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-background/60 uppercase tracking-wider">Message *</label>
                  <textarea
                    value={form.message}
                    onChange={set("message")}
                    placeholder="Tell us about your interest in Zeal Care…"
                    required
                    rows={5}
                    data-testid="input-message"
                    className="w-full bg-background/5 border border-background/20 text-background placeholder-background/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#F5C619]/60 transition-colors resize-none"
                  />
                </div>

                {status === "error" && (
                  <p className="text-red-400 text-sm font-semibold">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  data-testid="button-send"
                  className="flex items-center gap-2 bg-[#F5C619] text-[#061A32] px-8 py-4 rounded-full font-black text-sm hover:bg-[#F5C619]/90 transition-all hover:scale-105 disabled:opacity-60 disabled:scale-100 w-full md:w-auto justify-center"
                >
                  {status === "loading" ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  {status === "loading" ? "Sending…" : "Send Message"}
                </button>
              </form>
            )}
          </motion.div>
        </div>

        {/* Right: Decorative */}
        <div className="hidden lg:block bg-primary relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(hsl(var(--secondary))_1px,transparent_1px)] [background-size:40px_40px] opacity-10" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-10 px-12">
            <div className="text-primary-foreground/20 text-center">
              <MapPin className="w-24 h-24 mx-auto mb-4 opacity-40" />
              <h3 className="text-3xl font-extrabold uppercase tracking-widest">Liberia</h3>
              <p className="text-lg tracking-widest mt-1 opacity-60">West Africa</p>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
              {[
                { label: "Response Time", value: "< 24hrs" },
                { label: "Languages", value: "EN / FR" },
                { label: "Founded", value: "2017" },
                { label: "Location", value: s.address.split(",")[1]?.trim() ?? "Monrovia" },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white/5 rounded-2xl p-4 text-center border border-white/10">
                  <p className="text-[#F5C619] font-black text-lg">{value}</p>
                  <p className="text-white/40 text-xs font-semibold mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
