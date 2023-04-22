const express = require("express");
const router = express.Router();
const verify = require("../middleware/verify");
const requireRole = require("../middleware/requireRole");
const { restaurants } = require("../controllers/restaurants");
const upload = require("../middleware/multer")

// for get user detail
router.get("/getAllRestaurants", verify, restaurants.getRestaurants)
router.get("/:rst_id", verify, restaurants.getRestaurant);
router.get("/:rst_id/:menu_id", verify, restaurants.getMenu);

module.exports = router;
