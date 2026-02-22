import mongoose from "mongoose";

const phaseSchema = new mongoose.Schema(
  {
    phaseCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
    },
    images: [{ type: String }],
    summary: [{ type: String }],
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const PhaseModel = mongoose.model("phase", phaseSchema);