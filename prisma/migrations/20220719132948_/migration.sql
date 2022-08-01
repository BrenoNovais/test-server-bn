-- CreateEnum
CREATE TYPE "acao" AS ENUM ('incluir', 'excluir', 'alterar');

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "avatar" TEXT DEFAULT 'public/avatarpadrao.jpg',

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "log" (
    "id" SERIAL NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "usuario" TEXT NOT NULL,
    "administrador" BOOLEAN NOT NULL,
    "acao" "acao" NOT NULL,
    "tabela" TEXT NOT NULL,
    "id_modificacao" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
