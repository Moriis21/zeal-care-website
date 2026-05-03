import { motion } from "framer-motion";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import aboutTeamGroup from "@assets/pdf_images/img-055.jpg";
import aboutTeam from "@assets/pdf_images/img-054.jpg";

export function About() {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <img 
                src={aboutTeamGroup}
                alt="Zeal Care team with students at Esfans Academy" 
                className="col-span-2 rounded-2xl shadow-lg w-full h-[300px] object-cover object-top"
                loading="lazy"
                decoding="async"
                data-testid="img-about-1"
              />
              <div className="bg-secondary rounded-2xl p-8 flex flex-col justify-center items-center text-primary text-center shadow-lg">
                <span className="text-4xl font-extrabold mb-2">5+</span>
                <span className="font-semibold uppercase tracking-wider text-sm">{t("about.yearsImpact")}</span>
              </div>
              <img 
                src={aboutTeam}
                alt="Zeal Care team members in yellow shirts" 
                className="rounded-2xl shadow-lg w-full h-[200px] object-cover object-top"
                loading="lazy"
                decoding="async"
                data-testid="img-about-2"
              />
            </div>
            
            <div className="absolute -z-10 -top-6 -left-6 w-24 h-24 bg-[radial-gradient(hsl(var(--primary))_2px,transparent_2px)] [background-size:12px_12px] opacity-20"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-wider mb-4 uppercase" data-testid="badge-about">
              {t("about.badge")}
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6 leading-tight" data-testid="heading-about">
              {t("about.heading")}
            </h2>
            <p className="text-lg text-muted-foreground mb-6" data-testid="text-about-p1">
              {t("about.p1")}
            </p>
            <p className="text-lg text-muted-foreground mb-8" data-testid="text-about-p2">
              {t("about.p2")}
            </p>
            
            <blockquote className="border-l-4 border-secondary pl-6 mb-8 italic text-xl font-medium text-foreground" data-testid="quote-about">
              "{t("about.quote")}"
            </blockquote>
            
            <Link href="/about">
              <button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-7 py-3 font-bold text-base transition-all hover:scale-105" data-testid="button-about-learn-more">
                {t("about.learnMore")}
              </button>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
