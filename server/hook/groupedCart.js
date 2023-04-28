function formatPrice(price) {
  const floatValue = parseFloat(price);
  return floatValue % 1 === 0 ? floatValue.toFixed(0) : floatValue.toFixed(2);
}

const groupedCart = (data) => {
  const groupedData = {};

  data.forEach(item => {
    const rstId = item.rst_id;

    if (!groupedData[rstId]) {
      groupedData[rstId] = {
        rst_id: item.rst_id,
        rst_name: item.rst_name,
        menu: []
      };
    }

    groupedData[rstId].menu.push({
      cart_id: item.cart_id,
      menu_id: item.menu_id,
      menu_name: item.menu_name,
      item_id: item.item_id,
      item: item.item,
      price: formatPrice(item.price),
      quantity: item.quantity
    });
  });

  const result = Object.values(groupedData);

  // Sort result by the minimum cart_id in the menu
  result.sort((a, b) => {
    const minCartIdA = Math.min(...a.menu.map(item => item.cart_id));
    const minCartIdB = Math.min(...b.menu.map(item => item.cart_id));
    return minCartIdA - minCartIdB;
  });

  return result;
}

module.exports = {groupedCart}
