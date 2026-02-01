import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    tech: [{ type: String }],
    image: { type: String, required: true },
  },
  { timestamps: true }
);

const projectModel = mongoose.model("project", projectSchema);

export {projectModel};
