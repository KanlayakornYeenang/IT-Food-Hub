const {
  getAllRestaurants,
  getRestaurantById,
  getMenuById,
  getMyRestaurantByUserId
} = require("../../models/restaurants");

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
    const result = await getMyRestaurantByUserId(req.user.user_id);
    const myRestaurant = await getRestaurantById(result.rst_id)
    return res.json(myRestaurant);
  } catch (error) {
    res.status(404).send(error);
  }
}

module.exports = {
  getRestaurants,
  getRestaurant,
  getMenu,
  getMyRestaurant
};
