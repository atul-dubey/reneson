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
