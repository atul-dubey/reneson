import mongoose from 'mongoose';
import { PhaseModel } from "../models/phaseModel.js";
import { projectModel } from "../models/projectModel.js";
import { uploadImage } from "../utils/cloudinary.js";

export const createProject = async (req, res) => {
  try {
    const data = { ...req.body };
    const files = req.files || [];

    const mainImageFile = files.find(f => f.fieldname === 'mainImage');
    if (mainImageFile) {
      const result = await uploadImage(mainImageFile.buffer);
      data.mainImage = result.secure_url;
    }

    const galleryImageFiles = files.filter(f => f.fieldname === 'galleryImages');
    if (galleryImageFiles.length > 0) {
      const uploadPromises = galleryImageFiles.map(file => uploadImage(file.buffer));
      const results = await Promise.all(uploadPromises);
      data.galleryImages = results.map(r => r.secure_url);
    }

    if (data.tech) {
      try { data.tech = JSON.parse(data.tech); } catch (e) { data.tech = data.tech.split(',').map(t => t.trim()); }
    }

    let phases = [];
    if (data.phases) {
      try {
        phases = JSON.parse(data.phases);
      } catch (e) {
        console.error("Failed to parse phases:", e);
      }
    }

    const savedPhaseIds = [];
    for (let i = 0; i < phases.length; i++) {
      const phase = phases[i];
      const phaseFiles = files.filter(f => f.fieldname === `phase_images_${phase.tempId}`);
      let newUrls = [];
      if (phaseFiles.length > 0) {
        const uploadPromises = phaseFiles.map(file => uploadImage(file.buffer));
        const results = await Promise.all(uploadPromises);
        newUrls = results.map(r => r.secure_url);
      }

      const phaseData = {
        title: phase.title,
        summary: phase.summary || [],
        images: newUrls,
      };

      const createdPhase = await PhaseModel.create(phaseData);
      savedPhaseIds.push(String(createdPhase._id));
    }

    data.phaseCodes = savedPhaseIds;
    delete data.phases;

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
    const files = req.files || [];

    const mainImageFile = files.find(f => f.fieldname === 'mainImage');
    if (mainImageFile) {
      const result = await uploadImage(mainImageFile.buffer);
      data.mainImage = result.secure_url;
    }

    // Merge existing gallery URLs (sent from frontend) with newly uploaded ones
    let existingGallery = [];
    if (data.existingImages_galleryImages) {
      try { existingGallery = JSON.parse(data.existingImages_galleryImages); } catch (e) {}
      delete data.existingImages_galleryImages;
    }
    const galleryImageFiles = files.filter(f => f.fieldname === 'galleryImages');
    if (galleryImageFiles.length > 0) {
      const uploadPromises = galleryImageFiles.map(file => uploadImage(file.buffer));
      const results = await Promise.all(uploadPromises);
      data.galleryImages = [...existingGallery, ...results.map(r => r.secure_url)];
    } else {
      data.galleryImages = existingGallery;
    }

    if (data.tech) {
      try { data.tech = JSON.parse(data.tech); } catch (e) { data.tech = data.tech.split(',').map(t => t.trim()); }
    }

    let phases = [];
    if (data.phases) {
      try {
        phases = JSON.parse(data.phases);
      } catch (e) {
        console.error("Failed to parse phases:", e);
      }
    }

    const savedPhaseIds = [];
    for (let i = 0; i < phases.length; i++) {
      const phase = phases[i];
      const fieldname = `phase_images_${phase._id || phase.tempId}`;
      const phaseFiles = files.filter(f => f.fieldname === fieldname);
      let newUrls = [];
      if (phaseFiles.length > 0) {
        const uploadPromises = phaseFiles.map(file => uploadImage(file.buffer));
        const results = await Promise.all(uploadPromises);
        newUrls = results.map(r => r.secure_url);
      }

      const existingImages = phase.images || [];
      const finalImages = [...existingImages, ...newUrls];

      const phaseData = {
        title: phase.title,
        summary: phase.summary || [],
        images: finalImages,
      };

      if (phase._id) {
        await PhaseModel.findByIdAndUpdate(phase._id, phaseData);
        savedPhaseIds.push(String(phase._id));
      } else {
        const createdPhase = await PhaseModel.create(phaseData);
        savedPhaseIds.push(String(createdPhase._id));
      }
    }

    // Delete phases that were removed from the project
    const projectBeforeUpdate = await projectModel.findById(req.params.id);
    if (projectBeforeUpdate) {
      const removedPhaseIds = (projectBeforeUpdate.phaseCodes || []).filter(id => !savedPhaseIds.includes(id));
      const validRemovedIds = removedPhaseIds.filter(id => mongoose.Types.ObjectId.isValid(id));
      if (validRemovedIds.length > 0) {
        await PhaseModel.deleteMany({ _id: { $in: validRemovedIds } });
      }
    }

    data.phaseCodes = savedPhaseIds;
    delete data.phases;

    const updated = await projectModel.findByIdAndUpdate(req.params.id, data, { new: true });
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: "Update project failed", error: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await projectModel.findById(req.params.id);
    if (project && project.phaseCodes && project.phaseCodes.length > 0) {
      const validIds = project.phaseCodes.filter(id => mongoose.Types.ObjectId.isValid(id));
      if (validIds.length > 0) {
        await PhaseModel.deleteMany({ _id: { $in: validIds } });
      }
    }
    await projectModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Project and associated phases deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Delete project failed", error: error.message });
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
      const validIds = project.phaseCodes.filter(id => mongoose.Types.ObjectId.isValid(id));
      if (validIds.length > 0) {
        phases = await PhaseModel.find({
          _id: { $in: validIds },
        });
        // Sort phases in the exact order of project.phaseCodes array
        phases.sort((a, b) => {
          return project.phaseCodes.indexOf(a._id.toString()) - project.phaseCodes.indexOf(b._id.toString());
        });
      }
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