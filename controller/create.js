const path = require("path");
const uuid = require("uuid");
const fs = require("fs");

const fileName = path.join(__dirname, "..", "data", "dataStore.json");

/**
 * Creates a data item to be stored in the data store
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const createController = (req, res, next) => {
  const userData = req.body;
  const keyValue = uuid.v4();

  const size = Buffer.byteLength(JSON.stringify(userData));
  var uuidStr = keyValue.substring(0, 32);

  if (Object.keys(userData).length !== 0) {
    if (size / 1000 < 16) {
      if (fs.existsSync(fileName)) {
        fs.readFile(fileName, "UTF-8", (err, data) => {
          if (err) {
            res.send("Error occured");
          }

          if (data.length === 0 || JSON.parse(data) === " ") {
            writeHandler(
              {
                [uuidStr]: userData,
              },
              res
            );
          } else {
            const parsedData = JSON.parse(data);
            const { schema } = parsedData;
            schema[uuidStr] = userData;
            writeHandler(schema, res);
          }
        });
      } else {
        writeHandler(
          {
            [uuidStr]: userData,
          },
          res
        );
      }
    } else {
      return res.send("JSON value should be less than 16KB");
    }
  } else {
    return res.send("Value should be in JSON");
  }
};

const writeHandler = (dataObj, res) => {
  fs.writeFile(
    fileName,
    JSON.stringify({
      schema: { ...dataObj },
    }),
    (err) => {
      if (err) {
        return res.send("Error occured");
      }
    }
  );
  res.send(dataObj);
};

exports.createController = createController;