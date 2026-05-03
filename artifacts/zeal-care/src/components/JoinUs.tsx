import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useDonate } from "@/context/DonateContext";
import { useTranslation } from "react-i18next";
import joinBg from "@assets/pdf_images/img-067.jpg";

export function JoinUs() {
  const { openDonate } = useDonate();
  const { t } = useTranslation();

  return (
    <section id="join-us" className="relative py-24 md:py-32 overflow-hidden bg-[#1A44C0] text-primary-foreground">
      <div className="absolute inset-0 z-0">
        <img 
          src={joinBg}
          alt="Zeal Care team with children in the community" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#061A32]/75"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-secondary text-primary text-sm font-bold tracking-wider mb-8 uppercase" data-testid="badge-join">
            {t("joinus.badge")}
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-6 md:mb-8 leading-tight drop-shadow-lg" data-testid="heading-join">
            {t("joinus.heading")}
          </h2>
          
          <p className="text-lg sm:text-xl md:text-2xl text-primary-foreground/90 mb-10 md:mb-12 leading-relaxed max-w-2xl mx-auto drop-shadow-md">
            {t("joinus.subtitle")}
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              onClick={() => openDonate(150)}
              className="bg-secondary text-primary hover:bg-secondary/90 rounded-full px-7 py-3 text-base font-bold h-auto"
              data-testid="button-sponsor-large"
            >
              {t("joinus.sponsorCTA")}
            </Button>
            <Button
              variant="outline"
              className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary rounded-full px-7 py-3 text-base font-bold h-auto"
              data-testid="button-volunteer"
              onClick={() => window.location.href = "mailto:zealcare24@gmail.com?subject=Volunteer Inquiry"}
            >
              {t("joinus.volunteerCTA")}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
