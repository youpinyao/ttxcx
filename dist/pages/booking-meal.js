"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var l=t[n];l.enumerable=l.enumerable||!1,l.configurable=!0,"value"in l&&(l.writable=!0),Object.defineProperty(e,l.key,l)}}return function(t,n,l){return n&&e(t.prototype,n),l&&e(t,l),t}}(),_wepy=require("./../npm/wepy/lib/wepy.js"),_wepy2=_interopRequireDefault(_wepy),_extend=require("./../npm/extend/index.js"),_extend2=_interopRequireDefault(_extend),_mealItem=require("./../components/meal-item.js"),_mealItem2=_interopRequireDefault(_mealItem),_global=require("./../services/global.js"),_global2=_interopRequireDefault(_global),_nullList=require("./../components/nullList.js"),_nullList2=_interopRequireDefault(_nullList),BookingMeal=function(e){function t(){var e,n,l,o;_classCallCheck(this,t);for(var r=arguments.length,i=Array(r),a=0;a<r;a++)i[a]=arguments[a];return n=l=_possibleConstructorReturn(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(i))),l.config={navigationBarTitleText:"线上预约"},l.$repeat={meals:{com:"meal-item",props:"item.sync"}},l.$props={"meal-item":{"xmlns:v-bind":{value:"",for:"meals",item:"item",index:"index",key:"index"},"v-bind:item.sync":{value:"item",type:"item",for:"meals",item:"item",index:"index",key:"index"}},"null-list":{"xmlns:wx":""}},l.$events={},l.components={"meal-item":_mealItem2.default,"null-list":_nullList2.default},l.data={meals:[]},l.computed={},l.methods={doSave:function(e){_global2.default.meals=(0,_extend2.default)(!0,[],l.meals),_wepy2.default.navigateBack()}},l.events={},o=n,_possibleConstructorReturn(l,o)}return _inherits(t,e),_createClass(t,[{key:"onShow",value:function(){this.meals=(0,_extend2.default)(!0,[],_global2.default.meals)||[]}},{key:"onLoad",value:function(){console.log("booking meal on load")}}]),t}(_wepy2.default.page);Page(require("./../npm/wepy/lib/wepy.js").default.$createPage(BookingMeal,"pages/booking-meal"));