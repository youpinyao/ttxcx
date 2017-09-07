'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _stringify = require('./../npm/babel-runtime/core-js/json/stringify.js');

var _stringify2 = _interopRequireDefault(_stringify);

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

var _urls = require('./../services/urls.js');

var _urls2 = _interopRequireDefault(_urls);

var _loading = require('./../services/loading.js');

var _loading2 = _interopRequireDefault(_loading);

var _wepyComToast = require('./../npm/wepy-com-toast/toast.js');

var _wepyComToast2 = _interopRequireDefault(_wepyComToast);

var _request = require('./../services/request.js');

var _request2 = _interopRequireDefault(_request);

var _is = require('./../services/is.js');

var _is2 = _interopRequireDefault(_is);

var _global = require('./../services/global.js');

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Booking = function (_wepy$page) {
  (0, _inherits3.default)(Booking, _wepy$page);

  function Booking() {
    var _ref,
        _arguments = arguments;

    var _temp, _this, _ret;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    (0, _classCallCheck3.default)(this, Booking);
    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Booking.__proto__ || (0, _getPrototypeOf2.default)(Booking)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '线上预约'
    }, _this.components = {
      toast: _wepyComToast2.default
    }, _this.data = {
      userInfo: null,
      placeData: null,
      maxNumber: null,
      minNumber: null,
      formData: {
        place: '',
        phone: '',
        meals: [],
        number: 0
      }
    }, _this.computed = {
      hasMeal: function hasMeal() {
        return !_is2.default.empty(_this.formData.meals);
      },
      mealText: function mealText() {
        return _this.formData.meals[0] && _this.formData.meals[0].amount ? _this.formData.meals[0].name : null;
      },
      mealamount: function mealamount() {
        return _this.formData.meals[0] && _this.formData.meals[0].amount ? _this.formData.meals[0].amount : null;
      }
    }, _this.methods = {
      toMealList: function toMealList(e) {
        _global2.default.meals = _this.formData.meals;
        _wepy2.default.navigateTo({
          url: '/pages/booking-meal'
        });
      },
      doSubmit: function doSubmit(e) {
        if (_is2.default.empty(_this.formData.place)) {
          _this.$invoke('toast', 'show', {
            title: '请选择游戏地点'
          });
          return;
        }

        if (_is2.default.empty(_this.formData.phone)) {
          _this.$invoke('toast', 'show', {
            title: '请填写联系电话'
          });
          return;
        }

        if ((_this.formData.phone + '').length !== 7 && (_this.formData.phone + '').length !== 8 && (_this.formData.phone + '').length !== 11) {
          _this.$invoke('toast', 'show', {
            title: '请填写正确联系电话'
          });
          return;
        }

        _loading2.default.show('预约中');

        _request2.default.post(_urls2.default.bookingAdd, {
          place: _this.placeData[_this.formData.place].id,
          phone: _this.formData.phone,
          number: _this.formData.number,
          meals: (0, _stringify2.default)(_this.formData.meals)
        }).then(function (d) {
          _wepy2.default.showToast({
            title: d.msg,
            icon: 'success',
            duration: 2000
          });

          _this.formData = {
            place: null,
            meals: [],
            phone: null,
            number: _this.minNumber
          };

          _this.$apply();

          setTimeout(function () {
            _wepy2.default.reLaunch({
              url: '/pages/home'
            });
            // wepy.navigateBack();
          }, 2000);
        }).finally(function () {
          _loading2.default.hide();
        });
      },
      setNumber: function setNumber(e) {
        _this.formData.number = parseInt(e.detail.value, 10);
      },
      setPlace: function setPlace(e) {
        _this.formData.place = parseInt(e.detail.value, 10);
      },
      setPhone: function setPhone(e) {
        _this.formData.phone = e.detail.value;
      },
      updateParams: function updateParams() {
        _request2.default.get(_urls2.default.bookingParams).then(function (_ref2) {
          var result = _ref2.result;

          _this.placeData = result.placeList;
          _this.maxNumber = result.maxNumber;
          _this.minNumber = result.minNumber;
          _this.formData.number = result.minNumber;
          _this.formData.meals = result.meals;

          if (!_is2.default.empty(_this.formData.meals)) {
            _this.formData.meals.forEach(function (d) {
              d.amount = 0;
            });
          }

          _this.$apply();
          _loading2.default.hide();
        });
      }
    }, _this.events = {
      'update-meal': function updateMeal() {
        console.log('update meal', _arguments);
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Booking, [{
    key: 'onShow',
    value: function onShow() {
      if (!_is2.default.empty(_global2.default.meals)) {
        this.formData.meals = _jquery2.default.extend(true, [], _global2.default.meals) || [];
      }
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      var self = this;
      console.log('rank on load');
      _loading2.default.show();

      _global2.default.meals = [];

      _request2.default.getUserInfo().then(function (d) {
        self.userInfo = d;
        self.methods.updateParams();
      });
    }
  }]);
  return Booking;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Booking , 'pages/booking'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJvb2tpbmcuanMiXSwibmFtZXMiOlsiQm9va2luZyIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJjb21wb25lbnRzIiwidG9hc3QiLCJkYXRhIiwidXNlckluZm8iLCJwbGFjZURhdGEiLCJtYXhOdW1iZXIiLCJtaW5OdW1iZXIiLCJmb3JtRGF0YSIsInBsYWNlIiwicGhvbmUiLCJtZWFscyIsIm51bWJlciIsImNvbXB1dGVkIiwiaGFzTWVhbCIsImVtcHR5IiwibWVhbFRleHQiLCJhbW91bnQiLCJuYW1lIiwibWVhbGFtb3VudCIsIm1ldGhvZHMiLCJ0b01lYWxMaXN0IiwiZSIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJkb1N1Ym1pdCIsIiRpbnZva2UiLCJ0aXRsZSIsImxlbmd0aCIsInNob3ciLCJwb3N0IiwiYm9va2luZ0FkZCIsImlkIiwidGhlbiIsInNob3dUb2FzdCIsImQiLCJtc2ciLCJpY29uIiwiZHVyYXRpb24iLCIkYXBwbHkiLCJzZXRUaW1lb3V0IiwicmVMYXVuY2giLCJmaW5hbGx5IiwiaGlkZSIsInNldE51bWJlciIsInBhcnNlSW50IiwiZGV0YWlsIiwidmFsdWUiLCJzZXRQbGFjZSIsInNldFBob25lIiwidXBkYXRlUGFyYW1zIiwiZ2V0IiwiYm9va2luZ1BhcmFtcyIsInJlc3VsdCIsInBsYWNlTGlzdCIsImZvckVhY2giLCJldmVudHMiLCJjb25zb2xlIiwibG9nIiwiZXh0ZW5kIiwic2VsZiIsImdldFVzZXJJbmZvIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztJQUVxQkEsTzs7Ozs7Ozs7Ozs7Ozs7OE1BQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFJVEMsVSxHQUFhO0FBQ1hDO0FBRFcsSyxRQUliQyxJLEdBQU87QUFDTEMsZ0JB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QUFzQjBDLE9BQU8xQyxLQUE3Qjs7QUFFQSxjQUFJLENBQUMsYUFBR0ksS0FBSCxDQUFTLE1BQUtQLFFBQUwsQ0FBY0csS0FBdkIsQ0FBTCxFQUFvQztBQUNsQyxrQkFBS0gsUUFBTCxDQUFjRyxLQUFkLENBQW9CNEMsT0FBcEIsQ0FBNEIsYUFBSztBQUMvQnBCLGdCQUFFbEIsTUFBRixHQUFXLENBQVg7QUFDRCxhQUZEO0FBR0Q7O0FBRUQsZ0JBQUtzQixNQUFMO0FBQ0EsNEJBQVFJLElBQVI7QUFDRCxTQWpCRDtBQWtCRDtBQTNGTyxLLFFBOEZWYSxNLEdBQVM7QUFDUCxxQkFBZSxzQkFBTTtBQUNuQkMsZ0JBQVFDLEdBQVIsQ0FBWSxhQUFaO0FBQ0Q7QUFITSxLOzs7Ozs2QkFNQTtBQUNQLFVBQUksQ0FBQyxhQUFHM0MsS0FBSCxDQUFTLGlCQUFPSixLQUFoQixDQUFMLEVBQTZCO0FBQzNCLGFBQUtILFFBQUwsQ0FBY0csS0FBZCxHQUFzQixpQkFBRWdELE1BQUYsQ0FBUyxJQUFULEVBQWUsRUFBZixFQUFtQixpQkFBT2hELEtBQTFCLEtBQW9DLEVBQTFEO0FBQ0Q7QUFDRjs7OzZCQUVRO0FBQ1AsVUFBSWlELE9BQU8sSUFBWDtBQUNBSCxjQUFRQyxHQUFSLENBQVksY0FBWjtBQUNBLHdCQUFRN0IsSUFBUjs7QUFFQSx1QkFBT2xCLEtBQVAsR0FBZSxFQUFmOztBQUVBLHdCQUFRa0QsV0FBUixHQUFzQjVCLElBQXRCLENBQTJCLGFBQUs7QUFDOUIyQixhQUFLeEQsUUFBTCxHQUFnQitCLENBQWhCO0FBQ0F5QixhQUFLeEMsT0FBTCxDQUFhOEIsWUFBYjtBQUNELE9BSEQ7QUFJRDs7O0VBdkprQyxlQUFLWSxJOztrQkFBckJoRSxPIiwiZmlsZSI6ImJvb2tpbmcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG4gIGltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG4gIGltcG9ydCB1cmxzIGZyb20gJy4uL3NlcnZpY2VzL3VybHMuanMnO1xuICBpbXBvcnQgbG9hZGluZyBmcm9tICcuLi9zZXJ2aWNlcy9sb2FkaW5nLmpzJztcbiAgaW1wb3J0IFRvYXN0IGZyb20gJ3dlcHktY29tLXRvYXN0J1xuICBpbXBvcnQgcmVxdWVzdCBmcm9tICcuLi9zZXJ2aWNlcy9yZXF1ZXN0LmpzJztcbiAgaW1wb3J0IGlzIGZyb20gJy4uL3NlcnZpY2VzL2lzLmpzJztcbiAgaW1wb3J0IGdsb2JhbCBmcm9tICcuLi9zZXJ2aWNlcy9nbG9iYWwuanMnO1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvb2tpbmcgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnur/kuIrpooTnuqYnLFxuICAgIH1cblxuICAgIGNvbXBvbmVudHMgPSB7XG4gICAgICB0b2FzdDogVG9hc3RcbiAgICB9XG5cbiAgICBkYXRhID0ge1xuICAgICAgdXNlckluZm86IG51bGwsXG4gICAgICBwbGFjZURhdGE6IG51bGwsXG4gICAgICBtYXhOdW1iZXI6IG51bGwsXG4gICAgICBtaW5OdW1iZXI6IG51bGwsXG4gICAgICBmb3JtRGF0YToge1xuICAgICAgICBwbGFjZTogJycsXG4gICAgICAgIHBob25lOiAnJyxcbiAgICAgICAgbWVhbHM6IFtdLFxuICAgICAgICBudW1iZXI6IDAsXG4gICAgICB9XG4gICAgfVxuXG4gICAgY29tcHV0ZWQgPSB7XG4gICAgICBoYXNNZWFsOiAoKSA9PiB7XG4gICAgICAgIHJldHVybiAhaXMuZW1wdHkodGhpcy5mb3JtRGF0YS5tZWFscyk7XG4gICAgICB9LFxuICAgICAgbWVhbFRleHQ6ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9ybURhdGEubWVhbHNbMF0gJiYgdGhpcy5mb3JtRGF0YS5tZWFsc1swXS5hbW91bnQgPyB0aGlzLmZvcm1EYXRhLm1lYWxzWzBdLm5hbWUgOiBudWxsXG4gICAgICB9LFxuICAgICAgbWVhbGFtb3VudDogKCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5mb3JtRGF0YS5tZWFsc1swXSAmJiB0aGlzLmZvcm1EYXRhLm1lYWxzWzBdLmFtb3VudCA/IHRoaXMuZm9ybURhdGEubWVhbHNbMF0uYW1vdW50IDogbnVsbFxuICAgICAgfSxcbiAgICB9XG5cbiAgICBtZXRob2RzID0ge1xuICAgICAgdG9NZWFsTGlzdDogKGUpID0+IHtcbiAgICAgICAgZ2xvYmFsLm1lYWxzID0gdGhpcy5mb3JtRGF0YS5tZWFscztcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcvcGFnZXMvYm9va2luZy1tZWFsJyxcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgZG9TdWJtaXQ6IChlKSA9PiB7XG4gICAgICAgIGlmIChpcy5lbXB0eSh0aGlzLmZvcm1EYXRhLnBsYWNlKSkge1xuICAgICAgICAgIHRoaXMuJGludm9rZSgndG9hc3QnLCAnc2hvdycsIHtcbiAgICAgICAgICAgIHRpdGxlOiAn6K+36YCJ5oup5ri45oiP5Zyw54K5J1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpcy5lbXB0eSh0aGlzLmZvcm1EYXRhLnBob25lKSkge1xuICAgICAgICAgIHRoaXMuJGludm9rZSgndG9hc3QnLCAnc2hvdycsIHtcbiAgICAgICAgICAgIHRpdGxlOiAn6K+35aGr5YaZ6IGU57O755S16K+dJ1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgodGhpcy5mb3JtRGF0YS5waG9uZSArICcnKS5sZW5ndGggIT09IDcgJiYgKHRoaXMuZm9ybURhdGEucGhvbmUgKyAnJykubGVuZ3RoICE9PVxuICAgICAgICAgIDggJiYgKHRoaXMuZm9ybURhdGEucGhvbmUgKyAnJykubGVuZ3RoICE9PSAxMSkge1xuICAgICAgICAgIHRoaXMuJGludm9rZSgndG9hc3QnLCAnc2hvdycsIHtcbiAgICAgICAgICAgIHRpdGxlOiAn6K+35aGr5YaZ5q2j56Gu6IGU57O755S16K+dJ1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxvYWRpbmcuc2hvdygn6aKE57qm5LitJyk7XG5cbiAgICAgICAgcmVxdWVzdC5wb3N0KHVybHMuYm9va2luZ0FkZCwge1xuICAgICAgICAgIHBsYWNlOiB0aGlzLnBsYWNlRGF0YVt0aGlzLmZvcm1EYXRhLnBsYWNlXS5pZCxcbiAgICAgICAgICBwaG9uZTogdGhpcy5mb3JtRGF0YS5waG9uZSxcbiAgICAgICAgICBudW1iZXI6IHRoaXMuZm9ybURhdGEubnVtYmVyLFxuICAgICAgICAgIG1lYWxzOiBKU09OLnN0cmluZ2lmeSh0aGlzLmZvcm1EYXRhLm1lYWxzKSxcbiAgICAgICAgfSkudGhlbihkID0+IHtcbiAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgICB0aXRsZTogZC5tc2csXG4gICAgICAgICAgICBpY29uOiAnc3VjY2VzcycsXG4gICAgICAgICAgICBkdXJhdGlvbjogMjAwMFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdGhpcy5mb3JtRGF0YSA9IHtcbiAgICAgICAgICAgIHBsYWNlOiBudWxsLFxuICAgICAgICAgICAgbWVhbHM6IFtdLFxuICAgICAgICAgICAgcGhvbmU6IG51bGwsXG4gICAgICAgICAgICBudW1iZXI6IHRoaXMubWluTnVtYmVyLFxuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG5cbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgd2VweS5yZUxhdW5jaCh7XG4gICAgICAgICAgICAgIHVybDogJy9wYWdlcy9ob21lJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gd2VweS5uYXZpZ2F0ZUJhY2soKTtcbiAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgfSkuZmluYWxseSgoKSA9PiB7XG4gICAgICAgICAgbG9hZGluZy5oaWRlKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIHNldE51bWJlcjogKGUpID0+IHtcbiAgICAgICAgdGhpcy5mb3JtRGF0YS5udW1iZXIgPSBwYXJzZUludChlLmRldGFpbC52YWx1ZSwgMTApO1xuICAgICAgfSxcbiAgICAgIHNldFBsYWNlOiAoZSkgPT4ge1xuICAgICAgICB0aGlzLmZvcm1EYXRhLnBsYWNlID0gcGFyc2VJbnQoZS5kZXRhaWwudmFsdWUsIDEwKTtcbiAgICAgIH0sXG4gICAgICBzZXRQaG9uZTogKGUpID0+IHtcbiAgICAgICAgdGhpcy5mb3JtRGF0YS5waG9uZSA9IGUuZGV0YWlsLnZhbHVlO1xuICAgICAgfSxcbiAgICAgIHVwZGF0ZVBhcmFtczogKCkgPT4ge1xuICAgICAgICByZXF1ZXN0LmdldCh1cmxzLmJvb2tpbmdQYXJhbXMpLnRoZW4oKHtcbiAgICAgICAgICByZXN1bHQsXG4gICAgICAgIH0pID0+IHtcbiAgICAgICAgICB0aGlzLnBsYWNlRGF0YSA9IHJlc3VsdC5wbGFjZUxpc3Q7XG4gICAgICAgICAgdGhpcy5tYXhOdW1iZXIgPSByZXN1bHQubWF4TnVtYmVyO1xuICAgICAgICAgIHRoaXMubWluTnVtYmVyID0gcmVzdWx0Lm1pbk51bWJlcjtcbiAgICAgICAgICB0aGlzLmZvcm1EYXRhLm51bWJlciA9IHJlc3VsdC5taW5OdW1iZXI7XG4gICAgICAgICAgdGhpcy5mb3JtRGF0YS5tZWFscyA9IHJlc3VsdC5tZWFscztcblxuICAgICAgICAgIGlmICghaXMuZW1wdHkodGhpcy5mb3JtRGF0YS5tZWFscykpIHtcbiAgICAgICAgICAgIHRoaXMuZm9ybURhdGEubWVhbHMuZm9yRWFjaChkID0+IHtcbiAgICAgICAgICAgICAgZC5hbW91bnQgPSAwO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgICBsb2FkaW5nLmhpZGUoKTtcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgIH1cblxuICAgIGV2ZW50cyA9IHtcbiAgICAgICd1cGRhdGUtbWVhbCc6ICgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ3VwZGF0ZSBtZWFsJywgYXJndW1lbnRzKTtcbiAgICAgIH0sXG4gICAgfVxuXG4gICAgb25TaG93KCkge1xuICAgICAgaWYgKCFpcy5lbXB0eShnbG9iYWwubWVhbHMpKSB7XG4gICAgICAgIHRoaXMuZm9ybURhdGEubWVhbHMgPSAkLmV4dGVuZCh0cnVlLCBbXSwgZ2xvYmFsLm1lYWxzKSB8fCBbXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICBjb25zb2xlLmxvZygncmFuayBvbiBsb2FkJyk7XG4gICAgICBsb2FkaW5nLnNob3coKTtcblxuICAgICAgZ2xvYmFsLm1lYWxzID0gW107XG5cbiAgICAgIHJlcXVlc3QuZ2V0VXNlckluZm8oKS50aGVuKGQgPT4ge1xuICAgICAgICBzZWxmLnVzZXJJbmZvID0gZDtcbiAgICAgICAgc2VsZi5tZXRob2RzLnVwZGF0ZVBhcmFtcygpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiJdfQ==