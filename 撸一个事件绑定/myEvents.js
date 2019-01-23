'use strict';

(function(global){
	console.log('我是自己封装的global');

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

  events.prototype.on = function(eventName, content) {
  		var _event, ctx;

  		_event = this.event_list;
    // 再次判断event_list是否存在，不存在则重新赋值
    if (!_event) {
      _event = this.event_list = {};
    } else {
      // 获取当前eventName的监听
      ctx = this.event_list[eventName];
    }

    if (!ctx) {
      ctx = this.event_list[eventName] = content;
      ctx.ListenerCount = 1;
    } else if (isFunction(ctx)) {
      ctx = this.event_list[eventName] = [ctx, content];
      ctx.ListenerCount = ctx.length;
    } else if (isArray(ctx)) {
      ctx.push(content);
      ctx.ListenerCount = ctx.length;
    }

  }


	events.prototype.emit = function (eventName, content) {
		var _event, ctx, args = Array.prototype.slice.call(arguments, 1);
    _event = this.event_list;

    if (_event) {
      ctx = this.event_list[eventName];
    } else {
      console.warn('events.prototype.emit || [eventName, content] -> Error: "can not find eventName"');
    }

    if (!ctx) {
      return false;
    } else if (isFunction(ctx)) {
      ctx.apply(this, args);
    } else if (isArray(ctx)) {
      for (var i = 0; i < ctx.length; i++) {
        ctx[i].apply(this, args);
      }
    }
    return true;
	};

	events.prototype.once = function () {};

	events.prototype.removeListener = function (type, content) {
		var _event, ctx, index = 0;
    if (!isFunction(content)) {
      throw new Error('events.prototype.removeListener || [eventName, content] -> Error: "content" must be a function');
    }

    _event = this.event_list;

    if (!_event) {
      return this;
    } else {
      ctx = this.event_list[type].concat(); // 解决不能删除所有事件的问题
    	var len = ctx.length;
    }

    if (!ctx) {
      return this;
    }

    if (isFunction(ctx)) {
      if (ctx === content) {
        delete _event[type];
      }
    } else if (isArray(ctx)) {

      for (let i = 0; i < len; i++) {

      	if (ctx[i] === content) {
	          this.event_list[type].splice(i - index, 1);
	          
	          ctx.ListenerCount = ctx.length;

	          if (this.event_list[type].length === 0) {
	            delete this.event_list[type]
	          }

	          index++;
	        }

      }
    }

    console.log(this);

    return this;
	};

	events.prototype.removeAllListener = function () {};

	events.prototype.getListenerCount = function (type) {
		
		var _event, ctx, ev_name = type,
      Count_obj = {};

      _event = this.event_list;
      // console.log('====type===',type);
      // console.log('====type===',_event);
    if (!_event || Object.keys(_event).length === 0) {
      return undefined;
    }

    // 无type
    if (!ev_name) {
      for (var attr in _event) {
        Count_obj[attr] = _event[attr].ListenerCount;
      }
      return Count_obj;
    }

    // 有type
    ctx = this.event_list[type];
    if (ctx && ctx.ListenerCount) {
      return ctx.ListenerCount;
    } else {
      return 0;
    }

	};


	/**
   *检测是否为函数
   *
   * @param {*} fn 需要检测的函数
   * @returns boolean
   */
  function isFunction(fn) {
    return fn instanceof Function;
  }
  /**
   *检测是否为对象
   *
   * @param {*} obj 检测对象
   * @returns boolean
   */
  function isObject(obj) {
    return obj instanceof Object;
  }
  /**
   *检测是否为数组
   *
   * @param {*} arr 检测数组
   * @returns boolean
   */
  function isArray(arr) {
    return arr instanceof Array;
  }

  // 适配三端
  if (typeof module !== 'undefined' && typeof exports === 'object') {
    // 兼容vue 全局
    var ev = factory();
    module.exports = new ev();
  } else if (typeof define === 'function' && (define.cmd || define.amd)) {
    define(factory);
  } else {
    global.Events = events;
  }
})(typeof window !== 'undefined' ? window : global)