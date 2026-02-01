import express from "express";
import { createTeamMember, getTeam } from "../controllers/teamController.js";

const teamRoutes = express.Router();

teamRoutes.post("/create", createTeamMember);
teamRoutes.get("/all", getTeam);

export {teamRoutes}