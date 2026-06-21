import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div style={{
      minHeight: "60vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "3rem 1.5rem",
    }}>
      <div>
        <div style={{
          fontFamily: "var(--font-display)",
          fontSize: "8rem",
          fontWeight: 900,
          lineHeight: 1,
          background: "linear-gradient(135deg, var(--accent) 0%, #7c3aed 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          marginBottom: "1rem",
        }}>
          404
        </div>
        <h1 style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.75rem",
          fontWeight: 700,
          marginBottom: "0.75rem",
        }}>
          Page Not Found
        </h1>
        <p style={{ color: "var(--text-secondary)", marginBottom: "2rem", maxWidth: "400px" }}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
          <Link href="/" className="btn btn-primary">
            <Home size={15} /> Go Home
          </Link>
          <Link href="/articles" className="btn btn-ghost">
            <ArrowLeft size={15} /> All Articles
          </Link>
        </div>
      </div>
    </div>
  );
}
