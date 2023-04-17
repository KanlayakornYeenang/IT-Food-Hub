const express = require("express");
const router = express.Router();
const verify = require("../middleware/verify");
const requireRole = require("../middleware/requireRole");
const { users } = require("../controllers/auth");

// for user login
router.post("/login", users.login);

// for get user detail
router.get("/user", verify, users.getDetail);

// for send all restaurants to user
router.get("/itfoodhub", verify, users.getRestaurant);

module.exports = router;
