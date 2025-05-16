import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    pdName: {
      type: String,
      required: true,
    },
    pdDescription: {
      type: String,
      required: true,
    },
    pdPrice: {
      type: Number,
      required: true,
    },
    pdImageURL: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Created Locally",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const ProductModel = mongoose.model("Product", productSchema);
