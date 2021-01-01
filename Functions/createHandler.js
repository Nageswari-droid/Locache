const path = require("path");
const fs = require("fs");
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
  const fileName = GlobalData.dataStoreFileName;

  const lifeTime = timeToLive ? timeToLive : 100;
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
            if (fs.existsSync(fileName)) {
              const fileSize = fs.statSync(fileName).size;
              if (fileSize / 1073741824 <= 1) {
                return fileOperations(fileName, key, value, lifeTime);
              } else {
                return errorHandler("File size exceeded 1GB!!");
              }
            } else {
              return fileOperations(fileName,key, value, lifeTime);
            }
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

const fileOperations = async (fileName, key, value, lifeTime) => {
  setTimeout(async () => {
    GlobalData.updateItem(key, true);
    await FileClass.updateFile(fileName, key, true).catch((err) => {
      console.log(err);
    });
  }, lifeTime * 1000);
  GlobalData.addItem({ [key]: { value: value, expire: false } });
  return await FileClass.writeFile(fileName, key, value, false)
    .then(() => {
      console.log("\n \nData stored successfully!!");
      return "Data stored successfully!!";
    })
    .catch((err) => {
      return errorHandler(err);
    });
};

exports.createHandler = createHandler;
