"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { type AdminCopy } from "@/lib/admin-copy";
import { createSupabaseBrowserClient, hasSupabaseBrowserEnv } from "@/lib/supabase/client";

type AdminLoginFormProps = {
  copy: AdminCopy["login"];
};

export function AdminLoginForm({ copy }: AdminLoginFormProps) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(formData: FormData) {
    if (!hasSupabaseBrowserEnv()) {
      setError(copy.envError);
      return;
    }

    const supabase = createSupabaseBrowserClient();

    if (!supabase) {
      setError(copy.envError);
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
      setError(signInError.message || copy.loginErrorFallback);
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
        {copy.email}
        <input name="email" type="email" placeholder={copy.emailPlaceholder} required />
      </label>
      <label>
        {copy.password}
        <input name="password" type="password" placeholder="********" required />
      </label>
      <button className="button button-primary full-width-button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? copy.signingIn : copy.submit}
      </button>
      <p className="form-status error">{error}</p>
    </form>
  );
}
