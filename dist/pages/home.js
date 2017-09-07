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
            // wepy.showAlert({
            //   content: res.errMsg,
            // });
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUuanMiXSwibmFtZXMiOlsiSG9tZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJjb21wb25lbnRzIiwiZGF0YSIsInVzZXJJbmZvIiwiaG9tZURhdGEiLCJzaG93Q29uZmlybU1hc2siLCJjb21wdXRlZCIsImJlc3RTY29yZSIsInJlbmRlclNjb3JlIiwic2NvcmUiLCJtZXRob2RzIiwidG9DaGFsbGVuZ2UiLCJjaGFsbGVuZ2VJZCIsImNvbnNvbGUiLCJsb2ciLCJuYXZpZ2F0ZVRvIiwidXJsIiwidG9SYW5rIiwidG9NZSIsInRvQm9va2luZyIsInRvUXJjb2RlIiwic2NhbkNvZGUiLCJvbmx5RnJvbUNhbWVyYSIsInN1Y2Nlc3MiLCJyZXMiLCJjb25maXJtQ2hhbGxlbmdlIiwidGhlbiIsInBvc3QiLCJwb3N0UXJjb2RlIiwibG9hZGluZ0RlbGF5IiwicmVzdWx0IiwiZCIsInVwZGF0ZUhvbWUiLCIkYXBwbHkiLCJmYWlsIiwiY29uZmlybU9rIiwiY29uZmlybU1hc2tEZWZlcnJlZCIsInJlc29sdmUiLCJjb25maXJtQ2FuY2VsIiwiZGVmZXJyZWQiLCJwcm9taXNlIiwiZ2V0IiwiaG9tZSIsImhpZGUiLCJldmVudHMiLCJmcm9tIiwidGFyZ2V0IiwidGl0bGUiLCJwYXRoIiwic2hvd1RvYXN0IiwiZHVyYXRpb24iLCJzaG93QWxlcnQiLCJjb250ZW50IiwiZ2V0VXNlckluZm8iLCJjaGVjayIsInNob3ciLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztJQUVxQkEsSTs7Ozs7Ozs7Ozs7Ozs7d01BQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUE0QlRDLFUsR0FBYSxFLFFBSWJDLEksR0FBTztBQUNMQyxnQkFBVSxJQURMO0FBRUxDLGdCQUFVLElBRkw7QUFHTEMs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RDtBQUdMekIsaUJBQVMsaUJBQVNDLEdBQVQsRUFBYztBQUNyQjtBQUNBLHlCQUFLeUIsU0FBTCxDQUFlO0FBQ2JGLG1CQUFPLE1BRE07QUFFYkcsc0JBQVU7QUFGRyxXQUFmO0FBSUQsU0FUSTtBQVVMaEIsY0FBTSxjQUFTVixHQUFULEVBQWM7QUFDbEI7QUFDQSx5QkFBSzJCLFNBQUwsQ0FBZTtBQUNiQyxxQkFBUztBQURJLFdBQWY7QUFHRDtBQWZJLE9BQVA7QUFpQkQ7Ozs2QkFtR1E7QUFBQTs7QUFDUHZDLGNBQVFDLEdBQVIsQ0FBWSxjQUFaO0FBQ0Esd0JBQVF1QyxXQUFSLEdBQXNCM0IsSUFBdEIsQ0FBMkIsYUFBSztBQUM5QixlQUFLdkIsUUFBTCxHQUFnQjRCLENBQWhCO0FBQ0EsZUFBS3JCLE9BQUwsQ0FBYXNCLFVBQWI7QUFDQSwyQkFBU3NCLEtBQVQ7QUFDRCxPQUpEO0FBS0Q7Ozs2QkFFUTtBQUNQekMsY0FBUUMsR0FBUixDQUFZLGNBQVo7QUFDQSx3QkFBUXlDLElBQVI7QUFDRDs7O0VBMUkrQixlQUFLQyxJOztrQkFBbEIxRCxJIiwiZmlsZSI6ImhvbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG4gIGltcG9ydCBkZWZlciBmcm9tICcuLi9zZXJ2aWNlcy9kZWZlci5qcyc7XG4gIGltcG9ydCB1dGlsIGZyb20gJy4uL3NlcnZpY2VzL3V0aWwuanMnO1xuICBpbXBvcnQgdXJscyBmcm9tICcuLi9zZXJ2aWNlcy91cmxzLmpzJztcbiAgaW1wb3J0IHJlcXVlc3QgZnJvbSAnLi4vc2VydmljZXMvcmVxdWVzdC5qcyc7XG4gIGltcG9ydCBsb2FkaW5nIGZyb20gJy4uL3NlcnZpY2VzL2xvYWRpbmcuanMnO1xuICBpbXBvcnQgcXVlc3Rpb24gZnJvbSAnLi4vc2VydmljZXMvcXVlc3Rpb24uanMnO1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEhvbWUgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfloZTmi5MnLFxuICAgIH1cblxuICAgIG9uU2hhcmVBcHBNZXNzYWdlKHJlcykge1xuICAgICAgaWYgKHJlcy5mcm9tID09PSAnYnV0dG9uJykge1xuICAgICAgICAvLyDmnaXoh6rpobXpnaLlhoXovazlj5HmjInpkq5cbiAgICAgICAgY29uc29sZS5sb2cocmVzLnRhcmdldCk7XG4gICAgICB9XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0aXRsZTogJ+WhlOaLkycsXG4gICAgICAgIHBhdGg6ICcvcGFnZXMvaG9tZScsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgIC8vIOi9rOWPkeaIkOWKn1xuICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgICAgIHRpdGxlOiAn6L2s5Y+R5oiQ5YqfJyxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBmYWlsOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAvLyDovazlj5HlpLHotKVcbiAgICAgICAgICB3ZXB5LnNob3dBbGVydCh7XG4gICAgICAgICAgICBjb250ZW50OiAn6L2s5Y+R5aSx6LSlJyxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudHMgPSB7XG5cbiAgICB9XG5cbiAgICBkYXRhID0ge1xuICAgICAgdXNlckluZm86IG51bGwsXG4gICAgICBob21lRGF0YTogbnVsbCxcbiAgICAgIHNob3dDb25maXJtTWFzazogZmFsc2UsXG4gICAgfVxuXG4gICAgY29tcHV0ZWQgPSB7XG4gICAgICBiZXN0U2NvcmUoKSB7XG4gICAgICAgIGlmICh0aGlzLmhvbWVEYXRhICYmIHRoaXMuaG9tZURhdGEuYmVzdFNjb3JlKSB7XG4gICAgICAgICAgcmV0dXJuIHV0aWwucmVuZGVyU2NvcmUodGhpcy5ob21lRGF0YS5iZXN0U2NvcmUuc2NvcmUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7fTtcbiAgICAgIH0sXG4gICAgfVxuXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHRvQ2hhbGxlbmdlOiAoY2hhbGxlbmdlSWQpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ3RvIGNoYWxsZW5nZSBwYWdlJywgY2hhbGxlbmdlSWQpO1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogYC9wYWdlcy9jaGFsbGVuZ2U/aWQ9JHtjaGFsbGVuZ2VJZH1gXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgdG9SYW5rOiAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCd0byByYW5rIHBhZ2UnKTtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcvcGFnZXMvcmFuaycsXG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIHRvTWU6ICgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ3RvIG1lIHBhZ2UnKTtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcvcGFnZXMvbWUnLFxuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICB0b0Jvb2tpbmc6ICgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ3RvIGJvb2tpbmcnKTtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcvcGFnZXMvYm9va2luZycsXG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIHRvUXJjb2RlOiAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCd0byBxcmNvZGUgcGFnZScpO1xuICAgICAgICB3ZXB5LnNjYW5Db2RlKHtcbiAgICAgICAgICBvbmx5RnJvbUNhbWVyYTogdHJ1ZSxcbiAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm1ldGhvZHMuY29uZmlybUNoYWxsZW5nZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICByZXF1ZXN0LnBvc3QodXJscy5wb3N0UXJjb2RlLCB7XG4gICAgICAgICAgICAgICAgbG9hZGluZ0RlbGF5OiAwLFxuICAgICAgICAgICAgICAgIHJlc3VsdDogSlNPTi5zdHJpbmdpZnkocmVzKSxcbiAgICAgICAgICAgICAgfSkudGhlbihkID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1ldGhvZHMudG9DaGFsbGVuZ2UoZC5yZXN1bHQuY2hhbGxlbmdlSWQpO1xuICAgICAgICAgICAgICAgIHRoaXMubWV0aG9kcy51cGRhdGVIb21lKCk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZmFpbDogKHJlcykgPT4ge1xuICAgICAgICAgICAgLy8gd2VweS5zaG93QWxlcnQoe1xuICAgICAgICAgICAgLy8gICBjb250ZW50OiByZXMuZXJyTXNnLFxuICAgICAgICAgICAgLy8gfSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBjb25maXJtT2s6ICgpID0+IHtcbiAgICAgICAgdGhpcy5jb25maXJtTWFza0RlZmVycmVkLnJlc29sdmUoKTtcbiAgICAgICAgdGhpcy5zaG93Q29uZmlybU1hc2sgPSBmYWxzZTtcbiAgICAgIH0sXG4gICAgICBjb25maXJtQ2FuY2VsOiAoKSA9PiB7XG4gICAgICAgIHRoaXMuc2hvd0NvbmZpcm1NYXNrID0gZmFsc2U7XG4gICAgICB9LFxuICAgICAgY29uZmlybUNoYWxsZW5nZTogKCkgPT4ge1xuICAgICAgICBjb25zdCBkZWZlcnJlZCA9IGRlZmVyKCk7XG5cbiAgICAgICAgdGhpcy5zaG93Q29uZmlybU1hc2sgPSB0cnVlO1xuICAgICAgICB0aGlzLmNvbmZpcm1NYXNrRGVmZXJyZWQgPSBkZWZlcnJlZDtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgIH0sXG4gICAgICB1cGRhdGVIb21lOiAoKSA9PiB7XG4gICAgICAgIHJlcXVlc3QuZ2V0KHVybHMuaG9tZSkudGhlbigoe1xuICAgICAgICAgIHJlc3VsdCxcbiAgICAgICAgfSkgPT4ge1xuICAgICAgICAgIHRoaXMuaG9tZURhdGEgPSByZXN1bHQ7XG4gICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgICBsb2FkaW5nLmhpZGUoKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZXZlbnRzID0ge1xuXG4gICAgfVxuXG4gICAgb25TaG93KCkge1xuICAgICAgY29uc29sZS5sb2coJ2hvbWUgb24gc2hvdycpO1xuICAgICAgcmVxdWVzdC5nZXRVc2VySW5mbygpLnRoZW4oZCA9PiB7XG4gICAgICAgIHRoaXMudXNlckluZm8gPSBkO1xuICAgICAgICB0aGlzLm1ldGhvZHMudXBkYXRlSG9tZSgpO1xuICAgICAgICBxdWVzdGlvbi5jaGVjaygpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25Mb2FkKCkge1xuICAgICAgY29uc29sZS5sb2coJ2hvbWUgb24gbG9hZCcpO1xuICAgICAgbG9hZGluZy5zaG93KCk7XG4gICAgfVxuICB9XG5cbiJdfQ==