var Utility = {
  getItemLocalStorage(itemName) {
    return JSON.parse(localStorage.getItem(itemName));
  },
  cloneObject(object) {
    return JSON.parse(JSON.stringify(object));
  },
  isNullOrEmpty(value) {
    var result = false;
    if (value === null) {
      result = true;
    }
    if (value === undefined) {
      return true;
    }
    if (value === '') {
      result = true;
    }
    return result;
  }
}

export default Utility;