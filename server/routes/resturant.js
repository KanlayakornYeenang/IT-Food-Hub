const express = require("express");
const router = express.Router();
const verify = require("../middleware/verify");
const {restaurants} = require("../controllers/restaurants")


router.get("/getAllrestaurants", verify, restaurants.getRestaurants)

module.exports = router