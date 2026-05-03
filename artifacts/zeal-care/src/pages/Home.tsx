import { Hero } from "@/components/Hero";
import { StatsBar } from "@/components/StatsBar";
import { DonationTicker } from "@/components/DonationTicker";
import { About } from "@/components/About";
import { WhyEmpowerment } from "@/components/WhyEmpowerment";
import { Programs } from "@/components/Programs";
import { Gallery } from "@/components/Gallery";
import { Stories } from "@/components/Stories";
import { JoinUs } from "@/components/JoinUs";
import { Partners } from "@/components/Partners";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { useDonationStats } from "@/hooks/useDonationStats";

export default function Home() {
  const { data: donationStats } = useDonationStats();
  return (
    <div className="min-h-[100dvh] flex flex-col font-sans">
      <main className="flex-1">
        <Hero />
        <StatsBar />
        <DonationTicker stats={donationStats ?? null} />
        <About />
        <WhyEmpowerment />
        <Programs />
        <Gallery />
        <Stories />
        <JoinUs />
        <Partners />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
