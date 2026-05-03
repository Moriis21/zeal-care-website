import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import scholarImg from "@assets/pdf_images/img-059.jpg";
import techImg from "@assets/In_the_field_1777770914048.jpeg";
import mentorshipImg from "@assets/pdf_images/img-058.jpg";
import communityImg from "@assets/pdf_images/img-068.jpg";

export function Programs() {
  const programs = [
    {
      title: "Scholar Support",
      description: "Comprehensive scholarships covering tuition, school supplies, uniforms, and backpacks for promising students who need it most.",
      image: scholarImg,
      link: "/what-we-do/education-sponsorship",
    },
    {
      title: "Tech Education",
      description: "State-of-the-art computer labs teaching digital literacy, coding, and modern software skills to prepare youth for the digital economy.",
      image: techImg,
      link: "/what-we-do/digital-education",
    },
    {
      title: "Classroom Engagement",
      description: "Active school visits and interactive learning sessions that inspire curiosity, build confidence, and make education exciting.",
      image: mentorshipImg,
      link: "/what-we-do/leadership-development",
    },
    {
      title: "Community Outreach",
      description: "Engaging families, local leaders, and households to build supportive environments where every child's education is valued.",
      image: communityImg,
      link: "/what-we-do/programs",
    },
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
          <Link href="/what-we-do/programs">
            <button className="flex items-center gap-2 text-primary font-bold hover:text-secondary transition-colors" data-testid="link-all-programs">
              View All Programs <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
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
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-3">{program.title}</h3>
                <p className="text-muted-foreground mb-6 line-clamp-3">
                  {program.description}
                </p>
                <Link href={program.link} className="inline-flex items-center gap-2 text-sm font-bold text-primary group-hover:text-secondary transition-colors">
                  Learn more <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
