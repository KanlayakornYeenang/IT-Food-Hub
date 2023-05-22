const express = require("express");
const router = express.Router();
const verify = require("../middleware/verify");
const { login, user } = require("../controllers/users");
const upload = require("../middleware/multer");
const { customers } = require("../controllers/customers");
const { notification } = require("../controllers/notification");

// for user login
router.post("/login", login);

// for get user detail
router.get("/user", verify, user.getDetail);

// for register user
router.post("/register", user.registerOfUser);

// for update password
router.put("/updatepassword", verify, user.changePasswordUser);

// for update email
router.put("/updateemail", verify, user.changeEmail);

// for update phone
router.put("/updatephone", verify, user.changePhone);

// for upload profile picture /test
router.post(
  "/uploadprofile/:id",
  upload.single("image"),
  user.insertPictureProfile
);

// for register merchant
router.post("/registermerchant",verify, upload.single("file"), user.registermerchant)

// for update role
router.put(
  "/updaterole/:role",
  verify,
  upload.single("image"),
  user.changeRoleUser
);

// for create orders
router.post("/placeOrder", verify, customers.placeOrder);

// for user add to cart
router.post("/addToCart", verify, customers.addToCart);

router.get("/cart", verify, customers.createCart);

router.patch("/updateQuantity", verify, customers.updateQuantity);

router.delete("/deleteMenu", verify, customers.deleteMenu);

router.post("/placeOrder", verify, customers.placeOrder);

router.get("/myOrder", verify, customers.getAllMyOrder);

router.get("/myOrder/:order_id", verify, customers.getMyOrderByOrderId);

router.get("/notifyOrder", verify, notification.getAllNotifi);

module.exports = router;
