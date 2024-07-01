const express = require("express");
const {
  getAddress,
  createAddress,
  getByIdAddress,
  deleteAddress,
} = require("./address.controller");

const addressRoute = express.Router();

addressRoute.get("/", getAddress);
addressRoute.post("/createAddress", createAddress);
addressRoute.get("/:id", getByIdAddress);
addressRoute.delete("/:id", deleteAddress);

module.exports = addressRoute;
