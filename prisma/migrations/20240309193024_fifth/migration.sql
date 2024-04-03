/*
  Warnings:

  - You are about to drop the column `suscriptionId` on the `customeruser` table. All the data in the column will be lost.
  - You are about to drop the `suscription` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[subscriptionId]` on the table `CustomerUser` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `subscriptionId` to the `CustomerUser` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `customeruser` DROP FOREIGN KEY `CustomerUser_suscriptionId_fkey`;

-- AlterTable
ALTER TABLE `customeruser` DROP COLUMN `suscriptionId`,
    ADD COLUMN `subscriptionId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `suscription`;

-- CreateTable
CREATE TABLE `Subscription` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `startDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `endDate` DATETIME(3) NOT NULL,
    `monthsPaid` INTEGER NOT NULL DEFAULT 1,
    `status` ENUM('CURRENT', 'NOT_CURRENT') NOT NULL DEFAULT 'CURRENT',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `CustomerUser_subscriptionId_key` ON `CustomerUser`(`subscriptionId`);

-- AddForeignKey
ALTER TABLE `CustomerUser` ADD CONSTRAINT `CustomerUser_subscriptionId_fkey` FOREIGN KEY (`subscriptionId`) REFERENCES `Subscription`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
