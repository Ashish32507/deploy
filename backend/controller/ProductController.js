import { ProductModel } from "../models/ProductModel.js";
import { createWooProduct } from "../utils/wooClient.js";

export const addProduct = async (req, res) => {
  try {
    const { pdName, pdDescription, pdPrice, pdImageURL } = req.body;
    const newProduct = await ProductModel.create({
      pdName,
      pdDescription,
      pdPrice,
      pdImageURL,
      userId: req.user,
    });
    const wooRes = await createWooProduct(newProduct);
    newProduct.status = wooRes.success
      ? "Synced to WooCommerce"
      : "Sync Failed";
    await newProduct.save();

    res.status(201).json({ message: "Product Added successfully" });
  } catch (err) {
    console.error("Add Product Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllProduct = async (req, res) => {
  try {
    const allProduct = await ProductModel.find({ UserId: req.user.id });
    if (!addProduct) {
      res.status(500).json({ message: "Prodcut Is Not Avilable" });
    }

    res.status(201).json({ message: "Product List", product: allProduct });
  } catch (err) {
    console.error("Add Product Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const userId = req.user;
  const updateData = req.body;
  try {
    const product = await ProductModel.findOne({
      _id: productId,
      userId: userId,
    });
    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found or you don't have permission" });
    }

    Object.assign(product, updateData);
    await product.save();

    res.status(200).json({ message: "Product updated successfully", product });
  } catch (err) {
    console.error("Update Product Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  const userId = req.user;

  try {
    const product = await ProductModel.findOneAndDelete({
      _id: productId,
      userId: userId,
    });

    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found or you don't have permission" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Delete Product Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
