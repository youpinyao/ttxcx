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

var _page = require('./../services/page.js');

var _page2 = _interopRequireDefault(_page);

var _loading = require('./../services/loading.js');

var _loading2 = _interopRequireDefault(_loading);

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
      navigationBarTitleText: '塔拓',
      enablePullDownRefresh: true
    }, _this.$props = { "null-list": { "xmlns:wx": "" } }, _this.$events = {}, _this.components = {
      'null-list': _nullList2.default,
      'toast': _wepyComToast2.default
    }, _this.data = {
      status: 'view',
      pictureList: [],
      showDownloadModal: false,
      downloadLen: 0,
      downloadCount: 0
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
                confirmText: '知道了',
                success: function success(res) {
                  _wepy2.default.showModal({
                    content: '\u6210\u529F\u4E0B\u8F7D' + _this2.downloadCount + '\u5F20\u56FE\u7247',
                    showCancel: false,
                    confirmText: '知道了'
                  });
                }
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
          _loading2.default.hide();
        });
      },
      doRefresh: function doRefresh() {
        console.log('doRefresh');
        var promise = _this.picturesPage.reset();
        promise && promise.then(function (data) {
          _this.pictureList = data;
          _this.$apply();

          _wepy2.default.stopPullDownRefresh();
          _loading2.default.hide();
        }, function () {
          _wepy2.default.stopPullDownRefresh();
          _loading2.default.hide();
        });
      },
      loadMore: function loadMore() {
        console.log('doInfinite');
        var promise = _this.picturesPage.next();

        if (promise) {
          _loading2.default.show();
        }

        promise && promise.then(function (data) {
          _this.pictureList = data;
          _this.$apply();
          _loading2.default.hide();
        }, function () {
          _loading2.default.hide();
        });
      }
    }, _this.events = {}, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Pictures, [{
    key: 'onPullDownRefresh',
    value: function onPullDownRefresh() {
      this.methods.doRefresh();
    }
  }, {
    key: 'onReachBottom',
    value: function onReachBottom() {
      this.methods.loadMore();
    }
  }, {
    key: 'onShow',
    value: function onShow() {}
  }, {
    key: 'onLoad',
    value: function onLoad(options) {
      var _this3 = this;

      this.challengeId = options.id;
      console.log('pictures on load', options);

      this.picturesPage = _page2.default.Page({
        url: _urls2.default.picturesDataOfMy
      });

      _loading2.default.show();

      _request2.default.getUserInfo().then(function (d) {
        _this3.userInfo = d;

        if (_this3.challengeId) {
          _this3.methods.getChallengePictures();
        } else {
          _this3.methods.doRefresh();
        }
      });
    }
  }]);
  return Pictures;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Pictures , 'pages/pictures'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBpY3R1cmVzLmpzIl0sIm5hbWVzIjpbIlBpY3R1cmVzIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImVuYWJsZVB1bGxEb3duUmVmcmVzaCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiZGF0YSIsInN0YXR1cyIsInBpY3R1cmVMaXN0Iiwic2hvd0Rvd25sb2FkTW9kYWwiLCJkb3dubG9hZExlbiIsImRvd25sb2FkQ291bnQiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJwcmV2aWV3SW1hZ2UiLCJpdGVtSWQiLCJjdXJyZW50IiwidXJscyIsImZvckVhY2giLCJsaXN0IiwiaXRlbXMiLCJpdGVtIiwiaWQiLCJuYXR1cmFsIiwicHVzaCIsInNlbGVjdEl0ZW0iLCJjaGVja2VkIiwiJGFwcGx5Iiwic2F2ZVRvUGhvdG8iLCJzZWxlY3RlZCIsImxlbmd0aCIsIiRpbnZva2UiLCJ0aXRsZSIsImRvRG93bmxvYWQiLCJ1bnNlbGVjdGVkQWxsIiwiY2FuY2VsRG93bmxvYWQiLCJzaG93TW9kYWwiLCJjb250ZW50Iiwic2hvd0NhbmNlbCIsImNvbmZpcm1UZXh0IiwiZWFjaFVybHMiLCJjYWxsIiwiZG93bmxvYWQiLCJpc1N1Y2Nlc3MiLCJyZXMiLCJjb252ZXJ0RXJyb3IiLCJzdWNjZXNzIiwidXJsIiwiY2FsbGJhY2siLCJkb3dubG9hZEZpbGUiLCJmaWxlUGF0aCIsInRlbXBGaWxlUGF0aCIsInNhdmVJbWFnZVRvUGhvdG9zQWxidW0iLCJmYWlsIiwiY29tcGxldGUiLCJlcnIiLCJ0ZXN0IiwiZXJyTXNnIiwic2V0U3RhdHVzIiwiZ2V0Q2hhbGxlbmdlUGljdHVyZXMiLCJnZXQiLCJwaWN0dXJlc0RhdGEiLCJjaGFsbGVuZ2VJZCIsInRoZW4iLCJyZXN1bHQiLCJoaWRlIiwiZG9SZWZyZXNoIiwiY29uc29sZSIsImxvZyIsInByb21pc2UiLCJwaWN0dXJlc1BhZ2UiLCJyZXNldCIsInN0b3BQdWxsRG93blJlZnJlc2giLCJsb2FkTW9yZSIsIm5leHQiLCJzaG93IiwiZXZlbnRzIiwib3B0aW9ucyIsIlBhZ2UiLCJwaWN0dXJlc0RhdGFPZk15IiwiZ2V0VXNlckluZm8iLCJ1c2VySW5mbyIsImQiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0lBRXFCQSxROzs7Ozs7Ozs7Ozs7OztnTkFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0IsSUFEakI7QUFFUEMsNkJBQXVCO0FBRmhCLEssUUFhVkMsTSxHQUFTLEVBQUMsYUFBWSxFQUFDLFlBQVcsRUFBWixFQUFiLEUsUUFDWkMsTyxHQUFVLEUsUUFDVEMsVSxHQUFhO0FBQ1IscUNBRFE7QUFFUjtBQUZRLEssUUFLVkMsSSxHQUFPO0FBQ0xDLGNBQVEsTUFESDtBQUVMQyxtQkFBYSxFQUZSO0FBR0xDLHlCQUFtQixLQUhkO0FBSUxDLG1CQUFhLENBSlI7QUFLTEMscUJBQWU7QUFMVixLLFFBUVBDLFEsR0FBVyxFLFFBSVhDLE8sR0FBVTtBQUNSQyxvQkFBYyxzQkFBQ0MsTUFBRCxFQUFZO0FBQ3hCLFlBQUlDLFVBQVUsSUFBZDtBQUNBLFlBQU1DLE9BQU8sRUFBYjs7QUFFQSxjQUFLVCxXQUFMLENBQWlCVSxPQUFqQixDQUF5QixnQkFBUTtBQUMvQkMsZUFBS0MsS0FBTCxDQUFXRixPQUFYLENBQW1CLGdCQUFRO0FBQ3pCLGdCQUFJRyxLQUFLQyxFQUFMLEtBQVlQLE1BQWhCLEVBQXdCO0FBQ3RCQyx3QkFBVUssS0FBS0UsT0FBZjtBQUNEO0FBQ0ROLGlCQUFLTyxJQUFMLENBQVVILEtBQUtFLE9BQWY7QUFDRCxXQUxEO0FBTUQsU0FQRDs7QUFTQSx1QkFBS1QsWUFBTCxDQUFrQjtBQUNoQkUsMEJBRGdCLEVBQ1A7QUFDVEMsb0JBRmdCLENBRVY7QUFGVSxTQUFsQjtBQUlELE9BbEJPO0FBbUJSUSxrQkFBWSxvQkFBQ1YsTUFBRCxFQUFZO0FBQ3RC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UjtBQUNELFNBSlUsRUFJUixZQUFNO0FBQ1AsNEJBQVFBLElBQVI7QUFDRCxTQU5VLENBQVg7QUFPRDtBQXBNTyxLLFFBdU1WVyxNLEdBQVMsRTs7Ozs7d0NBbE9XO0FBQ2xCLFdBQUsvRCxPQUFMLENBQWFxRCxTQUFiO0FBQ0Q7OztvQ0FFZTtBQUNkLFdBQUtyRCxPQUFMLENBQWE0RCxRQUFiO0FBQ0Q7Ozs2QkFnT1EsQ0FFUjs7OzJCQUVNSSxPLEVBQVM7QUFBQTs7QUFDZCxXQUFLZixXQUFMLEdBQW1CZSxRQUFRdkQsRUFBM0I7QUFDQTZDLGNBQVFDLEdBQVIsQ0FBWSxrQkFBWixFQUFnQ1MsT0FBaEM7O0FBRUEsV0FBS1AsWUFBTCxHQUFvQixlQUFZUSxJQUFaLENBQWlCO0FBQ25DL0IsYUFBSyxlQUFLZ0M7QUFEeUIsT0FBakIsQ0FBcEI7O0FBSUEsd0JBQVFKLElBQVI7O0FBRUEsd0JBQVFLLFdBQVIsR0FBc0JqQixJQUF0QixDQUEyQixhQUFLO0FBQzlCLGVBQUtrQixRQUFMLEdBQWdCQyxDQUFoQjs7QUFFQSxZQUFJLE9BQUtwQixXQUFULEVBQXNCO0FBQ3BCLGlCQUFLakQsT0FBTCxDQUFhOEMsb0JBQWI7QUFDRCxTQUZELE1BRU87QUFDTCxpQkFBSzlDLE9BQUwsQ0FBYXFELFNBQWI7QUFDRDtBQUNGLE9BUkQ7QUFTRDs7O0VBblFtQyxlQUFLaUIsSTs7a0JBQXRCcEYsUSIsImZpbGUiOiJwaWN0dXJlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbiAgaW1wb3J0IG51bGxMaXN0IGZyb20gJy4uL2NvbXBvbmVudHMvbnVsbExpc3QnO1xuICBpbXBvcnQgcmVxdWVzdCBmcm9tICcuLi9zZXJ2aWNlcy9yZXF1ZXN0LmpzJztcbiAgaW1wb3J0IHVybHMgZnJvbSAnLi4vc2VydmljZXMvdXJscy5qcyc7XG4gIGltcG9ydCBwYWdlU2VydmljZSBmcm9tICcuLi9zZXJ2aWNlcy9wYWdlLmpzJztcbiAgaW1wb3J0IGxvYWRpbmcgZnJvbSAnLi4vc2VydmljZXMvbG9hZGluZy5qcyc7XG4gIGltcG9ydCBUb2FzdCBmcm9tICd3ZXB5LWNvbS10b2FzdCc7XG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGljdHVyZXMgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfloZTmi5MnLFxuICAgICAgZW5hYmxlUHVsbERvd25SZWZyZXNoOiB0cnVlLFxuICAgIH1cblxuICAgIG9uUHVsbERvd25SZWZyZXNoKCkge1xuICAgICAgdGhpcy5tZXRob2RzLmRvUmVmcmVzaCgpO1xuICAgIH1cblxuICAgIG9uUmVhY2hCb3R0b20oKSB7XG4gICAgICB0aGlzLm1ldGhvZHMubG9hZE1vcmUoKTtcbiAgICB9XG5cbiAgICRwcm9wcyA9IHtcIm51bGwtbGlzdFwiOntcInhtbG5zOnd4XCI6XCJcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgJ251bGwtbGlzdCc6IG51bGxMaXN0LFxuICAgICAgJ3RvYXN0JzogVG9hc3QsXG4gICAgfVxuXG4gICAgZGF0YSA9IHtcbiAgICAgIHN0YXR1czogJ3ZpZXcnLFxuICAgICAgcGljdHVyZUxpc3Q6IFtdLFxuICAgICAgc2hvd0Rvd25sb2FkTW9kYWw6IGZhbHNlLFxuICAgICAgZG93bmxvYWRMZW46IDAsXG4gICAgICBkb3dubG9hZENvdW50OiAwLFxuICAgIH1cblxuICAgIGNvbXB1dGVkID0ge1xuXG4gICAgfVxuXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHByZXZpZXdJbWFnZTogKGl0ZW1JZCkgPT4ge1xuICAgICAgICBsZXQgY3VycmVudCA9IG51bGw7XG4gICAgICAgIGNvbnN0IHVybHMgPSBbXTtcblxuICAgICAgICB0aGlzLnBpY3R1cmVMaXN0LmZvckVhY2gobGlzdCA9PiB7XG4gICAgICAgICAgbGlzdC5pdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgaWYgKGl0ZW0uaWQgPT09IGl0ZW1JZCkge1xuICAgICAgICAgICAgICBjdXJyZW50ID0gaXRlbS5uYXR1cmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdXJscy5wdXNoKGl0ZW0ubmF0dXJhbCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHdlcHkucHJldmlld0ltYWdlKHtcbiAgICAgICAgICBjdXJyZW50LCAvLyDlvZPliY3mmL7npLrlm77niYfnmoRodHRw6ZO+5o6lXG4gICAgICAgICAgdXJscywgLy8g6ZyA6KaB6aKE6KeI55qE5Zu+54mHaHR0cOmTvuaOpeWIl+ihqFxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIHNlbGVjdEl0ZW06IChpdGVtSWQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdHVzICE9PSAnc2F2ZScpIHtcbiAgICAgICAgICB0aGlzLm1ldGhvZHMucHJldmlld0ltYWdlKGl0ZW1JZCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGljdHVyZUxpc3QuZm9yRWFjaChsaXN0ID0+IHtcbiAgICAgICAgICBsaXN0Lml0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICBpZiAoaXRlbS5pZCA9PT0gaXRlbUlkKSB7XG4gICAgICAgICAgICAgIGl0ZW0uY2hlY2tlZCA9ICFpdGVtLmNoZWNrZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgfSxcbiAgICAgIHNhdmVUb1Bob3RvOiAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkID0gW107XG5cbiAgICAgICAgdGhpcy5waWN0dXJlTGlzdC5mb3JFYWNoKGxpc3QgPT4ge1xuICAgICAgICAgIGxpc3QuaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgIGlmIChpdGVtLmNoZWNrZWQgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgc2VsZWN0ZWQucHVzaChpdGVtLm5hdHVyYWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIXNlbGVjdGVkLmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMuJGludm9rZSgndG9hc3QnLCAnc2hvdycsIHtcbiAgICAgICAgICAgIHRpdGxlOiAn6K+35Yu+6YCJ54Wn54mHJ1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubWV0aG9kcy5kb0Rvd25sb2FkKHNlbGVjdGVkKTtcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0sXG4gICAgICB1bnNlbGVjdGVkQWxsOiAoKSA9PiB7XG4gICAgICAgIHRoaXMucGljdHVyZUxpc3QuZm9yRWFjaChsaXN0ID0+IHtcbiAgICAgICAgICBsaXN0Lml0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICBpdGVtLmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICB9LFxuICAgICAgY2FuY2VsRG93bmxvYWQ6ICgpID0+IHtcbiAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgIGNvbnRlbnQ6IGDmiJDlip/kuIvovb0ke3RoaXMuZG93bmxvYWRDb3VudH3lvKDlm77niYdgLFxuICAgICAgICAgIHNob3dDYW5jZWw6IGZhbHNlLFxuICAgICAgICAgIGNvbmZpcm1UZXh0OiAn55+l6YGT5LqGJyxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMubWV0aG9kcy51bnNlbGVjdGVkQWxsKCk7XG4gICAgICAgIHRoaXMuc2hvd0Rvd25sb2FkTW9kYWwgPSBmYWxzZTtcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgIH0sXG4gICAgICBkb0Rvd25sb2FkOiAodXJscykgPT4ge1xuICAgICAgICB0aGlzLmRvd25sb2FkTGVuID0gdXJscy5sZW5ndGg7XG4gICAgICAgIHRoaXMuZG93bmxvYWRDb3VudCA9IDA7XG4gICAgICAgIHRoaXMuc2hvd0Rvd25sb2FkTW9kYWwgPSB0cnVlO1xuICAgICAgICB0aGlzLiRhcHBseSgpO1xuXG4gICAgICAgIGVhY2hVcmxzLmNhbGwodGhpcyk7XG5cbiAgICAgICAgZnVuY3Rpb24gZWFjaFVybHMoKSB7XG4gICAgICAgICAgZG93bmxvYWQodXJsc1t0aGlzLmRvd25sb2FkQ291bnRdLCAoaXNTdWNjZXNzLCByZXMpID0+IHtcbiAgICAgICAgICAgIGlmIChpc1N1Y2Nlc3MgPT09IHRydWUgJiYgdGhpcy5zaG93RG93bmxvYWRNb2RhbCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICB0aGlzLmRvd25sb2FkQ291bnQrKztcbiAgICAgICAgICAgICAgaWYgKHRoaXMuZG93bmxvYWRDb3VudCA+PSB0aGlzLmRvd25sb2FkTGVuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tZXRob2RzLnVuc2VsZWN0ZWRBbGwoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dEb3dubG9hZE1vZGFsID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgICBjb250ZW50OiBg5oiQ5Yqf5LiL6L29JHt0aGlzLmRvd25sb2FkQ291bnR95byg5Zu+54mHYCxcbiAgICAgICAgICAgICAgICAgIHNob3dDYW5jZWw6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgY29uZmlybVRleHQ6ICfnn6XpgZPkuoYnLFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgICAgICAgIGVhY2hVcmxzLmNhbGwodGhpcyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgY29udGVudDogdGhpcy5tZXRob2RzLmNvbnZlcnRFcnJvcihyZXMpLFxuICAgICAgICAgICAgICAgIHNob3dDYW5jZWw6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNvbmZpcm1UZXh0OiAn55+l6YGT5LqGJyxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGDmiJDlip/kuIvovb0ke3RoaXMuZG93bmxvYWRDb3VudH3lvKDlm77niYdgLFxuICAgICAgICAgICAgICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgY29uZmlybVRleHQ6ICfnn6XpgZPkuoYnLFxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHRoaXMubWV0aG9kcy51bnNlbGVjdGVkQWxsKCk7XG4gICAgICAgICAgICAgIHRoaXMuc2hvd0Rvd25sb2FkTW9kYWwgPSBmYWxzZTtcbiAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGRvd25sb2FkKHVybCwgY2FsbGJhY2spIHtcbiAgICAgICAgICB3ZXB5LmRvd25sb2FkRmlsZSh7XG4gICAgICAgICAgICB1cmwsXG4gICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGZpbGVQYXRoID0gcmVzLnRlbXBGaWxlUGF0aDtcblxuICAgICAgICAgICAgICB3ZXB5LnNhdmVJbWFnZVRvUGhvdG9zQWxidW0oe1xuICAgICAgICAgICAgICAgIGZpbGVQYXRoLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKHRydWUpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZmFpbDogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgY2FsbGJhY2soZmFsc2UsIHJlcyk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjb21wbGV0ZTogKCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZhaWw6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgY2FsbGJhY2soZmFsc2UsIHJlcyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29tcGxldGU6ICgpID0+IHtcblxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjb252ZXJ0RXJyb3I6IChlcnIpID0+IHtcbiAgICAgICAgaWYgKC9jYW5jZWwvZy50ZXN0KGVyci5lcnJNc2cpKSB7XG4gICAgICAgICAgcmV0dXJuICflj5bmtojkuIvovb0nO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlcnIuZXJyTXNnO1xuICAgICAgfSxcbiAgICAgIHNldFN0YXR1czogKHN0YXR1cykgPT4ge1xuICAgICAgICB0aGlzLnN0YXR1cyA9IHN0YXR1cztcbiAgICAgIH0sXG4gICAgICBnZXRDaGFsbGVuZ2VQaWN0dXJlczogKCkgPT4ge1xuICAgICAgICByZXF1ZXN0LmdldCh1cmxzLnBpY3R1cmVzRGF0YSwge1xuICAgICAgICAgIGNoYWxsZW5nZUlkOiB0aGlzLmNoYWxsZW5nZUlkLFxuICAgICAgICB9KS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgIHRoaXMucGljdHVyZUxpc3QgPSBbe1xuICAgICAgICAgICAgdGl0bGU6IGZhbHNlLFxuICAgICAgICAgICAgaXRlbXM6IGRhdGEucmVzdWx0Lmxpc3QsXG4gICAgICAgICAgfV07XG4gICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgICBsb2FkaW5nLmhpZGUoKTtcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgZG9SZWZyZXNoOiAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdkb1JlZnJlc2gnKTtcbiAgICAgICAgdmFyIHByb21pc2UgPSB0aGlzLnBpY3R1cmVzUGFnZS5yZXNldCgpO1xuICAgICAgICBwcm9taXNlICYmIHByb21pc2UudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgIHRoaXMucGljdHVyZUxpc3QgPSBkYXRhO1xuICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG5cbiAgICAgICAgICB3ZXB5LnN0b3BQdWxsRG93blJlZnJlc2goKTtcbiAgICAgICAgICBsb2FkaW5nLmhpZGUoKTtcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgIHdlcHkuc3RvcFB1bGxEb3duUmVmcmVzaCgpO1xuICAgICAgICAgIGxvYWRpbmcuaGlkZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBsb2FkTW9yZTogKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnZG9JbmZpbml0ZScpO1xuICAgICAgICB2YXIgcHJvbWlzZSA9IHRoaXMucGljdHVyZXNQYWdlLm5leHQoKTtcblxuICAgICAgICBpZiAocHJvbWlzZSkge1xuICAgICAgICAgIGxvYWRpbmcuc2hvdygpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJvbWlzZSAmJiBwcm9taXNlLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICB0aGlzLnBpY3R1cmVMaXN0ID0gZGF0YTtcbiAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICAgIGxvYWRpbmcuaGlkZSgpO1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgbG9hZGluZy5oaWRlKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGV2ZW50cyA9IHtcblxuICAgIH1cblxuICAgIG9uU2hvdygpIHtcblxuICAgIH1cblxuICAgIG9uTG9hZChvcHRpb25zKSB7XG4gICAgICB0aGlzLmNoYWxsZW5nZUlkID0gb3B0aW9ucy5pZDtcbiAgICAgIGNvbnNvbGUubG9nKCdwaWN0dXJlcyBvbiBsb2FkJywgb3B0aW9ucyk7XG5cbiAgICAgIHRoaXMucGljdHVyZXNQYWdlID0gcGFnZVNlcnZpY2UuUGFnZSh7XG4gICAgICAgIHVybDogdXJscy5waWN0dXJlc0RhdGFPZk15XG4gICAgICB9KTtcblxuICAgICAgbG9hZGluZy5zaG93KCk7XG5cbiAgICAgIHJlcXVlc3QuZ2V0VXNlckluZm8oKS50aGVuKGQgPT4ge1xuICAgICAgICB0aGlzLnVzZXJJbmZvID0gZDtcblxuICAgICAgICBpZiAodGhpcy5jaGFsbGVuZ2VJZCkge1xuICAgICAgICAgIHRoaXMubWV0aG9kcy5nZXRDaGFsbGVuZ2VQaWN0dXJlcygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMubWV0aG9kcy5kb1JlZnJlc2goKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiJdfQ==