const { FileClass } = require("../fileOperation/FileClass");
const { GlobalData } = require("../DAO/GlobalData");
const { Validate } = require("../Validate");

const deleteHandler = async (key) => {
  let dataObj = await FileClass.readFile();
  const parsedData = dataObj.length === 0 ? " " : JSON.parse(dataObj);
  if (await Validate.deleteValidate(key, parsedData)) {
    let deleteObj = await GlobalData.deletItem(key, parsedData);
    let msg = await FileClass.deleteFile(deleteObj);
    console.log(msg);
  }
};

exports.deleteHandler = deleteHandler;
