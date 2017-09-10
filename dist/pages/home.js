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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUuanMiXSwibmFtZXMiOlsiSG9tZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJjb21wb25lbnRzIiwiZGF0YSIsInVzZXJJbmZvIiwiaG9tZURhdGEiLCJzaG93Q29uZmlybU1hc2siLCJjb21wdXRlZCIsImJlc3RTY29yZSIsInJlbmRlclNjb3JlIiwic2NvcmUiLCJtZXRob2RzIiwidG9RdWVzdGlvbiIsImNoZWNrIiwidG9DaGFsbGVuZ2UiLCJjaGFsbGVuZ2VJZCIsImNvbnNvbGUiLCJsb2ciLCJuYXZpZ2F0ZVRvIiwidXJsIiwidG9SYW5rIiwidG9NZSIsInRvQm9va2luZyIsInRvUXJjb2RlIiwic2NhbkNvZGUiLCJvbmx5RnJvbUNhbWVyYSIsInN1Y2Nlc3MiLCJyZXMiLCJjb25maXJtQ2hhbGxlbmdlIiwidGhlbiIsInBvc3QiLCJwb3N0UXJjb2RlIiwibG9hZGluZ0RlbGF5IiwicmVzdWx0IiwiZCIsInVwZGF0ZUhvbWUiLCIkYXBwbHkiLCJmYWlsIiwiZXJyTXNnIiwic2hvd0FsZXJ0IiwiY29udGVudCIsImNvbmZpcm1PayIsImNvbmZpcm1NYXNrRGVmZXJyZWQiLCJyZXNvbHZlIiwiY29uZmlybUNhbmNlbCIsImRlZmVycmVkIiwicHJvbWlzZSIsImdldCIsImhvbWUiLCJoaWRlIiwiZXZlbnRzIiwiZnJvbSIsInRhcmdldCIsInRpdGxlIiwicGF0aCIsInNob3dUb2FzdCIsImR1cmF0aW9uIiwiZ2V0VXNlckluZm8iLCJzaG93IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7SUFFcUJBLEk7Ozs7Ozs7Ozs7Ozs7O3dNQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBNEJUQyxVLEdBQWEsRSxRQUliQyxJLEdBQU87QUFDTEMsZ0JBQVUsSUFETDtB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R0FBUyxFOzs7OztzQ0ExSFN2QixHLEVBQUs7QUFDckIsVUFBSUEsSUFBSXdCLElBQUosS0FBYSxRQUFqQixFQUEyQjtBQUN6QjtBQUNBbkMsZ0JBQVFDLEdBQVIsQ0FBWVUsSUFBSXlCLE1BQWhCO0FBQ0Q7QUFDRCxhQUFPO0FBQ0xDLGVBQU8sSUFERjtBQUVMQyxjQUFNLGFBRkQ7QUFHTDVCLGlCQUFTLGlCQUFTQyxHQUFULEVBQWM7QUFDckI7QUFDQSx5QkFBSzRCLFNBQUwsQ0FBZTtBQUNiRixtQkFBTyxNQURNO0FBRWJHLHNCQUFVO0FBRkcsV0FBZjtBQUlELFNBVEk7QUFVTG5CLGNBQU0sY0FBU1YsR0FBVCxFQUFjO0FBQ2xCO0FBQ0EseUJBQUtZLFNBQUwsQ0FBZTtBQUNiQyxxQkFBUztBQURJLFdBQWY7QUFHRDtBQWZJLE9BQVA7QUFpQkQ7Ozs2QkF3R1E7QUFBQTs7QUFDUHhCLGNBQVFDLEdBQVIsQ0FBWSxjQUFaO0FBQ0Esd0JBQVF3QyxXQUFSLEdBQXNCNUIsSUFBdEIsQ0FBMkIsYUFBSztBQUM5QixlQUFLekIsUUFBTCxHQUFnQjhCLENBQWhCO0FBQ0EsZUFBS3ZCLE9BQUwsQ0FBYXdCLFVBQWI7QUFDQSwyQkFBU3RCLEtBQVQ7QUFDRCxPQUpEO0FBS0Q7Ozs2QkFFUTtBQUNQRyxjQUFRQyxHQUFSLENBQVksY0FBWjtBQUNBLHdCQUFReUMsSUFBUjtBQUNEOzs7RUEvSStCLGVBQUtDLEk7O2tCQUFsQjVELEkiLCJmaWxlIjoiaG9tZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbiAgaW1wb3J0IGRlZmVyIGZyb20gJy4uL3NlcnZpY2VzL2RlZmVyLmpzJztcbiAgaW1wb3J0IHV0aWwgZnJvbSAnLi4vc2VydmljZXMvdXRpbC5qcyc7XG4gIGltcG9ydCB1cmxzIGZyb20gJy4uL3NlcnZpY2VzL3VybHMuanMnO1xuICBpbXBvcnQgcmVxdWVzdCBmcm9tICcuLi9zZXJ2aWNlcy9yZXF1ZXN0LmpzJztcbiAgaW1wb3J0IGxvYWRpbmcgZnJvbSAnLi4vc2VydmljZXMvbG9hZGluZy5qcyc7XG4gIGltcG9ydCBxdWVzdGlvbiBmcm9tICcuLi9zZXJ2aWNlcy9xdWVzdGlvbi5qcyc7XG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgSG9tZSBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WhlOaLkycsXG4gICAgfVxuXG4gICAgb25TaGFyZUFwcE1lc3NhZ2UocmVzKSB7XG4gICAgICBpZiAocmVzLmZyb20gPT09ICdidXR0b24nKSB7XG4gICAgICAgIC8vIOadpeiHqumhtemdouWGhei9rOWPkeaMiemSrlxuICAgICAgICBjb25zb2xlLmxvZyhyZXMudGFyZ2V0KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRpdGxlOiAn5aGU5ouTJyxcbiAgICAgICAgcGF0aDogJy9wYWdlcy9ob21lJyxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgLy8g6L2s5Y+R5oiQ5YqfXG4gICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6ICfovazlj5HmiJDlip8nLFxuICAgICAgICAgICAgZHVyYXRpb246IDIwMDAsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGZhaWw6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgIC8vIOi9rOWPkeWksei0pVxuICAgICAgICAgIHdlcHkuc2hvd0FsZXJ0KHtcbiAgICAgICAgICAgIGNvbnRlbnQ6ICfovazlj5HlpLHotKUnLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50cyA9IHtcblxuICAgIH1cblxuICAgIGRhdGEgPSB7XG4gICAgICB1c2VySW5mbzogbnVsbCxcbiAgICAgIGhvbWVEYXRhOiBudWxsLFxuICAgICAgc2hvd0NvbmZpcm1NYXNrOiBmYWxzZSxcbiAgICB9XG5cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIGJlc3RTY29yZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaG9tZURhdGEgJiYgdGhpcy5ob21lRGF0YS5iZXN0U2NvcmUpIHtcbiAgICAgICAgICByZXR1cm4gdXRpbC5yZW5kZXJTY29yZSh0aGlzLmhvbWVEYXRhLmJlc3RTY29yZS5zY29yZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgfSxcbiAgICB9XG5cbiAgICBtZXRob2RzID0ge1xuICAgICAgdG9RdWVzdGlvbjogKCkgPT4ge1xuICAgICAgICBxdWVzdGlvbi5jaGVjayh0cnVlKTtcbiAgICAgIH0sXG4gICAgICB0b0NoYWxsZW5nZTogKGNoYWxsZW5nZUlkKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCd0byBjaGFsbGVuZ2UgcGFnZScsIGNoYWxsZW5nZUlkKTtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6IGAvcGFnZXMvY2hhbGxlbmdlP2lkPSR7Y2hhbGxlbmdlSWR9YFxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIHRvUmFuazogKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygndG8gcmFuayBwYWdlJyk7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnL3BhZ2VzL3JhbmsnLFxuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICB0b01lOiAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCd0byBtZSBwYWdlJyk7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnL3BhZ2VzL21lJyxcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgdG9Cb29raW5nOiAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCd0byBib29raW5nJyk7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnL3BhZ2VzL2Jvb2tpbmcnLFxuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICB0b1FyY29kZTogKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygndG8gcXJjb2RlIHBhZ2UnKTtcbiAgICAgICAgd2VweS5zY2FuQ29kZSh7XG4gICAgICAgICAgb25seUZyb21DYW1lcmE6IHRydWUsXG4gICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgdGhpcy5tZXRob2RzLmNvbmZpcm1DaGFsbGVuZ2UoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgcmVxdWVzdC5wb3N0KHVybHMucG9zdFFyY29kZSwge1xuICAgICAgICAgICAgICAgIGxvYWRpbmdEZWxheTogMCxcbiAgICAgICAgICAgICAgICByZXN1bHQ6IEpTT04uc3RyaW5naWZ5KHJlcyksXG4gICAgICAgICAgICAgIH0pLnRoZW4oZCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5tZXRob2RzLnRvQ2hhbGxlbmdlKGQucmVzdWx0LmNoYWxsZW5nZUlkKTtcbiAgICAgICAgICAgICAgICB0aGlzLm1ldGhvZHMudXBkYXRlSG9tZSgpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhaWw6IChyZXMpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXMuZXJyTXNnID09PSAnc2NhbkNvZGU6ZmFpbCcpIHtcbiAgICAgICAgICAgICAgd2VweS5zaG93QWxlcnQoe1xuICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICfmiavmj4/lpLHotKUnLFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGNvbmZpcm1PazogKCkgPT4ge1xuICAgICAgICB0aGlzLmNvbmZpcm1NYXNrRGVmZXJyZWQucmVzb2x2ZSgpO1xuICAgICAgICB0aGlzLnNob3dDb25maXJtTWFzayA9IGZhbHNlO1xuICAgICAgfSxcbiAgICAgIGNvbmZpcm1DYW5jZWw6ICgpID0+IHtcbiAgICAgICAgdGhpcy5zaG93Q29uZmlybU1hc2sgPSBmYWxzZTtcbiAgICAgIH0sXG4gICAgICBjb25maXJtQ2hhbGxlbmdlOiAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGRlZmVycmVkID0gZGVmZXIoKTtcblxuICAgICAgICB0aGlzLnNob3dDb25maXJtTWFzayA9IHRydWU7XG4gICAgICAgIHRoaXMuY29uZmlybU1hc2tEZWZlcnJlZCA9IGRlZmVycmVkO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgfSxcbiAgICAgIHVwZGF0ZUhvbWU6ICgpID0+IHtcbiAgICAgICAgcmVxdWVzdC5nZXQodXJscy5ob21lKS50aGVuKCh7XG4gICAgICAgICAgcmVzdWx0LFxuICAgICAgICB9KSA9PiB7XG4gICAgICAgICAgdGhpcy5ob21lRGF0YSA9IHJlc3VsdDtcbiAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICAgIGxvYWRpbmcuaGlkZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBldmVudHMgPSB7XG5cbiAgICB9XG5cbiAgICBvblNob3coKSB7XG4gICAgICBjb25zb2xlLmxvZygnaG9tZSBvbiBzaG93Jyk7XG4gICAgICByZXF1ZXN0LmdldFVzZXJJbmZvKCkudGhlbihkID0+IHtcbiAgICAgICAgdGhpcy51c2VySW5mbyA9IGQ7XG4gICAgICAgIHRoaXMubWV0aG9kcy51cGRhdGVIb21lKCk7XG4gICAgICAgIHF1ZXN0aW9uLmNoZWNrKCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICBjb25zb2xlLmxvZygnaG9tZSBvbiBsb2FkJyk7XG4gICAgICBsb2FkaW5nLnNob3coKTtcbiAgICB9XG4gIH1cblxuIl19