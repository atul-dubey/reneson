import {statModel} from "../models/statModel.js";

export const createStat = async (req, res) => {
  try {
    const stat = await statModel.create(req.body);
    res.status(201).json({
      success: true,
      data: stat,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create stat",
      error: error.message,
    });
  }
};


export const getStats = async (req, res) => {
  try {
    const stats = await statModel.find();
    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch stats",
      error: error.message,
    });
  }
};


export const updateStat = async (req, res) => {
  try {
    const updated = await statModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: "Update stat failed" });
  }
};

export const deleteStat = async (req, res) => {
  try {
    await statModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Stat deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Delete stat failed" });
  }
};