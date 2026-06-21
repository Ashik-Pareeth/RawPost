import fs from "fs";
import path from "path";
import readingTime from "reading-time";

export interface ArticleFrontmatter {
  title: string;
  slug: string;
  description: string;
  category: string;
  tags: string[];
  author: string;
  datePublished: string;
  dateModified: string;
  coverImage: string;
  featured?: boolean;
  readingTime?: number;
}

export interface Article extends ArticleFrontmatter {
  content: string;
  readingTimeText: string;
}

const contentDirectory = path.join(process.cwd(), "content", "articles");

function ensureDir() {
  if (!fs.existsSync(contentDirectory)) {
    fs.mkdirSync(contentDirectory, { recursive: true });
  }
}

/**
 * Minimal, safe YAML frontmatter parser — no external dependencies.
 * Handles the subset of YAML used in our MDX files:
 *   - Strings (quoted or unquoted)
 *   - Booleans (true/false)
 *   - Arrays ([item1, item2])
 * This avoids the js-yaml vulnerability in gray-matter.
 */
function parseFrontmatter(raw: string): { data: Record<string, unknown>; content: string } {
  const FM_REGEX = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/;
  const match = FM_REGEX.exec(raw);
  if (!match) return { data: {}, content: raw };

  const yamlBlock = match[1];
  const content = raw.slice(match[0].length);
  const data: Record<string, unknown> = {};

  for (const line of yamlBlock.split(/\r?\n/)) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;

    const key = line.slice(0, colonIdx).trim();
    const rawValue = line.slice(colonIdx + 1).trim();
    if (!key) continue;

    // Array: e.g. ["a", "b"] or [a, b]
    if (rawValue.startsWith("[") && rawValue.endsWith("]")) {
      data[key] = rawValue
        .slice(1, -1)
        .split(",")
        .map((v) => v.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
      continue;
    }

    // Boolean
    if (rawValue === "true") { data[key] = true; continue; }
    if (rawValue === "false") { data[key] = false; continue; }

    // Number
    if (/^\d+$/.test(rawValue)) { data[key] = parseInt(rawValue, 10); continue; }

    // String — strip wrapping quotes if present
    data[key] = rawValue.replace(/^["']|["']$/g, "");
  }

  return { data, content };
}

function parseArticleFile(filePath: string): Article {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = parseFrontmatter(raw);
  const rt = readingTime(content);

  return {
    ...(data as unknown as ArticleFrontmatter),
    content,
    readingTimeText: rt.text,
  } as Article;
}

export function getAllArticles(): Article[] {
  ensureDir();
  const files = fs
    .readdirSync(contentDirectory)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  const articles = files.map((filename) =>
    parseArticleFile(path.join(contentDirectory, filename))
  );

  return articles.sort(
    (a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime()
  );
}

export function getArticleBySlug(slug: string): Article | undefined {
  ensureDir();
  const files = fs.readdirSync(contentDirectory);
  const filename = files.find((f) => f.replace(/\.mdx?$/, "") === slug);
  if (!filename) return undefined;

  return parseArticleFile(path.join(contentDirectory, filename));
}

export function getArticlesByCategory(category: string): Article[] {
  return getAllArticles().filter((a) => a.category === category);
}

export function getFeaturedArticles(limit = 3): Article[] {
  return getAllArticles()
    .filter((a) => a.featured)
    .slice(0, limit);
}

export function getRelatedArticles(currentSlug: string, category: string, limit = 3): Article[] {
  return getAllArticles()
    .filter((a) => a.category === category && a.slug !== currentSlug)
    .slice(0, limit);
}
