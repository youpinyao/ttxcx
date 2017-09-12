'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _promise = require('./../babel-runtime/core-js/promise.js');

var _promise2 = _interopRequireDefault(_promise);

var _typeof2 = require('./../babel-runtime/helpers/typeof.js');

var _typeof3 = _interopRequireDefault(_typeof2);

var _getPrototypeOf = require('./../babel-runtime/core-js/object/get-prototype-of.js');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('./../babel-runtime/helpers/classCallCheck.js');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('./../babel-runtime/helpers/createClass.js');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('./../babel-runtime/helpers/possibleConstructorReturn.js');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('./../babel-runtime/helpers/inherits.js');

var _inherits3 = _interopRequireDefault(_inherits2);

var _wepy = require('./../wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Panel = function (_wepy$component) {
    (0, _inherits3.default)(Panel, _wepy$component);

    function Panel() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, Panel);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Panel.__proto__ || (0, _getPrototypeOf2.default)(Panel)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
            reveal: false,
            img: '',
            animationData: '',
            imgClassName: '',
            imgMode: 'scaleToFill',
            title: '载入中...',
            titleClassName: ''
        }, _this.methods = {}, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(Panel, [{
        key: 'onLoad',
        value: function onLoad() {
            this.hasPromise = (typeof _promise2.default === 'undefined' ? 'undefined' : (0, _typeof3.default)(_promise2.default)) !== undefined;
        }
    }, {
        key: 'show',
        value: function show() {
            var _this2 = this;

            var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            this.reveal = true;
            for (var k in data) {
                this[k] = data[k];
            }
            this.$apply();

            clearTimeout(this.__timeout);

            setTimeout(function () {
                var animation = wx.createAnimation();
                animation.opacity(1).step();
                _this2.animationData = animation.export();
                _this2.reveal = true;
                _this2.$apply();
            }, 30);

            if (data.duration === 0) {
                // success callback after toast showed
                if (this.hasPromise) {
                    return new _promise2.default(function (resolve, reject) {
                        setTimeout(function () {
                            resolve(data);
                        }, 430);
                    });
                } else {
                    setTimeout(function () {
                        return typeof data.success === 'function' ? data.success(data) : data;
                    }, 430);
                }
            } else {
                if (this.hasPromise) {
                    return new _promise2.default(function (resolve, reject) {
                        _this2.__timeout = setTimeout(function () {
                            _this2.toast();
                            resolve(data);
                        }, (data.duration || 1500) + 400);
                    });
                } else {
                    this.__timeout = setTimeout(function () {
                        _this2.toast();

                        // success callback
                        typeof data.success === 'function' && data.success(data);
                    }, (data.duration || 1500) + 400);
                }
            }
        }
    }, {
        key: 'toast',
        value: function toast(data) {
            var err = false;
            try {
                if (!data) {
                    this.hide();
                } else {
                    this.show(data);
                }
            } catch (e) {
                err = e;
            }

            if (this.hasPromise) {
                return new _promise2.default(function (resolve, reject) {
                    if (!err) {
                        resolve(data);
                    } else reject(data);
                });
            } else {
                if (err) {
                    typeof data.fail === 'function' && data.fail(data);
                } else {
                    typeof data.success === 'function' && data.success(data);
                }
            }
        }
    }, {
        key: 'hide',
        value: function hide() {
            clearTimeout(this.__timeout);
            this.reveal = false;

            var animation = wx.createAnimation();
            animation.opacity(0).step();
            this.animationData = animation.export();

            this.$apply();

            if (this.hasPromise) {
                return new _promise2.default(function (resolve, reject) {
                    resolve();
                });
            } else {
                if (typeof data.success === 'function') {
                    return data.success(data);
                }
            }
        }
    }]);
    return Panel;
}(_wepy2.default.component);

exports.default = Panel;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRvYXN0LmpzIl0sIm5hbWVzIjpbIlBhbmVsIiwiZGF0YSIsInJldmVhbCIsImltZyIsImFuaW1hdGlvbkRhdGEiLCJpbWdDbGFzc05hbWUiLCJpbWdNb2RlIiwidGl0bGUiLCJ0aXRsZUNsYXNzTmFtZSIsIm1ldGhvZHMiLCJoYXNQcm9taXNlIiwidW5kZWZpbmVkIiwiayIsIiRhcHBseSIsImNsZWFyVGltZW91dCIsIl9fdGltZW91dCIsInNldFRpbWVvdXQiLCJhbmltYXRpb24iLCJ3eCIsImNyZWF0ZUFuaW1hdGlvbiIsIm9wYWNpdHkiLCJzdGVwIiwiZXhwb3J0IiwiZHVyYXRpb24iLCJyZXNvbHZlIiwicmVqZWN0Iiwic3VjY2VzcyIsInRvYXN0IiwiZXJyIiwiaGlkZSIsInNob3ciLCJlIiwiZmFpbCIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDSTs7Ozs7O0lBRXFCQSxLOzs7Ozs7Ozs7Ozs7Ozs4TUFFakJDLEksR0FBTztBQUNIQyxvQkFBUSxLQURMO0FBRUhDLGlCQUFLLEVBRkY7QUFHSEMsMkJBQWUsRUFIWjtBQUlIQywwQkFBYyxFQUpYO0FBS0hDLHFCQUFTLGFBTE47QUFNSEMsbUJBQU8sUUFOSjtBQU9IQyw0QkFBZ0I7QUFQYixTLFFBVWRDLE8sR0FBVSxFOzs7OztpQ0FFTztBQUNOLGlCQUFLQyxVQUFMLEdBQW1CLHdHQUFtQkMsU0FBdEM7QUFDSDs7OytCQUVnQjtBQUFBOztBQUFBLGdCQUFYVixJQUFXLHVFQUFKLEVBQUk7O0FBQ2IsaUJBQUtDLE1BQUwsR0FBYyxJQUFkO0FBQ0EsaUJBQUssSUFBSVUsQ0FBVCxJQUFjWCxJQUFkLEVBQW9CO0FBQ2hCLHFCQUFLVyxDQUFMLElBQVVYLEtBQUtXLENBQUwsQ0FBVjtBQUNIO0FBQ0QsaUJBQUtDLE1BQUw7O0FBRUFDLHlCQUFhLEtBQUtDLFNBQWxCOztBQUVBQyx1QkFBVyxZQUFJO0FBQ1gsb0JBQUlDLFlBQVlDLEdBQUdDLGVBQUgsRUFBaEI7QUFDQUYsMEJBQVVHLE9BQVYsQ0FBa0IsQ0FBbEIsRUFBcUJDLElBQXJCO0FBQ0EsdUJBQUtqQixhQUFMLEdBQXFCYSxVQUFVSyxNQUFWLEVBQXJCO0FBQ0EsdUJBQUtwQixNQUFMLEdBQWMsSUFBZDtBQUNBLHVCQUFLVyxNQUFMO0FBQ0gsYUFORCxFQU1FLEVBTkY7O0FBU0EsZ0JBQUlaLEtBQUtzQixRQUFMLEtBQWtCLENBQXRCLEVBQXlCO0FBQ3JCO0FBQ0Esb0JBQUksS0FBS2IsVUFBVCxFQUFxQjtBQUNqQiwyQkFBTyxzQkFBWSxVQUFDYyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDcENULG1DQUFZLFlBQU07QUFDZFEsb0NBQVF2QixJQUFSO0FBQ0gseUJBRkQsRUFFRyxHQUZIO0FBR0gscUJBSk0sQ0FBUDtBQUtILGlCQU5ELE1BTVE7QUFDSmUsK0JBQVksWUFBTTtBQUNkLCtCQUFRLE9BQU9mLEtBQUt5QixPQUFaLEtBQXdCLFVBQXpCLEdBQXVDekIsS0FBS3lCLE9BQUwsQ0FBYXpCLElBQWIsQ0FBdkMsR0FBNERBLElBQW5FO0FBQ0gscUJBRkQsRUFFRyxHQUZIO0FBR0g7QUFDSixhQWJELE1BYU87QUFDSCxvQkFBSSxLQUFLUyxVQUFULEVBQXFCO0FBQ2pCLDJCQUFPLHNCQUFZLFVBQUNjLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUNwQywrQkFBS1YsU0FBTCxHQUFpQkMsV0FBWSxZQUFNO0FBQy9CLG1DQUFLVyxLQUFMO0FBQ0FILG9DQUFRdkIsSUFBUjtBQUNILHlCQUhnQixFQUdkLENBQUNBLEtBQUtzQixRQUFMLElBQWlCLElBQWxCLElBQTBCLEdBSFosQ0FBakI7QUFJSCxxQkFMTSxDQUFQO0FBTUgsaUJBUEQsTUFPTztBQUNILHlCQUFLUixTQUFMLEdBQWlCQyxXQUFXLFlBQU07QUFDOUIsK0JBQUtXLEtBQUw7O0FBRUE7QUFDQSwrQkFBTzFCLEtBQUt5QixPQUFaLEtBQXdCLFVBQXhCLElBQXNDekIsS0FBS3lCLE9BQUwsQ0FBYXpCLElBQWIsQ0FBdEM7QUFDSCxxQkFMZ0IsRUFLZCxDQUFDQSxLQUFLc0IsUUFBTCxJQUFpQixJQUFsQixJQUEwQixHQUxaLENBQWpCO0FBTUg7QUFDSjtBQUNKOzs7OEJBRU10QixJLEVBQU07QUFDVCxnQkFBSTJCLE1BQU0sS0FBVjtBQUNBLGdCQUFJO0FBQ0Esb0JBQUksQ0FBQzNCLElBQUwsRUFBVztBQUNQLHlCQUFLNEIsSUFBTDtBQUNILGlCQUZELE1BRU87QUFDSCx5QkFBS0MsSUFBTCxDQUFVN0IsSUFBVjtBQUNIO0FBQ0osYUFORCxDQU1FLE9BQU84QixDQUFQLEVBQVU7QUFDUkgsc0JBQU1HLENBQU47QUFDSDs7QUFFRCxnQkFBSSxLQUFLckIsVUFBVCxFQUFxQjtBQUNqQix1QkFBTyxzQkFBWSxVQUFDYyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDcEMsd0JBQUksQ0FBQ0csR0FBTCxFQUFVO0FBQ05KLGdDQUFRdkIsSUFBUjtBQUNILHFCQUZELE1BR0l3QixPQUFPeEIsSUFBUDtBQUNQLGlCQUxNLENBQVA7QUFNSCxhQVBELE1BT087QUFDSCxvQkFBSTJCLEdBQUosRUFBUztBQUNMLDJCQUFPM0IsS0FBSytCLElBQVosS0FBcUIsVUFBckIsSUFBbUMvQixLQUFLK0IsSUFBTCxDQUFVL0IsSUFBVixDQUFuQztBQUNILGlCQUZELE1BRU87QUFDSCwyQkFBT0EsS0FBS3lCLE9BQVosS0FBd0IsVUFBeEIsSUFBc0N6QixLQUFLeUIsT0FBTCxDQUFhekIsSUFBYixDQUF0QztBQUNIO0FBQ0o7QUFDSjs7OytCQUVPO0FBQ0phLHlCQUFhLEtBQUtDLFNBQWxCO0FBQ0EsaUJBQUtiLE1BQUwsR0FBYyxLQUFkOztBQUVBLGdCQUFJZSxZQUFZQyxHQUFHQyxlQUFILEVBQWhCO0FBQ0FGLHNCQUFVRyxPQUFWLENBQWtCLENBQWxCLEVBQXFCQyxJQUFyQjtBQUNBLGlCQUFLakIsYUFBTCxHQUFxQmEsVUFBVUssTUFBVixFQUFyQjs7QUFFQSxpQkFBS1QsTUFBTDs7QUFFQSxnQkFBSSxLQUFLSCxVQUFULEVBQXFCO0FBQ2pCLHVCQUFPLHNCQUFZLFVBQUNjLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUNwQ0Q7QUFDSCxpQkFGTSxDQUFQO0FBR0gsYUFKRCxNQUlPO0FBQ0gsb0JBQUksT0FBT3ZCLEtBQUt5QixPQUFaLEtBQXdCLFVBQTVCLEVBQXdDO0FBQ3BDLDJCQUFPekIsS0FBS3lCLE9BQUwsQ0FBYXpCLElBQWIsQ0FBUDtBQUNIO0FBQ0o7QUFDSjs7O0VBbkg4QixlQUFLZ0MsUzs7a0JBQW5CakMsSyIsImZpbGUiOiJ0b2FzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4gICAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcblxyXG4gICAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFuZWwgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XHJcblxyXG4gICAgICAgIGRhdGEgPSB7XHJcbiAgICAgICAgICAgIHJldmVhbDogZmFsc2UsXHJcbiAgICAgICAgICAgIGltZzogJycsXHJcbiAgICAgICAgICAgIGFuaW1hdGlvbkRhdGE6ICcnLFxyXG4gICAgICAgICAgICBpbWdDbGFzc05hbWU6ICcnLFxyXG4gICAgICAgICAgICBpbWdNb2RlOiAnc2NhbGVUb0ZpbGwnLFxyXG4gICAgICAgICAgICB0aXRsZTogJ+i9veWFpeS4rS4uLicsXHJcbiAgICAgICAgICAgIHRpdGxlQ2xhc3NOYW1lOiAnJ1xyXG4gICAgICAgIH07XHJcblxyXG5cdG1ldGhvZHMgPSB7fTtcclxuXHJcbiAgICAgICAgb25Mb2FkICgpIHtcclxuICAgICAgICAgICAgdGhpcy5oYXNQcm9taXNlID0gKHR5cGVvZiBQcm9taXNlICE9PSB1bmRlZmluZWQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2hvdyAoZGF0YSA9IHt9KSB7XHJcbiAgICAgICAgICAgIHRoaXMucmV2ZWFsID0gdHJ1ZTtcclxuICAgICAgICAgICAgZm9yIChsZXQgayBpbiBkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzW2tdID0gZGF0YVtrXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG5cclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX190aW1lb3V0KTtcclxuXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCk9PntcclxuICAgICAgICAgICAgICAgIGxldCBhbmltYXRpb24gPSB3eC5jcmVhdGVBbmltYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbi5vcGFjaXR5KDEpLnN0ZXAoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uRGF0YSA9IGFuaW1hdGlvbi5leHBvcnQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmV2ZWFsID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIH0sMzApO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhLmR1cmF0aW9uID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBzdWNjZXNzIGNhbGxiYWNrIGFmdGVyIHRvYXN0IHNob3dlZFxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaGFzUHJvbWlzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQgKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDQzMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9ICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0ICgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAodHlwZW9mIGRhdGEuc3VjY2VzcyA9PT0gJ2Z1bmN0aW9uJykgPyBkYXRhLnN1Y2Nlc3MoZGF0YSkgOiBkYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDQzMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5oYXNQcm9taXNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fX3RpbWVvdXQgPSBzZXRUaW1lb3V0ICgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRvYXN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAoZGF0YS5kdXJhdGlvbiB8fCAxNTAwKSArIDQwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX190aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudG9hc3QoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHN1Y2Nlc3MgY2FsbGJhY2tcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZW9mIGRhdGEuc3VjY2VzcyA9PT0gJ2Z1bmN0aW9uJyAmJiBkYXRhLnN1Y2Nlc3MoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgKGRhdGEuZHVyYXRpb24gfHwgMTUwMCkgKyA0MDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdG9hc3QgKGRhdGEpIHtcclxuICAgICAgICAgICAgbGV0IGVyciA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvdyhkYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgZXJyID0gZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuaGFzUHJvbWlzZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlb2YgZGF0YS5mYWlsID09PSAnZnVuY3Rpb24nICYmIGRhdGEuZmFpbChkYXRhKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZW9mIGRhdGEuc3VjY2VzcyA9PT0gJ2Z1bmN0aW9uJyAmJiBkYXRhLnN1Y2Nlc3MoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBoaWRlICgpIHtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX190aW1lb3V0KTtcclxuICAgICAgICAgICAgdGhpcy5yZXZlYWwgPSBmYWxzZTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBhbmltYXRpb24gPSB3eC5jcmVhdGVBbmltYXRpb24oKTtcclxuICAgICAgICAgICAgYW5pbWF0aW9uLm9wYWNpdHkoMCkuc3RlcCgpO1xyXG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbkRhdGEgPSBhbmltYXRpb24uZXhwb3J0KCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuaGFzUHJvbWlzZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZGF0YS5zdWNjZXNzID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGEuc3VjY2VzcyhkYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuIl19