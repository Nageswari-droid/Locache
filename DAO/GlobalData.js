const { errorHandler } = require("../error/error");
const { FileClass } = require("../fileOperation/FileClass");
const { Validate } = require("../Validate");

class GlobalData {
  static dataStore = {};

  static addItem = (dataObj) => {
    this.dataStore.root = { ...this.dataStore.root, ...dataObj };
  };

  static readItem = async (key, parsedData) => {
    this.dataStore.root = { ...this.dataStore.root, ...parsedData.root };
    if (key in this.dataStore.root) {
      console.log(this.dataStore.root[key].value);
      return this.dataStore.root[key].value;
    } else {
      return errorHandler("Invalid key!");
    }
  };

  static deletItem = async (key, data) => {
    this.dataStore.root = { ...this.dataStore.root, ...data.root };
    if (key in this.dataStore.root) {
      delete this.dataStore.root[key];
      return this.dataStore;
    } else {
      return errorHandler("Invalid key!");
    }
  };
}

exports.GlobalData = GlobalData;
