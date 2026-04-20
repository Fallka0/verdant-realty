# Verdant Realty

Verdant Realty is now structured as a listings-first property website for Torrevieja and nearby areas, with a private admin panel for managing inventory from the same Next.js app.

## What this project includes

- Public homepage focused on featured listings
- Public `/properties` directory with filters
- Individual property detail pages with inquiry form
- Private `/admin` area for creating, editing, and deleting listings
- Supabase-backed property and inquiry storage

## Run locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Environment variables

Create `.env.local` with:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-public-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ADMIN_EMAILS=mother@example.com
```

`ADMIN_EMAILS` should contain the email address allowed to access `/admin`. You can add multiple emails separated by commas.

## Supabase setup

Run the migrations in `supabase/migrations/` so the `properties` and `inquiries` tables exist.

Then create the admin user in Supabase Auth:

1. Open Supabase Dashboard.
2. Go to `Authentication > Users`.
3. Create a user for your mother’s email.
4. Make sure that email is included in `ADMIN_EMAILS`.

## Current admin flow

The admin panel lets your mother:

- add a new property
- edit pricing, status, description, and image URLs
- mark listings as featured, draft, available, reserved, or sold
- delete listings

## Next upgrades worth doing

- image uploads directly into Supabase Storage
- multilingual property content
- inquiry inbox and follow-up workflow
- property tags and advanced search filters

