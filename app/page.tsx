import { cookies } from "next/headers";

import { Homepage } from "@/components/homepage";
import { publicCopy, resolvePublicLocale } from "@/lib/public-copy";
import { getFeaturedProperties, getLatestPublicProperties } from "@/lib/properties";

export const dynamic = "force-dynamic";

export default async function Home() {
  const cookieStore = await cookies();
  const locale = resolvePublicLocale(cookieStore.get("verdant-locale")?.value);
  const [featuredProperties, latestProperties] = await Promise.all([
    getFeaturedProperties(3),
    getLatestPublicProperties(6),
  ]);

  return (
    <Homepage
      copy={publicCopy[locale]}
      currentLocale={locale}
      featuredProperties={featuredProperties}
      latestProperties={latestProperties}
    />
  );
}
