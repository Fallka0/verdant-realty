import Link from "next/link";

import { LanguageSwitcher } from "@/components/language-switcher";
import { type PublicLocale } from "@/lib/public-copy";

type PublicHeaderProps = {
  brandSubtitle: string;
  compact?: boolean;
  currentLocale: PublicLocale;
  languageLabel: string;
  nav: {
    home: string;
    properties: string;
  };
};

export function PublicHeader({
  brandSubtitle,
  compact = false,
  currentLocale,
  languageLabel,
  nav,
}: PublicHeaderProps) {
  return (
    <header className={`public-header ${compact ? "compact-header" : ""}`}>
      <Link className="brand-link" href="/">
        <span className="brand-mark" />
        <span>
          <strong>Verdant Realty</strong>
          <small>{brandSubtitle}</small>
        </span>
      </Link>

      <div className="header-actions">
        <nav className="primary-nav" aria-label="Primary">
          <Link href="/">{nav.home}</Link>
          <Link href="/properties">{nav.properties}</Link>
        </nav>
        <LanguageSwitcher currentLocale={currentLocale} label={languageLabel} />
      </div>
    </header>
  );
}
