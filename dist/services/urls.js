'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = require('./util.js');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = 'https://cs.zhanzhibin.com/';
// const path = 'https://fetribe.cn/ttxcx/src/';
// const path = 'http://localhost/ttxcx/src/';

// const urls = {
//   login: 'json/login.json',
//   home: 'json/home.json',
//   rank: 'json/rank.json',
//   record: 'json/record.json',
//   booking: 'json/booking.json',
//   user: 'json/user.json',
//   bookingParams: 'json/bookingParams.json',
//   bookingAdd: 'json/bookingAdd.json',
//   challengeData: 'json/challengeData.json',
//   postQrcode: 'json/postQrcode.json',
//   questionCheck: 'json/questionCheck.json',
//   questionQuit: 'json/questionQuit.json',
//   questionStart: 'json/questionStart.json',
//   questionList: 'json/questionList.json',
//   questionUpload: 'json/questionUpload.json',
//   picturesData: 'json/picturesData.json',
//   picturesDataOfMy: 'json/picturesDataOfMy.json',
// }

var urls = {
  login: 'app/user/login.do',
  home: '/app/main/home.do',
  rank: 'app/main/rank.do',
  record: 'app/main/queryUserPass.do',
  booking: 'app/main/queryBooking.do',
  user: 'app/user/user.do',
  bookingParams: 'app/main/booking.do',
  bookingAdd: 'app/main/booked.do',
  challengeData: 'app/main/userPass.do',
  postQrcode: 'app/main/bindWristband.do',
  questionCheck: 'app/main/hasWaitQuestion.do',
  questionQuit: 'app/main/questionQuit.do',
  questionStart: 'app/main/questionStart.do',
  questionList: 'app/main/queryQuestion.do',
  questionUpload: 'app/main/questionUpload.do',
  picturesData: 'app/main/picturesData.do',
  picturesDataOfMy: 'app/main/picturesDataOfMy.do'
};

function convert(urls) {
  _util2.default.each(urls, function (d, k) {
    urls[k] = path + d;
  });
  return urls;
}

exports.default = convert(urls);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVybHMuanMiXSwibmFtZXMiOlsicGF0aCIsInVybHMiLCJsb2dpbiIsImhvbWUiLCJyYW5rIiwicmVjb3JkIiwiYm9va2luZyIsInVzZXIiLCJib29raW5nUGFyYW1zIiwiYm9va2luZ0FkZCIsImNoYWxsZW5nZURhdGEiLCJwb3N0UXJjb2RlIiwicXVlc3Rpb25DaGVjayIsInF1ZXN0aW9uUXVpdCIsInF1ZXN0aW9uU3RhcnQiLCJxdWVzdGlvbkxpc3QiLCJxdWVzdGlvblVwbG9hZCIsInBpY3R1cmVzRGF0YSIsInBpY3R1cmVzRGF0YU9mTXkiLCJjb252ZXJ0IiwiZWFjaCIsImQiLCJrIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7Ozs7O0FBRUEsSUFBTUEsT0FBTyw0QkFBYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsSUFBTUMsT0FBTztBQUNYQyxTQUFPLG1CQURJO0FBRVhDLFFBQU0sbUJBRks7QUFHWEMsUUFBTSxrQkFISztBQUlYQyxVQUFRLDJCQUpHO0FBS1hDLFdBQVMsMEJBTEU7QUFNWEMsUUFBTSxrQkFOSztBQU9YQyxpQkFBZSxxQkFQSjtBQVFYQyxjQUFZLG9CQVJEO0FBU1hDLGlCQUFlLHNCQVRKO0FBVVhDLGNBQVksMkJBVkQ7QUFXWEMsaUJBQWUsNkJBWEo7QUFZWEMsZ0JBQWMsMEJBWkg7QUFhWEMsaUJBQWUsMkJBYko7QUFjWEMsZ0JBQWMsMkJBZEg7QUFlWEMsa0JBQWdCLDRCQWZMO0FBZ0JYQyxnQkFBYywwQkFoQkg7QUFpQlhDLG9CQUFrQjtBQWpCUCxDQUFiOztBQW9CQSxTQUFTQyxPQUFULENBQWlCbEIsSUFBakIsRUFBdUI7QUFDckIsaUJBQUttQixJQUFMLENBQVVuQixJQUFWLEVBQWdCLFVBQUNvQixDQUFELEVBQUlDLENBQUosRUFBVTtBQUN4QnJCLFNBQUtxQixDQUFMLElBQVV0QixPQUFPcUIsQ0FBakI7QUFDRCxHQUZEO0FBR0EsU0FBT3BCLElBQVA7QUFDRDs7a0JBRWNrQixRQUFRbEIsSUFBUixDIiwiZmlsZSI6InVybHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdXRpbCBmcm9tICcuL3V0aWwuanMnO1xuXG5jb25zdCBwYXRoID0gJ2h0dHBzOi8vY3MuemhhbnpoaWJpbi5jb20vJztcbi8vIGNvbnN0IHBhdGggPSAnaHR0cHM6Ly9mZXRyaWJlLmNuL3R0eGN4L3NyYy8nO1xuLy8gY29uc3QgcGF0aCA9ICdodHRwOi8vbG9jYWxob3N0L3R0eGN4L3NyYy8nO1xuXG4vLyBjb25zdCB1cmxzID0ge1xuLy8gICBsb2dpbjogJ2pzb24vbG9naW4uanNvbicsXG4vLyAgIGhvbWU6ICdqc29uL2hvbWUuanNvbicsXG4vLyAgIHJhbms6ICdqc29uL3JhbmsuanNvbicsXG4vLyAgIHJlY29yZDogJ2pzb24vcmVjb3JkLmpzb24nLFxuLy8gICBib29raW5nOiAnanNvbi9ib29raW5nLmpzb24nLFxuLy8gICB1c2VyOiAnanNvbi91c2VyLmpzb24nLFxuLy8gICBib29raW5nUGFyYW1zOiAnanNvbi9ib29raW5nUGFyYW1zLmpzb24nLFxuLy8gICBib29raW5nQWRkOiAnanNvbi9ib29raW5nQWRkLmpzb24nLFxuLy8gICBjaGFsbGVuZ2VEYXRhOiAnanNvbi9jaGFsbGVuZ2VEYXRhLmpzb24nLFxuLy8gICBwb3N0UXJjb2RlOiAnanNvbi9wb3N0UXJjb2RlLmpzb24nLFxuLy8gICBxdWVzdGlvbkNoZWNrOiAnanNvbi9xdWVzdGlvbkNoZWNrLmpzb24nLFxuLy8gICBxdWVzdGlvblF1aXQ6ICdqc29uL3F1ZXN0aW9uUXVpdC5qc29uJyxcbi8vICAgcXVlc3Rpb25TdGFydDogJ2pzb24vcXVlc3Rpb25TdGFydC5qc29uJyxcbi8vICAgcXVlc3Rpb25MaXN0OiAnanNvbi9xdWVzdGlvbkxpc3QuanNvbicsXG4vLyAgIHF1ZXN0aW9uVXBsb2FkOiAnanNvbi9xdWVzdGlvblVwbG9hZC5qc29uJyxcbi8vICAgcGljdHVyZXNEYXRhOiAnanNvbi9waWN0dXJlc0RhdGEuanNvbicsXG4vLyAgIHBpY3R1cmVzRGF0YU9mTXk6ICdqc29uL3BpY3R1cmVzRGF0YU9mTXkuanNvbicsXG4vLyB9XG5cbmNvbnN0IHVybHMgPSB7XG4gIGxvZ2luOiAnYXBwL3VzZXIvbG9naW4uZG8nLFxuICBob21lOiAnL2FwcC9tYWluL2hvbWUuZG8nLFxuICByYW5rOiAnYXBwL21haW4vcmFuay5kbycsXG4gIHJlY29yZDogJ2FwcC9tYWluL3F1ZXJ5VXNlclBhc3MuZG8nLFxuICBib29raW5nOiAnYXBwL21haW4vcXVlcnlCb29raW5nLmRvJyxcbiAgdXNlcjogJ2FwcC91c2VyL3VzZXIuZG8nLFxuICBib29raW5nUGFyYW1zOiAnYXBwL21haW4vYm9va2luZy5kbycsXG4gIGJvb2tpbmdBZGQ6ICdhcHAvbWFpbi9ib29rZWQuZG8nLFxuICBjaGFsbGVuZ2VEYXRhOiAnYXBwL21haW4vdXNlclBhc3MuZG8nLFxuICBwb3N0UXJjb2RlOiAnYXBwL21haW4vYmluZFdyaXN0YmFuZC5kbycsXG4gIHF1ZXN0aW9uQ2hlY2s6ICdhcHAvbWFpbi9oYXNXYWl0UXVlc3Rpb24uZG8nLFxuICBxdWVzdGlvblF1aXQ6ICdhcHAvbWFpbi9xdWVzdGlvblF1aXQuZG8nLFxuICBxdWVzdGlvblN0YXJ0OiAnYXBwL21haW4vcXVlc3Rpb25TdGFydC5kbycsXG4gIHF1ZXN0aW9uTGlzdDogJ2FwcC9tYWluL3F1ZXJ5UXVlc3Rpb24uZG8nLFxuICBxdWVzdGlvblVwbG9hZDogJ2FwcC9tYWluL3F1ZXN0aW9uVXBsb2FkLmRvJyxcbiAgcGljdHVyZXNEYXRhOiAnYXBwL21haW4vcGljdHVyZXNEYXRhLmRvJyxcbiAgcGljdHVyZXNEYXRhT2ZNeTogJ2FwcC9tYWluL3BpY3R1cmVzRGF0YU9mTXkuZG8nXG59O1xuXG5mdW5jdGlvbiBjb252ZXJ0KHVybHMpIHtcbiAgdXRpbC5lYWNoKHVybHMsIChkLCBrKSA9PiB7XG4gICAgdXJsc1trXSA9IHBhdGggKyBkO1xuICB9KTtcbiAgcmV0dXJuIHVybHM7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbnZlcnQodXJscyk7XG4iXX0=