import express from "express";
import { createClient, deleteClient, getClients, updateClient } from "../controllers/clientController.js";
import { adminAuth } from "../middleware/adminAuth.js";

const clientRoutes = express.Router();

clientRoutes.post("/create",adminAuth, createClient);
clientRoutes.get("/all", getClients);
clientRoutes.put("/:id", adminAuth, updateClient);
clientRoutes.delete("/:id", adminAuth, deleteClient);

export {clientRoutes}