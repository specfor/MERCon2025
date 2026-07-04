CREATE TABLE `admin_logins` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(255) NOT NULL,
	`code` varchar(10) NOT NULL,
	`expires_at` timestamp NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `admin_logins_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `admin_logs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`admin_id` int NOT NULL,
	`admin_email` varchar(255) NOT NULL,
	`action` varchar(100) NOT NULL,
	`target_id` varchar(255),
	`details` varchar(1000),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `admin_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `settings` (
	`key` varchar(100) NOT NULL,
	`value` varchar(255) NOT NULL,
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `settings_key` PRIMARY KEY(`key`)
);
--> statement-breakpoint
ALTER TABLE `registrations` ADD `lkr_amount` decimal(10,2);--> statement-breakpoint
ALTER TABLE `registrations` ADD `exchange_rate` decimal(10,4);--> statement-breakpoint
ALTER TABLE `registrations` ADD `refund_status` varchar(50) DEFAULT 'none';--> statement-breakpoint
ALTER TABLE `users` ADD `role` varchar(50) DEFAULT 'user' NOT NULL;