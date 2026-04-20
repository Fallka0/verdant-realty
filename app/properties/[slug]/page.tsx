import { cookies } from "next/headers";
import Link from "next/link";

import { notFound } from "next/navigation";

import { ContactActions } from "@/components/contact-actions";
import { ImageCarousel } from "@/components/image-carousel";
import { InquiryForm } from "@/components/inquiry-form";
import { PublicHeader } from "@/components/public-header";
import { adminCopy, resolveAdminLocale } from "@/lib/admin-copy";
import { getAdminAuthState } from "@/lib/auth";
import { motherPhoneDisplay } from "@/lib/contact";
import {
  getLocalizedPropertyStatusLabel,
  getLocalizedPropertyTypeLabel,
  publicCopy,
  resolvePublicLocale,
} from "@/lib/public-copy";
import { formatPrice } from "@/lib/property-shared";
import { getPropertyBySlug, localizeProperty } from "@/lib/properties";

export const dynamic = "force-dynamic";

type PropertyDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const cookieStore = await cookies();
  const locale = resolvePublicLocale(cookieStore.get("verdant-locale")?.value);
  const copy = publicCopy[locale];
  const { slug } = await params;
  const [property, authState] = await Promise.all([getPropertyBySlug(slug), getAdminAuthState()]);
  const adminLocale = resolveAdminLocale(locale);

  if (!property) {
    notFound();
  }

  const localizedProperty = localizeProperty(property, locale);

  const gallery = [localizedProperty.mainImageUrl, ...localizedProperty.galleryUrls];

  return (
    <main className="site-shell section-stack" data-locale={locale} lang={locale}>
      <PublicHeader
        adminLabel={authState.status === "authorized" ? adminCopy[adminLocale].layout.adminLabel : undefined}
        brandSubtitle={copy.brandSubtitle}
        compact
        currentLocale={locale}
        languageLabel={copy.languageLabel}
        nav={copy.nav}
      />

      <section className="detail-spotlight">
        <ImageCarousel copy={copy} images={gallery} title={localizedProperty.title} />

        <div className="property-detail-hero">
          <div className="section-heading">
            <Link className="detail-back-link" href="/properties">
              <span aria-hidden="true">&larr;</span>
              {copy.nav.properties}
            </Link>
            <p className="eyebrow">{localizedProperty.location}</p>
            <h1>{localizedProperty.title}</h1>
            <p>{localizedProperty.description}</p>
            <div className="detail-hero-meta">
              <span className={`pill status-${localizedProperty.status}`}>
                {getLocalizedPropertyStatusLabel(locale, localizedProperty.status)}
              </span>
              <span className="pill pill-secondary">
                {getLocalizedPropertyTypeLabel(locale, localizedProperty.type)}
              </span>
              <span>{localizedProperty.referenceCode}</span>
            </div>
          </div>
          <aside className="detail-price-card">
            <span>{localizedProperty.referenceCode}</span>
            <strong>{formatPrice(localizedProperty.priceEuro)}</strong>
            <ContactActions
              callLabel={copy.buttons.callNow}
              className="contact-actions detail-contact-actions"
              whatsappLabel={copy.buttons.whatsapp}
              whatsappMessage={`${copy.contact.whatsappMessage} ${localizedProperty.title}`}
            />
            <Link className="button button-primary" href="#inquiry">
              {copy.buttons.sendInquiry}
            </Link>
          </aside>
        </div>
      </section>

      <section className="detail-grid">
        <div className="detail-main">
          <div className="fact-grid">
            <article className="fact-card">
              <span>{copy.detail.type}</span>
              <strong>{getLocalizedPropertyTypeLabel(locale, localizedProperty.type)}</strong>
            </article>
            <article className="fact-card">
              <span>{copy.detail.bedrooms}</span>
              <strong>{localizedProperty.bedrooms}</strong>
            </article>
            <article className="fact-card">
              <span>{copy.detail.bathrooms}</span>
              <strong>{localizedProperty.bathrooms}</strong>
            </article>
            {localizedProperty.interiorSqm ? (
              <article className="fact-card">
                <span>{copy.detail.interior}</span>
                <strong>{localizedProperty.interiorSqm} m²</strong>
              </article>
            ) : null}
            {localizedProperty.plotSqm ? (
              <article className="fact-card">
                <span>{copy.detail.plot}</span>
                <strong>{localizedProperty.plotSqm} m²</strong>
              </article>
            ) : null}
          </div>

          <article className="detail-copy-card">
            <p className="eyebrow">{copy.detail.listingOverview}</p>
            <h2>{copy.detail.whyPause}</h2>
            <p>{localizedProperty.shortDescription}</p>
            <p>{localizedProperty.description}</p>
          </article>
        </div>

        <aside className="detail-sidebar" id="inquiry">
          <div className="sticky-card">
            <p className="eyebrow">{copy.detail.requestInfo}</p>
            <h2>{copy.detail.requestTitle}</h2>
            <div className="contact-details compact-contact-details">
              <div>
                <span>{copy.contact.phoneLabel}</span>
                <strong>{motherPhoneDisplay}</strong>
              </div>
              <div>
                <span>{copy.contact.availabilityLabel}</span>
                <strong>{copy.contact.availabilityValue}</strong>
              </div>
            </div>
            <ContactActions
              callLabel={copy.buttons.callNow}
              className="contact-actions sticky-contact-actions"
              whatsappLabel={copy.buttons.whatsapp}
              whatsappMessage={`${copy.contact.whatsappMessage} ${localizedProperty.title}`}
            />
            <InquiryForm
              copy={copy}
              locale={locale}
              property={{
                id: localizedProperty.id,
                location: localizedProperty.location,
                title: localizedProperty.title,
              }}
            />
          </div>
        </aside>
      </section>
    </main>
  );
}
