const express = require("express");
const router = express.Router();
const verify = require("../middleware/verify");
const requireRole = require("../middleware/requireRole");
const { users } = require("../controllers/auth");
const { customers } = require("../controllers/customers/index");
const upload = require("../middleware/multer");

// for user login
router.post("/login", users.login);

// for get user detail
router.get("/user", verify, users.getDetail);

// for send all restaurants to user
router.get("/itfoodhub", verify, users.getRestaurant);

// for register user
router.post("/register", users.registerOfUser);

// for update password
router.put("/updatepassword", verify, users.changePasswordUser);

router.post("/addToCart", verify, customers.addToCart)

router.get("/cart",verify, customers.cart)

// for upload profile picture /test
router.post(
  "/uploadprofile",
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

<<<<<<< HEAD
=======
// for create orders
router.post("/placeOrder", verify, customer.placeOrder);

// for get all cart items
router.get("/getcarts", verify,customer.getCart)

// for get items in checkout
router.get("/getcheckoutbyparams/:orderId", verify, customer.getCheckOutByparams)

>>>>>>> 5e5ac7a814ae58ad68ad4c04ce6fc6cb7d949ff3
module.exports = router;
