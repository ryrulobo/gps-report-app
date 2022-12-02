const chartDataFormatter = (data) => {
  const len = data.length;

  const groupByLocation = data.reduce((group, el) => {
    const { location } = el;
    group[location] = group[location] ?? [];
    group[location].push(el);
    return group;
  }, {});

  const result = {
    labels: [],
    data: [],
  };

  for (let key in groupByLocation) {
    result.data.push(groupByLocation[key].length);
    let percentage = Math.ceil((groupByLocation[key].length / len) * 100);
    result.labels.push(`${key} - ${percentage}%`);
  }

  return result;
};

export default chartDataFormatter;
