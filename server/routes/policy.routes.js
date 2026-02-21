const express = require("express");
const multer = require("multer");
const router = express.Router();
const controller = require("../controller/policy.controller");

const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), controller.uploadFile);
router.get("/search", controller.searchPolicy);
router.get("/aggregate", controller.aggregatePolicy);

module.exports = router;
