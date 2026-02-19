import express from "express";
import { createClient, deleteClient, getClients, updateClient } from "../controllers/clientController.js";
import { adminAuth } from "../middleware/adminAuth.js";
import { upload } from "../middleware/multerMiddleware.js";

const clientRoutes = express.Router();

clientRoutes.post("/create",adminAuth,upload.single('logo'), createClient);
clientRoutes.get("/all", getClients);
clientRoutes.put("/:id", adminAuth,upload.single('logo'), updateClient);
clientRoutes.delete("/:id", adminAuth, deleteClient);

export {clientRoutes}