"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(exports,"__esModule",{value:!0});var _stringify=require("./../npm/babel-runtime/core-js/json/stringify.js"),_stringify2=_interopRequireDefault(_stringify),_getPrototypeOf=require("./../npm/babel-runtime/core-js/object/get-prototype-of.js"),_getPrototypeOf2=_interopRequireDefault(_getPrototypeOf),_classCallCheck2=require("./../npm/babel-runtime/helpers/classCallCheck.js"),_classCallCheck3=_interopRequireDefault(_classCallCheck2),_createClass2=require("./../npm/babel-runtime/helpers/createClass.js"),_createClass3=_interopRequireDefault(_createClass2),_possibleConstructorReturn2=require("./../npm/babel-runtime/helpers/possibleConstructorReturn.js"),_possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2),_inherits2=require("./../npm/babel-runtime/helpers/inherits.js"),_inherits3=_interopRequireDefault(_inherits2),_wepy=require("./../npm/wepy/lib/wepy.js"),_wepy2=_interopRequireDefault(_wepy),_request=require("./../services/request.js"),_request2=_interopRequireDefault(_request),_loading=require("./../services/loading.js"),_loading2=_interopRequireDefault(_loading),_urls=require("./../services/urls.js"),_urls2=_interopRequireDefault(_urls),_pay=require("./../services/pay.js"),_pay2=_interopRequireDefault(_pay),_defer=require("./../services/defer.js"),_defer2=_interopRequireDefault(_defer),_wepyComToast=require("./../npm/wepy-com-toast/toast.js"),_wepyComToast2=_interopRequireDefault(_wepyComToast),BookingDetail=function(e){function t(){var e,i,a,r;(0,_classCallCheck3.default)(this,t);for(var s=arguments.length,n=Array(s),l=0;l<s;l++)n[l]=arguments[l];return i=a=(0,_possibleConstructorReturn3.default)(this,(e=t.__proto__||(0,_getPrototypeOf2.default)(t)).call.apply(e,[this].concat(n))),a.config={navigationBarTitleText:""},a.components={toast:_wepyComToast2.default},a.data={id:"",type:"",selectedPayWay:null,selectedPayWayIndex:null,detail:null,isHidePayTip:!0,isHideRefundTip:!0},a.computed={},a.methods={hidePayTip:function(){a.isHidePayTip=!0},hideRefundTip:function(){a.isHideRefundTip=!0},setPayWay:function(e){a.selectedPayWayIndex=parseInt(e.detail.value,10),a.selectedPayWay=a.detail.payWays[a.selectedPayWayIndex],"OFFLINE"===a.selectedPayWay.type&&(a.isHidePayTip=!1)},doSubmit:function(){_request2.default.post(_urls2.default.bookingPay,{bookingId:a.id,payWay:a.selectedPayWay.type}).then(function(e){if("ONLINE"!==a.selectedPayWay.type){var t=(0,_defer2.default)();return setTimeout(function(){t.resolve()},50),t.promise}return _pay2.default.doPay(e.result)}).then(function(e){_wepy2.default.redirectTo({url:"/pages/booking-pay-success?id="+a.id})},function(e){a.$invoke("toast","show",{title:(0,_stringify2.default)(e)})})},doRefund:function(){_request2.default.post(_urls2.default.bookingRefund,{bookingId:a.id}).then(function(e){_wepy2.default.redirectTo({url:"/pages/booking-refund-success?id="+a.id})})},showRefund:function(){a.isHideRefundTip=!1},loadData:function(){_loading2.default.show(),_request2.default.get(_urls2.default.bookingDetail,{bookingId:a.id}).then(function(e){a.detail=e.result,a.detail.payWays.forEach(function(e,t){a.detail.selectedPayWay&&e.type===a.detail.selectedPayWay.type&&(a.selectedPayWayIndex=t)}),null===a.selectedPayWayIndex&&(a.selectedPayWayIndex=0),a.selectedPayWay=a.detail.payWays[a.selectedPayWayIndex],a.$apply()}).finally(function(){_loading2.default.hide()})}},a.events={},r=i,(0,_possibleConstructorReturn3.default)(a,r)}return(0,_inherits3.default)(t,e),(0,_createClass3.default)(t,[{key:"onShow",value:function(){this.methods.loadData()}},{key:"onLoad",value:function(e){console.log("booking detail on load"),_wepy2.default.setNavigationBarTitle({title:"settle"===e.type?"确定订单":"预约记录"}),this.type=e.type,this.id=e.id}}]),t}(_wepy2.default.page);Page(require("./../npm/wepy/lib/wepy.js").default.$createPage(BookingDetail,"pages/booking-detail"));