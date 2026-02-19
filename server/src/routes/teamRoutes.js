import express from "express";
import { createTeamMember, deleteTeam, getTeam, updateTeam } from "../controllers/teamController.js";
import { adminAuth } from "../middleware/adminAuth.js";
import { upload } from "../middleware/multerMiddleware.js";

const teamRoutes = express.Router();

teamRoutes.post("/create", adminAuth ,upload.single('image'), createTeamMember);
teamRoutes.get("/all", getTeam);
teamRoutes.put("/:id", adminAuth, upload.single('image'),updateTeam);
teamRoutes.delete("/:id", adminAuth, deleteTeam);

export {teamRoutes}