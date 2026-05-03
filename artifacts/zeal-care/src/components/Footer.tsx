import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Facebook, Twitter, Instagram, Linkedin, Send, CheckCircle, Loader2, MapPin, Mail, Phone, Heart } from "lucide-react";
import { useDonate } from "@/context/DonateContext";
import { useSiteContent, DEFAULT_CONTENT } from "@/hooks/useSiteContent";
import { useTranslation } from "react-i18next";

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [msg, setMsg] = useState("");
  const { t } = useTranslation();

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
        setMsg(data.alreadySubscribed ? "You're already on our list — thank you!" : t("footer.subscribeSuccess"));
        setEmail("");
      } else {
        setStatus("error");
        setMsg(data.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMsg("Could not connect. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="flex items-center gap-3 bg-[#F5C619]/10 border border-[#F5C619]/30 rounded-2xl px-5 py-4">
        <CheckCircle className="w-5 h-5 text-[#F5C619] flex-shrink-0" />
        <p className="text-sm text-white/80 font-semibold">{msg}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("footer.emailPlaceholder")}
          required
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#F5C619]/50 transition-colors"
        />
        <button
          type="submit"
          disabled={status === "loading" || !email}
          className="bg-[#F5C619] text-[#061A32] px-5 py-3 rounded-xl font-black text-sm hover:bg-[#F5C619]/90 transition-all disabled:opacity-50 flex items-center gap-2 whitespace-nowrap"
        >
          {status === "loading" ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
          {t("footer.subscribe")}
        </button>
      </div>
      {status === "error" && (
        <p className="text-red-400 text-xs font-semibold">{msg}</p>
      )}
    </form>
  );
}

function GetInvolvedLinks() {
  const { openDonate } = useDonate();
  const [location] = useLocation();
  const { t } = useTranslation();
  const isHome = location === "/";

  const handleContact = (e: React.MouseEvent) => {
    if (isHome) {
      e.preventDefault();
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <ul className="space-y-3">
      <li>
        <button
          onClick={() => openDonate(150)}
          className="text-primary-foreground/60 hover:text-[#F5C619] transition-colors text-sm flex items-center gap-1.5 group"
        >
          <Heart className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          {t("footer.involved.sponsor")}
        </button>
      </li>
      <li>
        <button
          onClick={() => openDonate()}
          className="text-primary-foreground/60 hover:text-[#F5C619] transition-colors text-sm flex items-center gap-1.5 group"
        >
          <Heart className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          {t("footer.involved.donate")}
        </button>
      </li>
      <li>
        <Link href="/igniting-potential/become-a-partner" className="text-primary-foreground/60 hover:text-[#F5C619] transition-colors text-sm">
          {t("footer.involved.partner")}
        </Link>
      </li>
      <li>
        <a
          href="mailto:zealcare24@gmail.com?subject=Volunteer%20Inquiry%20—%20Zeal%20Care"
          className="text-primary-foreground/60 hover:text-[#F5C619] transition-colors text-sm"
        >
          {t("footer.involved.volunteer")}
        </a>
      </li>
      <li>
        <a
          href={isHome ? "#contact" : "/#contact"}
          onClick={handleContact}
          className="text-primary-foreground/60 hover:text-[#F5C619] transition-colors text-sm"
        >
          {t("contact.badge")}
        </a>
      </li>
    </ul>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { data: content } = useSiteContent();
  const { t } = useTranslation();
  const s = content?.settings ?? DEFAULT_CONTENT.settings;

  const socialLinks = [
    { icon: Facebook, href: s.facebook || "https://www.facebook.com/profile.php?id=61561063778243", testId: "link-social-facebook" },
    { icon: Twitter, href: s.twitter || "https://twitter.com/zealcare", testId: "link-social-twitter" },
    { icon: Instagram, href: s.instagram || "https://www.instagram.com/zealcare2024?igsh=MTU2emRiMHBmd3d1Zw==", testId: "link-social-instagram" },
    { icon: Linkedin, href: s.linkedin || "https://www.linkedin.com/company/zeal-care", testId: "link-social-linkedin" },
  ];

  return (
    <footer className="bg-[#041224] text-primary-foreground pt-16 pb-8">
      <div className="container mx-auto px-4">

        {/* Newsletter bar */}
        <div className="bg-gradient-to-r from-[#1A44C0]/40 to-[#061A32] border border-white/10 rounded-3xl p-8 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-xl font-black text-white mb-1">{t("footer.newsletter")}</h3>
              <p className="text-white/50 text-sm">{t("footer.newsletterDesc")}</p>
            </div>
            <NewsletterForm />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Link href="/" className="text-2xl font-extrabold flex items-center gap-2.5 mb-6">
              <img src="/logo.png" alt="Zeal Care" className="h-8 w-auto object-contain" />
              <span className="text-white">ZEAL CARE</span>
            </Link>
            <p className="text-primary-foreground/70 mb-6 text-sm leading-relaxed">
              {t("footer.tagline")}
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, testId }) => (
                <a key={testId} href={href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all hover:scale-110" data-testid={testId}>
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-black text-sm mb-6 uppercase tracking-widest text-white">{t("footer.quickLinks")}</h4>
            <ul className="space-y-3">
              {([
                [t("footer.links.about"), "/about"],
                [t("nav.whyEmpowerment"), "/why-empowerment"],
                [t("nav.whatWeDo"), "/what-we-do"],
                [t("nav.ignitingPotential"), "/igniting-potential"],
                [t("nav.media"), "/media"],
              ] as [string, string][]).map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-primary-foreground/60 hover:text-[#F5C619] transition-colors text-sm">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h4 className="font-black text-sm mb-6 uppercase tracking-widest text-white">{t("footer.getInvolved")}</h4>
            <GetInvolvedLinks />
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-black text-sm mb-6 uppercase tracking-widest text-white">{t("footer.contactInfo")}</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 text-primary-foreground/60">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#F5C619]" />
                <span>{s.address}</span>
              </li>
              <li className="flex items-start gap-3 text-primary-foreground/60">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#F5C619]" />
                <a href={`mailto:${s.email}`} className="hover:text-[#F5C619] transition-colors">{s.email}</a>
              </li>
              <li className="flex items-start gap-3 text-primary-foreground/60">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#F5C619]" />
                <a href={`tel:${s.phone.replace(/\s/g, "")}`} className="hover:text-[#F5C619] transition-colors">{s.phone}</a>
              </li>
            </ul>
          </div>

        </div>

        <hr className="border-primary-foreground/10 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-primary-foreground/40 text-sm">
          <p>
            &copy; {currentYear} Zeal Care. {t("footer.rights")} Monrovia, Liberia.
            <a href="/admin" className="ml-1 text-primary-foreground/15 hover:text-primary-foreground/35 transition-colors select-none" title="Admin">·</a>
          </p>
          <div className="flex gap-6">
            <a href="mailto:info@zealcare.org?subject=Privacy%20Policy%20Inquiry" className="hover:text-primary-foreground/70 transition-colors">Privacy Policy</a>
            <a href="mailto:info@zealcare.org?subject=Terms%20of%20Service%20Inquiry" className="hover:text-primary-foreground/70 transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
