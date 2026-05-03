import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Heart, Users, TrendingUp, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";

type DonationStats = {
  totalCount: number;
  totalAmount: number;
  childrenSponsored: number;
  lastUpdated: string;
};

function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current || !ref.current) return;
    hasAnimated.current = true;
    const node = ref.current;
    const controls = animate(0, value, {
      duration: 2,
      ease: "easeOut",
      onUpdate(v) {
        node.textContent =
          prefix +
          v.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
          suffix;
      },
    });
    return () => controls.stop();
  }, [isInView, value, prefix, suffix, decimals]);

  return (
    <span ref={ref}>
      {prefix}
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}

const PulseDot = () => (
  <span className="relative inline-flex items-center ml-2">
    <span className="absolute inline-flex h-2.5 w-2.5 rounded-full bg-green-400 opacity-75 animate-ping" />
    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400" />
  </span>
);

export function DonationTicker({ stats }: { stats: DonationStats | null }) {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (isInView) setIsVisible(true);
  }, [isInView]);

  const schoolMonths = (stats?.childrenSponsored ?? 0) * 12;

  const items = [
    {
      icon: <Users className="w-7 h-7" />,
      value: stats?.childrenSponsored ?? 0,
      label: t("ticker.children"),
      suffix: stats?.childrenSponsored ? "+" : "",
      color: "from-secondary/20 to-secondary/5",
      iconColor: "text-secondary",
      borderColor: "border-secondary/30",
    },
    {
      icon: <Heart className="w-7 h-7" />,
      value: stats?.totalCount ?? 0,
      label: t("ticker.donors"),
      suffix: stats?.totalCount ? "+" : "",
      color: "from-blue-500/10 to-blue-500/5",
      iconColor: "text-blue-400",
      borderColor: "border-blue-400/30",
    },
    {
      icon: <TrendingUp className="w-7 h-7" />,
      value: stats?.totalAmount ?? 0,
      label: t("ticker.raised"),
      prefix: "$",
      color: "from-green-500/10 to-green-500/5",
      iconColor: "text-green-400",
      borderColor: "border-green-400/30",
    },
    {
      icon: <Zap className="w-7 h-7" />,
      value: schoolMonths,
      label: t("ticker.months"),
      suffix: schoolMonths ? "+" : "",
      color: "from-purple-500/10 to-purple-500/5",
      iconColor: "text-purple-400",
      borderColor: "border-purple-400/30",
    },
  ];

  return (
    <div ref={ref} className="bg-primary py-14 border-y border-white/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-4">
            <span className="text-white/80 text-sm font-semibold tracking-wide uppercase">
              {t("ticker.badge")}
            </span>
            <PulseDot />
          </div>
          <h2 className="text-white font-black text-2xl md:text-3xl lg:text-4xl">
            {t("ticker.heading")}
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 24 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`bg-gradient-to-br ${item.color} border ${item.borderColor} rounded-2xl p-5 md:p-7 text-center backdrop-blur-sm`}
            >
              <div className={`${item.iconColor} flex justify-center mb-3`}>
                {item.icon}
              </div>
              <div className="text-white font-black text-3xl md:text-4xl xl:text-5xl mb-1 tabular-nums">
                <AnimatedNumber
                  value={item.value}
                  prefix={item.prefix}
                  suffix={item.suffix}
                />
              </div>
              <p className="text-white/60 text-xs md:text-sm font-semibold uppercase tracking-wider">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>

        {stats?.lastUpdated && stats.totalCount > 0 && (
          <p className="text-center text-white/30 text-xs mt-6">
            Last updated{" "}
            {new Date(stats.lastUpdated).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
            <PulseDot />
          </p>
        )}
      </div>
    </div>
  );
}
