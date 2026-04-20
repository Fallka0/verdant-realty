alter table public.properties
  add column if not exists content_translations jsonb not null default '{}'::jsonb;

update public.properties
set content_translations = jsonb_build_object(
  'en',
  jsonb_build_object(
    'title', title,
    'shortDescription', short_description,
    'description', description
  )
)
where content_translations = '{}'::jsonb;
