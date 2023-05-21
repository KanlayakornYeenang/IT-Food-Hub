const jwt = require("jsonwebtoken");
const { getUserByNameAndPasword } = require("../../models/users");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await getUserByNameAndPasword(email, password);

    if (result) {
      const user = result;
      const token = jwt.sign(
        {
          user_id: user.user_id,
          user_role: user.user_role,
          user_email: user.user_email,
        },
        "mySecretKey",
        {
          expiresIn: "1d",
        }
      );
      return res.json({
        success: true,
        message: "Login successful",
        token,
        user_detail: user,
      });
    }
    return res
      .status(401)
      .json({ success: false, message: "Invalid email or password" });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = login;
