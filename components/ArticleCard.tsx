import Link from "next/link";
import { Article } from "@/lib/articles";
import { truncate } from "@/lib/utils";
import CategoryBadge from "@/components/CategoryBadge";

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export default function ArticleCard({ article, featured = false }: ArticleCardProps) {
  if (featured) {
    return (
      <Link href={`/articles/${article.slug}`} style={{ textDecoration: "none", display: "block" }}>
        <article className="featured-card">
          <div style={{ padding: "0 2rem 2rem 0", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ marginBottom: "1.5rem" }}>
              <CategoryBadge category={article.category} />
            </div>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "2.8rem",
              fontWeight: 800,
              lineHeight: 1.1,
              color: "var(--text-primary)",
              marginBottom: "1rem",
            }}>
              {article.title}
            </h2>
            <p style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.2rem",
              color: "var(--text-secondary)",
              lineHeight: 1.6,
              marginBottom: "1.5rem"
            }}>
              {truncate(article.description, 150)}
            </p>
            <div style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.85rem",
              color: "var(--text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.05em"
            }}>
              By {article.author}
            </div>
          </div>
          <div style={{ height: "100%", minHeight: "400px", background: "var(--surface-2)", position: "relative" }}>
             {/* We use a solid block here for the image placeholder if Image is not used, or standard img */}
             {article.coverImage && (
               // eslint-disable-next-line @next/next/no-img-element
               <img 
                 src={article.coverImage} 
                 alt={article.title}
                 style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
               />
             )}
          </div>
        </article>

        <style>{`
          .featured-card {
            display: grid;
            grid-template-columns: 1fr 1fr;
            border-bottom: 2px solid var(--text-primary);
            padding-bottom: 3rem;
            margin-bottom: 3rem;
            transition: opacity 0.2s;
          }
          .featured-card:hover {
            opacity: 0.85;
          }
          @media (max-width: 768px) {
            .featured-card {
              grid-template-columns: 1fr;
              padding-bottom: 2rem;
            }
            .featured-card > div:first-child {
              padding: 0 0 2rem 0;
            }
          }
        `}</style>
      </Link>
    );
  }

  return (
    <Link href={`/articles/${article.slug}`} style={{ textDecoration: "none", display: "block" }}>
      <article className="card">
        {article.coverImage && (
          <div style={{ 
            width: "100%", 
            aspectRatio: "3/2", 
            marginBottom: "1.25rem", 
            background: "var(--surface-2)",
            overflow: "hidden"
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={article.coverImage} 
              alt={article.title}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "grayscale(20%) contrast(1.1)" }}
            />
          </div>
        )}
        <div style={{ marginBottom: "0.75rem" }}>
          <CategoryBadge category={article.category} />
        </div>
        <h3 style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.4rem",
          fontWeight: 700,
          color: "var(--text-primary)",
          lineHeight: 1.25,
          marginBottom: "0.75rem",
        }}>
          {article.title}
        </h3>
        <p style={{
          fontFamily: "var(--font-serif)",
          fontSize: "1rem",
          color: "var(--text-secondary)",
          lineHeight: 1.5,
          marginBottom: "1rem"
        }}>
          {truncate(article.description, 100)}
        </p>
        <div style={{
          fontFamily: "var(--font-sans)",
          fontSize: "0.8rem",
          color: "var(--text-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.05em"
        }}>
          {article.author}
        </div>
      </article>
    </Link>
  );
}
