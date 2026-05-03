import { motion } from "framer-motion";
import img036 from "@assets/pdf_images/img-036.jpg";
import img040 from "@assets/pdf_images/img-040.jpg";
import img055 from "@assets/pdf_images/img-055.jpg";
import img056 from "@assets/pdf_images/img-056.jpg";
import img057 from "@assets/pdf_images/img-057.jpg";
import img058 from "@assets/pdf_images/img-058.jpg";
import img059 from "@assets/pdf_images/img-059.jpg";
import img060 from "@assets/pdf_images/img-060.jpg";
import img065 from "@assets/pdf_images/img-065.jpg";
import img078 from "@assets/pdf_images/img-078.jpg";
import img085 from "@assets/pdf_images/img-085.jpg";
import img045 from "@assets/pdf_images/img-045.jpg";

const photos = [
  { src: img058, alt: "Student raising hand in class at Esfans Academy", span: "col-span-1 row-span-2" },
  { src: img040, alt: "Esfans Academy school building exterior", span: "col-span-2 row-span-1" },
  { src: img059, alt: "Children proudly displaying their Zeal Care backpacks", span: "col-span-1 row-span-1" },
  { src: img055, alt: "Zeal Care team with students and parents at Esfans", span: "col-span-2 row-span-1" },
  { src: img057, alt: "Young student writing in notebook at school", span: "col-span-1 row-span-1" },
  { src: img036, alt: "Distributing school materials to a child", span: "col-span-1 row-span-1" },
  { src: img056, alt: "Zeal Care team engaging students in classroom", span: "col-span-1 row-span-1" },
  { src: img060, alt: "Children in school uniforms at the blackboard", span: "col-span-1 row-span-1" },
  { src: img065, alt: "Community outreach and survey in West Point", span: "col-span-1 row-span-2" },
  { src: img078, alt: "Zeal Care on ELUM 98.7 FM radio", span: "col-span-1 row-span-1" },
  { src: img045, alt: "Zeal Care team member at Esfans Academy", span: "col-span-1 row-span-1" },
  { src: img085, alt: "Team delivering school supplies in the community", span: "col-span-1 row-span-1" },
];

export function Gallery() {
  return (
    <section id="gallery" className="py-24 bg-[#061A32]">
      <div className="container mx-auto px-4">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 rounded-full bg-secondary/20 text-secondary text-sm font-bold tracking-wider mb-4 uppercase"
          >
            In the Field
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-white mb-6"
          >
            Moments of Change
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/70"
          >
            A glimpse into the real work happening every day — in classrooms, communities, and lives across Monrovia, Liberia.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[220px] gap-4">
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.04, duration: 0.4 }}
              className={`${photo.span} relative rounded-2xl overflow-hidden group cursor-pointer`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                decoding="async"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-[#061A32]/0 group-hover:bg-[#061A32]/50 transition-all duration-300 flex items-end p-4">
                <p className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 leading-snug">
                  {photo.alt}
                </p>
              </div>
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-secondary/50 transition-all duration-300"></div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
