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
      pictureList: [],
      showDownloadModal: false
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
            title: '请勾选照片'
          });
          return false;
        }

        _this.methods.doDownload(selected);

        return true;
      },
      unselectedAll: function unselectedAll() {
        _this.pictureList.forEach(function (list) {
          list.items.forEach(function (item) {
            item.checked = false;
          });
        });
        _this.$apply();
      },
      cancelDownload: function cancelDownload() {
        _wepy2.default.showModal({
          content: '\u6210\u529F\u4E0B\u8F7D' + _this.downloadCount + '\u5F20\u56FE\u7247',
          showCancel: false,
          confirmText: '知道了'
        });
        _this.methods.unselectedAll();
        _this.showDownloadModal = false;
        _this.$apply();
      },
      doDownload: function doDownload(urls) {
        _this.downloadLen = urls.length;
        _this.downloadCount = 0;
        _this.showDownloadModal = true;
        _this.$apply();

        eachUrls.call(_this);

        function eachUrls() {
          var _this2 = this;

          download(urls[this.downloadCount], function (isSuccess, res) {
            if (isSuccess === true && _this2.showDownloadModal === true) {
              _this2.downloadCount++;
              if (_this2.downloadCount >= _this2.downloadLen) {
                _this2.methods.unselectedAll();
                _this2.showDownloadModal = false;
                _this2.$apply();
                _wepy2.default.showModal({
                  content: '\u6210\u529F\u4E0B\u8F7D' + _this2.downloadCount + '\u5F20\u56FE\u7247',
                  showCancel: false,
                  confirmText: '知道了'
                });
                return;
              }
              _this2.$apply();
              eachUrls.call(_this2);
            } else {
              _wepy2.default.showModal({
                content: _this2.methods.convertError(res),
                showCancel: false,
                confirmText: '知道了'
              });
              _this2.methods.unselectedAll();
              _this2.showDownloadModal = false;
              _this2.$apply();
            }
          });
        }

        function download(url, callback) {
          _wepy2.default.downloadFile({
            url: url,
            success: function success(res) {
              var filePath = res.tempFilePath;

              _wepy2.default.saveImageToPhotosAlbum({
                filePath: filePath,
                success: function success(res) {
                  callback(true);
                },
                fail: function fail(res) {
                  callback(false, res);
                },
                complete: function complete() {}
              });
            },
            fail: function fail(res) {
              callback(false, res);
            },
            complete: function complete() {}
          });
        }
      },
      convertError: function convertError(err) {
        if (/cancel/g.test(err.errMsg)) {
          return '取消下载';
        }
        return err.errMsg;
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
      var _this3 = this;

      this.challengeId = options.id || '123123';
      console.log('pictures on load', options);

      _request2.default.getUserInfo().then(function (d) {
        _this3.userInfo = d;

        if (_this3.challengeId) {
          _this3.methods.getChallengePictures();
        } else {
          _this3.methods.getChallengePicturesOfMy();
        }
      });
    }
  }]);
  return Pictures;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Pictures , 'pages/pictures'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBpY3R1cmVzLmpzIl0sIm5hbWVzIjpbIlBpY3R1cmVzIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiZGF0YSIsInN0YXR1cyIsInBpY3R1cmVMaXN0Iiwic2hvd0Rvd25sb2FkTW9kYWwiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJwcmV2aWV3SW1hZ2UiLCJpdGVtSWQiLCJjdXJyZW50IiwidXJscyIsImZvckVhY2giLCJsaXN0IiwiaXRlbXMiLCJpdGVtIiwiaWQiLCJuYXR1cmFsIiwicHVzaCIsInNlbGVjdEl0ZW0iLCJjaGVja2VkIiwiJGFwcGx5Iiwic2F2ZVRvUGhvdG8iLCJzZWxlY3RlZCIsImxlbmd0aCIsIiRpbnZva2UiLCJ0aXRsZSIsImRvRG93bmxvYWQiLCJ1bnNlbGVjdGVkQWxsIiwiY2FuY2VsRG93bmxvYWQiLCJzaG93TW9kYWwiLCJjb250ZW50IiwiZG93bmxvYWRDb3VudCIsInNob3dDYW5jZWwiLCJjb25maXJtVGV4dCIsImRvd25sb2FkTGVuIiwiZWFjaFVybHMiLCJjYWxsIiwiZG93bmxvYWQiLCJpc1N1Y2Nlc3MiLCJyZXMiLCJjb252ZXJ0RXJyb3IiLCJ1cmwiLCJjYWxsYmFjayIsImRvd25sb2FkRmlsZSIsInN1Y2Nlc3MiLCJmaWxlUGF0aCIsInRlbXBGaWxlUGF0aCIsInNhdmVJbWFnZVRvUGhvdG9zQWxidW0iLCJmYWlsIiwiY29tcGxldGUiLCJlcnIiLCJ0ZXN0IiwiZXJyTXNnIiwic2V0U3RhdHVzIiwiZ2V0Q2hhbGxlbmdlUGljdHVyZXMiLCJnZXQiLCJwaWN0dXJlc0RhdGEiLCJjaGFsbGVuZ2VJZCIsInRoZW4iLCJyZXN1bHQiLCJnZXRDaGFsbGVuZ2VQaWN0dXJlc09mTXkiLCJldmVudHMiLCJvcHRpb25zIiwiY29uc29sZSIsImxvZyIsImdldFVzZXJJbmZvIiwidXNlckluZm8iLCJkIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7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OUpPO0FBK0pSd0MsZ0NBQTBCLG9DQUFNLENBRS9CO0FBaktPLEssUUFvS1ZDLE0sR0FBUyxFOzs7Ozs2QkFJQSxDQUVSOzs7MkJBRU1DLE8sRUFBUztBQUFBOztBQUNkLFdBQUtMLFdBQUwsR0FBbUJLLFFBQVEvQyxFQUFSLElBQWMsUUFBakM7QUFDQWdELGNBQVFDLEdBQVIsQ0FBWSxrQkFBWixFQUFnQ0YsT0FBaEM7O0FBRUEsd0JBQVFHLFdBQVIsR0FBc0JQLElBQXRCLENBQTJCLGFBQUs7QUFDOUIsZUFBS1EsUUFBTCxHQUFnQkMsQ0FBaEI7O0FBRUEsWUFBSSxPQUFLVixXQUFULEVBQXNCO0FBQ3BCLGlCQUFLbkQsT0FBTCxDQUFhZ0Qsb0JBQWI7QUFDRCxTQUZELE1BRU87QUFDTCxpQkFBS2hELE9BQUwsQ0FBYXNELHdCQUFiO0FBQ0Q7QUFDRixPQVJEO0FBU0Q7OztFQS9NbUMsZUFBS1EsSTs7a0JBQXRCekUsUSIsImZpbGUiOiJwaWN0dXJlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbiAgaW1wb3J0IG51bGxMaXN0IGZyb20gJy4uL2NvbXBvbmVudHMvbnVsbExpc3QnO1xuICBpbXBvcnQgcmVxdWVzdCBmcm9tICcuLi9zZXJ2aWNlcy9yZXF1ZXN0LmpzJztcbiAgaW1wb3J0IHVybHMgZnJvbSAnLi4vc2VydmljZXMvdXJscy5qcyc7XG4gIGltcG9ydCBUb2FzdCBmcm9tICd3ZXB5LWNvbS10b2FzdCc7XG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGljdHVyZXMgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfloZTmi5MnLFxuICAgIH1cblxuICAgJHByb3BzID0ge1wibnVsbC1saXN0XCI6e1wieG1sbnM6d3hcIjpcIlwifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICAnbnVsbC1saXN0JzogbnVsbExpc3QsXG4gICAgICAndG9hc3QnOiBUb2FzdCxcbiAgICB9XG5cbiAgICBkYXRhID0ge1xuICAgICAgc3RhdHVzOiAndmlldycsXG4gICAgICBwaWN0dXJlTGlzdDogW10sXG4gICAgICBzaG93RG93bmxvYWRNb2RhbDogZmFsc2UsXG4gICAgfVxuXG4gICAgY29tcHV0ZWQgPSB7XG5cbiAgICB9XG5cbiAgICBtZXRob2RzID0ge1xuICAgICAgcHJldmlld0ltYWdlOiAoaXRlbUlkKSA9PiB7XG4gICAgICAgIGxldCBjdXJyZW50ID0gbnVsbDtcbiAgICAgICAgY29uc3QgdXJscyA9IFtdO1xuXG4gICAgICAgIHRoaXMucGljdHVyZUxpc3QuZm9yRWFjaChsaXN0ID0+IHtcbiAgICAgICAgICBsaXN0Lml0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICBpZiAoaXRlbS5pZCA9PT0gaXRlbUlkKSB7XG4gICAgICAgICAgICAgIGN1cnJlbnQgPSBpdGVtLm5hdHVyYWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB1cmxzLnB1c2goaXRlbS5uYXR1cmFsKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgd2VweS5wcmV2aWV3SW1hZ2Uoe1xuICAgICAgICAgIGN1cnJlbnQsIC8vIOW9k+WJjeaYvuekuuWbvueJh+eahGh0dHDpk77mjqVcbiAgICAgICAgICB1cmxzLCAvLyDpnIDopoHpooTop4jnmoTlm77niYdodHRw6ZO+5o6l5YiX6KGoXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgc2VsZWN0SXRlbTogKGl0ZW1JZCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5zdGF0dXMgIT09ICdzYXZlJykge1xuICAgICAgICAgIHRoaXMubWV0aG9kcy5wcmV2aWV3SW1hZ2UoaXRlbUlkKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5waWN0dXJlTGlzdC5mb3JFYWNoKGxpc3QgPT4ge1xuICAgICAgICAgIGxpc3QuaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgIGlmIChpdGVtLmlkID09PSBpdGVtSWQpIHtcbiAgICAgICAgICAgICAgaXRlbS5jaGVja2VkID0gIWl0ZW0uY2hlY2tlZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICB9LFxuICAgICAgc2F2ZVRvUGhvdG86ICgpID0+IHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSBbXTtcblxuICAgICAgICB0aGlzLnBpY3R1cmVMaXN0LmZvckVhY2gobGlzdCA9PiB7XG4gICAgICAgICAgbGlzdC5pdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgaWYgKGl0ZW0uY2hlY2tlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICBzZWxlY3RlZC5wdXNoKGl0ZW0ubmF0dXJhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghc2VsZWN0ZWQubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy4kaW52b2tlKCd0b2FzdCcsICdzaG93Jywge1xuICAgICAgICAgICAgdGl0bGU6ICfor7fli77pgInnhafniYcnXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tZXRob2RzLmRvRG93bmxvYWQoc2VsZWN0ZWQpO1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSxcbiAgICAgIHVuc2VsZWN0ZWRBbGw6ICgpID0+IHtcbiAgICAgICAgdGhpcy5waWN0dXJlTGlzdC5mb3JFYWNoKGxpc3QgPT4ge1xuICAgICAgICAgIGxpc3QuaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgIGl0ZW0uY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgIH0sXG4gICAgICBjYW5jZWxEb3dubG9hZDogKCkgPT4ge1xuICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgY29udGVudDogYOaIkOWKn+S4i+i9vSR7dGhpcy5kb3dubG9hZENvdW50feW8oOWbvueJh2AsXG4gICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXG4gICAgICAgICAgY29uZmlybVRleHQ6ICfnn6XpgZPkuoYnLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5tZXRob2RzLnVuc2VsZWN0ZWRBbGwoKTtcbiAgICAgICAgdGhpcy5zaG93RG93bmxvYWRNb2RhbCA9IGZhbHNlO1xuICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgfSxcbiAgICAgIGRvRG93bmxvYWQ6ICh1cmxzKSA9PiB7XG4gICAgICAgIHRoaXMuZG93bmxvYWRMZW4gPSB1cmxzLmxlbmd0aDtcbiAgICAgICAgdGhpcy5kb3dubG9hZENvdW50ID0gMDtcbiAgICAgICAgdGhpcy5zaG93RG93bmxvYWRNb2RhbCA9IHRydWU7XG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XG5cbiAgICAgICAgZWFjaFVybHMuY2FsbCh0aGlzKTtcblxuICAgICAgICBmdW5jdGlvbiBlYWNoVXJscygpIHtcbiAgICAgICAgICBkb3dubG9hZCh1cmxzW3RoaXMuZG93bmxvYWRDb3VudF0sIChpc1N1Y2Nlc3MsIHJlcykgPT4ge1xuICAgICAgICAgICAgaWYgKGlzU3VjY2VzcyA9PT0gdHJ1ZSAmJiB0aGlzLnNob3dEb3dubG9hZE1vZGFsID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgIHRoaXMuZG93bmxvYWRDb3VudCsrO1xuICAgICAgICAgICAgICBpZiAodGhpcy5kb3dubG9hZENvdW50ID49IHRoaXMuZG93bmxvYWRMZW4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1ldGhvZHMudW5zZWxlY3RlZEFsbCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0Rvd25sb2FkTW9kYWwgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGDmiJDlip/kuIvovb0ke3RoaXMuZG93bmxvYWRDb3VudH3lvKDlm77niYdgLFxuICAgICAgICAgICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICBjb25maXJtVGV4dDogJ+efpemBk+S6hicsXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgZWFjaFVybHMuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICBjb250ZW50OiB0aGlzLm1ldGhvZHMuY29udmVydEVycm9yKHJlcyksXG4gICAgICAgICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXG4gICAgICAgICAgICAgICAgY29uZmlybVRleHQ6ICfnn6XpgZPkuoYnLFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgdGhpcy5tZXRob2RzLnVuc2VsZWN0ZWRBbGwoKTtcbiAgICAgICAgICAgICAgdGhpcy5zaG93RG93bmxvYWRNb2RhbCA9IGZhbHNlO1xuICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gZG93bmxvYWQodXJsLCBjYWxsYmFjaykge1xuICAgICAgICAgIHdlcHkuZG93bmxvYWRGaWxlKHtcbiAgICAgICAgICAgIHVybCxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgZmlsZVBhdGggPSByZXMudGVtcEZpbGVQYXRoO1xuXG4gICAgICAgICAgICAgIHdlcHkuc2F2ZUltYWdlVG9QaG90b3NBbGJ1bSh7XG4gICAgICAgICAgICAgICAgZmlsZVBhdGgsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgY2FsbGJhY2sodHJ1ZSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBmYWlsOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICBjYWxsYmFjayhmYWxzZSwgcmVzKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNvbXBsZXRlOiAoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmFpbDogKHJlcykgPT4ge1xuICAgICAgICAgICAgICBjYWxsYmFjayhmYWxzZSwgcmVzKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb21wbGV0ZTogKCkgPT4ge1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGNvbnZlcnRFcnJvcjogKGVycikgPT4ge1xuICAgICAgICBpZiAoL2NhbmNlbC9nLnRlc3QoZXJyLmVyck1zZykpIHtcbiAgICAgICAgICByZXR1cm4gJ+WPlua2iOS4i+i9vSc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVyci5lcnJNc2c7XG4gICAgICB9LFxuICAgICAgc2V0U3RhdHVzOiAoc3RhdHVzKSA9PiB7XG4gICAgICAgIHRoaXMuc3RhdHVzID0gc3RhdHVzO1xuICAgICAgfSxcbiAgICAgIGdldENoYWxsZW5nZVBpY3R1cmVzOiAoKSA9PiB7XG4gICAgICAgIHJlcXVlc3QuZ2V0KHVybHMucGljdHVyZXNEYXRhLCB7XG4gICAgICAgICAgY2hhbGxlbmdlSWQ6IHRoaXMuY2hhbGxlbmdlSWQsXG4gICAgICAgIH0pLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgdGhpcy5waWN0dXJlTGlzdCA9IFt7XG4gICAgICAgICAgICB0aXRsZTogZmFsc2UsXG4gICAgICAgICAgICBpdGVtczogZGF0YS5yZXN1bHQubGlzdCxcbiAgICAgICAgICB9XTtcbiAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBnZXRDaGFsbGVuZ2VQaWN0dXJlc09mTXk6ICgpID0+IHtcblxuICAgICAgfVxuICAgIH1cblxuICAgIGV2ZW50cyA9IHtcblxuICAgIH1cblxuICAgIG9uU2hvdygpIHtcblxuICAgIH1cblxuICAgIG9uTG9hZChvcHRpb25zKSB7XG4gICAgICB0aGlzLmNoYWxsZW5nZUlkID0gb3B0aW9ucy5pZCB8fCAnMTIzMTIzJztcbiAgICAgIGNvbnNvbGUubG9nKCdwaWN0dXJlcyBvbiBsb2FkJywgb3B0aW9ucyk7XG5cbiAgICAgIHJlcXVlc3QuZ2V0VXNlckluZm8oKS50aGVuKGQgPT4ge1xuICAgICAgICB0aGlzLnVzZXJJbmZvID0gZDtcblxuICAgICAgICBpZiAodGhpcy5jaGFsbGVuZ2VJZCkge1xuICAgICAgICAgIHRoaXMubWV0aG9kcy5nZXRDaGFsbGVuZ2VQaWN0dXJlcygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMubWV0aG9kcy5nZXRDaGFsbGVuZ2VQaWN0dXJlc09mTXkoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiJdfQ==