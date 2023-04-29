const groupByAndSort = (data, groupKey, sortKey) => {
  const groupedData = data.reduce((acc, item) => {
    const groupIndex = acc.findIndex(
      (group) => group[groupKey] === item[groupKey]
    );

    if (groupIndex === -1) {
      acc.push({
        [groupKey]: item[groupKey],
        menu: [item],
      });
    } else {
      acc[groupIndex].menu.push(item);
    }

    return acc;
  }, []);

  groupedData.forEach((group) => {
    group.menu.sort((a, b) => a[sortKey] - b[sortKey]);
  });

  return groupedData;
};

module.exports = { groupByAndSort };
