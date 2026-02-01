import express from "express";
import { createTestimonial, getTestimonials } from "../controllers/testimonialController.js";

const testimonialRoutes = express.Router();

testimonialRoutes.post("/create", createTestimonial);
testimonialRoutes.get("/all", getTestimonials);

export  {testimonialRoutes}