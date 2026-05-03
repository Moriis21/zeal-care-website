import { motion } from "framer-motion";

export function Partners() {
  const partners = [
    { name: "Education Partner", type: "Global Education Fund" },
    { name: "Tech Partner", type: "Tech For Africa" },
    { name: "Funding Partner", type: "Liberian Development Trust" },
    { name: "Community Partner", type: "Monrovia Youth Coalition" },
    { name: "Corporate Partner", type: "Innovate Solutions" }
  ];

  return (
    <section className="py-20 bg-background border-t border-border">
      <div className="container mx-auto px-4 text-center">
        <h3 className="text-2xl font-bold text-muted-foreground mb-12 uppercase tracking-widest" data-testid="heading-partners">
          Our Proud Partners
        </h3>
        
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-16">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center justify-center opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
              data-testid={`partner-logo-${index}`}
            >
              <div className="w-32 h-16 md:w-40 md:h-20 bg-muted rounded-xl flex items-center justify-center border border-border mb-3">
                {/* Abstract logo representation */}
                <div className="font-bold text-xl text-muted-foreground">LOGO</div>
              </div>
              <span className="text-xs font-semibold text-muted-foreground tracking-wider uppercase">{partner.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}