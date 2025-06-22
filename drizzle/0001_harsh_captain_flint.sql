ALTER TABLE "userDetails" DROP CONSTRAINT "userDetails_experience_experience_id_fk";
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "phoneNumber" integer;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "country" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "location" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "dob" timestamp;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "gender" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "linkedin" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "portfolio" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "currentPosition" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "description" text;