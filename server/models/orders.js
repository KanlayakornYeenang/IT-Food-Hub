const db = require("./db");

const getAllOrderThatNotDelivered = async () => {
  const sql = "select * from orders where dlv_id is null";
  const [rows, fields] = await db.query(sql);
  return rows;
};

// update orders to order_delivery = user ที่รับ order
const updateDelivery_order = async (delivery_id, order_id) => {
  const sql = "update orders set delivery_id = ? where order_id = ?;";
  const [rows, fields] = await db.query(sql, [delivery_id, order_id]);
  return rows;
};
// create order
const createOrder = async () => {
  //
};

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
  const sql = "select status from orders where order_id = ?";
  const [rows, fields] = await db.query(sql, [order_status, order_id]);
  return rows;
};

module.exports = {
  getAllOrderThatNotDelivered,
  updateDelivery_order,
  createOrder,
  getAllCarts,
  updateOrderStatus_sql,
  showState,
};
