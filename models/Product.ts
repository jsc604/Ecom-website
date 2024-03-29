import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    images: { type: [String], required: true },
    isFeatured: { type: Boolean, required: true },
    featuredImage: { type: String, required: true },
    options: [
      {
        size: { type: String, required: true },
        price: { type: Number, required: true },
        countInStock: { type: Number, required: true, default: 0 },
      },
    ],
    brand: { type: String, required: true },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
