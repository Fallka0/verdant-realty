import OpenAI from "openai";

import { type PropertyContentFields, type PropertyContentTranslations } from "@/lib/property-shared";
import { publicLocales } from "@/lib/public-copy";

const fallbackModel = "gpt-5-mini";

function getTranslationClient() {
  if (!process.env.OPENAI_API_KEY) {
    return null;
  }

  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

function buildFallbackTranslations(content: PropertyContentFields): PropertyContentTranslations {
  return Object.fromEntries(publicLocales.map((locale) => [locale, content])) as PropertyContentTranslations;
}

function parseTranslationResponse(output: string): PropertyContentTranslations | null {
  try {
    const parsed = JSON.parse(output) as Record<string, PropertyContentFields>;
    const translations = Object.fromEntries(
      publicLocales.map((locale) => {
        const entry = parsed[locale];

        if (
          !entry ||
          typeof entry.title !== "string" ||
          typeof entry.shortDescription !== "string" ||
          typeof entry.description !== "string"
        ) {
          return [locale, null];
        }

        return [
          locale,
          {
            title: entry.title.trim(),
            shortDescription: entry.shortDescription.trim(),
            description: entry.description.trim(),
          },
        ];
      }),
    ) as PropertyContentTranslations;

    return publicLocales.every((locale) => translations[locale]) ? translations : null;
  } catch {
    return null;
  }
}

export async function generatePropertyTranslations(
  content: PropertyContentFields,
): Promise<PropertyContentTranslations> {
  const client = getTranslationClient();

  if (!client) {
    return buildFallbackTranslations(content);
  }

  const response = await client.responses.create({
    model: process.env.OPENAI_TRANSLATION_MODEL || fallbackModel,
    input: [
      {
        role: "system",
        content: [
          {
            type: "input_text",
            text:
              "You translate real-estate listings for the Costa Blanca. Detect the source language and return polished listing copy in English, Spanish, Russian, and German. Preserve factual details, place names, measurements, and pricing references. Do not add facts, amenities, or claims that are not present in the source. Return valid JSON only.",
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: JSON.stringify({
              targetLocales: publicLocales,
              fields: content,
              schema: {
                en: {
                  title: "string",
                  shortDescription: "string",
                  description: "string",
                },
                es: {
                  title: "string",
                  shortDescription: "string",
                  description: "string",
                },
                ru: {
                  title: "string",
                  shortDescription: "string",
                  description: "string",
                },
                de: {
                  title: "string",
                  shortDescription: "string",
                  description: "string",
                },
              },
            }),
          },
        ],
      },
    ],
  });

  const parsed = parseTranslationResponse(response.output_text);

  return parsed ?? buildFallbackTranslations(content);
}
