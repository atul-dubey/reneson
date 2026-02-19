import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    serviceType: {type: String, required:true,enum: ['IoT & Hardware','Software Development','Artificial Intelligence','Training']} ,
    tech: [{ type: String }],
    isFeatured: {type: Boolean,default: false},
    mainImage: {type: String,required: true},
    galleryImages: [{type: String,},],
  },
  { timestamps: true }
);

const projectModel = mongoose.model("project", projectSchema);

export {projectModel};
