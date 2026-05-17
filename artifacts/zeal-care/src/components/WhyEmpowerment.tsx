import { motion } from "framer-motion";
import { BookOpen, Laptop, Users, Heart } from "lucide-react";
import { useTranslation } from "react-i18next";

const ICONS = [BookOpen, Laptop, Users, Heart];

export function WhyEmpowerment() {
  const { t } = useTranslation();
  const features = t("why.features", { returnObjects: true }) as { title: string; desc: string }[];

  return (
    <section id="why-empowerment" className="py-20 md:py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-5 sm:px-6">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 rounded-full bg-secondary/20 text-secondary text-xs font-bold tracking-widest mb-4 uppercase"
          >
            {t("why.badge")}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight text-balance"
          >
            {t("why.heading")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.14 }}
            className="text-base md:text-lg text-primary-foreground/70 leading-relaxed"
          >
            {t("why.subtitle")}
          </motion.p>
        </div>

        {/* Feature cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {features.map((feature, index) => {
            const Icon = ICONS[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="bg-white/8 border border-white/10 rounded-2xl p-6 hover:bg-white/12 transition-colors duration-200"
                data-testid={`card-feature-${index}`}
              >
                <div className="w-12 h-12 rounded-xl bg-secondary/20 text-secondary flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-white">{feature.title}</h3>
                <p className="text-primary-foreground/65 leading-relaxed text-sm">
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
