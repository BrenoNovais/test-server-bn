/*
  Warnings:

  - You are about to drop the column `id_empresas` on the `bancos` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "bancos" DROP CONSTRAINT "bancos_id_empresas_fkey";

-- AlterTable
ALTER TABLE "bancos" DROP COLUMN "id_empresas",
ADD COLUMN     "id_empresa" INTEGER;

-- AddForeignKey
ALTER TABLE "bancos" ADD CONSTRAINT "bancos_id_empresa_fkey" FOREIGN KEY ("id_empresa") REFERENCES "empresas"("id") ON DELETE SET NULL ON UPDATE CASCADE;
