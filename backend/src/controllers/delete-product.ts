import { Request, Response } from "express";
import prismaClient from "../services/prisma";

export class DeleteProductController {
  async handle(req: Request, res: Response) {
    try {
      const id = req.params.id as string;

      const product = await prismaClient.produto.findFirst({
        where: { id: id },
      });

      if (!product) {
        throw new Error("Não foi possível encontrar o produto");
      }

      await prismaClient.produto.delete({
        where: { id: id },
      });

      return res.json({ product });
    } catch (error) {
      res.status(500).json({ error: "Não foi possível excluir o produto" });
    }
  }
}
