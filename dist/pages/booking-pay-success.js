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

var _request = require('./../services/request.js');

var _request2 = _interopRequireDefault(_request);

var _loading = require('./../services/loading.js');

var _loading2 = _interopRequireDefault(_loading);

var _urls = require('./../services/urls.js');

var _urls2 = _interopRequireDefault(_urls);

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
      toMe: function toMe() {
        _wepy2.default.redirectTo({
          url: '/pages/me'
        });
      },
      toHome: function toHome() {
        _wepy2.default.reLaunch({
          url: '/pages/home'
        });
      },
      loadData: function loadData() {
        _loading2.default.show();
        _request2.default.get(_urls2.default.bookingDetail, {
          bookingId: _this.id
        }).then(function (data) {
          _this.detail = data.result;
          _this.$apply();
        }).finally(function () {
          _loading2.default.hide();
        });
      }
    }, _this.events = {}, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(BookingPaySuccess, [{
    key: 'onShow',
    value: function onShow() {
      this.methods.loadData();
    }
  }, {
    key: 'onLoad',
    value: function onLoad(option) {
      console.log('booking pay success on load');
      this.id = option.id;
    }
  }]);
  return BookingPaySuccess;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(BookingPaySuccess , 'pages/booking-pay-success'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJvb2tpbmctcGF5LXN1Y2Nlc3MuanMiXSwibmFtZXMiOlsiQm9va2luZ1BheVN1Y2Nlc3MiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcG9uZW50cyIsImRhdGEiLCJkZXRhaWwiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJ0b01lIiwicmVkaXJlY3RUbyIsInVybCIsInRvSG9tZSIsInJlTGF1bmNoIiwibG9hZERhdGEiLCJzaG93IiwiZ2V0IiwiYm9va2luZ0RldGFpbCIsImJvb2tpbmdJZCIsImlkIiwidGhlbiIsInJlc3VsdCIsIiRhcHBseSIsImZpbmFsbHkiLCJoaWRlIiwiZXZlbnRzIiwib3B0aW9uIiwiY29uc29sZSIsImxvZyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7SUFFcUJBLGlCOzs7Ozs7Ozs7Ozs7OztrT0FDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUlUQyxVLEdBQWEsRSxRQUliQyxJLEdBQU87QUFDTEMsY0FBUTtBQURILEssUUFJUEMsUSxHQUFXLEUsUUFJWEMsTyxHQUFVO0FBQ1JDLFlBQU0sZ0JBQU07QUFDVix1QkFBS0MsVUFBTCxDQUFnQjtBQUNkQztBQURjLFNBQWhCO0FBR0QsT0FMTztBQU1SQyxjQUFRLGtCQUFNO0FBQ1osdUJBQUtDLFFBQUwsQ0FBYztBQUNaRixlQUFLO0FBRE8sU0FBZDtBQUdELE9BVk87QUFXUkcsZ0JBQVUsb0JBQU07QUFDZCwwQkFBUUMsSUFBUjtBQUNBLDBCQUFRQyxHQUFSLENBQVksZUFBS0MsYUFBakIsRUFBZ0M7QUFDOUJDLHFCQUFXLE1BQUtDO0FBRGMsU0FBaEMsRUFFR0MsSUFGSCxDQUVRLGdCQUFRO0FBQ2QsZ0JBQUtkLE1BQUwsR0FBY0QsS0FBS2dCLE1BQW5CO0FBQ0EsZ0JBQUtDLE1BQUw7QUFDRCxTQUxELEVBS0dDLE9BTEgsQ0FLVyxZQUFNO0FBQ2YsNEJBQVFDLElBQVI7QUFDRCxTQVBEO0FBUUQ7QUFyQk8sSyxRQXdCVkMsTSxHQUFTLEU7Ozs7OzZCQUlBO0FBQ1AsV0FBS2pCLE9BQUwsQ0FBYU0sUUFBYjtBQUNEOzs7MkJBRU1ZLE0sRUFBUTtBQUNiQyxjQUFRQyxHQUFSLENBQVksNkJBQVo7QUFDQSxXQUFLVCxFQUFMLEdBQVVPLE9BQU9QLEVBQWpCO0FBQ0Q7OztFQXBENEMsZUFBS1UsSTs7a0JBQS9CNUIsaUIiLCJmaWxlIjoiYm9va2luZy1wYXktc3VjY2Vzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbiAgaW1wb3J0IHJlcXVlc3QgZnJvbSAnLi4vc2VydmljZXMvcmVxdWVzdC5qcyc7XG4gIGltcG9ydCBsb2FkaW5nIGZyb20gJy4uL3NlcnZpY2VzL2xvYWRpbmcuanMnO1xuICBpbXBvcnQgdXJscyBmcm9tICcuLi9zZXJ2aWNlcy91cmxzLmpzJztcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBCb29raW5nUGF5U3VjY2VzcyBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+e7k+aenCcsXG4gICAgfVxuXG4gICAgY29tcG9uZW50cyA9IHtcblxuICAgIH1cblxuICAgIGRhdGEgPSB7XG4gICAgICBkZXRhaWw6IG51bGwsXG4gICAgfVxuXG4gICAgY29tcHV0ZWQgPSB7XG5cbiAgICB9XG5cbiAgICBtZXRob2RzID0ge1xuICAgICAgdG9NZTogKCkgPT4ge1xuICAgICAgICB3ZXB5LnJlZGlyZWN0VG8oe1xuICAgICAgICAgIHVybDogYC9wYWdlcy9tZWAsXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgdG9Ib21lOiAoKSA9PiB7XG4gICAgICAgIHdlcHkucmVMYXVuY2goe1xuICAgICAgICAgIHVybDogJy9wYWdlcy9ob21lJyxcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgbG9hZERhdGE6ICgpID0+IHtcbiAgICAgICAgbG9hZGluZy5zaG93KCk7XG4gICAgICAgIHJlcXVlc3QuZ2V0KHVybHMuYm9va2luZ0RldGFpbCwge1xuICAgICAgICAgIGJvb2tpbmdJZDogdGhpcy5pZCxcbiAgICAgICAgfSkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICB0aGlzLmRldGFpbCA9IGRhdGEucmVzdWx0O1xuICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgIH0pLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgICAgIGxvYWRpbmcuaGlkZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgfVxuXG4gICAgZXZlbnRzID0ge1xuXG4gICAgfVxuXG4gICAgb25TaG93KCkge1xuICAgICAgdGhpcy5tZXRob2RzLmxvYWREYXRhKCk7XG4gICAgfVxuXG4gICAgb25Mb2FkKG9wdGlvbikge1xuICAgICAgY29uc29sZS5sb2coJ2Jvb2tpbmcgcGF5IHN1Y2Nlc3Mgb24gbG9hZCcpO1xuICAgICAgdGhpcy5pZCA9IG9wdGlvbi5pZDtcbiAgICB9XG4gIH1cblxuIl19