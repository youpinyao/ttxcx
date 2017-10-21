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
          var _ref2$result = _ref2.result,
              before = _ref2$result.before,
              after = _ref2$result.after,
              minus = _ref2$result.minus,
              rightCount = _ref2$result.rightCount;

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
      }).then(function (_ref3) {
        var list = _ref3.result.list;

        _this2.index = -1;
        _this2.currentAnswer = null;
        _this2.currentQuestion = null;
        _this2.endData = null;
        _this2.list = list;
      });
    }
  }]);
  return Question;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Question , 'pages/question'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInF1ZXN0aW9uLmpzIl0sIm5hbWVzIjpbIlF1ZXN0aW9uIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImNvbXBvbmVudHMiLCJ0b2FzdCIsImRhdGEiLCJpbmRleCIsImxpc3QiLCJoaWRlVGlwIiwiaXNFbmQiLCJlbmREYXRhIiwiY3VycmVudFF1ZXN0aW9uIiwiY3VycmVudEFuc3dlciIsImNvbXB1dGVkIiwiYmVmb3JlVGltZSIsIm51bGwiLCJ0aW1lIiwicmVuZGVyU2NvcmUiLCJiZWZvcmUiLCJzdHIiLCJob3VyIiwibWludXRlIiwic2Vjb25kIiwiYWZ0ZXJUaW1lIiwiYWZ0ZXIiLCJtaW51c1RpbWUiLCJtaW51cyIsIm1ldGhvZHMiLCJ0b1JhbmsiLCJlIiwicmVkaXJlY3RUbyIsInVybCIsInRvSG9tZSIsInJlTGF1bmNoIiwibmV4dCIsIiRpbnZva2UiLCJ0aXRsZSIsInNlbGVjdEFuc3dlciIsIm5leHRRdWVzdGlvbiIsInRoZW4iLCIkYXBwbHkiLCJzZWxlY3QiLCJjb25zb2xlIiwibG9nIiwicXVpdCIsInNob3ciLCJpZCIsIm5hdmlnYXRlQmFjayIsImZpbmFsbHkiLCJoaWRlIiwic3RhcnQiLCJpc0ZpcnN0IiwiZGVmZXJyZWQiLCJxdWVzdGlvbkVuZCIsInJlc29sdmUiLCJzaG93UXVlc3Rpb24iLCJzZXRUaW1lb3V0IiwibGVuZ3RoIiwicHJvbWlzZSIsInF1ZXN0aW9uIiwidXBsb2FkUXVlc3Rpb24iLCJhbnN3ZXJzIiwibWFwIiwiaXRlbSIsImFuc3dlciIsInVwbG9hZCIsInJlc3VsdCIsInJpZ2h0Q291bnQiLCJldmVudHMiLCJvcHRpb24iLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztJQUVxQkEsUTs7Ozs7Ozs7Ozs7Ozs7Z05BQ25CQyxNLEdBQVM7QUFDUEMs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aEMsSUFFRSxTQUhKMkQsTUFHSSxDQUZGM0QsSUFFRTs7QUFDSixlQUFLRCxLQUFMLEdBQWEsQ0FBQyxDQUFkO0FBQ0EsZUFBS00sYUFBTCxHQUFxQixJQUFyQjtBQUNBLGVBQUtELGVBQUwsR0FBdUIsSUFBdkI7QUFDQSxlQUFLRCxPQUFMLEdBQWUsSUFBZjtBQUNBLGVBQUtILElBQUwsR0FBWUEsSUFBWjtBQUNELE9BWkQ7QUFhRDs7O0VBcFBtQyxlQUFLK0QsSTs7a0JBQXRCdEUsUSIsImZpbGUiOiJxdWVzdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbiAgaW1wb3J0IGRlZmVyIGZyb20gJy4uL3NlcnZpY2VzL2RlZmVyLmpzJztcbiAgaW1wb3J0IHF1ZXN0aW9uIGZyb20gJy4uL3NlcnZpY2VzL3F1ZXN0aW9uLmpzJztcbiAgaW1wb3J0IGxvYWRpbmcgZnJvbSAnLi4vc2VydmljZXMvbG9hZGluZy5qcyc7XG4gIGltcG9ydCB1dGlsIGZyb20gJy4uL3NlcnZpY2VzL3V0aWwuanMnO1xuICBpbXBvcnQgaXMgZnJvbSAnLi4vc2VydmljZXMvaXMuanMnO1xuICBpbXBvcnQgVG9hc3QgZnJvbSAnd2VweS1jb20tdG9hc3QnXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgUXVlc3Rpb24gZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnrZTpopjml7bpl7QnLFxuICAgIH1cblxuICAgIGNvbXBvbmVudHMgPSB7XG4gICAgICB0b2FzdDogVG9hc3QsXG4gICAgfVxuXG4gICAgZGF0YSA9IHtcbiAgICAgIGluZGV4OiAtMSxcbiAgICAgIGxpc3Q6IFtdLFxuICAgICAgaGlkZVRpcDogZmFsc2UsXG4gICAgICBpc0VuZDogZmFsc2UsXG4gICAgICBlbmREYXRhOiBudWxsLFxuICAgICAgY3VycmVudFF1ZXN0aW9uOiBudWxsLFxuICAgICAgY3VycmVudEFuc3dlcjogbnVsbCxcbiAgICB9XG5cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIGJlZm9yZVRpbWU6ICgpID0+IHtcbiAgICAgICAgaWYgKGlzLm51bGwodGhpcy5lbmREYXRhKSkge1xuICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0aW1lID0gdXRpbC5yZW5kZXJTY29yZSh0aGlzLmVuZERhdGEuYmVmb3JlKTtcbiAgICAgICAgbGV0IHN0ciA9ICcnO1xuXG4gICAgICAgIGlmICh0aW1lLmhvdXIpIHtcbiAgICAgICAgICBzdHIgKz0gYCR7dGltZS5ob3VyfeaXtmA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRpbWUubWludXRlKSB7XG4gICAgICAgICAgc3RyICs9IGAke3RpbWUubWludXRlfeWIhmA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRpbWUuc2Vjb25kKSB7XG4gICAgICAgICAgc3RyICs9IGAke3RpbWUuc2Vjb25kfeenkmA7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc3RyO1xuICAgICAgfSxcbiAgICAgIGFmdGVyVGltZTogKCkgPT4ge1xuICAgICAgICBpZiAoaXMubnVsbCh0aGlzLmVuZERhdGEpKSB7XG4gICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRpbWUgPSB1dGlsLnJlbmRlclNjb3JlKHRoaXMuZW5kRGF0YS5hZnRlcik7XG4gICAgICAgIGxldCBzdHIgPSAnJztcblxuICAgICAgICBpZiAodGltZS5ob3VyKSB7XG4gICAgICAgICAgc3RyICs9IGAke3RpbWUuaG91cn3ml7ZgO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aW1lLm1pbnV0ZSkge1xuICAgICAgICAgIHN0ciArPSBgJHt0aW1lLm1pbnV0ZX3liIZgO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aW1lLnNlY29uZCkge1xuICAgICAgICAgIHN0ciArPSBgJHt0aW1lLnNlY29uZH3np5JgO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICAgIH0sXG4gICAgICBtaW51c1RpbWU6ICgpID0+IHtcbiAgICAgICAgaWYgKGlzLm51bGwodGhpcy5lbmREYXRhKSkge1xuICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0aW1lID0gdXRpbC5yZW5kZXJTY29yZSh0aGlzLmVuZERhdGEubWludXMpO1xuICAgICAgICBsZXQgc3RyID0gJyc7XG5cbiAgICAgICAgaWYgKHRpbWUuaG91cikge1xuICAgICAgICAgIHN0ciArPSBgJHt0aW1lLmhvdXJ95pe2YDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGltZS5taW51dGUpIHtcbiAgICAgICAgICBzdHIgKz0gYCR7dGltZS5taW51dGV95YiGYDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGltZS5zZWNvbmQpIHtcbiAgICAgICAgICBzdHIgKz0gYCR7dGltZS5zZWNvbmR956eSYDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHRvUmFuazogKGUpID0+IHtcbiAgICAgICAgd2VweS5yZWRpcmVjdFRvKHtcbiAgICAgICAgICB1cmw6ICcvcGFnZXMvcmFuaycsXG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIHRvSG9tZTogKGUpID0+IHtcbiAgICAgICAgd2VweS5yZUxhdW5jaCh7XG4gICAgICAgICAgdXJsOiAnL3BhZ2VzL2hvbWUnLFxuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBuZXh0OiAoZSkgPT4ge1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50QW5zd2VyID09PSBudWxsKSB7XG4gICAgICAgICAgdGhpcy4kaW52b2tlKCd0b2FzdCcsICdzaG93Jywge1xuICAgICAgICAgICAgdGl0bGU6ICfor7fpgInmi6nnrZTmoYgnXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5saXN0W3RoaXMuaW5kZXhdLnNlbGVjdEFuc3dlciA9IHRoaXMuY3VycmVudEFuc3dlcjtcbiAgICAgICAgdGhpcy5tZXRob2RzLm5leHRRdWVzdGlvbigpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIHRoaXMuY3VycmVudEFuc3dlciA9IG51bGw7XG4gICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9LFxuICAgICAgc2VsZWN0OiAoaW5kZXgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudEFuc3dlciAhPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmN1cnJlbnRBbnN3ZXIgPSBpbmRleDtcbiAgICAgICAgY29uc29sZS5sb2coJ3NlbGVjdCcsIGluZGV4KTtcbiAgICAgIH0sXG4gICAgICBxdWl0OiAoZSkgPT4ge1xuICAgICAgICBsb2FkaW5nLnNob3coKTtcbiAgICAgICAgcXVlc3Rpb24ucXVpdCh7XG4gICAgICAgICAgaWQ6IHRoaXMuaWQsXG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIHdlcHkubmF2aWdhdGVCYWNrKCk7XG4gICAgICAgIH0pLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgICAgIGxvYWRpbmcuaGlkZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBzdGFydDogKGUpID0+IHtcbiAgICAgICAgbG9hZGluZy5zaG93KCk7XG4gICAgICAgIHF1ZXN0aW9uLnN0YXJ0KHtcbiAgICAgICAgICBpZDogdGhpcy5pZCxcbiAgICAgICAgfSkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICB0aGlzLmhpZGVUaXAgPSB0cnVlO1xuICAgICAgICAgIHRoaXMubWV0aG9kcy5uZXh0UXVlc3Rpb24odHJ1ZSk7XG4gICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgfSkuZmluYWxseSgoKSA9PiB7XG4gICAgICAgICAgbG9hZGluZy5oaWRlKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIG5leHRRdWVzdGlvbjogKGlzRmlyc3QpID0+IHtcbiAgICAgICAgY29uc3QgZGVmZXJyZWQgPSBkZWZlcigpO1xuXG4gICAgICAgIGlmICh0aGlzLmluZGV4ID49IDAgJiYgIXRoaXMubGlzdFt0aGlzLmluZGV4XSkge1xuICAgICAgICAgIHRoaXMubWV0aG9kcy5xdWVzdGlvbkVuZCgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmluZGV4Kys7XG4gICAgICAgIGlmICh0aGlzLmxpc3RbdGhpcy5pbmRleF0pIHtcbiAgICAgICAgICB0aGlzLm1ldGhvZHMuc2hvd1F1ZXN0aW9uKHRoaXMubGlzdFt0aGlzLmluZGV4XSwgaXNGaXJzdCk7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5pbmRleCA9IHRoaXMubGlzdC5sZW5ndGggLSAxO1xuICAgICAgICAgIHRoaXMubWV0aG9kcy5xdWVzdGlvbkVuZCgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICB9LFxuICAgICAgc2hvd1F1ZXN0aW9uOiAocXVlc3Rpb24sIGlzRmlyc3QpID0+IHtcbiAgICAgICAgdGhpcy5jdXJyZW50UXVlc3Rpb24gPSBudWxsO1xuICAgICAgICBpZiAoIWlzRmlyc3QpIHtcbiAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICB9XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuY3VycmVudFF1ZXN0aW9uID0gcXVlc3Rpb247XG4gICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgfSwgaXNGaXJzdCA/IDAgOiAxNTApO1xuICAgICAgfSxcbiAgICAgIHF1ZXN0aW9uRW5kOiAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGRlZmVycmVkID0gZGVmZXIoKTtcblxuICAgICAgICB0aGlzLm1ldGhvZHMudXBsb2FkUXVlc3Rpb24oKS50aGVuKCgpID0+IHtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRRdWVzdGlvbiA9IG51bGw7XG4gICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgfSxcbiAgICAgIHVwbG9hZFF1ZXN0aW9uOiAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGRlZmVycmVkID0gZGVmZXIoKTtcblxuICAgICAgICBsb2FkaW5nLnNob3coJ+aPkOS6pOS4rScpO1xuICAgICAgICBjb25zdCBhbnN3ZXJzID0gSlNPTi5zdHJpbmdpZnkodGhpcy5saXN0Lm1hcChpdGVtID0+IHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaWQ6IGl0ZW0uaWQsXG4gICAgICAgICAgICBzZWxlY3RBbnN3ZXI6IGl0ZW0uc2VsZWN0QW5zd2VyLFxuICAgICAgICAgICAgYW5zd2VyOiBpdGVtLmFuc3dlcixcbiAgICAgICAgICB9O1xuICAgICAgICB9KSk7XG4gICAgICAgIHF1ZXN0aW9uLnVwbG9hZCh7XG4gICAgICAgICAgaWQ6IHRoaXMuaWQsXG4gICAgICAgICAgYW5zd2VycyxcbiAgICAgICAgfSkudGhlbigoe1xuICAgICAgICAgIHJlc3VsdDoge1xuICAgICAgICAgICAgYmVmb3JlLFxuICAgICAgICAgICAgYWZ0ZXIsXG4gICAgICAgICAgICBtaW51cyxcbiAgICAgICAgICAgIHJpZ2h0Q291bnQsXG4gICAgICAgICAgfVxuICAgICAgICB9KSA9PiB7XG4gICAgICAgICAgdGhpcy5lbmREYXRhID0ge1xuICAgICAgICAgICAgYmVmb3JlLFxuICAgICAgICAgICAgYWZ0ZXIsXG4gICAgICAgICAgICBtaW51cyxcbiAgICAgICAgICAgIHJpZ2h0Q291bnQsXG4gICAgICAgICAgfTtcbiAgICAgICAgICB0aGlzLmlzRW5kID0gdHJ1ZTtcbiAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKCk7XG4gICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgfSkuZmluYWxseSgoKSA9PiB7XG4gICAgICAgICAgbG9hZGluZy5oaWRlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgfSxcbiAgICB9XG5cbiAgICBldmVudHMgPSB7XG5cbiAgICB9XG5cbiAgICBvblNob3coKSB7XG4gICAgICBjb25zb2xlLmxvZygncXVlc3Rpb24gc2hvdycpO1xuICAgIH1cblxuICAgIG9uTG9hZChvcHRpb24pIHtcbiAgICAgIGNvbnNvbGUubG9nKCdxdWVzdGlvbiBtZWFsIG9uIGxvYWQnLCBvcHRpb24uaWQpO1xuICAgICAgdGhpcy5pZCA9IG9wdGlvbi5pZDtcblxuICAgICAgcXVlc3Rpb24ubGlzdCh7XG4gICAgICAgIGlkOiB0aGlzLmlkLFxuICAgICAgfSkudGhlbigoe1xuICAgICAgICByZXN1bHQ6IHtcbiAgICAgICAgICBsaXN0XG4gICAgICAgIH1cbiAgICAgIH0pID0+IHtcbiAgICAgICAgdGhpcy5pbmRleCA9IC0xO1xuICAgICAgICB0aGlzLmN1cnJlbnRBbnN3ZXIgPSBudWxsO1xuICAgICAgICB0aGlzLmN1cnJlbnRRdWVzdGlvbiA9IG51bGw7XG4gICAgICAgIHRoaXMuZW5kRGF0YSA9IG51bGw7XG4gICAgICAgIHRoaXMubGlzdCA9IGxpc3Q7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuIl19