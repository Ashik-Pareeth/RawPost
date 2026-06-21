"use client";

import { useEffect, useState } from "react";
import { extractHeadings } from "@/lib/utils";
import { List } from "lucide-react";

interface TableOfContentsProps {
  content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const headings = extractHeadings(content);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -60% 0px" }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <aside className="toc-sidebar" style={{
      position: "sticky",
      top: "80px",
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-lg)",
      padding: "1.25rem",
      maxHeight: "calc(100vh - 100px)",
      overflowY: "auto",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
        <List size={14} style={{ color: "var(--text-muted)" }} />
        <span style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)" }}>
          Contents
        </span>
      </div>
      <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.15rem" }}>
        {headings.map(({ id, text, level }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`toc-item ${activeId === id ? "active" : ""}`}
              style={{
                display: "block",
                padding: "0.35rem 0.5rem",
                paddingLeft: level === 3 ? "1.5rem" : "0.5rem",
                fontSize: level === 2 ? "0.83rem" : "0.78rem",
                fontWeight: level === 2 ? 500 : 400,
                color: activeId === id ? "var(--accent)" : "var(--text-muted)",
                borderLeft: `2px solid ${activeId === id ? "var(--accent)" : "transparent"}`,
                borderRadius: "0 var(--radius-sm) var(--radius-sm) 0",
                transition: "all 0.15s",
                lineHeight: 1.4,
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                if (activeId !== id) e.currentTarget.style.color = "var(--text-secondary)";
              }}
              onMouseLeave={(e) => {
                if (activeId !== id) e.currentTarget.style.color = "var(--text-muted)";
              }}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
