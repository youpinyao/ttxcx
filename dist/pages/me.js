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

var _urls = require('./../services/urls.js');

var _urls2 = _interopRequireDefault(_urls);

var _loading = require('./../services/loading.js');

var _loading2 = _interopRequireDefault(_loading);

var _util = require('./../services/util.js');

var _util2 = _interopRequireDefault(_util);

var _moment = require('./../npm/moment/moment.js');

var _moment2 = _interopRequireDefault(_moment);

var _request = require('./../services/request.js');

var _request2 = _interopRequireDefault(_request);

var _nullList = require('./../components/nullList.js');

var _nullList2 = _interopRequireDefault(_nullList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Me = function (_wepy$page) {
  (0, _inherits3.default)(Me, _wepy$page);

  function Me() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Me);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Me.__proto__ || (0, _getPrototypeOf2.default)(Me)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '我',
      enablePullDownRefresh: true
    }, _this.$props = { "null-list": { "xmlns:wx": "" } }, _this.$events = {}, _this.components = {
      'null-list': _nullList2.default
    }, _this.data = {
      userInfo: null,
      recordData: null,
      bookingData: null,
      userData: null,
      type: 'booking'
    }, _this.computed = {}, _this.methods = {
      toBooking: function toBooking(bookingId) {
        console.log('to booking page', bookingId);
        _wepy2.default.navigateTo({
          url: '/pages/booking-detail?id=' + bookingId + '&type=detail'
        });
      },
      toChallenge: function toChallenge(challengeId) {
        console.log('to challenge page', challengeId);
        _wepy2.default.navigateTo({
          url: '/pages/challenge?id=' + challengeId
        });
      },
      selectTab: function selectTab(type) {
        _wepy2.default.pageScrollTo({
          scrollTop: 0
        });
        _this.type = type;
      },
      updateRecord: function updateRecord() {
        _request2.default.get(_urls2.default.record).then(function (_ref2) {
          var result = _ref2.result;

          _this.recordData = result;
          _this.methods.convertData(_this.recordData);
          _this.$apply();
        });
      },
      updateBooking: function updateBooking() {
        _request2.default.get(_urls2.default.booking).then(function (_ref3) {
          var result = _ref3.result;

          _this.bookingData = result;
          _this.methods.convertData(_this.bookingData);
          _this.$apply();
        });
      },
      updateUser: function updateUser() {
        _request2.default.get(_urls2.default.user).then(function (_ref4) {
          var result = _ref4.result;

          _this.userData = result;
          _this.$apply();
          _loading2.default.hide();
          _wepy2.default.stopPullDownRefresh();
        });
      },
      convertData: function convertData(data) {
        _util2.default.each(data, function (d) {
          var date = (0, _moment2.default)(d.date);

          d.date1 = date.format('YYYY-M');
          d.date2 = date.format('DD');
          d.date3 = date.format('HH:mm');
        });
      }
    }, _this.events = {}, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Me, [{
    key: 'onPullDownRefresh',
    value: function onPullDownRefresh() {
      this.methods.updateBooking();
      this.methods.updateRecord();
      this.methods.updateUser();
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      var _this2 = this;

      var self = this;
      console.log('me on show');

      _request2.default.getUserInfo().then(function (d) {
        self.userInfo = d;
        _this2.methods.updateBooking();
        _this2.methods.updateRecord();
        _this2.methods.updateUser();
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      console.log('me on load');
      _loading2.default.show();
    }
  }]);
  return Me;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Me , 'pages/me'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lLmpzIl0sIm5hbWVzIjpbIk1lIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImVuYWJsZVB1bGxEb3duUmVmcmVzaCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiZGF0YSIsInVzZXJJbmZvIiwicmVjb3JkRGF0YSIsImJvb2tpbmdEYXRhIiwidXNlckRhdGEiLCJ0eXBlIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwidG9Cb29raW5nIiwiYm9va2luZ0lkIiwiY29uc29sZSIsImxvZyIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJ0b0NoYWxsZW5nZSIsImNoYWxsZW5nZUlkIiwic2VsZWN0VGFiIiwicGFnZVNjcm9sbFRvIiwic2Nyb2xsVG9wIiwidXBkYXRlUmVjb3JkIiwiZ2V0IiwicmVjb3JkIiwidGhlbiIsInJlc3VsdCIsImNvbnZlcnREYXRhIiwiJGFwcGx5IiwidXBkYXRlQm9va2luZyIsImJvb2tpbmciLCJ1cGRhdGVVc2VyIiwidXNlciIsImhpZGUiLCJzdG9wUHVsbERvd25SZWZyZXNoIiwiZWFjaCIsImRhdGUiLCJkIiwiZGF0ZTEiLCJmb3JtYXQiLCJkYXRlMiIsImRhdGUzIiwiZXZlbnRzIiwic2VsZiIsImdldFVzZXJJbmZvIiwic2hvdyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7SUFFcUJBLEU7Ozs7Ozs7Ozs7Ozs7O29NQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QixHQURqQjtBQUVQQyw2QkFBdUI7QUFGaEIsSyxRQUtWQyxNLEdBQVMsRUFBQyxhQUFZLEVBQUMsWUFBVyxFQUFaLEVBQWIsRSxRQUNaQyxPLEdBQVUsRSxRQUNUQyxVLEdBQWE7QUFDUjtBQURRLEssUUFJVkMsSSxHQUFPO0FBQ0xDLGdCQUFVLElBREw7QUFFTEMsa0JBQVksSUFGUDtBQUdMQyxt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QVo7QUFDQSx3QkFBUStCLElBQVI7QUFDRDs7O0VBM0c2QixlQUFLQyxJOztrQkFBaEJsRCxFIiwiZmlsZSI6Im1lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuICBpbXBvcnQgdXJscyBmcm9tICcuLi9zZXJ2aWNlcy91cmxzLmpzJztcbiAgaW1wb3J0IGxvYWRpbmcgZnJvbSAnLi4vc2VydmljZXMvbG9hZGluZy5qcyc7XG4gIGltcG9ydCB1dGlsIGZyb20gJy4uL3NlcnZpY2VzL3V0aWwuanMnO1xuICBpbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG4gIGltcG9ydCByZXF1ZXN0IGZyb20gJy4uL3NlcnZpY2VzL3JlcXVlc3QuanMnO1xuXG4gIGltcG9ydCBudWxsTGlzdCBmcm9tICcuLi9jb21wb25lbnRzL251bGxMaXN0JztcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBNZSBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aIkScsXG4gICAgICBlbmFibGVQdWxsRG93blJlZnJlc2g6IHRydWUsXG4gICAgfVxuXG4gICAkcHJvcHMgPSB7XCJudWxsLWxpc3RcIjp7XCJ4bWxuczp3eFwiOlwiXCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgICdudWxsLWxpc3QnOiBudWxsTGlzdCxcbiAgICB9XG5cbiAgICBkYXRhID0ge1xuICAgICAgdXNlckluZm86IG51bGwsXG4gICAgICByZWNvcmREYXRhOiBudWxsLFxuICAgICAgYm9va2luZ0RhdGE6IG51bGwsXG4gICAgICB1c2VyRGF0YTogbnVsbCxcbiAgICAgIHR5cGU6ICdib29raW5nJyxcbiAgICB9XG5cbiAgICBjb21wdXRlZCA9IHtcblxuICAgIH1cblxuICAgIG1ldGhvZHMgPSB7XG4gICAgICB0b0Jvb2tpbmc6IChib29raW5nSWQpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ3RvIGJvb2tpbmcgcGFnZScsIGJvb2tpbmdJZCk7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiBgL3BhZ2VzL2Jvb2tpbmctZGV0YWlsP2lkPSR7Ym9va2luZ0lkfSZ0eXBlPWRldGFpbGBcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICB0b0NoYWxsZW5nZTogKGNoYWxsZW5nZUlkKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCd0byBjaGFsbGVuZ2UgcGFnZScsIGNoYWxsZW5nZUlkKTtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6IGAvcGFnZXMvY2hhbGxlbmdlP2lkPSR7Y2hhbGxlbmdlSWR9YFxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIHNlbGVjdFRhYjogKHR5cGUpID0+IHtcbiAgICAgICAgd2VweS5wYWdlU2Nyb2xsVG8oe1xuICAgICAgICAgIHNjcm9sbFRvcDogMFxuICAgICAgICB9KVxuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgICAgfSxcbiAgICAgIHVwZGF0ZVJlY29yZDogKCkgPT4ge1xuICAgICAgICByZXF1ZXN0LmdldCh1cmxzLnJlY29yZCkudGhlbigoe1xuICAgICAgICAgIHJlc3VsdCxcbiAgICAgICAgfSkgPT4ge1xuICAgICAgICAgIHRoaXMucmVjb3JkRGF0YSA9IHJlc3VsdDtcbiAgICAgICAgICB0aGlzLm1ldGhvZHMuY29udmVydERhdGEodGhpcy5yZWNvcmREYXRhKTtcbiAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICB1cGRhdGVCb29raW5nOiAoKSA9PiB7XG4gICAgICAgIHJlcXVlc3QuZ2V0KHVybHMuYm9va2luZykudGhlbigoe1xuICAgICAgICAgIHJlc3VsdCxcbiAgICAgICAgfSkgPT4ge1xuICAgICAgICAgIHRoaXMuYm9va2luZ0RhdGEgPSByZXN1bHQ7XG4gICAgICAgICAgdGhpcy5tZXRob2RzLmNvbnZlcnREYXRhKHRoaXMuYm9va2luZ0RhdGEpO1xuICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIHVwZGF0ZVVzZXI6ICgpID0+IHtcbiAgICAgICAgcmVxdWVzdC5nZXQodXJscy51c2VyKS50aGVuKCh7XG4gICAgICAgICAgcmVzdWx0LFxuICAgICAgICB9KSA9PiB7XG4gICAgICAgICAgdGhpcy51c2VyRGF0YSA9IHJlc3VsdDtcbiAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICAgIGxvYWRpbmcuaGlkZSgpO1xuICAgICAgICAgIHdlcHkuc3RvcFB1bGxEb3duUmVmcmVzaCgpO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBjb252ZXJ0RGF0YTogKGRhdGEpID0+IHtcbiAgICAgICAgdXRpbC5lYWNoKGRhdGEsIGQgPT4ge1xuICAgICAgICAgIGNvbnN0IGRhdGUgPSBtb21lbnQoZC5kYXRlKTtcblxuICAgICAgICAgIGQuZGF0ZTEgPSBkYXRlLmZvcm1hdCgnWVlZWS1NJyk7XG4gICAgICAgICAgZC5kYXRlMiA9IGRhdGUuZm9ybWF0KCdERCcpO1xuICAgICAgICAgIGQuZGF0ZTMgPSBkYXRlLmZvcm1hdCgnSEg6bW0nKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZXZlbnRzID0ge1xuXG4gICAgfVxuXG4gICAgb25QdWxsRG93blJlZnJlc2goKSB7XG4gICAgICB0aGlzLm1ldGhvZHMudXBkYXRlQm9va2luZygpO1xuICAgICAgdGhpcy5tZXRob2RzLnVwZGF0ZVJlY29yZCgpO1xuICAgICAgdGhpcy5tZXRob2RzLnVwZGF0ZVVzZXIoKTtcbiAgICB9XG5cbiAgICBvblNob3coKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICBjb25zb2xlLmxvZygnbWUgb24gc2hvdycpO1xuXG4gICAgICByZXF1ZXN0LmdldFVzZXJJbmZvKCkudGhlbihkID0+IHtcbiAgICAgICAgc2VsZi51c2VySW5mbyA9IGQ7XG4gICAgICAgIHRoaXMubWV0aG9kcy51cGRhdGVCb29raW5nKCk7XG4gICAgICAgIHRoaXMubWV0aG9kcy51cGRhdGVSZWNvcmQoKTtcbiAgICAgICAgdGhpcy5tZXRob2RzLnVwZGF0ZVVzZXIoKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uTG9hZCgpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdtZSBvbiBsb2FkJyk7XG4gICAgICBsb2FkaW5nLnNob3coKTtcbiAgICB9XG4gIH1cblxuIl19