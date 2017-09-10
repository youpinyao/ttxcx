import urls from './urls.js';
import wepy from 'wepy';
import request from './request.js';

function check(isTest) {
  request.get(urls.questionCheck).then(({
    result,
  }) => {
    if (result.hasQuestion || isTest) {
      wepy.navigateTo({
        url: `/pages/question?id=${result.questionId}`
      })
    }
  });
}

function quit(data) {
  return request.post(urls.questionQuit, data);
}

function start(data) {
  return request.post(urls.questionStart, data);
}

function list(data) {
  return request.get(urls.questionList, data);
}

function upload(data) {
  return request.post(urls.questionUpload, data);
}

export default {
  check,
  quit,
  start,
  list,
  upload,
};
