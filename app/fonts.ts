import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/cormorant-garamond/700.css";
import "@fontsource/lato/300.css";
import "@fontsource/lato/400.css";
import "@fontsource/lato/700.css";
import "@fontsource/lato/900.css";
import "@fontsource/noto-sans/300.css";
import "@fontsource/noto-sans/400.css";
import "@fontsource/noto-sans/700.css";
import "@fontsource/noto-sans/900.css";

export const siteFontVariables = {
  "--font-primary": '"Cormorant Garamond"',
  "--font-secondary": '"Lato"',
  "--font-secondary-cyrillic": '"Noto Sans"',
} as Record<`--${string}`, string>;
