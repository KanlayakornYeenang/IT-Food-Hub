const jwt = require("jsonwebtoken");
const {
  getUserByNameAndPasword,
  getUserDetailById,
  getAllRestaurant,
  registerUser,
  getAllUser,
  updatePassword,
  insertProfilePicture,
  updateRoleUser,
} = require("../../models/users");

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

const getDetail = async (req, res) => {
  try {
    const user_id = req.user.user_id
    const result = await getUserDetailById(user_id);
    return res.json(result);
  } catch (err) {
    res.status(500).send(err);
  }
};

const registerOfUser = async (req, res) => {
  const { fname, lname, email, password } = req.body;
  try {
    const users = await getAllUser();
    //check email is not already have in database
    const findSameEmail = users.find((user) => user.user_email === email);
    if (findSameEmail) {
      res.status(500).send("your email is already in use");
    } else {
      const result = await registerUser(fname, lname, email, password);
      return res.json(result);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

const changePasswordUser = async (req, res) => {
  try {
    const newPassword = req.newPassword;
    const user_id = req.user.user_id;
    result = await updatePassword(user_id, newPassword);
    res.send({
      message: "Password updated!",
      result: result,
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

const insertPictureProfile = async (req, res) => {
  const file = req.file;

  id = 1;
  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return res.json(error);
  }
  try{
    result = await insertProfilePicture(id, file.path.substr(6))
    res.send(result)
  }catch(error){
    res.send(error)
  }
};

const changeRoleUser = async (req, res) => {
  const file = req.file;
  if (!file) {
    const error = new Error("Please upload a file");
    console.log(error);
    return res.status(404).send(error);
  }
  const user_id = req.user.user_id;
  const role = req.params.role;
  try {
    const result = await updateRoleUser(user_id, role, file.path.substr(6));
    res.send({
      message: "Role updated successfully",
      result: result,
    });
  } catch (err) {
    res.status(404).send(err);
  }
};

module.exports = {
  login,
  getDetail,
  registerOfUser,
  changePasswordUser,
  insertPictureProfile,
  changeRoleUser,
};
