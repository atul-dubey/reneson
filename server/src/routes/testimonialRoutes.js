import express from "express";
import { createTestimonial, deleteTestimonial, getTestimonials, updateTestimonial } from "../controllers/testimonialController.js";
import { adminAuth } from "../middleware/adminAuth.js";

const testimonialRoutes = express.Router();

testimonialRoutes.post("/create",adminAuth, createTestimonial);
testimonialRoutes.get("/all", getTestimonials);
testimonialRoutes.put("/:id", adminAuth, updateTestimonial);
testimonialRoutes.delete("/:id", adminAuth, deleteTestimonial);

export  {testimonialRoutes}