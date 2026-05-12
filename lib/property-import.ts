import {
  type ListingMode,
  type PropertyFeature,
  type PropertyRecord,
  type PropertyType,
  type RentPricePeriod,
} from "@/lib/property-shared";

const importUserAgent =
  "Mozilla/5.0 (compatible; VerdantRealtyImporter/1.0; +https://github.com/Fallka0/verdant-realty)";

const ignoredImagePatterns = [
  /\/new\/app\/images\/nofoto\.jpg/i,
  /\/escaparatecliente\/index\.php/i,
  /\/escaparate\/certificado\/ce\.php/i,
];

export type ImportedPropertyPayload = {
  notes: string[];
  property: PropertyRecord;
  provider: "inmovilla";
  resolvedUrl: string;
  sourceUrl: string;
};

export async function importPropertyFromUrl(rawUrl: string): Promise<ImportedPropertyPayload> {
  const sourceUrl = normalizeSourceUrl(rawUrl);

  if (!isInmovillaUrl(sourceUrl)) {
    throw new Error("Only public Inmovilla or info-home property links are supported right now.");
  }

  const resolvedUrl = await resolveInmovillaPropertyUrl(sourceUrl);
  const markdown = await fetchReaderMarkdown(resolvedUrl);

  if (/Propiedad no disponible/i.test(markdown)) {
    throw new Error("This property is no longer publicly available in the source system.");
  }

  return parseInmovillaMarkdown({
    markdown,
    resolvedUrl,
    sourceUrl: sourceUrl.toString(),
  });
}

function normalizeSourceUrl(rawUrl: string) {
  let candidate = rawUrl.trim();

  if (!/^https?:\/\//i.test(candidate)) {
    candidate = `https://${candidate}`;
  }

  const url = new URL(candidate);

  if (!["http:", "https:"].includes(url.protocol)) {
    throw new Error("Please paste a public HTTP or HTTPS property link.");
  }

  return url;
}

function isInmovillaUrl(url: URL) {
  const hostname = url.hostname.toLowerCase();

  return hostname.includes("info-home.link") || hostname.includes("inmovilla.com");
}

async function resolveInmovillaPropertyUrl(sourceUrl: URL) {
  if (sourceUrl.pathname.includes("/escaparatecliente/")) {
    return sourceUrl.toString();
  }

  const html = await fetchText(sourceUrl.toString());
  const iframeMatch = html.match(/<iframe[^>]+src="([^"]+)"/i);

  if (iframeMatch?.[1]) {
    return new URL(iframeMatch[1], sourceUrl).toString();
  }

  if (/Propiedad no disponible/i.test(html)) {
    throw new Error("This property is no longer publicly available in the source system.");
  }

  throw new Error("We could not find a public property page behind that link.");
}

async function fetchReaderMarkdown(targetUrl: string) {
  const readerUrl = `https://r.jina.ai/http://${targetUrl}`;

  return fetchText(readerUrl, {
    headers: {
      "User-Agent": importUserAgent,
      Accept: "text/plain,text/markdown;q=0.9,*/*;q=0.8",
    },
  });
}

async function fetchText(url: string, init?: RequestInit) {
  const response = await fetch(url, {
    ...init,
    headers: {
      "User-Agent": importUserAgent,
      ...(init?.headers ?? {}),
    },
    signal: AbortSignal.timeout(20_000),
  });

  if (!response.ok) {
    throw new Error(`The source request failed with status ${response.status}.`);
  }

  return response.text();
}

function parseInmovillaMarkdown(input: {
  markdown: string;
  resolvedUrl: string;
  sourceUrl: string;
}): ImportedPropertyPayload {
  const { markdown, resolvedUrl, sourceUrl } = input;
  const lines = markdown
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const referenceCode = extractReferenceCode(markdown) ?? "IMPORT";
  const title = extractTitle(lines);
  const description = extractDescription(markdown, title);
  const shortDescription = extractShortDescription(description, title);
  const type = mapPropertyType(findValueAfterLabel(lines, "Tipo"));
  const location =
    findValueAfterLabel(lines, "Zona") ??
    findHeaderLocation(lines) ??
    "Costa Blanca";
  const bedrooms = extractNumberAfterLabel(lines, "Habitaciones") ?? 0;
  const bathrooms = extractNumberAfterLabel(lines, "Baños") ?? 0;
  const usableSqm = extractSquareMetersAfterLabel(lines, "Sup. Útil");
  const builtSqm = extractSquareMetersAfterLabel(lines, "Sup. construida");
  const plotSqm = extractSquareMetersAfterLabel(lines, "Sup. Parcela");
  const salePrice = extractPriceBetween(lines, "Venta", "Alquilar") ?? 0;
  const rentPrice = extractPriceBetween(lines, "Alquilar", "Traspaso");
  const listingMode = deriveListingMode(salePrice, rentPrice);
  const images = extractImageUrls(markdown);

  if (!title) {
    throw new Error("We could not extract a property title from that source.");
  }

  if (images.length === 0) {
    throw new Error("We could not extract any property images from that source.");
  }

  const property = createImportedPropertyRecord({
    bathrooms,
    bedrooms,
    description,
    features: inferFeatures(markdown),
    galleryUrls: images.slice(1),
    interiorSqm: usableSqm ?? builtSqm,
    listingMode,
    location,
    mainImageUrl: images[0],
    plotSqm,
    priceEuro: salePrice,
    referenceCode,
    rentPriceEuro: rentPrice,
    rentPricePeriod: rentPrice ? inferRentPricePeriod(lines) : null,
    shortDescription,
    title,
    type,
  });

  const notes = [
    `Imported from ${resolvedUrl}`,
    listingMode !== "sale" && !property.availabilityStart
      ? "Rental availability dates still need to be filled in before saving."
      : null,
  ].filter((note): note is string => Boolean(note));

  return {
    notes,
    property,
    provider: "inmovilla",
    resolvedUrl,
    sourceUrl,
  };
}

function createImportedPropertyRecord(input: {
  bathrooms: number;
  bedrooms: number;
  description: string;
  features: PropertyFeature[];
  galleryUrls: string[];
  interiorSqm: number | null;
  listingMode: ListingMode;
  location: string;
  mainImageUrl: string;
  plotSqm: number | null;
  priceEuro: number;
  referenceCode: string;
  rentPriceEuro: number | null;
  rentPricePeriod: RentPricePeriod | null;
  shortDescription: string;
  title: string;
  type: PropertyType;
}): PropertyRecord {
  const now = new Date().toISOString();

  return {
    availabilityEnd: null,
    availabilityStart: null,
    bathrooms: input.bathrooms,
    bedrooms: input.bedrooms,
    contentTranslations: {
      en: {
        description: input.description,
        shortDescription: input.shortDescription,
        title: input.title,
      },
    },
    createdAt: now,
    description: input.description,
    featured: false,
    features: input.features,
    galleryUrls: input.galleryUrls,
    id: `imported-${Date.now()}`,
    interiorSqm: input.interiorSqm,
    internalNotes: "",
    listingMode: input.listingMode,
    location: input.location,
    mainImageUrl: input.mainImageUrl,
    plotSqm: input.plotSqm,
    priceEuro: input.priceEuro,
    referenceCode: input.referenceCode,
    rentPriceEuro: input.rentPriceEuro,
    rentPricePeriod: input.rentPricePeriod,
    rentalPeriods: [],
    shortDescription: input.shortDescription,
    slug: slugify(input.title),
    status: "draft",
    title: input.title,
    type: input.type,
    updatedAt: now,
  };
}

function extractReferenceCode(markdown: string) {
  return markdown.match(/Ref:\s*([^\n]+)/i)?.[1]?.trim() ?? null;
}

function extractTitle(lines: string[]) {
  const refIndex = lines.findIndex((line) => line.startsWith("Ref:"));

  if (refIndex >= 0) {
    for (let index = refIndex + 1; index < lines.length; index += 1) {
      const candidate = lines[index];

      if (!candidate || isNoiseLine(candidate)) {
        continue;
      }

      return candidate;
    }
  }

  return null;
}

function extractDescription(markdown: string, title: string | null) {
  const match = markdown.match(/### Descripción([\s\S]+?)(?:Marcar como vendida|Modificar Precio Cambiado|$)/i);
  const block = match?.[1]?.trim();

  if (!block) {
    return title ?? "";
  }

  const cleanedLines = block
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => line !== title)
    .filter((line) => !/^!\[Image /i.test(line))
    .filter((line) => !/^📩/u.test(line));

  return cleanedLines.join("\n\n").trim();
}

function extractShortDescription(description: string, title: string | null) {
  const paragraphs = description
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .filter((paragraph) => paragraph !== title)
    .filter((paragraph) => !paragraph.startsWith("🏡"))
    .filter((paragraph) => !paragraph.startsWith("📍"))
    .filter((paragraph) => !paragraph.startsWith("•"));

  return paragraphs[0] ?? title ?? "";
}

function findValueAfterLabel(lines: string[], label: string) {
  const regex = new RegExp(`^${escapeForRegExp(label)}\\s+(.+)$`, "i");

  for (const line of lines) {
    const match = line.match(regex);

    if (match?.[1] && !/^(No indicado|-)+$/i.test(match[1].trim())) {
      return match[1].trim();
    }
  }

  return null;
}

function findHeaderLocation(lines: string[]) {
  const refIndex = lines.findIndex((line) => line.startsWith("Ref:"));

  if (refIndex < 0) {
    return null;
  }

  let seenTitle = false;

  for (let index = refIndex + 1; index < lines.length; index += 1) {
    const line = lines[index];

    if (isNoiseLine(line)) {
      continue;
    }

    if (!seenTitle) {
      seenTitle = true;
      continue;
    }

    if (isHeaderValueCandidate(line)) {
      return line;
    }
  }

  return null;
}

function isHeaderValueCandidate(line: string) {
  return (
    !/€/.test(line) &&
    !/^Venta$/i.test(line) &&
    !/^Alquilar$/i.test(line) &&
    !/^Traspaso$/i.test(line) &&
    !/^\d+%$/.test(line) &&
    !/^(Buen estado|A reformar|Obra nueva|Reservada|Vendida)$/i.test(line)
  );
}

function isNoiseLine(line: string) {
  return /^!\[Image /i.test(line) || /^#+\s/.test(line);
}

function extractNumberAfterLabel(lines: string[], label: string) {
  const value = findValueAfterLabel(lines, label);
  const match = value?.match(/(\d+)/);

  return match ? Number(match[1]) : null;
}

function extractSquareMetersAfterLabel(lines: string[], label: string) {
  const value = findValueAfterLabel(lines, label);

  if (!value || /No indicado/i.test(value)) {
    return null;
  }

  const match = value.match(/(\d+(?:[.,]\d+)?)/);

  return match ? Number(match[1].replace(",", ".")) : null;
}

function extractPriceBetween(lines: string[], startLabel: string, endLabel: string) {
  const startIndex = lines.findIndex((line) => line === startLabel);

  if (startIndex < 0) {
    return null;
  }

  const endIndex = lines.findIndex((line, index) => index > startIndex && line === endLabel);
  const block = lines.slice(startIndex + 1, endIndex > startIndex ? endIndex : undefined);
  const prices = block
    .flatMap((line) =>
      Array.from(line.matchAll(/(\d[\d.]*)\s*€/g), (match) =>
        Number(match[1].replace(/\./g, "")),
      ),
    )
    .filter((value) => Number.isFinite(value) && value > 0);

  return prices.at(-1) ?? null;
}

function inferRentPricePeriod(lines: string[]): RentPricePeriod | null {
  const monthHint = lines.find((line) => /^-?\s*€\/mes$/i.test(line) || /mes/i.test(line));

  if (monthHint) {
    return "month";
  }

  return null;
}

function deriveListingMode(salePrice: number, rentPrice: number | null): ListingMode {
  if (salePrice > 0 && rentPrice) {
    return "both";
  }

  if (rentPrice) {
    return "rent";
  }

  return "sale";
}

function extractImageUrls(markdown: string) {
  const matches = Array.from(markdown.matchAll(/!\[Image \d+\]\((https?:\/\/[^)\s]+)\)/g), (match) => match[1]);
  const deduped: string[] = [];
  const seen = new Set<string>();

  for (const url of matches) {
    if (ignoredImagePatterns.some((pattern) => pattern.test(url))) {
      continue;
    }

    if (seen.has(url)) {
      continue;
    }

    seen.add(url);
    deduped.push(url);
  }

  return deduped;
}

function mapPropertyType(value: string | null): PropertyType {
  const normalized = normalizeText(value);

  if (/adosad|townhouse/i.test(normalized)) {
    return "townhouse";
  }

  if (/villa|chalet/i.test(normalized)) {
    return "villa";
  }

  if (/atico|[áa]tico|penthouse/i.test(normalized)) {
    return "penthouse";
  }

  if (/bungalow|bungal[oó]/i.test(normalized)) {
    return "bungalow";
  }

  if (/finca/i.test(normalized)) {
    return "finca";
  }

  return "apartment";
}

function inferFeatures(markdown: string): PropertyFeature[] {
  const normalized = normalizeText(markdown);
  const featureMatchers: Array<[PropertyFeature, RegExp]> = [
    ["pool", /\bpiscina\b|\bpool\b/],
    ["garage", /\bgaraje\b.*\bsi\b|\bgarage\b/],
    ["parking", /\bparking\b.*\bsi\b/],
    ["terrace", /\bterraza\b|\bsolarium\b|\bsolárium\b|\bterrace\b|\bbalcon\b|\bbalc[oó]n\b/],
    ["garden", /\bjardin\b|\bjard[ií]n\b|\bgarden\b/],
    ["lift", /\bascensor\b|\blift\b/],
    ["furnished", /\bamueblada\b|\bamueblado\b|\bfurnished\b/],
    ["air_conditioning", /\baire acondicionado\b|\bair conditioning\b/],
    ["heating", /\bcalefaccion\b|\bcalefacci[oó]n\b|\bheating\b|\bbomba de calor\b/],
  ];

  return featureMatchers
    .filter(([, pattern]) => pattern.test(normalized))
    .map(([feature]) => feature);
}

function normalizeText(value: string | null) {
  return (value ?? "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function slugify(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function escapeForRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
