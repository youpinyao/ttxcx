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

var _extend = require('./../npm/extend/index.js');

var _extend2 = _interopRequireDefault(_extend);

var _mealItem = require('./../components/meal-item.js');

var _mealItem2 = _interopRequireDefault(_mealItem);

var _global = require('./../services/global.js');

var _global2 = _interopRequireDefault(_global);

var _nullList = require('./../components/nullList.js');

var _nullList2 = _interopRequireDefault(_nullList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BookingMeal = function (_wepy$page) {
  (0, _inherits3.default)(BookingMeal, _wepy$page);

  function BookingMeal() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, BookingMeal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = BookingMeal.__proto__ || (0, _getPrototypeOf2.default)(BookingMeal)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '线上预约'
    }, _this.$props = { "meal-item": { "xmlns:v-bind": { "for": "meals", "item": "item", "index": "index", "key": "index", "value": "item" }, "v-bind:item.sync": { "for": "meals", "item": "item", "index": "index", "key": "index", "value": "item" } }, "null-list": { "xmlns:wx": "" } }, _this.$events = {}, _this.components = {
      'meal-item': _mealItem2.default,
      'null-list': _nullList2.default
    }, _this.data = {
      meals: []
    }, _this.computed = {}, _this.methods = {
      doSave: function doSave(e) {
        _global2.default.meals = (0, _extend2.default)(true, [], _this.meals);
        _wepy2.default.navigateBack();
      }
    }, _this.events = {}, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(BookingMeal, [{
    key: 'onShow',
    value: function onShow() {
      this.meals = (0, _extend2.default)(true, [], _global2.default.meals) || [];
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      console.log('booking meal on load');
    }
  }]);
  return BookingMeal;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(BookingMeal , 'pages/booking-meal'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJvb2tpbmctbWVhbC5qcyJdLCJuYW1lcyI6WyJCb29raW5nTWVhbCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsImRhdGEiLCJtZWFscyIsImNvbXB1dGVkIiwibWV0aG9kcyIsImRvU2F2ZSIsImUiLCJuYXZpZ2F0ZUJhY2siLCJldmVudHMiLCJjb25zb2xlIiwibG9nIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0lBRXFCQSxXOzs7Ozs7Ozs7Ozs7OztzTkFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUlWQyxNLEdBQVMsRUFBQyxhQUFZLEVBQUMsZ0JBQWUsRUFBQyxPQUFNLE9BQVAsRUFBZSxRQUFPLE1BQXRCLEVBQTZCLFNBQVEsT0FBckMsRUFBNkMsT0FBTSxPQUFuRCxFQUEyRCxTQUFRLE1BQW5FLEVBQWhCLEVBQTJGLG9CQUFtQixFQUFDLE9BQU0sT0FBUCxFQUFlLFFBQU8sTUFBdEIsRUFBNkIsU0FBUSxPQUFyQyxFQUE2QyxPQUFNLE9BQW5ELEVBQTJELFNBQVEsTUFBbkUsRUFBOUcsRUFBYixFQUF1TSxhQUFZLEVBQUMsWUFBVyxFQUFaLEVBQW5OLEUsUUFDWkMsTyxHQUFVLEUsUUFDVEMsVSxHQUFhO0FBQ1IscUNBRFE7QUFFUjtBQUZRLEssUUFLVkMsSSxHQUFPO0FBQ0xDLGFBQU87QUFERixLLFFBSVBDLFEsR0FBVyxFLFFBSVhDLE8sR0FBVTtBQUNSQyxjQUFRLGdCQUFDQyxDQUFELEVBQU87QUFDYix5QkFBT0osS0FBUCxHQUFlLHNCQUFPLElBQVAsRUFBYSxFQUFiLEVBQWlCLE1BQUtBLEtBQXRCLENBQWY7QUFDQSx1QkFBS0ssWUFBTDtBQUNEO0FBSk8sSyxRQU9WQyxNLEdBQVMsRTs7Ozs7NkJBSUE7QUFDUCxXQUFLTixLQUFMLEdBQWEsc0JBQU8sSUFBUCxFQUFhLEVBQWIsRUFBaUIsaUJBQU9BLEtBQXhCLEtBQWtDLEVBQS9DO0FBQ0Q7Ozs2QkFFUTtBQUNQTyxjQUFRQyxHQUFSLENBQVksc0JBQVo7QUFDRDs7O0VBckNzQyxlQUFLQyxJOztrQkFBekJoQixXIiwiZmlsZSI6ImJvb2tpbmctbWVhbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbiAgaW1wb3J0IGV4dGVuZCBmcm9tICdleHRlbmQnO1xuICBpbXBvcnQgbWVhbEl0ZW0gZnJvbSAnLi4vY29tcG9uZW50cy9tZWFsLWl0ZW0nO1xuICBpbXBvcnQgZ2xvYmFsIGZyb20gJy4uL3NlcnZpY2VzL2dsb2JhbC5qcyc7XG4gIGltcG9ydCBudWxsTGlzdCBmcm9tICcuLi9jb21wb25lbnRzL251bGxMaXN0JztcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBCb29raW5nTWVhbCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+e6v+S4iumihOe6picsXG4gICAgfVxuXG4gICAkcHJvcHMgPSB7XCJtZWFsLWl0ZW1cIjp7XCJ4bWxuczp2LWJpbmRcIjp7XCJmb3JcIjpcIm1lYWxzXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIixcInZhbHVlXCI6XCJpdGVtXCJ9LFwidi1iaW5kOml0ZW0uc3luY1wiOntcImZvclwiOlwibWVhbHNcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwiLFwidmFsdWVcIjpcIml0ZW1cIn19LFwibnVsbC1saXN0XCI6e1wieG1sbnM6d3hcIjpcIlwifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICAnbWVhbC1pdGVtJzogbWVhbEl0ZW0sXG4gICAgICAnbnVsbC1saXN0JzogbnVsbExpc3QsXG4gICAgfVxuXG4gICAgZGF0YSA9IHtcbiAgICAgIG1lYWxzOiBbXSxcbiAgICB9XG5cbiAgICBjb21wdXRlZCA9IHtcblxuICAgIH1cblxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBkb1NhdmU6IChlKSA9PiB7XG4gICAgICAgIGdsb2JhbC5tZWFscyA9IGV4dGVuZCh0cnVlLCBbXSwgdGhpcy5tZWFscyk7XG4gICAgICAgIHdlcHkubmF2aWdhdGVCYWNrKCk7XG4gICAgICB9LFxuICAgIH1cblxuICAgIGV2ZW50cyA9IHtcblxuICAgIH1cblxuICAgIG9uU2hvdygpIHtcbiAgICAgIHRoaXMubWVhbHMgPSBleHRlbmQodHJ1ZSwgW10sIGdsb2JhbC5tZWFscykgfHwgW107XG4gICAgfVxuXG4gICAgb25Mb2FkKCkge1xuICAgICAgY29uc29sZS5sb2coJ2Jvb2tpbmcgbWVhbCBvbiBsb2FkJyk7XG4gICAgfVxuICB9XG5cbiJdfQ==