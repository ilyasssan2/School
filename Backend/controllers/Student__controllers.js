const MyError = require("../ErrorModal");
const Student = require("../models/Student");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const getAll = async (req, res, next) => {
  try {
    const students = await Student.find().populate("groupe");
    res.json({
      students,
    });
  } catch (error) {
    return next(new MyError("we could not fetch the students", 403));
  }
};
const getById = async (req, res, next) => {
  const id = req.params.id;
  const student = await Student.findById(id).populate("groupe");
  if (!student) {
    return next(new MyError("there is no student with this id", 403));
  }
  res.json({
    student,
  });
};
const deleteById = async (req, res, next) => {
  const id = req.params.id;
  const student = await Student.findById(id);
  if (!student) {
    return next(new MyError("there is no student with this id", 403));
  }
  try {
    await student.delete();
    res.json({
      message: "Student deleted",
    });
  } catch (error) {
    res.json({
      message: "we could not delete the Student , please try again",
    });
  }
};
const add = async (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return next(new MyError("please check your inputs", 422));
  }
  const {
    email,
    firstName,
    lastName,
    groupe,
    phone,
    birthday,
    image,
  } = req.body;
  let password = Math.random().toString(36).substring(7);

  try {
    const student = await Student.create({
      email,
      firstName,
      lastName,
      groupe,
      phone,
      password,
      birthday,
      image,
    });
    res.json({
      student,
    });
  } catch (error) {
    return next(new MyError("something went wrong"));
  }
};

const login = async (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return next(new MyError("please check your inputs", 422));
  }
  const { email, password } = req.body;
  const student = await Student.findOne({ email }).populate("groupe");
  // const validation = await bcrypt.compare(password, student.password);
  if (!student || password !== student.password) {
    return next(new MyError("please check your inputs", 422));
  }
  let token;
  token = jwt.sign(
    { id: student._id, email: student.email },
    process.env.SECRET__KEY,
    { expiresIn: "1h" }
  );
  res.json({
    student,
    token,
  });
};
const update = async (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return next(new MyError("please check your inputs", 422));
  }
  const {
    email,
    firstName,
    lastName,
    groupe,
    phone,
    birthday,
    image,
    id,
  } = req.body;
  const student = await Student.findByIdAndUpdate(id, {
    email,
    firstName,
    lastName,
    groupe,
    phone,
    birthday,
    image,
  });
  res.json({
    message: "student updated",
  });
};
exports.getAll = getAll;
exports.update = update;
exports.login = login;
exports.getById = getById;
exports.deleteById = deleteById;
exports.add = add;
