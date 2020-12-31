const { errorHandler } = require("../error/error");

class GlobalData {
  static dataStore = {};
  /**
   * Add items to the global object
   * @param {*} dataObj
   */
  static addItem = (dataObj) => {
    this.dataStore.root = { ...this.dataStore.root, ...dataObj };
  };

  /**
   * Read items from the global object
   * @param {*} key
   * @param {*} parsedData
   */
  static readItem = async (key, parsedData) => {
    this.dataStore.root = { ...this.dataStore.root, ...parsedData.root };
    if (key in this.dataStore.root) {
      if (this.dataStore.root[key].expire) {
        return errorHandler("Key exceeded Time To Live!");
      } else {
        return this.dataStore.root[key].value;
      }
    } else {
      return errorHandler("Invalid key!");
    }
  };

  /**
   * delete items from the global object
   * @param {*} key
   * @param {*} data
   */
  static deletItem = async (key, data) => {
    this.dataStore.root = { ...this.dataStore.root, ...data.root };
    if (key in this.dataStore.root) {
      if (this.dataStore.root[key].expire) {
        return errorHandler("Key exceeded Time To Live!");
      } else {
        delete this.dataStore.root[key];
        return this.dataStore;
      }
    } else {
      return errorHandler("Invalid key!");
    }
  };
}

exports.GlobalData = GlobalData;
