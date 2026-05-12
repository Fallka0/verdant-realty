import { NextResponse } from "next/server";

import { getAdminAuthState } from "@/lib/auth";
import { importPropertyFromUrl } from "@/lib/property-import";

export async function POST(request: Request) {
  const authState = await getAdminAuthState();

  if (authState.status === "unauthenticated") {
    return NextResponse.json({ error: "You must be signed in to import a property." }, { status: 401 });
  }

  if (authState.status === "unauthorized") {
    return NextResponse.json({ error: "This account is not allowed to import properties." }, { status: 403 });
  }

  if (authState.status === "missing-config") {
    return NextResponse.json({ error: "Admin setup is incomplete." }, { status: 500 });
  }

  const body = (await request.json().catch(() => null)) as
    | {
        url?: string;
      }
    | null;

  const url = String(body?.url ?? "").trim();

  if (!url) {
    return NextResponse.json({ error: "Paste a public property link first." }, { status: 400 });
  }

  try {
    const imported = await importPropertyFromUrl(url);

    return NextResponse.json(imported);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "The property could not be imported from that link.",
      },
      { status: 400 },
    );
  }
}
