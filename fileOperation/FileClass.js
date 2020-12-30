const fs = require("fs");
const path = require("path");
const { errorHandler } = require("../error/error");

const fileName = path.join(__dirname, "..", "data", "dataStore.json");

class FileClass {
  /**
   * Writes data to the data store JSON file
   * @param {*} key
   * @param {*} value
   * @param {*} lifeTime
   */
  static async writeFile(key, value, lifeTime) {
    lifeTime = lifeTime;
    const dataObj = await this.readFile(key, value);

    return await fs.promises.writeFile(
      fileName,
      JSON.stringify(
        {
          schema: { ...dataObj },
        },
        null,
        2
      )
    );
  }

  /**
   * Reads the JSON data file ans returns the object
   * @param {*} key
   * @param {*} value
   */
  static async readFile(key, value) {
    if (fs.existsSync(fileName)) {
      let data = await fs.promises
        .readFile(fileName)
        .then((res) => res.toString("utf-8"))
        .catch((err) => {
          console.log(err);
          return "";
        });

      if (data.length === 0 || Object.keys(JSON.parse(data)).length === 0) {
        return { [key]: { value: value, expire: false } };
      } else {
        const parsedData = JSON.parse(data);
        if (key in parsedData.schema) {
          return await errorHandler(
            "Key already exists!! Cannot create a value for already existing key.."
          );
        } else {
          const { schema } = parsedData;
          schema[key] = { value: value, expire: false };
          return schema;
        }
      }
    } else {
      return { [key]: { value: value, expire: false } };
    }
  }
}

exports.FileClass = FileClass;
