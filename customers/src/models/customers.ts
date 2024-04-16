import { Schema, model } from "mongoose";
const CustomerSchema = new Schema({
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

export const Customer = model("Customer", CustomerSchema);
