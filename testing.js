const { locache } = require("./Main");

const testingCreate = () => {
  const key = "nag";
  const value = { Cooking: "qwertyui" };
  const timeToLive = 10000;
  locache.create(key, value, timeToLive);
};

testingCreate();

// exports.testing = testingCreate;
