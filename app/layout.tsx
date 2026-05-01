import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";

import "./globals.css";

// DM Sans as the base body font — applied directly as className so it's
// baked into the SSR HTML, no CSS variable race on first paint.
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

// Cormorant Garamond for headings — exposed as a CSS variable so heading
// rules in globals.css can reference it via var(--font-display).
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Milla Homes",
  description:
    "Milla Homes is a boutique real estate brand with calm strategy, polished presentation, and concierge-level client care.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // cormorant.variable puts --font-display on <html> for heading CSS rules
    // dmSans.className applies DM Sans directly — no variable indirection needed
    <html lang="en" className={cormorant.variable}>
      <body className={dmSans.className}>{children}</body>
    </html>
  );
}
