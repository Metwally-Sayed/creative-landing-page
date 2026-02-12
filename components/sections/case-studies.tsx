"use client";

import { HoverPreviewLink, HoverPreviewProvider } from "@/components/ui/hover-preview";
import { VercelTabs } from "@/components/ui/vercel-tabs";
import Image from "next/image";

const categories = ["All", "Branding", "Packaging", "Content", "3D"];

const projects = [
  {
    title: "Lumina Skincare",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=450&fit=crop",
  },
  {
    title: "Arcadia Coffee",
    category: "Packaging",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&h=450&fit=crop",
  },
  {
    title: "Vertex Studios",
    category: "3D",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=450&fit=crop",
  },
  {
    title: "Flora & Bloom",
    category: "Content",
    image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=600&h=450&fit=crop",
  },
  {
    title: "Onyx Athletics",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=450&fit=crop",
  },
  {
    title: "Zephyr Homes",
    category: "Packaging",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=450&fit=crop",
  },
];

function ProjectGrid({ category }: { category: string }) {
  const filtered =
    category === "All"
      ? projects
      : projects.filter((p) => p.category === category);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
      {filtered.map((project) => (
        <div
          key={project.title}
          className="group rounded-[20px] border border-[#CBD2DC]/50 shadow-[0px_4px_20px_rgba(30,51,95,0.08)] overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
        >
          <div className="relative aspect-4/3 overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              unoptimized
            />
          </div>
          <div className="p-6">
            <p className="text-[#26437A]/60 font-medium text-sm uppercase tracking-wider mb-1">
              {project.category}
            </p>
            <h3 className="font-playfair font-bold text-2xl text-[#26437A] group-hover:text-[#E8874C] transition-colors duration-300">
              <HoverPreviewLink previewKey={project.title} className="hover:after:hidden">
                {project.title}
              </HoverPreviewLink>
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
}

export function CaseStudies() {
  const tabs = categories.map((c) => ({
    label: c,
    value: c,
    content: <ProjectGrid category={c} />,
  }));

  // Create preview data for HoverPreview
  const previewData = projects.reduce((acc, project) => {
    acc[project.title] = {
      title: project.title,
      subtitle: project.category,
      image: project.image,
    };
    return acc;
  }, {} as Record<string, { title: string; subtitle: string; image: string }>);

  return (
    <section id="work" className="py-16 md:py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-5 md:px-20">
        <h2 className="font-playfair font-bold text-[30px] md:text-[48px] text-[#26437A] mb-4 text-center">
          Selected Work
        </h2>
        <HoverPreviewProvider data={previewData}>
          <VercelTabs tabs={tabs} defaultTab="All" />
        </HoverPreviewProvider>
      </div>
    </section>
  );
}
