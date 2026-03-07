-- Add icon column to interest table (Lucide icon name)
ALTER TABLE "interest" ADD COLUMN IF NOT EXISTS "icon" text DEFAULT 'Circle' NOT NULL;
