/*
  Warnings:

  - Added the required column `company` to the `AdminUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emailExpiredSent` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `adminuser` ADD COLUMN `company` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `subscription` ADD COLUMN `emailExpiredSent` BOOLEAN NOT NULL;
