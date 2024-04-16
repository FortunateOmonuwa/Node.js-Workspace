"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
const mongoose_1 = require("mongoose");
const CustomerSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    industry: {
        type: String,
        required: true,
    },
    orders: {
        amountInCents: Number,
        description: String,
    },
});
exports.Customer = (0, mongoose_1.model)("Customer", CustomerSchema);
