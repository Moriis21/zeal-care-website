import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useTranslation } from "react-i18next";

// Official beneficiary headshots from /public (provided by the project team)
const STORY_META = [
  { name: "Elishaka Fofana Donzo", age: 10, location: "Monrovia", image: "/story-elishaka.jpg" },
  { name: "Ruth Flomo",            age: 12, location: "Monrovia", image: "/story-ruth.jpg" },
  { name: "Melvin Jarteh",         age:  9, location: "Monrovia", image: "/story-melvin.jpg" },
  { name: "Varsco Harris",         age: 11, location: "Monrovia", image: "/story-varsco.jpg" },
];

export function Stories() {
  const { t } = useTranslation();
  const quotes = t("stories.quotes", { returnObjects: true }) as string[];
  const STORY_DATA = STORY_META.map((s, i) => ({ ...s, quote: quotes[i] ?? "" }));

  return (
    <section id="stories" className="section-y bg-foreground text-background">
      <div className="container">

        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-14">
          <div className="inline-block px-3 py-1 rounded-full bg-background/10 text-background text-xs font-bold tracking-[0.15em] mb-4 uppercase">
            {t("stories.badge")}
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-5 tracking-tight">
            {t("stories.heading")}
          </h2>
          <p className="text-background/70 text-base md:text-lg leading-[1.7]">
            {t("stories.subtitle")}
          </p>
        </div>

        {/* Equal-height grid of story cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7">
          {STORY_DATA.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-background/5 p-8 rounded-3xl border border-background/10 relative flex flex-col gap-5 h-full hover:bg-background/8 transition-colors"
              data-testid={`card-story-${index}`}
            >
              <Quote className="absolute top-5 right-5 w-9 h-9 text-secondary/20" />

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-secondary flex-shrink-0">
                  <img src={story.image} alt={story.name} className="w-full h-full object-cover object-top" data-testid={`img-story-${index}`} loading="lazy" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-[15px] leading-tight truncate">{story.name}</h4>
                  <p className="text-background/55 text-xs mt-0.5">{t("stories.age")} {story.age} &middot; {story.location}</p>
                </div>
              </div>

              <p className="text-[14px] font-medium leading-[1.75] italic text-background/80 relative z-10 flex-1">
                &ldquo;{story.quote}&rdquo;
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
