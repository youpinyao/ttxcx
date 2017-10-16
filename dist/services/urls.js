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
//   bookingDetail: 'json/bookingDetail.json',
//   bookingPay: 'json/bookingPay.json',
//   bookingRefund: 'json/bookingRefund.json',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVybHMuanMiXSwibmFtZXMiOlsicGF0aCIsInVybHMiLCJsb2dpbiIsImhvbWUiLCJyYW5rIiwicmVjb3JkIiwiYm9va2luZyIsInVzZXIiLCJib29raW5nUGFyYW1zIiwiYm9va2luZ0FkZCIsImNoYWxsZW5nZURhdGEiLCJwb3N0UXJjb2RlIiwicXVlc3Rpb25DaGVjayIsInF1ZXN0aW9uUXVpdCIsInF1ZXN0aW9uU3RhcnQiLCJxdWVzdGlvbkxpc3QiLCJxdWVzdGlvblVwbG9hZCIsInBpY3R1cmVzRGF0YSIsInBpY3R1cmVzRGF0YU9mTXkiLCJib29raW5nRGV0YWlsIiwiYm9va2luZ1BheSIsImJvb2tpbmdSZWZ1bmQiLCJjb252ZXJ0IiwiZWFjaCIsImQiLCJrIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7Ozs7O0FBRUEsSUFBTUEsT0FBTyw0QkFBYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsSUFBTUMsT0FBTztBQUNYQyxTQUFPLG1CQURJO0FBRVhDLFFBQU0sbUJBRks7QUFHWEMsUUFBTSxrQkFISztBQUlYQyxVQUFRLDJCQUpHO0FBS1hDLFdBQVMsMEJBTEU7QUFNWEMsUUFBTSxrQkFOSztBQU9YQyxpQkFBZSxxQkFQSjtBQVFYQyxjQUFZLG9CQVJEO0FBU1hDLGlCQUFlLHNCQVRKO0FBVVhDLGNBQVksMkJBVkQ7QUFXWEMsaUJBQWUsNkJBWEo7QUFZWEMsZ0JBQWMsMEJBWkg7QUFhWEMsaUJBQWUsMkJBYko7QUFjWEMsZ0JBQWMsMkJBZEg7QUFlWEMsa0JBQWdCLDRCQWZMO0FBZ0JYQyxnQkFBYywwQkFoQkg7QUFpQlhDLG9CQUFrQiw4QkFqQlA7QUFrQlhDLGlCQUFlLDJCQWxCSjtBQW1CWEMsY0FBWSx5QkFuQkQ7QUFvQlhDLGlCQUFlO0FBcEJKLENBQWI7O0FBdUJBLFNBQVNDLE9BQVQsQ0FBaUJyQixJQUFqQixFQUF1QjtBQUNyQixpQkFBS3NCLElBQUwsQ0FBVXRCLElBQVYsRUFBZ0IsVUFBQ3VCLENBQUQsRUFBSUMsQ0FBSixFQUFVO0FBQ3hCeEIsU0FBS3dCLENBQUwsSUFBVXpCLE9BQU93QixDQUFqQjtBQUNELEdBRkQ7QUFHQSxTQUFPdkIsSUFBUDtBQUNEOztrQkFFY3FCLFFBQVFyQixJQUFSLEMiLCJmaWxlIjoidXJscy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB1dGlsIGZyb20gJy4vdXRpbC5qcyc7XG5cbmNvbnN0IHBhdGggPSAnaHR0cHM6Ly9jcy56aGFuemhpYmluLmNvbS8nO1xuLy8gY29uc3QgcGF0aCA9ICdodHRwczovL2ZldHJpYmUuY24vdHR4Y3gvc3JjLyc7XG4vLyBjb25zdCBwYXRoID0gJ2h0dHA6Ly9sb2NhbGhvc3QvdHR4Y3gvc3JjLyc7XG5cbi8vIGNvbnN0IHVybHMgPSB7XG4vLyAgIGxvZ2luOiAnanNvbi9sb2dpbi5qc29uJyxcbi8vICAgaG9tZTogJ2pzb24vaG9tZS5qc29uJyxcbi8vICAgcmFuazogJ2pzb24vcmFuay5qc29uJyxcbi8vICAgcmVjb3JkOiAnanNvbi9yZWNvcmQuanNvbicsXG4vLyAgIGJvb2tpbmc6ICdqc29uL2Jvb2tpbmcuanNvbicsXG4vLyAgIHVzZXI6ICdqc29uL3VzZXIuanNvbicsXG4vLyAgIGJvb2tpbmdQYXJhbXM6ICdqc29uL2Jvb2tpbmdQYXJhbXMuanNvbicsXG4vLyAgIGJvb2tpbmdBZGQ6ICdqc29uL2Jvb2tpbmdBZGQuanNvbicsXG4vLyAgIGNoYWxsZW5nZURhdGE6ICdqc29uL2NoYWxsZW5nZURhdGEuanNvbicsXG4vLyAgIHBvc3RRcmNvZGU6ICdqc29uL3Bvc3RRcmNvZGUuanNvbicsXG4vLyAgIHF1ZXN0aW9uQ2hlY2s6ICdqc29uL3F1ZXN0aW9uQ2hlY2suanNvbicsXG4vLyAgIHF1ZXN0aW9uUXVpdDogJ2pzb24vcXVlc3Rpb25RdWl0Lmpzb24nLFxuLy8gICBxdWVzdGlvblN0YXJ0OiAnanNvbi9xdWVzdGlvblN0YXJ0Lmpzb24nLFxuLy8gICBxdWVzdGlvbkxpc3Q6ICdqc29uL3F1ZXN0aW9uTGlzdC5qc29uJyxcbi8vICAgcXVlc3Rpb25VcGxvYWQ6ICdqc29uL3F1ZXN0aW9uVXBsb2FkLmpzb24nLFxuLy8gICBwaWN0dXJlc0RhdGE6ICdqc29uL3BpY3R1cmVzRGF0YS5qc29uJyxcbi8vICAgcGljdHVyZXNEYXRhT2ZNeTogJ2pzb24vcGljdHVyZXNEYXRhT2ZNeS5qc29uJyxcbi8vICAgYm9va2luZ0RldGFpbDogJ2pzb24vYm9va2luZ0RldGFpbC5qc29uJyxcbi8vICAgYm9va2luZ1BheTogJ2pzb24vYm9va2luZ1BheS5qc29uJyxcbi8vICAgYm9va2luZ1JlZnVuZDogJ2pzb24vYm9va2luZ1JlZnVuZC5qc29uJyxcbi8vIH1cblxuY29uc3QgdXJscyA9IHtcbiAgbG9naW46ICdhcHAvdXNlci9sb2dpbi5kbycsXG4gIGhvbWU6ICcvYXBwL21haW4vaG9tZS5kbycsXG4gIHJhbms6ICdhcHAvbWFpbi9yYW5rLmRvJyxcbiAgcmVjb3JkOiAnYXBwL21haW4vcXVlcnlVc2VyUGFzcy5kbycsXG4gIGJvb2tpbmc6ICdhcHAvbWFpbi9xdWVyeUJvb2tpbmcuZG8nLFxuICB1c2VyOiAnYXBwL3VzZXIvdXNlci5kbycsXG4gIGJvb2tpbmdQYXJhbXM6ICdhcHAvbWFpbi9ib29raW5nLmRvJyxcbiAgYm9va2luZ0FkZDogJ2FwcC9tYWluL2Jvb2tlZC5kbycsXG4gIGNoYWxsZW5nZURhdGE6ICdhcHAvbWFpbi91c2VyUGFzcy5kbycsXG4gIHBvc3RRcmNvZGU6ICdhcHAvbWFpbi9iaW5kV3Jpc3RiYW5kLmRvJyxcbiAgcXVlc3Rpb25DaGVjazogJ2FwcC9tYWluL2hhc1dhaXRRdWVzdGlvbi5kbycsXG4gIHF1ZXN0aW9uUXVpdDogJ2FwcC9tYWluL3F1ZXN0aW9uUXVpdC5kbycsXG4gIHF1ZXN0aW9uU3RhcnQ6ICdhcHAvbWFpbi9xdWVzdGlvblN0YXJ0LmRvJyxcbiAgcXVlc3Rpb25MaXN0OiAnYXBwL21haW4vcXVlcnlRdWVzdGlvbi5kbycsXG4gIHF1ZXN0aW9uVXBsb2FkOiAnYXBwL21haW4vcXVlc3Rpb25VcGxvYWQuZG8nLFxuICBwaWN0dXJlc0RhdGE6ICdhcHAvbWFpbi9waWN0dXJlc0RhdGEuZG8nLFxuICBwaWN0dXJlc0RhdGFPZk15OiAnYXBwL21haW4vcGljdHVyZXNEYXRhT2ZNeS5kbycsXG4gIGJvb2tpbmdEZXRhaWw6ICdhcHAvbWFpbi9ib29raW5nRGV0YWlsLmRvJyxcbiAgYm9va2luZ1BheTogJ2FwcC9tYWluL3N1Ym1pdE9yZGVyLmRvJyxcbiAgYm9va2luZ1JlZnVuZDogJ2FwcC9tYWluL3JlcXVlc3RSZWZ1bmQuZG8nXG59O1xuXG5mdW5jdGlvbiBjb252ZXJ0KHVybHMpIHtcbiAgdXRpbC5lYWNoKHVybHMsIChkLCBrKSA9PiB7XG4gICAgdXJsc1trXSA9IHBhdGggKyBkO1xuICB9KTtcbiAgcmV0dXJuIHVybHM7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbnZlcnQodXJscyk7XG4iXX0=