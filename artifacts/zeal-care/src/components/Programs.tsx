import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import scholarImg from "@assets/WhatsApp_Image_2026-05-02_at_2.08.17_AM_(5)_1777770889390.jpeg";
import techImg from "@assets/In_the_field_1777770914048.jpeg";
import mentorshipImg from "@assets/WhatsApp_Image_2026-05-02_at_2.08.17_AM_(3)_1777770889390.jpeg";
import communityImg from "@assets/Social_Justice_1777770914049.jpeg";

export function Programs() {
  const programs = [
    {
      title: "Scholar Support",
      description: "Comprehensive scholarships covering tuition, uniforms, and daily meals for promising students.",
      image: scholarImg,
      link: "#"
    },
    {
      title: "Tech Education",
      description: "State-of-the-art computer labs teaching digital literacy, coding, and modern software skills.",
      image: techImg,
      link: "#"
    },
    {
      title: "Mentorship & Leadership",
      description: "Structured programs fostering critical thinking, public speaking, and ethical leadership.",
      image: mentorshipImg,
      link: "#"
    },
    {
      title: "Community Outreach",
      description: "Engaging families and local leaders to build supportive environments for educational success.",
      image: communityImg,
      link: "#"
    }
  ];

  return (
    <section id="programs" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-wider mb-4 uppercase">
              What We Do
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground">
              Programs that build the future.
            </h2>
          </div>
          <button className="flex items-center gap-2 text-primary font-bold hover:text-secondary transition-colors" data-testid="link-all-programs">
            View All Programs <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {programs.map((program, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative rounded-2xl overflow-hidden shadow-lg border border-border bg-card"
              data-testid={`card-program-${index}`}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={program.image} 
                  alt={program.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-3">{program.title}</h3>
                <p className="text-muted-foreground mb-6 line-clamp-3">
                  {program.description}
                </p>
                <a href={program.link} className="inline-flex items-center gap-2 text-sm font-bold text-primary group-hover:text-secondary transition-colors">
                  Learn more <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
