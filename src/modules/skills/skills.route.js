const express = require("express");
const {
  getSkills,
  createSkills,
  getByIdSkills,
  deleteSkills,
} = require("./skills.controller");

const skillRoute = express.Router();

skillRoute.get("/", getSkills);
skillRoute.post("/addSkill", createSkills);
skillRoute.get("/skill/:id", getByIdSkills);
skillRoute.delete("/skill/:id", deleteSkills);

module.exports = skillRoute;
