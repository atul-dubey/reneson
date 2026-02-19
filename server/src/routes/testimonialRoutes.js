import express from "express";
import { createTestimonial, deleteTestimonial, getTestimonials, updateTestimonial } from "../controllers/testimonialController.js";
import { adminAuth } from "../middleware/adminAuth.js";
import { upload } from "../middleware/multerMiddleware.js";

const testimonialRoutes = express.Router();

testimonialRoutes.post("/create",adminAuth, upload.single('avatar'),createTestimonial);
testimonialRoutes.get("/all", getTestimonials);
testimonialRoutes.put("/:id", adminAuth,upload.single('avatar'), updateTestimonial);
testimonialRoutes.delete("/:id", adminAuth, deleteTestimonial);

export  {testimonialRoutes}