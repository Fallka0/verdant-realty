import { getPublicSiteUrl } from "@/lib/site-urls";

export function getOpenGraphLocale(locale: string) {
  return {
    de: "de_DE",
    en: "en_US",
    es: "es_ES",
    ru: "ru_RU",
  }[locale] ?? "en_US";
}

export function getCanonicalUrl(path: string) {
  return getPublicSiteUrl(path);
}

export function truncateSeoDescription(value: string, maxLength = 155) {
  const normalized = value.replace(/\s+/g, " ").trim();

  if (normalized.length <= maxLength) {
    return normalized;
  }

  return `${normalized.slice(0, maxLength - 1).trimEnd()}…`;
}
