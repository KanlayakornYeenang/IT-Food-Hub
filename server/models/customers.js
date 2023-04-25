const db = require("./db");

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

const getAllMenusInCart = async (user_id) => {
  const sql = "SELECT rst_id, rst_name, menu_name, GROUP_CONCAT(menu_item.item_name ORDER BY menu_item.item_id ASC SEPARATOR ' ') `item`, IFNULL(menu_price+SUM(item_price)*quantity, menu_price) `total_price`, quantity\
  FROM cart JOIN menu USING (menu_id) LEFT JOIN menu_item ON FIND_IN_SET(menu_item.item_id, cart.item_id)\
  JOIN restaurants USING (rst_id) WHERE user_id = ? GROUP BY (cart_id)";
  const [result] = await db.query(sql, [user_id]);
  return result;
}

module.exports = {
  addMenuToCart,
  findCartItem,
  updateCartItemQuantity,
  getAllMenusInCart
};
