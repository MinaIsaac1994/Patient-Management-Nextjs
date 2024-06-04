export const convertArrayToObject = (array) => {
  if (array.length === 0) return {};
  const object = {};
  array.forEach((item) => {
    const { id, type, value } = item;
    let initialValue;
    switch (type) {
      case "multiselect":
      case "select":
        initialValue = [];
        break;
      case "switch":
        initialValue = false;
        break;
      case "slider":
        initialValue = 1;
        break;
      default:
        initialValue = "";
        break;
    }

    // If value is falsy, use the appropriate initial value
    object[id] = value ? value : initialValue;
  });

  return object;
};

export const countSpecialties = (users) => {
  const specialtyCounts = {};

  users.forEach((user) => {
    if (user.speciality && user.availability) {
      specialtyCounts[user.speciality] =
        (specialtyCounts[user.speciality] || 0) + 1;
    }
  });

  return specialtyCounts;
};

export const transformPrioritiesResponse = (response) =>
  Array.from({ length: 4 }, (_, index) => {
    const foundPriority = response.find((obj) => obj[index + 1] !== undefined);
    return foundPriority ? foundPriority[index + 1] : 0;
  });
