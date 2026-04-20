# Verdant Realty

A polished one-page real estate homepage built with Next.js App Router and a Supabase-ready inquiry flow.

## Run locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Supabase setup

1. Copy `.env.example` to `.env.local`.
2. Add your Supabase project URL, anon key, and service role key.
3. Create the `inquiries` table with the migration in [`supabase/migrations/20260420000000_create_inquiries_table.sql`](./supabase/migrations/20260420000000_create_inquiries_table.sql).

The homepage contact form posts to `/api/inquiries`, and that route inserts each lead into Supabase.

## Project structure

- `app/page.tsx`: homepage content
- `app/api/inquiries/route.ts`: inquiry API endpoint
- `components/inquiry-form.tsx`: client-side lead capture form
- `lib/supabase`: Supabase helpers

