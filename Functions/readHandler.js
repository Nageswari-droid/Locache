const { GlobalData } = require("../DAO/GlobalData");

const readHandler = async (key) => {
  return GlobalData.readItem(key);
};

exports.readHandler = readHandler;
