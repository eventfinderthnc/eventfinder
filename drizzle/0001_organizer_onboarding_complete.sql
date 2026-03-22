ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "organizer_onboarding_complete" boolean DEFAULT false NOT NULL;--> statement-breakpoint
UPDATE "user" u
SET "organizer_onboarding_complete" = true
WHERE u."role" = 'ORGANIZATION'
  AND trim(u."name") <> ''
  AND EXISTS (
    SELECT 1 FROM "interest_x_user" iu WHERE iu."user_id" = u."id"
  );
