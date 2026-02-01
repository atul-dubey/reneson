import {teamModel} from "../models/teamModel.js";

export const createTeamMember = async (req, res) => {
  try {
    const member = await teamModel.create(req.body);
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
