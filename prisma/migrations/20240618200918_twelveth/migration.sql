-- DropForeignKey
ALTER TABLE `customeruser` DROP FOREIGN KEY `CustomerUser_subscriptionId_fkey`;

-- AddForeignKey
ALTER TABLE `CustomerUser` ADD CONSTRAINT `CustomerUser_subscriptionId_fkey` FOREIGN KEY (`subscriptionId`) REFERENCES `Subscription`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
