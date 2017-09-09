'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = require('./util.js');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = 'https://fetribe.cn/ttxcx/src/';
// const path = 'http://localhost/ttxcx/src/';

var urls = {
  login: 'json/login.json',
  home: 'json/home.json',
  rank: 'json/rank.json',
  record: 'json/record.json',
  booking: 'json/booking.json',
  user: 'json/user.json',
  bookingParams: 'json/bookingParams.json',
  bookingAdd: 'json/bookingAdd.json',
  challengeData: 'json/challengeData.json',
  postQrcode: 'json/postQrcode.json',
  questionCheck: 'json/questionCheck.json',
  questionQuit: 'json/questionQuit.json',
  questionStart: 'json/questionStart.json',
  questionList: 'json/questionList.json',
  questionUpload: 'json/questionUpload.json'
};

function convert(urls) {
  _util2.default.each(urls, function (d, k) {
    urls[k] = path + d;
  });
  return urls;
}

exports.default = convert(urls);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVybHMuanMiXSwibmFtZXMiOlsicGF0aCIsInVybHMiLCJsb2dpbiIsImhvbWUiLCJyYW5rIiwicmVjb3JkIiwiYm9va2luZyIsInVzZXIiLCJib29raW5nUGFyYW1zIiwiYm9va2luZ0FkZCIsImNoYWxsZW5nZURhdGEiLCJwb3N0UXJjb2RlIiwicXVlc3Rpb25DaGVjayIsInF1ZXN0aW9uUXVpdCIsInF1ZXN0aW9uU3RhcnQiLCJxdWVzdGlvbkxpc3QiLCJxdWVzdGlvblVwbG9hZCIsImNvbnZlcnQiLCJlYWNoIiwiZCIsImsiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7Ozs7QUFFQSxJQUFNQSxPQUFPLCtCQUFiO0FBQ0E7O0FBRUEsSUFBTUMsT0FBTztBQUNYQyxTQUFPLGlCQURJO0FBRVhDLFFBQU0sZ0JBRks7QUFHWEMsUUFBTSxnQkFISztBQUlYQyxVQUFRLGtCQUpHO0FBS1hDLFdBQVMsbUJBTEU7QUFNWEMsUUFBTSxnQkFOSztBQU9YQyxpQkFBZSx5QkFQSjtBQVFYQyxjQUFZLHNCQVJEO0FBU1hDLGlCQUFlLHlCQVRKO0FBVVhDLGNBQVksc0JBVkQ7QUFXWEMsaUJBQWUseUJBWEo7QUFZWEMsZ0JBQWMsd0JBWkg7QUFhWEMsaUJBQWUseUJBYko7QUFjWEMsZ0JBQWMsd0JBZEg7QUFlWEMsa0JBQWdCO0FBZkwsQ0FBYjs7QUFrQkEsU0FBU0MsT0FBVCxDQUFpQmhCLElBQWpCLEVBQXVCO0FBQ3JCLGlCQUFLaUIsSUFBTCxDQUFVakIsSUFBVixFQUFnQixVQUFDa0IsQ0FBRCxFQUFJQyxDQUFKLEVBQVU7QUFDeEJuQixTQUFLbUIsQ0FBTCxJQUFVcEIsT0FBT21CLENBQWpCO0FBQ0QsR0FGRDtBQUdBLFNBQU9sQixJQUFQO0FBQ0Q7O2tCQUVjZ0IsUUFBUWhCLElBQVIsQyIsImZpbGUiOiJ1cmxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHV0aWwgZnJvbSAnLi91dGlsLmpzJztcblxuY29uc3QgcGF0aCA9ICdodHRwczovL2ZldHJpYmUuY24vdHR4Y3gvc3JjLyc7XG4vLyBjb25zdCBwYXRoID0gJ2h0dHA6Ly9sb2NhbGhvc3QvdHR4Y3gvc3JjLyc7XG5cbmNvbnN0IHVybHMgPSB7XG4gIGxvZ2luOiAnanNvbi9sb2dpbi5qc29uJyxcbiAgaG9tZTogJ2pzb24vaG9tZS5qc29uJyxcbiAgcmFuazogJ2pzb24vcmFuay5qc29uJyxcbiAgcmVjb3JkOiAnanNvbi9yZWNvcmQuanNvbicsXG4gIGJvb2tpbmc6ICdqc29uL2Jvb2tpbmcuanNvbicsXG4gIHVzZXI6ICdqc29uL3VzZXIuanNvbicsXG4gIGJvb2tpbmdQYXJhbXM6ICdqc29uL2Jvb2tpbmdQYXJhbXMuanNvbicsXG4gIGJvb2tpbmdBZGQ6ICdqc29uL2Jvb2tpbmdBZGQuanNvbicsXG4gIGNoYWxsZW5nZURhdGE6ICdqc29uL2NoYWxsZW5nZURhdGEuanNvbicsXG4gIHBvc3RRcmNvZGU6ICdqc29uL3Bvc3RRcmNvZGUuanNvbicsXG4gIHF1ZXN0aW9uQ2hlY2s6ICdqc29uL3F1ZXN0aW9uQ2hlY2suanNvbicsXG4gIHF1ZXN0aW9uUXVpdDogJ2pzb24vcXVlc3Rpb25RdWl0Lmpzb24nLFxuICBxdWVzdGlvblN0YXJ0OiAnanNvbi9xdWVzdGlvblN0YXJ0Lmpzb24nLFxuICBxdWVzdGlvbkxpc3Q6ICdqc29uL3F1ZXN0aW9uTGlzdC5qc29uJyxcbiAgcXVlc3Rpb25VcGxvYWQ6ICdqc29uL3F1ZXN0aW9uVXBsb2FkLmpzb24nLFxufVxuXG5mdW5jdGlvbiBjb252ZXJ0KHVybHMpIHtcbiAgdXRpbC5lYWNoKHVybHMsIChkLCBrKSA9PiB7XG4gICAgdXJsc1trXSA9IHBhdGggKyBkO1xuICB9KTtcbiAgcmV0dXJuIHVybHM7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbnZlcnQodXJscyk7XG4iXX0=