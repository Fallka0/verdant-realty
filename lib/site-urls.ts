const defaultPublicSiteUrl = "https://milla-homes.com";
const defaultAdminSiteUrl = "https://admin.milla-homes.com";

function stripTrailingSlash(value: string) {
  return value.replace(/\/+$/, "");
}

function normalizeBaseUrl(value: string | undefined, fallback: string) {
  const rawValue = value?.trim();

  if (!rawValue) {
    return fallback;
  }

  if (/^https?:\/\//i.test(rawValue)) {
    return stripTrailingSlash(rawValue);
  }

  return stripTrailingSlash(`https://${rawValue}`);
}

function normalizePath(path: string) {
  if (!path) {
    return "";
  }

  return path.startsWith("/") ? path : `/${path}`;
}

export const publicSiteUrl = normalizeBaseUrl(process.env.NEXT_PUBLIC_PUBLIC_SITE_URL, defaultPublicSiteUrl);
export const adminSiteUrl = normalizeBaseUrl(process.env.NEXT_PUBLIC_ADMIN_SITE_URL, defaultAdminSiteUrl);

export const publicSiteHost = new URL(publicSiteUrl).host;
export const adminSiteHost = new URL(adminSiteUrl).host;

export function getPublicSiteUrl(path = "") {
  return `${publicSiteUrl}${normalizePath(path)}`;
}

export function getAdminSiteUrl(path = "") {
  return `${adminSiteUrl}${normalizePath(path)}`;
}
