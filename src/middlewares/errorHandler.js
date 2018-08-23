/**
 * Express Error handler middleware
 * @param  {Object}   err  Express error
 * @param  {Object}   req  Express request
 * @param  {Object}   res  Express response
 * @param  {Function} next Express next handler
 * @returns {void}
 */
function errorHandler(err, req, res, next) {
  if (!err) {
    return next();
  }

  console.error({ err }, "ERROR HANDLER");

  const body = {};

  assignJwtError(err, body) ||
    assignJoiError(err, body) ||
    assignBadRequestError(err, body) ||
    assingCommonError(err, body);

  const status = err.status || 500;
  body.status = status;
  return res.status(status).json(body);
}

/**
 * Build Bad Request error from exception
 * @param  {Error} err Error object to format
 * @param  {Object} body Body of the response
 * @return {Boolean} true if error has been built, false otherwise
 */
function assignJwtError(err, body) {
  if (err.name === "JsonWebTokenError" || err.message === "Missing JWT") {
    err.status = 401;
    body.message = err.message;
    return true;
  }
  return false;
}

/**
 * Build Bad Request error from exception
 * @param  {Error} err Error object to format
 * @param  {Object} body Body of the response
 * @return {Boolean} true if error has been built, false otherwise
 */
function assignBadRequestError(err, body) {
  if (err.status === 400 && err.details) {
    err.details.forEach((v, k) => {
      body[k] = v;
    });
    return true;
  }
  return false;
}

/**
 * Build error from exception
 * @param  {Error} err Error object to format
 * @param  {Object} body Body of the response
 * @return {void}
 */
function assingCommonError(err, body) {
  body.message = err.message;
  return true;
}

/**
 * Build Bad Request error from JOI ValidationError exception
 * @param  {Error} err Error object to format
 * @param  {Object} body Body of the response
 * @return {Boolean} true if error has been built, false otherwise
 */
function assignJoiError(err, body) {
  if (err.name === "ValidationError") {
    err.status = 400;
    err.details.forEach(detail => {
      body[detail.context.key] = [detail.message];
    });
    return true;
  }
  return false;
}

module.exports = errorHandler;
