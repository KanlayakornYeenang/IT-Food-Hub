const express = require("express");
const router = express.Router();
const verify = require("../middleware/verify");
const requireRole = require("../middleware/requireRole");
const {delivery} = require("../controllers/delivery")


router.get("/getOrder", verify,delivery.getOrder)
router.put("/updateOrderDelivery/:id", verify,delivery.updateDeliveryOrder)
module.exports = router;