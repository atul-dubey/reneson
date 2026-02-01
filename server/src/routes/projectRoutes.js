import express from "express";
import { createProject, getProjects } from "../controllers/projectController.js";

const projectRoutes = express.Router();

projectRoutes.post("/create", createProject);
projectRoutes.get("/all", getProjects);

export {projectRoutes}