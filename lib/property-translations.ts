import { type PropertyContentFields, type PropertyContentTranslations } from "@/lib/property-shared";

const targetLocales = ["en", "es", "ru", "de"] as const;

const deeplTargetLanguageMap: Record<(typeof targetLocales)[number], string> = {
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
): Promise<PropertyContentFields | null> {
  const response = await fetch(`${apiUrl}/v2/translate`, {
    method: "POST",
    headers: {
      Authorization: `DeepL-Auth-Key ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: [content.title, content.shortDescription, content.description],
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
          text?: string;
        }>;
      }
    | null;

  const translations = data?.translations;

  if (!translations || translations.length < 3) {
    return null;
  }

  const [title, shortDescription, description] = translations.map((entry) => entry.text?.trim() ?? "");

  if (!title || !shortDescription || !description) {
    return null;
  }

  return {
    title,
    shortDescription,
    description,
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
    const translations = await Promise.all(
      targetLocales.map(async (locale) => {
        if (locale === "en") {
          return [locale, content] as const;
        }

        const translated = await translateWithDeepL(apiUrl, apiKey, content, locale);

        return [locale, translated ?? content] as const;
      }),
    );

    return Object.fromEntries(translations) as PropertyContentTranslations;
  } catch {
    return buildFallbackTranslations(content);
  }
}
