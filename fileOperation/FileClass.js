const fs = require("fs");
const path = require("path");
const { Validate } = require("../Validate");
const { errorHandler } = require("../error/error");
const { GlobalData } = require("../DAO/GlobalData");

class FileClass {
  /**
   * Writes data to the data store JSON file
   * @param {*} key
   * @param {*} value
   * @param {*} lifeTime
   */
  static async writeFile(dataStoreFileName, key, value, flag) {
    const dataObj = await this.readFile(dataStoreFileName, key, value, flag);
    return await fs.promises.writeFile(
      dataStoreFileName,
      JSON.stringify(
        {
          root: { ...dataObj },
        },
        null,
        2
      )
    );
  }

  /**
   * Updates expire status of each key
   * @param {*} key
   * @param {*} flag
   */
  static async updateFile(dataStoreFileName, key, flag) {
    if (fs.existsSync(dataStoreFileName)) {
      let data = await fs.promises
        .readFile(dataStoreFileName)
        .then((res) => res.toString("utf-8"))
        .catch((err) => {
          console.log(err);
          return "";
        });

      const parsedData = data.length === 0 ? " " : JSON.parse(data);
      if (parsedData.length !== 0) {
        if (key in parsedData.root) {
          parsedData.root[key].expire = flag;
          return await fs.promises.writeFile(
            dataStoreFileName,
            JSON.stringify(
              {
                root: { ...parsedData.root },
              },
              null,
              2
            )
          );
        } else {
          return null;
        }
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  /**
   * Reads the JSON data file and returns the existing object when client create a new object
   * @param {*} key
   * @param {*} value
   */
  static async readFile(dataStoreFileName, key, value, flag) {
    if (fs.existsSync(dataStoreFileName)) {
      let data = await fs.promises
        .readFile(dataStoreFileName)
        .then((res) => res.toString("utf-8"))
        .catch((err) => {
          console.log(err);
          return "";
        });
      if (typeof key === "string" && !flag) {
        const dataValid = await Validate.createValidate(key, value, data, flag);
        return dataValid;
      } else if (flag && data.length != 0) {
        const parsedData = JSON.parse(data);
        const { root } = parsedData;
        root[key] = { value: value, expire: flag };
        return root;
      } else {
        return data;
      }
    } else {
      if (key && value) {
        return { [key]: { value: value, expire: flag } };
      } else {
        return errorHandler("File doesn't exists!!");
      }
    }
  }

  /**
   * Delete specified key from dataStore
   * @param {*} deleteObj
   */
  static async deleteFile(dataStoreFileName, deleteObj) {
    if (fs.existsSync(dataStoreFileName)) {
      await fs.promises.writeFile(
        dataStoreFileName,
        JSON.stringify(deleteObj, null, 2)
      );
      return "Deleted successfully!!";
    } else {
      return errorHandler("File doesn't exists!!");
    }
  }
}

exports.FileClass = FileClass;
