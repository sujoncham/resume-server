const mongoose = require("mongoose");
const skillSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: [true, "already exist this title"],
    },
    technologies: {
      type: Array,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Skills = mongoose.model("Skill", skillSchema);

module.exports = Skills;
