const { request } = require("express");
const {
  // getAllOrderThatNotDelivered,
  updateDelivery_order,
  // gerOrderThatUserIsDelivered,
  getAllOrder,
  getMyDeliveryByDeliveryId,
  isOrderReceived,
  showState
} = require("../../models/orders");
const { gropMenu } = require("../../hook/groupedmenu");

// const showOrder = async (req, res) => {
//   try {
//     const result = await getAllOrderThatNotDelivered();
//     res.send(result);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// };

const updateDeliveryOrder = async (req, res) => {
  // กดรับ orderปุ๊ป ก็ส่ง id ของ order เข้ามาใน params เลย
  const user_id = req.user.user_id;
  const order_id = req.params.id;
  try {
    const isReceived = await isOrderReceived(req.user.user_id);
    const orderStatus = await showState(order_id)
    
    if (isReceived.length > 0) {
      return res.status(400).json({ message: 'คุณได้รับรายการสั่งซื้อไปแล้ว ไม่สามารถรับรายการสั่งซื้อใหม่ได้อีก' });
    }

    if (orderStatus == 3) {
      return res.status(400).json({ message: 'กรุณาเลือกรายการสั่งซื้อใหม่ เนื่องจากรายการสั่งซื้อนี้ถูกรับไปแล้ว' });
    }
    
    const result = await updateDelivery_order(user_id, order_id);
    return res.json(result);
  } catch (err) {
    res.status(500).send(err);
  }
};

const viewOrder = async (req, res) => {
  try {
    const isReceived = await isOrderReceived(req.user.user_id);
    
    if (isReceived.length > 0) {
      return res.status(400).json({ message: 'คุณได้รับรายการสั่งซื้อไปแล้ว ไม่สามารถรับรายการสั่งซื้อใหม่ได้อีก' });
    }

    const result = await getAllOrder();
    res.json(gropMenu(result));
  } catch (err) {
    res.status(500).send(err);
  }
};

const getMyDelivery = async (req, res) => {
  try {
    const result = await getMyDeliveryByDeliveryId(req.user.user_id);
    res.json(result);
  } catch (err) {
    res.status(500).send(err);
  }
}

// const viewOrder = async (req, res) => {
//   const user_id = req.user.user_id;
//   const orderThatUseriSDelivery = await gerOrderThatUserIsDelivered(user_id);
//   console.log(orderThatUseriSDelivery);
//   if (orderThatUseriSDelivery.length > 0) {
//     const orderGrop = gropMenu(orderThatUseriSDelivery);
//     return res.status(200).send(orderGrop);
//   } else {
//     const allOrderIsNotDelivered = await getAllOrderThatNotDelivered();
//     console.log(allOrderIsNotDelivered);
//     const orderGrop = gropMenu(allOrderIsNotDelivered);
//     return res.status(200).send(orderGrop);
//   }
// };

// const viewOrderThatUserIsDelivered = async (req, res) => {
//   const user_id = req.user.user_id;
//   const orderThatUseriSDelivery = await gerOrderThatUserIsDelivered(user_id);
//   const orderGrop = gropMenu(orderThatUseriSDelivery);
//   return res.status(200).send(orderGrop);
// };



module.exports = {
  updateDeliveryOrder,
  viewOrder,
  getMyDelivery
};
