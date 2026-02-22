import { PhaseModel } from "../models/phaseModel.js";
import { projectModel } from "../models/projectModel.js";
import { uploadImage } from "../utils/cloudinary.js";

export const createProject = async (req, res) => {
  try {
    const data = { ...req.body };

    if (req.files?.mainImage) {
      const result = await uploadImage(req.files.mainImage[0].buffer);
      data.mainImage = result.secure_url;
    }

    if (req.files?.galleryImages) {
      const uploadPromises = req.files.galleryImages.map(file => uploadImage(file.buffer));
      const results = await Promise.all(uploadPromises);
      data.galleryImages = results.map(r => r.secure_url);
    }

    if (data.tech) {
      try {
        data.tech = JSON.parse(data.tech);
      } catch (e) {
        data.tech = data.tech.split(',').map(t => t.trim());
      }
    }
    const project = await projectModel.create(data);
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
  const data = { ...req.body };

    if (req.files?.mainImage) {
      const result = await uploadImage(req.files.mainImage[0].buffer);
      data.mainImage = result.secure_url;
    }

    if (req.files?.galleryImages) {
      const uploadPromises = req.files.galleryImages.map(file => uploadImage(file.buffer));
      const results = await Promise.all(uploadPromises);
      data.galleryImages = results.map(r => r.secure_url);
    }

    if (data.tech) {
      try {
        data.tech = JSON.parse(data.tech);
      } catch (e) {
        data.tech = data.tech.split(',').map(t => t.trim());
      }
    }
    const updated = await projectModel.findByIdAndUpdate(req.params.id, data, { new: true });
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

export const getProjectByIdWithDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await projectModel.findById(id).lean();

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    let phases = [];
    if (project.phaseCodes && project.phaseCodes.length > 0) {
      phases = await PhaseModel.find({
        phaseCode: { $in: project.phaseCodes },
        projectId: project._id,
      }).sort({ order: 1 });
    }

    res.status(200).json({
      success: true,
      data: {
        ...project,
        phases,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch project details",
      error: error.message,
    });
  }
};