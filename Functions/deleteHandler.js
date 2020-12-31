const { FileClass } = require("../fileOperation/FileClass");
const { GlobalData } = require("../DAO/GlobalData");
const { Validate } = require("../Validate");

/**
 * Delete the key-value from global object and file
 * @param {*} key 
 */
const deleteHandler = async (key) => {
  let dataObj = await FileClass.readFile();
  const parsedData = dataObj.length === 0 ? " " : JSON.parse(dataObj);
  if (await Validate.deleteValidate(key, parsedData)) {
    let deleteObj = await GlobalData.deletItem(key, parsedData);
    let msg = await FileClass.deleteFile(deleteObj);
    console.log(msg);
    return msg;
  }
};

exports.deleteHandler = deleteHandler;
