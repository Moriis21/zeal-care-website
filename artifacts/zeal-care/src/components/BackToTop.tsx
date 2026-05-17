import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function BackToTop() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? scrollTop / docHeight : 0;
      setProgress(pct);
      setVisible(scrollTop > 300);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const size = 52;
  const stroke = 3.5;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const dash = circ * progress;

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="btt"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          aria-label="Back to top"
          className="fixed bottom-7 right-7 z-50 rounded-full shadow-2xl focus:outline-none group"
          style={{ width: size, height: size }}
        >
          {/* Outer progress ring */}
          <svg
            width={size}
            height={size}
            className="absolute inset-0 -rotate-90"
            style={{ filter: "drop-shadow(0 0 6px #FBD30888)" }}
          >
            {/* Track */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke="#061A32"
              strokeWidth={stroke}
              opacity={0.18}
            />
            {/* Progress arc */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke="#FBD308"
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={`${dash} ${circ}`}
              style={{ transition: "stroke-dasharray 0.15s linear" }}
            />
          </svg>

          {/* Centre disc */}
          <div className="absolute inset-[5px] rounded-full bg-[#061A32] flex items-center justify-center group-hover:bg-[#09609A] transition-colors duration-300">
            {/* Animated chevron arrow */}
            <motion.svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              animate={{ y: [0, -2, 0] }}
              transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
            >
              <path
                d="M8 12 L3 7 L5 5 L8 8 L11 5 L13 7 Z"
                fill="#FBD308"
                style={{ transform: "scaleY(-1)", transformOrigin: "50% 50%" }}
              />
            </motion.svg>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
