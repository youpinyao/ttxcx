"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function post(e,t){return request(e,"POST",t)}function get(e,t){return t||(t={}),t._timestamp=+new Date,request(e,"GET",t)}function request(e,t,o){o||(o={}),o.userId=_global2.default.userId;var r=!1,n=null,a={url:e,data:o,method:t},l=(0,_defer2.default)();return!0===o.loadingDelay&&(o.loadingDelay=2e3),o.loadingText&&_is2.default.empty(o.loadingDelay)&&(r=!0,_loading2.default.show({title:o.loadingText||""})),_is2.default.empty(o.loadingDelay)||(n=setTimeout(function(){r=!0,_loading2.default.show({title:o.loadingText||"努力加载中"})},o.loadingDelay)),a.success=function(e){l.resolve(e),clearTimeout(n),r&&(r=!1,_loading2.default.hide())},a.fail=function(e){l.reject(e),e&&e.msg&&!1!==o.failAlert&&_wepy2.default.showModal({content:e.msg||"似乎出错了，请稍后再试。",showCancel:!1,confirmText:"知道了"}),clearTimeout(n),r&&(r=!1,_loading2.default.hide())},a.url&&-1!==a.url.indexOf("{userId}")?getUserInfo.then(function(e){e.userInfo,e.userId;a.url=a.url.replace(/{userId}/g,_global2.default.userId),requestSvr(a)}):requestSvr(a),l.promise}function requestSvr(e){_global2.default.logining&&_global2.default.loginCallback.push(function(){requestSvr(e)}),_wepy2.default.request({url:e.url,data:e.data,method:e.method||"POST",header:{"X-APP-TOKEN":_global2.default.appToken,Accept:"application/json","content-type":"application/x-www-form-urlencoded;charset=utf-8"},success:function(t){if(!t.data)return _wepy2.default.showModal({content:"服务端返回无效的数据",showCancel:!1,confirmText:"知道了"}),void console.error("服务端返回无效的数据",t);if("string"==typeof t.data&&(t.data=JSON.parse(t.data)),!0===t.data.success){try{"function"==typeof e.success&&e.success(t.data)}catch(e){console.error(e)}try{"function"==typeof e.complete&&e.complete()}catch(e){console.error(e)}}else if("TIMEOUT"===t.data.code)console.error("登录超时，自动重新登录",t),_global2.default.loginCallback=[function(){requestSvr(e)}],timeoutLogin();else{console.error(t.data.msg||"似乎出错了，请稍后再试。"),_wepy2.default.showModal({content:t.data.msg||"似乎出错了，请稍后再试。",showCancel:!1,confirmText:"知道了"});try{"function"==typeof e.fail&&e.fail(t)}catch(e){console.error(e)}try{"function"==typeof e.complete&&e.complete()}catch(e){console.error(e)}}},fail:function(t){console.error(t.data?"似乎出错了，请稍后再试":"似乎已断开与互联网的连接"),_wepy2.default.showModal({content:t.data?"似乎出错了，请稍后再试":"似乎已断开与互联网的连接",showCancel:!1,confirmText:"知道了"});try{"function"==typeof e.fail&&e.fail()}catch(e){console.error(e)}try{"function"==typeof e.complete&&e.complete()}catch(e){console.error(e)}}})}function doLogin(){function e(){_wepy2.default.login({success:function(e){if(!e.code)return void r.reject({success:!1,errMsg:"微信登录失败！"+e.errMsg});t(e.code)},fail:function(t){_wepy2.default.showModal({content:"wx.login["+t.errMsg+"]微信登录失败",showCancel:!1,confirmText:"知道了",success:function(t){t.confirm&&e()}}),r.reject({success:!1,errMsg:"微信登录失败"})}})}function t(e){_wepy2.default.getUserInfo({success:function(t){console.log("获取用户信息成功",e,t),_global2.default.userInfo=t.userInfo,o(e,t)},fail:function(o){setTimeout(function(){t(e)},3e3),console.error("获取用户信息失败 "+o.errMsg)}})}function o(e,t){_wepy2.default.request({url:_urls2.default.login,data:{code:e,userInfo:(0,_stringify2.default)(t)},method:"POST",header:{"X-APP-TOKEN":_global2.default.appToken,Accept:"application/json","content-type":"application/x-www-form-urlencoded;charset=utf-8"},success:function(e){"string"==typeof e.data&&(e.data=JSON.parse(e.data)),e.data&&!0===e.data.success?(console.log("微信登录成功"),_global2.default.userId=e.data.result.userId,_global2.default.appToken=e.data.result.sessionId,r.resolve({success:!0,userInfo:_global2.default.userInfo,userId:_global2.default.userId})):(_wepy2.default.showModal({content:e.data&&e.data.msg?e.data.msg:"微信登录失败",showCancel:!1,confirmText:"知道了"}),console.log("微信登录失败",e.data),r.reject({success:!1,errCode:e.data.code,errMsg:e.data.msg}))},fail:function(e){_wepy2.default.showModal({content:"似乎出错了，请稍后再试。",showCancel:!1,confirmText:"知道了"}),r.reject({success:!1,errMsg:e.errMsg})}})}var r=(0,_defer2.default)();return e(),r.promise}function getUserInfo(){var e=(0,_defer2.default)();return _global2.default.userInfo&&_global2.default.userId?setTimeout(function(){e.resolve({userInfo:_global2.default.userInfo,userId:_global2.default.userId})}):doLogin().then(function(t){t.success?e.resolve({userInfo:t.userInfo,userId:t.userId}):console.log("微信登录失败",t)}),e.promise}Object.defineProperty(exports,"__esModule",{value:!0});var _regenerator=require("./../npm/babel-runtime/regenerator/index.js"),_regenerator2=_interopRequireDefault(_regenerator),_asyncToGenerator2=require("./../npm/babel-runtime/helpers/asyncToGenerator.js"),_asyncToGenerator3=_interopRequireDefault(_asyncToGenerator2),_stringify=require("./../npm/babel-runtime/core-js/json/stringify.js"),_stringify2=_interopRequireDefault(_stringify),timeoutLogin=function(){var e=(0,_asyncToGenerator3.default)(_regenerator2.default.mark(function e(){return _regenerator2.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return _global2.default.logining=!0,e.next=3,doLogin();case 3:_util2.default.each(_global2.default.loginCallback,function(e){e()}),delete _global2.default.logining,delete _global2.default.loginCallback;case 6:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),_wepy=require("./../npm/wepy/lib/wepy.js"),_wepy2=_interopRequireDefault(_wepy),_urls=require("./urls.js"),_urls2=_interopRequireDefault(_urls),_defer=require("./defer.js"),_defer2=_interopRequireDefault(_defer),_is=require("./is.js"),_is2=_interopRequireDefault(_is),_loading=require("./loading.js"),_loading2=_interopRequireDefault(_loading),_global=require("./global.js"),_global2=_interopRequireDefault(_global),_util=require("./util.js"),_util2=_interopRequireDefault(_util);exports.default={post:post,get:get,login:doLogin,getUserInfo:getUserInfo};