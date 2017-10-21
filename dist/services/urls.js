'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = require('./util.js');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const path = 'https://ttgame-liunx.zhanzhibin.com/';
var path = 'https://xcx.fetribe.cn/ttxcx/src/';
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
  questionUpload: 'json/questionUpload.json',
  picturesData: 'json/picturesData.json',
  picturesDataOfMy: 'json/picturesDataOfMy.json',
  bookingDetail: 'json/bookingDetail.json',
  bookingPay: 'json/bookingPay.json',
  bookingRefund: 'json/bookingRefund.json'

  // const urls = {
  //   login: 'app/user/login.do',
  //   home: '/app/main/home.do',
  //   rank: 'app/main/rank.do',
  //   record: 'app/main/queryUserPass.do',
  //   booking: 'app/main/queryBooking.do',
  //   user: 'app/user/user.do',
  //   bookingParams: 'app/main/booking.do',
  //   bookingAdd: 'app/main/booked.do',
  //   challengeData: 'app/main/userPass.do',
  //   postQrcode: 'app/main/bindWristband.do',
  //   questionCheck: 'app/main/hasWaitQuestion.do',
  //   questionQuit: 'app/main/questionQuit.do',
  //   questionStart: 'app/main/questionStart.do',
  //   questionList: 'app/main/queryQuestion.do',
  //   questionUpload: 'app/main/questionUpload.do',
  //   picturesData: 'app/main/picturesData.do',
  //   picturesDataOfMy: 'app/main/picturesDataOfMy.do',
  //   bookingDetail: 'app/main/bookingDetail.do',
  //   bookingPay: 'app/main/submitOrder.do',
  //   bookingRefund: 'app/main/requestRefund.do'
  // };

};function convert(urls) {
  _util2.default.each(urls, function (d, k) {
    urls[k] = path + d;
  });
  return urls;
}

exports.default = convert(urls);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVybHMuanMiXSwibmFtZXMiOlsicGF0aCIsInVybHMiLCJsb2dpbiIsImhvbWUiLCJyYW5rIiwicmVjb3JkIiwiYm9va2luZyIsInVzZXIiLCJib29raW5nUGFyYW1zIiwiYm9va2luZ0FkZCIsImNoYWxsZW5nZURhdGEiLCJwb3N0UXJjb2RlIiwicXVlc3Rpb25DaGVjayIsInF1ZXN0aW9uUXVpdCIsInF1ZXN0aW9uU3RhcnQiLCJxdWVzdGlvbkxpc3QiLCJxdWVzdGlvblVwbG9hZCIsInBpY3R1cmVzRGF0YSIsInBpY3R1cmVzRGF0YU9mTXkiLCJib29raW5nRGV0YWlsIiwiYm9va2luZ1BheSIsImJvb2tpbmdSZWZ1bmQiLCJjb252ZXJ0IiwiZWFjaCIsImQiLCJrIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7Ozs7O0FBRUE7QUFDQSxJQUFNQSxPQUFPLG1DQUFiO0FBQ0E7O0FBRUEsSUFBTUMsT0FBTztBQUNYQyxTQUFPLGlCQURJO0FBRVhDLFFBQU0sZ0JBRks7QUFHWEMsUUFBTSxnQkFISztBQUlYQyxVQUFRLGtCQUpHO0FBS1hDLFdBQVMsbUJBTEU7QUFNWEMsUUFBTSxnQkFOSztBQU9YQyxpQkFBZSx5QkFQSjtBQVFYQyxjQUFZLHNCQVJEO0FBU1hDLGlCQUFlLHlCQVRKO0FBVVhDLGNBQVksc0JBVkQ7QUFXWEMsaUJBQWUseUJBWEo7QUFZWEMsZ0JBQWMsd0JBWkg7QUFhWEMsaUJBQWUseUJBYko7QUFjWEMsZ0JBQWMsd0JBZEg7QUFlWEMsa0JBQWdCLDBCQWZMO0FBZ0JYQyxnQkFBYyx3QkFoQkg7QUFpQlhDLG9CQUFrQiw0QkFqQlA7QUFrQlhDLGlCQUFlLHlCQWxCSjtBQW1CWEMsY0FBWSxzQkFuQkQ7QUFvQlhDLGlCQUFlOztBQUdqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUE1Q2EsQ0FBYixDQThDQSxTQUFTQyxPQUFULENBQWlCckIsSUFBakIsRUFBdUI7QUFDckIsaUJBQUtzQixJQUFMLENBQVV0QixJQUFWLEVBQWdCLFVBQUN1QixDQUFELEVBQUlDLENBQUosRUFBVTtBQUN4QnhCLFNBQUt3QixDQUFMLElBQVV6QixPQUFPd0IsQ0FBakI7QUFDRCxHQUZEO0FBR0EsU0FBT3ZCLElBQVA7QUFDRDs7a0JBRWNxQixRQUFRckIsSUFBUixDIiwiZmlsZSI6InVybHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdXRpbCBmcm9tICcuL3V0aWwuanMnO1xuXG4vLyBjb25zdCBwYXRoID0gJ2h0dHBzOi8vdHRnYW1lLWxpdW54LnpoYW56aGliaW4uY29tLyc7XG5jb25zdCBwYXRoID0gJ2h0dHBzOi8veGN4LmZldHJpYmUuY24vdHR4Y3gvc3JjLyc7XG4vLyBjb25zdCBwYXRoID0gJ2h0dHA6Ly9sb2NhbGhvc3QvdHR4Y3gvc3JjLyc7XG5cbmNvbnN0IHVybHMgPSB7XG4gIGxvZ2luOiAnanNvbi9sb2dpbi5qc29uJyxcbiAgaG9tZTogJ2pzb24vaG9tZS5qc29uJyxcbiAgcmFuazogJ2pzb24vcmFuay5qc29uJyxcbiAgcmVjb3JkOiAnanNvbi9yZWNvcmQuanNvbicsXG4gIGJvb2tpbmc6ICdqc29uL2Jvb2tpbmcuanNvbicsXG4gIHVzZXI6ICdqc29uL3VzZXIuanNvbicsXG4gIGJvb2tpbmdQYXJhbXM6ICdqc29uL2Jvb2tpbmdQYXJhbXMuanNvbicsXG4gIGJvb2tpbmdBZGQ6ICdqc29uL2Jvb2tpbmdBZGQuanNvbicsXG4gIGNoYWxsZW5nZURhdGE6ICdqc29uL2NoYWxsZW5nZURhdGEuanNvbicsXG4gIHBvc3RRcmNvZGU6ICdqc29uL3Bvc3RRcmNvZGUuanNvbicsXG4gIHF1ZXN0aW9uQ2hlY2s6ICdqc29uL3F1ZXN0aW9uQ2hlY2suanNvbicsXG4gIHF1ZXN0aW9uUXVpdDogJ2pzb24vcXVlc3Rpb25RdWl0Lmpzb24nLFxuICBxdWVzdGlvblN0YXJ0OiAnanNvbi9xdWVzdGlvblN0YXJ0Lmpzb24nLFxuICBxdWVzdGlvbkxpc3Q6ICdqc29uL3F1ZXN0aW9uTGlzdC5qc29uJyxcbiAgcXVlc3Rpb25VcGxvYWQ6ICdqc29uL3F1ZXN0aW9uVXBsb2FkLmpzb24nLFxuICBwaWN0dXJlc0RhdGE6ICdqc29uL3BpY3R1cmVzRGF0YS5qc29uJyxcbiAgcGljdHVyZXNEYXRhT2ZNeTogJ2pzb24vcGljdHVyZXNEYXRhT2ZNeS5qc29uJyxcbiAgYm9va2luZ0RldGFpbDogJ2pzb24vYm9va2luZ0RldGFpbC5qc29uJyxcbiAgYm9va2luZ1BheTogJ2pzb24vYm9va2luZ1BheS5qc29uJyxcbiAgYm9va2luZ1JlZnVuZDogJ2pzb24vYm9va2luZ1JlZnVuZC5qc29uJyxcbn1cblxuLy8gY29uc3QgdXJscyA9IHtcbi8vICAgbG9naW46ICdhcHAvdXNlci9sb2dpbi5kbycsXG4vLyAgIGhvbWU6ICcvYXBwL21haW4vaG9tZS5kbycsXG4vLyAgIHJhbms6ICdhcHAvbWFpbi9yYW5rLmRvJyxcbi8vICAgcmVjb3JkOiAnYXBwL21haW4vcXVlcnlVc2VyUGFzcy5kbycsXG4vLyAgIGJvb2tpbmc6ICdhcHAvbWFpbi9xdWVyeUJvb2tpbmcuZG8nLFxuLy8gICB1c2VyOiAnYXBwL3VzZXIvdXNlci5kbycsXG4vLyAgIGJvb2tpbmdQYXJhbXM6ICdhcHAvbWFpbi9ib29raW5nLmRvJyxcbi8vICAgYm9va2luZ0FkZDogJ2FwcC9tYWluL2Jvb2tlZC5kbycsXG4vLyAgIGNoYWxsZW5nZURhdGE6ICdhcHAvbWFpbi91c2VyUGFzcy5kbycsXG4vLyAgIHBvc3RRcmNvZGU6ICdhcHAvbWFpbi9iaW5kV3Jpc3RiYW5kLmRvJyxcbi8vICAgcXVlc3Rpb25DaGVjazogJ2FwcC9tYWluL2hhc1dhaXRRdWVzdGlvbi5kbycsXG4vLyAgIHF1ZXN0aW9uUXVpdDogJ2FwcC9tYWluL3F1ZXN0aW9uUXVpdC5kbycsXG4vLyAgIHF1ZXN0aW9uU3RhcnQ6ICdhcHAvbWFpbi9xdWVzdGlvblN0YXJ0LmRvJyxcbi8vICAgcXVlc3Rpb25MaXN0OiAnYXBwL21haW4vcXVlcnlRdWVzdGlvbi5kbycsXG4vLyAgIHF1ZXN0aW9uVXBsb2FkOiAnYXBwL21haW4vcXVlc3Rpb25VcGxvYWQuZG8nLFxuLy8gICBwaWN0dXJlc0RhdGE6ICdhcHAvbWFpbi9waWN0dXJlc0RhdGEuZG8nLFxuLy8gICBwaWN0dXJlc0RhdGFPZk15OiAnYXBwL21haW4vcGljdHVyZXNEYXRhT2ZNeS5kbycsXG4vLyAgIGJvb2tpbmdEZXRhaWw6ICdhcHAvbWFpbi9ib29raW5nRGV0YWlsLmRvJyxcbi8vICAgYm9va2luZ1BheTogJ2FwcC9tYWluL3N1Ym1pdE9yZGVyLmRvJyxcbi8vICAgYm9va2luZ1JlZnVuZDogJ2FwcC9tYWluL3JlcXVlc3RSZWZ1bmQuZG8nXG4vLyB9O1xuXG5mdW5jdGlvbiBjb252ZXJ0KHVybHMpIHtcbiAgdXRpbC5lYWNoKHVybHMsIChkLCBrKSA9PiB7XG4gICAgdXJsc1trXSA9IHBhdGggKyBkO1xuICB9KTtcbiAgcmV0dXJuIHVybHM7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbnZlcnQodXJscyk7XG4iXX0=