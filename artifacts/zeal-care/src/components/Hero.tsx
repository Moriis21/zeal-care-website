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
  const s = content?.settings ?? DEFAULT_CONTENT.settings;

  const heroTitle    = isEnglish ? home.heroTitle        : t("hero.title");
  const heroSubtitle = isEnglish ? home.heroSubtitle     : t("hero.subtitle");
  const heroBadge    = isEnglish ? home.heroBadge        : t("hero.badge");
  const sponsorCTA   = isEnglish ? home.heroPrimaryCTA   : t("hero.sponsorCTA");
  const impactCTA    = isEnglish ? home.heroSecondaryCTA : t("hero.impactCTA");

  // Split title at comma for two-colour treatment
  const [titleMain, titleAccent] = heroTitle.includes(",")
    ? [heroTitle.split(",")[0] + ",", heroTitle.split(",").slice(1).join(",").trim()]
    : [heroTitle, ""];

  return (
    <section
      id="home"
      className="relative overflow-hidden text-white"
      style={{ background: "linear-gradient(135deg, #051829 0%, #09609A 55%, #051829 100%)" }}
    >
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 container mx-auto px-5 sm:px-6 lg:px-8 pt-32 sm:pt-36 pb-12 sm:pb-16">
        <div className="grid lg:grid-cols-2 gap-10 xl:gap-14 items-center min-h-[calc(100svh-8rem)] lg:min-h-0 lg:py-8">

          {/* ── Left: Copy ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col max-w-xl"
          >
            {/* Badge */}
            <div className="inline-flex self-start items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 text-xs font-semibold tracking-[0.15em] uppercase mb-6" data-testid="badge-hero">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse flex-shrink-0" />
              {heroBadge}
            </div>

            {/* Headline — controlled size */}
            <h1
              className="font-extrabold leading-[1.12] tracking-tight mb-5 text-balance"
              style={{ fontSize: "clamp(2rem, 3.8vw, 3.2rem)" }}
              data-testid="heading-hero"
            >
              {titleMain}
              {titleAccent && (
                <span className="text-secondary block sm:inline"> {titleAccent}</span>
              )}
            </h1>

            {/* Sub-copy */}
            <p
              className="text-white/70 leading-relaxed mb-8 max-w-[46ch]"
              style={{ fontSize: "clamp(0.95rem, 1.2vw, 1.05rem)" }}
              data-testid="text-hero-desc"
            >
              {heroSubtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-10">
              <Button
                onClick={() => openDonate(150)}
                className="bg-secondary text-[#051829] hover:bg-secondary/90 rounded-full px-7 py-3 text-sm font-black h-auto shadow-lg hover:scale-105 transition-transform"
                data-testid="button-sponsor"
              >
                {sponsorCTA} →
              </Button>
              <Button
                variant="outline"
                onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-transparent border-2 border-white/30 text-white hover:bg-white/10 rounded-full px-7 py-3 text-sm font-semibold h-auto transition-all"
                data-testid="button-impact"
              >
                {impactCTA}
              </Button>
            </div>

            {/* Trust strip */}
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-6 border-t border-white/10">
              <div>
                <p className="text-xl font-black text-secondary leading-none">{s.impactChildren}</p>
                <p className="text-white/45 text-[11px] font-semibold mt-0.5 uppercase tracking-wider">{t("hero.childrenLabel")}</p>
              </div>
              <div>
                <p className="text-xl font-black text-secondary leading-none">{s.heroPrograms}</p>
                <p className="text-white/45 text-[11px] font-semibold mt-0.5 uppercase tracking-wider">{t("hero.programsRunning")}</p>
              </div>
              <div>
                <p className="text-xl font-black text-secondary leading-none">{s.heroLanguages}</p>
                <p className="text-white/45 text-[11px] font-semibold mt-0.5 uppercase tracking-wider">{t("hero.languagesSupported")}</p>
              </div>
            </div>
          </motion.div>

          {/* ── Right: Images ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.12, ease: "easeOut" }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-full" style={{ height: "clamp(300px, 42vw, 500px)" }}>

              {/* Main image — top right */}
              <div className="absolute top-0 right-0 w-[72%] h-[86%] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 z-10">
                <img
                  src={heroMain}
                  alt="Zeal Care students in school uniform"
                  className="w-full h-full object-cover object-top"
                  fetchPriority="high"
                  decoding="sync"
                  data-testid="img-hero-main"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#051829]/50 to-transparent" />
              </div>

              {/* Secondary image — bottom left */}
              <div className="absolute bottom-0 left-0 w-[48%] h-[60%] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 z-20">
                <img
                  src={heroOverlap}
                  alt="Zeal Care community impact"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#051829]/40 to-transparent" />
              </div>

              {/* Floating card */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75 }}
                className="absolute top-4 left-0 z-30 bg-white/12 backdrop-blur-md rounded-xl border border-white/20 px-4 py-3 shadow-xl"
              >
                <p className="text-xl font-black text-white leading-none">{s.impactChildren}</p>
                <p className="text-white/55 text-[11px] font-semibold mt-0.5 leading-tight max-w-[10ch]">{t("hero.childrenLabel")}</p>
              </motion.div>

              {/* Accent ring */}
              <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full border-2 border-secondary/20 z-0 hidden sm:block" />
            </div>
          </motion.div>

        </div>
      </div>

      {/* Wave into white */}
      <div className="relative z-10 w-full overflow-hidden leading-none" style={{ height: 40 }}>
        <svg viewBox="0 0 1440 40" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full">
          <path d="M0,40 C480,0 960,0 1440,40 L1440,40 L0,40 Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
