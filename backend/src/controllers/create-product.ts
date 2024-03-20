import { Request, Response } from "express";
import prismaClient from "../services/prisma";

export class CreateProductController {
  async handle(req: Request, res: Response) {
    try {
      const { codigo, descricao, preco } = req.body;

      const alreadyExistProduct = await prismaClient.produto.findFirst({
        where: {
          OR: [
            {
              descricao: descricao,
            },
            {
              codigo: codigo,
            },
          ],
        },
      });

      if (alreadyExistProduct) {
        return res
          .status(500)
          .send(
            `O produto já cadastrado, seu código é ${alreadyExistProduct.codigo}`
          );
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
      return res.status(500).send("Não foi possível criar um novo produto");
    }
  }
}
