import { getAllArticles, getArticleBySlug, getRelatedArticles } from "@/lib/articles";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";

import CategoryBadge from "@/components/CategoryBadge";
import TableOfContents from "@/components/TableOfContents";
import AuthorBio from "@/components/AuthorBio";
import RelatedArticles from "@/components/RelatedArticles";
import ReadingProgress from "@/components/ReadingProgress";
import NewsletterForm from "@/components/NewsletterForm";

import { formatDate, SITE_NAME, SITE_URL } from "@/lib/utils";
import { Clock } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  const ogImage = `${SITE_URL}${article.coverImage || "/og-image.jpg"}`;

  return {
    title: article.title,
    description: article.description,
    keywords: article.tags,
    authors: [{ name: article.author }],
    openGraph: {
      type: "article",
      url: `${SITE_URL}/articles/${article.slug}`,
      title: article.title,
      description: article.description,
      publishedTime: article.datePublished,
      modifiedTime: article.dateModified,
      authors: [article.author],
      tags: article.tags,
      images: [{ url: ogImage, width: 1200, height: 630, alt: article.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [ogImage],
    },
    alternates: { canonical: `/articles/${article.slug}` },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();


  const related = getRelatedArticles(article.slug, article.category);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "author": {
      "@type": "Person",
      "name": article.author,
    },
    "datePublished": article.datePublished,
    "dateModified": article.dateModified,
    "image": `${SITE_URL}${article.coverImage || "/og-image.jpg"}`,
    "publisher": {
      "@type": "Organization",
      "name": SITE_NAME,
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/logo.png`,
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${SITE_URL}/articles/${article.slug}`,
    },
    "keywords": article.tags?.join(", "),
  };

  return (
    <>
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div style={{ padding: "2rem 0 5rem" }}>
        <div className="container">

          {/* Article Header */}
          <header style={{ marginBottom: "3rem", textAlign: "center", maxWidth: "800px", margin: "0 auto 3rem" }}>
            <div style={{ marginBottom: "1.5rem" }}>
              <CategoryBadge category={article.category} />
            </div>
            <h1 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
              marginBottom: "1.5rem",
              color: "var(--text-primary)",
            }}>
              {article.title}
            </h1>
            <p style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.25rem",
              color: "var(--text-secondary)",
              lineHeight: 1.6,
              marginBottom: "2rem",
              maxWidth: "600px",
              margin: "0 auto 2rem"
            }}>
              {article.description}
            </p>

            {/* Meta bar */}
            <div style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "1.5rem",
              fontSize: "0.85rem",
              color: "var(--text-primary)",
              fontFamily: "var(--font-sans)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              borderTop: "1px solid var(--border)",
              borderBottom: "1px solid var(--border)",
              padding: "1rem 0"
            }}>
              <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                By <span style={{ fontWeight: 600 }}>{article.author}</span>
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                {formatDate(article.datePublished)}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <Clock size={14} /> {article.readingTimeText}
              </span>
            </div>
          </header>

          {/* Featured image */}
          {article.coverImage && (
             <div style={{
               width: "100%",
               maxHeight: "600px",
               aspectRatio: "2/1",
               overflow: "hidden",
               marginBottom: "4rem",
               background: "var(--surface-2)",
               borderBottom: "1px solid var(--text-primary)"
             }}>
               {/* eslint-disable-next-line @next/next/no-img-element */}
               <img 
                 src={article.coverImage} 
                 alt={article.title}
                 style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "grayscale(100%) contrast(1.1)" }}
               />
             </div>
          )}

          {/* Two-column layout: content + TOC */}
          <div className="article-layout">
            {/* Main content */}
            <div>
              <article className="prose">
                <MDXRemote source={article.content} />
              </article>

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "3rem" }}>
                  {article.tags.map((tag) => (
                    <span key={tag} style={{
                      fontFamily: "var(--font-sans)",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      fontSize: "0.75rem",
                      color: "var(--text-muted)",
                    }}>
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              <div style={{ borderTop: "2px solid var(--text-primary)", marginTop: "4rem", paddingTop: "2rem" }}>
                 <AuthorBio />
              </div>
              
              <div style={{ borderTop: "1px solid var(--border)", marginTop: "3rem", paddingTop: "2rem" }}>
                 <RelatedArticles articles={related} />
              </div>

              <div style={{ marginTop: "4rem" }}>
                <NewsletterForm />
              </div>
            </div>

            {/* TOC Sidebar */}
            <TableOfContents content={article.content} />
          </div>
        </div>
      </div>
    </>
  );
}
