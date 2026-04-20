import type { Metadata } from "next";

import { cyrillicUiFont, displayFont, uiFont } from "@/app/fonts";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: "Verdant Realty",
  description: "Verdant Realty showcases homes for sale in Torrevieja and nearby coastal areas.",
  metadataBase: new URL(siteUrl),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${displayFont.variable} ${uiFont.variable} ${cyrillicUiFont.variable}`}>
        {children}
      </body>
    </html>
  );
}
