const path = require("path");
const { errorHandler } = require("../error/error");
const { FileClass } = require("../fileOperation/FileClass");
const { GlobalData } = require("../DAO/GlobalData");

/**
 * Create key-value pair,
 * key length should not exceed 32 characters,
 * value always a JSON capped at 16KB
 * key-value pair stored in data/dataStore.json
 * @param {*} key
 * @param {*} value
 * @param {*} timeToLive
 */
const createHandler = async (keyArg, valueArg, timeToLive) => {
  const key = keyArg;
  const value = valueArg;

  const lifeTime = timeToLive ? timeToLive : 10000;

  if (typeof key === "string") {
    if (typeof value === "object") {
      if (typeof lifeTime === "number") {
        if (key.length > 32) {
          return errorHandler("Key length should not exceed 32 characters");
        } else {
          const size = Buffer.byteLength(JSON.stringify(value));
          if (size / 1024 > 16) {
            return errorHandler("Value size should not exceed 16KB");
          } else {
            GlobalData.addItem({ [key]: { value: value, expire: false } });
            return await FileClass.writeFile(key, value, lifeTime).then(() => {
              console.log("\n \nData stored successfully!!");
              return "Data stored successfully!!";
            });
          }
        }
      } else {
        return errorHandler("Time to live value should be an Integer!");
      }
    } else {
      return errorHandler("Value datatype should be an object(JSON)");
    }
  } else {
    return errorHandler("Key datatype should be string!");
  }
};

exports.createHandler = createHandler;
