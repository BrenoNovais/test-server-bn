-- CreateTable
CREATE TABLE "tenant" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cnpj" VARCHAR(14) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tenant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "id_tenant" INTEGER NOT NULL,
    "id_user" INTEGER,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "avatar" TEXT DEFAULT 'public/avatarpadrao.jpg',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "backups" (
    "id" SERIAL NOT NULL,
    "id_tenant" INTEGER NOT NULL,
    "id_backup" INTEGER,
    "url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "backups_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tenant_cnpj_key" ON "tenant"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_id_id_tenant_key" ON "Users"("id", "id_tenant");

-- CreateIndex
CREATE UNIQUE INDEX "Users_id_user_id_tenant_key" ON "Users"("id_user", "id_tenant");

-- CreateIndex
CREATE UNIQUE INDEX "backups_id_id_tenant_key" ON "backups"("id", "id_tenant");

-- CreateIndex
CREATE UNIQUE INDEX "backups_id_backup_id_tenant_key" ON "backups"("id_backup", "id_tenant");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_id_tenant_fkey" FOREIGN KEY ("id_tenant") REFERENCES "tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "backups" ADD CONSTRAINT "backups_id_tenant_fkey" FOREIGN KEY ("id_tenant") REFERENCES "tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
