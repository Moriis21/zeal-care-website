import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Facebook, Instagram, Linkedin } from "lucide-react";

const LINKS = [
  {
    id: "facebook",
    label: "Follow on Facebook",
    href: "https://www.facebook.com/profile.php?id=61561063778243",
    icon: Facebook,
    color: "#1877F2",
    bg: "#E7F0FF",
  },
  {
    id: "instagram",
    label: "Follow on Instagram",
    href: "https://www.instagram.com/zealcare2024?igsh=MTU2emRiMHBmd3d1Zw==",
    icon: Instagram,
    color: "#E1306C",
    bg: "#FDE8F0",
  },
  {
    id: "linkedin",
    label: "Follow on LinkedIn",
    href: "https://www.linkedin.com/company/zeal-care",
    icon: Linkedin,
    color: "#0A66C2",
    bg: "#E8F0FA",
  },
];

export function SocialFloatingBar() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    // Small delay on mount so entrance animation plays nicely
    const t = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 60 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2 pr-0"
          aria-label="Follow us on social media"
        >
          {LINKS.map(({ id, label, href, icon: Icon, color, bg }) => (
            <motion.a
              key={id}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              onMouseEnter={() => setHovered(id)}
              onMouseLeave={() => setHovered(null)}
              animate={{ x: hovered === id ? -8 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              className="flex items-center justify-end group"
            >
              {/* Label — slides in on hover */}
              <AnimatePresence>
                {hovered === id && (
                  <motion.span
                    initial={{ opacity: 0, x: 12, width: 0 }}
                    animate={{ opacity: 1, x: 0, width: "auto" }}
                    exit={{ opacity: 0, x: 8, width: 0 }}
                    transition={{ duration: 0.18 }}
                    className="text-xs font-bold text-white px-3 py-1.5 rounded-l-lg shadow-md whitespace-nowrap overflow-hidden"
                    style={{ backgroundColor: color }}
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Icon pill */}
              <div
                className="w-10 h-10 rounded-l-xl flex items-center justify-center shadow-md transition-all duration-200"
                style={{ backgroundColor: hovered === id ? color : bg }}
              >
                <Icon
                  className="w-5 h-5 transition-colors duration-200"
                  style={{ color: hovered === id ? "#fff" : color }}
                />
              </div>
            </motion.a>
          ))}

          {/* Follow us label */}
          <div className="flex justify-end mt-1 pr-0">
            <span
              className="text-[9px] font-black uppercase tracking-widest text-white/80 px-2 py-1 rounded-l-lg"
              style={{ backgroundColor: "#061A32", writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            >
              Follow Us
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
