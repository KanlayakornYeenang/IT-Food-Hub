const {
  getAllRestaurants,
  getRestaurantById,
  getMenuById,
  getMyRestaurantByUserId,
  getAllMyOrderByRstID,
  getOrderDetailByOrderID
} = require("../../models/restaurants");
const {
  getUserDetailById,
} = require("../../models/users");

const { groupOptions } = require("../../hook/groupOptions");

const getRestaurants = async (req, res) => {
  try {
    const result = await getAllRestaurants();
    return res.send(result);
  } catch (err) {
    return res.status(404).send(err);
  }
};

const getRestaurant = async (req, res) => {
  try {
    const result = await getRestaurantById(req.params.rst_id);
    return res.json(result);
  } catch (error) {
    res.status(404).send(error);
  }
};

const getMenu = async (req, res) => {
  try {
    const result = await getMenuById(req.params.menu_id);
    return res.json(groupOptions(result));
  } catch (error) {
    res.status(404).send(error);
  }
};

const getMyRestaurant = async (req, res) => {
  try {
    const restaurant = await getMyRestaurantByUserId(req.user.user_id);
    let myRestaurant = await getRestaurantById(restaurant.rst_id)

    const orders = await getAllMyOrderByRstID(restaurant.rst_id);
    let ordersList = [];
    for (let i = 0; i < orders.length; i++) {
      let order = {
        order: orders[i],
        order_detail: await getOrderDetailByOrderID(orders[i].order_id, restaurant.rst_id),
        delivery_person: await getUserDetailById(orders[i].dlv_id),
      };
      ordersList.push(order);

    }
    myRestaurant = Object.assign(myRestaurant, {orders:ordersList})
    return res.json(myRestaurant);
  } catch (error) {
    return res.status(404).send(error);
  }
}

const getAllMyOrder = async (req, res) => {
  const user_id = req.user.user_id;
  try {
    const orders = await getAllMyOrderByRstID(user_id);
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
  getRestaurants,
  getRestaurant,
  getMenu,
  getMyRestaurant,
};
