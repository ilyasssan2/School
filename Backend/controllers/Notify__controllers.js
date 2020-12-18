const { validationResult } = require("express-validator");
const Notify = require("../models/Notify");
const getAll = async (req, res, next) => {
  const notify = await Notify.find();

  res.json({
    notifications: notify,
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
  const newNotification = await Notify.create({ groups, title, message });

  res.json({
    newNotification,
  });
};

exports.getAll = getAll;
exports.add = add;
