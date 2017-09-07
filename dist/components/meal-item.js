'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getPrototypeOf = require('./../npm/babel-runtime/core-js/object/get-prototype-of.js');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('./../npm/babel-runtime/helpers/classCallCheck.js');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('./../npm/babel-runtime/helpers/possibleConstructorReturn.js');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('./../npm/babel-runtime/helpers/inherits.js');

var _inherits3 = _interopRequireDefault(_inherits2);

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _is = require('./../services/is.js');

var _is2 = _interopRequireDefault(_is);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MealItem = function (_wepy$component) {
  (0, _inherits3.default)(MealItem, _wepy$component);

  function MealItem() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, MealItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = MealItem.__proto__ || (0, _getPrototypeOf2.default)(MealItem)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
      item: {
        type: Object,
        twoWay: true
      }
    }, _this.methods = {
      plus: function plus(e) {
        if (_is2.default.undefined(_this.item.amount)) {
          _this.item.amount = 0;
        }
        _this.item.amount++;
        if (_this.item.max && _this.item.amount > _this.item.max) {
          _this.item.amount = _this.item.max;
        }
      },
      minus: function minus(e) {
        if (_is2.default.undefined(_this.item.amount)) {
          _this.item.amount = 0;
        }
        _this.item.amount--;
        if (_this.item.amount <= 0) {
          _this.item.amount = 0;
        }
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  return MealItem;
}(_wepy2.default.component);

exports.default = MealItem;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lYWwtaXRlbS5qcyJdLCJuYW1lcyI6WyJNZWFsSXRlbSIsInByb3BzIiwiaXRlbSIsInR5cGUiLCJPYmplY3QiLCJ0d29XYXkiLCJtZXRob2RzIiwicGx1cyIsImUiLCJ1bmRlZmluZWQiLCJhbW91bnQiLCJtYXgiLCJtaW51cyIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7Ozs7SUFFcUJBLFE7Ozs7Ozs7Ozs7Ozs7O2dOQUNuQkMsSyxHQUFRO0FBQ05DLFlBQU07QUFDSkMsY0FBTUMsTUFERjtBQUVKQyxnQkFBUTtBQUZKO0FBREEsSyxRQU9SQyxPLEdBQVU7QUFDUkMsWUFBTSxjQUFDQyxDQUFELEVBQU87QUFDWCxZQUFJLGFBQUdDLFNBQUgsQ0FBYSxNQUFLUCxJQUFMLENBQVVRLE1BQXZCLENBQUosRUFBb0M7QUFDbEMsZ0JBQUtSLElBQUwsQ0FBVVEsTUFBVixHQUFtQixDQUFuQjtBQUNEO0FBQ0QsY0FBS1IsSUFBTCxDQUFVUSxNQUFWO0FBQ0EsWUFBSSxNQUFLUixJQUFMLENBQVVTLEdBQVYsSUFBaUIsTUFBS1QsSUFBTCxDQUFVUSxNQUFWLEdBQW1CLE1BQUtSLElBQUwsQ0FBVVMsR0FBbEQsRUFBdUQ7QUFDckQsZ0JBQUtULElBQUwsQ0FBVVEsTUFBVixHQUFtQixNQUFLUixJQUFMLENBQVVTLEdBQTdCO0FBQ0Q7QUFDRixPQVRPO0FBVVJDLGFBQU8sZUFBQ0osQ0FBRCxFQUFPO0FBQ1osWUFBSSxhQUFHQyxTQUFILENBQWEsTUFBS1AsSUFBTCxDQUFVUSxNQUF2QixDQUFKLEVBQW9DO0FBQ2xDLGdCQUFLUixJQUFMLENBQVVRLE1BQVYsR0FBbUIsQ0FBbkI7QUFDRDtBQUNELGNBQUtSLElBQUwsQ0FBVVEsTUFBVjtBQUNBLFlBQUksTUFBS1IsSUFBTCxDQUFVUSxNQUFWLElBQW9CLENBQXhCLEVBQTJCO0FBQ3pCLGdCQUFLUixJQUFMLENBQVVRLE1BQVYsR0FBbUIsQ0FBbkI7QUFDRDtBQUNGO0FBbEJPLEs7Ozs7RUFSMEIsZUFBS0csUzs7a0JBQXRCYixRIiwiZmlsZSI6Im1lYWwtaXRlbS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbiAgaW1wb3J0IGlzIGZyb20gJy4uL3NlcnZpY2VzL2lzLmpzJztcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBNZWFsSXRlbSBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgICBwcm9wcyA9IHtcbiAgICAgIGl0ZW06IHtcbiAgICAgICAgdHlwZTogT2JqZWN0LFxuICAgICAgICB0d29XYXk6IHRydWUsXG4gICAgICB9LFxuICAgIH1cblxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBwbHVzOiAoZSkgPT4ge1xuICAgICAgICBpZiAoaXMudW5kZWZpbmVkKHRoaXMuaXRlbS5hbW91bnQpKSB7XG4gICAgICAgICAgdGhpcy5pdGVtLmFtb3VudCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pdGVtLmFtb3VudCsrO1xuICAgICAgICBpZiAodGhpcy5pdGVtLm1heCAmJiB0aGlzLml0ZW0uYW1vdW50ID4gdGhpcy5pdGVtLm1heCkge1xuICAgICAgICAgIHRoaXMuaXRlbS5hbW91bnQgPSB0aGlzLml0ZW0ubWF4O1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgbWludXM6IChlKSA9PiB7XG4gICAgICAgIGlmIChpcy51bmRlZmluZWQodGhpcy5pdGVtLmFtb3VudCkpIHtcbiAgICAgICAgICB0aGlzLml0ZW0uYW1vdW50ID0gMDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLml0ZW0uYW1vdW50LS07XG4gICAgICAgIGlmICh0aGlzLml0ZW0uYW1vdW50IDw9IDApIHtcbiAgICAgICAgICB0aGlzLml0ZW0uYW1vdW50ID0gMDtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9XG4gIH1cblxuIl19