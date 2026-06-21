import Link from "next/link";
import { Article } from "@/lib/articles";
import { truncate } from "@/lib/utils";
import CategoryBadge from "@/components/CategoryBadge";
import { ArrowRight } from "lucide-react";

interface RelatedArticlesProps {
  articles: Article[];
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (!articles || articles.length === 0) return null;

  return (
    <div>
      <h3 style={{
        fontFamily: "var(--font-display)",
        fontSize: "1.5rem",
        fontWeight: 700,
        color: "var(--text-primary)",
        marginBottom: "2rem",
      }}>
        Related Dispatches
      </h3>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "2rem",
      }}>
        {articles.map((article) => (
          <Link href={`/articles/${article.slug}`} key={article.slug} style={{ textDecoration: "none", display: "block" }}>
            <article style={{ borderTop: "1px solid var(--border)", paddingTop: "1rem" }}>
              <div style={{ marginBottom: "0.5rem" }}>
                <CategoryBadge category={article.category} />
              </div>
              <h4 style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "var(--text-primary)",
                lineHeight: 1.3,
                marginBottom: "0.5rem",
              }}>
                {article.title}
              </h4>
              <p style={{
                color: "var(--text-secondary)",
                fontSize: "0.9rem",
                lineHeight: 1.5,
                fontFamily: "var(--font-serif)"
              }}>
                {truncate(article.description, 80)}
              </p>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
