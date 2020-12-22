const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const Controller = require("../controllers/Student__controllers");
router.get("/", Controller.getAll);
router.get("/:id", Controller.getById);
router.delete("/:id", Controller.deleteById);
router.post(
  "/",
  [
    check("email").notEmpty().isEmail(),
    check("firstName").notEmpty(),
    check("lastName").notEmpty(),
    check("birthday").isDate(),
  ],
  Controller.add
);
router.post(
  "/login",
  [check("email").notEmpty().isEmail(), check("password").isLength({ min: 6 })],
  Controller.login
);

router.patch(
  "/",
  [
    check("email").notEmpty().isEmail(),
    check("password").isLength({ min: 6 }),
    check("id").isMongoId(),
  ],
  Controller.update
);
module.exports = router;
