const express = require("express");
const {
  getSocialLink,
  createSocialLink,
  deleteSocialLink,
} = require("./socialLink.controller");

const socialRoute = express.Router();

socialRoute.get("/", getSocialLink);
socialRoute.post("/socialLinkAdd", createSocialLink);
socialRoute.delete("/:id", deleteSocialLink);

module.exports = socialRoute;
