"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,t){for(var a=0;a<t.length;a++){var o=t[a];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,a,o){return a&&e(t.prototype,a),o&&e(t,o),t}}(),_wepy=require("./../npm/wepy/lib/wepy.js"),_wepy2=_interopRequireDefault(_wepy),_extend=require("./../npm/extend/index.js"),_extend2=_interopRequireDefault(_extend),_urls=require("./../services/urls.js"),_urls2=_interopRequireDefault(_urls),_loading=require("./../services/loading.js"),_loading2=_interopRequireDefault(_loading),_wepyComToast=require("./../npm/wepy-com-toast/toast.js"),_wepyComToast2=_interopRequireDefault(_wepyComToast),_request=require("./../services/request.js"),_request2=_interopRequireDefault(_request),_is=require("./../services/is.js"),_is2=_interopRequireDefault(_is),_global=require("./../services/global.js"),_global2=_interopRequireDefault(_global),_moment=require("./../npm/moment/moment.js"),_moment2=_interopRequireDefault(_moment),Booking=function(e){function t(){for(var e,a,o,n,r=arguments,l=arguments.length,u=Array(l),i=0;i<l;i++)u[i]=arguments[i];return _classCallCheck(this,t),a=o=_possibleConstructorReturn(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(u))),o.config={navigationBarTitleText:"线上预约"},o.components={toast:_wepyComToast2.default},o.data={userInfo:null,placeData:null,maxNumber:null,minNumber:null,bookingText:null,formData:{place:"",phone:"",date:"",startDate:(0,_moment2.default)().format("YYYY-MM-DD"),endDate:(0,_moment2.default)().add("day",6).format("YYYY-MM-DD"),meals:[],number:0}},o.computed={hasMeal:function(){return!_is2.default.empty(o.formData.meals)},mealData:function(){var e=0,t=o.formData.meals[e];if(!t)return{};for(;!t.amount&&o.formData.meals[e+1];)e++,t=o.formData.meals[e];return t.amount?t:{}}},o.methods={toMealList:function(e){_global2.default.meals=o.formData.meals,_wepy2.default.navigateTo({url:"/pages/booking-meal"})},doSubmit:function(e){return _is2.default.empty(o.formData.place)?void o.$invoke("toast","show",{title:"请选择游戏地点"}):_is2.default.empty(o.formData.phone)?void o.$invoke("toast","show",{title:"请填写联系电话"}):7!==(o.formData.phone+"").length&&8!==(o.formData.phone+"").length&&11!==(o.formData.phone+"").length?void o.$invoke("toast","show",{title:"请填写正确联系电话"}):_is2.default.empty(o.formData.date)?void o.$invoke("toast","show",{title:"请选择预约时间"}):(_loading2.default.show("预约中"),void _request2.default.post(_urls2.default.bookingAdd,{place:o.placeData[o.formData.place].id,phone:o.formData.phone,number:o.formData.number,meals:JSON.stringify(o.formData.meals.filter(function(e){return e.amount>0}).map(function(e){return{id:e.id,amount:e.amount}})),date:o.formData.date}).then(function(e){o.formData={place:null,meals:[],phone:null,number:o.minNumber},o.$apply(),_wepy2.default.redirectTo({url:"/pages/booking-detail?id="+e.result.bookingId}),_loading2.default.hide()},function(){_loading2.default.hide()}))},bindDateChange:function(e){o.formData.date=e.detail.value},setNumber:function(e){o.formData.number=parseInt(e.detail.value,10)},setPlace:function(e){o.formData.place=parseInt(e.detail.value,10)},setPhone:function(e){o.formData.phone=e.detail.value},updateParams:function(){_request2.default.get(_urls2.default.bookingParams).then(function(e){var t=e.result;o.placeData=t.placeList,o.maxNumber=t.maxNumber,o.minNumber=t.minNumber,o.bookingText=t.bookingText,o.formData.number=t.minNumber,o.formData.meals=t.meals,_is2.default.empty(o.formData.meals)||o.formData.meals.forEach(function(e){e.amount=0}),o.$apply(),_loading2.default.hide()})}},o.events={"update-meal":function(){console.log("update meal",r)}},n=a,_possibleConstructorReturn(o,n)}return _inherits(t,e),_createClass(t,[{key:"onShow",value:function(){_is2.default.empty(_global2.default.meals)||(this.formData.meals=(0,_extend2.default)(!0,[],_global2.default.meals)||[])}},{key:"onLoad",value:function(){var e=this;console.log("rank on load"),_loading2.default.show(),_global2.default.meals=[],_request2.default.getUserInfo().then(function(t){e.userInfo=t,e.methods.updateParams()})}}]),t}(_wepy2.default.page);Page(require("./../npm/wepy/lib/wepy.js").default.$createPage(Booking,"pages/booking"));