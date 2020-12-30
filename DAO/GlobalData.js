const { errorHandler } = require("../error/error");
const { FileClass } = require("../fileOperation/FileClass");
const { Validate } = require("../Validate");

class GlobalData {
  static dataStore = {};

  static addItem = (dataObj) => {
    this.dataStore.root = { ...this.dataStore.root, ...dataObj };
  };

  static readItem = async (key) => {
    if (!this.dataStore.root) {
      let data = await FileClass.readFile();
      const parsedData = data ? JSON.parse(data) : " ";
      this.dataStore.root = { ...this.dataStore.root, ...parsedData.root };
      let value = await Validate.readValidate(key, parsedData);
      console.log(value);
      return value;
    } else {
      if (key in this.dataStore.root) {
        console.log(this.dataStore.root[key].value);
        return this.dataStore.root[key].value;
      } else {
        return errorHandler("Invalid key!");
      }
    }
  };

  static deletItem = () => {};
}

exports.GlobalData = GlobalData;
