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

var _checkbox = require('./../components/checkbox.js');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _global = require('./../services/global.js');

var _global2 = _interopRequireDefault(_global);

var _wepyComToast = require('./../npm/wepy-com-toast/toast.js');

var _wepyComToast2 = _interopRequireDefault(_wepyComToast);

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
    }, _this.$props = { "checkbox": { "xmlns:v-bind": "", "v-bind:checked.sync": "protocolIsRead" } }, _this.$events = {}, _this.components = {
      checkbox: _checkbox2.default,
      toast: _wepyComToast2.default
    }, _this.data = {
      userInfo: null,
      homeData: null,
      showConfirmMask: false,
      protocolIsRead: null,
      protocolIsReaded: null
    }, _this.computed = {
      bestScore: function bestScore() {
        if (this.homeData && this.homeData.bestScore) {
          return _util2.default.renderScore(this.homeData.bestScore.score);
        }
        return {};
      }
    }, _this.methods = {
      toProtocol: function toProtocol() {
        _wepy2.default.navigateTo({
          url: '/pages/protocol'
        });
      },
      toggleProtocolCheckbox: function toggleProtocolCheckbox() {
        if (!_this.protocolIsReaded) {
          _this.methods.toProtocol();
          return;
        }
        _this.protocolIsRead = !_this.protocolIsRead;
      },
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
        if (!_this.protocolIsRead) {
          // this.$invoke('toast', 'show', {
          //   title: '请勾选并阅读安全协议书',
          // });
          _wepy2.default.showAlert({
            content: '请勾选并阅读安全协议书'
          });
          return;
        }
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
        // 协议是否已经读过
        if (_global2.default.isOkFromProtocol) {
          delete _global2.default.isOkFromProtocol;
          _this2.protocolIsRead = true;
        }
        _this2.protocolIsReaded = d.protocolIsReaded;
        _this2.methods.updateHome();
        _question2.default.check();
        _this2.$apply();
      });
      // this.methods.confirmChallenge();
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUuanMiXSwibmFtZXMiOlsiSG9tZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsImNoZWNrYm94IiwidG9hc3QiLCJkYXRhIiwidXNlckluZm8iLCJob21lRGF0YSIsInNob3dDb25maXJtTWFzayIsInByb3RvY29sSXNSZWFkIiwicHJvdG9jb2xJc1JlYWRlZCIsImNvbXB1dGVkIiwiYmVzdFNjb3JlIiwicmVuZGVyU2NvcmUiLCJzY29yZSIsIm1ldGhvZHMiLCJ0b1Byb3RvY29sIiwibmF2aWdhdGVUbyIsInVybCIsInRvZ2dsZVByb3RvY29sQ2hlY2tib3giLCJ0b1BpY3R1cmVzIiwidG9RdWVzdGlvbiIsImNoZWNrIiwidG9DaGFsbGVuZ2UiLCJjaGFsbGVuZ2VJZCIsImNvbnNvbGUiLCJsb2ciLCJ0b1JhbmsiLCJ0b01lIiwidG9Cb29raW5nIiwidG9RcmNvZGUiLCJzY2FuQ29kZSIsIm9ubHlGcm9tQ2FtZXJhIiwic3VjY2VzcyIsInJlcyIsImNvbmZpcm1DaGFsbGVuZ2UiLCJ0aGVuIiwicG9zdCIsInBvc3RRcmNvZGUiLCJsb2FkaW5nRGVsYXkiLCJyZXN1bHQiLCJkIiwidXBkYXRlSG9tZSIsIiRhcHBseSIsImZhaWwiLCJlcnJNc2ciLCJzaG93QWxlcnQiLCJjb250ZW50IiwiY29uZmlybU9rIiwiY29uZmlybU1hc2tEZWZlcnJlZCIsInJlc29sdmUiLCJjb25maXJtQ2FuY2VsIiwiZGVmZXJyZWQiLCJwcm9taXNlIiwiZ2V0IiwiaG9tZSIsImhpZGUiLCJldmVudHMiLCJmcm9tIiwidGFyZ2V0IiwidGl0bGUiLCJwYXRoIiwic2hvd1RvYXN0IiwiZHVyYXRpb24iLCJnZXRVc2VySW5mbyIsImlzT2tGcm9tUHJvdG9jb2wiLCJzaG93IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFD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QjtBQUNBLHlCQUFLNEIsU0FBTCxDQUFlO0FBQ2JGLG1CQUFPLE1BRE07QUFFYkcsc0JBQVU7QUFGRyxXQUFmO0FBSUQsU0FUSTtBQVVMbkIsY0FBTSxjQUFTVixHQUFULEVBQWM7QUFDbEI7QUFDQSx5QkFBS1ksU0FBTCxDQUFlO0FBQ2JDLHFCQUFTO0FBREksV0FBZjtBQUdEO0FBZkksT0FBUDtBQWlCRDs7OzZCQTZIUTtBQUFBOztBQUNQdEIsY0FBUUMsR0FBUixDQUFZLGNBQVo7QUFDQSx3QkFBUXNDLFdBQVIsR0FBc0I1QixJQUF0QixDQUEyQixhQUFLO0FBQzlCLGVBQUs5QixRQUFMLEdBQWdCbUMsQ0FBaEI7QUFDQTtBQUNBLFlBQUksaUJBQU93QixnQkFBWCxFQUE2QjtBQUMzQixpQkFBTyxpQkFBT0EsZ0JBQWQ7QUFDQSxpQkFBS3hELGNBQUwsR0FBc0IsSUFBdEI7QUFDRDtBQUNELGVBQUtDLGdCQUFMLEdBQXdCK0IsRUFBRS9CLGdCQUExQjtBQUNBLGVBQUtLLE9BQUwsQ0FBYTJCLFVBQWI7QUFDQSwyQkFBU3BCLEtBQVQ7QUFDQSxlQUFLcUIsTUFBTDtBQUNELE9BWEQ7QUFZQTtBQUNEOzs7NkJBQ1E7QUFDUGxCLGNBQVFDLEdBQVIsQ0FBWSxjQUFaO0FBQ0Esd0JBQVF3QyxJQUFSO0FBQ0Q7OztFQTFLK0IsZUFBS0MsSTs7a0JBQWxCdEUsSSIsImZpbGUiOiJob21lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuICBpbXBvcnQgZGVmZXIgZnJvbSAnLi4vc2VydmljZXMvZGVmZXIuanMnO1xuICBpbXBvcnQgdXRpbCBmcm9tICcuLi9zZXJ2aWNlcy91dGlsLmpzJztcbiAgaW1wb3J0IHVybHMgZnJvbSAnLi4vc2VydmljZXMvdXJscy5qcyc7XG4gIGltcG9ydCByZXF1ZXN0IGZyb20gJy4uL3NlcnZpY2VzL3JlcXVlc3QuanMnO1xuICBpbXBvcnQgbG9hZGluZyBmcm9tICcuLi9zZXJ2aWNlcy9sb2FkaW5nLmpzJztcbiAgaW1wb3J0IHF1ZXN0aW9uIGZyb20gJy4uL3NlcnZpY2VzL3F1ZXN0aW9uLmpzJztcbiAgaW1wb3J0IGNoZWNrYm94IGZyb20gJy4uL2NvbXBvbmVudHMvY2hlY2tib3gnO1xuICBpbXBvcnQgZ2xvYmFsIGZyb20gJy4uL3NlcnZpY2VzL2dsb2JhbC5qcyc7XG4gIGltcG9ydCBUb2FzdCBmcm9tICd3ZXB5LWNvbS10b2FzdCc7XG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEhvbWUgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfloZTmi5MnLFxuICAgIH1cbiAgICBvblNoYXJlQXBwTWVzc2FnZShyZXMpIHtcbiAgICAgIGlmIChyZXMuZnJvbSA9PT0gJ2J1dHRvbicpIHtcbiAgICAgICAgLy8g5p2l6Ieq6aG16Z2i5YaF6L2s5Y+R5oyJ6ZKuXG4gICAgICAgIGNvbnNvbGUubG9nKHJlcy50YXJnZXQpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdGl0bGU6ICfloZTmi5MnLFxuICAgICAgICBwYXRoOiAnL3BhZ2VzL2hvbWUnLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAvLyDovazlj5HmiJDlip9cbiAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgICB0aXRsZTogJ+i9rOWPkeaIkOWKnycsXG4gICAgICAgICAgICBkdXJhdGlvbjogMjAwMCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZmFpbDogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgLy8g6L2s5Y+R5aSx6LSlXG4gICAgICAgICAgd2VweS5zaG93QWxlcnQoe1xuICAgICAgICAgICAgY29udGVudDogJ+i9rOWPkeWksei0pScsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAkcHJvcHMgPSB7XCJjaGVja2JveFwiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6Y2hlY2tlZC5zeW5jXCI6XCJwcm90b2NvbElzUmVhZFwifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICBjaGVja2JveCxcbiAgICAgIHRvYXN0OiBUb2FzdFxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgdXNlckluZm86IG51bGwsXG4gICAgICBob21lRGF0YTogbnVsbCxcbiAgICAgIHNob3dDb25maXJtTWFzazogZmFsc2UsXG4gICAgICBwcm90b2NvbElzUmVhZDogbnVsbCxcbiAgICAgIHByb3RvY29sSXNSZWFkZWQ6IG51bGwsXG4gICAgfVxuICAgIGNvbXB1dGVkID0ge1xuICAgICAgYmVzdFNjb3JlKCkge1xuICAgICAgICBpZiAodGhpcy5ob21lRGF0YSAmJiB0aGlzLmhvbWVEYXRhLmJlc3RTY29yZSkge1xuICAgICAgICAgIHJldHVybiB1dGlsLnJlbmRlclNjb3JlKHRoaXMuaG9tZURhdGEuYmVzdFNjb3JlLnNjb3JlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge307XG4gICAgICB9LFxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgdG9Qcm90b2NvbDogKCkgPT4ge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy9wYWdlcy9wcm90b2NvbCcsXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgdG9nZ2xlUHJvdG9jb2xDaGVja2JveDogKCkgPT4ge1xuICAgICAgICBpZiAoIXRoaXMucHJvdG9jb2xJc1JlYWRlZCkge1xuICAgICAgICAgIHRoaXMubWV0aG9kcy50b1Byb3RvY29sKCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJvdG9jb2xJc1JlYWQgPSAhdGhpcy5wcm90b2NvbElzUmVhZDtcbiAgICAgIH0sXG4gICAgICB0b1BpY3R1cmVzOiAoKSA9PiB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnL3BhZ2VzL3BpY3R1cmVzJyxcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICB0b1F1ZXN0aW9uOiAoKSA9PiB7XG4gICAgICAgIHF1ZXN0aW9uLmNoZWNrKHRydWUpO1xuICAgICAgfSxcbiAgICAgIHRvQ2hhbGxlbmdlOiAoY2hhbGxlbmdlSWQpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ3RvIGNoYWxsZW5nZSBwYWdlJywgY2hhbGxlbmdlSWQpO1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogYC9wYWdlcy9jaGFsbGVuZ2U/aWQ9JHtjaGFsbGVuZ2VJZH1gXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgdG9SYW5rOiAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCd0byByYW5rIHBhZ2UnKTtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcvcGFnZXMvcmFuaycsXG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIHRvTWU6ICgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ3RvIG1lIHBhZ2UnKTtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcvcGFnZXMvbWUnLFxuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICB0b0Jvb2tpbmc6ICgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ3RvIGJvb2tpbmcnKTtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcvcGFnZXMvYm9va2luZycsXG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIHRvUXJjb2RlOiAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCd0byBxcmNvZGUgcGFnZScpO1xuICAgICAgICB3ZXB5LnNjYW5Db2RlKHtcbiAgICAgICAgICBvbmx5RnJvbUNhbWVyYTogdHJ1ZSxcbiAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm1ldGhvZHMuY29uZmlybUNoYWxsZW5nZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICByZXF1ZXN0LnBvc3QodXJscy5wb3N0UXJjb2RlLCB7XG4gICAgICAgICAgICAgICAgbG9hZGluZ0RlbGF5OiAwLFxuICAgICAgICAgICAgICAgIHJlc3VsdDogSlNPTi5zdHJpbmdpZnkocmVzKSxcbiAgICAgICAgICAgICAgfSkudGhlbihkID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1ldGhvZHMudG9DaGFsbGVuZ2UoZC5yZXN1bHQuY2hhbGxlbmdlSWQpO1xuICAgICAgICAgICAgICAgIHRoaXMubWV0aG9kcy51cGRhdGVIb21lKCk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZmFpbDogKHJlcykgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcy5lcnJNc2cgPT09ICdzY2FuQ29kZTpmYWlsJykge1xuICAgICAgICAgICAgICB3ZXB5LnNob3dBbGVydCh7XG4gICAgICAgICAgICAgICAgY29udGVudDogJ+aJq+aPj+Wksei0pScsXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgY29uZmlybU9rOiAoKSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5wcm90b2NvbElzUmVhZCkge1xuICAgICAgICAgIC8vIHRoaXMuJGludm9rZSgndG9hc3QnLCAnc2hvdycsIHtcbiAgICAgICAgICAvLyAgIHRpdGxlOiAn6K+35Yu+6YCJ5bm26ZiF6K+75a6J5YWo5Y2P6K6u5LmmJyxcbiAgICAgICAgICAvLyB9KTtcbiAgICAgICAgICB3ZXB5LnNob3dBbGVydCh7XG4gICAgICAgICAgICBjb250ZW50OiAn6K+35Yu+6YCJ5bm26ZiF6K+75a6J5YWo5Y2P6K6u5LmmJyxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb25maXJtTWFza0RlZmVycmVkLnJlc29sdmUoKTtcbiAgICAgICAgdGhpcy5zaG93Q29uZmlybU1hc2sgPSBmYWxzZTtcbiAgICAgIH0sXG4gICAgICBjb25maXJtQ2FuY2VsOiAoKSA9PiB7XG4gICAgICAgIHRoaXMuc2hvd0NvbmZpcm1NYXNrID0gZmFsc2U7XG4gICAgICB9LFxuICAgICAgY29uZmlybUNoYWxsZW5nZTogKCkgPT4ge1xuICAgICAgICBjb25zdCBkZWZlcnJlZCA9IGRlZmVyKCk7XG4gICAgICAgIHRoaXMuc2hvd0NvbmZpcm1NYXNrID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jb25maXJtTWFza0RlZmVycmVkID0gZGVmZXJyZWQ7XG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgfSxcbiAgICAgIHVwZGF0ZUhvbWU6ICgpID0+IHtcbiAgICAgICAgcmVxdWVzdC5nZXQodXJscy5ob21lKS50aGVuKCh7XG4gICAgICAgICAgcmVzdWx0LFxuICAgICAgICB9KSA9PiB7XG4gICAgICAgICAgdGhpcy5ob21lRGF0YSA9IHJlc3VsdDtcbiAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICAgIGxvYWRpbmcuaGlkZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgZXZlbnRzID0ge31cbiAgICBvblNob3coKSB7XG4gICAgICBjb25zb2xlLmxvZygnaG9tZSBvbiBzaG93Jyk7XG4gICAgICByZXF1ZXN0LmdldFVzZXJJbmZvKCkudGhlbihkID0+IHtcbiAgICAgICAgdGhpcy51c2VySW5mbyA9IGQ7XG4gICAgICAgIC8vIOWNj+iuruaYr+WQpuW3sue7j+ivu+i/h1xuICAgICAgICBpZiAoZ2xvYmFsLmlzT2tGcm9tUHJvdG9jb2wpIHtcbiAgICAgICAgICBkZWxldGUgZ2xvYmFsLmlzT2tGcm9tUHJvdG9jb2w7XG4gICAgICAgICAgdGhpcy5wcm90b2NvbElzUmVhZCA9IHRydWVcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnByb3RvY29sSXNSZWFkZWQgPSBkLnByb3RvY29sSXNSZWFkZWQ7XG4gICAgICAgIHRoaXMubWV0aG9kcy51cGRhdGVIb21lKCk7XG4gICAgICAgIHF1ZXN0aW9uLmNoZWNrKCk7XG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICB9KTtcbiAgICAgIC8vIHRoaXMubWV0aG9kcy5jb25maXJtQ2hhbGxlbmdlKCk7XG4gICAgfVxuICAgIG9uTG9hZCgpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdob21lIG9uIGxvYWQnKTtcbiAgICAgIGxvYWRpbmcuc2hvdygpO1xuICAgIH1cbiAgfVxuIl19