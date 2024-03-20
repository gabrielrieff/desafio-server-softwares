import { Request, Response } from "express";
import prismaClient from "../services/prisma";

interface produtoProps {
  codigo?: string;
  descricao?: string;
  preco?: number;
}

export class UpdateProductController {
  async handle(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const body = { ...(req.body as produtoProps) };

      const product = await prismaClient.produto.findFirst({
        where: { id: id },
      });

      if (!product) {
        throw new Error("Não foi possível encontrar o produto");
      }

      const updateProduct = await prismaClient.produto.update({
        where: {
          id: id,
        },
        data: {
          ...body,
        },
      });

      return res.json({ updateProduct });
    } catch (error) {
      res.status(500).json({ error: "Não foi possível atualizar o produto" });
    }
  }
}
