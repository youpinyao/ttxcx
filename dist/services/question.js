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

function check(isTest) {
  _request2.default.get(_urls2.default.questionCheck).then(function (_ref) {
    var result = _ref.result;

    if (result.hasQuestion || isTest) {
      _wepy2.default.navigateTo({
        url: '/pages/question?id=' + result.questionId
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInF1ZXN0aW9uLmpzIl0sIm5hbWVzIjpbImNoZWNrIiwiaXNUZXN0IiwiZ2V0IiwicXVlc3Rpb25DaGVjayIsInRoZW4iLCJyZXN1bHQiLCJoYXNRdWVzdGlvbiIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJxdWVzdGlvbklkIiwicXVpdCIsImRhdGEiLCJwb3N0IiwicXVlc3Rpb25RdWl0Iiwic3RhcnQiLCJxdWVzdGlvblN0YXJ0IiwibGlzdCIsInF1ZXN0aW9uTGlzdCIsInVwbG9hZCIsInF1ZXN0aW9uVXBsb2FkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLFNBQVNBLEtBQVQsQ0FBZUMsTUFBZixFQUF1QjtBQUNyQixvQkFBUUMsR0FBUixDQUFZLGVBQUtDLGFBQWpCLEVBQWdDQyxJQUFoQyxDQUFxQyxnQkFFL0I7QUFBQSxRQURKQyxNQUNJLFFBREpBLE1BQ0k7O0FBQ0osUUFBSUEsT0FBT0MsV0FBUCxJQUFzQkwsTUFBMUIsRUFBa0M7QUFDaEMscUJBQUtNLFVBQUwsQ0FBZ0I7QUFDZEMscUNBQTJCSCxPQUFPSTtBQURwQixPQUFoQjtBQUdEO0FBQ0YsR0FSRDtBQVNEOztBQUVELFNBQVNDLElBQVQsQ0FBY0MsSUFBZCxFQUFvQjtBQUNsQixTQUFPLGtCQUFRQyxJQUFSLENBQWEsZUFBS0MsWUFBbEIsRUFBZ0NGLElBQWhDLENBQVA7QUFDRDs7QUFFRCxTQUFTRyxLQUFULENBQWVILElBQWYsRUFBcUI7QUFDbkIsU0FBTyxrQkFBUUMsSUFBUixDQUFhLGVBQUtHLGFBQWxCLEVBQWlDSixJQUFqQyxDQUFQO0FBQ0Q7O0FBRUQsU0FBU0ssSUFBVCxDQUFjTCxJQUFkLEVBQW9CO0FBQ2xCLFNBQU8sa0JBQVFULEdBQVIsQ0FBWSxlQUFLZSxZQUFqQixFQUErQk4sSUFBL0IsQ0FBUDtBQUNEOztBQUVELFNBQVNPLE1BQVQsQ0FBZ0JQLElBQWhCLEVBQXNCO0FBQ3BCLFNBQU8sa0JBQVFDLElBQVIsQ0FBYSxlQUFLTyxjQUFsQixFQUFrQ1IsSUFBbEMsQ0FBUDtBQUNEOztrQkFFYztBQUNiWCxjQURhO0FBRWJVLFlBRmE7QUFHYkksY0FIYTtBQUliRSxZQUphO0FBS2JFO0FBTGEsQyIsImZpbGUiOiJxdWVzdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB1cmxzIGZyb20gJy4vdXJscy5qcyc7XG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCByZXF1ZXN0IGZyb20gJy4vcmVxdWVzdC5qcyc7XG5cbmZ1bmN0aW9uIGNoZWNrKGlzVGVzdCkge1xuICByZXF1ZXN0LmdldCh1cmxzLnF1ZXN0aW9uQ2hlY2spLnRoZW4oKHtcbiAgICByZXN1bHQsXG4gIH0pID0+IHtcbiAgICBpZiAocmVzdWx0Lmhhc1F1ZXN0aW9uIHx8IGlzVGVzdCkge1xuICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgdXJsOiBgL3BhZ2VzL3F1ZXN0aW9uP2lkPSR7cmVzdWx0LnF1ZXN0aW9uSWR9YFxuICAgICAgfSlcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBxdWl0KGRhdGEpIHtcbiAgcmV0dXJuIHJlcXVlc3QucG9zdCh1cmxzLnF1ZXN0aW9uUXVpdCwgZGF0YSk7XG59XG5cbmZ1bmN0aW9uIHN0YXJ0KGRhdGEpIHtcbiAgcmV0dXJuIHJlcXVlc3QucG9zdCh1cmxzLnF1ZXN0aW9uU3RhcnQsIGRhdGEpO1xufVxuXG5mdW5jdGlvbiBsaXN0KGRhdGEpIHtcbiAgcmV0dXJuIHJlcXVlc3QuZ2V0KHVybHMucXVlc3Rpb25MaXN0LCBkYXRhKTtcbn1cblxuZnVuY3Rpb24gdXBsb2FkKGRhdGEpIHtcbiAgcmV0dXJuIHJlcXVlc3QucG9zdCh1cmxzLnF1ZXN0aW9uVXBsb2FkLCBkYXRhKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBjaGVjayxcbiAgcXVpdCxcbiAgc3RhcnQsXG4gIGxpc3QsXG4gIHVwbG9hZCxcbn07XG4iXX0=