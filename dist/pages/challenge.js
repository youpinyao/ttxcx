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
      toPictures: function toPictures() {
        _wepy2.default.navigateTo({
          url: '/pages/pictures?id=' + _this.id
        });
      },
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
                color: challengeData.beforePoints ? [white, orange, grey][challengeData.beforePoints[i]] : orange,
                fontColor: challengeData.beforePoints ? [white, orange, grey][challengeData.beforePoints[i]] : orange
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNoYWxsZW5nZS5qcyJdLCJuYW1lcyI6WyJCb29raW5nIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImNhbnZhc0lkRXJyb3JDYWxsYmFjayIsImUiLCJjb25zb2xlIiwiZXJyb3IiLCJkZXRhaWwiLCJlcnJNc2ciLCJjb21wb25lbnRzIiwiZGF0YSIsImV4cGFuZCIsInVzZXJJbmZvIiwic3lzdGVtSW5mbyIsImlkIiwic2Nyb2xsVG9wIiwiZG90cyIsInNjcmVlblNjYWxlIiwiY2FudmFzV2lkdGgiLCJjYW52YXNIZWlnaHQiLCJjaGFsbGVuZ2VEYXRhIiwidGltZXIiLCJoYXNQb2ludCIsInBvaW50UG9zaXRpb24iLCJkcmF3RG90cyIsImRyYXdMaW5lcyIsImNvbXB1dGVkIiwibWV0aG9kcyIsInRvUGljdHVyZXMiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiZG9FeHBhbmQiLCJoYXNVcGRhdGVDYW52YXMiLCJlbXB0eSIsImNvdW50IiwiZWFjaCIsImQiLCJrIiwiaW5kZXhPZiIsInVwZGF0ZUNoYWxsZWdlIiwibG9nIiwiZ2V0IiwiY2hhbGxlbmdlSWQiLCJ0aGVuIiwicmVzdWx0IiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsImhhc1VwZGF0ZSIsInNjb3JlRm9ybWF0IiwicmVuZGVyU2NvcmUiLCJzY29yZSIsImRyYXdEb3QiLCJjaGVjayIsIiRhcHBseSIsInNldE5hdmlnYXRpb25CYXJUaXRsZSIsInRpdGxlIiwiaXNFbmQiLCJoaWRlIiwidXBkYXRlUG9pbnQiLCJkb3QiLCJzdGF0dXMiLCJ4IiwieSIsInNjYWxlIiwib2Zmc2V0VG9wIiwibWFwIiwib3JhbmdlIiwid2hpdGUiLCJncmV5IiwibGluZUdyZXkiLCJpbmciLCJjaGVja3BvaW50Q291bnQiLCJsZW5ndGgiLCJsZW4iLCJpIiwiaiIsIm9mZnNldCIsInB1c2giLCJzcGxpY2UiLCJ3aW5kb3dIZWlnaHQiLCJ3aW5kb3dXaWR0aCIsImZvckVhY2giLCJuZXh0RG90IiwiTWF0aCIsImFicyIsIndpZHRoIiwicG93Iiwicm90YXRlIiwiYXNpbiIsIlBJIiwiY29sb3IiLCJjaGVja3BvaW50Q3VycmVudCIsInNpemUiLCJiZWZvcmVQb2ludHMiLCJmb250Q29sb3IiLCJmYWlsIiwicGFyc2VJbnQiLCJ0ZXh0IiwiZXZlbnRzIiwiaXNSZWFkeSIsIm9wdGlvbiIsInNob3ciLCJzZWxmIiwiZ2V0U3lzdGVtSW5mb1N5bmMiLCJjb250ZXh0IiwiY3JlYXRlQ2FudmFzQ29udGV4dCIsImdldFVzZXJJbmZvIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0lBRXFCQSxPOzs7Ozs7Ozs7Ozs7Ozs4TUFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxxQixHQUF3QixVQUFDQyxDQUFELEVBQU87QUFDN0JDLGNBQVFDLEtBQVIsQ0FBYyxjQUFkLEVBQThCRixFQUFFRyxNQUFGLENBQVNDLE1BQXZDO0FBQ0QsSyxRQUVEQyxVLEdBQWEsRSxRQUliQyxJLEdBQU87QUFDTEMsY0FBUSxLQURIO0FBRUxDLGdCQUFVLElBRkw7QUFHTEMsa0JBQVksSUFIUDtBQUlMQyxVQUFJLElBSkM7QUFLTEMsaUJBQVcsQ0FMTjtBQU1MQyxZQUFNLElBTkQ7QUFPTEMsbUJBQWEsQ0FQUjtBQVFMQyxtQkFBYSxJQVJSO0FBU0xDLG9CQUFjLElBVFQ7QUFVTEMscUJBQWUsSUFWVjtBQVdMQyxhQUFPLElBWEY7QUFZTEMsZ0JBQVUsS0FaTDtBQWFMQyxxQkFBZSxJQWJWO0FBY0xDLGdCQUFVLEVBZEw7QUFlTEMsaUJBQVc7QUFmTixLLFFBa0JQQyxRLEdBQVcsRSxRQUlYQyxPLEdBQVU7QUFDUkMsa0JBQVksc0JBQU07QUFDaEIsdUJBQUtDLFVBQUwsQ0FBZ0I7QUFDZEMsdUNBQTJCLE1BQUtoQjtBQURsQixTQUFoQjtBQUdE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S0FBbEI7QUFDRDs7OzJCQUVNK0UsTSxFQUFRO0FBQ2IvRixjQUFRbUMsR0FBUixDQUFZLG1CQUFaLEVBQWlDNEQsTUFBakM7QUFDQSxXQUFLdEYsRUFBTCxHQUFVc0YsT0FBT3RGLEVBQWpCO0FBQ0Esd0JBQVF1RixJQUFSO0FBQ0Q7Ozs4QkFFUztBQUFBOztBQUNSLFVBQU1DLE9BQU8sSUFBYjtBQUNBLFVBQU16RixhQUFhLGVBQUswRixpQkFBTCxFQUFuQjtBQUNBLFVBQU14QyxRQUFRLE1BQU1sRCxXQUFXbUUsV0FBL0I7QUFDQSxXQUFLbUIsT0FBTCxHQUFlLElBQWY7QUFDQSxXQUFLdEYsVUFBTCxHQUFrQkEsVUFBbEI7QUFDQSxXQUFLMkYsT0FBTCxHQUFlLGVBQUtDLG1CQUFMLENBQXlCLFlBQXpCLENBQWY7QUFDQSxXQUFLeEYsV0FBTCxHQUFtQjhDLEtBQW5CO0FBQ0EsV0FBSy9DLElBQUwsR0FBWSxlQUFTaUQsR0FBVCxDQUFhLGFBQUs7QUFDNUIsZUFBTztBQUNMSixhQUFHekIsRUFBRXlCLENBQUYsR0FBTUUsS0FESjtBQUVMRCxhQUFHMUIsRUFBRTBCLENBQUYsR0FBTUM7QUFGSixTQUFQO0FBSUQsT0FMVyxDQUFaOztBQU9BLHdCQUFRMkMsV0FBUixHQUFzQi9ELElBQXRCLENBQTJCLGFBQUs7QUFDOUIyRCxhQUFLMUYsUUFBTCxHQUFnQndCLENBQWhCO0FBQ0FTLHFCQUFhLE9BQUt4QixLQUFsQjtBQUNBLGVBQUtNLE9BQUwsQ0FBYVksY0FBYjtBQUNELE9BSkQ7QUFLRDs7O0VBdlNrQyxlQUFLb0UsSTs7a0JBQXJCM0csTyIsImZpbGUiOiJjaGFsbGVuZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG4gIGltcG9ydCBpcyBmcm9tICcuLi9zZXJ2aWNlcy9pcy5qcyc7XG4gIGltcG9ydCB1dGlsIGZyb20gJy4uL3NlcnZpY2VzL3V0aWwuanMnO1xuICBpbXBvcnQgaW5pdERvdHMgZnJvbSAnLi4vc2VydmljZXMvZG90cy5qcyc7XG4gIGltcG9ydCB1cmxzIGZyb20gJy4uL3NlcnZpY2VzL3VybHMuanMnO1xuICBpbXBvcnQgcmVxdWVzdCBmcm9tICcuLi9zZXJ2aWNlcy9yZXF1ZXN0LmpzJztcbiAgaW1wb3J0IGxvYWRpbmcgZnJvbSAnLi4vc2VydmljZXMvbG9hZGluZy5qcyc7XG4gIGltcG9ydCBxdWVzdGlvbiBmcm9tICcuLi9zZXJ2aWNlcy9xdWVzdGlvbi5qcyc7XG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9va2luZyBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJycsXG4gICAgfVxuICAgIGNhbnZhc0lkRXJyb3JDYWxsYmFjayA9IChlKSA9PiB7XG4gICAgICBjb25zb2xlLmVycm9yKCdjYW52YXMgZXJyb3InLCBlLmRldGFpbC5lcnJNc2cpXG4gICAgfVxuXG4gICAgY29tcG9uZW50cyA9IHtcblxuICAgIH1cblxuICAgIGRhdGEgPSB7XG4gICAgICBleHBhbmQ6IGZhbHNlLFxuICAgICAgdXNlckluZm86IG51bGwsXG4gICAgICBzeXN0ZW1JbmZvOiBudWxsLFxuICAgICAgaWQ6IG51bGwsXG4gICAgICBzY3JvbGxUb3A6IDAsXG4gICAgICBkb3RzOiBudWxsLFxuICAgICAgc2NyZWVuU2NhbGU6IDEsXG4gICAgICBjYW52YXNXaWR0aDogbnVsbCxcbiAgICAgIGNhbnZhc0hlaWdodDogbnVsbCxcbiAgICAgIGNoYWxsZW5nZURhdGE6IG51bGwsXG4gICAgICB0aW1lcjogbnVsbCxcbiAgICAgIGhhc1BvaW50OiBmYWxzZSxcbiAgICAgIHBvaW50UG9zaXRpb246IG51bGwsXG4gICAgICBkcmF3RG90czogW10sXG4gICAgICBkcmF3TGluZXM6IFtdLFxuICAgIH1cblxuICAgIGNvbXB1dGVkID0ge1xuXG4gICAgfVxuXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHRvUGljdHVyZXM6ICgpID0+IHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6IGAvcGFnZXMvcGljdHVyZXM/aWQ9JHt0aGlzLmlkfWAsXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZG9FeHBhbmQ6IChleHBhbmQpID0+IHtcbiAgICAgICAgdGhpcy5leHBhbmQgPSBleHBhbmQgPT09ICd0cnVlJztcbiAgICAgIH0sXG4gICAgICBoYXNVcGRhdGVDYW52YXM6IChkYXRhKSA9PiB7XG4gICAgICAgIGlmIChpcy5lbXB0eShkYXRhKSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXMuZW1wdHkodGhpcy5jaGFsbGVuZ2VEYXRhKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGNvdW50ID0gMDtcblxuICAgICAgICB1dGlsLmVhY2godGhpcy5jaGFsbGVuZ2VEYXRhLCAoZCwgaykgPT4ge1xuICAgICAgICAgIGlmIChkICE9PSBkYXRhW2tdICYmIFsnY2hlY2twb2ludENvdW50JywgJ2NoZWNrcG9pbnRDdXJyZW50JywgJ3N0YXR1cycsICdpc0VuZCddLmluZGV4T2YoXG4gICAgICAgICAgICAgIGspICE9PSAtMSkge1xuICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBjb3VudCA+IDA7XG4gICAgICB9LFxuICAgICAgdXBkYXRlQ2hhbGxlZ2U6ICgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ2NoZWNrIHVwZGF0ZSBjaGFsbGVnZScpO1xuICAgICAgICByZXF1ZXN0LmdldCh1cmxzLmNoYWxsZW5nZURhdGEsIHtcbiAgICAgICAgICBjaGFsbGVuZ2VJZDogdGhpcy5pZCxcbiAgICAgICAgfSkudGhlbigoe1xuICAgICAgICAgIHJlc3VsdCxcbiAgICAgICAgfSkgPT4ge1xuICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVyKTtcbiAgICAgICAgICB0aGlzLnRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm1ldGhvZHMudXBkYXRlQ2hhbGxlZ2UoKTtcbiAgICAgICAgICB9LCA2MDAwKTtcblxuICAgICAgICAgIGNvbnN0IGhhc1VwZGF0ZSA9IHRoaXMubWV0aG9kcy5oYXNVcGRhdGVDYW52YXMocmVzdWx0KTtcblxuICAgICAgICAgIHJlc3VsdC5zY29yZUZvcm1hdCA9IHV0aWwucmVuZGVyU2NvcmUocmVzdWx0LnNjb3JlKTtcbiAgICAgICAgICB0aGlzLmNoYWxsZW5nZURhdGEgPSByZXN1bHQ7XG5cbiAgICAgICAgICBpZiAoaGFzVXBkYXRlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygndXBkYXRlIGNoYWxsZWdlIGNhbnZhcycpO1xuICAgICAgICAgICAgdGhpcy5tZXRob2RzLmRyYXdEb3QoKTtcbiAgICAgICAgICAgIHF1ZXN0aW9uLmNoZWNrKCk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5zY3JvbGxUb3AgPSB0aGlzLnNjcm9sbFRvcCArIDE7XG4gICAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgd2VweS5zZXROYXZpZ2F0aW9uQmFyVGl0bGUoe1xuICAgICAgICAgICAgICB0aXRsZTogdGhpcy5jaGFsbGVuZ2VEYXRhLmlzRW5kID8gJ+aImOe7qeivpuaDhScgOiAn5aGU5ouT5pe25Yi7J1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgICBsb2FkaW5nLmhpZGUoKTtcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgdXBkYXRlUG9pbnQ6IChkb3QpID0+IHtcbiAgICAgICAgY29uc3QgaGFzUG9pbnQgPSB0aGlzLmNoYWxsZW5nZURhdGEuc3RhdHVzID09PSAwO1xuICAgICAgICB0aGlzLmhhc1BvaW50ID0gaGFzUG9pbnQ7XG4gICAgICAgIHRoaXMucG9pbnRQb3NpdGlvbiA9IHtcbiAgICAgICAgICB4OiBkb3QueCAvIDIgLSAyNSAvIHRoaXMuc2NyZWVuU2NhbGUsXG4gICAgICAgICAgeTogZG90LnkgLyAyIC0gMjUgLyB0aGlzLnNjcmVlblNjYWxlLFxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZHJhd0RvdDogKCkgPT4ge1xuICAgICAgICAvLyBjb25zdCBjdHggPSB0aGlzLmNvbnRleHQ7XG4gICAgICAgIGNvbnN0IHNjYWxlID0gdGhpcy5zY3JlZW5TY2FsZTtcbiAgICAgICAgY29uc3Qgb2Zmc2V0VG9wID0gMTQwIC8gc2NhbGU7XG4gICAgICAgIGNvbnN0IGNoYWxsZW5nZURhdGEgPSB0aGlzLmNoYWxsZW5nZURhdGE7XG4gICAgICAgIGxldCBkb3RzID0gdGhpcy5kb3RzLm1hcChkID0+IHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogZC54LFxuICAgICAgICAgICAgeTogZC55LFxuICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IG9yYW5nZSA9ICcjZGY1NDBlJztcbiAgICAgICAgY29uc3Qgd2hpdGUgPSAnI2ZmZmZmZic7XG4gICAgICAgIGNvbnN0IGdyZXkgPSAnIzMzMzMzMyc7XG4gICAgICAgIGNvbnN0IGxpbmVHcmV5ID0gJyM4YzhjOGQnO1xuICAgICAgICBjb25zdCBpbmcgPSAnI2ZmY2Q1NSc7XG5cbiAgICAgICAgaWYgKGNoYWxsZW5nZURhdGEuY2hlY2twb2ludENvdW50ID4gZG90cy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgY29uc3QgY291bnQgPSBjaGFsbGVuZ2VEYXRhLmNoZWNrcG9pbnRDb3VudCAtIGRvdHMubGVuZ3RoICsgMTtcbiAgICAgICAgICBjb25zdCBsZW4gPSBkb3RzLmxlbmd0aCAtIDI7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBqID0gaSA8PSBsZW4gPyBpIDogaSAlIGxlbjtcbiAgICAgICAgICAgIGNvbnN0IGRvdCA9IGRvdHNbal07XG4gICAgICAgICAgICBjb25zdCBvZmZzZXQgPSAyMDA7XG5cbiAgICAgICAgICAgIGRvdHMgPSBkb3RzLm1hcChkID0+IHtcbiAgICAgICAgICAgICAgZC55ICs9IG9mZnNldDtcbiAgICAgICAgICAgICAgcmV0dXJuIGQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGRvdHMucHVzaCh7XG4gICAgICAgICAgICAgIHg6IGRvdC54LFxuICAgICAgICAgICAgICB5OiBvZmZzZXRUb3AsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoY2hhbGxlbmdlRGF0YS5jaGVja3BvaW50Q291bnQgPCBkb3RzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICBkb3RzLnNwbGljZShjaGFsbGVuZ2VEYXRhLmNoZWNrcG9pbnRDb3VudCArIDEsIGRvdHMubGVuZ3RoIC0gY2hhbGxlbmdlRGF0YS5jaGVja3BvaW50Q291bnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRvdHNbMF0ueSAvIDIgLSBkb3RzW2RvdHMubGVuZ3RoIC0gMV0ueSAvIDIgKyBvZmZzZXRUb3AgPCB0aGlzLnN5c3RlbUluZm8ud2luZG93SGVpZ2h0KSB7XG4gICAgICAgICAgY29uc3Qgb2Zmc2V0ID0gZG90c1swXS55IC0gdGhpcy5zeXN0ZW1JbmZvLndpbmRvd0hlaWdodCAqIDI7XG4gICAgICAgICAgZG90cyA9IGRvdHMubWFwKGQgPT4ge1xuICAgICAgICAgICAgZC55IC09IG9mZnNldDtcbiAgICAgICAgICAgIHJldHVybiBkO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jYW52YXNIZWlnaHQgPSBkb3RzWzBdLnkgLyAyXG4gICAgICAgIHRoaXMuY2FudmFzV2lkdGggPSB0aGlzLnN5c3RlbUluZm8ud2luZG93V2lkdGg7XG5cbiAgICAgICAgLy8gY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmNhbnZhc1dpZHRoLCB0aGlzLmNhbnZhc0hlaWdodCk7XG4gICAgICAgIC8vIGN0eC5kcmF3KCk7XG5cbiAgICAgICAgLy8gY3R4LnNldExpbmVXaWR0aCgxKTtcbiAgICAgICAgLy8gY3R4LnNjYWxlKHRoaXMuc3lzdGVtSW5mby5waXhlbFJhdGlvLCB0aGlzLnN5c3RlbUluZm8ucGl4ZWxSYXRpbyk7XG5cbiAgICAgICAgLy8gY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjb25zdCBkcmF3TGluZXMgPSBbXTtcbiAgICAgICAgZG90cy5mb3JFYWNoKChkb3QsIGkpID0+IHtcbiAgICAgICAgICBjb25zdCBuZXh0RG90ID0gZG90c1tpICsgMV07XG4gICAgICAgICAgaWYgKG5leHREb3QpIHtcbiAgICAgICAgICAgIGNvbnN0IHggPSBNYXRoLmFicyhuZXh0RG90LnggLyAyIC0gZG90LnggLyAyKTtcbiAgICAgICAgICAgIGNvbnN0IHkgPSBNYXRoLmFicyhuZXh0RG90LnkgLyAyIC0gZG90LnkgLyAyKTtcbiAgICAgICAgICAgIGNvbnN0IHdpZHRoID0gTWF0aC5wb3coTWF0aC5wb3coeCwgMikgKyBNYXRoLnBvdyh5LCAyKSwgMC41KTtcbiAgICAgICAgICAgIGxldCByb3RhdGUgPSBNYXRoLmFzaW4oeSAvIHdpZHRoKSAqIDE4MCAvIE1hdGguUEk7XG5cbiAgICAgICAgICAgIGlmIChuZXh0RG90LnggPj0gZG90LnggJiYgbmV4dERvdC55IDw9IGRvdC55KSB7XG4gICAgICAgICAgICAgIHJvdGF0ZSA9IC1yb3RhdGU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5leHREb3QueCA+PSBkb3QueCAmJiBuZXh0RG90LnkgPiBkb3QueSkge1xuICAgICAgICAgICAgICAvLyByb3RhdGUgPSByb3RhdGU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5leHREb3QueCA8IGRvdC54ICYmIG5leHREb3QueSA8PSBkb3QueSkge1xuICAgICAgICAgICAgICByb3RhdGUgPSByb3RhdGUgLSAxODA7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5leHREb3QueCA8IGRvdC54ICYmIG5leHREb3QueSA+IGRvdC55KSB7XG4gICAgICAgICAgICAgIHJvdGF0ZSA9IC1yb3RhdGUgLSAxODA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRyYXdMaW5lcy5wdXNoKHtcbiAgICAgICAgICAgICAgeDogZG90LnggLyAyLFxuICAgICAgICAgICAgICB5OiBkb3QueSAvIDIsXG4gICAgICAgICAgICAgIHdpZHRoLFxuICAgICAgICAgICAgICByb3RhdGUsXG4gICAgICAgICAgICAgIGNvbG9yOiBsaW5lR3JleSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZHJhd0xpbmVzID0gZHJhd0xpbmVzO1xuXG4gICAgICAgIGNvbnN0IGRyYXdEb3RzID0gW107XG4gICAgICAgIGRvdHMuZm9yRWFjaCgoZG90LCBpKSA9PiB7XG4gICAgICAgICAgbGV0IGRyYXdEb3QgPSB7fTtcbiAgICAgICAgICBpZiAoaSAhPT0gMCkge1xuICAgICAgICAgICAgaWYgKGNoYWxsZW5nZURhdGEuY2hlY2twb2ludEN1cnJlbnQgPiBpKSB7XG4gICAgICAgICAgICAgIGRyYXdEb3QgPSB7XG4gICAgICAgICAgICAgICAgc2l6ZTogMTIsXG4gICAgICAgICAgICAgICAgeDogZG90LnggLyAyIC0gNixcbiAgICAgICAgICAgICAgICB5OiBkb3QueSAvIDIgLSA2LFxuICAgICAgICAgICAgICAgIGNvbG9yOiBjaGFsbGVuZ2VEYXRhLmJlZm9yZVBvaW50cyA/IFt3aGl0ZSwgb3JhbmdlLCBncmV5XVtjaGFsbGVuZ2VEYXRhLmJlZm9yZVBvaW50c1tpXV0gOiBvcmFuZ2UsXG4gICAgICAgICAgICAgICAgZm9udENvbG9yOiBjaGFsbGVuZ2VEYXRhLmJlZm9yZVBvaW50cyA/IFt3aGl0ZSwgb3JhbmdlLCBncmV5XVtjaGFsbGVuZ2VEYXRhLmJlZm9yZVBvaW50c1tpXV0gOiBvcmFuZ2UsXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNoYWxsZW5nZURhdGEuY2hlY2twb2ludEN1cnJlbnQgPT09IGkpIHtcbiAgICAgICAgICAgICAgaWYgKGNoYWxsZW5nZURhdGEuc3RhdHVzID09PSAyKSB7XG4gICAgICAgICAgICAgICAgZHJhd0RvdCA9IHtcbiAgICAgICAgICAgICAgICAgIHNpemU6IDI0LFxuICAgICAgICAgICAgICAgICAgeDogZG90LnggLyAyIC0gMTIsXG4gICAgICAgICAgICAgICAgICB5OiBkb3QueSAvIDIgLSAxMixcbiAgICAgICAgICAgICAgICAgIGNvbG9yOiBncmV5LFxuICAgICAgICAgICAgICAgICAgZm9udENvbG9yOiBncmV5LFxuICAgICAgICAgICAgICAgICAgZmFpbDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRyYXdEb3QgPSB7XG4gICAgICAgICAgICAgICAgICBzaXplOiAxMixcbiAgICAgICAgICAgICAgICAgIHg6IGRvdC54IC8gMiAtIDYsXG4gICAgICAgICAgICAgICAgICB5OiBkb3QueSAvIDIgLSA2LFxuICAgICAgICAgICAgICAgICAgY29sb3I6IG9yYW5nZSxcbiAgICAgICAgICAgICAgICAgIGZvbnRDb2xvcjogY2hhbGxlbmdlRGF0YS5zdGF0dXMgPT09IDAgPyBpbmcgOiBvcmFuZ2UsXG4gICAgICAgICAgICAgICAgICBpbmc6IGNoYWxsZW5nZURhdGEuc3RhdHVzID09PSAwLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdGhpcy5tZXRob2RzLnVwZGF0ZVBvaW50KGRvdCk7XG4gICAgICAgICAgICAgIHRoaXMuc2Nyb2xsVG9wID0gcGFyc2VJbnQoZG90LnkgLyAyIC0gdGhpcy5zeXN0ZW1JbmZvLndpbmRvd0hlaWdodCArIDEwMCxcbiAgICAgICAgICAgICAgICAxMCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBkcmF3RG90ID0ge1xuICAgICAgICAgICAgICAgIHNpemU6IDEyLFxuICAgICAgICAgICAgICAgIHg6IGRvdC54IC8gMiAtIDYsXG4gICAgICAgICAgICAgICAgeTogZG90LnkgLyAyIC0gNixcbiAgICAgICAgICAgICAgICBjb2xvcjogd2hpdGUsXG4gICAgICAgICAgICAgICAgZm9udENvbG9yOiB3aGl0ZSxcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGkgPT09IDEpIHtcbiAgICAgICAgICAgICAgZHJhd0RvdC50ZXh0ID0gJzFzdCc7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGkgPT09IDEpIHtcbiAgICAgICAgICAgICAgZHJhd0RvdC50ZXh0ID0gJzJuZCc7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGkgPT09IDEpIHtcbiAgICAgICAgICAgICAgZHJhd0RvdC50ZXh0ID0gJzNyZCc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBkcmF3RG90LnRleHQgPSBgJHtpfXRoYDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRyYXdEb3RzLnB1c2goZHJhd0RvdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmRyYXdEb3RzID0gZHJhd0RvdHM7XG4gICAgICB9LFxuICAgIH1cblxuICAgIGV2ZW50cyA9IHtcblxuICAgIH1cblxuICAgIG9uU2hvdygpIHtcbiAgICAgIGlmICh0aGlzLmlzUmVhZHkpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZXIpO1xuICAgICAgICB0aGlzLm1ldGhvZHMudXBkYXRlQ2hhbGxlZ2UoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBvbkhpZGUoKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lcik7XG4gICAgfVxuXG4gICAgb25Mb2FkKG9wdGlvbikge1xuICAgICAgY29uc29sZS5sb2coJ2NoYWxsZW5nZSBvbiBsb2FkJywgb3B0aW9uKTtcbiAgICAgIHRoaXMuaWQgPSBvcHRpb24uaWQ7XG4gICAgICBsb2FkaW5nLnNob3coKTtcbiAgICB9XG5cbiAgICBvblJlYWR5KCkge1xuICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICBjb25zdCBzeXN0ZW1JbmZvID0gd2VweS5nZXRTeXN0ZW1JbmZvU3luYygpO1xuICAgICAgY29uc3Qgc2NhbGUgPSAzNzUgLyBzeXN0ZW1JbmZvLndpbmRvd1dpZHRoO1xuICAgICAgdGhpcy5pc1JlYWR5ID0gdHJ1ZTtcbiAgICAgIHRoaXMuc3lzdGVtSW5mbyA9IHN5c3RlbUluZm87XG4gICAgICB0aGlzLmNvbnRleHQgPSB3ZXB5LmNyZWF0ZUNhbnZhc0NvbnRleHQoJ2RvdHNDYW52YXMnKTtcbiAgICAgIHRoaXMuc2NyZWVuU2NhbGUgPSBzY2FsZTtcbiAgICAgIHRoaXMuZG90cyA9IGluaXREb3RzLm1hcChkID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB4OiBkLnggLyBzY2FsZSxcbiAgICAgICAgICB5OiBkLnkgLyBzY2FsZVxuICAgICAgICB9O1xuICAgICAgfSk7XG5cbiAgICAgIHJlcXVlc3QuZ2V0VXNlckluZm8oKS50aGVuKGQgPT4ge1xuICAgICAgICBzZWxmLnVzZXJJbmZvID0gZDtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZXIpO1xuICAgICAgICB0aGlzLm1ldGhvZHMudXBkYXRlQ2hhbGxlZ2UoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4iXX0=