"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function isBlankObject(e){return null!==e&&"object"===(void 0===e?"undefined":(0,_typeof3.default)(e))&&!(0,_getPrototypeOf2.default)(e)}function forEach(e,r,t){var o,n,f=Object.prototype.hasOwnProperty;if(e)if(_is2.default.fn(e))for(o in e)"prototype"===o||"length"===o||"name"===o||e.hasOwnProperty&&!e.hasOwnProperty(o)||r.call(t,e[o],o,e);else if(_is2.default.array(e)||_is2.default.arraylike(e)){var a="object"!==(void 0===e?"undefined":(0,_typeof3.default)(e));for(o=0,n=e.length;o<n;o++)(a||o in e)&&r.call(t,e[o],o,e)}else if(e.forEach&&e.forEach!==forEach)e.forEach(r,t,e);else if(isBlankObject(e))for(o in e)r.call(t,e[o],o,e);else if("function"==typeof e.hasOwnProperty)for(o in e)e.hasOwnProperty(o)&&r.call(t,e[o],o,e);else for(o in e)f.call(e,o)&&r.call(t,e[o],o,e);return e}function renderScore(e){var r=0,t=0,o=0;return e&&(r=parseInt(e/36e5,10),t=parseInt(e%36e5/6e4,10),o=parseInt(e%6e4/1e3,10)),{hour:r,minute:t,second:o}}Object.defineProperty(exports,"__esModule",{value:!0});var _getPrototypeOf=require("./../npm/babel-runtime/core-js/object/get-prototype-of.js"),_getPrototypeOf2=_interopRequireDefault(_getPrototypeOf),_typeof2=require("./../npm/babel-runtime/helpers/typeof.js"),_typeof3=_interopRequireDefault(_typeof2),_is=require("./is.js"),_is2=_interopRequireDefault(_is);exports.default={each:forEach,renderScore:renderScore};