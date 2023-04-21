const express = require("express");
const router = express.Router();
const verify = require("../middleware/verify");
const requireRole = require("../middleware/requireRole");
const { restaurants } = require("../controllers/restaurants");
const upload = require("../middleware/multer")

// for get user detail
router.get("/:rst_id", restaurants.getAllMenu);

module.exports = router;
