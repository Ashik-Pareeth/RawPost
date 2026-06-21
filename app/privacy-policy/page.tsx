import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${SITE_NAME}`,
  robots: { index: false },
};

export default function PrivacyPolicyPage() {
  return (
    <div style={{ padding: "3rem 0 5rem" }}>
      <div className="container-narrow" style={{ maxWidth: "720px" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 800, marginBottom: "0.5rem" }}>
          Privacy Policy
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginBottom: "2.5rem" }}>
          Last updated: January 1, 2025
        </p>
        <div className="prose">
          <h2>Information We Collect</h2>
          <p>
            When you visit {SITE_NAME} ({SITE_URL}), we may collect information automatically such as your IP address, browser type, operating system, referring URLs, and pages visited. This is standard analytics data collected via tools like Google Analytics.
          </p>
          <p>
            If you subscribe to our newsletter or submit a contact form, we collect your name and email address.
          </p>

          <h2>How We Use Your Information</h2>
          <ul>
            <li>To send you the newsletter content you opted into</li>
            <li>To respond to contact form submissions</li>
            <li>To analyze site traffic and improve our content</li>
            <li>To display relevant advertisements (via Google AdSense)</li>
          </ul>

          <h2>Cookies</h2>
          <p>
            We use cookies for analytics and advertising purposes. You can disable cookies in your browser settings at any time, though this may affect site functionality.
          </p>

          <h2>Third-Party Services</h2>
          <p>We use the following third-party services, each with their own privacy policies:</p>
          <ul>
            <li><strong>Google Analytics</strong> — website analytics</li>
            <li><strong>Google AdSense</strong> — advertising (when enabled)</li>
            <li><strong>Vercel</strong> — website hosting</li>
          </ul>

          <h2>Affiliate Links</h2>
          <p>
            Some links on this site are affiliate links. If you make a purchase through an affiliate link, we may earn a small commission at no extra cost to you. This helps us keep the site running.
          </p>

          <h2>Data Retention</h2>
          <p>
            We retain your email address only as long as you remain subscribed to our newsletter. You can unsubscribe at any time.
          </p>

          <h2>Your Rights</h2>
          <p>
            You have the right to access, correct, or delete any personal information we hold about you. Contact us at the contact page with any requests.
          </p>

          <h2>Contact</h2>
          <p>
            For privacy-related questions, please use our <a href="/contact">contact page</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
