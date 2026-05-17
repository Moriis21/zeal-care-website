import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { STRATEGIC_PARTNERS } from "@/lib/partner-logos";

export function Partners() {
  const { t } = useTranslation();

  return (
    <section className="py-20 md:py-24 bg-[#061A32] overflow-hidden">
      <div className="container mx-auto px-5 sm:px-6">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-[#F5C619]/10 border border-[#F5C619]/30 rounded-full px-5 py-2 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#F5C619] animate-pulse" />
            <span className="text-[#F5C619] text-sm font-bold uppercase tracking-widest">{t("partners.badge")}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4" data-testid="heading-partners">
            {t("partners.heading")}
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
            {t("partners.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-12">
          {STRATEGIC_PARTNERS.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="group relative"
              data-testid={`partner-logo-${index}`}
            >
              <div className="relative overflow-hidden rounded-2xl border border-white/10 hover:border-[#F5C619]/40 transition-all duration-300 hover:shadow-lg hover:shadow-[#F5C619]/10 hover:-translate-y-1">
                <div
                  className="h-28 p-5 flex items-center justify-center"
                  style={{ backgroundColor: partner.bgColor }}
                >
                  <div className="w-full max-w-[160px] h-16">
                    {partner.logo}
                  </div>
                </div>
                <div className="bg-white/5 px-4 py-3 border-t border-white/10">
                  <p className="text-white font-bold text-sm">{partner.name}</p>
                  <p className="text-white/40 text-xs">{partner.type}</p>
                </div>
                <div className="absolute inset-0 bg-[#061A32]/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-2xl p-4">
                  <div className="text-center">
                    <p className="text-[#F5C619] font-black text-base mb-1">{partner.name}</p>
                    <p className="text-white/70 text-xs leading-snug mb-3">{partner.description}</p>
                    <div className="px-3 py-1 bg-[#F5C619]/20 rounded-full inline-block">
                      <p className="text-[#F5C619] text-xs font-semibold">{partner.type}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-r from-[#1A44C0]/30 to-transparent border border-white/10 rounded-2xl px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div>
            <p className="text-white font-bold text-lg">{t("partners.ctaHeading")}</p>
            <p className="text-white/50 text-sm">{t("partners.ctaSub")}</p>
          </div>
          <a
            href="/igniting-potential/become-a-partner"
            className="whitespace-nowrap bg-[#F5C619] text-[#061A32] px-7 py-3 rounded-full font-black text-sm hover:bg-[#F5C619]/90 transition-all hover:scale-105"
          >
            {t("partners.ctaBtn")}
          </a>
        </motion.div>

      </div>
    </section>
  );
}
