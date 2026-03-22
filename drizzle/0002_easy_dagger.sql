ALTER TABLE "activity_type" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "name" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "email_verified" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "faculty_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "faculty_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'ATTENDEE';--> statement-breakpoint
ALTER TABLE "calendar_item" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "calendar_item" ALTER COLUMN "post_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "faculty" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "interest" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "interest_x_organization" ALTER COLUMN "interest_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "interest_x_organization" ALTER COLUMN "organization_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "interest_x_post" ALTER COLUMN "interest_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "interest_x_post" ALTER COLUMN "post_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "interest_x_user" ALTER COLUMN "interest_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "organization" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "post" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "post" ALTER COLUMN "organization_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "post" ALTER COLUMN "activity_type_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "user_x_organization" ALTER COLUMN "organization_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "interest" ADD COLUMN "icon" text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX "calendar_item_user_post_unique" ON "calendar_item" USING btree ("user_id","post_id");