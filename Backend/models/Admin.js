const mongoose = require("mongoose");

const Admin = new mongoose.Schema(
  {
    login: { type: String, required: true, minlength: 6 },
    password: { type: String, required: true, minlength: 6 },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Admin", Admin);
