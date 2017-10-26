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
          type: _this.type
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJhbmsuanMiXSwibmFtZXMiOlsiUmFuayIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsImRhdGEiLCJ1c2VySW5mbyIsInJhbmtEYXRhIiwidHlwZSIsImNvbXB1dGVkIiwibXlTY29yZSIsInNjb3JlIiwicmVuZGVyU2NvcmUiLCJyZXQiLCJob3VyIiwibWludXRlIiwic2Vjb25kIiwibWV0aG9kcyIsInNlbGVjdFRhYiIsInBhZ2VTY3JvbGxUbyIsInNjcm9sbFRvcCIsInVwZGF0ZVJhbmsiLCJnZXQiLCJyYW5rIiwidGhlbiIsInJlc3VsdCIsImNvbnZlcnRMaXN0IiwibGlzdCIsIiRhcHBseSIsImhpZGUiLCJzdG9wUHVsbERvd25SZWZyZXNoIiwiZWFjaCIsImQiLCJldmVudHMiLCJzZWxmIiwiZ2V0VXNlckluZm8iLCJjb25zb2xlIiwibG9nIiwic2hvdyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7O0lBRXFCQSxJOzs7Ozs7Ozs7Ozs7Ozt3TUFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0IsS0FEakI7QUFFUEMsNkJBQXVCO0FBRmhCLEssUUFLVkMsTSxHQUFTLEVBQUMsYUFBWSxFQUFDLFlBQVcsRUFBWixFQUFiLEUsUUFDWkMsTyxHQUFVLEUsUUFDVEMsVSxHQUFhO0FBQ1I7QUFEUSxLLFFBSVZDLEksR0FBTztBQUNMQyxnQkFBVSxJQURMO0FBRUxDLGdCQUFVLElBRkw7QUFHTEMsWUFBTTtBQUhELEssUUFNUEMsUSxHQUFXO0FBQ1RDLGVBQVMsbUJBQU07QUFDYixZQUFJLE1BQUtILFFBQUwsSUFBaUIsTUFBS0EsUUFBTCxDQUFjSSxLQUFuQyxFQUEwQztBQUN4QyxjQUFNQSxRQUFRLGVBQUtDLFdBQUwsQ0FBaUIsTUFBS0wsUUFBTCxDQUFjSSxLQUEvQixDQUFkO0FBQ0EsY0FBSUUsTUFBTSxFQUFWOztBQUVBLGNBQUlGLE1BQU1HLElBQVYsRUFBZ0I7QUFDZEQsbUJBQVVGLE1BQU1HLElBQWhCO0FBQ0Q7QUFDRCxjQUFJSCxNQUFNSSxNQUFWLEVBQWtCO0FBQ2hCRixtQkFBVUYsTUFBTUksTUFBaEI7QUFDRDtBQUNELGNBQUlKLE1BQU1LLE1BQVYsRUFBa0I7QUFDaEJILG1CQUFVRixNQUFNSyxNQUFoQjtBQUNEO0FBQ0QsaUJBQU9ILEdBQVA7QUFDRDtBQUNELGVBQU8sRUFBUDtBQUNEO0FBbEJRLEssUUFxQlhJLE8sR0FBVTtBQUNSQyxpQkFBVyxtQkFBQ1YsSUFBRCxFQUFVO0FBQ25CLHVCQUFLVyxZQUFMLENBQWtCO0FBQ2hCQyxxQkFBVztBQURLLFNBQWxCO0FBR0EsY0FBS0gsT0FBTCxDQUFhSSxVQUFiLENBQXdCYixJQUF4QjtBQUNELE9BTk87QUFPUmEsa0JBQVksb0JBQUNiLElBQUQsRUFBVTtBQUNwQixZQUFJQSxJQUFKLEVBQVU7QUFDUixnQkFBS0EsSUFBTCxHQUFZQSxJQUFaO0FBQ0Q7O0FBRUQsMEJBQVFjLEdBQVIsQ0FBWSxlQUFLQyxJQUFqQixFQUF1QjtBQUNyQmYsZ0JBQU0sTUFBS0E7QUFEVSxTQUF2QixFQUVHZ0IsSUFGSCxDQUVRLGlCQUVGO0FBQUEsY0FESkMsTUFDSSxTQURKQSxNQUNJOztBQUNKLGdCQUFLbEIsUUFBTCxHQUFnQmtCLE1BQWhCO0FBQ0EsZ0JBQUtSLE9BQUwsQ0FBYVMsV0FBYixDQUF5QixNQUFLbkIsUUFBTCxDQUFjb0IsSUFBdkM7QUFDQSxnQkFBS0MsTUFBTDtBQUNBLDRCQUFRQyxJQUFSO0FBQ0EseUJBQUtDLG1CQUFMO0FBQ0QsU0FWRDtBQVdELE9BdkJPO0FBd0JSSixtQkFBYSxxQkFBQ0MsSUFBRCxFQUFVO0FBQ3JCLHVCQUFLSSxJQUFMLENBQVVKLElBQVYsRUFBZ0IsYUFBSztBQUNuQixjQUFNaEIsUUFBUSxlQUFLQyxXQUFMLENBQWlCb0IsRUFBRXJCLEtBQW5CLENBQWQ7QUFDQXFCLFlBQUVyQixLQUFGLEdBQVUsRUFBVjs7QUFFQSxjQUFJQSxNQUFNRyxJQUFWLEVBQWdCO0FBQ2RrQixjQUFFckIsS0FBRixJQUFjQSxNQUFNRyxJQUFwQjtBQUNEO0FBQ0QsY0FBSUgsTUFBTUksTUFBVixFQUFrQjtBQUNoQmlCLGNBQUVyQixLQUFGLElBQWNBLE1BQU1JLE1BQXBCO0FBQ0Q7QUFDRCxjQUFJSixNQUFNSyxNQUFWLEVBQWtCO0FBQ2hCZ0IsY0FBRXJCLEtBQUYsSUFBY0EsTUFBTUssTUFBcEI7QUFDRDtBQUNGLFNBYkQ7QUFjRDtBQXZDTyxLLFFBMENWaUIsTSxHQUFTLEU7Ozs7O3dDQUlXO0FBQ2xCLFdBQUtoQixPQUFMLENBQWFJLFVBQWI7QUFDRDs7OzZCQUVRO0FBQUE7O0FBQ1AsVUFBSWEsT0FBTyxJQUFYOztBQUVBLHdCQUFRQyxXQUFSLEdBQXNCWCxJQUF0QixDQUEyQixhQUFLO0FBQzlCVSxhQUFLNUIsUUFBTCxHQUFnQjBCLENBQWhCO0FBQ0EsZUFBS2YsT0FBTCxDQUFhSSxVQUFiO0FBQ0QsT0FIRDtBQUlEOzs7NkJBRVE7QUFDUGUsY0FBUUMsR0FBUixDQUFZLGNBQVo7QUFDQSx3QkFBUUMsSUFBUjtBQUNEOzs7RUFyRytCLGVBQUtDLEk7O2tCQUFsQnpDLEkiLCJmaWxlIjoicmFuay5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbiAgaW1wb3J0IGxvYWRpbmcgZnJvbSAnLi4vc2VydmljZXMvbG9hZGluZy5qcyc7XG4gIGltcG9ydCB1dGlsIGZyb20gJy4uL3NlcnZpY2VzL3V0aWwuanMnO1xuICBpbXBvcnQgdXJscyBmcm9tICcuLi9zZXJ2aWNlcy91cmxzLmpzJztcbiAgaW1wb3J0IHJlcXVlc3QgZnJvbSAnLi4vc2VydmljZXMvcmVxdWVzdC5qcyc7XG5cbiAgaW1wb3J0IG51bGxMaXN0IGZyb20gJy4uL2NvbXBvbmVudHMvbnVsbExpc3QnO1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFJhbmsgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmjpLooYzmppwnLFxuICAgICAgZW5hYmxlUHVsbERvd25SZWZyZXNoOiB0cnVlLFxuICAgIH1cblxuICAgJHByb3BzID0ge1wibnVsbC1saXN0XCI6e1wieG1sbnM6d3hcIjpcIlwifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICAnbnVsbC1saXN0JzogbnVsbExpc3QsXG4gICAgfVxuXG4gICAgZGF0YSA9IHtcbiAgICAgIHVzZXJJbmZvOiBudWxsLFxuICAgICAgcmFua0RhdGE6IG51bGwsXG4gICAgICB0eXBlOiAnd2VlaycsXG4gICAgfVxuXG4gICAgY29tcHV0ZWQgPSB7XG4gICAgICBteVNjb3JlOiAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnJhbmtEYXRhICYmIHRoaXMucmFua0RhdGEuc2NvcmUpIHtcbiAgICAgICAgICBjb25zdCBzY29yZSA9IHV0aWwucmVuZGVyU2NvcmUodGhpcy5yYW5rRGF0YS5zY29yZSk7XG4gICAgICAgICAgbGV0IHJldCA9ICcnO1xuXG4gICAgICAgICAgaWYgKHNjb3JlLmhvdXIpIHtcbiAgICAgICAgICAgIHJldCArPSBgJHtzY29yZS5ob3VyfWhgO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoc2NvcmUubWludXRlKSB7XG4gICAgICAgICAgICByZXQgKz0gYCR7c2NvcmUubWludXRlfW1pbmA7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChzY29yZS5zZWNvbmQpIHtcbiAgICAgICAgICAgIHJldCArPSBgJHtzY29yZS5zZWNvbmR9c2A7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBzZWxlY3RUYWI6ICh0eXBlKSA9PiB7XG4gICAgICAgIHdlcHkucGFnZVNjcm9sbFRvKHtcbiAgICAgICAgICBzY3JvbGxUb3A6IDBcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5tZXRob2RzLnVwZGF0ZVJhbmsodHlwZSk7XG4gICAgICB9LFxuICAgICAgdXBkYXRlUmFuazogKHR5cGUpID0+IHtcbiAgICAgICAgaWYgKHR5cGUpIHtcbiAgICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVxdWVzdC5nZXQodXJscy5yYW5rLCB7XG4gICAgICAgICAgdHlwZTogdGhpcy50eXBlLFxuICAgICAgICB9KS50aGVuKCh7XG4gICAgICAgICAgcmVzdWx0LFxuICAgICAgICB9KSA9PiB7XG4gICAgICAgICAgdGhpcy5yYW5rRGF0YSA9IHJlc3VsdDtcbiAgICAgICAgICB0aGlzLm1ldGhvZHMuY29udmVydExpc3QodGhpcy5yYW5rRGF0YS5saXN0KTtcbiAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICAgIGxvYWRpbmcuaGlkZSgpO1xuICAgICAgICAgIHdlcHkuc3RvcFB1bGxEb3duUmVmcmVzaCgpO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBjb252ZXJ0TGlzdDogKGxpc3QpID0+IHtcbiAgICAgICAgdXRpbC5lYWNoKGxpc3QsIGQgPT4ge1xuICAgICAgICAgIGNvbnN0IHNjb3JlID0gdXRpbC5yZW5kZXJTY29yZShkLnNjb3JlKTtcbiAgICAgICAgICBkLnNjb3JlID0gJyc7XG5cbiAgICAgICAgICBpZiAoc2NvcmUuaG91cikge1xuICAgICAgICAgICAgZC5zY29yZSArPSBgJHtzY29yZS5ob3VyfWhgO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoc2NvcmUubWludXRlKSB7XG4gICAgICAgICAgICBkLnNjb3JlICs9IGAke3Njb3JlLm1pbnV0ZX1taW5gO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoc2NvcmUuc2Vjb25kKSB7XG4gICAgICAgICAgICBkLnNjb3JlICs9IGAke3Njb3JlLnNlY29uZH1zYDtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGV2ZW50cyA9IHtcblxuICAgIH1cblxuICAgIG9uUHVsbERvd25SZWZyZXNoKCkge1xuICAgICAgdGhpcy5tZXRob2RzLnVwZGF0ZVJhbmsoKTtcbiAgICB9XG5cbiAgICBvblNob3coKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXM7XG5cbiAgICAgIHJlcXVlc3QuZ2V0VXNlckluZm8oKS50aGVuKGQgPT4ge1xuICAgICAgICBzZWxmLnVzZXJJbmZvID0gZDtcbiAgICAgICAgdGhpcy5tZXRob2RzLnVwZGF0ZVJhbmsoKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uTG9hZCgpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdyYW5rIG9uIGxvYWQnKTtcbiAgICAgIGxvYWRpbmcuc2hvdygpO1xuICAgIH1cbiAgfVxuXG4iXX0=