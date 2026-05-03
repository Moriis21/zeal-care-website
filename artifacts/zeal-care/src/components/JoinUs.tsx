import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function JoinUs() {
  return (
    <section id="join-us" className="relative py-32 overflow-hidden bg-[#1A44C0] text-primary-foreground">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/join-us-bg.png" 
          alt="Children running" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#1A44C0]/80 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-secondary text-primary text-sm font-bold tracking-wider mb-8 uppercase" data-testid="badge-join">
            Igniting Potential
          </div>
          
          <h2 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight drop-shadow-lg" data-testid="heading-join">
            Be the Spark.
          </h2>
          
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-12 leading-relaxed max-w-2xl mx-auto drop-shadow-md">
            Join our mission to empower the next generation. Whether you become a sponsor, a partner, or a volunteer, your contribution creates lasting change.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Button size="lg" className="bg-secondary text-primary hover:bg-secondary/90 rounded-full px-10 py-6 text-lg font-bold" data-testid="button-sponsor-large">
              SPONSOR A CHILD
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary rounded-full px-10 py-6 text-lg font-bold" data-testid="button-volunteer">
              VOLUNTEER NOW
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}