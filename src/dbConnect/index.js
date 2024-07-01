const mongoose = require("mongoose");
require("dotenv").config();
const URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ufdfn.mongodb.net/resume`;
const connectionDB = async () => {
  try {
    await mongoose.connect(URL);
    console.log("connected with database");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectionDB;
