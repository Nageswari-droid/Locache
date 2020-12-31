const {Operation} = require("./Operation/OperationClass");

class Main {
  static obj;
  /**
   * Entry method to add the key-value pair
   * @param {*} key 
   * @param {*} value 
   * @param {*} timeToLive 
   */
  static async create(key, value, timeToLive) {
    await Operation.createOperation(key, value, timeToLive);
  }

  /**
   * Entry method to read the value based on the given key
   * @param {*} key 
   */
  static async read(key) {
    return await Operation.readOperation(key);
  }

  /**
   * Entry method to delete the given key
   * @param {*} key 
   */
  static async delete(key) {
    await Operation.deleteOperation(key);
  }
}

exports.locache = Main;


