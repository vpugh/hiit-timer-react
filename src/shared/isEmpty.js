const isEmptyObject = (object) => {
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      return true;
    }
  }
  return false;
};

export { isEmptyObject };