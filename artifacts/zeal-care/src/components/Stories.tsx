import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useTranslation } from "react-i18next";
import elishakaImg from "@assets/Elishaka_Fofana_Donzo_1777770889388.jpeg";
import ruthImg from "@assets/Ruth_Flomo_1777770889389.jpeg";
import melvinImg from "@assets/Melvin_Jarteh_1777770889388.jpeg";
import varscoImg from "@assets/Varsco_Harris_1777770889389.jpeg";

const STORY_META = [
  { name: "Elishaka Fofana Donzo", age: 10, location: "Monrovia", image: elishakaImg },
  { name: "Ruth Flomo", age: 12, location: "Monrovia", image: ruthImg },
  { name: "Melvin Jarteh", age: 9, location: "Monrovia", image: melvinImg },
  { name: "Varsco Harris", age: 11, location: "Monrovia", image: varscoImg },
];

export function Stories() {
  const { t } = useTranslation();
  const quotes = t("stories.quotes", { returnObjects: true }) as string[];
  const STORY_DATA = STORY_META.map((s, i) => ({ ...s, quote: quotes[i] ?? "" }));

  return (
    <section id="stories" className="py-20 md:py-24 bg-foreground text-background">
      <div className="container mx-auto px-5 sm:px-6">

        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <div className="inline-block px-3 py-1 rounded-full bg-background/10 text-background text-sm font-bold tracking-wider mb-4 uppercase">
            {t("stories.badge")}
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            {t("stories.heading")}
          </h2>
          <p className="text-background/70 text-lg">
            {t("stories.subtitle")}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 max-w-7xl mx-auto">
          {STORY_DATA.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-background/5 p-6 rounded-3xl border border-background/10 relative flex flex-col gap-6"
              data-testid={`card-story-${index}`}
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-secondary/20" />
              
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-secondary flex-shrink-0">
                  <img src={story.image} alt={story.name} className="w-full h-full object-cover object-top" data-testid={`img-story-${index}`} />
                </div>
                <div>
                  <h4 className="font-bold text-base leading-tight">{story.name}</h4>
                  <p className="text-background/60 text-sm">{t("stories.age")} {story.age} &bull; {story.location}</p>
                </div>
              </div>

              <p className="text-base font-medium leading-relaxed italic text-background/85 relative z-10 flex-1">
                "{story.quote}"
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
