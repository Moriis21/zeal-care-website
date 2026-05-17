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

  const trustStats = [
    { value: content?.settings.impactChildren ?? "105+", label: t("hero.childrenLabel") },
    { value: content?.settings.heroPrograms   ?? "12+",  label: t("hero.programsRunning") },
    { value: content?.settings.heroLanguages  ?? "4",    label: t("hero.languagesSupported") },
  ];

  return (
    <section
      id="home"
      className="relative flex flex-col overflow-hidden bg-primary text-primary-foreground"
    >
      {/* Background — official brand blue #0B5FA8 */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#061A32] via-[#0B5FA8]/85 to-[#061A32]/95" />

      {/* Subtle dot texture */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:28px_28px]" />

      {/* ── Main content ── */}
      <div className="relative z-10 container mx-auto px-5 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-10 sm:pb-14">
        <div className="grid lg:grid-cols-2 gap-8 xl:gap-14 items-center">

          {/* ── Left: Text ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="flex flex-col"
          >
            {/* Badge */}
            <div
              className="inline-flex self-start items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold tracking-widest mb-5 uppercase"
              data-testid="badge-hero"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse flex-shrink-0" />
              {heroBadge}
            </div>

            {/* Headline */}
            <h1
              className="font-extrabold leading-[1.1] mb-5 tracking-tight text-balance"
              style={{ fontSize: "clamp(2.1rem, 5vw, 4.2rem)" }}
              data-testid="heading-hero"
            >
              {titleMain}
              {titleAccent && (
                <>
                  {" "}
                  <span className="text-secondary">{titleAccent}</span>
                </>
              )}
            </h1>

            {/* Sub-copy */}
            <p
              className="text-white/75 leading-relaxed mb-8 max-w-[50ch]"
              style={{ fontSize: "clamp(0.95rem, 1.3vw, 1.1rem)" }}
              data-testid="text-hero-desc"
            >
              {heroSubtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-10">
              <Button
                onClick={() => openDonate(150)}
                className="bg-secondary text-primary hover:bg-secondary/90 rounded-full px-6 py-3 text-sm font-black h-auto shadow-lg shadow-secondary/25 hover:scale-105 transition-transform"
                data-testid="button-sponsor"
              >
                {sponsorCTA} →
              </Button>
              <Button
                variant="outline"
                onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-transparent border-2 border-white/35 text-white hover:bg-white/10 rounded-full px-6 py-3 text-sm font-black h-auto transition-all"
                data-testid="button-impact"
              >
                {impactCTA}
              </Button>
            </div>

            {/* Trust strip */}
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-6 border-t border-white/10">
              {trustStats.map(({ value, label }) => (
                <div key={label} className="flex flex-col">
                  <span className="text-xl sm:text-2xl font-black text-secondary leading-none">{value}</span>
                  <span className="text-white/50 text-[11px] font-semibold mt-0.5 uppercase tracking-wider whitespace-nowrap">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Right: Images ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.15, ease: "easeOut" }}
            className="relative flex items-center justify-center mt-6 lg:mt-0"
          >
            {/* Stack container — visible on all screen sizes */}
            <div className="relative w-full" style={{ height: "clamp(280px, 45vw, 520px)" }}>

              {/* Main image */}
              <div className="absolute top-0 right-0 w-[72%] h-[85%] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl ring-2 ring-white/10 z-10">
                <img
                  src={heroMain}
                  alt="Zeal Care students in school uniform"
                  className="w-full h-full object-cover"
                  fetchPriority="high"
                  decoding="sync"
                  data-testid="img-hero-main"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061A32]/40 to-transparent" />
              </div>

              {/* Overlap image */}
              <div className="absolute bottom-0 left-0 w-[50%] h-[62%] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl ring-2 ring-white/10 z-20">
                <img
                  src={heroOverlap}
                  alt="Zeal Care community impact"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061A32]/30 to-transparent" />
              </div>

              {/* Floating stat card */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute top-4 left-2 z-30 bg-white/12 backdrop-blur-md rounded-xl border border-white/20 px-4 py-3 shadow-xl"
              >
                <p className="text-lg sm:text-2xl font-black text-white leading-none">
                  {content?.settings.impactChildren ?? "105+"}
                </p>
                <p className="text-white/55 text-[10px] sm:text-xs font-semibold mt-0.5">
                  {t("hero.childrenLabel")}
                </p>
              </motion.div>

              {/* Decorative ring accents */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full border-[3px] border-secondary/25 z-0 hidden sm:block" />
              <div className="absolute -bottom-1 -right-1 w-12 h-12 rounded-full border-[3px] border-secondary/15 z-0 hidden sm:block" />
            </div>
          </motion.div>

        </div>
      </div>

      {/* Bottom wave */}
      <div className="relative z-10 w-full overflow-hidden leading-none" style={{ height: 44 }}>
        <svg viewBox="0 0 1440 44" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full">
          <path d="M0,44 C360,0 1080,0 1440,44 L1440,44 L0,44 Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
