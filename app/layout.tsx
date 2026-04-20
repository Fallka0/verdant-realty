import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Verdant Realty",
  description:
    "Verdant Realty is a boutique real estate brand with calm strategy, polished presentation, and concierge-level client care.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
