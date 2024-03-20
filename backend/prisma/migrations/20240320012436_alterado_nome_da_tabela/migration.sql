/*
  Warnings:

  - You are about to drop the `Production` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Production";

-- CreateTable
CREATE TABLE "Produtos" (
    "id" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "data_cadastro" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Produtos_pkey" PRIMARY KEY ("id")
);
