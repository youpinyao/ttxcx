'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = require('./util.js');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = 'https://ttgame-liunx.zhanzhibin.com/';
// const path = 'https://xcx.fetribe.cn/ttxcx/src/';
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
//   bookingDetail: 'json/bookingDetail.json',
//   bookingPay: 'json/bookingPay.json',
//   bookingRefund: 'json/bookingRefund.json',
//   setProtocolReaded: 'json/setProtocolReaded.json',
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
  picturesDataOfMy: 'app/main/picturesDataOfMy.do',
  bookingDetail: 'app/main/bookingDetail.do',
  bookingPay: 'app/main/submitOrder.do',
  bookingRefund: 'app/main/requestRefund.do'
};

function convert(urls) {
  _util2.default.each(urls, function (d, k) {
    urls[k] = path + d;
  });
  return urls;
}

exports.default = convert(urls);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVybHMuanMiXSwibmFtZXMiOlsicGF0aCIsInVybHMiLCJsb2dpbiIsImhvbWUiLCJyYW5rIiwicmVjb3JkIiwiYm9va2luZyIsInVzZXIiLCJib29raW5nUGFyYW1zIiwiYm9va2luZ0FkZCIsImNoYWxsZW5nZURhdGEiLCJwb3N0UXJjb2RlIiwicXVlc3Rpb25DaGVjayIsInF1ZXN0aW9uUXVpdCIsInF1ZXN0aW9uU3RhcnQiLCJxdWVzdGlvbkxpc3QiLCJxdWVzdGlvblVwbG9hZCIsInBpY3R1cmVzRGF0YSIsInBpY3R1cmVzRGF0YU9mTXkiLCJib29raW5nRGV0YWlsIiwiYm9va2luZ1BheSIsImJvb2tpbmdSZWZ1bmQiLCJjb252ZXJ0IiwiZWFjaCIsImQiLCJrIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7Ozs7O0FBRUEsSUFBTUEsT0FBTyxzQ0FBYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFNQyxPQUFPO0FBQ1hDLFNBQU8sbUJBREk7QUFFWEMsUUFBTSxtQkFGSztBQUdYQyxRQUFNLGtCQUhLO0FBSVhDLFVBQVEsMkJBSkc7QUFLWEMsV0FBUywwQkFMRTtBQU1YQyxRQUFNLGtCQU5LO0FBT1hDLGlCQUFlLHFCQVBKO0FBUVhDLGNBQVksb0JBUkQ7QUFTWEMsaUJBQWUsc0JBVEo7QUFVWEMsY0FBWSwyQkFWRDtBQVdYQyxpQkFBZSw2QkFYSjtBQVlYQyxnQkFBYywwQkFaSDtBQWFYQyxpQkFBZSwyQkFiSjtBQWNYQyxnQkFBYywyQkFkSDtBQWVYQyxrQkFBZ0IsNEJBZkw7QUFnQlhDLGdCQUFjLDBCQWhCSDtBQWlCWEMsb0JBQWtCLDhCQWpCUDtBQWtCWEMsaUJBQWUsMkJBbEJKO0FBbUJYQyxjQUFZLHlCQW5CRDtBQW9CWEMsaUJBQWU7QUFwQkosQ0FBYjs7QUF1QkEsU0FBU0MsT0FBVCxDQUFpQnJCLElBQWpCLEVBQXVCO0FBQ3JCLGlCQUFLc0IsSUFBTCxDQUFVdEIsSUFBVixFQUFnQixVQUFDdUIsQ0FBRCxFQUFJQyxDQUFKLEVBQVU7QUFDeEJ4QixTQUFLd0IsQ0FBTCxJQUFVekIsT0FBT3dCLENBQWpCO0FBQ0QsR0FGRDtBQUdBLFNBQU92QixJQUFQO0FBQ0Q7O2tCQUVjcUIsUUFBUXJCLElBQVIsQyIsImZpbGUiOiJ1cmxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHV0aWwgZnJvbSAnLi91dGlsLmpzJztcblxuY29uc3QgcGF0aCA9ICdodHRwczovL3R0Z2FtZS1saXVueC56aGFuemhpYmluLmNvbS8nO1xuLy8gY29uc3QgcGF0aCA9ICdodHRwczovL3hjeC5mZXRyaWJlLmNuL3R0eGN4L3NyYy8nO1xuLy8gY29uc3QgcGF0aCA9ICdodHRwOi8vbG9jYWxob3N0L3R0eGN4L3NyYy8nO1xuXG4vLyBjb25zdCB1cmxzID0ge1xuLy8gICBsb2dpbjogJ2pzb24vbG9naW4uanNvbicsXG4vLyAgIGhvbWU6ICdqc29uL2hvbWUuanNvbicsXG4vLyAgIHJhbms6ICdqc29uL3JhbmsuanNvbicsXG4vLyAgIHJlY29yZDogJ2pzb24vcmVjb3JkLmpzb24nLFxuLy8gICBib29raW5nOiAnanNvbi9ib29raW5nLmpzb24nLFxuLy8gICB1c2VyOiAnanNvbi91c2VyLmpzb24nLFxuLy8gICBib29raW5nUGFyYW1zOiAnanNvbi9ib29raW5nUGFyYW1zLmpzb24nLFxuLy8gICBib29raW5nQWRkOiAnanNvbi9ib29raW5nQWRkLmpzb24nLFxuLy8gICBjaGFsbGVuZ2VEYXRhOiAnanNvbi9jaGFsbGVuZ2VEYXRhLmpzb24nLFxuLy8gICBwb3N0UXJjb2RlOiAnanNvbi9wb3N0UXJjb2RlLmpzb24nLFxuLy8gICBxdWVzdGlvbkNoZWNrOiAnanNvbi9xdWVzdGlvbkNoZWNrLmpzb24nLFxuLy8gICBxdWVzdGlvblF1aXQ6ICdqc29uL3F1ZXN0aW9uUXVpdC5qc29uJyxcbi8vICAgcXVlc3Rpb25TdGFydDogJ2pzb24vcXVlc3Rpb25TdGFydC5qc29uJyxcbi8vICAgcXVlc3Rpb25MaXN0OiAnanNvbi9xdWVzdGlvbkxpc3QuanNvbicsXG4vLyAgIHF1ZXN0aW9uVXBsb2FkOiAnanNvbi9xdWVzdGlvblVwbG9hZC5qc29uJyxcbi8vICAgcGljdHVyZXNEYXRhOiAnanNvbi9waWN0dXJlc0RhdGEuanNvbicsXG4vLyAgIHBpY3R1cmVzRGF0YU9mTXk6ICdqc29uL3BpY3R1cmVzRGF0YU9mTXkuanNvbicsXG4vLyAgIGJvb2tpbmdEZXRhaWw6ICdqc29uL2Jvb2tpbmdEZXRhaWwuanNvbicsXG4vLyAgIGJvb2tpbmdQYXk6ICdqc29uL2Jvb2tpbmdQYXkuanNvbicsXG4vLyAgIGJvb2tpbmdSZWZ1bmQ6ICdqc29uL2Jvb2tpbmdSZWZ1bmQuanNvbicsXG4vLyAgIHNldFByb3RvY29sUmVhZGVkOiAnanNvbi9zZXRQcm90b2NvbFJlYWRlZC5qc29uJyxcbi8vIH1cblxuY29uc3QgdXJscyA9IHtcbiAgbG9naW46ICdhcHAvdXNlci9sb2dpbi5kbycsXG4gIGhvbWU6ICcvYXBwL21haW4vaG9tZS5kbycsXG4gIHJhbms6ICdhcHAvbWFpbi9yYW5rLmRvJyxcbiAgcmVjb3JkOiAnYXBwL21haW4vcXVlcnlVc2VyUGFzcy5kbycsXG4gIGJvb2tpbmc6ICdhcHAvbWFpbi9xdWVyeUJvb2tpbmcuZG8nLFxuICB1c2VyOiAnYXBwL3VzZXIvdXNlci5kbycsXG4gIGJvb2tpbmdQYXJhbXM6ICdhcHAvbWFpbi9ib29raW5nLmRvJyxcbiAgYm9va2luZ0FkZDogJ2FwcC9tYWluL2Jvb2tlZC5kbycsXG4gIGNoYWxsZW5nZURhdGE6ICdhcHAvbWFpbi91c2VyUGFzcy5kbycsXG4gIHBvc3RRcmNvZGU6ICdhcHAvbWFpbi9iaW5kV3Jpc3RiYW5kLmRvJyxcbiAgcXVlc3Rpb25DaGVjazogJ2FwcC9tYWluL2hhc1dhaXRRdWVzdGlvbi5kbycsXG4gIHF1ZXN0aW9uUXVpdDogJ2FwcC9tYWluL3F1ZXN0aW9uUXVpdC5kbycsXG4gIHF1ZXN0aW9uU3RhcnQ6ICdhcHAvbWFpbi9xdWVzdGlvblN0YXJ0LmRvJyxcbiAgcXVlc3Rpb25MaXN0OiAnYXBwL21haW4vcXVlcnlRdWVzdGlvbi5kbycsXG4gIHF1ZXN0aW9uVXBsb2FkOiAnYXBwL21haW4vcXVlc3Rpb25VcGxvYWQuZG8nLFxuICBwaWN0dXJlc0RhdGE6ICdhcHAvbWFpbi9waWN0dXJlc0RhdGEuZG8nLFxuICBwaWN0dXJlc0RhdGFPZk15OiAnYXBwL21haW4vcGljdHVyZXNEYXRhT2ZNeS5kbycsXG4gIGJvb2tpbmdEZXRhaWw6ICdhcHAvbWFpbi9ib29raW5nRGV0YWlsLmRvJyxcbiAgYm9va2luZ1BheTogJ2FwcC9tYWluL3N1Ym1pdE9yZGVyLmRvJyxcbiAgYm9va2luZ1JlZnVuZDogJ2FwcC9tYWluL3JlcXVlc3RSZWZ1bmQuZG8nXG59O1xuXG5mdW5jdGlvbiBjb252ZXJ0KHVybHMpIHtcbiAgdXRpbC5lYWNoKHVybHMsIChkLCBrKSA9PiB7XG4gICAgdXJsc1trXSA9IHBhdGggKyBkO1xuICB9KTtcbiAgcmV0dXJuIHVybHM7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbnZlcnQodXJscyk7XG4iXX0=