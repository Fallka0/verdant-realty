"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { publicLocales, type PublicLocale } from "@/lib/public-copy";

type LanguageSwitcherProps = {
  compact?: boolean;
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

export function LanguageSwitcher({
  compact = false,
  currentLocale,
  label,
  locales = [...publicLocales],
}: LanguageSwitcherProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  if (compact) {
    return (
      <div className={`language-switcher language-switcher-compact ${isOpen ? "is-open" : ""}`}>
        <button
          aria-expanded={isOpen}
          aria-haspopup="true"
          aria-label={label}
          className="language-compact-trigger"
          onClick={() => setIsOpen((open) => !open)}
          type="button"
        >
          <span>{labels[currentLocale]}</span>
          <span aria-hidden="true" className="language-compact-chevron">
            ▾
          </span>
        </button>

        {isOpen ? (
          <div aria-label={label} className="language-compact-menu" role="menu">
            {locales.map((locale) => (
              <button
                key={locale}
                aria-checked={locale === currentLocale}
                className={`language-button ${locale === currentLocale ? "active" : ""}`}
                onClick={() => {
                  document.cookie = `verdant-locale=${locale}; path=/; max-age=31536000; samesite=lax`;
                  setIsOpen(false);
                  router.refresh();
                }}
                role="menuitemradio"
                type="button"
              >
                {labels[locale]}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    );
  }

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
