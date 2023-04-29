const db = require("./db");
const { groupByAndSort } = require("../hook/groupByAndSort");

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
  return {
    restaurant: restaurant[0],
    category: groupByAndSort(menu, "menu_cat", "menu_id"),
  };
};

const getMenuById = async (menu_id) => {
  const sql =
    "SELECT * FROM menu_option JOIN menu_item USING (option_id) WHERE menu_id = ?";
  const [rows, fields] = await db.query(sql, [menu_id]);
  return rows;
};

const getMyRestaurantByUserId = async (user_id) => {
  const sql =
    "SELECT * FROM restaurants where owner_id = ?";
  const [rows, fields] = await db.query(sql, [user_id]);
  return rows[0];
}

module.exports = {
  getAllRestaurants,
  getRestaurantById,
  getMenuById,
  getMyRestaurantByUserId
};
