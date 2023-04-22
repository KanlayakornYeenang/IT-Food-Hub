const db = require("./db");

const getAllRestaurants = async () => {
  const sql = "SELECT * FROM restaurants";
  const [rows, fields] = await db.query(sql);
  return rows;
};

const getRestaurantById = async (rst_id) => {
  const sql1 = "SELECT * FROM restaurants WHERE rst_id = ?";
  const [restaurant] = await db.query(sql1, [rst_id]);
  const sql2 = "SELECT * FROM menu WHERE rst_id = ?";
  const [menu] = await db.query(sql2, [rst_id]);
  return { restaurant: restaurant[0], menu: menu };
};

const getMenuById = async (menu_id) => {
  const sql = "SELECT * FROM menu_option JOIN menu_item USING (option_id) WHERE menu_id = ?";
  const [rows, fields] = await db.query(sql, [menu_id]);
  return rows;
}

module.exports = {
  getAllRestaurants,
  getRestaurantById,
  getMenuById
};
