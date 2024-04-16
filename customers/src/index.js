"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv");
const username = encodeURIComponent("fortunate");
const password = encodeURIComponent("F0rtun@te0m0nuw@");
const cors = require("cors");
const customers_1 = require("./models/customers");
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
app.get("/", (req, res) => {
    res.send("Welcome to my dummy app!!!!!!");
});
//-----------------------------------------------------------------
app.get("/api/customers", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(yield mongoose.connection.db.listCollections().toArray());
    try {
        const result = yield customers_1.Customer.find();
        res.json({ customers: result });
    }
    catch (e) {
        console.log(e.message);
        res.status(500).json({ error: e.message });
    }
}));
//-------------------------------------------------------------------------
app.get("/api/customers/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: customer_id } = req.params;
    try {
        const customer = yield customers_1.Customer.findById(customer_id);
        if (customer !== null) {
            res.status(200).json({ customer });
            console.log("Customer Retrieval was successful");
        }
        else {
            res.status(404).send("Such customer doesn't exist");
        }
    }
    catch (e) {
        res.status(500).send({ error: e.message });
    }
}));
//--------------------------------------------------------------------------
app.post("/api/customers", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const customer = new customers_1.Customer(req.body);
    try {
        yield customer.save();
        res.status(201).send({ customer });
    }
    catch (e) {
        res.status(400).json({ error: e.message });
    }
}));
//----------------------------------------------------------------------------------
app.put("/api/customers/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: customer_id } = req.params;
    const customer = yield customers_1.Customer.findOneAndReplace({ _id: customer_id }, req.body, { new: true });
    res.json({ customer });
}));
//-------------------------------------------------------------
app.patch("/api/customers/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: customer_id } = req.params;
    const customer = yield customers_1.Customer.findOneAndUpdate({ _id: customer_id }, req.body, { new: true });
    res.json({ customer });
}));
//---------------------------------------------------------------
app.patch("/api/orders/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: orderid } = req.params;
    req.body._id = orderid;
    const customer = yield customers_1.Customer.findOneAndUpdate({ "order._id": orderid }, { $set: { "order.$": req.body } }, { new: true });
    res.status(200).json({ customer });
}));
//-----------------------------------------------------
app.get("/api/orders/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: orderId } = req.params;
    const order = yield customers_1.Customer.findOne({ "orders._id": orderId });
    if (order) {
        res.status(200).json({ order });
    }
    else {
        res.status(404).json("blah blah blah");
    }
}));
//-------------------------------------------------------------------------------
app.delete("/api/customers/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: customer_id } = req.params;
    try {
        const customer = yield customers_1.Customer.findById(customer_id);
        if (customer) {
            const result = yield customers_1.Customer.deleteOne({ _id: customer_id });
            res.status(200).json({
                deletedCount: result.deletedCount,
            });
        }
        else {
            res.status(404).send(`Customer with Id:${customer_id} doesn't exist`);
        }
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
}));
//-----------------------------------------------------------
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose.connect(`mongodb+srv://${username}:${password}@customers.hwdh3en.mongodb.net/Customers?retryWrites=true&w=majority&appName=Customers`);
        app.listen(PORT, () => {
            console.log("Listening on port " + PORT);
        });
    }
    catch (e) {
        console.log(e.message);
    }
});
start();
