import wepy from 'wepy';

let hideLoadingSt = null;

function showLoading(config) {
  if (!config) {
    config = {}
  }

  if (typeof config === 'string') {
    var t = config;
    config = {
      title: t
    }
  }

  clearTimeout(hideLoadingSt);
  wepy.hideToast();

  wepy.showToast({
    title: config.title || '努力加载中',
    icon: config.icon || 'loading',
    duration: config.duration || 10000,
    mask: true,
  })
}

function hideLoading() {
  hideLoadingSt = setTimeout(function () {
    wepy.hideToast();
  }, 300)
}

export default {
  show: showLoading,
  hide: hideLoading,
}
