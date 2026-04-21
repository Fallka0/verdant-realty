create extension if not exists pgcrypto with schema extensions;

alter table public.properties
  add column if not exists content_translation_source_hash text;

update public.properties
set content_translation_source_hash = encode(
  extensions.digest(
    jsonb_build_object(
      'title', coalesce(title, ''),
      'shortDescription', coalesce(short_description, ''),
      'description', coalesce(description, '')
    )::text,
    'sha256'
  ),
  'hex'
)
where content_translation_source_hash is null;
