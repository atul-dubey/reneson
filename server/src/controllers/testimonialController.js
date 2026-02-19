import {testimonialModel} from "../models/testimonialModel.js";
import { uploadImage } from "../utils/cloudinary.js";

export const createTestimonial = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      const result = await uploadImage(req.file.buffer);
      data.avatar = result.secure_url;
    }
    const testimonial = await testimonialModel.create(data);
    res.status(201).json({
      success: true,
      data: testimonial,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create testimonial",
      error: error.message,
    });
  }
};

export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await testimonialModel.find();
    res.status(200).json({
      success: true,
      data: testimonials,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch testimonials",
      error: error.message,
    });
  }
};

export const updateTestimonial = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.file) {
      const result = await uploadImage(req.file.buffer);
      updateData.avatar = result.secure_url;
    }

    const testimonial = await testimonialModel.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    res.status(200).json({ success: true, data: testimonial });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteTestimonial = async (req, res) => {
  try {
    await testimonialModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Testimonial deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};