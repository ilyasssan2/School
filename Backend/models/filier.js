const mongoose = require("mongoose");

const Filier = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Filier || mongoose.model("Filier", Filier);
