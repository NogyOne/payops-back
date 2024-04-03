/*
  Warnings:

  - You are about to drop the column `customerUserId` on the `suscription` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[suscriptionId]` on the table `CustomerUser` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `suscriptionId` to the `CustomerUser` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `suscription` DROP FOREIGN KEY `Suscription_customerUserId_fkey`;

-- AlterTable
ALTER TABLE `customeruser` ADD COLUMN `suscriptionId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `suscription` DROP COLUMN `customerUserId`;

-- CreateIndex
CREATE UNIQUE INDEX `CustomerUser_suscriptionId_key` ON `CustomerUser`(`suscriptionId`);

-- AddForeignKey
ALTER TABLE `CustomerUser` ADD CONSTRAINT `CustomerUser_suscriptionId_fkey` FOREIGN KEY (`suscriptionId`) REFERENCES `Suscription`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
