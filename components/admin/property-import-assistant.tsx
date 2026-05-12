"use client";

import { type FormEvent, useState, useTransition } from "react";

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

function getImportError(payload: ImportResponse | null) {
  if (!payload) {
    return "The property could not be imported.";
  }

  return "error" in payload ? payload.error : "The property could not be imported.";
}

export function PropertyImportAssistant({
  copy,
  hasImportedDraft,
  onImported,
  onReset,
}: PropertyImportAssistantProps) {
  const [url, setUrl] = useState("");
  const [feedback, setFeedback] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback("");

    startTransition(async () => {
      try {
        const response = await fetch("/api/admin/property-import", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url }),
        });

        const payload = (await response.json().catch(() => null)) as ImportResponse | null;

        if (!response.ok || !payload || "error" in payload) {
          throw new Error(getImportError(payload));
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
        <input
          aria-label={copy.cta}
          autoCapitalize="off"
          autoCorrect="off"
          onChange={(event) => setUrl(event.target.value)}
          placeholder={copy.placeholder}
          type="url"
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
