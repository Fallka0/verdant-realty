"use client";

import { useRouter } from "next/navigation";

import { publicLocales, type PublicLocale } from "@/lib/public-copy";

type LanguageSwitcherProps = {
  currentLocale: PublicLocale;
  label: string;
  locales?: PublicLocale[];
};

const labels: Record<PublicLocale, string> = {
  en: "ENG",
  es: "ESP",
  ru: "РУС",
  de: "DE",
};

export function LanguageSwitcher({ currentLocale, label, locales = [...publicLocales] }: LanguageSwitcherProps) {
  const router = useRouter();

  return (
    <div className="language-switcher" aria-label={label} role="group">
      {locales.map((locale) => (
        <button
          key={locale}
          className={`language-button ${locale === currentLocale ? "active" : ""}`}
          type="button"
          aria-pressed={locale === currentLocale}
          onClick={() => {
            document.cookie = `verdant-locale=${locale}; path=/; max-age=31536000; samesite=lax`;
            router.refresh();
          }}
        >
          {labels[locale]}
        </button>
      ))}
    </div>
  );
}

