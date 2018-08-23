/**
 * Wrapper to handle asynchrone functions in express
 * @param {Function} fn an async function.
 * @return {Function} an async function that is compatible with express.
 */
function wrapper(fn) {
  return (req, res, next) => {
    const routePromise = fn(req, res, next);
    routePromise.catch(err => next(err));
  };
}

module.exports = wrapper;
