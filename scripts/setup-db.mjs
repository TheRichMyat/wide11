// Run: node scripts/setup-db.mjs
// Prints the SQL you need to run in Supabase SQL Editor

import { readFileSync } from 'fs';

console.log('');
console.log('=== WIDE-ELEVEN DATABASE SETUP ===');
console.log('');
console.log('Copy ALL the SQL below and paste it into:');
console.log('Supabase Dashboard > SQL Editor > New Query > Run');
console.log('');
console.log('================================================');
console.log('');

console.log(`
-- ══════════════════════════════════════════════
-- WIDE-ELEVEN DATABASE SCHEMA
-- ══════════════════════════════════════════════

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  year TEXT,
  scope TEXT,
  client TEXT,
  location TEXT,
  cost TEXT,
  image TEXT,
  gallery TEXT[] DEFAULT '{}',
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Clients table
CREATE TABLE IF NOT EXISTS clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  logo TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

-- Public read access (anyone can view the website)
CREATE POLICY "Public read categories" ON categories
  FOR SELECT USING (true);

CREATE POLICY "Public read projects" ON projects
  FOR SELECT USING (true);

CREATE POLICY "Public read clients" ON clients
  FOR SELECT USING (true);

-- Authenticated users can insert/update/delete (admin only)
CREATE POLICY "Auth insert categories" ON categories
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth update categories" ON categories
  FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth delete categories" ON categories
  FOR DELETE TO authenticated USING (true);

CREATE POLICY "Auth insert projects" ON projects
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth update projects" ON projects
  FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth delete projects" ON projects
  FOR DELETE TO authenticated USING (true);

CREATE POLICY "Auth insert clients" ON clients
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth update clients" ON clients
  FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth delete clients" ON clients
  FOR DELETE TO authenticated USING (true);

-- Insert default categories
INSERT INTO categories (name) VALUES
  ('Hotel Projects'),
  ('Commercial'),
  ('Residential'),
  ('F&B'),
  ('Retail'),
  ('Other')
ON CONFLICT (name) DO NOTHING;

-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policy: anyone can view images
CREATE POLICY "Public read images" ON storage.objects
  FOR SELECT USING (bucket_id = 'images');

-- Storage policy: authenticated users can upload
CREATE POLICY "Auth upload images" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'images');

-- Storage policy: authenticated users can delete
CREATE POLICY "Auth delete images" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'images');
`);

console.log('');
console.log('================================================');
console.log('After running the SQL above, run: npm run create-admin');
console.log('================================================');
