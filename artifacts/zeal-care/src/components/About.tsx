import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import aboutMission from "@assets/Our_Mission_1777770914049.jpeg";
import aboutPhilosophy from "@assets/Our_Philosophy_1777770914049.jpeg";

export function About() {
  return (
    <section id="about" className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <img 
                src={aboutMission}
                alt="Zeal Care team working in the field" 
                className="col-span-2 rounded-2xl shadow-lg w-full h-[300px] object-cover"
                data-testid="img-about-1"
              />
              <div className="bg-secondary rounded-2xl p-8 flex flex-col justify-center items-center text-primary text-center shadow-lg">
                <span className="text-4xl font-extrabold mb-2">12+</span>
                <span className="font-semibold uppercase tracking-wider text-sm">Years of Impact</span>
              </div>
              <img 
                src={aboutPhilosophy}
                alt="Zeal Care students with backpacks" 
                className="rounded-2xl shadow-lg w-full h-[200px] object-cover"
                data-testid="img-about-2"
              />
            </div>
            
            {/* Decorative dots */}
            <div className="absolute -z-10 -top-6 -left-6 w-24 h-24 bg-[radial-gradient(hsl(var(--primary))_2px,transparent_2px)] [background-size:12px_12px] opacity-20"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-wider mb-4 uppercase" data-testid="badge-about">
              Who We Are
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6 leading-tight" data-testid="heading-about">
              Igniting the genius in every child since 2014.
            </h2>
            <p className="text-lg text-muted-foreground mb-6" data-testid="text-about-p1">
              Zeal Care is a nonprofit organization headquartered in Monrovia, Liberia. We are dedicated to empowering Africa's future leaders through comprehensive education, focused mentorship, and crucial technology access.
            </p>
            <p className="text-lg text-muted-foreground mb-8" data-testid="text-about-p2">
              For over a decade, we have partnered with local communities to break down barriers to success. We don't just provide resources; we build pathways for children to discover their potential and transform their communities.
            </p>
            
            <blockquote className="border-l-4 border-secondary pl-6 mb-8 italic text-xl font-medium text-foreground" data-testid="quote-about">
              "When you give a child the right tools and someone who believes in them, their potential is limitless."
            </blockquote>
            
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-6 font-bold" data-testid="button-about-learn-more">
              Learn More About Us
            </Button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
