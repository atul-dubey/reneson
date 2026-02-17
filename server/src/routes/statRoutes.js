import express from "express";
import { createStat, deleteStat, getStats, updateStat } from "../controllers/statController.js";
import { adminAuth } from "../middleware/adminAuth.js";

const statRoutes = express.Router();

statRoutes.post("/create",adminAuth,createStat);
statRoutes.get("/all", getStats);
statRoutes.put("/:id", adminAuth, updateStat);
statRoutes.delete("/:id", adminAuth, deleteStat);

export  {statRoutes}