import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import { AdminLoginForm } from "@/components/admin/login-form";
import { BrandLogo } from "@/components/brand-logo";
import { LanguageSwitcher } from "@/components/language-switcher";
import { adminCopy, adminLocales, resolveAdminLocale } from "@/lib/admin-copy";
import { getAdminAuthState } from "@/lib/auth";

export const dynamic = "force-dynamic";

type AdminLoginPageProps = {
  searchParams: Promise<{
    reason?: string;
  }>;
};

export default async function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  const [authState, params, cookieStore] = await Promise.all([getAdminAuthState(), searchParams, cookies()]);
  const locale = resolveAdminLocale(cookieStore.get("verdant-locale")?.value);
  const copy = adminCopy[locale];

  if (authState.status === "authorized") {
    redirect("/admin");
  }

  return (
    <main className="admin-login-shell" lang={locale}>
      <div className="admin-login-card">
        <div className="admin-login-topline">
          <Link className="brand-link" href="/">
            <BrandLogo />
          </Link>
          <LanguageSwitcher currentLocale={locale} label={copy.languageLabel} locales={adminLocales} />
        </div>

        <div className="section-heading compact">
          <p className="eyebrow">{copy.login.privateAdmin}</p>
          <h1>{copy.login.title}</h1>
          <p>{copy.login.body}</p>
        </div>

        {authState.status === "missing-config" ? (
          <div className="setup-card">
            <h2>{copy.login.setupTitle}</h2>
            <p>{copy.login.setupBody}</p>
          </div>
        ) : (
          <>
            {params.reason === "unauthorized" ? (
              <p className="form-status error">{copy.login.unauthorized}</p>
            ) : null}
            <AdminLoginForm copy={copy.login} />
          </>
        )}
      </div>
    </main>
  );
}
