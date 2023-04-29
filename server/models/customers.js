const db = require("./db");
const { groupedCart } = require("../hook/groupedCart");

const addOrder = async (connection, order_total_price, user_id, order_dest) => {
  const sql = `INSERT INTO orders (order_total_price, cus_id, order_dest, order_date_time) VALUES (?, ?, ?, NOW())`;
  const [result] = await connection.query(sql, [order_total_price, user_id, order_dest]);
  return result;
};

const addOrderDetail = async (connection, order_id, menu_id, quantity, option_detail) => {
  const sql = `INSERT INTO orders_detail (order_id, menu_id, quantity, option_detail) VALUES (?, ?, ?, ?)`;
  const result = await connection.query(sql, [order_id, menu_id, quantity, option_detail]);
  return result;
};

const addMenuToCart = async (user_id, menu_id, quantity, item_id) => {
  const sql = `INSERT INTO cart (user_id, menu_id, quantity, item_id) VALUES (?, ?, ?, ?)`;
  const result = await db.query(sql, [user_id, menu_id, quantity, item_id]);
  return result;
};

const findCartItem = async (user_id, menu_id, item_id) => {
  const sql = `SELECT * FROM cart
  WHERE user_id = ? AND menu_id = ? AND item_id = ?`;
  const [result] = await db.query(sql, [user_id, menu_id, item_id]);
  return result[0];
};

const updateCartItemQuantity = async (cart_id, quantity) => {
  const sql = `UPDATE cart SET quantity = ? WHERE cart_id = ?`;
  const result = await db.query(sql, [quantity, cart_id]);
  return result;
};

const deleteFromCart = async (cart_id) => {
  const sql = `DELETE FROM cart WHERE cart_id = ?`;
  const result = await db.query(sql, [cart_id]);
  return result;
};

const getAllMenusInCart = async (user_id) => {
  const sql =
    "SELECT cart_id, rst_id, rst_name, menu_id, menu_name, cart.item_id, GROUP_CONCAT(menu_item.item_name ORDER BY menu_item.item_id ASC SEPARATOR ' ') `item`, IFNULL(menu_price+SUM(item_price), menu_price) `price`, quantity\
    FROM cart JOIN menu USING (menu_id) LEFT JOIN menu_item ON FIND_IN_SET(menu_item.item_id, cart.item_id)\
    JOIN restaurants USING (rst_id) WHERE user_id = ? GROUP BY (cart_id)";
  const [result] = await db.query(sql, [user_id]);
  return groupedCart(result);
};

const getOrderByParams = async (user_id, orderid) => {
  const sql =
    "select o.order_id, o.order_status, o.order_total_price, o.order_dest, me.menu_name, res.rst_name from orders o inner join orders_detail ord on (ord.order_id = o.order_id) inner join menu me on\
   (ord.menu_id = me.menu_id) inner join restaurants res on(me.rst_id = res.rst_id) where o.cus_id = ? and o.order_id = ?";
  const [rows, fields] = await db.query(sql, [user_id, orderid]);
  return rows;
};

module.exports = {
  addMenuToCart,
  findCartItem,
  updateCartItemQuantity,
  getAllMenusInCart,
  getOrderByParams,
  deleteFromCart,
  addOrder,
  addOrderDetail,
};
