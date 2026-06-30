import mongoose from "mongoose";

const phaseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    images: [{ type: String }],
    summary: [{ type: String }],
  },
  { timestamps: true }
);

export const PhaseModel = mongoose.model("phase", phaseSchema);

// Drop the legacy unique phaseCode index if it exists in MongoDB
PhaseModel.collection.dropIndex("phaseCode_1").catch((err) => {
  // Index might not exist, ignore errors
});