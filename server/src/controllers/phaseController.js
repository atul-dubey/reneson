import { PhaseModel } from "../models/phaseModel.js";
import { uploadImage } from "../utils/cloudinary.js";

export const createPhase = async (req, res) => {
  try {
    const data = { ...req.body };

    if (req.files?.images) {
      const uploadPromises = req.files.images.map(file =>
        uploadImage(file.buffer)
      );
      const results = await Promise.all(uploadPromises);
      data.images = results.map(r => r.secure_url);
    }

    const phase = await PhaseModel.create(data);

    res.status(201).json({
      success: true,
      data: phase,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create phase",
      error: error.message,
    });
  }
};

export const getAllPhases = async (req, res) => {
  try {
    const phases = await PhaseModel.find().sort({ order: 1, createdAt: 1 });

    res.status(200).json({
      success: true,
      data: phases,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch phases",
    });
  }
};

export const getPhaseById = async (req, res) => {
  try {
    const phase = await PhaseModel.findById(req.params.id);

    if (!phase) {
      return res.status(404).json({
        success: false,
        message: "Phase not found",
      });
    }

    res.status(200).json({
      success: true,
      data: phase,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch phase",
    });
  }
};

export const updatePhase = async (req, res) => {
  try {
    const data = { ...req.body };

    if (req.files?.images) {
      const uploadPromises = req.files.images.map(file =>
        uploadImage(file.buffer)
      );
      const results = await Promise.all(uploadPromises);
      data.images = results.map(r => r.secure_url);
    }

    const updated = await PhaseModel.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Update phase failed",
    });
  }
};

export const deletePhase = async (req, res) => {
  try {
    await PhaseModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Phase deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Delete phase failed",
    });
  }
};