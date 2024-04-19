const express = require("express");
const app = express();
const env = require("dotenv");
const { Start } = require("./start");
const UserRoutes = require("./Routes/User.route");

// if (process.env.NODE_ENV !== "production") {
//   env.config();
// }

const PORT = 4001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", UserRoutes);
app.get("/", async (req, res) => {
  await res.status(200).send({ message: "Welcome to this gbagbacious app" });
});
//---------------------------------------------------
Start();
try {
  app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
  });
} catch (e) {
  console.log(e.message);
}
