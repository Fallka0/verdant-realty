import { cookies } from "next/headers";

import { Homepage } from "@/components/homepage";
import { publicCopy, resolvePublicLocale } from "@/lib/public-copy";
import { getFeaturedProperties, getLatestPublicProperties, localizeProperties } from "@/lib/properties";

export const dynamic = "force-dynamic";

export default async function Home() {
  const cookieStore = await cookies();
  const locale = resolvePublicLocale(cookieStore.get("verdant-locale")?.value);
  const [rawFeaturedProperties, rawLatestProperties] = await Promise.all([
    getFeaturedProperties(3),
    getLatestPublicProperties(6),
  ]);
  const featuredProperties = localizeProperties(rawFeaturedProperties, locale);
  const latestProperties = localizeProperties(rawLatestProperties, locale);

  return (
    <Homepage
      copy={publicCopy[locale]}
      currentLocale={locale}
      featuredProperties={featuredProperties}
      latestProperties={latestProperties}
    />
  );
}
