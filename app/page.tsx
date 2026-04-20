import type { Metadata } from "next";
import { cookies } from "next/headers";

import { Homepage } from "@/components/homepage";
import { adminCopy, resolveAdminLocale } from "@/lib/admin-copy";
import { getAdminAuthState } from "@/lib/auth";
import { publicCopy, resolvePublicLocale } from "@/lib/public-copy";
import { getFeaturedProperties, getLatestPublicProperties, localizeProperties } from "@/lib/properties";

export const dynamic = "force-dynamic";

function getOpenGraphLocale(locale: string) {
  return {
    de: "de_DE",
    en: "en_US",
    es: "es_ES",
    ru: "ru_RU",
  }[locale] ?? "en_US";
}

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = resolvePublicLocale(cookieStore.get("verdant-locale")?.value);
  const copy = publicCopy[locale];
  const [featuredProperty] = localizeProperties(await getFeaturedProperties(1), locale);

  return {
    title: copy.seo.title,
    description: copy.seo.description,
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title: copy.seo.ogTitle,
      description: copy.seo.ogDescription,
      url: "/",
      siteName: "Verdant Realty",
      locale: getOpenGraphLocale(locale),
      type: "website",
      images: featuredProperty
        ? [
            {
              alt: featuredProperty.title,
              url: featuredProperty.mainImageUrl,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: copy.seo.ogTitle,
      description: copy.seo.ogDescription,
      images: featuredProperty ? [featuredProperty.mainImageUrl] : undefined,
    },
  };
}

export default async function Home() {
  const cookieStore = await cookies();
  const locale = resolvePublicLocale(cookieStore.get("verdant-locale")?.value);
  const [rawFeaturedProperties, rawLatestProperties, authState] = await Promise.all([
    getFeaturedProperties(3),
    getLatestPublicProperties(6),
    getAdminAuthState(),
  ]);
  const adminLocale = resolveAdminLocale(locale);
  const featuredProperties = localizeProperties(rawFeaturedProperties, locale);
  const latestProperties = localizeProperties(rawLatestProperties, locale);

  return (
    <Homepage
      adminLabel={authState.status === "authorized" ? adminCopy[adminLocale].layout.adminLabel : undefined}
      copy={publicCopy[locale]}
      currentLocale={locale}
      featuredProperties={featuredProperties}
      latestProperties={latestProperties}
    />
  );
}
