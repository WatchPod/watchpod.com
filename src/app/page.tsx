import { Navbar } from "@/components/ui/navbar";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Features } from "@/components/sections/features";
import { Pods } from "@/components/sections/pods";
import { Footer } from "@/components/sections/footer";
import { WaitlistCta } from "@/components/sections/waitlist-cta";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="snap-y snap-proximity">
        <section id="hero" className="snap-start min-h-screen">
          <Hero />
        </section>
        <section id="how-it-works" className="snap-start min-h-screen">
          <HowItWorks />
        </section>
        <section id="features" className="snap-start min-h-screen">
          <Features />
        </section>
        <section id="pods" className="snap-start min-h-screen">
          <Pods />
        </section>
        <section id="waitlist" className="snap-start">
          <WaitlistCta />
        </section>
        <section>
          <Footer />
        </section>
      </main>
    </>
  );
}
