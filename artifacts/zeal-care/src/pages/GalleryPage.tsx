import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Images } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useSiteContent } from "@/hooks/useSiteContent";

import img036 from "@assets/pdf_images/img-036.jpg";
import img040 from "@assets/pdf_images/img-040.jpg";
import img045 from "@assets/pdf_images/img-045.jpg";
import img054 from "@assets/pdf_images/img-054.jpg";
import img055 from "@assets/pdf_images/img-055.jpg";
import img056 from "@assets/pdf_images/img-056.jpg";
import img057 from "@assets/pdf_images/img-057.jpg";
import img058 from "@assets/pdf_images/img-058.jpg";
import img059 from "@assets/pdf_images/img-059.jpg";
import img060 from "@assets/pdf_images/img-060.jpg";
import img003 from "@assets/pdf_images/img-003.jpg";
import img004 from "@assets/pdf_images/img-004.jpg";
import img022 from "@assets/pdf_images/img-022.jpg";
import img065 from "@assets/pdf_images/img-065.jpg";
import img067 from "@assets/pdf_images/img-067.jpg";
import img068 from "@assets/pdf_images/img-068.jpg";
import img075 from "@assets/pdf_images/img-075.jpg";
import img078 from "@assets/pdf_images/img-078.jpg";
import img085 from "@assets/pdf_images/img-085.jpg";
import heroMain from "@assets/home_hero_page_1777770914048.jpeg";
import heroOverlap from "@assets/hero_1777770914047.jpeg";
import techField from "@assets/In_the_field_1777770914048.jpeg";
import elishaka from "@assets/Elishaka_Fofana_Donzo_1777770889388.jpeg";
import ruth from "@assets/Ruth_Flomo_1777770889389.jpeg";
import melvin from "@assets/Melvin_Jarteh_1777770889388.jpeg";
import varsco from "@assets/Varsco_Harris_1777770889389.jpeg";

export type Category = "All" | "Programs & Education" | "Children's Stories" | "Community" | "Media & Events" | "Team";

type Photo = {
  src: string;
  alt: string;
  category: Exclude<Category, "All">;
};

const BASE_PHOTOS: Photo[] = [
  { src: heroMain, alt: "Zeal Care program activity in the field", category: "Programs & Education" },
  { src: heroOverlap, alt: "Children participating in Zeal Care activities", category: "Programs & Education" },
  { src: img059, alt: "Children proudly displaying their Zeal Care backpacks", category: "Programs & Education" },
  { src: img058, alt: "Student raising hand in class at Esfans Academy", category: "Programs & Education" },
  { src: img057, alt: "Young student writing in notebook at school", category: "Programs & Education" },
  { src: img056, alt: "Zeal Care team engaging students in classroom", category: "Programs & Education" },
  { src: img060, alt: "Children in school uniforms at the blackboard", category: "Programs & Education" },
  { src: img036, alt: "Distributing school materials to a child", category: "Programs & Education" },
  { src: img068, alt: "Community empowerment program session", category: "Programs & Education" },
  { src: techField, alt: "Technology in the field — Zeal Care tech program", category: "Programs & Education" },
  { src: elishaka, alt: "Elishaka Fofana Donzo — Zeal Care scholar", category: "Children's Stories" },
  { src: ruth, alt: "Ruth Flomo — Zeal Care beneficiary", category: "Children's Stories" },
  { src: melvin, alt: "Melvin Jarteh — Zeal Care scholar", category: "Children's Stories" },
  { src: varsco, alt: "Varsco Harris — Zeal Care beneficiary", category: "Children's Stories" },
  { src: img065, alt: "Community outreach and survey in West Point", category: "Community" },
  { src: img067, alt: "Community members gathered at a Zeal Care event", category: "Community" },
  { src: img085, alt: "Team delivering school supplies in the community", category: "Community" },
  { src: img003, alt: "Zeal Care community engagement activity", category: "Community" },
  { src: img004, alt: "Field outreach — meeting families in the community", category: "Community" },
  { src: img022, alt: "Zeal Care community impact moment", category: "Community" },
  { src: img075, alt: "Zeal Care team in the field", category: "Community" },
  { src: "/elum-radio-interview.png", alt: "Zeal Care team live on ELUM 98.7 FM discussing phase launch and sponsorship", category: "Media & Events" },
  { src: img078, alt: "Zeal Care on ELUM 98.7 FM radio studio", category: "Media & Events" },
  { src: img040, alt: "Esfans Academy school building exterior", category: "Media & Events" },
  { src: img055, alt: "Zeal Care team with students and parents at Esfans", category: "Team" },
  { src: img054, alt: "Zeal Care team group photo", category: "Team" },
  { src: img045, alt: "Zeal Care team member at Esfans Academy", category: "Team" },
];

export const GALLERY_CATEGORIES: Category[] = ["All", "Programs & Education", "Children's Stories", "Community", "Media & Events", "Team"];

const CATEGORY_COLORS: Record<Exclude<Category, "All">, string> = {
  "Programs & Education": "#1A44C0",
  "Children's Stories": "#F5C619",
  "Community": "#061A32",
  "Media & Events": "#1A44C0",
  "Team": "#061A32",
};

function isValidCategory(cat: string): cat is Exclude<Category, "All"> {
  return GALLERY_CATEGORIES.slice(1).includes(cat as Category);
}

export default function GalleryPage() {
  const { data: content } = useSiteContent();
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const cmsPhotos: Photo[] = useMemo(() =>
    (content?.gallery?.photos ?? []).map((p) => ({
      src: p.url,
      alt: p.alt,
      category: isValidCategory(p.category) ? p.category : "Programs & Education",
    })),
  [content?.gallery?.photos]);

  const allPhotos = useMemo(() => [...cmsPhotos, ...BASE_PHOTOS], [cmsPhotos]);

  const filtered = useMemo(() =>
    activeCategory === "All"
      ? allPhotos
      : allPhotos.filter((p) => p.category === activeCategory),
  [allPhotos, activeCategory]);

  const closeLightbox = useCallback(() => setLightboxIdx(null), []);

  const prevPhoto = useCallback(() => {
    setLightboxIdx((i) => (i === null ? null : i > 0 ? i - 1 : filtered.length - 1));
  }, [filtered.length]);

  const nextPhoto = useCallback(() => {
    setLightboxIdx((i) => (i === null ? null : i < filtered.length - 1 ? i + 1 : 0));
  }, [filtered.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevPhoto();
      if (e.key === "ArrowRight") nextPhoto();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeLightbox, prevPhoto, nextPhoto]);

  useEffect(() => { setLightboxIdx(null); }, [activeCategory]);

  const counts = useMemo(() => {
    const c: Record<Category, number> = { All: allPhotos.length, "Programs & Education": 0, "Children's Stories": 0, Community: 0, "Media & Events": 0, Team: 0 };
    allPhotos.forEach((p) => { c[p.category] = (c[p.category] ?? 0) + 1; });
    return c;
  }, [allPhotos]);

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative bg-[#061A32] pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #1A44C0 0%, transparent 60%), radial-gradient(circle at 80% 20%, #F5C619 0%, transparent 50%)" }} />
        <div className="absolute top-12 right-20 w-40 h-40 border border-[#F5C619]/20 rounded-full" />
        <div className="absolute bottom-8 left-16 w-24 h-24 border border-[#1A44C0]/30 rounded-full" />

        <div className="container mx-auto px-4 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F5C619]/15 border border-[#F5C619]/30 text-[#F5C619] text-xs font-bold tracking-widest uppercase mb-5">
              <Images className="w-3.5 h-3.5" />
              Photo Gallery
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-5">
              Moments of <span className="text-[#F5C619] italic">Impact</span>
            </h1>
            <p className="text-white/60 text-lg leading-relaxed max-w-xl">
              Every photograph tells the story of a child's potential being ignited.
              Explore the faces, programs, and community behind Zeal Care's mission.
            </p>
            <div className="flex items-center gap-6 mt-8 pt-8 border-t border-white/10">
              <div>
                <p className="text-2xl font-black text-[#F5C619]">{allPhotos.length}</p>
                <p className="text-white/40 text-xs font-semibold uppercase tracking-wider mt-0.5">Photos</p>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div>
                <p className="text-2xl font-black text-[#F5C619]">{GALLERY_CATEGORIES.length - 1}</p>
                <p className="text-white/40 text-xs font-semibold uppercase tracking-wider mt-0.5">Categories</p>
              </div>
              {cmsPhotos.length > 0 && (
                <>
                  <div className="w-px h-8 bg-white/10" />
                  <div>
                    <p className="text-2xl font-black text-[#F5C619]">{cmsPhotos.length}</p>
                    <p className="text-white/40 text-xs font-semibold uppercase tracking-wider mt-0.5">New Uploads</p>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter bar */}
      <section className="bg-white border-b border-slate-100 sticky top-0 z-30 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto py-4 scrollbar-none">
            {GALLERY_CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeCategory === cat ? "bg-[#061A32] text-white shadow-md" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}>
                {cat}
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                  activeCategory === cat ? "bg-white/20 text-white" : "bg-slate-200 text-slate-500"
                }`}>{counts[cat]}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="bg-slate-50 py-12 min-h-[60vh]">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div key={activeCategory}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
              {filtered.map((photo, idx) => (
                <motion.div key={`${photo.src}-${idx}`}
                  initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.025, duration: 0.35 }}
                  onClick={() => setLightboxIdx(idx)}
                  className="break-inside-avoid rounded-2xl overflow-hidden cursor-pointer group relative shadow-sm hover:shadow-xl transition-shadow duration-300 mb-4">
                  <img src={photo.src} alt={photo.alt}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy" decoding="async" />
                  <div className="absolute inset-0 bg-[#061A32]/0 group-hover:bg-[#061A32]/55 transition-all duration-300 flex flex-col justify-end p-4">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-2"
                        style={{ backgroundColor: `${CATEGORY_COLORS[photo.category]}33`, color: "#F5C619" }}>
                        {photo.category}
                      </span>
                      <p className="text-white text-xs font-medium leading-snug line-clamp-2">{photo.alt}</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#F5C619]/40 transition-all duration-300 pointer-events-none" />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}>
            <button onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/50 text-sm font-semibold">
              {lightboxIdx + 1} / {filtered.length}
            </div>
            <button onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
              className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <motion.div key={lightboxIdx} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2 }}
              className="max-w-5xl max-h-[85vh] w-full mx-16 flex flex-col items-center gap-4"
              onClick={(e) => e.stopPropagation()}>
              <img src={filtered[lightboxIdx].src} alt={filtered[lightboxIdx].alt}
                className="max-h-[78vh] max-w-full object-contain rounded-xl shadow-2xl" />
              <div className="text-center">
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#F5C619]/20 text-[#F5C619] mb-2">
                  {filtered[lightboxIdx].category}
                </span>
                <p className="text-white/70 text-sm max-w-lg">{filtered[lightboxIdx].alt}</p>
              </div>
            </motion.div>
            <button onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
              className="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10">
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}
