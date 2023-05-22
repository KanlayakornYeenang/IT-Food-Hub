const {
  getAllRestaurants,
  getRestaurantById,
  getMenuById,
  getMyRestaurantByUserId,
  getAllMyOrderByRstID,
  getOrderDetailByOrderID,
  insertMenu,
  insertMenuOption,
  insertMenuItem,
  updateMenu,
  updateMenuOption,
  updateMenuItem,
  deleteItem,
  deleteOption,
  isOptionExist,
  isItemExist,
  deleteMenuByID
} = require("../../models/restaurants");
const { getUserDetailById } = require("../../models/users");

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
    let myRestaurant = await getRestaurantById(restaurant.rst_id);

    const orders = await getAllMyOrderByRstID(restaurant.rst_id);
    let ordersList = [];
    for (let i = 0; i < orders.length; i++) {
      let order = {
        order: orders[i],
        order_detail: await getOrderDetailByOrderID(
          orders[i].order_id,
          restaurant.rst_id
        ),
        delivery_person: await getUserDetailById(orders[i].dlv_id),
      };
      ordersList.push(order);
    }
    myRestaurant = Object.assign(myRestaurant, { orders: ordersList });
    return res.json(myRestaurant);
  } catch (error) {
    return res.status(404).send(error);
  }
};

const createMenu = async (req, res) => {
  try {
    const { menu_name, menu_desc, menu_cat, options, menu_price } = req.body;

    const restaurant = await getMyRestaurantByUserId(req.user.user_id);
    const add_menu = await insertMenu(
      restaurant.rst_id,
      menu_name,
      menu_desc,
      menu_cat,
      menu_price || 0
    );

    for (let i = 0; i < options.length; i++) {
      const add_menu_option = await insertMenuOption(
        add_menu.insertId,
        options[i].option_name,
        options[i].option_type,
        options[i].max_optional
      );

      for (let j = 0; j < options[i].items.length; j++) {
        const add_menu_item = await insertMenuItem(
          add_menu_option.insertId,
          options[i].items[j].item_name,
          options[i].items[j].item_price
        );
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const editMenu = async (req, res) => {
  try {
    const menu_id = req.body.menu_id;
    let { menu_name, menu_desc, menu_cat, options, menu_price } =
      req.body.menuSchema;
    const editMenu = await updateMenu(
      menu_id,
      menu_name,
      menu_desc,
      menu_cat,
      menu_price || 0
    );
    for (let i = 0; i < options.length; i++) {
      const editMenuOption = await updateMenuOption(
        options[i].option_id,
        options[i].option_name,
        options[i].option_type,
        options[i].max_optional
      );

      for (let j = 0; j < options[i].items.length; j++) {
        const editMenuItem = await updateMenuItem(
          options[i].items[j].item_id,
          options[i].items[j].item_name,
          options[i].items[j].item_price
        );
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const deleteItems = async (req, res) => {
  const options = req.query;
  const result = [];
  for (const key in options) {
    result.push(options[key]);
  }
  for (let i = 0; i < result.length; i++) {
    const del_item = await deleteItem(result[i].item_id);
  }
};

const deleteOptions = async (req, res) => {
  const options = req.query;
  const result = [];
  for (const key in options) {
    result.push(options[key]);
  }
  for (let i = 0; i < result.length; i++) {
    const del_option = await deleteOption(result[i].option_id);
  }
};

const createOption = async (req, res) => {
  const menu_id = req.body.menu_id;
  const options = req.body.menuSchema.options;
  for (let i = 0; i < options.length; i++) {
    const [checkOption] = await isOptionExist(menu_id, options[i].option_name);
    if (checkOption == undefined) {
      const add_menu_option = await insertMenuOption(
        menu_id,
        options[i].option_name,
        options[i].option_type,
        options[i].max_optional
      );

      for (let j = 0; j < options[i].items.length; j++) {
        const [checkItem] = await isItemExist(options[i].option_id, options[i].items[j].item_name);
        if (checkItem == undefined && options[i].items[j].item_name != null) {
          const add_menu_item = await insertMenuItem(
            add_menu_option.insertId,
            options[i].items[j].item_name,
            options[i].items[j].item_price || 0
          );
        }
      }
    }
  }
};

const createItem = async (req, res) => {
  const menu_id = req.body.menu_id;
  const options = req.body.menuSchema.options;
  for (let i = 0; i < options.length; i++) {
      for (let j = 0; j < options[i].items.length; j++) {
        const [checkItem] = await isItemExist(options[i].option_id, options[i].items[j].item_name);
        if (checkItem == undefined && options[i].items[j].item_name != null) {
          const add_menu_item = await insertMenuItem(
            options[i].option_id,
            options[i].items[j].item_name,
            options[i].items[j].item_price || 0
          );
        }
      }
  }
};

const deleteMenu = async (req, res) => {
  const del_menu = await deleteMenuByID(req.query.menu_id)
}

module.exports = {
  getRestaurants,
  getRestaurant,
  getMenu,
  getMyRestaurant,
  createMenu,
  editMenu,
  deleteItems,
  deleteOptions,
  createOption,
  createItem,
  deleteMenu
};
