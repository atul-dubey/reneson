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

export const updateClient = async (req, res) => {
  try {
    const updated = await clientModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: "Update client failed", error: error.message });
  }
};

export const deleteClient = async (req, res) => {
  try {
    await clientModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Client deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Delete client failed", error: error.message });
  }
};

