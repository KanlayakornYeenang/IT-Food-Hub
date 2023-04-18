const {
    getOrderThatHaveDelivery,
    getAllOrder,
    updateDelivery_order
  } = require("../../models/orders");

const getOrder = async(req, res) =>{
    try{
        const user_email = req.user.user_email
        // check if user already take orders
        const result = await getOrderThatHaveDelivery(user_email)
        if(result.length == 0){
            // if length == 0, means user is not take orders
            const result = await getAllOrder()
            return res.json(result)
        }
        return res.json(result)
    }catch(err){
        res.status(500).send(err);
    }
}

const updateDeliveryOrder = async(req, res)=>{
    const user_id = req.user.user_id
    const order_id = req.params.id
    try{
        const result = await updateDelivery_order(user_id, order_id)
        return res.json(result)
    }
    catch(err){
        res.status(500).send(err);
    }
}

module.exports = {getOrder, updateDeliveryOrder};