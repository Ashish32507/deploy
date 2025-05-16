import {
  addProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
} from "../controller/ProductController.js";
import express from "express";
import { authenticate } from "../middleware/auth.js";
const productRoutes = express.Router();

productRoutes.post("/add", authenticate, addProduct);
productRoutes.get("/all-product", authenticate, getAllProduct);
productRoutes.put("/update/:id", authenticate, updateProduct);
productRoutes.delete("/delete/:id", authenticate, deleteProduct);

export default productRoutes;
