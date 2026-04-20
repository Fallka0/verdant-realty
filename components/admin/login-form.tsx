"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { createSupabaseBrowserClient, hasSupabaseBrowserEnv } from "@/lib/supabase/client";

export function AdminLoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(formData: FormData) {
    if (!hasSupabaseBrowserEnv()) {
      setError("Supabase environment variables are missing.");
      return;
    }

    const supabase = createSupabaseBrowserClient();

    if (!supabase) {
      setError("Supabase browser client could not be created.");
      return;
    }

    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "").trim();

    setError("");
    setIsSubmitting(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setIsSubmitting(false);
      return;
    }

    router.replace("/admin");
    router.refresh();
  }

  return (
    <form
      className="admin-form"
      action={async (formData) => {
        await handleSubmit(formData);
      }}
    >
      <label>
        Email
        <input name="email" type="email" placeholder="admin@example.com" required />
      </label>
      <label>
        Password
        <input name="password" type="password" placeholder="••••••••" required />
      </label>
      <button className="button button-primary full-width-button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Signing in..." : "Sign in to admin"}
      </button>
      <p className="form-status error">{error}</p>
    </form>
  );
}

