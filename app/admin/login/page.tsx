import Link from "next/link";
import { redirect } from "next/navigation";

import { AdminLoginForm } from "@/components/admin/login-form";
import { getAdminAuthState } from "@/lib/auth";

export const dynamic = "force-dynamic";

type AdminLoginPageProps = {
  searchParams: Promise<{
    reason?: string;
  }>;
};

export default async function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  const [authState, params] = await Promise.all([getAdminAuthState(), searchParams]);

  if (authState.status === "authorized") {
    redirect("/admin");
  }

  return (
    <main className="admin-login-shell">
      <div className="admin-login-card">
        <Link className="brand-link" href="/">
          <span className="brand-mark" />
          <span>
            <strong>Verdant Realty</strong>
            <small>Admin access</small>
          </span>
        </Link>

        <div className="section-heading compact">
          <p className="eyebrow">Private Admin</p>
          <h1>Sign in to manage property listings.</h1>
          <p>
            Your mother can add new homes, update prices, mark properties reserved, and keep the
            site inventory current from one place.
          </p>
        </div>

        {authState.status === "missing-config" ? (
          <div className="setup-card">
            <h2>Admin setup still needed</h2>
            <p>
              Add `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` or
              `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, and `ADMIN_EMAILS` to
              `.env.local`, then create the admin user in Supabase Auth.
            </p>
          </div>
        ) : (
          <>
            {params.reason === "unauthorized" ? (
              <p className="form-status error">
                This account signed in successfully, but it is not listed in `ADMIN_EMAILS`.
              </p>
            ) : null}
            <AdminLoginForm />
          </>
        )}
      </div>
    </main>
  );
}
