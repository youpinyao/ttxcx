import wepy from 'wepy';
import urls from './urls.js';
import defer from './defer.js';
import is from './is.js';
import loading from './loading.js';
import global from './global.js';
import util from './util.js';

function post(url, data) {
  return request(url, 'POST', data);
}

function get(url, data) {
  if (!data) {
    data = {

    }
  }
  data._timestamp = +new Date();

  return request(url, 'GET', data);
}

function request(url, method, data) {
  if (!data) {
    data = {}
  }

  data.userId = global.userId;

  var hasLoading = false;
  var loadingDelaySt = null;

  var param = {
    url: url,
    data: data,
    method,
  }

  var deferred = defer();
  if (data.loadingDelay === true) {
    data.loadingDelay = 2000
  }

  if (data.loadingText && is.empty(data.loadingDelay)) {
    hasLoading = true;
    loading.show({
      title: data.loadingText || ''
    })
  }

  if (!is.empty(data.loadingDelay)) {
    loadingDelaySt = setTimeout(function() {
      hasLoading = true
      loading.show({
        title: data.loadingText || '努力加载中'
      })
    }, data.loadingDelay)
  }

  param.success = d => {
    deferred.resolve(d)

    clearTimeout(loadingDelaySt)

    if (hasLoading) {
      hasLoading = false
      loading.hide()
    }
  }
  param.fail = d => {
    deferred.reject(d);

    if (d && d.msg && data.failAlert !== false) {
      wepy.showModal({
        content: d.msg || '似乎出错了，请稍后再试。',
        showCancel: false,
        confirmText: '知道了',

      })
    }

    clearTimeout(loadingDelaySt)

    if (hasLoading) {
      hasLoading = false
      loading.hide()
    }
  }
  if (param.url && param.url.indexOf('{userId}') !== -1) {
    getUserInfo.then(function({
      userInfo,
      userId,
    }) {
      param.url = param.url.replace(/{userId}/g, global.userId)
      requestSvr(param);
    })
  } else {
    requestSvr(param);
  }
  return deferred.promise
}

// 向服务器请求数据，param：{url:请求相对路径,data:请求参数,success:function,fail:function，默认true}
function requestSvr(param) {
  if (global.logining) {
    global.loginCallback.push(function() {
      requestSvr(param);
    });
  }

  wepy.request({
    url: param.url,
    data: param.data,
    method: param.method || 'POST',
    header: {
      // 设置请求的 header
      'X-APP-TOKEN': global.appToken,
      'Accept': 'application/json',
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    success: function(res) {
      if (!res.data) {
        wepy.showModal({
          content: '服务端返回无效的数据',
          showCancel: false,
          confirmText: '知道了',

        })
        console.error('服务端返回无效的数据', res)
        return;
      }

      if (typeof res.data === 'string') {
        res.data = JSON.parse(res.data);
      }

      if (res.data.success === true) {
        try {
          typeof param.success === 'function' && param.success(res.data)
        } catch (e) {
          console.error(e)
        }
        try {
          typeof param.complete === 'function' && param.complete()
        } catch (e) {
          console.error(e)
        }
      } else {
        if (res.data.code === 'TIMEOUT') {
          console.error('登录超时，自动重新登录', res);
          global.loginCallback = [function() {
            requestSvr(param);
          }];

          timeoutLogin();
        } else {
          console.error(res.data.msg || '似乎出错了，请稍后再试。')

          wepy.showModal({
            content: res.data.msg || '似乎出错了，请稍后再试。',
            showCancel: false,
            confirmText: '知道了',

          })

          try {
            typeof param.fail === 'function' && param.fail(res)
          } catch (e) {
            console.error(e)
          }
          try {
            typeof param.complete === 'function' && param.complete()
          } catch (e) {
            console.error(e)
          }
        }
      }
    },
    fail: function(res) {
      console.error(res.data ? '似乎出错了，请稍后再试' : '似乎已断开与互联网的连接');
      wepy.showModal({
        content: res.data ? '似乎出错了，请稍后再试' : '似乎已断开与互联网的连接',
        showCancel: false,
        confirmText: '知道了',

      })

      try {
        typeof param.fail === 'function' && param.fail()
      } catch (e) {
        console.error(e)
      }
      try {
        typeof param.complete === 'function' && param.complete()
      } catch (e) {
        console.error(e)
      }
    }
  })
}

function doLogin() {
  const deferred = defer();

  wxLogin();

  function wxLogin() {
    wepy.login({
      success: function(res) {
        if (!res.code) {
          deferred.reject({
            success: false,
            errMsg: '微信登录失败！' + res.errMsg
          })
          return;
        }
        _getUserInfo(res.code)
      },
      fail: function(res) {
        wepy.showModal({
          content: 'wx.login[' + res.errMsg + ']微信登录失败',
          showCancel: false,
          confirmText: '知道了',

          success: function(res) {
            if (res.confirm) {
              wxLogin();
            }
          }
        })

        deferred.reject({
          success: false,
          errMsg: '微信登录失败'
        })
      }
    });
  }
  // 登录成功后获取用户信息
  function _getUserInfo(code) {
    wepy.getUserInfo({
      success: function(res) {
        console.log('获取用户信息成功', code, res);
        global.userInfo = res.userInfo;
        serverLogin(code, res)
      },
      fail: function(res) {
        setTimeout(() => {
          _getUserInfo(code);
        }, 3000);
        console.error(`获取用户信息失败 ${res.errMsg}`);
        // deferred.reject({
        //   success: false,
        //   errMsg: `获取用户信息失败 ${res.errMsg}`
        // })
      }
    })
  }

  // 获取用户信息成功后向服务器请求登录
  function serverLogin(code, res) {
    wepy.request({
      url: urls.login,
      data: {
        code: code,
        userInfo: JSON.stringify(res)
      },
      method: 'POST',
      header: {
        // 设置请求的 header
        'X-APP-TOKEN': global.appToken,
        'Accept': 'application/json',
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: function(res) {
        if (typeof res.data === 'string') {
          res.data = JSON.parse(res.data);
        }
        // success
        if (res.data && res.data.success === true) {
          console.log('微信登录成功')
          global.userId = res.data.result.userId;
          global.appToken = res.data.result.sessionId;
          global.protocolIsReaded = res.data.result.protocolIsReaded;

          deferred.resolve({
            success: true,
            ...global,
          })
        } else {
          wepy.showModal({
            content: (res.data && res.data.msg) ? res.data.msg : '微信登录失败',
            showCancel: false,
            confirmText: '知道了',

          })

          console.log('微信登录失败', res.data)
          deferred.reject({
            success: false,
            errCode: res.data.code,
            errMsg: res.data.msg
          })
        }
      },
      fail: function(res) {
        wepy.showModal({
          content: '似乎出错了，请稍后再试。',
          showCancel: false,
          confirmText: '知道了',

        })

        deferred.reject({
          success: false,
          errMsg: res.errMsg
        })
      }
    })
  }

  return deferred.promise;
}

async function timeoutLogin() {
  global.logining = true;

  await doLogin();

  util.each(global.loginCallback, d => {
    d();
  });

  delete global.logining;
  delete global.loginCallback;
}

// 登录成功后获取用户信息
// 获取用户信息，如果用户未登录会自动触发登录，成功回调返回两个参数：userInfo,userId
function getUserInfo() {
  const deferred = defer();

  if (global.userInfo && global.userId) {
    setTimeout(() => {
      deferred.resolve({
        ...global,
      })
    });
  } else {
    doLogin().then(data => {
      if (data.success) {
        deferred.resolve({
          ...data
        })
      } else {
        // TODO 失败现在没有回调
        console.log('微信登录失败', data)
      }
    });
  }

  return deferred.promise;
}

export default {
  post,
  get,
  login: doLogin,
  getUserInfo,
};
