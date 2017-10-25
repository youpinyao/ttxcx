'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CheckBox = function (_wepy$component) {
  (0, _inherits3.default)(CheckBox, _wepy$component);

  function CheckBox() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, CheckBox);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = CheckBox.__proto__ || (0, _getPrototypeOf2.default)(CheckBox)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
      checked: {
        type: Boolean,
        default: false,
        twoWay: true
      }
    }, _this.data = {
      isLoaded: false
    }, _this.methods = {
      toggleCheck: function toggleCheck() {
        _this.checked = !_this.checked;
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(CheckBox, [{
    key: 'onLoad',
    value: function onLoad() {
      this.isLoaded = true;
    }
  }]);
  return CheckBox;
}(_wepy2.default.component);

exports.default = CheckBox;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNoZWNrYm94LmpzIl0sIm5hbWVzIjpbIkNoZWNrQm94IiwicHJvcHMiLCJjaGVja2VkIiwidHlwZSIsIkJvb2xlYW4iLCJkZWZhdWx0IiwidHdvV2F5IiwiZGF0YSIsImlzTG9hZGVkIiwibWV0aG9kcyIsInRvZ2dsZUNoZWNrIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDRTs7Ozs7O0lBQ3FCQSxROzs7Ozs7Ozs7Ozs7OztnTkFDbkJDLEssR0FBUTtBQUNOQyxlQUFTO0FBQ1BDLGNBQU1DLE9BREM7QUFFUEMsaUJBQVMsS0FGRjtBQUdQQyxnQkFBUTtBQUhEO0FBREgsSyxRQU9SQyxJLEdBQU87QUFDTEMsZ0JBQVU7QUFETCxLLFFBR1BDLE8sR0FBVTtBQUNSQyxtQkFBYSx1QkFBTTtBQUNqQixjQUFLUixPQUFMLEdBQWUsQ0FBQyxNQUFLQSxPQUFyQjtBQUNEO0FBSE8sSzs7Ozs7NkJBS0Q7QUFDUCxXQUFLTSxRQUFMLEdBQWdCLElBQWhCO0FBQ0Q7OztFQWxCbUMsZUFBS0csUzs7a0JBQXRCWCxRIiwiZmlsZSI6ImNoZWNrYm94LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBDaGVja0JveCBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgICBwcm9wcyA9IHtcbiAgICAgIGNoZWNrZWQ6IHtcbiAgICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgICAgZGVmYXVsdDogZmFsc2UsXG4gICAgICAgIHR3b1dheTogdHJ1ZVxuICAgICAgfSxcbiAgICB9O1xuICAgIGRhdGEgPSB7XG4gICAgICBpc0xvYWRlZDogZmFsc2UsXG4gICAgfTtcbiAgICBtZXRob2RzID0ge1xuICAgICAgdG9nZ2xlQ2hlY2s6ICgpID0+IHtcbiAgICAgICAgdGhpcy5jaGVja2VkID0gIXRoaXMuY2hlY2tlZDtcbiAgICAgIH0sXG4gICAgfTtcbiAgICBvbkxvYWQoKSB7XG4gICAgICB0aGlzLmlzTG9hZGVkID0gdHJ1ZTtcbiAgICB9O1xuICB9XG4iXX0=