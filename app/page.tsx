import { Homepage } from "@/components/homepage";
import { getFeaturedProperties, getLatestPublicProperties } from "@/lib/properties";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [featuredProperties, latestProperties] = await Promise.all([
    getFeaturedProperties(3),
    getLatestPublicProperties(6),
  ]);

  return <Homepage featuredProperties={featuredProperties} latestProperties={latestProperties} />;
}
