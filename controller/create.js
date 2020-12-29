const path = require("path");
const uuid = require("uuid");
const fs = require("fs");
const { errorHandler } = require("../error/responseErr");
// const { DataStore } = require("../DAO/dataStore");
const { DataStore } = require("locache");

const fileName = path.join(__dirname, "..", "data", "dataStore.json");

/**
 * Creates a data item to be stored in the data store
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const createController = (req, res, next) => {
  const userData = req.body;
  const key = Object.keys(userData)[0];
  const value = userData[key];

  if (typeof value === "object") {
    if (Object.keys(userData).length !== 0) {
      const size = Buffer.byteLength(JSON.stringify(value));
      if (key.length > 32) {
        return errorHandler(res, "Key length should not exceed 32 characters");
      }
      if (size / 1000 < 16) {
        if (fs.existsSync(fileName)) {
          fs.readFile(fileName, "UTF-8", (err, data) => {
            if (err) {
              return errorHandler(res, err.message);
            }

            if (data.length === 0 || JSON.parse(data) === " ") {
              writeHandler(
                {
                  [key]: value,
                },
                res
              );
            } else {
              const parsedData = JSON.parse(data);
              if (key in parsedData.schema) {
                return errorHandler(
                  res,
                  "Key already exists!! Cannot create a value for already existing key.."
                );
              }
              const { schema } = parsedData;
              schema[key] = value;
              writeHandler(schema, res);
            }
          });
        } else {
          writeHandler(
            {
              [key]: value,
            },
            res
          );
        }
      } else {
        return errorHandler(res, "JSON value should be less than 16KB");
      }
    } else {
      return errorHandler(res, "The input should be in key-value pair");
    }
  } else {
    return errorHandler(res, "Value should be in JSON");
  }
};

const writeHandler = (dataObj, res) => {
  DataStore.ojectMember(dataObj);
  fs.writeFile(
    fileName,
    JSON.stringify({
      schema: { ...dataObj },
    }),
    (err) => {
      if (err) {
        return errorHandler(res, err.message);
      }
    }
  );
  errorHandler(res, "Data stored successfully!!");
};

exports.createController = createController;
