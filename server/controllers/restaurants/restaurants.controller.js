const { getAllMenuByRestaurantId } = require("../../models/restaurants");

const getAllMenu = async (req, res) => {
  try {
    const result = await getAllMenuByRestaurantId(req.params.rst_id);
    return res.json(result)
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
    getAllMenu
};
