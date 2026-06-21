"use client";

import { useState, useMemo } from "react";
import { Article } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";
import { categories } from "@/lib/categories";
import { Search } from "lucide-react";

interface ArticlesClientProps {
  articles: Article[];
}

export default function ArticlesClient({ articles }: ArticlesClientProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [page, setPage] = useState(1);
  const PER_PAGE = 12;

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      const matchCat = activeCategory === "all" || a.category === activeCategory;
      const q = query.toLowerCase();
      const matchQ = !q || a.title.toLowerCase().includes(q) || a.description.toLowerCase().includes(q) || a.tags?.some((t) => t.toLowerCase().includes(q));
      return matchCat && matchQ;
    });
  }, [articles, query, activeCategory]);

  const paginated = filtered.slice(0, page * PER_PAGE);
  const hasMore = paginated.length < filtered.length;

  return (
    <>
      {/* Filter Bar */}
      <div style={{
        borderBottom: "1px solid var(--text-primary)",
        paddingBottom: "1.5rem",
        marginBottom: "3rem",
        display: "flex",
        gap: "2rem",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        {/* Category Filter */}
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <button
            onClick={() => { setActiveCategory("all"); setPage(1); }}
            style={{
              fontSize: "0.85rem",
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0.25rem 0",
              color: activeCategory === "all" ? "var(--text-primary)" : "var(--text-muted)",
              borderBottom: activeCategory === "all" ? "1px solid var(--text-primary)" : "1px solid transparent",
            }}
          >
            All Dispatches
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => { setActiveCategory(cat.slug); setPage(1); }}
              style={{
                fontSize: "0.85rem",
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0.25rem 0",
                color: activeCategory === cat.slug ? "var(--text-primary)" : "var(--text-muted)",
                borderBottom: activeCategory === cat.slug ? "1px solid var(--text-primary)" : "1px solid transparent",
              }}
            >
               {cat.name}
            </button>
          ))}
        </div>

        {/* Search */}
        <div style={{ width: "240px", position: "relative" }}>
          <Search size={15} style={{ position: "absolute", left: "0", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
          <input
            className="input"
            type="search"
            placeholder="Search archive..."
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1); }}
            style={{ 
              paddingLeft: "1.5rem", 
              border: "none", 
              borderBottom: "1px solid var(--border)", 
              background: "transparent",
              fontFamily: "var(--font-sans)",
              fontSize: "0.9rem"
            }}
          />
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div style={{ padding: "4rem 0", color: "var(--text-muted)", fontFamily: "var(--font-serif)" }}>
          <p style={{ fontSize: "1.1rem" }}>No articles found. Try a different search.</p>
        </div>
      ) : (
        <div className="articles-grid">
          {paginated.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      )}

      {/* Load More */}
      {hasMore && (
        <div style={{ textAlign: "center", marginTop: "3.5rem" }}>
          <button
            onClick={() => setPage((p) => p + 1)}
            style={{ 
              padding: "0.75rem 2rem",
              background: "transparent",
              border: "1px solid var(--text-primary)",
              color: "var(--text-primary)",
              fontFamily: "var(--font-sans)",
              fontSize: "0.85rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              cursor: "pointer",
              fontWeight: 600
            }}
          >
            Load More
          </button>
        </div>
      )}
    </>
  );
}
