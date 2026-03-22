CREATE TYPE "public"."role" AS ENUM('ATTENDEE', 'ORGANIZATION', 'ADMIN');--> statement-breakpoint
CREATE TYPE "public"."category" AS ENUM('CLUB', 'EVENT');--> statement-breakpoint
CREATE TABLE "activity_type" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text DEFAULT '' NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean DEFAULT false,
	"image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"faculty_id" text,
	"is_receive_mail" boolean DEFAULT false NOT NULL,
	"role" "role" DEFAULT 'ATTENDEE' NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "calendar_item" (
	"id" text PRIMARY KEY NOT NULL,
	"post_id" text NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "faculty" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "interest" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"icon" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "interest_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "interest_x_organization" (
	"interest_id" text NOT NULL,
	"organization_id" text NOT NULL,
	CONSTRAINT "interest_x_organization_interest_id_organization_id_pk" PRIMARY KEY("interest_id","organization_id")
);
--> statement-breakpoint
CREATE TABLE "interest_x_post" (
	"interest_id" text NOT NULL,
	"post_id" text NOT NULL,
	CONSTRAINT "interest_x_post_interest_id_post_id_pk" PRIMARY KEY("interest_id","post_id")
);
--> statement-breakpoint
CREATE TABLE "interest_x_user" (
	"interest_id" text NOT NULL,
	"user_id" text NOT NULL,
	CONSTRAINT "interest_x_user_interest_id_user_id_pk" PRIMARY KEY("interest_id","user_id")
);
--> statement-breakpoint
CREATE TABLE "organization" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"faculty_id" text,
	"category" "category" NOT NULL,
	"average_hours_per_week" smallint,
	"bio" text,
	"recruitment_period" jsonb,
	"user_id" text NOT NULL,
	"is_banned" boolean DEFAULT false NOT NULL,
	"socials" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "post" (
	"id" text PRIMARY KEY NOT NULL,
	"organization_id" text NOT NULL,
	"activity_type_id" text NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"insta_link" text,
	"image" text NOT NULL,
	"date" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_x_organization" (
	"user_id" text NOT NULL,
	"organization_id" text NOT NULL,
	CONSTRAINT "user_x_organization_user_id_organization_id_pk" PRIMARY KEY("user_id","organization_id")
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_faculty_id_faculty_id_fk" FOREIGN KEY ("faculty_id") REFERENCES "public"."faculty"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "calendar_item" ADD CONSTRAINT "calendar_item_post_id_post_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."post"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "calendar_item" ADD CONSTRAINT "calendar_item_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "interest_x_organization" ADD CONSTRAINT "interest_x_organization_interest_id_interest_id_fk" FOREIGN KEY ("interest_id") REFERENCES "public"."interest"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "interest_x_organization" ADD CONSTRAINT "interest_x_organization_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "interest_x_post" ADD CONSTRAINT "interest_x_post_interest_id_interest_id_fk" FOREIGN KEY ("interest_id") REFERENCES "public"."interest"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "interest_x_post" ADD CONSTRAINT "interest_x_post_post_id_post_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."post"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "interest_x_user" ADD CONSTRAINT "interest_x_user_interest_id_interest_id_fk" FOREIGN KEY ("interest_id") REFERENCES "public"."interest"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "interest_x_user" ADD CONSTRAINT "interest_x_user_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organization" ADD CONSTRAINT "organization_faculty_id_faculty_id_fk" FOREIGN KEY ("faculty_id") REFERENCES "public"."faculty"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organization" ADD CONSTRAINT "organization_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post" ADD CONSTRAINT "post_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post" ADD CONSTRAINT "post_activity_type_id_activity_type_id_fk" FOREIGN KEY ("activity_type_id") REFERENCES "public"."activity_type"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_x_organization" ADD CONSTRAINT "user_x_organization_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_x_organization" ADD CONSTRAINT "user_x_organization_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE no action ON UPDATE no action;