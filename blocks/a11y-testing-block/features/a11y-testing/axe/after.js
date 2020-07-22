/* eslint-disable */
let restoreFunctions = [];
function after(host, name, cb) {
  const originalFn = host[name];
  let restoreFn;
  if (originalFn) {
    host[name] = function () {
      const args = [];
      for (let _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      originalFn.apply(this, args);
      cb(host);
    };
    restoreFn = function () {
      host[name] = originalFn;
    };
  } else {
    host[name] = function () {
      cb(host);
    };
    restoreFn = function () {
      delete host[name];
    };
  }
  restoreFunctions.push(restoreFn);
}
after.restorePatchedMethods = function () {
  restoreFunctions.forEach((restoreFn) => restoreFn());
  restoreFunctions = [];
};
module.exports = after;
