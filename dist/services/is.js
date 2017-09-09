/* globals window, HTMLElement */

'use strict';

/**
 * is
 * the definitive JavaScript type testing library
 *
 * @copyright 2013-2014 Enrico Marino / Jordan Harband
 * @license MIT
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('./../npm/babel-runtime/helpers/typeof.js');

var _typeof3 = _interopRequireDefault(_typeof2);

var _symbol = require('./../npm/babel-runtime/core-js/symbol.js');

var _symbol2 = _interopRequireDefault(_symbol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var objProto = Object.prototype;
var owns = objProto.hasOwnProperty;
var toStr = objProto.toString;
var symbolValueOf;
if (typeof _symbol2.default === 'function') {
  symbolValueOf = _symbol2.default.prototype.valueOf;
}
var isActualNaN = function isActualNaN(value) {
  return value !== value;
};
var NON_HOST_TYPES = {
  'boolean': 1,
  number: 1,
  string: 1,
  undefined: 1
};

var base64Regex = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/;
var hexRegex = /^[A-Fa-f0-9]+$/;

/**
 * Expose `is`
 */

var is = {};

/**
 * Test general.
 */

/**
 * is.type
 * Test if `value` is a type of `type`.
 *
 * @param {Mixed} value value to test
 * @param {String} type type
 * @return {Boolean} true if `value` is a type of `type`, false otherwise
 * @api public
 */

is.a = is.type = function (value, type) {
  return (typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) === type;
};

/**
 * is.defined
 * Test if `value` is defined.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if 'value' is defined, false otherwise
 * @api public
 */

is.defined = function (value) {
  return typeof value !== 'undefined';
};

/**
 * is.empty
 * Test if `value` is empty.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is empty, false otherwise
 * @api public
 */

is.empty = function (value) {
  var type = toStr.call(value);
  var key;

  if (value === 0) {
    return false;
  }

  if (type === '[object Array]' || type === '[object Arguments]' || type === '[object String]') {
    return value.length === 0;
  }

  if (type === '[object Object]') {
    for (key in value) {
      if (owns.call(value, key)) {
        return false;
      }
    }
    return true;
  }

  return !value;
};

is.phone = function (str) {
  return (/^(110|13[0-9]|14[0-9]|15[0-9]|18[0-9]|17[0-9])\d{8}$/g.test(str)
  );
};

/**
 * is.equal
 * Test if `value` is equal to `other`.
 *
 * @param {Mixed} value value to test
 * @param {Mixed} other value to compare with
 * @return {Boolean} true if `value` is equal to `other`, false otherwise
 */

is.equal = function equal(value, other) {
  if (value === other) {
    return true;
  }

  var type = toStr.call(value);
  var key;

  if (type !== toStr.call(other)) {
    return false;
  }

  if (type === '[object Object]') {
    for (key in value) {
      if (!is.equal(value[key], other[key]) || !(key in other)) {
        return false;
      }
    }
    for (key in other) {
      if (!is.equal(value[key], other[key]) || !(key in value)) {
        return false;
      }
    }
    return true;
  }

  if (type === '[object Array]') {
    key = value.length;
    if (key !== other.length) {
      return false;
    }
    while (key--) {
      if (!is.equal(value[key], other[key])) {
        return false;
      }
    }
    return true;
  }

  if (type === '[object Function]') {
    return value.prototype === other.prototype;
  }

  if (type === '[object Date]') {
    return value.getTime() === other.getTime();
  }

  return false;
};

/**
 * is.hosted
 * Test if `value` is hosted by `host`.
 *
 * @param {Mixed} value to test
 * @param {Mixed} host host to test with
 * @return {Boolean} true if `value` is hosted by `host`, false otherwise
 * @api public
 */

is.hosted = function (value, host) {
  var type = (0, _typeof3.default)(host[value]);
  return type === 'object' ? !!host[value] : !NON_HOST_TYPES[type];
};

/**
 * is.instance
 * Test if `value` is an instance of `constructor`.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is an instance of `constructor`
 * @api public
 */

is.instance = is['instanceof'] = function (value, constructor) {
  return value instanceof constructor;
};

/**
 * is.nil / is.null
 * Test if `value` is null.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is null, false otherwise
 * @api public
 */

is.nil = is['null'] = function (value) {
  return value === null;
};

/**
 * is.undef / is.undefined
 * Test if `value` is undefined.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is undefined, false otherwise
 * @api public
 */

is.undef = is.undefined = function (value) {
  return typeof value === 'undefined';
};

/**
 * Test arguments.
 */

/**
 * is.args
 * Test if `value` is an arguments object.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is an arguments object, false otherwise
 * @api public
 */

is.args = is.arguments = function (value) {
  var isStandardArguments = toStr.call(value) === '[object Arguments]';
  var isOldArguments = !is.array(value) && is.arraylike(value) && is.object(value) && is.fn(value.callee);
  return isStandardArguments || isOldArguments;
};

/**
 * Test array.
 */

/**
 * is.array
 * Test if 'value' is an array.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is an array, false otherwise
 * @api public
 */

is.array = Array.isArray || function (value) {
  return toStr.call(value) === '[object Array]';
};

/**
 * is.arguments.empty
 * Test if `value` is an empty arguments object.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is an empty arguments object, false otherwise
 * @api public
 */
is.args.empty = function (value) {
  return is.args(value) && value.length === 0;
};

/**
 * is.array.empty
 * Test if `value` is an empty array.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is an empty array, false otherwise
 * @api public
 */
is.array.empty = function (value) {
  return is.array(value) && value.length === 0;
};

/**
 * is.arraylike
 * Test if `value` is an arraylike object.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is an arguments object, false otherwise
 * @api public
 */

is.arraylike = function (value) {
  return !!value && !is.bool(value) && owns.call(value, 'length') && isFinite(value.length) && is.number(value.length) && value.length >= 0;
};

/**
 * Test boolean.
 */

/**
 * is.bool
 * Test if `value` is a boolean.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is a boolean, false otherwise
 * @api public
 */

is.bool = is['boolean'] = function (value) {
  return toStr.call(value) === '[object Boolean]';
};

/**
 * is.false
 * Test if `value` is false.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is false, false otherwise
 * @api public
 */

is['false'] = function (value) {
  return is.bool(value) && Boolean(Number(value)) === false;
};

/**
 * is.true
 * Test if `value` is true.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is true, false otherwise
 * @api public
 */

is['true'] = function (value) {
  return is.bool(value) && Boolean(Number(value)) === true;
};

/**
 * Test date.
 */

/**
 * is.date
 * Test if `value` is a date.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is a date, false otherwise
 * @api public
 */

is.date = function (value) {
  return toStr.call(value) === '[object Date]';
};

/**
 * is.date.valid
 * Test if `value` is a valid date.
 *
 * @param {Mixed} value value to test
 * @returns {Boolean} true if `value` is a valid date, false otherwise
 */
is.date.valid = function (value) {
  return is.date(value) && !isNaN(Number(value));
};

/**
 * Test element.
 */

/**
 * is.element
 * Test if `value` is an html element.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is an HTML Element, false otherwise
 * @api public
 */

is.element = function (value) {
  return value !== undefined && typeof HTMLElement !== 'undefined' && value instanceof HTMLElement && value.nodeType === 1;
};

/**
 * Test error.
 */

/**
 * is.error
 * Test if `value` is an error object.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is an error object, false otherwise
 * @api public
 */

is.error = function (value) {
  return toStr.call(value) === '[object Error]';
};

/**
 * Test function.
 */

/**
 * is.fn / is.function (deprecated)
 * Test if `value` is a function.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is a function, false otherwise
 * @api public
 */

is.fn = is['function'] = function (value) {
  var isAlert = typeof window !== 'undefined' && value === window.alert;
  return isAlert || toStr.call(value) === '[object Function]';
};

/**
 * Test number.
 */

/**
 * is.number
 * Test if `value` is a number.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is a number, false otherwise
 * @api public
 */

is.number = function (value) {
  return toStr.call(value) === '[object Number]';
};

/**
 * is.infinite
 * Test if `value` is positive or negative infinity.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is positive or negative Infinity, false otherwise
 * @api public
 */
is.infinite = function (value) {
  return value === Infinity || value === -Infinity;
};

/**
 * is.decimal
 * Test if `value` is a decimal number.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is a decimal number, false otherwise
 * @api public
 */

is.decimal = function (value) {
  return is.number(value) && !isActualNaN(value) && !is.infinite(value) && value % 1 !== 0;
};

/**
 * is.divisibleBy
 * Test if `value` is divisible by `n`.
 *
 * @param {Number} value value to test
 * @param {Number} n dividend
 * @return {Boolean} true if `value` is divisible by `n`, false otherwise
 * @api public
 */

is.divisibleBy = function (value, n) {
  var isDividendInfinite = is.infinite(value);
  var isDivisorInfinite = is.infinite(n);
  var isNonZeroNumber = is.number(value) && !isActualNaN(value) && is.number(n) && !isActualNaN(n) && n !== 0;
  return isDividendInfinite || isDivisorInfinite || isNonZeroNumber && value % n === 0;
};

/**
 * is.integer
 * Test if `value` is an integer.
 *
 * @param value to test
 * @return {Boolean} true if `value` is an integer, false otherwise
 * @api public
 */

is.integer = is['int'] = function (value) {
  return is.number(value) && !isActualNaN(value) && value % 1 === 0;
};

/**
 * is.maximum
 * Test if `value` is greater than 'others' values.
 *
 * @param {Number} value value to test
 * @param {Array} others values to compare with
 * @return {Boolean} true if `value` is greater than `others` values
 * @api public
 */

is.maximum = function (value, others) {
  if (isActualNaN(value)) {
    throw new TypeError('NaN is not a valid value');
  } else if (!is.arraylike(others)) {
    throw new TypeError('second argument must be array-like');
  }
  var len = others.length;

  while (--len >= 0) {
    if (value < others[len]) {
      return false;
    }
  }

  return true;
};

/**
 * is.minimum
 * Test if `value` is less than `others` values.
 *
 * @param {Number} value value to test
 * @param {Array} others values to compare with
 * @return {Boolean} true if `value` is less than `others` values
 * @api public
 */

is.minimum = function (value, others) {
  if (isActualNaN(value)) {
    throw new TypeError('NaN is not a valid value');
  } else if (!is.arraylike(others)) {
    throw new TypeError('second argument must be array-like');
  }
  var len = others.length;

  while (--len >= 0) {
    if (value > others[len]) {
      return false;
    }
  }

  return true;
};

/**
 * is.nan
 * Test if `value` is not a number.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is not a number, false otherwise
 * @api public
 */

is.nan = function (value) {
  return !is.number(value) || value !== value;
};

/**
 * is.even
 * Test if `value` is an even number.
 *
 * @param {Number} value value to test
 * @return {Boolean} true if `value` is an even number, false otherwise
 * @api public
 */

is.even = function (value) {
  return is.infinite(value) || is.number(value) && value === value && value % 2 === 0;
};

/**
 * is.odd
 * Test if `value` is an odd number.
 *
 * @param {Number} value value to test
 * @return {Boolean} true if `value` is an odd number, false otherwise
 * @api public
 */

is.odd = function (value) {
  return is.infinite(value) || is.number(value) && value === value && value % 2 !== 0;
};

/**
 * is.ge
 * Test if `value` is greater than or equal to `other`.
 *
 * @param {Number} value value to test
 * @param {Number} other value to compare with
 * @return {Boolean}
 * @api public
 */

is.ge = function (value, other) {
  if (isActualNaN(value) || isActualNaN(other)) {
    throw new TypeError('NaN is not a valid value');
  }
  return !is.infinite(value) && !is.infinite(other) && value >= other;
};

/**
 * is.gt
 * Test if `value` is greater than `other`.
 *
 * @param {Number} value value to test
 * @param {Number} other value to compare with
 * @return {Boolean}
 * @api public
 */

is.gt = function (value, other) {
  if (isActualNaN(value) || isActualNaN(other)) {
    throw new TypeError('NaN is not a valid value');
  }
  return !is.infinite(value) && !is.infinite(other) && value > other;
};

/**
 * is.le
 * Test if `value` is less than or equal to `other`.
 *
 * @param {Number} value value to test
 * @param {Number} other value to compare with
 * @return {Boolean} if 'value' is less than or equal to 'other'
 * @api public
 */

is.le = function (value, other) {
  if (isActualNaN(value) || isActualNaN(other)) {
    throw new TypeError('NaN is not a valid value');
  }
  return !is.infinite(value) && !is.infinite(other) && value <= other;
};

/**
 * is.lt
 * Test if `value` is less than `other`.
 *
 * @param {Number} value value to test
 * @param {Number} other value to compare with
 * @return {Boolean} if `value` is less than `other`
 * @api public
 */

is.lt = function (value, other) {
  if (isActualNaN(value) || isActualNaN(other)) {
    throw new TypeError('NaN is not a valid value');
  }
  return !is.infinite(value) && !is.infinite(other) && value < other;
};

/**
 * is.within
 * Test if `value` is within `start` and `finish`.
 *
 * @param {Number} value value to test
 * @param {Number} start lower bound
 * @param {Number} finish upper bound
 * @return {Boolean} true if 'value' is is within 'start' and 'finish'
 * @api public
 */
is.within = function (value, start, finish) {
  if (isActualNaN(value) || isActualNaN(start) || isActualNaN(finish)) {
    throw new TypeError('NaN is not a valid value');
  } else if (!is.number(value) || !is.number(start) || !is.number(finish)) {
    throw new TypeError('all arguments must be numbers');
  }
  var isAnyInfinite = is.infinite(value) || is.infinite(start) || is.infinite(finish);
  return isAnyInfinite || value >= start && value <= finish;
};

/**
 * Test object.
 */

/**
 * is.object
 * Test if `value` is an object.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is an object, false otherwise
 * @api public
 */
is.object = function (value) {
  return toStr.call(value) === '[object Object]';
};

/**
 * is.primitive
 * Test if `value` is a primitive.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is a primitive, false otherwise
 * @api public
 */
is.primitive = function isPrimitive(value) {
  if (!value) {
    return true;
  }
  if ((typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) === 'object' || is.object(value) || is.fn(value) || is.array(value)) {
    return false;
  }
  return true;
};

/**
 * is.hash
 * Test if `value` is a hash - a plain object literal.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is a hash, false otherwise
 * @api public
 */

is.hash = function (value) {
  return is.object(value) && value.constructor === Object && !value.nodeType && !value.setInterval;
};

/**
 * Test regexp.
 */

/**
 * is.regexp
 * Test if `value` is a regular expression.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is a regexp, false otherwise
 * @api public
 */

is.regexp = function (value) {
  return toStr.call(value) === '[object RegExp]';
};

/**
 * Test string.
 */

/**
 * is.string
 * Test if `value` is a string.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if 'value' is a string, false otherwise
 * @api public
 */

is.string = function (value) {
  return toStr.call(value) === '[object String]';
};

/**
 * Test base64 string.
 */

/**
 * is.base64
 * Test if `value` is a valid base64 encoded string.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if 'value' is a base64 encoded string, false otherwise
 * @api public
 */

is.base64 = function (value) {
  return is.string(value) && (!value.length || base64Regex.test(value));
};

/**
 * Test base64 string.
 */

/**
 * is.hex
 * Test if `value` is a valid hex encoded string.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if 'value' is a hex encoded string, false otherwise
 * @api public
 */

is.hex = function (value) {
  return is.string(value) && (!value.length || hexRegex.test(value));
};

/**
 * is.symbol
 * Test if `value` is an ES6 Symbol
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is a Symbol, false otherise
 * @api public
 */

is.symbol = function (value) {
  return typeof _symbol2.default === 'function' && toStr.call(value) === '[object Symbol]' && (0, _typeof3.default)(symbolValueOf.call(value)) === 'symbol';
};

exports.default = is;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLmpzIl0sIm5hbWVzIjpbIm9ialByb3RvIiwiT2JqZWN0IiwicHJvdG90eXBlIiwib3ducyIsImhhc093blByb3BlcnR5IiwidG9TdHIiLCJ0b1N0cmluZyIsInN5bWJvbFZhbHVlT2YiLCJ2YWx1ZU9mIiwiaXNBY3R1YWxOYU4iLCJ2YWx1ZSIsIk5PTl9IT1NUX1RZUEVTIiwibnVtYmVyIiwic3RyaW5nIiwidW5kZWZpbmVkIiwiYmFzZTY0UmVnZXgiLCJoZXhSZWdleCIsImlzIiwiYSIsInR5cGUiLCJkZWZpbmVkIiwiZW1wdHkiLCJjYWxsIiwia2V5IiwibGVuZ3RoIiwicGhvbmUiLCJzdHIiLCJ0ZXN0IiwiZXF1YWwiLCJvdGhlciIsImdldFRpbWUiLCJob3N0ZWQiLCJob3N0IiwiaW5zdGFuY2UiLCJjb25zdHJ1Y3RvciIsIm5pbCIsInVuZGVmIiwiYXJncyIsImFyZ3VtZW50cyIsImlzU3RhbmRhcmRBcmd1bWVudHMiLCJpc09sZEFyZ3VtZW50cyIsImFycmF5IiwiYXJyYXlsaWtlIiwib2JqZWN0IiwiZm4iLCJjYWxsZWUiLCJBcnJheSIsImlzQXJyYXkiLCJib29sIiwiaXNGaW5pdGUiLCJCb29sZWFuIiwiTnVtYmVyIiwiZGF0ZSIsInZhbGlkIiwiaXNOYU4iLCJlbGVtZW50IiwiSFRNTEVsZW1lbnQiLCJub2RlVHlwZSIsImVycm9yIiwiaXNBbGVydCIsIndpbmRvdyIsImFsZXJ0IiwiaW5maW5pdGUiLCJJbmZpbml0eSIsImRlY2ltYWwiLCJkaXZpc2libGVCeSIsIm4iLCJpc0RpdmlkZW5kSW5maW5pdGUiLCJpc0Rpdmlzb3JJbmZpbml0ZSIsImlzTm9uWmVyb051bWJlciIsImludGVnZXIiLCJtYXhpbXVtIiwib3RoZXJzIiwiVHlwZUVycm9yIiwibGVuIiwibWluaW11bSIsIm5hbiIsImV2ZW4iLCJvZGQiLCJnZSIsImd0IiwibGUiLCJsdCIsIndpdGhpbiIsInN0YXJ0IiwiZmluaXNoIiwiaXNBbnlJbmZpbml0ZSIsInByaW1pdGl2ZSIsImlzUHJpbWl0aXZlIiwiaGFzaCIsInNldEludGVydmFsIiwicmVnZXhwIiwiYmFzZTY0IiwiaGV4Iiwic3ltYm9sIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVFBLElBQUlBLFdBQVdDLE9BQU9DLFNBQXRCO0FBQ0EsSUFBSUMsT0FBT0gsU0FBU0ksY0FBcEI7QUFDQSxJQUFJQyxRQUFRTCxTQUFTTSxRQUFyQjtBQUNBLElBQUlDLGFBQUo7QUFDQSxJQUFJLDRCQUFrQixVQUF0QixFQUFrQztBQUNoQ0Esa0JBQWdCLGlCQUFPTCxTQUFQLENBQWlCTSxPQUFqQztBQUNEO0FBQ0QsSUFBSUMsY0FBYyxTQUFkQSxXQUFjLENBQVNDLEtBQVQsRUFBZ0I7QUFDaEMsU0FBT0EsVUFBVUEsS0FBakI7QUFDRCxDQUZEO0FBR0EsSUFBSUMsaUJBQWlCO0FBQ25CLGFBQVcsQ0FEUTtBQUVuQkMsVUFBUSxDQUZXO0FBR25CQyxVQUFRLENBSFc7QUFJbkJDLGFBQVc7QUFKUSxDQUFyQjs7QUFPQSxJQUFJQyxjQUFjLDhFQUFsQjtBQUNBLElBQUlDLFdBQVcsZ0JBQWY7O0FBRUE7Ozs7QUFJQSxJQUFJQyxLQUFLLEVBQVQ7O0FBRUE7Ozs7QUFJQTs7Ozs7Ozs7OztBQVVBQSxHQUFHQyxDQUFILEdBQU9ELEdBQUdFLElBQUgsR0FBVSxVQUFTVCxLQUFULEVBQWdCUyxJQUFoQixFQUFzQjtBQUNyQyxTQUFPLFFBQU9ULEtBQVAsdURBQU9BLEtBQVAsT0FBaUJTLElBQXhCO0FBQ0QsQ0FGRDs7QUFJQTs7Ozs7Ozs7O0FBU0FGLEdBQUdHLE9BQUgsR0FBYSxVQUFTVixLQUFULEVBQWdCO0FBQzNCLFNBQU8sT0FBT0EsS0FBUCxLQUFpQixXQUF4QjtBQUNELENBRkQ7O0FBSUE7Ozs7Ozs7OztBQVNBTyxHQUFHSSxLQUFILEdBQVcsVUFBU1gsS0FBVCxFQUFnQjtBQUN6QixNQUFJUyxPQUFPZCxNQUFNaUIsSUFBTixDQUFXWixLQUFYLENBQVg7QUFDQSxNQUFJYSxH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dCAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogaXNcbiAqIHRoZSBkZWZpbml0aXZlIEphdmFTY3JpcHQgdHlwZSB0ZXN0aW5nIGxpYnJhcnlcbiAqXG4gKiBAY29weXJpZ2h0IDIwMTMtMjAxNCBFbnJpY28gTWFyaW5vIC8gSm9yZGFuIEhhcmJhbmRcbiAqIEBsaWNlbnNlIE1JVFxuICovXG5cbnZhciBvYmpQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG52YXIgb3ducyA9IG9ialByb3RvLmhhc093blByb3BlcnR5O1xudmFyIHRvU3RyID0gb2JqUHJvdG8udG9TdHJpbmc7XG52YXIgc3ltYm9sVmFsdWVPZjtcbmlmICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nKSB7XG4gIHN5bWJvbFZhbHVlT2YgPSBTeW1ib2wucHJvdG90eXBlLnZhbHVlT2Y7XG59XG52YXIgaXNBY3R1YWxOYU4gPSBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT09IHZhbHVlO1xufTtcbnZhciBOT05fSE9TVF9UWVBFUyA9IHtcbiAgJ2Jvb2xlYW4nOiAxLFxuICBudW1iZXI6IDEsXG4gIHN0cmluZzogMSxcbiAgdW5kZWZpbmVkOiAxXG59O1xuXG52YXIgYmFzZTY0UmVnZXggPSAvXihbQS1aYS16MC05Ky9dezR9KSooW0EtWmEtejAtOSsvXXs0fXxbQS1aYS16MC05Ky9dezN9PXxbQS1aYS16MC05Ky9dezJ9PT0pJC87XG52YXIgaGV4UmVnZXggPSAvXltBLUZhLWYwLTldKyQvO1xuXG4vKipcbiAqIEV4cG9zZSBgaXNgXG4gKi9cblxudmFyIGlzID0ge307XG5cbi8qKlxuICogVGVzdCBnZW5lcmFsLlxuICovXG5cbi8qKlxuICogaXMudHlwZVxuICogVGVzdCBpZiBgdmFsdWVgIGlzIGEgdHlwZSBvZiBgdHlwZWAuXG4gKlxuICogQHBhcmFtIHtNaXhlZH0gdmFsdWUgdmFsdWUgdG8gdGVzdFxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgdHlwZVxuICogQHJldHVybiB7Qm9vbGVhbn0gdHJ1ZSBpZiBgdmFsdWVgIGlzIGEgdHlwZSBvZiBgdHlwZWAsIGZhbHNlIG90aGVyd2lzZVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5pcy5hID0gaXMudHlwZSA9IGZ1bmN0aW9uKHZhbHVlLCB0eXBlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IHR5cGU7XG59O1xuXG4vKipcbiAqIGlzLmRlZmluZWRcbiAqIFRlc3QgaWYgYHZhbHVlYCBpcyBkZWZpbmVkLlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm4ge0Jvb2xlYW59IHRydWUgaWYgJ3ZhbHVlJyBpcyBkZWZpbmVkLCBmYWxzZSBvdGhlcndpc2VcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuaXMuZGVmaW5lZCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgIT09ICd1bmRlZmluZWQnO1xufTtcblxuLyoqXG4gKiBpcy5lbXB0eVxuICogVGVzdCBpZiBgdmFsdWVgIGlzIGVtcHR5LlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm4ge0Jvb2xlYW59IHRydWUgaWYgYHZhbHVlYCBpcyBlbXB0eSwgZmFsc2Ugb3RoZXJ3aXNlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmlzLmVtcHR5ID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0b1N0ci5jYWxsKHZhbHVlKTtcbiAgdmFyIGtleTtcblxuICBpZiAodmFsdWUgPT09IDApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAodHlwZSA9PT0gJ1tvYmplY3QgQXJyYXldJyB8fCB0eXBlID09PSAnW29iamVjdCBBcmd1bWVudHNdJyB8fCB0eXBlID09PSAnW29iamVjdCBTdHJpbmddJykge1xuICAgIHJldHVybiB2YWx1ZS5sZW5ndGggPT09IDA7XG4gIH1cblxuICBpZiAodHlwZSA9PT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICBmb3IgKGtleSBpbiB2YWx1ZSkge1xuICAgICAgaWYgKG93bnMuY2FsbCh2YWx1ZSwga2V5KSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmV0dXJuICF2YWx1ZTtcbn07XG5cbmlzLnBob25lID0gZnVuY3Rpb24oc3RyKSB7XG4gIHJldHVybiAvXigxMTB8MTNbMC05XXwxNFswLTldfDE1WzAtOV18MThbMC05XXwxN1swLTldKVxcZHs4fSQvZy50ZXN0KHN0cik7XG59O1xuXG4vKipcbiAqIGlzLmVxdWFsXG4gKiBUZXN0IGlmIGB2YWx1ZWAgaXMgZXF1YWwgdG8gYG90aGVyYC5cbiAqXG4gKiBAcGFyYW0ge01peGVkfSB2YWx1ZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcGFyYW0ge01peGVkfSBvdGhlciB2YWx1ZSB0byBjb21wYXJlIHdpdGhcbiAqIEByZXR1cm4ge0Jvb2xlYW59IHRydWUgaWYgYHZhbHVlYCBpcyBlcXVhbCB0byBgb3RoZXJgLCBmYWxzZSBvdGhlcndpc2VcbiAqL1xuXG5pcy5lcXVhbCA9IGZ1bmN0aW9uIGVxdWFsKHZhbHVlLCBvdGhlcikge1xuICBpZiAodmFsdWUgPT09IG90aGVyKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICB2YXIgdHlwZSA9IHRvU3RyLmNhbGwodmFsdWUpO1xuICB2YXIga2V5O1xuXG4gIGlmICh0eXBlICE9PSB0b1N0ci5jYWxsKG90aGVyKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmICh0eXBlID09PSAnW29iamVjdCBPYmplY3RdJykge1xuICAgIGZvciAoa2V5IGluIHZhbHVlKSB7XG4gICAgICBpZiAoIWlzLmVxdWFsKHZhbHVlW2tleV0sIG90aGVyW2tleV0pIHx8ICEoa2V5IGluIG90aGVyKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAoa2V5IGluIG90aGVyKSB7XG4gICAgICBpZiAoIWlzLmVxdWFsKHZhbHVlW2tleV0sIG90aGVyW2tleV0pIHx8ICEoa2V5IGluIHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaWYgKHR5cGUgPT09ICdbb2JqZWN0IEFycmF5XScpIHtcbiAgICBrZXkgPSB2YWx1ZS5sZW5ndGg7XG4gICAgaWYgKGtleSAhPT0gb3RoZXIubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHdoaWxlIChrZXktLSkge1xuICAgICAgaWYgKCFpcy5lcXVhbCh2YWx1ZVtrZXldLCBvdGhlcltrZXldKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaWYgKHR5cGUgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXScpIHtcbiAgICByZXR1cm4gdmFsdWUucHJvdG90eXBlID09PSBvdGhlci5wcm90b3R5cGU7XG4gIH1cblxuICBpZiAodHlwZSA9PT0gJ1tvYmplY3QgRGF0ZV0nKSB7XG4gICAgcmV0dXJuIHZhbHVlLmdldFRpbWUoKSA9PT0gb3RoZXIuZ2V0VGltZSgpO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuLyoqXG4gKiBpcy5ob3N0ZWRcbiAqIFRlc3QgaWYgYHZhbHVlYCBpcyBob3N0ZWQgYnkgYGhvc3RgLlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlIHRvIHRlc3RcbiAqIEBwYXJhbSB7TWl4ZWR9IGhvc3QgaG9zdCB0byB0ZXN0IHdpdGhcbiAqIEByZXR1cm4ge0Jvb2xlYW59IHRydWUgaWYgYHZhbHVlYCBpcyBob3N0ZWQgYnkgYGhvc3RgLCBmYWxzZSBvdGhlcndpc2VcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuaXMuaG9zdGVkID0gZnVuY3Rpb24odmFsdWUsIGhvc3QpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgaG9zdFt2YWx1ZV07XG4gIHJldHVybiB0eXBlID09PSAnb2JqZWN0JyA/ICEhaG9zdFt2YWx1ZV0gOiAhTk9OX0hPU1RfVFlQRVNbdHlwZV07XG59O1xuXG4vKipcbiAqIGlzLmluc3RhbmNlXG4gKiBUZXN0IGlmIGB2YWx1ZWAgaXMgYW4gaW5zdGFuY2Ugb2YgYGNvbnN0cnVjdG9yYC5cbiAqXG4gKiBAcGFyYW0ge01peGVkfSB2YWx1ZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJuIHtCb29sZWFufSB0cnVlIGlmIGB2YWx1ZWAgaXMgYW4gaW5zdGFuY2Ugb2YgYGNvbnN0cnVjdG9yYFxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5pcy5pbnN0YW5jZSA9IGlzWydpbnN0YW5jZW9mJ10gPSBmdW5jdGlvbih2YWx1ZSwgY29uc3RydWN0b3IpIHtcbiAgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgY29uc3RydWN0b3I7XG59O1xuXG4vKipcbiAqIGlzLm5pbCAvIGlzLm51bGxcbiAqIFRlc3QgaWYgYHZhbHVlYCBpcyBudWxsLlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm4ge0Jvb2xlYW59IHRydWUgaWYgYHZhbHVlYCBpcyBudWxsLCBmYWxzZSBvdGhlcndpc2VcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuaXMubmlsID0gaXNbJ251bGwnXSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gbnVsbDtcbn07XG5cbi8qKlxuICogaXMudW5kZWYgLyBpcy51bmRlZmluZWRcbiAqIFRlc3QgaWYgYHZhbHVlYCBpcyB1bmRlZmluZWQuXG4gKlxuICogQHBhcmFtIHtNaXhlZH0gdmFsdWUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybiB7Qm9vbGVhbn0gdHJ1ZSBpZiBgdmFsdWVgIGlzIHVuZGVmaW5lZCwgZmFsc2Ugb3RoZXJ3aXNlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmlzLnVuZGVmID0gaXMudW5kZWZpbmVkID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCc7XG59O1xuXG4vKipcbiAqIFRlc3QgYXJndW1lbnRzLlxuICovXG5cbi8qKlxuICogaXMuYXJnc1xuICogVGVzdCBpZiBgdmFsdWVgIGlzIGFuIGFyZ3VtZW50cyBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtNaXhlZH0gdmFsdWUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybiB7Qm9vbGVhbn0gdHJ1ZSBpZiBgdmFsdWVgIGlzIGFuIGFyZ3VtZW50cyBvYmplY3QsIGZhbHNlIG90aGVyd2lzZVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5pcy5hcmdzID0gaXMuYXJndW1lbnRzID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgdmFyIGlzU3RhbmRhcmRBcmd1bWVudHMgPSB0b1N0ci5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgQXJndW1lbnRzXSc7XG4gIHZhciBpc09sZEFyZ3VtZW50cyA9ICFpcy5hcnJheSh2YWx1ZSkgJiYgaXMuYXJyYXlsaWtlKHZhbHVlKSAmJiBpcy5vYmplY3QodmFsdWUpICYmIGlzLmZuKHZhbHVlXG4gICAgLmNhbGxlZSk7XG4gIHJldHVybiBpc1N0YW5kYXJkQXJndW1lbnRzIHx8IGlzT2xkQXJndW1lbnRzO1xufTtcblxuLyoqXG4gKiBUZXN0IGFycmF5LlxuICovXG5cbi8qKlxuICogaXMuYXJyYXlcbiAqIFRlc3QgaWYgJ3ZhbHVlJyBpcyBhbiBhcnJheS5cbiAqXG4gKiBAcGFyYW0ge01peGVkfSB2YWx1ZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJuIHtCb29sZWFufSB0cnVlIGlmIGB2YWx1ZWAgaXMgYW4gYXJyYXksIGZhbHNlIG90aGVyd2lzZVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5pcy5hcnJheSA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIHRvU3RyLmNhbGwodmFsdWUpID09PSAnW29iamVjdCBBcnJheV0nO1xufTtcblxuLyoqXG4gKiBpcy5hcmd1bWVudHMuZW1wdHlcbiAqIFRlc3QgaWYgYHZhbHVlYCBpcyBhbiBlbXB0eSBhcmd1bWVudHMgb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm4ge0Jvb2xlYW59IHRydWUgaWYgYHZhbHVlYCBpcyBhbiBlbXB0eSBhcmd1bWVudHMgb2JqZWN0LCBmYWxzZSBvdGhlcndpc2VcbiAqIEBhcGkgcHVibGljXG4gKi9cbmlzLmFyZ3MuZW1wdHkgPSBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gaXMuYXJncyh2YWx1ZSkgJiYgdmFsdWUubGVuZ3RoID09PSAwO1xufTtcblxuLyoqXG4gKiBpcy5hcnJheS5lbXB0eVxuICogVGVzdCBpZiBgdmFsdWVgIGlzIGFuIGVtcHR5IGFycmF5LlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm4ge0Jvb2xlYW59IHRydWUgaWYgYHZhbHVlYCBpcyBhbiBlbXB0eSBhcnJheSwgZmFsc2Ugb3RoZXJ3aXNlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5pcy5hcnJheS5lbXB0eSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiBpcy5hcnJheSh2YWx1ZSkgJiYgdmFsdWUubGVuZ3RoID09PSAwO1xufTtcblxuLyoqXG4gKiBpcy5hcnJheWxpa2VcbiAqIFRlc3QgaWYgYHZhbHVlYCBpcyBhbiBhcnJheWxpa2Ugb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm4ge0Jvb2xlYW59IHRydWUgaWYgYHZhbHVlYCBpcyBhbiBhcmd1bWVudHMgb2JqZWN0LCBmYWxzZSBvdGhlcndpc2VcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuaXMuYXJyYXlsaWtlID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgIWlzLmJvb2wodmFsdWUpICYmIG93bnMuY2FsbCh2YWx1ZSwgJ2xlbmd0aCcpICYmIGlzRmluaXRlKHZhbHVlLmxlbmd0aCkgJiYgaXNcbiAgICAubnVtYmVyKHZhbHVlLmxlbmd0aCkgJiYgdmFsdWUubGVuZ3RoID49IDA7XG59O1xuXG4vKipcbiAqIFRlc3QgYm9vbGVhbi5cbiAqL1xuXG4vKipcbiAqIGlzLmJvb2xcbiAqIFRlc3QgaWYgYHZhbHVlYCBpcyBhIGJvb2xlYW4uXG4gKlxuICogQHBhcmFtIHtNaXhlZH0gdmFsdWUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybiB7Qm9vbGVhbn0gdHJ1ZSBpZiBgdmFsdWVgIGlzIGEgYm9vbGVhbiwgZmFsc2Ugb3RoZXJ3aXNlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmlzLmJvb2wgPSBpc1snYm9vbGVhbiddID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIHRvU3RyLmNhbGwodmFsdWUpID09PSAnW29iamVjdCBCb29sZWFuXSc7XG59O1xuXG4vKipcbiAqIGlzLmZhbHNlXG4gKiBUZXN0IGlmIGB2YWx1ZWAgaXMgZmFsc2UuXG4gKlxuICogQHBhcmFtIHtNaXhlZH0gdmFsdWUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybiB7Qm9vbGVhbn0gdHJ1ZSBpZiBgdmFsdWVgIGlzIGZhbHNlLCBmYWxzZSBvdGhlcndpc2VcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuaXNbJ2ZhbHNlJ10gPSBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gaXMuYm9vbCh2YWx1ZSkgJiYgQm9vbGVhbihOdW1iZXIodmFsdWUpKSA9PT0gZmFsc2U7XG59O1xuXG4vKipcbiAqIGlzLnRydWVcbiAqIFRlc3QgaWYgYHZhbHVlYCBpcyB0cnVlLlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm4ge0Jvb2xlYW59IHRydWUgaWYgYHZhbHVlYCBpcyB0cnVlLCBmYWxzZSBvdGhlcndpc2VcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuaXNbJ3RydWUnXSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiBpcy5ib29sKHZhbHVlKSAmJiBCb29sZWFuKE51bWJlcih2YWx1ZSkpID09PSB0cnVlO1xufTtcblxuLyoqXG4gKiBUZXN0IGRhdGUuXG4gKi9cblxuLyoqXG4gKiBpcy5kYXRlXG4gKiBUZXN0IGlmIGB2YWx1ZWAgaXMgYSBkYXRlLlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm4ge0Jvb2xlYW59IHRydWUgaWYgYHZhbHVlYCBpcyBhIGRhdGUsIGZhbHNlIG90aGVyd2lzZVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5pcy5kYXRlID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIHRvU3RyLmNhbGwodmFsdWUpID09PSAnW29iamVjdCBEYXRlXSc7XG59O1xuXG4vKipcbiAqIGlzLmRhdGUudmFsaWRcbiAqIFRlc3QgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGRhdGUuXG4gKlxuICogQHBhcmFtIHtNaXhlZH0gdmFsdWUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge0Jvb2xlYW59IHRydWUgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGRhdGUsIGZhbHNlIG90aGVyd2lzZVxuICovXG5pcy5kYXRlLnZhbGlkID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIGlzLmRhdGUodmFsdWUpICYmICFpc05hTihOdW1iZXIodmFsdWUpKTtcbn07XG5cbi8qKlxuICogVGVzdCBlbGVtZW50LlxuICovXG5cbi8qKlxuICogaXMuZWxlbWVudFxuICogVGVzdCBpZiBgdmFsdWVgIGlzIGFuIGh0bWwgZWxlbWVudC5cbiAqXG4gKiBAcGFyYW0ge01peGVkfSB2YWx1ZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJuIHtCb29sZWFufSB0cnVlIGlmIGB2YWx1ZWAgaXMgYW4gSFRNTCBFbGVtZW50LCBmYWxzZSBvdGhlcndpc2VcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuaXMuZWxlbWVudCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBIVE1MRWxlbWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsdWUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCAmJlxuICAgIHZhbHVlLm5vZGVUeXBlID09PSAxO1xufTtcblxuLyoqXG4gKiBUZXN0IGVycm9yLlxuICovXG5cbi8qKlxuICogaXMuZXJyb3JcbiAqIFRlc3QgaWYgYHZhbHVlYCBpcyBhbiBlcnJvciBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtNaXhlZH0gdmFsdWUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybiB7Qm9vbGVhbn0gdHJ1ZSBpZiBgdmFsdWVgIGlzIGFuIGVycm9yIG9iamVjdCwgZmFsc2Ugb3RoZXJ3aXNlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmlzLmVycm9yID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIHRvU3RyLmNhbGwodmFsdWUpID09PSAnW29iamVjdCBFcnJvcl0nO1xufTtcblxuLyoqXG4gKiBUZXN0IGZ1bmN0aW9uLlxuICovXG5cbi8qKlxuICogaXMuZm4gLyBpcy5mdW5jdGlvbiAoZGVwcmVjYXRlZClcbiAqIFRlc3QgaWYgYHZhbHVlYCBpcyBhIGZ1bmN0aW9uLlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm4ge0Jvb2xlYW59IHRydWUgaWYgYHZhbHVlYCBpcyBhIGZ1bmN0aW9uLCBmYWxzZSBvdGhlcndpc2VcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuaXMuZm4gPSBpc1snZnVuY3Rpb24nXSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHZhciBpc0FsZXJ0ID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsdWUgPT09IHdpbmRvdy5hbGVydDtcbiAgcmV0dXJuIGlzQWxlcnQgfHwgdG9TdHIuY2FsbCh2YWx1ZSkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG59O1xuXG4vKipcbiAqIFRlc3QgbnVtYmVyLlxuICovXG5cbi8qKlxuICogaXMubnVtYmVyXG4gKiBUZXN0IGlmIGB2YWx1ZWAgaXMgYSBudW1iZXIuXG4gKlxuICogQHBhcmFtIHtNaXhlZH0gdmFsdWUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybiB7Qm9vbGVhbn0gdHJ1ZSBpZiBgdmFsdWVgIGlzIGEgbnVtYmVyLCBmYWxzZSBvdGhlcndpc2VcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuaXMubnVtYmVyID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIHRvU3RyLmNhbGwodmFsdWUpID09PSAnW29iamVjdCBOdW1iZXJdJztcbn07XG5cbi8qKlxuICogaXMuaW5maW5pdGVcbiAqIFRlc3QgaWYgYHZhbHVlYCBpcyBwb3NpdGl2ZSBvciBuZWdhdGl2ZSBpbmZpbml0eS5cbiAqXG4gKiBAcGFyYW0ge01peGVkfSB2YWx1ZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJuIHtCb29sZWFufSB0cnVlIGlmIGB2YWx1ZWAgaXMgcG9zaXRpdmUgb3IgbmVnYXRpdmUgSW5maW5pdHksIGZhbHNlIG90aGVyd2lzZVxuICogQGFwaSBwdWJsaWNcbiAqL1xuaXMuaW5maW5pdGUgPSBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgPT09IEluZmluaXR5IHx8IHZhbHVlID09PSAtSW5maW5pdHk7XG59O1xuXG4vKipcbiAqIGlzLmRlY2ltYWxcbiAqIFRlc3QgaWYgYHZhbHVlYCBpcyBhIGRlY2ltYWwgbnVtYmVyLlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm4ge0Jvb2xlYW59IHRydWUgaWYgYHZhbHVlYCBpcyBhIGRlY2ltYWwgbnVtYmVyLCBmYWxzZSBvdGhlcndpc2VcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuaXMuZGVjaW1hbCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiBpcy5udW1iZXIodmFsdWUpICYmICFpc0FjdHVhbE5hTih2YWx1ZSkgJiYgIWlzLmluZmluaXRlKHZhbHVlKSAmJiB2YWx1ZSAlIDEgIT09IDA7XG59O1xuXG4vKipcbiAqIGlzLmRpdmlzaWJsZUJ5XG4gKiBUZXN0IGlmIGB2YWx1ZWAgaXMgZGl2aXNpYmxlIGJ5IGBuYC5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gdmFsdWUgdmFsdWUgdG8gdGVzdFxuICogQHBhcmFtIHtOdW1iZXJ9IG4gZGl2aWRlbmRcbiAqIEByZXR1cm4ge0Jvb2xlYW59IHRydWUgaWYgYHZhbHVlYCBpcyBkaXZpc2libGUgYnkgYG5gLCBmYWxzZSBvdGhlcndpc2VcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuaXMuZGl2aXNpYmxlQnkgPSBmdW5jdGlvbih2YWx1ZSwgbikge1xuICB2YXIgaXNEaXZpZGVuZEluZmluaXRlID0gaXMuaW5maW5pdGUodmFsdWUpO1xuICB2YXIgaXNEaXZpc29ySW5maW5pdGUgPSBpcy5pbmZpbml0ZShuKTtcbiAgdmFyIGlzTm9uWmVyb051bWJlciA9IGlzLm51bWJlcih2YWx1ZSkgJiYgIWlzQWN0dWFsTmFOKHZhbHVlKSAmJiBpcy5udW1iZXIobikgJiYgIWlzQWN0dWFsTmFOKG4pICYmXG4gICAgbiAhPT0gMDtcbiAgcmV0dXJuIGlzRGl2aWRlbmRJbmZpbml0ZSB8fCBpc0Rpdmlzb3JJbmZpbml0ZSB8fCAoaXNOb25aZXJvTnVtYmVyICYmIHZhbHVlICUgbiA9PT0gMCk7XG59O1xuXG4vKipcbiAqIGlzLmludGVnZXJcbiAqIFRlc3QgaWYgYHZhbHVlYCBpcyBhbiBpbnRlZ2VyLlxuICpcbiAqIEBwYXJhbSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJuIHtCb29sZWFufSB0cnVlIGlmIGB2YWx1ZWAgaXMgYW4gaW50ZWdlciwgZmFsc2Ugb3RoZXJ3aXNlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmlzLmludGVnZXIgPSBpc1snaW50J10gPSBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gaXMubnVtYmVyKHZhbHVlKSAmJiAhaXNBY3R1YWxOYU4odmFsdWUpICYmIHZhbHVlICUgMSA9PT0gMDtcbn07XG5cbi8qKlxuICogaXMubWF4aW11bVxuICogVGVzdCBpZiBgdmFsdWVgIGlzIGdyZWF0ZXIgdGhhbiAnb3RoZXJzJyB2YWx1ZXMuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IHZhbHVlIHZhbHVlIHRvIHRlc3RcbiAqIEBwYXJhbSB7QXJyYXl9IG90aGVycyB2YWx1ZXMgdG8gY29tcGFyZSB3aXRoXG4gKiBAcmV0dXJuIHtCb29sZWFufSB0cnVlIGlmIGB2YWx1ZWAgaXMgZ3JlYXRlciB0aGFuIGBvdGhlcnNgIHZhbHVlc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5pcy5tYXhpbXVtID0gZnVuY3Rpb24odmFsdWUsIG90aGVycykge1xuICBpZiAoaXNBY3R1YWxOYU4odmFsdWUpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignTmFOIGlzIG5vdCBhIHZhbGlkIHZhbHVlJyk7XG4gIH0gZWxzZSBpZiAoIWlzLmFycmF5bGlrZShvdGhlcnMpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignc2Vjb25kIGFyZ3VtZW50IG11c3QgYmUgYXJyYXktbGlrZScpO1xuICB9XG4gIHZhciBsZW4gPSBvdGhlcnMubGVuZ3RoO1xuXG4gIHdoaWxlICgtLWxlbiA+PSAwKSB7XG4gICAgaWYgKHZhbHVlIDwgb3RoZXJzW2xlbl0pIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbi8qKlxuICogaXMubWluaW11bVxuICogVGVzdCBpZiBgdmFsdWVgIGlzIGxlc3MgdGhhbiBgb3RoZXJzYCB2YWx1ZXMuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IHZhbHVlIHZhbHVlIHRvIHRlc3RcbiAqIEBwYXJhbSB7QXJyYXl9IG90aGVycyB2YWx1ZXMgdG8gY29tcGFyZSB3aXRoXG4gKiBAcmV0dXJuIHtCb29sZWFufSB0cnVlIGlmIGB2YWx1ZWAgaXMgbGVzcyB0aGFuIGBvdGhlcnNgIHZhbHVlc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5pcy5taW5pbXVtID0gZnVuY3Rpb24odmFsdWUsIG90aGVycykge1xuICBpZiAoaXNBY3R1YWxOYU4odmFsdWUpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignTmFOIGlzIG5vdCBhIHZhbGlkIHZhbHVlJyk7XG4gIH0gZWxzZSBpZiAoIWlzLmFycmF5bGlrZShvdGhlcnMpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignc2Vjb25kIGFyZ3VtZW50IG11c3QgYmUgYXJyYXktbGlrZScpO1xuICB9XG4gIHZhciBsZW4gPSBvdGhlcnMubGVuZ3RoO1xuXG4gIHdoaWxlICgtLWxlbiA+PSAwKSB7XG4gICAgaWYgKHZhbHVlID4gb3RoZXJzW2xlbl0pIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbi8qKlxuICogaXMubmFuXG4gKiBUZXN0IGlmIGB2YWx1ZWAgaXMgbm90IGEgbnVtYmVyLlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm4ge0Jvb2xlYW59IHRydWUgaWYgYHZhbHVlYCBpcyBub3QgYSBudW1iZXIsIGZhbHNlIG90aGVyd2lzZVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5pcy5uYW4gPSBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gIWlzLm51bWJlcih2YWx1ZSkgfHwgdmFsdWUgIT09IHZhbHVlO1xufTtcblxuLyoqXG4gKiBpcy5ldmVuXG4gKiBUZXN0IGlmIGB2YWx1ZWAgaXMgYW4gZXZlbiBudW1iZXIuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IHZhbHVlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm4ge0Jvb2xlYW59IHRydWUgaWYgYHZhbHVlYCBpcyBhbiBldmVuIG51bWJlciwgZmFsc2Ugb3RoZXJ3aXNlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmlzLmV2ZW4gPSBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gaXMuaW5maW5pdGUodmFsdWUpIHx8IChpcy5udW1iZXIodmFsdWUpICYmIHZhbHVlID09PSB2YWx1ZSAmJiB2YWx1ZSAlIDIgPT09IDApO1xufTtcblxuLyoqXG4gKiBpcy5vZGRcbiAqIFRlc3QgaWYgYHZhbHVlYCBpcyBhbiBvZGQgbnVtYmVyLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSB2YWx1ZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJuIHtCb29sZWFufSB0cnVlIGlmIGB2YWx1ZWAgaXMgYW4gb2RkIG51bWJlciwgZmFsc2Ugb3RoZXJ3aXNlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmlzLm9kZCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiBpcy5pbmZpbml0ZSh2YWx1ZSkgfHwgKGlzLm51bWJlcih2YWx1ZSkgJiYgdmFsdWUgPT09IHZhbHVlICYmIHZhbHVlICUgMiAhPT0gMCk7XG59O1xuXG4vKipcbiAqIGlzLmdlXG4gKiBUZXN0IGlmIGB2YWx1ZWAgaXMgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvIGBvdGhlcmAuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IHZhbHVlIHZhbHVlIHRvIHRlc3RcbiAqIEBwYXJhbSB7TnVtYmVyfSBvdGhlciB2YWx1ZSB0byBjb21wYXJlIHdpdGhcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmlzLmdlID0gZnVuY3Rpb24odmFsdWUsIG90aGVyKSB7XG4gIGlmIChpc0FjdHVhbE5hTih2YWx1ZSkgfHwgaXNBY3R1YWxOYU4ob3RoZXIpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignTmFOIGlzIG5vdCBhIHZhbGlkIHZhbHVlJyk7XG4gIH1cbiAgcmV0dXJuICFpcy5pbmZpbml0ZSh2YWx1ZSkgJiYgIWlzLmluZmluaXRlKG90aGVyKSAmJiB2YWx1ZSA+PSBvdGhlcjtcbn07XG5cbi8qKlxuICogaXMuZ3RcbiAqIFRlc3QgaWYgYHZhbHVlYCBpcyBncmVhdGVyIHRoYW4gYG90aGVyYC5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gdmFsdWUgdmFsdWUgdG8gdGVzdFxuICogQHBhcmFtIHtOdW1iZXJ9IG90aGVyIHZhbHVlIHRvIGNvbXBhcmUgd2l0aFxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuaXMuZ3QgPSBmdW5jdGlvbih2YWx1ZSwgb3RoZXIpIHtcbiAgaWYgKGlzQWN0dWFsTmFOKHZhbHVlKSB8fCBpc0FjdHVhbE5hTihvdGhlcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdOYU4gaXMgbm90IGEgdmFsaWQgdmFsdWUnKTtcbiAgfVxuICByZXR1cm4gIWlzLmluZmluaXRlKHZhbHVlKSAmJiAhaXMuaW5maW5pdGUob3RoZXIpICYmIHZhbHVlID4gb3RoZXI7XG59O1xuXG4vKipcbiAqIGlzLmxlXG4gKiBUZXN0IGlmIGB2YWx1ZWAgaXMgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIGBvdGhlcmAuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IHZhbHVlIHZhbHVlIHRvIHRlc3RcbiAqIEBwYXJhbSB7TnVtYmVyfSBvdGhlciB2YWx1ZSB0byBjb21wYXJlIHdpdGhcbiAqIEByZXR1cm4ge0Jvb2xlYW59IGlmICd2YWx1ZScgaXMgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICdvdGhlcidcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuaXMubGUgPSBmdW5jdGlvbih2YWx1ZSwgb3RoZXIpIHtcbiAgaWYgKGlzQWN0dWFsTmFOKHZhbHVlKSB8fCBpc0FjdHVhbE5hTihvdGhlcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdOYU4gaXMgbm90IGEgdmFsaWQgdmFsdWUnKTtcbiAgfVxuICByZXR1cm4gIWlzLmluZmluaXRlKHZhbHVlKSAmJiAhaXMuaW5maW5pdGUob3RoZXIpICYmIHZhbHVlIDw9IG90aGVyO1xufTtcblxuLyoqXG4gKiBpcy5sdFxuICogVGVzdCBpZiBgdmFsdWVgIGlzIGxlc3MgdGhhbiBgb3RoZXJgLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSB2YWx1ZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcGFyYW0ge051bWJlcn0gb3RoZXIgdmFsdWUgdG8gY29tcGFyZSB3aXRoXG4gKiBAcmV0dXJuIHtCb29sZWFufSBpZiBgdmFsdWVgIGlzIGxlc3MgdGhhbiBgb3RoZXJgXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmlzLmx0ID0gZnVuY3Rpb24odmFsdWUsIG90aGVyKSB7XG4gIGlmIChpc0FjdHVhbE5hTih2YWx1ZSkgfHwgaXNBY3R1YWxOYU4ob3RoZXIpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignTmFOIGlzIG5vdCBhIHZhbGlkIHZhbHVlJyk7XG4gIH1cbiAgcmV0dXJuICFpcy5pbmZpbml0ZSh2YWx1ZSkgJiYgIWlzLmluZmluaXRlKG90aGVyKSAmJiB2YWx1ZSA8IG90aGVyO1xufTtcblxuLyoqXG4gKiBpcy53aXRoaW5cbiAqIFRlc3QgaWYgYHZhbHVlYCBpcyB3aXRoaW4gYHN0YXJ0YCBhbmQgYGZpbmlzaGAuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IHZhbHVlIHZhbHVlIHRvIHRlc3RcbiAqIEBwYXJhbSB7TnVtYmVyfSBzdGFydCBsb3dlciBib3VuZFxuICogQHBhcmFtIHtOdW1iZXJ9IGZpbmlzaCB1cHBlciBib3VuZFxuICogQHJldHVybiB7Qm9vbGVhbn0gdHJ1ZSBpZiAndmFsdWUnIGlzIGlzIHdpdGhpbiAnc3RhcnQnIGFuZCAnZmluaXNoJ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuaXMud2l0aGluID0gZnVuY3Rpb24odmFsdWUsIHN0YXJ0LCBmaW5pc2gpIHtcbiAgaWYgKGlzQWN0dWFsTmFOKHZhbHVlKSB8fCBpc0FjdHVhbE5hTihzdGFydCkgfHwgaXNBY3R1YWxOYU4oZmluaXNoKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ05hTiBpcyBub3QgYSB2YWxpZCB2YWx1ZScpO1xuICB9IGVsc2UgaWYgKCFpcy5udW1iZXIodmFsdWUpIHx8ICFpcy5udW1iZXIoc3RhcnQpIHx8ICFpcy5udW1iZXIoZmluaXNoKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2FsbCBhcmd1bWVudHMgbXVzdCBiZSBudW1iZXJzJyk7XG4gIH1cbiAgdmFyIGlzQW55SW5maW5pdGUgPSBpcy5pbmZpbml0ZSh2YWx1ZSkgfHwgaXMuaW5maW5pdGUoc3RhcnQpIHx8IGlzLmluZmluaXRlKGZpbmlzaCk7XG4gIHJldHVybiBpc0FueUluZmluaXRlIHx8ICh2YWx1ZSA+PSBzdGFydCAmJiB2YWx1ZSA8PSBmaW5pc2gpO1xufTtcblxuLyoqXG4gKiBUZXN0IG9iamVjdC5cbiAqL1xuXG4vKipcbiAqIGlzLm9iamVjdFxuICogVGVzdCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge01peGVkfSB2YWx1ZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJuIHtCb29sZWFufSB0cnVlIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBmYWxzZSBvdGhlcndpc2VcbiAqIEBhcGkgcHVibGljXG4gKi9cbmlzLm9iamVjdCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiB0b1N0ci5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgT2JqZWN0XSc7XG59O1xuXG4vKipcbiAqIGlzLnByaW1pdGl2ZVxuICogVGVzdCBpZiBgdmFsdWVgIGlzIGEgcHJpbWl0aXZlLlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm4ge0Jvb2xlYW59IHRydWUgaWYgYHZhbHVlYCBpcyBhIHByaW1pdGl2ZSwgZmFsc2Ugb3RoZXJ3aXNlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5pcy5wcmltaXRpdmUgPSBmdW5jdGlvbiBpc1ByaW1pdGl2ZSh2YWx1ZSkge1xuICBpZiAoIXZhbHVlKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgfHwgaXMub2JqZWN0KHZhbHVlKSB8fCBpcy5mbih2YWx1ZSkgfHwgaXMuYXJyYXkodmFsdWUpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiB0cnVlO1xufTtcblxuLyoqXG4gKiBpcy5oYXNoXG4gKiBUZXN0IGlmIGB2YWx1ZWAgaXMgYSBoYXNoIC0gYSBwbGFpbiBvYmplY3QgbGl0ZXJhbC5cbiAqXG4gKiBAcGFyYW0ge01peGVkfSB2YWx1ZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJuIHtCb29sZWFufSB0cnVlIGlmIGB2YWx1ZWAgaXMgYSBoYXNoLCBmYWxzZSBvdGhlcndpc2VcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuaXMuaGFzaCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiBpcy5vYmplY3QodmFsdWUpICYmIHZhbHVlLmNvbnN0cnVjdG9yID09PSBPYmplY3QgJiYgIXZhbHVlLm5vZGVUeXBlICYmICF2YWx1ZS5zZXRJbnRlcnZhbDtcbn07XG5cbi8qKlxuICogVGVzdCByZWdleHAuXG4gKi9cblxuLyoqXG4gKiBpcy5yZWdleHBcbiAqIFRlc3QgaWYgYHZhbHVlYCBpcyBhIHJlZ3VsYXIgZXhwcmVzc2lvbi5cbiAqXG4gKiBAcGFyYW0ge01peGVkfSB2YWx1ZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJuIHtCb29sZWFufSB0cnVlIGlmIGB2YWx1ZWAgaXMgYSByZWdleHAsIGZhbHNlIG90aGVyd2lzZVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5pcy5yZWdleHAgPSBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gdG9TdHIuY2FsbCh2YWx1ZSkgPT09ICdbb2JqZWN0IFJlZ0V4cF0nO1xufTtcblxuLyoqXG4gKiBUZXN0IHN0cmluZy5cbiAqL1xuXG4vKipcbiAqIGlzLnN0cmluZ1xuICogVGVzdCBpZiBgdmFsdWVgIGlzIGEgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm4ge0Jvb2xlYW59IHRydWUgaWYgJ3ZhbHVlJyBpcyBhIHN0cmluZywgZmFsc2Ugb3RoZXJ3aXNlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmlzLnN0cmluZyA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiB0b1N0ci5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgU3RyaW5nXSc7XG59O1xuXG4vKipcbiAqIFRlc3QgYmFzZTY0IHN0cmluZy5cbiAqL1xuXG4vKipcbiAqIGlzLmJhc2U2NFxuICogVGVzdCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYmFzZTY0IGVuY29kZWQgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm4ge0Jvb2xlYW59IHRydWUgaWYgJ3ZhbHVlJyBpcyBhIGJhc2U2NCBlbmNvZGVkIHN0cmluZywgZmFsc2Ugb3RoZXJ3aXNlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmlzLmJhc2U2NCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiBpcy5zdHJpbmcodmFsdWUpICYmICghdmFsdWUubGVuZ3RoIHx8IGJhc2U2NFJlZ2V4LnRlc3QodmFsdWUpKTtcbn07XG5cbi8qKlxuICogVGVzdCBiYXNlNjQgc3RyaW5nLlxuICovXG5cbi8qKlxuICogaXMuaGV4XG4gKiBUZXN0IGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBoZXggZW5jb2RlZCBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHtNaXhlZH0gdmFsdWUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybiB7Qm9vbGVhbn0gdHJ1ZSBpZiAndmFsdWUnIGlzIGEgaGV4IGVuY29kZWQgc3RyaW5nLCBmYWxzZSBvdGhlcndpc2VcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuaXMuaGV4ID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIGlzLnN0cmluZyh2YWx1ZSkgJiYgKCF2YWx1ZS5sZW5ndGggfHwgaGV4UmVnZXgudGVzdCh2YWx1ZSkpO1xufTtcblxuLyoqXG4gKiBpcy5zeW1ib2xcbiAqIFRlc3QgaWYgYHZhbHVlYCBpcyBhbiBFUzYgU3ltYm9sXG4gKlxuICogQHBhcmFtIHtNaXhlZH0gdmFsdWUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybiB7Qm9vbGVhbn0gdHJ1ZSBpZiBgdmFsdWVgIGlzIGEgU3ltYm9sLCBmYWxzZSBvdGhlcmlzZVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5pcy5zeW1ib2wgPSBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiB0b1N0ci5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgU3ltYm9sXScgJiYgdHlwZW9mIHN5bWJvbFZhbHVlT2ZcbiAgICAuY2FsbCh2YWx1ZSkgPT09ICdzeW1ib2wnO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpcztcbiJdfQ==