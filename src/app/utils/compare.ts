export const compareCityName = (a, b) => {
  // Use toUpperCase() to ignore character casing
  const cityA = a.cityName.toUpperCase();
  const cityB = b.cityName.toUpperCase();

  let comparison = 0;
  if (cityA > cityB) {
    comparison = 1;
  } else if (cityA < cityB) {
    comparison = -1;
  }
  return comparison;
};
