const db = require("./db");
const { groupedCart } = require("../hook/groupedCart");

// const getAllOrderThatNotDelivered = async () => {
//   const sql =
//     "select o.order_id, o.order_status, o.order_total_price, o.order_dest, o.dlv_id, me.menu_name, res.rst_name, u.user_fname, u.user_phone from orders o inner join orders_detail ord on (ord.order_id = o.order_id) inner join menu me on\
//    (ord.menu_id = me.menu_id) inner join restaurants res on(me.rst_id = res.rst_id) inner join users u on(o.cus_id = u.user_id) where o.dlv_id is null";
//   const [rows, fields] = await db.query(sql);
//   return rows;
// };

// const gerOrderThatUserIsDelivered = async (user_id) => {
//   const sql =
//     "select o.order_id, o.order_status, o.order_total_price, o.order_dest, o.dlv_id, me.menu_name, res.rst_name, u.user_fname, u.user_phone from orders o inner join orders_detail ord on (ord.order_id = o.order_id) inner join menu me on\
//   (ord.menu_id = me.menu_id) inner join restaurants res on(me.rst_id = res.rst_id) inner join users u on(o.cus_id = u.user_id) where o.dlv_id = ?";
//   const [rows, fields] = await db.query(sql, user_id)
//   console.log(rows);
//   return rows
// }

// update orders to order_delivery = user ที่รับ order
const updateDelivery_order = async (delivery_id, order_id) => {
  const sql = "update orders set dlv_Id = ? where order_id = ?;";
  const [rows, fields] = await db.query(sql, [delivery_id, order_id]);
  return rows;
};
// create order
// const createOrder = async () => {

// };

const getAllCarts = async (user_id) => {
  const sql =
    "select o.order_id, o.order_status, o.order_total_price, o.order_dest, me.menu_name, res.rst_name from orders o inner join orders_detail ord on (ord.order_id = o.order_id) inner join menu me on\
   (ord.menu_id = me.menu_id) inner join restaurants res on(me.rst_id = res.rst_id) where o.cus_id = ?";
  const [rows, fields] = await db.query(sql, user_id);
  return rows;
};

const updateOrderStatus_sql = async (order_id, order_status) => {
  const sql = "update orders set order_status = ? where order_id = ?";
  const [rows, fields] = await db.query(sql, [order_status, order_id]);
  return rows;
};

const showState = async (order_id) => {
  const sql = "select order_status from orders where order_id = ?";
  const [rows, fields] = await db.query(sql, order_id);
  return rows;
};

const isOrderReceived = async (user_id) => {
  const sql = "SELECT * FROM orders WHERE dlv_id = ? and order_status != 3";
  const [rows, fields] = await db.query(sql, user_id);
  return rows;
}

const getAllOrder = async () => {
  const sql =
    "SELECT * FROM orders\
  JOIN orders_detail\
  USING (order_id)\
  JOIN menu\
  USING (menu_id)\
  JOIN restaurants\
  USING (rst_id) WHERE dlv_id is null";
  const [rows, fields] = await db.query(sql);
  return rows;
};

const getMyDeliveryByDeliveryId = async (user_id) => {
  const sql =
    "SELECT cus_id, user_fname, user_lname, user_phone, rst_id, menu_id, order_id, order_status, order_total_price, cus_id, dlv_id, order_dest, order_date_time, order_detail_id, quantity, GROUP_CONCAT(menu_item.item_name ORDER BY menu_item.item_id ASC SEPARATOR ' ') `item`, menu_name, menu_cat, menu_desc, ifnull(sum(menu_item.item_price), menu_price) as price, owner_id, rst_name, rst_locat\
    FROM orders\
    JOIN orders_detail USING (order_id)\
    JOIN menu USING (menu_id)\
    JOIN restaurants USING (rst_id)\
    LEFT JOIN menu_item ON FIND_IN_SET(menu_item.item_id, option_detail) > 0\
    JOIN users ON users.user_id = orders.cus_id\
    WHERE dlv_id = ?\
    GROUP BY (order_detail_id)";
  const [rows, fields] = await db.query(sql, user_id);

  const customer = { user_fname: rows[0].user_fname, user_lname: rows[0].user_lname, user_phone: rows[0].user_phone };

  const order = {
    order_id: rows[0].order_id,
    order_status: rows[0].order_status,
    order_total_price: rows[0].order_total_price,
    order_dest: rows[0].order_dest,
  };
  const restaurant = groupedCart(rows);

  return { order: order, customer: customer, restaurant: restaurant };
};

module.exports = {
  // getAllOrderThatNotDelivered,
  updateDelivery_order,
  // createOrder,
  getAllCarts,
  updateOrderStatus_sql,
  showState,
  // gerOrderThatUserIsDelivered,
  getAllOrder,
  getMyDeliveryByDeliveryId,
  isOrderReceived
};
