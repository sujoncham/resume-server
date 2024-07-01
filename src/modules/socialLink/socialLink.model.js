const mongoose = require("mongoose");
const socialSchema = new mongoose.Schema(
  {
    facebook: {
      type: String,
      required: true,
    },
    instagram: {
      type: String,
      required: true,
    },
    linkedIn: {
      type: String,
      required: true,
    },
    github: {
      type: String,
      required: true,
    },
    twitter: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestampts: true,
  }
);

const SocialLink = mongoose.model("SocialLink", socialSchema);

module.exports = SocialLink;
