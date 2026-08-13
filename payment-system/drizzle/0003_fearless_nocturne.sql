CREATE TABLE `pending_registrations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(255) NOT NULL,
	`password_hash` varchar(255) NOT NULL,
	`verification_code` varchar(10) NOT NULL,
	`expires_at` timestamp NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `pending_registrations_id` PRIMARY KEY(`id`),
	CONSTRAINT `pending_registrations_email_unique` UNIQUE(`email`)
);
