import is from './is.js';

function isBlankObject(value) {
  return value !== null && typeof value === 'object' && !Object.getPrototypeOf(value);
}

function forEach(obj, iterator, context) {
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var key, length;
  if (obj) {
    if (is.fn(obj)) {
      for (key in obj) {
        // Need to check if hasOwnProperty exists,
        // as on IE8 the result of querySelectorAll is an object without a hasOwnProperty function
        if (key !== 'prototype' && key !== 'length' && key !== 'name' && (!obj.hasOwnProperty ||
            obj.hasOwnProperty(key))) {
          iterator.call(context, obj[key], key, obj);
        }
      }
    } else if (is.array(obj) || is.arraylike(obj)) {
      var isPrimitive = typeof obj !== 'object';
      for (key = 0, length = obj.length; key < length; key++) {
        if (isPrimitive || key in obj) {
          iterator.call(context, obj[key], key, obj);
        }
      }
    } else if (obj.forEach && obj.forEach !== forEach) {
      obj.forEach(iterator, context, obj);
    } else if (isBlankObject(obj)) {
      // createMap() fast path --- Safe to avoid hasOwnProperty check because prototype chain is empty
      for (key in obj) {
        iterator.call(context, obj[key], key, obj);
      }
    } else if (typeof obj.hasOwnProperty === 'function') {
      // Slow path for objects inheriting Object.prototype, hasOwnProperty check needed
      for (key in obj) {
        if (obj.hasOwnProperty(key)) {
          iterator.call(context, obj[key], key, obj);
        }
      }
    } else {
      // Slow path for objects which do not have a method `hasOwnProperty`
      for (key in obj) {
        if (hasOwnProperty.call(obj, key)) {
          iterator.call(context, obj[key], key, obj);
        }
      }
    }
  }
  return obj;
}

function renderScore(score) {
  let hour = 0;
  let minute = 0;
  let second = 0;

  if (score) {
    hour = parseInt(score / (1000 * 60 * 60), 10);
    minute = parseInt((score % (1000 * 60 * 60)) / (1000 * 60), 10);
    second = parseInt((score % (1000 * 60)) / 1000, 10);
  }

  return {
    hour,
    minute,
    second,
  };
}

export default {
  each: forEach,
  renderScore,
};
