import { ExpertiseCreative } from "@/components/landing/ExpertiseCreative";
import { FaqCtaCreative } from "@/components/landing/FaqCtaCreative";
import { StickyMobileCTARefactor } from "@/components/landing/FooterRefactor";
import { ProcessCreative } from "@/components/landing/ProcessCreative";
import { SelectedWorkSection } from "@/components/landing/SelectedWorkSection";
import FooterStandard from "@/components/mvpblocks/footer-standard";
import { BrandDNA } from "@/components/sections/brand-dna";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { SocialProof } from "@/components/sections/social-proof";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SocialProof />
        <ExpertiseCreative />
        <SelectedWorkSection />
        <BrandDNA />
        <ProcessCreative />
        <FaqCtaCreative />
      </main>
      <FooterStandard />
      <StickyMobileCTARefactor />
    </>
  );
}
