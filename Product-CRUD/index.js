const express = require("express");
const app = express();
const env = require("dotenv");
const mongoose = require("mongoose");
const { Product } = require("./models/product.model");

if (process.env.NODE_ENV !== "production") {
  env.config();
}
const PORT = process.env.PORT || 3006;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//--------------------------------------------------------------------------
app.get("/", async (req, res) => {
  res.json("Welcome to this new gba app");
});
//---------------------------------------------------------------------------
app.post("/api/product", async (req, res) => {
  const { body } = req;

  const { name } = req.body;
  const nameRegex = /^[0-9a-zA-Z\s]+$/;
  try {
    const existingProductWithName = await Product.findOne({ name });
    if (body === null) {
      console.log("Product body has null values");
      return res.status(400).json({ message: "Product body has null values" });
    } else if (!nameRegex.test(name)) {
      console.error("Project name contains invalid characters.");
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
});
//----------------------------------------------------------------------------
app.get("/api/products", async (req, res) => {
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
});

//---------------------------------------------------------------
const Start = async () => {
  try {
    const connection = await mongoose.connect(process.env.Connection_string);

    if (connection) {
      console.log("Database connection established successfully");
    }

    app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });
  } catch (e) {
    console.log(e.message);
  }
};

Start();
