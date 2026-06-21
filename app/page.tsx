import Link from "next/link";
import { getAllArticles, getFeaturedArticles } from "@/lib/articles";
import { categories } from "@/lib/categories";
import ArticleCard from "@/components/ArticleCard";
import NewsletterForm from "@/components/NewsletterForm";
import type { Metadata } from "next";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/utils";

export const metadata: Metadata = {
  title: `${SITE_NAME} — Truth & Clarity`,
  description: SITE_DESCRIPTION,
};

export default function HomePage() {
  const allArticles = getAllArticles();
  const featured = getFeaturedArticles(1);
  const latest = allArticles.slice(0, 6);

  return (
    <>
      {/* ── TOP STORIES (Featured) ── */}
      {featured.length > 0 && (
        <section style={{ 
          padding: "3rem 0 0", 
          borderBottom: "1px solid var(--border)", 
          marginBottom: "3rem" 
        }}>
          <div className="container">
            <div style={{ marginBottom: "1rem" }}>
              <span style={{ 
                fontFamily: "var(--font-sans)", 
                fontSize: "0.75rem", 
                fontWeight: 700, 
                textTransform: "uppercase", 
                letterSpacing: "0.1em", 
                color: "var(--accent)",
                display: "inline-block",
                borderBottom: "1px solid var(--accent)",
                paddingBottom: "0.1rem"
              }}>
                Top Story
              </span>
            </div>
            <ArticleCard article={featured[0]} featured />
          </div>
        </section>
      )}

      {/* ── LATEST & CATEGORIES SPREAD ── */}
      <section style={{ padding: "0 0 3rem" }}>
        <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "4rem" }}>
          
          {/* Main Column: Latest Articles */}
          <div className="main-col">
            <div style={{ marginBottom: "2rem", borderBottom: "2px solid var(--text-primary)", paddingBottom: "0.5rem" }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, color: "var(--text-primary)" }}>
                Latest Dispatches
              </h2>
            </div>
            
            <div className="articles-grid">
              {latest.map((article) => (
                <div key={article.slug} style={{ paddingBottom: "2rem", borderBottom: "1px solid var(--border)" }}>
                  <ArticleCard article={article} />
                </div>
              ))}
            </div>
            
            <div style={{ marginTop: "2rem" }}>
              <Link href="/articles" style={{ 
                display: "inline-block", 
                fontFamily: "var(--font-sans)", 
                fontSize: "0.85rem", 
                fontWeight: 600, 
                textTransform: "uppercase", 
                letterSpacing: "0.05em",
                color: "var(--text-primary)",
                borderBottom: "1px solid var(--text-primary)",
                paddingBottom: "0.1rem"
              }}>
                View All Archives →
              </Link>
            </div>
          </div>

          {/* Sidebar: Categories & Newsletter */}
          <aside className="sidebar-col">
            
            {/* Sections / Categories */}
            <div style={{ marginBottom: "3rem" }}>
              <div style={{ marginBottom: "1.5rem", borderBottom: "1px solid var(--text-primary)", paddingBottom: "0.5rem" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 700, color: "var(--text-primary)" }}>
                  Sections
                </h3>
              </div>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
                {categories.map((cat) => (
                  <li key={cat.slug} style={{ borderBottom: "1px solid var(--border)", paddingBottom: "0.75rem" }}>
                    <Link href={`/category/${cat.slug}`} style={{ textDecoration: "none", display: "block" }}>
                      <span style={{ 
                        fontFamily: "var(--font-sans)", 
                        fontSize: "0.85rem", 
                        fontWeight: 600, 
                        textTransform: "uppercase", 
                        letterSpacing: "0.05em",
                        color: "var(--text-primary)"
                      }}>
                        {cat.name}
                      </span>
                      <p style={{ fontFamily: "var(--font-serif)", fontSize: "0.9rem", color: "var(--text-secondary)", marginTop: "0.25rem", lineHeight: 1.4 }}>
                        {cat.description}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sticky Newsletter */}
            <div style={{ position: "sticky", top: "2rem" }}>
               <NewsletterForm />
            </div>

          </aside>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .container { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </>
  );
}
