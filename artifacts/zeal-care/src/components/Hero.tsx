import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useDonate } from "@/context/DonateContext";
import { useSiteContent, DEFAULT_CONTENT } from "@/hooks/useSiteContent";
import { useTranslation } from "react-i18next";
import heroMain from "@assets/home_hero_page_1777770914048.jpeg";
import heroOverlap from "@assets/hero_1777770914047.jpeg";

export function Hero() {
  const { openDonate } = useDonate();
  const { data: content } = useSiteContent();
  const { t, i18n } = useTranslation();
  const isEnglish = i18n.language.startsWith("en");

  const home = content?.home ?? DEFAULT_CONTENT.home;

  const heroTitle    = isEnglish ? home.heroTitle        : t("hero.title");
  const heroSubtitle = isEnglish ? home.heroSubtitle     : t("hero.subtitle");
  const heroBadge    = isEnglish ? home.heroBadge        : t("hero.badge");
  const sponsorCTA   = isEnglish ? home.heroPrimaryCTA   : t("hero.sponsorCTA");
  const impactCTA    = isEnglish ? home.heroSecondaryCTA : t("hero.impactCTA");

  const [titleMain, titleAccent] = heroTitle.includes(",")
    ? [heroTitle.split(",")[0] + ",", heroTitle.split(",").slice(1).join(",").trim()]
    : [heroTitle, ""];

  return (
    <section
      id="home"
      className="relative flex flex-col overflow-hidden bg-primary text-primary-foreground"
      style={{ minHeight: "100svh" }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#061A32] via-[#1A44C0]/80 to-[#061A32]/95" />

      {/* Subtle dot texture */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:32px_32px]" />

      {/* Content — padded to clear the full navbar (top bar ~32px + divider ~12px + nav ~68px = ~112px) */}
      <div className="relative z-10 flex flex-col flex-1 container mx-auto px-6 lg:px-8"
        style={{ paddingTop: "clamp(120px, 13vw, 140px)", paddingBottom: "clamp(48px, 6vw, 72px)" }}
      >
        <div className="grid lg:grid-cols-2 gap-10 xl:gap-16 items-center flex-1 h-full">

          {/* ── Left: Text ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="flex flex-col justify-center"
          >
            {/* Badge */}
            <div
              className="inline-flex self-start items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs sm:text-sm font-bold tracking-widest mb-7 uppercase"
              data-testid="badge-hero"
            >
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              {heroBadge}
            </div>

            {/* Headline */}
            <h1
              className="font-extrabold leading-[1.08] mb-6 tracking-tight"
              style={{ fontSize: "clamp(2.6rem, 5.5vw, 5rem)" }}
              data-testid="heading-hero"
            >
              {titleMain}
              {titleAccent && (
                <>
                  <br />
                  <span className="text-secondary">{titleAccent}</span>
                </>
              )}
            </h1>

            {/* Sub-copy */}
            <p
              className="text-primary-foreground/80 leading-relaxed mb-10 max-w-[520px]"
              style={{ fontSize: "clamp(1rem, 1.4vw, 1.2rem)" }}
              data-testid="text-hero-desc"
            >
              {heroSubtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() => openDonate(150)}
                className="bg-secondary text-primary hover:bg-secondary/90 rounded-full px-7 py-3.5 text-sm sm:text-base font-black h-auto shadow-lg shadow-secondary/20 hover:scale-105 transition-transform"
                data-testid="button-sponsor"
              >
                {sponsorCTA} →
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  const el = document.getElementById("about");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-transparent border-2 border-white/40 text-white hover:bg-white hover:text-primary rounded-full px-7 py-3.5 text-sm sm:text-base font-black h-auto transition-all"
                data-testid="button-impact"
              >
                {impactCTA}
              </Button>
            </div>

            {/* Trust strip */}
            <div className="flex items-center gap-6 mt-10 pt-8 border-t border-white/10">
              {[
                { value: content?.settings.impactChildren ?? "105+", label: t("hero.childrenLabel") },
                { value: "12+", label: "Programs Running" },
                { value: "4", label: "Languages Supported" },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <p className="text-2xl font-black text-secondary leading-none">{value}</p>
                  <p className="text-white/50 text-[11px] font-semibold mt-1 uppercase tracking-wider">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Right: Image Stack ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.15, ease: "easeOut" }}
            className="relative hidden md:flex items-center justify-center"
            style={{ height: "clamp(420px, 54vh, 620px)" }}
          >
            {/* Main image — top-right */}
            <div className="absolute top-0 right-0 w-[68%] h-[78%] rounded-3xl overflow-hidden shadow-2xl ring-2 ring-white/10 z-10">
              <img
                src={heroMain}
                alt="Zeal Care students in school uniform"
                className="w-full h-full object-cover"
                fetchPriority="high"
                decoding="sync"
                data-testid="img-hero-main"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
            </div>

            {/* Overlap image — bottom-left */}
            <div className="absolute bottom-0 left-0 w-[52%] h-[66%] rounded-3xl overflow-hidden shadow-2xl ring-2 ring-white/10 z-20">
              <img
                src={heroOverlap}
                alt="Zeal Care community impact"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="absolute top-6 left-0 z-30 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 px-5 py-3.5 shadow-xl"
            >
              <p className="text-2xl font-black text-white leading-none">{content?.settings.impactChildren ?? "105+"}</p>
              <p className="text-white/60 text-xs font-semibold mt-1">{t("hero.childrenLabel")}</p>
            </motion.div>

            {/* Decorative golden ring accent */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full border-[3px] border-secondary/30 z-0" />
            <div className="absolute -bottom-2 -right-2 w-16 h-16 rounded-full border-[3px] border-secondary/20 z-0" />
          </motion.div>

        </div>
      </div>

      {/* Bottom wave into next section */}
      <div className="relative z-10 w-full overflow-hidden leading-none" style={{ height: 48 }}>
        <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full">
          <path d="M0,48 C360,0 1080,0 1440,48 L1440,48 L0,48 Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
