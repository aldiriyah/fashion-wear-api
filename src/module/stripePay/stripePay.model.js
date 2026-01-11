import { model, Schema } from "mongoose";

const stripePaySchema = Schema(
  {
    email: {
      type: String,
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    amount: {
      type: Number,
      required: true,
    },
    CardholderName: {
      type: String,
      required: true,
    },
    CardNumber: {
      type: String,
      required: true,
    },
    ExpiryDate: {
      type: String,
      required: true,
    },
    CVV: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const StripePay = model("StripePay", stripePaySchema);
