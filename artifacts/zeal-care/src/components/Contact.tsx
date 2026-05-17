import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, CheckCircle, Loader2, Send } from "lucide-react";
import { useSiteContent, DEFAULT_CONTENT } from "@/hooks/useSiteContent";
import { useTranslation } from "react-i18next";

type Status = "idle" | "loading" | "success" | "error";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const { data: content } = useSiteContent();
  const { t } = useTranslation();
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
    { icon: Mail, label: t("contact.email"), value: s.email },
    { icon: Phone, label: t("contact.phone"), value: s.phone },
    { icon: MapPin, label: t("contact.location"), value: s.address },
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
              {t("contact.badge")}
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-8 text-background" data-testid="heading-contact">
              {t("contact.title")}
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
                <div className="w-16 h-16 rounded-full bg-[#FBD308]/20 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-[#FBD308]" />
                </div>
                <h3 className="text-2xl font-black text-background mb-2">{t("contact.successTitle")}</h3>
                <p className="text-background/60 text-sm mb-6">{t("contact.successMsg")}</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="bg-[#FBD308] text-[#061A32] px-6 py-3 rounded-full font-black text-sm hover:bg-[#FBD308]/90 transition-all"
                >
                  {t("contact.sendAnother")}
                </button>
              </motion.div>
            ) : (
              <form className="space-y-5" onSubmit={handleSubmit} data-testid="form-contact">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-background/60 uppercase tracking-wider">{t("contact.name")} *</label>
                    <input
                      value={form.name}
                      onChange={set("name")}
                      placeholder="John Doe"
                      required
                      data-testid="input-name"
                      className="w-full bg-background/5 border border-background/20 text-background placeholder-background/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FBD308]/60 transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-background/60 uppercase tracking-wider">{t("contact.email")} *</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={set("email")}
                      placeholder="john@example.com"
                      required
                      data-testid="input-email"
                      className="w-full bg-background/5 border border-background/20 text-background placeholder-background/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FBD308]/60 transition-colors"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-background/60 uppercase tracking-wider">{t("contact.subject")}</label>
                  <input
                    value={form.subject}
                    onChange={set("subject")}
                    placeholder="How can we help?"
                    className="w-full bg-background/5 border border-background/20 text-background placeholder-background/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FBD308]/60 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-background/60 uppercase tracking-wider">{t("contact.message")} *</label>
                  <textarea
                    value={form.message}
                    onChange={set("message")}
                    placeholder="Tell us about your interest in Zeal Care…"
                    required
                    rows={5}
                    data-testid="input-message"
                    className="w-full bg-background/5 border border-background/20 text-background placeholder-background/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FBD308]/60 transition-colors resize-none"
                  />
                </div>

                {status === "error" && (
                  <p className="text-red-400 text-sm font-semibold">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  data-testid="button-send"
                  className="flex items-center gap-2 bg-[#FBD308] text-[#061A32] px-8 py-4 rounded-full font-black text-sm hover:bg-[#FBD308]/90 transition-all hover:scale-105 disabled:opacity-60 disabled:scale-100 w-full md:w-auto justify-center"
                >
                  {status === "loading" ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  {status === "loading" ? t("contact.sending") : t("contact.send")}
                </button>
              </form>
            )}
          </motion.div>
        </div>

        {/* Right: Liberia map background */}
        <div className="hidden lg:flex relative overflow-hidden min-h-[500px]">
          {/* Background image */}
          <img
            src="/liberia-map.png"
            alt="Liberia, West Africa"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          {/* Dark navy overlay so text stays legible */}
          <div className="absolute inset-0 bg-[#061A32]/70" />
          {/* Subtle dot pattern on top */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:36px_36px]" />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center gap-10 px-12 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <MapPin className="w-20 h-20 mx-auto mb-4 text-[#FBD308] drop-shadow-lg" />
              <h3 className="text-4xl font-black uppercase tracking-widest text-white drop-shadow">Liberia</h3>
              <p className="text-base tracking-[0.3em] mt-2 text-white/60 uppercase">West Africa</p>
            </motion.div>

            <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
              {[
                { label: "Response Time", value: "< 24hrs" },
                { label: "Languages", value: "EN / FR / AR" },
                { label: "Founded", value: "2017" },
                { label: "Location", value: s.address.split(",")[1]?.trim() ?? "Monrovia" },
              ].map(({ label, value }) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20"
                >
                  <p className="text-[#FBD308] font-black text-lg drop-shadow">{value}</p>
                  <p className="text-white/50 text-xs font-semibold mt-0.5 uppercase tracking-wider">{label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
