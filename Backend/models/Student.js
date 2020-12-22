const mongoose = require("mongoose");

const Student = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    lastName: { type: String, required: true },
    groupe: { type: mongoose.Types.ObjectId, ref: "Group" },
    phone: { type: String },
    image: { type: String },
    birthday: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Student", Student);
