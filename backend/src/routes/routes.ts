import { Router } from "express";
import { CreateProductController } from "../controllers/create-product";
import { DeleteProductController } from "../controllers/delete-product";
import { UpdateProductController } from "../controllers/update-product";
import { ListProductController } from "../controllers/list-products";

const router = Router();

router.get("/", new ListProductController().handle);
router.get("/product", new CreateProductController().handle);
router.delete("/product/:id", new DeleteProductController().handle);
router.patch("/product/:id", new UpdateProductController().handle);

export { router };
