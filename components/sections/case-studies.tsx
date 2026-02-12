"use client";

import { HoverPreviewLink, HoverPreviewProvider } from "@/components/ui/hover-preview";
import { VercelTabs } from "@/components/ui/vercel-tabs";
import Image from "next/image";

const categories = ["All", "Branding", "Packaging", "Content", "3D"];

const projects = [
  { title: "Lumina Skincare", category: "Branding", image: "https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?w=600&h=450&fit=crop" },
  { title: "Arcadia Coffee", category: "Packaging", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=450&fit=crop" },
  { title: "Vertex Studios", category: "3D", image: "https://images.unsplash.com/photo-1642425149556-b6fdfd4adf1a?w=600&h=450&fit=crop" },
];

function ProjectGrid({ category }: { category: string }) {
  const filtered = category === "All" ? projects : projects.filter((p) => p.category === category);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
      {filtered.map((project) => (
        <article key={project.title} className="overflow-hidden rounded-[20px] border border-[#CBD2DC]/50 shadow-[0px_4px_20px_rgba(30,51,95,0.08)]">
          <div className="relative aspect-[4/3]">
            <Image src={project.image} alt={project.title} fill className="object-cover" unoptimized />
          </div>
          <div className="p-6">
            <p className="mb-1 text-sm font-medium uppercase tracking-wider text-[#26437A]/60">{project.category}</p>
            <h3 className="font-playfair text-2xl font-bold text-[#26437A]">
              <span className="hidden md:inline">
                <HoverPreviewLink previewKey={project.title} className="hover:after:hidden">{project.title}</HoverPreviewLink>
              </span>
              <span className="md:hidden">{project.title}</span>
            </h3>
          </div>
        </article>
      ))}
    </div>
  );
}

export function CaseStudies() {
  const tabs = categories.map((c) => ({ label: c, value: c, content: <ProjectGrid category={c} /> }));
  const previewData = projects.reduce((acc, project) => {
    acc[project.title] = { title: project.title, subtitle: project.category, image: project.image };
    return acc;
  }, {} as Record<string, { title: string; subtitle: string; image: string }>);

  return (
    <section id="work" className="cc-section bg-white">
      <div className="cc-container">
        <h2 className="mb-4 text-center font-playfair text-[30px] font-bold text-[#26437A] md:text-[48px]">Selected Work</h2>
        <HoverPreviewProvider data={previewData}>
          <VercelTabs tabs={tabs} defaultTab="All" />
        </HoverPreviewProvider>
      </div>
    </section>
  );
}
