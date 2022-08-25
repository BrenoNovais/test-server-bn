-- CreateTable
CREATE TABLE "bkps" (
    "id" SERIAL NOT NULL,
    "id_tenant" INTEGER NOT NULL,
    "id_bkps" INTEGER,
    "nome" TEXT NOT NULL,
    "db_user" TEXT NOT NULL,
    "db_password" TEXT NOT NULL,
    "db_name" TEXT NOT NULL,
    "horarios_bkps" TEXT NOT NULL,
    "realiza_backup" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bkps_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "bkps_id_id_tenant_key" ON "bkps"("id", "id_tenant");

-- CreateIndex
CREATE UNIQUE INDEX "bkps_id_bkps_id_tenant_key" ON "bkps"("id_bkps", "id_tenant");

-- AddForeignKey
ALTER TABLE "bkps" ADD CONSTRAINT "bkps_id_tenant_fkey" FOREIGN KEY ("id_tenant") REFERENCES "tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
