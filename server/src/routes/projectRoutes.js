import express from "express";
import { createProject, deleteProject, getFeaturedProjects, getProjects, getProjectsByService, updateProject } from "../controllers/projectController.js";
import { adminAuth } from "../middleware/adminAuth.js";

const projectRoutes = express.Router();

projectRoutes.post("/create",adminAuth, createProject);
projectRoutes.get("/all", getProjects);
projectRoutes.get('/featured',getFeaturedProjects);
projectRoutes.get('/service',getProjectsByService);
projectRoutes.put("/:id", adminAuth, updateProject);
projectRoutes.delete("/:id", adminAuth, deleteProject);

export {projectRoutes}