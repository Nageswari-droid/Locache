const { createHandler } = require("../Functions/createHandler");
const { readHandler } = require("../Functions/readHandler");
const { deleteHandler } = require("../Functions/deleteHandler");

class Operation{
    /**
     * Call createHandler to add new item in both file and global object
     * @param {*} key 
     * @param {*} value 
     * @param {*} timeToLive 
     */
    static async createOperation(key, value, timeToLive){
        await createHandler(key, value, timeToLive);
    }

    /**
     * Call readHandler to read a specified key from file or global object
     * @param {*} key 
     */
    static async readOperation(key){
        return await readHandler(key);
    }

    /**
     * Call deleteHandler to delete a specifie key from global object and update the JSON file
     * @param {*} key 
     */
    static async deleteOperation(key){
        return await deleteHandler(key);
    }
}

exports.Operation = Operation;