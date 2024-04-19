const mongoose = require("mongoose");
const env = require("dotenv");
if (process.env.NODE_ENV !== "production") {
  env.config();
}
const PORT = process.env.PORT || 3006;

const Start = () => {
  try {
    const connection = mongoose.connect(process.env.Connection_string);

    if (connection) {
      console.log("Database connection established successfully");
    }
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = { Start };
