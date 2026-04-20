"use client";

import { FormEvent, useState } from "react";

import { type PublicCopy, type PublicLocale } from "@/lib/public-copy";

type InquiryFormProps = {
  copy: PublicCopy;
  locale: PublicLocale;
  property?: {
    id: string;
    location: string;
    title: string;
  };
};

type SubmissionState = {
  message: string;
  type: "error" | "idle" | "success";
};

const initialState: SubmissionState = {
  message: "",
  type: "idle",
};

export function InquiryForm({ copy, locale, property }: InquiryFormProps) {
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
          name: formData.get("name"),
          email: formData.get("email"),
          locale,
          phone: formData.get("phone"),
          message: formData.get("message"),
          propertyId: property?.id,
          propertyTitle: property?.title,
        }),
      });

      const data = (await response.json().catch(() => ({}))) as { error?: string; message?: string };

      if (!response.ok) {
        setSubmission({
          type: "error",
          message: data.error ?? copy.inquiry.error,
        });
        setIsSubmitting(false);
        return;
      }

      form.reset();
      setSubmission({
        type: "success",
        message: data.message ?? copy.inquiry.success,
      });
    } catch {
      setSubmission({
        type: "error",
        message: copy.inquiry.error,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="inquiry-form" onSubmit={handleSubmit}>
      {property ? (
        <div className="inquiry-context">
          <p className="eyebrow">{copy.inquiry.propertyInquiry}</p>
          <h3>{property.title}</h3>
          <p>{property.location}</p>
        </div>
      ) : null}
      <div className="form-grid">
        <label>
          {copy.inquiry.fullName}
          <input name="name" type="text" placeholder={copy.inquiry.yourName} required />
        </label>
        <label>
          {copy.inquiry.email}
          <input name="email" type="email" placeholder={copy.inquiry.emailPlaceholder} required />
        </label>
        <label>
          {copy.inquiry.phone}
          <input name="phone" type="tel" placeholder={copy.inquiry.optional} />
        </label>
        <label className="full-width">
          {copy.inquiry.message}
          <textarea
            name="message"
            placeholder={
              property
                ? `${copy.inquiry.messagePlaceholder} ${property.title}.`
                : copy.inquiry.messagePlaceholder
            }
            rows={5}
            required
          />
        </label>
      </div>
      <button className="button button-primary submit-button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? copy.buttons.sending : copy.buttons.sendInquiry}
      </button>
      <p className={`form-status ${submission.type}`} aria-live="polite">
        {submission.message}
      </p>
    </form>
  );
}
