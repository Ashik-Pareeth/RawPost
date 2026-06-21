import { getCategoryBySlug } from "@/lib/categories";

interface CategoryBadgeProps {
  category: string;
}

export default function CategoryBadge({ category }: CategoryBadgeProps) {
  const cat = getCategoryBySlug(category);
  if (!cat) return null;

  return (
    <span style={{ 
      fontFamily: "var(--font-sans)",
      fontSize: "0.75rem",
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.1em",
      color: "var(--text-secondary)",
      borderBottom: "1px solid var(--text-secondary)",
      paddingBottom: "0.1rem",
      display: "inline-block"
    }}>
      {cat.name}
    </span>
  );
}
