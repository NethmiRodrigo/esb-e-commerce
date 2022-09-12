const catchErrors = (error, request, response, next) => {
  console.log(response);

  const status = error.statusCode || 500;

  response.status(status).json({
    message: error.message || undefined,
    error: Object.keys(error.complexObject || {}).length
      ? error.complexObject
      : undefined,
  });
};

module.exports = { catchErrors };
