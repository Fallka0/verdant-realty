import { type PropertyContentFields, type PropertyContentTranslations } from "@/lib/property-shared";

const targetLocales = ["en", "es", "ru", "de"] as const;

const deeplTargetLanguageMap: Record<(typeof targetLocales)[number], string> = {
  en: "EN",
  es: "ES",
  ru: "RU",
  de: "DE",
};

const deeplSourceLanguageMap: Partial<Record<string, (typeof targetLocales)[number]>> = {
  EN: "en",
  ES: "es",
  RU: "ru",
  DE: "de",
};

const deeplSourceRequestLanguageMap: Record<(typeof targetLocales)[number], string> = {
  en: "EN",
  es: "ES",
  ru: "RU",
  de: "DE",
};

function getDeepLEnv() {
  return {
    apiKey: process.env.DEEPL_API_KEY,
    apiUrl: process.env.DEEPL_API_URL || "https://api-free.deepl.com",
  };
}

function buildFallbackTranslations(content: PropertyContentFields): PropertyContentTranslations {
  return Object.fromEntries(targetLocales.map((locale) => [locale, content])) as PropertyContentTranslations;
}

async function translateWithDeepL(
  apiUrl: string,
  apiKey: string,
  content: PropertyContentFields,
  targetLocale: (typeof targetLocales)[number],
  sourceLocale?: (typeof targetLocales)[number],
): Promise<{
  detectedSourceLocale: (typeof targetLocales)[number] | null;
  content: PropertyContentFields;
} | null> {
  const response = await fetch(`${apiUrl}/v2/translate`, {
    method: "POST",
    headers: {
      Authorization: `DeepL-Auth-Key ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: [content.title, content.shortDescription, content.description],
      ...(sourceLocale ? { source_lang: deeplSourceRequestLanguageMap[sourceLocale] } : {}),
      target_lang: deeplTargetLanguageMap[targetLocale],
      context: `${content.title}\n\n${content.shortDescription}\n\n${content.description}`,
    }),
  });

  if (!response.ok) {
    return null;
  }

  const data = (await response.json().catch(() => null)) as
    | {
        translations?: Array<{
          detected_source_language?: string;
          text?: string;
        }>;
      }
    | null;

  const translations = data?.translations;

  if (!translations || translations.length < 3) {
    return null;
  }

  const [title, shortDescription, description] = translations.map((entry) => entry.text?.trim() ?? "");
  const detectedSourceLanguage = translations[0]?.detected_source_language ?? null;

  if (!title || !shortDescription || !description) {
    return null;
  }

  return {
    detectedSourceLocale: detectedSourceLanguage ? deeplSourceLanguageMap[detectedSourceLanguage] ?? null : null,
    content: {
      title,
      shortDescription,
      description,
    },
  };
}

export async function generatePropertyTranslations(
  content: PropertyContentFields,
): Promise<PropertyContentTranslations> {
  const { apiKey, apiUrl } = getDeepLEnv();

  if (!apiKey) {
    return buildFallbackTranslations(content);
  }

  try {
    const englishResult = await translateWithDeepL(apiUrl, apiKey, content, "en");
    const sourceLocale = englishResult?.detectedSourceLocale ?? null;

    const translations = await Promise.all(
      targetLocales.map(async (locale) => {
        if (locale === sourceLocale) {
          return [locale, content] as const;
        }

        if (locale === "en" && englishResult && sourceLocale === "en") {
          return [locale, englishResult.content] as const;
        }

        const translated = await translateWithDeepL(apiUrl, apiKey, content, locale, sourceLocale ?? undefined);

        return [locale, translated?.content ?? content] as const;
      }),
    );

    return Object.fromEntries(translations) as PropertyContentTranslations;
  } catch {
    return buildFallbackTranslations(content);
  }
}
