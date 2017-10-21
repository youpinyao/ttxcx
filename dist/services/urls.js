'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = require('./util.js');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const path = 'https://ttgame-liunx.zhanzhibin.com/';
// const path = 'https://fetribe.cn/ttxcx/src/';
var path = 'http://localhost/ttxcx/src/';

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVybHMuanMiXSwibmFtZXMiOlsicGF0aCIsInVybHMiLCJsb2dpbiIsImhvbWUiLCJyYW5rIiwicmVjb3JkIiwiYm9va2luZyIsInVzZXIiLCJib29raW5nUGFyYW1zIiwiYm9va2luZ0FkZCIsImNoYWxsZW5nZURhdGEiLCJwb3N0UXJjb2RlIiwicXVlc3Rpb25DaGVjayIsInF1ZXN0aW9uUXVpdCIsInF1ZXN0aW9uU3RhcnQiLCJxdWVzdGlvbkxpc3QiLCJxdWVzdGlvblVwbG9hZCIsInBpY3R1cmVzRGF0YSIsInBpY3R1cmVzRGF0YU9mTXkiLCJib29raW5nRGV0YWlsIiwiYm9va2luZ1BheSIsImJvb2tpbmdSZWZ1bmQiLCJjb252ZXJ0IiwiZWFjaCIsImQiLCJrIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7Ozs7O0FBRUE7QUFDQTtBQUNBLElBQU1BLE9BQU8sNkJBQWI7O0FBRUEsSUFBTUMsT0FBTztBQUNYQyxTQUFPLGlCQURJO0FBRVhDLFFBQU0sZ0JBRks7QUFHWEMsUUFBTSxnQkFISztBQUlYQyxVQUFRLGtCQUpHO0FBS1hDLFdBQVMsbUJBTEU7QUFNWEMsUUFBTSxnQkFOSztBQU9YQyxpQkFBZSx5QkFQSjtBQVFYQyxjQUFZLHNCQVJEO0FBU1hDLGlCQUFlLHlCQVRKO0FBVVhDLGNBQVksc0JBVkQ7QUFXWEMsaUJBQWUseUJBWEo7QUFZWEMsZ0JBQWMsd0JBWkg7QUFhWEMsaUJBQWUseUJBYko7QUFjWEMsZ0JBQWMsd0JBZEg7QUFlWEMsa0JBQWdCLDBCQWZMO0FBZ0JYQyxnQkFBYyx3QkFoQkg7QUFpQlhDLG9CQUFrQiw0QkFqQlA7QUFrQlhDLGlCQUFlLHlCQWxCSjtBQW1CWEMsY0FBWSxzQkFuQkQ7QUFvQlhDLGlCQUFlOztBQUdqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUE1Q2EsQ0FBYixDQThDQSxTQUFTQyxPQUFULENBQWlCckIsSUFBakIsRUFBdUI7QUFDckIsaUJBQUtzQixJQUFMLENBQVV0QixJQUFWLEVBQWdCLFVBQUN1QixDQUFELEVBQUlDLENBQUosRUFBVTtBQUN4QnhCLFNBQUt3QixDQUFMLElBQVV6QixPQUFPd0IsQ0FBakI7QUFDRCxHQUZEO0FBR0EsU0FBT3ZCLElBQVA7QUFDRDs7a0JBRWNxQixRQUFRckIsSUFBUixDIiwiZmlsZSI6InVybHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdXRpbCBmcm9tICcuL3V0aWwuanMnO1xuXG4vLyBjb25zdCBwYXRoID0gJ2h0dHBzOi8vdHRnYW1lLWxpdW54LnpoYW56aGliaW4uY29tLyc7XG4vLyBjb25zdCBwYXRoID0gJ2h0dHBzOi8vZmV0cmliZS5jbi90dHhjeC9zcmMvJztcbmNvbnN0IHBhdGggPSAnaHR0cDovL2xvY2FsaG9zdC90dHhjeC9zcmMvJztcblxuY29uc3QgdXJscyA9IHtcbiAgbG9naW46ICdqc29uL2xvZ2luLmpzb24nLFxuICBob21lOiAnanNvbi9ob21lLmpzb24nLFxuICByYW5rOiAnanNvbi9yYW5rLmpzb24nLFxuICByZWNvcmQ6ICdqc29uL3JlY29yZC5qc29uJyxcbiAgYm9va2luZzogJ2pzb24vYm9va2luZy5qc29uJyxcbiAgdXNlcjogJ2pzb24vdXNlci5qc29uJyxcbiAgYm9va2luZ1BhcmFtczogJ2pzb24vYm9va2luZ1BhcmFtcy5qc29uJyxcbiAgYm9va2luZ0FkZDogJ2pzb24vYm9va2luZ0FkZC5qc29uJyxcbiAgY2hhbGxlbmdlRGF0YTogJ2pzb24vY2hhbGxlbmdlRGF0YS5qc29uJyxcbiAgcG9zdFFyY29kZTogJ2pzb24vcG9zdFFyY29kZS5qc29uJyxcbiAgcXVlc3Rpb25DaGVjazogJ2pzb24vcXVlc3Rpb25DaGVjay5qc29uJyxcbiAgcXVlc3Rpb25RdWl0OiAnanNvbi9xdWVzdGlvblF1aXQuanNvbicsXG4gIHF1ZXN0aW9uU3RhcnQ6ICdqc29uL3F1ZXN0aW9uU3RhcnQuanNvbicsXG4gIHF1ZXN0aW9uTGlzdDogJ2pzb24vcXVlc3Rpb25MaXN0Lmpzb24nLFxuICBxdWVzdGlvblVwbG9hZDogJ2pzb24vcXVlc3Rpb25VcGxvYWQuanNvbicsXG4gIHBpY3R1cmVzRGF0YTogJ2pzb24vcGljdHVyZXNEYXRhLmpzb24nLFxuICBwaWN0dXJlc0RhdGFPZk15OiAnanNvbi9waWN0dXJlc0RhdGFPZk15Lmpzb24nLFxuICBib29raW5nRGV0YWlsOiAnanNvbi9ib29raW5nRGV0YWlsLmpzb24nLFxuICBib29raW5nUGF5OiAnanNvbi9ib29raW5nUGF5Lmpzb24nLFxuICBib29raW5nUmVmdW5kOiAnanNvbi9ib29raW5nUmVmdW5kLmpzb24nLFxufVxuXG4vLyBjb25zdCB1cmxzID0ge1xuLy8gICBsb2dpbjogJ2FwcC91c2VyL2xvZ2luLmRvJyxcbi8vICAgaG9tZTogJy9hcHAvbWFpbi9ob21lLmRvJyxcbi8vICAgcmFuazogJ2FwcC9tYWluL3JhbmsuZG8nLFxuLy8gICByZWNvcmQ6ICdhcHAvbWFpbi9xdWVyeVVzZXJQYXNzLmRvJyxcbi8vICAgYm9va2luZzogJ2FwcC9tYWluL3F1ZXJ5Qm9va2luZy5kbycsXG4vLyAgIHVzZXI6ICdhcHAvdXNlci91c2VyLmRvJyxcbi8vICAgYm9va2luZ1BhcmFtczogJ2FwcC9tYWluL2Jvb2tpbmcuZG8nLFxuLy8gICBib29raW5nQWRkOiAnYXBwL21haW4vYm9va2VkLmRvJyxcbi8vICAgY2hhbGxlbmdlRGF0YTogJ2FwcC9tYWluL3VzZXJQYXNzLmRvJyxcbi8vICAgcG9zdFFyY29kZTogJ2FwcC9tYWluL2JpbmRXcmlzdGJhbmQuZG8nLFxuLy8gICBxdWVzdGlvbkNoZWNrOiAnYXBwL21haW4vaGFzV2FpdFF1ZXN0aW9uLmRvJyxcbi8vICAgcXVlc3Rpb25RdWl0OiAnYXBwL21haW4vcXVlc3Rpb25RdWl0LmRvJyxcbi8vICAgcXVlc3Rpb25TdGFydDogJ2FwcC9tYWluL3F1ZXN0aW9uU3RhcnQuZG8nLFxuLy8gICBxdWVzdGlvbkxpc3Q6ICdhcHAvbWFpbi9xdWVyeVF1ZXN0aW9uLmRvJyxcbi8vICAgcXVlc3Rpb25VcGxvYWQ6ICdhcHAvbWFpbi9xdWVzdGlvblVwbG9hZC5kbycsXG4vLyAgIHBpY3R1cmVzRGF0YTogJ2FwcC9tYWluL3BpY3R1cmVzRGF0YS5kbycsXG4vLyAgIHBpY3R1cmVzRGF0YU9mTXk6ICdhcHAvbWFpbi9waWN0dXJlc0RhdGFPZk15LmRvJyxcbi8vICAgYm9va2luZ0RldGFpbDogJ2FwcC9tYWluL2Jvb2tpbmdEZXRhaWwuZG8nLFxuLy8gICBib29raW5nUGF5OiAnYXBwL21haW4vc3VibWl0T3JkZXIuZG8nLFxuLy8gICBib29raW5nUmVmdW5kOiAnYXBwL21haW4vcmVxdWVzdFJlZnVuZC5kbydcbi8vIH07XG5cbmZ1bmN0aW9uIGNvbnZlcnQodXJscykge1xuICB1dGlsLmVhY2godXJscywgKGQsIGspID0+IHtcbiAgICB1cmxzW2tdID0gcGF0aCArIGQ7XG4gIH0pO1xuICByZXR1cm4gdXJscztcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29udmVydCh1cmxzKTtcbiJdfQ==