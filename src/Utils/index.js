export const sortByDateAndTime = arr =>
  arr.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
