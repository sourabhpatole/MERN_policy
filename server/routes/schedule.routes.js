const express = require("express");
const router = express.Router();
const controller = require("../controller/Schedule.controller");

router.post("/schedule", controller.createSchedule);

module.exports = router;
