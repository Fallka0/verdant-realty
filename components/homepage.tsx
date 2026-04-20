"use client";

import { useEffect, useState } from "react";

import { InquiryForm } from "@/components/inquiry-form";
import { defaultLocale, isSupportedLocale, localeOptions, siteCopy, type Locale } from "@/lib/site-copy";

const storageKey = "verdant-realty-locale";

export function Homepage() {
  const [locale, setLocale] = useState<Locale>(() => {
    if (typeof window === "undefined") {
      return defaultLocale;
    }

    const storedLocale = window.localStorage.getItem(storageKey);

    if (storedLocale && isSupportedLocale(storedLocale)) {
      return storedLocale;
    }

    return defaultLocale;
  });

  useEffect(() => {
    document.documentElement.lang = locale;
    window.localStorage.setItem(storageKey, locale);
  }, [locale]);

  const copy = siteCopy[locale];

  return (
    <main className="page-shell" lang={locale}>
      <section className="hero">
        <div className="hero-glow" />
        <header className="site-header">
          <div className="brand-lockup">
            <span className="brand-mark" />
            <div>
              <p className="brand-name">Verdant Realty</p>
              <p className="brand-tag">{copy.brandTag}</p>
            </div>
          </div>

          <div className="header-actions">
            <nav className="site-nav" aria-label={copy.nav.ariaLabel}>
              <a href="#services">{copy.nav.services}</a>
              <a href="#approach">{copy.nav.approach}</a>
              <a href="#contact">{copy.nav.contact}</a>
            </nav>

            <div className="language-switcher" aria-label={copy.languageSwitcherLabel} role="group">
              {localeOptions.map((option) => (
                <button
                  key={option.code}
                  className={`language-button ${locale === option.code ? "active" : ""}`}
                  type="button"
                  onClick={() => setLocale(option.code)}
                  aria-pressed={locale === option.code}
                  title={option.label}
                >
                  {option.shortLabel}
                </button>
              ))}
            </div>
          </div>
        </header>

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">{copy.hero.eyebrow}</p>
            <h1>{copy.hero.title}</h1>
            <p className="hero-text">{copy.hero.text}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#contact">
                {copy.hero.primaryCta}
              </a>
              <a className="button button-secondary" href="#services">
                {copy.hero.secondaryCta}
              </a>
            </div>
            <div className="hero-stats" aria-label={copy.hero.statsAriaLabel}>
              {copy.hero.stats.map((stat) => (
                <div key={`${stat.value}-${stat.label}`}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <aside className="hero-card">
            <p className="card-kicker">{copy.heroCard.kicker}</p>
            <h2>{copy.heroCard.title}</h2>
            <p>{copy.heroCard.text}</p>
            <ul className="feature-list">
              {copy.heroCard.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="content-section" id="services">
        <div className="section-heading">
          <p className="eyebrow">{copy.servicesSection.eyebrow}</p>
          <h2>{copy.servicesSection.title}</h2>
          <p>{copy.servicesSection.text}</p>
        </div>
        <div className="card-grid">
          {copy.servicesSection.items.map((service) => (
            <article className="info-card" key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section split-section" id="approach">
        <div className="section-heading">
          <p className="eyebrow">{copy.approachSection.eyebrow}</p>
          <h2>{copy.approachSection.title}</h2>
          <p>{copy.approachSection.text}</p>
        </div>
        <div className="process-list">
          {copy.approachSection.items.map((item) => (
            <article className="process-card" key={item.step}>
              <span>{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <p className="eyebrow">{copy.neighborhoodsSection.eyebrow}</p>
          <h2>{copy.neighborhoodsSection.title}</h2>
          <p>{copy.neighborhoodsSection.text}</p>
        </div>
        <div className="neighborhood-grid">
          {copy.neighborhoodsSection.items.map((area) => (
            <article className="neighborhood-card" key={area.title}>
              <h3>{area.title}</h3>
              <p>{area.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section contact-section" id="contact">
        <div className="contact-copy">
          <p className="eyebrow">{copy.contactSection.eyebrow}</p>
          <h2>{copy.contactSection.title}</h2>
          <p>{copy.contactSection.text}</p>
          <div className="contact-details">
            {copy.contactSection.details.map((detail) => (
              <div key={detail.label}>
                <span>{detail.label}</span>
                <strong>{detail.value}</strong>
              </div>
            ))}
          </div>
        </div>
        <InquiryForm locale={locale} copy={copy.form} />
      </section>
    </main>
  );
}
