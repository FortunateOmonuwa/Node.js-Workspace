const { Product } = require("../models/product.model");

const welcome = async (req, res) => {
  res.json("Welcome to this new gba app");
};
//---------------------------------------------------------------------------
const createProducts = async (req, res) => {
  const { body } = req;

  const { name } = req.body;
  const nameRegex = /^[0-9a-zA-Z\s]+$/;
  try {
    const existingProductWithName = await Product.findOne({ name });
    if (body === null) {
      console.log("Product body has null values");
      return res.status(400).json({ message: "Product body has null values" });
    } else if (!nameRegex.test(name)) {
      console.error("Product name contains invalid characters.");
      return res.status(400).json({
        message: "Product name can only contain letters, numbers and spaces",
      });
    } else if (existingProductWithName) {
      console.log(`Product with name: ${name} already exists`);
      return res
        .status(400)
        .json({ message: `Product with name: ${name} already exists` });
    } else {
      const product = new Product(body);
      await product.save();
      res.status(201).json({ product });
    }
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ error: e.message });
  }
};
//----------------------------------------------------------------------------
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    if (products.length > 0) {
      res.status(200).json({ products });
      console.log(`${products} \n\n fetch was successful`);
    } else {
      res.status(404).json("No products data exists");
      console.log("No products exists");
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

//---------------------------------------------------------------
const getProductById = async (req, res) => {
  const { id: product_id } = req.params;
  try {
    const product = await Product.findById(product_id);
    if (!product) {
      res
        .status(404)
        .json({ error: "Product doesn't exist...Please check and try again" });
      console.log(`Product with id: ${product_id} doesn't exist`);
    } else {
      res.status(200).json({ product });
      console.log(
        `Product ${product} with id: ${product_id} was successfully retrieval`
      );
    }
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

//---------------------------------------------------------------------
const updateProduct = async (req, res) => {
  const { id: product_id } = req.params;
  const { body } = req;
  try {
    const product = await Product.findByIdAndUpdate({ _id: product_id }, body, {
      new: true,
    });
    res.status(200).json({ product });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
//-------------------------------------------------------------------------
module.exports = {
  createProducts,
  getAllProducts,
  getProductById,
  updateProduct,
  welcome,
};
