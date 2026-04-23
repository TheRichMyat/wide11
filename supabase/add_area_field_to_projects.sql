-- Add optional `area` field to projects table.
-- Nullable free-form text (e.g. "1,200 sq.m."). Existing rows stay NULL.

ALTER TABLE projects
  ADD COLUMN IF NOT EXISTS area text;
