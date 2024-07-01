const express = require("express");
const {
  getMessage,
  createMessage,
  getByIdMessage,
  deleteMessage,
  openByIdMessage,
} = require("./message.controller");

const messageRoute = express.Router();

messageRoute.get("/", getMessage);
messageRoute.post("/addMessage", createMessage);
messageRoute.get("/:id", getByIdMessage);
messageRoute.put("/:id", openByIdMessage);
messageRoute.delete("/:id", deleteMessage);

module.exports = messageRoute;
