const mongoose = require("mongoose");
const addressSchema = new mongoose.Schema(
  {
    permanentAdd: {
      type: String,
      required: true,
    },
    temporaryAdd: {
      type: String,
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

const Address = mongoose.model("address", addressSchema);

module.exports = Address;
