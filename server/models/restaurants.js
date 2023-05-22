const db = require("./db");
const { groupByAndSort } = require("../hook/groupByAndSort");
const { groupedCart } = require("../hook/groupedCart");

const getAllRestaurants = async () => {
  const sql = "SELECT r.*,IFNULL(i.file_path, null) AS file_path FROM restaurants r LEFT JOIN image i on(r.rst_id = i.restaurant_id)";
  const [rows, fields] = await db.query(sql);
  return rows;
};

const getRestaurantById = async (rst_id) => {
  const sql1 = "SELECT * FROM restaurants WHERE rst_id = ?";
  const [restaurant] = await db.query(sql1, rst_id);

  const sql2 = "SELECT * ,IFNULL(file_path, null) AS file_path FROM menu LEFT JOIN image using (menu_id) WHERE rst_id = ?";
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
  const sql =
    "SELECT distinct order_id, order_status, order_total_price, rst_id, cus_id, dlv_id, order_dest, DATE_FORMAT(order_date_time, '%Y-%m-%d %H:%i:%s') `order_date_time` FROM orders\
  JOIN orders_detail USING (order_id)\
  JOIN menu USING (menu_id)\
  WHERE rst_id = ?";
  const [result] = await db.query(sql, rst_id);
  return result;
};

const getOrderDetailByOrderID = async (order_id, rst_id) => {
  const sql =
    "SELECT rst_id, rst_name, menu_id, menu_name, menu_desc, menu_price, GROUP_CONCAT(menu_item.item_name ORDER BY menu_item.item_id ASC SEPARATOR ' ') `item`, quantity, IFNULL(menu_price+SUM(item_price), menu_price) `price`\
  FROM orders\
  JOIN orders_detail USING (order_id)\
  JOIN menu USING (menu_id)\
  LEFT JOIN menu_item ON FIND_IN_SET(menu_item.item_id, option_detail)\
  JOIN restaurants USING (rst_id)\
  WHERE order_id = ? and rst_id = ?\
  GROUP BY rst_id, menu_id, quantity";
  const [result] = await db.query(sql, [order_id, rst_id]);
  return groupedCart(result)[0].menu;
};

const insertMenu = async (
  rst_id,
  menu_name,
  menu_desc,
  menu_cat,
  menu_price
) => {
  const sql =
    "INSERT INTO menu(rst_id, menu_name, menu_cat, menu_desc, menu_price) VALUES(?, ?, ?, ?, ?)";
  const [result] = await db.query(sql, [
    rst_id,
    menu_name,
    menu_cat,
    menu_desc,
    menu_price,
  ]);
  return result;
};

const insertMenuOption = async (
  menu_id,
  option_name,
  option_type,
  max_optional
) => {
  const sql =
    "INSERT INTO menu_option(menu_id, option_name, option_type, max_optional) VALUES(?, ?, ?, ?)";
  const [result] = await db.query(sql, [
    menu_id,
    option_name,
    option_type,
    max_optional,
  ]);
  return result;
};

const insertMenuItem = async (option_id, item_name, item_price) => {
  const sql =
    "INSERT INTO menu_item(option_id, item_name, item_price) VALUES(?, ?, ?)";
  const [result] = await db.query(sql, [option_id, item_name, item_price]);
  return result;
};
const getMenuItem = async (menu_name, rst_id) =>{
  const sql =
  "select menu_id from menu where menu_name = ? and rst_id = ?";
const [result] = await db.query(sql, [menu_name, rst_id]);
return result;
}
const insertPicMenu = async(file_path, picture_type, menu_id)=>{
  const sql =
  "INSERT INTO image(file_path, picture_type, menu_id) VALUES(?, ?, ?)";
  const [result] = await db.query(sql, [file_path, picture_type, menu_id]);
  return result;
}

module.exports = {
  getAllRestaurants,
  getRestaurantById,
  getMenuById,
  getMyRestaurantByUserId,
  getAllMyOrderByRstID,
  getOrderDetailByOrderID,
  insertMenu,
  insertMenuOption,
  insertMenuItem,
  insertPicMenu,
  getMenuItem
};
