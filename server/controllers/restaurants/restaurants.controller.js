const {
  getAllRestaurants,
  getAllMenuByRestaurantId,
} = require("../../models/restaurants");

const getRestaurants = async (req, res) => {
  try {
    const result = await getAllRestaurants();
    return res.send(result);
  } catch (err) {
    return res.status(404).send(err);
  }
};

const getAllMenu = async (req, res) => {
  try {
    const result = await getAllMenuByRestaurantId(req.params.rst_id);
    return res.json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getRestaurants,
  getAllMenu,
};
