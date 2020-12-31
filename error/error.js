const errorHandler = async (msg) => {
  console.error("\n", new Error(msg));
  return new Promise((_, reject) => {
    reject(msg);
  });
};

exports.errorHandler = errorHandler;
