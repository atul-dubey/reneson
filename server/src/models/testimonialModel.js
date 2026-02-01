import mongoose from 'mongoose'

const testimonialSchema = new mongoose.Schema(
  {
    avatar: { type: String, default: null },
    name: { type: String, required: true },
    role: { type: String },
    text: { type: String, required: true },
    star: { type: Number, min: 1, max: 5 },
  },
  { timestamps: true }
);

const testimonialModel = mongoose.model("testimonial", testimonialSchema);

export {testimonialModel}