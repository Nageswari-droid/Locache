const {FileClass} = require("../fileOperation/FileClass");
const { GlobalData } = require("../DAO/GlobalData");
const {Validate} = require("../Validate");

var parsedData = "";

const readHandler = async (key) => {
  if (Object.keys(GlobalData.dataStore).length === 0) {
    let data = await FileClass.readFile();
    parsedData = data.length !== 0 ? JSON.parse(data) : " ";
    let value = await Validate.readValidate(key, parsedData);
    console.log(value);
    return value;
  } else {
    console.log(parsedData);
    return GlobalData.readItem(key, parsedData);
  }
};

exports.readHandler = readHandler;
