import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enUS from "./locales/en-US.json";
import enGB from "./locales/en-GB.json";
import fr from "./locales/fr.json";
import ar from "./locales/ar.json";

const STORAGE_KEY = "zc_lang";

function applyDir(lang: string) {
  const isRtl = lang === "ar";
  document.documentElement.dir = isRtl ? "rtl" : "ltr";
  document.documentElement.lang = lang;
}

void i18n.use(initReactI18next).init({
  resources: {
    "en-US": { translation: enUS },
    "en-GB": { translation: enGB },
    fr:      { translation: fr  },
    ar:      { translation: ar  },
  },
  lng: localStorage.getItem(STORAGE_KEY) ?? "en-US",
  fallbackLng: "en-US",
  interpolation: { escapeValue: false },
});

applyDir(i18n.language);

i18n.on("languageChanged", (lang) => {
  localStorage.setItem(STORAGE_KEY, lang);
  applyDir(lang);
});

export default i18n;
