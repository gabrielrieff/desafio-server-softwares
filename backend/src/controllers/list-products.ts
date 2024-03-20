import { Request, Response } from "express";
import prismaClient from "../services/prisma";

export class ListProductController {
  async handle(req: Request, res: Response) {
    try {
      const products = await prismaClient.produto.findMany();

      return res.json(products);
    } catch (error) {
      return res
        .status(500)
        .send("Aconteceu algum problema ao tentar listar os produtos");
    }
  }
}
