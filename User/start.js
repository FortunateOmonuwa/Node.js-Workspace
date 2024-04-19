const mongoose = require("mongoose");
const env = require("dotenv");
env.config();

const Start = () => {
  try {
    const connection = mongoose.connect(process.env.connection_string);
    if (connection) {
      console.log("Connection  to Database was successful");
    }
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = { Start };
