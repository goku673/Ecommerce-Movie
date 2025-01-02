const errorHandler = (err, req, res, next) => {
    res.status(err.statusCode || 500).json({
      error: err.message || 'Internal Server Error',
      method: req.method,
      endpoint: req.originalUrl,
      requestBody: req.body,
      statusCode: err.statusCode || 500,
    });
  };

  module.exports = errorHandler;