CREATE TABLE `payment_attempts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`registration_id` int NOT NULL,
	`session_id` varchar(255),
	`invoice_id` varchar(255),
	`order_id` varchar(255),
	`success_indicator` varchar(255),
	`status` varchar(50) NOT NULL DEFAULT 'pending',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `payment_attempts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `registrations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`registration_category` varchar(50) NOT NULL,
	`author_type` varchar(50) NOT NULL,
	`is_ieee_member` boolean NOT NULL DEFAULT false,
	`is_student` boolean NOT NULL DEFAULT false,
	`ieee_member_number` varchar(100),
	`paper_ids` varchar(255),
	`extra_banquet_tickets` int NOT NULL DEFAULT 0,
	`amount` decimal(10,2) NOT NULL,
	`currency` varchar(10) NOT NULL,
	`ieee_proof_path` varchar(500),
	`student_proof_path` varchar(500),
	`payment_status` varchar(50) NOT NULL DEFAULT 'pending',
	`reference_tag` varchar(255),
	`paid_at` timestamp,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `registrations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(255) NOT NULL,
	`password_hash` varchar(255) NOT NULL,
	`title` varchar(50) NOT NULL,
	`first_name` varchar(255) NOT NULL,
	`last_name` varchar(255) NOT NULL,
	`phone` varchar(50) NOT NULL,
	`affiliation` varchar(255) NOT NULL,
	`country` varchar(100) NOT NULL,
	`is_local` boolean NOT NULL DEFAULT false,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
