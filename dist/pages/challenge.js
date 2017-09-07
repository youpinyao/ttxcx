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
        _request2.default.get(_urls2.default.challengeData).then(function (_ref2) {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNoYWxsZW5nZS5qcyJdLCJuYW1lcyI6WyJCb29raW5nIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImNhbnZhc0lkRXJyb3JDYWxsYmFjayIsImUiLCJjb25zb2xlIiwiZXJyb3IiLCJkZXRhaWwiLCJlcnJNc2ciLCJjb21wb25lbnRzIiwiZGF0YSIsImV4cGFuZCIsInVzZXJJbmZvIiwic3lzdGVtSW5mbyIsImlkIiwic2Nyb2xsVG9wIiwiZG90cyIsInNjcmVlblNjYWxlIiwiY2FudmFzV2lkdGgiLCJjYW52YXNIZWlnaHQiLCJjaGFsbGVuZ2VEYXRhIiwidGltZXIiLCJoYXNQb2ludCIsInBvaW50UG9zaXRpb24iLCJkcmF3RG90cyIsImRyYXdMaW5lcyIsImNvbXB1dGVkIiwibWV0aG9kcyIsImRvRXhwYW5kIiwiaGFzVXBkYXRlQ2FudmFzIiwiZW1wdHkiLCJjb3VudCIsImVhY2giLCJkIiwiayIsImluZGV4T2YiLCJ1cGRhdGVDaGFsbGVnZSIsImxvZyIsImdldCIsInRoZW4iLCJyZXN1bHQiLCJjbGVhclRpbWVvdXQiLCJzZXRUaW1lb3V0IiwiaGFzVXBkYXRlIiwic2NvcmVGb3JtYXQiLCJyZW5kZXJTY29yZSIsInNjb3JlIiwiZHJhd0RvdCIsImNoZWNrIiwiJGFwcGx5Iiwic2V0TmF2aWdhdGlvbkJhclRpdGxlIiwidGl0bGUiLCJpc0VuZCIsImhpZGUiLCJ1cGRhdGVQb2ludCIsImRvdCIsInN0YXR1cyIsIngiLCJ5Iiwic2NhbGUiLCJvZmZzZXRUb3AiLCJtYXAiLCJvcmFuZ2UiLCJ3aGl0ZSIsImdyZXkiLCJsaW5lR3JleSIsImluZyIsImNoZWNrcG9pbnRDb3VudCIsImxlbmd0aCIsImxlbiIsImkiLCJqIiwib2Zmc2V0IiwicHVzaCIsInNwbGljZSIsIndpbmRvd0hlaWdodCIsIndpbmRvd1dpZHRoIiwiZm9yRWFjaCIsIm5leHREb3QiLCJNYXRoIiwiYWJzIiwid2lkdGgiLCJwb3ciLCJyb3RhdGUiLCJhc2luIiwiUEkiLCJjb2xvciIsImNoZWNrcG9pbnRDdXJyZW50Iiwic2l6ZSIsImZvbnRDb2xvciIsImZhaWwiLCJwYXJzZUludCIsInRleHQiLCJldmVudHMiLCJpc1JlYWR5Iiwib3B0aW9uIiwic2hvdyIsInNlbGYiLCJnZXRTeXN0ZW1JbmZvU3luYyIsImNvbnRleHQiLCJjcmVhdGVDYW52YXNDb250ZXh0IiwiZ2V0VXNlckluZm8iLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7SUFFcUJBLE87Ozs7Ozs7Ozs7Ozs7OzhNQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLHFCLEdBQXdCLFVBQUNDLENBQUQsRUFBTztBQUM3QkMsY0FBUUMsS0FBUixDQUFjLGNBQWQsRUFBOEJGLEVBQUVHLE1BQUYsQ0FBU0MsTUFBdkM7QUFDRCxLLFFBRURDLFUsR0FBYSxFLFFBSWJDLEksR0FBTztBQUNMQyxjQUFRLEtBREg7QUFFTEMsZ0JBQVUsSUFGTDtBQUdMQyxrQkFBWSxJQUhQO0FBSUxDLFVBQUksSUFKQztBQUtMQyxpQkFBVyxDQUxOO0FBTUxDLFlBQU0sSUFORDtBQU9MQyxtQkFBYSxDQVBSO0FBUUxDLG1CQUFhLElBUlI7QUFTTEMsb0JBQWMsSUFUVDtBQVVMQyxxQkFBZSxJQVZWO0FBV0xDLGFBQU8sSUFYRjtBQVlMQyxnQkFBVSxLQVpMO0FBYUxDLHFCQUFlLElBYlY7QUFjTEMsZ0JBQVUsRUFkTDtBQWVMQyxpQkFBVztBQWZOLEssUUFrQlBDLFEsR0FBVyxFLFFBSVhDLE8sR0FBVTtBQUNSQyxnQkFBVSxrQkFBQ2pCLE1BQUQsRUFBWTtBQUNwQixjQUFLQSxNQUFMLEdBQWNBLFdBQVcsTUFBekI7QUFDRCxPQUhPO0FBSVJrQix1QkFBaUIseUJBQUNuQixJQUFELEVBQVU7QUFDekIsWUFBSSxhQUFHb0IsS0FBSCxDQUFTcEIsSUFB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WSxlQUFTNkMsR0FBVCxDQUFhLGFBQUs7QUFDNUIsZUFBTztBQUNMSixhQUFHeEIsRUFBRXdCLENBQUYsR0FBTUUsS0FESjtBQUVMRCxhQUFHekIsRUFBRXlCLENBQUYsR0FBTUM7QUFGSixTQUFQO0FBSUQsT0FMVyxDQUFaOztBQU9BLHdCQUFRMEMsV0FBUixHQUFzQjlELElBQXRCLENBQTJCLGFBQUs7QUFDOUIwRCxhQUFLckYsUUFBTCxHQUFnQnFCLENBQWhCO0FBQ0FRLHFCQUFhLE9BQUtwQixLQUFsQjtBQUNBLGVBQUtNLE9BQUwsQ0FBYVMsY0FBYjtBQUNELE9BSkQ7QUFLRDs7O0VBaFNrQyxlQUFLa0UsSTs7a0JBQXJCdEcsTyIsImZpbGUiOiJjaGFsbGVuZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG4gIGltcG9ydCBpcyBmcm9tICcuLi9zZXJ2aWNlcy9pcy5qcyc7XG4gIGltcG9ydCB1dGlsIGZyb20gJy4uL3NlcnZpY2VzL3V0aWwuanMnO1xuICBpbXBvcnQgaW5pdERvdHMgZnJvbSAnLi4vc2VydmljZXMvZG90cy5qcyc7XG4gIGltcG9ydCB1cmxzIGZyb20gJy4uL3NlcnZpY2VzL3VybHMuanMnO1xuICBpbXBvcnQgcmVxdWVzdCBmcm9tICcuLi9zZXJ2aWNlcy9yZXF1ZXN0LmpzJztcbiAgaW1wb3J0IGxvYWRpbmcgZnJvbSAnLi4vc2VydmljZXMvbG9hZGluZy5qcyc7XG4gIGltcG9ydCBxdWVzdGlvbiBmcm9tICcuLi9zZXJ2aWNlcy9xdWVzdGlvbi5qcyc7XG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9va2luZyBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJycsXG4gICAgfVxuICAgIGNhbnZhc0lkRXJyb3JDYWxsYmFjayA9IChlKSA9PiB7XG4gICAgICBjb25zb2xlLmVycm9yKCdjYW52YXMgZXJyb3InLCBlLmRldGFpbC5lcnJNc2cpXG4gICAgfVxuXG4gICAgY29tcG9uZW50cyA9IHtcblxuICAgIH1cblxuICAgIGRhdGEgPSB7XG4gICAgICBleHBhbmQ6IGZhbHNlLFxuICAgICAgdXNlckluZm86IG51bGwsXG4gICAgICBzeXN0ZW1JbmZvOiBudWxsLFxuICAgICAgaWQ6IG51bGwsXG4gICAgICBzY3JvbGxUb3A6IDAsXG4gICAgICBkb3RzOiBudWxsLFxuICAgICAgc2NyZWVuU2NhbGU6IDEsXG4gICAgICBjYW52YXNXaWR0aDogbnVsbCxcbiAgICAgIGNhbnZhc0hlaWdodDogbnVsbCxcbiAgICAgIGNoYWxsZW5nZURhdGE6IG51bGwsXG4gICAgICB0aW1lcjogbnVsbCxcbiAgICAgIGhhc1BvaW50OiBmYWxzZSxcbiAgICAgIHBvaW50UG9zaXRpb246IG51bGwsXG4gICAgICBkcmF3RG90czogW10sXG4gICAgICBkcmF3TGluZXM6IFtdLFxuICAgIH1cblxuICAgIGNvbXB1dGVkID0ge1xuXG4gICAgfVxuXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGRvRXhwYW5kOiAoZXhwYW5kKSA9PiB7XG4gICAgICAgIHRoaXMuZXhwYW5kID0gZXhwYW5kID09PSAndHJ1ZSc7XG4gICAgICB9LFxuICAgICAgaGFzVXBkYXRlQ2FudmFzOiAoZGF0YSkgPT4ge1xuICAgICAgICBpZiAoaXMuZW1wdHkoZGF0YSkpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzLmVtcHR5KHRoaXMuY2hhbGxlbmdlRGF0YSkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBjb3VudCA9IDA7XG5cbiAgICAgICAgdXRpbC5lYWNoKHRoaXMuY2hhbGxlbmdlRGF0YSwgKGQsIGspID0+IHtcbiAgICAgICAgICBpZiAoZCAhPT0gZGF0YVtrXSAmJiBbJ2NoZWNrcG9pbnRDb3VudCcsICdjaGVja3BvaW50Q3VycmVudCcsICdzdGF0dXMnLCAnaXNFbmQnXS5pbmRleE9mKFxuICAgICAgICAgICAgICBrKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gY291bnQgPiAwO1xuICAgICAgfSxcbiAgICAgIHVwZGF0ZUNoYWxsZWdlOiAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdjaGVjayB1cGRhdGUgY2hhbGxlZ2UnKTtcbiAgICAgICAgcmVxdWVzdC5nZXQodXJscy5jaGFsbGVuZ2VEYXRhKS50aGVuKCh7XG4gICAgICAgICAgcmVzdWx0LFxuICAgICAgICB9KSA9PiB7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZXIpO1xuICAgICAgICAgIHRoaXMudGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMubWV0aG9kcy51cGRhdGVDaGFsbGVnZSgpO1xuICAgICAgICAgIH0sIDYwMDApO1xuXG4gICAgICAgICAgY29uc3QgaGFzVXBkYXRlID0gdGhpcy5tZXRob2RzLmhhc1VwZGF0ZUNhbnZhcyhyZXN1bHQpO1xuXG4gICAgICAgICAgcmVzdWx0LnNjb3JlRm9ybWF0ID0gdXRpbC5yZW5kZXJTY29yZShyZXN1bHQuc2NvcmUpO1xuICAgICAgICAgIHRoaXMuY2hhbGxlbmdlRGF0YSA9IHJlc3VsdDtcblxuICAgICAgICAgIGlmIChoYXNVcGRhdGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd1cGRhdGUgY2hhbGxlZ2UgY2FudmFzJyk7XG4gICAgICAgICAgICB0aGlzLm1ldGhvZHMuZHJhd0RvdCgpO1xuICAgICAgICAgICAgcXVlc3Rpb24uY2hlY2soKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLnNjcm9sbFRvcCA9IHRoaXMuc2Nyb2xsVG9wICsgMTtcbiAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB3ZXB5LnNldE5hdmlnYXRpb25CYXJUaXRsZSh7XG4gICAgICAgICAgICAgIHRpdGxlOiB0aGlzLmNoYWxsZW5nZURhdGEuaXNFbmQgPyAn5oiY57up6K+m5oOFJyA6ICfloZTmi5Pml7bliLsnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICAgIGxvYWRpbmcuaGlkZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICB1cGRhdGVQb2ludDogKGRvdCkgPT4ge1xuICAgICAgICBjb25zdCBoYXNQb2ludCA9IHRoaXMuY2hhbGxlbmdlRGF0YS5zdGF0dXMgPT09IDA7XG4gICAgICAgIHRoaXMuaGFzUG9pbnQgPSBoYXNQb2ludDtcbiAgICAgICAgdGhpcy5wb2ludFBvc2l0aW9uID0ge1xuICAgICAgICAgIHg6IGRvdC54IC8gMiAtIDI1IC8gdGhpcy5zY3JlZW5TY2FsZSxcbiAgICAgICAgICB5OiBkb3QueSAvIDIgLSAyNSAvIHRoaXMuc2NyZWVuU2NhbGUsXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBkcmF3RG90OiAoKSA9PiB7XG4gICAgICAgIC8vIGNvbnN0IGN0eCA9IHRoaXMuY29udGV4dDtcbiAgICAgICAgY29uc3Qgc2NhbGUgPSB0aGlzLnNjcmVlblNjYWxlO1xuICAgICAgICBjb25zdCBvZmZzZXRUb3AgPSAxNDAgLyBzY2FsZTtcbiAgICAgICAgY29uc3QgY2hhbGxlbmdlRGF0YSA9IHRoaXMuY2hhbGxlbmdlRGF0YTtcbiAgICAgICAgbGV0IGRvdHMgPSB0aGlzLmRvdHMubWFwKGQgPT4ge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4OiBkLngsXG4gICAgICAgICAgICB5OiBkLnksXG4gICAgICAgICAgfTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3Qgb3JhbmdlID0gJyNkZjU0MGUnO1xuICAgICAgICBjb25zdCB3aGl0ZSA9ICcjZmZmZmZmJztcbiAgICAgICAgY29uc3QgZ3JleSA9ICcjMzMzMzMzJztcbiAgICAgICAgY29uc3QgbGluZUdyZXkgPSAnIzhjOGM4ZCc7XG4gICAgICAgIGNvbnN0IGluZyA9ICcjZmZjZDU1JztcblxuICAgICAgICBpZiAoY2hhbGxlbmdlRGF0YS5jaGVja3BvaW50Q291bnQgPiBkb3RzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICBjb25zdCBjb3VudCA9IGNoYWxsZW5nZURhdGEuY2hlY2twb2ludENvdW50IC0gZG90cy5sZW5ndGggKyAxO1xuICAgICAgICAgIGNvbnN0IGxlbiA9IGRvdHMubGVuZ3RoIC0gMjtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGogPSBpIDw9IGxlbiA/IGkgOiBpICUgbGVuO1xuICAgICAgICAgICAgY29uc3QgZG90ID0gZG90c1tqXTtcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldCA9IDIwMDtcblxuICAgICAgICAgICAgZG90cyA9IGRvdHMubWFwKGQgPT4ge1xuICAgICAgICAgICAgICBkLnkgKz0gb2Zmc2V0O1xuICAgICAgICAgICAgICByZXR1cm4gZDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZG90cy5wdXNoKHtcbiAgICAgICAgICAgICAgeDogZG90LngsXG4gICAgICAgICAgICAgIHk6IG9mZnNldFRvcCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChjaGFsbGVuZ2VEYXRhLmNoZWNrcG9pbnRDb3VudCA8IGRvdHMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgIGRvdHMuc3BsaWNlKGNoYWxsZW5nZURhdGEuY2hlY2twb2ludENvdW50ICsgMSwgZG90cy5sZW5ndGggLSBjaGFsbGVuZ2VEYXRhLmNoZWNrcG9pbnRDb3VudCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZG90c1swXS55IC8gMiAtIGRvdHNbZG90cy5sZW5ndGggLSAxXS55IC8gMiArIG9mZnNldFRvcCA8IHRoaXMuc3lzdGVtSW5mby53aW5kb3dIZWlnaHQpIHtcbiAgICAgICAgICBjb25zdCBvZmZzZXQgPSBkb3RzWzBdLnkgLSB0aGlzLnN5c3RlbUluZm8ud2luZG93SGVpZ2h0ICogMjtcbiAgICAgICAgICBkb3RzID0gZG90cy5tYXAoZCA9PiB7XG4gICAgICAgICAgICBkLnkgLT0gb2Zmc2V0O1xuICAgICAgICAgICAgcmV0dXJuIGQ7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNhbnZhc0hlaWdodCA9IGRvdHNbMF0ueSAvIDJcbiAgICAgICAgdGhpcy5jYW52YXNXaWR0aCA9IHRoaXMuc3lzdGVtSW5mby53aW5kb3dXaWR0aDtcblxuICAgICAgICAvLyBjdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMuY2FudmFzV2lkdGgsIHRoaXMuY2FudmFzSGVpZ2h0KTtcbiAgICAgICAgLy8gY3R4LmRyYXcoKTtcblxuICAgICAgICAvLyBjdHguc2V0TGluZVdpZHRoKDEpO1xuICAgICAgICAvLyBjdHguc2NhbGUodGhpcy5zeXN0ZW1JbmZvLnBpeGVsUmF0aW8sIHRoaXMuc3lzdGVtSW5mby5waXhlbFJhdGlvKTtcblxuICAgICAgICAvLyBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGNvbnN0IGRyYXdMaW5lcyA9IFtdO1xuICAgICAgICBkb3RzLmZvckVhY2goKGRvdCwgaSkgPT4ge1xuICAgICAgICAgIGNvbnN0IG5leHREb3QgPSBkb3RzW2kgKyAxXTtcbiAgICAgICAgICBpZiAobmV4dERvdCkge1xuICAgICAgICAgICAgY29uc3QgeCA9IE1hdGguYWJzKG5leHREb3QueCAvIDIgLSBkb3QueCAvIDIpO1xuICAgICAgICAgICAgY29uc3QgeSA9IE1hdGguYWJzKG5leHREb3QueSAvIDIgLSBkb3QueSAvIDIpO1xuICAgICAgICAgICAgY29uc3Qgd2lkdGggPSBNYXRoLnBvdyhNYXRoLnBvdyh4LCAyKSArIE1hdGgucG93KHksIDIpLCAwLjUpO1xuICAgICAgICAgICAgbGV0IHJvdGF0ZSA9IE1hdGguYXNpbih5IC8gd2lkdGgpICogMTgwIC8gTWF0aC5QSTtcblxuICAgICAgICAgICAgaWYgKG5leHREb3QueCA+PSBkb3QueCAmJiBuZXh0RG90LnkgPD0gZG90LnkpIHtcbiAgICAgICAgICAgICAgcm90YXRlID0gLXJvdGF0ZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmV4dERvdC54ID49IGRvdC54ICYmIG5leHREb3QueSA+IGRvdC55KSB7XG4gICAgICAgICAgICAgIC8vIHJvdGF0ZSA9IHJvdGF0ZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmV4dERvdC54IDwgZG90LnggJiYgbmV4dERvdC55IDw9IGRvdC55KSB7XG4gICAgICAgICAgICAgIHJvdGF0ZSA9IHJvdGF0ZSAtIDE4MDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmV4dERvdC54IDwgZG90LnggJiYgbmV4dERvdC55ID4gZG90LnkpIHtcbiAgICAgICAgICAgICAgcm90YXRlID0gLXJvdGF0ZSAtIDE4MDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZHJhd0xpbmVzLnB1c2goe1xuICAgICAgICAgICAgICB4OiBkb3QueCAvIDIsXG4gICAgICAgICAgICAgIHk6IGRvdC55IC8gMixcbiAgICAgICAgICAgICAgd2lkdGgsXG4gICAgICAgICAgICAgIHJvdGF0ZSxcbiAgICAgICAgICAgICAgY29sb3I6IGxpbmVHcmV5LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5kcmF3TGluZXMgPSBkcmF3TGluZXM7XG5cbiAgICAgICAgY29uc3QgZHJhd0RvdHMgPSBbXTtcbiAgICAgICAgZG90cy5mb3JFYWNoKChkb3QsIGkpID0+IHtcbiAgICAgICAgICBsZXQgZHJhd0RvdCA9IHt9O1xuICAgICAgICAgIGlmIChpICE9PSAwKSB7XG4gICAgICAgICAgICBpZiAoY2hhbGxlbmdlRGF0YS5jaGVja3BvaW50Q3VycmVudCA+IGkpIHtcbiAgICAgICAgICAgICAgZHJhd0RvdCA9IHtcbiAgICAgICAgICAgICAgICBzaXplOiAxMixcbiAgICAgICAgICAgICAgICB4OiBkb3QueCAvIDIgLSA2LFxuICAgICAgICAgICAgICAgIHk6IGRvdC55IC8gMiAtIDYsXG4gICAgICAgICAgICAgICAgY29sb3I6IG9yYW5nZSxcbiAgICAgICAgICAgICAgICBmb250Q29sb3I6IG9yYW5nZSxcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2hhbGxlbmdlRGF0YS5jaGVja3BvaW50Q3VycmVudCA9PT0gaSkge1xuICAgICAgICAgICAgICBpZiAoY2hhbGxlbmdlRGF0YS5zdGF0dXMgPT09IDIpIHtcbiAgICAgICAgICAgICAgICBkcmF3RG90ID0ge1xuICAgICAgICAgICAgICAgICAgc2l6ZTogMjQsXG4gICAgICAgICAgICAgICAgICB4OiBkb3QueCAvIDIgLSAxMixcbiAgICAgICAgICAgICAgICAgIHk6IGRvdC55IC8gMiAtIDEyLFxuICAgICAgICAgICAgICAgICAgY29sb3I6IGdyZXksXG4gICAgICAgICAgICAgICAgICBmb250Q29sb3I6IGdyZXksXG4gICAgICAgICAgICAgICAgICBmYWlsOiB0cnVlLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZHJhd0RvdCA9IHtcbiAgICAgICAgICAgICAgICAgIHNpemU6IDEyLFxuICAgICAgICAgICAgICAgICAgeDogZG90LnggLyAyIC0gNixcbiAgICAgICAgICAgICAgICAgIHk6IGRvdC55IC8gMiAtIDYsXG4gICAgICAgICAgICAgICAgICBjb2xvcjogb3JhbmdlLFxuICAgICAgICAgICAgICAgICAgZm9udENvbG9yOiBjaGFsbGVuZ2VEYXRhLnN0YXR1cyA9PT0gMCA/IGluZyA6IG9yYW5nZSxcbiAgICAgICAgICAgICAgICAgIGluZzogY2hhbGxlbmdlRGF0YS5zdGF0dXMgPT09IDAsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB0aGlzLm1ldGhvZHMudXBkYXRlUG9pbnQoZG90KTtcbiAgICAgICAgICAgICAgdGhpcy5zY3JvbGxUb3AgPSBwYXJzZUludChkb3QueSAvIDIgLSB0aGlzLnN5c3RlbUluZm8ud2luZG93SGVpZ2h0ICsgMTAwLFxuICAgICAgICAgICAgICAgIDEwKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGRyYXdEb3QgPSB7XG4gICAgICAgICAgICAgICAgc2l6ZTogMTIsXG4gICAgICAgICAgICAgICAgeDogZG90LnggLyAyIC0gNixcbiAgICAgICAgICAgICAgICB5OiBkb3QueSAvIDIgLSA2LFxuICAgICAgICAgICAgICAgIGNvbG9yOiB3aGl0ZSxcbiAgICAgICAgICAgICAgICBmb250Q29sb3I6IHdoaXRlLFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaSA9PT0gMSkge1xuICAgICAgICAgICAgICBkcmF3RG90LnRleHQgPSAnMXN0JztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaSA9PT0gMSkge1xuICAgICAgICAgICAgICBkcmF3RG90LnRleHQgPSAnMm5kJztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaSA9PT0gMSkge1xuICAgICAgICAgICAgICBkcmF3RG90LnRleHQgPSAnM3JkJztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGRyYXdEb3QudGV4dCA9IGAke2l9dGhgO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZHJhd0RvdHMucHVzaChkcmF3RG90KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuZHJhd0RvdHMgPSBkcmF3RG90cztcbiAgICAgIH0sXG4gICAgfVxuXG4gICAgZXZlbnRzID0ge1xuXG4gICAgfVxuXG4gICAgb25TaG93KCkge1xuICAgICAgaWYgKHRoaXMuaXNSZWFkeSkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lcik7XG4gICAgICAgIHRoaXMubWV0aG9kcy51cGRhdGVDaGFsbGVnZSgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIG9uSGlkZSgpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVyKTtcbiAgICB9XG5cbiAgICBvbkxvYWQob3B0aW9uKSB7XG4gICAgICBjb25zb2xlLmxvZygnY2hhbGxlbmdlIG9uIGxvYWQnLCBvcHRpb24pO1xuICAgICAgdGhpcy5pZCA9IG9wdGlvbi5pZDtcbiAgICAgIGxvYWRpbmcuc2hvdygpO1xuICAgIH1cblxuICAgIG9uUmVhZHkoKSB7XG4gICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgIGNvbnN0IHN5c3RlbUluZm8gPSB3ZXB5LmdldFN5c3RlbUluZm9TeW5jKCk7XG4gICAgICBjb25zdCBzY2FsZSA9IDM3NSAvIHN5c3RlbUluZm8ud2luZG93V2lkdGg7XG4gICAgICB0aGlzLmlzUmVhZHkgPSB0cnVlO1xuICAgICAgdGhpcy5zeXN0ZW1JbmZvID0gc3lzdGVtSW5mbztcbiAgICAgIHRoaXMuY29udGV4dCA9IHdlcHkuY3JlYXRlQ2FudmFzQ29udGV4dCgnZG90c0NhbnZhcycpO1xuICAgICAgdGhpcy5zY3JlZW5TY2FsZSA9IHNjYWxlO1xuICAgICAgdGhpcy5kb3RzID0gaW5pdERvdHMubWFwKGQgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHg6IGQueCAvIHNjYWxlLFxuICAgICAgICAgIHk6IGQueSAvIHNjYWxlXG4gICAgICAgIH07XG4gICAgICB9KTtcblxuICAgICAgcmVxdWVzdC5nZXRVc2VySW5mbygpLnRoZW4oZCA9PiB7XG4gICAgICAgIHNlbGYudXNlckluZm8gPSBkO1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lcik7XG4gICAgICAgIHRoaXMubWV0aG9kcy51cGRhdGVDaGFsbGVnZSgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiJdfQ==