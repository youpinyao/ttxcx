import util from './util.js';

const path = 'http://localhost/ttxcx/src/';

const urls = {
  login: 'json/login.json',
  home: 'json/home.json',
}

function convert(urls) {
  util.each(urls, (d, k) => {
    urls[k] = path + d;
  });
  return urls;
}

export default convert(urls);
