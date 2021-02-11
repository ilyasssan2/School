const { validationResult } = require("express-validator");
const Notify = require("../models/Notify");
const getAll = async (req, res, next) => {
  const notify = await Notify.find().sort({ createdAt: -1 });

  res.json({
    notifications: notify,
  });
};
const deleteById = async (req, res, next) => {
  const id = req.params.id;
  await Notify.findByIdAndDelete(id);
  res.json({
    message: "notification deleted",
  });
};
const add = async (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.json({
      message: "error",
    });
  }
  const { groups, title, message } = req.body;
  await Notify.create({ groups, title, message });

  res.json({
    message: "Alerts added",
  });
};

exports.getAll = getAll;
exports.add = add;
exports.deleteById = deleteById;
