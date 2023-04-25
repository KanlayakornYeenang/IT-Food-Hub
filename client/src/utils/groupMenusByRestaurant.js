export function groupMenusByRestaurant(json_data) {
  let menus_by_restaurant = {};

  json_data.forEach((item) => {
    let rst_id = item.rst_id;
    let menu_name = item.menu_name;
    let item_data = {
      item: item.item,
      total_price: formatPrice(parseFloat(item.total_price)),
      quantity: item.quantity,
    };

    if (rst_id in menus_by_restaurant) {
      let menu_exists = false;
      for (let i = 0; i < menus_by_restaurant[rst_id].menus.length; i++) {
        if (menus_by_restaurant[rst_id].menus[i].menu_name === menu_name) {
          menu_exists = true;
          menus_by_restaurant[rst_id].menus[i].items.push(item_data);
          break;
        }
      }
      if (!menu_exists) {
        menus_by_restaurant[rst_id].menus.push({
          menu_name: menu_name,
          items: [item_data],
        });
      }
    } else {
      menus_by_restaurant[rst_id] = {
        rst_name: item.rst_name,
        menus: [{ menu_name: menu_name, items: [item_data] }],
      };
    }
  });

  // Calculate totalPrice for each restaurant
  for (let rst_id in menus_by_restaurant) {
    let restaurant = menus_by_restaurant[rst_id];
    let totalPrice = 0;
    for (let menu of restaurant.menus) {
      for (let item of menu.items) {
        let price = parseFloat(item.total_price);
        let quantity = item.quantity;
        totalPrice += price * quantity;
      }
    }
    restaurant.total_price = formatPrice(totalPrice);
  }

  return menus_by_restaurant;
}

// Function to format price
function formatPrice(price) {
  const formattedPrice = price.toFixed(2);
  return formattedPrice.endsWith(".00")
    ? formattedPrice.slice(0, -3)
    : formattedPrice;
}
