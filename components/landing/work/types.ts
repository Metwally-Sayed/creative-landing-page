export const WORK_CATEGORIES = [
  "All",
  "Branding",
  "Packaging",
  "Content",
  "3D",
] as const;

export type WorkCategory = (typeof WORK_CATEGORIES)[number];
export type WorkItemCategory = Exclude<WorkCategory, "All">;

export interface WorkItem {
  id: string;
  title: string;
  category: WorkItemCategory;
  image: string;
  href: string;
  tag?: string;
}
