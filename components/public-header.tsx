"use client";

import Link from "next/link";
import { useState } from "react";

import { LanguageSwitcher } from "@/components/language-switcher";
import { type PublicLocale } from "@/lib/public-copy";

type PublicHeaderProps = {
  adminLabel?: string;
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
  adminLabel,
  brandSubtitle,
  compact = false,
  currentLocale,
  languageLabel,
  nav,
}: PublicHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuLabel = isMenuOpen ? "Close navigation menu" : "Open navigation menu";

  return (
    <header className={`public-header ${compact ? "compact-header" : ""}`}>
      <Link className="brand-link" href="/">
        <span className="brand-mark" />
        <span>
          <strong>Milla Homes</strong>
          <small>{brandSubtitle}</small>
        </span>
      </Link>

      <button
        className={`mobile-menu-toggle ${isMenuOpen ? "is-open" : ""}`}
        type="button"
        aria-expanded={isMenuOpen}
        aria-controls="public-navigation"
        aria-label={menuLabel}
        onClick={() => setIsMenuOpen((open) => !open)}
      >
        <span />
        <span />
        <span />
      </button>

      <div className={`header-actions ${isMenuOpen ? "menu-open" : ""}`} id="public-navigation">
        <nav className="primary-nav" aria-label="Primary">
          <Link href="/" onClick={() => setIsMenuOpen(false)}>
            {nav.home}
          </Link>
          <Link href="/properties" onClick={() => setIsMenuOpen(false)}>
            {nav.properties}
          </Link>
          {adminLabel ? (
            <Link href="/admin" onClick={() => setIsMenuOpen(false)}>
              {adminLabel}
            </Link>
          ) : null}
        </nav>
        <LanguageSwitcher currentLocale={currentLocale} label={languageLabel} />
      </div>
    </header>
  );
}
