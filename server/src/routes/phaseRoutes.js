import express from "express";
import {createPhase,deletePhase,getAllPhases,getPhaseById, updatePhase} from "../controllers/phaseController.js";
import { adminAuth } from "../middleware/adminAuth.js";
import { upload } from "../middleware/multerMiddleware.js";

const phaseRoutes = express.Router();

const phaseUploads = upload.fields([
  { name: "images", maxCount: 10 },
]);

phaseRoutes.post("/create", adminAuth, phaseUploads, createPhase);
phaseRoutes.get("/all", getAllPhases);
phaseRoutes.get("/:id", getPhaseById);
phaseRoutes.put("/:id", adminAuth, phaseUploads, updatePhase);
phaseRoutes.delete("/:id", adminAuth, deletePhase);

export { phaseRoutes };