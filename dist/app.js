"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(exports,"__esModule",{value:!0});var _getPrototypeOf=require("./npm/babel-runtime/core-js/object/get-prototype-of.js"),_getPrototypeOf2=_interopRequireDefault(_getPrototypeOf),_classCallCheck2=require("./npm/babel-runtime/helpers/classCallCheck.js"),_classCallCheck3=_interopRequireDefault(_classCallCheck2),_createClass2=require("./npm/babel-runtime/helpers/createClass.js"),_createClass3=_interopRequireDefault(_createClass2),_possibleConstructorReturn2=require("./npm/babel-runtime/helpers/possibleConstructorReturn.js"),_possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2),_inherits2=require("./npm/babel-runtime/helpers/inherits.js"),_inherits3=_interopRequireDefault(_inherits2),_wepy=require("./npm/wepy/lib/wepy.js"),_wepy2=_interopRequireDefault(_wepy),_global=require("./services/global.js"),_global2=_interopRequireDefault(_global);require("./npm/wepy-async-function/index.js");var _default=function(e){function t(){(0,_classCallCheck3.default)(this,t);var e=(0,_possibleConstructorReturn3.default)(this,(t.__proto__||(0,_getPrototypeOf2.default)(t)).call(this));return e.config={pages:["pages/home","pages/pictures","pages/question","pages/booking","pages/booking-meal","pages/rank","pages/challenge","pages/me"],window:{backgroundTextStyle:"light",navigationBarBackgroundColor:"#ea5504",navigationBarTitleText:"塔拓",navigationBarTextStyle:"#ffffff",backgroundColor:"#1f2021"}},e.globalData=_global2.default,e.use("requestfix"),e}return(0,_inherits3.default)(t,e),(0,_createClass3.default)(t,[{key:"onLaunch",value:function(){var e=_wepy2.default.showModal;_wepy2.default.showModal=function(t){t.confirmColor="#ea5504",t.cancelColor="#666666",e(t)},_wepy2.default.showAlert=function(e){e.showCancel=!1,e.confirmText="知道了",_wepy2.default.showModal(e)}}}]),t}(_wepy2.default.app);App(require("./npm/wepy/lib/wepy.js").default.$createApp(_default,void 0));