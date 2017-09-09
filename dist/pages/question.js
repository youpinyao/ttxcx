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

var _defer = require('./../services/defer.js');

var _defer2 = _interopRequireDefault(_defer);

var _question = require('./../services/question.js');

var _question2 = _interopRequireDefault(_question);

var _loading = require('./../services/loading.js');

var _loading2 = _interopRequireDefault(_loading);

var _util = require('./../services/util.js');

var _util2 = _interopRequireDefault(_util);

var _is = require('./../services/is.js');

var _is2 = _interopRequireDefault(_is);

var _wepyComToast = require('./../npm/wepy-com-toast/toast.js');

var _wepyComToast2 = _interopRequireDefault(_wepyComToast);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Question = function (_wepy$page) {
  (0, _inherits3.default)(Question, _wepy$page);

  function Question() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Question);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Question.__proto__ || (0, _getPrototypeOf2.default)(Question)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '答题时间'
    }, _this.components = {
      toast: _wepyComToast2.default
    }, _this.data = {
      index: -1,
      list: [],
      hideTip: false,
      isEnd: false,
      endData: null,
      currentQuestion: null,
      currentAnswer: null
    }, _this.computed = {
      beforeTime: function beforeTime() {
        if (_is2.default.null(_this.endData)) {
          return '';
        }
        var time = _util2.default.renderScore(_this.endData.before);
        var str = '';

        if (time.hour) {
          str += time.hour + '\u65F6';
        }
        if (time.minute) {
          str += time.minute + '\u5206';
        }
        if (time.second) {
          str += time.second + '\u79D2';
        }

        return str;
      },
      afterTime: function afterTime() {
        if (_is2.default.null(_this.endData)) {
          return '';
        }
        var time = _util2.default.renderScore(_this.endData.after);
        var str = '';

        if (time.hour) {
          str += time.hour + '\u65F6';
        }
        if (time.minute) {
          str += time.minute + '\u5206';
        }
        if (time.second) {
          str += time.second + '\u79D2';
        }

        return str;
      },
      minusTime: function minusTime() {
        if (_is2.default.null(_this.endData)) {
          return '';
        }
        var time = _util2.default.renderScore(_this.endData.minus);
        var str = '';

        if (time.hour) {
          str += time.hour + '\u65F6';
        }
        if (time.minute) {
          str += time.minute + '\u5206';
        }
        if (time.second) {
          str += time.second + '\u79D2';
        }

        return str;
      }
    }, _this.methods = {
      toRank: function toRank(e) {
        _wepy2.default.redirectTo({
          url: '/pages/rank'
        });
      },
      toHome: function toHome(e) {
        _wepy2.default.reLaunch({
          url: '/pages/home'
        });
      },
      next: function next(e) {
        if (_this.currentAnswer === null) {
          _this.$invoke('toast', 'show', {
            title: '请选择答案'
          });
          return;
        }

        _this.list[_this.index].selectAnswer = _this.currentAnswer;
        _this.methods.nextQuestion().then(function () {
          _this.currentAnswer = null;
          _this.$apply();
        });

        return true;
      },
      select: function select(index) {
        if (_this.currentAnswer !== null) {
          return;
        }
        _this.currentAnswer = index;
        console.log('select', index);
      },
      quit: function quit(e) {
        _loading2.default.show();
        _question2.default.quit({
          id: _this.id
        }).then(function () {
          _wepy2.default.navigateBack();
        }).finally(function () {
          _loading2.default.hide();
        });
      },
      start: function start(e) {
        _loading2.default.show();
        _question2.default.start({
          id: _this.id
        }).then(function (data) {
          _this.hideTip = true;
          _this.methods.nextQuestion(true);
          _this.$apply();
        }).finally(function () {
          _loading2.default.hide();
        });
      },
      nextQuestion: function nextQuestion(isFirst) {
        var deferred = (0, _defer2.default)();

        if (_this.index >= 0 && !_this.list[_this.index]) {
          _this.methods.questionEnd().then(function () {
            deferred.resolve();
          });
          return;
        }
        _this.index++;
        if (_this.list[_this.index]) {
          _this.methods.showQuestion(_this.list[_this.index], isFirst);
          setTimeout(function () {
            deferred.resolve();
          });
        } else {
          _this.index = _this.list.length - 1;
          _this.methods.questionEnd().then(function () {
            deferred.resolve();
          });
        }

        return deferred.promise;
      },
      showQuestion: function showQuestion(question, isFirst) {
        _this.currentQuestion = null;
        if (!isFirst) {
          _this.$apply();
        }
        setTimeout(function () {
          _this.currentQuestion = question;
          _this.$apply();
        }, isFirst ? 0 : 150);
      },
      questionEnd: function questionEnd() {
        var deferred = (0, _defer2.default)();

        _this.methods.uploadQuestion().then(function () {
          _this.currentQuestion = null;
          _this.$apply();
          deferred.resolve();
        });

        return deferred.promise;
      },
      uploadQuestion: function uploadQuestion() {
        var deferred = (0, _defer2.default)();

        _loading2.default.show('提交中');
        var answers = (0, _stringify2.default)(_this.list.map(function (item) {
          return {
            id: item.id,
            selectAnswer: item.selectAnswer,
            answer: item.answer
          };
        }));
        _question2.default.upload({
          id: _this.id,
          answers: answers
        }).then(function (_ref2) {
          var before = _ref2.before,
              after = _ref2.after,
              minus = _ref2.minus,
              rightCount = _ref2.rightCount;

          _this.endData = {
            before: before,
            after: after,
            minus: minus,
            rightCount: rightCount
          };
          _this.isEnd = true;
          deferred.resolve();
          _this.$apply();
        }).finally(function () {
          _loading2.default.hide();
        });

        return deferred.promise;
      }
    }, _this.events = {}, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Question, [{
    key: 'onShow',
    value: function onShow() {
      console.log('question show');
    }
  }, {
    key: 'onLoad',
    value: function onLoad(option) {
      var _this2 = this;

      console.log('question meal on load', option.id);
      this.id = option.id;

      _question2.default.list({
        id: this.id
      }).then(function (data) {
        _this2.index = -1;
        _this2.currentAnswer = null;
        _this2.currentQuestion = null;
        _this2.endData = null;
        _this2.list = data.list;
      });
    }
  }]);
  return Question;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Question , 'pages/question'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInF1ZXN0aW9uLmpzIl0sIm5hbWVzIjpbIlF1ZXN0aW9uIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImNvbXBvbmVudHMiLCJ0b2FzdCIsImRhdGEiLCJpbmRleCIsImxpc3QiLCJoaWRlVGlwIiwiaXNFbmQiLCJlbmREYXRhIiwiY3VycmVudFF1ZXN0aW9uIiwiY3VycmVudEFuc3dlciIsImNvbXB1dGVkIiwiYmVmb3JlVGltZSIsIm51bGwiLCJ0aW1lIiwicmVuZGVyU2NvcmUiLCJiZWZvcmUiLCJzdHIiLCJob3VyIiwibWludXRlIiwic2Vjb25kIiwiYWZ0ZXJUaW1lIiwiYWZ0ZXIiLCJtaW51c1RpbWUiLCJtaW51cyIsIm1ldGhvZHMiLCJ0b1JhbmsiLCJlIiwicmVkaXJlY3RUbyIsInVybCIsInRvSG9tZSIsInJlTGF1bmNoIiwibmV4dCIsIiRpbnZva2UiLCJ0aXRsZSIsInNlbGVjdEFuc3dlciIsIm5leHRRdWVzdGlvbiIsInRoZW4iLCIkYXBwbHkiLCJzZWxlY3QiLCJjb25zb2xlIiwibG9nIiwicXVpdCIsInNob3ciLCJpZCIsIm5hdmlnYXRlQmFjayIsImZpbmFsbHkiLCJoaWRlIiwic3RhcnQiLCJpc0ZpcnN0IiwiZGVmZXJyZWQiLCJxdWVzdGlvbkVuZCIsInJlc29sdmUiLCJzaG93UXVlc3Rpb24iLCJzZXRUaW1lb3V0IiwibGVuZ3RoIiwicHJvbWlzZSIsInF1ZXN0aW9uIiwidXBsb2FkUXVlc3Rpb24iLCJhbnN3ZXJzIiwibWFwIiwiaXRlbSIsImFuc3dlciIsInVwbG9hZCIsInJpZ2h0Q291bnQiLCJldmVudHMiLCJvcHRpb24iLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztJQUVxQkEsUTs7Ozs7Ozs7Ozs7Ozs7Z05BQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FB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S00sYUFBTCxHQUFxQixJQUFyQjtBQUNBLGVBQUtELGVBQUwsR0FBdUIsSUFBdkI7QUFDQSxlQUFLRCxPQUFMLEdBQWUsSUFBZjtBQUNBLGVBQUtILElBQUwsR0FBWUYsS0FBS0UsSUFBakI7QUFDRCxPQVJEO0FBU0Q7OztFQTlPbUMsZUFBSzhELEk7O2tCQUF0QnJFLFEiLCJmaWxlIjoicXVlc3Rpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG4gIGltcG9ydCBkZWZlciBmcm9tICcuLi9zZXJ2aWNlcy9kZWZlci5qcyc7XG4gIGltcG9ydCBxdWVzdGlvbiBmcm9tICcuLi9zZXJ2aWNlcy9xdWVzdGlvbi5qcyc7XG4gIGltcG9ydCBsb2FkaW5nIGZyb20gJy4uL3NlcnZpY2VzL2xvYWRpbmcuanMnO1xuICBpbXBvcnQgdXRpbCBmcm9tICcuLi9zZXJ2aWNlcy91dGlsLmpzJztcbiAgaW1wb3J0IGlzIGZyb20gJy4uL3NlcnZpY2VzL2lzLmpzJztcbiAgaW1wb3J0IFRvYXN0IGZyb20gJ3dlcHktY29tLXRvYXN0J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFF1ZXN0aW9uIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn562U6aKY5pe26Ze0JyxcbiAgICB9XG5cbiAgICBjb21wb25lbnRzID0ge1xuICAgICAgdG9hc3Q6IFRvYXN0LFxuICAgIH1cblxuICAgIGRhdGEgPSB7XG4gICAgICBpbmRleDogLTEsXG4gICAgICBsaXN0OiBbXSxcbiAgICAgIGhpZGVUaXA6IGZhbHNlLFxuICAgICAgaXNFbmQ6IGZhbHNlLFxuICAgICAgZW5kRGF0YTogbnVsbCxcbiAgICAgIGN1cnJlbnRRdWVzdGlvbjogbnVsbCxcbiAgICAgIGN1cnJlbnRBbnN3ZXI6IG51bGwsXG4gICAgfVxuXG4gICAgY29tcHV0ZWQgPSB7XG4gICAgICBiZWZvcmVUaW1lOiAoKSA9PiB7XG4gICAgICAgIGlmIChpcy5udWxsKHRoaXMuZW5kRGF0YSkpIHtcbiAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdGltZSA9IHV0aWwucmVuZGVyU2NvcmUodGhpcy5lbmREYXRhLmJlZm9yZSk7XG4gICAgICAgIGxldCBzdHIgPSAnJztcblxuICAgICAgICBpZiAodGltZS5ob3VyKSB7XG4gICAgICAgICAgc3RyICs9IGAke3RpbWUuaG91cn3ml7ZgO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aW1lLm1pbnV0ZSkge1xuICAgICAgICAgIHN0ciArPSBgJHt0aW1lLm1pbnV0ZX3liIZgO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aW1lLnNlY29uZCkge1xuICAgICAgICAgIHN0ciArPSBgJHt0aW1lLnNlY29uZH3np5JgO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICAgIH0sXG4gICAgICBhZnRlclRpbWU6ICgpID0+IHtcbiAgICAgICAgaWYgKGlzLm51bGwodGhpcy5lbmREYXRhKSkge1xuICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0aW1lID0gdXRpbC5yZW5kZXJTY29yZSh0aGlzLmVuZERhdGEuYWZ0ZXIpO1xuICAgICAgICBsZXQgc3RyID0gJyc7XG5cbiAgICAgICAgaWYgKHRpbWUuaG91cikge1xuICAgICAgICAgIHN0ciArPSBgJHt0aW1lLmhvdXJ95pe2YDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGltZS5taW51dGUpIHtcbiAgICAgICAgICBzdHIgKz0gYCR7dGltZS5taW51dGV95YiGYDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGltZS5zZWNvbmQpIHtcbiAgICAgICAgICBzdHIgKz0gYCR7dGltZS5zZWNvbmR956eSYDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgICB9LFxuICAgICAgbWludXNUaW1lOiAoKSA9PiB7XG4gICAgICAgIGlmIChpcy5udWxsKHRoaXMuZW5kRGF0YSkpIHtcbiAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdGltZSA9IHV0aWwucmVuZGVyU2NvcmUodGhpcy5lbmREYXRhLm1pbnVzKTtcbiAgICAgICAgbGV0IHN0ciA9ICcnO1xuXG4gICAgICAgIGlmICh0aW1lLmhvdXIpIHtcbiAgICAgICAgICBzdHIgKz0gYCR7dGltZS5ob3VyfeaXtmA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRpbWUubWludXRlKSB7XG4gICAgICAgICAgc3RyICs9IGAke3RpbWUubWludXRlfeWIhmA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRpbWUuc2Vjb25kKSB7XG4gICAgICAgICAgc3RyICs9IGAke3RpbWUuc2Vjb25kfeenkmA7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc3RyO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1ldGhvZHMgPSB7XG4gICAgICB0b1Jhbms6IChlKSA9PiB7XG4gICAgICAgIHdlcHkucmVkaXJlY3RUbyh7XG4gICAgICAgICAgdXJsOiAnL3BhZ2VzL3JhbmsnLFxuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICB0b0hvbWU6IChlKSA9PiB7XG4gICAgICAgIHdlcHkucmVMYXVuY2goe1xuICAgICAgICAgIHVybDogJy9wYWdlcy9ob21lJyxcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgbmV4dDogKGUpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudEFuc3dlciA9PT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMuJGludm9rZSgndG9hc3QnLCAnc2hvdycsIHtcbiAgICAgICAgICAgIHRpdGxlOiAn6K+36YCJ5oup562U5qGIJ1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubGlzdFt0aGlzLmluZGV4XS5zZWxlY3RBbnN3ZXIgPSB0aGlzLmN1cnJlbnRBbnN3ZXI7XG4gICAgICAgIHRoaXMubWV0aG9kcy5uZXh0UXVlc3Rpb24oKS50aGVuKCgpID0+IHtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRBbnN3ZXIgPSBudWxsO1xuICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSxcbiAgICAgIHNlbGVjdDogKGluZGV4KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRBbnN3ZXIgIT09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jdXJyZW50QW5zd2VyID0gaW5kZXg7XG4gICAgICAgIGNvbnNvbGUubG9nKCdzZWxlY3QnLCBpbmRleCk7XG4gICAgICB9LFxuICAgICAgcXVpdDogKGUpID0+IHtcbiAgICAgICAgbG9hZGluZy5zaG93KCk7XG4gICAgICAgIHF1ZXN0aW9uLnF1aXQoe1xuICAgICAgICAgIGlkOiB0aGlzLmlkLFxuICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICB3ZXB5Lm5hdmlnYXRlQmFjaygpO1xuICAgICAgICB9KS5maW5hbGx5KCgpID0+IHtcbiAgICAgICAgICBsb2FkaW5nLmhpZGUoKTtcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgc3RhcnQ6IChlKSA9PiB7XG4gICAgICAgIGxvYWRpbmcuc2hvdygpO1xuICAgICAgICBxdWVzdGlvbi5zdGFydCh7XG4gICAgICAgICAgaWQ6IHRoaXMuaWQsXG4gICAgICAgIH0pLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgdGhpcy5oaWRlVGlwID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLm1ldGhvZHMubmV4dFF1ZXN0aW9uKHRydWUpO1xuICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgIH0pLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgICAgIGxvYWRpbmcuaGlkZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBuZXh0UXVlc3Rpb246IChpc0ZpcnN0KSA9PiB7XG4gICAgICAgIGNvbnN0IGRlZmVycmVkID0gZGVmZXIoKTtcblxuICAgICAgICBpZiAodGhpcy5pbmRleCA+PSAwICYmICF0aGlzLmxpc3RbdGhpcy5pbmRleF0pIHtcbiAgICAgICAgICB0aGlzLm1ldGhvZHMucXVlc3Rpb25FbmQoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pbmRleCsrO1xuICAgICAgICBpZiAodGhpcy5saXN0W3RoaXMuaW5kZXhdKSB7XG4gICAgICAgICAgdGhpcy5tZXRob2RzLnNob3dRdWVzdGlvbih0aGlzLmxpc3RbdGhpcy5pbmRleF0sIGlzRmlyc3QpO1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuaW5kZXggPSB0aGlzLmxpc3QubGVuZ3RoIC0gMTtcbiAgICAgICAgICB0aGlzLm1ldGhvZHMucXVlc3Rpb25FbmQoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgfSxcbiAgICAgIHNob3dRdWVzdGlvbjogKHF1ZXN0aW9uLCBpc0ZpcnN0KSA9PiB7XG4gICAgICAgIHRoaXMuY3VycmVudFF1ZXN0aW9uID0gbnVsbDtcbiAgICAgICAgaWYgKCFpc0ZpcnN0KSB7XG4gICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgfVxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRRdWVzdGlvbiA9IHF1ZXN0aW9uO1xuICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgIH0sIGlzRmlyc3QgPyAwIDogMTUwKTtcbiAgICAgIH0sXG4gICAgICBxdWVzdGlvbkVuZDogKCkgPT4ge1xuICAgICAgICBjb25zdCBkZWZlcnJlZCA9IGRlZmVyKCk7XG5cbiAgICAgICAgdGhpcy5tZXRob2RzLnVwbG9hZFF1ZXN0aW9uKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgdGhpcy5jdXJyZW50UXVlc3Rpb24gPSBudWxsO1xuICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgIH0sXG4gICAgICB1cGxvYWRRdWVzdGlvbjogKCkgPT4ge1xuICAgICAgICBjb25zdCBkZWZlcnJlZCA9IGRlZmVyKCk7XG5cbiAgICAgICAgbG9hZGluZy5zaG93KCfmj5DkuqTkuK0nKTtcbiAgICAgICAgY29uc3QgYW5zd2VycyA9IEpTT04uc3RyaW5naWZ5KHRoaXMubGlzdC5tYXAoaXRlbSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlkOiBpdGVtLmlkLFxuICAgICAgICAgICAgc2VsZWN0QW5zd2VyOiBpdGVtLnNlbGVjdEFuc3dlcixcbiAgICAgICAgICAgIGFuc3dlcjogaXRlbS5hbnN3ZXIsXG4gICAgICAgICAgfTtcbiAgICAgICAgfSkpO1xuICAgICAgICBxdWVzdGlvbi51cGxvYWQoe1xuICAgICAgICAgIGlkOiB0aGlzLmlkLFxuICAgICAgICAgIGFuc3dlcnMsXG4gICAgICAgIH0pLnRoZW4oKHtcbiAgICAgICAgICBiZWZvcmUsXG4gICAgICAgICAgYWZ0ZXIsXG4gICAgICAgICAgbWludXMsXG4gICAgICAgICAgcmlnaHRDb3VudCxcbiAgICAgICAgfSkgPT4ge1xuICAgICAgICAgIHRoaXMuZW5kRGF0YSA9IHtcbiAgICAgICAgICAgIGJlZm9yZSxcbiAgICAgICAgICAgIGFmdGVyLFxuICAgICAgICAgICAgbWludXMsXG4gICAgICAgICAgICByaWdodENvdW50LFxuICAgICAgICAgIH07XG4gICAgICAgICAgdGhpcy5pc0VuZCA9IHRydWU7XG4gICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSgpO1xuICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgIH0pLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgICAgIGxvYWRpbmcuaGlkZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgIH0sXG4gICAgfVxuXG4gICAgZXZlbnRzID0ge1xuXG4gICAgfVxuXG4gICAgb25TaG93KCkge1xuICAgICAgY29uc29sZS5sb2coJ3F1ZXN0aW9uIHNob3cnKTtcbiAgICB9XG5cbiAgICBvbkxvYWQob3B0aW9uKSB7XG4gICAgICBjb25zb2xlLmxvZygncXVlc3Rpb24gbWVhbCBvbiBsb2FkJywgb3B0aW9uLmlkKTtcbiAgICAgIHRoaXMuaWQgPSBvcHRpb24uaWQ7XG5cbiAgICAgIHF1ZXN0aW9uLmxpc3Qoe1xuICAgICAgICBpZDogdGhpcy5pZCxcbiAgICAgIH0pLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgIHRoaXMuaW5kZXggPSAtMTtcbiAgICAgICAgdGhpcy5jdXJyZW50QW5zd2VyID0gbnVsbDtcbiAgICAgICAgdGhpcy5jdXJyZW50UXVlc3Rpb24gPSBudWxsO1xuICAgICAgICB0aGlzLmVuZERhdGEgPSBudWxsO1xuICAgICAgICB0aGlzLmxpc3QgPSBkYXRhLmxpc3Q7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuIl19