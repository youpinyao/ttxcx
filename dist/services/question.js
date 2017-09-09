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
  _request2.default.get(_urls2.default.questionCheck).then(function (data) {
    if (data.hasQuestion || isTest) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInF1ZXN0aW9uLmpzIl0sIm5hbWVzIjpbImNoZWNrIiwiaXNUZXN0IiwiZ2V0IiwicXVlc3Rpb25DaGVjayIsInRoZW4iLCJkYXRhIiwiaGFzUXVlc3Rpb24iLCJuYXZpZ2F0ZVRvIiwidXJsIiwicXVlc3Rpb25JZCIsInF1aXQiLCJwb3N0IiwicXVlc3Rpb25RdWl0Iiwic3RhcnQiLCJxdWVzdGlvblN0YXJ0IiwibGlzdCIsInF1ZXN0aW9uTGlzdCIsInVwbG9hZCIsInF1ZXN0aW9uVXBsb2FkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLFNBQVNBLEtBQVQsQ0FBZUMsTUFBZixFQUF1QjtBQUNyQixvQkFBUUMsR0FBUixDQUFZLGVBQUtDLGFBQWpCLEVBQWdDQyxJQUFoQyxDQUFxQyxnQkFBUTtBQUMzQyxRQUFJQyxLQUFLQyxXQUFMLElBQW9CTCxNQUF4QixFQUFnQztBQUM5QixxQkFBS00sVUFBTCxDQUFnQjtBQUNkQyxxQ0FBMkJILEtBQUtJO0FBRGxCLE9BQWhCO0FBR0Q7QUFDRixHQU5EO0FBT0Q7O0FBRUQsU0FBU0MsSUFBVCxDQUFjTCxJQUFkLEVBQW9CO0FBQ2xCLFNBQU8sa0JBQVFNLElBQVIsQ0FBYSxlQUFLQyxZQUFsQixFQUFnQ1AsSUFBaEMsQ0FBUDtBQUNEOztBQUVELFNBQVNRLEtBQVQsQ0FBZVIsSUFBZixFQUFxQjtBQUNuQixTQUFPLGtCQUFRTSxJQUFSLENBQWEsZUFBS0csYUFBbEIsRUFBaUNULElBQWpDLENBQVA7QUFDRDs7QUFFRCxTQUFTVSxJQUFULENBQWNWLElBQWQsRUFBb0I7QUFDbEIsU0FBTyxrQkFBUUgsR0FBUixDQUFZLGVBQUtjLFlBQWpCLEVBQStCWCxJQUEvQixDQUFQO0FBQ0Q7O0FBRUQsU0FBU1ksTUFBVCxDQUFnQlosSUFBaEIsRUFBc0I7QUFDcEIsU0FBTyxrQkFBUU0sSUFBUixDQUFhLGVBQUtPLGNBQWxCLEVBQWtDYixJQUFsQyxDQUFQO0FBQ0Q7O2tCQUVjO0FBQ2JMLGNBRGE7QUFFYlUsWUFGYTtBQUdiRyxjQUhhO0FBSWJFLFlBSmE7QUFLYkU7QUFMYSxDIiwiZmlsZSI6InF1ZXN0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHVybHMgZnJvbSAnLi91cmxzLmpzJztcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IHJlcXVlc3QgZnJvbSAnLi9yZXF1ZXN0LmpzJztcblxuZnVuY3Rpb24gY2hlY2soaXNUZXN0KSB7XG4gIHJlcXVlc3QuZ2V0KHVybHMucXVlc3Rpb25DaGVjaykudGhlbihkYXRhID0+IHtcbiAgICBpZiAoZGF0YS5oYXNRdWVzdGlvbiB8fCBpc1Rlc3QpIHtcbiAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgIHVybDogYC9wYWdlcy9xdWVzdGlvbj9pZD0ke2RhdGEucXVlc3Rpb25JZH1gXG4gICAgICB9KVxuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHF1aXQoZGF0YSkge1xuICByZXR1cm4gcmVxdWVzdC5wb3N0KHVybHMucXVlc3Rpb25RdWl0LCBkYXRhKTtcbn1cblxuZnVuY3Rpb24gc3RhcnQoZGF0YSkge1xuICByZXR1cm4gcmVxdWVzdC5wb3N0KHVybHMucXVlc3Rpb25TdGFydCwgZGF0YSk7XG59XG5cbmZ1bmN0aW9uIGxpc3QoZGF0YSkge1xuICByZXR1cm4gcmVxdWVzdC5nZXQodXJscy5xdWVzdGlvbkxpc3QsIGRhdGEpO1xufVxuXG5mdW5jdGlvbiB1cGxvYWQoZGF0YSkge1xuICByZXR1cm4gcmVxdWVzdC5wb3N0KHVybHMucXVlc3Rpb25VcGxvYWQsIGRhdGEpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNoZWNrLFxuICBxdWl0LFxuICBzdGFydCxcbiAgbGlzdCxcbiAgdXBsb2FkLFxufTtcbiJdfQ==