const { errorHandler } = require("./error/error");

class Validate {
  static async createValidate(key, value, data) {
    if (data.length === 0 || Object.keys(JSON.parse(data)).length === 0) {
      return { [key]: { value: value, expire: false } };
    } else {
      const parsedData = JSON.parse(data);
      if (key in parsedData.root) {
        return errorHandler(
          "Key already exists!! Cannot create a value for already existing key.."
        );
      } else {
        const { root } = parsedData;
        root[key] = { value: value, expire: false };
        return root;
      }
    }
  }

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
