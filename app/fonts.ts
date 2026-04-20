import { Cormorant_Garamond, Lato, Noto_Sans } from "next/font/google";

export const displayFont = Cormorant_Garamond({
  display: "swap",
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-primary",
  weight: ["500", "600", "700"],
});

export const uiFont = Lato({
  display: "swap",
  subsets: ["latin", "latin-ext"],
  variable: "--font-secondary",
  weight: ["400", "700", "900"],
});

export const cyrillicUiFont = Noto_Sans({
  display: "swap",
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-secondary-cyrillic",
  weight: ["400", "700", "900"],
});
