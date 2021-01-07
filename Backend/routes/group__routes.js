const express = require("express");
const { check } = require("express-validator");
const {
  getAll,
  add,
  deleteById,
} = require("../controllers/Group__controllers");

const router = express.Router();

router.get("/", getAll);

router.post(
  "/",
  [check("name").notEmpty(), check("filier").notEmpty().isMongoId()],
  add
);
router.delete("/:id", deleteById);
module.exports = router;
