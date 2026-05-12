"use client";

import { type FormEvent, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { type ImportedPropertyPayload } from "@/lib/property-import";

type PropertyImportAssistantProps = {
  copy: {
    body: string;
    cta: string;
    placeholder: string;
    reset: string;
    title: string;
  };
  hasImportedDraft: boolean;
  onImported: (payload: ImportedPropertyPayload) => void;
  onReset: () => void;
};

type ImportResponse = ImportedPropertyPayload | { error: string };
type BulkImportResponse = {
  created: Array<{
    id: string;
    slug: string;
    title: string;
    url: string;
  }>;
  errors: Array<{
    error: string;
    url: string;
  }>;
};

function getImportError(payload: ImportResponse | BulkImportResponse | null) {
  if (!payload) {
    return "The property could not be imported.";
  }

  return "error" in payload ? payload.error : "The property could not be imported.";
}

function extractUrls(value: string) {
  return value
    .split(/[\s,]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function PropertyImportAssistant({
  copy,
  hasImportedDraft,
  onImported,
  onReset,
}: PropertyImportAssistantProps) {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [feedback, setFeedback] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback("");

    startTransition(async () => {
      try {
        const urls = extractUrls(url);
        const shouldCreateDrafts = urls.length > 1;
        const response = await fetch("/api/admin/property-import", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(shouldCreateDrafts ? { createDrafts: true, urls } : { url }),
        });

        const payload = (await response.json().catch(() => null)) as ImportResponse | BulkImportResponse | null;

        if (!response.ok || !payload || "error" in payload) {
          throw new Error(getImportError(payload));
        }

        if ("created" in payload) {
          setFeedback(
            `${payload.created.length} draft listing${payload.created.length === 1 ? "" : "s"} created.${
              payload.errors.length > 0 ? ` ${payload.errors.length} link${payload.errors.length === 1 ? "" : "s"} failed.` : ""
            }`,
          );
          setUrl("");
          router.refresh();
          return;
        }

        onImported(payload);
        setFeedback(`Imported from ${payload.provider} and loaded into the draft form.`);
      } catch (error) {
        setFeedback(error instanceof Error ? error.message : "The property could not be imported.");
      }
    });
  }

  return (
    <section className="property-import-card">
      <div className="section-heading compact">
        <p className="eyebrow">{copy.title}</p>
        <h3>{copy.cta}</h3>
        <p>{copy.body}</p>
      </div>

      <form className="property-import-form" onSubmit={handleSubmit}>
        <textarea
          aria-label={copy.cta}
          autoCapitalize="off"
          autoCorrect="off"
          onChange={(event) => setUrl(event.target.value)}
          placeholder={copy.placeholder}
          rows={4}
          value={url}
        />
        <div className="property-import-actions">
          <button className="button button-secondary" disabled={isPending || !url.trim()} type="submit">
            {isPending ? "Importing..." : copy.cta}
          </button>
          {hasImportedDraft ? (
            <button
              className="button button-ghost"
              onClick={onReset}
              type="button"
            >
              {copy.reset}
            </button>
          ) : null}
        </div>
      </form>

      {feedback ? <p className="property-import-feedback">{feedback}</p> : null}
    </section>
  );
}
