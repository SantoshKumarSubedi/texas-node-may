const express = require("express");
const {
  createProduct,
  getProduct,
  getAddProduct,
  getEditProduct,
  editProduct,
  getProductsByCategory,
} = require("../controllers/product.controller");

const productRouter = express.Router();

productRouter.get("/product", getProduct);
productRouter.post("/product/add", createProduct);
productRouter.get("/product/add", getAddProduct);
productRouter.get("/product/edit/:id", getEditProduct);
productRouter.post("/product/edit", editProduct);
productRouter.get("/product/category/:id", getProductsByCategory);
// productRouter.put("/product", editProduct);

module.exports = { productRouter };
