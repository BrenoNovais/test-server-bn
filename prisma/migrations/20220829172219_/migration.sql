-- AlterTable
ALTER TABLE "bancos" ADD COLUMN     "id_empresas" INTEGER;

-- AddForeignKey
ALTER TABLE "bancos" ADD CONSTRAINT "bancos_id_empresas_fkey" FOREIGN KEY ("id_empresas") REFERENCES "empresas"("id") ON DELETE SET NULL ON UPDATE CASCADE;
