const {
  addMenuToCart,
  findCartItem,
  updateCartItemQuantity,
  getAllMenusInCart,
  getOrderByParams,
  deleteFromCart,
  addOrder,
  addOrderDetail,
  getAllMyOrderByUserId,
  getOrderDetailByOrderID,
} = require("../../models/customers");
const {
  getUserDetailById,
} = require("../../models/users");
const { groupedCart } = require("../../hook/groupedCart");
const db = require("../../models/db");

const addToCart = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const { menu_id, quantity, item_id } = req.body;

    const existingCartItem = await findCartItem(user_id, menu_id, item_id);

    if (existingCartItem) {
      const updatedQuantity = existingCartItem.quantity + quantity;
      await updateCartItemQuantity(existingCartItem.cart_id, updatedQuantity);
    } else {
      await addMenuToCart(user_id, menu_id, quantity, item_id);
    }

    res.status(200).send("item added to cart successfully.");
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteMenu = async (req, res) => {
  try {
    const cart_id = req.query.cart_id;
    await deleteFromCart(cart_id);
    res.status(200).send("delete from cart successfully.");
  } catch (error) {
    res.status(500).send(error);
  }
};

const createCart = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const result = await getAllMenusInCart(user_id);

    return res.json(groupedCart(result));
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateQuantity = async (req, res) => {
  try {
    const { cart_id, quantity } = req.body;
    await updateCartItemQuantity(cart_id, quantity);
    res.status(200).send("update cart successfully.");
  } catch (error) {
    res.status(500).send(error);
  }
};

const placeOrder = async (req, res) => {
  const user_id = req.user.user_id;
  const order_total_price = req.body.order_total_price;
  const order_dest = req.body.order_dest;
  const cart = req.body.cart;

  try {
    // transaction
    await db.beginTransaction();

    // add the order
    const order_id = await addOrder(db, order_total_price, user_id, order_dest);

    try {
      for (const item of cart) {
        for (let i = 0; i < item.menu.length; i++) {
          // add order detail
          const orders_detail_id = order_id+'-'+item.menu[i].menu_id+i
          await addOrderDetail(
            db,
            orders_detail_id,
            order_id,
            item.menu[i].menu_id,
            item.menu[i].quantity,
            item.menu[i].item_id
          );
          // delete from cart
          await deleteFromCart(item.menu[i].cart_id);
        }
      }
    } catch (err) {
      // rollback
      await db.rollback();
      return res
        .status(500)
        .json({ message: "Error adding order details", error: err });
    }

    // commit
    await db.commit();

    res.status(200).json({
      order_id: order_id,
      message: "Order placed successfully",
    });
  } catch (err) {
    // rollback
    await db.rollback();
    res.status(500).json({ message: "Error placing the order", error: err });
  }
};

// แสดงออเดอร์ของฉันตาม order_id ใน params
const getMyOrderByOrderId = async (req, res) => {
  const user_id = req.user.user_id;
  const order_id = req.params.order_id;
  try {
    const result = await getOrderByParams(user_id, order_id);
    return res.json(result);
  } catch (err) {
    res.send(err);
  }
};

const getAllMyOrder = async (req, res) => {
  const user_id = req.user.user_id;
  try {
    const orders = await getAllMyOrderByUserId(user_id);
    let ordersList = [];
    for (let i = 0; i < orders.length; i++) {
      let order = {
        order: orders[i],
        order_detail: await getOrderDetailByOrderID(orders[i].order_id),
        delivery_person: await getUserDetailById(orders[i].dlv_id),
      };
      ordersList.push(order);
    }
    return res.json(ordersList);
  } catch (err) {
    res.send(err);
  }
};

module.exports = {
  addToCart,
  createCart,
  placeOrder,
  updateQuantity,
  deleteMenu,
  getMyOrderByOrderId,
  getAllMyOrder,
};
