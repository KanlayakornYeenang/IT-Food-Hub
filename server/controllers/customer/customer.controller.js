const { createOrder, getAllCarts, getOrderByParams} = require("../../models/orders");
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

const getCheckOutByparams = async(req, res)=>{
  const param = req.params.orderId
  const user_id = req.user.user_id
  try{
      const result = await getOrderByParams(param, user_id)
      const cartGroped =gropMenu(result)
      res.status(200).json(cartGroped)
  }catch(err){
    res.send(err)
  }
}
module.exports = { placeOrder , getCart, getCheckOutByparams};
