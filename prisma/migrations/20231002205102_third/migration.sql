-- AlterTable
ALTER TABLE `suscription` ADD COLUMN `status` ENUM('CURRENT', 'NOT_CURRENT') NOT NULL DEFAULT 'CURRENT';
