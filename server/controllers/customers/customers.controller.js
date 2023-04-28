const { createOrder, getAllCarts } = require("../../models/orders");
const {
  addMenuToCart,
  findCartItem,
  updateCartItemQuantity,
  getAllMenusInCart,
  getOrderByParams,
  deleteFromCart,
} = require("../../models/customers");
const { gropMenu } = require("../../hook/groupedmenu");

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

    res.status(200).send("Item added to cart successfully.");
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteMenu = async (req, res) => {
  try {
    const cart_id = req.body.cart_id;
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
    return res.json(result);
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
  //
};

const getCart = async (req, res) => {
  const user_id = req.user.user_id;
  try {
    const result = await getAllCarts(user_id);
    const cartGroped = gropMenu(result);
    res.status(200).json(cartGroped);
  } catch (err) {
    res.send(err);
  }
};

const getCheckoutByOrder = async (req, res) => {
  const user_Id = req.user.user_id;
  const order_id = req.params.orderID;
  try {
    const result = await getOrderByParams(user_Id, order_id);
    const cartGroped = gropMenu(result);
    res.status(200).json(cartGroped);
  } catch (err) {
    res.send(err);
  }
};

module.exports = {
  addToCart,
  createCart,
  placeOrder,
  getCart,
  updateQuantity,
  getCheckoutByOrder,
  deleteMenu,
};
