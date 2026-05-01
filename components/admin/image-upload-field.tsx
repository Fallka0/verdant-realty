"use client";

import { ChangeEvent, useRef, useState } from "react";

type ImageUploadFieldProps = {
  accept?: string;
  defaultValue?: string;
  label: string;
  mode: "gallery" | "single";
  name: string;
  placeholder: string;
  required?: boolean;
  title: string;
  uploadCopy: {
    imageUploaded: string;
    uploadFailed: string;
    uploadGallery: string;
    uploadImage: string;
    uploading: string;
    uploadedCount: string;
  };
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
  accept = "image/*",
  defaultValue = "",
  label,
  mode,
  name,
  placeholder,
  required = false,
  title,
  uploadCopy,
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
      throw new Error(data.error ?? uploadCopy.uploadFailed);
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
        message:
          mode === "single"
            ? uploadCopy.imageUploaded
            : uploadCopy.uploadedCount.replace("{count}", String(urls.length)),
        type: "success",
      });
    } catch (error) {
      setUploadState({
        message: error instanceof Error ? error.message : uploadCopy.uploadFailed,
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
        <input name={name} type="hidden" value={value} />
        {mode === "single" ? (
          <input
            type="url"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder={placeholder}
            required={required}
          />
        ) : (
          <textarea
            rows={6}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder={placeholder}
          />
        )}
      </label>

      <div className="admin-upload-row">
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={mode === "gallery"}
          onChange={handleUpload}
        />
        <span>{isUploading ? uploadCopy.uploading : mode === "single" ? uploadCopy.uploadImage : uploadCopy.uploadGallery}</span>
      </div>

      <p className={`form-status ${uploadState.type}`}>{uploadState.message}</p>
    </div>
  );
}
