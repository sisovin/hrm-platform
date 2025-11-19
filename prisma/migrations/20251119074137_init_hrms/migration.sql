/*
  Warnings:

  - A unique constraint covering the columns `[title,level,departmentId]` on the table `Position` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Position_title_level_departmentId_key" ON "Position"("title", "level", "departmentId");
