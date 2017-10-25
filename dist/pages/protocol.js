'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _getPrototypeOf = require('./../npm/babel-runtime/core-js/object/get-prototype-of.js');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('./../npm/babel-runtime/helpers/classCallCheck.js');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('./../npm/babel-runtime/helpers/possibleConstructorReturn.js');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('./../npm/babel-runtime/helpers/inherits.js');

var _inherits3 = _interopRequireDefault(_inherits2);

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _request = require('./../services/request.js');

var _request2 = _interopRequireDefault(_request);

var _urls = require('./../services/urls.js');

var _urls2 = _interopRequireDefault(_urls);

var _loading = require('./../services/loading.js');

var _loading2 = _interopRequireDefault(_loading);

var _global = require('./../services/global.js');

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Protocol = function (_wepy$page) {
  (0, _inherits3.default)(Protocol, _wepy$page);

  function Protocol() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Protocol);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Protocol.__proto__ || (0, _getPrototypeOf2.default)(Protocol)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '确认'
    }, _this.methods = {
      confirmOk: function confirmOk() {
        _global2.default.isOkFromProtocol = true;
        _global2.default.protocolIsReaded = true;
        _loading2.default.show();
        _request2.default.get(_urls2.default.setProtocolReaded).then(function () {
          _wepy2.default.navigateBack({
            delta: 1
          });
        }).finally(function () {
          _loading2.default.hide();
        });
      },
      confirmCancel: function confirmCancel() {
        _wepy2.default.navigateBack({
          delta: 1
        });
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  return Protocol;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Protocol , 'pages/protocol'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb3RvY29sLmpzIl0sIm5hbWVzIjpbIlByb3RvY29sIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm1ldGhvZHMiLCJjb25maXJtT2siLCJpc09rRnJvbVByb3RvY29sIiwicHJvdG9jb2xJc1JlYWRlZCIsInNob3ciLCJnZXQiLCJzZXRQcm90b2NvbFJlYWRlZCIsInRoZW4iLCJuYXZpZ2F0ZUJhY2siLCJkZWx0YSIsImZpbmFsbHkiLCJoaWRlIiwiY29uZmlybUNhbmNlbCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0lBQ3FCQSxROzs7Ozs7Ozs7Ozs7OztnTkFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxPLEdBQVU7QUFDUkMsaUJBQVcscUJBQU07QUFDZix5QkFBT0MsZ0JBQVAsR0FBMEIsSUFBMUI7QUFDQSx5QkFBT0MsZ0JBQVAsR0FBMEIsSUFBMUI7QUFDQSwwQkFBUUMsSUFBUjtBQUNBLDBCQUFRQyxHQUFSLENBQVksZUFBS0MsaUJBQWpCLEVBQW9DQyxJQUFwQyxDQUF5QyxZQUFNO0FBQzdDLHlCQUFLQyxZQUFMLENBQWtCO0FBQ2hCQyxtQkFBTztBQURTLFdBQWxCO0FBR0QsU0FKRCxFQUlHQyxPQUpILENBSVcsWUFBTTtBQUNmLDRCQUFRQyxJQUFSO0FBQ0QsU0FORDtBQU9ELE9BWk87QUFhUkMscUJBQWUseUJBQU07QUFDbkIsdUJBQUtKLFlBQUwsQ0FBa0I7QUFDaEJDLGlCQUFPO0FBRFMsU0FBbEI7QUFHRDtBQWpCTyxLOzs7O0VBSjBCLGVBQUtJLEk7O2tCQUF0QmhCLFEiLCJmaWxlIjoicHJvdG9jb2wuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG4gIGltcG9ydCByZXF1ZXN0IGZyb20gJy4uL3NlcnZpY2VzL3JlcXVlc3QuanMnO1xuICBpbXBvcnQgdXJscyBmcm9tICcuLi9zZXJ2aWNlcy91cmxzLmpzJztcbiAgaW1wb3J0IGxvYWRpbmcgZnJvbSAnLi4vc2VydmljZXMvbG9hZGluZy5qcyc7XG4gIGltcG9ydCBnbG9iYWwgZnJvbSAnLi4vc2VydmljZXMvZ2xvYmFsLmpzJztcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvdG9jb2wgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnoa7orqQnLFxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgY29uZmlybU9rOiAoKSA9PiB7XG4gICAgICAgIGdsb2JhbC5pc09rRnJvbVByb3RvY29sID0gdHJ1ZTtcbiAgICAgICAgZ2xvYmFsLnByb3RvY29sSXNSZWFkZWQgPSB0cnVlO1xuICAgICAgICBsb2FkaW5nLnNob3coKTtcbiAgICAgICAgcmVxdWVzdC5nZXQodXJscy5zZXRQcm90b2NvbFJlYWRlZCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgd2VweS5uYXZpZ2F0ZUJhY2soe1xuICAgICAgICAgICAgZGVsdGE6IDFcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSkuZmluYWxseSgoKSA9PiB7XG4gICAgICAgICAgbG9hZGluZy5oaWRlKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIGNvbmZpcm1DYW5jZWw6ICgpID0+IHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZUJhY2soe1xuICAgICAgICAgIGRlbHRhOiAxXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICB9XG4iXX0=