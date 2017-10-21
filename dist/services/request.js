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
      'Accept': 'application/json',
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
        'Accept': 'application/json',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlcXVlc3QuanMiXSwibmFtZXMiOlsibG9naW5pbmciLCJkb0xvZ2luIiwiZWFjaCIsImxvZ2luQ2FsbGJhY2siLCJkIiwidGltZW91dExvZ2luIiwicG9zdCIsInVybCIsImRhdGEiLCJyZXF1ZXN0IiwiZ2V0IiwiX3RpbWVzdGFtcCIsIkRhdGUiLCJtZXRob2QiLCJ1c2VySWQiLCJoYXNMb2FkaW5nIiwibG9hZGluZ0RlbGF5U3QiLCJwYXJhbSIsImRlZmVycmVkIiwibG9hZGluZ0RlbGF5IiwibG9hZGluZ1RleHQiLCJlbXB0eSIsInNob3ciLCJ0aXRsZSIsInNldFRpbWVvdXQiLCJzdWNjZXNzIiwicmVzb2x2ZSIsImNsZWFyVGltZW91dCIsImhpZGUiLCJmYWlsIiwicmVqZWN0IiwibXNnIiwiZmFpbEFsZXJ0Iiwic2hvd01vZGFsIiwiY29udGVudCIsInNob3dDYW5jZWwiLCJjb25maXJtVGV4dCIsImluZGV4T2YiLCJnZXRVc2VySW5mbyIsInRoZW4iLCJ1c2VySW5mbyIsInJlcGxhY2UiLCJyZXF1ZXN0U3ZyIiwicHJvbWlzZSIsInB1c2giLCJoZWFkZXIiLCJhcHBUb2tlbiIsInJlcyIsImNvbnNvbGUiLCJlcnJvciIsIkpTT04iLCJwYXJzZSIsImUiLCJjb21wbGV0ZSIsImNvZGUiLCJ3eExvZ2luIiwibG9naW4iLCJlcnJNc2ciLCJfZ2V0VXNlckluZm8iLCJjb25maXJtIiwibG9nIiwic2VydmVyTG9naW4iLCJyZXN1bHQiLCJzZXNzaW9uSWQiLCJlcnJDb2RlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O3VGQXFVQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0UsNkJBQU9BLFFBQVAsR0FBa0IsSUFBbEI7O0FBREY7QUFBQSxtQkFHUUMsU0FIUjs7QUFBQTs7QUFLRSwyQkFBS0MsSUFBTCxDQUFVLGlCQUFPQyxhQUFqQixFQUFnQyxhQUFLO0FBQ25DQztBQUNELGFBRkQ7O0FBSUEsbUJBQU8saUJBQU9KLFFBQWQ7QUFDQSxtQkFBTyxpQkFBT0csYUFBZDs7QUFWRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHOztrQkFBZUUsWTs7Ozs7QUFhZjtBQUNBOzs7QUFuVkE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLFNBQVNDLElBQVQsQ0FBY0MsR0FBZCxFQUFtQkMsSUFBbkIsRUFBeUI7QUFDdkIsU0FBT0MsUUFBUUYsR0FBUixFQUFhLE1BQWIsRUFBcUJDLElBQXJCLENBQVA7QUFDRDs7QUFFRCxTQUFTRSxHQUFULENBQWFILEdBQWIsRUFBa0JDLElBQWxCLEVBQXdCO0FBQ3RCLE1BQUksQ0FBQ0EsSUFBTCxFQUFXO0FBQ1RBLFdBQU8sRUFBUDtBQUdEO0FBQ0RBLE9BQUtHLFVBQUwsR0FBa0IsQ0FBQyxJQUFJQyxJQUFKLEVBQW5COztBQUVBLFNBQU9ILFFBQVFGLEdBQVIsRUFBYSxLQUFiLEVBQW9CQyxJQUFwQixDQUFQO0FBQ0Q7O0FBRUQsU0FBU0MsT0FBVCxDQUFpQkYsR0FBakIsRUFBc0JNLE1BQXRCLEVBQThCTCxJQUE5QixFQUFvQztBQUNsQyxNQUFJLENBQUNBLElBQUwsRUFBVztBQUNUQSxXQUFPLEVBQVA7QUFDRDs7QUFFREEsT0FBS00sTUFBTCxHQUFjLGlCQUFPQSxNQUFyQjs7QUFFQSxNQUFJQyxhQUFhLEtBQWpCO0FBQ0EsTUFBSUMsaUJBQWlCLElBQXJCOztBQUVBLE1BQUlDLFFBQVE7QUFDVlYsU0FBS0EsR0FESztBQUVWQyxVQUFNQSxJQUZJO0FBR1ZLO0FBSFUsR0FBWjs7QUFNQSxNQUFJSyxXQUFXLHNCQUFmO0FBQ0EsTUFBSVYsS0FBS1csWUFBTCxLQUFzQixJQUExQixFQUFnQztBQUM5QlgsU0FBS1csWUFBTCxHQUFvQixJQUFwQjtBQUNEOztBQUVELE1BQUlYLEtBQUtZLFdBQUwsSUFBb0IsYUFBR0MsS0FBSCxDQUFTYixLQUFLVyxZQUFkLENBQXhCLEVBQXFEO0FBQ25ESixpQkFBYSxJQUFiO0FBQ0Esc0JBQVFPLElBQVIsQ0FBYTtBQUNYQyxhQUFPZixLQUFLWSxXQUFMLElBQW9CO0FBRGhCLEtBQWI7QUFHRDs7QUFFRCxNQUFJLENBQUMsYUFBR0MsS0FBSCxDQUFTYixLQUFLVyxZQUFkLENBQUwsRUFBa0M7QUFDaENILHFCQUFpQlEsV0FBVyxZQUFXO0FBQ3JDVCxtQkFBYSxJQUFiO0FBQ0Esd0JBQVFPLElBQVIsQ0FBYTtBQUNYQyxlQUFPZixLQUFLWSxXQUFMLElBQW9CO0FBRGhCLE9BQWI7QUFHRCxLQUxnQixFQUtkWixLQUFLVyxZQUxTLENBQWpCO0FBTUQ7O0FBRURGLFFBQU1RLE9BQU4sR0FBZ0IsYUFBSztBQUNuQlAsYUFBU1EsT0FBVCxDQUFpQnRCLENBQWpCOztBQUVBdUIsaUJBQWFYLGNBQWI7O0FBRUEsUUFBSUQsVUFBSixFQUFnQjtBQUNkQSxtQkFBYSxLQUFiO0FBQ0Esd0JBQVFhLElBQVI7QUFDRDtBQUNGLEdBVEQ7QUFVQVgsUUFBTVksSUFBTixHQUFhLGFBQUs7QUFDaEJYLGFBQVNZLE1BQVQsQ0FBZ0IxQixDQUFoQjs7QUFFQSxRQUFJQSxLQUFLQSxFQUFFMkIsR0FBUCxJQUFjdkIsS0FBS3dCLFNBQUwsS0FBbUIsS0FBckMsRUFBNEM7QUFDMUMscUJBQUtDLFNBQUwsQ0FBZTtBQUNiQyxpQkFBUzlCLEVBQUUyQixHQUFGLElBQVMsY0FETDtBQUViSSxvQkFBWSxLQUZDO0FBR2JDLHFCQUFhOztBQUhBLE9BQWY7QUFNRDs7QUFFRFQsaUJBQWFYLGNBQWI7O0FBRUEsUUFBSUQsVUFBSixFQUFnQjtBQUNkQSxtQkFBYSxLQUFiO0FBQ0Esd0JBQVFhLElBQVI7QUFDRDtBQUNGLEdBbEJEO0FBbUJBLE1BQUlYLE1BQU1WLEdBQU4sSUFBYVUsTUFBTVYsR0FBTixDQUFVOEIsT0FBVixDQUFrQixVQUFsQixNQUFrQyxDQUFDLENBQXBELEVBQXVEO0FBQ3JEQyxnQkFBWUMsSUFBWixDQUFpQixnQkFHZDtBQUFBLFVBRkRDLFFBRUMsUUFGREEsUUFFQztBQUFBLFVBREQxQixNQUNDLFFBRERBLE1BQ0M7O0FBQ0RHLFlBQU1WLEdBQU4sR0FBWVUsTUFBTVYsR0FBTixDQUFVa0MsT0FBVixDQUFrQixXQUFsQixFQUErQixpQkFBTzNCLE1BQXRDLENBQVo7QUFDQTRCLGlCQUFXekIsS0FBWDtBQUNELEtBTkQ7QUFPRCxHQVJELE1BUU87QUFDTHlCLGVBQVd6QixLQUFYO0FBQ0Q7QUFDRCxTQUFPQyxTQUFTeUIsT0FBaEI7QUFDRDs7QUFFRDtBQUNBLFNBQVNELFVBQVQsQ0FBb0J6QixLQUFwQixFQUEyQjtBQUN6QixNQUFJLGlCQUFPakIsUUFBWCxFQUFxQjtBQUNuQixxQkFBT0csYUFBUCxDQUFxQnlDLElBQXJCLENBQTBCLFlBQVc7QUFDbkNGLGlCQUFXekIsS0FBWDtBQUNELEtBRkQ7QUFHRDs7QUFFRCxpQkFBS1IsT0FBTCxDQUFhO0FBQ1hGLFNBQUtVLE1BQU1WLEdBREE7QUFFWEMsVUFBTVMsTUFBTVQsSUFGRDtBQUdYSyxZQUFRSSxNQUFNSixNQUFOLElBQWdCLE1BSGI7QUFJWGdDLFlBQVE7QUFDTjtBQUNBLHFCQUFlLGlCQUFPQyxRQUZoQjtBQUdOLGdCQUFVLGtCQUhKO0FBSU4sc0JBQWdCO0FBSlYsS0FKRztBQVVYckIsYUFBUyxpQkFBU3NCLEdBQVQsRUFBYztBQUNyQixVQUFJLENBQUNBLElBQUl2QyxJQUFULEVBQWU7QUFDYix1QkFBS3lCLFNBQUwsQ0FBZTtBQUNiQyxtQkFBUyxZQURJO0FBRWJDLHNCQUFZLEtBRkM7QUFHYkMsdUJBQWE7O0FBSEEsU0FBZjtBQU1BWSxnQkFBUUMsS0FBUixDQUFjLFlBQWQsRUFBNEJGLEdBQTVCO0FBQ0E7QUFDRDs7QUFFRCxVQUFJLE9BQU9BLElBQUl2QyxJQUFYLEtBQW9CLFFBQXhCLEVBQWtDO0FBQ2hDdUMsWUFBSXZDLElBQUosR0FBVzBDLEtBQUtDLEtBQUwsQ0FBV0osSUFBSXZDLElBQWYsQ0FBWDtBQUNEOztBQUVELFVBQUl1QyxJQUFJdkMsSUFBSixDQUFTaUIsT0FBVCxLQUFxQixJQUF6QixFQUErQjtBQUM3QixZQUFJO0FBQ0YsaUJBQU9SLE1BQU1RLE9BQWIsS0FBeUIsVUFBekIsSUFBdUNSLE1BQU1RLE9BQU4sQ0FBY3NCLElBQUl2QyxJQUFsQixDQUF2QztBQUNELFNBRkQsQ0FFRSxPQUFPNEMsQ0FBUCxFQUFVO0FBQ1ZKLGtCQUFRQyxLQUFSLENBQWNHLENBQWQ7QUFDRDtBQUNELFlBQUk7QUFDRixpQkFBT25DLE1BQU1vQyxRQUFiLEtBQTBCLFVBQTFCLElBQXdDcEMsTUFBTW9DLFFBQU4sRUFBeEM7QUFDRCxTQUZELENBRUUsT0FBT0QsQ0FBUCxFQUFVO0FBQ1ZKLGtCQUFRQyxLQUFSLENBQWNHLENBQWQ7QUFDRDtBQUNGLE9BWEQsTUFXTztBQUNMLFlBQUlMLElBQUl2QyxJQUFKLENBQVM4QyxJQUFULEtBQWtCLFNBQXRCLEVBQWlDO0FBQy9CTixrQkFBUUMsS0FBUixDQUFjLGFBQWQsRUFBNkJGLEdBQTdCO0FBQ0EsMkJBQU81QyxhQUFQLEdBQXVCLENBQUMsWUFBVztBQUNqQ3VDLHVCQUFXekIsS0FBWDtBQUNELFdBRnNCLENBQXZCOztBQUlBWjtBQUNELFNBUEQsTUFPTztBQUNMMkMsa0JBQVFDLEtBQVIsQ0FBY0YsSUFBSXZDLElBQUosQ0FBU3VCLEdBQVQsSUFBZ0IsY0FBOUI7O0FBRUEseUJBQUtFLFNBQUwsQ0FBZTtBQUNiQyxxQkFBU2EsSUFBSXZDLElBQUosQ0FBU3VCLEdBQVQsSUFBZ0IsY0FEWjtBQUViSSx3QkFBWSxLQUZDO0FBR2JDLHlCQUFhOztBQUhBLFdBQWY7O0FBT0EsY0FBSTtBQUNGLG1CQUFPbkIsTUFBTVksSUFBYixLQUFzQixVQUF0QixJQUFvQ1osTUFBTVksSUFBTixDQUFXa0IsR0FBWCxDQUFwQztBQUNELFdBRkQsQ0FFRSxPQUFPSyxDQUFQLEVBQVU7QUFDVkosb0JBQVFDLEtBQVIsQ0FBY0csQ0FBZDtBQUNEO0FBQ0QsY0FBSTtBQUNGLG1CQUFPbkMsTUFBTW9DLFFBQWIsS0FBMEIsVUFBMUIsSUFBd0NwQyxNQUFNb0MsUUFBTixFQUF4QztBQUNELFdBRkQsQ0FFRSxPQUFPRCxDQUFQLEVBQVU7QUFDVkosb0JBQVFDLEtBQVIsQ0FBY0csQ0FBZDtBQUNEO0FBQ0Y7QUFDRjtBQUNGLEtBbkVVO0FBb0VYdkIsVUFBTSxjQUFTa0IsR0FBVCxFQUFjO0FBQ2xCQyxjQUFRQyxLQUFSLENBQWNGLElBQUl2QyxJQUFKLEdBQVcsYUFBWCxHQUEyQixjQUF6QztBQUNBLHFCQUFLeUIsU0FBTCxDQUFlO0FBQ2JDLGlCQUFTYSxJQUFJdkMsSUFBSixHQUFXLGFBQVgsR0FBMkIsY0FEdkI7QUFFYjJCLG9CQUFZLEtBRkM7QUFHYkMscUJBQWE7O0FBSEEsT0FBZjs7QUFPQSxVQUFJO0FBQ0YsZUFBT25CLE1BQU1ZLElBQWIsS0FBc0IsVUFBdEIsSUFBb0NaLE1BQU1ZLElBQU4sRUFBcEM7QUFDRCxPQUZELENBRUUsT0FBT3VCLENBQVAsRUFBVTtBQUNWSixnQkFBUUMsS0FBUixDQUFjRyxDQUFkO0FBQ0Q7QUFDRCxVQUFJO0FBQ0YsZUFBT25DLE1BQU1vQyxRQUFiLEtBQTBCLFVBQTFCLElBQXdDcEMsTUFBTW9DLFFBQU4sRUFBeEM7QUFDRCxPQUZELENBRUUsT0FBT0QsQ0FBUCxFQUFVO0FBQ1ZKLGdCQUFRQyxLQUFSLENBQWNHLENBQWQ7QUFDRDtBQUNGO0FBdkZVLEdBQWI7QUF5RkQ7O0FBRUQsU0FBU25ELE9BQVQsR0FBbUI7QUFDakIsTUFBTWlCLFdBQVcsc0JBQWpCOztBQUVBcUM7O0FBRUEsV0FBU0EsT0FBVCxHQUFtQjtBQUNqQixtQkFBS0MsS0FBTCxDQUFXO0FBQ1QvQixlQUFTLGlCQUFTc0IsR0FBVCxFQUFjO0FBQ3JCLFlBQUksQ0FBQ0EsSUFBSU8sSUFBVCxFQUFlO0FBQ2JwQyxtQkFBU1ksTUFBVCxDQUFnQjtBQUNkTCxxQkFBUyxLQURLO0FBRWRnQyxvQkFBUSxZQUFZVixJQUFJVTtBQUZWLFdBQWhCO0FBSUE7QUFDRDtBQUNEQyxxQkFBYVgsSUFBSU8sSUFBakI7QUFDRCxPQVZRO0FBV1R6QixZQUFNLGNBQVNrQixHQUFULEVBQWM7QUFDbEIsdUJBQUtkLFNBQUwsQ0FBZTtBQUNiQyxtQkFBUyxjQUFjYSxJQUFJVSxNQUFsQixHQUEyQixTQUR2QjtBQUVidEIsc0JBQVksS0FGQztBQUdiQyx1QkFBYSxLQUhBOztBQUtiWCxtQkFBUyxpQkFBU3NCLEdBQVQsRUFBYztBQUNyQixnQkFBSUEsSUFBSVksT0FBUixFQUFpQjtBQUNmSjtBQUNEO0FBQ0Y7QUFUWSxTQUFmOztBQVlBckMsaUJBQVNZLE1BQVQsQ0FBZ0I7QUFDZEwsbUJBQVMsS0FESztBQUVkZ0Msa0JBQVE7QUFGTSxTQUFoQjtBQUlEO0FBNUJRLEtBQVg7QUE4QkQ7QUFDRDtBQUNBLFdBQVNDLFlBQVQsQ0FBc0JKLElBQXRCLEVBQTRCO0FBQzFCLG1CQUFLaEIsV0FBTCxDQUFpQjtBQUNmYixlQUFTLGlCQUFTc0IsR0FBVCxFQUFjO0FBQ3JCQyxnQkFBUVksR0FBUixDQUFZLFVBQVosRUFBd0JOLElBQXhCLEVBQThCUCxHQUE5QjtBQUNBLHlCQUFPUCxRQUFQLEdBQWtCTyxJQUFJUCxRQUF0QjtBQUNBcUIsb0JBQVlQLElBQVosRUFBa0JQLEdBQWxCO0FBQ0QsT0FMYztBQU1mbEIsWUFBTSxjQUFTa0IsR0FBVCxFQUFjO0FBQ2xCdkIsbUJBQVcsWUFBTTtBQUNma0MsdUJBQWFKLElBQWI7QUFDRCxTQUZELEVBRUcsSUFGSDtBQUdBTixnQkFBUUMsS0FBUix1REFBMEJGLElBQUlVLE1BQTlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRDtBQWZjLEtBQWpCO0FBaUJEOztBQUVEO0FBQ0EsV0FBU0ksV0FBVCxDQUFxQlAsSUFBckIsRUFBMkJQLEdBQTNCLEVBQWdDO0FBQzlCLG1CQUFLdEMsT0FBTCxDQUFhO0FBQ1hGLFdBQUssZUFBS2lELEtBREM7QUFFWGhELFlBQU07QUFDSjhDLGNBQU1BLElBREY7QUFFSmQsa0JBQVUseUJBQWVPLEdBQWY7QUFGTixPQUZLO0FBTVhsQyxjQUFRLE1BTkc7QUFPWGdDLGNBQVE7QUFDTjtBQUNBLHVCQUFlLGlCQUFPQyxRQUZoQjtBQUdOLGtCQUFVLGtCQUhKO0FBSU4sd0JBQWdCO0FBSlYsT0FQRztBQWFYckIsZUFBUyxpQkFBU3NCLEdBQVQsRUFBYztBQUNyQixZQUFJLE9BQU9BLElBQUl2QyxJQUFYLEtBQW9CLFFBQXhCLEVBQWtDO0FBQ2hDdUMsY0FBSXZDLElBQUosR0FBVzBDLEtBQUtDLEtBQUwsQ0FBV0osSUFBSXZDLElBQWYsQ0FBWDtBQUNEO0FBQ0Q7QUFDQSxZQUFJdUMsSUFBSXZDLElBQUosSUFBWXVDLElBQUl2QyxJQUFKLENBQVNpQixPQUFULEtBQXFCLElBQXJDLEVBQTJDO0FBQ3pDdUIsa0JBQVFZLEdBQVIsQ0FBWSxRQUFaO0FBQ0EsMkJBQU85QyxNQUFQLEdBQWdCaUMsSUFBSXZDLElBQUosQ0FBU3NELE1BQVQsQ0FBZ0JoRCxNQUFoQztBQUNBLDJCQUFPZ0MsUUFBUCxHQUFrQkMsSUFBSXZDLElBQUosQ0FBU3NELE1BQVQsQ0FBZ0JDLFNBQWxDOztBQUVBN0MsbUJBQVNRLE9BQVQsQ0FBaUI7QUFDZkQscUJBQVMsSUFETTtBQUVmZSxzQkFBVSxpQkFBT0EsUUFGRjtBQUdmMUIsb0JBQVEsaUJBQU9BO0FBSEEsV0FBakI7QUFLRCxTQVZELE1BVU87QUFDTCx5QkFBS21CLFNBQUwsQ0FBZTtBQUNiQyxxQkFBVWEsSUFBSXZDLElBQUosSUFBWXVDLElBQUl2QyxJQUFKLENBQVN1QixHQUF0QixHQUE2QmdCLElBQUl2QyxJQUFKLENBQVN1QixHQUF0QyxHQUE0QyxRQUR4QztBQUViSSx3QkFBWSxLQUZDO0FBR2JDLHlCQUFhOztBQUhBLFdBQWY7O0FBT0FZLGtCQUFRWSxHQUFSLENBQVksUUFBWixFQUFzQmIsSUFBSXZDLElBQTFCO0FBQ0FVLG1CQUFTWSxNQUFULENBQWdCO0FBQ2RMLHFCQUFTLEtBREs7QUFFZHVDLHFCQUFTakIsSUFBSXZDLElBQUosQ0FBUzhDLElBRko7QUFHZEcsb0JBQVFWLElBQUl2QyxJQUFKLENBQVN1QjtBQUhILFdBQWhCO0FBS0Q7QUFDRixPQTNDVTtBQTRDWEYsWUFBTSxjQUFTa0IsR0FBVCxFQUFjO0FBQ2xCLHVCQUFLZCxTQUFMLENBQWU7QUFDYkMsbUJBQVMsY0FESTtBQUViQyxzQkFBWSxLQUZDO0FBR2JDLHVCQUFhOztBQUhBLFNBQWY7O0FBT0FsQixpQkFBU1ksTUFBVCxDQUFnQjtBQUNkTCxtQkFBUyxLQURLO0FBRWRnQyxrQkFBUVYsSUFBSVU7QUFGRSxTQUFoQjtBQUlEO0FBeERVLEtBQWI7QUEwREQ7O0FBRUQsU0FBT3ZDLFNBQVN5QixPQUFoQjtBQUNEOztBQWlCRCxTQUFTTCxXQUFULEdBQXVCO0FBQ3JCLE1BQU1wQixXQUFXLHNCQUFqQjs7QUFFQSxNQUFJLGlCQUFPc0IsUUFBUCxJQUFtQixpQkFBTzFCLE1BQTlCLEVBQXNDO0FBQ3BDVSxlQUFXLFlBQU07QUFDZk4sZUFBU1EsT0FBVCxDQUFpQjtBQUNmYyxrQkFBVSxpQkFBT0EsUUFERjtBQUVmMUIsZ0JBQVEsaUJBQU9BO0FBRkEsT0FBakI7QUFJRCxLQUxEO0FBTUQsR0FQRCxNQU9PO0FBQ0xiLGNBQVVzQyxJQUFWLENBQWUsZ0JBQVE7QUFDckIsVUFBSS9CLEtBQUtpQixPQUFULEVBQWtCO0FBQ2hCUCxpQkFBU1EsT0FBVCxDQUFpQjtBQUNmYyxvQkFBVWhDLEtBQUtnQyxRQURBO0FBRWYxQixrQkFBUU4sS0FBS007QUFGRSxTQUFqQjtBQUlELE9BTEQsTUFLTztBQUNMO0FBQ0FrQyxnQkFBUVksR0FBUixDQUFZLFFBQVosRUFBc0JwRCxJQUF0QjtBQUNEO0FBQ0YsS0FWRDtBQVdEOztBQUVELFNBQU9VLFNBQVN5QixPQUFoQjtBQUNEOztrQkFFYztBQUNickMsWUFEYTtBQUViSSxVQUZhO0FBR2I4QyxTQUFPdkQsT0FITTtBQUlicUM7QUFKYSxDIiwiZmlsZSI6InJlcXVlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCB1cmxzIGZyb20gJy4vdXJscy5qcyc7XG5pbXBvcnQgZGVmZXIgZnJvbSAnLi9kZWZlci5qcyc7XG5pbXBvcnQgaXMgZnJvbSAnLi9pcy5qcyc7XG5pbXBvcnQgbG9hZGluZyBmcm9tICcuL2xvYWRpbmcuanMnO1xuaW1wb3J0IGdsb2JhbCBmcm9tICcuL2dsb2JhbC5qcyc7XG5pbXBvcnQgdXRpbCBmcm9tICcuL3V0aWwuanMnO1xuXG5mdW5jdGlvbiBwb3N0KHVybCwgZGF0YSkge1xuICByZXR1cm4gcmVxdWVzdCh1cmwsICdQT1NUJywgZGF0YSk7XG59XG5cbmZ1bmN0aW9uIGdldCh1cmwsIGRhdGEpIHtcbiAgaWYgKCFkYXRhKSB7XG4gICAgZGF0YSA9IHtcblxuICAgIH1cbiAgfVxuICBkYXRhLl90aW1lc3RhbXAgPSArbmV3IERhdGUoKTtcblxuICByZXR1cm4gcmVxdWVzdCh1cmwsICdHRVQnLCBkYXRhKTtcbn1cblxuZnVuY3Rpb24gcmVxdWVzdCh1cmwsIG1ldGhvZCwgZGF0YSkge1xuICBpZiAoIWRhdGEpIHtcbiAgICBkYXRhID0ge31cbiAgfVxuXG4gIGRhdGEudXNlcklkID0gZ2xvYmFsLnVzZXJJZDtcblxuICB2YXIgaGFzTG9hZGluZyA9IGZhbHNlO1xuICB2YXIgbG9hZGluZ0RlbGF5U3QgPSBudWxsO1xuXG4gIHZhciBwYXJhbSA9IHtcbiAgICB1cmw6IHVybCxcbiAgICBkYXRhOiBkYXRhLFxuICAgIG1ldGhvZCxcbiAgfVxuXG4gIHZhciBkZWZlcnJlZCA9IGRlZmVyKCk7XG4gIGlmIChkYXRhLmxvYWRpbmdEZWxheSA9PT0gdHJ1ZSkge1xuICAgIGRhdGEubG9hZGluZ0RlbGF5ID0gMjAwMFxuICB9XG5cbiAgaWYgKGRhdGEubG9hZGluZ1RleHQgJiYgaXMuZW1wdHkoZGF0YS5sb2FkaW5nRGVsYXkpKSB7XG4gICAgaGFzTG9hZGluZyA9IHRydWU7XG4gICAgbG9hZGluZy5zaG93KHtcbiAgICAgIHRpdGxlOiBkYXRhLmxvYWRpbmdUZXh0IHx8ICcnXG4gICAgfSlcbiAgfVxuXG4gIGlmICghaXMuZW1wdHkoZGF0YS5sb2FkaW5nRGVsYXkpKSB7XG4gICAgbG9hZGluZ0RlbGF5U3QgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgaGFzTG9hZGluZyA9IHRydWVcbiAgICAgIGxvYWRpbmcuc2hvdyh7XG4gICAgICAgIHRpdGxlOiBkYXRhLmxvYWRpbmdUZXh0IHx8ICfliqrlipvliqDovb3kuK0nXG4gICAgICB9KVxuICAgIH0sIGRhdGEubG9hZGluZ0RlbGF5KVxuICB9XG5cbiAgcGFyYW0uc3VjY2VzcyA9IGQgPT4ge1xuICAgIGRlZmVycmVkLnJlc29sdmUoZClcblxuICAgIGNsZWFyVGltZW91dChsb2FkaW5nRGVsYXlTdClcblxuICAgIGlmIChoYXNMb2FkaW5nKSB7XG4gICAgICBoYXNMb2FkaW5nID0gZmFsc2VcbiAgICAgIGxvYWRpbmcuaGlkZSgpXG4gICAgfVxuICB9XG4gIHBhcmFtLmZhaWwgPSBkID0+IHtcbiAgICBkZWZlcnJlZC5yZWplY3QoZCk7XG5cbiAgICBpZiAoZCAmJiBkLm1zZyAmJiBkYXRhLmZhaWxBbGVydCAhPT0gZmFsc2UpIHtcbiAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgY29udGVudDogZC5tc2cgfHwgJ+S8vOS5juWHuumUmeS6hu+8jOivt+eojeWQjuWGjeivleOAgicsXG4gICAgICAgIHNob3dDYW5jZWw6IGZhbHNlLFxuICAgICAgICBjb25maXJtVGV4dDogJ+efpemBk+S6hicsXG5cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgY2xlYXJUaW1lb3V0KGxvYWRpbmdEZWxheVN0KVxuXG4gICAgaWYgKGhhc0xvYWRpbmcpIHtcbiAgICAgIGhhc0xvYWRpbmcgPSBmYWxzZVxuICAgICAgbG9hZGluZy5oaWRlKClcbiAgICB9XG4gIH1cbiAgaWYgKHBhcmFtLnVybCAmJiBwYXJhbS51cmwuaW5kZXhPZigne3VzZXJJZH0nKSAhPT0gLTEpIHtcbiAgICBnZXRVc2VySW5mby50aGVuKGZ1bmN0aW9uKHtcbiAgICAgIHVzZXJJbmZvLFxuICAgICAgdXNlcklkLFxuICAgIH0pIHtcbiAgICAgIHBhcmFtLnVybCA9IHBhcmFtLnVybC5yZXBsYWNlKC97dXNlcklkfS9nLCBnbG9iYWwudXNlcklkKVxuICAgICAgcmVxdWVzdFN2cihwYXJhbSk7XG4gICAgfSlcbiAgfSBlbHNlIHtcbiAgICByZXF1ZXN0U3ZyKHBhcmFtKTtcbiAgfVxuICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZVxufVxuXG4vLyDlkJHmnI3liqHlmajor7fmsYLmlbDmja7vvIxwYXJhbe+8mnt1cmw66K+35rGC55u45a+56Lev5b6ELGRhdGE66K+35rGC5Y+C5pWwLHN1Y2Nlc3M6ZnVuY3Rpb24sZmFpbDpmdW5jdGlvbu+8jOm7mOiupHRydWV9XG5mdW5jdGlvbiByZXF1ZXN0U3ZyKHBhcmFtKSB7XG4gIGlmIChnbG9iYWwubG9naW5pbmcpIHtcbiAgICBnbG9iYWwubG9naW5DYWxsYmFjay5wdXNoKGZ1bmN0aW9uKCkge1xuICAgICAgcmVxdWVzdFN2cihwYXJhbSk7XG4gICAgfSk7XG4gIH1cblxuICB3ZXB5LnJlcXVlc3Qoe1xuICAgIHVybDogcGFyYW0udXJsLFxuICAgIGRhdGE6IHBhcmFtLmRhdGEsXG4gICAgbWV0aG9kOiBwYXJhbS5tZXRob2QgfHwgJ1BPU1QnLFxuICAgIGhlYWRlcjoge1xuICAgICAgLy8g6K6+572u6K+35rGC55qEIGhlYWRlclxuICAgICAgJ1gtQVBQLVRPS0VOJzogZ2xvYmFsLmFwcFRva2VuLFxuICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnXG4gICAgfSxcbiAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgIGlmICghcmVzLmRhdGEpIHtcbiAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgIGNvbnRlbnQ6ICfmnI3liqHnq6/ov5Tlm57ml6DmlYjnmoTmlbDmja4nLFxuICAgICAgICAgIHNob3dDYW5jZWw6IGZhbHNlLFxuICAgICAgICAgIGNvbmZpcm1UZXh0OiAn55+l6YGT5LqGJyxcblxuICAgICAgICB9KVxuICAgICAgICBjb25zb2xlLmVycm9yKCfmnI3liqHnq6/ov5Tlm57ml6DmlYjnmoTmlbDmja4nLCByZXMpXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiByZXMuZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmVzLmRhdGEgPSBKU09OLnBhcnNlKHJlcy5kYXRhKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MgPT09IHRydWUpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB0eXBlb2YgcGFyYW0uc3VjY2VzcyA9PT0gJ2Z1bmN0aW9uJyAmJiBwYXJhbS5zdWNjZXNzKHJlcy5kYXRhKVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihlKVxuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdHlwZW9mIHBhcmFtLmNvbXBsZXRlID09PSAnZnVuY3Rpb24nICYmIHBhcmFtLmNvbXBsZXRlKClcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSlcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHJlcy5kYXRhLmNvZGUgPT09ICdUSU1FT1VUJykge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ+eZu+W9lei2heaXtu+8jOiHquWKqOmHjeaWsOeZu+W9lScsIHJlcyk7XG4gICAgICAgICAgZ2xvYmFsLmxvZ2luQ2FsbGJhY2sgPSBbZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXF1ZXN0U3ZyKHBhcmFtKTtcbiAgICAgICAgICB9XTtcblxuICAgICAgICAgIHRpbWVvdXRMb2dpbigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IocmVzLmRhdGEubXNnIHx8ICfkvLzkuY7lh7rplJnkuobvvIzor7fnqI3lkI7lho3or5XjgIInKVxuXG4gICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgICAgY29udGVudDogcmVzLmRhdGEubXNnIHx8ICfkvLzkuY7lh7rplJnkuobvvIzor7fnqI3lkI7lho3or5XjgIInLFxuICAgICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXG4gICAgICAgICAgICBjb25maXJtVGV4dDogJ+efpemBk+S6hicsXG5cbiAgICAgICAgICB9KVxuXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHR5cGVvZiBwYXJhbS5mYWlsID09PSAnZnVuY3Rpb24nICYmIHBhcmFtLmZhaWwocmVzKVxuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSlcbiAgICAgICAgICB9XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHR5cGVvZiBwYXJhbS5jb21wbGV0ZSA9PT0gJ2Z1bmN0aW9uJyAmJiBwYXJhbS5jb21wbGV0ZSgpXG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgZmFpbDogZnVuY3Rpb24ocmVzKSB7XG4gICAgICBjb25zb2xlLmVycm9yKHJlcy5kYXRhID8gJ+S8vOS5juWHuumUmeS6hu+8jOivt+eojeWQjuWGjeivlScgOiAn5Ly85LmO5bey5pat5byA5LiO5LqS6IGU572R55qE6L+e5o6lJyk7XG4gICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgIGNvbnRlbnQ6IHJlcy5kYXRhID8gJ+S8vOS5juWHuumUmeS6hu+8jOivt+eojeWQjuWGjeivlScgOiAn5Ly85LmO5bey5pat5byA5LiO5LqS6IGU572R55qE6L+e5o6lJyxcbiAgICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXG4gICAgICAgIGNvbmZpcm1UZXh0OiAn55+l6YGT5LqGJyxcblxuICAgICAgfSlcblxuICAgICAgdHJ5IHtcbiAgICAgICAgdHlwZW9mIHBhcmFtLmZhaWwgPT09ICdmdW5jdGlvbicgJiYgcGFyYW0uZmFpbCgpXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZSlcbiAgICAgIH1cbiAgICAgIHRyeSB7XG4gICAgICAgIHR5cGVvZiBwYXJhbS5jb21wbGV0ZSA9PT0gJ2Z1bmN0aW9uJyAmJiBwYXJhbS5jb21wbGV0ZSgpXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZSlcbiAgICAgIH1cbiAgICB9XG4gIH0pXG59XG5cbmZ1bmN0aW9uIGRvTG9naW4oKSB7XG4gIGNvbnN0IGRlZmVycmVkID0gZGVmZXIoKTtcblxuICB3eExvZ2luKCk7XG5cbiAgZnVuY3Rpb24gd3hMb2dpbigpIHtcbiAgICB3ZXB5LmxvZ2luKHtcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICBpZiAoIXJlcy5jb2RlKSB7XG4gICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgICAgZXJyTXNnOiAn5b6u5L+h55m75b2V5aSx6LSl77yBJyArIHJlcy5lcnJNc2dcbiAgICAgICAgICB9KVxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBfZ2V0VXNlckluZm8ocmVzLmNvZGUpXG4gICAgICB9LFxuICAgICAgZmFpbDogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICBjb250ZW50OiAnd3gubG9naW5bJyArIHJlcy5lcnJNc2cgKyAnXeW+ruS/oeeZu+W9leWksei0pScsXG4gICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXG4gICAgICAgICAgY29uZmlybVRleHQ6ICfnn6XpgZPkuoYnLFxuXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgd3hMb2dpbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgIGVyck1zZzogJ+W+ruS/oeeZu+W9leWksei0pSdcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICAvLyDnmbvlvZXmiJDlip/lkI7ojrflj5bnlKjmiLfkv6Hmga9cbiAgZnVuY3Rpb24gX2dldFVzZXJJbmZvKGNvZGUpIHtcbiAgICB3ZXB5LmdldFVzZXJJbmZvKHtcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICBjb25zb2xlLmxvZygn6I635Y+W55So5oi35L+h5oGv5oiQ5YqfJywgY29kZSwgcmVzKTtcbiAgICAgICAgZ2xvYmFsLnVzZXJJbmZvID0gcmVzLnVzZXJJbmZvO1xuICAgICAgICBzZXJ2ZXJMb2dpbihjb2RlLCByZXMpXG4gICAgICB9LFxuICAgICAgZmFpbDogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIF9nZXRVc2VySW5mbyhjb2RlKTtcbiAgICAgICAgfSwgMzAwMCk7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYOiOt+WPlueUqOaIt+S/oeaBr+Wksei0pSAke3Jlcy5lcnJNc2d9YCk7XG4gICAgICAgIC8vIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgIC8vICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgIC8vICAgZXJyTXNnOiBg6I635Y+W55So5oi35L+h5oGv5aSx6LSlICR7cmVzLmVyck1zZ31gXG4gICAgICAgIC8vIH0pXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIC8vIOiOt+WPlueUqOaIt+S/oeaBr+aIkOWKn+WQjuWQkeacjeWKoeWZqOivt+axgueZu+W9lVxuICBmdW5jdGlvbiBzZXJ2ZXJMb2dpbihjb2RlLCByZXMpIHtcbiAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgdXJsOiB1cmxzLmxvZ2luLFxuICAgICAgZGF0YToge1xuICAgICAgICBjb2RlOiBjb2RlLFxuICAgICAgICB1c2VySW5mbzogSlNPTi5zdHJpbmdpZnkocmVzKVxuICAgICAgfSxcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgaGVhZGVyOiB7XG4gICAgICAgIC8vIOiuvue9ruivt+axgueahCBoZWFkZXJcbiAgICAgICAgJ1gtQVBQLVRPS0VOJzogZ2xvYmFsLmFwcFRva2VuLFxuICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04J1xuICAgICAgfSxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICBpZiAodHlwZW9mIHJlcy5kYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIHJlcy5kYXRhID0gSlNPTi5wYXJzZShyZXMuZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gc3VjY2Vzc1xuICAgICAgICBpZiAocmVzLmRhdGEgJiYgcmVzLmRhdGEuc3VjY2VzcyA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCflvq7kv6HnmbvlvZXmiJDlip8nKVxuICAgICAgICAgIGdsb2JhbC51c2VySWQgPSByZXMuZGF0YS5yZXN1bHQudXNlcklkO1xuICAgICAgICAgIGdsb2JhbC5hcHBUb2tlbiA9IHJlcy5kYXRhLnJlc3VsdC5zZXNzaW9uSWQ7XG5cbiAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICB1c2VySW5mbzogZ2xvYmFsLnVzZXJJbmZvLFxuICAgICAgICAgICAgdXNlcklkOiBnbG9iYWwudXNlcklkXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgICBjb250ZW50OiAocmVzLmRhdGEgJiYgcmVzLmRhdGEubXNnKSA/IHJlcy5kYXRhLm1zZyA6ICflvq7kv6HnmbvlvZXlpLHotKUnLFxuICAgICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXG4gICAgICAgICAgICBjb25maXJtVGV4dDogJ+efpemBk+S6hicsXG5cbiAgICAgICAgICB9KVxuXG4gICAgICAgICAgY29uc29sZS5sb2coJ+W+ruS/oeeZu+W9leWksei0pScsIHJlcy5kYXRhKVxuICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgICAgIGVyckNvZGU6IHJlcy5kYXRhLmNvZGUsXG4gICAgICAgICAgICBlcnJNc2c6IHJlcy5kYXRhLm1zZ1xuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBmYWlsOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgIGNvbnRlbnQ6ICfkvLzkuY7lh7rplJnkuobvvIzor7fnqI3lkI7lho3or5XjgIInLFxuICAgICAgICAgIHNob3dDYW5jZWw6IGZhbHNlLFxuICAgICAgICAgIGNvbmZpcm1UZXh0OiAn55+l6YGT5LqGJyxcblxuICAgICAgICB9KVxuXG4gICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgICAgZXJyTXNnOiByZXMuZXJyTXNnXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xufVxuXG5hc3luYyBmdW5jdGlvbiB0aW1lb3V0TG9naW4oKSB7XG4gIGdsb2JhbC5sb2dpbmluZyA9IHRydWU7XG5cbiAgYXdhaXQgZG9Mb2dpbigpO1xuXG4gIHV0aWwuZWFjaChnbG9iYWwubG9naW5DYWxsYmFjaywgZCA9PiB7XG4gICAgZCgpO1xuICB9KTtcblxuICBkZWxldGUgZ2xvYmFsLmxvZ2luaW5nO1xuICBkZWxldGUgZ2xvYmFsLmxvZ2luQ2FsbGJhY2s7XG59XG5cbi8vIOeZu+W9leaIkOWKn+WQjuiOt+WPlueUqOaIt+S/oeaBr1xuLy8g6I635Y+W55So5oi35L+h5oGv77yM5aaC5p6c55So5oi35pyq55m75b2V5Lya6Ieq5Yqo6Kem5Y+R55m75b2V77yM5oiQ5Yqf5Zue6LCD6L+U5Zue5Lik5Liq5Y+C5pWw77yadXNlckluZm8sdXNlcklkXG5mdW5jdGlvbiBnZXRVc2VySW5mbygpIHtcbiAgY29uc3QgZGVmZXJyZWQgPSBkZWZlcigpO1xuXG4gIGlmIChnbG9iYWwudXNlckluZm8gJiYgZ2xvYmFsLnVzZXJJZCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgZGVmZXJyZWQucmVzb2x2ZSh7XG4gICAgICAgIHVzZXJJbmZvOiBnbG9iYWwudXNlckluZm8sXG4gICAgICAgIHVzZXJJZDogZ2xvYmFsLnVzZXJJZCxcbiAgICAgIH0pXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgZG9Mb2dpbigpLnRoZW4oZGF0YSA9PiB7XG4gICAgICBpZiAoZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgIGRlZmVycmVkLnJlc29sdmUoe1xuICAgICAgICAgIHVzZXJJbmZvOiBkYXRhLnVzZXJJbmZvLFxuICAgICAgICAgIHVzZXJJZDogZGF0YS51c2VySWQsXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBUT0RPIOWksei0peeOsOWcqOayoeacieWbnuiwg1xuICAgICAgICBjb25zb2xlLmxvZygn5b6u5L+h55m75b2V5aSx6LSlJywgZGF0YSlcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHBvc3QsXG4gIGdldCxcbiAgbG9naW46IGRvTG9naW4sXG4gIGdldFVzZXJJbmZvLFxufTtcbiJdfQ==