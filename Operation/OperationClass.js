const { createHandler } = require("../Functions/createHandler");
const { readHandler } = require("../Functions/readHandler");
const { deleteHandler } = require("../Functions/deleteHandler");

class Operation{
    static async createOperation(key, value, timeToLive){
        await createHandler(key, value, timeToLive);
    }
    static async readOperation(key){
        return await readHandler(key);
    }
    static async deleteOperation(key){
        await deleteHandler(key);
    }
}

exports.Operation = Operation;