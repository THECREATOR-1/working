/*
# Create inquiries table (single-tenant, no auth)

1. New Tables
- `inquiries`
- `id` (uuid, primary key)
- `name` (text, not null) — the visitor's name
- `email` (text, not null) — the visitor's email
- `project_type` (text) — optional project category
- `message` (text, not null) — the inquiry body
- `created_at` (timestamptz, default now())
2. Security
- Enable RLS on `inquiries`.
- Allow anon + authenticated INSERT only (public contact form submissions).
- No SELECT/UPDATE/DELETE for anon — only the owner (via service role) can read inquiries later.
*/

CREATE TABLE IF NOT EXISTS inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  project_type text,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_inquiries" ON inquiries;
CREATE POLICY "anon_insert_inquiries" ON inquiries FOR INSERT
TO anon, authenticated WITH CHECK (true);
