import util from './util.js';

const path = 'https://fetribe.cn/ttxcx/src/';
// const path = 'http://localhost/ttxcx/src/';

const urls = {
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
}

function convert(urls) {
  util.each(urls, (d, k) => {
    urls[k] = path + d;
  });
  return urls;
}

export default convert(urls);
