'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('./../npm/babel-runtime/regenerator/index.js');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('./../npm/babel-runtime/helpers/asyncToGenerator.js');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require('./../npm/babel-runtime/helpers/extends.js');

var _extends3 = _interopRequireDefault(_extends2);

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
          _global2.default.protocolIsReaded = res.data.result.protocolIsReaded;

          deferred.resolve((0, _extends3.default)({
            success: true
          }, _global2.default));
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
      deferred.resolve((0, _extends3.default)({}, _global2.default));
    });
  } else {
    doLogin().then(function (data) {
      if (data.success) {
        deferred.resolve((0, _extends3.default)({}, data));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlcXVlc3QuanMiXSwibmFtZXMiOlsibG9naW5pbmciLCJkb0xvZ2luIiwiZWFjaCIsImxvZ2luQ2FsbGJhY2siLCJkIiwidGltZW91dExvZ2luIiwicG9zdCIsInVybCIsImRhdGEiLCJyZXF1ZXN0IiwiZ2V0IiwiX3RpbWVzdGFtcCIsIkRhdGUiLCJtZXRob2QiLCJ1c2VySWQiLCJoYXNMb2FkaW5nIiwibG9hZGluZ0RlbGF5U3QiLCJwYXJhbSIsImRlZmVycmVkIiwibG9hZGluZ0RlbGF5IiwibG9hZGluZ1RleHQiLCJlbXB0eSIsInNob3ciLCJ0aXRsZSIsInNldFRpbWVvdXQiLCJzdWNjZXNzIiwicmVzb2x2ZSIsImNsZWFyVGltZW91dCIsImhpZGUiLCJmYWlsIiwicmVqZWN0IiwibXNnIiwiZmFpbEFsZXJ0Iiwic2hvd01vZGFsIiwiY29udGVudCIsInNob3dDYW5jZWwiLCJjb25maXJtVGV4dCIsImluZGV4T2YiLCJnZXRVc2VySW5mbyIsInRoZW4iLCJ1c2VySW5mbyIsInJlcGxhY2UiLCJyZXF1ZXN0U3ZyIiwicHJvbWlzZSIsInB1c2giLCJoZWFkZXIiLCJhcHBUb2tlbiIsInJlcyIsImNvbnNvbGUiLCJlcnJvciIsIkpTT04iLCJwYXJzZSIsImUiLCJjb21wbGV0ZSIsImNvZGUiLCJ3eExvZ2luIiwibG9naW4iLCJlcnJNc2ciLCJfZ2V0VXNlckluZm8iLCJjb25maXJtIiwibG9nIiwic2VydmVyTG9naW4iLCJyZXN1bHQiLCJzZXNzaW9uSWQiLCJwcm90b2NvbElzUmVhZGVkIiwiZXJyQ29kZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7dUZBcVVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDRSw2QkFBT0EsUUFBUCxHQUFrQixJQUFsQjs7QUFERjtBQUFBLG1CQUdRQyxTQUhSOztBQUFBOztBQUtFLDJCQUFLQyxJQUFMLENBQVUsaUJBQU9DLGFBQWpCLEVBQWdDLGFBQUs7QUFDbkNDO0FBQ0QsYUFGRDs7QUFJQSxt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QkFBS2QsU0FBTCxDQUFlO0FBQ2JDLG1CQUFTLGNBREk7QUFFYkMsc0JBQVksS0FGQztBQUdiQyx1QkFBYTs7QUFIQSxTQUFmOztBQU9BbEIsaUJBQVNZLE1BQVQsQ0FBZ0I7QUFDZEwsbUJBQVMsS0FESztBQUVkZ0Msa0JBQVFWLElBQUlVO0FBRkUsU0FBaEI7QUFJRDtBQXhEVSxLQUFiO0FBMEREOztBQUVELFNBQU92QyxTQUFTeUIsT0FBaEI7QUFDRDs7QUFpQkQsU0FBU0wsV0FBVCxHQUF1QjtBQUNyQixNQUFNcEIsV0FBVyxzQkFBakI7O0FBRUEsTUFBSSxpQkFBT3NCLFFBQVAsSUFBbUIsaUJBQU8xQixNQUE5QixFQUFzQztBQUNwQ1UsZUFBVyxZQUFNO0FBQ2ZOLGVBQVNRLE9BQVQ7QUFHRCxLQUpEO0FBS0QsR0FORCxNQU1PO0FBQ0x6QixjQUFVc0MsSUFBVixDQUFlLGdCQUFRO0FBQ3JCLFVBQUkvQixLQUFLaUIsT0FBVCxFQUFrQjtBQUNoQlAsaUJBQVNRLE9BQVQsNEJBQ0tsQixJQURMO0FBR0QsT0FKRCxNQUlPO0FBQ0w7QUFDQXdDLGdCQUFRWSxHQUFSLENBQVksUUFBWixFQUFzQnBELElBQXRCO0FBQ0Q7QUFDRixLQVREO0FBVUQ7O0FBRUQsU0FBT1UsU0FBU3lCLE9BQWhCO0FBQ0Q7O2tCQUVjO0FBQ2JyQyxZQURhO0FBRWJJLFVBRmE7QUFHYjhDLFNBQU92RCxPQUhNO0FBSWJxQztBQUphLEMiLCJmaWxlIjoicmVxdWVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IHVybHMgZnJvbSAnLi91cmxzLmpzJztcbmltcG9ydCBkZWZlciBmcm9tICcuL2RlZmVyLmpzJztcbmltcG9ydCBpcyBmcm9tICcuL2lzLmpzJztcbmltcG9ydCBsb2FkaW5nIGZyb20gJy4vbG9hZGluZy5qcyc7XG5pbXBvcnQgZ2xvYmFsIGZyb20gJy4vZ2xvYmFsLmpzJztcbmltcG9ydCB1dGlsIGZyb20gJy4vdXRpbC5qcyc7XG5cbmZ1bmN0aW9uIHBvc3QodXJsLCBkYXRhKSB7XG4gIHJldHVybiByZXF1ZXN0KHVybCwgJ1BPU1QnLCBkYXRhKTtcbn1cblxuZnVuY3Rpb24gZ2V0KHVybCwgZGF0YSkge1xuICBpZiAoIWRhdGEpIHtcbiAgICBkYXRhID0ge1xuXG4gICAgfVxuICB9XG4gIGRhdGEuX3RpbWVzdGFtcCA9ICtuZXcgRGF0ZSgpO1xuXG4gIHJldHVybiByZXF1ZXN0KHVybCwgJ0dFVCcsIGRhdGEpO1xufVxuXG5mdW5jdGlvbiByZXF1ZXN0KHVybCwgbWV0aG9kLCBkYXRhKSB7XG4gIGlmICghZGF0YSkge1xuICAgIGRhdGEgPSB7fVxuICB9XG5cbiAgZGF0YS51c2VySWQgPSBnbG9iYWwudXNlcklkO1xuXG4gIHZhciBoYXNMb2FkaW5nID0gZmFsc2U7XG4gIHZhciBsb2FkaW5nRGVsYXlTdCA9IG51bGw7XG5cbiAgdmFyIHBhcmFtID0ge1xuICAgIHVybDogdXJsLFxuICAgIGRhdGE6IGRhdGEsXG4gICAgbWV0aG9kLFxuICB9XG5cbiAgdmFyIGRlZmVycmVkID0gZGVmZXIoKTtcbiAgaWYgKGRhdGEubG9hZGluZ0RlbGF5ID09PSB0cnVlKSB7XG4gICAgZGF0YS5sb2FkaW5nRGVsYXkgPSAyMDAwXG4gIH1cblxuICBpZiAoZGF0YS5sb2FkaW5nVGV4dCAmJiBpcy5lbXB0eShkYXRhLmxvYWRpbmdEZWxheSkpIHtcbiAgICBoYXNMb2FkaW5nID0gdHJ1ZTtcbiAgICBsb2FkaW5nLnNob3coe1xuICAgICAgdGl0bGU6IGRhdGEubG9hZGluZ1RleHQgfHwgJydcbiAgICB9KVxuICB9XG5cbiAgaWYgKCFpcy5lbXB0eShkYXRhLmxvYWRpbmdEZWxheSkpIHtcbiAgICBsb2FkaW5nRGVsYXlTdCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICBoYXNMb2FkaW5nID0gdHJ1ZVxuICAgICAgbG9hZGluZy5zaG93KHtcbiAgICAgICAgdGl0bGU6IGRhdGEubG9hZGluZ1RleHQgfHwgJ+WKquWKm+WKoOi9veS4rSdcbiAgICAgIH0pXG4gICAgfSwgZGF0YS5sb2FkaW5nRGVsYXkpXG4gIH1cblxuICBwYXJhbS5zdWNjZXNzID0gZCA9PiB7XG4gICAgZGVmZXJyZWQucmVzb2x2ZShkKVxuXG4gICAgY2xlYXJUaW1lb3V0KGxvYWRpbmdEZWxheVN0KVxuXG4gICAgaWYgKGhhc0xvYWRpbmcpIHtcbiAgICAgIGhhc0xvYWRpbmcgPSBmYWxzZVxuICAgICAgbG9hZGluZy5oaWRlKClcbiAgICB9XG4gIH1cbiAgcGFyYW0uZmFpbCA9IGQgPT4ge1xuICAgIGRlZmVycmVkLnJlamVjdChkKTtcblxuICAgIGlmIChkICYmIGQubXNnICYmIGRhdGEuZmFpbEFsZXJ0ICE9PSBmYWxzZSkge1xuICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICBjb250ZW50OiBkLm1zZyB8fCAn5Ly85LmO5Ye66ZSZ5LqG77yM6K+356iN5ZCO5YaN6K+V44CCJyxcbiAgICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXG4gICAgICAgIGNvbmZpcm1UZXh0OiAn55+l6YGT5LqGJyxcblxuICAgICAgfSlcbiAgICB9XG5cbiAgICBjbGVhclRpbWVvdXQobG9hZGluZ0RlbGF5U3QpXG5cbiAgICBpZiAoaGFzTG9hZGluZykge1xuICAgICAgaGFzTG9hZGluZyA9IGZhbHNlXG4gICAgICBsb2FkaW5nLmhpZGUoKVxuICAgIH1cbiAgfVxuICBpZiAocGFyYW0udXJsICYmIHBhcmFtLnVybC5pbmRleE9mKCd7dXNlcklkfScpICE9PSAtMSkge1xuICAgIGdldFVzZXJJbmZvLnRoZW4oZnVuY3Rpb24oe1xuICAgICAgdXNlckluZm8sXG4gICAgICB1c2VySWQsXG4gICAgfSkge1xuICAgICAgcGFyYW0udXJsID0gcGFyYW0udXJsLnJlcGxhY2UoL3t1c2VySWR9L2csIGdsb2JhbC51c2VySWQpXG4gICAgICByZXF1ZXN0U3ZyKHBhcmFtKTtcbiAgICB9KVxuICB9IGVsc2Uge1xuICAgIHJlcXVlc3RTdnIocGFyYW0pO1xuICB9XG4gIHJldHVybiBkZWZlcnJlZC5wcm9taXNlXG59XG5cbi8vIOWQkeacjeWKoeWZqOivt+axguaVsOaNru+8jHBhcmFt77yae3VybDror7fmsYLnm7jlr7not6/lvoQsZGF0YTror7fmsYLlj4LmlbAsc3VjY2VzczpmdW5jdGlvbixmYWlsOmZ1bmN0aW9u77yM6buY6K6kdHJ1ZX1cbmZ1bmN0aW9uIHJlcXVlc3RTdnIocGFyYW0pIHtcbiAgaWYgKGdsb2JhbC5sb2dpbmluZykge1xuICAgIGdsb2JhbC5sb2dpbkNhbGxiYWNrLnB1c2goZnVuY3Rpb24oKSB7XG4gICAgICByZXF1ZXN0U3ZyKHBhcmFtKTtcbiAgICB9KTtcbiAgfVxuXG4gIHdlcHkucmVxdWVzdCh7XG4gICAgdXJsOiBwYXJhbS51cmwsXG4gICAgZGF0YTogcGFyYW0uZGF0YSxcbiAgICBtZXRob2Q6IHBhcmFtLm1ldGhvZCB8fCAnUE9TVCcsXG4gICAgaGVhZGVyOiB7XG4gICAgICAvLyDorr7nva7or7fmsYLnmoQgaGVhZGVyXG4gICAgICAnWC1BUFAtVE9LRU4nOiBnbG9iYWwuYXBwVG9rZW4sXG4gICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCdcbiAgICB9LFxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgaWYgKCFyZXMuZGF0YSkge1xuICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgY29udGVudDogJ+acjeWKoeerr+i/lOWbnuaXoOaViOeahOaVsOaNricsXG4gICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXG4gICAgICAgICAgY29uZmlybVRleHQ6ICfnn6XpgZPkuoYnLFxuXG4gICAgICAgIH0pXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ+acjeWKoeerr+i/lOWbnuaXoOaViOeahOaVsOaNricsIHJlcylcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIHJlcy5kYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXMuZGF0YSA9IEpTT04ucGFyc2UocmVzLmRhdGEpO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVzLmRhdGEuc3VjY2VzcyA9PT0gdHJ1ZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHR5cGVvZiBwYXJhbS5zdWNjZXNzID09PSAnZnVuY3Rpb24nICYmIHBhcmFtLnN1Y2Nlc3MocmVzLmRhdGEpXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGUpXG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB0eXBlb2YgcGFyYW0uY29tcGxldGUgPT09ICdmdW5jdGlvbicgJiYgcGFyYW0uY29tcGxldGUoKVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihlKVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAocmVzLmRhdGEuY29kZSA9PT0gJ1RJTUVPVVQnKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcign55m75b2V6LaF5pe277yM6Ieq5Yqo6YeN5paw55m75b2VJywgcmVzKTtcbiAgICAgICAgICBnbG9iYWwubG9naW5DYWxsYmFjayA9IFtmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJlcXVlc3RTdnIocGFyYW0pO1xuICAgICAgICAgIH1dO1xuXG4gICAgICAgICAgdGltZW91dExvZ2luKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihyZXMuZGF0YS5tc2cgfHwgJ+S8vOS5juWHuumUmeS6hu+8jOivt+eojeWQjuWGjeivleOAgicpXG5cbiAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgICBjb250ZW50OiByZXMuZGF0YS5tc2cgfHwgJ+S8vOS5juWHuumUmeS6hu+8jOivt+eojeWQjuWGjeivleOAgicsXG4gICAgICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZSxcbiAgICAgICAgICAgIGNvbmZpcm1UZXh0OiAn55+l6YGT5LqGJyxcblxuICAgICAgICAgIH0pXG5cbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgdHlwZW9mIHBhcmFtLmZhaWwgPT09ICdmdW5jdGlvbicgJiYgcGFyYW0uZmFpbChyZXMpXG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKVxuICAgICAgICAgIH1cbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgdHlwZW9mIHBhcmFtLmNvbXBsZXRlID09PSAnZnVuY3Rpb24nICYmIHBhcmFtLmNvbXBsZXRlKClcbiAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBmYWlsOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IocmVzLmRhdGEgPyAn5Ly85LmO5Ye66ZSZ5LqG77yM6K+356iN5ZCO5YaN6K+VJyA6ICfkvLzkuY7lt7Lmlq3lvIDkuI7kupLogZTnvZHnmoTov57mjqUnKTtcbiAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgY29udGVudDogcmVzLmRhdGEgPyAn5Ly85LmO5Ye66ZSZ5LqG77yM6K+356iN5ZCO5YaN6K+VJyA6ICfkvLzkuY7lt7Lmlq3lvIDkuI7kupLogZTnvZHnmoTov57mjqUnLFxuICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZSxcbiAgICAgICAgY29uZmlybVRleHQ6ICfnn6XpgZPkuoYnLFxuXG4gICAgICB9KVxuXG4gICAgICB0cnkge1xuICAgICAgICB0eXBlb2YgcGFyYW0uZmFpbCA9PT0gJ2Z1bmN0aW9uJyAmJiBwYXJhbS5mYWlsKClcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlKVxuICAgICAgfVxuICAgICAgdHJ5IHtcbiAgICAgICAgdHlwZW9mIHBhcmFtLmNvbXBsZXRlID09PSAnZnVuY3Rpb24nICYmIHBhcmFtLmNvbXBsZXRlKClcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlKVxuICAgICAgfVxuICAgIH1cbiAgfSlcbn1cblxuZnVuY3Rpb24gZG9Mb2dpbigpIHtcbiAgY29uc3QgZGVmZXJyZWQgPSBkZWZlcigpO1xuXG4gIHd4TG9naW4oKTtcblxuICBmdW5jdGlvbiB3eExvZ2luKCkge1xuICAgIHdlcHkubG9naW4oe1xuICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgIGlmICghcmVzLmNvZGUpIHtcbiAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgICAgICBlcnJNc2c6ICflvq7kv6HnmbvlvZXlpLHotKXvvIEnICsgcmVzLmVyck1zZ1xuICAgICAgICAgIH0pXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIF9nZXRVc2VySW5mbyhyZXMuY29kZSlcbiAgICAgIH0sXG4gICAgICBmYWlsOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgIGNvbnRlbnQ6ICd3eC5sb2dpblsnICsgcmVzLmVyck1zZyArICdd5b6u5L+h55m75b2V5aSx6LSlJyxcbiAgICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZSxcbiAgICAgICAgICBjb25maXJtVGV4dDogJ+efpemBk+S6hicsXG5cbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICB3eExvZ2luKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgICAgZXJyTXNnOiAn5b6u5L+h55m75b2V5aSx6LSlJ1xuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIC8vIOeZu+W9leaIkOWKn+WQjuiOt+WPlueUqOaIt+S/oeaBr1xuICBmdW5jdGlvbiBfZ2V0VXNlckluZm8oY29kZSkge1xuICAgIHdlcHkuZ2V0VXNlckluZm8oe1xuICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCfojrflj5bnlKjmiLfkv6Hmga/miJDlip8nLCBjb2RlLCByZXMpO1xuICAgICAgICBnbG9iYWwudXNlckluZm8gPSByZXMudXNlckluZm87XG4gICAgICAgIHNlcnZlckxvZ2luKGNvZGUsIHJlcylcbiAgICAgIH0sXG4gICAgICBmYWlsOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgX2dldFVzZXJJbmZvKGNvZGUpO1xuICAgICAgICB9LCAzMDAwKTtcbiAgICAgICAgY29uc29sZS5lcnJvcihg6I635Y+W55So5oi35L+h5oGv5aSx6LSlICR7cmVzLmVyck1zZ31gKTtcbiAgICAgICAgLy8gZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgLy8gICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgLy8gICBlcnJNc2c6IGDojrflj5bnlKjmiLfkv6Hmga/lpLHotKUgJHtyZXMuZXJyTXNnfWBcbiAgICAgICAgLy8gfSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgLy8g6I635Y+W55So5oi35L+h5oGv5oiQ5Yqf5ZCO5ZCR5pyN5Yqh5Zmo6K+35rGC55m75b2VXG4gIGZ1bmN0aW9uIHNlcnZlckxvZ2luKGNvZGUsIHJlcykge1xuICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICB1cmw6IHVybHMubG9naW4sXG4gICAgICBkYXRhOiB7XG4gICAgICAgIGNvZGU6IGNvZGUsXG4gICAgICAgIHVzZXJJbmZvOiBKU09OLnN0cmluZ2lmeShyZXMpXG4gICAgICB9LFxuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBoZWFkZXI6IHtcbiAgICAgICAgLy8g6K6+572u6K+35rGC55qEIGhlYWRlclxuICAgICAgICAnWC1BUFAtVE9LRU4nOiBnbG9iYWwuYXBwVG9rZW4sXG4gICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnXG4gICAgICB9LFxuICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgIGlmICh0eXBlb2YgcmVzLmRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgcmVzLmRhdGEgPSBKU09OLnBhcnNlKHJlcy5kYXRhKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBzdWNjZXNzXG4gICAgICAgIGlmIChyZXMuZGF0YSAmJiByZXMuZGF0YS5zdWNjZXNzID09PSB0cnVlKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ+W+ruS/oeeZu+W9leaIkOWKnycpXG4gICAgICAgICAgZ2xvYmFsLnVzZXJJZCA9IHJlcy5kYXRhLnJlc3VsdC51c2VySWQ7XG4gICAgICAgICAgZ2xvYmFsLmFwcFRva2VuID0gcmVzLmRhdGEucmVzdWx0LnNlc3Npb25JZDtcbiAgICAgICAgICBnbG9iYWwucHJvdG9jb2xJc1JlYWRlZCA9IHJlcy5kYXRhLnJlc3VsdC5wcm90b2NvbElzUmVhZGVkO1xuXG4gICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSh7XG4gICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICAgICAgLi4uZ2xvYmFsLFxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgICAgY29udGVudDogKHJlcy5kYXRhICYmIHJlcy5kYXRhLm1zZykgPyByZXMuZGF0YS5tc2cgOiAn5b6u5L+h55m75b2V5aSx6LSlJyxcbiAgICAgICAgICAgIHNob3dDYW5jZWw6IGZhbHNlLFxuICAgICAgICAgICAgY29uZmlybVRleHQ6ICfnn6XpgZPkuoYnLFxuXG4gICAgICAgICAgfSlcblxuICAgICAgICAgIGNvbnNvbGUubG9nKCflvq7kv6HnmbvlvZXlpLHotKUnLCByZXMuZGF0YSlcbiAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgICAgICBlcnJDb2RlOiByZXMuZGF0YS5jb2RlLFxuICAgICAgICAgICAgZXJyTXNnOiByZXMuZGF0YS5tc2dcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZmFpbDogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICBjb250ZW50OiAn5Ly85LmO5Ye66ZSZ5LqG77yM6K+356iN5ZCO5YaN6K+V44CCJyxcbiAgICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZSxcbiAgICAgICAgICBjb25maXJtVGV4dDogJ+efpemBk+S6hicsXG5cbiAgICAgICAgfSlcblxuICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgIGVyck1zZzogcmVzLmVyck1zZ1xuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gdGltZW91dExvZ2luKCkge1xuICBnbG9iYWwubG9naW5pbmcgPSB0cnVlO1xuXG4gIGF3YWl0IGRvTG9naW4oKTtcblxuICB1dGlsLmVhY2goZ2xvYmFsLmxvZ2luQ2FsbGJhY2ssIGQgPT4ge1xuICAgIGQoKTtcbiAgfSk7XG5cbiAgZGVsZXRlIGdsb2JhbC5sb2dpbmluZztcbiAgZGVsZXRlIGdsb2JhbC5sb2dpbkNhbGxiYWNrO1xufVxuXG4vLyDnmbvlvZXmiJDlip/lkI7ojrflj5bnlKjmiLfkv6Hmga9cbi8vIOiOt+WPlueUqOaIt+S/oeaBr++8jOWmguaenOeUqOaIt+acqueZu+W9leS8muiHquWKqOinpuWPkeeZu+W9le+8jOaIkOWKn+Wbnuiwg+i/lOWbnuS4pOS4quWPguaVsO+8mnVzZXJJbmZvLHVzZXJJZFxuZnVuY3Rpb24gZ2V0VXNlckluZm8oKSB7XG4gIGNvbnN0IGRlZmVycmVkID0gZGVmZXIoKTtcblxuICBpZiAoZ2xvYmFsLnVzZXJJbmZvICYmIGdsb2JhbC51c2VySWQpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGRlZmVycmVkLnJlc29sdmUoe1xuICAgICAgICAuLi5nbG9iYWwsXG4gICAgICB9KVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGRvTG9naW4oKS50aGVuKGRhdGEgPT4ge1xuICAgICAgaWYgKGRhdGEuc3VjY2Vzcykge1xuICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHtcbiAgICAgICAgICAuLi5kYXRhXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBUT0RPIOWksei0peeOsOWcqOayoeacieWbnuiwg1xuICAgICAgICBjb25zb2xlLmxvZygn5b6u5L+h55m75b2V5aSx6LSlJywgZGF0YSlcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHBvc3QsXG4gIGdldCxcbiAgbG9naW46IGRvTG9naW4sXG4gIGdldFVzZXJJbmZvLFxufTtcbiJdfQ==