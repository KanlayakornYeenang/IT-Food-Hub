const db = require("./db");
const { groupByAndSort } = require("../hook/groupByAndSort");
const { groupedCart } = require("../hook/groupedCart");

const getAllRestaurants = async () => {
  const sql = "SELECT * FROM restaurants";
  const [rows, fields] = await db.query(sql);
  return rows;
};

const getRestaurantById = async (rst_id) => {
  const sql1 = "SELECT * FROM restaurants WHERE rst_id = ?";
  const [restaurant] = await db.query(sql1, rst_id);

  const sql2 = "SELECT * FROM menu WHERE rst_id = ?";
  const [menu] = await db.query(sql2, rst_id);

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
  const sql = "SELECT * FROM restaurants where owner_id = ?";
  const [rows, fields] = await db.query(sql, [user_id]);
  return rows[0];
};

const getAllMyOrderByRstID = async (rst_id) => {
  const sql = "SELECT distinct order_id, order_status, order_total_price, rst_id, cus_id, dlv_id, order_dest, DATE_FORMAT(order_date_time, '%Y-%m-%d %H:%i:%s') `order_date_time` FROM orders\
  JOIN orders_detail USING (order_id)\
  JOIN menu USING (menu_id)\
  WHERE rst_id = ?"
  const [result] = await db.query(sql, rst_id);
  return result;
};

module.exports = {
  getAllRestaurants,
  getRestaurantById,
  getMenuById,
  getMyRestaurantByUserId,
  getAllMyOrderByRstID
};
