'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('./../npm/babel-runtime/core-js/object/get-prototype-of.js');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _typeof2 = require('./../npm/babel-runtime/helpers/typeof.js');

var _typeof3 = _interopRequireDefault(_typeof2);

var _is = require('./is.js');

var _is2 = _interopRequireDefault(_is);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isBlankObject(value) {
  return value !== null && (typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) === 'object' && !(0, _getPrototypeOf2.default)(value);
}

function forEach(obj, iterator, context) {
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var key, length;
  if (obj) {
    if (_is2.default.fn(obj)) {
      for (key in obj) {
        // Need to check if hasOwnProperty exists,
        // as on IE8 the result of querySelectorAll is an object without a hasOwnProperty function
        if (key !== 'prototype' && key !== 'length' && key !== 'name' && (!obj.hasOwnProperty || obj.hasOwnProperty(key))) {
          iterator.call(context, obj[key], key, obj);
        }
      }
    } else if (_is2.default.array(obj) || _is2.default.arraylike(obj)) {
      var isPrimitive = (typeof obj === 'undefined' ? 'undefined' : (0, _typeof3.default)(obj)) !== 'object';
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
  var hour = 0;
  var minute = 0;
  var second = 0;

  if (score) {
    hour = parseInt(score / (1000 * 60 * 60), 10);
    minute = parseInt(score % (1000 * 60 * 60) / (1000 * 60), 10);
    second = parseInt(score % (1000 * 60) / 1000, 10);
  }

  return {
    hour: hour,
    minute: minute,
    second: second
  };
}

exports.default = {
  each: forEach,
  renderScore: renderScore
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWwuanMiXSwibmFtZXMiOlsiaXNCbGFua09iamVjdCIsInZhbHVlIiwiZm9yRWFjaCIsIm9iaiIsIml0ZXJhdG9yIiwiY29udGV4dCIsImhhc093blByb3BlcnR5IiwiT2JqZWN0IiwicHJvdG90eXBlIiwia2V5IiwibGVuZ3RoIiwiZm4iLCJjYWxsIiwiYXJyYXkiLCJhcnJheWxpa2UiLCJpc1ByaW1pdGl2ZSIsInJlbmRlclNjb3JlIiwic2NvcmUiLCJob3VyIiwibWludXRlIiwic2Vjb25kIiwicGFyc2VJbnQiLCJlYWNoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7QUFFQSxTQUFTQSxhQUFULENBQXVCQyxLQUF2QixFQUE4QjtBQUM1QixTQUFPQSxVQUFVLElBQVYsSUFBa0IsUUFBT0EsS0FBUCx1REFBT0EsS0FBUCxPQUFpQixRQUFuQyxJQUErQyxDQUFDLDhCQUFzQkEsS0FBdEIsQ0FBdkQ7QUFDRDs7QUFFRCxTQUFTQyxPQUFULENBQWlCQyxHQUFqQixFQUFzQkMsUUFBdEIsRUFBZ0NDLE9BQWhDLEVBQXlDO0FBQ3ZDLE1BQUlDLGlCQUFpQkMsT0FBT0MsU0FBUCxDQUFpQkYsY0FBdEM7QUFDQSxNQUFJRyxHQUFKLEVBQVNDLE1BQVQ7QUFDQSxNQUFJUCxHQUFKLEVBQVM7QUFDUCxRQUFJLGFBQUdRLEVBQUgsQ0FBTVIsR0FBTixDQUFKLEVBQWdCO0FBQ2QsV0FBS00sR0FBTCxJQUFZTixHQUFaLEVBQWlCO0FBQ2Y7QUFDQTtBQUNBLFlBQUlNLFFBQVEsV0FBUixJQUF1QkEsUUFBUSxRQUEvQixJQUEyQ0EsUUFBUSxNQUFuRCxLQUE4RCxDQUFDTixJQUFJRyxjQUFMLElBQzlESCxJQUFJRyxjQUFKLENBQW1CRyxHQUFuQixDQURBLENBQUosRUFDOEI7QUFDNUJMLG1CQUFTUSxJQUFULENBQWNQLE9BQWQsRUFBdUJGLElBQUlNLEdBQUosQ0FBdkIsRUFBaUNBLEdBQWpDLEVBQXNDTixHQUF0QztBQUNEO0FBQ0Y7QUFDRixLQVRELE1BU08sSUFBSSxhQUFHVSxLQUFILENBQVNWLEdBQVQsS0FBaUIsYUFBR1csU0FBSCxDQUFhWCxHQUFiLENBQXJCLEVBQXdDO0FBQzdDLFVBQUlZLGNBQWMsUUFBT1osR0FBUCx1REFBT0EsR0FBUCxPQUFlLFFBQWpDO0FBQ0EsV0FBS00sTUFBTSxDQUFOLEVBQVNDLFNBQVNQLElBQUlPLE1BQTNCLEVBQW1DRCxNQUFNQyxNQUF6QyxFQUFpREQsS0FBakQsRUFBd0Q7QUFDdEQsWUFBSU0sZUFBZU4sT0FBT04sR0FBMUIsRUFBK0I7QUFDN0JDLG1CQUFTUSxJQUFULENBQWNQLE9BQWQsRUFBdUJGLElBQUlNLEdBQUosQ0FBdkIsRUFBaUNBLEdBQWpDLEVBQXNDTixHQUF0QztBQUNEO0FBQ0Y7QUFDRixLQVBNLE1BT0EsSUFBSUEsSUFBSUQsT0FBSixJQUFlQyxJQUFJRCxPQUFKLEtBQWdCQSxPQUFuQyxFQUE0QztBQUNqREMsVUFBSUQsT0FBSixDQUFZRSxRQUFaLEVBQXNCQyxPQUF0QixFQUErQkYsR0FBL0I7QUFDRCxLQUZNLE1BRUEsSUFBSUgsY0FBY0csR0FBZCxDQUFKLEVBQXdCO0FBQzdCO0FBQ0EsV0FBS00sR0FBTCxJQUFZTixHQUFaLEVBQWlCO0FBQ2ZDLGlCQUFTUSxJQUFULENBQWNQLE9BQWQsRUFBdUJGLElBQUlNLEdBQUosQ0FBdkIsRUFBaUNBLEdBQWpDLEVBQXNDTixHQUF0QztBQUNEO0FBQ0YsS0FMTSxNQUtBLElBQUksT0FBT0EsSUFBSUcsY0FBWCxLQUE4QixVQUFsQyxFQUE4QztBQUNuRDtBQUNBLFdBQUtHLEdBQUwsSUFBWU4sR0FBWixFQUFpQjtBQUNmLFlBQUlBLElBQUlHLGNBQUosQ0FBbUJHLEdBQW5CLENBQUosRUFBNkI7QUFDM0JMLG1CQUFTUSxJQUFULENBQWNQLE9BQWQsRUFBdUJGLElBQUlNLEdBQUosQ0FBdkIsRUFBaUNBLEdBQWpDLEVBQXNDTixHQUF0QztBQUNEO0FBQ0Y7QUFDRixLQVBNLE1BT0E7QUFDTDtBQUNBLFdBQUtNLEdBQUwsSUFBWU4sR0FBWixFQUFpQjtBQUNmLFlBQUlHLGVBQWVNLElBQWYsQ0FBb0JULEdBQXBCLEVBQXlCTSxHQUF6QixDQUFKLEVBQW1DO0FBQ2pDTCxtQkFBU1EsSUFBVCxDQUFjUCxPQUFkLEVBQXVCRixJQUFJTSxHQUFKLENBQXZCLEVBQWlDQSxHQUFqQyxFQUFzQ04sR0FBdEM7QUFDRDtBQUNGO0FBQ0Y7QUFDRjtBQUNELFNBQU9BLEdBQVA7QUFDRDs7QUFFRCxTQUFTYSxXQUFULENBQXFCQyxLQUFyQixFQUE0QjtBQUMxQixNQUFJQyxPQUFPLENBQVg7QUFDQSxNQUFJQyxTQUFTLENBQWI7QUFDQSxNQUFJQyxTQUFTLENBQWI7O0FBRUEsTUFBSUgsS0FBSixFQUFXO0FBQ1RDLFdBQU9HLFNBQVNKLFNBQVMsT0FBTyxFQUFQLEdBQVksRUFBckIsQ0FBVCxFQUFtQyxFQUFuQyxDQUFQO0FBQ0FFLGFBQVNFLFNBQVVKLFNBQVMsT0FBTyxFQUFQLEdBQVksRUFBckIsQ0FBRCxJQUE4QixPQUFPLEVBQXJDLENBQVQsRUFBbUQsRUFBbkQsQ0FBVDtBQUNBRyxhQUFTQyxTQUFVSixTQUFTLE9BQU8sRUFBaEIsQ0FBRCxHQUF3QixJQUFqQyxFQUF1QyxFQUF2QyxDQUFUO0FBQ0Q7O0FBRUQsU0FBTztBQUNMQyxjQURLO0FBRUxDLGtCQUZLO0FBR0xDO0FBSEssR0FBUDtBQUtEOztrQkFFYztBQUNiRSxRQUFNcEIsT0FETztBQUViYztBQUZhLEMiLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBpcyBmcm9tICcuL2lzLmpzJztcblxuZnVuY3Rpb24gaXNCbGFua09iamVjdCh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiAhT2JqZWN0LmdldFByb3RvdHlwZU9mKHZhbHVlKTtcbn1cblxuZnVuY3Rpb24gZm9yRWFjaChvYmosIGl0ZXJhdG9yLCBjb250ZXh0KSB7XG4gIHZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG4gIHZhciBrZXksIGxlbmd0aDtcbiAgaWYgKG9iaikge1xuICAgIGlmIChpcy5mbihvYmopKSB7XG4gICAgICBmb3IgKGtleSBpbiBvYmopIHtcbiAgICAgICAgLy8gTmVlZCB0byBjaGVjayBpZiBoYXNPd25Qcm9wZXJ0eSBleGlzdHMsXG4gICAgICAgIC8vIGFzIG9uIElFOCB0aGUgcmVzdWx0IG9mIHF1ZXJ5U2VsZWN0b3JBbGwgaXMgYW4gb2JqZWN0IHdpdGhvdXQgYSBoYXNPd25Qcm9wZXJ0eSBmdW5jdGlvblxuICAgICAgICBpZiAoa2V5ICE9PSAncHJvdG90eXBlJyAmJiBrZXkgIT09ICdsZW5ndGgnICYmIGtleSAhPT0gJ25hbWUnICYmICghb2JqLmhhc093blByb3BlcnR5IHx8XG4gICAgICAgICAgICBvYmouaGFzT3duUHJvcGVydHkoa2V5KSkpIHtcbiAgICAgICAgICBpdGVyYXRvci5jYWxsKGNvbnRleHQsIG9ialtrZXldLCBrZXksIG9iaik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzLmFycmF5KG9iaikgfHwgaXMuYXJyYXlsaWtlKG9iaikpIHtcbiAgICAgIHZhciBpc1ByaW1pdGl2ZSA9IHR5cGVvZiBvYmogIT09ICdvYmplY3QnO1xuICAgICAgZm9yIChrZXkgPSAwLCBsZW5ndGggPSBvYmoubGVuZ3RoOyBrZXkgPCBsZW5ndGg7IGtleSsrKSB7XG4gICAgICAgIGlmIChpc1ByaW1pdGl2ZSB8fCBrZXkgaW4gb2JqKSB7XG4gICAgICAgICAgaXRlcmF0b3IuY2FsbChjb250ZXh0LCBvYmpba2V5XSwga2V5LCBvYmopO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChvYmouZm9yRWFjaCAmJiBvYmouZm9yRWFjaCAhPT0gZm9yRWFjaCkge1xuICAgICAgb2JqLmZvckVhY2goaXRlcmF0b3IsIGNvbnRleHQsIG9iaik7XG4gICAgfSBlbHNlIGlmIChpc0JsYW5rT2JqZWN0KG9iaikpIHtcbiAgICAgIC8vIGNyZWF0ZU1hcCgpIGZhc3QgcGF0aCAtLS0gU2FmZSB0byBhdm9pZCBoYXNPd25Qcm9wZXJ0eSBjaGVjayBiZWNhdXNlIHByb3RvdHlwZSBjaGFpbiBpcyBlbXB0eVxuICAgICAgZm9yIChrZXkgaW4gb2JqKSB7XG4gICAgICAgIGl0ZXJhdG9yLmNhbGwoY29udGV4dCwgb2JqW2tleV0sIGtleSwgb2JqKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBvYmouaGFzT3duUHJvcGVydHkgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIFNsb3cgcGF0aCBmb3Igb2JqZWN0cyBpbmhlcml0aW5nIE9iamVjdC5wcm90b3R5cGUsIGhhc093blByb3BlcnR5IGNoZWNrIG5lZWRlZFxuICAgICAgZm9yIChrZXkgaW4gb2JqKSB7XG4gICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgIGl0ZXJhdG9yLmNhbGwoY29udGV4dCwgb2JqW2tleV0sIGtleSwgb2JqKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBTbG93IHBhdGggZm9yIG9iamVjdHMgd2hpY2ggZG8gbm90IGhhdmUgYSBtZXRob2QgYGhhc093blByb3BlcnR5YFxuICAgICAgZm9yIChrZXkgaW4gb2JqKSB7XG4gICAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgICAgIGl0ZXJhdG9yLmNhbGwoY29udGV4dCwgb2JqW2tleV0sIGtleSwgb2JqKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gb2JqO1xufVxuXG5mdW5jdGlvbiByZW5kZXJTY29yZShzY29yZSkge1xuICBsZXQgaG91ciA9IDA7XG4gIGxldCBtaW51dGUgPSAwO1xuICBsZXQgc2Vjb25kID0gMDtcblxuICBpZiAoc2NvcmUpIHtcbiAgICBob3VyID0gcGFyc2VJbnQoc2NvcmUgLyAoMTAwMCAqIDYwICogNjApLCAxMCk7XG4gICAgbWludXRlID0gcGFyc2VJbnQoKHNjb3JlICUgKDEwMDAgKiA2MCAqIDYwKSkgLyAoMTAwMCAqIDYwKSwgMTApO1xuICAgIHNlY29uZCA9IHBhcnNlSW50KChzY29yZSAlICgxMDAwICogNjApKSAvIDEwMDAsIDEwKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgaG91cixcbiAgICBtaW51dGUsXG4gICAgc2Vjb25kLFxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGVhY2g6IGZvckVhY2gsXG4gIHJlbmRlclNjb3JlLFxufTtcbiJdfQ==