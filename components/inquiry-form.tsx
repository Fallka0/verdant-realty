"use client";

import { FormEvent, useState } from "react";

type InquiryFormProps = {
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

export function InquiryForm({ property }: InquiryFormProps) {
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
          message: data.error ?? "Something went wrong. Please try again.",
        });
        setIsSubmitting(false);
        return;
      }

      form.reset();
      setSubmission({
        type: "success",
        message: data.message ?? "Inquiry sent successfully.",
      });
    } catch {
      setSubmission({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="inquiry-form" onSubmit={handleSubmit}>
      {property ? (
        <div className="inquiry-context">
          <p className="eyebrow">Property Inquiry</p>
          <h3>{property.title}</h3>
          <p>{property.location}</p>
        </div>
      ) : null}
      <div className="form-grid">
        <label>
          Full Name
          <input name="name" type="text" placeholder="Your name" required />
        </label>
        <label>
          Email Address
          <input name="email" type="email" placeholder="you@example.com" required />
        </label>
        <label>
          Phone Number
          <input name="phone" type="tel" placeholder="Optional" />
        </label>
        <label className="full-width">
          Message
          <textarea
            name="message"
            placeholder={
              property
                ? `I’m interested in ${property.title}. Please share more details or arrange a viewing.`
                : "Tell us what kind of property you are looking for."
            }
            rows={5}
            required
          />
        </label>
      </div>
      <button className="button button-primary submit-button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send Inquiry"}
      </button>
      <p className={`form-status ${submission.type}`} aria-live="polite">
        {submission.message}
      </p>
    </form>
  );
}
