import Link from "next/link";
import { categories } from "@/lib/categories";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/utils";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{
      borderTop: "6px solid var(--text-primary)",
      background: "var(--bg)",
      marginTop: "5rem",
      paddingTop: "3rem",
      paddingBottom: "3rem"
    }}>
      <style>{`
        .footer-link { color: var(--text-primary); font-family: var(--font-sans); font-size: 0.85rem; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em; transition: color 0.15s; }
        .footer-link:hover { color: var(--accent); }
      `}</style>

      <div className="container">
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr",
          gap: "4rem",
          marginBottom: "3rem",
        }} className="footer-grid">
          
          {/* Brand */}
          <div>
            <span style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "2rem",
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              display: "block",
              marginBottom: "1rem"
            }}>
              Raw Post<span style={{ color: "var(--accent)" }}>.</span>
            </span>
            <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.6, maxWidth: "300px", fontFamily: "var(--font-serif)" }}>
              {SITE_DESCRIPTION}
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1.25rem" }}>
              Topics
            </h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/category/${cat.slug}`} className="footer-link">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Site Links */}
          <div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1.25rem" }}>
              Site
            </h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {[
                { href: "/articles", label: "All Articles" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
                { href: "/privacy-policy", label: "Privacy Policy" },
                { href: "/disclaimer", label: "Disclaimer" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Row */}
        <div style={{
          borderTop: "1px solid var(--border)",
          paddingTop: "1.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", fontFamily: "var(--font-sans)" }}>
            © {year} {SITE_NAME}. All rights reserved.
          </p>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", fontFamily: "var(--font-sans)", fontStyle: "italic" }}>
            Truth & Clarity
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
      `}</style>
    </footer>
  );
}
