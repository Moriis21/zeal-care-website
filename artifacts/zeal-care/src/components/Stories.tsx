import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export function Stories() {
  const stories = [
    {
      name: "Amara Kollie",
      age: 14,
      location: "Monrovia",
      quote: "Before Zeal Care, I didn't know if I could finish middle school. Now, I'm learning to code and I want to be a software engineer. They gave me the tools to dream bigger.",
      image: "/story-amara.png"
    },
    {
      name: "David Mensah",
      age: 16,
      location: "Monrovia",
      quote: "My mentor changed how I see myself. He taught me that my voice matters. The leadership program showed me I can be a leader in my community today, not just tomorrow.",
      image: "/story-david.png"
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
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {stories.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="bg-background/5 p-8 md:p-10 rounded-3xl border border-background/10 relative"
              data-testid={`card-story-${index}`}
            >
              <Quote className="absolute top-8 right-8 w-12 h-12 text-secondary/20" />
              
              <div className="flex flex-col h-full justify-between gap-8">
                <p className="text-xl md:text-2xl font-medium leading-relaxed italic text-background/90 relative z-10">
                  "{story.quote}"
                </p>
                
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-secondary">
                    <img src={story.image} alt={story.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{story.name}</h4>
                    <p className="text-background/60 text-sm">Age {story.age} &bull; {story.location}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}