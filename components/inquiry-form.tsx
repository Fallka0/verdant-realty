"use client";

import { FormEvent, useState } from "react";

import { type InquiryFormCopy, type Locale } from "@/lib/site-copy";

type SubmissionState = {
  message: string;
  type: "error" | "idle" | "success";
};

const initialState: SubmissionState = {
  message: "",
  type: "idle",
};

type InquiryFormProps = {
  copy: InquiryFormCopy;
  locale: Locale;
};

export function InquiryForm({ copy, locale }: InquiryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submission, setSubmission] = useState(initialState);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmission(initialState);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          locale,
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          timeline: formData.get("timeline"),
          message: formData.get("message"),
        }),
      });

      const data = (await response.json().catch(() => ({}))) as { error?: string; message?: string };

      if (!response.ok) {
        setSubmission({
          type: "error",
          message: data.error ?? copy.errorFallback,
        });
        setIsSubmitting(false);
        return;
      }

      form.reset();
      setSubmission({
        type: "success",
        message: data.message ?? copy.successFallback,
      });
    } catch {
      setSubmission({
        type: "error",
        message: copy.errorFallback,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="inquiry-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          {copy.fullNameLabel}
          <input name="name" type="text" placeholder={copy.namePlaceholder} required />
        </label>
        <label>
          {copy.emailLabel}
          <input name="email" type="email" placeholder={copy.emailPlaceholder} required />
        </label>
        <label>
          {copy.phoneLabel}
          <input name="phone" type="tel" placeholder={copy.optionalPhonePlaceholder} />
        </label>
        <label>
          {copy.timelineLabel}
          <select name="timeline" defaultValue="">
            <option value="" disabled>
              {copy.timelinePlaceholder}
            </option>
            {copy.timelineOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label className="full-width">
          {copy.messageLabel}
          <textarea
            name="message"
            placeholder={copy.messagePlaceholder}
            rows={5}
            required
          />
        </label>
      </div>
      <button className="button button-primary submit-button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? copy.sendingButton : copy.sendButton}
      </button>
      <p className={`form-status ${submission.type}`} aria-live="polite">
        {submission.message}
      </p>
    </form>
  );
}
