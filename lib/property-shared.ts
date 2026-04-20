export const propertyStatuses = ["draft", "available", "reserved", "sold"] as const;
export const propertyTypes = [
  "apartment",
  "villa",
  "townhouse",
  "penthouse",
  "bungalow",
  "finca",
] as const;

export type PropertyStatus = (typeof propertyStatuses)[number];
export type PropertyType = (typeof propertyTypes)[number];
export type PropertyContentFields = {
  description: string;
  shortDescription: string;
  title: string;
};

export type PropertyContentTranslations = Partial<Record<"en" | "es" | "ru" | "de", PropertyContentFields>>;

export type PropertyRecord = {
  bathrooms: number;
  bedrooms: number;
  contentTranslations: PropertyContentTranslations;
  createdAt: string;
  description: string;
  featured: boolean;
  galleryUrls: string[];
  id: string;
  interiorSqm: number | null;
  location: string;
  mainImageUrl: string;
  plotSqm: number | null;
  priceEuro: number;
  referenceCode: string;
  shortDescription: string;
  slug: string;
  status: PropertyStatus;
  title: string;
  type: PropertyType;
  updatedAt: string;
};

export function formatPrice(value: number) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function getPropertyTypeLabel(type: PropertyType) {
  return {
    apartment: "Apartment",
    villa: "Villa",
    townhouse: "Townhouse",
    penthouse: "Penthouse",
    bungalow: "Bungalow",
    finca: "Finca",
  }[type];
}

export function getPropertyStatusLabel(status: PropertyStatus) {
  return {
    draft: "Draft",
    available: "Available",
    reserved: "Reserved",
    sold: "Sold",
  }[status];
}
