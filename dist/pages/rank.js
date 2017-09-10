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

var _loading = require('./../services/loading.js');

var _loading2 = _interopRequireDefault(_loading);

var _util = require('./../services/util.js');

var _util2 = _interopRequireDefault(_util);

var _urls = require('./../services/urls.js');

var _urls2 = _interopRequireDefault(_urls);

var _request = require('./../services/request.js');

var _request2 = _interopRequireDefault(_request);

var _nullList = require('./../components/nullList.js');

var _nullList2 = _interopRequireDefault(_nullList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Rank = function (_wepy$page) {
  (0, _inherits3.default)(Rank, _wepy$page);

  function Rank() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Rank);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Rank.__proto__ || (0, _getPrototypeOf2.default)(Rank)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '排行榜',
      enablePullDownRefresh: true
    }, _this.$props = { "null-list": { "xmlns:wx": "" } }, _this.$events = {}, _this.components = {
      'null-list': _nullList2.default
    }, _this.data = {
      userInfo: null,
      rankData: null,
      type: 'week'
    }, _this.computed = {
      myScore: function myScore() {
        if (_this.rankData && _this.rankData.score) {
          var score = _util2.default.renderScore(_this.rankData.score);
          var ret = '';

          if (score.hour) {
            ret += score.hour + 'h';
          }
          if (score.minute) {
            ret += score.minute + 'min';
          }
          if (score.second) {
            ret += score.second + 's';
          }
          return ret;
        }
        return '';
      }
    }, _this.methods = {
      selectTab: function selectTab(type) {
        _wepy2.default.pageScrollTo({
          scrollTop: 0
        });
        _this.methods.updateRank(type);
      },
      updateRank: function updateRank(type) {
        if (type) {
          _this.type = type;
        }

        _request2.default.get(_urls2.default.rank, {
          type: _this.data.type
        }).then(function (_ref2) {
          var result = _ref2.result;

          _this.rankData = result;
          _this.methods.convertList(_this.rankData.list);
          _this.$apply();
          _loading2.default.hide();
          _wepy2.default.stopPullDownRefresh();
        });
      },
      convertList: function convertList(list) {
        _util2.default.each(list, function (d) {
          var score = _util2.default.renderScore(d.score);
          d.score = '';

          if (score.hour) {
            d.score += score.hour + 'h';
          }
          if (score.minute) {
            d.score += score.minute + 'min';
          }
          if (score.second) {
            d.score += score.second + 's';
          }
        });
      }
    }, _this.events = {}, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Rank, [{
    key: 'onPullDownRefresh',
    value: function onPullDownRefresh() {
      this.methods.updateRank();
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      var _this2 = this;

      var self = this;

      _request2.default.getUserInfo().then(function (d) {
        self.userInfo = d;
        _this2.methods.updateRank();
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      console.log('rank on load');
      _loading2.default.show();
    }
  }]);
  return Rank;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Rank , 'pages/rank'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJhbmsuanMiXSwibmFtZXMiOlsiUmFuayIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsImRhdGEiLCJ1c2VySW5mbyIsInJhbmtEYXRhIiwidHlwZSIsImNvbXB1dGVkIiwibXlTY29yZSIsInNjb3JlIiwicmVuZGVyU2NvcmUiLCJyZXQiLCJob3VyIiwibWludXRlIiwic2Vjb25kIiwibWV0aG9kcyIsInNlbGVjdFRhYiIsInBhZ2VTY3JvbGxUbyIsInNjcm9sbFRvcCIsInVwZGF0ZVJhbmsiLCJnZXQiLCJyYW5rIiwidGhlbiIsInJlc3VsdCIsImNvbnZlcnRMaXN0IiwibGlzdCIsIiRhcHBseSIsImhpZGUiLCJzdG9wUHVsbERvd25SZWZyZXNoIiwiZWFjaCIsImQiLCJldmVudHMiLCJzZWxmIiwiZ2V0VXNlckluZm8iLCJjb25zb2xlIiwibG9nIiwic2hvdyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7O0lBRXFCQSxJOzs7Ozs7Ozs7Ozs7Ozt3TUFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0IsS0FEakI7QUFFUEMsNkJBQXVCO0FBRmhCLEssUUFLVkMsTSxHQUFTLEVBQUMsYUFBWSxFQUFDLFlBQVcsRUFBWixFQUFiLEUsUUFDWkMsTyxHQUFVLEUsUUFDVEMsVSxHQUFhO0FBQ1I7QUFEUSxLLFFBSVZDLEksR0FBTztBQUNMQyxnQkFBVSxJQURMO0FBRUxDLGdCQUFVLElBRkw7QUFHTEMsWUFBTTtBQUhELEssUUFNUEMsUSxHQUFXO0FBQ1RDLGVBQVMsbUJBQU07QUFDYixZQUFJLE1BQUtILFFBQUwsSUFBaUIsTUFBS0EsUUFBTCxDQUFjSSxLQUFuQyxFQUEwQztBQUN4QyxjQUFNQSxRQUFRLGVBQUtDLFdBQUwsQ0FBaUIsTUFBS0wsUUFBTCxDQUFjSSxLQUEvQixDQUFkO0FBQ0EsY0FBSUUsTUFBTSxFQUFWOztBQUVBLGNBQUlGLE1BQU1HLElBQVYsRUFBZ0I7QUFDZEQsbUJBQVVGLE1BQU1HLElBQWhCO0FBQ0Q7QUFDRCxjQUFJSCxNQUFNSSxNQUFWLEVBQWtCO0FBQ2hCRixtQkFBVUYsTUFBTUksTUFBaEI7QUFDRDtBQUNELGNBQUlKLE1BQU1LLE1BQVYsRUFBa0I7QUFDaEJILG1CQUFVRixNQUFNSyxNQUFoQjtBQUNEO0FBQ0QsaUJBQU9ILEdBQVA7QUFDRDtBQUNELGVBQU8sRUFBUDtBQUNEO0FBbEJRLEssUUFxQlhJLE8sR0FBVTtBQUNSQyxpQkFBVyxtQkFBQ1YsSUFBRCxFQUFVO0FBQ25CLHVCQUFLVyxZQUFMLENBQWtCO0FBQ2hCQyxxQkFBVztBQURLLFNBQWxCO0FBR0EsY0FBS0gsT0FBTCxDQUFhSSxVQUFiLENBQXdCYixJQUF4QjtBQUNELE9BTk87QUFPUmEsa0JBQVksb0JBQUNiLElBQUQsRUFBVTtBQUNwQixZQUFJQSxJQUFKLEVBQVU7QUFDUixnQkFBS0EsSUFBTCxHQUFZQSxJQUFaO0FBQ0Q7O0FBRUQsMEJBQVFjLEdBQVIsQ0FBWSxlQUFLQyxJQUFqQixFQUF1QjtBQUNyQmYsZ0JBQU0sTUFBS0gsSUFBTCxDQUFVRztBQURLLFNBQXZCLEVBRUdnQixJQUZILENBRVEsaUJBRUY7QUFBQSxjQURKQyxNQUNJLFNBREpBLE1BQ0k7O0FBQ0osZ0JBQUtsQixRQUFMLEdBQWdCa0IsTUFBaEI7QUFDQSxnQkFBS1IsT0FBTCxDQUFhUyxXQUFiLENBQXlCLE1BQUtuQixRQUFMLENBQWNvQixJQUF2QztBQUNBLGdCQUFLQyxNQUFMO0FBQ0EsNEJBQVFDLElBQVI7QUFDQSx5QkFBS0MsbUJBQUw7QUFDRCxTQVZEO0FBV0QsT0F2Qk87QUF3QlJKLG1CQUFhLHFCQUFDQyxJQUFELEVBQVU7QUFDckIsdUJBQUtJLElBQUwsQ0FBVUosSUFBVixFQUFnQixhQUFLO0FBQ25CLGNBQU1oQixRQUFRLGVBQUtDLFdBQUwsQ0FBaUJvQixFQUFFckIsS0FBbkIsQ0FBZDtBQUNBcUIsWUFBRXJCLEtBQUYsR0FBVSxFQUFWOztBQUVBLGNBQUlBLE1BQU1HLElBQVYsRUFBZ0I7QUFDZGtCLGNBQUVyQixLQUFGLElBQWNBLE1BQU1HLElBQXBCO0FBQ0Q7QUFDRCxjQUFJSCxNQUFNSSxNQUFWLEVBQWtCO0FBQ2hCaUIsY0FBRXJCLEtBQUYsSUFBY0EsTUFBTUksTUFBcEI7QUFDRDtBQUNELGNBQUlKLE1BQU1LLE1BQVYsRUFBa0I7QUFDaEJnQixjQUFFckIsS0FBRixJQUFjQSxNQUFNSyxNQUFwQjtBQUNEO0FBQ0YsU0FiRDtBQWNEO0FBdkNPLEssUUEwQ1ZpQixNLEdBQVMsRTs7Ozs7d0NBSVc7QUFDbEIsV0FBS2hCLE9BQUwsQ0FBYUksVUFBYjtBQUNEOzs7NkJBRVE7QUFBQTs7QUFDUCxVQUFJYSxPQUFPLElBQVg7O0FBRUEsd0JBQVFDLFdBQVIsR0FBc0JYLElBQXRCLENBQTJCLGFBQUs7QUFDOUJVLGFBQUs1QixRQUFMLEdBQWdCMEIsQ0FBaEI7QUFDQSxlQUFLZixPQUFMLENBQWFJLFVBQWI7QUFDRCxPQUhEO0FBSUQ7Ozs2QkFFUTtBQUNQZSxjQUFRQyxHQUFSLENBQVksY0FBWjtBQUNBLHdCQUFRQyxJQUFSO0FBQ0Q7OztFQXJHK0IsZUFBS0MsSTs7a0JBQWxCekMsSSIsImZpbGUiOiJyYW5rLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuICBpbXBvcnQgbG9hZGluZyBmcm9tICcuLi9zZXJ2aWNlcy9sb2FkaW5nLmpzJztcbiAgaW1wb3J0IHV0aWwgZnJvbSAnLi4vc2VydmljZXMvdXRpbC5qcyc7XG4gIGltcG9ydCB1cmxzIGZyb20gJy4uL3NlcnZpY2VzL3VybHMuanMnO1xuICBpbXBvcnQgcmVxdWVzdCBmcm9tICcuLi9zZXJ2aWNlcy9yZXF1ZXN0LmpzJztcblxuICBpbXBvcnQgbnVsbExpc3QgZnJvbSAnLi4vY29tcG9uZW50cy9udWxsTGlzdCc7XG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmFuayBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aOkuihjOamnCcsXG4gICAgICBlbmFibGVQdWxsRG93blJlZnJlc2g6IHRydWUsXG4gICAgfVxuXG4gICAkcHJvcHMgPSB7XCJudWxsLWxpc3RcIjp7XCJ4bWxuczp3eFwiOlwiXCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgICdudWxsLWxpc3QnOiBudWxsTGlzdCxcbiAgICB9XG5cbiAgICBkYXRhID0ge1xuICAgICAgdXNlckluZm86IG51bGwsXG4gICAgICByYW5rRGF0YTogbnVsbCxcbiAgICAgIHR5cGU6ICd3ZWVrJyxcbiAgICB9XG5cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIG15U2NvcmU6ICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucmFua0RhdGEgJiYgdGhpcy5yYW5rRGF0YS5zY29yZSkge1xuICAgICAgICAgIGNvbnN0IHNjb3JlID0gdXRpbC5yZW5kZXJTY29yZSh0aGlzLnJhbmtEYXRhLnNjb3JlKTtcbiAgICAgICAgICBsZXQgcmV0ID0gJyc7XG5cbiAgICAgICAgICBpZiAoc2NvcmUuaG91cikge1xuICAgICAgICAgICAgcmV0ICs9IGAke3Njb3JlLmhvdXJ9aGA7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChzY29yZS5taW51dGUpIHtcbiAgICAgICAgICAgIHJldCArPSBgJHtzY29yZS5taW51dGV9bWluYDtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHNjb3JlLnNlY29uZCkge1xuICAgICAgICAgICAgcmV0ICs9IGAke3Njb3JlLnNlY29uZH1zYDtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJyc7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHNlbGVjdFRhYjogKHR5cGUpID0+IHtcbiAgICAgICAgd2VweS5wYWdlU2Nyb2xsVG8oe1xuICAgICAgICAgIHNjcm9sbFRvcDogMFxuICAgICAgICB9KVxuICAgICAgICB0aGlzLm1ldGhvZHMudXBkYXRlUmFuayh0eXBlKTtcbiAgICAgIH0sXG4gICAgICB1cGRhdGVSYW5rOiAodHlwZSkgPT4ge1xuICAgICAgICBpZiAodHlwZSkge1xuICAgICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgICAgIH1cblxuICAgICAgICByZXF1ZXN0LmdldCh1cmxzLnJhbmssIHtcbiAgICAgICAgICB0eXBlOiB0aGlzLmRhdGEudHlwZSxcbiAgICAgICAgfSkudGhlbigoe1xuICAgICAgICAgIHJlc3VsdCxcbiAgICAgICAgfSkgPT4ge1xuICAgICAgICAgIHRoaXMucmFua0RhdGEgPSByZXN1bHQ7XG4gICAgICAgICAgdGhpcy5tZXRob2RzLmNvbnZlcnRMaXN0KHRoaXMucmFua0RhdGEubGlzdCk7XG4gICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgICBsb2FkaW5nLmhpZGUoKTtcbiAgICAgICAgICB3ZXB5LnN0b3BQdWxsRG93blJlZnJlc2goKTtcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgY29udmVydExpc3Q6IChsaXN0KSA9PiB7XG4gICAgICAgIHV0aWwuZWFjaChsaXN0LCBkID0+IHtcbiAgICAgICAgICBjb25zdCBzY29yZSA9IHV0aWwucmVuZGVyU2NvcmUoZC5zY29yZSk7XG4gICAgICAgICAgZC5zY29yZSA9ICcnO1xuXG4gICAgICAgICAgaWYgKHNjb3JlLmhvdXIpIHtcbiAgICAgICAgICAgIGQuc2NvcmUgKz0gYCR7c2NvcmUuaG91cn1oYDtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHNjb3JlLm1pbnV0ZSkge1xuICAgICAgICAgICAgZC5zY29yZSArPSBgJHtzY29yZS5taW51dGV9bWluYDtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHNjb3JlLnNlY29uZCkge1xuICAgICAgICAgICAgZC5zY29yZSArPSBgJHtzY29yZS5zZWNvbmR9c2A7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBldmVudHMgPSB7XG5cbiAgICB9XG5cbiAgICBvblB1bGxEb3duUmVmcmVzaCgpIHtcbiAgICAgIHRoaXMubWV0aG9kcy51cGRhdGVSYW5rKCk7XG4gICAgfVxuXG4gICAgb25TaG93KCkge1xuICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuXG4gICAgICByZXF1ZXN0LmdldFVzZXJJbmZvKCkudGhlbihkID0+IHtcbiAgICAgICAgc2VsZi51c2VySW5mbyA9IGQ7XG4gICAgICAgIHRoaXMubWV0aG9kcy51cGRhdGVSYW5rKCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICBjb25zb2xlLmxvZygncmFuayBvbiBsb2FkJyk7XG4gICAgICBsb2FkaW5nLnNob3coKTtcbiAgICB9XG4gIH1cblxuIl19