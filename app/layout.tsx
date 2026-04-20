import type { Metadata } from "next";

import "@fontsource/lato/300.css";
import "@fontsource/lato/400.css";
import "@fontsource/lato/700.css";
import "@fontsource/lato/900.css";
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
