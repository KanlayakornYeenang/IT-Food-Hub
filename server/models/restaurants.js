const db = require("./db");

const getAllRestaurants = async () => {
  const sql = "select * from restaurants";
  const [rows, fields] = await db.query(sql);
  return rows;
};

const getAllMenuByRestaurantId = async (rst_id) => {
  const sql = "SELECT * FROM menu WHERE rst_id = ?";
  const [rows, fields] = await db.query(sql, [rst_id]);
  return rows;
};

module.exports = {
  getAllRestaurants,
  getAllMenuByRestaurantId,
};
