import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import scholarImg from "@assets/pdf_images/img-059.jpg";
import techImg from "@assets/In_the_field_1777770914048.jpeg";
import mentorshipImg from "@assets/pdf_images/img-058.jpg";
import communityImg from "@assets/pdf_images/img-068.jpg";

const IMAGES = [scholarImg, techImg, mentorshipImg, communityImg];
const LINKS = [
  "/what-we-do/education-sponsorship",
  "/what-we-do/digital-education",
  "/what-we-do/leadership-development",
  "/what-we-do/programs",
];

export function Programs() {
  const { t } = useTranslation();

  const items = (t("programs.items", { returnObjects: true }) as { title: string; desc: string }[]);

  return (
    <section id="programs" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-wider mb-4 uppercase">
              {t("programs.badge")}
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground">
              {t("programs.heading")}
            </h2>
          </div>
          <Link href="/what-we-do/programs">
            <button className="flex items-center gap-2 text-primary font-bold hover:text-secondary transition-colors" data-testid="link-all-programs">
              {t("programs.viewAll")} <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((program, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative rounded-2xl overflow-hidden shadow-lg border border-border bg-card"
              data-testid={`card-program-${index}`}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={IMAGES[index]} 
                  alt={program.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-3">{program.title}</h3>
                <p className="text-muted-foreground mb-6 line-clamp-3">
                  {program.desc}
                </p>
                <Link href={LINKS[index]} className="inline-flex items-center gap-2 text-sm font-bold text-primary group-hover:text-secondary transition-colors">
                  {t("programs.learnMore")} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
