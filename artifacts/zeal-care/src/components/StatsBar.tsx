import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";
import { useSiteContent, DEFAULT_CONTENT } from "@/hooks/useSiteContent";
import { useTranslation } from "react-i18next";

function Counter({ end, suffix = "", duration = 2 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const increment = end / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else { setCount(Math.floor(start)); }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [end, duration, isInView]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function parseNum(val: string): { num: number; suffix: string } {
  const match = /^(\d+)(.*)$/.exec(val.trim());
  if (!match) return { num: 0, suffix: val };
  return { num: parseInt(match[1], 10), suffix: match[2] };
}

export function StatsBar() {
  const { data: content } = useSiteContent();
  const { t } = useTranslation();
  const s = content?.settings ?? DEFAULT_CONTENT.settings;

  const scholars = parseNum(s.scholarCount);
  const schools  = parseNum(s.partnerSchools);
  const tech     = parseNum(s.techHours);

  const stats = [
    { value: scholars.num, suffix: scholars.suffix + "+", label: t("stats.activeScholars") },
    { value: 12,           suffix: t("stats.yearSuffix"),  label: t("stats.impactPromise")  },
    { value: schools.num,  suffix: schools.suffix + "+",   label: t("stats.partnerSchools") },
    { value: Math.round(tech.num / 1000), suffix: "k" + tech.suffix, label: t("stats.techHours") },
    { value: 100,          suffix: "%",                    label: t("stats.transparency")   },
  ];

  return (
    <section className="bg-background py-10 border-b border-border">
      <div className="container mx-auto px-5 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
              className={`flex flex-col items-center ${
                /* hide the 5th stat on 2-col grid so it doesn't orphan */
                index === 4 ? "col-span-2 sm:col-span-1" : ""
              }`}
              data-testid={`stat-item-${index}`}
            >
              <div className="text-3xl md:text-4xl font-extrabold text-primary mb-1 tabular-nums">
                <Counter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground text-center leading-snug max-w-[10ch]">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
