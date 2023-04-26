const { createOrder, getAllCarts } = require("../../models/orders");
const { getOrderByParams} = require("../../models/customers")
const  { gropMenu } = require("../../hook/groupedmenu")
const placeOrder = async (req, res) => {
  //
};
const getCart = async (req, res) => {
  const user_id = req.user.user_id
  try{
    const result = await getAllCarts(user_id);
    const cartGroped = gropMenu(result)
    res.status(200).json(cartGroped)
  }catch(err){
    res.send(err)
  }
}
const getCheckoutByOrder = async (req, res) => {
  const user_Id = req.user.user_id
  const order_id = req.params.orderID
  try{
    const result = await getOrderByParams(user_Id, order_id)
    const cartGroped = gropMenu(result)
    res.status(200).json(cartGroped)
  }catch(err){
    res.send(err)
  }

}

module.exports = { placeOrder , getCart, getCheckoutByOrder};
