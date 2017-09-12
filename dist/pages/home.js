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

var _defer = require('./../services/defer.js');

var _defer2 = _interopRequireDefault(_defer);

var _util = require('./../services/util.js');

var _util2 = _interopRequireDefault(_util);

var _urls = require('./../services/urls.js');

var _urls2 = _interopRequireDefault(_urls);

var _request = require('./../services/request.js');

var _request2 = _interopRequireDefault(_request);

var _loading = require('./../services/loading.js');

var _loading2 = _interopRequireDefault(_loading);

var _question = require('./../services/question.js');

var _question2 = _interopRequireDefault(_question);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Home = function (_wepy$page) {
  (0, _inherits3.default)(Home, _wepy$page);

  function Home() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Home);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Home.__proto__ || (0, _getPrototypeOf2.default)(Home)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '塔拓'
    }, _this.components = {}, _this.data = {
      userInfo: null,
      homeData: null,
      showConfirmMask: false
    }, _this.computed = {
      bestScore: function bestScore() {
        if (this.homeData && this.homeData.bestScore) {
          return _util2.default.renderScore(this.homeData.bestScore.score);
        }
        return {};
      }
    }, _this.methods = {
      toPictures: function toPictures() {
        _wepy2.default.navigateTo({
          url: '/pages/pictures'
        });
      },
      toQuestion: function toQuestion() {
        _question2.default.check(true);
      },
      toChallenge: function toChallenge(challengeId) {
        console.log('to challenge page', challengeId);
        _wepy2.default.navigateTo({
          url: '/pages/challenge?id=' + challengeId
        });
      },
      toRank: function toRank() {
        console.log('to rank page');
        _wepy2.default.navigateTo({
          url: '/pages/rank'
        });
      },
      toMe: function toMe() {
        console.log('to me page');
        _wepy2.default.navigateTo({
          url: '/pages/me'
        });
      },
      toBooking: function toBooking() {
        console.log('to booking');
        _wepy2.default.navigateTo({
          url: '/pages/booking'
        });
      },
      toQrcode: function toQrcode() {
        console.log('to qrcode page');
        _wepy2.default.scanCode({
          onlyFromCamera: true,
          success: function success(res) {
            _this.methods.confirmChallenge().then(function () {
              _request2.default.post(_urls2.default.postQrcode, {
                loadingDelay: 0,
                result: (0, _stringify2.default)(res)
              }).then(function (d) {
                _this.methods.toChallenge(d.result.challengeId);
                _this.methods.updateHome();
              });
            });
            _this.$apply();
          },
          fail: function fail(res) {
            if (res.errMsg === 'scanCode:fail') {
              _wepy2.default.showAlert({
                content: '扫描失败'
              });
            }
          }
        });
      },
      confirmOk: function confirmOk() {
        _this.confirmMaskDeferred.resolve();
        _this.showConfirmMask = false;
      },
      confirmCancel: function confirmCancel() {
        _this.showConfirmMask = false;
      },
      confirmChallenge: function confirmChallenge() {
        var deferred = (0, _defer2.default)();

        _this.showConfirmMask = true;
        _this.confirmMaskDeferred = deferred;

        return deferred.promise;
      },
      updateHome: function updateHome() {
        _request2.default.get(_urls2.default.home).then(function (_ref2) {
          var result = _ref2.result;

          _this.homeData = result;
          _this.$apply();
          _loading2.default.hide();
        });
      }
    }, _this.events = {}, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Home, [{
    key: 'onShareAppMessage',
    value: function onShareAppMessage(res) {
      if (res.from === 'button') {
        // 来自页面内转发按钮
        console.log(res.target);
      }
      return {
        title: '塔拓',
        path: '/pages/home',
        success: function success(res) {
          // 转发成功
          _wepy2.default.showToast({
            title: '转发成功',
            duration: 2000
          });
        },
        fail: function fail(res) {
          // 转发失败
          _wepy2.default.showAlert({
            content: '转发失败'
          });
        }
      };
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      var _this2 = this;

      console.log('home on show');
      _request2.default.getUserInfo().then(function (d) {
        _this2.userInfo = d;
        _this2.methods.updateHome();
        _question2.default.check();
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      console.log('home on load');
      _loading2.default.show();
    }
  }]);
  return Home;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Home , 'pages/home'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUuanMiXSwibmFtZXMiOlsiSG9tZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJjb21wb25lbnRzIiwiZGF0YSIsInVzZXJJbmZvIiwiaG9tZURhdGEiLCJzaG93Q29uZmlybU1hc2siLCJjb21wdXRlZCIsImJlc3RTY29yZSIsInJlbmRlclNjb3JlIiwic2NvcmUiLCJtZXRob2RzIiwidG9QaWN0dXJlcyIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJ0b1F1ZXN0aW9uIiwiY2hlY2siLCJ0b0NoYWxsZW5nZSIsImNoYWxsZW5nZUlkIiwiY29uc29sZSIsImxvZyIsInRvUmFuayIsInRvTWUiLCJ0b0Jvb2tpbmciLCJ0b1FyY29kZSIsInNjYW5Db2RlIiwib25seUZyb21DYW1lcmEiLCJzdWNjZXNzIiwicmVzIiwiY29uZmlybUNoYWxsZW5nZSIsInRoZW4iLCJwb3N0IiwicG9zdFFyY29kZSIsImxvYWRpbmdEZWxheSIsInJlc3VsdCIsImQiLCJ1cGRhdGVIb21lIiwiJGFwcGx5IiwiZmFpbCIsImVyck1zZyIsInNob3dBbGVydCIsImNvbnRlbnQiLCJjb25maXJtT2siLCJjb25maXJtTWFza0RlZmVycmVkIiwicmVzb2x2ZSIsImNvbmZpcm1DYW5jZWwiLCJkZWZlcnJlZCIsInByb21pc2UiLCJnZXQiLCJob21lIiwiaGlkZSIsImV2ZW50cyIsImZyb20iLCJ0YXJnZXQiLCJ0aXRsZSIsInBhdGgiLCJzaG93VG9hc3QiLCJkdXJhdGlvbiIsImdldFVzZXJJbmZvIiwic2hvdyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0lBRXFCQSxJOzs7Ozs7Ozs7Ozs7Ozt3TUFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQTRCVEMsVSxHQUFhLEUsUUFJYkMsSSxHQUFPO0FBQ0xDLGdCQUFVLElBREw7QUFFTEMsZ0JBQVUsSUFGTDtBQUdMQyx1QkFBaUI7QUFIWixLLFFBTVBDLFEsR0FBVztBQUNUQyxlQURTLHVCQUNHO0FBQ1YsWUFBSSxLQUFLSCxRQUFMLElBQWlCLEtBQUtBLFFBQUwsQ0FBY0csU0FBbkMsRUFBOEM7QUFDNUMsaUJBQU8sZUFBS0MsV0FBTCxDQUFpQixLQUFLSixRQUFMLENBQWNHLFNBQWQsQ0FBd0JFLEtBQXpDLENBQVA7QUFDRDtBQUNELGVBQU8sRUFBUDtBQUNEO0FBTlEsSyxRQVNYQyxPLEdBQVU7QUFDUkMsa0JBQVksc0JBQU07QUFDaEIsdUJBQUtDLFVBQUwsQ0FBZ0I7QUFDZEMsZUFBSztBQURTLFNBQWhCO0FBR0QsT0FMTztBQU1SQyxrQkFBWSxzQkFBTTtBQUNoQiwyQkFBU0MsS0FBVCxDQUFlLElBQWY7QUFDRCxPQVJPO0FBU1JDLG1CQUFhLHFCQUFDQyxXQUFELEVBQWlCO0FBQzVCQyxnQkFBUUMsR0FBUixDQUFZLG1CQUFaLEVBQWlDRixXQUFqQztBQUNBLHVCQUFLTCxVQUFMLENBQWdCO0FBQ2RDLHdDQUE0Qkk7QUFEZCxTQUFoQjtBQUdELE9BZE87QUFlUkcsY0FBUSxrQkFBTTtBQUNaRixnQkFBUUMsR0FBUixDQUFZLGNBQVo7QUFDQSx1QkFBS1AsVUFBTCxDQUFnQjtBQUNkQyxlQUFLO0FBRFMsU0FBaEI7QUFHRCxPQXBCTztBQXFCUlEsWUFBTSxnQkFBTTtBQUNWSCxnQkFBUUMsR0FBUixDQUFZLFlBQVo7QUFDQSx1QkFBS1AsVUFBTCxDQUFnQjtBQUNkQyxlQUFLO0FBRFMsU0FBaEI7QUFHRCxPQTFCTztBQTJCUlMsaUJBQVcscUJBQU07QUFDZkosZ0JBQVFDLEdBQVIsQ0FBWSxZQUFaO0FBQ0EsdUJBQUtQLFVBQUwsQ0FBZ0I7QUFDZEMsZUFBSztBQURTLFNBQWhCO0FBR0QsT0FoQ087QUFpQ1JVLGdCQUFVLG9CQUFNO0FBQ2RMLGdCQUFRQyxHQUFSLENBQVksZ0JBQVo7QUFDQSx1QkFBS0ssUUFBTCxDQUFjO0FBQ1pDLDBCQUFnQixJQURKO0FBRVpDLG1CQUFTLGlCQUFDQyxHQUFELEVBQVM7QUFDaEIsa0JBQUtqQixPQUFMLENBQWFrQixnQkFBYixHQUFnQ0MsSUFBaEMsQ0FBcUMsWUFBTTtBQUN6QyxnQ0FBUUMsSUFBUixDQUFhLGVBQUtDLFVBQWxCLEVBQThCO0FBQzVCQyw4QkFBYyxDQURjO0FBRTVCQyx3QkFBUSx5QkFBZU4sR0FBZjtBQUZvQixlQUE5QixFQUdHRSxJQUhILENBR1EsYUFBSztBQUNYLHNCQUFLbkIsT0FBTCxDQUFhTSxXQUFiLENBQXlCa0IsRUFBRUQsTUFBRixDQUFTaEIsV0FBbEM7QUFDQSxzQkFBS1AsT0FBTCxDQUFheUIsVUFBYjtBQUNELGVBTkQ7QUFPRCxhQVJEO0FBU0Esa0JBQUtDLE1BQUw7QUFDRCxXQWJXO0FBY1pDLGdCQUFNLGNBQUNWLEdBQUQsRUFBUztBQUNiLGdCQUFJQSxJQUFJVyxNQUFKLEtBQWUsZUFBbkIsRUFBb0M7QUFDbEMsNkJBQUtDLFNBQUwsQ0FBZTtBQUNiQyx5QkFBUztBQURJLGVBQWY7QUFHRDtBQUNGO0FBcEJXLFNBQWQ7QUFzQkQsT0F6RE87QUEwRFJDLGlCQUFXLHFCQUFNO0FBQ2YsY0FBS0MsbUJBQUwsQ0FBeUJDLE9BQXpCO0FBQ0EsY0FBS3RDLGVBQUwsR0FBdUIsS0FBdkI7QUFDRCxPQTdETztBQThEUnVDLHFCQUFlLHlCQUFNO0FBQ25CLGNBQUt2QyxlQUFMLEdBQXVCLEtBQXZCO0FBQ0QsT0FoRU87QUFpRVJ1Qix3QkFBa0IsNEJBQU07QUFDdEIsWUFBTWlCLFdBQVcsc0JBQWpCOztBQUVBLGNBQUt4QyxlQUFMLEdBQXVCLElBQXZCO0FBQ0EsY0FBS3FDLG1CQUFMLEdBQTJCRyxRQUEzQjs7QUFFQSxlQUFPQSxTQUFTQyxPQUFoQjtBQUNELE9BeEVPO0FBeUVSWCxrQkFBWSxzQkFBTTtBQUNoQiwwQkFBUVksR0FBUixDQUFZLGVBQUtDLElBQWpCLEVBQXVCbkIsSUFBdkIsQ0FBNEIsaUJBRXRCO0FBQUEsY0FESkksTUFDSSxTQURKQSxNQUNJOztBQUNKLGdCQUFLN0IsUUFBTCxHQUFnQjZCLE1BQWhCO0FBQ0EsZ0JBQUtHLE1BQUw7QUFDQSw0QkFBUWEsSUFBUjtBQUNELFNBTkQ7QUFPRDtBQWpGTyxLLFFBb0ZWQyxNLEdBQVMsRTs7Ozs7c0NBL0hTdkIsRyxFQUFLO0FBQ3JCLFVBQUlBLElBQUl3QixJQUFKLEtBQWEsUUFBakIsRUFBMkI7QUFDekI7QUFDQWpDLGdCQUFRQyxHQUFSLENBQVlRLElBQUl5QixNQUFoQjtBQUNEO0FBQ0QsYUFBTztBQUNMQyxlQUFPLElBREY7QUFFTEMsY0FBTSxhQUZEO0FBR0w1QixpQkFBUyxpQkFBU0MsR0FBVCxFQUFjO0FBQ3JCO0FBQ0EseUJBQUs0QixTQUFMLENBQWU7QUFDYkYsbUJBQU8sTUFETTtBQUViRyxzQkFBVTtBQUZHLFdBQWY7QUFJRCxTQVRJO0FBVUxuQixjQUFNLGNBQVNWLEdBQVQsRUFBYztBQUNsQjtBQUNBLHlCQUFLWSxTQUFMLENBQWU7QUFDYkMscUJBQVM7QUFESSxXQUFmO0FBR0Q7QUFmSSxPQUFQO0FBaUJEOzs7NkJBNkdRO0FBQUE7O0FBQ1B0QixjQUFRQyxHQUFSLENBQVksY0FBWjtBQUNBLHdCQUFRc0MsV0FBUixHQUFzQjVCLElBQXRCLENBQTJCLGFBQUs7QUFDOUIsZUFBSzFCLFFBQUwsR0FBZ0IrQixDQUFoQjtBQUNBLGVBQUt4QixPQUFMLENBQWF5QixVQUFiO0FBQ0EsMkJBQVNwQixLQUFUO0FBQ0QsT0FKRDtBQUtEOzs7NkJBRVE7QUFDUEcsY0FBUUMsR0FBUixDQUFZLGNBQVo7QUFDQSx3QkFBUXVDLElBQVI7QUFDRDs7O0VBcEorQixlQUFLQyxJOztrQkFBbEI3RCxJIiwiZmlsZSI6ImhvbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG4gIGltcG9ydCBkZWZlciBmcm9tICcuLi9zZXJ2aWNlcy9kZWZlci5qcyc7XG4gIGltcG9ydCB1dGlsIGZyb20gJy4uL3NlcnZpY2VzL3V0aWwuanMnO1xuICBpbXBvcnQgdXJscyBmcm9tICcuLi9zZXJ2aWNlcy91cmxzLmpzJztcbiAgaW1wb3J0IHJlcXVlc3QgZnJvbSAnLi4vc2VydmljZXMvcmVxdWVzdC5qcyc7XG4gIGltcG9ydCBsb2FkaW5nIGZyb20gJy4uL3NlcnZpY2VzL2xvYWRpbmcuanMnO1xuICBpbXBvcnQgcXVlc3Rpb24gZnJvbSAnLi4vc2VydmljZXMvcXVlc3Rpb24uanMnO1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEhvbWUgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfloZTmi5MnLFxuICAgIH1cblxuICAgIG9uU2hhcmVBcHBNZXNzYWdlKHJlcykge1xuICAgICAgaWYgKHJlcy5mcm9tID09PSAnYnV0dG9uJykge1xuICAgICAgICAvLyDmnaXoh6rpobXpnaLlhoXovazlj5HmjInpkq5cbiAgICAgICAgY29uc29sZS5sb2cocmVzLnRhcmdldCk7XG4gICAgICB9XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0aXRsZTogJ+WhlOaLkycsXG4gICAgICAgIHBhdGg6ICcvcGFnZXMvaG9tZScsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgIC8vIOi9rOWPkeaIkOWKn1xuICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgICAgIHRpdGxlOiAn6L2s5Y+R5oiQ5YqfJyxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBmYWlsOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAvLyDovazlj5HlpLHotKVcbiAgICAgICAgICB3ZXB5LnNob3dBbGVydCh7XG4gICAgICAgICAgICBjb250ZW50OiAn6L2s5Y+R5aSx6LSlJyxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudHMgPSB7XG5cbiAgICB9XG5cbiAgICBkYXRhID0ge1xuICAgICAgdXNlckluZm86IG51bGwsXG4gICAgICBob21lRGF0YTogbnVsbCxcbiAgICAgIHNob3dDb25maXJtTWFzazogZmFsc2UsXG4gICAgfVxuXG4gICAgY29tcHV0ZWQgPSB7XG4gICAgICBiZXN0U2NvcmUoKSB7XG4gICAgICAgIGlmICh0aGlzLmhvbWVEYXRhICYmIHRoaXMuaG9tZURhdGEuYmVzdFNjb3JlKSB7XG4gICAgICAgICAgcmV0dXJuIHV0aWwucmVuZGVyU2NvcmUodGhpcy5ob21lRGF0YS5iZXN0U2NvcmUuc2NvcmUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7fTtcbiAgICAgIH0sXG4gICAgfVxuXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHRvUGljdHVyZXM6ICgpID0+IHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcvcGFnZXMvcGljdHVyZXMnLFxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIHRvUXVlc3Rpb246ICgpID0+IHtcbiAgICAgICAgcXVlc3Rpb24uY2hlY2sodHJ1ZSk7XG4gICAgICB9LFxuICAgICAgdG9DaGFsbGVuZ2U6IChjaGFsbGVuZ2VJZCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygndG8gY2hhbGxlbmdlIHBhZ2UnLCBjaGFsbGVuZ2VJZCk7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiBgL3BhZ2VzL2NoYWxsZW5nZT9pZD0ke2NoYWxsZW5nZUlkfWBcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICB0b1Jhbms6ICgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ3RvIHJhbmsgcGFnZScpO1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy9wYWdlcy9yYW5rJyxcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgdG9NZTogKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygndG8gbWUgcGFnZScpO1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy9wYWdlcy9tZScsXG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIHRvQm9va2luZzogKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygndG8gYm9va2luZycpO1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy9wYWdlcy9ib29raW5nJyxcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgdG9RcmNvZGU6ICgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ3RvIHFyY29kZSBwYWdlJyk7XG4gICAgICAgIHdlcHkuc2NhbkNvZGUoe1xuICAgICAgICAgIG9ubHlGcm9tQ2FtZXJhOiB0cnVlLFxuICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgIHRoaXMubWV0aG9kcy5jb25maXJtQ2hhbGxlbmdlKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgIHJlcXVlc3QucG9zdCh1cmxzLnBvc3RRcmNvZGUsIHtcbiAgICAgICAgICAgICAgICBsb2FkaW5nRGVsYXk6IDAsXG4gICAgICAgICAgICAgICAgcmVzdWx0OiBKU09OLnN0cmluZ2lmeShyZXMpLFxuICAgICAgICAgICAgICB9KS50aGVuKGQgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubWV0aG9kcy50b0NoYWxsZW5nZShkLnJlc3VsdC5jaGFsbGVuZ2VJZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5tZXRob2RzLnVwZGF0ZUhvbWUoKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBmYWlsOiAocmVzKSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzLmVyck1zZyA9PT0gJ3NjYW5Db2RlOmZhaWwnKSB7XG4gICAgICAgICAgICAgIHdlcHkuc2hvd0FsZXJ0KHtcbiAgICAgICAgICAgICAgICBjb250ZW50OiAn5omr5o+P5aSx6LSlJyxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBjb25maXJtT2s6ICgpID0+IHtcbiAgICAgICAgdGhpcy5jb25maXJtTWFza0RlZmVycmVkLnJlc29sdmUoKTtcbiAgICAgICAgdGhpcy5zaG93Q29uZmlybU1hc2sgPSBmYWxzZTtcbiAgICAgIH0sXG4gICAgICBjb25maXJtQ2FuY2VsOiAoKSA9PiB7XG4gICAgICAgIHRoaXMuc2hvd0NvbmZpcm1NYXNrID0gZmFsc2U7XG4gICAgICB9LFxuICAgICAgY29uZmlybUNoYWxsZW5nZTogKCkgPT4ge1xuICAgICAgICBjb25zdCBkZWZlcnJlZCA9IGRlZmVyKCk7XG5cbiAgICAgICAgdGhpcy5zaG93Q29uZmlybU1hc2sgPSB0cnVlO1xuICAgICAgICB0aGlzLmNvbmZpcm1NYXNrRGVmZXJyZWQgPSBkZWZlcnJlZDtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgIH0sXG4gICAgICB1cGRhdGVIb21lOiAoKSA9PiB7XG4gICAgICAgIHJlcXVlc3QuZ2V0KHVybHMuaG9tZSkudGhlbigoe1xuICAgICAgICAgIHJlc3VsdCxcbiAgICAgICAgfSkgPT4ge1xuICAgICAgICAgIHRoaXMuaG9tZURhdGEgPSByZXN1bHQ7XG4gICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgICBsb2FkaW5nLmhpZGUoKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZXZlbnRzID0ge1xuXG4gICAgfVxuXG4gICAgb25TaG93KCkge1xuICAgICAgY29uc29sZS5sb2coJ2hvbWUgb24gc2hvdycpO1xuICAgICAgcmVxdWVzdC5nZXRVc2VySW5mbygpLnRoZW4oZCA9PiB7XG4gICAgICAgIHRoaXMudXNlckluZm8gPSBkO1xuICAgICAgICB0aGlzLm1ldGhvZHMudXBkYXRlSG9tZSgpO1xuICAgICAgICBxdWVzdGlvbi5jaGVjaygpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25Mb2FkKCkge1xuICAgICAgY29uc29sZS5sb2coJ2hvbWUgb24gbG9hZCcpO1xuICAgICAgbG9hZGluZy5zaG93KCk7XG4gICAgfVxuICB9XG5cbiJdfQ==