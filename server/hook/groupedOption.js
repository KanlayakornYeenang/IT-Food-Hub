const groupOptions = (options) => {
  const result = options.reduce((acc, option) => {
    const existingOption = acc.find(
      (o) => o.option_name === option.option_name
    );
    if (existingOption) {
      existingOption.item.push({
        [option.item_name]: option.item_price,
      });
    } else {
      acc.push({
        menu_id: option.menu_id,
        option_name: option.option_name,
        item: [{ [option.item_name]: option.item_price }],
        max_optional: option.max_optional,
      });
    }
    return acc;
  }, []);
  return result;
};

module.exports = { groupOptions };
