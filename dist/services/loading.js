'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hideLoadingSt = null;

function showLoading(config) {
  if (!config) {
    config = {};
  }

  if (typeof config === 'string') {
    var t = config;
    config = {
      title: t
    };
  }

  clearTimeout(hideLoadingSt);
  _wepy2.default.hideToast();

  _wepy2.default.showToast({
    title: config.title || '努力加载中',
    icon: config.icon || 'loading',
    duration: config.duration || 10000,
    mask: true
  });
}

function hideLoading() {
  hideLoadingSt = setTimeout(function () {
    _wepy2.default.hideToast();
  }, 300);
}

exports.default = {
  show: showLoading,
  hide: hideLoading
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvYWRpbmcuanMiXSwibmFtZXMiOlsiaGlkZUxvYWRpbmdTdCIsInNob3dMb2FkaW5nIiwiY29uZmlnIiwidCIsInRpdGxlIiwiY2xlYXJUaW1lb3V0IiwiaGlkZVRvYXN0Iiwic2hvd1RvYXN0IiwiaWNvbiIsImR1cmF0aW9uIiwibWFzayIsImhpZGVMb2FkaW5nIiwic2V0VGltZW91dCIsInNob3ciLCJoaWRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7Ozs7O0FBRUEsSUFBSUEsZ0JBQWdCLElBQXBCOztBQUVBLFNBQVNDLFdBQVQsQ0FBcUJDLE1BQXJCLEVBQTZCO0FBQzNCLE1BQUksQ0FBQ0EsTUFBTCxFQUFhO0FBQ1hBLGFBQVMsRUFBVDtBQUNEOztBQUVELE1BQUksT0FBT0EsTUFBUCxLQUFrQixRQUF0QixFQUFnQztBQUM5QixRQUFJQyxJQUFJRCxNQUFSO0FBQ0FBLGFBQVM7QUFDUEUsYUFBT0Q7QUFEQSxLQUFUO0FBR0Q7O0FBRURFLGVBQWFMLGFBQWI7QUFDQSxpQkFBS00sU0FBTDs7QUFFQSxpQkFBS0MsU0FBTCxDQUFlO0FBQ2JILFdBQU9GLE9BQU9FLEtBQVAsSUFBZ0IsT0FEVjtBQUViSSxVQUFNTixPQUFPTSxJQUFQLElBQWUsU0FGUjtBQUdiQyxjQUFVUCxPQUFPTyxRQUFQLElBQW1CLEtBSGhCO0FBSWJDLFVBQU07QUFKTyxHQUFmO0FBTUQ7O0FBRUQsU0FBU0MsV0FBVCxHQUF1QjtBQUNyQlgsa0JBQWdCWSxXQUFXLFlBQVk7QUFDckMsbUJBQUtOLFNBQUw7QUFDRCxHQUZlLEVBRWIsR0FGYSxDQUFoQjtBQUdEOztrQkFFYztBQUNiTyxRQUFNWixXQURPO0FBRWJhLFFBQU1IO0FBRk8sQyIsImZpbGUiOiJsb2FkaW5nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5cbmxldCBoaWRlTG9hZGluZ1N0ID0gbnVsbDtcblxuZnVuY3Rpb24gc2hvd0xvYWRpbmcoY29uZmlnKSB7XG4gIGlmICghY29uZmlnKSB7XG4gICAgY29uZmlnID0ge31cbiAgfVxuXG4gIGlmICh0eXBlb2YgY29uZmlnID09PSAnc3RyaW5nJykge1xuICAgIHZhciB0ID0gY29uZmlnO1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIHRpdGxlOiB0XG4gICAgfVxuICB9XG5cbiAgY2xlYXJUaW1lb3V0KGhpZGVMb2FkaW5nU3QpO1xuICB3ZXB5LmhpZGVUb2FzdCgpO1xuXG4gIHdlcHkuc2hvd1RvYXN0KHtcbiAgICB0aXRsZTogY29uZmlnLnRpdGxlIHx8ICfliqrlipvliqDovb3kuK0nLFxuICAgIGljb246IGNvbmZpZy5pY29uIHx8ICdsb2FkaW5nJyxcbiAgICBkdXJhdGlvbjogY29uZmlnLmR1cmF0aW9uIHx8IDEwMDAwLFxuICAgIG1hc2s6IHRydWUsXG4gIH0pXG59XG5cbmZ1bmN0aW9uIGhpZGVMb2FkaW5nKCkge1xuICBoaWRlTG9hZGluZ1N0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgd2VweS5oaWRlVG9hc3QoKTtcbiAgfSwgMzAwKVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHNob3c6IHNob3dMb2FkaW5nLFxuICBoaWRlOiBoaWRlTG9hZGluZyxcbn1cbiJdfQ==