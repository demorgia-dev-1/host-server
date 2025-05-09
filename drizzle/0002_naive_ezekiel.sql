CREATE TABLE `comments` (
	`batchId` text NOT NULL,
	`candidateId` text NOT NULL,
	`comment` text NOT NULL,
	`testType` text NOT NULL,
	PRIMARY KEY(`batchId`, `candidateId`),
	FOREIGN KEY (`batchId`) REFERENCES `batches`(`_id`) ON UPDATE cascade ON DELETE cascade,
	FOREIGN KEY (`candidateId`) REFERENCES `candidates`(`_id`) ON UPDATE cascade ON DELETE cascade
);
