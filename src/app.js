const express = require("express");
const cors = require("cors");
const projectRoute = require("./modules/projects/project.route");
const routerUser = require("./modules/user/user.route");
const skillRoute = require("./modules/skills/skills.route");
const messageRoute = require("./modules/message/message.route");
const addressRoute = require("./modules/address/address.route");
const socialRoute = require("./modules/socialLink/socialLink.route");
require("dotenv").config();
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./uploads"));

app.use("/api/address", addressRoute);
app.use("/api/project", projectRoute);
app.use("/api/user", routerUser);
app.use("/api/skill", skillRoute);
app.use("/api/message", messageRoute);
app.use("/api/socialLink", socialRoute);

app.use("/", (req, res) => {
  res.send({ message: "Hello, responded!!" });
});

module.exports = app;
