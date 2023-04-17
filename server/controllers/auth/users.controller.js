const jwt = require("jsonwebtoken");
const {
  getUserByNameAndPasword,
  getUserDetailById,
  getAllRestaurant,
} = require("../../models/users");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await getUserByNameAndPasword(email, password);

    if (result) {
      const user = result;
      const token = jwt.sign(
        { user_id: user.user_id, user_role: user.user_role },
        "mySecretKey",
        {
          expiresIn: "1d",
        }
      );
      return res.json({ success: true, message: "Login successful", token });
    }
    return res
      .status(401)
      .json({ success: false, message: "Invalid email or password" });
  } catch (error) {
    res.status(500).send(error);
  }
};

const getDetail = async (req, res) => {
  try {
    const user_id = req.user.user_id
    const result = await getUserDetailById(user_id);
    return res.json(result);
  } catch (err) {
    res.status(500).send(err);
  }
}

const getRestaurant = async (req, res) => {
  try {
    const result = await getAllRestaurant();
    return res.json(result);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = { login, getDetail, getRestaurant };
