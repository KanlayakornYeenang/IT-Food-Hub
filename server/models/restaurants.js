const db = require("./db");

const getAllMenuByRestaurantId = async (rst_id) => {
  const sql = "SELECT * FROM menu WHERE rst_id = ?";
  const [rows, fields] = await db.query(sql, [rst_id]);
  return rows;
};

module.exports = {
  getAllMenuByRestaurantId,
};
