const express = require("express");
const Students = require("../models/Student");
const Groupes = require("../models/Groupe");
const Filiers = require("../models/filier");
const router = express.Router();

router.get("/", async (req, res, next) => {
  const students = await (await Students.find()).length;
  const groupes = await (await Groupes.find()).length;
  const filiers = await (await Filiers.find()).length;

  res.json({
    students,
    groupes,
    filiers,
  });
});

module.exports = router;
