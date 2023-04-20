const db = require("./db");


//get  order that have delivery
const getOrderThatHaveDelivery = async (email)=>{
    const sql = "select o.order_id,  o.order_total_price, o.order_destination, o.restaurant_name, f.food_name, u.user_fname as 'customer_name' from orders o left outer join foodorder f on (o.order_id = f.order_id) left outer join users u on (o.customer_id = u.user_id ) left outer join users  d on (d.user_id = o.delivery_id)  where d.user_email = ?"
    const [rows, flelds] = await db.query(sql, email)
    return rows
}

// get all orders
const getAllOrder = async ()=>{
    const sql = "select o.order_id,  o.order_total_price, o.order_destination, o.restaurant_name, f.food_name, u.user_fname as 'customer_name' from orders o left outer join foodorder f on (o.order_id = f.order_id) left outer join users u on (o.customer_id = u.user_id )where o.delivery_id is null"
    const [rows, fields] = await db.query(sql)
    return rows
}

// update orders to order_delivery = user ที่รับ order

const updateDelivery_order = async (delivery_id, order_id)=>{
    const sql = "update orders set delivery_id = ? where order_id = ?;"
    const [rows, fields] = await db.query(sql, [delivery_id, order_id])
    return rows
}

module.exports = {getOrderThatHaveDelivery, getAllOrder, updateDelivery_order}