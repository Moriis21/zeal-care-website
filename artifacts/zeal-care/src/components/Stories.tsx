import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import elishakaImg from "@assets/Elishaka_Fofana_Donzo_1777770889388.jpeg";
import ruthImg from "@assets/Ruth_Flomo_1777770889389.jpeg";
import melvinImg from "@assets/Melvin_Jarteh_1777770889388.jpeg";
import varscoImg from "@assets/Varsco_Harris_1777770889389.jpeg";

export function Stories() {
  const stories = [
    {
      name: "Elishaka Fofana Donzo",
      age: 10,
      location: "Monrovia",
      quote: "Before Zeal Care, I didn't know if I could finish school. Now I have books, a uniform, and people who believe in me. I want to be a doctor one day.",
      image: elishakaImg
    },
    {
      name: "Ruth Flomo",
      age: 12,
      location: "Monrovia",
      quote: "Zeal Care gave me a backpack and school supplies, but they also gave me hope. My teacher says I am one of the best students in class.",
      image: ruthImg
    },
    {
      name: "Melvin Jarteh",
      age: 9,
      location: "Monrovia",
      quote: "I love going to school now. The people at Zeal Care are always there for us. I want to grow up and help children just like they helped me.",
      image: melvinImg
    },
    {
      name: "Varsco Harris",
      age: 11,
      location: "Monrovia",
      quote: "My family could not afford school fees. Zeal Care stepped in and now I go to school every day. I am learning and I am proud.",
      image: varscoImg
    }
  ];

  return (
    <section id="stories" className="py-24 bg-foreground text-background">
      <div className="container mx-auto px-4">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-background/10 text-background text-sm font-bold tracking-wider mb-4 uppercase">
            Impact Stories
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            Voices of the Future
          </h2>
          <p className="text-background/70 text-lg">
            Real children. Real families. Real change. These are the faces behind our mission.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {stories.map((story, index) => (
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
                  <p className="text-background/60 text-sm">Age {story.age} &bull; {story.location}</p>
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
