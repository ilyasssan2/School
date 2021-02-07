const { validationResult } = require("express-validator");
const Groupe = require("../models/Groupe");
const getAll = async (req, res, next) => {
  const groupes = await Groupe.find().populate("filier");

  res.json({
    groupes,
  });
};
const deleteById = async (req, res, next) => {
  const id = req.params.id;
  await Groupe.findByIdAndDelete(id);
  res.json({
    message: "groupe deleted",
  });
};
const add = async (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.json({
      message: "error",
    });
  }
  const { name, filier } = req.body;
  const newGroupe = await Groupe.create({ name, filier });

  res.json({
    message: "groupe added",
  });
};

exports.getAll = getAll;
exports.add = add;
exports.deleteById = deleteById;
