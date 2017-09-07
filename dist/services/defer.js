"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('./../npm/babel-runtime/core-js/promise.js');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function defer() {
  var deferred = {};

  var promise = new _promise2.default(function (resolve, reject) {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });

  deferred.promise = promise;

  return deferred;
}

exports.default = defer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlZmVyLmpzIl0sIm5hbWVzIjpbImRlZmVyIiwiZGVmZXJyZWQiLCJwcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsU0FBU0EsS0FBVCxHQUFpQjtBQUNmLE1BQU1DLFdBQVcsRUFBakI7O0FBRUEsTUFBTUMsVUFBVSxzQkFBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDL0NILGFBQVNFLE9BQVQsR0FBbUJBLE9BQW5CO0FBQ0FGLGFBQVNHLE1BQVQsR0FBa0JBLE1BQWxCO0FBQ0QsR0FIZSxDQUFoQjs7QUFLQUgsV0FBU0MsT0FBVCxHQUFtQkEsT0FBbkI7O0FBRUEsU0FBT0QsUUFBUDtBQUNEOztrQkFFY0QsSyIsImZpbGUiOiJkZWZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGRlZmVyKCkge1xuICBjb25zdCBkZWZlcnJlZCA9IHt9O1xuXG4gIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgZGVmZXJyZWQucmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgZGVmZXJyZWQucmVqZWN0ID0gcmVqZWN0O1xuICB9KTtcblxuICBkZWZlcnJlZC5wcm9taXNlID0gcHJvbWlzZTtcblxuICByZXR1cm4gZGVmZXJyZWQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmVyO1xuIl19