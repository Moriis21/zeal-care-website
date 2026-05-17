import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";

const LANGUAGES = [
  {
    code: "en-US",
    label: "American English",
    nativeLabel: "English (US)",
    flag: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" className="w-5 h-3 rounded-sm flex-shrink-0">
        <clipPath id="us-clip"><path d="M0,0 h60 v30 h-60 z"/></clipPath>
        <clipPath id="us-t"><path d="M30,15 h30 v15 h-30 z M0,0 h30 v30 h-30 z"/></clipPath>
        <g clipPath="url(#us-clip)">
          <path d="M0,0 h60 v30 h-60 z" fill="#B22234"/>
          <path d="M0,2.307h60M0,6.923h60M0,11.538h60M0,16.154h60M0,20.769h60M0,25.385h60" stroke="#fff" strokeWidth="2.307"/>
          <path d="M0,0 h27 v16.154 h-27 z" fill="#3C3B6E"/>
          <g fill="#fff">
            <g id="us-s6">
              <g id="us-s3">
                <g id="us-s">
                  <path id="us-star" d="M4.5,2 L5.386,4.763 L8.294,4.763 L6,6.472 L6.886,9.236 L4.5,7.527 L2.114,9.236 L3,6.472 L0.706,4.763 L3.614,4.763 z" transform="scale(0.5) translate(4,1)"/>
                </g>
                <use href="#us-s" x="9"/>
                <use href="#us-s" x="18"/>
              </g>
              <use href="#us-s3" x="4.5" y="2.7"/>
              <use href="#us-s3" y="5.4"/>
            </g>
            <use href="#us-s6" x="13.5"/>
          </g>
        </g>
      </svg>
    ),
  },
  {
    code: "en-GB",
    label: "British English",
    nativeLabel: "English (UK)",
    flag: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" className="w-5 h-3 rounded-sm flex-shrink-0">
        <clipPath id="gb-clip"><path d="M0,0 h60 v30 h-60 z"/></clipPath>
        <g clipPath="url(#gb-clip)">
          <path d="M0,0 h60 v30 h-60 z" fill="#012169"/>
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4"/>
          <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
          <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
        </g>
      </svg>
    ),
  },
  {
    code: "fr",
    label: "Français",
    nativeLabel: "Français",
    flag: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" className="w-5 h-3 rounded-sm flex-shrink-0">
        <rect width="20" height="30" fill="#002395"/>
        <rect x="20" width="20" height="30" fill="#fff"/>
        <rect x="40" width="20" height="30" fill="#ED2939"/>
      </svg>
    ),
  },
  {
    code: "ar",
    label: "العربية",
    nativeLabel: "العربية",
    flag: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" className="w-5 h-3 rounded-sm flex-shrink-0">
        <rect width="60" height="10" fill="#006C35"/>
        <rect y="10" width="60" height="10" fill="#fff"/>
        <rect y="20" width="60" height="10" fill="#000"/>
        <rect x="0" width="20" height="30" fill="#CE1126"/>
      </svg>
    ),
  },
];

interface Props {
  compact?: boolean;
  light?: boolean;
}

export function LanguageSwitcher({ compact = false, light = false }: Props) {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = LANGUAGES.find((l) => l.code === i18n.language) ?? LANGUAGES[0];

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const changeLanguage = (code: string) => {
    void i18n.changeLanguage(code);
    setOpen(false);
  };

  const triggerClass = light
    ? "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-white hover:bg-white/15 transition-colors cursor-pointer text-xs font-semibold"
    : "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors cursor-pointer text-xs font-semibold text-slate-700";

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className={triggerClass}
        aria-label="Select language"
      >
        {current.flag}
        {!compact && (
          <span className={`hidden sm:inline ${light ? "text-white/90" : "text-slate-600"}`}>
            {current.code === "en-US" ? "EN" : current.code === "en-GB" ? "EN" : current.code === "fr" ? "FR" : "AR"}
          </span>
        )}
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""} ${light ? "text-white/70" : "text-slate-400"}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1.5 w-52 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-[200] animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="px-3 py-2 border-b border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Select Language</p>
          </div>
          <div className="py-1">
            {LANGUAGES.map((lang) => {
              const isActive = lang.code === i18n.language;
              return (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm transition-colors ${
                    isActive
                      ? "bg-[#09609A]/8 text-[#09609A] font-bold"
                      : "text-slate-700 hover:bg-slate-50 font-medium"
                  }`}
                  dir={lang.code === "ar" ? "rtl" : "ltr"}
                >
                  <span className="flex-shrink-0">{lang.flag}</span>
                  <span className="flex-1 text-left" style={{ fontFamily: lang.code === "ar" ? "'Cairo', 'Noto Sans Arabic', sans-serif" : "inherit" }}>
                    {lang.nativeLabel}
                  </span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-[#09609A] flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
