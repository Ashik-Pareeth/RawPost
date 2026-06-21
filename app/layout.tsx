import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL, OG_IMAGE } from "@/lib/utils";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — No Fluff. Just Results.`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: ["make money online", "productivity tips", "AI tools", "side hustle", "earn online", "deep work"],
  authors: [{ name: "Raw Post Team" }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — No Fluff. Just Results.`,
    description: SITE_DESCRIPTION,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — No Fluff. Just Results.`,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
    creator: "@rawpost",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    google: "q1yCx_C367GosyLopIO6KxKeDCR7LxF0ed4X2kgVeF0",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": SITE_NAME,
  "url": SITE_URL,
  "description": SITE_DESCRIPTION,
  "logo": {
    "@type": "ImageObject",
    "url": `${SITE_URL}/logo.png`,
  },
};

import { GoogleAnalytics } from "@next/third-parties/google";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* eslint-disable @next/next/no-page-custom-font */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400;1,600&family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
