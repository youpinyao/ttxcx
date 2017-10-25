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
      isHideRefundTip: true,
      isLoaded: false
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

      this.isLoaded = true;

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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJvb2tpbmctZGV0YWlsLmpzIl0sIm5hbWVzIjpbIkJvb2tpbmdEZXRhaWwiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcG9uZW50cyIsInRvYXN0IiwiZGF0YSIsImlkIiwidHlwZSIsInNlbGVjdGVkUGF5V2F5Iiwic2VsZWN0ZWRQYXlXYXlJbmRleCIsImRldGFpbCIsImlzSGlkZVBheVRpcCIsImlzSGlkZVJlZnVuZFRpcCIsImlzTG9hZGVkIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiaGlkZVBheVRpcCIsImhpZGVSZWZ1bmRUaXAiLCJzZXRQYXlXYXkiLCJlIiwicGFyc2VJbnQiLCJ2YWx1ZSIsInBheVdheXMiLCJkb1N1Ym1pdCIsInBvc3QiLCJib29raW5nUGF5IiwiYm9va2luZ0lkIiwicGF5V2F5IiwidGhlbiIsImRlZmVycmVkIiwic2V0VGltZW91dCIsInJlc29sdmUiLCJwcm9taXNlIiwiZG9QYXkiLCJyZXN1bHQiLCJyZWRpcmVjdFRvIiwidXJsIiwiJGludm9rZSIsInRpdGxlIiwiZG9SZWZ1bmQiLCJib29raW5nUmVmdW5kIiwic2hvd1JlZnVuZCIsImxvYWREYXRhIiwic2hvdyIsImdldCIsImJvb2tpbmdEZXRhaWwiLCJmb3JFYWNoIiwidiIsImkiLCIkYXBwbHkiLCJmaW5hbGx5IiwiaGlkZSIsImV2ZW50cyIsIm9wdGlvbiIsImNvbnNvbGUiLCJsb2ciLCJzZXROYXZpZ2F0aW9uQmFyVGl0bGUiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBOztJQUVxQkEsYTs7Ozs7Ozs7Ozs7Ozs7ME5BQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFJVEMsVSxHQUFhO0FBQ1hDO0FBRFcsSyxRQUliQyxJLEdBQU87QUFDTEMsVUFBSSxFQURDO0FB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QUE2QixJQUFqQyxFQUF1QztBQUNyQyxrQkFBS0EsbUJBQUwsR0FBMkIsQ0FBM0I7QUFDRDs7QUFFRCxnQkFBS0QsY0FBTCxHQUFzQixNQUFLRSxNQUFMLENBQVlZLE9BQVosQ0FBb0IsTUFBS2IsbUJBQXpCLENBQXRCOztBQUVBLGdCQUFLd0MsTUFBTDtBQUNELFNBbEJELEVBa0JHQyxPQWxCSCxDQWtCVyxZQUFNO0FBQ2YsNEJBQVFDLElBQVI7QUFDRCxTQXBCRDtBQXFCRDtBQTNFTyxLLFFBOEVWQyxNLEdBQVMsRTs7Ozs7NkJBSUE7QUFDUCxXQUFLckMsT0FBTCxDQUFhMkIsUUFBYjtBQUNEOzs7MkJBRU1XLE0sRUFBUTtBQUNiQyxjQUFRQyxHQUFSLENBQVksd0JBQVo7O0FBRUEsV0FBSzFDLFFBQUwsR0FBZ0IsSUFBaEI7O0FBRUEscUJBQUsyQyxxQkFBTCxDQUEyQjtBQUN6QmxCLGVBQU9lLE9BQU85QyxJQUFQLEtBQWdCLFFBQWhCLEdBQTJCLE1BQTNCLEdBQW9DO0FBRGxCLE9BQTNCOztBQUlBLFdBQUtBLElBQUwsR0FBWThDLE9BQU85QyxJQUFuQjtBQUNBLFdBQUtELEVBQUwsR0FBVStDLE9BQU8vQyxFQUFqQjtBQUNEOzs7RUF6SHdDLGVBQUttRCxJOztrQkFBM0J6RCxhIiwiZmlsZSI6ImJvb2tpbmctZGV0YWlsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuICBpbXBvcnQgcmVxdWVzdCBmcm9tICcuLi9zZXJ2aWNlcy9yZXF1ZXN0LmpzJztcbiAgaW1wb3J0IGxvYWRpbmcgZnJvbSAnLi4vc2VydmljZXMvbG9hZGluZy5qcyc7XG4gIGltcG9ydCB1cmxzIGZyb20gJy4uL3NlcnZpY2VzL3VybHMuanMnO1xuICBpbXBvcnQgcGF5IGZyb20gJy4uL3NlcnZpY2VzL3BheS5qcyc7XG4gIGltcG9ydCBkZWZlciBmcm9tICcuLi9zZXJ2aWNlcy9kZWZlci5qcyc7XG4gIGltcG9ydCBUb2FzdCBmcm9tICd3ZXB5LWNvbS10b2FzdCdcblxuICAvLyDmnKrmlK/ku5jvvIzlt7LmlK/ku5jvvIznlLPor7fpgIDmrL7vvIzpgIDmrL7kuK3vvIzpgIDmrL7lrozmiJDvvIzlrozmiJDpooTnuqZcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBCb29raW5nRGV0YWlsIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAnJyxcbiAgICB9XG5cbiAgICBjb21wb25lbnRzID0ge1xuICAgICAgdG9hc3Q6IFRvYXN0XG4gICAgfVxuXG4gICAgZGF0YSA9IHtcbiAgICAgIGlkOiAnJyxcbiAgICAgIHR5cGU6ICcnLFxuICAgICAgc2VsZWN0ZWRQYXlXYXk6IG51bGwsXG4gICAgICBzZWxlY3RlZFBheVdheUluZGV4OiBudWxsLFxuICAgICAgZGV0YWlsOiBudWxsLFxuICAgICAgaXNIaWRlUGF5VGlwOiB0cnVlLFxuICAgICAgaXNIaWRlUmVmdW5kVGlwOiB0cnVlLFxuICAgICAgaXNMb2FkZWQ6IGZhbHNlLFxuICAgIH1cblxuICAgIGNvbXB1dGVkID0ge1xuXG4gICAgfVxuXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGhpZGVQYXlUaXA6ICgpID0+IHtcbiAgICAgICAgdGhpcy5pc0hpZGVQYXlUaXAgPSB0cnVlO1xuICAgICAgfSxcbiAgICAgIGhpZGVSZWZ1bmRUaXA6ICgpID0+IHtcbiAgICAgICAgdGhpcy5pc0hpZGVSZWZ1bmRUaXAgPSB0cnVlO1xuICAgICAgfSxcbiAgICAgIHNldFBheVdheTogKGUpID0+IHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZFBheVdheUluZGV4ID0gcGFyc2VJbnQoZS5kZXRhaWwudmFsdWUsIDEwKTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZFBheVdheSA9IHRoaXMuZGV0YWlsLnBheVdheXNbdGhpcy5zZWxlY3RlZFBheVdheUluZGV4XTtcblxuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZFBheVdheS50eXBlID09PSAnT0ZGTElORScpIHtcbiAgICAgICAgICB0aGlzLmlzSGlkZVBheVRpcCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZG9TdWJtaXQ6ICgpID0+IHtcbiAgICAgICAgcmVxdWVzdC5wb3N0KHVybHMuYm9va2luZ1BheSwge1xuICAgICAgICAgIGJvb2tpbmdJZDogdGhpcy5pZCxcbiAgICAgICAgICBwYXlXYXk6IHRoaXMuc2VsZWN0ZWRQYXlXYXkudHlwZSxcbiAgICAgICAgfSkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZFBheVdheS50eXBlICE9PSAnT05MSU5FJykge1xuICAgICAgICAgICAgY29uc3QgZGVmZXJyZWQgPSBkZWZlcigpO1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSwgNTApO1xuICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBwYXkuZG9QYXkoZGF0YS5yZXN1bHQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAvLyDmlK/ku5jmiJDlip9cbiAgICAgICAgICB3ZXB5LnJlZGlyZWN0VG8oe1xuICAgICAgICAgICAgdXJsOiBgL3BhZ2VzL2Jvb2tpbmctcGF5LXN1Y2Nlc3M/aWQ9JHt0aGlzLmlkfWAsXG4gICAgICAgICAgfSlcbiAgICAgICAgfSwgZGF0YSA9PiB7XG4gICAgICAgICAgdGhpcy4kaW52b2tlKCd0b2FzdCcsICdzaG93Jywge1xuICAgICAgICAgICAgdGl0bGU6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBkb1JlZnVuZDogKCkgPT4ge1xuICAgICAgICByZXF1ZXN0LnBvc3QodXJscy5ib29raW5nUmVmdW5kLCB7XG4gICAgICAgICAgYm9va2luZ0lkOiB0aGlzLmlkLFxuICAgICAgICB9KS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgIHdlcHkucmVkaXJlY3RUbyh7XG4gICAgICAgICAgICB1cmw6IGAvcGFnZXMvYm9va2luZy1yZWZ1bmQtc3VjY2Vzcz9pZD0ke3RoaXMuaWR9YCxcbiAgICAgICAgICB9KVxuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBzaG93UmVmdW5kOiAoKSA9PiB7XG4gICAgICAgIHRoaXMuaXNIaWRlUmVmdW5kVGlwID0gZmFsc2U7XG4gICAgICB9LFxuICAgICAgbG9hZERhdGE6ICgpID0+IHtcbiAgICAgICAgbG9hZGluZy5zaG93KCk7XG4gICAgICAgIHJlcXVlc3QuZ2V0KHVybHMuYm9va2luZ0RldGFpbCwge1xuICAgICAgICAgIGJvb2tpbmdJZDogdGhpcy5pZCxcbiAgICAgICAgfSkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICB0aGlzLmRldGFpbCA9IGRhdGEucmVzdWx0O1xuXG4gICAgICAgICAgdGhpcy5kZXRhaWwucGF5V2F5cy5mb3JFYWNoKCh2LCBpKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5kZXRhaWwuc2VsZWN0ZWRQYXlXYXkgJiYgdi50eXBlID09PSB0aGlzLmRldGFpbC5zZWxlY3RlZFBheVdheS50eXBlKSB7XG4gICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRQYXlXYXlJbmRleCA9IGk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZFBheVdheUluZGV4ID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkUGF5V2F5SW5kZXggPSAwO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRQYXlXYXkgPSB0aGlzLmRldGFpbC5wYXlXYXlzW3RoaXMuc2VsZWN0ZWRQYXlXYXlJbmRleF07XG5cbiAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICB9KS5maW5hbGx5KCgpID0+IHtcbiAgICAgICAgICBsb2FkaW5nLmhpZGUoKTtcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgIH1cblxuICAgIGV2ZW50cyA9IHtcblxuICAgIH1cblxuICAgIG9uU2hvdygpIHtcbiAgICAgIHRoaXMubWV0aG9kcy5sb2FkRGF0YSgpO1xuICAgIH1cblxuICAgIG9uTG9hZChvcHRpb24pIHtcbiAgICAgIGNvbnNvbGUubG9nKCdib29raW5nIGRldGFpbCBvbiBsb2FkJyk7XG5cbiAgICAgIHRoaXMuaXNMb2FkZWQgPSB0cnVlO1xuXG4gICAgICB3ZXB5LnNldE5hdmlnYXRpb25CYXJUaXRsZSh7XG4gICAgICAgIHRpdGxlOiBvcHRpb24udHlwZSA9PT0gJ3NldHRsZScgPyAn56Gu5a6a6K6i5Y2VJyA6ICfpooTnuqborrDlvZUnXG4gICAgICB9KTtcblxuICAgICAgdGhpcy50eXBlID0gb3B0aW9uLnR5cGU7XG4gICAgICB0aGlzLmlkID0gb3B0aW9uLmlkO1xuICAgIH1cbiAgfVxuXG4iXX0=