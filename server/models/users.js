const db = require("./db");

const getUserByNameAndPasword = async (email, password) => {
  const sql = "SELECT * FROM users WHERE user_email = ? AND user_password = ?";
  const [rows, fields] = await db.query(sql, [email, password]);
  return rows[0];
};

const getUserDetailById = async (user_id) => {
  const sql = "SELECT user_email, user_fname, user_lname FROM users WHERE user_id = ?";
  const [rows, fields] = await db.query(sql, [user_id]);
  return rows[0];
};

const getAllRestaurant = async () => {
  const sql = "SELECT * FROM restaurants";
  const [rows, fields] = await db.query(sql);
  return rows;
}

module.exports = { getUserByNameAndPasword, getUserDetailById, getAllRestaurant };
