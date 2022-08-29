/*
  Warnings:

  - You are about to drop the column `db_name` on the `bkps` table. All the data in the column will be lost.
  - You are about to drop the column `db_password` on the `bkps` table. All the data in the column will be lost.
  - You are about to drop the column `db_user` on the `bkps` table. All the data in the column will be lost.
  - You are about to drop the column `horarios_bkps` on the `bkps` table. All the data in the column will be lost.
  - You are about to drop the column `realiza_backup` on the `bkps` table. All the data in the column will be lost.
  - You are about to drop the `backups` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "backups" DROP CONSTRAINT "backups_id_tenant_fkey";

-- AlterTable
ALTER TABLE "bkps" DROP COLUMN "db_name",
DROP COLUMN "db_password",
DROP COLUMN "db_user",
DROP COLUMN "horarios_bkps",
DROP COLUMN "realiza_backup";

-- DropTable
DROP TABLE "backups";

-- CreateTable
CREATE TABLE "bancos" (
    "id" SERIAL NOT NULL,
    "id_tenant" INTEGER NOT NULL,
    "id_banco" INTEGER NOT NULL,
    "db_user" TEXT NOT NULL,
    "db_password" TEXT NOT NULL,
    "db_name" TEXT NOT NULL,
    "qtde_dias_bkp" INTEGER NOT NULL,
    "diretorio_bkp" TEXT NOT NULL,

    CONSTRAINT "bancos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "diretorios_xml" (
    "id" SERIAL NOT NULL,
    "id_tenant" INTEGER NOT NULL,
    "id_diretorio_xml" INTEGER NOT NULL,
    "id_bancos" INTEGER,
    "diretorio_xml" TEXT NOT NULL,

    CONSTRAINT "diretorios_xml_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "horarios" (
    "id" SERIAL NOT NULL,
    "id_tenant" INTEGER NOT NULL,
    "id_horario" INTEGER NOT NULL,
    "horario" INTEGER NOT NULL,
    "id_bancos" INTEGER,

    CONSTRAINT "horarios_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bancos" ADD CONSTRAINT "bancos_id_tenant_fkey" FOREIGN KEY ("id_tenant") REFERENCES "tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diretorios_xml" ADD CONSTRAINT "diretorios_xml_id_tenant_fkey" FOREIGN KEY ("id_tenant") REFERENCES "tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diretorios_xml" ADD CONSTRAINT "diretorios_xml_id_bancos_fkey" FOREIGN KEY ("id_bancos") REFERENCES "bancos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "horarios" ADD CONSTRAINT "horarios_id_tenant_fkey" FOREIGN KEY ("id_tenant") REFERENCES "tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "horarios" ADD CONSTRAINT "horarios_id_bancos_fkey" FOREIGN KEY ("id_bancos") REFERENCES "bancos"("id") ON DELETE SET NULL ON UPDATE CASCADE;
