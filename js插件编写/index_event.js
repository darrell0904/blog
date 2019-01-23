'use strict'
;
(function (global) {
  function factory() {
    var Events = events;
    return Events;
  }
  // 构造函数
  function events() {
    events.init.call(this);
  }
  /**
   *初始化
   */
  events.init = function () {
    if (!this.event_list) {
      this.event_list = {};
    }
    this.MaxEventListNum = this.MaxEventListNum || undefined;
    this.defaultMaxEventListNum = 10;
  }

  // 适配三端
  if (typeof module !== 'undefined' && typeof exports === 'object') {
    // 兼容vue 全局
    var ev = factory();
    module.exports = new ev();
  } else if (typeof define === 'function' && (define.cmd || define.amd)) {
    define(factory);
  } else {
    global.Events = factory();
  }
})(typeof window !== 'undefined' ? window : global);
