const {Operation} = require("./Operation/OperationClass");

class Main {
  static obj;
  static create(key, value, timeToLive) {
    Operation.createOperation(key, value, timeToLive);
  }
  static read() {
    Operation.readOperation();
  }
  static delete() {
    Operation.deleteOperation();
  }
}

exports.locache = Main;


