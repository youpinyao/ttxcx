'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _getPrototypeOf = require('./../npm/babel-runtime/core-js/object/get-prototype-of.js');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('./../npm/babel-runtime/helpers/classCallCheck.js');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('./../npm/babel-runtime/helpers/createClass.js');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('./../npm/babel-runtime/helpers/possibleConstructorReturn.js');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('./../npm/babel-runtime/helpers/inherits.js');

var _inherits3 = _interopRequireDefault(_inherits2);

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _is = require('./../services/is.js');

var _is2 = _interopRequireDefault(_is);

var _util = require('./../services/util.js');

var _util2 = _interopRequireDefault(_util);

var _dots = require('./../services/dots.js');

var _dots2 = _interopRequireDefault(_dots);

var _urls = require('./../services/urls.js');

var _urls2 = _interopRequireDefault(_urls);

var _request = require('./../services/request.js');

var _request2 = _interopRequireDefault(_request);

var _loading = require('./../services/loading.js');

var _loading2 = _interopRequireDefault(_loading);

var _question = require('./../services/question.js');

var _question2 = _interopRequireDefault(_question);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Booking = function (_wepy$page) {
  (0, _inherits3.default)(Booking, _wepy$page);

  function Booking() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Booking);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Booking.__proto__ || (0, _getPrototypeOf2.default)(Booking)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: ''
    }, _this.canvasIdErrorCallback = function (e) {
      console.error('canvas error', e.detail.errMsg);
    }, _this.components = {}, _this.data = {
      expand: false,
      userInfo: null,
      systemInfo: null,
      id: null,
      scrollTop: 0,
      dots: null,
      screenScale: 1,
      canvasWidth: null,
      canvasHeight: null,
      challengeData: null,
      timer: null,
      hasPoint: false,
      pointPosition: null,
      drawDots: [],
      drawLines: []
    }, _this.computed = {}, _this.methods = {
      doExpand: function doExpand(expand) {
        _this.expand = expand === 'true';
      },
      hasUpdateCanvas: function hasUpdateCanvas(data) {
        if (_is2.default.empty(data)) {
          return false;
        }
        if (_is2.default.empty(_this.challengeData)) {
          return true;
        }

        var count = 0;

        _util2.default.each(_this.challengeData, function (d, k) {
          if (d !== data[k] && ['checkpointCount', 'checkpointCurrent', 'status', 'isEnd'].indexOf(k) !== -1) {
            count++;
          }
        });

        return count > 0;
      },
      updateChallege: function updateChallege() {
        console.log('check update challege');
        _request2.default.get(_urls2.default.challengeData, {
          challengeId: _this.id
        }).then(function (_ref2) {
          var result = _ref2.result;

          clearTimeout(_this.timer);
          _this.timer = setTimeout(function () {
            _this.methods.updateChallege();
          }, 6000);

          var hasUpdate = _this.methods.hasUpdateCanvas(result);

          result.scoreFormat = _util2.default.renderScore(result.score);
          _this.challengeData = result;

          if (hasUpdate) {
            console.log('update challege canvas');
            _this.methods.drawDot();
            _question2.default.check();
            setTimeout(function () {
              _this.scrollTop = _this.scrollTop + 1;
              _this.$apply();
            });

            _wepy2.default.setNavigationBarTitle({
              title: _this.challengeData.isEnd ? '战绩详情' : '塔拓时刻'
            });
          }

          _this.$apply();
          _loading2.default.hide();
        });
      },
      updatePoint: function updatePoint(dot) {
        var hasPoint = _this.challengeData.status === 0;
        _this.hasPoint = hasPoint;
        _this.pointPosition = {
          x: dot.x / 2 - 25 / _this.screenScale,
          y: dot.y / 2 - 25 / _this.screenScale
        };
      },
      drawDot: function drawDot() {
        // const ctx = this.context;
        var scale = _this.screenScale;
        var offsetTop = 140 / scale;
        var challengeData = _this.challengeData;
        var dots = _this.dots.map(function (d) {
          return {
            x: d.x,
            y: d.y
          };
        });

        var orange = '#df540e';
        var white = '#ffffff';
        var grey = '#333333';
        var lineGrey = '#8c8c8d';
        var ing = '#ffcd55';

        if (challengeData.checkpointCount > dots.length - 1) {
          var count = challengeData.checkpointCount - dots.length + 1;
          var len = dots.length - 2;

          var _loop = function _loop(i) {
            var j = i <= len ? i : i % len;
            var dot = dots[j];
            var offset = 200;

            dots = dots.map(function (d) {
              d.y += offset;
              return d;
            });
            dots.push({
              x: dot.x,
              y: offsetTop
            });
          };

          for (var i = 0; i < count; i++) {
            _loop(i);
          }
        } else if (challengeData.checkpointCount < dots.length - 1) {
          dots.splice(challengeData.checkpointCount + 1, dots.length - challengeData.checkpointCount);
        }

        if (dots[0].y / 2 - dots[dots.length - 1].y / 2 + offsetTop < _this.systemInfo.windowHeight) {
          var _offset = dots[0].y - _this.systemInfo.windowHeight * 2;
          dots = dots.map(function (d) {
            d.y -= _offset;
            return d;
          });
        }

        _this.canvasHeight = dots[0].y / 2;
        _this.canvasWidth = _this.systemInfo.windowWidth;

        // ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        // ctx.draw();

        // ctx.setLineWidth(1);
        // ctx.scale(this.systemInfo.pixelRatio, this.systemInfo.pixelRatio);

        // ctx.beginPath();
        var drawLines = [];
        dots.forEach(function (dot, i) {
          var nextDot = dots[i + 1];
          if (nextDot) {
            var x = Math.abs(nextDot.x / 2 - dot.x / 2);
            var y = Math.abs(nextDot.y / 2 - dot.y / 2);
            var width = Math.pow(Math.pow(x, 2) + Math.pow(y, 2), 0.5);
            var rotate = Math.asin(y / width) * 180 / Math.PI;

            if (nextDot.x >= dot.x && nextDot.y <= dot.y) {
              rotate = -rotate;
            } else if (nextDot.x >= dot.x && nextDot.y > dot.y) {
              // rotate = rotate;
            } else if (nextDot.x < dot.x && nextDot.y <= dot.y) {
              rotate = rotate - 180;
            } else if (nextDot.x < dot.x && nextDot.y > dot.y) {
              rotate = -rotate - 180;
            }

            drawLines.push({
              x: dot.x / 2,
              y: dot.y / 2,
              width: width,
              rotate: rotate,
              color: lineGrey
            });
          }
        });
        _this.drawLines = drawLines;

        var drawDots = [];
        dots.forEach(function (dot, i) {
          var drawDot = {};
          if (i !== 0) {
            if (challengeData.checkpointCurrent > i) {
              drawDot = {
                size: 12,
                x: dot.x / 2 - 6,
                y: dot.y / 2 - 6,
                color: orange,
                fontColor: orange
              };
            } else if (challengeData.checkpointCurrent === i) {
              if (challengeData.status === 2) {
                drawDot = {
                  size: 24,
                  x: dot.x / 2 - 12,
                  y: dot.y / 2 - 12,
                  color: grey,
                  fontColor: grey,
                  fail: true
                };
              } else {
                drawDot = {
                  size: 12,
                  x: dot.x / 2 - 6,
                  y: dot.y / 2 - 6,
                  color: orange,
                  fontColor: challengeData.status === 0 ? ing : orange,
                  ing: challengeData.status === 0
                };
              }
              _this.methods.updatePoint(dot);
              _this.scrollTop = parseInt(dot.y / 2 - _this.systemInfo.windowHeight + 100, 10);
            } else {
              drawDot = {
                size: 12,
                x: dot.x / 2 - 6,
                y: dot.y / 2 - 6,
                color: white,
                fontColor: white
              };
            }

            if (i === 1) {
              drawDot.text = '1st';
            } else if (i === 1) {
              drawDot.text = '2nd';
            } else if (i === 1) {
              drawDot.text = '3rd';
            } else {
              drawDot.text = i + 'th';
            }
            drawDots.push(drawDot);
          }
        });

        _this.drawDots = drawDots;
      }
    }, _this.events = {}, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Booking, [{
    key: 'onShow',
    value: function onShow() {
      if (this.isReady) {
        clearTimeout(this.timer);
        this.methods.updateChallege();
      }
    }
  }, {
    key: 'onHide',
    value: function onHide() {
      clearTimeout(this.timer);
    }
  }, {
    key: 'onLoad',
    value: function onLoad(option) {
      console.log('challenge on load', option);
      this.id = option.id;
      _loading2.default.show();
    }
  }, {
    key: 'onReady',
    value: function onReady() {
      var _this2 = this;

      var self = this;
      var systemInfo = _wepy2.default.getSystemInfoSync();
      var scale = 375 / systemInfo.windowWidth;
      this.isReady = true;
      this.systemInfo = systemInfo;
      this.context = _wepy2.default.createCanvasContext('dotsCanvas');
      this.screenScale = scale;
      this.dots = _dots2.default.map(function (d) {
        return {
          x: d.x / scale,
          y: d.y / scale
        };
      });

      _request2.default.getUserInfo().then(function (d) {
        self.userInfo = d;
        clearTimeout(_this2.timer);
        _this2.methods.updateChallege();
      });
    }
  }]);
  return Booking;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Booking , 'pages/challenge'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNoYWxsZW5nZS5qcyJdLCJuYW1lcyI6WyJCb29raW5nIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImNhbnZhc0lkRXJyb3JDYWxsYmFjayIsImUiLCJjb25zb2xlIiwiZXJyb3IiLCJkZXRhaWwiLCJlcnJNc2ciLCJjb21wb25lbnRzIiwiZGF0YSIsImV4cGFuZCIsInVzZXJJbmZvIiwic3lzdGVtSW5mbyIsImlkIiwic2Nyb2xsVG9wIiwiZG90cyIsInNjcmVlblNjYWxlIiwiY2FudmFzV2lkdGgiLCJjYW52YXNIZWlnaHQiLCJjaGFsbGVuZ2VEYXRhIiwidGltZXIiLCJoYXNQb2ludCIsInBvaW50UG9zaXRpb24iLCJkcmF3RG90cyIsImRyYXdMaW5lcyIsImNvbXB1dGVkIiwibWV0aG9kcyIsImRvRXhwYW5kIiwiaGFzVXBkYXRlQ2FudmFzIiwiZW1wdHkiLCJjb3VudCIsImVhY2giLCJkIiwiayIsImluZGV4T2YiLCJ1cGRhdGVDaGFsbGVnZSIsImxvZyIsImdldCIsImNoYWxsZW5nZUlkIiwidGhlbiIsInJlc3VsdCIsImNsZWFyVGltZW91dCIsInNldFRpbWVvdXQiLCJoYXNVcGRhdGUiLCJzY29yZUZvcm1hdCIsInJlbmRlclNjb3JlIiwic2NvcmUiLCJkcmF3RG90IiwiY2hlY2siLCIkYXBwbHkiLCJzZXROYXZpZ2F0aW9uQmFyVGl0bGUiLCJ0aXRsZSIsImlzRW5kIiwiaGlkZSIsInVwZGF0ZVBvaW50IiwiZG90Iiwic3RhdHVzIiwieCIsInkiLCJzY2FsZSIsIm9mZnNldFRvcCIsIm1hcCIsIm9yYW5nZSIsIndoaXRlIiwiZ3JleSIsImxpbmVHcmV5IiwiaW5nIiwiY2hlY2twb2ludENvdW50IiwibGVuZ3RoIiwibGVuIiwiaSIsImoiLCJvZmZzZXQiLCJwdXNoIiwic3BsaWNlIiwid2luZG93SGVpZ2h0Iiwid2luZG93V2lkdGgiLCJmb3JFYWNoIiwibmV4dERvdCIsIk1hdGgiLCJhYnMiLCJ3aWR0aCIsInBvdyIsInJvdGF0ZSIsImFzaW4iLCJQSSIsImNvbG9yIiwiY2hlY2twb2ludEN1cnJlbnQiLCJzaXplIiwiZm9udENvbG9yIiwiZmFpbCIsInBhcnNlSW50IiwidGV4dCIsImV2ZW50cyIsImlzUmVhZHkiLCJvcHRpb24iLCJzaG93Iiwic2VsZiIsImdldFN5c3RlbUluZm9TeW5jIiwiY29udGV4dCIsImNyZWF0ZUNhbnZhc0NvbnRleHQiLCJnZXRVc2VySW5mbyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztJQUVxQkEsTzs7Ozs7Ozs7Ozs7Ozs7OE1BQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMscUIsR0FBd0IsVUFBQ0MsQ0FBRCxFQUFPO0FBQzdCQyxjQUFRQyxLQUFSLENBQWMsY0FBZCxFQUE4QkYsRUFBRUcsTUFBRixDQUFTQyxNQUF2QztBQUNELEssUUFFREMsVSxHQUFhLEUsUUFJYkMsSSxHQUFPO0FBQ0xDLGNBQVEsS0FESDtBQUVMQyxnQkFBVSxJQUZMO0FBR0xDLGtCQUFZLElBSFA7QUFJTEMsVUFBSSxJQUpDO0FBS0xDLGlCQUFXLENBTE47QUFNTEMsWUFBTSxJQU5EO0FBT0xDLG1CQUFhLENBUFI7QUFRTEMsbUJBQWEsSUFSUjtBQVNMQyxvQkFBYyxJQVRUO0FBVUxDLHFCQUFlLElBVlY7QUFXTEMsYUFBTyxJQVhGO0FBWUxDLGdCQUFVLEtBWkw7QUFhTEMscUJBQWUsSUFiVjtBQWNMQyxnQkFBVSxFQWRMO0FBZUxDLGlCQUFXO0FBZk4sSyxRQWtCUEMsUSxHQUFXLEUsUUFJWEMsTyxHQUFVO0FBQ1JDLGdCQUFVLGtCQUFDakIsTUFBRCxFQUFZO0FBQ3BCLGNBQUtBLE1BQUwsR0FBY0EsV0FBVyxNQUF6QjtBQUNELE9BSE87QUFJUmtCLHVCQUFpQix5QkFBQ25CLElBQUQsRUFBVTtBQUN6QixZQUFJLGFBQUdvQixL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Q0EsV0FBS3BGLFdBQUwsR0FBbUIyQyxLQUFuQjtBQUNBLFdBQUs1QyxJQUFMLEdBQVksZUFBUzhDLEdBQVQsQ0FBYSxhQUFLO0FBQzVCLGVBQU87QUFDTEosYUFBR3pCLEVBQUV5QixDQUFGLEdBQU1FLEtBREo7QUFFTEQsYUFBRzFCLEVBQUUwQixDQUFGLEdBQU1DO0FBRkosU0FBUDtBQUlELE9BTFcsQ0FBWjs7QUFPQSx3QkFBUTBDLFdBQVIsR0FBc0I5RCxJQUF0QixDQUEyQixhQUFLO0FBQzlCMEQsYUFBS3RGLFFBQUwsR0FBZ0JxQixDQUFoQjtBQUNBUyxxQkFBYSxPQUFLckIsS0FBbEI7QUFDQSxlQUFLTSxPQUFMLENBQWFTLGNBQWI7QUFDRCxPQUpEO0FBS0Q7OztFQWxTa0MsZUFBS21FLEk7O2tCQUFyQnZHLE8iLCJmaWxlIjoiY2hhbGxlbmdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuICBpbXBvcnQgaXMgZnJvbSAnLi4vc2VydmljZXMvaXMuanMnO1xuICBpbXBvcnQgdXRpbCBmcm9tICcuLi9zZXJ2aWNlcy91dGlsLmpzJztcbiAgaW1wb3J0IGluaXREb3RzIGZyb20gJy4uL3NlcnZpY2VzL2RvdHMuanMnO1xuICBpbXBvcnQgdXJscyBmcm9tICcuLi9zZXJ2aWNlcy91cmxzLmpzJztcbiAgaW1wb3J0IHJlcXVlc3QgZnJvbSAnLi4vc2VydmljZXMvcmVxdWVzdC5qcyc7XG4gIGltcG9ydCBsb2FkaW5nIGZyb20gJy4uL3NlcnZpY2VzL2xvYWRpbmcuanMnO1xuICBpbXBvcnQgcXVlc3Rpb24gZnJvbSAnLi4vc2VydmljZXMvcXVlc3Rpb24uanMnO1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvb2tpbmcgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICcnLFxuICAgIH1cbiAgICBjYW52YXNJZEVycm9yQ2FsbGJhY2sgPSAoZSkgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcignY2FudmFzIGVycm9yJywgZS5kZXRhaWwuZXJyTXNnKVxuICAgIH1cblxuICAgIGNvbXBvbmVudHMgPSB7XG5cbiAgICB9XG5cbiAgICBkYXRhID0ge1xuICAgICAgZXhwYW5kOiBmYWxzZSxcbiAgICAgIHVzZXJJbmZvOiBudWxsLFxuICAgICAgc3lzdGVtSW5mbzogbnVsbCxcbiAgICAgIGlkOiBudWxsLFxuICAgICAgc2Nyb2xsVG9wOiAwLFxuICAgICAgZG90czogbnVsbCxcbiAgICAgIHNjcmVlblNjYWxlOiAxLFxuICAgICAgY2FudmFzV2lkdGg6IG51bGwsXG4gICAgICBjYW52YXNIZWlnaHQ6IG51bGwsXG4gICAgICBjaGFsbGVuZ2VEYXRhOiBudWxsLFxuICAgICAgdGltZXI6IG51bGwsXG4gICAgICBoYXNQb2ludDogZmFsc2UsXG4gICAgICBwb2ludFBvc2l0aW9uOiBudWxsLFxuICAgICAgZHJhd0RvdHM6IFtdLFxuICAgICAgZHJhd0xpbmVzOiBbXSxcbiAgICB9XG5cbiAgICBjb21wdXRlZCA9IHtcblxuICAgIH1cblxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBkb0V4cGFuZDogKGV4cGFuZCkgPT4ge1xuICAgICAgICB0aGlzLmV4cGFuZCA9IGV4cGFuZCA9PT0gJ3RydWUnO1xuICAgICAgfSxcbiAgICAgIGhhc1VwZGF0ZUNhbnZhczogKGRhdGEpID0+IHtcbiAgICAgICAgaWYgKGlzLmVtcHR5KGRhdGEpKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpcy5lbXB0eSh0aGlzLmNoYWxsZW5nZURhdGEpKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgY291bnQgPSAwO1xuXG4gICAgICAgIHV0aWwuZWFjaCh0aGlzLmNoYWxsZW5nZURhdGEsIChkLCBrKSA9PiB7XG4gICAgICAgICAgaWYgKGQgIT09IGRhdGFba10gJiYgWydjaGVja3BvaW50Q291bnQnLCAnY2hlY2twb2ludEN1cnJlbnQnLCAnc3RhdHVzJywgJ2lzRW5kJ10uaW5kZXhPZihcbiAgICAgICAgICAgICAgaykgIT09IC0xKSB7XG4gICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGNvdW50ID4gMDtcbiAgICAgIH0sXG4gICAgICB1cGRhdGVDaGFsbGVnZTogKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnY2hlY2sgdXBkYXRlIGNoYWxsZWdlJyk7XG4gICAgICAgIHJlcXVlc3QuZ2V0KHVybHMuY2hhbGxlbmdlRGF0YSwge1xuICAgICAgICAgIGNoYWxsZW5nZUlkOiB0aGlzLmlkLFxuICAgICAgICB9KS50aGVuKCh7XG4gICAgICAgICAgcmVzdWx0LFxuICAgICAgICB9KSA9PiB7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZXIpO1xuICAgICAgICAgIHRoaXMudGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMubWV0aG9kcy51cGRhdGVDaGFsbGVnZSgpO1xuICAgICAgICAgIH0sIDYwMDApO1xuXG4gICAgICAgICAgY29uc3QgaGFzVXBkYXRlID0gdGhpcy5tZXRob2RzLmhhc1VwZGF0ZUNhbnZhcyhyZXN1bHQpO1xuXG4gICAgICAgICAgcmVzdWx0LnNjb3JlRm9ybWF0ID0gdXRpbC5yZW5kZXJTY29yZShyZXN1bHQuc2NvcmUpO1xuICAgICAgICAgIHRoaXMuY2hhbGxlbmdlRGF0YSA9IHJlc3VsdDtcblxuICAgICAgICAgIGlmIChoYXNVcGRhdGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd1cGRhdGUgY2hhbGxlZ2UgY2FudmFzJyk7XG4gICAgICAgICAgICB0aGlzLm1ldGhvZHMuZHJhd0RvdCgpO1xuICAgICAgICAgICAgcXVlc3Rpb24uY2hlY2soKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLnNjcm9sbFRvcCA9IHRoaXMuc2Nyb2xsVG9wICsgMTtcbiAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB3ZXB5LnNldE5hdmlnYXRpb25CYXJUaXRsZSh7XG4gICAgICAgICAgICAgIHRpdGxlOiB0aGlzLmNoYWxsZW5nZURhdGEuaXNFbmQgPyAn5oiY57up6K+m5oOFJyA6ICfloZTmi5Pml7bliLsnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICAgIGxvYWRpbmcuaGlkZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICB1cGRhdGVQb2ludDogKGRvdCkgPT4ge1xuICAgICAgICBjb25zdCBoYXNQb2ludCA9IHRoaXMuY2hhbGxlbmdlRGF0YS5zdGF0dXMgPT09IDA7XG4gICAgICAgIHRoaXMuaGFzUG9pbnQgPSBoYXNQb2ludDtcbiAgICAgICAgdGhpcy5wb2ludFBvc2l0aW9uID0ge1xuICAgICAgICAgIHg6IGRvdC54IC8gMiAtIDI1IC8gdGhpcy5zY3JlZW5TY2FsZSxcbiAgICAgICAgICB5OiBkb3QueSAvIDIgLSAyNSAvIHRoaXMuc2NyZWVuU2NhbGUsXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBkcmF3RG90OiAoKSA9PiB7XG4gICAgICAgIC8vIGNvbnN0IGN0eCA9IHRoaXMuY29udGV4dDtcbiAgICAgICAgY29uc3Qgc2NhbGUgPSB0aGlzLnNjcmVlblNjYWxlO1xuICAgICAgICBjb25zdCBvZmZzZXRUb3AgPSAxNDAgLyBzY2FsZTtcbiAgICAgICAgY29uc3QgY2hhbGxlbmdlRGF0YSA9IHRoaXMuY2hhbGxlbmdlRGF0YTtcbiAgICAgICAgbGV0IGRvdHMgPSB0aGlzLmRvdHMubWFwKGQgPT4ge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4OiBkLngsXG4gICAgICAgICAgICB5OiBkLnksXG4gICAgICAgICAgfTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3Qgb3JhbmdlID0gJyNkZjU0MGUnO1xuICAgICAgICBjb25zdCB3aGl0ZSA9ICcjZmZmZmZmJztcbiAgICAgICAgY29uc3QgZ3JleSA9ICcjMzMzMzMzJztcbiAgICAgICAgY29uc3QgbGluZUdyZXkgPSAnIzhjOGM4ZCc7XG4gICAgICAgIGNvbnN0IGluZyA9ICcjZmZjZDU1JztcblxuICAgICAgICBpZiAoY2hhbGxlbmdlRGF0YS5jaGVja3BvaW50Q291bnQgPiBkb3RzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICBjb25zdCBjb3VudCA9IGNoYWxsZW5nZURhdGEuY2hlY2twb2ludENvdW50IC0gZG90cy5sZW5ndGggKyAxO1xuICAgICAgICAgIGNvbnN0IGxlbiA9IGRvdHMubGVuZ3RoIC0gMjtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGogPSBpIDw9IGxlbiA/IGkgOiBpICUgbGVuO1xuICAgICAgICAgICAgY29uc3QgZG90ID0gZG90c1tqXTtcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldCA9IDIwMDtcblxuICAgICAgICAgICAgZG90cyA9IGRvdHMubWFwKGQgPT4ge1xuICAgICAgICAgICAgICBkLnkgKz0gb2Zmc2V0O1xuICAgICAgICAgICAgICByZXR1cm4gZDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZG90cy5wdXNoKHtcbiAgICAgICAgICAgICAgeDogZG90LngsXG4gICAgICAgICAgICAgIHk6IG9mZnNldFRvcCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChjaGFsbGVuZ2VEYXRhLmNoZWNrcG9pbnRDb3VudCA8IGRvdHMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgIGRvdHMuc3BsaWNlKGNoYWxsZW5nZURhdGEuY2hlY2twb2ludENvdW50ICsgMSwgZG90cy5sZW5ndGggLSBjaGFsbGVuZ2VEYXRhLmNoZWNrcG9pbnRDb3VudCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZG90c1swXS55IC8gMiAtIGRvdHNbZG90cy5sZW5ndGggLSAxXS55IC8gMiArIG9mZnNldFRvcCA8IHRoaXMuc3lzdGVtSW5mby53aW5kb3dIZWlnaHQpIHtcbiAgICAgICAgICBjb25zdCBvZmZzZXQgPSBkb3RzWzBdLnkgLSB0aGlzLnN5c3RlbUluZm8ud2luZG93SGVpZ2h0ICogMjtcbiAgICAgICAgICBkb3RzID0gZG90cy5tYXAoZCA9PiB7XG4gICAgICAgICAgICBkLnkgLT0gb2Zmc2V0O1xuICAgICAgICAgICAgcmV0dXJuIGQ7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNhbnZhc0hlaWdodCA9IGRvdHNbMF0ueSAvIDJcbiAgICAgICAgdGhpcy5jYW52YXNXaWR0aCA9IHRoaXMuc3lzdGVtSW5mby53aW5kb3dXaWR0aDtcblxuICAgICAgICAvLyBjdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMuY2FudmFzV2lkdGgsIHRoaXMuY2FudmFzSGVpZ2h0KTtcbiAgICAgICAgLy8gY3R4LmRyYXcoKTtcblxuICAgICAgICAvLyBjdHguc2V0TGluZVdpZHRoKDEpO1xuICAgICAgICAvLyBjdHguc2NhbGUodGhpcy5zeXN0ZW1JbmZvLnBpeGVsUmF0aW8sIHRoaXMuc3lzdGVtSW5mby5waXhlbFJhdGlvKTtcblxuICAgICAgICAvLyBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGNvbnN0IGRyYXdMaW5lcyA9IFtdO1xuICAgICAgICBkb3RzLmZvckVhY2goKGRvdCwgaSkgPT4ge1xuICAgICAgICAgIGNvbnN0IG5leHREb3QgPSBkb3RzW2kgKyAxXTtcbiAgICAgICAgICBpZiAobmV4dERvdCkge1xuICAgICAgICAgICAgY29uc3QgeCA9IE1hdGguYWJzKG5leHREb3QueCAvIDIgLSBkb3QueCAvIDIpO1xuICAgICAgICAgICAgY29uc3QgeSA9IE1hdGguYWJzKG5leHREb3QueSAvIDIgLSBkb3QueSAvIDIpO1xuICAgICAgICAgICAgY29uc3Qgd2lkdGggPSBNYXRoLnBvdyhNYXRoLnBvdyh4LCAyKSArIE1hdGgucG93KHksIDIpLCAwLjUpO1xuICAgICAgICAgICAgbGV0IHJvdGF0ZSA9IE1hdGguYXNpbih5IC8gd2lkdGgpICogMTgwIC8gTWF0aC5QSTtcblxuICAgICAgICAgICAgaWYgKG5leHREb3QueCA+PSBkb3QueCAmJiBuZXh0RG90LnkgPD0gZG90LnkpIHtcbiAgICAgICAgICAgICAgcm90YXRlID0gLXJvdGF0ZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmV4dERvdC54ID49IGRvdC54ICYmIG5leHREb3QueSA+IGRvdC55KSB7XG4gICAgICAgICAgICAgIC8vIHJvdGF0ZSA9IHJvdGF0ZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmV4dERvdC54IDwgZG90LnggJiYgbmV4dERvdC55IDw9IGRvdC55KSB7XG4gICAgICAgICAgICAgIHJvdGF0ZSA9IHJvdGF0ZSAtIDE4MDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmV4dERvdC54IDwgZG90LnggJiYgbmV4dERvdC55ID4gZG90LnkpIHtcbiAgICAgICAgICAgICAgcm90YXRlID0gLXJvdGF0ZSAtIDE4MDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZHJhd0xpbmVzLnB1c2goe1xuICAgICAgICAgICAgICB4OiBkb3QueCAvIDIsXG4gICAgICAgICAgICAgIHk6IGRvdC55IC8gMixcbiAgICAgICAgICAgICAgd2lkdGgsXG4gICAgICAgICAgICAgIHJvdGF0ZSxcbiAgICAgICAgICAgICAgY29sb3I6IGxpbmVHcmV5LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5kcmF3TGluZXMgPSBkcmF3TGluZXM7XG5cbiAgICAgICAgY29uc3QgZHJhd0RvdHMgPSBbXTtcbiAgICAgICAgZG90cy5mb3JFYWNoKChkb3QsIGkpID0+IHtcbiAgICAgICAgICBsZXQgZHJhd0RvdCA9IHt9O1xuICAgICAgICAgIGlmIChpICE9PSAwKSB7XG4gICAgICAgICAgICBpZiAoY2hhbGxlbmdlRGF0YS5jaGVja3BvaW50Q3VycmVudCA+IGkpIHtcbiAgICAgICAgICAgICAgZHJhd0RvdCA9IHtcbiAgICAgICAgICAgICAgICBzaXplOiAxMixcbiAgICAgICAgICAgICAgICB4OiBkb3QueCAvIDIgLSA2LFxuICAgICAgICAgICAgICAgIHk6IGRvdC55IC8gMiAtIDYsXG4gICAgICAgICAgICAgICAgY29sb3I6IG9yYW5nZSxcbiAgICAgICAgICAgICAgICBmb250Q29sb3I6IG9yYW5nZSxcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2hhbGxlbmdlRGF0YS5jaGVja3BvaW50Q3VycmVudCA9PT0gaSkge1xuICAgICAgICAgICAgICBpZiAoY2hhbGxlbmdlRGF0YS5zdGF0dXMgPT09IDIpIHtcbiAgICAgICAgICAgICAgICBkcmF3RG90ID0ge1xuICAgICAgICAgICAgICAgICAgc2l6ZTogMjQsXG4gICAgICAgICAgICAgICAgICB4OiBkb3QueCAvIDIgLSAxMixcbiAgICAgICAgICAgICAgICAgIHk6IGRvdC55IC8gMiAtIDEyLFxuICAgICAgICAgICAgICAgICAgY29sb3I6IGdyZXksXG4gICAgICAgICAgICAgICAgICBmb250Q29sb3I6IGdyZXksXG4gICAgICAgICAgICAgICAgICBmYWlsOiB0cnVlLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZHJhd0RvdCA9IHtcbiAgICAgICAgICAgICAgICAgIHNpemU6IDEyLFxuICAgICAgICAgICAgICAgICAgeDogZG90LnggLyAyIC0gNixcbiAgICAgICAgICAgICAgICAgIHk6IGRvdC55IC8gMiAtIDYsXG4gICAgICAgICAgICAgICAgICBjb2xvcjogb3JhbmdlLFxuICAgICAgICAgICAgICAgICAgZm9udENvbG9yOiBjaGFsbGVuZ2VEYXRhLnN0YXR1cyA9PT0gMCA/IGluZyA6IG9yYW5nZSxcbiAgICAgICAgICAgICAgICAgIGluZzogY2hhbGxlbmdlRGF0YS5zdGF0dXMgPT09IDAsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB0aGlzLm1ldGhvZHMudXBkYXRlUG9pbnQoZG90KTtcbiAgICAgICAgICAgICAgdGhpcy5zY3JvbGxUb3AgPSBwYXJzZUludChkb3QueSAvIDIgLSB0aGlzLnN5c3RlbUluZm8ud2luZG93SGVpZ2h0ICsgMTAwLFxuICAgICAgICAgICAgICAgIDEwKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGRyYXdEb3QgPSB7XG4gICAgICAgICAgICAgICAgc2l6ZTogMTIsXG4gICAgICAgICAgICAgICAgeDogZG90LnggLyAyIC0gNixcbiAgICAgICAgICAgICAgICB5OiBkb3QueSAvIDIgLSA2LFxuICAgICAgICAgICAgICAgIGNvbG9yOiB3aGl0ZSxcbiAgICAgICAgICAgICAgICBmb250Q29sb3I6IHdoaXRlLFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaSA9PT0gMSkge1xuICAgICAgICAgICAgICBkcmF3RG90LnRleHQgPSAnMXN0JztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaSA9PT0gMSkge1xuICAgICAgICAgICAgICBkcmF3RG90LnRleHQgPSAnMm5kJztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaSA9PT0gMSkge1xuICAgICAgICAgICAgICBkcmF3RG90LnRleHQgPSAnM3JkJztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGRyYXdEb3QudGV4dCA9IGAke2l9dGhgO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZHJhd0RvdHMucHVzaChkcmF3RG90KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuZHJhd0RvdHMgPSBkcmF3RG90cztcbiAgICAgIH0sXG4gICAgfVxuXG4gICAgZXZlbnRzID0ge1xuXG4gICAgfVxuXG4gICAgb25TaG93KCkge1xuICAgICAgaWYgKHRoaXMuaXNSZWFkeSkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lcik7XG4gICAgICAgIHRoaXMubWV0aG9kcy51cGRhdGVDaGFsbGVnZSgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIG9uSGlkZSgpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVyKTtcbiAgICB9XG5cbiAgICBvbkxvYWQob3B0aW9uKSB7XG4gICAgICBjb25zb2xlLmxvZygnY2hhbGxlbmdlIG9uIGxvYWQnLCBvcHRpb24pO1xuICAgICAgdGhpcy5pZCA9IG9wdGlvbi5pZDtcbiAgICAgIGxvYWRpbmcuc2hvdygpO1xuICAgIH1cblxuICAgIG9uUmVhZHkoKSB7XG4gICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgIGNvbnN0IHN5c3RlbUluZm8gPSB3ZXB5LmdldFN5c3RlbUluZm9TeW5jKCk7XG4gICAgICBjb25zdCBzY2FsZSA9IDM3NSAvIHN5c3RlbUluZm8ud2luZG93V2lkdGg7XG4gICAgICB0aGlzLmlzUmVhZHkgPSB0cnVlO1xuICAgICAgdGhpcy5zeXN0ZW1JbmZvID0gc3lzdGVtSW5mbztcbiAgICAgIHRoaXMuY29udGV4dCA9IHdlcHkuY3JlYXRlQ2FudmFzQ29udGV4dCgnZG90c0NhbnZhcycpO1xuICAgICAgdGhpcy5zY3JlZW5TY2FsZSA9IHNjYWxlO1xuICAgICAgdGhpcy5kb3RzID0gaW5pdERvdHMubWFwKGQgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHg6IGQueCAvIHNjYWxlLFxuICAgICAgICAgIHk6IGQueSAvIHNjYWxlXG4gICAgICAgIH07XG4gICAgICB9KTtcblxuICAgICAgcmVxdWVzdC5nZXRVc2VySW5mbygpLnRoZW4oZCA9PiB7XG4gICAgICAgIHNlbGYudXNlckluZm8gPSBkO1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lcik7XG4gICAgICAgIHRoaXMubWV0aG9kcy51cGRhdGVDaGFsbGVnZSgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiJdfQ==