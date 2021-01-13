const MyError = require("../ErrorModal");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const Admin = require("../models/Admin");

const getAll = async (req, res, next) => {
  try {
    const admins = await Admin.find();
    res.json({
      admins,
    });
  } catch (error) {
    return next(new MyError("we could not fetch the admins", 403));
  }
};

const deleteById = async (req, res, next) => {
  const id = req.params.id;
  const admin = await Admin.findById(id);
  if (!admin) {
    return next(new MyError("there is no student with this id", 403));
  }
  try {
    await Admin.findByIdAndDelete(id);
    res.json({
      message: "Student deleted",
    });
  } catch (error) {
    res.json({
      message: "we could not delete the admin , please try again",
    });
  }
};
const add = async (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return next(new MyError("please check your inputs", 422));
  }
  const { login, password } = req.body;
  const salt = await bcrypt.genSalt();
  const newPass = await bcrypt.hashSync(password, salt);
  const admin = await Admin.create({
    login,
    password: newPass,
  });
  if (!admin) return next(new MyError("something went wrong"));
  let token;
  token = jwt.sign(
    { id: admin._id, login: admin.login },
    process.env.ADMIN__KEY,
    { expiresIn: "3h" }
  );
  res.json({
    admin,
    token,
  });
};

const login = async (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return next(new MyError("please check your inputs", 422));
  }
  const { login, password } = req.body;
  const admin = await Admin.findOne({ login });
  const validation = await bcrypt.compare(password, admin.password);
  if (!admin || !validation) {
    return next(new MyError("please check your inputs hh", 422));
  }
  let token;
  token = jwt.sign(
    { id: admin._id, login: Admin.login },
    process.env.SECRET__KEY,
    { expiresIn: "1h" }
  );
  res.json({
    admin,
    token,
  });
};

exports.getAll = getAll;
exports.login = login;
exports.deleteById = deleteById;
exports.add = add;
