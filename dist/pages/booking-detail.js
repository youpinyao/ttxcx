'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _stringify = require('./../npm/babel-runtime/core-js/json/stringify.js');

var _stringify2 = _interopRequireDefault(_stringify);

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

var _pay = require('./../services/pay.js');

var _pay2 = _interopRequireDefault(_pay);

var _defer = require('./../services/defer.js');

var _defer2 = _interopRequireDefault(_defer);

var _wepyComToast = require('./../npm/wepy-com-toast/toast.js');

var _wepyComToast2 = _interopRequireDefault(_wepyComToast);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 未支付，已支付，申请退款，退款中，退款完成，完成预约

var BookingDetail = function (_wepy$page) {
  (0, _inherits3.default)(BookingDetail, _wepy$page);

  function BookingDetail() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, BookingDetail);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = BookingDetail.__proto__ || (0, _getPrototypeOf2.default)(BookingDetail)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: ''
    }, _this.components = {
      toast: _wepyComToast2.default
    }, _this.data = {
      id: '',
      type: '',
      selectedPayWay: null,
      selectedPayWayIndex: null,
      detail: null,
      isHidePayTip: true,
      isHideRefundTip: true
    }, _this.computed = {}, _this.methods = {
      hidePayTip: function hidePayTip() {
        _this.isHidePayTip = true;
      },
      hideRefundTip: function hideRefundTip() {
        _this.isHideRefundTip = true;
      },
      setPayWay: function setPayWay(e) {
        _this.selectedPayWayIndex = parseInt(e.detail.value, 10);
        _this.selectedPayWay = _this.detail.payWays[_this.selectedPayWayIndex];

        if (_this.selectedPayWay.type === 'OFFLINE') {
          _this.isHidePayTip = false;
        }
      },
      doSubmit: function doSubmit() {
        _request2.default.post(_urls2.default.bookingPay, {
          bookingId: _this.id,
          payWay: _this.selectedPayWay.type
        }).then(function (data) {
          if (_this.selectedPayWay.type !== 'ONLINE') {
            var deferred = (0, _defer2.default)();
            setTimeout(function () {
              deferred.resolve();
            }, 50);
            return deferred.promise;
          } else {
            return _pay2.default.doPay(data.result);
          }
        }).then(function (data) {
          // 支付成功
          _wepy2.default.redirectTo({
            url: '/pages/booking-pay-success?id=' + _this.id
          });
        }, function (data) {
          _this.$invoke('toast', 'show', {
            title: (0, _stringify2.default)(data)
          });
        });
      },
      doRefund: function doRefund() {
        _request2.default.post(_urls2.default.bookingRefund, {
          bookingId: _this.id
        }).then(function (data) {
          _wepy2.default.redirectTo({
            url: '/pages/booking-refund-success?id=' + _this.id
          });
        });
      },
      showRefund: function showRefund() {
        _this.isHideRefundTip = false;
      },
      loadData: function loadData() {
        _loading2.default.show();
        _request2.default.get(_urls2.default.bookingDetail, {
          bookingId: _this.id
        }).then(function (data) {
          _this.detail = data.result;

          _this.detail.payWays.forEach(function (v, i) {
            if (_this.detail.selectedPayWay && v.type === _this.detail.selectedPayWay.type) {
              _this.selectedPayWayIndex = i;
            }
          });

          if (_this.selectedPayWayIndex === null) {
            _this.selectedPayWayIndex = 0;
          }

          _this.selectedPayWay = _this.detail.payWays[_this.selectedPayWayIndex];

          _this.$apply();
        }).finally(function () {
          _loading2.default.hide();
        });
      }
    }, _this.events = {}, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(BookingDetail, [{
    key: 'onShow',
    value: function onShow() {
      this.methods.loadData();
    }
  }, {
    key: 'onLoad',
    value: function onLoad(option) {
      console.log('booking detail on load');

      _wepy2.default.setNavigationBarTitle({
        title: option.type === 'settle' ? '确定订单' : '预约记录'
      });

      this.type = option.type;
      this.id = option.id;
    }
  }]);
  return BookingDetail;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(BookingDetail , 'pages/booking-detail'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJvb2tpbmctZGV0YWlsLmpzIl0sIm5hbWVzIjpbIkJvb2tpbmdEZXRhaWwiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcG9uZW50cyIsInRvYXN0IiwiZGF0YSIsImlkIiwidHlwZSIsInNlbGVjdGVkUGF5V2F5Iiwic2VsZWN0ZWRQYXlXYXlJbmRleCIsImRldGFpbCIsImlzSGlkZVBheVRpcCIsImlzSGlkZVJlZnVuZFRpcCIsImNvbXB1dGVkIiwibWV0aG9kcyIsImhpZGVQYXlUaXAiLCJoaWRlUmVmdW5kVGlwIiwic2V0UGF5V2F5IiwiZSIsInBhcnNlSW50IiwidmFsdWUiLCJwYXlXYXlzIiwiZG9TdWJtaXQiLCJwb3N0IiwiYm9va2luZ1BheSIsImJvb2tpbmdJZCIsInBheVdheSIsInRoZW4iLCJkZWZlcnJlZCIsInNldFRpbWVvdXQiLCJyZXNvbHZlIiwicHJvbWlzZSIsImRvUGF5IiwicmVzdWx0IiwicmVkaXJlY3RUbyIsInVybCIsIiRpbnZva2UiLCJ0aXRsZSIsImRvUmVmdW5kIiwiYm9va2luZ1JlZnVuZCIsInNob3dSZWZ1bmQiLCJsb2FkRGF0YSIsInNob3ciLCJnZXQiLCJib29raW5nRGV0YWlsIiwiZm9yRWFjaCIsInYiLCJpIiwiJGFwcGx5IiwiZmluYWxseSIsImhpZGUiLCJldmVudHMiLCJvcHRpb24iLCJjb25zb2xlIiwibG9nIiwic2V0TmF2aWdhdGlvbkJhclRpdGxlIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQTs7SUFFcUJBLGE7Ozs7Ozs7Ozs7Ozs7OzBOQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBSVRDLFUsR0FBYTtBQUNYQztBQURXLEssUUFJYkMsSSxHQUFPO0FBQ0xDLFVBQUksRUFEQztBQUVMQyxZQUFNLEVB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QSxtQkFBTCxHQUEyQixDQUEzQjtBQUNEOztBQUVELGdCQUFLRCxjQUFMLEdBQXNCLE1BQUtFLE1BQUwsQ0FBWVcsT0FBWixDQUFvQixNQUFLWixtQkFBekIsQ0FBdEI7O0FBRUEsZ0JBQUt1QyxNQUFMO0FBQ0QsU0FsQkQsRUFrQkdDLE9BbEJILENBa0JXLFlBQU07QUFDZiw0QkFBUUMsSUFBUjtBQUNELFNBcEJEO0FBcUJEO0FBM0VPLEssUUE4RVZDLE0sR0FBUyxFOzs7Ozs2QkFJQTtBQUNQLFdBQUtyQyxPQUFMLENBQWEyQixRQUFiO0FBQ0Q7OzsyQkFFTVcsTSxFQUFRO0FBQ2JDLGNBQVFDLEdBQVIsQ0FBWSx3QkFBWjs7QUFFQSxxQkFBS0MscUJBQUwsQ0FBMkI7QUFDekJsQixlQUFPZSxPQUFPN0MsSUFBUCxLQUFnQixRQUFoQixHQUEyQixNQUEzQixHQUFvQztBQURsQixPQUEzQjs7QUFJQSxXQUFLQSxJQUFMLEdBQVk2QyxPQUFPN0MsSUFBbkI7QUFDQSxXQUFLRCxFQUFMLEdBQVU4QyxPQUFPOUMsRUFBakI7QUFDRDs7O0VBdEh3QyxlQUFLa0QsSTs7a0JBQTNCeEQsYSIsImZpbGUiOiJib29raW5nLWRldGFpbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbiAgaW1wb3J0IHJlcXVlc3QgZnJvbSAnLi4vc2VydmljZXMvcmVxdWVzdC5qcyc7XG4gIGltcG9ydCBsb2FkaW5nIGZyb20gJy4uL3NlcnZpY2VzL2xvYWRpbmcuanMnO1xuICBpbXBvcnQgdXJscyBmcm9tICcuLi9zZXJ2aWNlcy91cmxzLmpzJztcbiAgaW1wb3J0IHBheSBmcm9tICcuLi9zZXJ2aWNlcy9wYXkuanMnO1xuICBpbXBvcnQgZGVmZXIgZnJvbSAnLi4vc2VydmljZXMvZGVmZXIuanMnO1xuICBpbXBvcnQgVG9hc3QgZnJvbSAnd2VweS1jb20tdG9hc3QnXG5cbiAgLy8g5pyq5pSv5LuY77yM5bey5pSv5LuY77yM55Sz6K+36YCA5qy+77yM6YCA5qy+5Lit77yM6YCA5qy+5a6M5oiQ77yM5a6M5oiQ6aKE57qmXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9va2luZ0RldGFpbCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJycsXG4gICAgfVxuXG4gICAgY29tcG9uZW50cyA9IHtcbiAgICAgIHRvYXN0OiBUb2FzdFxuICAgIH1cblxuICAgIGRhdGEgPSB7XG4gICAgICBpZDogJycsXG4gICAgICB0eXBlOiAnJyxcbiAgICAgIHNlbGVjdGVkUGF5V2F5OiBudWxsLFxuICAgICAgc2VsZWN0ZWRQYXlXYXlJbmRleDogbnVsbCxcbiAgICAgIGRldGFpbDogbnVsbCxcbiAgICAgIGlzSGlkZVBheVRpcDogdHJ1ZSxcbiAgICAgIGlzSGlkZVJlZnVuZFRpcDogdHJ1ZSxcbiAgICB9XG5cbiAgICBjb21wdXRlZCA9IHtcblxuICAgIH1cblxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBoaWRlUGF5VGlwOiAoKSA9PiB7XG4gICAgICAgIHRoaXMuaXNIaWRlUGF5VGlwID0gdHJ1ZTtcbiAgICAgIH0sXG4gICAgICBoaWRlUmVmdW5kVGlwOiAoKSA9PiB7XG4gICAgICAgIHRoaXMuaXNIaWRlUmVmdW5kVGlwID0gdHJ1ZTtcbiAgICAgIH0sXG4gICAgICBzZXRQYXlXYXk6IChlKSA9PiB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRQYXlXYXlJbmRleCA9IHBhcnNlSW50KGUuZGV0YWlsLnZhbHVlLCAxMCk7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRQYXlXYXkgPSB0aGlzLmRldGFpbC5wYXlXYXlzW3RoaXMuc2VsZWN0ZWRQYXlXYXlJbmRleF07XG5cbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRQYXlXYXkudHlwZSA9PT0gJ09GRkxJTkUnKSB7XG4gICAgICAgICAgdGhpcy5pc0hpZGVQYXlUaXAgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGRvU3VibWl0OiAoKSA9PiB7XG4gICAgICAgIHJlcXVlc3QucG9zdCh1cmxzLmJvb2tpbmdQYXksIHtcbiAgICAgICAgICBib29raW5nSWQ6IHRoaXMuaWQsXG4gICAgICAgICAgcGF5V2F5OiB0aGlzLnNlbGVjdGVkUGF5V2F5LnR5cGUsXG4gICAgICAgIH0pLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRQYXlXYXkudHlwZSAhPT0gJ09OTElORScpIHtcbiAgICAgICAgICAgIGNvbnN0IGRlZmVycmVkID0gZGVmZXIoKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoKTtcbiAgICAgICAgICAgIH0sIDUwKTtcbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gcGF5LmRvUGF5KGRhdGEucmVzdWx0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgLy8g5pSv5LuY5oiQ5YqfXG4gICAgICAgICAgd2VweS5yZWRpcmVjdFRvKHtcbiAgICAgICAgICAgIHVybDogYC9wYWdlcy9ib29raW5nLXBheS1zdWNjZXNzP2lkPSR7dGhpcy5pZH1gLFxuICAgICAgICAgIH0pXG4gICAgICAgIH0sIGRhdGEgPT4ge1xuICAgICAgICAgIHRoaXMuJGludm9rZSgndG9hc3QnLCAnc2hvdycsIHtcbiAgICAgICAgICAgIHRpdGxlOiBKU09OLnN0cmluZ2lmeShkYXRhKSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgZG9SZWZ1bmQ6ICgpID0+IHtcbiAgICAgICAgcmVxdWVzdC5wb3N0KHVybHMuYm9va2luZ1JlZnVuZCwge1xuICAgICAgICAgIGJvb2tpbmdJZDogdGhpcy5pZCxcbiAgICAgICAgfSkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICB3ZXB5LnJlZGlyZWN0VG8oe1xuICAgICAgICAgICAgdXJsOiBgL3BhZ2VzL2Jvb2tpbmctcmVmdW5kLXN1Y2Nlc3M/aWQ9JHt0aGlzLmlkfWAsXG4gICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgc2hvd1JlZnVuZDogKCkgPT4ge1xuICAgICAgICB0aGlzLmlzSGlkZVJlZnVuZFRpcCA9IGZhbHNlO1xuICAgICAgfSxcbiAgICAgIGxvYWREYXRhOiAoKSA9PiB7XG4gICAgICAgIGxvYWRpbmcuc2hvdygpO1xuICAgICAgICByZXF1ZXN0LmdldCh1cmxzLmJvb2tpbmdEZXRhaWwsIHtcbiAgICAgICAgICBib29raW5nSWQ6IHRoaXMuaWQsXG4gICAgICAgIH0pLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgdGhpcy5kZXRhaWwgPSBkYXRhLnJlc3VsdDtcblxuICAgICAgICAgIHRoaXMuZGV0YWlsLnBheVdheXMuZm9yRWFjaCgodiwgaSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuZGV0YWlsLnNlbGVjdGVkUGF5V2F5ICYmIHYudHlwZSA9PT0gdGhpcy5kZXRhaWwuc2VsZWN0ZWRQYXlXYXkudHlwZSkge1xuICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkUGF5V2F5SW5kZXggPSBpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRQYXlXYXlJbmRleCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFBheVdheUluZGV4ID0gMDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLnNlbGVjdGVkUGF5V2F5ID0gdGhpcy5kZXRhaWwucGF5V2F5c1t0aGlzLnNlbGVjdGVkUGF5V2F5SW5kZXhdO1xuXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgfSkuZmluYWxseSgoKSA9PiB7XG4gICAgICAgICAgbG9hZGluZy5oaWRlKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICB9XG5cbiAgICBldmVudHMgPSB7XG5cbiAgICB9XG5cbiAgICBvblNob3coKSB7XG4gICAgICB0aGlzLm1ldGhvZHMubG9hZERhdGEoKTtcbiAgICB9XG5cbiAgICBvbkxvYWQob3B0aW9uKSB7XG4gICAgICBjb25zb2xlLmxvZygnYm9va2luZyBkZXRhaWwgb24gbG9hZCcpO1xuXG4gICAgICB3ZXB5LnNldE5hdmlnYXRpb25CYXJUaXRsZSh7XG4gICAgICAgIHRpdGxlOiBvcHRpb24udHlwZSA9PT0gJ3NldHRsZScgPyAn56Gu5a6a6K6i5Y2VJyA6ICfpooTnuqborrDlvZUnXG4gICAgICB9KTtcblxuICAgICAgdGhpcy50eXBlID0gb3B0aW9uLnR5cGU7XG4gICAgICB0aGlzLmlkID0gb3B0aW9uLmlkO1xuICAgIH1cbiAgfVxuXG4iXX0=