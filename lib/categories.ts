// Category definitions for RawPost
export interface Category {
  slug: string;
  name: string;
  description: string;
  color: string;    // CSS var / hex for badge
  accentClass: string; // Tailwind-safe class token for dynamic use
  icon: string;
  metaDescription: string;
}

export const categories: Category[] = [
  {
    slug: "make-money",
    name: "Make Money",
    description: "Proven strategies to earn online, build income streams, and escape the 9-to-5.",
    color: "#22c55e",
    accentClass: "green",
    icon: "💰",
    metaDescription: "Discover the best ways to make money online in 2025 — side hustles, freelancing, passive income, and more.",
  },
  {
    slug: "productivity",
    name: "Productivity",
    description: "Work smarter, not harder. Systems, tools, and habits to reclaim your time.",
    color: "#3b82f6",
    accentClass: "blue",
    icon: "🧠",
    metaDescription: "Productivity tips, time management strategies, and focus techniques to help you get more done every day.",
  },
  {
    slug: "tech-ai",
    name: "Tech & AI",
    description: "The tools, platforms, and AI breakthroughs reshaping how we live and work.",
    color: "#a855f7",
    accentClass: "purple",
    icon: "🤖",
    metaDescription: "In-depth guides on AI tools, software reviews, and tech news that actually matters for creators and professionals.",
  },
  {
    slug: "sports",
    name: "Sports",
    description: "In-depth analysis, statistics, and tactical breakdowns of the world's biggest sporting events.",
    color: "#f97316",
    accentClass: "orange",
    icon: "🏆",
    metaDescription: "Sports analysis, predictions, and in-depth tactical reviews of football, basketball, and major tournaments.",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export const categoryColorMap: Record<string, string> = {
  "make-money": "#22c55e",
  "productivity": "#3b82f6",
  "tech-ai": "#a855f7",
  "sports": "#f97316",
};
