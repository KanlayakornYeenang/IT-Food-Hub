const {
  getAllRestaurants,
  getRestaurantById,
  getMenuById,
} = require("../../models/restaurants");

const { groupOptions } = require("../../hook/groupedOption");

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
    res.status(500).send(error);
  }
};

const getMenu = async (req, res) => {
  try {
    const result = await getMenuById(req.params.menu_id);
    return res.json(groupOptions(result));
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getRestaurants,
  getRestaurant,
  getMenu,
};
