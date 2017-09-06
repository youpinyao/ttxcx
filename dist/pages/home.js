"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(exports,"__esModule",{value:!0});var _stringify=require("./../npm/babel-runtime/core-js/json/stringify.js"),_stringify2=_interopRequireDefault(_stringify),_getPrototypeOf=require("./../npm/babel-runtime/core-js/object/get-prototype-of.js"),_getPrototypeOf2=_interopRequireDefault(_getPrototypeOf),_classCallCheck2=require("./../npm/babel-runtime/helpers/classCallCheck.js"),_classCallCheck3=_interopRequireDefault(_classCallCheck2),_createClass2=require("./../npm/babel-runtime/helpers/createClass.js"),_createClass3=_interopRequireDefault(_createClass2),_possibleConstructorReturn2=require("./../npm/babel-runtime/helpers/possibleConstructorReturn.js"),_possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2),_inherits2=require("./../npm/babel-runtime/helpers/inherits.js"),_inherits3=_interopRequireDefault(_inherits2),_wepy=require("./../npm/wepy/lib/wepy.js"),_wepy2=_interopRequireDefault(_wepy),_defer=require("./../services/defer.js"),_defer2=_interopRequireDefault(_defer),_util=require("./../services/util.js"),_util2=_interopRequireDefault(_util),_urls=require("./../services/urls.js"),_urls2=_interopRequireDefault(_urls),_request=require("./../services/request.js"),_request2=_interopRequireDefault(_request),_loading=require("./../services/loading.js"),_loading2=_interopRequireDefault(_loading),_question=require("./../services/question.js"),_question2=_interopRequireDefault(_question),Home=function(e){function t(){var e,o,r,n;(0,_classCallCheck3.default)(this,t);for(var s=arguments.length,u=Array(s),a=0;a<s;a++)u[a]=arguments[a];return o=r=(0,_possibleConstructorReturn3.default)(this,(e=t.__proto__||(0,_getPrototypeOf2.default)(t)).call.apply(e,[this].concat(u))),r.config={navigationBarTitleText:"塔拓"},r.components={},r.data={userInfo:null,homeData:null,showConfirmMask:!1},r.computed={bestScore:function(){return this.homeData&&this.homeData.bestScore?_util2.default.renderScore(this.homeData.bestScore.score):{}}},r.methods={toChallenge:function(e){console.log("to challenge page",e),_wepy2.default.navigateTo({url:"/pages/challenge?id="+e})},toRank:function(){console.log("to rank page"),_wepy2.default.navigateTo({url:"/pages/rank"})},toMe:function(){console.log("to me page"),_wepy2.default.navigateTo({url:"/pages/me"})},toBooking:function(){console.log("to booking"),_wepy2.default.navigateTo({url:"/pages/booking"})},toQrcode:function(){console.log("to qrcode page"),_wepy2.default.scanCode({onlyFromCamera:!0,success:function(e){r.methods.confirmChallenge().then(function(){_request2.default.post(_urls2.default.postQrcode,{loadingDelay:0,result:(0,_stringify2.default)(e)}).then(function(e){r.methods.toChallenge(e.result.challengeId),r.methods.updateHome()})}),r.$apply()},fail:function(e){}})},confirmOk:function(){r.confirmMaskDeferred.resolve(),r.showConfirmMask=!1},confirmCancel:function(){r.showConfirmMask=!1},confirmChallenge:function(){var e=(0,_defer2.default)();return r.showConfirmMask=!0,r.confirmMaskDeferred=e,e.promise},updateHome:function(){_request2.default.get(_urls2.default.home).then(function(e){var t=e.result;r.homeData=t,r.$apply(),_loading2.default.hide()})}},r.events={},n=o,(0,_possibleConstructorReturn3.default)(r,n)}return(0,_inherits3.default)(t,e),(0,_createClass3.default)(t,[{key:"onShareAppMessage",value:function(e){return"button"===e.from&&console.log(e.target),{title:"塔拓",path:"/pages/home",success:function(e){_wepy2.default.showToast({title:"转发成功",duration:2e3})},fail:function(e){_wepy2.default.showAlert({content:"转发失败"})}}}},{key:"onShow",value:function(){var e=this;console.log("home on show"),_request2.default.getUserInfo().then(function(t){e.userInfo=t,e.methods.updateHome(),_question2.default.check()})}},{key:"onLoad",value:function(){console.log("home on load"),_loading2.default.show()}}]),t}(_wepy2.default.page);Page(require("./../npm/wepy/lib/wepy.js").default.$createPage(Home,"pages/home"));