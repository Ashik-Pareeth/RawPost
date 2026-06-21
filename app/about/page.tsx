import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description: `Learn about ${SITE_NAME} — who we are, why we write, and what drives our commitment to practical, no-fluff content.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div style={{ padding: "3rem 0 5rem" }}>
      <div className="container-narrow" style={{ maxWidth: "720px" }}>
        <div style={{ marginBottom: "3rem" }}>
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            marginBottom: "1rem",
          }}>
            About <span style={{ color: "var(--accent)" }}>Raw Post</span>
          </h1>
          <p style={{ fontSize: "1.2rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
            No fluff. Just results.
          </p>
        </div>

        <div className="prose">
          <h2>What We Do</h2>
          <p>
            Raw Post is a content site built for people who want practical, actionable information — not recycled takes and SEO-stuffed listicles. We cover three areas we know well: <strong>making money online</strong>, <strong>productivity systems</strong>, and <strong>AI tools</strong>.
          </p>

          <h2>Why We Started This</h2>
          <p>
            Most content online is written to rank, not to help. The articles are long because length used to be a ranking signal. The advice is vague because specificity requires expertise. We wanted to build something different — content that respects your time and actually moves the needle.
          </p>

          <h2>Our Standards</h2>
          <p>Every article we publish goes through a simple checklist:</p>
          <ul>
            <li>Does it answer the question better than the top 3 Google results?</li>
            <li>Is the advice actionable today, not in theory?</li>
            <li>Would we recommend this to someone we personally know?</li>
            <li>Is every claim accurate and sourced?</li>
          </ul>
          <p>If the answer is no to any of these, the article doesn&apos;t go live.</p>

          <h2>Who We Are</h2>
          <p>
            Raw Post is run by a small team of writers, researchers, and practitioners who work in the spaces we write about. We&apos;re not academics — we&apos;re people who have built income online, used these AI tools in real workflows, and lived through the productivity experiments we describe.
          </p>

          <h2>Get in Touch</h2>
          <p>
            Questions, feedback, or want to contribute? We&apos;d love to hear from you. Use the <a href="/contact">contact page</a> to reach us — we read every message.
          </p>
        </div>
      </div>
    </div>
  );
}
