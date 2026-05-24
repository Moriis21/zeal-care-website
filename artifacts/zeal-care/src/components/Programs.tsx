import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
// Official program photos from /public (matches the 4 official programs per the project document)
const IMAGES = [
  "/program-education.jpg",   // Education Sponsorship, Support & Advocacy
  "/program-leadership.jpg",  // Leadership Development Programs
  "/program-stem.jpg",        // Entrepreneurship / STEM (program 3)
  "/community-rooted.jpg",    // Community Outreach (program 4)
];
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
    <section id="programs" className="section-y bg-background">
      <div className="container">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10 md:mb-14">
          <div className="max-w-xl">
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wider mb-4 uppercase">
              {t("programs.badge")}
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground leading-tight tracking-tight">
              {t("programs.heading")}
            </h2>
          </div>
          <Link href="/what-we-do/programs">
            <button className="flex items-center gap-1.5 text-sm text-primary font-bold hover:text-secondary transition-colors flex-shrink-0" data-testid="link-all-programs">
              {t("programs.viewAll")} <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

        {/* Cards — equal height grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7">
          {items.map((program, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="group flex flex-col rounded-3xl overflow-hidden border border-border bg-card shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.09)] hover:-translate-y-1 transition-all duration-300 h-full"
              data-testid={`card-program-${index}`}
            >
              {/* Image — fixed aspect ratio, never stretches */}
              <div className="overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <img
                  src={IMAGES[index]}
                  alt={program.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Text — flex-grow so all cards align */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-foreground mb-3 leading-snug">{program.title}</h3>
                <p className="text-sm text-muted-foreground mb-5 line-clamp-3 leading-[1.7] flex-grow">
                  {program.desc}
                </p>
                <Link
                  href={LINKS[index]}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-primary group-hover:text-secondary transition-colors mt-auto"
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
