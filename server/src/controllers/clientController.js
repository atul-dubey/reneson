import {clientModel} from "../models/clientModel.js";
import { uploadImage } from "../utils/cloudinary.js";

export const createClient = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      const result = await uploadImage(req.file.buffer);
      data.logo = result.secure_url;
    }
    const client = await clientModel.create(data);
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
    const updateData = { ...req.body };

    if (req.file) {
      const result = await uploadImage(req.file.buffer);
      updateData.logo = result.secure_url;
    }

    const updated = await clientModel.findByIdAndUpdate(req.params.id, updateData, { new: true });
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

