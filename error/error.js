const errorHandler = async (msg) => {
  console.error(new Error(msg));
  return new Promise((_, reject) => {
    reject(msg);
  });
};

exports.errorHandler = errorHandler;
