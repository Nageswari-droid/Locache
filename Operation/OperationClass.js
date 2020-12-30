const { createHandler } = require("../Functions/createHandler");
const { readHandler } = require("../Functions/readHandler");
const { deleteHandler } = require("../Functions/deleteHandler");

class Operation{
    static createOperation(key, value, timeToLive){
        createHandler(key, value, timeToLive);
    }
    static readOperation(){
        readHandler();
    }
    static deleteOperation(){
        deleteHandler();
    }
}

exports.Operation = Operation;