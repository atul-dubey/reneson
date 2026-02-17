import express from "express";
import { createTeamMember, deleteTeam, getTeam, updateTeam } from "../controllers/teamController.js";
import { adminAuth } from "../middleware/adminAuth.js";

const teamRoutes = express.Router();

teamRoutes.post("/create", adminAuth , createTeamMember);
teamRoutes.get("/all", getTeam);
teamRoutes.put("/:id", adminAuth, updateTeam);
teamRoutes.delete("/:id", adminAuth, deleteTeam);

export {teamRoutes}