const express = require("express");

const {
  getAllUsers,
  signup,
  login,
  accountDelete,
  getProfileById,
  getTitleById,
  getDescriptionById,
} = require("./user.controller");

const routerUser = express.Router();

routerUser.get("/", getAllUsers);
routerUser.post("/signup", signup).post("/login", login);
routerUser.get("/profile/:id", getProfileById);
routerUser.put("/title/:id", getTitleById);
routerUser.put("/description/:id", getDescriptionById);
routerUser.delete("/deleteAccount/:id", accountDelete);

module.exports = routerUser;
