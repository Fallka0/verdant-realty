alter table public.properties
  add column if not exists listing_mode text not null default 'sale' check (listing_mode in ('sale', 'rent', 'both')),
  add column if not exists rent_price_eur numeric,
  add column if not exists rent_price_period text check (rent_price_period in ('night', 'week', 'month')),
  add column if not exists rental_periods text[] not null default '{}',
  add column if not exists availability_start date,
  add column if not exists availability_end date,
  add column if not exists features text[] not null default '{}',
  add column if not exists internal_notes text not null default '';

create index if not exists properties_listing_mode_idx on public.properties (listing_mode);
create index if not exists properties_availability_start_idx on public.properties (availability_start);
create index if not exists properties_availability_end_idx on public.properties (availability_end);
