const functions = {};
export default functions;

functions.create = (obj, counter = 0) => {
  return (item) => {
    obj[counter] = item;
    return counter++;
  };
};
