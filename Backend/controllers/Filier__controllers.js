const { validationResult } = require("express-validator");
const MyError = require("../ErrorModal");
const Filier = require("../models/Filier");
const getAll = async (req, res, next) => {
  const filiers = await Filier.find();

  res.json({
    filiers,
  });
};
const deleteById = async (req, res, next) => {
  const id = req.params.id;
  await Filier.findByIdAndDelete(id);
  res.json({
    message: "Filier deleted",
  });
};
const add = async (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return next(new MyError("fileds not valid", 401));
  }
  const { name } = req.body;
  await Filier.create({ name });

  res.json({
    message: "filier added",
  });
};

exports.getAll = getAll;
exports.add = add;
exports.deleteById = deleteById;
