import mongoose from "mongoose";

const dealsSchema = new mongoose.Schema(
  {
    dealNum: { type: Number, required: true },
    image: { type: String, required: true },
    link: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Deals = mongoose.models.Deals || mongoose.model("Deals", dealsSchema);
export default Deals;
