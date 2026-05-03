import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function Contact() {
  return (
    <section id="contact" className="bg-foreground text-background">
      <div className="grid lg:grid-cols-2">
        
        {/* Contact Info & Form */}
        <div className="p-8 md:p-16 lg:p-24 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-block px-3 py-1 rounded-full bg-background/10 text-background text-sm font-bold tracking-wider mb-6 uppercase">
              Get In Touch
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-8 text-background" data-testid="heading-contact">
              Let's create change together.
            </h2>
            
            <div className="flex flex-col gap-6 mb-12">
              <div className="flex items-center gap-4 text-background/80">
                <div className="w-12 h-12 rounded-full bg-background/10 flex items-center justify-center text-secondary">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-wider text-background/50">Email</p>
                  <p className="text-lg">info@zealcare.org</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-background/80">
                <div className="w-12 h-12 rounded-full bg-background/10 flex items-center justify-center text-secondary">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-wider text-background/50">Phone</p>
                  <p className="text-lg">+231 886 727 619</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-background/80">
                <div className="w-12 h-12 rounded-full bg-background/10 flex items-center justify-center text-secondary">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-wider text-background/50">Headquarters</p>
                  <p className="text-lg">Monrovia, Liberia</p>
                </div>
              </div>
            </div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()} data-testid="form-contact">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-bold text-background/70">Full Name</label>
                  <Input id="name" placeholder="John Doe" className="bg-background/5 border-background/20 text-background placeholder:text-background/30 focus-visible:ring-secondary h-12" data-testid="input-name" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-bold text-background/70">Email Address</label>
                  <Input id="email" type="email" placeholder="john@example.com" className="bg-background/5 border-background/20 text-background placeholder:text-background/30 focus-visible:ring-secondary h-12" data-testid="input-email" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-bold text-background/70">Message</label>
                <Textarea id="message" placeholder="How can we help?" className="bg-background/5 border-background/20 text-background placeholder:text-background/30 focus-visible:ring-secondary min-h-[150px] resize-none" data-testid="input-message" />
              </div>
              <Button size="lg" className="bg-secondary text-primary hover:bg-secondary/90 rounded-full px-8 py-6 font-bold w-full md:w-auto" data-testid="button-send">
                Send Message
              </Button>
            </form>
          </motion.div>
        </div>

        {/* Decorative Map / Visual Right Side */}
        <div className="hidden lg:block bg-primary relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(hsl(var(--secondary))_1px,transparent_1px)] [background-size:40px_40px] opacity-10"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-primary-foreground/20 text-center">
              <MapPin className="w-32 h-32 mx-auto mb-6 opacity-50" />
              <h3 className="text-3xl font-extrabold uppercase tracking-widest">Liberia</h3>
              <p className="text-xl tracking-widest mt-2">West Africa</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}