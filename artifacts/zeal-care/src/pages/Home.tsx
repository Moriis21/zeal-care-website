import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { StatsBar } from "@/components/StatsBar";
import { About } from "@/components/About";
import { WhyEmpowerment } from "@/components/WhyEmpowerment";
import { Programs } from "@/components/Programs";
import { Stories } from "@/components/Stories";
import { JoinUs } from "@/components/JoinUs";
import { Partners } from "@/components/Partners";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-[100dvh] flex flex-col font-sans">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <StatsBar />
        <About />
        <WhyEmpowerment />
        <Programs />
        <Stories />
        <JoinUs />
        <Partners />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}