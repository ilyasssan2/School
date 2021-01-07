const mongoose = require("mongoose");

const Groupe = new mongoose.Schema(
  {
    name: { type: String, required: true },
    filier: { type: mongoose.Types.ObjectId, ref: "Filier" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Groupe", Groupe);
