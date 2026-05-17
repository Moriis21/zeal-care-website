import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useDonate } from "@/context/DonateContext";
import { useTranslation } from "react-i18next";
import joinBg from "@assets/pdf_images/img-067.jpg";

export function JoinUs() {
  const { openDonate } = useDonate();
  const { t } = useTranslation();

  return (
    <section id="join-us" className="relative py-20 md:py-28 overflow-hidden text-primary-foreground">
      {/* Background image with dark overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={joinBg}
          alt="Zeal Care team with children in the community"
          className="w-full h-full object-cover object-center"
          loading="lazy"
          decoding="async"
        />
        {/* Two-layer overlay: brand navy + gradient for readability */}
        <div className="absolute inset-0 bg-[#061A32]/78" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061A32]/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-5 sm:px-6 text-center max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
        >
          {/* Badge */}
          <div
            className="inline-block px-4 py-1.5 rounded-full bg-secondary text-primary text-xs font-bold tracking-widest mb-6 uppercase"
            data-testid="badge-join"
          >
            {t("joinus.badge")}
          </div>

          {/* Heading */}
          <h2
            className="font-extrabold mb-4 leading-tight text-balance"
            style={{ fontSize: "clamp(2rem, 5.5vw, 3.75rem)" }}
            data-testid="heading-join"
          >
            {t("joinus.heading")}
          </h2>

          {/* Sub-copy */}
          <p className="text-base md:text-lg text-white/75 mb-8 leading-relaxed max-w-xl mx-auto">
            {t("joinus.subtitle")}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Button
              onClick={() => openDonate(150)}
              className="bg-secondary text-primary hover:bg-secondary/90 rounded-full px-7 py-3 text-sm font-bold h-auto shadow-lg hover:scale-105 transition-transform"
              data-testid="button-sponsor-large"
            >
              {t("joinus.sponsorCTA")}
            </Button>
            <Button
              variant="outline"
              className="bg-transparent border-2 border-white/40 text-white hover:bg-white/10 rounded-full px-7 py-3 text-sm font-bold h-auto transition-all"
              data-testid="button-volunteer"
              onClick={() => { window.location.href = "mailto:zealcare24@gmail.com?subject=Volunteer Inquiry"; }}
            >
              {t("joinus.volunteerCTA")}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
