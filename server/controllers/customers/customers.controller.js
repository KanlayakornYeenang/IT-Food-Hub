const {
  addMenuToCart,
  findCartItem,
  updateCartItemQuantity,
  getAllMenusInCart
} = require("../../models/customers");

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

const cart = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const result = await getAllMenusInCart(user_id);
    return res.json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { addToCart, cart };
