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

module.exports = router;
