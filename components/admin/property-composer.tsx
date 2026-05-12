"use client";

import { useState } from "react";

import { PropertyForm } from "@/components/admin/property-form";
import { PropertyImportAssistant } from "@/components/admin/property-import-assistant";
import { type AdminCopy } from "@/lib/admin-copy";
import { type ImportedPropertyPayload } from "@/lib/property-import";
import { type PropertyRecord } from "@/lib/property-shared";

type PropertyComposerProps = {
  action: (formData: FormData) => void | Promise<void>;
  copy: AdminCopy["form"];
  localeLabels: {
    statuses: Record<string, string>;
    types: Record<string, string>;
  };
  referenceSeed: string;
  submitLabel: string;
  uploadCopy: AdminCopy["upload"];
};

export function PropertyComposer({
  action,
  copy,
  localeLabels,
  referenceSeed,
  submitLabel,
  uploadCopy,
}: PropertyComposerProps) {
  const [importedProperty, setImportedProperty] = useState<PropertyRecord | undefined>();
  const [formKey, setFormKey] = useState(0);

  function handleImported(payload: ImportedPropertyPayload) {
    setImportedProperty({
      ...payload.property,
      internalNotes: payload.notes.join("\n"),
    });
    setFormKey((current) => current + 1);
  }

  function handleReset() {
    setImportedProperty(undefined);
    setFormKey((current) => current + 1);
  }

  return (
    <>
      <PropertyImportAssistant
        copy={copy.importer}
        hasImportedDraft={Boolean(importedProperty)}
        onImported={handleImported}
        onReset={handleReset}
      />

      <PropertyForm
        action={action}
        copy={copy}
        key={formKey}
        localeLabels={localeLabels}
        property={importedProperty}
        referenceSeed={referenceSeed}
        submitLabel={submitLabel}
        uploadCopy={uploadCopy}
      />
    </>
  );
}
