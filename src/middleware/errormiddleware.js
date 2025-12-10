function errorHandler(err, req, res, next) {
    console.error('Error caught by middleware:', err.message);
    console.log('Request Method:', req.method);
    console.log('Request URL:', req.originalUrl);
    console.error('Error stack:', err.stack);

    if (res.headersSent) {
        return next(err);
    }

    let statusCode = err.status || err.statusCode || 500;

    if (err.name === 'UnauthorizedError') {
        statusCode = 401;
    } else if (err.name === 'ForbiddenError') {
        statusCode = 403;
    } else if (err.name === 'NotFoundError') {
        statusCode = 404;
    } else if (err.name === 'BadRequestError') {
        statusCode = 400;
    } else if (err.name === 'ValidationError') {
        statusCode = 400;
    }

    res.status(statusCode).json({
        success: false,
        status: statusCode,
        message: err.message || 'Internal Server Error'
    });
}

module.exports = errorHandler;
