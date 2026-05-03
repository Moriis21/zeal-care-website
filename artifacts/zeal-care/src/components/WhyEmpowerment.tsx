import { motion } from "framer-motion";
import { BookOpen, Laptop, Users, Heart } from "lucide-react";
import { useTranslation } from "react-i18next";

const ICONS = [
  <BookOpen className="w-8 h-8" />,
  <Laptop className="w-8 h-8" />,
  <Users className="w-8 h-8" />,
  <Heart className="w-8 h-8" />,
];

export function WhyEmpowerment() {
  const { t } = useTranslation();

  const features = (t("why.features", { returnObjects: true }) as { title: string; desc: string }[]);

  return (
    <section id="why-empowerment" className="py-24 bg-[#1A44C0] text-primary-foreground">
      <div className="container mx-auto px-4">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 rounded-full bg-secondary/20 text-secondary text-sm font-bold tracking-wider mb-4 uppercase"
          >
            {t("why.badge")}
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold mb-6"
          >
            {t("why.heading")}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-primary-foreground/80"
          >
            {t("why.subtitle")}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-primary/50 backdrop-blur-sm border border-primary-foreground/10 rounded-2xl p-8 hover:bg-primary transition-colors duration-300"
              data-testid={`card-feature-${index}`}
            >
              <div className="w-16 h-16 rounded-2xl bg-secondary/20 text-secondary flex items-center justify-center mb-6">
                {ICONS[index]}
              </div>
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-primary-foreground/70 leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
