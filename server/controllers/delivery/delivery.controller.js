const { request } = require("express");
const {
    getAllOrderThatNotDelivered,
    getAllOrder,
    updateDelivery_order,
    getAllOrderThatHaveDelivered,
    gerOrderThatUserIsDelivered
    getAllOrderThatHaveDelivered
  } = require("../../models/orders");

const  { gropMenu } = require("../../hook/groupedmenu")


const showOrder = async(req, res) =>{
    try{
        const result = await getAllOrderThatNotDelivered()
        res.send(result)
    }catch(err){
        res.status(500).send(err)
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

const viewOrder = async(req, res)=>{
    const user_id = req.user.user_id
    const orderThatUseriSDelivery = await gerOrderThatUserIsDelivered(user_id)
    console.log(orderThatUseriSDelivery)
    if(orderThatUseriSDelivery.length > 0){
        const orderGrop = gropMenu(orderThatUseriSDelivery);
        return res.status(200).send(orderGrop )
    }else{
        const allOrderIsNotDelivered = await getAllOrderThatNotDelivered()
        console.log(allOrderIsNotDelivered)
        const orderGrop = gropMenu(allOrderIsNotDelivered);
        return res.status(200).send(orderGrop )
    }
    
}

const viewOrderThatUserIsDelivered = async (req, res)=>{
    const user_id = req.user.user_id
    const orderThatUseriSDelivery = await gerOrderThatUserIsDelivered(user_id)
    const orderGrop = gropMenu(orderThatUseriSDelivery);
    return res.status(200).send(orderGrop )
}

module.exports = {updateDeliveryOrder, viewOrder, viewOrderThatUserIsDelivered};

