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
      pages: ['pages/home', 'pages/question', 'pages/booking', 'pages/booking-meal', 'pages/rank', 'pages/challenge', 'pages/me'],
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJnbG9iYWxEYXRhIiwidXNlIiwic2hvd01vZGFsIiwiY29uZmlybUNvbG9yIiwiY2FuY2VsQ29sb3IiLCJzaG93QWxlcnQiLCJzaG93Q2FuY2VsIiwiY29uZmlybVRleHQiLCJhcHAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7OztBQXdCRSxzQkFBYztBQUFBOztBQUFBOztBQUFBLFVBckJkQSxNQXFCYyxHQXJCTDtBQUNQQyxhQUFPLENBQ0wsWUFESyxFQUVMLGdCQUZLLEVBR0wsZUFISyxFQUlMLG9CQUpLLEVBS0wsWUFMSyxFQU1MLGlCQU5LLEVBT0wsVUFQSyxDQURBO0FBVVBDLGNBQVE7QUFDTkMsNkJBQXFCLE9BRGY7QUFFTkMsc0NBQThCLFNBRnhCO0FBR05DLGdDQUF3QixJQUhsQjtBQUlOQyxnQ0FBd0IsU0FKbEI7QUFLTkMseUJBQWlCO0FBTFg7QUFWRCxLQXFCSztBQUFBLFVBRmRDLFVBRWM7O0FBRVosVUFBS0MsR0FBTCxDQUFTLFlBQVQ7QUFGWTtBQUdiOzs7OytCQUVVO0FBQ1QsVUFBTUMsWUFBWSxlQUFLQSxTQUF2QjtBQUNBLHFCQUFLQSxTQUFMLEdBQWlCLFVBQVNWLE1BQVQsRUFBaUI7QUFDaENBLGVBQU9XLFlBQVAsR0FBc0IsU0FBdEI7QUFDQVgsZUFBT1ksV0FBUCxHQUFxQixTQUFyQjtBQUNBRixrQkFBVVYsTUFBVjtBQUNELE9BSkQ7O0FBTUEscUJBQUthLFNBQUwsR0FBaUIsVUFBU2IsTUFBVCxFQUFpQjtBQUNoQ0EsZUFBT2MsVUFBUCxHQUFvQixLQUFwQjtBQUNBZCxlQUFPZSxXQUFQLEdBQXFCLEtBQXJCO0FBQ0EsdUJBQUtMLFNBQUwsQ0FBZVYsTUFBZjtBQUNELE9BSkQ7QUFLRDs7O0VBeEMwQixlQUFLZ0IsRyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG4gIGltcG9ydCBnbG9iYWwgZnJvbSAnLi9zZXJ2aWNlcy9nbG9iYWwuanMnO1xuICBpbXBvcnQgJ3dlcHktYXN5bmMtZnVuY3Rpb24nO1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgd2VweS5hcHAge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIHBhZ2VzOiBbXG4gICAgICAgICdwYWdlcy9ob21lJyxcbiAgICAgICAgJ3BhZ2VzL3F1ZXN0aW9uJyxcbiAgICAgICAgJ3BhZ2VzL2Jvb2tpbmcnLFxuICAgICAgICAncGFnZXMvYm9va2luZy1tZWFsJyxcbiAgICAgICAgJ3BhZ2VzL3JhbmsnLFxuICAgICAgICAncGFnZXMvY2hhbGxlbmdlJyxcbiAgICAgICAgJ3BhZ2VzL21lJyxcbiAgICAgIF0sXG4gICAgICB3aW5kb3c6IHtcbiAgICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2xpZ2h0JyxcbiAgICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyNlYTU1MDQnLFxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5aGU5ouTJyxcbiAgICAgICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJyNmZmZmZmYnLFxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjMWYyMDIxJyxcbiAgICAgIH1cbiAgICB9XG5cbiAgICBnbG9iYWxEYXRhID0gZ2xvYmFsXG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIHN1cGVyKClcbiAgICAgIHRoaXMudXNlKCdyZXF1ZXN0Zml4JylcbiAgICB9XG5cbiAgICBvbkxhdW5jaCgpIHtcbiAgICAgIGNvbnN0IHNob3dNb2RhbCA9IHdlcHkuc2hvd01vZGFsO1xuICAgICAgd2VweS5zaG93TW9kYWwgPSBmdW5jdGlvbihjb25maWcpIHtcbiAgICAgICAgY29uZmlnLmNvbmZpcm1Db2xvciA9ICcjZWE1NTA0JztcbiAgICAgICAgY29uZmlnLmNhbmNlbENvbG9yID0gJyM2NjY2NjYnO1xuICAgICAgICBzaG93TW9kYWwoY29uZmlnKTtcbiAgICAgIH1cblxuICAgICAgd2VweS5zaG93QWxlcnQgPSBmdW5jdGlvbihjb25maWcpIHtcbiAgICAgICAgY29uZmlnLnNob3dDYW5jZWwgPSBmYWxzZTtcbiAgICAgICAgY29uZmlnLmNvbmZpcm1UZXh0ID0gJ+efpemBk+S6hic7XG4gICAgICAgIHdlcHkuc2hvd01vZGFsKGNvbmZpZyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiJdfQ==