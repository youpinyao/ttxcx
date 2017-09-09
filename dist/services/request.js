'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('./../npm/babel-runtime/regenerator/index.js');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('./../npm/babel-runtime/helpers/asyncToGenerator.js');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _stringify = require('./../npm/babel-runtime/core-js/json/stringify.js');

var _stringify2 = _interopRequireDefault(_stringify);

var timeoutLogin = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _global2.default.logining = true;

            _context.next = 3;
            return doLogin();

          case 3:

            _util2.default.each(_global2.default.loginCallback, function (d) {
              d();
            });

            delete _global2.default.logining;
            delete _global2.default.loginCallback;

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function timeoutLogin() {
    return _ref2.apply(this, arguments);
  };
}();

// 登录成功后获取用户信息
// 获取用户信息，如果用户未登录会自动触发登录，成功回调返回两个参数：userInfo,userId


var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _urls = require('./urls.js');

var _urls2 = _interopRequireDefault(_urls);

var _defer = require('./defer.js');

var _defer2 = _interopRequireDefault(_defer);

var _is = require('./is.js');

var _is2 = _interopRequireDefault(_is);

var _loading = require('./loading.js');

var _loading2 = _interopRequireDefault(_loading);

var _global = require('./global.js');

var _global2 = _interopRequireDefault(_global);

var _util = require('./util.js');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function post(url, data) {
  return request(url, 'POST', data);
}

function get(url, data) {
  if (!data) {
    data = {};
  }
  data._timestamp = +new Date();

  return request(url, 'GET', data);
}

function request(url, method, data) {
  if (!data) {
    data = {};
  }

  data.userId = _global2.default.userId;

  var hasLoading = false;
  var loadingDelaySt = null;

  var param = {
    url: url,
    data: data,
    method: method
  };

  var deferred = (0, _defer2.default)();
  if (data.loadingDelay === true) {
    data.loadingDelay = 2000;
  }

  if (data.loadingText && _is2.default.empty(data.loadingDelay)) {
    hasLoading = true;
    _loading2.default.show({
      title: data.loadingText || ''
    });
  }

  if (!_is2.default.empty(data.loadingDelay)) {
    loadingDelaySt = setTimeout(function () {
      hasLoading = true;
      _loading2.default.show({
        title: data.loadingText || '努力加载中'
      });
    }, data.loadingDelay);
  }

  param.success = function (d) {
    deferred.resolve(d);

    clearTimeout(loadingDelaySt);

    if (hasLoading) {
      hasLoading = false;
      _loading2.default.hide();
    }
  };
  param.fail = function (d) {
    deferred.reject(d);

    if (d && d.msg && data.failAlert !== false) {
      _wepy2.default.showModal({
        content: d.msg || '似乎出错了，请稍后再试。',
        showCancel: false,
        confirmText: '知道了'

      });
    }

    clearTimeout(loadingDelaySt);

    if (hasLoading) {
      hasLoading = false;
      _loading2.default.hide();
    }
  };
  if (param.url && param.url.indexOf('{userId}') !== -1) {
    getUserInfo.then(function (_ref) {
      var userInfo = _ref.userInfo,
          userId = _ref.userId;

      param.url = param.url.replace(/{userId}/g, _global2.default.userId);
      requestSvr(param);
    });
  } else {
    requestSvr(param);
  }
  return deferred.promise;
}

// 向服务器请求数据，param：{url:请求相对路径,data:请求参数,success:function,fail:function，默认true}
function requestSvr(param) {
  if (_global2.default.logining) {
    _global2.default.loginCallback.push(function () {
      requestSvr(param);
    });
  }

  _wepy2.default.request({
    url: param.url,
    data: param.data,
    method: param.method || 'POST',
    header: {
      // 设置请求的 header
      'X-APP-TOKEN': _global2.default.appToken,
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    success: function success(res) {
      if (!res.data) {
        _wepy2.default.showModal({
          content: '服务端返回无效的数据',
          showCancel: false,
          confirmText: '知道了'

        });
        console.error('服务端返回无效的数据', res);
        return;
      }

      if (typeof res.data === 'string') {
        res.data = JSON.parse(res.data);
      }

      if (res.data.success === true) {
        try {
          typeof param.success === 'function' && param.success(res.data);
        } catch (e) {
          console.error(e);
        }
        try {
          typeof param.complete === 'function' && param.complete();
        } catch (e) {
          console.error(e);
        }
      } else {
        if (res.data.code === 'TIMEOUT') {
          console.error('登录超时，自动重新登录', res);
          _global2.default.loginCallback = [function () {
            requestSvr(param);
          }];

          timeoutLogin();
        } else {
          console.error(res.data.msg || '似乎出错了，请稍后再试。');

          _wepy2.default.showModal({
            content: res.data.msg || '似乎出错了，请稍后再试。',
            showCancel: false,
            confirmText: '知道了'

          });

          try {
            typeof param.fail === 'function' && param.fail(res);
          } catch (e) {
            console.error(e);
          }
          try {
            typeof param.complete === 'function' && param.complete();
          } catch (e) {
            console.error(e);
          }
        }
      }
    },
    fail: function fail(res) {
      console.error(res.data ? '似乎出错了，请稍后再试' : '似乎已断开与互联网的连接');
      _wepy2.default.showModal({
        content: res.data ? '似乎出错了，请稍后再试' : '似乎已断开与互联网的连接',
        showCancel: false,
        confirmText: '知道了'

      });

      try {
        typeof param.fail === 'function' && param.fail();
      } catch (e) {
        console.error(e);
      }
      try {
        typeof param.complete === 'function' && param.complete();
      } catch (e) {
        console.error(e);
      }
    }
  });
}

function doLogin() {
  var deferred = (0, _defer2.default)();

  wxLogin();

  function wxLogin() {
    _wepy2.default.login({
      success: function success(res) {
        if (!res.code) {
          deferred.reject({
            success: false,
            errMsg: '微信登录失败！' + res.errMsg
          });
          return;
        }
        _getUserInfo(res.code);
      },
      fail: function fail(res) {
        _wepy2.default.showModal({
          content: 'wx.login[' + res.errMsg + ']微信登录失败',
          showCancel: false,
          confirmText: '知道了',

          success: function success(res) {
            if (res.confirm) {
              wxLogin();
            }
          }
        });

        deferred.reject({
          success: false,
          errMsg: '微信登录失败'
        });
      }
    });
  }
  // 登录成功后获取用户信息
  function _getUserInfo(code) {
    _wepy2.default.getUserInfo({
      success: function success(res) {
        console.log('获取用户信息成功', code, res);
        _global2.default.userInfo = res.userInfo;
        serverLogin(code, res);
      },
      fail: function fail(res) {
        setTimeout(function () {
          _getUserInfo(code);
        }, 3000);
        console.error('\u83B7\u53D6\u7528\u6237\u4FE1\u606F\u5931\u8D25 ' + res.errMsg);
        // deferred.reject({
        //   success: false,
        //   errMsg: `获取用户信息失败 ${res.errMsg}`
        // })
      }
    });
  }

  // 获取用户信息成功后向服务器请求登录
  function serverLogin(code, res) {
    _wepy2.default.request({
      url: _urls2.default.login,
      data: {
        code: code,
        userInfo: (0, _stringify2.default)(res)
      },
      method: 'POST',
      header: {
        // 设置请求的 header
        'X-APP-TOKEN': _global2.default.appToken,
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: function success(res) {
        if (typeof res.data === 'string') {
          res.data = JSON.parse(res.data);
        }
        // success
        if (res.data && res.data.success === true) {
          console.log('微信登录成功');
          _global2.default.userId = res.data.result.userId;
          _global2.default.appToken = res.data.result.sessionId;

          deferred.resolve({
            success: true,
            userInfo: _global2.default.userInfo,
            userId: _global2.default.userId
          });
        } else {
          _wepy2.default.showModal({
            content: res.data && res.data.msg ? res.data.msg : '微信登录失败',
            showCancel: false,
            confirmText: '知道了'

          });

          console.log('微信登录失败', res.data);
          deferred.reject({
            success: false,
            errCode: res.data.code,
            errMsg: res.data.msg
          });
        }
      },
      fail: function fail(res) {
        _wepy2.default.showModal({
          content: '似乎出错了，请稍后再试。',
          showCancel: false,
          confirmText: '知道了'

        });

        deferred.reject({
          success: false,
          errMsg: res.errMsg
        });
      }
    });
  }

  return deferred.promise;
}

function getUserInfo() {
  var deferred = (0, _defer2.default)();

  if (_global2.default.userInfo && _global2.default.userId) {
    setTimeout(function () {
      deferred.resolve({
        userInfo: _global2.default.userInfo,
        userId: _global2.default.userId
      });
    });
  } else {
    doLogin().then(function (data) {
      if (data.success) {
        deferred.resolve({
          userInfo: data.userInfo,
          userId: data.userId
        });
      } else {
        // TODO 失败现在没有回调
        console.log('微信登录失败', data);
      }
    });
  }

  return deferred.promise;
}

exports.default = {
  post: post,
  get: get,
  login: doLogin,
  getUserInfo: getUserInfo
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlcXVlc3QuanMiXSwibmFtZXMiOlsibG9naW5pbmciLCJkb0xvZ2luIiwiZWFjaCIsImxvZ2luQ2FsbGJhY2siLCJkIiwidGltZW91dExvZ2luIiwicG9zdCIsInVybCIsImRhdGEiLCJyZXF1ZXN0IiwiZ2V0IiwiX3RpbWVzdGFtcCIsIkRhdGUiLCJtZXRob2QiLCJ1c2VySWQiLCJoYXNMb2FkaW5nIiwibG9hZGluZ0RlbGF5U3QiLCJwYXJhbSIsImRlZmVycmVkIiwibG9hZGluZ0RlbGF5IiwibG9hZGluZ1RleHQiLCJlbXB0eSIsInNob3ciLCJ0aXRsZSIsInNldFRpbWVvdXQiLCJzdWNjZXNzIiwicmVzb2x2ZSIsImNsZWFyVGltZW91dCIsImhpZGUiLCJmYWlsIiwicmVqZWN0IiwibXNnIiwiZmFpbEFsZXJ0Iiwic2hvd01vZGFsIiwiY29udGVudCIsInNob3dDYW5jZWwiLCJjb25maXJtVGV4dCIsImluZGV4T2YiLCJnZXRVc2VySW5mbyIsInRoZW4iLCJ1c2VySW5mbyIsInJlcGxhY2UiLCJyZXF1ZXN0U3ZyIiwicHJvbWlzZSIsInB1c2giLCJoZWFkZXIiLCJhcHBUb2tlbiIsInJlcyIsImNvbnNvbGUiLCJlcnJvciIsIkpTT04iLCJwYXJzZSIsImUiLCJjb21wbGV0ZSIsImNvZGUiLCJ3eExvZ2luIiwibG9naW4iLCJlcnJNc2ciLCJfZ2V0VXNlckluZm8iLCJjb25maXJtIiwibG9nIiwic2VydmVyTG9naW4iLCJyZXN1bHQiLCJzZXNzaW9uSWQiLCJlcnJDb2RlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O3VGQW1VQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0UsNkJBQU9BLFFBQVAsR0FBa0IsSUFBbEI7O0FBREY7QUFBQSxtQkFHUUMsU0FIUjs7QUFBQTs7QUFLRSwyQkFBS0MsSUFBTCxDQUFVLGlCQUFPQyxhQUFqQixFQUFnQyxhQUFLO0FBQ25DQztBQUNELGFBRkQ7O0FBSUEsbUJBQU8saUJBQU9KLFFBQWQ7QUFDQSxt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QWE7O0FBSEEsU0FBZjs7QUFPQWxCLGlCQUFTWSxNQUFULENBQWdCO0FBQ2RMLG1CQUFTLEtBREs7QUFFZGdDLGtCQUFRVixJQUFJVTtBQUZFLFNBQWhCO0FBSUQ7QUF2RFUsS0FBYjtBQXlERDs7QUFFRCxTQUFPdkMsU0FBU3lCLE9BQWhCO0FBQ0Q7O0FBaUJELFNBQVNMLFdBQVQsR0FBdUI7QUFDckIsTUFBTXBCLFdBQVcsc0JBQWpCOztBQUVBLE1BQUksaUJBQU9zQixRQUFQLElBQW1CLGlCQUFPMUIsTUFBOUIsRUFBc0M7QUFDcENVLGVBQVcsWUFBTTtBQUNmTixlQUFTUSxPQUFULENBQWlCO0FBQ2ZjLGtCQUFVLGlCQUFPQSxRQURGO0FBRWYxQixnQkFBUSxpQkFBT0E7QUFGQSxPQUFqQjtBQUlELEtBTEQ7QUFNRCxHQVBELE1BT087QUFDTGIsY0FBVXNDLElBQVYsQ0FBZSxnQkFBUTtBQUNyQixVQUFJL0IsS0FBS2lCLE9BQVQsRUFBa0I7QUFDaEJQLGlCQUFTUSxPQUFULENBQWlCO0FBQ2ZjLG9CQUFVaEMsS0FBS2dDLFFBREE7QUFFZjFCLGtCQUFRTixLQUFLTTtBQUZFLFNBQWpCO0FBSUQsT0FMRCxNQUtPO0FBQ0w7QUFDQWtDLGdCQUFRWSxHQUFSLENBQVksUUFBWixFQUFzQnBELElBQXRCO0FBQ0Q7QUFDRixLQVZEO0FBV0Q7O0FBRUQsU0FBT1UsU0FBU3lCLE9BQWhCO0FBQ0Q7O2tCQUVjO0FBQ2JyQyxZQURhO0FBRWJJLFVBRmE7QUFHYjhDLFNBQU92RCxPQUhNO0FBSWJxQztBQUphLEMiLCJmaWxlIjoicmVxdWVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IHVybHMgZnJvbSAnLi91cmxzLmpzJztcbmltcG9ydCBkZWZlciBmcm9tICcuL2RlZmVyLmpzJztcbmltcG9ydCBpcyBmcm9tICcuL2lzLmpzJztcbmltcG9ydCBsb2FkaW5nIGZyb20gJy4vbG9hZGluZy5qcyc7XG5pbXBvcnQgZ2xvYmFsIGZyb20gJy4vZ2xvYmFsLmpzJztcbmltcG9ydCB1dGlsIGZyb20gJy4vdXRpbC5qcyc7XG5cbmZ1bmN0aW9uIHBvc3QodXJsLCBkYXRhKSB7XG4gIHJldHVybiByZXF1ZXN0KHVybCwgJ1BPU1QnLCBkYXRhKTtcbn1cblxuZnVuY3Rpb24gZ2V0KHVybCwgZGF0YSkge1xuICBpZiAoIWRhdGEpIHtcbiAgICBkYXRhID0ge1xuXG4gICAgfVxuICB9XG4gIGRhdGEuX3RpbWVzdGFtcCA9ICtuZXcgRGF0ZSgpO1xuXG4gIHJldHVybiByZXF1ZXN0KHVybCwgJ0dFVCcsIGRhdGEpO1xufVxuXG5mdW5jdGlvbiByZXF1ZXN0KHVybCwgbWV0aG9kLCBkYXRhKSB7XG4gIGlmICghZGF0YSkge1xuICAgIGRhdGEgPSB7fVxuICB9XG5cbiAgZGF0YS51c2VySWQgPSBnbG9iYWwudXNlcklkO1xuXG4gIHZhciBoYXNMb2FkaW5nID0gZmFsc2U7XG4gIHZhciBsb2FkaW5nRGVsYXlTdCA9IG51bGw7XG5cbiAgdmFyIHBhcmFtID0ge1xuICAgIHVybDogdXJsLFxuICAgIGRhdGE6IGRhdGEsXG4gICAgbWV0aG9kLFxuICB9XG5cbiAgdmFyIGRlZmVycmVkID0gZGVmZXIoKTtcbiAgaWYgKGRhdGEubG9hZGluZ0RlbGF5ID09PSB0cnVlKSB7XG4gICAgZGF0YS5sb2FkaW5nRGVsYXkgPSAyMDAwXG4gIH1cblxuICBpZiAoZGF0YS5sb2FkaW5nVGV4dCAmJiBpcy5lbXB0eShkYXRhLmxvYWRpbmdEZWxheSkpIHtcbiAgICBoYXNMb2FkaW5nID0gdHJ1ZTtcbiAgICBsb2FkaW5nLnNob3coe1xuICAgICAgdGl0bGU6IGRhdGEubG9hZGluZ1RleHQgfHwgJydcbiAgICB9KVxuICB9XG5cbiAgaWYgKCFpcy5lbXB0eShkYXRhLmxvYWRpbmdEZWxheSkpIHtcbiAgICBsb2FkaW5nRGVsYXlTdCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICBoYXNMb2FkaW5nID0gdHJ1ZVxuICAgICAgbG9hZGluZy5zaG93KHtcbiAgICAgICAgdGl0bGU6IGRhdGEubG9hZGluZ1RleHQgfHwgJ+WKquWKm+WKoOi9veS4rSdcbiAgICAgIH0pXG4gICAgfSwgZGF0YS5sb2FkaW5nRGVsYXkpXG4gIH1cblxuICBwYXJhbS5zdWNjZXNzID0gZCA9PiB7XG4gICAgZGVmZXJyZWQucmVzb2x2ZShkKVxuXG4gICAgY2xlYXJUaW1lb3V0KGxvYWRpbmdEZWxheVN0KVxuXG4gICAgaWYgKGhhc0xvYWRpbmcpIHtcbiAgICAgIGhhc0xvYWRpbmcgPSBmYWxzZVxuICAgICAgbG9hZGluZy5oaWRlKClcbiAgICB9XG4gIH1cbiAgcGFyYW0uZmFpbCA9IGQgPT4ge1xuICAgIGRlZmVycmVkLnJlamVjdChkKTtcblxuICAgIGlmIChkICYmIGQubXNnICYmIGRhdGEuZmFpbEFsZXJ0ICE9PSBmYWxzZSkge1xuICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICBjb250ZW50OiBkLm1zZyB8fCAn5Ly85LmO5Ye66ZSZ5LqG77yM6K+356iN5ZCO5YaN6K+V44CCJyxcbiAgICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXG4gICAgICAgIGNvbmZpcm1UZXh0OiAn55+l6YGT5LqGJyxcblxuICAgICAgfSlcbiAgICB9XG5cbiAgICBjbGVhclRpbWVvdXQobG9hZGluZ0RlbGF5U3QpXG5cbiAgICBpZiAoaGFzTG9hZGluZykge1xuICAgICAgaGFzTG9hZGluZyA9IGZhbHNlXG4gICAgICBsb2FkaW5nLmhpZGUoKVxuICAgIH1cbiAgfVxuICBpZiAocGFyYW0udXJsICYmIHBhcmFtLnVybC5pbmRleE9mKCd7dXNlcklkfScpICE9PSAtMSkge1xuICAgIGdldFVzZXJJbmZvLnRoZW4oZnVuY3Rpb24oe1xuICAgICAgdXNlckluZm8sXG4gICAgICB1c2VySWQsXG4gICAgfSkge1xuICAgICAgcGFyYW0udXJsID0gcGFyYW0udXJsLnJlcGxhY2UoL3t1c2VySWR9L2csIGdsb2JhbC51c2VySWQpXG4gICAgICByZXF1ZXN0U3ZyKHBhcmFtKTtcbiAgICB9KVxuICB9IGVsc2Uge1xuICAgIHJlcXVlc3RTdnIocGFyYW0pO1xuICB9XG4gIHJldHVybiBkZWZlcnJlZC5wcm9taXNlXG59XG5cbi8vIOWQkeacjeWKoeWZqOivt+axguaVsOaNru+8jHBhcmFt77yae3VybDror7fmsYLnm7jlr7not6/lvoQsZGF0YTror7fmsYLlj4LmlbAsc3VjY2VzczpmdW5jdGlvbixmYWlsOmZ1bmN0aW9u77yM6buY6K6kdHJ1ZX1cbmZ1bmN0aW9uIHJlcXVlc3RTdnIocGFyYW0pIHtcbiAgaWYgKGdsb2JhbC5sb2dpbmluZykge1xuICAgIGdsb2JhbC5sb2dpbkNhbGxiYWNrLnB1c2goZnVuY3Rpb24oKSB7XG4gICAgICByZXF1ZXN0U3ZyKHBhcmFtKTtcbiAgICB9KTtcbiAgfVxuXG4gIHdlcHkucmVxdWVzdCh7XG4gICAgdXJsOiBwYXJhbS51cmwsXG4gICAgZGF0YTogcGFyYW0uZGF0YSxcbiAgICBtZXRob2Q6IHBhcmFtLm1ldGhvZCB8fCAnUE9TVCcsXG4gICAgaGVhZGVyOiB7XG4gICAgICAvLyDorr7nva7or7fmsYLnmoQgaGVhZGVyXG4gICAgICAnWC1BUFAtVE9LRU4nOiBnbG9iYWwuYXBwVG9rZW4sXG4gICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04J1xuICAgIH0sXG4gICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICBpZiAoIXJlcy5kYXRhKSB7XG4gICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICBjb250ZW50OiAn5pyN5Yqh56uv6L+U5Zue5peg5pWI55qE5pWw5o2uJyxcbiAgICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZSxcbiAgICAgICAgICBjb25maXJtVGV4dDogJ+efpemBk+S6hicsXG5cbiAgICAgICAgfSlcbiAgICAgICAgY29uc29sZS5lcnJvcign5pyN5Yqh56uv6L+U5Zue5peg5pWI55qE5pWw5o2uJywgcmVzKVxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgcmVzLmRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJlcy5kYXRhID0gSlNPTi5wYXJzZShyZXMuZGF0YSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzID09PSB0cnVlKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdHlwZW9mIHBhcmFtLnN1Y2Nlc3MgPT09ICdmdW5jdGlvbicgJiYgcGFyYW0uc3VjY2VzcyhyZXMuZGF0YSlcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSlcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgIHR5cGVvZiBwYXJhbS5jb21wbGV0ZSA9PT0gJ2Z1bmN0aW9uJyAmJiBwYXJhbS5jb21wbGV0ZSgpXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGUpXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5jb2RlID09PSAnVElNRU9VVCcpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCfnmbvlvZXotoXml7bvvIzoh6rliqjph43mlrDnmbvlvZUnLCByZXMpO1xuICAgICAgICAgIGdsb2JhbC5sb2dpbkNhbGxiYWNrID0gW2Z1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmVxdWVzdFN2cihwYXJhbSk7XG4gICAgICAgICAgfV07XG5cbiAgICAgICAgICB0aW1lb3V0TG9naW4oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKHJlcy5kYXRhLm1zZyB8fCAn5Ly85LmO5Ye66ZSZ5LqG77yM6K+356iN5ZCO5YaN6K+V44CCJylcblxuICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICAgIGNvbnRlbnQ6IHJlcy5kYXRhLm1zZyB8fCAn5Ly85LmO5Ye66ZSZ5LqG77yM6K+356iN5ZCO5YaN6K+V44CCJyxcbiAgICAgICAgICAgIHNob3dDYW5jZWw6IGZhbHNlLFxuICAgICAgICAgICAgY29uZmlybVRleHQ6ICfnn6XpgZPkuoYnLFxuXG4gICAgICAgICAgfSlcblxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0eXBlb2YgcGFyYW0uZmFpbCA9PT0gJ2Z1bmN0aW9uJyAmJiBwYXJhbS5mYWlsKHJlcylcbiAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpXG4gICAgICAgICAgfVxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0eXBlb2YgcGFyYW0uY29tcGxldGUgPT09ICdmdW5jdGlvbicgJiYgcGFyYW0uY29tcGxldGUoKVxuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGZhaWw6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgY29uc29sZS5lcnJvcihyZXMuZGF0YSA/ICfkvLzkuY7lh7rplJnkuobvvIzor7fnqI3lkI7lho3or5UnIDogJ+S8vOS5juW3suaWreW8gOS4juS6kuiBlOe9keeahOi/nuaOpScpO1xuICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICBjb250ZW50OiByZXMuZGF0YSA/ICfkvLzkuY7lh7rplJnkuobvvIzor7fnqI3lkI7lho3or5UnIDogJ+S8vOS5juW3suaWreW8gOS4juS6kuiBlOe9keeahOi/nuaOpScsXG4gICAgICAgIHNob3dDYW5jZWw6IGZhbHNlLFxuICAgICAgICBjb25maXJtVGV4dDogJ+efpemBk+S6hicsXG5cbiAgICAgIH0pXG5cbiAgICAgIHRyeSB7XG4gICAgICAgIHR5cGVvZiBwYXJhbS5mYWlsID09PSAnZnVuY3Rpb24nICYmIHBhcmFtLmZhaWwoKVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKGUpXG4gICAgICB9XG4gICAgICB0cnkge1xuICAgICAgICB0eXBlb2YgcGFyYW0uY29tcGxldGUgPT09ICdmdW5jdGlvbicgJiYgcGFyYW0uY29tcGxldGUoKVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKGUpXG4gICAgICB9XG4gICAgfVxuICB9KVxufVxuXG5mdW5jdGlvbiBkb0xvZ2luKCkge1xuICBjb25zdCBkZWZlcnJlZCA9IGRlZmVyKCk7XG5cbiAgd3hMb2dpbigpO1xuXG4gIGZ1bmN0aW9uIHd4TG9naW4oKSB7XG4gICAgd2VweS5sb2dpbih7XG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgaWYgKCFyZXMuY29kZSkge1xuICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgICAgIGVyck1zZzogJ+W+ruS/oeeZu+W9leWksei0pe+8gScgKyByZXMuZXJyTXNnXG4gICAgICAgICAgfSlcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgX2dldFVzZXJJbmZvKHJlcy5jb2RlKVxuICAgICAgfSxcbiAgICAgIGZhaWw6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgY29udGVudDogJ3d4LmxvZ2luWycgKyByZXMuZXJyTXNnICsgJ13lvq7kv6HnmbvlvZXlpLHotKUnLFxuICAgICAgICAgIHNob3dDYW5jZWw6IGZhbHNlLFxuICAgICAgICAgIGNvbmZpcm1UZXh0OiAn55+l6YGT5LqGJyxcblxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgIHd4TG9naW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgICBlcnJNc2c6ICflvq7kv6HnmbvlvZXlpLHotKUnXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgLy8g55m75b2V5oiQ5Yqf5ZCO6I635Y+W55So5oi35L+h5oGvXG4gIGZ1bmN0aW9uIF9nZXRVc2VySW5mbyhjb2RlKSB7XG4gICAgd2VweS5nZXRVc2VySW5mbyh7XG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ+iOt+WPlueUqOaIt+S/oeaBr+aIkOWKnycsIGNvZGUsIHJlcyk7XG4gICAgICAgIGdsb2JhbC51c2VySW5mbyA9IHJlcy51c2VySW5mbztcbiAgICAgICAgc2VydmVyTG9naW4oY29kZSwgcmVzKVxuICAgICAgfSxcbiAgICAgIGZhaWw6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBfZ2V0VXNlckluZm8oY29kZSk7XG4gICAgICAgIH0sIDMwMDApO1xuICAgICAgICBjb25zb2xlLmVycm9yKGDojrflj5bnlKjmiLfkv6Hmga/lpLHotKUgJHtyZXMuZXJyTXNnfWApO1xuICAgICAgICAvLyBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAvLyAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAvLyAgIGVyck1zZzogYOiOt+WPlueUqOaIt+S/oeaBr+Wksei0pSAke3Jlcy5lcnJNc2d9YFxuICAgICAgICAvLyB9KVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICAvLyDojrflj5bnlKjmiLfkv6Hmga/miJDlip/lkI7lkJHmnI3liqHlmajor7fmsYLnmbvlvZVcbiAgZnVuY3Rpb24gc2VydmVyTG9naW4oY29kZSwgcmVzKSB7XG4gICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgIHVybDogdXJscy5sb2dpbixcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgY29kZTogY29kZSxcbiAgICAgICAgdXNlckluZm86IEpTT04uc3RyaW5naWZ5KHJlcylcbiAgICAgIH0sXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGhlYWRlcjoge1xuICAgICAgICAvLyDorr7nva7or7fmsYLnmoQgaGVhZGVyXG4gICAgICAgICdYLUFQUC1UT0tFTic6IGdsb2JhbC5hcHBUb2tlbixcbiAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCdcbiAgICAgIH0sXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgaWYgKHR5cGVvZiByZXMuZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICByZXMuZGF0YSA9IEpTT04ucGFyc2UocmVzLmRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHN1Y2Nlc3NcbiAgICAgICAgaWYgKHJlcy5kYXRhICYmIHJlcy5kYXRhLnN1Y2Nlc3MgPT09IHRydWUpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygn5b6u5L+h55m75b2V5oiQ5YqfJylcbiAgICAgICAgICBnbG9iYWwudXNlcklkID0gcmVzLmRhdGEucmVzdWx0LnVzZXJJZDtcbiAgICAgICAgICBnbG9iYWwuYXBwVG9rZW4gPSByZXMuZGF0YS5yZXN1bHQuc2Vzc2lvbklkO1xuXG4gICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSh7XG4gICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICAgICAgdXNlckluZm86IGdsb2JhbC51c2VySW5mbyxcbiAgICAgICAgICAgIHVzZXJJZDogZ2xvYmFsLnVzZXJJZFxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgICAgY29udGVudDogKHJlcy5kYXRhICYmIHJlcy5kYXRhLm1zZykgPyByZXMuZGF0YS5tc2cgOiAn5b6u5L+h55m75b2V5aSx6LSlJyxcbiAgICAgICAgICAgIHNob3dDYW5jZWw6IGZhbHNlLFxuICAgICAgICAgICAgY29uZmlybVRleHQ6ICfnn6XpgZPkuoYnLFxuXG4gICAgICAgICAgfSlcblxuICAgICAgICAgIGNvbnNvbGUubG9nKCflvq7kv6HnmbvlvZXlpLHotKUnLCByZXMuZGF0YSlcbiAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgICAgICBlcnJDb2RlOiByZXMuZGF0YS5jb2RlLFxuICAgICAgICAgICAgZXJyTXNnOiByZXMuZGF0YS5tc2dcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZmFpbDogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICBjb250ZW50OiAn5Ly85LmO5Ye66ZSZ5LqG77yM6K+356iN5ZCO5YaN6K+V44CCJyxcbiAgICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZSxcbiAgICAgICAgICBjb25maXJtVGV4dDogJ+efpemBk+S6hicsXG5cbiAgICAgICAgfSlcblxuICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgIGVyck1zZzogcmVzLmVyck1zZ1xuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gdGltZW91dExvZ2luKCkge1xuICBnbG9iYWwubG9naW5pbmcgPSB0cnVlO1xuXG4gIGF3YWl0IGRvTG9naW4oKTtcblxuICB1dGlsLmVhY2goZ2xvYmFsLmxvZ2luQ2FsbGJhY2ssIGQgPT4ge1xuICAgIGQoKTtcbiAgfSk7XG5cbiAgZGVsZXRlIGdsb2JhbC5sb2dpbmluZztcbiAgZGVsZXRlIGdsb2JhbC5sb2dpbkNhbGxiYWNrO1xufVxuXG4vLyDnmbvlvZXmiJDlip/lkI7ojrflj5bnlKjmiLfkv6Hmga9cbi8vIOiOt+WPlueUqOaIt+S/oeaBr++8jOWmguaenOeUqOaIt+acqueZu+W9leS8muiHquWKqOinpuWPkeeZu+W9le+8jOaIkOWKn+Wbnuiwg+i/lOWbnuS4pOS4quWPguaVsO+8mnVzZXJJbmZvLHVzZXJJZFxuZnVuY3Rpb24gZ2V0VXNlckluZm8oKSB7XG4gIGNvbnN0IGRlZmVycmVkID0gZGVmZXIoKTtcblxuICBpZiAoZ2xvYmFsLnVzZXJJbmZvICYmIGdsb2JhbC51c2VySWQpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGRlZmVycmVkLnJlc29sdmUoe1xuICAgICAgICB1c2VySW5mbzogZ2xvYmFsLnVzZXJJbmZvLFxuICAgICAgICB1c2VySWQ6IGdsb2JhbC51c2VySWQsXG4gICAgICB9KVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGRvTG9naW4oKS50aGVuKGRhdGEgPT4ge1xuICAgICAgaWYgKGRhdGEuc3VjY2Vzcykge1xuICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHtcbiAgICAgICAgICB1c2VySW5mbzogZGF0YS51c2VySW5mbyxcbiAgICAgICAgICB1c2VySWQ6IGRhdGEudXNlcklkLFxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gVE9ETyDlpLHotKXnjrDlnKjmsqHmnInlm57osINcbiAgICAgICAgY29uc29sZS5sb2coJ+W+ruS/oeeZu+W9leWksei0pScsIGRhdGEpXG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBwb3N0LFxuICBnZXQsXG4gIGxvZ2luOiBkb0xvZ2luLFxuICBnZXRVc2VySW5mbyxcbn07XG4iXX0=