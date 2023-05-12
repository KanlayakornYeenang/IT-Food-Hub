const express = require("express");
const router = express.Router();
const verify = require("../middleware/verify");
const requireRole = require("../middleware/requireRole");
const { restaurants } = require("../controllers/restaurants");
const upload = require("../middleware/multer")

// ร้านอาหารทั้งหมด
router.get("/getAllRestaurants", verify, restaurants.getRestaurants)

// ดูร้านอาหารนั้น ๆ
router.get("/:rst_id", verify, restaurants.getRestaurant);

// เมนูในร้านอาหารนั้น ๆ
router.get("/:rst_id/:menu_id", verify, restaurants.getMenu);

module.exports = router;
