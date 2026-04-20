import { type PublicLocale } from "@/lib/public-copy";
import { propertyStatuses, propertyTypes, type PropertyRecord, type PropertyStatus, type PropertyType } from "@/lib/property-shared";
import { createAdminClient } from "@/lib/supabase/server";

type PropertyRow = {
  bathrooms: number | string | null;
  bedrooms: number | string | null;
  created_at: string | null;
  description: string | null;
  featured: boolean | null;
  gallery_urls: string[] | null;
  id: string;
  interior_sqm: number | string | null;
  location: string | null;
  main_image_url: string | null;
  plot_sqm: number | string | null;
  price_eur: number | string | null;
  reference_code: string | null;
  short_description: string | null;
  slug: string | null;
  status: string | null;
  title: string | null;
  property_type: string | null;
  updated_at: string | null;
};

export const sampleProperties: PropertyRecord[] = [
  {
    id: "sample-la-mata-apartment",
    referenceCode: "VR-101",
    title: "Sea-view apartment near La Mata beach",
    slug: "sea-view-apartment-la-mata",
    location: "La Mata, Torrevieja",
    priceEuro: 289000,
    bedrooms: 3,
    bathrooms: 2,
    interiorSqm: 96,
    plotSqm: null,
    type: "apartment",
    status: "available",
    featured: true,
    shortDescription:
      "Bright three-bedroom apartment with open terrace, sea views, and easy walking distance to the beach.",
    description:
      "This bright apartment combines an airy living area, generous terrace, and a practical three-bedroom layout ideal for buyers looking for a turnkey coastal base in La Mata. It is close to the promenade, restaurants, and everyday services.",
    mainImageUrl:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    galleryUrls: [
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
    ],
    createdAt: "2026-04-20T08:00:00.000Z",
    updatedAt: "2026-04-20T08:00:00.000Z",
  },
  {
    id: "sample-villa-los-balcones",
    referenceCode: "VR-102",
    title: "Detached villa with pool in Los Balcones",
    slug: "detached-villa-los-balcones",
    location: "Los Balcones, Torrevieja",
    priceEuro: 525000,
    bedrooms: 4,
    bathrooms: 3,
    interiorSqm: 184,
    plotSqm: 420,
    type: "villa",
    status: "available",
    featured: true,
    shortDescription:
      "Detached family villa with private pool, spacious outdoor areas, and a layout that works year-round.",
    description:
      "Designed for buyers who want extra space and privacy, this detached villa in Los Balcones offers generous indoor living, a separate dining area, private pool, and room for entertaining outside.",
    mainImageUrl:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    galleryUrls: [
      "https://images.unsplash.com/photo-1430285561322-7808604715df?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
    ],
    createdAt: "2026-04-19T08:00:00.000Z",
    updatedAt: "2026-04-19T08:00:00.000Z",
  },
  {
    id: "sample-penthouse-punta-prima",
    referenceCode: "VR-103",
    title: "Modern penthouse close to Punta Prima",
    slug: "modern-penthouse-punta-prima",
    location: "Punta Prima, Orihuela Costa",
    priceEuro: 349000,
    bedrooms: 2,
    bathrooms: 2,
    interiorSqm: 88,
    plotSqm: null,
    type: "penthouse",
    status: "reserved",
    featured: false,
    shortDescription:
      "Modern top-floor home with strong rental appeal, generous sunlight, and quick access to the coast.",
    description:
      "A clean-lined penthouse positioned for both lifestyle buyers and second-home investors. The property offers a functional open plan, sunny terraces, and convenient access to Punta Prima and Torrevieja.",
    mainImageUrl:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    galleryUrls: [
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    ],
    createdAt: "2026-04-18T08:00:00.000Z",
    updatedAt: "2026-04-18T08:00:00.000Z",
  },
];

const localizedSamplePropertyContent: Partial<
  Record<
    PublicLocale,
    Record<
      string,
      {
        description: string;
        shortDescription: string;
        title: string;
      }
    >
  >
> = {
  es: {
    "sample-la-mata-apartment": {
      title: "Apartamento con vistas al mar cerca de la playa de La Mata",
      shortDescription:
        "Luminoso apartamento de tres dormitorios con terraza abierta, vistas al mar y cómoda distancia a pie de la playa.",
      description:
        "Este apartamento luminoso combina una zona de estar amplia, una terraza generosa y una distribución práctica de tres dormitorios, ideal para compradores que buscan una base costera lista para entrar a vivir en La Mata. Está cerca del paseo marítimo, restaurantes y servicios diarios.",
    },
    "sample-villa-los-balcones": {
      title: "Villa independiente con piscina en Los Balcones",
      shortDescription:
        "Villa familiar independiente con piscina privada, amplios espacios exteriores y una distribución cómoda todo el año.",
      description:
        "Pensada para compradores que buscan más espacio y privacidad, esta villa independiente en Los Balcones ofrece amplias zonas interiores, comedor separado, piscina privada y espacio exterior para recibir invitados.",
    },
    "sample-penthouse-punta-prima": {
      title: "Ático moderno cerca de Punta Prima",
      shortDescription:
        "Vivienda moderna en la última planta con buena proyección de alquiler, mucha luz y acceso rápido a la costa.",
      description:
        "Un ático de líneas limpias pensado tanto para compradores de estilo de vida como para quienes buscan una segunda residencia. La propiedad ofrece una distribución abierta funcional, terrazas soleadas y acceso cómodo a Punta Prima y Torrevieja.",
    },
  },
  ru: {
    "sample-la-mata-apartment": {
      title: "Апартаменты с видом на море рядом с пляжем Ла Мата",
      shortDescription:
        "Светлая квартира с тремя спальнями, открытой террасой, видом на море и удобной пешей дорогой до пляжа.",
      description:
        "Эти светлые апартаменты объединяют просторную гостиную, большую террасу и удобную планировку с тремя спальнями. Это хороший вариант для покупателей, которым нужна готовая к проживанию база у моря в Ла Мата. Рядом находятся набережная, рестораны и все повседневные сервисы.",
    },
    "sample-villa-los-balcones": {
      title: "Отдельная вилла с бассейном в Лос Балконес",
      shortDescription:
        "Семейная вилла с частным бассейном, просторными внешними зонами и планировкой для круглогодичного проживания.",
      description:
        "Эта отдельная вилла в Лос Балконес подойдет покупателям, которым нужны пространство и приватность. Внутри много жилой площади, есть отдельная столовая зона, частный бассейн и удобные открытые пространства для отдыха и встреч.",
    },
    "sample-penthouse-punta-prima": {
      title: "Современный пентхаус рядом с Пунта Прима",
      shortDescription:
        "Современное жилье на верхнем этаже с хорошим арендным потенциалом, большим количеством света и быстрым доступом к побережью.",
      description:
        "Современный пентхаус для тех, кто ищет комфортное жилье у моря или вторую резиденцию. В объекте предусмотрены удобная открытая планировка, солнечные террасы и быстрый доступ к Пунта Прима и Торревьехе.",
    },
  },
  de: {
    "sample-la-mata-apartment": {
      title: "Apartment mit Meerblick nahe dem Strand von La Mata",
      shortDescription:
        "Helles Apartment mit drei Schlafzimmern, offener Terrasse, Meerblick und kurzem Fußweg zum Strand.",
      description:
        "Dieses helle Apartment verbindet einen luftigen Wohnbereich, eine großzügige Terrasse und einen praktischen Grundriss mit drei Schlafzimmern. Es eignet sich ideal für Käufer, die in La Mata ein sofort nutzbares Zuhause an der Küste suchen. Promenade, Restaurants und tägliche Besorgungen sind schnell erreichbar.",
    },
    "sample-villa-los-balcones": {
      title: "Freistehende Villa mit Pool in Los Balcones",
      shortDescription:
        "Freistehende Familienvilla mit privatem Pool, großzügigen Außenflächen und einem Grundriss für das ganze Jahr.",
      description:
        "Für Käufer, die mehr Platz und Privatsphäre suchen, bietet diese freistehende Villa in Los Balcones großzügige Wohnflächen, einen separaten Essbereich, einen privaten Pool und viel Raum im Außenbereich.",
    },
    "sample-penthouse-punta-prima": {
      title: "Modernes Penthouse nahe Punta Prima",
      shortDescription:
        "Modernes Zuhause im obersten Geschoss mit guter Vermietbarkeit, viel Licht und schnellem Zugang zur Küste.",
      description:
        "Ein klar gestaltetes Penthouse für Lifestyle-Käufer und Zweitwohnsitz-Interessenten. Die Immobilie bietet einen funktionalen offenen Grundriss, sonnige Terrassen und eine bequeme Anbindung an Punta Prima und Torrevieja.",
    },
  },
};

export function localizeProperty(property: PropertyRecord, locale: PublicLocale): PropertyRecord {
  const localized = localizedSamplePropertyContent[locale]?.[property.id];

  if (!localized) {
    return property;
  }

  return {
    ...property,
    ...localized,
  };
}

export function localizeProperties(properties: PropertyRecord[], locale: PublicLocale) {
  return properties.map((property) => localizeProperty(property, locale));
}

function coerceNumber(value: number | string | null) {
  if (value === null || value === "") {
    return null;
  }

  const numeric = Number(value);

  return Number.isFinite(numeric) ? numeric : null;
}

function normalizePropertyRow(row: PropertyRow): PropertyRecord {
  const type = row.property_type;
  const status = row.status;

  return {
    id: row.id,
    referenceCode: row.reference_code ?? "VR-000",
    title: row.title ?? "Untitled property",
    slug: row.slug ?? "untitled-property",
    location: row.location ?? "Torrevieja",
    priceEuro: coerceNumber(row.price_eur) ?? 0,
    bedrooms: coerceNumber(row.bedrooms) ?? 0,
    bathrooms: coerceNumber(row.bathrooms) ?? 0,
    interiorSqm: coerceNumber(row.interior_sqm),
    plotSqm: coerceNumber(row.plot_sqm),
    type: propertyTypes.includes(type as PropertyType) ? (type as PropertyType) : "apartment",
    status: propertyStatuses.includes(status as PropertyStatus)
      ? (status as PropertyStatus)
      : "draft",
    featured: Boolean(row.featured),
    shortDescription: row.short_description ?? "",
    description: row.description ?? "",
    mainImageUrl: row.main_image_url ?? sampleProperties[0].mainImageUrl,
    galleryUrls: row.gallery_urls ?? [],
    createdAt: row.created_at ?? new Date().toISOString(),
    updatedAt: row.updated_at ?? new Date().toISOString(),
  };
}

function sortProperties(properties: PropertyRecord[]) {
  return [...properties].sort((left, right) => {
    if (left.featured !== right.featured) {
      return left.featured ? -1 : 1;
    }

    return right.updatedAt.localeCompare(left.updatedAt);
  });
}

async function getPropertiesFromDatabase() {
  const supabase = createAdminClient();

  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .order("featured", { ascending: false })
    .order("updated_at", { ascending: false });

  if (error || !data) {
    return null;
  }

  return (data as PropertyRow[]).map(normalizePropertyRow);
}

export async function getPublicProperties() {
  const properties = (await getPropertiesFromDatabase()) ?? sampleProperties;

  return sortProperties(
    properties.filter((property) => property.status === "available" || property.status === "reserved"),
  );
}

export async function getFeaturedProperties(limit = 3) {
  const properties = await getPublicProperties();
  const featured = properties.filter((property) => property.featured);

  return (featured.length > 0 ? featured : properties).slice(0, limit);
}

export async function getLatestPublicProperties(limit = 6) {
  const properties = await getPublicProperties();

  return properties.slice(0, limit);
}

export async function getPropertyBySlug(slug: string) {
  const properties = await getPublicProperties();

  return properties.find((property) => property.slug === slug) ?? null;
}

export async function getAdminProperties() {
  const properties = (await getPropertiesFromDatabase()) ?? sampleProperties;

  return sortProperties(properties);
}

export async function getAdminPropertyById(id: string) {
  const properties = await getAdminProperties();

  return properties.find((property) => property.id === id) ?? null;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseIntegerField(value: FormDataEntryValue | null) {
  if (typeof value !== "string" || value.trim() === "") {
    return null;
  }

  const parsed = Number(value);

  return Number.isFinite(parsed) ? parsed : null;
}

function parseGalleryUrls(value: FormDataEntryValue | null) {
  if (typeof value !== "string") {
    return [];
  }

  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function parsePropertyFormData(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const rawSlug = String(formData.get("slug") ?? "").trim();
  const slug = slugify(rawSlug || title);
  const typeValue = String(formData.get("type") ?? "apartment");
  const statusValue = String(formData.get("status") ?? "draft");

  return {
    reference_code: String(formData.get("referenceCode") ?? "").trim().toUpperCase(),
    title,
    slug,
    location: String(formData.get("location") ?? "").trim(),
    price_eur: parseIntegerField(formData.get("priceEuro")) ?? 0,
    bedrooms: parseIntegerField(formData.get("bedrooms")) ?? 0,
    bathrooms: parseIntegerField(formData.get("bathrooms")) ?? 0,
    interior_sqm: parseIntegerField(formData.get("interiorSqm")),
    plot_sqm: parseIntegerField(formData.get("plotSqm")),
    property_type: propertyTypes.includes(typeValue as PropertyType)
      ? typeValue
      : "apartment",
    status: propertyStatuses.includes(statusValue as PropertyStatus) ? statusValue : "draft",
    featured: formData.get("featured") === "on",
    short_description: String(formData.get("shortDescription") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    main_image_url: String(formData.get("mainImageUrl") ?? "").trim(),
    gallery_urls: parseGalleryUrls(formData.get("galleryUrls")),
    updated_at: new Date().toISOString(),
  };
}

export function validatePropertyInput(input: ReturnType<typeof parsePropertyFormData>) {
  if (!input.reference_code || !input.title || !input.slug || !input.location || !input.main_image_url) {
    throw new Error("Reference, title, slug, location, and main image are required.");
  }
}
