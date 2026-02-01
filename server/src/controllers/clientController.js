import {clientModel} from "../models/clientModel.js";

export const createClient = async (req, res) => {
  try {
    const client = await clientModel.create(req.body);
    res.status(201).json({
      success: true,
      data: client,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create client",
      error: error.message,
    });
  }
};

export const getClients = async (req, res) => {
  try {
    const clients = await clientModel.find();
    res.status(200).json({
      success: true,
      data: clients,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch clients",
      error: error.message,
    });
  }
};
