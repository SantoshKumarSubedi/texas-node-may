const { User, Product } = require("../models");
const productCategory = [
  { id: 1, name: "Electronics" },
  { id: 2, name: "Furniture" },
];
const createProduct = async (req, res) => {
  const err = null;
  const { name, code, description, category } = req.body;
  if (!name || !code) {
    err = "Name and code are required";
  }
  const newProduct = Product.build({ name, code, description, category });
  await newProduct.save();
  res.redirect("/product");
};

const getProduct = async (req, res) => {
  const products = await Product.findAll({ raw: true });
  for (let product of products) {
    const cat = productCategory.filter((a) => a.id == product.category);
    if (cat.length) {
      product["categoryName"] = cat[0].name;
    }
  }
  res.render("product", { product: products });
};

const getAddProduct = async (req, res) => {
  res.render("product/product", { category: productCategory });
};

const getEditProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findOne({ where: { id }, raw: true });
  const categories = Object.freeze(productCategory);
  for (let cat of categories) {
    cat["selected"] = cat.id == product.category;
  }
  res.render("product/edit", { product, category: productCategory });
};

const editProduct = async (req, res) => {
  const err = null;
  const { id, name, code, description } = req.body;
  if (!name || !code) {
    err = "Name and code are required";
  }
  const product = await Product.findOne({ where: { id } });
  product.name = name;
  product.code = code;
  product.description = description;
  await product.save();
  res.redirect("/product");
};

const getProductsByCategory = async (req, res) => {
  const { id } = req.params;
  const products = await Product.findAll({
    where: { category: id },
    raw: true,
  });
  res.render("customer/dashboard", {
    categories: productCategory,
    products: products,
    layout: "customer",
  });
};

// const getProduct = async (req,)

module.exports = {
  createProduct,
  getProduct,
  getAddProduct,
  getEditProduct,
  editProduct,
  productCategory,
  getProductsByCategory,
};
