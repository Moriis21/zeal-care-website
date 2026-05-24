import { motion } from "framer-motion";
import { BookOpen, Laptop, Users, Heart } from "lucide-react";
import { useTranslation } from "react-i18next";

const ICONS = [BookOpen, Laptop, Users, Heart];

export function WhyEmpowerment() {
  const { t } = useTranslation();
  const features = t("why.features", { returnObjects: true }) as { title: string; desc: string }[];

  return (
    <section id="why-empowerment" className="section-y bg-primary text-primary-foreground">
      <div className="container">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 rounded-full bg-secondary/20 text-secondary text-xs font-bold tracking-[0.15em] mb-4 uppercase"
          >
            {t("why.badge")}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-3xl md:text-4xl font-extrabold mb-5 leading-tight tracking-tight text-balance"
          >
            {t("why.heading")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.14 }}
            className="text-base md:text-lg text-primary-foreground/70 leading-[1.8]"
          >
            {t("why.subtitle")}
          </motion.p>
        </div>

        {/* Equal-height feature cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7">
          {features.map((feature, index) => {
            const Icon = ICONS[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="bg-white/8 border border-white/10 rounded-3xl p-8 hover:bg-white/12 hover:-translate-y-1 transition-all duration-300 h-full flex flex-col"
                data-testid={`card-feature-${index}`}
              >
                <div className="w-12 h-12 rounded-2xl bg-secondary/20 text-secondary flex items-center justify-center mb-5 flex-shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold mb-3 text-white leading-snug">{feature.title}</h3>
                <p className="text-primary-foreground/65 leading-[1.75] text-sm flex-1">
                  {feature.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
