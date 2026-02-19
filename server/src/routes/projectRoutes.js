import express from "express";
import { createProject, deleteProject, getFeaturedProjects, getProjects, getProjectsByService, updateProject } from "../controllers/projectController.js";
import { adminAuth } from "../middleware/adminAuth.js";
import { upload } from "../middleware/multerMiddleware.js";

const projectRoutes = express.Router();

const projectUploads = upload.fields([
  { name: 'mainImage', maxCount: 1 },
  { name: 'galleryImages', maxCount: 10 }
]);

projectRoutes.post("/create", adminAuth, projectUploads, createProject);
projectRoutes.get("/all", getProjects);
projectRoutes.get('/featured',getFeaturedProjects);
projectRoutes.get('/service',getProjectsByService);
projectRoutes.put("/:id", adminAuth, projectUploads,updateProject);
projectRoutes.delete("/:id", adminAuth, deleteProject);

export {projectRoutes}