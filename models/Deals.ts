import mongoose from "mongoose";

const dealsSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    link: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Deals =
  mongoose.models.Deals || mongoose.model("Deals", dealsSchema);
export default Deals;
