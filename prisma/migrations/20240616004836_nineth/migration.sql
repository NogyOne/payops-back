/*
  Warnings:

  - You are about to drop the column `emailExpiredSent` on the `subscription` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `customeruser` DROP FOREIGN KEY `CustomerUser_subscriptionId_fkey`;

-- AlterTable
ALTER TABLE `subscription` DROP COLUMN `emailExpiredSent`;

-- AddForeignKey
ALTER TABLE `CustomerUser` ADD CONSTRAINT `CustomerUser_subscriptionId_fkey` FOREIGN KEY (`subscriptionId`) REFERENCES `Subscription`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
