const groupOptions = (options) => {
  const result = options.reduce((acc, option) => {
    const existingOption = acc.find(
      (o) => o.option_name === option.option_name
    );
    if (existingOption) {
      existingOption.item.push({
        item_id: option.item_id,
        item_name: option.item_name,
        item_price: option.item_price,
      });
    } else {
      acc.push({
        menu_id: option.menu_id,
        option_id: option.option_id,
        option_name: option.option_name,
        item: [
          {
            item_id: option.item_id,
            item_name: option.item_name,
            item_price: option.item_price,
          },
        ],
        option_type: option.option_type,
        max_optional: option.max_optional,
      });
    }
    return acc;
  }, []);
  return result;
};

module.exports = { groupOptions };
