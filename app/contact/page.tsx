"use client";

import { useState } from "react";
import { CheckCircle, Send } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("contact-name") as HTMLInputElement).value,
      email: (form.elements.namedItem("contact-email") as HTMLInputElement).value,
      subject: (form.elements.namedItem("contact-subject") as HTMLInputElement).value,
      message: (form.elements.namedItem("contact-message") as HTMLTextAreaElement).value,
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Something went wrong. Please try again.");
      } else {
        setSubmitted(true);
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "3rem 0 5rem" }}>
      <div className="container-narrow" style={{ maxWidth: "600px" }}>
        <h1 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
          fontWeight: 800,
          marginBottom: "0.75rem",
          letterSpacing: "-0.02em",
        }}>
          Contact Us
        </h1>
        <p style={{ color: "var(--text-secondary)", marginBottom: "2.5rem", fontSize: "1.05rem" }}>
          Questions, content suggestions, or partnership inquiries? We read every message.
        </p>

        {submitted ? (
          <div style={{
            background: "rgba(34,197,94,0.08)",
            border: "1px solid rgba(34,197,94,0.25)",
            borderRadius: "var(--radius-lg)",
            padding: "2rem",
            textAlign: "center",
          }}>
            <CheckCircle size={40} style={{ color: "#4ade80", margin: "0 auto 1rem" }} />
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", marginBottom: "0.5rem" }}>Message Sent!</h2>
            <p style={{ color: "var(--text-secondary)" }}>We&apos;ll get back to you within 2–3 business days.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div>
              <label htmlFor="contact-name" style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.4rem", color: "var(--text-secondary)" }}>
                Name
              </label>
              <input id="contact-name" className="input" type="text" placeholder="Your name" required />
            </div>
            <div>
              <label htmlFor="contact-email" style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.4rem", color: "var(--text-secondary)" }}>
                Email
              </label>
              <input id="contact-email" className="input" type="email" placeholder="your@email.com" required />
            </div>
            <div>
              <label htmlFor="contact-subject" style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.4rem", color: "var(--text-secondary)" }}>
                Subject
              </label>
              <input id="contact-subject" className="input" type="text" placeholder="What's this about?" required />
            </div>
            <div>
              <label htmlFor="contact-message" style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.4rem", color: "var(--text-secondary)" }}>
                Message
              </label>
              <textarea
                id="contact-message"
                className="input"
                placeholder="Your message..."
                rows={5}
                required
                style={{ resize: "vertical", lineHeight: 1.6 }}
              />
            </div>
            <button
              id="contact-submit"
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{ alignSelf: "flex-start", padding: "0.75rem 1.75rem" }}
            >
              {loading ? "Sending..." : <><Send size={15} /> Send Message</>}
            </button>
            {error && (
              <p style={{ color: "#f87171", fontSize: "0.875rem", marginTop: "0.25rem" }}>
                ⚠ {error}
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
