const mongoose = require("mongoose");
const Project = require("./project.model");
const User = require("../user/user.model");
const fs = require('fs');
const path = require('path');

exports.getProject = async (req, res) => {
  const result = await Project.find({}).populate("user");
  if (!result) {
    return res.status(404).json({
      status: "failed",
      message: "data not found",
    });
  }
  res.status(200).json({
    message: "successfully",
    data: result,
  });
};

exports.createProject = async (req, res) => {
  console.log(req.file);
  console.log(req.body);
  try {
    const {
      title,
      description,
      technology,
      projectLink,
      projectClient,
      projectServer,
      user,
    } = req.body;

    // if (
    //   !title ||
    //   !description ||
    //   !technology ||
    //   !projectLink ||
    //   !projectClient ||
    //   !projectServer
    // ) {
    //   return res.status(400).json({ message: "Missing required fields" });
    // }

    // if (!req.file || !req.file.filename) {
    //   return res.status(400).json({ message: "File upload is required" });
    // }
    // const { filename } = req.file;

    let existUser = await User.findById(user);
    if (!existUser) {
      return res.status(400).json({ message: "User not found" });
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    const project = new Project({
      title,
      description,
      technology,
      projectLink,
      projectClient,
      projectServer,
      image: req.file?.filename,
      user,
    });

    await project.save()

    return res.status(200).json({
      message: "Project created successfully",
      data: project,
    });
  } catch (error) {
    console.error("Error creating project:", error);
    return res.status(500).json({ message: "Failed to create project" });
  }
};

exports.getByIdProject = async (req, res) => {
  const projectId = req.params.id;
  const data = await Project.findById(projectId);
  res.status(200).json({
    status: "success",
    message: "successfully",
    data: data
  });
};



exports.updateProject = async (req, res) => {
  try {
    const { title, description, technology, projectLink, projectClient, projectServer } = req.body;
    const blogId = req.params.id;

    
    const project = await Project.findById(blogId);
    if (!project) {
      return res.status(404).json({
        status: "fail",
        message: "Project not found",
      });
    }

    const oldImage = project.image; 
    console.log('Old image filename:', oldImage);

    // Prepare the updated data
    const updateData = {
      title,
      description,
      technology,
      projectLink,
      projectClient,
      projectServer,
      ...(req.file && { image: req.file.filename }),
    };

    // Update the project in the database
    const updatedProject = await Project.findByIdAndUpdate(blogId, updateData, { new: true });

    // If there is a new image, delete the old image file
    if (req.file && oldImage) {
      const oldImagePath = path.join(__dirname, '..', '../../uploads', oldImage);
      console.log('Old image path:', oldImagePath);
      
      fs.unlink(oldImagePath, (err) => {
        if (err) {
          console.error('Error deleting old image:', err);
        } else {
          console.log('Old image deleted:', oldImagePath);
        }
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Project updated successfully",
      data: updatedProject,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      message: "Server error",
    });
  }
};


exports.deleteProject = async (req, res) => {
  const projectId = req.params.id;
  await Project.findByIdAndDelete(projectId);
  res.status(200).json({
    message: "successfully",
  });
};
