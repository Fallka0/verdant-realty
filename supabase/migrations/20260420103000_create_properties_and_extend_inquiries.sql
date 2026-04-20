create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  reference_code text not null unique,
  title text not null,
  slug text not null unique,
  location text not null,
  price_eur numeric not null default 0,
  bedrooms integer not null default 0,
  bathrooms integer not null default 0,
  interior_sqm integer,
  plot_sqm integer,
  property_type text not null default 'apartment' check (
    property_type in ('apartment', 'villa', 'townhouse', 'penthouse', 'bungalow', 'finca')
  ),
  status text not null default 'draft' check (
    status in ('draft', 'available', 'reserved', 'sold')
  ),
  featured boolean not null default false,
  short_description text not null,
  description text not null,
  main_image_url text not null,
  gallery_urls text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.properties enable row level security;

alter table public.inquiries
  add column if not exists property_id uuid references public.properties(id) on delete set null,
  add column if not exists property_title text;

alter table public.inquiries enable row level security;

create index if not exists properties_status_idx on public.properties (status);
create index if not exists properties_featured_idx on public.properties (featured);
create index if not exists properties_updated_at_idx on public.properties (updated_at desc);

