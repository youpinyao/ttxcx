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

var _jquery = require('./../npm/jquery/dist/jquery.js');

var _jquery2 = _interopRequireDefault(_jquery);

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
        _global2.default.meals = _jquery2.default.extend(true, [], _this.meals);
        console.log(_jquery2.default.extend(true, [], _this.meals));
        _wepy2.default.navigateBack();
      }
    }, _this.events = {}, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(BookingMeal, [{
    key: 'onShow',
    value: function onShow() {
      this.meals = _jquery2.default.extend(true, [], _global2.default.meals) || [];
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJvb2tpbmctbWVhbC5qcyJdLCJuYW1lcyI6WyJCb29raW5nTWVhbCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsImRhdGEiLCJtZWFscyIsImNvbXB1dGVkIiwibWV0aG9kcyIsImRvU2F2ZSIsImUiLCJleHRlbmQiLCJjb25zb2xlIiwibG9nIiwibmF2aWdhdGVCYWNrIiwiZXZlbnRzIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0lBRXFCQSxXOzs7Ozs7Ozs7Ozs7OztzTkFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUlWQyxNLEdBQVMsRUFBQyxhQUFZLEVBQUMsZ0JBQWUsRUFBQyxPQUFNLE9BQVAsRUFBZSxRQUFPLE1BQXRCLEVBQTZCLFNBQVEsT0FBckMsRUFBNkMsT0FBTSxPQUFuRCxFQUEyRCxTQUFRLE1BQW5FLEVBQWhCLEVBQTJGLG9CQUFtQixFQUFDLE9BQU0sT0FBUCxFQUFlLFFBQU8sTUFBdEIsRUFBNkIsU0FBUSxPQUFyQyxFQUE2QyxPQUFNLE9BQW5ELEVBQTJELFNBQVEsTUFBbkUsRUFBOUcsRUFBYixFQUF1TSxhQUFZLEVBQUMsWUFBVyxFQUFaLEVBQW5OLEUsUUFDWkMsTyxHQUFVLEUsUUFDVEMsVSxHQUFhO0FBQ1IscUNBRFE7QUFFUjtBQUZRLEssUUFLVkMsSSxHQUFPO0FBQ0xDLGFBQU87QUFERixLLFFBSVBDLFEsR0FBVyxFLFFBSVhDLE8sR0FBVTtBQUNSQyxjQUFRLGdCQUFDQyxDQUFELEVBQU87QUFDYix5QkFBT0osS0FBUCxHQUFlLGlCQUFFSyxNQUFGLENBQVMsSUFBVCxFQUFlLEVBQWYsRUFBbUIsTUFBS0wsS0FBeEIsQ0FBZjtBQUNBTSxnQkFBUUMsR0FBUixDQUFZLGlCQUFFRixNQUFGLENBQVMsSUFBVCxFQUFlLEVBQWYsRUFBbUIsTUFBS0wsS0FBeEIsQ0FBWjtBQUNBLHVCQUFLUSxZQUFMO0FBQ0Q7QUFMTyxLLFFBUVZDLE0sR0FBUyxFOzs7Ozs2QkFJQTtBQUNQLFdBQUtULEtBQUwsR0FBYSxpQkFBRUssTUFBRixDQUFTLElBQVQsRUFBZSxFQUFmLEVBQW1CLGlCQUFPTCxLQUExQixLQUFvQyxFQUFqRDtBQUNEOzs7NkJBRVE7QUFDUE0sY0FBUUMsR0FBUixDQUFZLHNCQUFaO0FBQ0Q7OztFQXRDc0MsZUFBS0csSTs7a0JBQXpCakIsVyIsImZpbGUiOiJib29raW5nLW1lYWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG4gIGltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG4gIGltcG9ydCBtZWFsSXRlbSBmcm9tICcuLi9jb21wb25lbnRzL21lYWwtaXRlbSc7XG4gIGltcG9ydCBnbG9iYWwgZnJvbSAnLi4vc2VydmljZXMvZ2xvYmFsLmpzJztcbiAgaW1wb3J0IG51bGxMaXN0IGZyb20gJy4uL2NvbXBvbmVudHMvbnVsbExpc3QnO1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvb2tpbmdNZWFsIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn57q/5LiK6aKE57qmJyxcbiAgICB9XG5cbiAgICRwcm9wcyA9IHtcIm1lYWwtaXRlbVwiOntcInhtbG5zOnYtYmluZFwiOntcImZvclwiOlwibWVhbHNcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwiLFwidmFsdWVcIjpcIml0ZW1cIn0sXCJ2LWJpbmQ6aXRlbS5zeW5jXCI6e1wiZm9yXCI6XCJtZWFsc1wiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCIsXCJ2YWx1ZVwiOlwiaXRlbVwifX0sXCJudWxsLWxpc3RcIjp7XCJ4bWxuczp3eFwiOlwiXCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgICdtZWFsLWl0ZW0nOiBtZWFsSXRlbSxcbiAgICAgICdudWxsLWxpc3QnOiBudWxsTGlzdCxcbiAgICB9XG5cbiAgICBkYXRhID0ge1xuICAgICAgbWVhbHM6IFtdLFxuICAgIH1cblxuICAgIGNvbXB1dGVkID0ge1xuXG4gICAgfVxuXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGRvU2F2ZTogKGUpID0+IHtcbiAgICAgICAgZ2xvYmFsLm1lYWxzID0gJC5leHRlbmQodHJ1ZSwgW10sIHRoaXMubWVhbHMpO1xuICAgICAgICBjb25zb2xlLmxvZygkLmV4dGVuZCh0cnVlLCBbXSwgdGhpcy5tZWFscykpO1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlQmFjaygpO1xuICAgICAgfSxcbiAgICB9XG5cbiAgICBldmVudHMgPSB7XG5cbiAgICB9XG5cbiAgICBvblNob3coKSB7XG4gICAgICB0aGlzLm1lYWxzID0gJC5leHRlbmQodHJ1ZSwgW10sIGdsb2JhbC5tZWFscykgfHwgW107XG4gICAgfVxuXG4gICAgb25Mb2FkKCkge1xuICAgICAgY29uc29sZS5sb2coJ2Jvb2tpbmcgbWVhbCBvbiBsb2FkJyk7XG4gICAgfVxuICB9XG5cbiJdfQ==