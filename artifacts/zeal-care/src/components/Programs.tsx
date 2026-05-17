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
  const items = t("programs.items", { returnObjects: true }) as { title: string; desc: string }[];

  return (
    <section id="programs" className="py-20 md:py-24 bg-background">
      <div className="container mx-auto px-5 sm:px-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10 md:mb-12">
          <div className="max-w-xl">
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wider mb-3 uppercase">
              {t("programs.badge")}
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground leading-tight">
              {t("programs.heading")}
            </h2>
          </div>
          <Link href="/what-we-do/programs">
            <button className="flex items-center gap-1.5 text-sm text-primary font-bold hover:text-secondary transition-colors flex-shrink-0" data-testid="link-all-programs">
              {t("programs.viewAll")} <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {items.map((program, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="group relative rounded-2xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-md transition-shadow duration-200"
              data-testid={`card-program-${index}`}
            >
              {/* Image */}
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={IMAGES[index]}
                  alt={program.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Text */}
              <div className="p-5">
                <h3 className="text-base font-bold text-foreground mb-2">{program.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
                  {program.desc}
                </p>
                <Link
                  href={LINKS[index]}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-primary group-hover:text-secondary transition-colors"
                >
                  {t("programs.learnMore")} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
