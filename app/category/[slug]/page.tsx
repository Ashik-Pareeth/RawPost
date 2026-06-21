import { getArticlesByCategory } from "@/lib/articles";
import { getCategoryBySlug, categories } from "@/lib/categories";
import { notFound } from "next/navigation";
import ArticleCard from "@/components/ArticleCard";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) return {};
  return {
    title: `${cat.name} Articles`,
    description: cat.metaDescription,
    alternates: { canonical: `/category/${slug}` },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) notFound();

  const articles = getArticlesByCategory(slug);

  return (
    <div style={{ padding: "3rem 0 5rem" }}>
      <div className="container">
        {/* Editorial Header */}
        <div style={{
          borderTop: "2px solid var(--text-primary)",
          borderBottom: "1px solid var(--border)",
          padding: "2rem 0",
          marginBottom: "3rem",
        }}>
          <span style={{ 
            fontFamily: "var(--font-sans)", 
            fontSize: "0.8rem", 
            fontWeight: 700, 
            textTransform: "uppercase", 
            letterSpacing: "0.1em",
            color: "var(--accent)",
            marginBottom: "1rem",
            display: "block"
          }}>
            Section
          </span>
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            fontWeight: 800,
            color: "var(--text-primary)",
            marginBottom: "1rem",
            lineHeight: 1.1
          }}>
            {cat.name}
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.15rem", maxWidth: "600px", fontFamily: "var(--font-serif)" }}>
            {cat.description}
          </p>
        </div>

        {/* Articles Grid */}
        {articles.length === 0 ? (
          <div style={{ padding: "4rem 0", color: "var(--text-muted)", fontFamily: "var(--font-serif)" }}>
            <p>No dispatches yet in this section. Check back soon.</p>
          </div>
        ) : (
          <div className="articles-grid">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
