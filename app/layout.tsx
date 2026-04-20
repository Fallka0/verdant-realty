import type { Metadata } from "next";
import type { CSSProperties } from "react";

import { siteFontVariables } from "@/app/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Verdant Realty",
  description: "Verdant Realty showcases homes for sale in Torrevieja and nearby coastal areas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={siteFontVariables as CSSProperties}>
        {children}
      </body>
    </html>
  );
}
