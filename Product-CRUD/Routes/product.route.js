const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  createProducts,
  getProductById,
  updateProduct,
} = require("../controller/products.controller");

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/:id", createProducts);
router.put("/:id", updateProduct);

module.exports = router;
