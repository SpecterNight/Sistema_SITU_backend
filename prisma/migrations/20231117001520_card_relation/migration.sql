/*
  Warnings:

  - A unique constraint covering the columns `[personID]` on the table `Card` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `personID` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Card` ADD COLUMN `personID` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Card_personID_key` ON `Card`(`personID`);

-- AddForeignKey
ALTER TABLE `Card` ADD CONSTRAINT `Card_personID_fkey` FOREIGN KEY (`personID`) REFERENCES `Person`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
