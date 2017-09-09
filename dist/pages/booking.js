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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJvb2tpbmcuanMiXSwibmFtZXMiOlsiQm9va2luZyIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJjb21wb25lbnRzIiwidG9hc3QiLCJkYXRhIiwidXNlckluZm8iLCJwbGFjZURhdGEiLCJtYXhOdW1iZXIiLCJtaW5OdW1iZXIiLCJmb3JtRGF0YSIsInBsYWNlIiwicGhvbmUiLCJtZWFscyIsIm51bWJlciIsImNvbXB1dGVkIiwiaGFzTWVhbCIsImVtcHR5IiwibWVhbERhdGEiLCJpbmRleCIsIm1lYWwiLCJhbW91bnQiLCJtZXRob2RzIiwidG9NZWFsTGlzdCIsImUiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiZG9TdWJtaXQiLCIkaW52b2tlIiwidGl0bGUiLCJsZW5ndGgiLCJzaG93IiwicG9zdCIsImJvb2tpbmdBZGQiLCJpZCIsInRoZW4iLCJzaG93VG9hc3QiLCJkIiwibXNnIiwiaWNvbiIsImR1cmF0aW9uIiwiJGFwcGx5Iiwic2V0VGltZW91dCIsInJlTGF1bmNoIiwiZmluYWxseSIsImhpZGUiLCJzZXROdW1iZXIiLCJwYXJzZUludCIsImRldGFpbCIsInZhbHVlIiwic2V0UGxhY2UiLCJzZXRQaG9uZSIsInVwZGF0ZVBhcmFtcyIsImdldCIsImJvb2tpbmdQYXJhbXMiLCJyZXN1bHQiLCJwbGFjZUxpc3QiLCJmb3JFYWNoIiwiZXZlbnRzIiwiY29uc29sZSIsImxvZyIsInNlbGYiLCJnZXRVc2VySW5mbyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7SUFFcUJBLE87Ozs7Ozs7Ozs7Ozs7OzhNQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBSVRDLFUsR0FBYTtBQUNYQztBQURXLEssUUFJYkMsSSxHQUFPO0FBQ0xDLGdCQUFVLElBREw7QUFFTEMsaUJBQVcsSUFGTjtBQUdMQyxpQkFBVyxJQUhOO0FBSUxDLGlCQUFXLElBSk47QUFLTEMsZ0JBQVU7QUFDUkMsZUFBTyxFQURDO0FBRVJDLGVBQU8sRUFGQztBQUdSQyxlQUFPLEVBSEM7QUFJUkMsZ0JBQVE7QUFKQTtBQUxMLEssUUFhUEMsUSxHQUFXO0FBQ1RDLGVBQVMsbUJBQU07QUFDYixlQUFPLENBQUMsYUFBR0MsS0FBSCxDQUFTLE1BQUtQLFFBQUwsQ0FBY0csS0FBdkIsQ0FBUjtBQUNELE9BSFE7QUFJVEssZ0JBQVUsb0JBQU07QUFDZCxZQUFJQyxRQUFRLENBQVo7QUFDQSxZQUFJQyxPQUFPLE1BQUtWLFFBQUwsQ0FBY0csS0FBZCxDQUFvQk0sS0FBcEIsQ0FBWDs7QUFFQSxZQUFJLENBQUNDLElBQUwsRUFBVztBQUNULGlCQUFPLEVBQVA7QUFDRDs7QUFFRCxlQUFPLENBQUNBLEtBQUtDLE1BQU4sSUFBZ0IsTUFBS1gsUUFBTCxDQUFjRyxLQUFkLENBQW9CTSxRQUFRLENBQTVCLENBQXZCLEVBQXVEO0FBQ3JEQTtBQUNBQyxpQkFBTyxNQUFLVixRQUFMLENBQWNHLEtBQWQsQ0FBb0JNLEtBQXBCLENBQVA7QUFDRDs7QUFFRCxlQUFPQyxLQUFLQyxNQUFMLEdBQWNELElBQWQsR0FBcUIsRUFBNUI7QUFDRDtBQWxCUSxLLFFBcUJYRSxPLEdBQVU7QUFDUkMsa0JBQVksb0JBQUNDLENBQUQsRUFBTztBQUNqQix5QkFBT1gsS0FBUCxHQUFlLE1BQUtILFFBQUwsQ0FBY0csS0FBN0I7QUFDQSx1QkFBS1ksVUFBTCxDQUFnQjtBQUNkQyxlQUFLO0FBRFMsU0FBaEI7QUFHRCxPQU5PO0FBT1JDLGdCQUFVLGtCQUFDSCxDQUFELEVBQU87QUFDZixZQUFJLGFBQUdQLEtBQUgsQ0FBUyxNQUFLUCxRQUFMLENBQWNDLEtBQXZCLENBQUosRUFBbUM7QUFDakMsZ0JBQUtpQixPQUFMLENBQWEsT0FBYixFQUFzQixNQUF0QixFQUE4QjtBQUM1QkMsbUJBQU87QUFEcUIsV0FBOUI7QUFHQTtBQUNEOztBQUVELFlBQUksYUFBR1osS0FBSCxDQUFTLE1BQUtQLFFBQUwsQ0FBY0UsS0FBdkIsQ0FBSixFQUFtQztBQUNqQyxnQkFBS2dCLE9BQUwsQ0FBYSxPQUFiLEVBQXNCLE1BQXRCLEVBQThCO0FBQzVCQyxtQkFBTztBQURxQixXQUE5QjtBQUdBO0FBQ0Q7O0FBRUQsWUFBSSxDQUFDLE1BQUtuQixRQUFMLENBQWNFLEtBQWQsR0FBc0IsRUFBdkIsRUFBMkJrQixNQUEzQixLQUFzQyxDQUF0QyxJQUEyQyxDQUFDLE1BQUtwQixRQUFMLENBQWNFLEtBQWQsR0FBc0IsRUFBdkIsRUFBMkJrQixNQUEzQixLQUM3QyxDQURFLElBQ0csQ0FBQyxNQUFLcEIsUUFBTCxDQUFjRSxLQUFkLEdBQXNCLEVBQXZCLEVBQTJCa0IsTUFBM0IsS0FBc0MsRUFEN0MsRUFDaUQ7QUFDL0MsZ0JBQUtGLE9BQUwsQ0FBYSxPQUFiLEVBQXNCLE1BQXRCLEVBQThCO0FBQzVCQyxtQkFBTztBQURxQixXQUE5QjtBQUdBO0FBQ0Q7O0FBRUQsMEJBQVFFLElBQVIsQ0FBYSxLQUFiOztBQUVBLDBCQUFRQyxJQUFSLENBQWEsZUFBS0MsVUFBbEIsRUFBOEI7QUFDNUJ0QixpQkFBTyxNQUFLSixTQUFMLENBQWUsTUFBS0csUUFBTCxDQUFjQyxLQUE3QixFQUFvQ3VCLEVBRGY7QUFFNUJ0QixpQkFBTyxNQUFLRixRQUFMLENBQWNFLEtBRk87QUFHNUJFLGtCQUFRLE1BQUtKLFFBQUwsQ0FBY0ksTUFITTtBQUk1QkQsaUJBQU8seUJBQWUsTUFBS0gsUUFBTCxDQUFjRyxLQUE3QjtBQUpxQixTQUE5QixFQUtHc0IsSUFMSCxDQUtRLGFBQUs7QUFDWCx5QkFBS0MsU0FBTCxDQUFlO0FBQ2JQLG1CQUFPUSxFQUFFQyxHQURJO0FBRWJDLGtCQUFNLFNBRk87QUFHYkMsc0JBQVU7QUFIRyxXQUFmOztBQU1BLGdCQUFLOUIsUUFBTCxHQUFnQjtBQUNkQyxtQkFBTyxJQURPO0FBRWRFLG1CQUFPLEVBRk87QUFHZEQsbUJBQU8sSUFITztBQUlkRSxvQkFBUSxNQUFLTDtBQUpDLFdBQWhCOztBQU9BLGdCQUFLZ0MsTUFBTDs7QUFFQUMscUJBQVcsWUFBVztBQUNwQiwyQkFBS0MsUUFBTCxDQUFjO0FBQ1pqQixtQkFBSztBQURPLGFBQWQ7QUFHQTtBQUNELFdBTEQsRUFLRyxJQUxIO0FBTUQsU0EzQkQsRUEyQkdrQixPQTNCSCxDQTJCVyxZQUFNO0FBQ2YsNEJBQVFDLElBQVI7QUFDRCxTQTdCRDtBQThCRCxPQTlETztBQStEUkMsaUJBQVcsbUJBQUN0QixDQUFELEVBQU87QUFDaEIsY0FBS2QsUUFBTCxDQUFjSSxNQUFkLEdBQXVCaUMsU0FBU3ZCLEVBQUV3QixNQUFGLENBQVNDLEtBQWxCLEVBQXlCLEVBQXpCLENBQXZCO0FBQ0QsT0FqRU87QUFrRVJDLGdCQUFVLGtCQUFDMUIsQ0FBRCxFQUFPO0FBQ2YsY0FBS2QsUUFBTCxDQUFjQyxLQUFkLEdBQXNCb0MsU0FBU3ZCLEVBQUV3QixNQUFGLENBQVNDLEtBQWxCLEVBQXlCLEVBQXpCLENBQXRCO0FBQ0QsT0FwRU87QUFxRVJFLGdCQUFVLGtCQUFDM0IsQ0FBRCxFQUFPO0FBQ2YsY0FBS2QsUUFBTCxDQUFjRSxLQUFkLEdBQXNCWSxFQUFFd0IsTUFBRixDQUFTQyxLQUEvQjtBQUNELE9BdkVPO0FBd0VSRyxvQkFBYyx3QkFBTTtBQUNsQiwwQkFBUUMsR0FBUixDQUFZLGVBQUtDLGFBQWpCLEVBQWdDbkIsSUFBaEMsQ0FBcUMsaUJBRS9CO0FBQUEsY0FESm9CLE1BQ0ksU0FESkEsTUFDSTs7QUFDSixnQkFBS2hELFNBQUwsR0FBaUJnRCxPQUFPQyxTQUF4QjtBQUNBLGdCQUFLaEQsU0FBTCxHQUFpQitDLE9BQU8vQyxTQUF4QjtBQUNBLGdCQUFLQyxTQUFMLEdBQWlCOEMsT0FBTzlDLFNBQXhCO0FBQ0EsZ0JBQUtDLFFBQUwsQ0FBY0ksTUFBZCxHQUF1QnlDLE9BQU85QyxTQUE5QjtBQUNBLGdCQUFLQyxRQUFMLENBQWNHLEtBQWQsR0FBc0IwQyxPQUFPMUMsS0FBN0I7O0FBRUEsY0FBSSxDQUFDLGFBQUdJLEtBQUgsQ0FBUyxNQUFLUCxRQUFMLENBQWNHLEtBQXZCLENBQUwsRUFBb0M7QUFDbEMsa0JBQUtILFFBQUwsQ0FBY0csS0FBZCxDQUFvQjRDLE9BQXBCLENBQTRCLGFBQUs7QUFDL0JwQixnQkFBRWhCLE1BQUYsR0FBVyxDQUFYO0FBQ0QsYUFGRDtBQUdEOztBQUVELGdCQUFLb0IsTUFBTDtBQUNBLDRCQUFRSSxJQUFSO0FBQ0QsU0FqQkQ7QUFrQkQ7QUEzRk8sSyxRQThGVmEsTSxHQUFTO0FBQ1AscUJBQWUsc0JBQU07QUFDbkJDLGdCQUFRQyxHQUFSLENBQVksYUFBWjtBQUNEO0FBSE0sSzs7Ozs7NkJBTUE7QUFDUCxVQUFJLENBQUMsYUFBRzNDLEtBQUgsQ0FBUyxpQkFBT0osS0FBaEIsQ0FBTCxFQUE2QjtBQUMzQixhQUFLSCxRQUFMLENBQWNHLEtBQWQsR0FBc0Isc0JBQU8sSUFBUCxFQUFhLEVBQWIsRUFBaUIsaUJBQU9BLEtBQXhCLEtBQWtDLEVBQXhEO0FBQ0Q7QUFDRjs7OzZCQUVRO0FBQ1AsVUFBSWdELE9BQU8sSUFBWDtBQUNBRixjQUFRQyxHQUFSLENBQVksY0FBWjtBQUNBLHdCQUFRN0IsSUFBUjs7QUFFQSx1QkFBT2xCLEtBQVAsR0FBZSxFQUFmOztBQUVBLHdCQUFRaUQsV0FBUixHQUFzQjNCLElBQXRCLENBQTJCLGFBQUs7QUFDOUIwQixhQUFLdkQsUUFBTCxHQUFnQitCLENBQWhCO0FBQ0F3QixhQUFLdkMsT0FBTCxDQUFhOEIsWUFBYjtBQUNELE9BSEQ7QUFJRDs7O0VBaEtrQyxlQUFLVyxJOztrQkFBckIvRCxPIiwiZmlsZSI6ImJvb2tpbmcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG4gIGltcG9ydCBleHRlbmQgZnJvbSAnZXh0ZW5kJztcbiAgaW1wb3J0IHVybHMgZnJvbSAnLi4vc2VydmljZXMvdXJscy5qcyc7XG4gIGltcG9ydCBsb2FkaW5nIGZyb20gJy4uL3NlcnZpY2VzL2xvYWRpbmcuanMnO1xuICBpbXBvcnQgVG9hc3QgZnJvbSAnd2VweS1jb20tdG9hc3QnXG4gIGltcG9ydCByZXF1ZXN0IGZyb20gJy4uL3NlcnZpY2VzL3JlcXVlc3QuanMnO1xuICBpbXBvcnQgaXMgZnJvbSAnLi4vc2VydmljZXMvaXMuanMnO1xuICBpbXBvcnQgZ2xvYmFsIGZyb20gJy4uL3NlcnZpY2VzL2dsb2JhbC5qcyc7XG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9va2luZyBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+e6v+S4iumihOe6picsXG4gICAgfVxuXG4gICAgY29tcG9uZW50cyA9IHtcbiAgICAgIHRvYXN0OiBUb2FzdFxuICAgIH1cblxuICAgIGRhdGEgPSB7XG4gICAgICB1c2VySW5mbzogbnVsbCxcbiAgICAgIHBsYWNlRGF0YTogbnVsbCxcbiAgICAgIG1heE51bWJlcjogbnVsbCxcbiAgICAgIG1pbk51bWJlcjogbnVsbCxcbiAgICAgIGZvcm1EYXRhOiB7XG4gICAgICAgIHBsYWNlOiAnJyxcbiAgICAgICAgcGhvbmU6ICcnLFxuICAgICAgICBtZWFsczogW10sXG4gICAgICAgIG51bWJlcjogMCxcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIGhhc01lYWw6ICgpID0+IHtcbiAgICAgICAgcmV0dXJuICFpcy5lbXB0eSh0aGlzLmZvcm1EYXRhLm1lYWxzKTtcbiAgICAgIH0sXG4gICAgICBtZWFsRGF0YTogKCkgPT4ge1xuICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICBsZXQgbWVhbCA9IHRoaXMuZm9ybURhdGEubWVhbHNbaW5kZXhdO1xuXG4gICAgICAgIGlmICghbWVhbCkge1xuICAgICAgICAgIHJldHVybiB7fTtcbiAgICAgICAgfVxuXG4gICAgICAgIHdoaWxlICghbWVhbC5hbW91bnQgJiYgdGhpcy5mb3JtRGF0YS5tZWFsc1tpbmRleCArIDFdKSB7XG4gICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgICBtZWFsID0gdGhpcy5mb3JtRGF0YS5tZWFsc1tpbmRleF07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbWVhbC5hbW91bnQgPyBtZWFsIDoge307XG4gICAgICB9LFxuICAgIH1cblxuICAgIG1ldGhvZHMgPSB7XG4gICAgICB0b01lYWxMaXN0OiAoZSkgPT4ge1xuICAgICAgICBnbG9iYWwubWVhbHMgPSB0aGlzLmZvcm1EYXRhLm1lYWxzO1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy9wYWdlcy9ib29raW5nLW1lYWwnLFxuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBkb1N1Ym1pdDogKGUpID0+IHtcbiAgICAgICAgaWYgKGlzLmVtcHR5KHRoaXMuZm9ybURhdGEucGxhY2UpKSB7XG4gICAgICAgICAgdGhpcy4kaW52b2tlKCd0b2FzdCcsICdzaG93Jywge1xuICAgICAgICAgICAgdGl0bGU6ICfor7fpgInmi6nmuLjmiI/lnLDngrknXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzLmVtcHR5KHRoaXMuZm9ybURhdGEucGhvbmUpKSB7XG4gICAgICAgICAgdGhpcy4kaW52b2tlKCd0b2FzdCcsICdzaG93Jywge1xuICAgICAgICAgICAgdGl0bGU6ICfor7floavlhpnogZTns7vnlLXor50nXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCh0aGlzLmZvcm1EYXRhLnBob25lICsgJycpLmxlbmd0aCAhPT0gNyAmJiAodGhpcy5mb3JtRGF0YS5waG9uZSArICcnKS5sZW5ndGggIT09XG4gICAgICAgICAgOCAmJiAodGhpcy5mb3JtRGF0YS5waG9uZSArICcnKS5sZW5ndGggIT09IDExKSB7XG4gICAgICAgICAgdGhpcy4kaW52b2tlKCd0b2FzdCcsICdzaG93Jywge1xuICAgICAgICAgICAgdGl0bGU6ICfor7floavlhpnmraPnoa7ogZTns7vnlLXor50nXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbG9hZGluZy5zaG93KCfpooTnuqbkuK0nKTtcblxuICAgICAgICByZXF1ZXN0LnBvc3QodXJscy5ib29raW5nQWRkLCB7XG4gICAgICAgICAgcGxhY2U6IHRoaXMucGxhY2VEYXRhW3RoaXMuZm9ybURhdGEucGxhY2VdLmlkLFxuICAgICAgICAgIHBob25lOiB0aGlzLmZvcm1EYXRhLnBob25lLFxuICAgICAgICAgIG51bWJlcjogdGhpcy5mb3JtRGF0YS5udW1iZXIsXG4gICAgICAgICAgbWVhbHM6IEpTT04uc3RyaW5naWZ5KHRoaXMuZm9ybURhdGEubWVhbHMpLFxuICAgICAgICB9KS50aGVuKGQgPT4ge1xuICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgICAgIHRpdGxlOiBkLm1zZyxcbiAgICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICB0aGlzLmZvcm1EYXRhID0ge1xuICAgICAgICAgICAgcGxhY2U6IG51bGwsXG4gICAgICAgICAgICBtZWFsczogW10sXG4gICAgICAgICAgICBwaG9uZTogbnVsbCxcbiAgICAgICAgICAgIG51bWJlcjogdGhpcy5taW5OdW1iZXIsXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKTtcblxuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB3ZXB5LnJlTGF1bmNoKHtcbiAgICAgICAgICAgICAgdXJsOiAnL3BhZ2VzL2hvbWUnLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyB3ZXB5Lm5hdmlnYXRlQmFjaygpO1xuICAgICAgICAgIH0sIDIwMDApO1xuICAgICAgICB9KS5maW5hbGx5KCgpID0+IHtcbiAgICAgICAgICBsb2FkaW5nLmhpZGUoKTtcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgc2V0TnVtYmVyOiAoZSkgPT4ge1xuICAgICAgICB0aGlzLmZvcm1EYXRhLm51bWJlciA9IHBhcnNlSW50KGUuZGV0YWlsLnZhbHVlLCAxMCk7XG4gICAgICB9LFxuICAgICAgc2V0UGxhY2U6IChlKSA9PiB7XG4gICAgICAgIHRoaXMuZm9ybURhdGEucGxhY2UgPSBwYXJzZUludChlLmRldGFpbC52YWx1ZSwgMTApO1xuICAgICAgfSxcbiAgICAgIHNldFBob25lOiAoZSkgPT4ge1xuICAgICAgICB0aGlzLmZvcm1EYXRhLnBob25lID0gZS5kZXRhaWwudmFsdWU7XG4gICAgICB9LFxuICAgICAgdXBkYXRlUGFyYW1zOiAoKSA9PiB7XG4gICAgICAgIHJlcXVlc3QuZ2V0KHVybHMuYm9va2luZ1BhcmFtcykudGhlbigoe1xuICAgICAgICAgIHJlc3VsdCxcbiAgICAgICAgfSkgPT4ge1xuICAgICAgICAgIHRoaXMucGxhY2VEYXRhID0gcmVzdWx0LnBsYWNlTGlzdDtcbiAgICAgICAgICB0aGlzLm1heE51bWJlciA9IHJlc3VsdC5tYXhOdW1iZXI7XG4gICAgICAgICAgdGhpcy5taW5OdW1iZXIgPSByZXN1bHQubWluTnVtYmVyO1xuICAgICAgICAgIHRoaXMuZm9ybURhdGEubnVtYmVyID0gcmVzdWx0Lm1pbk51bWJlcjtcbiAgICAgICAgICB0aGlzLmZvcm1EYXRhLm1lYWxzID0gcmVzdWx0Lm1lYWxzO1xuXG4gICAgICAgICAgaWYgKCFpcy5lbXB0eSh0aGlzLmZvcm1EYXRhLm1lYWxzKSkge1xuICAgICAgICAgICAgdGhpcy5mb3JtRGF0YS5tZWFscy5mb3JFYWNoKGQgPT4ge1xuICAgICAgICAgICAgICBkLmFtb3VudCA9IDA7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICAgIGxvYWRpbmcuaGlkZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgfVxuXG4gICAgZXZlbnRzID0ge1xuICAgICAgJ3VwZGF0ZS1tZWFsJzogKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygndXBkYXRlIG1lYWwnLCBhcmd1bWVudHMpO1xuICAgICAgfSxcbiAgICB9XG5cbiAgICBvblNob3coKSB7XG4gICAgICBpZiAoIWlzLmVtcHR5KGdsb2JhbC5tZWFscykpIHtcbiAgICAgICAgdGhpcy5mb3JtRGF0YS5tZWFscyA9IGV4dGVuZCh0cnVlLCBbXSwgZ2xvYmFsLm1lYWxzKSB8fCBbXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICBjb25zb2xlLmxvZygncmFuayBvbiBsb2FkJyk7XG4gICAgICBsb2FkaW5nLnNob3coKTtcblxuICAgICAgZ2xvYmFsLm1lYWxzID0gW107XG5cbiAgICAgIHJlcXVlc3QuZ2V0VXNlckluZm8oKS50aGVuKGQgPT4ge1xuICAgICAgICBzZWxmLnVzZXJJbmZvID0gZDtcbiAgICAgICAgc2VsZi5tZXRob2RzLnVwZGF0ZVBhcmFtcygpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiJdfQ==