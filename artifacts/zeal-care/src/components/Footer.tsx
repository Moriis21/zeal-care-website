import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Facebook, Instagram, Linkedin, Send, CheckCircle, Loader2, MapPin, Mail, Phone, Heart, ArrowUpRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useDonate } from "@/context/DonateContext";
import { useSiteContent, DEFAULT_CONTENT } from "@/hooks/useSiteContent";
import { useTranslation } from "react-i18next";

function NewsletterInline() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json() as { success?: boolean; alreadySubscribed?: boolean; error?: string };
      if (data.success) {
        setStatus("success");
        setMsg(data.alreadySubscribed ? "You're already on our list!" : "You're subscribed — thank you!");
        setEmail("");
      } else {
        setStatus("error");
        setMsg(data.error ?? "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMsg("Could not connect. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="flex items-center gap-3 bg-[#F5C619]/15 border border-[#F5C619]/30 rounded-2xl px-5 py-3.5">
        <CheckCircle className="w-5 h-5 text-[#F5C619] flex-shrink-0" />
        <p className="text-sm text-white/80 font-semibold">{msg}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        required
        className="flex-1 min-w-0 bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/35 focus:outline-none focus:border-[#F5C619]/60 transition-colors"
      />
      <button
        type="submit"
        disabled={status === "loading" || !email}
        className="bg-[#F5C619] text-[#061A32] px-5 py-3 rounded-xl font-black text-sm hover:bg-[#F5C619]/90 transition-all disabled:opacity-50 flex items-center gap-1.5 shrink-0"
      >
        {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        <span className="hidden sm:inline">Subscribe</span>
      </button>
      {status === "error" && (
        <p className="absolute mt-14 text-red-400 text-xs font-semibold">{msg}</p>
      )}
    </form>
  );
}

const ColHeader = ({ label }: { label: string }) => (
  <div className="flex items-center gap-2 mb-6">
    <span className="w-2 h-2 rounded-full bg-[#F5C619] flex-shrink-0" />
    <h4 className="font-black text-xs uppercase tracking-[0.2em] text-white/90">{label}</h4>
  </div>
);

const FooterLink = ({ href, children, onClick }: { href?: string; children: React.ReactNode; onClick?: () => void }) => {
  const base = "flex items-center gap-2 text-white/50 hover:text-[#F5C619] transition-colors text-sm group py-0.5";
  const dash = <span className="text-white/20 group-hover:text-[#F5C619]/60 transition-colors">—</span>;
  if (onClick) return (
    <button onClick={onClick} className={base}>{dash}{children}</button>
  );
  if (href?.startsWith("/")) return (
    <Link href={href} className={base}>{dash}{children}</Link>
  );
  return (
    <a href={href} className={base}>{dash}{children}</a>
  );
};

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { data: content } = useSiteContent();
  const { t } = useTranslation();
  const { openDonate } = useDonate();
  const home = content?.home ?? DEFAULT_CONTENT.home;
  const [location] = useLocation();
  const s = content?.settings ?? DEFAULT_CONTENT.settings;
  const isHome = location === "/";

  const handleContact = (e: React.MouseEvent) => {
    if (isHome) {
      e.preventDefault();
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const socialLinks = [
    { icon: Facebook, href: s.facebook || "https://www.facebook.com/profile.php?id=61561063778243", label: "Facebook" },
    { icon: Instagram, href: s.instagram || "https://www.instagram.com/zealcare2024?igsh=MTU2emRiMHBmd3d1Zw==", label: "Instagram" },
    { icon: Linkedin, href: s.linkedin || "https://www.linkedin.com/company/zeal-care", label: "LinkedIn" },
  ];

  return (
    <footer className="relative bg-[#061A32] text-white overflow-hidden">

      {/* ── Dot texture overlay ── */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

      {/* ── Glow blobs ── */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#1A44C0]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#F5C619]/6 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 lg:px-8">

        {/* ══════════════════════════════════════════
            CTA BANNER
        ══════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1A44C0]/60 to-[#061A32]/80 border border-white/10 backdrop-blur-sm p-10 lg:p-12 mt-0 pt-16"
          style={{ marginTop: 0 }}
        >
          {/* Decorative gold circle */}
          <div className="absolute -top-6 right-12 w-20 h-20 bg-[#F5C619] rounded-full opacity-90 shadow-lg shadow-[#F5C619]/30" />
          <div className="absolute -top-2 right-8 w-8 h-8 bg-[#F5C619]/40 rounded-full blur-sm" />

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-bold tracking-widest uppercase mb-5 text-white/80">
                <Sparkles className="w-3 h-3 text-[#F5C619]" />
                {home.footerCtaBadge}
              </div>
              <h2 className="text-3xl lg:text-4xl font-black leading-tight mb-4">
                {home.footerCtaTitle}
              </h2>
              <p className="text-white/60 text-base leading-relaxed max-w-md">
                {home.footerCtaSubtitle}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 lg:items-end xl:items-center lg:justify-end">
              <button
                onClick={() => openDonate(150)}
                className="group flex items-center justify-center gap-2 bg-[#F5C619] text-[#061A32] px-8 py-4 rounded-2xl font-black text-sm hover:bg-[#F5C619]/90 hover:scale-105 transition-all shadow-xl shadow-[#F5C619]/20"
              >
                <Heart className="w-4 h-4 fill-current" />
                Become a Donor
              </button>
              <a
                href="mailto:zealcare24@gmail.com?subject=Volunteer%20Inquiry%20—%20Zeal%20Care"
                className="group flex items-center justify-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-2xl font-black text-sm hover:border-white/70 hover:bg-white/8 transition-all"
              >
                Volunteer Now
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Newsletter strip inside banner */}
          <div className="mt-8 pt-8 border-t border-white/10">
            <div className="grid sm:grid-cols-2 gap-4 items-center">
              <div>
                <p className="text-sm font-bold text-white/80 mb-0.5">{home.footerNewsletterTitle}</p>
                <p className="text-xs text-white/40">{home.footerNewsletterDesc}</p>
              </div>
              <NewsletterInline />
            </div>
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════
            MAIN FOOTER GRID
        ══════════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr] gap-12 py-16 border-b border-white/8">

          {/* ── Brand column ── */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
              <img src="/logo.png" alt="Zeal Care" className="h-10 w-auto object-contain group-hover:scale-105 transition-transform" />
              <span className="text-xl font-black tracking-wide text-white">ZEAL CARE</span>
            </Link>

            <p className="text-white/50 text-sm leading-relaxed mb-7 max-w-xs">
              {t("footer.tagline")}
            </p>

            <div className="mb-5">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-white/30 mb-3">Follow the Journey</p>
              <div className="flex gap-2">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 rounded-xl bg-white/6 border border-white/10 flex items-center justify-center hover:bg-[#F5C619] hover:border-[#F5C619] hover:text-[#061A32] transition-all hover:scale-110"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── Organization ── */}
          <div>
            <ColHeader label="Organization" />
            <ul className="space-y-2.5">
              <li><FooterLink href="/about">{t("footer.links.about")}</FooterLink></li>
              <li><FooterLink href="/who-we-are">{t("nav.whoWeAre")}</FooterLink></li>
              <li><FooterLink href="/about/our-values">Our Values</FooterLink></li>
              <li><FooterLink href="/about/accountability">Accountability</FooterLink></li>
              <li><FooterLink href="/about/our-goals">Our Goals</FooterLink></li>
            </ul>
          </div>

          {/* ── Impact ── */}
          <div>
            <ColHeader label="Impact" />
            <ul className="space-y-2.5">
              <li><FooterLink href="/what-we-do">{t("nav.whatWeDo")}</FooterLink></li>
              <li><FooterLink href="/why-empowerment">{t("nav.whyEmpowerment")}</FooterLink></li>
              <li><FooterLink href="/media">News & Stories</FooterLink></li>
              <li><FooterLink href="/igniting-potential">Ways to Give</FooterLink></li>
              <li><FooterLink onClick={() => openDonate(150)}>Sponsor a Child</FooterLink></li>
            </ul>
          </div>

          {/* ── Get in touch ── */}
          <div>
            <ColHeader label="Get in Touch" />
            <ul className="space-y-4">
              <li>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(s.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-white/50 hover:text-[#F5C619] transition-colors group"
                >
                  <div className="w-8 h-8 rounded-xl bg-white/6 border border-white/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#F5C619]/15 group-hover:border-[#F5C619]/30 transition-all">
                    <MapPin className="w-3.5 h-3.5 text-[#F5C619]" />
                  </div>
                  <span className="text-sm leading-relaxed">{s.address}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${s.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 text-white/50 hover:text-[#F5C619] transition-colors group"
                >
                  <div className="w-8 h-8 rounded-xl bg-white/6 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#F5C619]/15 group-hover:border-[#F5C619]/30 transition-all">
                    <Phone className="w-3.5 h-3.5 text-[#F5C619]" />
                  </div>
                  <span className="text-sm">{s.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${s.email}`}
                  className="flex items-center gap-3 text-white/50 hover:text-[#F5C619] transition-colors group"
                >
                  <div className="w-8 h-8 rounded-xl bg-white/6 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#F5C619]/15 group-hover:border-[#F5C619]/30 transition-all">
                    <Mail className="w-3.5 h-3.5 text-[#F5C619]" />
                  </div>
                  <span className="text-sm">{s.email}</span>
                </a>
              </li>
            </ul>

            {/* Contact Us link */}
            <a
              href={isHome ? "#contact" : "/#contact"}
              onClick={handleContact}
              className="inline-flex items-center gap-2 mt-6 text-xs font-black uppercase tracking-widest text-[#F5C619]/70 hover:text-[#F5C619] transition-colors group"
            >
              Send us a message
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

        </div>

        {/* ══════════════════════════════════════════
            BOTTOM BAR
        ══════════════════════════════════════════ */}
        <div className="py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-white/30 text-xs">
          <p>
            &copy; {currentYear} Zeal Care. All rights reserved. Monrovia, Liberia.
            <a href="/admin" className="ml-2 opacity-20 hover:opacity-40 transition-opacity select-none" title="Admin">·</a>
          </p>
          <p>
            Built by{" "}
            <a
              href="https://wa.me/231770787020"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-[#F5C619] transition-colors font-semibold"
            >
              Morris L. Dorley Jr
            </a>
          </p>
          <div className="flex gap-5">
            <a href="mailto:info@zealcare.org?subject=Privacy%20Policy%20Inquiry" className="hover:text-white/60 transition-colors">Privacy Policy</a>
            <a href="mailto:info@zealcare.org?subject=Terms%20of%20Service%20Inquiry" className="hover:text-white/60 transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
