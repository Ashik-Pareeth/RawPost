import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const all = [{ label: "Home", href: "/" }, ...items];

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": all.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.label,
      ...(item.href ? { "item": item.href } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <style>{`
        .breadcrumb-link { color: var(--text-muted); transition: color 0.15s; }
        .breadcrumb-link:hover { color: var(--text-primary); }
      `}</style>
      <nav aria-label="Breadcrumb" style={{ marginBottom: "1.5rem" }}>
        <ol style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.25rem",
          listStyle: "none",
          padding: 0,
        }}>
          {all.map((item, i) => (
            <li key={i} style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
              {i > 0 && <ChevronRight size={13} style={{ color: "var(--text-muted)", flexShrink: 0 }} />}
              {item.href && i < all.length - 1 ? (
                <Link
                  href={item.href}
                  className="breadcrumb-link"
                  style={{
                    fontSize: "0.82rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                  }}
                >
                  {i === 0 && <Home size={12} />}
                  {item.label}
                </Link>
              ) : (
                <span style={{ fontSize: "0.82rem", color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                  {i === 0 && <Home size={12} />}
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
