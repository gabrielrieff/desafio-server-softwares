/*
  Warnings:

  - You are about to drop the `Produtos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Produtos";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "data_cadastro" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
