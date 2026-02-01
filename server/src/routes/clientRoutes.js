import express from "express";
import { createClient, getClients } from "../controllers/clientController.js";

const clientRoutes = express.Router();

clientRoutes.post("/create", createClient);
clientRoutes.get("/all", getClients);

export {clientRoutes}