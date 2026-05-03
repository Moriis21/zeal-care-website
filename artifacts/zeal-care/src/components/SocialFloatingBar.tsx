import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Facebook, Instagram, Linkedin } from "lucide-react";

const LINKS = [
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61561063778243",
    icon: Facebook,
    color: "#1877F2",
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/zealcare2024?igsh=MTU2emRiMHBmd3d1Zw==",
    icon: Instagram,
    color: "#E1306C",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/zeal-care",
    icon: Linkedin,
    color: "#0A66C2",
  },
];

export function SocialFloatingBar() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 700);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-0"
          aria-label="Follow us on social media"
        >
          {/* Grouped card */}
          <div className="flex flex-col items-center bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full shadow-md py-2 px-1 gap-1">
            {LINKS.map(({ id, label, href, icon: Icon, color }, i) => (
              <div key={id} className="relative flex items-center">
                {/* Divider between items */}
                {i > 0 && (
                  <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-4 h-px bg-gray-200" />
                )}

                {/* Tooltip */}
                <AnimatePresence>
                  {hovered === id && (
                    <motion.div
                      initial={{ opacity: 0, x: 6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 4 }}
                      transition={{ duration: 0.14 }}
                      className="absolute right-full mr-2.5 px-2 py-1 rounded-md text-white text-[11px] font-semibold whitespace-nowrap pointer-events-none shadow-sm"
                      style={{ backgroundColor: color }}
                    >
                      {label}
                      {/* Arrow */}
                      <span
                        className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-full"
                        style={{
                          borderWidth: "4px 0 4px 5px",
                          borderStyle: "solid",
                          borderColor: `transparent transparent transparent ${color}`,
                          width: 0,
                          height: 0,
                          display: "block",
                        }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  onMouseEnter={() => setHovered(id)}
                  onMouseLeave={() => setHovered(null)}
                  className="w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-150"
                  style={{
                    color: hovered === id ? color : "#9CA3AF",
                    backgroundColor: hovered === id ? `${color}14` : "transparent",
                  }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>

          {/* Subtle "follow" label */}
          <p
            className="mt-2 text-[8px] font-semibold uppercase tracking-widest text-gray-400"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", letterSpacing: "0.15em" }}
          >
            Follow
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
