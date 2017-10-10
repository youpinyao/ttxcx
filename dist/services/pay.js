'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _defer = require('./defer.js');

var _defer2 = _interopRequireDefault(_defer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function doPay(data) {
  var deferred = (0, _defer2.default)();

  _wepy2.default.requestPayment({
    'timeStamp': data.timeStamp,
    'nonceStr': data.nonceStr,
    'package': data.package,
    'signType': data.signType,
    'paySign': data.paySign,
    'success': function success(res) {
      console.error('pay success', res);
      deferred.resolve(res);
    },
    'fail': function fail(res) {
      console.error('pay fail', res);
      deferred.reject(res);
    }
  });

  return deferred.promise;
}

exports.default = {
  doPay: doPay
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBheS5qcyJdLCJuYW1lcyI6WyJkb1BheSIsImRhdGEiLCJkZWZlcnJlZCIsInJlcXVlc3RQYXltZW50IiwidGltZVN0YW1wIiwibm9uY2VTdHIiLCJwYWNrYWdlIiwic2lnblR5cGUiLCJwYXlTaWduIiwicmVzIiwiY29uc29sZSIsImVycm9yIiwicmVzb2x2ZSIsInJlamVjdCIsInByb21pc2UiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7OztBQUVBLFNBQVNBLEtBQVQsQ0FBZUMsSUFBZixFQUFxQjtBQUNuQixNQUFNQyxXQUFXLHNCQUFqQjs7QUFFQSxpQkFBS0MsY0FBTCxDQUFvQjtBQUNsQixpQkFBYUYsS0FBS0csU0FEQTtBQUVsQixnQkFBWUgsS0FBS0ksUUFGQztBQUdsQixlQUFXSixLQUFLSyxPQUhFO0FBSWxCLGdCQUFZTCxLQUFLTSxRQUpDO0FBS2xCLGVBQVdOLEtBQUtPLE9BTEU7QUFNbEIsZUFBVyxpQkFBU0MsR0FBVCxFQUFjO0FBQ3ZCQyxjQUFRQyxLQUFSLENBQWMsYUFBZCxFQUE2QkYsR0FBN0I7QUFDQVAsZUFBU1UsT0FBVCxDQUFpQkgsR0FBakI7QUFDRCxLQVRpQjtBQVVsQixZQUFRLGNBQVNBLEdBQVQsRUFBYztBQUNwQkMsY0FBUUMsS0FBUixDQUFjLFVBQWQsRUFBMEJGLEdBQTFCO0FBQ0FQLGVBQVNXLE1BQVQsQ0FBZ0JKLEdBQWhCO0FBQ0Q7QUFiaUIsR0FBcEI7O0FBZ0JBLFNBQU9QLFNBQVNZLE9BQWhCO0FBQ0Q7O2tCQUVjO0FBQ2JkO0FBRGEsQyIsImZpbGUiOiJwYXkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCBkZWZlciBmcm9tICcuL2RlZmVyLmpzJztcblxuZnVuY3Rpb24gZG9QYXkoZGF0YSkge1xuICBjb25zdCBkZWZlcnJlZCA9IGRlZmVyKCk7XG5cbiAgd2VweS5yZXF1ZXN0UGF5bWVudCh7XG4gICAgJ3RpbWVTdGFtcCc6IGRhdGEudGltZVN0YW1wLFxuICAgICdub25jZVN0cic6IGRhdGEubm9uY2VTdHIsXG4gICAgJ3BhY2thZ2UnOiBkYXRhLnBhY2thZ2UsXG4gICAgJ3NpZ25UeXBlJzogZGF0YS5zaWduVHlwZSxcbiAgICAncGF5U2lnbic6IGRhdGEucGF5U2lnbixcbiAgICAnc3VjY2Vzcyc6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgY29uc29sZS5lcnJvcigncGF5IHN1Y2Nlc3MnLCByZXMpO1xuICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXMpO1xuICAgIH0sXG4gICAgJ2ZhaWwnOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ3BheSBmYWlsJywgcmVzKTtcbiAgICAgIGRlZmVycmVkLnJlamVjdChyZXMpO1xuICAgIH1cbiAgfSlcblxuICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBkb1BheVxufVxuIl19