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

  const heroTitle   = isEnglish ? home.heroTitle   : t("hero.title");
  const heroSubtitle = isEnglish ? home.heroSubtitle : t("hero.subtitle");
  const heroBadge    = isEnglish ? home.heroBadge   : t("hero.badge");
  const sponsorCTA   = isEnglish ? home.heroPrimaryCTA   : t("hero.sponsorCTA");
  const impactCTA    = isEnglish ? home.heroSecondaryCTA : t("hero.impactCTA");

  const [titleMain, titleAccent] = heroTitle.includes(",")
    ? [heroTitle.split(",")[0] + ",", heroTitle.split(",").slice(1).join(",").trim()]
    : [heroTitle, ""];

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-primary text-primary-foreground">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-[#1A44C0] to-primary/90 opacity-90"></div>

      <div className="container relative z-10 mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 text-sm font-semibold tracking-wider mb-6" data-testid="badge-hero">
            {heroBadge}
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6" data-testid="heading-hero">
            {titleMain}
            {titleAccent && (
              <>
                <br />
                <span className="text-secondary">{titleAccent}</span>
              </>
            )}
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 leading-relaxed max-w-lg" data-testid="text-hero-desc">
            {heroSubtitle}
          </p>

          <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              onClick={() => openDonate(150)}
              className="bg-secondary text-primary hover:bg-secondary/90 rounded-full px-8 py-6 text-lg font-bold"
              data-testid="button-sponsor"
            >
              {sponsorCTA} &rarr;
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => { const el = document.getElementById("about"); el?.scrollIntoView({ behavior: "smooth" }); }}
              className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary rounded-full px-8 py-6 text-lg font-bold"
              data-testid="button-impact"
            >
              {impactCTA}
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative h-[500px] lg:h-[600px] w-full hidden md:block"
        >
          {/* Main Image */}
          <div className="absolute top-0 right-0 w-3/4 h-4/5 rounded-2xl overflow-hidden shadow-2xl border-4 border-background/10 z-10">
            <img
              src={heroMain}
              alt="Zeal Care students in school uniform"
              className="w-full h-full object-cover"
              fetchPriority="high"
              decoding="sync"
              data-testid="img-hero-main"
            />
          </div>
          {/* Overlap Image */}
          <div className="absolute bottom-0 left-0 w-1/2 h-2/3 rounded-2xl overflow-hidden shadow-2xl border-4 border-background/10 z-20">
            <img
              src={heroOverlap}
              alt="Zeal Care community impact"
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
          {/* Impact badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="absolute top-8 left-0 z-30 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 px-5 py-4"
          >
            <p className="text-2xl font-black text-white">{content?.settings.impactChildren ?? "105+"}</p>
            <p className="text-white/70 text-xs font-semibold">{t("hero.childrenLabel")}</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
