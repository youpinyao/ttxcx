import wepy from 'wepy';
import defer from './defer.js';

function doPay(data) {
  const deferred = defer();

  wepy.requestPayment({
    'timeStamp': data.timeStamp,
    'nonceStr': data.nonceStr,
    'package': data.package,
    'signType': data.signType,
    'paySign': data.paySign,
    'success': function(res) {
      console.error('pay success', res);
      deferred.resolve(res);
    },
    'fail': function(res) {
      console.error('pay fail', res);
      deferred.reject(res);
    }
  })

  return deferred.promise;
}

export default {
  doPay
}
