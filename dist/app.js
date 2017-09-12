'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _getPrototypeOf = require('./npm/babel-runtime/core-js/object/get-prototype-of.js');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('./npm/babel-runtime/helpers/classCallCheck.js');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('./npm/babel-runtime/helpers/createClass.js');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('./npm/babel-runtime/helpers/possibleConstructorReturn.js');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('./npm/babel-runtime/helpers/inherits.js');

var _inherits3 = _interopRequireDefault(_inherits2);

var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _global = require('./services/global.js');

var _global2 = _interopRequireDefault(_global);

require('./npm/wepy-async-function/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function (_wepy$app) {
  (0, _inherits3.default)(_default, _wepy$app);

  function _default() {
    (0, _classCallCheck3.default)(this, _default);

    var _this = (0, _possibleConstructorReturn3.default)(this, (_default.__proto__ || (0, _getPrototypeOf2.default)(_default)).call(this));

    _this.config = {
      pages: ['pages/pictures', 'pages/home', 'pages/question', 'pages/booking', 'pages/booking-meal', 'pages/rank', 'pages/challenge', 'pages/me'],
      window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#ea5504',
        navigationBarTitleText: '塔拓',
        navigationBarTextStyle: '#ffffff',
        backgroundColor: '#1f2021'
      }
    };
    _this.globalData = _global2.default;

    _this.use('requestfix');
    return _this;
  }

  (0, _createClass3.default)(_default, [{
    key: 'onLaunch',
    value: function onLaunch() {
      var showModal = _wepy2.default.showModal;
      _wepy2.default.showModal = function (config) {
        config.confirmColor = '#ea5504';
        config.cancelColor = '#666666';
        showModal(config);
      };

      _wepy2.default.showAlert = function (config) {
        config.showCancel = false;
        config.confirmText = '知道了';
        _wepy2.default.showModal(config);
      };
    }
  }]);
  return _default;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_default, undefined));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJnbG9iYWxEYXRhIiwidXNlIiwic2hvd01vZGFsIiwiY29uZmlybUNvbG9yIiwiY2FuY2VsQ29sb3IiLCJzaG93QWxlcnQiLCJzaG93Q2FuY2VsIiwiY29uZmlybVRleHQiLCJhcHAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7OztBQXlCRSxzQkFBYztBQUFBOztBQUFBOztBQUFBLFVBdEJkQSxNQXNCYyxHQXRCTDtBQUNQQyxhQUFPLENBQ0wsZ0JBREssRUFFTCxZQUZLLEVBR0wsZ0JBSEssRUFJTCxlQUpLLEVBS0wsb0JBTEssRUFNTCxZQU5LLEVBT0wsaUJBUEssRUFRTCxVQVJLLENBREE7QUFXUEMsY0FBUTtBQUNOQyw2QkFBcUIsT0FEZjtBQUVOQyxzQ0FBOEIsU0FGeEI7QUFHTkMsZ0NBQXdCLElBSGxCO0FBSU5DLGdDQUF3QixTQUpsQjtBQUtOQyx5QkFBaUI7QUFMWDtBQVhELEtBc0JLO0FBQUEsVUFGZEMsVUFFYzs7QUFFWixVQUFLQyxHQUFMLENBQVMsWUFBVDtBQUZZO0FBR2I7Ozs7K0JBRVU7QUFDVCxVQUFNQyxZQUFZLGVBQUtBLFNBQXZCO0FBQ0EscUJBQUtBLFNBQUwsR0FBaUIsVUFBU1YsTUFBVCxFQUFpQjtBQUNoQ0EsZUFBT1csWUFBUCxHQUFzQixTQUF0QjtBQUNBWCxlQUFPWSxXQUFQLEdBQXFCLFNBQXJCO0FBQ0FGLGtCQUFVVixNQUFWO0FBQ0QsT0FKRDs7QUFNQSxxQkFBS2EsU0FBTCxHQUFpQixVQUFTYixNQUFULEVBQWlCO0FBQ2hDQSxlQUFPYyxVQUFQLEdBQW9CLEtBQXBCO0FBQ0FkLGVBQU9lLFdBQVAsR0FBcUIsS0FBckI7QUFDQSx1QkFBS0wsU0FBTCxDQUFlVixNQUFmO0FBQ0QsT0FKRDtBQUtEOzs7RUF6QzBCLGVBQUtnQixHIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbiAgaW1wb3J0IGdsb2JhbCBmcm9tICcuL3NlcnZpY2VzL2dsb2JhbC5qcyc7XG4gIGltcG9ydCAnd2VweS1hc3luYy1mdW5jdGlvbic7XG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LmFwcCB7XG4gICAgY29uZmlnID0ge1xuICAgICAgcGFnZXM6IFtcbiAgICAgICAgJ3BhZ2VzL3BpY3R1cmVzJyxcbiAgICAgICAgJ3BhZ2VzL2hvbWUnLFxuICAgICAgICAncGFnZXMvcXVlc3Rpb24nLFxuICAgICAgICAncGFnZXMvYm9va2luZycsXG4gICAgICAgICdwYWdlcy9ib29raW5nLW1lYWwnLFxuICAgICAgICAncGFnZXMvcmFuaycsXG4gICAgICAgICdwYWdlcy9jaGFsbGVuZ2UnLFxuICAgICAgICAncGFnZXMvbWUnLFxuICAgICAgXSxcbiAgICAgIHdpbmRvdzoge1xuICAgICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnbGlnaHQnLFxuICAgICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnI2VhNTUwNCcsXG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfloZTmi5MnLFxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiAnI2ZmZmZmZicsXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJyMxZjIwMjEnLFxuICAgICAgfVxuICAgIH1cblxuICAgIGdsb2JhbERhdGEgPSBnbG9iYWxcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgc3VwZXIoKVxuICAgICAgdGhpcy51c2UoJ3JlcXVlc3RmaXgnKVxuICAgIH1cblxuICAgIG9uTGF1bmNoKCkge1xuICAgICAgY29uc3Qgc2hvd01vZGFsID0gd2VweS5zaG93TW9kYWw7XG4gICAgICB3ZXB5LnNob3dNb2RhbCA9IGZ1bmN0aW9uKGNvbmZpZykge1xuICAgICAgICBjb25maWcuY29uZmlybUNvbG9yID0gJyNlYTU1MDQnO1xuICAgICAgICBjb25maWcuY2FuY2VsQ29sb3IgPSAnIzY2NjY2Nic7XG4gICAgICAgIHNob3dNb2RhbChjb25maWcpO1xuICAgICAgfVxuXG4gICAgICB3ZXB5LnNob3dBbGVydCA9IGZ1bmN0aW9uKGNvbmZpZykge1xuICAgICAgICBjb25maWcuc2hvd0NhbmNlbCA9IGZhbHNlO1xuICAgICAgICBjb25maWcuY29uZmlybVRleHQgPSAn55+l6YGT5LqGJztcbiAgICAgICAgd2VweS5zaG93TW9kYWwoY29uZmlnKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuIl19