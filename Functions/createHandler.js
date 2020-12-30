const path = require("path");
const fs = require("fs");
const { errorHandler } = require("../error/error");
const { GlobalData } = require("../DAO/GlobalData");

const fileName = path.join(__dirname, "..", "data", "dataStore.json");

/**
 * Create key-value pair,
 * key length should not exceed 32 characters,
 * value always a JSON capped at 16KB
 * key-value pair stored in data/dataStore.json
 * @param {*} key
 * @param {*} value
 * @param {*} timeToLive
 */
const createHandler = (keyArg, valueArg, timeToLive) => {
  const key = keyArg;
  const value = valueArg;

  const lifeTime = timeToLive ? timeToLive : 10000;

  if (typeof key === "string") {
    if (typeof value === "object") {
      if (key.length > 32) {
        errorHandler("Key length should not exceed 32 characters!");
      } else {
        const size = Buffer.byteLength(JSON.stringify(value));
        if (size / 1024 > 16) {
          errorHandler("Value size should not exceed 16KB");
        } else {
          if (fs.existsSync(fileName)) {
            fs.readFile(fileName, "UTF-8", (err, data) => {
              if (data.length === 0 || JSON.parse(data) === " ") {
                writeHandler({ [key]: { value: value, expire: false } });
              } else {
                const parsedData = JSON.parse(data);
                if (key in parsedData.schema) {
                  errorHandler(
                    "Key already exists!! Cannot create a value for already existing key.."
                  );
                } else {
                  const { schema } = parsedData;
                  schema[key] = { value: value, expire: false };
                  writeHandler(schema);
                }
              }
            });
          } else {
            writeHandler({ [key]: { value: value, expire: false } });
          }
        }
      }
    } else {
      errorHandler("Value datatype should be object(JSON)");
    }
  } else {
    errorHandler("Key datatype should be string!");
  }
};

const writeHandler = (dataObj) => {
  GlobalData.addItem(dataObj);
  fs.writeFile(
    fileName,
    JSON.stringify(
      {
        schema: { ...dataObj },
      },
      null,
      2
    ),
    (err) => {
      if (err) {
        errorHandler(err.message);
      }
    }
  );
  errorHandler("Data stored successfully!!");
};

exports.createHandler = createHandler;
