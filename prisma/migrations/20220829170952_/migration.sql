/*
  Warnings:

  - You are about to drop the `bkps` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "bkps" DROP CONSTRAINT "bkps_id_tenant_fkey";

-- DropTable
DROP TABLE "bkps";

-- CreateTable
CREATE TABLE "empresas" (
    "id" SERIAL NOT NULL,
    "id_tenant" INTEGER NOT NULL,
    "id_empresas" INTEGER,
    "nome" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "empresas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "empresas_id_id_tenant_key" ON "empresas"("id", "id_tenant");

-- CreateIndex
CREATE UNIQUE INDEX "empresas_id_empresas_id_tenant_key" ON "empresas"("id_empresas", "id_tenant");

-- AddForeignKey
ALTER TABLE "empresas" ADD CONSTRAINT "empresas_id_tenant_fkey" FOREIGN KEY ("id_tenant") REFERENCES "tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
