import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroMain from "@assets/home_hero_page_1777770914048.jpeg";
import heroOverlap from "@assets/hero_1777770914047.jpeg";

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-primary text-primary-foreground">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-[#1A44C0] to-primary/90 opacity-90"></div>
      
      <div className="container relative z-10 mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 text-sm font-semibold tracking-wider mb-6" data-testid="badge-hero">
            EMPOWERING AFRICA'S FUTURE LEADERS
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6" data-testid="heading-hero">
            Igniting Potential,<br/>
            <span className="text-secondary">Inspiring Change.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 leading-relaxed max-w-lg" data-testid="text-hero-desc">
            We believe every child is a spark of genius. We provide the tools, mentorship, and opportunities to set that genius free.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="bg-secondary text-primary hover:bg-secondary/90 rounded-full px-8 py-6 text-lg font-bold" data-testid="button-sponsor">
              SPONSOR A CHILD &rarr;
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary rounded-full px-8 py-6 text-lg font-bold" data-testid="button-impact">
              OUR IMPACT
            </Button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative h-[500px] lg:h-[600px] w-full hidden md:block"
        >
          {/* Main Image */}
          <div className="absolute top-0 right-0 w-3/4 h-4/5 rounded-2xl overflow-hidden shadow-2xl border-4 border-background/10 z-10">
            <img 
              src={heroMain}
              alt="Zeal Care students in school uniform" 
              className="w-full h-full object-cover"
              data-testid="img-hero-main"
            />
          </div>
          
          {/* Overlapping Image */}
          <div className="absolute bottom-0 left-0 w-2/3 h-2/3 rounded-2xl overflow-hidden shadow-2xl border-4 border-background z-20">
            <img 
              src={heroOverlap}
              alt="Zeal Care student studying" 
              className="w-full h-full object-cover"
              data-testid="img-hero-overlap"
            />
          </div>

          {/* Floating Badge */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="absolute top-1/4 -left-6 bg-secondary text-primary w-20 h-20 rounded-full flex items-center justify-center font-extrabold text-3xl shadow-xl z-30 border-4 border-background"
            data-testid="badge-floating"
          >
            A+
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
