'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _urls = require('./urls.js');

var _urls2 = _interopRequireDefault(_urls);

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _request = require('./request.js');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function check() {
  _request2.default.get(_urls2.default.questionCheck).then(function (data) {
    if (data.hasQuestion) {
      _wepy2.default.navigateTo({
        url: '/pages/question?id=' + data.questionId
      });
    }
  });
}

function quit(data) {
  return _request2.default.post(_urls2.default.questionQuit, data);
}

function start(data) {
  return _request2.default.post(_urls2.default.questionStart, data);
}

function list(data) {
  return _request2.default.get(_urls2.default.questionList, data);
}

function upload(data) {
  return _request2.default.post(_urls2.default.questionUpload, data);
}

exports.default = {
  check: check,
  quit: quit,
  start: start,
  list: list,
  upload: upload
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInF1ZXN0aW9uLmpzIl0sIm5hbWVzIjpbImNoZWNrIiwiZ2V0IiwicXVlc3Rpb25DaGVjayIsInRoZW4iLCJkYXRhIiwiaGFzUXVlc3Rpb24iLCJuYXZpZ2F0ZVRvIiwidXJsIiwicXVlc3Rpb25JZCIsInF1aXQiLCJwb3N0IiwicXVlc3Rpb25RdWl0Iiwic3RhcnQiLCJxdWVzdGlvblN0YXJ0IiwibGlzdCIsInF1ZXN0aW9uTGlzdCIsInVwbG9hZCIsInF1ZXN0aW9uVXBsb2FkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLFNBQVNBLEtBQVQsR0FBaUI7QUFDZixvQkFBUUMsR0FBUixDQUFZLGVBQUtDLGFBQWpCLEVBQWdDQyxJQUFoQyxDQUFxQyxnQkFBUTtBQUMzQyxRQUFJQyxLQUFLQyxXQUFULEVBQXNCO0FBQ3BCLHFCQUFLQyxVQUFMLENBQWdCO0FBQ2RDLHFDQUEyQkgsS0FBS0k7QUFEbEIsT0FBaEI7QUFHRDtBQUNGLEdBTkQ7QUFPRDs7QUFFRCxTQUFTQyxJQUFULENBQWNMLElBQWQsRUFBb0I7QUFDbEIsU0FBTyxrQkFBUU0sSUFBUixDQUFhLGVBQUtDLFlBQWxCLEVBQWdDUCxJQUFoQyxDQUFQO0FBQ0Q7O0FBRUQsU0FBU1EsS0FBVCxDQUFlUixJQUFmLEVBQXFCO0FBQ25CLFNBQU8sa0JBQVFNLElBQVIsQ0FBYSxlQUFLRyxhQUFsQixFQUFpQ1QsSUFBakMsQ0FBUDtBQUNEOztBQUVELFNBQVNVLElBQVQsQ0FBY1YsSUFBZCxFQUFvQjtBQUNsQixTQUFPLGtCQUFRSCxHQUFSLENBQVksZUFBS2MsWUFBakIsRUFBK0JYLElBQS9CLENBQVA7QUFDRDs7QUFFRCxTQUFTWSxNQUFULENBQWdCWixJQUFoQixFQUFzQjtBQUNwQixTQUFPLGtCQUFRTSxJQUFSLENBQWEsZUFBS08sY0FBbEIsRUFBa0NiLElBQWxDLENBQVA7QUFDRDs7a0JBRWM7QUFDYkosY0FEYTtBQUViUyxZQUZhO0FBR2JHLGNBSGE7QUFJYkUsWUFKYTtBQUtiRTtBQUxhLEMiLCJmaWxlIjoicXVlc3Rpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdXJscyBmcm9tICcuL3VybHMuanMnO1xuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgcmVxdWVzdCBmcm9tICcuL3JlcXVlc3QuanMnO1xuXG5mdW5jdGlvbiBjaGVjaygpIHtcbiAgcmVxdWVzdC5nZXQodXJscy5xdWVzdGlvbkNoZWNrKS50aGVuKGRhdGEgPT4ge1xuICAgIGlmIChkYXRhLmhhc1F1ZXN0aW9uKSB7XG4gICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICB1cmw6IGAvcGFnZXMvcXVlc3Rpb24/aWQ9JHtkYXRhLnF1ZXN0aW9uSWR9YFxuICAgICAgfSlcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBxdWl0KGRhdGEpIHtcbiAgcmV0dXJuIHJlcXVlc3QucG9zdCh1cmxzLnF1ZXN0aW9uUXVpdCwgZGF0YSk7XG59XG5cbmZ1bmN0aW9uIHN0YXJ0KGRhdGEpIHtcbiAgcmV0dXJuIHJlcXVlc3QucG9zdCh1cmxzLnF1ZXN0aW9uU3RhcnQsIGRhdGEpO1xufVxuXG5mdW5jdGlvbiBsaXN0KGRhdGEpIHtcbiAgcmV0dXJuIHJlcXVlc3QuZ2V0KHVybHMucXVlc3Rpb25MaXN0LCBkYXRhKTtcbn1cblxuZnVuY3Rpb24gdXBsb2FkKGRhdGEpIHtcbiAgcmV0dXJuIHJlcXVlc3QucG9zdCh1cmxzLnF1ZXN0aW9uVXBsb2FkLCBkYXRhKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBjaGVjayxcbiAgcXVpdCxcbiAgc3RhcnQsXG4gIGxpc3QsXG4gIHVwbG9hZCxcbn07XG4iXX0=