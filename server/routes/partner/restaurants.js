const express = require("express");
const router = express.Router();
const verify = require("../../middleware/verify");
const requireRole = require("../../middleware/requireRole");
const { restaurants } = require("../../controllers/restaurants");
const upload = require("../../middleware/multer")

// for show restaurant owner
router.get("/myrestaurant", verify, restaurants.getMyRestaurant)

module.exports = router;
