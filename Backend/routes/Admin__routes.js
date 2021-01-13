const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const Controller = require("../controllers/Admin__controllers");
router.get("/", Controller.getAll);
router.delete("/:id", Controller.deleteById);
router.post(
  "/",
  [
    check("login").notEmpty().isLength({ min: 6 }),
    check("password").notEmpty().isLength({ min: 6 }),
  ],
  Controller.add
);
router.post(
  "/login",
  [
    check("login").notEmpty().isLength({ min: 6 }),
    check("password").isLength({ min: 6 }),
  ],
  Controller.login
);

module.exports = router;
