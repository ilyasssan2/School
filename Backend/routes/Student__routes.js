const express = require("express");
const { check, validationResult } = require("express-validator");
const MyError = require("../ErrorModal");
const Student = require("../models/Student");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const students = await Student.find();
    res.json({
      students,
    });
  } catch (error) {
    return next(new MyError("we could not fetch the students", 403));
  }
});

router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  const student = await Student.findById(id);
  if (!student) {
    return next(new MyError("there is no student with this id", 403));
  }
  res.json({
    student,
  });
});

router.delete("/:id", async (req, res, next) => {
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
});
router.post(
  "/",
  [
    check("email").notEmpty().isEmail(),
    check("firstName").notEmpty(),
    check("lastName").notEmpty(),
    check("birthday").isDate(),
  ],
  async (req, res, next) => {
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
    if (!student) return next(new MyError("something went wrong"));
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
  }
);
router.post(
  "/login",
  [check("email").notEmpty().isEmail(), check("password").isLength({ min: 6 })],
  async (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return next(new MyError("please check your inputs", 422));
    }
    const { email, password } = req.body;
    const student = await Student.findOne({ email });
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
  }
);

router.patch("/", (req, res, next) => {});
module.exports = router;
