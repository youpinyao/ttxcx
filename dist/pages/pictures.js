"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(exports,"__esModule",{value:!0});var _getPrototypeOf=require("./../npm/babel-runtime/core-js/object/get-prototype-of.js"),_getPrototypeOf2=_interopRequireDefault(_getPrototypeOf),_classCallCheck2=require("./../npm/babel-runtime/helpers/classCallCheck.js"),_classCallCheck3=_interopRequireDefault(_classCallCheck2),_createClass2=require("./../npm/babel-runtime/helpers/createClass.js"),_createClass3=_interopRequireDefault(_createClass2),_possibleConstructorReturn2=require("./../npm/babel-runtime/helpers/possibleConstructorReturn.js"),_possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2),_inherits2=require("./../npm/babel-runtime/helpers/inherits.js"),_inherits3=_interopRequireDefault(_inherits2),_wepy=require("./../npm/wepy/lib/wepy.js"),_wepy2=_interopRequireDefault(_wepy),_nullList=require("./../components/nullList.js"),_nullList2=_interopRequireDefault(_nullList),_request=require("./../services/request.js"),_request2=_interopRequireDefault(_request),_urls=require("./../services/urls.js"),_urls2=_interopRequireDefault(_urls),_page=require("./../services/page.js"),_page2=_interopRequireDefault(_page),_loading=require("./../services/loading.js"),_loading2=_interopRequireDefault(_loading),_wepyComToast=require("./../npm/wepy-com-toast/toast.js"),_wepyComToast2=_interopRequireDefault(_wepyComToast),Pictures=function(e){function t(){var e,o,n,l;(0,_classCallCheck3.default)(this,t);for(var s=arguments.length,a=Array(s),u=0;u<s;u++)a[u]=arguments[u];return o=n=(0,_possibleConstructorReturn3.default)(this,(e=t.__proto__||(0,_getPrototypeOf2.default)(t)).call.apply(e,[this].concat(a))),n.config={navigationBarTitleText:"塔拓",enablePullDownRefresh:!0},n.$props={"null-list":{"xmlns:wx":""}},n.$events={},n.components={"null-list":_nullList2.default,toast:_wepyComToast2.default},n.data={status:"view",pictureList:[],showDownloadModal:!1,downloadLen:0,downloadCount:0},n.computed={},n.methods={previewImage:function(e){var t=null,o=[];n.pictureList.forEach(function(n){n.items.forEach(function(n){n.id===e&&(t=n.natural),o.push(n.natural)})}),_wepy2.default.previewImage({current:t,urls:o})},selectItem:function(e){if("save"!==n.status)return void n.methods.previewImage(e);n.pictureList.forEach(function(t){t.items.forEach(function(t){t.id===e&&(t.checked=!t.checked)})}),n.$apply()},saveToPhoto:function(){var e=[];return n.pictureList.forEach(function(t){t.items.forEach(function(t){!0===t.checked&&e.push(t.natural)})}),e.length?(n.methods.doDownload(e),!0):(n.$invoke("toast","show",{title:"请勾选照片"}),!1)},unselectedAll:function(){n.pictureList.forEach(function(e){e.items.forEach(function(e){e.checked=!1})}),n.$apply()},cancelDownload:function(){_wepy2.default.showModal({content:"成功下载"+n.downloadCount+"张图片",showCancel:!1,confirmText:"知道了"}),n.methods.unselectedAll(),n.showDownloadModal=!1,n.$apply()},doDownload:function(e){function t(){var n=this;o(e[this.downloadCount],function(e,o){if(!0===e&&!0===n.showDownloadModal){if(++n.downloadCount>=n.downloadLen)return n.methods.unselectedAll(),n.showDownloadModal=!1,n.$apply(),void _wepy2.default.showModal({content:"成功下载"+n.downloadCount+"张图片",showCancel:!1,confirmText:"知道了"});n.$apply(),t.call(n)}else _wepy2.default.showModal({content:n.methods.convertError(o),showCancel:!1,confirmText:"知道了",success:function(e){_wepy2.default.showModal({content:"成功下载"+n.downloadCount+"张图片",showCancel:!1,confirmText:"知道了"})}}),n.methods.unselectedAll(),n.showDownloadModal=!1,n.$apply()})}function o(e,t){_wepy2.default.downloadFile({url:e,success:function(e){var o=e.tempFilePath;_wepy2.default.saveImageToPhotosAlbum({filePath:o,success:function(e){t(!0)},fail:function(e){t(!1,e)},complete:function(){}})},fail:function(e){t(!1,e)},complete:function(){}})}n.downloadLen=e.length,n.downloadCount=0,n.showDownloadModal=!0,n.$apply(),t.call(n)},convertError:function(e){return/cancel/g.test(e.errMsg)?"取消下载":e.errMsg},setStatus:function(e){n.status=e},getChallengePictures:function(){_request2.default.get(_urls2.default.picturesData,{challengeId:n.challengeId}).then(function(e){n.pictureList=[{title:!1,items:e.result.list}],n.$apply(),_loading2.default.hide()})},doRefresh:function(){console.log("doRefresh");var e=n.picturesPage.reset();e&&e.then(function(e){n.pictureList=e,n.$apply(),_wepy2.default.stopPullDownRefresh(),_loading2.default.hide()},function(){_wepy2.default.stopPullDownRefresh(),_loading2.default.hide()})},loadMore:function(){console.log("doInfinite");var e=n.picturesPage.next();e&&_loading2.default.show(),e&&e.then(function(e){n.pictureList=e,n.$apply(),_loading2.default.hide()},function(){_loading2.default.hide()})}},n.events={},l=o,(0,_possibleConstructorReturn3.default)(n,l)}return(0,_inherits3.default)(t,e),(0,_createClass3.default)(t,[{key:"onPullDownRefresh",value:function(){this.methods.doRefresh()}},{key:"onReachBottom",value:function(){this.methods.loadMore()}},{key:"onShow",value:function(){}},{key:"onLoad",value:function(e){var t=this;this.challengeId=e.id,console.log("pictures on load",e),this.picturesPage=_page2.default.Page({url:_urls2.default.picturesDataOfMy}),_loading2.default.show(),_request2.default.getUserInfo().then(function(e){t.userInfo=e,t.challengeId?t.methods.getChallengePictures():t.methods.doRefresh()})}}]),t}(_wepy2.default.page);Page(require("./../npm/wepy/lib/wepy.js").default.$createPage(Pictures,"pages/pictures"));