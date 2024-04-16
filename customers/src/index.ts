const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv");
const username = encodeURIComponent("fortunate");
const password = encodeURIComponent("F0rtun@te0m0nuw@");
const cors = require("cors");
import { Customer } from "./models/customers";
import { Request, Response } from "express";

mongoose.set("strictQuery", false);

if (process.env.NODE_ENV !== "production") {
  env.config();
}
const PORT = process.env.PORT || 3000;
//const CONNECTION = process.env.CONNECTION;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//---------------------------------------------------------------------------
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to my dummy app!!!!!!");
});

//-----------------------------------------------------------------
app.get("/api/customers", async (req: Request, res: Response) => {
  console.log(await mongoose.connection.db.listCollections().toArray());
  try {
    const result = await Customer.find();
    res.json({ customers: result });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ error: e.message });
  }
});

//-------------------------------------------------------------------------
app.get("/api/customers/:id", async (req: Request, res: Response) => {
  const { id: customer_id } = req.params;
  try {
    const customer = await Customer.findById(customer_id);
    if (customer !== null) {
      res.status(200).json({ customer });
      console.log("Customer Retrieval was successful");
    } else {
      res.status(404).send("Such customer doesn't exist");
    }
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

//--------------------------------------------------------------------------
app.post("/api/customers", async (req: Request, res: Response) => {
  console.log(req.body);

  const customer = new Customer(req.body);
  try {
    await customer.save();
    res.status(201).send({ customer });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

//----------------------------------------------------------------------------------

app.put("/api/customers/:id", async (req: Request, res: Response) => {
  const { id: customer_id } = req.params;
  const customer = await Customer.findOneAndReplace(
    { _id: customer_id },
    req.body,
    { new: true }
  );
  res.json({ customer });
});
//-------------------------------------------------------------
app.patch("/api/customers/:id", async (req: Request, res: Response) => {
  const { id: customer_id } = req.params;
  const customer = await Customer.findOneAndUpdate(
    { _id: customer_id },
    req.body,
    { new: true }
  );

  res.json({ customer });
});

//---------------------------------------------------------------
app.patch("/api/orders/:id", async (req: Request, res: Response) => {
  const { id: orderid } = req.params;
  req.body._id = orderid;
  const customer = await Customer.findOneAndUpdate(
    { "order._id": orderid },
    { $set: { "order.$": req.body } },
    { new: true }
  );
  res.status(200).json({ customer });
});

//-----------------------------------------------------
app.get("/api/orders/:id", async (req: Request, res: Response) => {
  const { id: orderId } = req.params;
  const order = await Customer.findOne({ "orders._id": orderId });
  if (order) {
    res.status(200).json({ order });
  } else {
    res.status(404).json("blah blah blah");
  }
});
//-------------------------------------------------------------------------------
app.delete("/api/customers/:id", async (req: Request, res: Response) => {
  const { id: customer_id } = req.params;
  try {
    const customer = await Customer.findById(customer_id);
    if (customer) {
      const result = await Customer.deleteOne({ _id: customer_id });
      res.status(200).json({
        deletedCount: result.deletedCount,
      });
    } else {
      res.status(404).send(`Customer with Id:${customer_id} doesn't exist`);
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
//-----------------------------------------------------------
const start = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${username}:${password}@customers.hwdh3en.mongodb.net/Customers?retryWrites=true&w=majority&appName=Customers`
    );

    app.listen(PORT, () => {
      console.log("Listening on port " + PORT);
    });
  } catch (e) {
    console.log(e.message);
  }
};

start();
