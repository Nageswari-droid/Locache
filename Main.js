const { createHandler } = require("./Functions/createHandler");
const { readHandler } = require("./Functions/readHandler");
const { deleteHandler } = require("./Functions/deleteHandler");

class Main {
  static obj;
  static create(key, value, timeToLive) {
    createHandler(key, value, timeToLive, this.obj);
  }
  static read() {
    readHandler();
  }
  static delete() {
    deleteHandler();
  }
}

exports.locache = Main;

// const { testing } = require("./testing");
// testing();
