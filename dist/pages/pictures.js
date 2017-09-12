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

var _nullList = require('./../components/nullList.js');

var _nullList2 = _interopRequireDefault(_nullList);

var _request = require('./../services/request.js');

var _request2 = _interopRequireDefault(_request);

var _urls = require('./../services/urls.js');

var _urls2 = _interopRequireDefault(_urls);

var _wepyComToast = require('./../npm/wepy-com-toast/toast.js');

var _wepyComToast2 = _interopRequireDefault(_wepyComToast);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Pictures = function (_wepy$page) {
  (0, _inherits3.default)(Pictures, _wepy$page);

  function Pictures() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Pictures);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Pictures.__proto__ || (0, _getPrototypeOf2.default)(Pictures)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '塔拓'
    }, _this.$props = { "null-list": { "xmlns:wx": "" } }, _this.$events = {}, _this.components = {
      'null-list': _nullList2.default,
      'toast': _wepyComToast2.default
    }, _this.data = {
      status: 'view',
      pictureList: []
    }, _this.computed = {}, _this.methods = {
      previewImage: function previewImage(itemId) {
        var current = null;
        var urls = [];

        _this.pictureList.forEach(function (list) {
          list.items.forEach(function (item) {
            if (item.id === itemId) {
              current = item.natural;
            }
            urls.push(item.natural);
          });
        });

        _wepy2.default.previewImage({
          current: current, // 当前显示图片的http链接
          urls: urls // 需要预览的图片http链接列表
        });
      },
      selectItem: function selectItem(itemId) {
        if (_this.status !== 'save') {
          _this.methods.previewImage(itemId);
          return;
        }
        _this.pictureList.forEach(function (list) {
          list.items.forEach(function (item) {
            console.log(item.id, itemId);
            if (item.id === itemId) {
              item.checked = !item.checked;
            }
          });
        });
        _this.$apply();
      },
      saveToPhoto: function saveToPhoto() {
        var selected = [];

        _this.pictureList.forEach(function (list) {
          list.items.forEach(function (item) {
            if (item.checked === true) {
              selected.push(item.natural);
            }
          });
        });

        if (!selected.length) {
          _this.$invoke('toast', 'show', {
            title: '请勾选图片'
          });
          return false;
        }

        return true;
      },
      setStatus: function setStatus(status) {
        _this.status = status;
      },
      getChallengePictures: function getChallengePictures() {
        _request2.default.get(_urls2.default.picturesData, {
          challengeId: _this.challengeId
        }).then(function (data) {
          _this.pictureList = [{
            title: false,
            items: data.result.list
          }];
          _this.$apply();
        });
      },
      getChallengePicturesOfMy: function getChallengePicturesOfMy() {}
    }, _this.events = {}, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Pictures, [{
    key: 'onShow',
    value: function onShow() {}
  }, {
    key: 'onLoad',
    value: function onLoad(options) {
      var _this2 = this;

      this.challengeId = options.id || '123123';
      console.log('pictures on load', options);

      _request2.default.getUserInfo().then(function (d) {
        _this2.userInfo = d;

        if (_this2.challengeId) {
          _this2.methods.getChallengePictures();
        } else {
          _this2.methods.getChallengePicturesOfMy();
        }
      });
    }
  }]);
  return Pictures;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Pictures , 'pages/pictures'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBpY3R1cmVzLmpzIl0sIm5hbWVzIjpbIlBpY3R1cmVzIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiZGF0YSIsInN0YXR1cyIsInBpY3R1cmVMaXN0IiwiY29tcHV0ZWQiLCJtZXRob2RzIiwicHJldmlld0ltYWdlIiwiaXRlbUlkIiwiY3VycmVudCIsInVybHMiLCJmb3JFYWNoIiwibGlzdCIsIml0ZW1zIiwiaXRlbSIsImlkIiwibmF0dXJhbCIsInB1c2giLCJzZWxlY3RJdGVtIiwiY29uc29sZSIsImxvZyIsImNoZWNrZWQiLCIkYXBwbHkiLCJzYXZlVG9QaG90byIsInNlbGVjdGVkIiwibGVuZ3RoIiwiJGludm9rZSIsInRpdGxlIiwic2V0U3RhdHVzIiwiZ2V0Q2hhbGxlbmdlUGljdHVyZXMiLCJnZXQiLCJwaWN0dXJlc0RhdGEiLCJjaGFsbGVuZ2VJZCIsInRoZW4iLCJyZXN1bHQiLCJnZXRDaGFsbGVuZ2VQaWN0dXJlc09mTXkiLCJldmVudHMiLCJvcHRpb25zIiwiZ2V0VXNlckluZm8iLCJ1c2VySW5mbyIsImQiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7SUFFcUJBLFE7Ozs7Ozs7Ozs7Ozs7O2dOQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBSVZDLE0sR0FBUyxFQUFDLGFBQVksRUFBQyxZQUFXLEVBQVosRUFBYixFLFFBQ1pDLE8sR0FBVSxFLFFBQ1RDLFUsR0FBYTtBQUNSLHFDQURRO0FBRVI7QUFGUSxLLFFBS1ZDLEksR0FBTztBQUNMQyxjQUFRLE1BREg7QUFFTEMsbUJBQWE7QUFGUixLLFFBS1BDLFEsR0FBVyxFLFFBSVhDLE8sR0FBVTtBQUNSQyxvQkFBYyxzQkFBQ0MsTUFBRCxFQUFZO0FBQ3hCLFlBQUlDLFVBQVUsSUFB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QUF0QjdDLFEiLCJmaWxlIjoicGljdHVyZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG4gIGltcG9ydCBudWxsTGlzdCBmcm9tICcuLi9jb21wb25lbnRzL251bGxMaXN0JztcbiAgaW1wb3J0IHJlcXVlc3QgZnJvbSAnLi4vc2VydmljZXMvcmVxdWVzdC5qcyc7XG4gIGltcG9ydCB1cmxzIGZyb20gJy4uL3NlcnZpY2VzL3VybHMuanMnO1xuICBpbXBvcnQgVG9hc3QgZnJvbSAnd2VweS1jb20tdG9hc3QnXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGljdHVyZXMgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfloZTmi5MnLFxuICAgIH1cblxuICAgJHByb3BzID0ge1wibnVsbC1saXN0XCI6e1wieG1sbnM6d3hcIjpcIlwifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICAnbnVsbC1saXN0JzogbnVsbExpc3QsXG4gICAgICAndG9hc3QnOiBUb2FzdCxcbiAgICB9XG5cbiAgICBkYXRhID0ge1xuICAgICAgc3RhdHVzOiAndmlldycsXG4gICAgICBwaWN0dXJlTGlzdDogW10sXG4gICAgfVxuXG4gICAgY29tcHV0ZWQgPSB7XG5cbiAgICB9XG5cbiAgICBtZXRob2RzID0ge1xuICAgICAgcHJldmlld0ltYWdlOiAoaXRlbUlkKSA9PiB7XG4gICAgICAgIGxldCBjdXJyZW50ID0gbnVsbDtcbiAgICAgICAgY29uc3QgdXJscyA9IFtdO1xuXG4gICAgICAgIHRoaXMucGljdHVyZUxpc3QuZm9yRWFjaChsaXN0ID0+IHtcbiAgICAgICAgICBsaXN0Lml0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICBpZiAoaXRlbS5pZCA9PT0gaXRlbUlkKSB7XG4gICAgICAgICAgICAgIGN1cnJlbnQgPSBpdGVtLm5hdHVyYWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB1cmxzLnB1c2goaXRlbS5uYXR1cmFsKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgd2VweS5wcmV2aWV3SW1hZ2Uoe1xuICAgICAgICAgIGN1cnJlbnQsIC8vIOW9k+WJjeaYvuekuuWbvueJh+eahGh0dHDpk77mjqVcbiAgICAgICAgICB1cmxzLCAvLyDpnIDopoHpooTop4jnmoTlm77niYdodHRw6ZO+5o6l5YiX6KGoXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgc2VsZWN0SXRlbTogKGl0ZW1JZCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5zdGF0dXMgIT09ICdzYXZlJykge1xuICAgICAgICAgIHRoaXMubWV0aG9kcy5wcmV2aWV3SW1hZ2UoaXRlbUlkKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5waWN0dXJlTGlzdC5mb3JFYWNoKGxpc3QgPT4ge1xuICAgICAgICAgIGxpc3QuaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGl0ZW0uaWQsIGl0ZW1JZCk7XG4gICAgICAgICAgICBpZiAoaXRlbS5pZCA9PT0gaXRlbUlkKSB7XG4gICAgICAgICAgICAgIGl0ZW0uY2hlY2tlZCA9ICFpdGVtLmNoZWNrZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgfSxcbiAgICAgIHNhdmVUb1Bob3RvOiAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkID0gW107XG5cbiAgICAgICAgdGhpcy5waWN0dXJlTGlzdC5mb3JFYWNoKGxpc3QgPT4ge1xuICAgICAgICAgIGxpc3QuaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgIGlmIChpdGVtLmNoZWNrZWQgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgc2VsZWN0ZWQucHVzaChpdGVtLm5hdHVyYWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIXNlbGVjdGVkLmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMuJGludm9rZSgndG9hc3QnLCAnc2hvdycsIHtcbiAgICAgICAgICAgIHRpdGxlOiAn6K+35Yu+6YCJ5Zu+54mHJ1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSxcbiAgICAgIHNldFN0YXR1czogKHN0YXR1cykgPT4ge1xuICAgICAgICB0aGlzLnN0YXR1cyA9IHN0YXR1cztcbiAgICAgIH0sXG4gICAgICBnZXRDaGFsbGVuZ2VQaWN0dXJlczogKCkgPT4ge1xuICAgICAgICByZXF1ZXN0LmdldCh1cmxzLnBpY3R1cmVzRGF0YSwge1xuICAgICAgICAgIGNoYWxsZW5nZUlkOiB0aGlzLmNoYWxsZW5nZUlkLFxuICAgICAgICB9KS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgIHRoaXMucGljdHVyZUxpc3QgPSBbe1xuICAgICAgICAgICAgdGl0bGU6IGZhbHNlLFxuICAgICAgICAgICAgaXRlbXM6IGRhdGEucmVzdWx0Lmxpc3QsXG4gICAgICAgICAgfV07XG4gICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgZ2V0Q2hhbGxlbmdlUGljdHVyZXNPZk15OiAoKSA9PiB7XG5cbiAgICAgIH1cbiAgICB9XG5cbiAgICBldmVudHMgPSB7XG5cbiAgICB9XG5cbiAgICBvblNob3coKSB7XG5cbiAgICB9XG5cbiAgICBvbkxvYWQob3B0aW9ucykge1xuICAgICAgdGhpcy5jaGFsbGVuZ2VJZCA9IG9wdGlvbnMuaWQgfHwgJzEyMzEyMyc7XG4gICAgICBjb25zb2xlLmxvZygncGljdHVyZXMgb24gbG9hZCcsIG9wdGlvbnMpO1xuXG4gICAgICByZXF1ZXN0LmdldFVzZXJJbmZvKCkudGhlbihkID0+IHtcbiAgICAgICAgdGhpcy51c2VySW5mbyA9IGQ7XG5cbiAgICAgICAgaWYgKHRoaXMuY2hhbGxlbmdlSWQpIHtcbiAgICAgICAgICB0aGlzLm1ldGhvZHMuZ2V0Q2hhbGxlbmdlUGljdHVyZXMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLm1ldGhvZHMuZ2V0Q2hhbGxlbmdlUGljdHVyZXNPZk15KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4iXX0=