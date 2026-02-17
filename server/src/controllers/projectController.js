import { projectModel } from "../models/projectModel.js";

export const createProject = async (req, res) => {
  try {
    const project = await projectModel.create(req.body);
    res.status(201).json({
      success: true,
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create project",
      error: error.message,
    });
  }
};

export const getProjects = async (req, res) => {
  try {
    const projects = await projectModel.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch projects",
      error: error.message,
    });
  }
};

export const getFeaturedProjects = async (req, res) => {
  try {
    const projects = await projectModel
      .find({ isFeatured: true })
      .sort({ createdAt: -1 })
      .limit(3);

    res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch featured projects",
      error: error.message,
    });
  }
};

export const getProjectsByService = async (req, res) => {
  try {
    const { serviceType } = req.query;

    if (!serviceType) {
      return res.status(400).json({
        success: false,
        message: "serviceType query is required",
      });
    }

    const projects = await projectModel
      .find({ serviceType })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch service projects",
      error: error.message,
    });
  }
};

export const updateProject = async (req, res) => {
  try {
    const updated = await projectModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: "Update project failed" });
  }
};

export const deleteProject = async (req, res) => {
  try {
    await projectModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Project deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Delete project failed" });
  }
};
