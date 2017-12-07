"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,o){if(!(e instanceof o))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,o){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!o||"object"!=typeof o&&"function"!=typeof o?e:o}function _inherits(e,o){if("function"!=typeof o&&null!==o)throw new TypeError("Super expression must either be null or a function, not "+typeof o);e.prototype=Object.create(o&&o.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),o&&(Object.setPrototypeOf?Object.setPrototypeOf(e,o):e.__proto__=o)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,o){for(var t=0;t<o.length;t++){var r=o[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(o,t,r){return t&&e(o.prototype,t),r&&e(o,r),o}}(),_wepy=require("./../npm/wepy/lib/wepy.js"),_wepy2=_interopRequireDefault(_wepy),_defer=require("./../services/defer.js"),_defer2=_interopRequireDefault(_defer),_util=require("./../services/util.js"),_util2=_interopRequireDefault(_util),_urls=require("./../services/urls.js"),_urls2=_interopRequireDefault(_urls),_request=require("./../services/request.js"),_request2=_interopRequireDefault(_request),_loading=require("./../services/loading.js"),_loading2=_interopRequireDefault(_loading),_question=require("./../services/question.js"),_question2=_interopRequireDefault(_question),_checkbox=require("./../components/checkbox.js"),_checkbox2=_interopRequireDefault(_checkbox),_global=require("./../services/global.js"),_global2=_interopRequireDefault(_global),_wepyComToast=require("./../npm/wepy-com-toast/toast.js"),_wepyComToast2=_interopRequireDefault(_wepyComToast),Home=function(e){function o(){var e,t,r,n;_classCallCheck(this,o);for(var a=arguments.length,l=Array(a),u=0;u<a;u++)l[u]=arguments[u];return t=r=_possibleConstructorReturn(this,(e=o.__proto__||Object.getPrototypeOf(o)).call.apply(e,[this].concat(l))),r.config={navigationBarTitleText:"塔拓"},r.$repeat={},r.$props={checkbox:{"xmlns:v-bind":"","v-bind:checked.sync":"protocolIsRead"}},r.$events={},r.components={checkbox:_checkbox2.default,toast:_wepyComToast2.default},r.data={userInfo:null,homeData:null,showConfirmMask:!1,protocolIsRead:null,protocolIsReaded:null},r.computed={bestScore:function(){return this.homeData&&this.homeData.bestScore?_util2.default.renderScore(this.homeData.bestScore.score):{}}},r.methods={toProtocol:function(){_wepy2.default.navigateTo({url:"/pages/protocol"})},toggleProtocolCheckbox:function(){if(!r.protocolIsReaded)return void r.methods.toProtocol();r.protocolIsRead=!r.protocolIsRead},toPictures:function(){_wepy2.default.navigateTo({url:"/pages/pictures"})},toQuestion:function(){_question2.default.check(!0)},toChallenge:function(e){console.log("to challenge page",e),_wepy2.default.navigateTo({url:"/pages/challenge?id="+e})},toRank:function(){console.log("to rank page"),_wepy2.default.navigateTo({url:"/pages/rank"})},toMe:function(){console.log("to me page"),_wepy2.default.navigateTo({url:"/pages/me"})},toBooking:function(){console.log("to booking"),_wepy2.default.navigateTo({url:"/pages/booking"})},toQrcode:function(){console.log("to qrcode page"),_wepy2.default.scanCode({onlyFromCamera:!0,success:function(e){r.methods.confirmChallenge().then(function(){_request2.default.post(_urls2.default.postQrcode,{loadingDelay:0,result:JSON.stringify(e)}).then(function(e){r.methods.toChallenge(e.result.challengeId),r.methods.updateHome()})}),r.$apply()},fail:function(e){"scanCode:fail"===e.errMsg&&_wepy2.default.showAlert({content:"扫描失败"})}})},confirmOk:function(){if(!r.protocolIsRead)return void _wepy2.default.showAlert({content:"请勾选并阅读安全协议书"});r.confirmMaskDeferred.resolve(),r.showConfirmMask=!1},confirmCancel:function(){r.showConfirmMask=!1},confirmChallenge:function(){var e=(0,_defer2.default)();return r.showConfirmMask=!0,r.confirmMaskDeferred=e,e.promise},updateHome:function(){_request2.default.get(_urls2.default.home).then(function(e){var o=e.result;r.homeData=o,r.$apply(),_loading2.default.hide()})}},r.events={},n=t,_possibleConstructorReturn(r,n)}return _inherits(o,e),_createClass(o,[{key:"onShareAppMessage",value:function(e){return"button"===e.from&&console.log(e.target),{title:"塔拓",path:"/pages/home",success:function(e){_wepy2.default.showToast({title:"转发成功",duration:2e3})},fail:function(e){_wepy2.default.showAlert({content:"转发失败"})}}}},{key:"onShow",value:function(){var e=this;console.log("home on show"),_request2.default.getUserInfo().then(function(o){e.userInfo=o,_global2.default.isOkFromProtocol&&(delete _global2.default.isOkFromProtocol,e.protocolIsRead=!0),e.protocolIsReaded=o.protocolIsReaded,e.methods.updateHome(),_question2.default.check(),e.$apply()})}},{key:"onLoad",value:function(){console.log("home on load"),_loading2.default.show()}}]),o}(_wepy2.default.page);Page(require("./../npm/wepy/lib/wepy.js").default.$createPage(Home,"pages/home"));