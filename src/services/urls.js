import util from './util.js';

const path = 'https://ttgame-liunx.zhanzhibin.com/';
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

const urls = {
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
  util.each(urls, (d, k) => {
    urls[k] = path + d;
  });
  return urls;
}

export default convert(urls);
