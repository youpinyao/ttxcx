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
      preview: function preview(e) {
        _wepy2.default.previewImage({
          current: _this.item.picture,
          urls: [_this.item.picture]
        });
      },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lYWwtaXRlbS5qcyJdLCJuYW1lcyI6WyJNZWFsSXRlbSIsInByb3BzIiwiaXRlbSIsInR5cGUiLCJPYmplY3QiLCJ0d29XYXkiLCJtZXRob2RzIiwicHJldmlldyIsImUiLCJwcmV2aWV3SW1hZ2UiLCJjdXJyZW50IiwicGljdHVyZSIsInVybHMiLCJwbHVzIiwidW5kZWZpbmVkIiwiYW1vdW50IiwibWF4IiwibWludXMiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7Ozs7O0lBRXFCQSxROzs7Ozs7Ozs7Ozs7OztnTkFDbkJDLEssR0FBUTtBQUNOQyxZQUFNO0FBQ0pDLGNBQU1DLE1BREY7QUFFSkMsZ0JBQVE7QUFGSjtBQURBLEssUUFPUkMsTyxHQUFVO0FBQ1JDLGVBQVMsaUJBQUNDLENBQUQsRUFBTztBQUNkLHVCQUFLQyxZQUFMLENBQWtCO0FBQ2hCQyxtQkFBUyxNQUFLUixJQUFMLENBQVVTLE9BREg7QUFFaEJDLGdCQUFNLENBQUMsTUFBS1YsSUFBTCxDQUFVUyxPQUFYO0FBRlUsU0FBbEI7QUFJRCxPQU5PO0FBT1JFLFlBQU0sY0FBQ0wsQ0FBRCxFQUFPO0FBQ1gsWUFBSSxhQUFHTSxTQUFILENBQWEsTUFBS1osSUFBTCxDQUFVYSxNQUF2QixDQUFKLEVBQW9DO0FBQ2xDLGdCQUFLYixJQUFMLENBQVVhLE1BQVYsR0FBbUIsQ0FBbkI7QUFDRDtBQUNELGNBQUtiLElBQUwsQ0FBVWEsTUFBVjtBQUNBLFlBQUksTUFBS2IsSUFBTCxDQUFVYyxHQUFWLElBQWlCLE1BQUtkLElBQUwsQ0FBVWEsTUFBVixHQUFtQixNQUFLYixJQUFMLENBQVVjLEdBQWxELEVBQXVEO0FBQ3JELGdCQUFLZCxJQUFMLENBQVVhLE1BQVYsR0FBbUIsTUFBS2IsSUFBTCxDQUFVYyxHQUE3QjtBQUNEO0FBQ0YsT0FmTztBQWdCUkMsYUFBTyxlQUFDVCxDQUFELEVBQU87QUFDWixZQUFJLGFBQUdNLFNBQUgsQ0FBYSxNQUFLWixJQUFMLENBQVVhLE1BQXZCLENBQUosRUFBb0M7QUFDbEMsZ0JBQUtiLElBQUwsQ0FBVWEsTUFBVixHQUFtQixDQUFuQjtBQUNEO0FBQ0QsY0FBS2IsSUFBTCxDQUFVYSxNQUFWO0FBQ0EsWUFBSSxNQUFLYixJQUFMLENBQVVhLE1BQVYsSUFBb0IsQ0FBeEIsRUFBMkI7QUFDekIsZ0JBQUtiLElBQUwsQ0FBVWEsTUFBVixHQUFtQixDQUFuQjtBQUNEO0FBQ0Y7QUF4Qk8sSzs7OztFQVIwQixlQUFLRyxTOztrQkFBdEJsQixRIiwiZmlsZSI6Im1lYWwtaXRlbS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbiAgaW1wb3J0IGlzIGZyb20gJy4uL3NlcnZpY2VzL2lzLmpzJztcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBNZWFsSXRlbSBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgICBwcm9wcyA9IHtcbiAgICAgIGl0ZW06IHtcbiAgICAgICAgdHlwZTogT2JqZWN0LFxuICAgICAgICB0d29XYXk6IHRydWUsXG4gICAgICB9LFxuICAgIH1cblxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBwcmV2aWV3OiAoZSkgPT4ge1xuICAgICAgICB3ZXB5LnByZXZpZXdJbWFnZSh7XG4gICAgICAgICAgY3VycmVudDogdGhpcy5pdGVtLnBpY3R1cmUsXG4gICAgICAgICAgdXJsczogW3RoaXMuaXRlbS5waWN0dXJlXSxcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgcGx1czogKGUpID0+IHtcbiAgICAgICAgaWYgKGlzLnVuZGVmaW5lZCh0aGlzLml0ZW0uYW1vdW50KSkge1xuICAgICAgICAgIHRoaXMuaXRlbS5hbW91bnQgPSAwO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaXRlbS5hbW91bnQrKztcbiAgICAgICAgaWYgKHRoaXMuaXRlbS5tYXggJiYgdGhpcy5pdGVtLmFtb3VudCA+IHRoaXMuaXRlbS5tYXgpIHtcbiAgICAgICAgICB0aGlzLml0ZW0uYW1vdW50ID0gdGhpcy5pdGVtLm1heDtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG1pbnVzOiAoZSkgPT4ge1xuICAgICAgICBpZiAoaXMudW5kZWZpbmVkKHRoaXMuaXRlbS5hbW91bnQpKSB7XG4gICAgICAgICAgdGhpcy5pdGVtLmFtb3VudCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pdGVtLmFtb3VudC0tO1xuICAgICAgICBpZiAodGhpcy5pdGVtLmFtb3VudCA8PSAwKSB7XG4gICAgICAgICAgdGhpcy5pdGVtLmFtb3VudCA9IDA7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfVxuICB9XG5cbiJdfQ==