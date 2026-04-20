import Link from "next/link";
import { redirect } from "next/navigation";

import { SignOutButton } from "@/components/admin/sign-out-button";
import { getAdminAuthState } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authState = await getAdminAuthState();

  if (authState.status === "unauthenticated") {
    redirect("/admin/login");
  }

  if (authState.status === "unauthorized") {
    redirect("/admin/login?reason=unauthorized");
  }

  if (authState.status === "missing-config") {
    return (
      <main className="admin-shell">
        <div className="setup-card">
          <h1>Admin setup incomplete</h1>
          <p>
            Add `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` or
            `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, and `ADMIN_EMAILS` to
            `.env.local`, run the property migrations, and create your mother’s admin user in
            Supabase Auth.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="admin-shell">
      <header className="admin-topbar">
        <div>
          <p className="eyebrow">Verdant Realty Admin</p>
          <h1>Property management</h1>
        </div>

        <div className="admin-topbar-actions">
          <nav className="primary-nav" aria-label="Admin">
            <Link href="/admin">Dashboard</Link>
            <Link href="/admin/properties/new">New Listing</Link>
            <Link href="/properties">View Site</Link>
          </nav>
          <SignOutButton />
        </div>
      </header>

      {children}
    </main>
  );
}
