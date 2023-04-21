const { request } = require("express");
const {
    getOrderThatHaveDelivery,
    getAllOrder,
    updateDelivery_order
  } = require("../../models/orders");

const  { gropMenu } = require("../../hook/groupedmenu")


const getOrder = async(req, res) =>{
    try{
        const user_email = req.user.user_email
        // check if user already take orders
        const result = await getOrderThatHaveDelivery(user_email)
        const orderGrouped = gropMenu(result)
        if(result.length == 0){
            // if length == 0, means user is not taked orders
            const result = await getAllOrder()
            const orderGrouped = gropMenu(result)
            return res.json(orderGrouped)
        }
        return res.json(orderGrouped)
    }catch(err){
        res.status(500).send(err);
    }
    
}

const updateDeliveryOrder = async(req, res)=>{
    // กดรับ orderปุ๊ป ก็ส่ง id ของ order เข้ามาใน params เลย
    const user_id = req.user.user_id
    const order_id = req.params.id
    console.log(order_id, req.user)
    try{
        const result = await updateDelivery_order(user_id, order_id)
        return res.json(result)
    }
    catch(err){
        res.status(500).send(err);
    }
}



module.exports = {getOrder, updateDeliveryOrder};