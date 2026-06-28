ALTER TABLE `registrations` ADD `reference_tag` varchar(40) NOT NULL;--> statement-breakpoint
ALTER TABLE `registrations` ADD `order_id` varchar(64);--> statement-breakpoint
ALTER TABLE `registrations` ADD `success_indicator` varchar(64);--> statement-breakpoint
ALTER TABLE `registrations` ADD `paid_at` timestamp;--> statement-breakpoint
ALTER TABLE `registrations` ADD CONSTRAINT `registrations_reference_tag_unique` UNIQUE(`reference_tag`);