insert into public.properties (
  reference_code,
  title,
  slug,
  location,
  price_eur,
  bedrooms,
  bathrooms,
  interior_sqm,
  plot_sqm,
  property_type,
  status,
  featured,
  short_description,
  description,
  main_image_url,
  gallery_urls
)
values
  (
    'VR-101',
    'Sea-view apartment near La Mata beach',
    'sea-view-apartment-la-mata',
    'La Mata, Torrevieja',
    289000,
    3,
    2,
    96,
    null,
    'apartment',
    'available',
    true,
    'Bright three-bedroom apartment with open terrace, sea views, and easy walking distance to the beach.',
    'This bright apartment combines an airy living area, generous terrace, and a practical three-bedroom layout ideal for buyers looking for a turnkey coastal base in La Mata.',
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    array[
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80'
    ]
  ),
  (
    'VR-102',
    'Detached villa with pool in Los Balcones',
    'detached-villa-los-balcones',
    'Los Balcones, Torrevieja',
    525000,
    4,
    3,
    184,
    420,
    'villa',
    'available',
    true,
    'Detached family villa with private pool, spacious outdoor areas, and a layout that works year-round.',
    'Designed for buyers who want extra space and privacy, this detached villa in Los Balcones offers generous indoor living, a separate dining area, private pool, and room for entertaining outside.',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    array[
      'https://images.unsplash.com/photo-1430285561322-7808604715df?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    ]
  )
on conflict (reference_code) do nothing;
