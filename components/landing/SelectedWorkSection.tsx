"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/landing/Container";
import { SectionTitle } from "@/components/landing/SectionTitle";
import { WorkCard3D } from "@/components/landing/work/WorkCard3D";
import { WorkFilterTabs } from "@/components/landing/work/WorkFilterTabs";
import { WORK_CATEGORIES, type WorkCategory, type WorkItem } from "@/components/landing/work/types";

const WORK_ITEMS: WorkItem[] = [
  {
    id: "lumina-skincare",
    title: "Lumina Skincare",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=1000&h=750&fit=crop",
    href: "/?work=lumina-skincare",
  },
  {
    id: "arcadia-coffee",
    title: "Arcadia Coffee",
    category: "Packaging",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=1000&h=750&fit=crop",
    href: "/?work=arcadia-coffee",
  },
  {
    id: "vertex-studios",
    title: "Vertex Studios",
    category: "3D",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1000&h=750&fit=crop",
    href: "/?work=vertex-studios",
  },
  {
    id: "flora-bloom",
    title: "Flora & Bloom",
    category: "Content",
    image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=1000&h=750&fit=crop",
    href: "/?work=flora-bloom",
  },
  {
    id: "onyx-athletics",
    title: "Onyx Athletics",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1000&h=750&fit=crop",
    href: "/?work=onyx-athletics",
  },
  {
    id: "zephyr-homes",
    title: "Zephyr Homes",
    category: "Packaging",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&h=750&fit=crop",
    href: "/?work=zephyr-homes",
  },
];

function filterItems(category: WorkCategory) {
  if (category === "All") return WORK_ITEMS;
  return WORK_ITEMS.filter((item) => item.category === category);
}

export function SelectedWorkSection() {
  const [activeCategory, setActiveCategory] = React.useState<WorkCategory>("All");
  const reduceMotion = useReducedMotion();

  const visibleItems = React.useMemo(
    () => filterItems(activeCategory),
    [activeCategory],
  );

  return (
    <section id="work" className="cc-section">
      <Container>
        <SectionTitle
          title="Selected Work"
          subtitle="A curated showcase of brand systems, packaging narratives, content directions, and 3D-first visual experiences."
        />

        <div className="mb-10 flex justify-center">
          <WorkFilterTabs
            categories={WORK_CATEGORIES}
            activeCategory={activeCategory}
            onChange={setActiveCategory}
          />
        </div>

        <motion.ul
          layout
          className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {visibleItems.map((item, index) => (
              <motion.li
                key={item.id}
                layout
                initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
                transition={{ duration: 0.24, delay: reduceMotion ? 0 : index * 0.03, ease: [0.16, 1, 0.3, 1] }}
              >
                <WorkCard3D item={item} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </Container>
    </section>
  );
}
