const mongoose = require("mongoose");

const Notify = new mongoose.Schema(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    groups: { type: String, default: "all" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", Notify);
