import {teamModel} from "../models/teamModel.js";
import { uploadImage } from "../utils/cloudinary.js";

export const createTeamMember = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      const result = await uploadImage(req.file.buffer);
      data.image = result.secure_url;
    }
    const member = await teamModel.create(data);
    res.status(201).json({
      success: true,
      data: member,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create team member",
      error: error.message,
    });
  }
};

export const getTeam = async (req, res) => {
  try {
    const team = await teamModel.find();
    res.status(200).json({
      success: true,
      data: team,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch team",
      error: error.message,
    });
  }
};


export const updateTeam = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.file) {
      const result = await uploadImage(req.file.buffer);
      updateData.image = result.secure_url;
    }

    const team = await teamModel.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.status(200).json({ success: true, data: team });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteTeam = async (req, res) => {
  try {
    await teamModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Team deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};