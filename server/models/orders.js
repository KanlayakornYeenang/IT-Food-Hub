const db = require("./db");


//get  order that have delivery
const getOrderThatHaveDelivery = async (email)=>{
    const sql = "select o.order_id , o.order_total_price, o.order_destination, o.restaurant_name, d.customer_Fname as 'delivery_name', c.customer_Fname as 'customer_name', f.food_name from orders o left outer join customer d on (o.delivery_id = d.customerId) left outer join customer c on (o.customer_id = c.customerId) left outer join foodorder f on (f.order_id = o.order_id)  where d.customer_email = ?"
    const [rows, fields] = await db.query(sql, [email]);
    return rows
}

// get all orders
const getAllOrder = async ()=>{
    const sql = "select o.order_id,  o.order_total_price, o.order_destination, o.restaurant_name, f.food_name from orders o left outer join foodorder f on o.order_id = f.order_id where o.delivery_id is null"
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