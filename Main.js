const {Operation} = require("./Operation/OperationClass");

class Main {
  static obj;
  static async create(key, value, timeToLive) {
    await Operation.createOperation(key, value, timeToLive);
  }
  static async read(key) {
    return await Operation.readOperation(key);
  }
  static delete() {
    Operation.deleteOperation();
  }
}

exports.locache = Main;


