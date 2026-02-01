import express from "express";
import { createStat, getStats } from "../controllers/statController.js";

const statRoutes = express.Router();

statRoutes.post("/create", createStat);
statRoutes.get("/all", getStats);

export  {statRoutes}