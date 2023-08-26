import mongoose from "mongoose";

const reviewsSchema = new mongoose.Schema(
  {
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Reviews =
  mongoose.models.Reviews || mongoose.model("Reviews", reviewsSchema);
export default Reviews;
