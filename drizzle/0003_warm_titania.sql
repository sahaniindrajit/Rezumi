ALTER TABLE "achivement" RENAME TO "achievement";--> statement-breakpoint
ALTER TABLE "achievement" RENAME COLUMN "text" TO "id";--> statement-breakpoint
ALTER TABLE "additional" RENAME COLUMN "text" TO "id";--> statement-breakpoint
ALTER TABLE "userDetails" RENAME COLUMN "achivement" TO "achievement";--> statement-breakpoint
ALTER TABLE "userDetails" ADD COLUMN "userID" text;--> statement-breakpoint
ALTER TABLE "userDetails" ADD CONSTRAINT "userDetails_userID_user_id_fk" FOREIGN KEY ("userID") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;