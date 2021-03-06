const { errorHandler } = require("./error/error");

class Validate {
  /**
   * Validate the data string for create operation
   * @param {*} key 
   * @param {*} value 
   * @param {*} data 
   */
  static async createValidate(key, value, data, flag) {
    if (data.length === 0 || Object.keys(JSON.parse(data)).length === 0) {
      return { [key]: { value: value, expire: flag } };
    } else {
      const parsedData = JSON.parse(data);
      if (key in parsedData.root) {
        return errorHandler(
          "Key already exists!! Cannot create a value for already existing key.."
        );
      } else {
        const { root } = parsedData;
        root[key] = { value: value, expire: flag };
        return root;
      }
    }
  }

  /**
   * Validate the key TTL, parsed data length and key present in the file or not for read operation
   * @param {*} key 
   * @param {*} parsedData 
   */
  static async readValidate(key, parsedData) {
    if (parsedData === " ") {
      return errorHandler(
        "File is empty!! Create an object to perform read operation..."
      );
    } else {
      if (key in parsedData.root) {
        if (parsedData.root[key].expire) {
          return errorHandler("Key exceeded Time To Live");
        }
        return parsedData.root[key].value;
      } else {
        return errorHandler("Invalid key...");
      }
    }
  }

  /**
   * Validate the delete key presence and TTL property to perform delete operation
   * @param {*} key 
   * @param {*} parsedData 
   */
  static async deleteValidate(key, parsedData) {
    if (parsedData === " ") {
      return errorHandler(
        "File is empty!! Create an object to perform delete operation..."
      );
    } else {
      if (key in parsedData.root) {
        if (parsedData.root[key].expire) {
          return errorHandler("Key exceeded Time To Live");
        } else {
          return true;
        }
      } else {
        return errorHandler("Invalid key...");
      }
    }
  }
}

exports.Validate = Validate;
