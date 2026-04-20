import type { Metadata } from "next";

import "@fontsource/lato/300.css";
import "@fontsource/lato/400.css";
import "@fontsource/lato/700.css";
import "@fontsource/lato/900.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Verdant Realty",
  description:
    "Verdant Realty showcases homes for sale in Torrevieja and nearby areas, with a private Supabase-backed admin panel for managing listings.",
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
