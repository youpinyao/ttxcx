import extend from 'extend';
import util from './util.js';
import defer from './defer.js';
import request from './request.js';

const Page = function(config) {
  var defaultConfig = {
    url: '',
    limit: 10,
    offset: 0
  }

  extend(true, defaultConfig, config || {});

  this._defaultConfig = extend({}, defaultConfig);
  this._config = extend({}, defaultConfig);
  this._data = [];
  this._totalRecord = false;

  this._hasFirstRquest = false;
}

Page.prototype.init = function() {
  return this.reset();
}

Page.prototype.nullDeferred = function() {
  var deferred = defer();
  setTimeout(function() {
    deferred.reject();
  })
  return deferred.promise;
}

Page.prototype.reset = function(config) {
  if (this.requesting) {
    return this.nullDeferred();
  }

  this._config = extend({}, this._defaultConfig);
  this._config = extend(this._config, config || {});
  this._data = [];
  this._totalRecord = false;
  this._nextKey = null;
  return this.update();
}
Page.prototype.update = function() {
  if (this.requesting) {
    return this.nullDeferred();
  }

  var _this = this;
  var deferred = defer();

  this.requesting = true;

  if (_this._nextKey) {
    this._config.nextKey = _this._nextKey;
  }

  request.get(_this._config.url, _this._config).then(function(data) {
    _this._hasFirstRquest = true;

    if (data.result && data.result.nextKey) {
      _this._nextKey = data.result.nextKey;
    }

    if (!data.result) {
      data.result = {
        content: [],
        totalRecord: 0
      }
    }

    _this._totalRecord = data.result.list ? false : (data.result.totalRecord || 0);
    _this._data = _this._data.concat((data.result.list || data.result.content) || []);

    // 去重
    // _this.duplicateDetection();

    // if (_this._config.offset > _this._totalRecord) {
    // _this._totalRecord = false;
    // }
    setTimeout(function() {
      _this.requesting = false;
    }, 300)

    // 保存当前请求的信息
    _this.currentData = data;

    deferred.resolve(_this._data);
  }, function (data) {
    _this._hasFirstRquest = true;

    setTimeout(function() {
      _this.requesting = false;
    }, 300)

    _this._totalRecord = 0;

    deferred.reject(data);
  })

  return deferred.promise;
}

Page.prototype.getCurrentData = function() {
  return this.currentData;
}

Page.prototype.duplicateDetection = function() {
  var data = this._data;
  var nData = [];
  var keys = [];

  util.each(data, function(value, key) {
    if (!value.id && !value.msgId) {
      nData.push(value);
    } else {
      if (value.id && keys.indexOf(value.id) === -1) {
        nData.push(value);
        keys.push(value.id);
      } else if (value.msgId && keys.indexOf(value.msgId) === -1) {
        nData.push(value);
        keys.push(value.msgId);
      }
    }
  })

  this._data = nData;
}

Page.prototype.next = function(config) {
  var _this = this;

  if (this.requesting) {
    return this.nullDeferred();
  }

  if (!this.hasNext()) {
    // return this.nullDeferred();
    return null;
  }

  if (_this._hasFirstRquest) {
    this._config.offset += this._config.limit;
  }

  _this._config = extend(this._config, config || {});
  return this.update();
}

Page.prototype.isLast = function() {
  if (this._nextKey === 'NONE') {
    return true;
  }
  if (this._totalRecord === false) {
    return false;
  }
  if (this._totalRecord <= this._data.length) {
    return true;
  }

  return false;
}

Page.prototype.hasNext = function() {
  if (this.requesting) {
    return false;
  }

  if (this._nextKey === 'NONE') {
    return false;
  }
  if (this._totalRecord === false) {
    return true;
  }

  if (this._totalRecord <= this._data.length) {
    return false;
  }

  return true;
}

export default {
  Page: function(config) {
    return new Page(config);
  }

}
