import { BrandDNA } from "@/components/sections/brand-dna";
import { CaseStudies } from "@/components/sections/case-studies";
import { FAQ } from "@/components/sections/faq";
import { Footer, StickyMobileCTA } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { Process } from "@/components/sections/process";
import { Services } from "@/components/sections/services";
import { SocialProof } from "@/components/sections/social-proof";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SocialProof />
        <Services />
        <CaseStudies />
        <BrandDNA />
        <Process />
        <FAQ />
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
}
