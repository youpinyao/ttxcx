'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _getPrototypeOf = require('./../npm/babel-runtime/core-js/object/get-prototype-of.js');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('./../npm/babel-runtime/helpers/classCallCheck.js');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('./../npm/babel-runtime/helpers/createClass.js');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('./../npm/babel-runtime/helpers/possibleConstructorReturn.js');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('./../npm/babel-runtime/helpers/inherits.js');

var _inherits3 = _interopRequireDefault(_inherits2);

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BookingPaySuccess = function (_wepy$page) {
  (0, _inherits3.default)(BookingPaySuccess, _wepy$page);

  function BookingPaySuccess() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, BookingPaySuccess);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = BookingPaySuccess.__proto__ || (0, _getPrototypeOf2.default)(BookingPaySuccess)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '结果'
    }, _this.components = {}, _this.data = {
      detail: null
    }, _this.computed = {}, _this.methods = {
      toHome: function toHome() {
        _wepy2.default.reLaunch({
          url: '/pages/home'
        });
      }
    }, _this.events = {}, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(BookingPaySuccess, [{
    key: 'onShow',
    value: function onShow() {}
  }, {
    key: 'onLoad',
    value: function onLoad(option) {
      console.log('booking refund success on load');
      this.id = option.id;
    }
  }]);
  return BookingPaySuccess;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(BookingPaySuccess , 'pages/booking-refund-success'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJvb2tpbmctcmVmdW5kLXN1Y2Nlc3MuanMiXSwibmFtZXMiOlsiQm9va2luZ1BheVN1Y2Nlc3MiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcG9uZW50cyIsImRhdGEiLCJkZXRhaWwiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJ0b0hvbWUiLCJyZUxhdW5jaCIsInVybCIsImV2ZW50cyIsIm9wdGlvbiIsImNvbnNvbGUiLCJsb2ciLCJpZCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNFOzs7Ozs7SUFFcUJBLGlCOzs7Ozs7Ozs7Ozs7OztrT0FDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUlUQyxVLEdBQWEsRSxRQUliQyxJLEdBQU87QUFDTEMsY0FBUTtBQURILEssUUFJUEMsUSxHQUFXLEUsUUFJWEMsTyxHQUFVO0FBQ1JDLGNBQVEsa0JBQU07QUFDWix1QkFBS0MsUUFBTCxDQUFjO0FBQ1pDLGVBQUs7QUFETyxTQUFkO0FBR0Q7QUFMTyxLLFFBUVZDLE0sR0FBUyxFOzs7Ozs2QkFJQSxDQUVSOzs7MkJBRU1DLE0sRUFBUTtBQUNiQyxjQUFRQyxHQUFSLENBQVksZ0NBQVo7QUFDQSxXQUFLQyxFQUFMLEdBQVVILE9BQU9HLEVBQWpCO0FBQ0Q7OztFQXBDNEMsZUFBS0MsSTs7a0JBQS9CaEIsaUIiLCJmaWxlIjoiYm9va2luZy1yZWZ1bmQtc3VjY2Vzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBCb29raW5nUGF5U3VjY2VzcyBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+e7k+aenCcsXG4gICAgfVxuXG4gICAgY29tcG9uZW50cyA9IHtcblxuICAgIH1cblxuICAgIGRhdGEgPSB7XG4gICAgICBkZXRhaWw6IG51bGwsXG4gICAgfVxuXG4gICAgY29tcHV0ZWQgPSB7XG5cbiAgICB9XG5cbiAgICBtZXRob2RzID0ge1xuICAgICAgdG9Ib21lOiAoKSA9PiB7XG4gICAgICAgIHdlcHkucmVMYXVuY2goe1xuICAgICAgICAgIHVybDogJy9wYWdlcy9ob21lJyxcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgIH1cblxuICAgIGV2ZW50cyA9IHtcblxuICAgIH1cblxuICAgIG9uU2hvdygpIHtcblxuICAgIH1cblxuICAgIG9uTG9hZChvcHRpb24pIHtcbiAgICAgIGNvbnNvbGUubG9nKCdib29raW5nIHJlZnVuZCBzdWNjZXNzIG9uIGxvYWQnKTtcbiAgICAgIHRoaXMuaWQgPSBvcHRpb24uaWQ7XG4gICAgfVxuICB9XG5cbiJdfQ==