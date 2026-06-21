import { X } from "lucide-react";

export default function AuthorBio() {
  return (
    <div style={{
      display: "flex",
      alignItems: "flex-start",
      gap: "1.5rem",
    }}>
      <div style={{
        width: "80px",
        height: "80px",
        background: "var(--surface-2)",
        flexShrink: 0,
        overflow: "hidden"
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150" 
          alt="Ashik"
          style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(100%) contrast(1.1)" }}
        />
      </div>
      <div>
        <h3 style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.25rem",
          fontWeight: 700,
          color: "var(--text-primary)",
          marginBottom: "0.5rem",
        }}>
          Ashik
        </h3>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "0.75rem", fontFamily: "var(--font-serif)" }}>
          Founder and Lead Writer at Raw Post. Obsessed with breaking down complex workflows and finding honest ways to build independent income.
        </p>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
             style={{ color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.25rem", fontSize: "0.85rem", fontFamily: "var(--font-sans)", textTransform: "uppercase" }}>
            <X size={14} /> Follow
          </a>
        </div>
      </div>
    </div>
  );
}
