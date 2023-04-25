const { createOrder, getAllCarts } = require("../../models/orders");
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

module.exports = { placeOrder , getCart};
