const gropMenu = (orders)=>{
    const orderGrouped = orders.reduce((acc, order)=>{
        const{order_id,order_total_price,order_destination,restaurant_name, customer_name} = order
        const food_name = [order.food_name];
        const existingOrder = acc.find(o => o.order_id === order_id);
        if (existingOrder) {
            existingOrder.food_name.push(order.food_name);
        } else {
            acc.push({ order_id, customer_name, food_name, order_destination,  order_total_price ,restaurant_name});
        }
        return acc
    }, [])
    return orderGrouped
}

module.exports = {gropMenu}