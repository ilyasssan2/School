const express = require("express");
const { check } = require("express-validator");
const {
  getAll,
  add,
  deleteById,
} = require("../controllers/Filier__controllers");

const router = express.Router();

router.get("/", getAll);

router.post("/", [check("name").notEmpty()], add);
router.delete("/:id", deleteById);
module.exports = router;
