import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: `Disclaimer for ${SITE_NAME}`,
  robots: { index: false },
};

export default function DisclaimerPage() {
  return (
    <div style={{ padding: "3rem 0 5rem" }}>
      <div className="container-narrow" style={{ maxWidth: "720px" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 800, marginBottom: "0.5rem" }}>
          Disclaimer
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginBottom: "2.5rem" }}>
          Last updated: January 1, 2025
        </p>
        <div className="prose">
          <h2>Earnings Disclaimer</h2>
          <p>
            The income figures and examples mentioned on {SITE_NAME} are illustrative and not guarantees of earning potential. Individual results will vary based on effort, experience, market conditions, and other factors outside our control.
          </p>
          <p>
            Making money online involves risk. Nothing on this site should be taken as a promise or guarantee of future earnings.
          </p>

          <h2>Affiliate Disclaimer</h2>
          <p>
            {SITE_NAME} participates in affiliate marketing programs. This means we may receive a commission when you click on certain links and make a purchase. This comes at no additional cost to you.
          </p>
          <p>
            We only recommend products and services we believe in. Our editorial opinions are not influenced by affiliate relationships.
          </p>

          <h2>General Information Only</h2>
          <p>
            The content published on {SITE_NAME} is for informational and educational purposes only. It is not intended as financial, legal, or professional advice. Always consult a qualified professional before making significant financial or business decisions.
          </p>

          <h2>Accuracy</h2>
          <p>
            We make every effort to ensure the information on this site is accurate and up to date. However, we cannot guarantee that all information is complete, correct, or current. Information may change without notice.
          </p>

          <h2>External Links</h2>
          <p>
            This site may link to external websites. We are not responsible for the content or practices of those sites. Linking to an external site does not imply endorsement.
          </p>
        </div>
      </div>
    </div>
  );
}
