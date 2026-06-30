import express from "express";
import { createProject, deleteProject, getFeaturedProjects, getProjectByIdWithDetails, getProjects, getProjectsByService, updateProject } from "../controllers/projectController.js";
import { adminAuth } from "../middleware/adminAuth.js";
import { upload } from "../middleware/multerMiddleware.js";

const projectRoutes = express.Router();

projectRoutes.post("/create", adminAuth, upload.any(), createProject);
projectRoutes.get("/all", getProjects);
projectRoutes.get('/featured',getFeaturedProjects);
projectRoutes.get('/service',getProjectsByService);
projectRoutes.put("/:id", adminAuth, upload.any(), updateProject);
projectRoutes.delete("/:id", adminAuth, deleteProject);
projectRoutes.get("/:id", getProjectByIdWithDetails);

export {projectRoutes}