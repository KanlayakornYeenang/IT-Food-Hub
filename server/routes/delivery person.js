const express = require("express");
const router = express.Router();
const verify = require("../middleware/verify");
const requireRole = require("../middleware/requireRole");
const {delivery} = require("../controllers/delivery")

// show all orders for delivery 
router.get("/getOrder", verify, delivery.viewOrder)

// for delivery to accept order
router.put("/acceptOrderDelivery/:id", verify, delivery.updateDeliveryOrder)

router.get("/myorder", verify, delivery.viewOrderThatUserIsDelivered)

module.exports = router;