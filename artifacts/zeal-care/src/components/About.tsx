import { motion } from "framer-motion";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import aboutTeamGroup from "@assets/pdf_images/img-055.jpg";
import aboutTeam from "@assets/pdf_images/img-054.jpg";

export function About() {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-20 md:py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-5 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 xl:gap-16 items-center">

          {/* ── Images ── */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-3">
              {/* Wide top image */}
              <img
                src={aboutTeamGroup}
                alt="Zeal Care team with students at Esfans Academy"
                className="col-span-2 rounded-2xl shadow-md w-full object-cover object-top"
                style={{ height: "clamp(180px, 30vw, 280px)" }}
                loading="lazy"
                decoding="async"
                data-testid="img-about-1"
              />
              {/* Years badge */}
              <div className="bg-secondary rounded-2xl p-5 flex flex-col justify-center items-center text-primary text-center shadow-md">
                <span className="text-3xl sm:text-4xl font-extrabold mb-1">5+</span>
                <span className="font-semibold uppercase tracking-wider text-xs sm:text-sm leading-tight">{t("about.yearsImpact")}</span>
              </div>
              {/* Portrait image */}
              <img
                src={aboutTeam}
                alt="Zeal Care team members in yellow shirts"
                className="rounded-2xl shadow-md w-full object-cover object-top"
                style={{ height: "clamp(120px, 18vw, 200px)" }}
                loading="lazy"
                decoding="async"
                data-testid="img-about-2"
              />
            </div>

            {/* Decorative dot grid */}
            <div
              className="absolute -z-10 -top-5 -left-5 w-20 h-20 opacity-15"
              style={{
                backgroundImage: "radial-gradient(hsl(var(--primary)) 2px, transparent 2px)",
                backgroundSize: "12px 12px",
              }}
            />
          </motion.div>

          {/* ── Text ── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1 }}
          >
            <div
              className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wider mb-4 uppercase"
              data-testid="badge-about"
            >
              {t("about.badge")}
            </div>
            <h2
              className="font-extrabold text-foreground mb-5 leading-tight text-balance"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}
              data-testid="heading-about"
            >
              {t("about.heading")}
            </h2>
            <p className="text-base text-muted-foreground mb-4 leading-relaxed" data-testid="text-about-p1">
              {t("about.p1")}
            </p>
            <p className="text-base text-muted-foreground mb-6 leading-relaxed" data-testid="text-about-p2">
              {t("about.p2")}
            </p>

            <blockquote
              className="border-l-4 border-secondary pl-5 mb-7 italic text-base md:text-lg font-medium text-foreground leading-relaxed"
              data-testid="quote-about"
            >
              &ldquo;{t("about.quote")}&rdquo;
            </blockquote>

            <Link href="/about">
              <button
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 py-3 font-bold text-sm transition-all hover:scale-105"
                data-testid="button-about-learn-more"
              >
                {t("about.learnMore")}
              </button>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
