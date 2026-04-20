import { cookies } from "next/headers";

import { PropertyFilters } from "@/components/property-filters";
import { PublicHeader } from "@/components/public-header";
import { publicCopy, resolvePublicLocale } from "@/lib/public-copy";
import { getPublicProperties } from "@/lib/properties";

export const dynamic = "force-dynamic";

export default async function PropertiesPage() {
  const cookieStore = await cookies();
  const locale = resolvePublicLocale(cookieStore.get("verdant-locale")?.value);
  const copy = publicCopy[locale];
  const properties = await getPublicProperties();

  return (
    <main className="site-shell section-stack">
      <PublicHeader
        brandSubtitle={copy.brandSubtitle}
        compact
        currentLocale={locale}
        languageLabel={copy.languageLabel}
        nav={copy.nav}
      />

      <section className="section-heading">
        <p className="eyebrow">{copy.propertiesPage.eyebrow}</p>
        <h1>{copy.propertiesPage.title}</h1>
        <p>{copy.propertiesPage.text}</p>
      </section>

      <PropertyFilters copy={copy} locale={locale} properties={properties} />
    </main>
  );
}
