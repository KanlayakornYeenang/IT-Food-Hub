const express = require("express");
const router = express.Router();
const verify = require("../../middleware/verify");
const requireRole = require("../../middleware/requireRole");
const { restaurants } = require("../../controllers/restaurants");
const upload = require("../../middleware/multer")

// for show restaurant owner
router.get("/myrestaurant", verify, restaurants.getMyRestaurant)

router.post("/createMenu", verify,upload.single("file"), restaurants.createMenu)

router.patch("/editMenu", verify, restaurants.editMenu)

router.delete("/deleteItem", verify, restaurants.deleteItems)

router.delete("/deleteOption", verify, restaurants.deleteOptions)

router.post("/addOption", verify, restaurants.createOption)

router.post("/addItem", verify, restaurants.createItem)

router.delete("/deleteMenu", verify, restaurants.deleteMenu)

module.exports = router;
