import { Navbar } from "@/components/ui/navbar";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Features } from "@/components/sections/features";
import { Pods } from "@/components/sections/pods";
import { Footer } from "@/components/sections/footer";
import { DownloadCta } from "@/components/sections/download-cta";

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://watchpod.com/#organization",
      name: "WatchPod",
      url: "https://watchpod.com",
      logo: "https://watchpod.com/logo.svg",
      email: "feedback@watchpod.com",
    },
    {
      "@type": "WebSite",
      "@id": "https://watchpod.com/#website",
      url: "https://watchpod.com",
      name: "WatchPod",
      description:
        "The one-stop platform to figure out what to watch, with one or many people.",
      publisher: { "@id": "https://watchpod.com/#organization" },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
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
        <section id="download" className="snap-start">
          <DownloadCta />
        </section>
        <section>
          <Footer />
        </section>
      </main>
    </>
  );
}
