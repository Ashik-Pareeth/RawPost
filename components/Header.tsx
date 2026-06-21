"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import { categories } from "@/lib/categories";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="header">
      <div className="container">
        {/* Top Row: Logo & Actions */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: "1.25rem" }}>
          
          {/* Mobile Menu Toggle (Left) */}
          <div className="mobile-only" style={{ width: "32px" }}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="btn-ghost"
              style={{ border: "none", background: "none", cursor: "pointer", color: "var(--text-primary)" }}
              aria-label="Menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop Left Space filler */}
          <div className="desktop-only" style={{ width: "100px" }}></div>

          {/* Centered Logo */}
          <Link href="/" style={{ textDecoration: "none", display: "block", textAlign: "center" }}>
            <span style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "2.5rem",
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              lineHeight: 1
            }}>
              Raw Post<span style={{ color: "var(--accent)" }}>.</span>
            </span>
          </Link>

          {/* Right Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", width: "100px", justifyContent: "flex-end" }}>
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-primary)" }}
              aria-label="Search"
            >
              <Search size={20} />
            </button>
          </div>
        </div>

        {/* Desktop Nav - Bottom Row */}
        <nav className="desktop-only" style={{ 
          borderTop: "1px solid var(--border)", 
          paddingTop: "0.75rem",
          display: "flex", 
          justifyContent: "center", 
          gap: "2.5rem" 
        }}>
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="nav-link"
            >
              {cat.name}
            </Link>
          ))}
          <Link href="/articles" className="nav-link">All Articles</Link>
          <Link href="/about" className="nav-link">About</Link>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <nav className="mobile-only" style={{
            borderTop: "1px solid var(--border)",
            paddingTop: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                onClick={() => setMenuOpen(false)}
                className="nav-link"
              >
                {cat.name}
              </Link>
            ))}
            <Link href="/articles" onClick={() => setMenuOpen(false)} className="nav-link">All Articles</Link>
          </nav>
        )}

        {/* Search Bar */}
        {searchOpen && (
          <div style={{ paddingTop: "1rem", borderTop: "1px solid var(--border)", marginTop: "1rem" }}>
            <input
              className="input"
              type="search"
              placeholder="Search articles..."
              autoFocus
              style={{ fontSize: "1.1rem", padding: "1rem", border: "1px solid var(--text-primary)", background: "var(--surface)" }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const q = (e.target as HTMLInputElement).value;
                  window.location.href = `/articles?q=${encodeURIComponent(q)}`;
                }
              }}
            />
          </div>
        )}
      </div>

      <style>{`
        .nav-link {
          font-family: var(--font-sans);
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-secondary);
          transition: color 0.2s;
        }
        .nav-link:hover {
          color: var(--accent);
        }
        @media (max-width: 768px) {
          .desktop-only { display: none !important; }
        }
        @media (min-width: 769px) {
          .mobile-only { display: none !important; }
        }
      `}</style>
    </header>
  );
}
