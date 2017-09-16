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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lLmpzIl0sIm5hbWVzIjpbIk1lIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImVuYWJsZVB1bGxEb3duUmVmcmVzaCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiZGF0YSIsInVzZXJJbmZvIiwicmVjb3JkRGF0YSIsImJvb2tpbmdEYXRhIiwidXNlckRhdGEiLCJ0eXBlIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwidG9DaGFsbGVuZ2UiLCJjaGFsbGVuZ2VJZCIsImNvbnNvbGUiLCJsb2ciLCJuYXZpZ2F0ZVRvIiwidXJsIiwic2VsZWN0VGFiIiwicGFnZVNjcm9sbFRvIiwic2Nyb2xsVG9wIiwidXBkYXRlUmVjb3JkIiwiZ2V0IiwicmVjb3JkIiwidGhlbiIsInJlc3VsdCIsImNvbnZlcnREYXRhIiwiJGFwcGx5IiwidXBkYXRlQm9va2luZyIsImJvb2tpbmciLCJ1cGRhdGVVc2VyIiwidXNlciIsImhpZGUiLCJzdG9wUHVsbERvd25SZWZyZXNoIiwiZWFjaCIsImRhdGUiLCJkIiwiZGF0ZTEiLCJmb3JtYXQiLCJkYXRlMiIsImRhdGUzIiwiZXZlbnRzIiwic2VsZiIsImdldFVzZXJJbmZvIiwic2hvdyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7SUFFcUJBLEU7Ozs7Ozs7Ozs7Ozs7O29NQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QixHQURqQjtBQUVQQyw2QkFBdUI7QUFGaEIsSyxRQUtWQyxNLEdBQVMsRUFBQyxhQUFZLEVBQUMsWUFBVyxFQUFaLEVBQWIsRSxRQUNaQyxPLEdBQVUsRSxRQUNUQyxVLEdBQWE7QUFDUjtBQURRLEssUUFJVkMsSSxHQUFPO0FBQ0xDLGdCQUFVLElBREw7QUFFTEMsa0JBQVksSUFGUDtBQUdMQyxtQkFBYSxJQUhSO0FBSUxDLGdCQUFVLElBSkw7QUFLTEMsWUFBTTtBQUxELEssUUFRUEMsUSxHQUFXLEUsUUFJWEMsTyxHQUFVO0FBQ1JDLG1CQUFhLHFCQUFDQyxXQUFELEVBQWlCO0FBQzVCQyxnQkFBUUMsR0FBUixDQUFZLG1CQUFaLEVBQWlDRixXQUFqQztBQUNBLHVCQUFLRyxVQUFMLENBQWdCO0FBQ2RDLHdDQUE0Qko7QUFEZCxTQUFoQjtBQUdELE9BTk87QUFPUkssaUJBQVcsbUJBQUNULElBQUQsRUFBVTtBQUNuQix1QkFBS1UsWUFBTCxDQUFrQjtBQUNoQkMscUJBQVc7QUFESyxTQUFsQjtBQUdBLGNBQUtYLElBQUwsR0FBWUEsSUFBWjtBQUNELE9BWk87QUFhUlksb0JBQWMsd0JBQU07QUFDbEIsMEJBQVFDLEdBQVIsQ0FBWSxlQUFLQyxNQUFqQixFQUF5QkMsSUFBekIsQ0FBOEIsaUJBRXhCO0FBQUEsY0FESkMsTUFDSSxTQURKQSxNQUNJOztBQUNKLGdCQUFLbkIsVUFBTCxHQUFrQm1CLE1BQWxCO0FBQ0EsZ0JBQUtkLE9BQUwsQ0FBYWUsV0FBYixDQUF5QixNQUFLcEIsVUFBOUI7QUFDQSxnQkFBS3FCLE1BQUw7QUFDRCxTQU5EO0FBT0QsT0FyQk87QUFzQlJDLHFCQUFlLHlCQUFNO0FBQ25CLDBCQUFRTixHQUFSLENBQVksZUFBS08sT0FBakIsRUFBMEJMLElBQTFCLENBQStCLGlCQUV6QjtBQUFBLGNBREpDLE1BQ0ksU0FESkEsTUFDSTs7QUFDSixnQkFBS2xCLFdBQUwsR0FBbUJrQixNQUFuQjtBQUNBLGdCQUFLZCxPQUFMLENBQWFlLFdBQWIsQ0FBeUIsTUFBS25CLFdBQTlCO0FBQ0EsZ0JBQUtvQixNQUFMO0FBQ0QsU0FORDtBQU9ELE9BOUJPO0FBK0JSRyxrQkFBWSxzQkFBTTtBQUNoQiwwQkFBUVIsR0FBUixDQUFZLGVBQUtTLElBQWpCLEVBQXVCUCxJQUF2QixDQUE0QixpQkFFdEI7QUFBQSxjQURKQyxNQUNJLFNBREpBLE1BQ0k7O0FBQ0osZ0JBQUtqQixRQUFMLEdBQWdCaUIsTUFBaEI7QUFDQSxnQkFBS0UsTUFBTDtBQUNBLDRCQUFRSyxJQUFSO0FBQ0EseUJBQUtDLG1CQUFMO0FBQ0QsU0FQRDtBQVFELE9BeENPO0FBeUNSUCxtQkFBYSxxQkFBQ3RCLElBQUQsRUFBVTtBQUNyQix1QkFBSzhCLElBQUwsQ0FBVTlCLElBQVYsRUFBZ0IsYUFBSztBQUNuQixjQUFNK0IsT0FBTyxzQkFBT0MsRUFBRUQsSUFBVCxDQUFiOztBQUVBQyxZQUFFQyxLQUFGLEdBQVVGLEtBQUtHLE1BQUwsQ0FBWSxRQUFaLENBQVY7QUFDQUYsWUFBRUcsS0FBRixHQUFVSixLQUFLRyxNQUFMLENBQVksSUFBWixDQUFWO0FBQ0FGLFlBQUVJLEtBQUYsR0FBVUwsS0FBS0csTUFBTCxDQUFZLE9BQVosQ0FBVjtBQUNELFNBTkQ7QUFPRDtBQWpETyxLLFFBb0RWRyxNLEdBQVMsRTs7Ozs7d0NBSVc7QUFDbEIsV0FBSzlCLE9BQUwsQ0FBYWlCLGFBQWI7QUFDQSxXQUFLakIsT0FBTCxDQUFhVSxZQUFiO0FBQ0EsV0FBS1YsT0FBTCxDQUFhbUIsVUFBYjtBQUNEOzs7NkJBRVE7QUFBQTs7QUFDUCxVQUFJWSxPQUFPLElBQVg7QUFDQTVCLGNBQVFDLEdBQVIsQ0FBWSxZQUFaOztBQUVBLHdCQUFRNEIsV0FBUixHQUFzQm5CLElBQXRCLENBQTJCLGFBQUs7QUFDOUJrQixhQUFLckMsUUFBTCxHQUFnQitCLENBQWhCO0FBQ0EsZUFBS3pCLE9BQUwsQ0FBYWlCLGFBQWI7QUFDQSxlQUFLakIsT0FBTCxDQUFhVSxZQUFiO0FBQ0EsZUFBS1YsT0FBTCxDQUFhbUIsVUFBYjtBQUNELE9BTEQ7QUFNRDs7OzZCQUVRO0FBQ1BoQixjQUFRQyxHQUFSLENBQVksWUFBWjtBQUNBLHdCQUFRNkIsSUFBUjtBQUNEOzs7RUFyRzZCLGVBQUtDLEk7O2tCQUFoQmhELEUiLCJmaWxlIjoibWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG4gIGltcG9ydCB1cmxzIGZyb20gJy4uL3NlcnZpY2VzL3VybHMuanMnO1xuICBpbXBvcnQgbG9hZGluZyBmcm9tICcuLi9zZXJ2aWNlcy9sb2FkaW5nLmpzJztcbiAgaW1wb3J0IHV0aWwgZnJvbSAnLi4vc2VydmljZXMvdXRpbC5qcyc7XG4gIGltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcbiAgaW1wb3J0IHJlcXVlc3QgZnJvbSAnLi4vc2VydmljZXMvcmVxdWVzdC5qcyc7XG5cbiAgaW1wb3J0IG51bGxMaXN0IGZyb20gJy4uL2NvbXBvbmVudHMvbnVsbExpc3QnO1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5oiRJyxcbiAgICAgIGVuYWJsZVB1bGxEb3duUmVmcmVzaDogdHJ1ZSxcbiAgICB9XG5cbiAgICRwcm9wcyA9IHtcIm51bGwtbGlzdFwiOntcInhtbG5zOnd4XCI6XCJcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgJ251bGwtbGlzdCc6IG51bGxMaXN0LFxuICAgIH1cblxuICAgIGRhdGEgPSB7XG4gICAgICB1c2VySW5mbzogbnVsbCxcbiAgICAgIHJlY29yZERhdGE6IG51bGwsXG4gICAgICBib29raW5nRGF0YTogbnVsbCxcbiAgICAgIHVzZXJEYXRhOiBudWxsLFxuICAgICAgdHlwZTogJ2Jvb2tpbmcnLFxuICAgIH1cblxuICAgIGNvbXB1dGVkID0ge1xuXG4gICAgfVxuXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHRvQ2hhbGxlbmdlOiAoY2hhbGxlbmdlSWQpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ3RvIGNoYWxsZW5nZSBwYWdlJywgY2hhbGxlbmdlSWQpO1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogYC9wYWdlcy9jaGFsbGVuZ2U/aWQ9JHtjaGFsbGVuZ2VJZH1gXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgc2VsZWN0VGFiOiAodHlwZSkgPT4ge1xuICAgICAgICB3ZXB5LnBhZ2VTY3JvbGxUbyh7XG4gICAgICAgICAgc2Nyb2xsVG9wOiAwXG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgICB9LFxuICAgICAgdXBkYXRlUmVjb3JkOiAoKSA9PiB7XG4gICAgICAgIHJlcXVlc3QuZ2V0KHVybHMucmVjb3JkKS50aGVuKCh7XG4gICAgICAgICAgcmVzdWx0LFxuICAgICAgICB9KSA9PiB7XG4gICAgICAgICAgdGhpcy5yZWNvcmREYXRhID0gcmVzdWx0O1xuICAgICAgICAgIHRoaXMubWV0aG9kcy5jb252ZXJ0RGF0YSh0aGlzLnJlY29yZERhdGEpO1xuICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIHVwZGF0ZUJvb2tpbmc6ICgpID0+IHtcbiAgICAgICAgcmVxdWVzdC5nZXQodXJscy5ib29raW5nKS50aGVuKCh7XG4gICAgICAgICAgcmVzdWx0LFxuICAgICAgICB9KSA9PiB7XG4gICAgICAgICAgdGhpcy5ib29raW5nRGF0YSA9IHJlc3VsdDtcbiAgICAgICAgICB0aGlzLm1ldGhvZHMuY29udmVydERhdGEodGhpcy5ib29raW5nRGF0YSk7XG4gICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgdXBkYXRlVXNlcjogKCkgPT4ge1xuICAgICAgICByZXF1ZXN0LmdldCh1cmxzLnVzZXIpLnRoZW4oKHtcbiAgICAgICAgICByZXN1bHQsXG4gICAgICAgIH0pID0+IHtcbiAgICAgICAgICB0aGlzLnVzZXJEYXRhID0gcmVzdWx0O1xuICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgICAgbG9hZGluZy5oaWRlKCk7XG4gICAgICAgICAgd2VweS5zdG9wUHVsbERvd25SZWZyZXNoKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIGNvbnZlcnREYXRhOiAoZGF0YSkgPT4ge1xuICAgICAgICB1dGlsLmVhY2goZGF0YSwgZCA9PiB7XG4gICAgICAgICAgY29uc3QgZGF0ZSA9IG1vbWVudChkLmRhdGUpO1xuXG4gICAgICAgICAgZC5kYXRlMSA9IGRhdGUuZm9ybWF0KCdZWVlZLU0nKTtcbiAgICAgICAgICBkLmRhdGUyID0gZGF0ZS5mb3JtYXQoJ0REJyk7XG4gICAgICAgICAgZC5kYXRlMyA9IGRhdGUuZm9ybWF0KCdISDptbScpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBldmVudHMgPSB7XG5cbiAgICB9XG5cbiAgICBvblB1bGxEb3duUmVmcmVzaCgpIHtcbiAgICAgIHRoaXMubWV0aG9kcy51cGRhdGVCb29raW5nKCk7XG4gICAgICB0aGlzLm1ldGhvZHMudXBkYXRlUmVjb3JkKCk7XG4gICAgICB0aGlzLm1ldGhvZHMudXBkYXRlVXNlcigpO1xuICAgIH1cblxuICAgIG9uU2hvdygpIHtcbiAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgIGNvbnNvbGUubG9nKCdtZSBvbiBzaG93Jyk7XG5cbiAgICAgIHJlcXVlc3QuZ2V0VXNlckluZm8oKS50aGVuKGQgPT4ge1xuICAgICAgICBzZWxmLnVzZXJJbmZvID0gZDtcbiAgICAgICAgdGhpcy5tZXRob2RzLnVwZGF0ZUJvb2tpbmcoKTtcbiAgICAgICAgdGhpcy5tZXRob2RzLnVwZGF0ZVJlY29yZCgpO1xuICAgICAgICB0aGlzLm1ldGhvZHMudXBkYXRlVXNlcigpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25Mb2FkKCkge1xuICAgICAgY29uc29sZS5sb2coJ21lIG9uIGxvYWQnKTtcbiAgICAgIGxvYWRpbmcuc2hvdygpO1xuICAgIH1cbiAgfVxuXG4iXX0=