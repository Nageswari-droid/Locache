const { Operation } = require("./Operation/OperationClass");
const path = require("path");
const { GlobalData } = require("./DAO/GlobalData");

class Main {
  static fileDefault = path.join(__dirname, "..", "data");

  constructor(filepath) {
    if (typeof filepath === "string" || typeof filepath === "undefined") {
      let fileDefaultNew = path.join(__dirname, "..", "data");

      if (!filepath) {
        filepath = fileDefaultNew;
      }
      const dsFileName = GlobalData.dataStoreFileName;
      if (!dsFileName) {
        GlobalData.setDataStoreFileName(filepath);
      }
    }
  }

  /**
   * To create user defined file path
   * @param {*} filepath
   */
  static setFileName(filepath) {
    if (filepath === " ") {
      filepath = this.fileDefault;
    }
    const dsFileName = GlobalData.dataStoreFileName;
    if (!dsFileName) {
      GlobalData.setDataStoreFileName(filepath);
    }
  }

  /**
   * Entry method to add the key-value pair
   * @param {*} key
   * @param {*} value
   * @param {*} timeToLive
   */
  async create(key, value, timeToLive) {
    await Operation.createOperation(key, value, timeToLive);
  }

  /**
   * Entry method to read the value based on the given key
   * @param {*} key
   */
  async read(key) {
    return await Operation.readOperation(key);
  }

  /**
   * Entry method to delete the given key
   * @param {*} key
   */
  async delete(key) {
    return await Operation.deleteOperation(key);
  }
}

exports.Locache = Main;
