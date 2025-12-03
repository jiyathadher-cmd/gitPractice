function errorHandler(err, req, res, next) {
    console.log('error caught by middleware : ', err.message);
    console.log('Request Url: ', req.originalUrl);
    console.log('Request Method: ', req.method);

    if (res.headersSent) {
        return next(err);
    }

    console.error('error stack: ', err.stack);
    const status = err.status || 500;
    res.status(status).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
}
module.exports = errorHandler;