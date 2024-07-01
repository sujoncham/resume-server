const express = require("express");
const {
  getProject,
  createProject,
  getByIdProject,
  deleteProject,
  updateProject,
} = require("./project.controller");
const multer = require("multer");

const imgconfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    callback(null, `image-${Date.now()}-${file.originalname}`);
  },
});

// img filter
const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(new Error("only images are allowed"));
  }
};

const upload = multer({
  storage: imgconfig,
  fileFilter: isImage,
});

const projectRoute = express.Router();

projectRoute.get("/", getProject);
projectRoute.post("/create", upload.single("image"), createProject);
projectRoute.get("/:id", getByIdProject);
projectRoute.patch("/:id", upload.single("image"), updateProject);
projectRoute.delete("/:id", deleteProject);

module.exports = projectRoute;