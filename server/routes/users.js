const express = require("express");
const router = express.Router();
const verify = require("../middleware/verify");
const requireRole = require("../middleware/requireRole");
const { users } = require("../controllers/auth");
const upload = require("../middleware/multer");
const { customers } = require("../controllers/customers");
const {notification} = require("../controllers/notification");
// for user login
router.post("/login", users.login);

// for get user detail
router.get("/user", verify, users.getDetail);

// for register user
router.post("/register", users.registerOfUser);

// for update password
router.put("/updatepassword", verify, users.changePasswordUser);

// for upload profile picture /test
router.post(
  "/uploadprofile/:id",
  upload.single("image"),
  users.insertPictureProfile
);

// for update role
router.put(
  "/updaterole/:role",
  verify,
  upload.single("image"),
  users.changeRoleUser
);

// for create orders
router.post("/placeOrder", verify, customers.placeOrder);

// for user add to cart
router.post("/addToCart", verify, customers.addToCart);

router.get("/cart", verify, customers.createCart);

router.patch("/updateQuantity", verify, customers.updateQuantity);

router.delete("/deleteMenu", verify, customers.deleteMenu)

router.post("/placeOrder", verify, customers.placeOrder)

router.get("/myOrder", verify, customers.getAllMyOrder)

router.get("/myOrder/:order_id", verify, customers.getMyOrderByOrderId)

router.get("/notifyOrder", verify, notification.getAllNotifi)

module.exports = router;

// for get all cart items
// router.get("/getcarts", verify, customers.getCart);

// for get Order By id
// router.get(
//   "/getcheckoutbyparams/:orderID",
//   verify,
//   customers.getCheckoutByOrder
// );
