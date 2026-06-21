import { getAllArticles } from "@/lib/articles";
import ArticlesClient from "./ArticlesClient";
import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/utils";

export const metadata: Metadata = {
  title: "All Articles",
  description: `Browse all articles on ${SITE_NAME} — practical guides on making money online, productivity, and AI tools.`,
  alternates: { canonical: "/articles" },
};

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <div style={{ padding: "3rem 0 5rem" }}>
      <div className="container">
        {/* Header */}
        <div style={{
          borderTop: "2px solid var(--text-primary)",
          borderBottom: "1px solid var(--border)",
          padding: "2rem 0",
          marginBottom: "3rem",
        }}>
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            fontWeight: 800,
            marginBottom: "0.75rem",
            letterSpacing: "-0.02em",
            color: "var(--text-primary)"
          }}>
            Archives
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.15rem", fontFamily: "var(--font-serif)" }}>
            {articles.length} dispatches — practical guides, no filler.
          </p>
        </div>

        <ArticlesClient articles={articles} />
      </div>
    </div>
  );
}
