"use client";

import { FormEvent, useState } from "react";

type SubmissionState = {
  message: string;
  type: "error" | "idle" | "success";
};

const initialState: SubmissionState = {
  message: "",
  type: "idle",
};

export function InquiryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submission, setSubmission] = useState(initialState);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmission(initialState);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const response = await fetch("/api/inquiries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        timeline: formData.get("timeline"),
        message: formData.get("message"),
      }),
    });

    const data = (await response.json()) as { error?: string; message?: string };

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
      message: data.message ?? "Inquiry submitted successfully.",
    });
    setIsSubmitting(false);
  }

  return (
    <form className="inquiry-form" onSubmit={handleSubmit}>
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
        <label>
          Timeline
          <select name="timeline" defaultValue="">
            <option value="" disabled>
              Select a timeframe
            </option>
            <option value="Immediately">Immediately</option>
            <option value="1-3 months">1-3 months</option>
            <option value="3-6 months">3-6 months</option>
            <option value="6+ months">6+ months</option>
          </select>
        </label>
        <label className="full-width">
          How can Verdant Realty help?
          <textarea
            name="message"
            placeholder="Tell us a little about your move, your goals, or the property you have in mind."
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

