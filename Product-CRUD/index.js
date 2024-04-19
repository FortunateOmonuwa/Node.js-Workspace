const express = require("express");
const app = express();
const env = require("dotenv");
if (process.env.NODE_ENV !== "production") {
  env.config();
}
const PORT = process.env.PORT || 3006;
const { Start } = require("./app.start");
const productRoutes = require("./Routes/product.route");

//MiddleWare
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/products", productRoutes);

//-----------------------------------------------------------------------

Start();

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
