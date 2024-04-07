/*
  Warnings:

  - The values [NOT_CURRENT] on the enum `Subscription_status` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `email` to the `CustomerUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `customeruser` ADD COLUMN `email` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `subscription` MODIFY `status` ENUM('CURRENT', 'EXPIRED') NOT NULL DEFAULT 'CURRENT';
