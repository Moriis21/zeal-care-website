import { useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
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

const photos = [
  { src: "/elum-radio-interview.png", alt: "Zeal Care team live on ELUM 98.7 FM", span: "col-span-2 row-span-1" },
  { src: img058, alt: "Student raising hand in class at Esfans Academy", span: "col-span-1 row-span-2" },
  { src: img040, alt: "Esfans Academy school building exterior", span: "col-span-2 row-span-1" },
  { src: img059, alt: "Children proudly displaying their Zeal Care backpacks", span: "col-span-1 row-span-1" },
  { src: img055, alt: "Zeal Care team with students and parents", span: "col-span-2 row-span-1" },
  { src: img057, alt: "Young student writing in notebook at school", span: "col-span-1 row-span-1" },
  { src: img036, alt: "Distributing school materials to a child", span: "col-span-1 row-span-1" },
  { src: img056, alt: "Zeal Care team engaging students in classroom", span: "col-span-1 row-span-1" },
  { src: img060, alt: "Children in school uniforms at the blackboard", span: "col-span-1 row-span-1" },
  { src: img065, alt: "Community outreach and survey in West Point", span: "col-span-1 row-span-2" },
  { src: img078, alt: "Zeal Care on ELUM 98.7 FM radio", span: "col-span-1 row-span-1" },
  { src: img045, alt: "Zeal Care team member at Esfans Academy", span: "col-span-1 row-span-1" },
  { src: img085, alt: "Team delivering school supplies in the community", span: "col-span-1 row-span-1" },
  { src: img054, alt: "Zeal Care team group photo", span: "col-span-1 row-span-1" },
  { src: img067, alt: "Community members gathered at a Zeal Care event", span: "col-span-1 row-span-1" },
  { src: img068, alt: "Community empowerment program session", span: "col-span-1 row-span-1" },
  { src: techField, alt: "Technology in the field — Zeal Care tech program", span: "col-span-1 row-span-1" },
  { src: heroMain, alt: "Zeal Care program activity in the field", span: "col-span-1 row-span-1" },
  { src: heroOverlap, alt: "Children participating in Zeal Care activities", span: "col-span-1 row-span-1" },
  { src: elishaka, alt: "Elishaka Fofana Donzo — Zeal Care scholar", span: "col-span-1 row-span-1" },
  { src: ruth, alt: "Ruth Flomo — Zeal Care beneficiary", span: "col-span-1 row-span-1" },
  { src: melvin, alt: "Melvin Jarteh — Zeal Care scholar", span: "col-span-1 row-span-1" },
  { src: varsco, alt: "Varsco Harris — Zeal Care beneficiary", span: "col-span-1 row-span-1" },
  { src: img075, alt: "Zeal Care team in the field", span: "col-span-1 row-span-1" },
];

export function Gallery() {
  const { t } = useTranslation();
  const { data: content } = useSiteContent();

  const cmsPhotos = useMemo(() =>
    (content?.gallery?.photos ?? []).map((p) => ({
      src: p.url,
      alt: p.alt,
      span: "col-span-1 row-span-1",
    })),
  [content?.gallery?.photos]);

  const allPhotos = useMemo(() => [...cmsPhotos, ...photos], [cmsPhotos]);

  return (
    <section id="gallery" className="py-20 md:py-24 bg-[#061A32]">
      <div className="container mx-auto px-4">

        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12 px-5 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 rounded-full bg-secondary/20 text-secondary text-sm font-bold tracking-wider mb-4 uppercase"
          >
            {t("gallery.badge")}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-white mb-6"
          >
            {t("gallery.heading")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/70"
          >
            {t("gallery.subtitle")}
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[220px] gap-4">
          {allPhotos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.03, duration: 0.4 }}
              className={`${photo.span} relative rounded-2xl overflow-hidden group cursor-pointer`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-[#061A32]/0 group-hover:bg-[#061A32]/50 transition-all duration-300 flex items-end p-4">
                <p className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 leading-snug">
                  {photo.alt}
                </p>
              </div>
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-secondary/50 transition-all duration-300" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center mt-12"
        >
          <Link href="/gallery" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F5C619] text-[#061A32] font-bold text-sm hover:bg-[#F5C619]/90 transition-colors shadow-lg hover:shadow-[#F5C619]/30">
            {t("gallery.viewFull")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
