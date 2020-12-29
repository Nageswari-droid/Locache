const errorHandler = (res, msg) => {
    return res.send(msg);
};

exports.errorHandler = errorHandler;