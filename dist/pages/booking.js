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

var _extend = require('./../npm/extend/index.js');

var _extend2 = _interopRequireDefault(_extend);

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

var _moment = require('./../npm/moment/moment.js');

var _moment2 = _interopRequireDefault(_moment);

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
        date: '',
        startDate: (0, _moment2.default)().format('YYYY-MM-DD'),
        endDate: (0, _moment2.default)().add('day', 6).format('YYYY-MM-DD'),
        meals: [],
        number: 0
      }
    }, _this.computed = {
      hasMeal: function hasMeal() {
        return !_is2.default.empty(_this.formData.meals);
      },
      mealData: function mealData() {
        var index = 0;
        var meal = _this.formData.meals[index];

        if (!meal) {
          return {};
        }

        while (!meal.amount && _this.formData.meals[index + 1]) {
          index++;
          meal = _this.formData.meals[index];
        }

        return meal.amount ? meal : {};
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

        if (_is2.default.empty(_this.formData.date)) {
          _this.$invoke('toast', 'show', {
            title: '请选择预约时间'
          });
          return;
        }

        _loading2.default.show('预约中');

        _request2.default.post(_urls2.default.bookingAdd, {
          place: _this.placeData[_this.formData.place].id,
          phone: _this.formData.phone,
          number: _this.formData.number,
          meals: (0, _stringify2.default)(_this.formData.meals),
          date: _this.formData.date
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
      bindDateChange: function bindDateChange(e) {
        _this.formData.date = e.detail.value;
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
        this.formData.meals = (0, _extend2.default)(true, [], _global2.default.meals) || [];
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJvb2tpbmcuanMiXSwibmFtZXMiOlsiQm9va2luZyIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJjb21wb25lbnRzIiwidG9hc3QiLCJkYXRhIiwidXNlckluZm8iLCJwbGFjZURhdGEiLCJtYXhOdW1iZXIiLCJtaW5OdW1iZXIiLCJmb3JtRGF0YSIsInBsYWNlIiwicGhvbmUiLCJkYXRlIiwic3RhcnREYXRlIiwiZm9ybWF0IiwiZW5kRGF0ZSIsImFkZCIsIm1lYWxzIiwibnVtYmVyIiwiY29tcHV0ZWQiLCJoYXNNZWFsIiwiZW1wdHkiLCJtZWFsRGF0YSIsImluZGV4IiwibWVhbCIsImFtb3VudCIsIm1ldGhvZHMiLCJ0b01lYWxMaXN0IiwiZSIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJkb1N1Ym1pdCIsIiRpbnZva2UiLCJ0aXRsZSIsImxlbmd0aCIsInNob3ciLCJwb3N0IiwiYm9va2luZ0FkZCIsImlkIiwidGhlbiIsInNob3dUb2FzdCIsImQiLCJtc2ciLCJpY29uIiwiZHVyYXRpb24iLCIkYXBwbHkiLCJzZXRUaW1lb3V0IiwicmVMYXVuY2giLCJmaW5hbGx5IiwiaGlkZSIsImJpbmREYXRlQ2hhbmdlIiwiZGV0YWlsIiwidmFsdWUiLCJzZXROdW1iZXIiLCJwYXJzZUludCIsInNldFBsYWNlIiwic2V0UGhvbmUiLCJ1cGRhdGVQYXJhbXMiLCJnZXQiLCJib29raW5nUGFyYW1zIiwicmVzdWx0IiwicGxhY2VMaXN0IiwiZm9yRWFjaCIsImV2ZW50cyIsImNvbnNvbGUiLCJsb2ciLCJzZWxmIiwiZ2V0VXNlckluZm8iLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7SUFFcUJBLE87Ozs7Ozs7Ozs7Ozs7OzhNQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBSVRDLFUsR0FBYTtBQUNYQztBQURXLEssUUFJYkMsSSxHQUFPO0FBQ0xDLGdCQUFVLElBREw7QUFFTEMsaUJBQVcsSUFGTjtBQUdMQyxpQkFBVyxJQUhOO0FBSUxDLGlCQUFXLElBSk47QUFLTEMsZ0JBQVU7QUFDUkMsZUFBTyxFQURDO0FBRVJDLGVBQU8sRUFGQztBQUdSQyxjQUFNLEVBSEU7QUFJUkMsbUJBQVcsd0JBQVNDLE1BQVQsQ0FBZ0IsWUFBaEIsQ0FKSDtBQUtSQyxpQkFBUyx3QkFBU0MsR0FBVCxDQUFhLEtBQWIsRUFBb0IsQ0FBcEIsRUFBdUJGLE1BQXZCLENBQThCLFlBQTlCLENBTEQ7QUFNUkcsZUFBTyxFQU5DO0FBT1JDLGdCQUFRO0FBUEE7QUFMTCxLLFFBZ0JQQyxRLEdBQVc7QUFDVEMsZUFBUyxtQkFBTTtBQUNiLGVBQU8sQ0FBQyxhQUFHQyxLQUFILENBQVMsTUFBS1osUUFBTCxDQUFjUSxLQUF2QixDQUFSO0FBQ0QsT0FIUTtBQUlUSyxnQkFBVSxvQkFBTTtBQUNkLFlBQUlDLFFBQVEsQ0FBWjtBQUNBLFlBQUlDLE9BQU8sTUFBS2YsUUFBTCxDQUFjUSxLQUFkLENBQW9CTSxLQUFwQixDQUFYOztBQUVBLFlBQUksQ0FBQ0MsSUFBTCxFQUFXO0FBQ1QsaUJBQU8sRUFBUDtBQUNEOztBQUVELGVBQU8sQ0FBQ0EsS0FBS0MsTUFBTixJQUFnQixNQUFLaEIsUUFBTCxDQUFjUSxLQUFkLENBQW9CTSxRQUFRLENBQTVCLENBQXZCLEVBQXVEO0FBQ3JEQTtBQUNBQyxpQkFBTyxNQUFLZixRQUFMLENBQWNRLEtBQWQsQ0FBb0JNLEtBQXBCLENBQVA7QUFDRDs7QUFFRCxlQUFPQyxLQUFLQyxNQUFMLEdBQWNELElBQWQsR0FBcUIsRUFBNUI7QUFDRDtBQWxCUSxLLFFBcUJYRSxPLEdBQVU7QUFDUkMsa0JBQVksb0JBQUNDLENBQUQsRUFBTztBQUNqQix5QkFBT1gsS0FBUCxHQUFlLE1BQUtSLFFBQUwsQ0FBY1EsS0FBN0I7QUFDQSx1QkFBS1ksVUFBTCxDQUFnQjtBQUNkQyxlQUFLO0FBRFMsU0FBaEI7QUFHRCxPQU5PO0FBT1JDLGdCQUFVLGtCQUFDSCxDQUFELEVBQU87QUFDZixZQUFJLGFBQUdQLEtBQUgsQ0FBUyxNQUFLWixRQUFMLENBQWNDLEtBQXZCLENBQUosRUFBbUM7QUFDakMsZ0JBQUtzQixPQUFMLENBQWEsT0FBYixFQUFzQixNQUF0QixFQUE4QjtBQUM1QkMsbUJBQU87QUFEcUIsV0FBOUI7QUFHQTtBQUNEOztBQUVELFlBQUksYUFBR1osS0FBSCxDQUFTLE1BQUtaLFFBQUwsQ0FBY0UsS0FBdkIsQ0FBSixFQUFtQztBQUNqQyxnQkFBS3FCLE9BQUwsQ0FBYSxPQUFiLEVBQXNCLE1BQXRCLEVBQThCO0FBQzVCQyxtQkFBTztBQURxQixXQUE5QjtBQUdBO0FBQ0Q7O0FBRUQsWUFBSSxDQUFDLE1BQUt4QixRQUFMLENBQWNFLEtBQWQsR0FBc0IsRUFBdkIsRUFBMkJ1QixNQUEzQixLQUFzQyxDQUF0QyxJQUEyQyxDQUFDLE1BQUt6QixRQUFMLENBQWNFLEtBQWQsR0FBc0IsRUFBdkIsRUFBMkJ1QixNQUEzQixLQUM3QyxDQURFLElBQ0csQ0FBQyxNQUFLekIsUUFBTCxDQUFjRSxLQUFkLEdBQXNCLEVBQXZCLEVBQTJCdUIsTUFBM0IsS0FBc0MsRUFEN0MsRUFDaUQ7QUFDL0MsZ0JBQUtGLE9BQUwsQ0FBYSxPQUFiLEVBQXNCLE1BQXRCLEVBQThCO0FBQzVCQyxtQkFBTztBQURxQixXQUE5QjtBQUdBO0FBQ0Q7O0FBRUQsWUFBSSxhQUFHWixLQUFILENBQVMsTUFBS1osUUFBTCxDQUFjRyxJQUF2QixDQUFKLEVBQWtDO0FBQ2hDLGdCQUFLb0IsT0FBTCxDQUFhLE9BQWIsRUFBc0IsTUFBdEIsRUFBOEI7QUFDNUJDLG1CQUFPO0FBRHFCLFdBQTlCO0FBR0E7QUFDRDs7QUFFRCwwQkFBUUUsSUFBUixDQUFhLEtBQWI7O0FBRUEsMEJBQVFDLElBQVIsQ0FBYSxlQUFLQyxVQUFsQixFQUE4QjtBQUM1QjNCLGlCQUFPLE1BQUtKLFNBQUwsQ0FBZSxNQUFLRyxRQUFMLENBQWNDLEtBQTdCLEVBQW9DNEIsRUFEZjtBQUU1QjNCLGlCQUFPLE1BQUtGLFFBQUwsQ0FBY0UsS0FGTztBQUc1Qk8sa0JBQVEsTUFBS1QsUUFBTCxDQUFjUyxNQUhNO0FBSTVCRCxpQkFBTyx5QkFBZSxNQUFLUixRQUFMLENBQWNRLEtBQTdCLENBSnFCO0FBSzVCTCxnQkFBTSxNQUFLSCxRQUFMLENBQWNHO0FBTFEsU0FBOUIsRUFNRzJCLElBTkgsQ0FNUSxhQUFLO0FBQ1gseUJBQUtDLFNBQUwsQ0FBZTtBQUNiUCxtQkFBT1EsRUFBRUMsR0FESTtBQUViQyxrQkFBTSxTQUZPO0FBR2JDLHNCQUFVO0FBSEcsV0FBZjs7QUFNQSxnQkFBS25DLFFBQUwsR0FBZ0I7QUFDZEMsbUJBQU8sSUFETztBQUVkTyxtQkFBTyxFQUZPO0FBR2ROLG1CQUFPLElBSE87QUFJZE8sb0JBQVEsTUFBS1Y7QUFKQyxXQUFoQjs7QUFPQSxnQkFBS3FDLE1BQUw7O0FBRUFDLHFCQUFXLFlBQVc7QUFDcEIsMkJBQUtDLFFBQUwsQ0FBYztBQUNaakIsbUJBQUs7QUFETyxhQUFkO0FBR0E7QUFDRCxXQUxELEVBS0csSUFMSDtBQU1ELFNBNUJELEVBNEJHa0IsT0E1QkgsQ0E0QlcsWUFBTTtBQUNmLDRCQUFRQyxJQUFSO0FBQ0QsU0E5QkQ7QUErQkQsT0F0RU87QUF1RVJDLHNCQUFnQix3QkFBQ3RCLENBQUQsRUFBTztBQUNyQixjQUFLbkIsUUFBTCxDQUFjRyxJQUFkLEdBQXFCZ0IsRUFBRXVCLE1BQUYsQ0FBU0MsS0FBOUI7QUFDRCxPQXpFTztBQTBFUkMsaUJBQVcsbUJBQUN6QixDQUFELEVBQU87QUFDaEIsY0FBS25CLFFBQUwsQ0FBY1MsTUFBZCxHQUF1Qm9DLFNBQVMxQixFQUFFdUIsTUFBRixDQUFTQyxLQUFsQixFQUF5QixFQUF6QixDQUF2QjtBQUNELE9BNUVPO0FBNkVSRyxnQkFBVSxrQkFBQzNCLENBQUQsRUFBTztBQUNmLGNBQUtuQixRQUFMLENBQWNDLEtBQWQsR0FBc0I0QyxTQUFTMUIsRUFBRXVCLE1BQUYsQ0FBU0MsS0FBbEIsRUFBeUIsRUFBekIsQ0FBdEI7QUFDRCxPQS9FTztBQWdGUkksZ0JBQVUsa0JBQUM1QixDQUFELEVBQU87QUFDZixjQUFLbkIsUUFBTCxDQUFjRSxLQUFkLEdBQXNCaUIsRUFBRXVCLE1BQUYsQ0FBU0MsS0FBL0I7QUFDRCxPQWxGTztBQW1GUkssb0JBQWMsd0JBQU07QUFDbEIsMEJBQVFDLEdBQVIsQ0FBWSxlQUFLQyxhQUFqQixFQUFnQ3BCLElBQWhDLENBQXFDLGlCQUUvQjtBQUFBLGNBREpxQixNQUNJLFNBREpBLE1BQ0k7O0FBQ0osZ0JBQUt0RCxTQUFMLEdBQWlCc0QsT0FBT0MsU0FBeEI7QUFDQSxnQkFBS3RELFNBQUwsR0FBaUJxRCxPQUFPckQsU0FBeEI7QUFDQSxnQkFBS0MsU0FBTCxHQUFpQm9ELE9BQU9wRCxTQUF4QjtBQUNBLGdCQUFLQyxRQUFMLENBQWNTLE1BQWQsR0FBdUIwQyxPQUFPcEQsU0FBOUI7QUFDQSxnQkFBS0MsUUFBTCxDQUFjUSxLQUFkLEdBQXNCMkMsT0FBTzNDLEtBQTdCOztBQUVBLGNBQUksQ0FBQyxhQUFHSSxLQUFILENBQVMsTUFBS1osUUFBTCxDQUFjUSxLQUF2QixDQUFMLEVBQW9DO0FBQ2xDLGtCQUFLUixRQUFMLENBQWNRLEtBQWQsQ0FBb0I2QyxPQUFwQixDQUE0QixhQUFLO0FBQy9CckIsZ0JBQUVoQixNQUFGLEdBQVcsQ0FBWDtBQUNELGFBRkQ7QUFHRDs7QUFFRCxnQkFBS29CLE1BQUw7QUFDQSw0QkFBUUksSUFBUjtBQUNELFNBakJEO0FBa0JEO0FBdEdPLEssUUF5R1ZjLE0sR0FBUztBQUNQLHFCQUFlLHNCQUFNO0FBQ25CQyxnQkFBUUMsR0FBUixDQUFZLGFBQVo7QUFDRDtBQUhNLEs7Ozs7OzZCQU1BO0FBQ1AsVUFBSSxDQUFDLGFBQUc1QyxLQUFILENBQVMsaUJBQU9KLEtBQWhCLENBQUwsRUFBNkI7QUFDM0IsYUFBS1IsUUFBTCxDQUFjUSxLQUFkLEdBQXNCLHNCQUFPLElBQVAsRUFBYSxFQUFiLEVBQWlCLGlCQUFPQSxLQUF4QixLQUFrQyxFQUF4RDtBQUNEO0FBQ0Y7Ozs2QkFFUTtBQUNQLFVBQUlpRCxPQUFPLElBQVg7QUFDQUYsY0FBUUMsR0FBUixDQUFZLGNBQVo7QUFDQSx3QkFBUTlCLElBQVI7O0FBRUEsdUJBQU9sQixLQUFQLEdBQWUsRUFBZjs7QUFFQSx3QkFBUWtELFdBQVIsR0FBc0I1QixJQUF0QixDQUEyQixhQUFLO0FBQzlCMkIsYUFBSzdELFFBQUwsR0FBZ0JvQyxDQUFoQjtBQUNBeUIsYUFBS3hDLE9BQUwsQ0FBYStCLFlBQWI7QUFDRCxPQUhEO0FBSUQ7OztFQTlLa0MsZUFBS1csSTs7a0JBQXJCckUsTyIsImZpbGUiOiJib29raW5nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuICBpbXBvcnQgZXh0ZW5kIGZyb20gJ2V4dGVuZCc7XG4gIGltcG9ydCB1cmxzIGZyb20gJy4uL3NlcnZpY2VzL3VybHMuanMnO1xuICBpbXBvcnQgbG9hZGluZyBmcm9tICcuLi9zZXJ2aWNlcy9sb2FkaW5nLmpzJztcbiAgaW1wb3J0IFRvYXN0IGZyb20gJ3dlcHktY29tLXRvYXN0J1xuICBpbXBvcnQgcmVxdWVzdCBmcm9tICcuLi9zZXJ2aWNlcy9yZXF1ZXN0LmpzJztcbiAgaW1wb3J0IGlzIGZyb20gJy4uL3NlcnZpY2VzL2lzLmpzJztcbiAgaW1wb3J0IGdsb2JhbCBmcm9tICcuLi9zZXJ2aWNlcy9nbG9iYWwuanMnO1xuICBpbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9va2luZyBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+e6v+S4iumihOe6picsXG4gICAgfVxuXG4gICAgY29tcG9uZW50cyA9IHtcbiAgICAgIHRvYXN0OiBUb2FzdFxuICAgIH1cblxuICAgIGRhdGEgPSB7XG4gICAgICB1c2VySW5mbzogbnVsbCxcbiAgICAgIHBsYWNlRGF0YTogbnVsbCxcbiAgICAgIG1heE51bWJlcjogbnVsbCxcbiAgICAgIG1pbk51bWJlcjogbnVsbCxcbiAgICAgIGZvcm1EYXRhOiB7XG4gICAgICAgIHBsYWNlOiAnJyxcbiAgICAgICAgcGhvbmU6ICcnLFxuICAgICAgICBkYXRlOiAnJyxcbiAgICAgICAgc3RhcnREYXRlOiBtb21lbnQoKS5mb3JtYXQoJ1lZWVktTU0tREQnKSxcbiAgICAgICAgZW5kRGF0ZTogbW9tZW50KCkuYWRkKCdkYXknLCA2KS5mb3JtYXQoJ1lZWVktTU0tREQnKSxcbiAgICAgICAgbWVhbHM6IFtdLFxuICAgICAgICBudW1iZXI6IDAsXG4gICAgICB9XG4gICAgfVxuXG4gICAgY29tcHV0ZWQgPSB7XG4gICAgICBoYXNNZWFsOiAoKSA9PiB7XG4gICAgICAgIHJldHVybiAhaXMuZW1wdHkodGhpcy5mb3JtRGF0YS5tZWFscyk7XG4gICAgICB9LFxuICAgICAgbWVhbERhdGE6ICgpID0+IHtcbiAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgbGV0IG1lYWwgPSB0aGlzLmZvcm1EYXRhLm1lYWxzW2luZGV4XTtcblxuICAgICAgICBpZiAoIW1lYWwpIHtcbiAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgIH1cblxuICAgICAgICB3aGlsZSAoIW1lYWwuYW1vdW50ICYmIHRoaXMuZm9ybURhdGEubWVhbHNbaW5kZXggKyAxXSkge1xuICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgICAgbWVhbCA9IHRoaXMuZm9ybURhdGEubWVhbHNbaW5kZXhdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG1lYWwuYW1vdW50ID8gbWVhbCA6IHt9O1xuICAgICAgfSxcbiAgICB9XG5cbiAgICBtZXRob2RzID0ge1xuICAgICAgdG9NZWFsTGlzdDogKGUpID0+IHtcbiAgICAgICAgZ2xvYmFsLm1lYWxzID0gdGhpcy5mb3JtRGF0YS5tZWFscztcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcvcGFnZXMvYm9va2luZy1tZWFsJyxcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgZG9TdWJtaXQ6IChlKSA9PiB7XG4gICAgICAgIGlmIChpcy5lbXB0eSh0aGlzLmZvcm1EYXRhLnBsYWNlKSkge1xuICAgICAgICAgIHRoaXMuJGludm9rZSgndG9hc3QnLCAnc2hvdycsIHtcbiAgICAgICAgICAgIHRpdGxlOiAn6K+36YCJ5oup5ri45oiP5Zyw54K5J1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpcy5lbXB0eSh0aGlzLmZvcm1EYXRhLnBob25lKSkge1xuICAgICAgICAgIHRoaXMuJGludm9rZSgndG9hc3QnLCAnc2hvdycsIHtcbiAgICAgICAgICAgIHRpdGxlOiAn6K+35aGr5YaZ6IGU57O755S16K+dJ1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgodGhpcy5mb3JtRGF0YS5waG9uZSArICcnKS5sZW5ndGggIT09IDcgJiYgKHRoaXMuZm9ybURhdGEucGhvbmUgKyAnJykubGVuZ3RoICE9PVxuICAgICAgICAgIDggJiYgKHRoaXMuZm9ybURhdGEucGhvbmUgKyAnJykubGVuZ3RoICE9PSAxMSkge1xuICAgICAgICAgIHRoaXMuJGludm9rZSgndG9hc3QnLCAnc2hvdycsIHtcbiAgICAgICAgICAgIHRpdGxlOiAn6K+35aGr5YaZ5q2j56Gu6IGU57O755S16K+dJ1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpcy5lbXB0eSh0aGlzLmZvcm1EYXRhLmRhdGUpKSB7XG4gICAgICAgICAgdGhpcy4kaW52b2tlKCd0b2FzdCcsICdzaG93Jywge1xuICAgICAgICAgICAgdGl0bGU6ICfor7fpgInmi6npooTnuqbml7bpl7QnXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbG9hZGluZy5zaG93KCfpooTnuqbkuK0nKTtcblxuICAgICAgICByZXF1ZXN0LnBvc3QodXJscy5ib29raW5nQWRkLCB7XG4gICAgICAgICAgcGxhY2U6IHRoaXMucGxhY2VEYXRhW3RoaXMuZm9ybURhdGEucGxhY2VdLmlkLFxuICAgICAgICAgIHBob25lOiB0aGlzLmZvcm1EYXRhLnBob25lLFxuICAgICAgICAgIG51bWJlcjogdGhpcy5mb3JtRGF0YS5udW1iZXIsXG4gICAgICAgICAgbWVhbHM6IEpTT04uc3RyaW5naWZ5KHRoaXMuZm9ybURhdGEubWVhbHMpLFxuICAgICAgICAgIGRhdGU6IHRoaXMuZm9ybURhdGEuZGF0ZSxcbiAgICAgICAgfSkudGhlbihkID0+IHtcbiAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgICB0aXRsZTogZC5tc2csXG4gICAgICAgICAgICBpY29uOiAnc3VjY2VzcycsXG4gICAgICAgICAgICBkdXJhdGlvbjogMjAwMFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdGhpcy5mb3JtRGF0YSA9IHtcbiAgICAgICAgICAgIHBsYWNlOiBudWxsLFxuICAgICAgICAgICAgbWVhbHM6IFtdLFxuICAgICAgICAgICAgcGhvbmU6IG51bGwsXG4gICAgICAgICAgICBudW1iZXI6IHRoaXMubWluTnVtYmVyLFxuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG5cbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgd2VweS5yZUxhdW5jaCh7XG4gICAgICAgICAgICAgIHVybDogJy9wYWdlcy9ob21lJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gd2VweS5uYXZpZ2F0ZUJhY2soKTtcbiAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgfSkuZmluYWxseSgoKSA9PiB7XG4gICAgICAgICAgbG9hZGluZy5oaWRlKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIGJpbmREYXRlQ2hhbmdlOiAoZSkgPT4ge1xuICAgICAgICB0aGlzLmZvcm1EYXRhLmRhdGUgPSBlLmRldGFpbC52YWx1ZTtcbiAgICAgIH0sXG4gICAgICBzZXROdW1iZXI6IChlKSA9PiB7XG4gICAgICAgIHRoaXMuZm9ybURhdGEubnVtYmVyID0gcGFyc2VJbnQoZS5kZXRhaWwudmFsdWUsIDEwKTtcbiAgICAgIH0sXG4gICAgICBzZXRQbGFjZTogKGUpID0+IHtcbiAgICAgICAgdGhpcy5mb3JtRGF0YS5wbGFjZSA9IHBhcnNlSW50KGUuZGV0YWlsLnZhbHVlLCAxMCk7XG4gICAgICB9LFxuICAgICAgc2V0UGhvbmU6IChlKSA9PiB7XG4gICAgICAgIHRoaXMuZm9ybURhdGEucGhvbmUgPSBlLmRldGFpbC52YWx1ZTtcbiAgICAgIH0sXG4gICAgICB1cGRhdGVQYXJhbXM6ICgpID0+IHtcbiAgICAgICAgcmVxdWVzdC5nZXQodXJscy5ib29raW5nUGFyYW1zKS50aGVuKCh7XG4gICAgICAgICAgcmVzdWx0LFxuICAgICAgICB9KSA9PiB7XG4gICAgICAgICAgdGhpcy5wbGFjZURhdGEgPSByZXN1bHQucGxhY2VMaXN0O1xuICAgICAgICAgIHRoaXMubWF4TnVtYmVyID0gcmVzdWx0Lm1heE51bWJlcjtcbiAgICAgICAgICB0aGlzLm1pbk51bWJlciA9IHJlc3VsdC5taW5OdW1iZXI7XG4gICAgICAgICAgdGhpcy5mb3JtRGF0YS5udW1iZXIgPSByZXN1bHQubWluTnVtYmVyO1xuICAgICAgICAgIHRoaXMuZm9ybURhdGEubWVhbHMgPSByZXN1bHQubWVhbHM7XG5cbiAgICAgICAgICBpZiAoIWlzLmVtcHR5KHRoaXMuZm9ybURhdGEubWVhbHMpKSB7XG4gICAgICAgICAgICB0aGlzLmZvcm1EYXRhLm1lYWxzLmZvckVhY2goZCA9PiB7XG4gICAgICAgICAgICAgIGQuYW1vdW50ID0gMDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgICAgbG9hZGluZy5oaWRlKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICB9XG5cbiAgICBldmVudHMgPSB7XG4gICAgICAndXBkYXRlLW1lYWwnOiAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCd1cGRhdGUgbWVhbCcsIGFyZ3VtZW50cyk7XG4gICAgICB9LFxuICAgIH1cblxuICAgIG9uU2hvdygpIHtcbiAgICAgIGlmICghaXMuZW1wdHkoZ2xvYmFsLm1lYWxzKSkge1xuICAgICAgICB0aGlzLmZvcm1EYXRhLm1lYWxzID0gZXh0ZW5kKHRydWUsIFtdLCBnbG9iYWwubWVhbHMpIHx8IFtdO1xuICAgICAgfVxuICAgIH1cblxuICAgIG9uTG9hZCgpIHtcbiAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgIGNvbnNvbGUubG9nKCdyYW5rIG9uIGxvYWQnKTtcbiAgICAgIGxvYWRpbmcuc2hvdygpO1xuXG4gICAgICBnbG9iYWwubWVhbHMgPSBbXTtcblxuICAgICAgcmVxdWVzdC5nZXRVc2VySW5mbygpLnRoZW4oZCA9PiB7XG4gICAgICAgIHNlbGYudXNlckluZm8gPSBkO1xuICAgICAgICBzZWxmLm1ldGhvZHMudXBkYXRlUGFyYW1zKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuIl19