"use client";

import { useRouter } from "next/navigation";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function SignOutButton() {
  const router = useRouter();

  return (
    <button
      className="button button-ghost"
      type="button"
      onClick={async () => {
        const supabase = createSupabaseBrowserClient();

        if (supabase) {
          await supabase.auth.signOut();
        }

        router.push("/admin/login");
        router.refresh();
      }}
    >
      Sign out
    </button>
  );
}

