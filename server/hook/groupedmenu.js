const gropMenu = (orders)=>{

  // Use reduce method to group the orders by restaurant name
  const result = Object.values(orders.reduce((acc, { order_id, order_status, order_total_price, order_dest, menu_name, rst_name ,user_fname,user_phone, cus_id, dlv_id}) => {
    if (!acc[order_id]) {
      acc[order_id] = { order_id, order_status, order_total_price, order_dest, rst_name: {}, user_fname,user_phone, cus_id, dlv_id};
    }
  
    if (!acc[order_id].rst_name[rst_name]) {
      acc[order_id].rst_name[rst_name] = [];
    }
  
    acc[order_id].rst_name[rst_name].push(menu_name);
  
    return acc;
  }, {}));
  return result;
}



module.exports = {gropMenu}