"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Subscription failed. Please try again.");
      } else {
        setSubmitted(true);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={{
      background: "var(--bg)",
      border: "1px solid var(--text-primary)",
      padding: "3rem",
      textAlign: "center",
    }}>
      <h2 style={{
        fontFamily: "var(--font-display)",
        fontSize: "1.8rem",
        fontWeight: 700,
        marginBottom: "0.5rem",
        color: "var(--text-primary)",
      }}>
        The Raw Post Dispatch.
      </h2>
      <p style={{ 
        color: "var(--text-secondary)", 
        marginBottom: "2rem", 
        fontSize: "1rem",
        fontFamily: "var(--font-serif)"
      }}>
        No fluff. Just results. Get our best articles on making money, productivity, and AI tools delivered weekly.
      </p>

      {submitted ? (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", color: "var(--text-primary)" }}>
          <CheckCircle size={20} />
          <span style={{ fontWeight: 600 }}>You're in! Check your inbox.</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: "0", maxWidth: "420px", margin: "0 auto" }}
              className="newsletter-form">
          <input
            id="newsletter-email"
            className="input"
            type="email"
            placeholder="Email address..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ 
              flex: 1, 
              borderRight: "none", 
              fontFamily: "var(--font-sans)",
              borderRadius: 0
            }}
          />
          <button
            id="newsletter-submit"
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{ 
              flexShrink: 0, 
              minWidth: "120px",
              justifyContent: "center",
              borderRadius: 0
            }}
          >
            {loading ? "..." : <><ArrowRight size={15} /> Subscribe</>}
          </button>
        </form>
      )}

      <p style={{ 
        fontSize: "0.75rem", 
        color: "var(--text-muted)", 
        marginTop: "1rem",
        fontFamily: "var(--font-sans)",
        textTransform: "uppercase",
        letterSpacing: "0.05em"
      }}>
        No spam. Unsubscribe any time.
      </p>
      {error && (
        <p style={{ color: "var(--accent)", fontSize: "0.8rem", marginTop: "0.5rem", fontFamily: "var(--font-sans)" }}>
          ⚠ {error}
        </p>
      )}

      <style>{`
        @media (max-width: 480px) {
          .newsletter-form { flex-direction: column !important; gap: 1rem !important; }
          .newsletter-form .input { border-right: 1px solid var(--text-primary) !important; }
        }
      `}</style>
    </section>
  );
}
