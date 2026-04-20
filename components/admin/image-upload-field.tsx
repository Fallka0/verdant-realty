"use client";

import { ChangeEvent, useRef, useState } from "react";

type ImageUploadFieldProps = {
  defaultValue?: string;
  label: string;
  mode: "gallery" | "single";
  name: string;
  required?: boolean;
  title: string;
};

type UploadState = {
  message: string;
  type: "error" | "idle" | "success";
};

const initialState: UploadState = {
  message: "",
  type: "idle",
};

export function ImageUploadField({
  defaultValue = "",
  label,
  mode,
  name,
  required = false,
  title,
}: ImageUploadFieldProps) {
  const [value, setValue] = useState(defaultValue);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadState, setUploadState] = useState(initialState);
  const inputRef = useRef<HTMLInputElement>(null);

  async function uploadFile(file: File) {
    const payload = new FormData();
    payload.append("file", file);
    payload.append("title", title);

    const response = await fetch("/api/admin/uploads", {
      method: "POST",
      body: payload,
    });

    const data = (await response.json().catch(() => ({}))) as { error?: string; url?: string };

    if (!response.ok || !data.url) {
      throw new Error(data.error ?? "Image upload failed.");
    }

    return data.url;
  }

  async function handleUpload(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);

    if (files.length === 0) {
      return;
    }

    setIsUploading(true);
    setUploadState(initialState);

    try {
      const urls: string[] = [];

      for (const file of files) {
        urls.push(await uploadFile(file));
      }

      if (mode === "single") {
        setValue(urls[0] ?? value);
      } else {
        setValue((currentValue) => [currentValue.trim(), ...urls].filter(Boolean).join("\n"));
      }

      setUploadState({
        message: mode === "single" ? "Image uploaded." : `${urls.length} image${urls.length === 1 ? "" : "s"} uploaded.`,
        type: "success",
      });
    } catch (error) {
      setUploadState({
        message: error instanceof Error ? error.message : "Image upload failed.",
        type: "error",
      });
    } finally {
      setIsUploading(false);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  return (
    <div className="admin-upload-field">
      <label>
        {label}
        {mode === "single" ? (
          <input
            name={name}
            type="url"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="Upload an image or paste an image URL"
            required={required}
          />
        ) : (
          <textarea
            name={name}
            rows={6}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="Upload images or paste one image URL per line."
          />
        )}
      </label>

      <div className="admin-upload-row">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple={mode === "gallery"}
          onChange={handleUpload}
        />
        <span>{isUploading ? "Uploading..." : mode === "single" ? "Upload image" : "Upload gallery images"}</span>
      </div>

      <p className={`form-status ${uploadState.type}`}>{uploadState.message}</p>
    </div>
  );
}
