import { Request, Response } from "express";
import prismaClient from "../services/prisma";

export class CreateProductController {
  async handle(req: Request, res: Response) {
    try {
      const { codigo, descricao, preco } = req.body;

      const alreadyExistProduct = await prismaClient.produto.findFirst({
        where: {
          descricao: descricao,
        },
      });

      if (alreadyExistProduct) {
        res.status(500).json({ error: "O produto já existe" });
      }

      const product = await prismaClient.produto.create({
        data: {
          codigo: codigo,
          descricao: descricao,
          preco: preco,
        },
      });

      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Não foi possível criar um novo produto" });
    }
  }
}
