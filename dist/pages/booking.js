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
      bookingText: null,
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
          // wepy.showToast({
          //   title: d.msg,
          //   icon: 'success',
          //   duration: 2000
          // });

          _this.formData = {
            place: null,
            meals: [],
            phone: null,
            number: _this.minNumber
          };

          _this.$apply();

          // setTimeout(function() {
          _wepy2.default.redirectTo({
            url: '/pages/booking-detail?id=' + d.result.bookingId
          });
          // wepy.navigateBack();
          // }, 2000);
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
          _this.bookingText = result.bookingText;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJvb2tpbmcuanMiXSwibmFtZXMiOlsiQm9va2luZyIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJjb21wb25lbnRzIiwidG9hc3QiLCJkYXRhIiwidXNlckluZm8iLCJwbGFjZURhdGEiLCJtYXhOdW1iZXIiLCJtaW5OdW1iZXIiLCJib29raW5nVGV4dCIsImZvcm1EYXRhIiwicGxhY2UiLCJwaG9uZSIsImRhdGUiLCJzdGFydERhdGUiLCJmb3JtYXQiLCJlbmREYXRlIiwiYWRkIiwibWVhbHMiLCJudW1iZXIiLCJjb21wdXRlZCIsImhhc01lYWwiLCJlbXB0eSIsIm1lYWxEYXRhIiwiaW5kZXgiLCJtZWFsIiwiYW1vdW50IiwibWV0aG9kcyIsInRvTWVhbExpc3QiLCJlIiwibmF2aWdhdGVUbyIsInVybCIsImRvU3VibWl0IiwiJGludm9rZSIsInRpdGxlIiwibGVuZ3RoIiwic2hvdyIsInBvc3QiLCJib29raW5nQWRkIiwiaWQiLCJ0aGVuIiwiJGFwcGx5IiwicmVkaXJlY3RUbyIsImQiLCJyZXN1bHQiLCJib29raW5nSWQiLCJmaW5hbGx5IiwiaGlkZSIsImJpbmREYXRlQ2hhbmdlIiwiZGV0YWlsIiwidmFsdWUiLCJzZXROdW1iZXIiLCJwYXJzZUludCIsInNldFBsYWNlIiwic2V0UGhvbmUiLCJ1cGRhdGVQYXJhbXMiLCJnZXQiLCJib29raW5nUGFyYW1zIiwicGxhY2VMaXN0IiwiZm9yRWFjaCIsImV2ZW50cyIsImNvbnNvbGUiLCJsb2ciLCJzZWxmIiwiZ2V0VXNlckluZm8iLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7SUFFcUJBLE87Ozs7Ozs7Ozs7Ozs7OzhNQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBSVRDLFUsR0FBYTtB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QUNQLFVBQUk2QyxPQUFPLElBQVg7QUFDQUYsY0FBUUMsR0FBUixDQUFZLGNBQVo7QUFDQSx3QkFBUTFCLElBQVI7O0FBRUEsdUJBQU9sQixLQUFQLEdBQWUsRUFBZjs7QUFFQSx3QkFBUThDLFdBQVIsR0FBc0J4QixJQUF0QixDQUEyQixhQUFLO0FBQzlCdUIsYUFBSzFELFFBQUwsR0FBZ0JzQyxDQUFoQjtBQUNBb0IsYUFBS3BDLE9BQUwsQ0FBYTRCLFlBQWI7QUFDRCxPQUhEO0FBSUQ7OztFQWhMa0MsZUFBS1UsSTs7a0JBQXJCbEUsTyIsImZpbGUiOiJib29raW5nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuICBpbXBvcnQgZXh0ZW5kIGZyb20gJ2V4dGVuZCc7XG4gIGltcG9ydCB1cmxzIGZyb20gJy4uL3NlcnZpY2VzL3VybHMuanMnO1xuICBpbXBvcnQgbG9hZGluZyBmcm9tICcuLi9zZXJ2aWNlcy9sb2FkaW5nLmpzJztcbiAgaW1wb3J0IFRvYXN0IGZyb20gJ3dlcHktY29tLXRvYXN0J1xuICBpbXBvcnQgcmVxdWVzdCBmcm9tICcuLi9zZXJ2aWNlcy9yZXF1ZXN0LmpzJztcbiAgaW1wb3J0IGlzIGZyb20gJy4uL3NlcnZpY2VzL2lzLmpzJztcbiAgaW1wb3J0IGdsb2JhbCBmcm9tICcuLi9zZXJ2aWNlcy9nbG9iYWwuanMnO1xuICBpbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9va2luZyBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+e6v+S4iumihOe6picsXG4gICAgfVxuXG4gICAgY29tcG9uZW50cyA9IHtcbiAgICAgIHRvYXN0OiBUb2FzdFxuICAgIH1cblxuICAgIGRhdGEgPSB7XG4gICAgICB1c2VySW5mbzogbnVsbCxcbiAgICAgIHBsYWNlRGF0YTogbnVsbCxcbiAgICAgIG1heE51bWJlcjogbnVsbCxcbiAgICAgIG1pbk51bWJlcjogbnVsbCxcbiAgICAgIGJvb2tpbmdUZXh0OiBudWxsLFxuICAgICAgZm9ybURhdGE6IHtcbiAgICAgICAgcGxhY2U6ICcnLFxuICAgICAgICBwaG9uZTogJycsXG4gICAgICAgIGRhdGU6ICcnLFxuICAgICAgICBzdGFydERhdGU6IG1vbWVudCgpLmZvcm1hdCgnWVlZWS1NTS1ERCcpLFxuICAgICAgICBlbmREYXRlOiBtb21lbnQoKS5hZGQoJ2RheScsIDYpLmZvcm1hdCgnWVlZWS1NTS1ERCcpLFxuICAgICAgICBtZWFsczogW10sXG4gICAgICAgIG51bWJlcjogMCxcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIGhhc01lYWw6ICgpID0+IHtcbiAgICAgICAgcmV0dXJuICFpcy5lbXB0eSh0aGlzLmZvcm1EYXRhLm1lYWxzKTtcbiAgICAgIH0sXG4gICAgICBtZWFsRGF0YTogKCkgPT4ge1xuICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICBsZXQgbWVhbCA9IHRoaXMuZm9ybURhdGEubWVhbHNbaW5kZXhdO1xuXG4gICAgICAgIGlmICghbWVhbCkge1xuICAgICAgICAgIHJldHVybiB7fTtcbiAgICAgICAgfVxuXG4gICAgICAgIHdoaWxlICghbWVhbC5hbW91bnQgJiYgdGhpcy5mb3JtRGF0YS5tZWFsc1tpbmRleCArIDFdKSB7XG4gICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgICBtZWFsID0gdGhpcy5mb3JtRGF0YS5tZWFsc1tpbmRleF07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbWVhbC5hbW91bnQgPyBtZWFsIDoge307XG4gICAgICB9LFxuICAgIH1cblxuICAgIG1ldGhvZHMgPSB7XG4gICAgICB0b01lYWxMaXN0OiAoZSkgPT4ge1xuICAgICAgICBnbG9iYWwubWVhbHMgPSB0aGlzLmZvcm1EYXRhLm1lYWxzO1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy9wYWdlcy9ib29raW5nLW1lYWwnLFxuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBkb1N1Ym1pdDogKGUpID0+IHtcbiAgICAgICAgaWYgKGlzLmVtcHR5KHRoaXMuZm9ybURhdGEucGxhY2UpKSB7XG4gICAgICAgICAgdGhpcy4kaW52b2tlKCd0b2FzdCcsICdzaG93Jywge1xuICAgICAgICAgICAgdGl0bGU6ICfor7fpgInmi6nmuLjmiI/lnLDngrknXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzLmVtcHR5KHRoaXMuZm9ybURhdGEucGhvbmUpKSB7XG4gICAgICAgICAgdGhpcy4kaW52b2tlKCd0b2FzdCcsICdzaG93Jywge1xuICAgICAgICAgICAgdGl0bGU6ICfor7floavlhpnogZTns7vnlLXor50nXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCh0aGlzLmZvcm1EYXRhLnBob25lICsgJycpLmxlbmd0aCAhPT0gNyAmJiAodGhpcy5mb3JtRGF0YS5waG9uZSArICcnKS5sZW5ndGggIT09XG4gICAgICAgICAgOCAmJiAodGhpcy5mb3JtRGF0YS5waG9uZSArICcnKS5sZW5ndGggIT09IDExKSB7XG4gICAgICAgICAgdGhpcy4kaW52b2tlKCd0b2FzdCcsICdzaG93Jywge1xuICAgICAgICAgICAgdGl0bGU6ICfor7floavlhpnmraPnoa7ogZTns7vnlLXor50nXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzLmVtcHR5KHRoaXMuZm9ybURhdGEuZGF0ZSkpIHtcbiAgICAgICAgICB0aGlzLiRpbnZva2UoJ3RvYXN0JywgJ3Nob3cnLCB7XG4gICAgICAgICAgICB0aXRsZTogJ+ivt+mAieaLqemihOe6puaXtumXtCdcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsb2FkaW5nLnNob3coJ+mihOe6puS4rScpO1xuXG4gICAgICAgIHJlcXVlc3QucG9zdCh1cmxzLmJvb2tpbmdBZGQsIHtcbiAgICAgICAgICBwbGFjZTogdGhpcy5wbGFjZURhdGFbdGhpcy5mb3JtRGF0YS5wbGFjZV0uaWQsXG4gICAgICAgICAgcGhvbmU6IHRoaXMuZm9ybURhdGEucGhvbmUsXG4gICAgICAgICAgbnVtYmVyOiB0aGlzLmZvcm1EYXRhLm51bWJlcixcbiAgICAgICAgICBtZWFsczogSlNPTi5zdHJpbmdpZnkodGhpcy5mb3JtRGF0YS5tZWFscyksXG4gICAgICAgICAgZGF0ZTogdGhpcy5mb3JtRGF0YS5kYXRlLFxuICAgICAgICB9KS50aGVuKGQgPT4ge1xuICAgICAgICAgIC8vIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgICAvLyAgIHRpdGxlOiBkLm1zZyxcbiAgICAgICAgICAvLyAgIGljb246ICdzdWNjZXNzJyxcbiAgICAgICAgICAvLyAgIGR1cmF0aW9uOiAyMDAwXG4gICAgICAgICAgLy8gfSk7XG5cbiAgICAgICAgICB0aGlzLmZvcm1EYXRhID0ge1xuICAgICAgICAgICAgcGxhY2U6IG51bGwsXG4gICAgICAgICAgICBtZWFsczogW10sXG4gICAgICAgICAgICBwaG9uZTogbnVsbCxcbiAgICAgICAgICAgIG51bWJlcjogdGhpcy5taW5OdW1iZXIsXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKTtcblxuICAgICAgICAgIC8vIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgd2VweS5yZWRpcmVjdFRvKHtcbiAgICAgICAgICAgIHVybDogYC9wYWdlcy9ib29raW5nLWRldGFpbD9pZD0ke2QucmVzdWx0LmJvb2tpbmdJZH1gLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIC8vIHdlcHkubmF2aWdhdGVCYWNrKCk7XG4gICAgICAgICAgLy8gfSwgMjAwMCk7XG4gICAgICAgIH0pLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgICAgIGxvYWRpbmcuaGlkZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBiaW5kRGF0ZUNoYW5nZTogKGUpID0+IHtcbiAgICAgICAgdGhpcy5mb3JtRGF0YS5kYXRlID0gZS5kZXRhaWwudmFsdWU7XG4gICAgICB9LFxuICAgICAgc2V0TnVtYmVyOiAoZSkgPT4ge1xuICAgICAgICB0aGlzLmZvcm1EYXRhLm51bWJlciA9IHBhcnNlSW50KGUuZGV0YWlsLnZhbHVlLCAxMCk7XG4gICAgICB9LFxuICAgICAgc2V0UGxhY2U6IChlKSA9PiB7XG4gICAgICAgIHRoaXMuZm9ybURhdGEucGxhY2UgPSBwYXJzZUludChlLmRldGFpbC52YWx1ZSwgMTApO1xuICAgICAgfSxcbiAgICAgIHNldFBob25lOiAoZSkgPT4ge1xuICAgICAgICB0aGlzLmZvcm1EYXRhLnBob25lID0gZS5kZXRhaWwudmFsdWU7XG4gICAgICB9LFxuICAgICAgdXBkYXRlUGFyYW1zOiAoKSA9PiB7XG4gICAgICAgIHJlcXVlc3QuZ2V0KHVybHMuYm9va2luZ1BhcmFtcykudGhlbigoe1xuICAgICAgICAgIHJlc3VsdCxcbiAgICAgICAgfSkgPT4ge1xuICAgICAgICAgIHRoaXMucGxhY2VEYXRhID0gcmVzdWx0LnBsYWNlTGlzdDtcbiAgICAgICAgICB0aGlzLm1heE51bWJlciA9IHJlc3VsdC5tYXhOdW1iZXI7XG4gICAgICAgICAgdGhpcy5taW5OdW1iZXIgPSByZXN1bHQubWluTnVtYmVyO1xuICAgICAgICAgIHRoaXMuYm9va2luZ1RleHQgPSByZXN1bHQuYm9va2luZ1RleHQ7XG4gICAgICAgICAgdGhpcy5mb3JtRGF0YS5udW1iZXIgPSByZXN1bHQubWluTnVtYmVyO1xuICAgICAgICAgIHRoaXMuZm9ybURhdGEubWVhbHMgPSByZXN1bHQubWVhbHM7XG5cbiAgICAgICAgICBpZiAoIWlzLmVtcHR5KHRoaXMuZm9ybURhdGEubWVhbHMpKSB7XG4gICAgICAgICAgICB0aGlzLmZvcm1EYXRhLm1lYWxzLmZvckVhY2goZCA9PiB7XG4gICAgICAgICAgICAgIGQuYW1vdW50ID0gMDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgICAgbG9hZGluZy5oaWRlKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICB9XG5cbiAgICBldmVudHMgPSB7XG4gICAgICAndXBkYXRlLW1lYWwnOiAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCd1cGRhdGUgbWVhbCcsIGFyZ3VtZW50cyk7XG4gICAgICB9LFxuICAgIH1cblxuICAgIG9uU2hvdygpIHtcbiAgICAgIGlmICghaXMuZW1wdHkoZ2xvYmFsLm1lYWxzKSkge1xuICAgICAgICB0aGlzLmZvcm1EYXRhLm1lYWxzID0gZXh0ZW5kKHRydWUsIFtdLCBnbG9iYWwubWVhbHMpIHx8IFtdO1xuICAgICAgfVxuICAgIH1cblxuICAgIG9uTG9hZCgpIHtcbiAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgIGNvbnNvbGUubG9nKCdyYW5rIG9uIGxvYWQnKTtcbiAgICAgIGxvYWRpbmcuc2hvdygpO1xuXG4gICAgICBnbG9iYWwubWVhbHMgPSBbXTtcblxuICAgICAgcmVxdWVzdC5nZXRVc2VySW5mbygpLnRoZW4oZCA9PiB7XG4gICAgICAgIHNlbGYudXNlckluZm8gPSBkO1xuICAgICAgICBzZWxmLm1ldGhvZHMudXBkYXRlUGFyYW1zKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuIl19