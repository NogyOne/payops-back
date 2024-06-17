-- DropForeignKey
ALTER TABLE `customeruser` DROP FOREIGN KEY `CustomerUser_subscriptionId_fkey`;

-- AddForeignKey
ALTER TABLE `customeruser` ADD CONSTRAINT `CustomerUser_subscriptionId_fkey` FOREIGN KEY (`subscriptionId`) REFERENCES `subscription`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
