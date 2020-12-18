const express = require("express");
const { check } = require("express-validator");
const { getAll, add } = require("../controllers/Notify__controllers");

const router = express.Router();

router.get("/", getAll);

router.post("/", [check("title").notEmpty(), check("message").notEmpty()]), add;

module.exports = router;
