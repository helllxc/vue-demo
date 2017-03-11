/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 31);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  scopeId,
  cssModules
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  // inject cssModules
  if (cssModules) {
    var computed = Object.create(options.computed || null)
    Object.keys(cssModules).forEach(function (key) {
      var module = cssModules[key]
      computed[key] = function () { return module }
    })
    options.computed = computed
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.2.2
 * (c) 2014-2017 Evan You
 * Released under the MIT License.
 */
(function (global, factory) {
	 true ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Vue = factory());
}(this, (function () { 'use strict';

/*  */

/**
 * Convert a value to a string that is actually rendered.
 */
function _toString (val) {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Remove an item from an array
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Check if value is primitive
 */
function isPrimitive (value) {
  return typeof value === 'string' || typeof value === 'number'
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /([^-])([A-Z])/g;
var hyphenate = cached(function (str) {
  return str
    .replace(hyphenateRE, '$1-$2')
    .replace(hyphenateRE, '$1-$2')
    .toLowerCase()
});

/**
 * Simple bind, faster than native
 */
function bind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
  // record original fn length
  boundFn._length = fn.length;
  return boundFn
}

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
var toString = Object.prototype.toString;
var OBJECT_STRING = '[object Object]';
function isPlainObject (obj) {
  return toString.call(obj) === OBJECT_STRING
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/**
 * Perform no operation.
 */
function noop () {}

/**
 * Always return false.
 */
var no = function () { return false; };

/**
 * Return same value
 */
var identity = function (_) { return _; };

/**
 * Generate a static keys string from compiler modules.
 */
function genStaticKeys (modules) {
  return modules.reduce(function (keys, m) {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      return JSON.stringify(a) === JSON.stringify(b)
    } catch (e) {
      // possible circular reference
      return a === b
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn();
    }
  }
}

/*  */

var config = {
  /**
   * Option merge strategies (used in core/util/options)
   */
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: "development" !== 'production',

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * List of asset types that a component can own.
   */
  _assetTypes: [
    'component',
    'directive',
    'filter'
  ],

  /**
   * List of lifecycle hooks.
   */
  _lifecycleHooks: [
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeUpdate',
    'updated',
    'beforeDestroy',
    'destroyed',
    'activated',
    'deactivated'
  ],

  /**
   * Max circular updates allowed in a scheduler flush cycle.
   */
  _maxUpdateCount: 100
};

/*  */
/* globals MutationObserver */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = UA && UA.indexOf('android') > 0;
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

/**
 * Defer a task to execute it asynchronously.
 */
var nextTick = (function () {
  var callbacks = [];
  var pending = false;
  var timerFunc;

  function nextTickHandler () {
    pending = false;
    var copies = callbacks.slice(0);
    callbacks.length = 0;
    for (var i = 0; i < copies.length; i++) {
      copies[i]();
    }
  }

  // the nextTick behavior leverages the microtask queue, which can be accessed
  // via either native Promise.then or MutationObserver.
  // MutationObserver has wider support, however it is seriously bugged in
  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
  // completely stops working after triggering a few times... so, if native
  // Promise is available, we will use it:
  /* istanbul ignore if */
  if (typeof Promise !== 'undefined' && isNative(Promise)) {
    var p = Promise.resolve();
    var logError = function (err) { console.error(err); };
    timerFunc = function () {
      p.then(nextTickHandler).catch(logError);
      // in problematic UIWebViews, Promise.then doesn't completely break, but
      // it can get stuck in a weird state where callbacks are pushed into the
      // microtask queue but the queue isn't being flushed, until the browser
      // needs to do some other work, e.g. handle a timer. Therefore we can
      // "force" the microtask queue to be flushed by adding an empty timer.
      if (isIOS) { setTimeout(noop); }
    };
  } else if (typeof MutationObserver !== 'undefined' && (
    isNative(MutationObserver) ||
    // PhantomJS and iOS 7.x
    MutationObserver.toString() === '[object MutationObserverConstructor]'
  )) {
    // use MutationObserver where native Promise is not available,
    // e.g. PhantomJS IE11, iOS7, Android 4.4
    var counter = 1;
    var observer = new MutationObserver(nextTickHandler);
    var textNode = document.createTextNode(String(counter));
    observer.observe(textNode, {
      characterData: true
    });
    timerFunc = function () {
      counter = (counter + 1) % 2;
      textNode.data = String(counter);
    };
  } else {
    // fallback to setTimeout
    /* istanbul ignore next */
    timerFunc = function () {
      setTimeout(nextTickHandler, 0);
    };
  }

  return function queueNextTick (cb, ctx) {
    var _resolve;
    callbacks.push(function () {
      if (cb) { cb.call(ctx); }
      if (_resolve) { _resolve(ctx); }
    });
    if (!pending) {
      pending = true;
      timerFunc();
    }
    if (!cb && typeof Promise !== 'undefined') {
      return new Promise(function (resolve) {
        _resolve = resolve;
      })
    }
  }
})();

var _Set;
/* istanbul ignore if */
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = (function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

var perf;

{
  perf = inBrowser && window.performance;
  if (perf && (!perf.mark || !perf.measure)) {
    perf = undefined;
  }
}

/*  */

var emptyObject = Object.freeze({});

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

var warn = noop;
var tip = noop;
var formatComponentName;

{
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.error("[Vue warn]: " + msg + " " + (
        vm ? formatLocation(formatComponentName(vm)) : ''
      ));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + " " + (
        vm ? formatLocation(formatComponentName(vm)) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>'
    }
    var name = vm._isVue
      ? vm.$options.name || vm.$options._componentTag
      : vm.name;

    var file = vm._isVue && vm.$options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var formatLocation = function (str) {
    if (str === "<Anonymous>") {
      str += " - use the \"name\" option for better debugging messages.";
    }
    return ("\n(found in " + str + ")")
  };
}

/*  */


var uid$1 = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid$1++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget (_target) {
  if (Dep.target) { targetStack.push(Dep.target); }
  Dep.target = _target;
}

function popTarget () {
  Dep.target = targetStack.pop();
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var arguments$1 = arguments;

    // avoid leaking arguments:
    // http://jsperf.com/closure-with-arguments
    var i = arguments.length;
    var args = new Array(i);
    while (i--) {
      args[i] = arguments$1[i];
    }
    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
        inserted = args;
        break
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * By default, when a reactive property is set, the new value is
 * also converted to become reactive. However when passing down props,
 * we don't want to force conversion because the value may be a nested value
 * under a frozen data structure. Converting it would defeat the optimization.
 */
var observerState = {
  shouldConvert: true,
  isSettingProps: false
};

/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto
      ? protoAugment
      : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i], obj[keys[i]]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value)) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    observerState.shouldConvert &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;

  var childOb = observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
        }
        if (Array.isArray(value)) {
          dependArray(value);
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ("development" !== 'production' && customSetter) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if (Array.isArray(target)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (hasOwn(target, key)) {
    target[key] = val;
    return val
  }
  var ob = target.__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    "development" !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if (Array.isArray(target)) {
    target.splice(key, 1);
    return
  }
  var ob = target.__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    "development" !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
{
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (typeof childVal !== 'function') {
      "development" !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        childVal.call(this),
        parentVal.call(this)
      )
    }
  } else if (parentVal || childVal) {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm)
        : undefined;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}

config._lifecycleHooks.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (parentVal, childVal) {
  var res = Object.create(parentVal || null);
  return childVal
    ? extend(res, childVal)
    : res
}

config._assetTypes.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (parentVal, childVal) {
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key in childVal) {
    var parent = ret[key];
    var child = childVal[key];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key] = parent
      ? parent.concat(child)
      : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.computed = function (parentVal, childVal) {
  if (!childVal) { return Object.create(parentVal || null) }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  extend(ret, childVal);
  return ret
};

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    var lower = key.toLowerCase();
    if (isBuiltInTag(lower) || config.isReservedTag(lower)) {
      warn(
        'Do not use built-in or reserved HTML elements as component ' +
        'id: ' + key
      );
    }
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  }
  options.props = res;
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  {
    checkComponents(child);
  }
  normalizeProps(child);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = typeof extendsFrom === 'function'
      ? mergeOptions(parent, extendsFrom.options, vm)
      : mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      var mixin = child.mixins[i];
      if (mixin.prototype instanceof Vue$3) {
        mixin = mixin.options;
      }
      parent = mergeOptions(parent, mixin, vm);
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ("development" !== 'production' && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */

function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // handle boolean props
  if (isType(Boolean, prop.type)) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
      value = true;
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldConvert = observerState.shouldConvert;
    observerState.shouldConvert = true;
    observe(value);
    observerState.shouldConvert = prevShouldConvert;
  }
  {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ("development" !== 'production' && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }
  if (!valid) {
    warn(
      'Invalid prop: type check failed for prop "' + name + '".' +
      ' Expected ' + expectedTypes.map(capitalize).join(', ') +
      ', got ' + Object.prototype.toString.call(value).slice(8, -1) + '.',
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

/**
 * Assert the type of a value
 */
function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (expectedType === 'String') {
    valid = typeof value === (expectedType = 'string');
  } else if (expectedType === 'Number') {
    valid = typeof value === (expectedType = 'number');
  } else if (expectedType === 'Boolean') {
    valid = typeof value === (expectedType = 'boolean');
  } else if (expectedType === 'Function') {
    valid = typeof value === (expectedType = 'function');
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match && match[1]
}

function isType (type, fn) {
  if (!Array.isArray(fn)) {
    return getType(fn) === getType(type)
  }
  for (var i = 0, len = fn.length; i < len; i++) {
    if (getType(fn[i]) === getType(type)) {
      return true
    }
  }
  /* istanbul ignore next */
  return false
}

function handleError (err, vm, info) {
  if (config.errorHandler) {
    config.errorHandler.call(null, err, vm, info);
  } else {
    {
      warn(("Error in " + info + ":"), vm);
    }
    /* istanbul ignore else */
    if (inBrowser && typeof console !== 'undefined') {
      console.error(err);
    } else {
      throw err
    }
  }
}

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

{
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      "referenced during render. Make sure to declare reactive data " +
      "properties in the data option.",
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' &&
    Proxy.toString().match(/native code/);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
      if (!has && !isAllowed) {
        warnNonPresent(target, key);
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        warnNonPresent(target, key);
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.functionalContext = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
};

var prototypeAccessors = { child: {} };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function () {
  var node = new VNode();
  node.text = '';
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isCloned = true;
  return cloned
}

function cloneVNodes (vnodes) {
  var len = vnodes.length;
  var res = new Array(len);
  for (var i = 0; i < len; i++) {
    res[i] = cloneVNode(vnodes[i]);
  }
  return res
}

/*  */

var normalizeEvent = cached(function (name) {
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture
  }
});

function createFnInvoker (fns) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      for (var i = 0; i < fns.length; i++) {
        fns[i].apply(null, arguments$1);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments)
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  vm
) {
  var name, cur, old, event;
  for (name in on) {
    cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (!cur) {
      "development" !== 'production' && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (!old) {
      if (!cur.fns) {
        cur = on[name] = createFnInvoker(cur);
      }
      add(event.name, cur, event.once, event.capture);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (!on[name]) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook) {
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (!oldHook) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (oldHook.fns && oldHook.merged) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (c == null || typeof c === 'boolean') { continue }
    last = res[res.length - 1];
    //  nested
    if (Array.isArray(c)) {
      res.push.apply(res, normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i)));
    } else if (isPrimitive(c)) {
      if (last && last.text) {
        last.text += String(c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (c.text && last && last.text) {
        res[res.length - 1] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (c.tag && c.key == null && nestedIndex != null) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function getFirstComponentChild (children) {
  return children && children.filter(function (c) { return c && c.componentOptions; })[0]
}

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn, once$$1) {
  if (once$$1) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var this$1 = this;

    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var this$1 = this;

    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        this$1.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (arguments.length === 1) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        cbs[i].apply(vm, args);
      }
    }
    return vm
  };
}

/*  */

/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  var slots = {};
  if (!children) {
    return slots
  }
  var defaultSlot = [];
  var name, child;
  for (var i = 0, l = children.length; i < l; i++) {
    child = children[i];
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.functionalContext === context) &&
        child.data && (name = child.data.slot)) {
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children);
      } else {
        slot.push(child);
      }
    } else {
      defaultSlot.push(child);
    }
  }
  // ignore whitespace
  if (!defaultSlot.every(isWhitespace)) {
    slots.default = defaultSlot;
  }
  return slots
}

function isWhitespace (node) {
  return node.isComment || node.text === ' '
}

function resolveScopedSlots (
  fns
) {
  var res = {};
  for (var i = 0; i < fns.length; i++) {
    res[fns[i][0]] = fns[i][1];
  }
  return res
}

/*  */

var activeInstance = null;

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(
        vm.$el, vnode, hydrating, false /* removeOnly */,
        vm.$options._parentElm,
        vm.$options._refElm
      );
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if ("development" !== 'production' && config.performance && perf) {
    updateComponent = function () {
      var name = vm._name;
      var startTag = "start " + name;
      var endTag = "end " + name;
      perf.mark(startTag);
      var vnode = vm._render();
      perf.mark(endTag);
      perf.measure((name + " render"), startTag, endTag);
      perf.mark(startTag);
      vm._update(vnode, hydrating);
      perf.mark(endTag);
      perf.measure((name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  vm._watcher = new Watcher(vm, updateComponent, noop);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren
  var hasChildren = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    parentVnode.data.scopedSlots || // has new scoped slots
    vm.$scopedSlots !== emptyObject // has old scoped slots
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render
  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update props
  if (propsData && vm.$options.props) {
    observerState.shouldConvert = false;
    {
      observerState.isSettingProps = true;
    }
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      props[key] = validateProp(key, vm.$options.props, propsData, vm);
    }
    observerState.shouldConvert = true;
    {
      observerState.isSettingProps = false;
    }
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  // update listeners
  if (listeners) {
    var oldListeners = vm.$options._parentListeners;
    vm.$options._parentListeners = listeners;
    updateComponentListeners(vm, listeners, oldListeners);
  }
  // resolve slots + force update if has children
  if (hasChildren) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive == null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, (hook + " hook"));
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
}

/*  */


var queue = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  queue.length = 0;
  has = {};
  {
    circular = {};
  }
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  flushing = true;
  var watcher, id, vm;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ("development" !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > config._maxUpdateCount) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // call updated hooks
  index = queue.length;
  while (index--) {
    watcher = queue[index];
    vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }

  resetSchedulerState();
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i >= 0 && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(Math.max(i, index) + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */

var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options
) {
  this.vm = vm;
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = expOrFn.toString();
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      "development" !== 'production' && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  if (this.user) {
    try {
      value = this.getter.call(vm, vm);
    } catch (e) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    }
  } else {
    value = this.getter.call(vm, vm);
  }
  // "touch" every property so they are all tracked as
  // dependencies for deep watching
  if (this.deep) {
    traverse(value);
  }
  popTarget();
  this.cleanupDeps();
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
    var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
var seenObjects = new _Set();
function traverse (val) {
  seenObjects.clear();
  _traverse(val, seenObjects);
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || !Object.isExtensible(val)) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch) { initWatch(vm, opts.watch); }
}

var isReservedProp = { key: 1, ref: 1, slot: 1 };

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  observerState.shouldConvert = isRoot;
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    {
      if (isReservedProp[key]) {
        warn(
          ("\"" + key + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (vm.$parent && !observerState.isSettingProps) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  observerState.shouldConvert = true;
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? data.call(vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    "development" !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var i = keys.length;
  while (i--) {
    if (props && hasOwn(props, keys[i])) {
      "development" !== 'production' && warn(
        "The data property \"" + (keys[i]) + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(keys[i])) {
      proxy(vm, "_data", keys[i]);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  var watchers = vm._computedWatchers = Object.create(null);

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    // create internal watcher for the computed property.
    watchers[key] = new Watcher(vm, getter, noop, computedWatcherOptions);

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    }
  }
}

function defineComputed (target, key, userDef) {
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = createComputedGetter(key);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? userDef.cache !== false
        ? createComputedGetter(key)
        : userDef.get
      : noop;
    sharedPropertyDefinition.set = userDef.set
      ? userDef.set
      : noop;
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
    {
      if (methods[key] == null) {
        warn(
          "method \"" + key + "\" has an undefined value in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
    }
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (vm, key, handler) {
  var options;
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  vm.$watch(key, handler, options);
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  {
    dataDef.set = function (newData) {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var hooks = { init: init, prepatch: prepatch, insert: insert, destroy: destroy };
var hooksToMerge = Object.keys(hooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (!Ctor) {
    return
  }

  var baseCtor = context.$options._base;
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  if (typeof Ctor !== 'function') {
    {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  if (!Ctor.cid) {
    if (Ctor.resolved) {
      Ctor = Ctor.resolved;
    } else {
      Ctor = resolveAsyncComponent(Ctor, baseCtor, function () {
        // it's ok to queue this on every render because
        // $forceUpdate is buffered by the scheduler.
        context.$forceUpdate();
      });
      if (!Ctor) {
        // return nothing if this is indeed an async component
        // wait for the callback to trigger parent update.
        return
      }
    }
  }

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  data = data || {};

  // transform component v-model data into props & events
  if (data.model) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractProps(data, Ctor);

  // functional component
  if (Ctor.options.functional) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  data.on = data.nativeOn;

  if (Ctor.options.abstract) {
    // abstract components do not keep anything
    // other than props & listeners
    data = {};
  }

  // merge component management hooks onto the placeholder node
  mergeHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children }
  );
  return vnode
}

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  context,
  children
) {
  var props = {};
  var propOptions = Ctor.options.props;
  if (propOptions) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData);
    }
  }
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var _context = Object.create(context);
  var h = function (a, b, c, d) { return createElement(_context, a, b, c, d, true); };
  var vnode = Ctor.options.render.call(null, h, {
    props: props,
    data: data,
    parent: context,
    children: children,
    slots: function () { return resolveSlots(children, context); }
  });
  if (vnode instanceof VNode) {
    vnode.functionalContext = context;
    if (data.slot) {
      (vnode.data || (vnode.data = {})).slot = data.slot;
    }
  }
  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent, // activeInstance in lifecycle state
  parentElm,
  refElm
) {
  var vnodeComponentOptions = vnode.componentOptions;
  var options = {
    _isComponent: true,
    parent: parent,
    propsData: vnodeComponentOptions.propsData,
    _componentTag: vnodeComponentOptions.tag,
    _parentVnode: vnode,
    _parentListeners: vnodeComponentOptions.listeners,
    _renderChildren: vnodeComponentOptions.children,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (inlineTemplate) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnodeComponentOptions.Ctor(options)
}

function init (
  vnode,
  hydrating,
  parentElm,
  refElm
) {
  if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
    var child = vnode.componentInstance = createComponentInstanceForVnode(
      vnode,
      activeInstance,
      parentElm,
      refElm
    );
    child.$mount(hydrating ? vnode.elm : undefined, hydrating);
  } else if (vnode.data.keepAlive) {
    // kept-alive components, treat as a patch
    var mountedNode = vnode; // work around flow
    prepatch(mountedNode, mountedNode);
  }
}

function prepatch (
  oldVnode,
  vnode
) {
  var options = vnode.componentOptions;
  var child = vnode.componentInstance = oldVnode.componentInstance;
  updateChildComponent(
    child,
    options.propsData, // updated props
    options.listeners, // updated listeners
    vnode, // new parent vnode
    options.children // new children
  );
}

function insert (vnode) {
  if (!vnode.componentInstance._isMounted) {
    vnode.componentInstance._isMounted = true;
    callHook(vnode.componentInstance, 'mounted');
  }
  if (vnode.data.keepAlive) {
    activateChildComponent(vnode.componentInstance, true /* direct */);
  }
}

function destroy (vnode) {
  if (!vnode.componentInstance._isDestroyed) {
    if (!vnode.data.keepAlive) {
      vnode.componentInstance.$destroy();
    } else {
      deactivateChildComponent(vnode.componentInstance, true /* direct */);
    }
  }
}

function resolveAsyncComponent (
  factory,
  baseCtor,
  cb
) {
  if (factory.requested) {
    // pool callbacks
    factory.pendingCallbacks.push(cb);
  } else {
    factory.requested = true;
    var cbs = factory.pendingCallbacks = [cb];
    var sync = true;

    var resolve = function (res) {
      if (isObject(res)) {
        res = baseCtor.extend(res);
      }
      // cache resolved
      factory.resolved = res;
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        for (var i = 0, l = cbs.length; i < l; i++) {
          cbs[i](res);
        }
      }
    };

    var reject = function (reason) {
      "development" !== 'production' && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
    };

    var res = factory(resolve, reject);

    // handle promise
    if (res && typeof res.then === 'function' && !factory.resolved) {
      res.then(resolve, reject);
    }

    sync = false;
    // return in case resolved synchronously
    return factory.resolved
  }
}

function extractProps (data, Ctor) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (!propOptions) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  var domProps = data.domProps;
  if (attrs || props || domProps) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey) ||
      checkProp(res, domProps, key, altKey);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (hash) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

function mergeHooks (data) {
  if (!data.hook) {
    data.hook = {};
  }
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var fromParent = data.hook[key];
    var ours = hooks[key];
    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
  }
}

function mergeHook$1 (one, two) {
  return function (a, b, c, d) {
    one(a, b, c, d);
    two(a, b, c, d);
  }
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  if (on[event]) {
    on[event] = [data.model.callback].concat(on[event]);
  } else {
    on[event] = data.model.callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (alwaysNormalize) { normalizationType = ALWAYS_NORMALIZE; }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (data && data.__ob__) {
    "development" !== 'production' && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
      typeof children[0] === 'function') {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (vnode) {
    if (ns) { applyNS(vnode, ns); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    return
  }
  if (vnode.children) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (child.tag && !child.ns) {
        applyNS(child, ns);
      }
    }
  }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    keys = Object.keys(val);
    ret = new Array(keys.length);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      extend(props, bindObject);
    }
    return scopedSlotFn(props) || fallback
  } else {
    var slotNodes = this.$slots[name];
    // warn duplicate slot usage
    if (slotNodes && "development" !== 'production') {
      slotNodes._rendered && warn(
        "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
        "- this will likely cause render errors.",
        this
      );
      slotNodes._rendered = true;
    }
    return slotNodes || fallback
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

/**
 * Runtime helper for checking keyCodes from config.
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInAlias
) {
  var keyCodes = config.keyCodes[key] || builtInAlias;
  if (Array.isArray(keyCodes)) {
    return keyCodes.indexOf(eventKeyCode) === -1
  } else {
    return keyCodes !== eventKeyCode
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp
) {
  if (value) {
    if (!isObject(value)) {
      "development" !== 'production' && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      for (var key in value) {
        if (key === 'class' || key === 'style') {
          data[key] = value[key];
        } else {
          var type = data.attrs && data.attrs.type;
          var hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
          hash[key] = value[key];
        }
      }
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var tree = this._staticTrees[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree by doing a shallow clone.
  if (tree && !isInFor) {
    return Array.isArray(tree)
      ? cloneVNodes(tree)
      : cloneVNode(tree)
  }
  // otherwise, render a fresh tree.
  tree = this._staticTrees[index] =
    this.$options.staticRenderFns[index].call(this._renderProxy);
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function initRender (vm) {
  vm.$vnode = null; // the placeholder node in parent tree
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null;
  var parentVnode = vm.$options._parentVnode;
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(vm.$options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };
}

function renderMixin (Vue) {
  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var staticRenderFns = ref.staticRenderFns;
    var _parentVnode = ref._parentVnode;

    if (vm._isMounted) {
      // clone slot nodes on re-renders
      for (var key in vm.$slots) {
        vm.$slots[key] = cloneVNodes(vm.$slots[key]);
      }
    }

    vm.$scopedSlots = (_parentVnode && _parentVnode.data.scopedSlots) || emptyObject;

    if (staticRenderFns && !vm._staticTrees) {
      vm._staticTrees = [];
    }
    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render function");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      {
        vnode = vm.$options.renderError
          ? vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e)
          : vm._vnode;
      }
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ("development" !== 'production' && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };

  // internal render helpers.
  // these are exposed on the instance prototype to reduce generated render
  // code size.
  Vue.prototype._o = markOnce;
  Vue.prototype._n = toNumber;
  Vue.prototype._s = _toString;
  Vue.prototype._l = renderList;
  Vue.prototype._t = renderSlot;
  Vue.prototype._q = looseEqual;
  Vue.prototype._i = looseIndexOf;
  Vue.prototype._m = renderStatic;
  Vue.prototype._f = resolveFilter;
  Vue.prototype._k = checkKeyCodes;
  Vue.prototype._b = bindObjectProps;
  Vue.prototype._v = createTextVNode;
  Vue.prototype._e = createEmptyVNode;
  Vue.prototype._u = resolveScopedSlots;
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var inject = vm.$options.inject;
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    // isArray here
    var isArray = Array.isArray(inject);
    var keys = isArray
      ? inject
      : hasSymbol
        ? Reflect.ownKeys(inject)
        : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var provideKey = isArray ? key : inject[key];
      var source = vm;
      while (source) {
        if (source._provided && provideKey in source._provided) {
          vm[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
    }
  }
}

/*  */

var uid = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    /* istanbul ignore if */
    if ("development" !== 'production' && config.performance && perf) {
      perf.mark('init');
    }

    var vm = this;
    // a uid
    vm._uid = uid++;
    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    {
      initProxy(vm);
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if ("development" !== 'production' && config.performance && perf) {
      vm._name = formatComponentName(vm, false);
      perf.mark('init end');
      perf.measure(((vm._name) + " init"), 'init', 'init end');
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  opts.parent = options.parent;
  opts.propsData = options.propsData;
  opts._parentVnode = options._parentVnode;
  opts._parentListeners = options._parentListeners;
  opts._renderChildren = options._renderChildren;
  opts._componentTag = options._componentTag;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;
  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = dedupe(latest[key], sealed[key]);
    }
  }
  return modified
}

function dedupe (latest, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    var res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    for (var i = 0; i < latest.length; i++) {
      if (sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i]);
      }
    }
    return res
  } else {
    return latest
  }
}

function Vue$3 (options) {
  if ("development" !== 'production' &&
    !(this instanceof Vue$3)) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue$3);
stateMixin(Vue$3);
eventsMixin(Vue$3);
lifecycleMixin(Vue$3);
renderMixin(Vue$3);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    /* istanbul ignore if */
    if (plugin.installed) {
      return
    }
    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    plugin.installed = true;
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    {
      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
        warn(
          'Invalid component name: "' + name + '". Component names ' +
          'can only contain alphanumeric characters and the hyphen, ' +
          'and must start with a letter.'
        );
      }
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    config._assetTypes.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  config._assetTypes.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        {
          if (type === 'component' && config.isReservedTag(id)) {
            warn(
              'Do not use built-in or reserved HTML elements as component ' +
              'id: ' + id
            );
          }
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */

var patternTypes = [String, RegExp];

function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (pattern instanceof RegExp) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (cache, filter) {
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cachedNode);
        cache[key] = null;
      }
    }
  }
}

function pruneCacheEntry (vnode) {
  if (vnode) {
    if (!vnode.componentInstance._inactive) {
      callHook(vnode.componentInstance, 'deactivated');
    }
    vnode.componentInstance.$destroy();
  }
}

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes
  },

  created: function created () {
    this.cache = Object.create(null);
  },

  destroyed: function destroyed () {
    var this$1 = this;

    for (var key in this$1.cache) {
      pruneCacheEntry(this$1.cache[key]);
    }
  },

  watch: {
    include: function include (val) {
      pruneCache(this.cache, function (name) { return matches(val, name); });
    },
    exclude: function exclude (val) {
      pruneCache(this.cache, function (name) { return !matches(val, name); });
    }
  },

  render: function render () {
    var vnode = getFirstComponentChild(this.$slots.default);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      if (name && (
        (this.include && !matches(this.include, name)) ||
        (this.exclude && matches(this.exclude, name))
      )) {
        return vnode
      }
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (this.cache[key]) {
        vnode.componentInstance = this.cache[key].componentInstance;
      } else {
        this.cache[key] = vnode;
      }
      vnode.data.keepAlive = true;
    }
    return vnode
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  config._assetTypes.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue$3);

Object.defineProperty(Vue$3.prototype, '$isServer', {
  get: isServerRendering
});

Vue$3.version = '2.2.2';

/*  */

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (childNode.componentInstance) {
    childNode = childNode.componentInstance._vnode;
    if (childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return genClassFromData(data)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: child.class
      ? [child.class, parent.class]
      : parent.class
  }
}

function genClassFromData (data) {
  var dynamicClass = data.class;
  var staticClass = data.staticClass;
  if (staticClass || dynamicClass) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  var res = '';
  if (!value) {
    return res
  }
  if (typeof value === 'string') {
    return value
  }
  if (Array.isArray(value)) {
    var stringified;
    for (var i = 0, l = value.length; i < l; i++) {
      if (value[i]) {
        if ((stringified = stringifyClass(value[i]))) {
          res += stringified + ' ';
        }
      }
    }
    return res.slice(0, -1)
  }
  if (isObject(value)) {
    for (var key in value) {
      if (value[key]) { res += key + ' '; }
    }
    return res.slice(0, -1)
  }
  /* istanbul ignore next */
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);

var isPreTag = function (tag) { return tag === 'pre'; };

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      "development" !== 'production' && warn(
        'Cannot find element: ' + el
      );
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setAttribute (node, key, val) {
  node.setAttribute(key, val);
}


var nodeOps = Object.freeze({
	createElement: createElement$1,
	createElementNS: createElementNS,
	createTextNode: createTextNode,
	createComment: createComment,
	insertBefore: insertBefore,
	removeChild: removeChild,
	appendChild: appendChild,
	parentNode: parentNode,
	nextSibling: nextSibling,
	tagName: tagName,
	setTextContent: setTextContent,
	setAttribute: setAttribute
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
};

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!key) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (Array.isArray(refs[key]) && refs[key].indexOf(ref) < 0) {
        refs[key].push(ref);
      } else {
        refs[key] = [ref];
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *

/*
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks$1 = ['create', 'activate', 'update', 'remove', 'destroy'];

function isUndef (s) {
  return s == null
}

function isDef (s) {
  return s != null
}

function sameVnode (vnode1, vnode2) {
  return (
    vnode1.key === vnode2.key &&
    vnode1.tag === vnode2.tag &&
    vnode1.isComment === vnode2.isComment &&
    !vnode1.data === !vnode2.data
  )
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks$1.length; ++i) {
    cbs[hooks$1[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (modules[j][hooks$1[i]] !== undefined) { cbs[hooks$1[i]].push(modules[j][hooks$1[i]]); }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove$$1 () {
      if (--remove$$1.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove$$1.listeners = listeners;
    return remove$$1
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (parent) {
      nodeOps.removeChild(parent, el);
    }
  }

  var inPre = 0;
  function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested) {
    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      {
        if (data && data.pre) {
          inPre++;
        }
        if (
          !inPre &&
          !vnode.ns &&
          !(config.ignoredElements.length && config.ignoredElements.indexOf(tag) > -1) &&
          config.isUnknownElement(tag)
        ) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }
      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if ("development" !== 'production' && data && data.pre) {
        inPre--;
      }
    } else if (vnode.isComment) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isReactivated) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (vnode.data.pendingInsert) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref) {
    if (parent) {
      if (ref) {
        nodeOps.insertBefore(parent, elm, ref);
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (i.create) { i.create(emptyNode, vnode); }
      if (i.insert) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    var ancestor = vnode;
    while (ancestor) {
      if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
        nodeOps.setAttribute(vnode.elm, i, '');
      }
      ancestor = ancestor.parent;
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
        i !== vnode.context &&
        isDef(i = i.$options._scopeId)) {
      nodeOps.setAttribute(vnode.elm, i, '');
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (rm || isDef(vnode.data)) {
      var listeners = cbs.remove.length + 1;
      if (!rm) {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      } else {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, elmToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : null;
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
          newStartVnode = newCh[++newStartIdx];
        } else {
          elmToMove = oldCh[idxInOld];
          /* istanbul ignore if */
          if ("development" !== 'production' && !elmToMove) {
            warn(
              'It seems there are duplicate keys that is causing an update error. ' +
              'Make sure each v-for item has a unique key.'
            );
          }
          if (sameVnode(elmToMove, newStartVnode)) {
            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, newStartVnode.elm, oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          }
        }
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return
    }
    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (vnode.isStatic &&
        oldVnode.isStatic &&
        vnode.key === oldVnode.key &&
        (vnode.isCloned || vnode.isOnce)) {
      vnode.elm = oldVnode.elm;
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }
    var i;
    var data = vnode.data;
    var hasData = isDef(data);
    if (hasData && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }
    var elm = vnode.elm = oldVnode.elm;
    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (hasData && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (hasData) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (initial && vnode.parent) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var bailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  var isRenderedModule = makeMap('attrs,style,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue) {
    {
      if (!assertNodeMatch(elm, vnode)) {
        return false
      }
    }
    vnode.elm = elm;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          var childrenMatch = true;
          var childNode = elm.firstChild;
          for (var i$1 = 0; i$1 < children.length; i$1++) {
            if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue)) {
              childrenMatch = false;
              break
            }
            childNode = childNode.nextSibling;
          }
          // if childNode is not null, it means the actual childNodes list is
          // longer than the virtual children list.
          if (!childrenMatch || childNode) {
            if ("development" !== 'production' &&
                typeof console !== 'undefined' &&
                !bailed) {
              bailed = true;
              console.warn('Parent: ', elm);
              console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
            }
            return false
          }
        }
      }
      if (isDef(data)) {
        for (var key in data) {
          if (!isRenderedModule(key)) {
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode) {
    if (vnode.tag) {
      return (
        vnode.tag.indexOf('vue-component') === 0 ||
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (!vnode) {
      if (oldVnode) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (!oldVnode) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute('server-rendered')) {
            oldVnode.removeAttribute('server-rendered');
            hydrating = true;
          }
          if (hydrating) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }
        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm$1 = nodeOps.parentNode(oldElm);
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm$1,
          nodeOps.nextSibling(oldElm)
        );

        if (vnode.parent) {
          // component root element replaced.
          // update parent placeholder node element, recursively
          var ancestor = vnode.parent;
          while (ancestor) {
            ancestor.elm = vnode.elm;
            ancestor = ancestor.parent;
          }
          if (isPatchable(vnode)) {
            for (var i = 0; i < cbs.create.length; ++i) {
              cbs.create[i](emptyNode, vnode.parent);
            }
          }
        }

        if (parentElm$1 !== null) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
  }
}

var baseModules = [
  ref,
  directives
];

/*  */

function updateAttrs (oldVnode, vnode) {
  if (!oldVnode.data.attrs && !vnode.data.attrs) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (attrs.__ob__) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  /* istanbul ignore if */
  if (isIE9 && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (attrs[key] == null) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, key);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, value);
    }
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (!data.staticClass && !data.class &&
      (!oldData || (!oldData.staticClass && !oldData.class))) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (transitionClass) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};

/*  */

var validDivisionCharRE = /[\w).+\-_$\]]/;

function parseFilters (exp) {
  var inSingle = false;
  var inDouble = false;
  var inTemplateString = false;
  var inRegex = false;
  var curly = 0;
  var square = 0;
  var paren = 0;
  var lastFilterIndex = 0;
  var c, prev, i, expression, filters;

  for (i = 0; i < exp.length; i++) {
    prev = c;
    c = exp.charCodeAt(i);
    if (inSingle) {
      if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
    } else if (inDouble) {
      if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
    } else if (inTemplateString) {
      if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
    } else if (inRegex) {
      if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
    } else if (
      c === 0x7C && // pipe
      exp.charCodeAt(i + 1) !== 0x7C &&
      exp.charCodeAt(i - 1) !== 0x7C &&
      !curly && !square && !paren
    ) {
      if (expression === undefined) {
        // first filter, end of expression
        lastFilterIndex = i + 1;
        expression = exp.slice(0, i).trim();
      } else {
        pushFilter();
      }
    } else {
      switch (c) {
        case 0x22: inDouble = true; break         // "
        case 0x27: inSingle = true; break         // '
        case 0x60: inTemplateString = true; break // `
        case 0x28: paren++; break                 // (
        case 0x29: paren--; break                 // )
        case 0x5B: square++; break                // [
        case 0x5D: square--; break                // ]
        case 0x7B: curly++; break                 // {
        case 0x7D: curly--; break                 // }
      }
      if (c === 0x2f) { // /
        var j = i - 1;
        var p = (void 0);
        // find first non-whitespace prev char
        for (; j >= 0; j--) {
          p = exp.charAt(j);
          if (p !== ' ') { break }
        }
        if (!p || !validDivisionCharRE.test(p)) {
          inRegex = true;
        }
      }
    }
  }

  if (expression === undefined) {
    expression = exp.slice(0, i).trim();
  } else if (lastFilterIndex !== 0) {
    pushFilter();
  }

  function pushFilter () {
    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
    lastFilterIndex = i + 1;
  }

  if (filters) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i]);
    }
  }

  return expression
}

function wrapFilter (exp, filter) {
  var i = filter.indexOf('(');
  if (i < 0) {
    // _f: resolveFilter
    return ("_f(\"" + filter + "\")(" + exp + ")")
  } else {
    var name = filter.slice(0, i);
    var args = filter.slice(i + 1);
    return ("_f(\"" + name + "\")(" + exp + "," + args)
  }
}

/*  */

function baseWarn (msg) {
  console.error(("[Vue compiler]: " + msg));
}

function pluckModuleFunction (
  modules,
  key
) {
  return modules
    ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
    : []
}

function addProp (el, name, value) {
  (el.props || (el.props = [])).push({ name: name, value: value });
}

function addAttr (el, name, value) {
  (el.attrs || (el.attrs = [])).push({ name: name, value: value });
}

function addDirective (
  el,
  name,
  rawName,
  value,
  arg,
  modifiers
) {
  (el.directives || (el.directives = [])).push({ name: name, rawName: rawName, value: value, arg: arg, modifiers: modifiers });
}

function addHandler (
  el,
  name,
  value,
  modifiers,
  important
) {
  // check capture modifier
  if (modifiers && modifiers.capture) {
    delete modifiers.capture;
    name = '!' + name; // mark the event as captured
  }
  if (modifiers && modifiers.once) {
    delete modifiers.once;
    name = '~' + name; // mark the event as once
  }
  var events;
  if (modifiers && modifiers.native) {
    delete modifiers.native;
    events = el.nativeEvents || (el.nativeEvents = {});
  } else {
    events = el.events || (el.events = {});
  }
  var newHandler = { value: value, modifiers: modifiers };
  var handlers = events[name];
  /* istanbul ignore if */
  if (Array.isArray(handlers)) {
    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
  } else if (handlers) {
    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
  } else {
    events[name] = newHandler;
  }
}

function getBindingAttr (
  el,
  name,
  getStatic
) {
  var dynamicValue =
    getAndRemoveAttr(el, ':' + name) ||
    getAndRemoveAttr(el, 'v-bind:' + name);
  if (dynamicValue != null) {
    return parseFilters(dynamicValue)
  } else if (getStatic !== false) {
    var staticValue = getAndRemoveAttr(el, name);
    if (staticValue != null) {
      return JSON.stringify(staticValue)
    }
  }
}

function getAndRemoveAttr (el, name) {
  var val;
  if ((val = el.attrsMap[name]) != null) {
    var list = el.attrsList;
    for (var i = 0, l = list.length; i < l; i++) {
      if (list[i].name === name) {
        list.splice(i, 1);
        break
      }
    }
  }
  return val
}

/*  */

/**
 * Cross-platform code generation for component v-model
 */
function genComponentModel (
  el,
  value,
  modifiers
) {
  var ref = modifiers || {};
  var number = ref.number;
  var trim = ref.trim;

  var baseValueExpression = '$$v';
  var valueExpression = baseValueExpression;
  if (trim) {
    valueExpression =
      "(typeof " + baseValueExpression + " === 'string'" +
        "? " + baseValueExpression + ".trim()" +
        ": " + baseValueExpression + ")";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }
  var assignment = genAssignmentCode(value, valueExpression);

  el.model = {
    value: ("(" + value + ")"),
    expression: ("\"" + value + "\""),
    callback: ("function (" + baseValueExpression + ") {" + assignment + "}")
  };
}

/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */
function genAssignmentCode (
  value,
  assignment
) {
  var modelRs = parseModel(value);
  if (modelRs.idx === null) {
    return (value + "=" + assignment)
  } else {
    return "var $$exp = " + (modelRs.exp) + ", $$idx = " + (modelRs.idx) + ";" +
      "if (!Array.isArray($$exp)){" +
        value + "=" + assignment + "}" +
      "else{$$exp.splice($$idx, 1, " + assignment + ")}"
  }
}

/**
 * parse directive model to do the array update transform. a[idx] = val => $$a.splice($$idx, 1, val)
 *
 * for loop possible cases:
 *
 * - test
 * - test[idx]
 * - test[test1[idx]]
 * - test["a"][idx]
 * - xxx.test[a[a].test1[idx]]
 * - test.xxx.a["asa"][test1[idx]]
 *
 */

var len;
var str;
var chr;
var index$1;
var expressionPos;
var expressionEndPos;

function parseModel (val) {
  str = val;
  len = str.length;
  index$1 = expressionPos = expressionEndPos = 0;

  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
    return {
      exp: val,
      idx: null
    }
  }

  while (!eof()) {
    chr = next();
    /* istanbul ignore if */
    if (isStringStart(chr)) {
      parseString(chr);
    } else if (chr === 0x5B) {
      parseBracket(chr);
    }
  }

  return {
    exp: val.substring(0, expressionPos),
    idx: val.substring(expressionPos + 1, expressionEndPos)
  }
}

function next () {
  return str.charCodeAt(++index$1)
}

function eof () {
  return index$1 >= len
}

function isStringStart (chr) {
  return chr === 0x22 || chr === 0x27
}

function parseBracket (chr) {
  var inBracket = 1;
  expressionPos = index$1;
  while (!eof()) {
    chr = next();
    if (isStringStart(chr)) {
      parseString(chr);
      continue
    }
    if (chr === 0x5B) { inBracket++; }
    if (chr === 0x5D) { inBracket--; }
    if (inBracket === 0) {
      expressionEndPos = index$1;
      break
    }
  }
}

function parseString (chr) {
  var stringQuote = chr;
  while (!eof()) {
    chr = next();
    if (chr === stringQuote) {
      break
    }
  }
}

/*  */

var warn$1;

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

function model (
  el,
  dir,
  _warn
) {
  warn$1 = _warn;
  var value = dir.value;
  var modifiers = dir.modifiers;
  var tag = el.tag;
  var type = el.attrsMap.type;

  {
    var dynamicType = el.attrsMap['v-bind:type'] || el.attrsMap[':type'];
    if (tag === 'input' && dynamicType) {
      warn$1(
        "<input :type=\"" + dynamicType + "\" v-model=\"" + value + "\">:\n" +
        "v-model does not support dynamic input types. Use v-if branches instead."
      );
    }
    // inputs with type="file" are read only and setting the input's
    // value will throw an error.
    if (tag === 'input' && type === 'file') {
      warn$1(
        "<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
        "File inputs are read only. Use a v-on:change listener instead."
      );
    }
  }

  if (tag === 'select') {
    genSelect(el, value, modifiers);
  } else if (tag === 'input' && type === 'checkbox') {
    genCheckboxModel(el, value, modifiers);
  } else if (tag === 'input' && type === 'radio') {
    genRadioModel(el, value, modifiers);
  } else if (tag === 'input' || tag === 'textarea') {
    genDefaultModel(el, value, modifiers);
  } else if (!config.isReservedTag(tag)) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else {
    warn$1(
      "<" + (el.tag) + " v-model=\"" + value + "\">: " +
      "v-model is not supported on this element type. " +
      'If you are working with contenteditable, it\'s recommended to ' +
      'wrap a library dedicated for that purpose inside a custom component.'
    );
  }

  // ensure runtime directive metadata
  return true
}

function genCheckboxModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
  var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
  addProp(el, 'checked',
    "Array.isArray(" + value + ")" +
      "?_i(" + value + "," + valueBinding + ")>-1" + (
        trueValueBinding === 'true'
          ? (":(" + value + ")")
          : (":_q(" + value + "," + trueValueBinding + ")")
      )
  );
  addHandler(el, CHECKBOX_RADIO_TOKEN,
    "var $$a=" + value + "," +
        '$$el=$event.target,' +
        "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
    'if(Array.isArray($$a)){' +
      "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
          '$$i=_i($$a,$$v);' +
      "if($$c){$$i<0&&(" + value + "=$$a.concat($$v))}" +
      "else{$$i>-1&&(" + value + "=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}" +
    "}else{" + value + "=$$c}",
    null, true
  );
}

function genRadioModel (
    el,
    value,
    modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
  addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
  addHandler(el, CHECKBOX_RADIO_TOKEN, genAssignmentCode(value, valueBinding), null, true);
}

function genSelect (
    el,
    value,
    modifiers
) {
  var number = modifiers && modifiers.number;
  var selectedVal = "Array.prototype.filter" +
    ".call($event.target.options,function(o){return o.selected})" +
    ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
    "return " + (number ? '_n(val)' : 'val') + "})";

  var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
  var code = "var $$selectedVal = " + selectedVal + ";";
  code = code + " " + (genAssignmentCode(value, assignment));
  addHandler(el, 'change', code, null, true);
}

function genDefaultModel (
  el,
  value,
  modifiers
) {
  var type = el.attrsMap.type;
  var ref = modifiers || {};
  var lazy = ref.lazy;
  var number = ref.number;
  var trim = ref.trim;
  var needCompositionGuard = !lazy && type !== 'range';
  var event = lazy
    ? 'change'
    : type === 'range'
      ? RANGE_TOKEN
      : 'input';

  var valueExpression = '$event.target.value';
  if (trim) {
    valueExpression = "$event.target.value.trim()";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }

  var code = genAssignmentCode(value, valueExpression);
  if (needCompositionGuard) {
    code = "if($event.target.composing)return;" + code;
  }

  addProp(el, 'value', ("(" + value + ")"));
  addHandler(el, event, code, null, true);
  if (trim || number || type === 'number') {
    addHandler(el, 'blur', '$forceUpdate()');
  }
}

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents (on) {
  var event;
  /* istanbul ignore if */
  if (on[RANGE_TOKEN]) {
    // IE input[type=range] only supports `change` event
    event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  if (on[CHECKBOX_RADIO_TOKEN]) {
    // Chrome fires microtasks in between click/change, leads to #4521
    event = isChrome ? 'click' : 'change';
    on[event] = [].concat(on[CHECKBOX_RADIO_TOKEN], on[event] || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function add$1 (
  event,
  handler,
  once,
  capture
) {
  if (once) {
    var oldHandler = handler;
    var _target = target$1; // save current target element in closure
    handler = function (ev) {
      var res = arguments.length === 1
        ? oldHandler(ev)
        : oldHandler.apply(null, arguments);
      if (res !== null) {
        remove$2(event, handler, capture, _target);
      }
    };
  }
  target$1.addEventListener(event, handler, capture);
}

function remove$2 (
  event,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(event, handler, capture);
}

function updateDOMListeners (oldVnode, vnode) {
  if (!oldVnode.data.on && !vnode.data.on) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

function updateDOMProps (oldVnode, vnode) {
  if (!oldVnode.data.domProps && !vnode.data.domProps) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (props.__ob__) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (props[key] == null) {
      elm[key] = '';
    }
  }
  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
    }

    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = cur == null ? '' : String(cur);
      if (shouldUpdateValue(elm, vnode, strCur)) {
        elm.value = strCur;
      }
    } else {
      elm[key] = cur;
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (
  elm,
  vnode,
  checkVal
) {
  return (!elm.composing && (
    vnode.tag === 'option' ||
    isDirty(elm, checkVal) ||
    isInputChanged(elm, checkVal)
  ))
}

function isDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is not equal to the updated value
  return document.activeElement !== elm && elm.value !== checkVal
}

function isInputChanged (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if ((modifiers && modifiers.number) || elm.type === 'number') {
    return toNumber(value) !== toNumber(newVal)
  }
  if (modifiers && modifiers.trim) {
    return value.trim() !== newVal.trim()
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (childNode.data && (styleData = normalizeStyleData(childNode.data))) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
  } else {
    el.style[normalize(name)] = val;
  }
};

var prefixes = ['Webkit', 'Moz', 'ms'];

var testEl;
var normalize = cached(function (prop) {
  testEl = testEl || document.createElement('div');
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in testEl.style)) {
    return prop
  }
  var upper = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < prefixes.length; i++) {
    var prefixed = prefixes[i] + upper;
    if (prefixed in testEl.style) {
      return prefixed
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (!data.staticStyle && !data.style &&
      !oldData.staticStyle && !oldData.style) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldVnode.data.staticStyle;
  var oldStyleBinding = oldVnode.data.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  vnode.data.style = style.__ob__ ? extend({}, style) : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (newStyle[name] == null) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};

/*  */

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    el.setAttribute('class', cur.trim());
  }
}

/*  */

function resolveTransition (def$$1) {
  if (!def$$1) {
    return
  }
  /* istanbul ignore else */
  if (typeof def$$1 === 'object') {
    var res = {};
    if (def$$1.css !== false) {
      extend(res, autoCssTransition(def$$1.name || 'v'));
    }
    extend(res, def$$1);
    return res
  } else if (typeof def$$1 === 'string') {
    return autoCssTransition(def$$1)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveClass: (name + "-leave"),
    leaveToClass: (name + "-leave-to"),
    leaveActiveClass: (name + "-leave-active")
  }
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser && window.requestAnimationFrame
  ? window.requestAnimationFrame.bind(window)
  : setTimeout;

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  (el._transitionClasses || (el._transitionClasses = [])).push(cls);
  addClass(el, cls);
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = styles[animationProp + 'Delay'].split(', ');
  var animationDurations = styles[animationProp + 'Duration'].split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

function toMs (s) {
  return Number(s.slice(0, -1)) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (el._leaveCb) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (!data) {
    return
  }

  /* istanbul ignore if */
  if (el._enterCb || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    transitionNode = transitionNode.parent;
    context = transitionNode.context;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear && appearClass
    ? appearClass
    : enterClass;
  var activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass;
  var toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass;

  var beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter;
  var enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter;
  var afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter;
  var enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled;

  var explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  );

  if ("development" !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
          pendingNode.tag === vnode.tag &&
          pendingNode.elm._leaveCb) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      addTransitionClass(el, toClass);
      removeTransitionClass(el, startClass);
      if (!cb.cancelled && !userWantsControl) {
        if (isValidDuration(explicitEnterDuration)) {
          setTimeout(cb, explicitEnterDuration);
        } else {
          whenTransitionEnds(el, type, cb);
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (el._enterCb) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (!data) {
    return rm()
  }

  /* istanbul ignore if */
  if (el._leaveCb || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  if ("development" !== 'production' && explicitLeaveDuration != null) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        addTransitionClass(el, leaveToClass);
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled && !userWantsControl) {
          if (isValidDuration(explicitLeaveDuration)) {
            setTimeout(cb, explicitLeaveDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration (val, name, vnode) {
  if (typeof val !== 'number') {
    warn(
      "<transition> explicit " + name + " duration is not a valid number - " +
      "got " + (JSON.stringify(val)) + ".",
      vnode.context
    );
  } else if (isNaN(val)) {
    warn(
      "<transition> explicit " + name + " duration is NaN - " +
      'the duration expression might be incorrect.',
      vnode.context
    );
  }
}

function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength (fn) {
  if (!fn) { return false }
  var invokerFns = fn.fns;
  if (invokerFns) {
    // invoker
    return getHookArgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
  }
}

function _enter (_, vnode) {
  if (!vnode.data.show) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1 (vnode, rm) {
    /* istanbul ignore else */
    if (!vnode.data.show) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var model$1 = {
  inserted: function inserted (el, binding, vnode) {
    if (vnode.tag === 'select') {
      var cb = function () {
        setSelected(el, binding, vnode.context);
      };
      cb();
      /* istanbul ignore if */
      if (isIE || isEdge) {
        setTimeout(cb, 0);
      }
    } else if (vnode.tag === 'textarea' || el.type === 'text') {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        if (!isAndroid) {
          el.addEventListener('compositionstart', onCompositionStart);
          el.addEventListener('compositionend', onCompositionEnd);
        }
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },
  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var needReset = el.multiple
        ? binding.value.some(function (v) { return hasNoMatchingOption(v, el.options); })
        : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, el.options);
      if (needReset) {
        trigger(el, 'change');
      }
    }
  }
};

function setSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    "development" !== 'production' && warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  for (var i = 0, l = options.length; i < l; i++) {
    if (looseEqual(getValue(options[i]), value)) {
      return false
    }
  }
  return true
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition && !isIE9) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (value === oldValue) { return }
    vnode = locateNode(vnode);
    var transition = vnode.data && vnode.data.transition;
    if (transition && !isIE9) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: model$1,
  show: show
};

/*  */

// Provides transition support for a single element/component.
// supports transition mode (out-in / in-out)

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data
}

function placeholder (h, rawChild) {
  return /\d-keep-alive$/.test(rawChild.tag)
    ? h('keep-alive')
    : null
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(function (c) { return c.tag; });
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if ("development" !== 'production' && children.length > 1) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if ("development" !== 'production' &&
        mode && mode !== 'in-out' && mode !== 'out-in') {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    child.key = child.key == null
      ? id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
      child.data.show = true;
    }

    if (oldChild && oldChild.data && !isSameChild(child, oldChild)) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild && (oldChild.data.transition = extend({}, data));
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
      }
    }

    return rawChild
  }
};

/*  */

// Provides transition support for list items.
// supports move transitions using the FLIP technique.

// Because the vdom's children update algorithm is "unstable" - i.e.
// it doesn't guarantee the relative positioning of removed elements,
// we force transition-group to update its children into two passes:
// in the first pass, we remove all nodes that need to be removed,
// triggering their leaving transition; in the second pass, we insert/move
// into the final desired state. This way in the second pass removed
// nodes will remain where they should be.

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else {
          var opts = c.componentOptions;
          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
          warn(("<transition-group> children must be keyed: <" + name + ">"));
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  beforeUpdate: function beforeUpdate () {
    // force removing pass
    this.__patch__(
      this._vnode,
      this.kept,
      false, // hydrating
      true // removeOnly (!important, avoids unnecessary moves)
    );
    this._vnode = this.kept;
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    var body = document.body;
    var f = body.offsetHeight; // eslint-disable-line

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      if (this._hasMove != null) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return (this._hasMove = info.hasTransform)
    }
  }
};

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

/*  */

// install platform specific utils
Vue$3.config.mustUseProp = mustUseProp;
Vue$3.config.isReservedTag = isReservedTag;
Vue$3.config.getTagNamespace = getTagNamespace;
Vue$3.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue$3.options.directives, platformDirectives);
extend(Vue$3.options.components, platformComponents);

// install platform patch function
Vue$3.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue$3.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
setTimeout(function () {
  if (config.devtools) {
    if (devtools) {
      devtools.emit('init', Vue$3);
    } else if ("development" !== 'production' && isChrome) {
      console[console.info ? 'info' : 'log'](
        'Download the Vue Devtools extension for a better development experience:\n' +
        'https://github.com/vuejs/vue-devtools'
      );
    }
  }
  if ("development" !== 'production' &&
      config.productionTip !== false &&
      inBrowser && typeof console !== 'undefined') {
    console[console.info ? 'info' : 'log'](
      "You are running Vue in development mode.\n" +
      "Make sure to turn on production mode when deploying for production.\n" +
      "See more tips at https://vuejs.org/guide/deployment.html"
    );
  }
}, 0);

/*  */

// check whether current browser encodes a char inside attribute values
function shouldDecode (content, encoded) {
  var div = document.createElement('div');
  div.innerHTML = "<div a=\"" + content + "\">";
  return div.innerHTML.indexOf(encoded) > 0
}

// #3663
// IE encodes newlines inside attribute values while other browsers don't
var shouldDecodeNewlines = inBrowser ? shouldDecode('\n', '&#10;') : false;

/*  */

var isUnaryTag = makeMap(
  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
  'link,meta,param,source,track,wbr'
);

// Elements that you can, intentionally, leave open
// (and which close themselves)
var canBeLeftOpenTag = makeMap(
  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source'
);

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
var isNonPhrasingTag = makeMap(
  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
  'title,tr,track'
);

/*  */

var decoder;

function decode (html) {
  decoder = decoder || document.createElement('div');
  decoder.innerHTML = html;
  return decoder.textContent
}

/**
 * Not type-checking this file because it's mostly vendor code.
 */

/*!
 * HTML Parser By John Resig (ejohn.org)
 * Modified by Juriy "kangax" Zaytsev
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 */

// Regular Expressions for parsing tags and attributes
var singleAttrIdentifier = /([^\s"'<>/=]+)/;
var singleAttrAssign = /(?:=)/;
var singleAttrValues = [
  // attr value double quotes
  /"([^"]*)"+/.source,
  // attr value, single quotes
  /'([^']*)'+/.source,
  // attr value, no quotes
  /([^\s"'=<>`]+)/.source
];
var attribute = new RegExp(
  '^\\s*' + singleAttrIdentifier.source +
  '(?:\\s*(' + singleAttrAssign.source + ')' +
  '\\s*(?:' + singleAttrValues.join('|') + '))?'
);

// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
// but for Vue templates we can enforce a simple charset
var ncname = '[a-zA-Z_][\\w\\-\\.]*';
var qnameCapture = '((?:' + ncname + '\\:)?' + ncname + ')';
var startTagOpen = new RegExp('^<' + qnameCapture);
var startTagClose = /^\s*(\/?)>/;
var endTag = new RegExp('^<\\/' + qnameCapture + '[^>]*>');
var doctype = /^<!DOCTYPE [^>]+>/i;
var comment = /^<!--/;
var conditionalComment = /^<!\[/;

var IS_REGEX_CAPTURING_BROKEN = false;
'x'.replace(/x(.)?/g, function (m, g) {
  IS_REGEX_CAPTURING_BROKEN = g === '';
});

// Special Elements (can contain anything)
var isScriptOrStyle = makeMap('script,style', true);
var reCache = {};

var decodingMap = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&amp;': '&',
  '&#10;': '\n'
};
var encodedAttr = /&(?:lt|gt|quot|amp);/g;
var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#10);/g;

function decodeAttr (value, shouldDecodeNewlines) {
  var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
  return value.replace(re, function (match) { return decodingMap[match]; })
}

function parseHTML (html, options) {
  var stack = [];
  var expectHTML = options.expectHTML;
  var isUnaryTag$$1 = options.isUnaryTag || no;
  var index = 0;
  var last, lastTag;
  while (html) {
    last = html;
    // Make sure we're not in a script or style element
    if (!lastTag || !isScriptOrStyle(lastTag)) {
      var textEnd = html.indexOf('<');
      if (textEnd === 0) {
        // Comment:
        if (comment.test(html)) {
          var commentEnd = html.indexOf('-->');

          if (commentEnd >= 0) {
            advance(commentEnd + 3);
            continue
          }
        }

        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
        if (conditionalComment.test(html)) {
          var conditionalEnd = html.indexOf(']>');

          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2);
            continue
          }
        }

        // Doctype:
        var doctypeMatch = html.match(doctype);
        if (doctypeMatch) {
          advance(doctypeMatch[0].length);
          continue
        }

        // End tag:
        var endTagMatch = html.match(endTag);
        if (endTagMatch) {
          var curIndex = index;
          advance(endTagMatch[0].length);
          parseEndTag(endTagMatch[1], curIndex, index);
          continue
        }

        // Start tag:
        var startTagMatch = parseStartTag();
        if (startTagMatch) {
          handleStartTag(startTagMatch);
          continue
        }
      }

      var text = (void 0), rest$1 = (void 0), next = (void 0);
      if (textEnd >= 0) {
        rest$1 = html.slice(textEnd);
        while (
          !endTag.test(rest$1) &&
          !startTagOpen.test(rest$1) &&
          !comment.test(rest$1) &&
          !conditionalComment.test(rest$1)
        ) {
          // < in plain text, be forgiving and treat it as text
          next = rest$1.indexOf('<', 1);
          if (next < 0) { break }
          textEnd += next;
          rest$1 = html.slice(textEnd);
        }
        text = html.substring(0, textEnd);
        advance(textEnd);
      }

      if (textEnd < 0) {
        text = html;
        html = '';
      }

      if (options.chars && text) {
        options.chars(text);
      }
    } else {
      var stackedTag = lastTag.toLowerCase();
      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
      var endTagLength = 0;
      var rest = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength = endTag.length;
        if (stackedTag !== 'script' && stackedTag !== 'style' && stackedTag !== 'noscript') {
          text = text
            .replace(/<!--([\s\S]*?)-->/g, '$1')
            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
        }
        if (options.chars) {
          options.chars(text);
        }
        return ''
      });
      index += html.length - rest.length;
      html = rest;
      parseEndTag(stackedTag, index - endTagLength, index);
    }

    if (html === last) {
      options.chars && options.chars(html);
      if ("development" !== 'production' && !stack.length && options.warn) {
        options.warn(("Mal-formatted tag at end of template: \"" + html + "\""));
      }
      break
    }
  }

  // Clean up any remaining tags
  parseEndTag();

  function advance (n) {
    index += n;
    html = html.substring(n);
  }

  function parseStartTag () {
    var start = html.match(startTagOpen);
    if (start) {
      var match = {
        tagName: start[1],
        attrs: [],
        start: index
      };
      advance(start[0].length);
      var end, attr;
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        advance(attr[0].length);
        match.attrs.push(attr);
      }
      if (end) {
        match.unarySlash = end[1];
        advance(end[0].length);
        match.end = index;
        return match
      }
    }
  }

  function handleStartTag (match) {
    var tagName = match.tagName;
    var unarySlash = match.unarySlash;

    if (expectHTML) {
      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
        parseEndTag(lastTag);
      }
      if (canBeLeftOpenTag(tagName) && lastTag === tagName) {
        parseEndTag(tagName);
      }
    }

    var unary = isUnaryTag$$1(tagName) || tagName === 'html' && lastTag === 'head' || !!unarySlash;

    var l = match.attrs.length;
    var attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      var args = match.attrs[i];
      // hackish work around FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=369778
      if (IS_REGEX_CAPTURING_BROKEN && args[0].indexOf('""') === -1) {
        if (args[3] === '') { delete args[3]; }
        if (args[4] === '') { delete args[4]; }
        if (args[5] === '') { delete args[5]; }
      }
      var value = args[3] || args[4] || args[5] || '';
      attrs[i] = {
        name: args[1],
        value: decodeAttr(
          value,
          options.shouldDecodeNewlines
        )
      };
    }

    if (!unary) {
      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs });
      lastTag = tagName;
    }

    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end);
    }
  }

  function parseEndTag (tagName, start, end) {
    var pos, lowerCasedTagName;
    if (start == null) { start = index; }
    if (end == null) { end = index; }

    if (tagName) {
      lowerCasedTagName = tagName.toLowerCase();
    }

    // Find the closest opened tag of the same type
    if (tagName) {
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          break
        }
      }
    } else {
      // If no tag name is provided, clean shop
      pos = 0;
    }

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i--) {
        if ("development" !== 'production' &&
            (i > pos || !tagName) &&
            options.warn) {
          options.warn(
            ("tag <" + (stack[i].tag) + "> has no matching end tag.")
          );
        }
        if (options.end) {
          options.end(stack[i].tag, start, end);
        }
      }

      // Remove the open elements from the stack
      stack.length = pos;
      lastTag = pos && stack[pos - 1].tag;
    } else if (lowerCasedTagName === 'br') {
      if (options.start) {
        options.start(tagName, [], true, start, end);
      }
    } else if (lowerCasedTagName === 'p') {
      if (options.start) {
        options.start(tagName, [], false, start, end);
      }
      if (options.end) {
        options.end(tagName, start, end);
      }
    }
  }
}

/*  */

var defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;
var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

var buildRegex = cached(function (delimiters) {
  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
});

function parseText (
  text,
  delimiters
) {
  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
  if (!tagRE.test(text)) {
    return
  }
  var tokens = [];
  var lastIndex = tagRE.lastIndex = 0;
  var match, index;
  while ((match = tagRE.exec(text))) {
    index = match.index;
    // push text token
    if (index > lastIndex) {
      tokens.push(JSON.stringify(text.slice(lastIndex, index)));
    }
    // tag token
    var exp = parseFilters(match[1].trim());
    tokens.push(("_s(" + exp + ")"));
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) {
    tokens.push(JSON.stringify(text.slice(lastIndex)));
  }
  return tokens.join('+')
}

/*  */

var dirRE = /^v-|^@|^:/;
var onRE = /^@|^v-on:/;
var forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/;
var forIteratorRE = /\((\{[^}]*\}|[^,]*),([^,]*)(?:,([^,]*))?\)/;
var bindRE = /^:|^v-bind:/;
var argRE = /:(.*)$/;
var modifierRE = /\.[^.]+/g;

var decodeHTMLCached = cached(decode);

// configurable state
var warn$2;
var platformGetTagNamespace;
var platformMustUseProp;
var platformIsPreTag;
var preTransforms;
var transforms;
var postTransforms;
var delimiters;

/**
 * Convert HTML string to AST.
 */
function parse (
  template,
  options
) {
  warn$2 = options.warn || baseWarn;
  platformGetTagNamespace = options.getTagNamespace || no;
  platformMustUseProp = options.mustUseProp || no;
  platformIsPreTag = options.isPreTag || no;
  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
  transforms = pluckModuleFunction(options.modules, 'transformNode');
  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');
  delimiters = options.delimiters;

  var stack = [];
  var preserveWhitespace = options.preserveWhitespace !== false;
  var root;
  var currentParent;
  var inVPre = false;
  var inPre = false;
  var warned = false;

  function endPre (element) {
    // check pre state
    if (element.pre) {
      inVPre = false;
    }
    if (platformIsPreTag(element.tag)) {
      inPre = false;
    }
  }

  parseHTML(template, {
    warn: warn$2,
    expectHTML: options.expectHTML,
    isUnaryTag: options.isUnaryTag,
    shouldDecodeNewlines: options.shouldDecodeNewlines,
    start: function start (tag, attrs, unary) {
      // check namespace.
      // inherit parent ns if there is one
      var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);

      // handle IE svg bug
      /* istanbul ignore if */
      if (isIE && ns === 'svg') {
        attrs = guardIESVGBug(attrs);
      }

      var element = {
        type: 1,
        tag: tag,
        attrsList: attrs,
        attrsMap: makeAttrsMap(attrs),
        parent: currentParent,
        children: []
      };
      if (ns) {
        element.ns = ns;
      }

      if (isForbiddenTag(element) && !isServerRendering()) {
        element.forbidden = true;
        "development" !== 'production' && warn$2(
          'Templates should only be responsible for mapping the state to the ' +
          'UI. Avoid placing tags with side-effects in your templates, such as ' +
          "<" + tag + ">" + ', as they will not be parsed.'
        );
      }

      // apply pre-transforms
      for (var i = 0; i < preTransforms.length; i++) {
        preTransforms[i](element, options);
      }

      if (!inVPre) {
        processPre(element);
        if (element.pre) {
          inVPre = true;
        }
      }
      if (platformIsPreTag(element.tag)) {
        inPre = true;
      }
      if (inVPre) {
        processRawAttrs(element);
      } else {
        processFor(element);
        processIf(element);
        processOnce(element);
        processKey(element);

        // determine whether this is a plain element after
        // removing structural attributes
        element.plain = !element.key && !attrs.length;

        processRef(element);
        processSlot(element);
        processComponent(element);
        for (var i$1 = 0; i$1 < transforms.length; i$1++) {
          transforms[i$1](element, options);
        }
        processAttrs(element);
      }

      function checkRootConstraints (el) {
        if ("development" !== 'production' && !warned) {
          if (el.tag === 'slot' || el.tag === 'template') {
            warned = true;
            warn$2(
              "Cannot use <" + (el.tag) + "> as component root element because it may " +
              'contain multiple nodes.'
            );
          }
          if (el.attrsMap.hasOwnProperty('v-for')) {
            warned = true;
            warn$2(
              'Cannot use v-for on stateful component root element because ' +
              'it renders multiple elements.'
            );
          }
        }
      }

      // tree management
      if (!root) {
        root = element;
        checkRootConstraints(root);
      } else if (!stack.length) {
        // allow root elements with v-if, v-else-if and v-else
        if (root.if && (element.elseif || element.else)) {
          checkRootConstraints(element);
          addIfCondition(root, {
            exp: element.elseif,
            block: element
          });
        } else if ("development" !== 'production' && !warned) {
          warned = true;
          warn$2(
            "Component template should contain exactly one root element. " +
            "If you are using v-if on multiple elements, " +
            "use v-else-if to chain them instead."
          );
        }
      }
      if (currentParent && !element.forbidden) {
        if (element.elseif || element.else) {
          processIfConditions(element, currentParent);
        } else if (element.slotScope) { // scoped slot
          currentParent.plain = false;
          var name = element.slotTarget || '"default"';(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
        } else {
          currentParent.children.push(element);
          element.parent = currentParent;
        }
      }
      if (!unary) {
        currentParent = element;
        stack.push(element);
      } else {
        endPre(element);
      }
      // apply post-transforms
      for (var i$2 = 0; i$2 < postTransforms.length; i$2++) {
        postTransforms[i$2](element, options);
      }
    },

    end: function end () {
      // remove trailing whitespace
      var element = stack[stack.length - 1];
      var lastNode = element.children[element.children.length - 1];
      if (lastNode && lastNode.type === 3 && lastNode.text === ' ' && !inPre) {
        element.children.pop();
      }
      // pop stack
      stack.length -= 1;
      currentParent = stack[stack.length - 1];
      endPre(element);
    },

    chars: function chars (text) {
      if (!currentParent) {
        if ("development" !== 'production' && !warned && text === template) {
          warned = true;
          warn$2(
            'Component template requires a root element, rather than just text.'
          );
        }
        return
      }
      // IE textarea placeholder bug
      /* istanbul ignore if */
      if (isIE &&
          currentParent.tag === 'textarea' &&
          currentParent.attrsMap.placeholder === text) {
        return
      }
      var children = currentParent.children;
      text = inPre || text.trim()
        ? decodeHTMLCached(text)
        // only preserve whitespace if its not right after a starting tag
        : preserveWhitespace && children.length ? ' ' : '';
      if (text) {
        var expression;
        if (!inVPre && text !== ' ' && (expression = parseText(text, delimiters))) {
          children.push({
            type: 2,
            expression: expression,
            text: text
          });
        } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
          children.push({
            type: 3,
            text: text
          });
        }
      }
    }
  });
  return root
}

function processPre (el) {
  if (getAndRemoveAttr(el, 'v-pre') != null) {
    el.pre = true;
  }
}

function processRawAttrs (el) {
  var l = el.attrsList.length;
  if (l) {
    var attrs = el.attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      attrs[i] = {
        name: el.attrsList[i].name,
        value: JSON.stringify(el.attrsList[i].value)
      };
    }
  } else if (!el.pre) {
    // non root node in pre blocks with no attributes
    el.plain = true;
  }
}

function processKey (el) {
  var exp = getBindingAttr(el, 'key');
  if (exp) {
    if ("development" !== 'production' && el.tag === 'template') {
      warn$2("<template> cannot be keyed. Place the key on real elements instead.");
    }
    el.key = exp;
  }
}

function processRef (el) {
  var ref = getBindingAttr(el, 'ref');
  if (ref) {
    el.ref = ref;
    el.refInFor = checkInFor(el);
  }
}

function processFor (el) {
  var exp;
  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
    var inMatch = exp.match(forAliasRE);
    if (!inMatch) {
      "development" !== 'production' && warn$2(
        ("Invalid v-for expression: " + exp)
      );
      return
    }
    el.for = inMatch[2].trim();
    var alias = inMatch[1].trim();
    var iteratorMatch = alias.match(forIteratorRE);
    if (iteratorMatch) {
      el.alias = iteratorMatch[1].trim();
      el.iterator1 = iteratorMatch[2].trim();
      if (iteratorMatch[3]) {
        el.iterator2 = iteratorMatch[3].trim();
      }
    } else {
      el.alias = alias;
    }
  }
}

function processIf (el) {
  var exp = getAndRemoveAttr(el, 'v-if');
  if (exp) {
    el.if = exp;
    addIfCondition(el, {
      exp: exp,
      block: el
    });
  } else {
    if (getAndRemoveAttr(el, 'v-else') != null) {
      el.else = true;
    }
    var elseif = getAndRemoveAttr(el, 'v-else-if');
    if (elseif) {
      el.elseif = elseif;
    }
  }
}

function processIfConditions (el, parent) {
  var prev = findPrevElement(parent.children);
  if (prev && prev.if) {
    addIfCondition(prev, {
      exp: el.elseif,
      block: el
    });
  } else {
    warn$2(
      "v-" + (el.elseif ? ('else-if="' + el.elseif + '"') : 'else') + " " +
      "used on element <" + (el.tag) + "> without corresponding v-if."
    );
  }
}

function findPrevElement (children) {
  var i = children.length;
  while (i--) {
    if (children[i].type === 1) {
      return children[i]
    } else {
      if ("development" !== 'production' && children[i].text !== ' ') {
        warn$2(
          "text \"" + (children[i].text.trim()) + "\" between v-if and v-else(-if) " +
          "will be ignored."
        );
      }
      children.pop();
    }
  }
}

function addIfCondition (el, condition) {
  if (!el.ifConditions) {
    el.ifConditions = [];
  }
  el.ifConditions.push(condition);
}

function processOnce (el) {
  var once$$1 = getAndRemoveAttr(el, 'v-once');
  if (once$$1 != null) {
    el.once = true;
  }
}

function processSlot (el) {
  if (el.tag === 'slot') {
    el.slotName = getBindingAttr(el, 'name');
    if ("development" !== 'production' && el.key) {
      warn$2(
        "`key` does not work on <slot> because slots are abstract outlets " +
        "and can possibly expand into multiple elements. " +
        "Use the key on a wrapping element instead."
      );
    }
  } else {
    var slotTarget = getBindingAttr(el, 'slot');
    if (slotTarget) {
      el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
    }
    if (el.tag === 'template') {
      el.slotScope = getAndRemoveAttr(el, 'scope');
    }
  }
}

function processComponent (el) {
  var binding;
  if ((binding = getBindingAttr(el, 'is'))) {
    el.component = binding;
  }
  if (getAndRemoveAttr(el, 'inline-template') != null) {
    el.inlineTemplate = true;
  }
}

function processAttrs (el) {
  var list = el.attrsList;
  var i, l, name, rawName, value, arg, modifiers, isProp;
  for (i = 0, l = list.length; i < l; i++) {
    name = rawName = list[i].name;
    value = list[i].value;
    if (dirRE.test(name)) {
      // mark element as dynamic
      el.hasBindings = true;
      // modifiers
      modifiers = parseModifiers(name);
      if (modifiers) {
        name = name.replace(modifierRE, '');
      }
      if (bindRE.test(name)) { // v-bind
        name = name.replace(bindRE, '');
        value = parseFilters(value);
        isProp = false;
        if (modifiers) {
          if (modifiers.prop) {
            isProp = true;
            name = camelize(name);
            if (name === 'innerHtml') { name = 'innerHTML'; }
          }
          if (modifiers.camel) {
            name = camelize(name);
          }
        }
        if (isProp || platformMustUseProp(el.tag, el.attrsMap.type, name)) {
          addProp(el, name, value);
        } else {
          addAttr(el, name, value);
        }
      } else if (onRE.test(name)) { // v-on
        name = name.replace(onRE, '');
        addHandler(el, name, value, modifiers);
      } else { // normal directives
        name = name.replace(dirRE, '');
        // parse arg
        var argMatch = name.match(argRE);
        if (argMatch && (arg = argMatch[1])) {
          name = name.slice(0, -(arg.length + 1));
        }
        addDirective(el, name, rawName, value, arg, modifiers);
        if ("development" !== 'production' && name === 'model') {
          checkForAliasModel(el, value);
        }
      }
    } else {
      // literal attribute
      {
        var expression = parseText(value, delimiters);
        if (expression) {
          warn$2(
            name + "=\"" + value + "\": " +
            'Interpolation inside attributes has been removed. ' +
            'Use v-bind or the colon shorthand instead. For example, ' +
            'instead of <div id="{{ val }}">, use <div :id="val">.'
          );
        }
      }
      addAttr(el, name, JSON.stringify(value));
    }
  }
}

function checkInFor (el) {
  var parent = el;
  while (parent) {
    if (parent.for !== undefined) {
      return true
    }
    parent = parent.parent;
  }
  return false
}

function parseModifiers (name) {
  var match = name.match(modifierRE);
  if (match) {
    var ret = {};
    match.forEach(function (m) { ret[m.slice(1)] = true; });
    return ret
  }
}

function makeAttrsMap (attrs) {
  var map = {};
  for (var i = 0, l = attrs.length; i < l; i++) {
    if ("development" !== 'production' && map[attrs[i].name] && !isIE) {
      warn$2('duplicate attribute: ' + attrs[i].name);
    }
    map[attrs[i].name] = attrs[i].value;
  }
  return map
}

function isForbiddenTag (el) {
  return (
    el.tag === 'style' ||
    (el.tag === 'script' && (
      !el.attrsMap.type ||
      el.attrsMap.type === 'text/javascript'
    ))
  )
}

var ieNSBug = /^xmlns:NS\d+/;
var ieNSPrefix = /^NS\d+:/;

/* istanbul ignore next */
function guardIESVGBug (attrs) {
  var res = [];
  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];
    if (!ieNSBug.test(attr.name)) {
      attr.name = attr.name.replace(ieNSPrefix, '');
      res.push(attr);
    }
  }
  return res
}

function checkForAliasModel (el, value) {
  var _el = el;
  while (_el) {
    if (_el.for && _el.alias === value) {
      warn$2(
        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
        "You are binding v-model directly to a v-for iteration alias. " +
        "This will not be able to modify the v-for source array because " +
        "writing to the alias is like modifying a function local variable. " +
        "Consider using an array of objects and use v-model on an object property instead."
      );
    }
    _el = _el.parent;
  }
}

/*  */

var isStaticKey;
var isPlatformReservedTag;

var genStaticKeysCached = cached(genStaticKeys$1);

/**
 * Goal of the optimizer: walk the generated template AST tree
 * and detect sub-trees that are purely static, i.e. parts of
 * the DOM that never needs to change.
 *
 * Once we detect these sub-trees, we can:
 *
 * 1. Hoist them into constants, so that we no longer need to
 *    create fresh nodes for them on each re-render;
 * 2. Completely skip them in the patching process.
 */
function optimize (root, options) {
  if (!root) { return }
  isStaticKey = genStaticKeysCached(options.staticKeys || '');
  isPlatformReservedTag = options.isReservedTag || no;
  // first pass: mark all non-static nodes.
  markStatic$1(root);
  // second pass: mark static roots.
  markStaticRoots(root, false);
}

function genStaticKeys$1 (keys) {
  return makeMap(
    'type,tag,attrsList,attrsMap,plain,parent,children,attrs' +
    (keys ? ',' + keys : '')
  )
}

function markStatic$1 (node) {
  node.static = isStatic(node);
  if (node.type === 1) {
    // do not make component slot content static. this avoids
    // 1. components not able to mutate slot nodes
    // 2. static slot content fails for hot-reloading
    if (
      !isPlatformReservedTag(node.tag) &&
      node.tag !== 'slot' &&
      node.attrsMap['inline-template'] == null
    ) {
      return
    }
    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      markStatic$1(child);
      if (!child.static) {
        node.static = false;
      }
    }
  }
}

function markStaticRoots (node, isInFor) {
  if (node.type === 1) {
    if (node.static || node.once) {
      node.staticInFor = isInFor;
    }
    // For a node to qualify as a static root, it should have children that
    // are not just static text. Otherwise the cost of hoisting out will
    // outweigh the benefits and it's better off to just always render it fresh.
    if (node.static && node.children.length && !(
      node.children.length === 1 &&
      node.children[0].type === 3
    )) {
      node.staticRoot = true;
      return
    } else {
      node.staticRoot = false;
    }
    if (node.children) {
      for (var i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for);
      }
    }
    if (node.ifConditions) {
      walkThroughConditionsBlocks(node.ifConditions, isInFor);
    }
  }
}

function walkThroughConditionsBlocks (conditionBlocks, isInFor) {
  for (var i = 1, len = conditionBlocks.length; i < len; i++) {
    markStaticRoots(conditionBlocks[i].block, isInFor);
  }
}

function isStatic (node) {
  if (node.type === 2) { // expression
    return false
  }
  if (node.type === 3) { // text
    return true
  }
  return !!(node.pre || (
    !node.hasBindings && // no dynamic bindings
    !node.if && !node.for && // not v-if or v-for or v-else
    !isBuiltInTag(node.tag) && // not a built-in
    isPlatformReservedTag(node.tag) && // not a component
    !isDirectChildOfTemplateFor(node) &&
    Object.keys(node).every(isStaticKey)
  ))
}

function isDirectChildOfTemplateFor (node) {
  while (node.parent) {
    node = node.parent;
    if (node.tag !== 'template') {
      return false
    }
    if (node.for) {
      return true
    }
  }
  return false
}

/*  */

var fnExpRE = /^\s*([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/;
var simplePathRE = /^\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?']|\[".*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*\s*$/;

// keyCode aliases
var keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  'delete': [8, 46]
};

// #4868: modifiers that prevent the execution of the listener
// need to explicitly return null so that we can determine whether to remove
// the listener for .once
var genGuard = function (condition) { return ("if(" + condition + ")return null;"); };

var modifierCode = {
  stop: '$event.stopPropagation();',
  prevent: '$event.preventDefault();',
  self: genGuard("$event.target !== $event.currentTarget"),
  ctrl: genGuard("!$event.ctrlKey"),
  shift: genGuard("!$event.shiftKey"),
  alt: genGuard("!$event.altKey"),
  meta: genGuard("!$event.metaKey"),
  left: genGuard("'button' in $event && $event.button !== 0"),
  middle: genGuard("'button' in $event && $event.button !== 1"),
  right: genGuard("'button' in $event && $event.button !== 2")
};

function genHandlers (events, native) {
  var res = native ? 'nativeOn:{' : 'on:{';
  for (var name in events) {
    res += "\"" + name + "\":" + (genHandler(name, events[name])) + ",";
  }
  return res.slice(0, -1) + '}'
}

function genHandler (
  name,
  handler
) {
  if (!handler) {
    return 'function(){}'
  }

  if (Array.isArray(handler)) {
    return ("[" + (handler.map(function (handler) { return genHandler(name, handler); }).join(',')) + "]")
  }

  var isMethodPath = simplePathRE.test(handler.value);
  var isFunctionExpression = fnExpRE.test(handler.value);

  if (!handler.modifiers) {
    return isMethodPath || isFunctionExpression
      ? handler.value
      : ("function($event){" + (handler.value) + "}") // inline statement
  } else {
    var code = '';
    var keys = [];
    for (var key in handler.modifiers) {
      if (modifierCode[key]) {
        code += modifierCode[key];
        // left/right
        if (keyCodes[key]) {
          keys.push(key);
        }
      } else {
        keys.push(key);
      }
    }
    if (keys.length) {
      code += genKeyFilter(keys);
    }
    var handlerCode = isMethodPath
      ? handler.value + '($event)'
      : isFunctionExpression
        ? ("(" + (handler.value) + ")($event)")
        : handler.value;
    return ("function($event){" + code + handlerCode + "}")
  }
}

function genKeyFilter (keys) {
  return ("if(!('button' in $event)&&" + (keys.map(genFilterCode).join('&&')) + ")return null;")
}

function genFilterCode (key) {
  var keyVal = parseInt(key, 10);
  if (keyVal) {
    return ("$event.keyCode!==" + keyVal)
  }
  var alias = keyCodes[key];
  return ("_k($event.keyCode," + (JSON.stringify(key)) + (alias ? ',' + JSON.stringify(alias) : '') + ")")
}

/*  */

function bind$1 (el, dir) {
  el.wrapData = function (code) {
    return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + (dir.modifiers && dir.modifiers.prop ? ',true' : '') + ")")
  };
}

/*  */

var baseDirectives = {
  bind: bind$1,
  cloak: noop
};

/*  */

// configurable state
var warn$3;
var transforms$1;
var dataGenFns;
var platformDirectives$1;
var isPlatformReservedTag$1;
var staticRenderFns;
var onceCount;
var currentOptions;

function generate (
  ast,
  options
) {
  // save previous staticRenderFns so generate calls can be nested
  var prevStaticRenderFns = staticRenderFns;
  var currentStaticRenderFns = staticRenderFns = [];
  var prevOnceCount = onceCount;
  onceCount = 0;
  currentOptions = options;
  warn$3 = options.warn || baseWarn;
  transforms$1 = pluckModuleFunction(options.modules, 'transformCode');
  dataGenFns = pluckModuleFunction(options.modules, 'genData');
  platformDirectives$1 = options.directives || {};
  isPlatformReservedTag$1 = options.isReservedTag || no;
  var code = ast ? genElement(ast) : '_c("div")';
  staticRenderFns = prevStaticRenderFns;
  onceCount = prevOnceCount;
  return {
    render: ("with(this){return " + code + "}"),
    staticRenderFns: currentStaticRenderFns
  }
}

function genElement (el) {
  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el)
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el)
  } else if (el.for && !el.forProcessed) {
    return genFor(el)
  } else if (el.if && !el.ifProcessed) {
    return genIf(el)
  } else if (el.tag === 'template' && !el.slotTarget) {
    return genChildren(el) || 'void 0'
  } else if (el.tag === 'slot') {
    return genSlot(el)
  } else {
    // component or element
    var code;
    if (el.component) {
      code = genComponent(el.component, el);
    } else {
      var data = el.plain ? undefined : genData(el);

      var children = el.inlineTemplate ? null : genChildren(el, true);
      code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
    }
    // module transforms
    for (var i = 0; i < transforms$1.length; i++) {
      code = transforms$1[i](el, code);
    }
    return code
  }
}

// hoist static sub-trees out
function genStatic (el) {
  el.staticProcessed = true;
  staticRenderFns.push(("with(this){return " + (genElement(el)) + "}"));
  return ("_m(" + (staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
}

// v-once
function genOnce (el) {
  el.onceProcessed = true;
  if (el.if && !el.ifProcessed) {
    return genIf(el)
  } else if (el.staticInFor) {
    var key = '';
    var parent = el.parent;
    while (parent) {
      if (parent.for) {
        key = parent.key;
        break
      }
      parent = parent.parent;
    }
    if (!key) {
      "development" !== 'production' && warn$3(
        "v-once can only be used inside v-for that is keyed. "
      );
      return genElement(el)
    }
    return ("_o(" + (genElement(el)) + "," + (onceCount++) + (key ? ("," + key) : "") + ")")
  } else {
    return genStatic(el)
  }
}

function genIf (el) {
  el.ifProcessed = true; // avoid recursion
  return genIfConditions(el.ifConditions.slice())
}

function genIfConditions (conditions) {
  if (!conditions.length) {
    return '_e()'
  }

  var condition = conditions.shift();
  if (condition.exp) {
    return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions)))
  } else {
    return ("" + (genTernaryExp(condition.block)))
  }

  // v-if with v-once should generate code like (a)?_m(0):_m(1)
  function genTernaryExp (el) {
    return el.once ? genOnce(el) : genElement(el)
  }
}

function genFor (el) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';

  if (
    "development" !== 'production' &&
    maybeComponent(el) && el.tag !== 'slot' && el.tag !== 'template' && !el.key
  ) {
    warn$3(
      "<" + (el.tag) + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " +
      "v-for should have explicit keys. " +
      "See https://vuejs.org/guide/list.html#key for more info.",
      true /* tip */
    );
  }

  el.forProcessed = true; // avoid recursion
  return "_l((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + (genElement(el)) +
    '})'
}

function genData (el) {
  var data = '{';

  // directives first.
  // directives may mutate the el's other properties before they are generated.
  var dirs = genDirectives(el);
  if (dirs) { data += dirs + ','; }

  // key
  if (el.key) {
    data += "key:" + (el.key) + ",";
  }
  // ref
  if (el.ref) {
    data += "ref:" + (el.ref) + ",";
  }
  if (el.refInFor) {
    data += "refInFor:true,";
  }
  // pre
  if (el.pre) {
    data += "pre:true,";
  }
  // record original tag name for components using "is" attribute
  if (el.component) {
    data += "tag:\"" + (el.tag) + "\",";
  }
  // module data generation functions
  for (var i = 0; i < dataGenFns.length; i++) {
    data += dataGenFns[i](el);
  }
  // attributes
  if (el.attrs) {
    data += "attrs:{" + (genProps(el.attrs)) + "},";
  }
  // DOM props
  if (el.props) {
    data += "domProps:{" + (genProps(el.props)) + "},";
  }
  // event handlers
  if (el.events) {
    data += (genHandlers(el.events)) + ",";
  }
  if (el.nativeEvents) {
    data += (genHandlers(el.nativeEvents, true)) + ",";
  }
  // slot target
  if (el.slotTarget) {
    data += "slot:" + (el.slotTarget) + ",";
  }
  // scoped slots
  if (el.scopedSlots) {
    data += (genScopedSlots(el.scopedSlots)) + ",";
  }
  // component v-model
  if (el.model) {
    data += "model:{value:" + (el.model.value) + ",callback:" + (el.model.callback) + ",expression:" + (el.model.expression) + "},";
  }
  // inline-template
  if (el.inlineTemplate) {
    var inlineTemplate = genInlineTemplate(el);
    if (inlineTemplate) {
      data += inlineTemplate + ",";
    }
  }
  data = data.replace(/,$/, '') + '}';
  // v-bind data wrap
  if (el.wrapData) {
    data = el.wrapData(data);
  }
  return data
}

function genDirectives (el) {
  var dirs = el.directives;
  if (!dirs) { return }
  var res = 'directives:[';
  var hasRuntime = false;
  var i, l, dir, needRuntime;
  for (i = 0, l = dirs.length; i < l; i++) {
    dir = dirs[i];
    needRuntime = true;
    var gen = platformDirectives$1[dir.name] || baseDirectives[dir.name];
    if (gen) {
      // compile-time directive that manipulates AST.
      // returns true if it also needs a runtime counterpart.
      needRuntime = !!gen(el, dir, warn$3);
    }
    if (needRuntime) {
      hasRuntime = true;
      res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:\"" + (dir.arg) + "\"") : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
    }
  }
  if (hasRuntime) {
    return res.slice(0, -1) + ']'
  }
}

function genInlineTemplate (el) {
  var ast = el.children[0];
  if ("development" !== 'production' && (
    el.children.length > 1 || ast.type !== 1
  )) {
    warn$3('Inline-template components must have exactly one child element.');
  }
  if (ast.type === 1) {
    var inlineRenderFns = generate(ast, currentOptions);
    return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
  }
}

function genScopedSlots (slots) {
  return ("scopedSlots:_u([" + (Object.keys(slots).map(function (key) { return genScopedSlot(key, slots[key]); }).join(',')) + "])")
}

function genScopedSlot (key, el) {
  return "[" + key + ",function(" + (String(el.attrsMap.scope)) + "){" +
    "return " + (el.tag === 'template'
      ? genChildren(el) || 'void 0'
      : genElement(el)) + "}]"
}

function genChildren (el, checkSkip) {
  var children = el.children;
  if (children.length) {
    var el$1 = children[0];
    // optimize single v-for
    if (children.length === 1 &&
        el$1.for &&
        el$1.tag !== 'template' &&
        el$1.tag !== 'slot') {
      return genElement(el$1)
    }
    var normalizationType = checkSkip ? getNormalizationType(children) : 0;
    return ("[" + (children.map(genNode).join(',')) + "]" + (normalizationType ? ("," + normalizationType) : ''))
  }
}

// determine the normalization needed for the children array.
// 0: no normalization needed
// 1: simple normalization needed (possible 1-level deep nested array)
// 2: full normalization needed
function getNormalizationType (children) {
  var res = 0;
  for (var i = 0; i < children.length; i++) {
    var el = children[i];
    if (el.type !== 1) {
      continue
    }
    if (needsNormalization(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
      res = 2;
      break
    }
    if (maybeComponent(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return maybeComponent(c.block); }))) {
      res = 1;
    }
  }
  return res
}

function needsNormalization (el) {
  return el.for !== undefined || el.tag === 'template' || el.tag === 'slot'
}

function maybeComponent (el) {
  return !isPlatformReservedTag$1(el.tag)
}

function genNode (node) {
  if (node.type === 1) {
    return genElement(node)
  } else {
    return genText(node)
  }
}

function genText (text) {
  return ("_v(" + (text.type === 2
    ? text.expression // no need for () because already wrapped in _s()
    : transformSpecialNewlines(JSON.stringify(text.text))) + ")")
}

function genSlot (el) {
  var slotName = el.slotName || '"default"';
  var children = genChildren(el);
  var res = "_t(" + slotName + (children ? ("," + children) : '');
  var attrs = el.attrs && ("{" + (el.attrs.map(function (a) { return ((camelize(a.name)) + ":" + (a.value)); }).join(',')) + "}");
  var bind$$1 = el.attrsMap['v-bind'];
  if ((attrs || bind$$1) && !children) {
    res += ",null";
  }
  if (attrs) {
    res += "," + attrs;
  }
  if (bind$$1) {
    res += (attrs ? '' : ',null') + "," + bind$$1;
  }
  return res + ')'
}

// componentName is el.component, take it as argument to shun flow's pessimistic refinement
function genComponent (componentName, el) {
  var children = el.inlineTemplate ? null : genChildren(el, true);
  return ("_c(" + componentName + "," + (genData(el)) + (children ? ("," + children) : '') + ")")
}

function genProps (props) {
  var res = '';
  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    res += "\"" + (prop.name) + "\":" + (transformSpecialNewlines(prop.value)) + ",";
  }
  return res.slice(0, -1)
}

// #3895, #4268
function transformSpecialNewlines (text) {
  return text
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

/*  */

// these keywords should not appear inside expressions, but operators like
// typeof, instanceof and in are allowed
var prohibitedKeywordRE = new RegExp('\\b' + (
  'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
  'super,throw,while,yield,delete,export,import,return,switch,default,' +
  'extends,finally,continue,debugger,function,arguments'
).split(',').join('\\b|\\b') + '\\b');

// these unary operators should not be used as property/method names
var unaryOperatorsRE = new RegExp('\\b' + (
  'delete,typeof,void'
).split(',').join('\\s*\\([^\\)]*\\)|\\b') + '\\s*\\([^\\)]*\\)');

// check valid identifier for v-for
var identRE = /[A-Za-z_$][\w$]*/;

// strip strings in expressions
var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

// detect problematic expressions in a template
function detectErrors (ast) {
  var errors = [];
  if (ast) {
    checkNode(ast, errors);
  }
  return errors
}

function checkNode (node, errors) {
  if (node.type === 1) {
    for (var name in node.attrsMap) {
      if (dirRE.test(name)) {
        var value = node.attrsMap[name];
        if (value) {
          if (name === 'v-for') {
            checkFor(node, ("v-for=\"" + value + "\""), errors);
          } else if (onRE.test(name)) {
            checkEvent(value, (name + "=\"" + value + "\""), errors);
          } else {
            checkExpression(value, (name + "=\"" + value + "\""), errors);
          }
        }
      }
    }
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        checkNode(node.children[i], errors);
      }
    }
  } else if (node.type === 2) {
    checkExpression(node.expression, node.text, errors);
  }
}

function checkEvent (exp, text, errors) {
  var keywordMatch = exp.replace(stripStringRE, '').match(unaryOperatorsRE);
  if (keywordMatch) {
    errors.push(
      "avoid using JavaScript unary operator as property name: " +
      "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim())
    );
  }
  checkExpression(exp, text, errors);
}

function checkFor (node, text, errors) {
  checkExpression(node.for || '', text, errors);
  checkIdentifier(node.alias, 'v-for alias', text, errors);
  checkIdentifier(node.iterator1, 'v-for iterator', text, errors);
  checkIdentifier(node.iterator2, 'v-for iterator', text, errors);
}

function checkIdentifier (ident, type, text, errors) {
  if (typeof ident === 'string' && !identRE.test(ident)) {
    errors.push(("invalid " + type + " \"" + ident + "\" in expression: " + (text.trim())));
  }
}

function checkExpression (exp, text, errors) {
  try {
    new Function(("return " + exp));
  } catch (e) {
    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
    if (keywordMatch) {
      errors.push(
        "avoid using JavaScript keyword as property name: " +
        "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim())
      );
    } else {
      errors.push(("invalid expression: " + (text.trim())));
    }
  }
}

/*  */

function baseCompile (
  template,
  options
) {
  var ast = parse(template.trim(), options);
  optimize(ast, options);
  var code = generate(ast, options);
  return {
    ast: ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
}

function makeFunction (code, errors) {
  try {
    return new Function(code)
  } catch (err) {
    errors.push({ err: err, code: code });
    return noop
  }
}

function createCompiler (baseOptions) {
  var functionCompileCache = Object.create(null);

  function compile (
    template,
    options
  ) {
    var finalOptions = Object.create(baseOptions);
    var errors = [];
    var tips = [];
    finalOptions.warn = function (msg, tip$$1) {
      (tip$$1 ? tips : errors).push(msg);
    };

    if (options) {
      // merge custom modules
      if (options.modules) {
        finalOptions.modules = (baseOptions.modules || []).concat(options.modules);
      }
      // merge custom directives
      if (options.directives) {
        finalOptions.directives = extend(
          Object.create(baseOptions.directives),
          options.directives
        );
      }
      // copy other options
      for (var key in options) {
        if (key !== 'modules' && key !== 'directives') {
          finalOptions[key] = options[key];
        }
      }
    }

    var compiled = baseCompile(template, finalOptions);
    {
      errors.push.apply(errors, detectErrors(compiled.ast));
    }
    compiled.errors = errors;
    compiled.tips = tips;
    return compiled
  }

  function compileToFunctions (
    template,
    options,
    vm
  ) {
    options = options || {};

    /* istanbul ignore if */
    {
      // detect possible CSP restriction
      try {
        new Function('return 1');
      } catch (e) {
        if (e.toString().match(/unsafe-eval|CSP/)) {
          warn(
            'It seems you are using the standalone build of Vue.js in an ' +
            'environment with Content Security Policy that prohibits unsafe-eval. ' +
            'The template compiler cannot work in this environment. Consider ' +
            'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
            'templates into render functions.'
          );
        }
      }
    }

    // check cache
    var key = options.delimiters
      ? String(options.delimiters) + template
      : template;
    if (functionCompileCache[key]) {
      return functionCompileCache[key]
    }

    // compile
    var compiled = compile(template, options);

    // check compilation errors/tips
    {
      if (compiled.errors && compiled.errors.length) {
        warn(
          "Error compiling template:\n\n" + template + "\n\n" +
          compiled.errors.map(function (e) { return ("- " + e); }).join('\n') + '\n',
          vm
        );
      }
      if (compiled.tips && compiled.tips.length) {
        compiled.tips.forEach(function (msg) { return tip(msg, vm); });
      }
    }

    // turn code into functions
    var res = {};
    var fnGenErrors = [];
    res.render = makeFunction(compiled.render, fnGenErrors);
    var l = compiled.staticRenderFns.length;
    res.staticRenderFns = new Array(l);
    for (var i = 0; i < l; i++) {
      res.staticRenderFns[i] = makeFunction(compiled.staticRenderFns[i], fnGenErrors);
    }

    // check function generation errors.
    // this should only happen if there is a bug in the compiler itself.
    // mostly for codegen development use
    /* istanbul ignore if */
    {
      if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
        warn(
          "Failed to generate render function:\n\n" +
          fnGenErrors.map(function (ref) {
            var err = ref.err;
            var code = ref.code;

            return ((err.toString()) + " in\n\n" + code + "\n");
        }).join('\n'),
          vm
        );
      }
    }

    return (functionCompileCache[key] = res)
  }

  return {
    compile: compile,
    compileToFunctions: compileToFunctions
  }
}

/*  */

function transformNode (el, options) {
  var warn = options.warn || baseWarn;
  var staticClass = getAndRemoveAttr(el, 'class');
  if ("development" !== 'production' && staticClass) {
    var expression = parseText(staticClass, options.delimiters);
    if (expression) {
      warn(
        "class=\"" + staticClass + "\": " +
        'Interpolation inside attributes has been removed. ' +
        'Use v-bind or the colon shorthand instead. For example, ' +
        'instead of <div class="{{ val }}">, use <div :class="val">.'
      );
    }
  }
  if (staticClass) {
    el.staticClass = JSON.stringify(staticClass);
  }
  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
  if (classBinding) {
    el.classBinding = classBinding;
  }
}

function genData$1 (el) {
  var data = '';
  if (el.staticClass) {
    data += "staticClass:" + (el.staticClass) + ",";
  }
  if (el.classBinding) {
    data += "class:" + (el.classBinding) + ",";
  }
  return data
}

var klass$1 = {
  staticKeys: ['staticClass'],
  transformNode: transformNode,
  genData: genData$1
};

/*  */

function transformNode$1 (el, options) {
  var warn = options.warn || baseWarn;
  var staticStyle = getAndRemoveAttr(el, 'style');
  if (staticStyle) {
    /* istanbul ignore if */
    {
      var expression = parseText(staticStyle, options.delimiters);
      if (expression) {
        warn(
          "style=\"" + staticStyle + "\": " +
          'Interpolation inside attributes has been removed. ' +
          'Use v-bind or the colon shorthand instead. For example, ' +
          'instead of <div style="{{ val }}">, use <div :style="val">.'
        );
      }
    }
    el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
  }

  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
  if (styleBinding) {
    el.styleBinding = styleBinding;
  }
}

function genData$2 (el) {
  var data = '';
  if (el.staticStyle) {
    data += "staticStyle:" + (el.staticStyle) + ",";
  }
  if (el.styleBinding) {
    data += "style:(" + (el.styleBinding) + "),";
  }
  return data
}

var style$1 = {
  staticKeys: ['staticStyle'],
  transformNode: transformNode$1,
  genData: genData$2
};

var modules$1 = [
  klass$1,
  style$1
];

/*  */

function text (el, dir) {
  if (dir.value) {
    addProp(el, 'textContent', ("_s(" + (dir.value) + ")"));
  }
}

/*  */

function html (el, dir) {
  if (dir.value) {
    addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"));
  }
}

var directives$1 = {
  model: model,
  text: text,
  html: html
};

/*  */

var baseOptions = {
  expectHTML: true,
  modules: modules$1,
  directives: directives$1,
  isPreTag: isPreTag,
  isUnaryTag: isUnaryTag,
  mustUseProp: mustUseProp,
  isReservedTag: isReservedTag,
  getTagNamespace: getTagNamespace,
  staticKeys: genStaticKeys(modules$1)
};

var ref$1 = createCompiler(baseOptions);
var compileToFunctions = ref$1.compileToFunctions;

/*  */

var idToTemplate = cached(function (id) {
  var el = query(id);
  return el && el.innerHTML
});

var mount = Vue$3.prototype.$mount;
Vue$3.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && query(el);

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    "development" !== 'production' && warn(
      "Do not mount Vue to <html> or <body> - mount to normal elements instead."
    );
    return this
  }

  var options = this.$options;
  // resolve template/el and convert to render function
  if (!options.render) {
    var template = options.template;
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template);
          /* istanbul ignore if */
          if ("development" !== 'production' && !template) {
            warn(
              ("Template element not found or is empty: " + (options.template)),
              this
            );
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML;
      } else {
        {
          warn('invalid template option:' + template, this);
        }
        return this
      }
    } else if (el) {
      template = getOuterHTML(el);
    }
    if (template) {
      /* istanbul ignore if */
      if ("development" !== 'production' && config.performance && perf) {
        perf.mark('compile');
      }

      var ref = compileToFunctions(template, {
        shouldDecodeNewlines: shouldDecodeNewlines,
        delimiters: options.delimiters
      }, this);
      var render = ref.render;
      var staticRenderFns = ref.staticRenderFns;
      options.render = render;
      options.staticRenderFns = staticRenderFns;

      /* istanbul ignore if */
      if ("development" !== 'production' && config.performance && perf) {
        perf.mark('compile end');
        perf.measure(((this._name) + " compile"), 'compile', 'compile end');
      }
    }
  }
  return mount.call(this, el, hydrating)
};

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML (el) {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    var container = document.createElement('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML
  }
}

Vue$3.compile = compileToFunctions;

return Vue$3;

})));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(29)))

/***/ }),
/* 2 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(7);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(10)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../css-loader/index.js!./weui.css", function() {
			var newContent = require("!!../../../css-loader/index.js!./weui.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * vue-resource v1.2.1
 * https://github.com/pagekit/vue-resource
 * Released under the MIT License.
 */



/**
 * Promises/A+ polyfill v1.1.4 (https://github.com/bramstein/promis)
 */

var RESOLVED = 0;
var REJECTED = 1;
var PENDING  = 2;

function Promise$1(executor) {

    this.state = PENDING;
    this.value = undefined;
    this.deferred = [];

    var promise = this;

    try {
        executor(function (x) {
            promise.resolve(x);
        }, function (r) {
            promise.reject(r);
        });
    } catch (e) {
        promise.reject(e);
    }
}

Promise$1.reject = function (r) {
    return new Promise$1(function (resolve, reject) {
        reject(r);
    });
};

Promise$1.resolve = function (x) {
    return new Promise$1(function (resolve, reject) {
        resolve(x);
    });
};

Promise$1.all = function all(iterable) {
    return new Promise$1(function (resolve, reject) {
        var count = 0, result = [];

        if (iterable.length === 0) {
            resolve(result);
        }

        function resolver(i) {
            return function (x) {
                result[i] = x;
                count += 1;

                if (count === iterable.length) {
                    resolve(result);
                }
            };
        }

        for (var i = 0; i < iterable.length; i += 1) {
            Promise$1.resolve(iterable[i]).then(resolver(i), reject);
        }
    });
};

Promise$1.race = function race(iterable) {
    return new Promise$1(function (resolve, reject) {
        for (var i = 0; i < iterable.length; i += 1) {
            Promise$1.resolve(iterable[i]).then(resolve, reject);
        }
    });
};

var p$1 = Promise$1.prototype;

p$1.resolve = function resolve(x) {
    var promise = this;

    if (promise.state === PENDING) {
        if (x === promise) {
            throw new TypeError('Promise settled with itself.');
        }

        var called = false;

        try {
            var then = x && x['then'];

            if (x !== null && typeof x === 'object' && typeof then === 'function') {
                then.call(x, function (x) {
                    if (!called) {
                        promise.resolve(x);
                    }
                    called = true;

                }, function (r) {
                    if (!called) {
                        promise.reject(r);
                    }
                    called = true;
                });
                return;
            }
        } catch (e) {
            if (!called) {
                promise.reject(e);
            }
            return;
        }

        promise.state = RESOLVED;
        promise.value = x;
        promise.notify();
    }
};

p$1.reject = function reject(reason) {
    var promise = this;

    if (promise.state === PENDING) {
        if (reason === promise) {
            throw new TypeError('Promise settled with itself.');
        }

        promise.state = REJECTED;
        promise.value = reason;
        promise.notify();
    }
};

p$1.notify = function notify() {
    var promise = this;

    nextTick(function () {
        if (promise.state !== PENDING) {
            while (promise.deferred.length) {
                var deferred = promise.deferred.shift(),
                    onResolved = deferred[0],
                    onRejected = deferred[1],
                    resolve = deferred[2],
                    reject = deferred[3];

                try {
                    if (promise.state === RESOLVED) {
                        if (typeof onResolved === 'function') {
                            resolve(onResolved.call(undefined, promise.value));
                        } else {
                            resolve(promise.value);
                        }
                    } else if (promise.state === REJECTED) {
                        if (typeof onRejected === 'function') {
                            resolve(onRejected.call(undefined, promise.value));
                        } else {
                            reject(promise.value);
                        }
                    }
                } catch (e) {
                    reject(e);
                }
            }
        }
    });
};

p$1.then = function then(onResolved, onRejected) {
    var promise = this;

    return new Promise$1(function (resolve, reject) {
        promise.deferred.push([onResolved, onRejected, resolve, reject]);
        promise.notify();
    });
};

p$1.catch = function (onRejected) {
    return this.then(undefined, onRejected);
};

/**
 * Promise adapter.
 */

if (typeof Promise === 'undefined') {
    window.Promise = Promise$1;
}

function PromiseObj(executor, context) {

    if (executor instanceof Promise) {
        this.promise = executor;
    } else {
        this.promise = new Promise(executor.bind(context));
    }

    this.context = context;
}

PromiseObj.all = function (iterable, context) {
    return new PromiseObj(Promise.all(iterable), context);
};

PromiseObj.resolve = function (value, context) {
    return new PromiseObj(Promise.resolve(value), context);
};

PromiseObj.reject = function (reason, context) {
    return new PromiseObj(Promise.reject(reason), context);
};

PromiseObj.race = function (iterable, context) {
    return new PromiseObj(Promise.race(iterable), context);
};

var p = PromiseObj.prototype;

p.bind = function (context) {
    this.context = context;
    return this;
};

p.then = function (fulfilled, rejected) {

    if (fulfilled && fulfilled.bind && this.context) {
        fulfilled = fulfilled.bind(this.context);
    }

    if (rejected && rejected.bind && this.context) {
        rejected = rejected.bind(this.context);
    }

    return new PromiseObj(this.promise.then(fulfilled, rejected), this.context);
};

p.catch = function (rejected) {

    if (rejected && rejected.bind && this.context) {
        rejected = rejected.bind(this.context);
    }

    return new PromiseObj(this.promise.catch(rejected), this.context);
};

p.finally = function (callback) {

    return this.then(function (value) {
            callback.call(this);
            return value;
        }, function (reason) {
            callback.call(this);
            return Promise.reject(reason);
        }
    );
};

/**
 * Utility functions.
 */

var ref = {};
var hasOwnProperty = ref.hasOwnProperty;

var ref$1 = [];
var slice = ref$1.slice;
var debug = false;
var ntick;

var inBrowser = typeof window !== 'undefined';

var Util = function (ref) {
    var config = ref.config;
    var nextTick = ref.nextTick;

    ntick = nextTick;
    debug = config.debug || !config.silent;
};

function warn(msg) {
    if (typeof console !== 'undefined' && debug) {
        console.warn('[VueResource warn]: ' + msg);
    }
}

function error(msg) {
    if (typeof console !== 'undefined') {
        console.error(msg);
    }
}

function nextTick(cb, ctx) {
    return ntick(cb, ctx);
}

function trim(str) {
    return str ? str.replace(/^\s*|\s*$/g, '') : '';
}

function toLower(str) {
    return str ? str.toLowerCase() : '';
}

function toUpper(str) {
    return str ? str.toUpperCase() : '';
}

var isArray = Array.isArray;

function isString(val) {
    return typeof val === 'string';
}



function isFunction(val) {
    return typeof val === 'function';
}

function isObject(obj) {
    return obj !== null && typeof obj === 'object';
}

function isPlainObject(obj) {
    return isObject(obj) && Object.getPrototypeOf(obj) == Object.prototype;
}

function isBlob(obj) {
    return typeof Blob !== 'undefined' && obj instanceof Blob;
}

function isFormData(obj) {
    return typeof FormData !== 'undefined' && obj instanceof FormData;
}

function when(value, fulfilled, rejected) {

    var promise = PromiseObj.resolve(value);

    if (arguments.length < 2) {
        return promise;
    }

    return promise.then(fulfilled, rejected);
}

function options(fn, obj, opts) {

    opts = opts || {};

    if (isFunction(opts)) {
        opts = opts.call(obj);
    }

    return merge(fn.bind({$vm: obj, $options: opts}), fn, {$options: opts});
}

function each(obj, iterator) {

    var i, key;

    if (isArray(obj)) {
        for (i = 0; i < obj.length; i++) {
            iterator.call(obj[i], obj[i], i);
        }
    } else if (isObject(obj)) {
        for (key in obj) {
            if (hasOwnProperty.call(obj, key)) {
                iterator.call(obj[key], obj[key], key);
            }
        }
    }

    return obj;
}

var assign = Object.assign || _assign;

function merge(target) {

    var args = slice.call(arguments, 1);

    args.forEach(function (source) {
        _merge(target, source, true);
    });

    return target;
}

function defaults(target) {

    var args = slice.call(arguments, 1);

    args.forEach(function (source) {

        for (var key in source) {
            if (target[key] === undefined) {
                target[key] = source[key];
            }
        }

    });

    return target;
}

function _assign(target) {

    var args = slice.call(arguments, 1);

    args.forEach(function (source) {
        _merge(target, source);
    });

    return target;
}

function _merge(target, source, deep) {
    for (var key in source) {
        if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
            if (isPlainObject(source[key]) && !isPlainObject(target[key])) {
                target[key] = {};
            }
            if (isArray(source[key]) && !isArray(target[key])) {
                target[key] = [];
            }
            _merge(target[key], source[key], deep);
        } else if (source[key] !== undefined) {
            target[key] = source[key];
        }
    }
}

/**
 * Root Prefix Transform.
 */

var root = function (options$$1, next) {

    var url = next(options$$1);

    if (isString(options$$1.root) && !url.match(/^(https?:)?\//)) {
        url = options$$1.root + '/' + url;
    }

    return url;
};

/**
 * Query Parameter Transform.
 */

var query = function (options$$1, next) {

    var urlParams = Object.keys(Url.options.params), query = {}, url = next(options$$1);

    each(options$$1.params, function (value, key) {
        if (urlParams.indexOf(key) === -1) {
            query[key] = value;
        }
    });

    query = Url.params(query);

    if (query) {
        url += (url.indexOf('?') == -1 ? '?' : '&') + query;
    }

    return url;
};

/**
 * URL Template v2.0.6 (https://github.com/bramstein/url-template)
 */

function expand(url, params, variables) {

    var tmpl = parse(url), expanded = tmpl.expand(params);

    if (variables) {
        variables.push.apply(variables, tmpl.vars);
    }

    return expanded;
}

function parse(template) {

    var operators = ['+', '#', '.', '/', ';', '?', '&'], variables = [];

    return {
        vars: variables,
        expand: function expand(context) {
            return template.replace(/\{([^\{\}]+)\}|([^\{\}]+)/g, function (_, expression, literal) {
                if (expression) {

                    var operator = null, values = [];

                    if (operators.indexOf(expression.charAt(0)) !== -1) {
                        operator = expression.charAt(0);
                        expression = expression.substr(1);
                    }

                    expression.split(/,/g).forEach(function (variable) {
                        var tmp = /([^:\*]*)(?::(\d+)|(\*))?/.exec(variable);
                        values.push.apply(values, getValues(context, operator, tmp[1], tmp[2] || tmp[3]));
                        variables.push(tmp[1]);
                    });

                    if (operator && operator !== '+') {

                        var separator = ',';

                        if (operator === '?') {
                            separator = '&';
                        } else if (operator !== '#') {
                            separator = operator;
                        }

                        return (values.length !== 0 ? operator : '') + values.join(separator);
                    } else {
                        return values.join(',');
                    }

                } else {
                    return encodeReserved(literal);
                }
            });
        }
    };
}

function getValues(context, operator, key, modifier) {

    var value = context[key], result = [];

    if (isDefined(value) && value !== '') {
        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
            value = value.toString();

            if (modifier && modifier !== '*') {
                value = value.substring(0, parseInt(modifier, 10));
            }

            result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : null));
        } else {
            if (modifier === '*') {
                if (Array.isArray(value)) {
                    value.filter(isDefined).forEach(function (value) {
                        result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : null));
                    });
                } else {
                    Object.keys(value).forEach(function (k) {
                        if (isDefined(value[k])) {
                            result.push(encodeValue(operator, value[k], k));
                        }
                    });
                }
            } else {
                var tmp = [];

                if (Array.isArray(value)) {
                    value.filter(isDefined).forEach(function (value) {
                        tmp.push(encodeValue(operator, value));
                    });
                } else {
                    Object.keys(value).forEach(function (k) {
                        if (isDefined(value[k])) {
                            tmp.push(encodeURIComponent(k));
                            tmp.push(encodeValue(operator, value[k].toString()));
                        }
                    });
                }

                if (isKeyOperator(operator)) {
                    result.push(encodeURIComponent(key) + '=' + tmp.join(','));
                } else if (tmp.length !== 0) {
                    result.push(tmp.join(','));
                }
            }
        }
    } else {
        if (operator === ';') {
            result.push(encodeURIComponent(key));
        } else if (value === '' && (operator === '&' || operator === '?')) {
            result.push(encodeURIComponent(key) + '=');
        } else if (value === '') {
            result.push('');
        }
    }

    return result;
}

function isDefined(value) {
    return value !== undefined && value !== null;
}

function isKeyOperator(operator) {
    return operator === ';' || operator === '&' || operator === '?';
}

function encodeValue(operator, value, key) {

    value = (operator === '+' || operator === '#') ? encodeReserved(value) : encodeURIComponent(value);

    if (key) {
        return encodeURIComponent(key) + '=' + value;
    } else {
        return value;
    }
}

function encodeReserved(str) {
    return str.split(/(%[0-9A-Fa-f]{2})/g).map(function (part) {
        if (!/%[0-9A-Fa-f]/.test(part)) {
            part = encodeURI(part);
        }
        return part;
    }).join('');
}

/**
 * URL Template (RFC 6570) Transform.
 */

var template = function (options) {

    var variables = [], url = expand(options.url, options.params, variables);

    variables.forEach(function (key) {
        delete options.params[key];
    });

    return url;
};

/**
 * Service for URL templating.
 */

function Url(url, params) {

    var self = this || {}, options$$1 = url, transform;

    if (isString(url)) {
        options$$1 = {url: url, params: params};
    }

    options$$1 = merge({}, Url.options, self.$options, options$$1);

    Url.transforms.forEach(function (handler) {
        transform = factory(handler, transform, self.$vm);
    });

    return transform(options$$1);
}

/**
 * Url options.
 */

Url.options = {
    url: '',
    root: null,
    params: {}
};

/**
 * Url transforms.
 */

Url.transforms = [template, query, root];

/**
 * Encodes a Url parameter string.
 *
 * @param {Object} obj
 */

Url.params = function (obj) {

    var params = [], escape = encodeURIComponent;

    params.add = function (key, value) {

        if (isFunction(value)) {
            value = value();
        }

        if (value === null) {
            value = '';
        }

        this.push(escape(key) + '=' + escape(value));
    };

    serialize(params, obj);

    return params.join('&').replace(/%20/g, '+');
};

/**
 * Parse a URL and return its components.
 *
 * @param {String} url
 */

Url.parse = function (url) {

    var el = document.createElement('a');

    if (document.documentMode) {
        el.href = url;
        url = el.href;
    }

    el.href = url;

    return {
        href: el.href,
        protocol: el.protocol ? el.protocol.replace(/:$/, '') : '',
        port: el.port,
        host: el.host,
        hostname: el.hostname,
        pathname: el.pathname.charAt(0) === '/' ? el.pathname : '/' + el.pathname,
        search: el.search ? el.search.replace(/^\?/, '') : '',
        hash: el.hash ? el.hash.replace(/^#/, '') : ''
    };
};

function factory(handler, next, vm) {
    return function (options$$1) {
        return handler.call(vm, options$$1, next);
    };
}

function serialize(params, obj, scope) {

    var array = isArray(obj), plain = isPlainObject(obj), hash;

    each(obj, function (value, key) {

        hash = isObject(value) || isArray(value);

        if (scope) {
            key = scope + '[' + (plain || hash ? key : '') + ']';
        }

        if (!scope && array) {
            params.add(value.name, value.value);
        } else if (hash) {
            serialize(params, value, key);
        } else {
            params.add(key, value);
        }
    });
}

/**
 * XDomain client (Internet Explorer).
 */

var xdrClient = function (request) {
    return new PromiseObj(function (resolve) {

        var xdr = new XDomainRequest(), handler = function (ref) {
            var type = ref.type;


            var status = 0;

            if (type === 'load') {
                status = 200;
            } else if (type === 'error') {
                status = 500;
            }

            resolve(request.respondWith(xdr.responseText, {status: status}));
        };

        request.abort = function () { return xdr.abort(); };

        xdr.open(request.method, request.getUrl());

        if (request.timeout) {
            xdr.timeout = request.timeout;
        }

        xdr.onload = handler;
        xdr.onabort = handler;
        xdr.onerror = handler;
        xdr.ontimeout = handler;
        xdr.onprogress = function () {};
        xdr.send(request.getBody());
    });
};

/**
 * CORS Interceptor.
 */

var SUPPORTS_CORS = inBrowser && 'withCredentials' in new XMLHttpRequest();

var cors = function (request, next) {

    if (inBrowser) {

        var orgUrl = Url.parse(location.href);
        var reqUrl = Url.parse(request.getUrl());

        if (reqUrl.protocol !== orgUrl.protocol || reqUrl.host !== orgUrl.host) {

            request.crossOrigin = true;
            request.emulateHTTP = false;

            if (!SUPPORTS_CORS) {
                request.client = xdrClient;
            }
        }
    }

    next();
};

/**
 * Body Interceptor.
 */

var body = function (request, next) {

    if (isFormData(request.body)) {

        request.headers.delete('Content-Type');

    } else if (isObject(request.body) || isArray(request.body)) {

        if (request.emulateJSON) {
            request.body = Url.params(request.body);
            request.headers.set('Content-Type', 'application/x-www-form-urlencoded');
        } else {
            request.body = JSON.stringify(request.body);
        }
    }

    next(function (response) {

        Object.defineProperty(response, 'data', {

            get: function get() {
                return this.body;
            },

            set: function set(body) {
                this.body = body;
            }

        });

        return response.bodyText ? when(response.text(), function (text) {

            var type = response.headers.get('Content-Type') || '';

            if (type.indexOf('application/json') === 0 || isJson(text)) {

                try {
                    response.body = JSON.parse(text);
                } catch (e) {
                    response.body = null;
                }

            } else {
                response.body = text;
            }

            return response;

        }) : response;

    });
};

function isJson(str) {

    var start = str.match(/^\[|^\{(?!\{)/), end = {'[': /]$/, '{': /}$/};

    return start && end[start[0]].test(str);
}

/**
 * JSONP client (Browser).
 */

var jsonpClient = function (request) {
    return new PromiseObj(function (resolve) {

        var name = request.jsonp || 'callback', callback = request.jsonpCallback || '_jsonp' + Math.random().toString(36).substr(2), body = null, handler, script;

        handler = function (ref) {
            var type = ref.type;


            var status = 0;

            if (type === 'load' && body !== null) {
                status = 200;
            } else if (type === 'error') {
                status = 500;
            }

            if (status && window[callback]) {
                delete window[callback];
                document.body.removeChild(script);
            }

            resolve(request.respondWith(body, {status: status}));
        };

        window[callback] = function (result) {
            body = JSON.stringify(result);
        };

        request.abort = function () {
            handler({type: 'abort'});
        };

        request.params[name] = callback;

        if (request.timeout) {
            setTimeout(request.abort, request.timeout);
        }

        script = document.createElement('script');
        script.src = request.getUrl();
        script.type = 'text/javascript';
        script.async = true;
        script.onload = handler;
        script.onerror = handler;

        document.body.appendChild(script);
    });
};

/**
 * JSONP Interceptor.
 */

var jsonp = function (request, next) {

    if (request.method == 'JSONP') {
        request.client = jsonpClient;
    }

    next();
};

/**
 * Before Interceptor.
 */

var before = function (request, next) {

    if (isFunction(request.before)) {
        request.before.call(this, request);
    }

    next();
};

/**
 * HTTP method override Interceptor.
 */

var method = function (request, next) {

    if (request.emulateHTTP && /^(PUT|PATCH|DELETE)$/i.test(request.method)) {
        request.headers.set('X-HTTP-Method-Override', request.method);
        request.method = 'POST';
    }

    next();
};

/**
 * Header Interceptor.
 */

var header = function (request, next) {

    var headers = assign({}, Http.headers.common,
        !request.crossOrigin ? Http.headers.custom : {},
        Http.headers[toLower(request.method)]
    );

    each(headers, function (value, name) {
        if (!request.headers.has(name)) {
            request.headers.set(name, value);
        }
    });

    next();
};

/**
 * XMLHttp client (Browser).
 */

var SUPPORTS_BLOB = typeof Blob !== 'undefined' && typeof FileReader !== 'undefined';

var xhrClient = function (request) {
    return new PromiseObj(function (resolve) {

        var xhr = new XMLHttpRequest(), handler = function (event) {

            var response = request.respondWith(
                'response' in xhr ? xhr.response : xhr.responseText, {
                    status: xhr.status === 1223 ? 204 : xhr.status, // IE9 status bug
                    statusText: xhr.status === 1223 ? 'No Content' : trim(xhr.statusText)
                }
            );

            each(trim(xhr.getAllResponseHeaders()).split('\n'), function (row) {
                response.headers.append(row.slice(0, row.indexOf(':')), row.slice(row.indexOf(':') + 1));
            });

            resolve(response);
        };

        request.abort = function () { return xhr.abort(); };

        if (request.progress) {
            if (request.method === 'GET') {
                xhr.addEventListener('progress', request.progress);
            } else if (/^(POST|PUT)$/i.test(request.method)) {
                xhr.upload.addEventListener('progress', request.progress);
            }
        }

        xhr.open(request.method, request.getUrl(), true);

        if (request.timeout) {
            xhr.timeout = request.timeout;
        }

        if (request.credentials === true) {
            xhr.withCredentials = true;
        }

        if (!request.crossOrigin) {
            request.headers.set('X-Requested-With', 'XMLHttpRequest');
        }

        if ('responseType' in xhr && SUPPORTS_BLOB) {
            xhr.responseType = 'blob';
        }

        request.headers.forEach(function (value, name) {
            xhr.setRequestHeader(name, value);
        });

        xhr.onload = handler;
        xhr.onabort = handler;
        xhr.onerror = handler;
        xhr.ontimeout = handler;
        xhr.send(request.getBody());
    });
};

/**
 * Http client (Node).
 */

var nodeClient = function (request) {

    var client = __webpack_require__(30);

    return new PromiseObj(function (resolve) {

        var url = request.getUrl();
        var body = request.getBody();
        var method = request.method;
        var headers = {}, handler;

        request.headers.forEach(function (value, name) {
            headers[name] = value;
        });

        client(url, {body: body, method: method, headers: headers}).then(handler = function (resp) {

            var response = request.respondWith(resp.body, {
                    status: resp.statusCode,
                    statusText: trim(resp.statusMessage)
                }
            );

            each(resp.headers, function (value, name) {
                response.headers.set(name, value);
            });

            resolve(response);

        }, function (error$$1) { return handler(error$$1.response); });
    });
};

/**
 * Base client.
 */

var Client = function (context) {

    var reqHandlers = [sendRequest], resHandlers = [], handler;

    if (!isObject(context)) {
        context = null;
    }

    function Client(request) {
        return new PromiseObj(function (resolve) {

            function exec() {

                handler = reqHandlers.pop();

                if (isFunction(handler)) {
                    handler.call(context, request, next);
                } else {
                    warn(("Invalid interceptor of type " + (typeof handler) + ", must be a function"));
                    next();
                }
            }

            function next(response) {

                if (isFunction(response)) {

                    resHandlers.unshift(response);

                } else if (isObject(response)) {

                    resHandlers.forEach(function (handler) {
                        response = when(response, function (response) {
                            return handler.call(context, response) || response;
                        });
                    });

                    when(response, resolve);

                    return;
                }

                exec();
            }

            exec();

        }, context);
    }

    Client.use = function (handler) {
        reqHandlers.push(handler);
    };

    return Client;
};

function sendRequest(request, resolve) {

    var client = request.client || (inBrowser ? xhrClient : nodeClient);

    resolve(client(request));
}

/**
 * HTTP Headers.
 */

var Headers = function Headers(headers) {
    var this$1 = this;


    this.map = {};

    each(headers, function (value, name) { return this$1.append(name, value); });
};

Headers.prototype.has = function has (name) {
    return getName(this.map, name) !== null;
};

Headers.prototype.get = function get (name) {

    var list = this.map[getName(this.map, name)];

    return list ? list.join() : null;
};

Headers.prototype.getAll = function getAll (name) {
    return this.map[getName(this.map, name)] || [];
};

Headers.prototype.set = function set (name, value) {
    this.map[normalizeName(getName(this.map, name) || name)] = [trim(value)];
};

Headers.prototype.append = function append (name, value){

    var list = this.map[getName(this.map, name)];

    if (list) {
        list.push(trim(value));
    } else {
        this.set(name, value);
    }
};

Headers.prototype.delete = function delete$1 (name){
    delete this.map[getName(this.map, name)];
};

Headers.prototype.deleteAll = function deleteAll (){
    this.map = {};
};

Headers.prototype.forEach = function forEach (callback, thisArg) {
        var this$1 = this;

    each(this.map, function (list, name) {
        each(list, function (value) { return callback.call(thisArg, value, name, this$1); });
    });
};

function getName(map, name) {
    return Object.keys(map).reduce(function (prev, curr) {
        return toLower(name) === toLower(curr) ? curr : prev;
    }, null);
}

function normalizeName(name) {

    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
        throw new TypeError('Invalid character in header field name');
    }

    return trim(name);
}

/**
 * HTTP Response.
 */

var Response = function Response(body, ref) {
    var url = ref.url;
    var headers = ref.headers;
    var status = ref.status;
    var statusText = ref.statusText;


    this.url = url;
    this.ok = status >= 200 && status < 300;
    this.status = status || 0;
    this.statusText = statusText || '';
    this.headers = new Headers(headers);
    this.body = body;

    if (isString(body)) {

        this.bodyText = body;

    } else if (isBlob(body)) {

        this.bodyBlob = body;

        if (isBlobText(body)) {
            this.bodyText = blobText(body);
        }
    }
};

Response.prototype.blob = function blob () {
    return when(this.bodyBlob);
};

Response.prototype.text = function text () {
    return when(this.bodyText);
};

Response.prototype.json = function json () {
    return when(this.text(), function (text) { return JSON.parse(text); });
};

function blobText(body) {
    return new PromiseObj(function (resolve) {

        var reader = new FileReader();

        reader.readAsText(body);
        reader.onload = function () {
            resolve(reader.result);
        };

    });
}

function isBlobText(body) {
    return body.type.indexOf('text') === 0 || body.type.indexOf('json') !== -1;
}

/**
 * HTTP Request.
 */

var Request = function Request(options$$1) {

    this.body = null;
    this.params = {};

    assign(this, options$$1, {
        method: toUpper(options$$1.method || 'GET')
    });

    if (!(this.headers instanceof Headers)) {
        this.headers = new Headers(this.headers);
    }
};

Request.prototype.getUrl = function getUrl (){
    return Url(this);
};

Request.prototype.getBody = function getBody (){
    return this.body;
};

Request.prototype.respondWith = function respondWith (body, options$$1) {
    return new Response(body, assign(options$$1 || {}, {url: this.getUrl()}));
};

/**
 * Service for sending network requests.
 */

var COMMON_HEADERS = {'Accept': 'application/json, text/plain, */*'};
var JSON_CONTENT_TYPE = {'Content-Type': 'application/json;charset=utf-8'};

function Http(options$$1) {

    var self = this || {}, client = Client(self.$vm);

    defaults(options$$1 || {}, self.$options, Http.options);

    Http.interceptors.forEach(function (handler) {
        client.use(handler);
    });

    return client(new Request(options$$1)).then(function (response) {

        return response.ok ? response : PromiseObj.reject(response);

    }, function (response) {

        if (response instanceof Error) {
            error(response);
        }

        return PromiseObj.reject(response);
    });
}

Http.options = {};

Http.headers = {
    put: JSON_CONTENT_TYPE,
    post: JSON_CONTENT_TYPE,
    patch: JSON_CONTENT_TYPE,
    delete: JSON_CONTENT_TYPE,
    common: COMMON_HEADERS,
    custom: {}
};

Http.interceptors = [before, method, body, jsonp, header, cors];

['get', 'delete', 'head', 'jsonp'].forEach(function (method$$1) {

    Http[method$$1] = function (url, options$$1) {
        return this(assign(options$$1 || {}, {url: url, method: method$$1}));
    };

});

['post', 'put', 'patch'].forEach(function (method$$1) {

    Http[method$$1] = function (url, body$$1, options$$1) {
        return this(assign(options$$1 || {}, {url: url, method: method$$1, body: body$$1}));
    };

});

/**
 * Service for interacting with RESTful services.
 */

function Resource(url, params, actions, options$$1) {

    var self = this || {}, resource = {};

    actions = assign({},
        Resource.actions,
        actions
    );

    each(actions, function (action, name) {

        action = merge({url: url, params: assign({}, params)}, options$$1, action);

        resource[name] = function () {
            return (self.$http || Http)(opts(action, arguments));
        };
    });

    return resource;
}

function opts(action, args) {

    var options$$1 = assign({}, action), params = {}, body;

    switch (args.length) {

        case 2:

            params = args[0];
            body = args[1];

            break;

        case 1:

            if (/^(POST|PUT|PATCH)$/i.test(options$$1.method)) {
                body = args[0];
            } else {
                params = args[0];
            }

            break;

        case 0:

            break;

        default:

            throw 'Expected up to 2 arguments [params, body], got ' + args.length + ' arguments';
    }

    options$$1.body = body;
    options$$1.params = assign({}, options$$1.params, params);

    return options$$1;
}

Resource.actions = {

    get: {method: 'GET'},
    save: {method: 'POST'},
    query: {method: 'GET'},
    update: {method: 'PUT'},
    remove: {method: 'DELETE'},
    delete: {method: 'DELETE'}

};

/**
 * Install plugin.
 */

function plugin(Vue) {

    if (plugin.installed) {
        return;
    }

    Util(Vue);

    Vue.url = Url;
    Vue.http = Http;
    Vue.resource = Resource;
    Vue.Promise = PromiseObj;

    Object.defineProperties(Vue.prototype, {

        $url: {
            get: function get() {
                return options(Vue.url, this, this.$options.url);
            }
        },

        $http: {
            get: function get() {
                return options(Vue.http, this, this.$options.http);
            }
        },

        $resource: {
            get: function get() {
                return Vue.resource.bind(this);
            }
        },

        $promise: {
            get: function get() {
                var this$1 = this;

                return function (executor) { return new Vue.Promise(executor, this$1); };
            }
        }

    });
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin);
}

module.exports = plugin;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Store */
/* unused harmony export mapState */
/* unused harmony export mapMutations */
/* unused harmony export mapGetters */
/* unused harmony export mapActions */
/**
 * vuex v2.2.1
 * (c) 2017 Evan You
 * @license MIT
 */
var applyMixin = function (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    var usesInit = Vue.config._lifecycleHooks.indexOf('init') > -1;
    Vue.mixin(usesInit ? { init: vuexInit } : { beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
};

var devtoolHook =
  typeof window !== 'undefined' &&
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */


/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  this._children = Object.create(null);
  this._rawModule = rawModule;
};

var prototypeAccessors$1 = { state: {},namespaced: {} };

prototypeAccessors$1.state.get = function () {
  return this._rawModule.state || {}
};

prototypeAccessors$1.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors$1 );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  var this$1 = this;

  // register root module (Vuex.Store options)
  this.root = new Module(rawRootModule, false);

  // register all nested modules
  if (rawRootModule.modules) {
    forEachValue(rawRootModule.modules, function (rawModule, key) {
      this$1.register([key], rawModule, false);
    });
  }
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update(this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  var parent = this.get(path.slice(0, -1));
  var newModule = new Module(rawModule, runtime);
  parent.addChild(path[path.length - 1], newModule);

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

function update (targetModule, newModule) {
  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        console.warn(
          "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
          'manual reload is needed'
        );
        return
      }
      update(targetModule.getChild(key), newModule.modules[key]);
    }
  }
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
  assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");

  var state = options.state; if ( state === void 0 ) state = {};
  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.concat(devtoolPlugin).forEach(function (plugin) { return plugin(this$1); });
};

var prototypeAccessors = { state: {} };

prototypeAccessors.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors.state.set = function (v) {
  assert(false, "Use store.replaceState() to explicit replace store state.");
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    console.error(("[vuex] unknown mutation type: " + type));
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

  if (options && options.silent) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var entry = this._actions[type];
  if (!entry) {
    console.error(("[vuex] unknown action type: " + type));
    return
  }
  return entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload)
};

Store.prototype.subscribe = function subscribe (fn) {
  var subs = this._subscribers;
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  assert(typeof getter === 'function', "store.watch only accepts a function.");
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule) {
  if (typeof path === 'string') { path = [path]; }
  assert(Array.isArray(path), "module path must be a string or an Array.");
  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path));
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }
  assert(Array.isArray(path), "module path must be a string or an Array.");
  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors );

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = function () { return fn(store); };
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (namespace) {
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var namespacedType = namespace + key;
    registerAction(store, namespacedType, action, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (!store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (!store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  var gettersProxy = {};

  var splitPos = namespace.length;
  Object.keys(store.getters).forEach(function (type) {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) { return }

    // extract local getter type
    var localType = type.slice(splitPos);

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get: function () { return store.getters[type]; },
      enumerable: true
    });
  });

  return gettersProxy
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler(local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload, cb) {
    var res = handler({
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    console.error(("[vuex] duplicate getter key: " + type));
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.length
    ? path.reduce(function (state, key) { return state[key]; }, state)
    : state
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  assert(typeof type === 'string', ("Expects string as the type, but found " + (typeof type) + "."));

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue) {
    console.error(
      '[vuex] already installed. Vue.use(Vuex) should be called only once.'
    );
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

// auto install in dist mode
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      if (namespace && !getModuleByNamespace(this.$store, 'mapMutations', namespace)) {
        return
      }
      return this.$store.commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (!(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      if (namespace && !getModuleByNamespace(this.$store, 'mapActions', namespace)) {
        return
      }
      return this.$store.dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (!module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index_esm = {
  Store: Store,
  install: install,
  version: '2.2.1',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions
};

/* harmony default export */ __webpack_exports__["a"] = index_esm;


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_index_vue__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__app_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_a_vue__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_a_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__app_a_vue__);
/**
 * Created by ASUS on 2017/3/11.
 */


__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]);



/* harmony default export */ __webpack_exports__["a"] = new __WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]({
    routes:[{
        path:'/',
        component:__WEBPACK_IMPORTED_MODULE_2__app_index_vue___default.a
    },{
        path:'/a',
        component:__WEBPACK_IMPORTED_MODULE_3__app_a_vue___default.a
    }]
});

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)();
// imports


// module
exports.push([module.i, "/*!\r\n * WeUI v1.1.1 (https://github.com/weui/weui)\r\n * Copyright 2017 Tencent, Inc.\r\n * Licensed under the MIT license\r\n */\r\nhtml {\r\n  -ms-text-size-adjust: 100%;\r\n  -webkit-text-size-adjust: 100%;\r\n}\r\nbody {\r\n  line-height: 1.6;\r\n  font-family: -apple-system-font, \"Helvetica Neue\", sans-serif;\r\n}\r\n* {\r\n  margin: 0;\r\n  padding: 0;\r\n}\r\na img {\r\n  border: 0;\r\n}\r\na {\r\n  text-decoration: none;\r\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\r\n}\r\n@font-face {\r\n  font-weight: normal;\r\n  font-style: normal;\r\n  font-family: \"weui\";\r\n  src: url('data:application/octet-stream;base64,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') format('truetype');\r\n}\r\n[class^=\"weui-icon-\"],\r\n[class*=\" weui-icon-\"] {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  font: normal normal normal 14px/1 \"weui\";\r\n  font-size: inherit;\r\n  text-rendering: auto;\r\n  -webkit-font-smoothing: antialiased;\r\n}\r\n[class^=\"weui-icon-\"]:before,\r\n[class*=\" weui-icon-\"]:before {\r\n  display: inline-block;\r\n  margin-left: .2em;\r\n  margin-right: .2em;\r\n}\r\n.weui-icon-circle:before {\r\n  content: \"\\EA01\";\r\n}\r\n/* '' */\r\n.weui-icon-download:before {\r\n  content: \"\\EA02\";\r\n}\r\n/* '' */\r\n.weui-icon-info:before {\r\n  content: \"\\EA03\";\r\n}\r\n/* '' */\r\n.weui-icon-safe-success:before {\r\n  content: \"\\EA04\";\r\n}\r\n/* '' */\r\n.weui-icon-safe-warn:before {\r\n  content: \"\\EA05\";\r\n}\r\n/* '' */\r\n.weui-icon-success:before {\r\n  content: \"\\EA06\";\r\n}\r\n/* '' */\r\n.weui-icon-success-circle:before {\r\n  content: \"\\EA07\";\r\n}\r\n/* '' */\r\n.weui-icon-success-no-circle:before {\r\n  content: \"\\EA08\";\r\n}\r\n/* '' */\r\n.weui-icon-waiting:before {\r\n  content: \"\\EA09\";\r\n}\r\n/* '' */\r\n.weui-icon-waiting-circle:before {\r\n  content: \"\\EA0A\";\r\n}\r\n/* '' */\r\n.weui-icon-warn:before {\r\n  content: \"\\EA0B\";\r\n}\r\n/* '' */\r\n.weui-icon-info-circle:before {\r\n  content: \"\\EA0C\";\r\n}\r\n/* '' */\r\n.weui-icon-cancel:before {\r\n  content: \"\\EA0D\";\r\n}\r\n/* '' */\r\n.weui-icon-search:before {\r\n  content: \"\\EA0E\";\r\n}\r\n/* '' */\r\n.weui-icon-clear:before {\r\n  content: \"\\EA0F\";\r\n}\r\n/* '' */\r\n.weui-icon-back:before {\r\n  content: \"\\EA10\";\r\n}\r\n/* '' */\r\n.weui-icon-delete:before {\r\n  content: \"\\EA11\";\r\n}\r\n/* '' */\r\n[class^=\"weui-icon_\"]:before,\r\n[class*=\" weui-icon_\"]:before {\r\n  margin: 0;\r\n}\r\n.weui-icon-success {\r\n  font-size: 23px;\r\n  color: #09BB07;\r\n}\r\n.weui-icon-waiting {\r\n  font-size: 23px;\r\n  color: #10AEFF;\r\n}\r\n.weui-icon-warn {\r\n  font-size: 23px;\r\n  color: #F43530;\r\n}\r\n.weui-icon-info {\r\n  font-size: 23px;\r\n  color: #10AEFF;\r\n}\r\n.weui-icon-success-circle {\r\n  font-size: 23px;\r\n  color: #09BB07;\r\n}\r\n.weui-icon-success-no-circle {\r\n  font-size: 23px;\r\n  color: #09BB07;\r\n}\r\n.weui-icon-waiting-circle {\r\n  font-size: 23px;\r\n  color: #10AEFF;\r\n}\r\n.weui-icon-circle {\r\n  font-size: 23px;\r\n  color: #C9C9C9;\r\n}\r\n.weui-icon-download {\r\n  font-size: 23px;\r\n  color: #09BB07;\r\n}\r\n.weui-icon-info-circle {\r\n  font-size: 23px;\r\n  color: #09BB07;\r\n}\r\n.weui-icon-safe-success {\r\n  color: #09BB07;\r\n}\r\n.weui-icon-safe-warn {\r\n  color: #FFBE00;\r\n}\r\n.weui-icon-cancel {\r\n  color: #F43530;\r\n  font-size: 22px;\r\n}\r\n.weui-icon-search {\r\n  color: #B2B2B2;\r\n  font-size: 14px;\r\n}\r\n.weui-icon-clear {\r\n  color: #B2B2B2;\r\n  font-size: 14px;\r\n}\r\n.weui-icon-delete.weui-icon_gallery-delete {\r\n  color: #FFFFFF;\r\n  font-size: 22px;\r\n}\r\n.weui-icon_msg {\r\n  font-size: 93px;\r\n}\r\n.weui-icon_msg.weui-icon-warn {\r\n  color: #F76260;\r\n}\r\n.weui-icon_msg-primary {\r\n  font-size: 93px;\r\n}\r\n.weui-icon_msg-primary.weui-icon-warn {\r\n  color: #FFBE00;\r\n}\r\n.weui-btn {\r\n  position: relative;\r\n  display: block;\r\n  margin-left: auto;\r\n  margin-right: auto;\r\n  padding-left: 14px;\r\n  padding-right: 14px;\r\n  box-sizing: border-box;\r\n  font-size: 18px;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  color: #FFFFFF;\r\n  line-height: 2.55555556;\r\n  border-radius: 5px;\r\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\r\n  overflow: hidden;\r\n}\r\n.weui-btn:after {\r\n  content: \" \";\r\n  width: 200%;\r\n  height: 200%;\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  border: 1px solid rgba(0, 0, 0, 0.2);\r\n  -webkit-transform: scale(0.5);\r\n          transform: scale(0.5);\r\n  -webkit-transform-origin: 0 0;\r\n          transform-origin: 0 0;\r\n  box-sizing: border-box;\r\n  border-radius: 10px;\r\n}\r\n.weui-btn_inline {\r\n  display: inline-block;\r\n}\r\n.weui-btn_default {\r\n  color: #000000;\r\n  background-color: #F8F8F8;\r\n}\r\n.weui-btn_default:not(.weui-btn_disabled):visited {\r\n  color: #000000;\r\n}\r\n.weui-btn_default:not(.weui-btn_disabled):active {\r\n  color: rgba(0, 0, 0, 0.6);\r\n  background-color: #DEDEDE;\r\n}\r\n.weui-btn_primary {\r\n  background-color: #1AAD19;\r\n}\r\n.weui-btn_primary:not(.weui-btn_disabled):visited {\r\n  color: #FFFFFF;\r\n}\r\n.weui-btn_primary:not(.weui-btn_disabled):active {\r\n  color: rgba(255, 255, 255, 0.6);\r\n  background-color: #179B16;\r\n}\r\n.weui-btn_warn {\r\n  background-color: #E64340;\r\n}\r\n.weui-btn_warn:not(.weui-btn_disabled):visited {\r\n  color: #FFFFFF;\r\n}\r\n.weui-btn_warn:not(.weui-btn_disabled):active {\r\n  color: rgba(255, 255, 255, 0.6);\r\n  background-color: #CE3C39;\r\n}\r\n.weui-btn_disabled {\r\n  color: rgba(255, 255, 255, 0.6);\r\n}\r\n.weui-btn_disabled.weui-btn_default {\r\n  color: rgba(0, 0, 0, 0.3);\r\n  background-color: #F7F7F7;\r\n}\r\n.weui-btn_disabled.weui-btn_primary {\r\n  background-color: #9ED99D;\r\n}\r\n.weui-btn_disabled.weui-btn_warn {\r\n  background-color: #EC8B89;\r\n}\r\n.weui-btn_loading .weui-loading {\r\n  margin: -0.2em 0.34em 0 0;\r\n}\r\n.weui-btn_loading.weui-btn_primary,\r\n.weui-btn_loading.weui-btn_warn {\r\n  color: rgba(255, 255, 255, 0.6);\r\n}\r\n.weui-btn_loading.weui-btn_primary .weui-loading,\r\n.weui-btn_loading.weui-btn_warn .weui-loading {\r\n  background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 100 100'%3E%3Cpath fill='none' d='M0 0h100v100H0z'/%3E%3Crect xmlns='http://www.w3.org/2000/svg' width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.56)' rx='5' ry='5' transform='translate(0 -30)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.5)' rx='5' ry='5' transform='rotate(30 105.98 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.43)' rx='5' ry='5' transform='rotate(60 75.98 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.38)' rx='5' ry='5' transform='rotate(90 65 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.32)' rx='5' ry='5' transform='rotate(120 58.66 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.28)' rx='5' ry='5' transform='rotate(150 54.02 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.25)' rx='5' ry='5' transform='rotate(180 50 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.2)' rx='5' ry='5' transform='rotate(-150 45.98 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.17)' rx='5' ry='5' transform='rotate(-120 41.34 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.14)' rx='5' ry='5' transform='rotate(-90 35 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.1)' rx='5' ry='5' transform='rotate(-60 24.02 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.03)' rx='5' ry='5' transform='rotate(-30 -5.98 65)'/%3E%3C/svg%3E\");\r\n}\r\n.weui-btn_loading.weui-btn_primary {\r\n  background-color: #179B16;\r\n}\r\n.weui-btn_loading.weui-btn_warn {\r\n  background-color: #CE3C39;\r\n}\r\n.weui-btn_plain-primary {\r\n  color: #1aad19;\r\n  border: 1px solid #1aad19;\r\n}\r\n.weui-btn_plain-primary:not(.weui-btn_plain-disabled):active {\r\n  color: rgba(26, 173, 25, 0.6);\r\n  border-color: rgba(26, 173, 25, 0.6);\r\n}\r\n.weui-btn_plain-primary:after {\r\n  border-width: 0;\r\n}\r\n.weui-btn_plain-default {\r\n  color: #353535;\r\n  border: 1px solid #353535;\r\n}\r\n.weui-btn_plain-default:not(.weui-btn_plain-disabled):active {\r\n  color: rgba(53, 53, 53, 0.6);\r\n  border-color: rgba(53, 53, 53, 0.6);\r\n}\r\n.weui-btn_plain-default:after {\r\n  border-width: 0;\r\n}\r\n.weui-btn_plain-disabled {\r\n  color: rgba(0, 0, 0, 0.2);\r\n  border-color: rgba(0, 0, 0, 0.2);\r\n}\r\nbutton.weui-btn,\r\ninput.weui-btn {\r\n  width: 100%;\r\n  border-width: 0;\r\n  outline: 0;\r\n  -webkit-appearance: none;\r\n}\r\nbutton.weui-btn:focus,\r\ninput.weui-btn:focus {\r\n  outline: 0;\r\n}\r\nbutton.weui-btn_inline,\r\ninput.weui-btn_inline,\r\nbutton.weui-btn_mini,\r\ninput.weui-btn_mini {\r\n  width: auto;\r\n}\r\nbutton.weui-btn_plain-primary,\r\ninput.weui-btn_plain-primary,\r\nbutton.weui-btn_plain-default,\r\ninput.weui-btn_plain-default {\r\n  border-width: 1px;\r\n  background-color: transparent;\r\n}\r\n.weui-btn_mini {\r\n  display: inline-block;\r\n  padding: 0 1.32em;\r\n  line-height: 2.3;\r\n  font-size: 13px;\r\n}\r\n/*gap between btn*/\r\n.weui-btn + .weui-btn {\r\n  margin-top: 15px;\r\n}\r\n.weui-btn.weui-btn_inline + .weui-btn.weui-btn_inline {\r\n  margin-top: auto;\r\n  margin-left: 15px;\r\n}\r\n.weui-btn-area {\r\n  margin: 1.17647059em 15px 0.3em;\r\n}\r\n.weui-btn-area_inline {\r\n  display: -webkit-box;\r\n  display: -webkit-flex;\r\n  display: flex;\r\n}\r\n.weui-btn-area_inline .weui-btn {\r\n  margin-top: auto;\r\n  margin-right: 15px;\r\n  width: 100%;\r\n  -webkit-box-flex: 1;\r\n  -webkit-flex: 1;\r\n          flex: 1;\r\n}\r\n.weui-btn-area_inline .weui-btn:last-child {\r\n  margin-right: 0;\r\n}\r\n.weui-cells {\r\n  margin-top: 1.17647059em;\r\n  background-color: #FFFFFF;\r\n  line-height: 1.41176471;\r\n  font-size: 17px;\r\n  overflow: hidden;\r\n  position: relative;\r\n}\r\n.weui-cells:before {\r\n  content: \" \";\r\n  position: absolute;\r\n  left: 0;\r\n  top: 0;\r\n  right: 0;\r\n  height: 1px;\r\n  border-top: 1px solid #D9D9D9;\r\n  color: #D9D9D9;\r\n  -webkit-transform-origin: 0 0;\r\n          transform-origin: 0 0;\r\n  -webkit-transform: scaleY(0.5);\r\n          transform: scaleY(0.5);\r\n}\r\n.weui-cells:after {\r\n  content: \" \";\r\n  position: absolute;\r\n  left: 0;\r\n  bottom: 0;\r\n  right: 0;\r\n  height: 1px;\r\n  border-bottom: 1px solid #D9D9D9;\r\n  color: #D9D9D9;\r\n  -webkit-transform-origin: 0 100%;\r\n          transform-origin: 0 100%;\r\n  -webkit-transform: scaleY(0.5);\r\n          transform: scaleY(0.5);\r\n}\r\n.weui-cells__title {\r\n  margin-top: .77em;\r\n  margin-bottom: .3em;\r\n  padding-left: 15px;\r\n  padding-right: 15px;\r\n  color: #999999;\r\n  font-size: 14px;\r\n}\r\n.weui-cells__title + .weui-cells {\r\n  margin-top: 0;\r\n}\r\n.weui-cells__tips {\r\n  margin-top: .3em;\r\n  color: #999999;\r\n  padding-left: 15px;\r\n  padding-right: 15px;\r\n  font-size: 14px;\r\n}\r\n.weui-cell {\r\n  padding: 10px 15px;\r\n  position: relative;\r\n  display: -webkit-box;\r\n  display: -webkit-flex;\r\n  display: flex;\r\n  -webkit-box-align: center;\r\n  -webkit-align-items: center;\r\n          align-items: center;\r\n}\r\n.weui-cell:before {\r\n  content: \" \";\r\n  position: absolute;\r\n  left: 0;\r\n  top: 0;\r\n  right: 0;\r\n  height: 1px;\r\n  border-top: 1px solid #D9D9D9;\r\n  color: #D9D9D9;\r\n  -webkit-transform-origin: 0 0;\r\n          transform-origin: 0 0;\r\n  -webkit-transform: scaleY(0.5);\r\n          transform: scaleY(0.5);\r\n  left: 15px;\r\n}\r\n.weui-cell:first-child:before {\r\n  display: none;\r\n}\r\n.weui-cell_primary {\r\n  -webkit-box-align: start;\r\n  -webkit-align-items: flex-start;\r\n          align-items: flex-start;\r\n}\r\n.weui-cell__bd {\r\n  -webkit-box-flex: 1;\r\n  -webkit-flex: 1;\r\n          flex: 1;\r\n}\r\n.weui-cell__ft {\r\n  text-align: right;\r\n  color: #999999;\r\n}\r\n.weui-cell_access {\r\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\r\n  color: inherit;\r\n}\r\n.weui-cell_access:active {\r\n  background-color: #ECECEC;\r\n}\r\n.weui-cell_access .weui-cell__ft {\r\n  padding-right: 13px;\r\n  position: relative;\r\n}\r\n.weui-cell_access .weui-cell__ft:after {\r\n  content: \" \";\r\n  display: inline-block;\r\n  height: 6px;\r\n  width: 6px;\r\n  border-width: 2px 2px 0 0;\r\n  border-color: #C8C8CD;\r\n  border-style: solid;\r\n  -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);\r\n          transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);\r\n  position: relative;\r\n  top: -2px;\r\n  position: absolute;\r\n  top: 50%;\r\n  margin-top: -4px;\r\n  right: 2px;\r\n}\r\n.weui-cell_link {\r\n  color: #586C94;\r\n  font-size: 14px;\r\n}\r\n.weui-cell_link:first-child:before {\r\n  display: block;\r\n}\r\n.weui-check__label {\r\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\r\n}\r\n.weui-check__label:active {\r\n  background-color: #ECECEC;\r\n}\r\n.weui-check {\r\n  position: absolute;\r\n  left: -9999em;\r\n}\r\n.weui-cells_radio .weui-cell__ft {\r\n  padding-left: 0.35em;\r\n}\r\n.weui-cells_radio .weui-check:checked + .weui-icon-checked:before {\r\n  display: block;\r\n  content: '\\EA08';\r\n  color: #09BB07;\r\n  font-size: 16px;\r\n}\r\n.weui-cells_checkbox .weui-cell__hd {\r\n  padding-right: 0.35em;\r\n}\r\n.weui-cells_checkbox .weui-icon-checked:before {\r\n  content: '\\EA01';\r\n  color: #C9C9C9;\r\n  font-size: 23px;\r\n  display: block;\r\n}\r\n.weui-cells_checkbox .weui-check:checked + .weui-icon-checked:before {\r\n  content: '\\EA06';\r\n  color: #09BB07;\r\n}\r\n.weui-label {\r\n  display: block;\r\n  width: 105px;\r\n  word-wrap: break-word;\r\n  word-break: break-all;\r\n}\r\n.weui-input {\r\n  width: 100%;\r\n  border: 0;\r\n  outline: 0;\r\n  -webkit-appearance: none;\r\n  background-color: transparent;\r\n  font-size: inherit;\r\n  color: inherit;\r\n  height: 1.41176471em;\r\n  line-height: 1.41176471;\r\n}\r\n.weui-input::-webkit-outer-spin-button,\r\n.weui-input::-webkit-inner-spin-button {\r\n  -webkit-appearance: none;\r\n  margin: 0;\r\n}\r\n.weui-textarea {\r\n  display: block;\r\n  border: 0;\r\n  resize: none;\r\n  width: 100%;\r\n  color: inherit;\r\n  font-size: 1em;\r\n  line-height: inherit;\r\n  outline: 0;\r\n}\r\n.weui-textarea-counter {\r\n  color: #B2B2B2;\r\n  text-align: right;\r\n}\r\n.weui-cell_warn .weui-textarea-counter {\r\n  color: #E64340;\r\n}\r\n.weui-toptips {\r\n  display: none;\r\n  position: fixed;\r\n  -webkit-transform: translateZ(0);\r\n          transform: translateZ(0);\r\n  top: 0;\r\n  left: 0;\r\n  right: 0;\r\n  padding: 5px;\r\n  font-size: 14px;\r\n  text-align: center;\r\n  color: #FFF;\r\n  z-index: 5000;\r\n  word-wrap: break-word;\r\n  word-break: break-all;\r\n}\r\n.weui-toptips_warn {\r\n  background-color: #E64340;\r\n}\r\n.weui-cells_form .weui-cell__ft {\r\n  font-size: 0;\r\n}\r\n.weui-cells_form .weui-icon-warn {\r\n  display: none;\r\n}\r\n.weui-cells_form input,\r\n.weui-cells_form textarea,\r\n.weui-cells_form label[for] {\r\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\r\n}\r\n.weui-cell_warn {\r\n  color: #E64340;\r\n}\r\n.weui-cell_warn .weui-icon-warn {\r\n  display: inline-block;\r\n}\r\n.weui-form-preview {\r\n  position: relative;\r\n  background-color: #FFFFFF;\r\n}\r\n.weui-form-preview:before {\r\n  content: \" \";\r\n  position: absolute;\r\n  left: 0;\r\n  top: 0;\r\n  right: 0;\r\n  height: 1px;\r\n  border-top: 1px solid #D9D9D9;\r\n  color: #D9D9D9;\r\n  -webkit-transform-origin: 0 0;\r\n          transform-origin: 0 0;\r\n  -webkit-transform: scaleY(0.5);\r\n          transform: scaleY(0.5);\r\n}\r\n.weui-form-preview:after {\r\n  content: \" \";\r\n  position: absolute;\r\n  left: 0;\r\n  bottom: 0;\r\n  right: 0;\r\n  height: 1px;\r\n  border-bottom: 1px solid #D9D9D9;\r\n  color: #D9D9D9;\r\n  -webkit-transform-origin: 0 100%;\r\n          transform-origin: 0 100%;\r\n  -webkit-transform: scaleY(0.5);\r\n          transform: scaleY(0.5);\r\n}\r\n.weui-form-preview__hd {\r\n  position: relative;\r\n  padding: 10px 15px;\r\n  text-align: right;\r\n  line-height: 2.5em;\r\n}\r\n.weui-form-preview__hd:after {\r\n  content: \" \";\r\n  position: absolute;\r\n  left: 0;\r\n  bottom: 0;\r\n  right: 0;\r\n  height: 1px;\r\n  border-bottom: 1px solid #D9D9D9;\r\n  color: #D9D9D9;\r\n  -webkit-transform-origin: 0 100%;\r\n          transform-origin: 0 100%;\r\n  -webkit-transform: scaleY(0.5);\r\n          transform: scaleY(0.5);\r\n  left: 15px;\r\n}\r\n.weui-form-preview__hd .weui-form-preview__value {\r\n  font-style: normal;\r\n  font-size: 1.6em;\r\n}\r\n.weui-form-preview__bd {\r\n  padding: 10px 15px;\r\n  font-size: .9em;\r\n  text-align: right;\r\n  color: #999999;\r\n  line-height: 2;\r\n}\r\n.weui-form-preview__ft {\r\n  position: relative;\r\n  line-height: 50px;\r\n  display: -webkit-box;\r\n  display: -webkit-flex;\r\n  display: flex;\r\n}\r\n.weui-form-preview__ft:after {\r\n  content: \" \";\r\n  position: absolute;\r\n  left: 0;\r\n  top: 0;\r\n  right: 0;\r\n  height: 1px;\r\n  border-top: 1px solid #D5D5D6;\r\n  color: #D5D5D6;\r\n  -webkit-transform-origin: 0 0;\r\n          transform-origin: 0 0;\r\n  -webkit-transform: scaleY(0.5);\r\n          transform: scaleY(0.5);\r\n}\r\n.weui-form-preview__item {\r\n  overflow: hidden;\r\n}\r\n.weui-form-preview__label {\r\n  float: left;\r\n  margin-right: 1em;\r\n  min-width: 4em;\r\n  color: #999999;\r\n  text-align: justify;\r\n  text-align-last: justify;\r\n}\r\n.weui-form-preview__value {\r\n  display: block;\r\n  overflow: hidden;\r\n  word-break: normal;\r\n  word-wrap: break-word;\r\n}\r\n.weui-form-preview__btn {\r\n  position: relative;\r\n  display: block;\r\n  -webkit-box-flex: 1;\r\n  -webkit-flex: 1;\r\n          flex: 1;\r\n  color: #3CC51F;\r\n  text-align: center;\r\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\r\n}\r\nbutton.weui-form-preview__btn {\r\n  background-color: transparent;\r\n  border: 0;\r\n  outline: 0;\r\n  line-height: inherit;\r\n  font-size: inherit;\r\n}\r\n.weui-form-preview__btn:active {\r\n  background-color: #EEEEEE;\r\n}\r\n.weui-form-preview__btn:after {\r\n  content: \" \";\r\n  position: absolute;\r\n  left: 0;\r\n  top: 0;\r\n  width: 1px;\r\n  bottom: 0;\r\n  border-left: 1px solid #D5D5D6;\r\n  color: #D5D5D6;\r\n  -webkit-transform-origin: 0 0;\r\n          transform-origin: 0 0;\r\n  -webkit-transform: scaleX(0.5);\r\n          transform: scaleX(0.5);\r\n}\r\n.weui-form-preview__btn:first-child:after {\r\n  display: none;\r\n}\r\n.weui-form-preview__btn_default {\r\n  color: #999999;\r\n}\r\n.weui-form-preview__btn_primary {\r\n  color: #0BB20C;\r\n}\r\n.weui-cell_select {\r\n  padding: 0;\r\n}\r\n.weui-cell_select .weui-select {\r\n  padding-right: 30px;\r\n}\r\n.weui-cell_select .weui-cell__bd:after {\r\n  content: \" \";\r\n  display: inline-block;\r\n  height: 6px;\r\n  width: 6px;\r\n  border-width: 2px 2px 0 0;\r\n  border-color: #C8C8CD;\r\n  border-style: solid;\r\n  -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);\r\n          transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);\r\n  position: relative;\r\n  top: -2px;\r\n  position: absolute;\r\n  top: 50%;\r\n  right: 15px;\r\n  margin-top: -4px;\r\n}\r\n.weui-select {\r\n  -webkit-appearance: none;\r\n  border: 0;\r\n  outline: 0;\r\n  background-color: transparent;\r\n  width: 100%;\r\n  font-size: inherit;\r\n  height: 44px;\r\n  line-height: 44px;\r\n  position: relative;\r\n  z-index: 1;\r\n  padding-left: 15px;\r\n}\r\n.weui-cell_select-before {\r\n  padding-right: 15px;\r\n}\r\n.weui-cell_select-before .weui-select {\r\n  width: 105px;\r\n  box-sizing: border-box;\r\n}\r\n.weui-cell_select-before .weui-cell__hd {\r\n  position: relative;\r\n}\r\n.weui-cell_select-before .weui-cell__hd:after {\r\n  content: \" \";\r\n  position: absolute;\r\n  right: 0;\r\n  top: 0;\r\n  width: 1px;\r\n  bottom: 0;\r\n  border-right: 1px solid #D9D9D9;\r\n  color: #D9D9D9;\r\n  -webkit-transform-origin: 100% 0;\r\n          transform-origin: 100% 0;\r\n  -webkit-transform: scaleX(0.5);\r\n          transform: scaleX(0.5);\r\n}\r\n.weui-cell_select-before .weui-cell__hd:before {\r\n  content: \" \";\r\n  display: inline-block;\r\n  height: 6px;\r\n  width: 6px;\r\n  border-width: 2px 2px 0 0;\r\n  border-color: #C8C8CD;\r\n  border-style: solid;\r\n  -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);\r\n          transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);\r\n  position: relative;\r\n  top: -2px;\r\n  position: absolute;\r\n  top: 50%;\r\n  right: 15px;\r\n  margin-top: -4px;\r\n}\r\n.weui-cell_select-before .weui-cell__bd {\r\n  padding-left: 15px;\r\n}\r\n.weui-cell_select-before .weui-cell__bd:after {\r\n  display: none;\r\n}\r\n.weui-cell_select-after {\r\n  padding-left: 15px;\r\n}\r\n.weui-cell_select-after .weui-select {\r\n  padding-left: 0;\r\n}\r\n.weui-cell_vcode {\r\n  padding-top: 0;\r\n  padding-right: 0;\r\n  padding-bottom: 0;\r\n}\r\n.weui-vcode-img {\r\n  margin-left: 5px;\r\n  height: 44px;\r\n  vertical-align: middle;\r\n}\r\n.weui-vcode-btn {\r\n  display: inline-block;\r\n  height: 44px;\r\n  margin-left: 5px;\r\n  padding: 0 0.6em 0 0.7em;\r\n  border-left: 1px solid #E5E5E5;\r\n  line-height: 44px;\r\n  vertical-align: middle;\r\n  font-size: 17px;\r\n  color: #3CC51F;\r\n}\r\nbutton.weui-vcode-btn {\r\n  background-color: transparent;\r\n  border-top: 0;\r\n  border-right: 0;\r\n  border-bottom: 0;\r\n  outline: 0;\r\n}\r\n.weui-vcode-btn:active {\r\n  color: #52a341;\r\n}\r\n.weui-gallery {\r\n  display: none;\r\n  position: fixed;\r\n  top: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  left: 0;\r\n  background-color: #000000;\r\n  z-index: 1000;\r\n}\r\n.weui-gallery__img {\r\n  position: absolute;\r\n  top: 0;\r\n  right: 0;\r\n  bottom: 60px;\r\n  left: 0;\r\n  background: center center no-repeat;\r\n  background-size: contain;\r\n}\r\n.weui-gallery__opr {\r\n  position: absolute;\r\n  right: 0;\r\n  bottom: 0;\r\n  left: 0;\r\n  background-color: #0D0D0D;\r\n  color: #FFFFFF;\r\n  line-height: 60px;\r\n  text-align: center;\r\n}\r\n.weui-gallery__del {\r\n  display: block;\r\n}\r\n.weui-cell_switch {\r\n  padding-top: 6px;\r\n  padding-bottom: 6px;\r\n}\r\n.weui-switch {\r\n  -webkit-appearance: none;\r\n          appearance: none;\r\n}\r\n.weui-switch,\r\n.weui-switch-cp__box {\r\n  position: relative;\r\n  width: 52px;\r\n  height: 32px;\r\n  border: 1px solid #DFDFDF;\r\n  outline: 0;\r\n  border-radius: 16px;\r\n  box-sizing: border-box;\r\n  background-color: #DFDFDF;\r\n  -webkit-transition: background-color 0.1s, border 0.1s;\r\n  transition: background-color 0.1s, border 0.1s;\r\n}\r\n.weui-switch:before,\r\n.weui-switch-cp__box:before {\r\n  content: \" \";\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  width: 50px;\r\n  height: 30px;\r\n  border-radius: 15px;\r\n  background-color: #FDFDFD;\r\n  -webkit-transition: -webkit-transform 0.35s cubic-bezier(0.45, 1, 0.4, 1);\r\n  transition: -webkit-transform 0.35s cubic-bezier(0.45, 1, 0.4, 1);\r\n  transition: transform 0.35s cubic-bezier(0.45, 1, 0.4, 1);\r\n  transition: transform 0.35s cubic-bezier(0.45, 1, 0.4, 1), -webkit-transform 0.35s cubic-bezier(0.45, 1, 0.4, 1);\r\n}\r\n.weui-switch:after,\r\n.weui-switch-cp__box:after {\r\n  content: \" \";\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  width: 30px;\r\n  height: 30px;\r\n  border-radius: 15px;\r\n  background-color: #FFFFFF;\r\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);\r\n  -webkit-transition: -webkit-transform 0.35s cubic-bezier(0.4, 0.4, 0.25, 1.35);\r\n  transition: -webkit-transform 0.35s cubic-bezier(0.4, 0.4, 0.25, 1.35);\r\n  transition: transform 0.35s cubic-bezier(0.4, 0.4, 0.25, 1.35);\r\n  transition: transform 0.35s cubic-bezier(0.4, 0.4, 0.25, 1.35), -webkit-transform 0.35s cubic-bezier(0.4, 0.4, 0.25, 1.35);\r\n}\r\n.weui-switch:checked,\r\n.weui-switch-cp__input:checked ~ .weui-switch-cp__box {\r\n  border-color: #04BE02;\r\n  background-color: #04BE02;\r\n}\r\n.weui-switch:checked:before,\r\n.weui-switch-cp__input:checked ~ .weui-switch-cp__box:before {\r\n  -webkit-transform: scale(0);\r\n          transform: scale(0);\r\n}\r\n.weui-switch:checked:after,\r\n.weui-switch-cp__input:checked ~ .weui-switch-cp__box:after {\r\n  -webkit-transform: translateX(20px);\r\n          transform: translateX(20px);\r\n}\r\n.weui-switch-cp__input {\r\n  position: absolute;\r\n  left: -9999px;\r\n}\r\n.weui-switch-cp__box {\r\n  display: block;\r\n}\r\n.weui-uploader__hd {\r\n  display: -webkit-box;\r\n  display: -webkit-flex;\r\n  display: flex;\r\n  padding-bottom: 10px;\r\n  -webkit-box-align: center;\r\n  -webkit-align-items: center;\r\n          align-items: center;\r\n}\r\n.weui-uploader__title {\r\n  -webkit-box-flex: 1;\r\n  -webkit-flex: 1;\r\n          flex: 1;\r\n}\r\n.weui-uploader__info {\r\n  color: #B2B2B2;\r\n}\r\n.weui-uploader__bd {\r\n  margin-bottom: -4px;\r\n  margin-right: -9px;\r\n  overflow: hidden;\r\n}\r\n.weui-uploader__files {\r\n  list-style: none;\r\n}\r\n.weui-uploader__file {\r\n  float: left;\r\n  margin-right: 9px;\r\n  margin-bottom: 9px;\r\n  width: 79px;\r\n  height: 79px;\r\n  background: no-repeat center center;\r\n  background-size: cover;\r\n}\r\n.weui-uploader__file_status {\r\n  position: relative;\r\n}\r\n.weui-uploader__file_status:before {\r\n  content: \" \";\r\n  position: absolute;\r\n  top: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  left: 0;\r\n  background-color: rgba(0, 0, 0, 0.5);\r\n}\r\n.weui-uploader__file_status .weui-uploader__file-content {\r\n  display: block;\r\n}\r\n.weui-uploader__file-content {\r\n  display: none;\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  -webkit-transform: translate(-50%, -50%);\r\n          transform: translate(-50%, -50%);\r\n  color: #FFFFFF;\r\n}\r\n.weui-uploader__file-content .weui-icon-warn {\r\n  display: inline-block;\r\n}\r\n.weui-uploader__input-box {\r\n  float: left;\r\n  position: relative;\r\n  margin-right: 9px;\r\n  margin-bottom: 9px;\r\n  width: 77px;\r\n  height: 77px;\r\n  border: 1px solid #D9D9D9;\r\n}\r\n.weui-uploader__input-box:before,\r\n.weui-uploader__input-box:after {\r\n  content: \" \";\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  -webkit-transform: translate(-50%, -50%);\r\n          transform: translate(-50%, -50%);\r\n  background-color: #D9D9D9;\r\n}\r\n.weui-uploader__input-box:before {\r\n  width: 2px;\r\n  height: 39.5px;\r\n}\r\n.weui-uploader__input-box:after {\r\n  width: 39.5px;\r\n  height: 2px;\r\n}\r\n.weui-uploader__input-box:active {\r\n  border-color: #999999;\r\n}\r\n.weui-uploader__input-box:active:before,\r\n.weui-uploader__input-box:active:after {\r\n  background-color: #999999;\r\n}\r\n.weui-uploader__input {\r\n  position: absolute;\r\n  z-index: 1;\r\n  top: 0;\r\n  left: 0;\r\n  width: 100%;\r\n  height: 100%;\r\n  opacity: 0;\r\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\r\n}\r\n.weui-msg {\r\n  padding-top: 36px;\r\n  text-align: center;\r\n}\r\n.weui-msg__icon-area {\r\n  margin-bottom: 30px;\r\n}\r\n.weui-msg__text-area {\r\n  margin-bottom: 25px;\r\n  padding: 0 20px;\r\n}\r\n.weui-msg__text-area a {\r\n  color: #586C94;\r\n}\r\n.weui-msg__title {\r\n  margin-bottom: 5px;\r\n  font-weight: 400;\r\n  font-size: 20px;\r\n}\r\n.weui-msg__desc {\r\n  font-size: 14px;\r\n  color: #999999;\r\n}\r\n.weui-msg__opr-area {\r\n  margin-bottom: 25px;\r\n}\r\n.weui-msg__extra-area {\r\n  margin-bottom: 15px;\r\n  font-size: 14px;\r\n  color: #999999;\r\n}\r\n.weui-msg__extra-area a {\r\n  color: #586C94;\r\n}\r\n@media screen and (min-height: 438px) {\r\n  .weui-msg__extra-area {\r\n    position: fixed;\r\n    left: 0;\r\n    bottom: 0;\r\n    width: 100%;\r\n    text-align: center;\r\n  }\r\n}\r\n.weui-article {\r\n  padding: 20px 15px;\r\n  font-size: 15px;\r\n}\r\n.weui-article section {\r\n  margin-bottom: 1.5em;\r\n}\r\n.weui-article h1 {\r\n  font-size: 18px;\r\n  font-weight: 400;\r\n  margin-bottom: .9em;\r\n}\r\n.weui-article h2 {\r\n  font-size: 16px;\r\n  font-weight: 400;\r\n  margin-bottom: .34em;\r\n}\r\n.weui-article h3 {\r\n  font-weight: 400;\r\n  font-size: 15px;\r\n  margin-bottom: .34em;\r\n}\r\n.weui-article * {\r\n  max-width: 100%;\r\n  box-sizing: border-box;\r\n  word-wrap: break-word;\r\n}\r\n.weui-article p {\r\n  margin: 0 0 .8em;\r\n}\r\n.weui-tabbar {\r\n  display: -webkit-box;\r\n  display: -webkit-flex;\r\n  display: flex;\r\n  position: absolute;\r\n  z-index: 500;\r\n  bottom: 0;\r\n  width: 100%;\r\n  background-color: #F7F7FA;\r\n}\r\n.weui-tabbar:before {\r\n  content: \" \";\r\n  position: absolute;\r\n  left: 0;\r\n  top: 0;\r\n  right: 0;\r\n  height: 1px;\r\n  border-top: 1px solid #C0BFC4;\r\n  color: #C0BFC4;\r\n  -webkit-transform-origin: 0 0;\r\n          transform-origin: 0 0;\r\n  -webkit-transform: scaleY(0.5);\r\n          transform: scaleY(0.5);\r\n}\r\n.weui-tabbar__item {\r\n  display: block;\r\n  -webkit-box-flex: 1;\r\n  -webkit-flex: 1;\r\n          flex: 1;\r\n  padding: 5px 0 0;\r\n  font-size: 0;\r\n  color: #999999;\r\n  text-align: center;\r\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\r\n}\r\n.weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon,\r\n.weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon > i,\r\n.weui-tabbar__item.weui-bar__item_on .weui-tabbar__label {\r\n  color: #09BB07;\r\n}\r\n.weui-tabbar__icon {\r\n  display: inline-block;\r\n  width: 27px;\r\n  height: 27px;\r\n}\r\ni.weui-tabbar__icon,\r\n.weui-tabbar__icon > i {\r\n  font-size: 24px;\r\n  color: #999999;\r\n}\r\n.weui-tabbar__icon img {\r\n  width: 100%;\r\n  height: 100%;\r\n}\r\n.weui-tabbar__label {\r\n  text-align: center;\r\n  color: #999999;\r\n  font-size: 10px;\r\n  line-height: 1.8;\r\n}\r\n.weui-navbar {\r\n  display: -webkit-box;\r\n  display: -webkit-flex;\r\n  display: flex;\r\n  position: absolute;\r\n  z-index: 500;\r\n  top: 0;\r\n  width: 100%;\r\n  background-color: #FAFAFA;\r\n}\r\n.weui-navbar:after {\r\n  content: \" \";\r\n  position: absolute;\r\n  left: 0;\r\n  bottom: 0;\r\n  right: 0;\r\n  height: 1px;\r\n  border-bottom: 1px solid #CCCCCC;\r\n  color: #CCCCCC;\r\n  -webkit-transform-origin: 0 100%;\r\n          transform-origin: 0 100%;\r\n  -webkit-transform: scaleY(0.5);\r\n          transform: scaleY(0.5);\r\n}\r\n.weui-navbar + .weui-tab__panel {\r\n  padding-top: 50px;\r\n  padding-bottom: 0;\r\n}\r\n.weui-navbar__item {\r\n  position: relative;\r\n  display: block;\r\n  -webkit-box-flex: 1;\r\n  -webkit-flex: 1;\r\n          flex: 1;\r\n  padding: 13px 0;\r\n  text-align: center;\r\n  font-size: 15px;\r\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\r\n}\r\n.weui-navbar__item:active {\r\n  background-color: #EDEDED;\r\n}\r\n.weui-navbar__item.weui-bar__item_on {\r\n  background-color: #EAEAEA;\r\n}\r\n.weui-navbar__item:after {\r\n  content: \" \";\r\n  position: absolute;\r\n  right: 0;\r\n  top: 0;\r\n  width: 1px;\r\n  bottom: 0;\r\n  border-right: 1px solid #CCCCCC;\r\n  color: #CCCCCC;\r\n  -webkit-transform-origin: 100% 0;\r\n          transform-origin: 100% 0;\r\n  -webkit-transform: scaleX(0.5);\r\n          transform: scaleX(0.5);\r\n}\r\n.weui-navbar__item:last-child:after {\r\n  display: none;\r\n}\r\n.weui-tab {\r\n  position: relative;\r\n  height: 100%;\r\n}\r\n.weui-tab__panel {\r\n  box-sizing: border-box;\r\n  height: 100%;\r\n  padding-bottom: 50px;\r\n  overflow: auto;\r\n  -webkit-overflow-scrolling: touch;\r\n}\r\n.weui-tab__content {\r\n  display: none;\r\n}\r\n.weui-progress {\r\n  display: -webkit-box;\r\n  display: -webkit-flex;\r\n  display: flex;\r\n  -webkit-box-align: center;\r\n  -webkit-align-items: center;\r\n          align-items: center;\r\n}\r\n.weui-progress__bar {\r\n  background-color: #EBEBEB;\r\n  height: 3px;\r\n  -webkit-box-flex: 1;\r\n  -webkit-flex: 1;\r\n          flex: 1;\r\n}\r\n.weui-progress__inner-bar {\r\n  width: 0;\r\n  height: 100%;\r\n  background-color: #09BB07;\r\n}\r\n.weui-progress__opr {\r\n  display: block;\r\n  margin-left: 15px;\r\n  font-size: 0;\r\n}\r\n.weui-panel {\r\n  background-color: #FFFFFF;\r\n  margin-top: 10px;\r\n  position: relative;\r\n  overflow: hidden;\r\n}\r\n.weui-panel:first-child {\r\n  margin-top: 0;\r\n}\r\n.weui-panel:before {\r\n  content: \" \";\r\n  position: absolute;\r\n  left: 0;\r\n  top: 0;\r\n  right: 0;\r\n  height: 1px;\r\n  border-top: 1px solid #E5E5E5;\r\n  color: #E5E5E5;\r\n  -webkit-transform-origin: 0 0;\r\n          transform-origin: 0 0;\r\n  -webkit-transform: scaleY(0.5);\r\n          transform: scaleY(0.5);\r\n}\r\n.weui-panel:after {\r\n  content: \" \";\r\n  position: absolute;\r\n  left: 0;\r\n  bottom: 0;\r\n  right: 0;\r\n  height: 1px;\r\n  border-bottom: 1px solid #E5E5E5;\r\n  color: #E5E5E5;\r\n  -webkit-transform-origin: 0 100%;\r\n          transform-origin: 0 100%;\r\n  -webkit-transform: scaleY(0.5);\r\n          transform: scaleY(0.5);\r\n}\r\n.weui-panel__hd {\r\n  padding: 14px 15px 10px;\r\n  color: #999999;\r\n  font-size: 13px;\r\n  position: relative;\r\n}\r\n.weui-panel__hd:after {\r\n  content: \" \";\r\n  position: absolute;\r\n  left: 0;\r\n  bottom: 0;\r\n  right: 0;\r\n  height: 1px;\r\n  border-bottom: 1px solid #E5E5E5;\r\n  color: #E5E5E5;\r\n  -webkit-transform-origin: 0 100%;\r\n          transform-origin: 0 100%;\r\n  -webkit-transform: scaleY(0.5);\r\n          transform: scaleY(0.5);\r\n  left: 15px;\r\n}\r\n.weui-media-box {\r\n  padding: 15px;\r\n  position: relative;\r\n}\r\n.weui-media-box:before {\r\n  content: \" \";\r\n  position: absolute;\r\n  left: 0;\r\n  top: 0;\r\n  right: 0;\r\n  height: 1px;\r\n  border-top: 1px solid #E5E5E5;\r\n  color: #E5E5E5;\r\n  -webkit-transform-origin: 0 0;\r\n          transform-origin: 0 0;\r\n  -webkit-transform: scaleY(0.5);\r\n          transform: scaleY(0.5);\r\n  left: 15px;\r\n}\r\n.weui-media-box:first-child:before {\r\n  display: none;\r\n}\r\na.weui-media-box {\r\n  color: #000000;\r\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\r\n}\r\na.weui-media-box:active {\r\n  background-color: #ECECEC;\r\n}\r\n.weui-media-box__title {\r\n  font-weight: 400;\r\n  font-size: 17px;\r\n  width: auto;\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n  white-space: nowrap;\r\n  word-wrap: normal;\r\n  word-wrap: break-word;\r\n  word-break: break-all;\r\n}\r\n.weui-media-box__desc {\r\n  color: #999999;\r\n  font-size: 13px;\r\n  line-height: 1.2;\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n  display: -webkit-box;\r\n  -webkit-box-orient: vertical;\r\n  -webkit-line-clamp: 2;\r\n}\r\n.weui-media-box__info {\r\n  margin-top: 15px;\r\n  padding-bottom: 5px;\r\n  font-size: 13px;\r\n  color: #CECECE;\r\n  line-height: 1em;\r\n  list-style: none;\r\n  overflow: hidden;\r\n}\r\n.weui-media-box__info__meta {\r\n  float: left;\r\n  padding-right: 1em;\r\n}\r\n.weui-media-box__info__meta_extra {\r\n  padding-left: 1em;\r\n  border-left: 1px solid #CECECE;\r\n}\r\n.weui-media-box_text .weui-media-box__title {\r\n  margin-bottom: 8px;\r\n}\r\n.weui-media-box_appmsg {\r\n  display: -webkit-box;\r\n  display: -webkit-flex;\r\n  display: flex;\r\n  -webkit-box-align: center;\r\n  -webkit-align-items: center;\r\n          align-items: center;\r\n}\r\n.weui-media-box_appmsg .weui-media-box__hd {\r\n  margin-right: .8em;\r\n  width: 60px;\r\n  height: 60px;\r\n  line-height: 60px;\r\n  text-align: center;\r\n}\r\n.weui-media-box_appmsg .weui-media-box__thumb {\r\n  width: 100%;\r\n  max-height: 100%;\r\n  vertical-align: top;\r\n}\r\n.weui-media-box_appmsg .weui-media-box__bd {\r\n  -webkit-box-flex: 1;\r\n  -webkit-flex: 1;\r\n          flex: 1;\r\n  min-width: 0;\r\n}\r\n.weui-media-box_small-appmsg {\r\n  padding: 0;\r\n}\r\n.weui-media-box_small-appmsg .weui-cells {\r\n  margin-top: 0;\r\n}\r\n.weui-media-box_small-appmsg .weui-cells:before {\r\n  display: none;\r\n}\r\n.weui-grids {\r\n  position: relative;\r\n  overflow: hidden;\r\n}\r\n.weui-grids:before {\r\n  content: \" \";\r\n  position: absolute;\r\n  left: 0;\r\n  top: 0;\r\n  right: 0;\r\n  height: 1px;\r\n  border-top: 1px solid #D9D9D9;\r\n  color: #D9D9D9;\r\n  -webkit-transform-origin: 0 0;\r\n          transform-origin: 0 0;\r\n  -webkit-transform: scaleY(0.5);\r\n          transform: scaleY(0.5);\r\n}\r\n.weui-grids:after {\r\n  content: \" \";\r\n  position: absolute;\r\n  left: 0;\r\n  top: 0;\r\n  width: 1px;\r\n  bottom: 0;\r\n  border-left: 1px solid #D9D9D9;\r\n  color: #D9D9D9;\r\n  -webkit-transform-origin: 0 0;\r\n          transform-origin: 0 0;\r\n  -webkit-transform: scaleX(0.5);\r\n          transform: scaleX(0.5);\r\n}\r\n.weui-grid {\r\n  position: relative;\r\n  float: left;\r\n  padding: 20px 10px;\r\n  width: 33.33333333%;\r\n  box-sizing: border-box;\r\n}\r\n.weui-grid:before {\r\n  content: \" \";\r\n  position: absolute;\r\n  right: 0;\r\n  top: 0;\r\n  width: 1px;\r\n  bottom: 0;\r\n  border-right: 1px solid #D9D9D9;\r\n  color: #D9D9D9;\r\n  -webkit-transform-origin: 100% 0;\r\n          transform-origin: 100% 0;\r\n  -webkit-transform: scaleX(0.5);\r\n          transform: scaleX(0.5);\r\n}\r\n.weui-grid:after {\r\n  content: \" \";\r\n  position: absolute;\r\n  left: 0;\r\n  bottom: 0;\r\n  right: 0;\r\n  height: 1px;\r\n  border-bottom: 1px solid #D9D9D9;\r\n  color: #D9D9D9;\r\n  -webkit-transform-origin: 0 100%;\r\n          transform-origin: 0 100%;\r\n  -webkit-transform: scaleY(0.5);\r\n          transform: scaleY(0.5);\r\n}\r\n.weui-grid:active {\r\n  background-color: #ECECEC;\r\n}\r\n.weui-grid__icon {\r\n  width: 28px;\r\n  height: 28px;\r\n  margin: 0 auto;\r\n}\r\n.weui-grid__icon img {\r\n  display: block;\r\n  width: 100%;\r\n  height: 100%;\r\n}\r\n.weui-grid__icon + .weui-grid__label {\r\n  margin-top: 5px;\r\n}\r\n.weui-grid__label {\r\n  display: block;\r\n  text-align: center;\r\n  color: #000000;\r\n  font-size: 14px;\r\n  white-space: nowrap;\r\n  text-overflow: ellipsis;\r\n  overflow: hidden;\r\n}\r\n.weui-footer {\r\n  color: #999999;\r\n  font-size: 14px;\r\n  text-align: center;\r\n}\r\n.weui-footer a {\r\n  color: #586C94;\r\n}\r\n.weui-footer_fixed-bottom {\r\n  position: fixed;\r\n  bottom: .52em;\r\n  left: 0;\r\n  right: 0;\r\n}\r\n.weui-footer__links {\r\n  font-size: 0;\r\n}\r\n.weui-footer__link {\r\n  display: inline-block;\r\n  vertical-align: top;\r\n  margin: 0 .62em;\r\n  position: relative;\r\n  font-size: 14px;\r\n}\r\n.weui-footer__link:before {\r\n  content: \" \";\r\n  position: absolute;\r\n  left: 0;\r\n  top: 0;\r\n  width: 1px;\r\n  bottom: 0;\r\n  border-left: 1px solid #C7C7C7;\r\n  color: #C7C7C7;\r\n  -webkit-transform-origin: 0 0;\r\n          transform-origin: 0 0;\r\n  -webkit-transform: scaleX(0.5);\r\n          transform: scaleX(0.5);\r\n  left: -0.65em;\r\n  top: .36em;\r\n  bottom: .36em;\r\n}\r\n.weui-footer__link:first-child:before {\r\n  display: none;\r\n}\r\n.weui-footer__text {\r\n  padding: 0 .34em;\r\n  font-size: 12px;\r\n}\r\n.weui-flex {\r\n  display: -webkit-box;\r\n  display: -webkit-flex;\r\n  display: flex;\r\n}\r\n.weui-flex__item {\r\n  -webkit-box-flex: 1;\r\n  -webkit-flex: 1;\r\n          flex: 1;\r\n}\r\n.weui-dialog {\r\n  position: fixed;\r\n  z-index: 5000;\r\n  width: 80%;\r\n  max-width: 300px;\r\n  top: 50%;\r\n  left: 50%;\r\n  -webkit-transform: translate(-50%, -50%);\r\n          transform: translate(-50%, -50%);\r\n  background-color: #FFFFFF;\r\n  text-align: center;\r\n  border-radius: 3px;\r\n  overflow: hidden;\r\n}\r\n.weui-dialog__hd {\r\n  padding: 1.3em 1.6em 0.5em;\r\n}\r\n.weui-dialog__title {\r\n  font-weight: 400;\r\n  font-size: 18px;\r\n}\r\n.weui-dialog__bd {\r\n  padding: 0 1.6em 0.8em;\r\n  min-height: 40px;\r\n  font-size: 15px;\r\n  line-height: 1.3;\r\n  word-wrap: break-word;\r\n  word-break: break-all;\r\n  color: #999999;\r\n}\r\n.weui-dialog__bd:first-child {\r\n  padding: 2.7em 20px 1.7em;\r\n  color: #353535;\r\n}\r\n.weui-dialog__ft {\r\n  position: relative;\r\n  line-height: 48px;\r\n  font-size: 18px;\r\n  display: -webkit-box;\r\n  display: -webkit-flex;\r\n  display: flex;\r\n}\r\n.weui-dialog__ft:after {\r\n  content: \" \";\r\n  position: absolute;\r\n  left: 0;\r\n  top: 0;\r\n  right: 0;\r\n  height: 1px;\r\n  border-top: 1px solid #D5D5D6;\r\n  color: #D5D5D6;\r\n  -webkit-transform-origin: 0 0;\r\n          transform-origin: 0 0;\r\n  -webkit-transform: scaleY(0.5);\r\n          transform: scaleY(0.5);\r\n}\r\n.weui-dialog__btn {\r\n  display: block;\r\n  -webkit-box-flex: 1;\r\n  -webkit-flex: 1;\r\n          flex: 1;\r\n  color: #3CC51F;\r\n  text-decoration: none;\r\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\r\n  position: relative;\r\n}\r\n.weui-dialog__btn:active {\r\n  background-color: #EEEEEE;\r\n}\r\n.weui-dialog__btn:after {\r\n  content: \" \";\r\n  position: absolute;\r\n  left: 0;\r\n  top: 0;\r\n  width: 1px;\r\n  bottom: 0;\r\n  border-left: 1px solid #D5D5D6;\r\n  color: #D5D5D6;\r\n  -webkit-transform-origin: 0 0;\r\n          transform-origin: 0 0;\r\n  -webkit-transform: scaleX(0.5);\r\n          transform: scaleX(0.5);\r\n}\r\n.weui-dialog__btn:first-child:after {\r\n  display: none;\r\n}\r\n.weui-dialog__btn_default {\r\n  color: #353535;\r\n}\r\n.weui-dialog__btn_primary {\r\n  color: #0BB20C;\r\n}\r\n.weui-skin_android .weui-dialog {\r\n  text-align: left;\r\n  box-shadow: 0 6px 30px 0 rgba(0, 0, 0, 0.1);\r\n}\r\n.weui-skin_android .weui-dialog__title {\r\n  font-size: 21px;\r\n}\r\n.weui-skin_android .weui-dialog__hd {\r\n  text-align: left;\r\n}\r\n.weui-skin_android .weui-dialog__bd {\r\n  color: #999999;\r\n  padding: 0.25em 1.6em 2em;\r\n  font-size: 17px;\r\n  text-align: left;\r\n}\r\n.weui-skin_android .weui-dialog__bd:first-child {\r\n  padding: 1.6em 1.6em 2em;\r\n  color: #353535;\r\n}\r\n.weui-skin_android .weui-dialog__ft {\r\n  display: block;\r\n  text-align: right;\r\n  line-height: 42px;\r\n  font-size: 16px;\r\n  padding: 0 1.6em 0.7em;\r\n}\r\n.weui-skin_android .weui-dialog__ft:after {\r\n  display: none;\r\n}\r\n.weui-skin_android .weui-dialog__btn {\r\n  display: inline-block;\r\n  vertical-align: top;\r\n  padding: 0 .8em;\r\n}\r\n.weui-skin_android .weui-dialog__btn:after {\r\n  display: none;\r\n}\r\n.weui-skin_android .weui-dialog__btn:active {\r\n  background-color: rgba(0, 0, 0, 0.06);\r\n}\r\n.weui-skin_android .weui-dialog__btn:visited {\r\n  background-color: rgba(0, 0, 0, 0.06);\r\n}\r\n.weui-skin_android .weui-dialog__btn:last-child {\r\n  margin-right: -0.8em;\r\n}\r\n.weui-skin_android .weui-dialog__btn_default {\r\n  color: #808080;\r\n}\r\n@media screen and (min-width: 1024px) {\r\n  .weui-dialog {\r\n    width: 35%;\r\n  }\r\n}\r\n.weui-toast {\r\n  position: fixed;\r\n  z-index: 5000;\r\n  width: 7.6em;\r\n  min-height: 7.6em;\r\n  top: 180px;\r\n  left: 50%;\r\n  margin-left: -3.8em;\r\n  background: rgba(17, 17, 17, 0.7);\r\n  text-align: center;\r\n  border-radius: 5px;\r\n  color: #FFFFFF;\r\n}\r\n.weui-icon_toast {\r\n  margin: 22px 0 0;\r\n  display: block;\r\n}\r\n.weui-icon_toast.weui-icon-success-no-circle:before {\r\n  color: #FFFFFF;\r\n  font-size: 55px;\r\n}\r\n.weui-icon_toast.weui-loading {\r\n  margin: 30px 0 0;\r\n  width: 38px;\r\n  height: 38px;\r\n  vertical-align: baseline;\r\n}\r\n.weui-toast__content {\r\n  margin: 0 0 15px;\r\n}\r\n.weui-mask {\r\n  position: fixed;\r\n  z-index: 1000;\r\n  top: 0;\r\n  right: 0;\r\n  left: 0;\r\n  bottom: 0;\r\n  background: rgba(0, 0, 0, 0.6);\r\n}\r\n.weui-mask_transparent {\r\n  position: fixed;\r\n  z-index: 1000;\r\n  top: 0;\r\n  right: 0;\r\n  left: 0;\r\n  bottom: 0;\r\n}\r\n.weui-actionsheet {\r\n  position: fixed;\r\n  left: 0;\r\n  bottom: 0;\r\n  -webkit-transform: translate(0, 100%);\r\n          transform: translate(0, 100%);\r\n  -webkit-backface-visibility: hidden;\r\n          backface-visibility: hidden;\r\n  z-index: 5000;\r\n  width: 100%;\r\n  background-color: #EFEFF4;\r\n  -webkit-transition: -webkit-transform .3s;\r\n  transition: -webkit-transform .3s;\r\n  transition: transform .3s;\r\n  transition: transform .3s, -webkit-transform .3s;\r\n}\r\n.weui-actionsheet__menu {\r\n  background-color: #FFFFFF;\r\n}\r\n.weui-actionsheet__action {\r\n  margin-top: 6px;\r\n  background-color: #FFFFFF;\r\n}\r\n.weui-actionsheet__cell {\r\n  position: relative;\r\n  padding: 10px 0;\r\n  text-align: center;\r\n  font-size: 18px;\r\n}\r\n.weui-actionsheet__cell:before {\r\n  content: \" \";\r\n  position: absolute;\r\n  left: 0;\r\n  top: 0;\r\n  right: 0;\r\n  height: 1px;\r\n  border-top: 1px solid #D9D9D9;\r\n  color: #D9D9D9;\r\n  -webkit-transform-origin: 0 0;\r\n          transform-origin: 0 0;\r\n  -webkit-transform: scaleY(0.5);\r\n          transform: scaleY(0.5);\r\n}\r\n.weui-actionsheet__cell:active {\r\n  background-color: #ECECEC;\r\n}\r\n.weui-actionsheet__cell:first-child:before {\r\n  display: none;\r\n}\r\n.weui-skin_android .weui-actionsheet {\r\n  position: fixed;\r\n  left: 50%;\r\n  top: 50%;\r\n  bottom: auto;\r\n  -webkit-transform: translate(-50%, -50%);\r\n          transform: translate(-50%, -50%);\r\n  width: 274px;\r\n  box-sizing: border-box;\r\n  -webkit-backface-visibility: hidden;\r\n          backface-visibility: hidden;\r\n  background: transparent;\r\n  -webkit-transition: -webkit-transform .3s;\r\n  transition: -webkit-transform .3s;\r\n  transition: transform .3s;\r\n  transition: transform .3s, -webkit-transform .3s;\r\n}\r\n.weui-skin_android .weui-actionsheet__action {\r\n  display: none;\r\n}\r\n.weui-skin_android .weui-actionsheet__menu {\r\n  border-radius: 2px;\r\n  box-shadow: 0 6px 30px 0 rgba(0, 0, 0, 0.1);\r\n}\r\n.weui-skin_android .weui-actionsheet__cell {\r\n  padding: 13px 24px;\r\n  font-size: 16px;\r\n  line-height: 1.4;\r\n  text-align: left;\r\n}\r\n.weui-skin_android .weui-actionsheet__cell:first-child {\r\n  border-top-left-radius: 2px;\r\n  border-top-right-radius: 2px;\r\n}\r\n.weui-skin_android .weui-actionsheet__cell:last-child {\r\n  border-bottom-left-radius: 2px;\r\n  border-bottom-right-radius: 2px;\r\n}\r\n.weui-actionsheet_toggle {\r\n  -webkit-transform: translate(0, 0);\r\n          transform: translate(0, 0);\r\n}\r\n.weui-loadmore {\r\n  width: 65%;\r\n  margin: 1.5em auto;\r\n  line-height: 1.6em;\r\n  font-size: 14px;\r\n  text-align: center;\r\n}\r\n.weui-loadmore__tips {\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n}\r\n.weui-loadmore_line {\r\n  border-top: 1px solid #E5E5E5;\r\n  margin-top: 2.4em;\r\n}\r\n.weui-loadmore_line .weui-loadmore__tips {\r\n  position: relative;\r\n  top: -0.9em;\r\n  padding: 0 .55em;\r\n  background-color: #FFFFFF;\r\n  color: #999999;\r\n}\r\n.weui-loadmore_dot .weui-loadmore__tips {\r\n  padding: 0 .16em;\r\n}\r\n.weui-loadmore_dot .weui-loadmore__tips:before {\r\n  content: \" \";\r\n  width: 4px;\r\n  height: 4px;\r\n  border-radius: 50%;\r\n  background-color: #E5E5E5;\r\n  display: inline-block;\r\n  position: relative;\r\n  vertical-align: 0;\r\n  top: -0.16em;\r\n}\r\n.weui-badge {\r\n  display: inline-block;\r\n  padding: .15em .4em;\r\n  min-width: 8px;\r\n  border-radius: 18px;\r\n  background-color: #F43530;\r\n  color: #FFFFFF;\r\n  line-height: 1.2;\r\n  text-align: center;\r\n  font-size: 12px;\r\n  vertical-align: middle;\r\n}\r\n.weui-badge_dot {\r\n  padding: .4em;\r\n  min-width: 0;\r\n}\r\n.weui-search-bar {\r\n  position: relative;\r\n  padding: 8px 10px;\r\n  display: -webkit-box;\r\n  display: -webkit-flex;\r\n  display: flex;\r\n  box-sizing: border-box;\r\n  background-color: #EFEFF4;\r\n}\r\n.weui-search-bar:before {\r\n  content: \" \";\r\n  position: absolute;\r\n  left: 0;\r\n  top: 0;\r\n  right: 0;\r\n  height: 1px;\r\n  border-top: 1px solid #D7D6DC;\r\n  color: #D7D6DC;\r\n  -webkit-transform-origin: 0 0;\r\n          transform-origin: 0 0;\r\n  -webkit-transform: scaleY(0.5);\r\n          transform: scaleY(0.5);\r\n}\r\n.weui-search-bar:after {\r\n  content: \" \";\r\n  position: absolute;\r\n  left: 0;\r\n  bottom: 0;\r\n  right: 0;\r\n  height: 1px;\r\n  border-bottom: 1px solid #D7D6DC;\r\n  color: #D7D6DC;\r\n  -webkit-transform-origin: 0 100%;\r\n          transform-origin: 0 100%;\r\n  -webkit-transform: scaleY(0.5);\r\n          transform: scaleY(0.5);\r\n}\r\n.weui-search-bar.weui-search-bar_focusing .weui-search-bar__cancel-btn {\r\n  display: block;\r\n}\r\n.weui-search-bar.weui-search-bar_focusing .weui-search-bar__label {\r\n  display: none;\r\n}\r\n.weui-search-bar__form {\r\n  position: relative;\r\n  -webkit-box-flex: 1;\r\n  -webkit-flex: auto;\r\n          flex: auto;\r\n  background-color: #EFEFF4;\r\n}\r\n.weui-search-bar__form:after {\r\n  content: '';\r\n  position: absolute;\r\n  left: 0;\r\n  top: 0;\r\n  width: 200%;\r\n  height: 200%;\r\n  -webkit-transform: scale(0.5);\r\n          transform: scale(0.5);\r\n  -webkit-transform-origin: 0 0;\r\n          transform-origin: 0 0;\r\n  border-radius: 10px;\r\n  border: 1px solid #E6E6EA;\r\n  box-sizing: border-box;\r\n  background: #FFFFFF;\r\n}\r\n.weui-search-bar__box {\r\n  position: relative;\r\n  padding-left: 30px;\r\n  padding-right: 30px;\r\n  height: 100%;\r\n  width: 100%;\r\n  box-sizing: border-box;\r\n  z-index: 1;\r\n}\r\n.weui-search-bar__box .weui-search-bar__input {\r\n  padding: 4px 0;\r\n  width: 100%;\r\n  height: 1.42857143em;\r\n  border: 0;\r\n  font-size: 14px;\r\n  line-height: 1.42857143em;\r\n  box-sizing: content-box;\r\n  background: transparent;\r\n}\r\n.weui-search-bar__box .weui-search-bar__input:focus {\r\n  outline: none;\r\n}\r\n.weui-search-bar__box .weui-icon-search {\r\n  position: absolute;\r\n  left: 10px;\r\n  top: 0;\r\n  line-height: 28px;\r\n}\r\n.weui-search-bar__box .weui-icon-clear {\r\n  position: absolute;\r\n  top: 0;\r\n  right: 0;\r\n  padding: 0 10px;\r\n  line-height: 28px;\r\n}\r\n.weui-search-bar__label {\r\n  position: absolute;\r\n  top: 1px;\r\n  right: 1px;\r\n  bottom: 1px;\r\n  left: 1px;\r\n  z-index: 2;\r\n  border-radius: 3px;\r\n  text-align: center;\r\n  color: #9B9B9B;\r\n  background: #FFFFFF;\r\n}\r\n.weui-search-bar__label span {\r\n  display: inline-block;\r\n  font-size: 14px;\r\n  vertical-align: middle;\r\n}\r\n.weui-search-bar__label .weui-icon-search {\r\n  margin-right: 5px;\r\n}\r\n.weui-search-bar__cancel-btn {\r\n  display: none;\r\n  margin-left: 10px;\r\n  line-height: 28px;\r\n  color: #09BB07;\r\n  white-space: nowrap;\r\n}\r\n.weui-search-bar__input:not(:valid) ~ .weui-icon-clear {\r\n  display: none;\r\n}\r\ninput[type=\"search\"]::-webkit-search-decoration,\r\ninput[type=\"search\"]::-webkit-search-cancel-button,\r\ninput[type=\"search\"]::-webkit-search-results-button,\r\ninput[type=\"search\"]::-webkit-search-results-decoration {\r\n  display: none;\r\n}\r\n.weui-picker {\r\n  position: fixed;\r\n  width: 100%;\r\n  left: 0;\r\n  bottom: 0;\r\n  z-index: 5000;\r\n  -webkit-backface-visibility: hidden;\r\n          backface-visibility: hidden;\r\n  -webkit-transform: translate(0, 100%);\r\n          transform: translate(0, 100%);\r\n  -webkit-transition: -webkit-transform .3s;\r\n  transition: -webkit-transform .3s;\r\n  transition: transform .3s;\r\n  transition: transform .3s, -webkit-transform .3s;\r\n}\r\n.weui-picker__hd {\r\n  display: -webkit-box;\r\n  display: -webkit-flex;\r\n  display: flex;\r\n  padding: 10px 15px;\r\n  background-color: #fbf9fe;\r\n  position: relative;\r\n  text-align: center;\r\n}\r\n.weui-picker__hd:after {\r\n  content: \" \";\r\n  position: absolute;\r\n  left: 0;\r\n  bottom: 0;\r\n  right: 0;\r\n  height: 1px;\r\n  border-bottom: 1px solid #E5E5E5;\r\n  color: #E5E5E5;\r\n  -webkit-transform-origin: 0 100%;\r\n          transform-origin: 0 100%;\r\n  -webkit-transform: scaleY(0.5);\r\n          transform: scaleY(0.5);\r\n}\r\n.weui-picker__action {\r\n  display: block;\r\n  -webkit-box-flex: 1;\r\n  -webkit-flex: 1;\r\n          flex: 1;\r\n  color: #586C94;\r\n}\r\n.weui-picker__action:first-child {\r\n  text-align: left;\r\n}\r\n.weui-picker__action:last-child {\r\n  text-align: right;\r\n}\r\n.weui-picker__bd {\r\n  display: -webkit-box;\r\n  display: -webkit-flex;\r\n  display: flex;\r\n  position: relative;\r\n  background-color: #fff;\r\n  height: 238px;\r\n  overflow: hidden;\r\n}\r\n.weui-picker__group {\r\n  -webkit-box-flex: 1;\r\n  -webkit-flex: 1;\r\n          flex: 1;\r\n  position: relative;\r\n  height: 100%;\r\n}\r\n.weui-picker__mask {\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  width: 100%;\r\n  height: 100%;\r\n  margin: 0 auto;\r\n  z-index: 3;\r\n  background: -webkit-linear-gradient(top, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6)), -webkit-linear-gradient(bottom, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6));\r\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6)), linear-gradient(0deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6));\r\n  background-position: top, bottom;\r\n  background-size: 100% 102px;\r\n  background-repeat: no-repeat;\r\n  -webkit-transform: translateZ(0);\r\n          transform: translateZ(0);\r\n}\r\n.weui-picker__indicator {\r\n  width: 100%;\r\n  height: 34px;\r\n  position: absolute;\r\n  left: 0;\r\n  top: 102px;\r\n  z-index: 3;\r\n}\r\n.weui-picker__indicator:before {\r\n  content: \" \";\r\n  position: absolute;\r\n  left: 0;\r\n  top: 0;\r\n  right: 0;\r\n  height: 1px;\r\n  border-top: 1px solid #E5E5E5;\r\n  color: #E5E5E5;\r\n  -webkit-transform-origin: 0 0;\r\n          transform-origin: 0 0;\r\n  -webkit-transform: scaleY(0.5);\r\n          transform: scaleY(0.5);\r\n}\r\n.weui-picker__indicator:after {\r\n  content: \" \";\r\n  position: absolute;\r\n  left: 0;\r\n  bottom: 0;\r\n  right: 0;\r\n  height: 1px;\r\n  border-bottom: 1px solid #E5E5E5;\r\n  color: #E5E5E5;\r\n  -webkit-transform-origin: 0 100%;\r\n          transform-origin: 0 100%;\r\n  -webkit-transform: scaleY(0.5);\r\n          transform: scaleY(0.5);\r\n}\r\n.weui-picker__content {\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  width: 100%;\r\n}\r\n.weui-picker__item {\r\n  padding: 5px 0 4px;\r\n  text-align: center;\r\n  color: #000;\r\n  text-overflow: ellipsis;\r\n  white-space: nowrap;\r\n  overflow: hidden;\r\n}\r\n.weui-picker__item_disabled {\r\n  color: #999999;\r\n}\r\n@-webkit-keyframes slideUp {\r\n  from {\r\n    -webkit-transform: translate3d(0, 100%, 0);\r\n            transform: translate3d(0, 100%, 0);\r\n  }\r\n  to {\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n            transform: translate3d(0, 0, 0);\r\n  }\r\n}\r\n@keyframes slideUp {\r\n  from {\r\n    -webkit-transform: translate3d(0, 100%, 0);\r\n            transform: translate3d(0, 100%, 0);\r\n  }\r\n  to {\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n            transform: translate3d(0, 0, 0);\r\n  }\r\n}\r\n.weui-animate-slide-up {\r\n  -webkit-animation: slideUp ease .3s forwards;\r\n          animation: slideUp ease .3s forwards;\r\n}\r\n@-webkit-keyframes slideDown {\r\n  from {\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n            transform: translate3d(0, 0, 0);\r\n  }\r\n  to {\r\n    -webkit-transform: translate3d(0, 100%, 0);\r\n            transform: translate3d(0, 100%, 0);\r\n  }\r\n}\r\n@keyframes slideDown {\r\n  from {\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n            transform: translate3d(0, 0, 0);\r\n  }\r\n  to {\r\n    -webkit-transform: translate3d(0, 100%, 0);\r\n            transform: translate3d(0, 100%, 0);\r\n  }\r\n}\r\n.weui-animate-slide-down {\r\n  -webkit-animation: slideDown ease .3s forwards;\r\n          animation: slideDown ease .3s forwards;\r\n}\r\n@-webkit-keyframes fadeIn {\r\n  from {\r\n    opacity: 0;\r\n  }\r\n  to {\r\n    opacity: 1;\r\n  }\r\n}\r\n@keyframes fadeIn {\r\n  from {\r\n    opacity: 0;\r\n  }\r\n  to {\r\n    opacity: 1;\r\n  }\r\n}\r\n.weui-animate-fade-in {\r\n  -webkit-animation: fadeIn ease .3s forwards;\r\n          animation: fadeIn ease .3s forwards;\r\n}\r\n@-webkit-keyframes fadeOut {\r\n  from {\r\n    opacity: 1;\r\n  }\r\n  to {\r\n    opacity: 0;\r\n  }\r\n}\r\n@keyframes fadeOut {\r\n  from {\r\n    opacity: 1;\r\n  }\r\n  to {\r\n    opacity: 0;\r\n  }\r\n}\r\n.weui-animate-fade-out {\r\n  -webkit-animation: fadeOut ease .3s forwards;\r\n          animation: fadeOut ease .3s forwards;\r\n}\r\n.weui-agree {\r\n  display: block;\r\n  padding: .5em 15px;\r\n  font-size: 13px;\r\n}\r\n.weui-agree a {\r\n  color: #586C94;\r\n}\r\n.weui-agree__text {\r\n  color: #999999;\r\n}\r\n.weui-agree__checkbox {\r\n  -webkit-appearance: none;\r\n          appearance: none;\r\n  outline: 0;\r\n  font-size: 0;\r\n  border: 1px solid #D1D1D1;\r\n  background-color: #FFFFFF;\r\n  border-radius: 3px;\r\n  width: 13px;\r\n  height: 13px;\r\n  position: relative;\r\n  vertical-align: 0;\r\n  top: 2px;\r\n}\r\n.weui-agree__checkbox:checked:before {\r\n  font-family: \"weui\";\r\n  font-style: normal;\r\n  font-weight: normal;\r\n  font-variant: normal;\r\n  text-transform: none;\r\n  text-align: center;\r\n  speak: none;\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  text-decoration: inherit;\r\n  content: \"\\EA08\";\r\n  color: #09BB07;\r\n  font-size: 13px;\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  -webkit-transform: translate(-50%, -48%) scale(0.73);\r\n          transform: translate(-50%, -48%) scale(0.73);\r\n}\r\n.weui-agree__checkbox:disabled {\r\n  background-color: #E1E1E1;\r\n}\r\n.weui-agree__checkbox:disabled:before {\r\n  color: #ADADAD;\r\n}\r\n.weui-loading {\r\n  width: 20px;\r\n  height: 20px;\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-animation: weuiLoading 1s steps(12, end) infinite;\r\n          animation: weuiLoading 1s steps(12, end) infinite;\r\n  background: transparent url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTAgMGgxMDB2MTAwSDB6Ii8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTlFOUU5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTMwKSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iIzk4OTY5NyIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgzMCAxMDUuOTggNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjOUI5OTlBIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDYwIDc1Ljk4IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0EzQTFBMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCA2NSA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNBQkE5QUEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTIwIDU4LjY2IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0IyQjJCMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgxNTAgNTQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjQkFCOEI5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA1MCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDMkMwQzEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTE1MCA0NS45OCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDQkNCQ0IiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTEyMCA0MS4zNCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNEMkQyRDIiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwIDM1IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0RBREFEQSIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgtNjAgMjQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTJFMkUyIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKC0zMCAtNS45OCA2NSkiLz48L3N2Zz4=) no-repeat;\r\n  background-size: 100%;\r\n}\r\n.weui-loading.weui-loading_transparent {\r\n  background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 100 100'%3E%3Cpath fill='none' d='M0 0h100v100H0z'/%3E%3Crect xmlns='http://www.w3.org/2000/svg' width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.56)' rx='5' ry='5' transform='translate(0 -30)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.5)' rx='5' ry='5' transform='rotate(30 105.98 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.43)' rx='5' ry='5' transform='rotate(60 75.98 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.38)' rx='5' ry='5' transform='rotate(90 65 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.32)' rx='5' ry='5' transform='rotate(120 58.66 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.28)' rx='5' ry='5' transform='rotate(150 54.02 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.25)' rx='5' ry='5' transform='rotate(180 50 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.2)' rx='5' ry='5' transform='rotate(-150 45.98 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.17)' rx='5' ry='5' transform='rotate(-120 41.34 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.14)' rx='5' ry='5' transform='rotate(-90 35 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.1)' rx='5' ry='5' transform='rotate(-60 24.02 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.03)' rx='5' ry='5' transform='rotate(-30 -5.98 65)'/%3E%3C/svg%3E\");\r\n}\r\n@-webkit-keyframes weuiLoading {\r\n  0% {\r\n    -webkit-transform: rotate3d(0, 0, 1, 0deg);\r\n            transform: rotate3d(0, 0, 1, 0deg);\r\n  }\r\n  100% {\r\n    -webkit-transform: rotate3d(0, 0, 1, 360deg);\r\n            transform: rotate3d(0, 0, 1, 360deg);\r\n  }\r\n}\r\n@keyframes weuiLoading {\r\n  0% {\r\n    -webkit-transform: rotate3d(0, 0, 1, 0deg);\r\n            transform: rotate3d(0, 0, 1, 0deg);\r\n  }\r\n  100% {\r\n    -webkit-transform: rotate3d(0, 0, 1, 360deg);\r\n            transform: rotate3d(0, 0, 1, 360deg);\r\n  }\r\n}\r\n.weui-slider {\r\n  padding: 15px 18px;\r\n  -webkit-user-select: none;\r\n          user-select: none;\r\n}\r\n.weui-slider__inner {\r\n  position: relative;\r\n  height: 2px;\r\n  background-color: #E9E9E9;\r\n}\r\n.weui-slider__track {\r\n  height: 2px;\r\n  background-color: #1AAD19;\r\n  width: 0;\r\n}\r\n.weui-slider__handler {\r\n  position: absolute;\r\n  left: 0;\r\n  top: 50%;\r\n  width: 28px;\r\n  height: 28px;\r\n  margin-left: -14px;\r\n  margin-top: -14px;\r\n  border-radius: 50%;\r\n  background-color: #FFFFFF;\r\n  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);\r\n}\r\n.weui-slider-box {\r\n  display: -webkit-box;\r\n  display: -webkit-flex;\r\n  display: flex;\r\n  -webkit-box-align: center;\r\n  -webkit-align-items: center;\r\n          align-items: center;\r\n}\r\n.weui-slider-box .weui-slider {\r\n  -webkit-box-flex: 1;\r\n  -webkit-flex: 1;\r\n          flex: 1;\r\n}\r\n.weui-slider-box__value {\r\n  margin-left: .5em;\r\n  min-width: 24px;\r\n  color: #888888;\r\n  text-align: center;\r\n  font-size: 14px;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlL2Jhc2UvcmVzZXQubGVzcyIsInN0eWxlL3dldWkuY3NzIiwic3R5bGUvYmFzZS9taXhpbi9tb2JpbGUubGVzcyIsInN0eWxlL2ljb24vd2V1aS1mb250Lmxlc3MiLCJzdHlsZS9pY29uL3dldWktaWNvbl9mb250Lmxlc3MiLCJzdHlsZS93aWRnZXQvd2V1aS1idXR0b24vd2V1aS1idG5fZ2xvYmFsLmxlc3MiLCJzdHlsZS93aWRnZXQvd2V1aS1idXR0b24vd2V1aS1idG5fZGVmYXVsdC5sZXNzIiwic3R5bGUvd2lkZ2V0L3dldWktYnV0dG9uL3dldWktYnRuX3ByaW1hcnkubGVzcyIsInN0eWxlL3dpZGdldC93ZXVpLWJ1dHRvbi93ZXVpLWJ0bl93YXJuLmxlc3MiLCJzdHlsZS93aWRnZXQvd2V1aS1idXR0b24vd2V1aS1idG5fZGlzYWJsZWQubGVzcyIsInN0eWxlL3dpZGdldC93ZXVpLWJ1dHRvbi93ZXVpLWJ0bl9sb2FkaW5nLmxlc3MiLCJzdHlsZS93aWRnZXQvd2V1aS1idXR0b24vd2V1aS1idG5fcGxhaW4ubGVzcyIsInN0eWxlL3dpZGdldC93ZXVpLWJ1dHRvbi93ZXVpLWJ1dHRvbi5sZXNzIiwic3R5bGUvd2lkZ2V0L3dldWktY2VsbC93ZXVpLWNlbGxfZ2xvYmFsLmxlc3MiLCJzdHlsZS9iYXNlL21peGluL3NldE9uZXB4Lmxlc3MiLCJzdHlsZS93aWRnZXQvd2V1aS1jZWxsL3dldWktYWNjZXNzLmxlc3MiLCJzdHlsZS9iYXNlL21peGluL3NldEFycm93Lmxlc3MiLCJzdHlsZS93aWRnZXQvd2V1aS1jZWxsL3dldWktY2hlY2svd2V1aS1jaGVja19jb21tb24ubGVzcyIsInN0eWxlL3dpZGdldC93ZXVpLWNlbGwvd2V1aS1jaGVjay93ZXVpLXJhZGlvLmxlc3MiLCJzdHlsZS93aWRnZXQvd2V1aS1jZWxsL3dldWktY2hlY2svd2V1aS1jaGVja2JveC5sZXNzIiwic3R5bGUvd2lkZ2V0L3dldWktY2VsbC93ZXVpLWZvcm0vd2V1aS1mb3JtX2NvbW1vbi5sZXNzIiwic3R5bGUvYmFzZS9taXhpbi90ZXh0Lmxlc3MiLCJzdHlsZS93aWRnZXQvd2V1aS1jZWxsL3dldWktZm9ybS93ZXVpLWZvcm0tcHJldmlldy5sZXNzIiwic3R5bGUvd2lkZ2V0L3dldWktY2VsbC93ZXVpLWZvcm0vd2V1aS1zZWxlY3QubGVzcyIsInN0eWxlL3dpZGdldC93ZXVpLWNlbGwvd2V1aS1mb3JtL3dldWktdmNvZGUubGVzcyIsInN0eWxlL3dpZGdldC93ZXVpLWNlbGwvd2V1aS1nYWxsZXJ5Lmxlc3MiLCJzdHlsZS93aWRnZXQvd2V1aS1jZWxsL3dldWktc3dpdGNoLmxlc3MiLCJzdHlsZS93aWRnZXQvd2V1aS1jZWxsL3dldWktdXBsb2FkZXIubGVzcyIsInN0eWxlL3dpZGdldC93ZXVpLXBhZ2Uvd2V1aS1tc2cubGVzcyIsInN0eWxlL3dpZGdldC93ZXVpLXBhZ2Uvd2V1aS1hcnRpY2xlLmxlc3MiLCJzdHlsZS93aWRnZXQvd2V1aS10YWIvd2V1aS10YWJiYXIubGVzcyIsInN0eWxlL3dpZGdldC93ZXVpLXRhYi93ZXVpLW5hdmJhci5sZXNzIiwic3R5bGUvd2lkZ2V0L3dldWktdGFiL3dldWktdGFiLmxlc3MiLCJzdHlsZS93aWRnZXQvd2V1aS1wcm9ncmVzcy93ZXVpLXByb2dyZXNzLmxlc3MiLCJzdHlsZS93aWRnZXQvd2V1aS1wYW5lbC93ZXVpLXBhbmVsLmxlc3MiLCJzdHlsZS93aWRnZXQvd2V1aS1tZWRpYS1ib3gvd2V1aS1tZWRpYS1ib3gubGVzcyIsInN0eWxlL3dpZGdldC93ZXVpLWdyaWQvd2V1aS1ncmlkLmxlc3MiLCJzdHlsZS93aWRnZXQvd2V1aS1mb290ZXIvd2V1aS1mb290ZXIubGVzcyIsInN0eWxlL3dpZGdldC93ZXVpLWZsZXgvd2V1aS1mbGV4Lmxlc3MiLCJzdHlsZS93aWRnZXQvd2V1aS10aXBzL3dldWktZGlhbG9nLmxlc3MiLCJzdHlsZS93aWRnZXQvd2V1aS10aXBzL3dldWktdG9hc3QubGVzcyIsInN0eWxlL3dpZGdldC93ZXVpLXRpcHMvd2V1aS1tYXNrLmxlc3MiLCJzdHlsZS93aWRnZXQvd2V1aS10aXBzL3dldWktYWN0aW9uc2hlZXQubGVzcyIsInN0eWxlL3dpZGdldC93ZXVpLXRpcHMvd2V1aS1sb2FkbW9yZS5sZXNzIiwic3R5bGUvd2lkZ2V0L3dldWktdGlwcy93ZXVpLWJhZGdlLmxlc3MiLCJzdHlsZS93aWRnZXQvd2V1aS1zZWFyY2hiYXIvd2V1aS1zZWFyY2hiYXIubGVzcyIsInN0eWxlL3dpZGdldC93ZXVpLXBpY2tlci93ZXVpLXBpY2tlci5sZXNzIiwic3R5bGUvd2lkZ2V0L3dldWktYW5pbWF0ZS93ZXVpLWFuaW1hdGUubGVzcyIsInN0eWxlL3dpZGdldC93ZXVpLWFncmVlL3dldWktYWdyZWUubGVzcyIsInN0eWxlL3dpZGdldC93ZXVpLWxvYWRpbmcvd2V1aS1sb2FkaW5nLmxlc3MiLCJzdHlsZS93aWRnZXQvd2V1aS1zbGlkZXIvd2V1aS1zbGlkZXIubGVzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBO0VBQ0ksMkJBQUE7RUFDQSwrQkFBQTtDQ0RIO0FESUQ7RUFDSSxpQkFBQTtFQUNBLDhEQUFBO0NDRkg7QURLRDtFQUNJLFVBQUE7RUFDQSxXQUFBO0NDSEg7QURNRDtFQUNJLFVBQUE7Q0NKSDtBRE9EO0VBQ0ksc0JBQUE7RUVyQkEsOENBQUE7Q0RpQkg7QUVsQkQ7RUFDSSxvQkFBQTtFQUNBLG1CQUFBO0VBQ0Esb0JBQUE7RUFDQSxxbU1BQUE7Q0ZvQkg7QUVoQkQ7O0VBQ0ksc0JBQUE7RUFDQSx1QkFBQTtFQUNBLHlDQUFBO0VBQ0EsbUJBQUE7RUFDQSxxQkFBQTtFQUNBLG9DQUFBO0NGbUJIO0FFbEJHOztFQUVJLHNCQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtDRm9CUDtBRWhCRDtFQUEyQixpQkFBQTtDRm1CMUI7QUFDRCxTQUFTO0FFbkJUO0VBQTZCLGlCQUFBO0NGc0I1QjtBQUNELFNBQVM7QUV0QlQ7RUFBeUIsaUJBQUE7Q0Z5QnhCO0FBQ0QsU0FBUztBRXpCVDtFQUFpQyxpQkFBQTtDRjRCaEM7QUFDRCxTQUFTO0FFNUJUO0VBQThCLGlCQUFBO0NGK0I3QjtBQUNELFNBQVM7QUUvQlQ7RUFBNEIsaUJBQUE7Q0ZrQzNCO0FBQ0QsU0FBUztBRWxDVDtFQUFtQyxpQkFBQTtDRnFDbEM7QUFDRCxTQUFTO0FFckNUO0VBQXNDLGlCQUFBO0NGd0NyQztBQUNELFNBQVM7QUV4Q1Q7RUFBNEIsaUJBQUE7Q0YyQzNCO0FBQ0QsU0FBUztBRTNDVDtFQUFtQyxpQkFBQTtDRjhDbEM7QUFDRCxTQUFTO0FFOUNUO0VBQXlCLGlCQUFBO0NGaUR4QjtBQUNELFNBQVM7QUVqRFQ7RUFBZ0MsaUJBQUE7Q0ZvRC9CO0FBQ0QsU0FBUztBRXBEVDtFQUEyQixpQkFBQTtDRnVEMUI7QUFDRCxTQUFTO0FFdkRUO0VBQTJCLGlCQUFBO0NGMEQxQjtBQUNELFNBQVM7QUUxRFQ7RUFBMEIsaUJBQUE7Q0Y2RHpCO0FBQ0QsU0FBUztBRTdEVDtFQUF5QixpQkFBQTtDRmdFeEI7QUFDRCxTQUFTO0FFaEVUO0VBQTJCLGlCQUFBO0NGbUUxQjtBQUNELFNBQVM7QUd6R1Q7O0VBQ0ksVUFBQTtDSDRHSDtBRzFHRDtFQUNJLGdCQUFBO0VBQ0EsZUFBQTtDSDRHSDtBRzFHRDtFQUNJLGdCQUFBO0VBQ0EsZUFBQTtDSDRHSDtBRzFHRDtFQUNJLGdCQUFBO0VBQ0EsZUFBQTtDSDRHSDtBRzFHRDtFQUNJLGdCQUFBO0VBQ0EsZUFBQTtDSDRHSDtBR3pHRDtFQUNJLGdCQUFBO0VBQ0EsZUFBQTtDSDJHSDtBR3pHRDtFQUNJLGdCQUFBO0VBQ0EsZUFBQTtDSDJHSDtBR3pHRDtFQUNJLGdCQUFBO0VBQ0EsZUFBQTtDSDJHSDtBR3pHRDtFQUNJLGdCQUFBO0VBQ0EsZUFBQTtDSDJHSDtBR3pHRDtFQUNJLGdCQUFBO0VBQ0EsZUFBQTtDSDJHSDtBR3hHRDtFQUNJLGdCQUFBO0VBQ0EsZUFBQTtDSDBHSDtBR3ZHRDtFQUNJLGVBQUE7Q0h5R0g7QUd2R0Q7RUFDSSxlQUFBO0NIeUdIO0FHdEdEO0VBQ0ksZUFBQTtFQUNBLGdCQUFBO0NId0dIO0FHckdEO0VBQ0ksZUFBQTtFQUNBLGdCQUFBO0NIdUdIO0FHcEdEO0VBQ0ksZUFBQTtFQUNBLGdCQUFBO0NIc0dIO0FHbEdHO0VBQ0ksZUFBQTtFQUNBLGdCQUFBO0NIb0dQO0FHaEdEO0VBQ0ksZ0JBQUE7Q0hrR0g7QUdqR0c7RUFDSSxlQUFBO0NIbUdQO0FHaEdEO0VBQ0ksZ0JBQUE7Q0hrR0g7QUdqR0c7RUFDSSxlQUFBO0NIbUdQO0FJdkxEO0VBQ0ksbUJBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0VBQ0Esb0JBQUE7RUFDQSx1QkFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxzQkFBQTtFQUNBLGVBQUE7RUFDQSx3QkFBQTtFQUNBLG1CQUFBO0VIZEEsOENBQUE7RUdnQkEsaUJBQUE7Q0p5TEg7QUl4TEc7RUFDSSxhQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLE9BQUE7RUFDQSxRQUFBO0VBQ0EscUNBQUE7RUFDQSw4QkFBQTtVQUFBLHNCQUFBO0VBQ0EsOEJBQUE7VUFBQSxzQkFBQTtFQUNBLHVCQUFBO0VBQ0Esb0JBQUE7Q0owTFA7QUl2TEQ7RUFDSSxzQkFBQTtDSnlMSDtBS3hORDtFQUNJLGVBQUE7RUFDQSwwQkFBQTtDTDBOSDtBS3pORztFQUNJLGVBQUE7Q0wyTlA7QUt6Tkc7RUFDSSwwQkFBQTtFQUNBLDBCQUFBO0NMMk5QO0FNbk9EO0VBQ0ksMEJBQUE7Q05xT0g7QU1wT0c7RUFDSSxlQUFBO0NOc09QO0FNcE9HO0VBQ0ksZ0NBQUE7RUFDQSwwQkFBQTtDTnNPUDtBTzdPRDtFQUNJLDBCQUFBO0NQK09IO0FPOU9HO0VBQ0ksZUFBQTtDUGdQUDtBTzlPRztFQUNJLGdDQUFBO0VBQ0EsMEJBQUE7Q1BnUFA7QVF2UEQ7RUFDSSxnQ0FBQTtDUnlQSDtBUXhQRztFQUNJLDBCQUFBO0VBQ0EsMEJBQUE7Q1IwUFA7QVF4UEc7RUFDSSwwQkFBQTtDUjBQUDtBUXhQRztFQUNJLDBCQUFBO0NSMFBQO0FTcFFEO0VBRUUsMEJBQUE7Q1RxUUQ7QVNuUUc7O0VBQ0ksZ0NBQUE7Q1RzUVA7QVN2UUc7O0VBR0QsMHJEQUFBO0NUd1FGO0FTclFBO0VBQ08sMEJBQUE7Q1R1UVA7QVNyUUE7RUFDTywwQkFBQTtDVHVRUDtBVXJSRDtFQUNJLGVBQUE7RUFDQSwwQkFBQTtDVnVSSDtBVXRSRztFQUNJLDhCQUFBO0VBQ0EscUNBQUE7Q1Z3UlA7QVV0Ukc7RUFDSSxnQkFBQTtDVndSUDtBVXBSRDtFQUNJLGVBQUE7RUFDQSwwQkFBQTtDVnNSSDtBVXJSRztFQUNJLDZCQUFBO0VBQ0Esb0NBQUE7Q1Z1UlA7QVVyUkc7RUFDSSxnQkFBQTtDVnVSUDtBVXBSRDtFQUNJLDBCQUFBO0VBQ0EsaUNBQUE7Q1ZzUkg7QVd2U0c7O0VBQ0ksWUFBQTtFQUNBLGdCQUFBO0VBQ0EsV0FBQTtFQUNBLHlCQUFBO0NYMFNQO0FXelNPOztFQUNJLFdBQUE7Q1g0U1g7QVd6U0c7Ozs7RUFDSSxZQUFBO0NYOFNQO0FXNVNHOzs7O0VBQ0ksa0JBQUE7RUFDQSw4QkFBQTtDWGlUUDtBVzdTRDtFQUNJLHNCQUFBO0VBQ0Esa0JBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0NYK1NIO0FBQ0QsbUJBQW1CO0FXM1NuQjtFQUNJLGlCQUFBO0NYNlNIO0FXMVNEO0VBQ0ksaUJBQUE7RUFDQSxrQkFBQTtDWDRTSDtBV3pTRDtFQUNJLGdDQUFBO0NYMlNIO0FXelNEO0VBQ0kscUJBQUE7RUFBQSxzQkFBQTtFQUFBLGNBQUE7Q1gyU0g7QVc1U0Q7RUFHUSxpQkFBQTtFQUNBLG1CQUFBO0VBQ0EsWUFBQTtFQUNBLG9CQUFBO0VBQUEsZ0JBQUE7VUFBQSxRQUFBO0NYNFNQO0FXM1NPO0VBQ0ksZ0JBQUE7Q1g2U1g7QVlwV0Q7RUFDSSx5QkFBQTtFQUNBLDBCQUFBO0VBQ0Esd0JBQUE7RUFDQSxnQkFBQTtFQUVBLGlCQUFBO0VBR0EsbUJBQUE7Q1ptV0g7QVlsV0c7RUNYQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0VBQ0EsT0FBQTtFQUNBLFNBQUE7RUFDQSxZQUFBO0VBQ0EsOEJBQUE7RUFDQSxlQUFBO0VBQ0EsOEJBQUE7VUFBQSxzQkFBQTtFQUNBLCtCQUFBO1VBQUEsdUJBQUE7Q2JnWEg7QVkzV0c7RUNEQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0VBQ0EsVUFBQTtFQUNBLFNBQUE7RUFDQSxZQUFBO0VBQ0EsaUNBQUE7RUFDQSxlQUFBO0VBQ0EsaUNBQUE7VUFBQSx5QkFBQTtFQUNBLCtCQUFBO1VBQUEsdUJBQUE7Q2IrV0g7QVlsWEQ7RUFDSSxrQkFBQTtFQUNBLG9CQUFBO0VBQ0EsbUJBQUE7RUFDQSxvQkFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtDWm9YSDtBWWxYRztFQUNJLGNBQUE7Q1pvWFA7QVloWEQ7RUFDSSxpQkFBQTtFQUNBLGVBQUE7RUFDQSxtQkFBQTtFQUNBLG9CQUFBO0VBQ0EsZ0JBQUE7Q1prWEg7QVkvV0Q7RUFDSSxtQkFBQTtFQUNBLG1CQUFBO0VBQ0EscUJBQUE7RUFBQSxzQkFBQTtFQUFBLGNBQUE7RUFDQSwwQkFBQTtFQUFBLDRCQUFBO1VBQUEsb0JBQUE7Q1ppWEg7QVloWEc7RUM3Q0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtFQUNBLE9BQUE7RUFDQSxTQUFBO0VBQ0EsWUFBQTtFQUNBLDhCQUFBO0VBQ0EsZUFBQTtFQUNBLDhCQUFBO1VBQUEsc0JBQUE7RUFDQSwrQkFBQTtVQUFBLHVCQUFBO0VEc0NJLFdBQUE7Q1oyWFA7QVl4WE87RUFDSSxjQUFBO0NaMFhYO0FZdFhEO0VBQ0kseUJBQUE7RUFBQSxnQ0FBQTtVQUFBLHdCQUFBO0Nad1hIO0FZdFhEO0VBQ0ksb0JBQUE7RUFBQSxnQkFBQTtVQUFBLFFBQUE7Q1p3WEg7QVl0WEQ7RUFDSSxrQkFBQTtFQUNBLGVBQUE7Q1p3WEg7QWN0YkQ7RWJESSw4Q0FBQTtFYUdBLGVBQUE7Q2R3Ykg7QWN2Ykc7RUFDSSwwQkFBQTtDZHliUDtBYzdiRDtFQU9RLG9CQUFBO0VBQ0EsbUJBQUE7Q2R5YlA7QWN4Yk87RUFDSSxhQUFBO0VDWFIsc0JBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtFQUNBLDBCQUFBO0VBQ0Esc0JBQUE7RUFDQSxvQkFBQTtFQVVBLHlEQUFBO1VBQUEsaURBQUE7RUFFQSxtQkFBQTtFQUNBLFVBQUE7RURMUSxtQkFBQTtFQUNBLFNBQUE7RUFDQSxpQkFBQTtFQUNBLFdBQUE7Q2RrY1g7QWM5YkQ7RUFDSSxlQUFBO0VBQ0EsZ0JBQUE7Q2RnY0g7QWM1Yk87RUFDSSxlQUFBO0NkOGJYO0FnQnhkRDtFZkRJLDhDQUFBO0NENGRIO0FnQnpkRztFQUNJLDBCQUFBO0NoQjJkUDtBZ0J2ZEQ7RUFDSSxtQkFBQTtFQUNBLGNBQUE7Q2hCeWRIO0FpQmplRDtFQUVRLHFCQUFBO0NqQmtlUDtBaUIxZGU7RUFDSSxlQUFBO0VBQ0EsaUJBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7Q2pCNGRuQjtBa0IzZUQ7RUFFUSxzQkFBQTtDbEI0ZVA7QWtCemVPO0VBQ0ksaUJBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0NsQjJlWDtBa0JoZWU7RUFDSSxpQkFBQTtFQUNBLGVBQUE7Q2xCa2VuQjtBbUJ4ZkQ7RUFDRSxlQUFBO0VBQ0EsYUFBQTtFQ1lFLHNCQUFBO0VBQ0Esc0JBQUE7Q3BCK2VIO0FtQnpmRDtFQUNJLFlBQUE7RUFDQSxVQUFBO0VBQ0EsV0FBQTtFQUNBLHlCQUFBO0VBQ0EsOEJBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7RUFDQSxxQkFBQTtFQUNBLHdCQUFBO0NuQjJmSDtBbUJ4Zkc7O0VBQ0kseUJBQUE7RUFDQSxVQUFBO0NuQjJmUDtBbUJ4ZkQ7RUFDSSxlQUFBO0VBQ0EsVUFBQTtFQUNBLGFBQUE7RUFDQSxZQUFBO0VBQ0EsZUFBQTtFQUNBLGVBQUE7RUFDQSxxQkFBQTtFQUNBLFdBQUE7Q25CMGZIO0FtQnZmRDtFQUNJLGVBQUE7RUFDQSxrQkFBQTtDbkJ5Zkg7QW1CeGZHO0VBQ0ksZUFBQTtDbkIwZlA7QW1CdGZEO0VBQ0ksY0FBQTtFQUNBLGdCQUFBO0VBQ0EsaUNBQUE7VUFBQSx5QkFBQTtFQUNBLE9BQUE7RUFDQSxRQUFBO0VBQ0EsU0FBQTtFQUNBLGFBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0VBQ0EsWUFBQTtFQUNBLGNBQUE7RUN0Q0Esc0JBQUE7RUFDQSxzQkFBQTtDcEIraEJIO0FtQnZmRDtFQUNJLDBCQUFBO0NuQnlmSDtBbUJ2ZkQ7RUFFUSxhQUFBO0NuQndmUDtBbUIxZkQ7RUFLUSxjQUFBO0NuQndmUDtBbUI3ZkQ7OztFbEIzREksOENBQUE7Q0Q2akJIO0FtQnZmRDtFQUNJLGVBQUE7Q25CeWZIO0FtQjFmRDtFQUVvQixzQkFBQTtDbkIyZm5CO0FxQmxrQkQ7RUFDSSxtQkFBQTtFQUNBLDBCQUFBO0NyQm9rQkg7QXFCbmtCRztFUkpBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7RUFDQSxPQUFBO0VBQ0EsU0FBQTtFQUNBLFlBQUE7RUFDQSw4QkFBQTtFQUNBLGVBQUE7RUFDQSw4QkFBQTtVQUFBLHNCQUFBO0VBQ0EsK0JBQUE7VUFBQSx1QkFBQTtDYjBrQkg7QXFCNWtCRztFUk1BLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7RUFDQSxVQUFBO0VBQ0EsU0FBQTtFQUNBLFlBQUE7RUFDQSxpQ0FBQTtFQUNBLGVBQUE7RUFDQSxpQ0FBQTtVQUFBLHlCQUFBO0VBQ0EsK0JBQUE7VUFBQSx1QkFBQTtDYnlrQkg7QXFCcGxCRDtFQUNJLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0NyQnNsQkg7QXFCcmxCRztFUkhBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7RUFDQSxVQUFBO0VBQ0EsU0FBQTtFQUNBLFlBQUE7RUFDQSxpQ0FBQTtFQUNBLGVBQUE7RUFDQSxpQ0FBQTtVQUFBLHlCQUFBO0VBQ0EsK0JBQUE7VUFBQSx1QkFBQTtFUUpJLFdBQUE7Q3JCZ21CUDtBcUJ2bUJEO0VBVVEsbUJBQUE7RUFDQSxpQkFBQTtDckJnbUJQO0FxQjdsQkQ7RUFDSSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0VBQ0EsZUFBQTtDckIrbEJIO0FxQjdsQkQ7RUFDSSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0EscUJBQUE7RUFBQSxzQkFBQTtFQUFBLGNBQUE7Q3JCK2xCSDtBcUI5bEJHO0VScENBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7RUFDQSxPQUFBO0VBQ0EsU0FBQTtFQUNBLFlBQUE7RUFDQSw4QkFBQTtFQUNBLGVBQUE7RUFDQSw4QkFBQTtVQUFBLHNCQUFBO0VBQ0EsK0JBQUE7VUFBQSx1QkFBQTtDYnFvQkg7QXFCdG1CRDtFQUNJLGlCQUFBO0NyQndtQkg7QXFCdG1CRDtFQUNJLFlBQUE7RUFDQSxrQkFBQTtFQUNBLGVBQUE7RUFDQSxlQUFBO0VBQ0Esb0JBQUE7RUFDQSx5QkFBQTtDckJ3bUJIO0FxQnRtQkQ7RUFDSSxlQUFBO0VBQ0EsaUJBQUE7RUFDQSxtQkFBQTtFQUNBLHNCQUFBO0NyQndtQkg7QXFCdG1CRDtFQUNJLG1CQUFBO0VBQ0EsZUFBQTtFQUNBLG9CQUFBO0VBQUEsZ0JBQUE7VUFBQSxRQUFBO0VBQ0EsZUFBQTtFQUNBLG1CQUFBO0VwQjlEQSw4Q0FBQTtDRHVxQkg7QXFCdm1CRztFQUNJLDhCQUFBO0VBQ0EsVUFBQTtFQUNBLFdBQUE7RUFDQSxxQkFBQTtFQUNBLG1CQUFBO0NyQnltQlA7QXFCdm1CRztFQUNJLDBCQUFBO0NyQnltQlA7QXFCdm1CRztFUmhEQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0VBQ0EsT0FBQTtFQUNBLFdBQUE7RUFDQSxVQUFBO0VBQ0EsK0JBQUE7RUFDQSxlQUFBO0VBQ0EsOEJBQUE7VUFBQSxzQkFBQTtFQUNBLCtCQUFBO1VBQUEsdUJBQUE7Q2IwcEJIO0FxQi9tQk87RUFDSSxjQUFBO0NyQmluQlg7QXFCN21CRDtFQUNJLGVBQUE7Q3JCK21CSDtBcUI3bUJEO0VBQ0ksZUFBQTtDckIrbUJIO0FzQnJzQkQ7RUFDSSxXQUFBO0N0QnVzQkg7QXNCeHNCRDtFQUdRLG9CQUFBO0N0QndzQlA7QXNCcnNCTztFQUNJLGFBQUE7RVBSUixzQkFBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0VBQ0EsMEJBQUE7RUFDQSxzQkFBQTtFQUNBLG9CQUFBO0VBVUEseURBQUE7VUFBQSxpREFBQTtFQUVBLG1CQUFBO0VBQ0EsVUFBQTtFT1BRLG1CQUFBO0VBQ0EsU0FBQTtFQUNBLFlBQUE7RUFDQSxpQkFBQTtDdEI4c0JYO0FzQnpzQkQ7RUFDSSx5QkFBQTtFQUNBLFVBQUE7RUFDQSxXQUFBO0VBQ0EsOEJBQUE7RUFDQSxZQUFBO0VBQ0EsbUJBQUE7RUFDQSxhQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLFdBQUE7RUFDQSxtQkFBQTtDdEIyc0JIO0FzQnhzQkQ7RUFDSSxvQkFBQTtDdEIwc0JIO0FzQjNzQkQ7RUFHUSxhQUFBO0VBQ0EsdUJBQUE7Q3RCMnNCUDtBc0Ivc0JEO0VBT1EsbUJBQUE7Q3RCMnNCUDtBc0Ixc0JPO0VURkosYUFBQTtFQUNBLG1CQUFBO0VBQ0EsU0FBQTtFQUNBLE9BQUE7RUFDQSxXQUFBO0VBQ0EsVUFBQTtFQUNBLGdDQUFBO0VBQ0EsZUFBQTtFQUNBLGlDQUFBO1VBQUEseUJBQUE7RUFDQSwrQkFBQTtVQUFBLHVCQUFBO0NiK3NCSDtBc0JudEJPO0VBQ0ksYUFBQTtFUDdDUixzQkFBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0VBQ0EsMEJBQUE7RUFDQSxzQkFBQTtFQUNBLG9CQUFBO0VBVUEseURBQUE7VUFBQSxpREFBQTtFQUVBLG1CQUFBO0VBQ0EsVUFBQTtFTzhCUSxtQkFBQTtFQUNBLFNBQUE7RUFDQSxZQUFBO0VBQ0EsaUJBQUE7Q3RCNHRCWDtBc0I5dUJEO0VBc0JRLG1CQUFBO0N0QjJ0QlA7QXNCMXRCTztFQUNJLGNBQUE7Q3RCNHRCWDtBc0J2dEJEO0VBQ0ksbUJBQUE7Q3RCeXRCSDtBc0IxdEJEO0VBR1EsZ0JBQUE7Q3RCMHRCUDtBdUIxeEJEO0VBQ0ksZUFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7Q3ZCNHhCSDtBdUIxeEJEO0VBQ0ksaUJBQUE7RUFDQSxhQUFBO0VBQ0EsdUJBQUE7Q3ZCNHhCSDtBdUJ6eEJEO0VBQ0ksc0JBQUE7RUFDQSxhQUFBO0VBQ0EsaUJBQUE7RUFDQSx5QkFBQTtFQUNBLCtCQUFBO0VBQ0Esa0JBQUE7RUFDQSx1QkFBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtDdkIyeEJIO0F1QjF4Qkc7RUFDSSw4QkFBQTtFQUNBLGNBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0VBQ0EsV0FBQTtDdkI0eEJQO0F1QjF4Qkc7RUFDSSxlQUFBO0N2QjR4QlA7QXdCeHpCRDtFQUNJLGNBQUE7RUFDQSxnQkFBQTtFQUNBLE9BQUE7RUFDQSxTQUFBO0VBQ0EsVUFBQTtFQUNBLFFBQUE7RUFDQSwwQkFBQTtFQUNBLGNBQUE7Q3hCMHpCSDtBd0J4ekJEO0VBQ0ksbUJBQUE7RUFDQSxPQUFBO0VBQ0EsU0FBQTtFQUNBLGFBQUE7RUFDQSxRQUFBO0VBQ0Esb0NBQUE7RUFDQSx5QkFBQTtDeEIwekJIO0F3Qnh6QkQ7RUFDSSxtQkFBQTtFQUNBLFNBQUE7RUFDQSxVQUFBO0VBQ0EsUUFBQTtFQUNBLDBCQUFBO0VBQ0EsZUFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7Q3hCMHpCSDtBd0J4ekJEO0VBQ0ksZUFBQTtDeEIwekJIO0F5QnoxQkQ7RUFDSSxpQkFBQTtFQUNBLG9CQUFBO0N6QjIxQkg7QXlCejFCRDtFQUNJLHlCQUFBO1VBQUEsaUJBQUE7Q3pCMjFCSDtBeUJ6MUJEOztFQUVJLG1CQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSwwQkFBQTtFQUNBLFdBQUE7RUFDQSxvQkFBQTtFQUNBLHVCQUFBO0VBQ0EsMEJBQUE7RUFDQSx1REFBQTtFQUFBLCtDQUFBO0N6QjIxQkg7QXlCejFCRzs7RUFDSSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxPQUFBO0VBQ0EsUUFBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0Esb0JBQUE7RUFDQSwwQkFBQTtFQUNBLDBFQUFBO0VBQUEsa0VBQUE7RUFBQSwwREFBQTtFQUFBLGlIQUFBO0N6QjQxQlA7QXlCMTFCRzs7RUFDSSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxPQUFBO0VBQ0EsUUFBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0Esb0JBQUE7RUFDQSwwQkFBQTtFQUNBLHlDQUFBO0VBQ0EsK0VBQUE7RUFBQSx1RUFBQTtFQUFBLCtEQUFBO0VBQUEsMkhBQUE7Q3pCNjFCUDtBeUIxMUJEOztFQUVJLHNCQUFBO0VBQ0EsMEJBQUE7Q3pCNDFCSDtBeUIzMUJHOztFQUNJLDRCQUFBO1VBQUEsb0JBQUE7Q3pCODFCUDtBeUI1MUJHOztFQUNJLG9DQUFBO1VBQUEsNEJBQUE7Q3pCKzFCUDtBeUIxMUJEO0VBQ0ksbUJBQUE7RUFDQSxjQUFBO0N6QjQxQkg7QXlCMTFCRDtFQUNJLGVBQUE7Q3pCNDFCSDtBMEJ4NUJEO0VBQ0kscUJBQUE7RUFBQSxzQkFBQTtFQUFBLGNBQUE7RUFDQSxxQkFBQTtFQUNBLDBCQUFBO0VBQUEsNEJBQUE7VUFBQSxvQkFBQTtDMUIwNUJIO0EwQng1QkQ7RUFDSSxvQkFBQTtFQUFBLGdCQUFBO1VBQUEsUUFBQTtDMUIwNUJIO0EwQng1QkQ7RUFDSSxlQUFBO0MxQjA1Qkg7QTBCdjVCRDtFQUNJLG9CQUFBO0VBQ0EsbUJBQUE7RUFDQSxpQkFBQTtDMUJ5NUJIO0EwQnY1QkQ7RUFDSSxpQkFBQTtDMUJ5NUJIO0EwQnY1QkQ7RUFDSSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0Esb0NBQUE7RUFDQSx1QkFBQTtDMUJ5NUJIO0EwQnY1QkQ7RUFDSSxtQkFBQTtDMUJ5NUJIO0EwQng1Qkc7RUFDSSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxPQUFBO0VBQ0EsU0FBQTtFQUNBLFVBQUE7RUFDQSxRQUFBO0VBQ0EscUNBQUE7QzFCMDVCUDtBMEJuNkJEO0VBWVEsZUFBQTtDMUIwNUJQO0EwQnY1QkQ7RUFDSSxjQUFBO0VBQ0EsbUJBQUE7RUFDQSxTQUFBO0VBQ0EsVUFBQTtFQUNBLHlDQUFBO1VBQUEsaUNBQUE7RUFDQSxlQUFBO0MxQnk1Qkg7QTBCLzVCRDtFQVFRLHNCQUFBO0MxQjA1QlA7QTBCdjVCRDtFQUNJLFlBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLDBCQUFBO0MxQnk1Qkg7QTBCeDVCRzs7RUFDSSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxTQUFBO0VBQ0EsVUFBQTtFQUNBLHlDQUFBO1VBQUEsaUNBQUE7RUFDQSwwQkFBQTtDMUIyNUJQO0EwQno1Qkc7RUFDSSxXQUFBO0VBQ0EsZUFBQTtDMUIyNUJQO0EwQno1Qkc7RUFDSSxjQUFBO0VBQ0EsWUFBQTtDMUIyNUJQO0EwQno1Qkc7RUFDSSxzQkFBQTtDMUIyNUJQO0EwQjE1Qk87O0VBQ0ksMEJBQUE7QzFCNjVCWDtBMEJ6NUJEO0VBQ0ksbUJBQUE7RUFDQSxXQUFBO0VBQ0EsT0FBQTtFQUNBLFFBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLFdBQUE7RXpCL0ZBLDhDQUFBO0NEMi9CSDtBMkJ6L0JEO0VBQ0ksa0JBQUE7RUFDQSxtQkFBQTtDM0IyL0JIO0EyQnovQkQ7RUFDSSxvQkFBQTtDM0IyL0JIO0EyQnovQkQ7RUFDSSxvQkFBQTtFQUNBLGdCQUFBO0MzQjIvQkg7QTJCei9CRDtFQUNJLGVBQUE7QzNCMi9CSDtBMkJ6L0JEO0VBQ0ksbUJBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0MzQjIvQkg7QTJCei9CRDtFQUNJLGdCQUFBO0VBQ0EsZUFBQTtDM0IyL0JIO0EyQnovQkQ7RUFDSSxvQkFBQTtDM0IyL0JIO0EyQnovQkQ7RUFDSSxvQkFBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtDM0IyL0JIO0EyQjkvQkQ7RUFJTSxlQUFBO0MzQjYvQkw7QTJCMS9CRDtFQUNJO0lBQ0ksZ0JBQUE7SUFDQSxRQUFBO0lBQ0EsVUFBQTtJQUNBLFlBQUE7SUFDQSxtQkFBQTtHM0I0L0JMO0NBQ0Y7QTRCcmlDRDtFQUNJLG1CQUFBO0VBQ0EsZ0JBQUE7QzVCdWlDSDtBNEJ6aUNEO0VBSVEscUJBQUE7QzVCd2lDUDtBNEI1aUNEO0VBT1EsZ0JBQUE7RUFDQSxpQkFBQTtFQUNBLG9CQUFBO0M1QndpQ1A7QTRCampDRDtFQVlRLGdCQUFBO0VBQ0EsaUJBQUE7RUFDQSxxQkFBQTtDNUJ3aUNQO0E0QnRqQ0Q7RUFpQlEsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLHFCQUFBO0M1QndpQ1A7QTRCM2pDRDtFQXNCUSxnQkFBQTtFQUNBLHVCQUFBO0VBQ0Esc0JBQUE7QzVCd2lDUDtBNEJoa0NEO0VBMkJRLGlCQUFBO0M1QndpQ1A7QTZCbmtDRDtFQUNJLHFCQUFBO0VBQUEsc0JBQUE7RUFBQSxjQUFBO0VBQ0EsbUJBQUE7RUFDQSxhQUFBO0VBQ0EsVUFBQTtFQUNBLFlBQUE7RUFDQSwwQkFBQTtDN0Jxa0NIO0E2Qm5rQ0c7RWhCVEEsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtFQUNBLE9BQUE7RUFDQSxTQUFBO0VBQ0EsWUFBQTtFQUNBLDhCQUFBO0VBQ0EsZUFBQTtFQUNBLDhCQUFBO1VBQUEsc0JBQUE7RUFDQSwrQkFBQTtVQUFBLHVCQUFBO0NiK2tDSDtBNkIxa0NEO0VBQ0ksZUFBQTtFQUNBLG9CQUFBO0VBQUEsZ0JBQUE7VUFBQSxRQUFBO0VBQ0EsaUJBQUE7RUFDQSxhQUFBO0VBQ0EsZUFBQTtFQUNBLG1CQUFBO0U1QnBCQSw4Q0FBQTtDRGltQ0g7QTZCMWtDRzs7O0VBSVEsZUFBQTtDN0Iya0NYO0E2QnRrQ0Q7RUFDSSxzQkFBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0M3QndrQ0g7QTZCdGtDRzs7RUFFSSxnQkFBQTtFQUNBLGVBQUE7QzdCd2tDUDtBNkJobENEO0VBWVEsWUFBQTtFQUNBLGFBQUE7QzdCdWtDUDtBNkJua0NEO0VBQ0ksbUJBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQkFBQTtDN0Jxa0NIO0E4QnpuQ0Q7RUFDSSxxQkFBQTtFQUFBLHNCQUFBO0VBQUEsY0FBQTtFQUNBLG1CQUFBO0VBQ0EsYUFBQTtFQUNBLE9BQUE7RUFDQSxZQUFBO0VBQ0EsMEJBQUE7QzlCMm5DSDtBOEJ6bkNHO0VqQklBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7RUFDQSxVQUFBO0VBQ0EsU0FBQTtFQUNBLFlBQUE7RUFDQSxpQ0FBQTtFQUNBLGVBQUE7RUFDQSxpQ0FBQTtVQUFBLHlCQUFBO0VBQ0EsK0JBQUE7VUFBQSx1QkFBQTtDYnduQ0g7QThCam9DRztFQUNJLGtCQUFBO0VBQ0Esa0JBQUE7QzlCbW9DUDtBOEIvbkNEO0VBQ0ksbUJBQUE7RUFDQSxlQUFBO0VBQ0Esb0JBQUE7RUFBQSxnQkFBQTtVQUFBLFFBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0VBQ0EsZ0JBQUE7RTdCekJBLDhDQUFBO0NEMnBDSDtBOEIvbkNHO0VBQ0ksMEJBQUE7QzlCaW9DUDtBOEI5bkNHO0VBQ0ksMEJBQUE7QzlCZ29DUDtBOEI3bkNHO0VqQkdBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFNBQUE7RUFDQSxPQUFBO0VBQ0EsV0FBQTtFQUNBLFVBQUE7RUFDQSxnQ0FBQTtFQUNBLGVBQUE7RUFDQSxpQ0FBQTtVQUFBLHlCQUFBO0VBQ0EsK0JBQUE7VUFBQSx1QkFBQTtDYjZuQ0g7QThCcG9DTztFQUNJLGNBQUE7QzlCc29DWDtBK0I3cUNEO0VBQ0ksbUJBQUE7RUFDQSxhQUFBO0MvQitxQ0g7QStCNXFDRDtFQUNJLHVCQUFBO0VBQ0EsYUFBQTtFQUNBLHFCQUFBO0VBQ0EsZUFBQTtFQUNBLGtDQUFBO0MvQjhxQ0g7QStCNXFDRDtFQUNJLGNBQUE7Qy9COHFDSDtBZ0M3ckNEO0VBQ0kscUJBQUE7RUFBQSxzQkFBQTtFQUFBLGNBQUE7RUFDQSwwQkFBQTtFQUFBLDRCQUFBO1VBQUEsb0JBQUE7Q2hDK3JDSDtBZ0M1ckNEO0VBQ0ksMEJBQUE7RUFDQSxZQUFBO0VBQ0Esb0JBQUE7RUFBQSxnQkFBQTtVQUFBLFFBQUE7Q2hDOHJDSDtBZ0MzckNEO0VBQ0ksU0FBQTtFQUNBLGFBQUE7RUFDQSwwQkFBQTtDaEM2ckNIO0FnQzFyQ0Q7RUFDSSxlQUFBO0VBQ0Esa0JBQUE7RUFDQSxhQUFBO0NoQzRyQ0g7QWlDL3NDRDtFQUNJLDBCQUFBO0VBQ0EsaUJBQUE7RUFLQSxtQkFBQTtFQUNBLGlCQUFBO0NqQzZzQ0g7QWlDbHRDRztFQUNJLGNBQUE7Q2pDb3RDUDtBaUMvc0NHO0VwQlhBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7RUFDQSxPQUFBO0VBQ0EsU0FBQTtFQUNBLFlBQUE7RUFDQSw4QkFBQTtFQUNBLGVBQUE7RUFDQSw4QkFBQTtVQUFBLHNCQUFBO0VBQ0EsK0JBQUE7VUFBQSx1QkFBQTtDYjZ0Q0g7QWlDeHRDRztFcEJEQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0VBQ0EsVUFBQTtFQUNBLFNBQUE7RUFDQSxZQUFBO0VBQ0EsaUNBQUE7RUFDQSxlQUFBO0VBQ0EsaUNBQUE7VUFBQSx5QkFBQTtFQUNBLCtCQUFBO1VBQUEsdUJBQUE7Q2I0dENIO0FpQy90Q0Q7RUFDSSx3QkFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0NqQ2l1Q0g7QWlDaHVDRztFcEJYQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0VBQ0EsVUFBQTtFQUNBLFNBQUE7RUFDQSxZQUFBO0VBQ0EsaUNBQUE7RUFDQSxlQUFBO0VBQ0EsaUNBQUE7VUFBQSx5QkFBQTtFQUNBLCtCQUFBO1VBQUEsdUJBQUE7RW9CSUksV0FBQTtDakMydUNQO0FrQ3B3Q0Q7RUFDSSxjQUFBO0VBQ0EsbUJBQUE7Q2xDc3dDSDtBa0Nyd0NHO0VyQkpBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7RUFDQSxPQUFBO0VBQ0EsU0FBQTtFQUNBLFlBQUE7RUFDQSw4QkFBQTtFQUNBLGVBQUE7RUFDQSw4QkFBQTtVQUFBLHNCQUFBO0VBQ0EsK0JBQUE7VUFBQSx1QkFBQTtFcUJISSxXQUFBO0NsQ2d4Q1A7QWtDN3dDTztFQUNJLGNBQUE7Q2xDK3dDWDtBa0Mzd0NHO0VBQ0ksZUFBQTtFakNmSiw4Q0FBQTtDRDZ4Q0g7QWtDNXdDTztFQUNJLDBCQUFBO0NsQzh3Q1g7QWtDMXdDRDtFQUNJLGlCQUFBO0VBQ0EsZ0JBQUE7RWR4QkEsWUFBQTtFQUNBLGlCQUFBO0VBQ0Esd0JBQUE7RUFDQSxvQkFBQTtFQUNBLGtCQUFBO0Vjc0JBLHNCQUFBO0VBQ0Esc0JBQUE7Q2xDZ3hDSDtBa0M5d0NEO0VBQ0ksZUFBQTtFQUNBLGdCQUFBO0VBQ0EsaUJBQUE7RWR4QkEsaUJBQUE7RUFDQSx3QkFBQTtFQUNBLHFCQUFBO0VBQ0EsNkJBQUE7RUFDQSxzQkFBQTtDcEJ5eUNIO0FrQ2x4Q0Q7RUFDSSxpQkFBQTtFQUNBLG9CQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7RUFDQSxpQkFBQTtFQUNBLGlCQUFBO0NsQ294Q0g7QWtDbHhDRDtFQUNJLFlBQUE7RUFDQSxtQkFBQTtDbENveENIO0FrQ2x4Q0Q7RUFDSSxrQkFBQTtFQUNBLCtCQUFBO0NsQ294Q0g7QWtDbHhDRDtFQUVRLG1CQUFBO0NsQ214Q1A7QWtDaHhDRDtFQUNJLHFCQUFBO0VBQUEsc0JBQUE7RUFBQSxjQUFBO0VBQ0EsMEJBQUE7RUFBQSw0QkFBQTtVQUFBLG9CQUFBO0NsQ2t4Q0g7QWtDcHhDRDtFQUlRLG1CQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0NsQ214Q1A7QWtDM3hDRDtFQVdRLFlBQUE7RUFDQSxpQkFBQTtFQUNBLG9CQUFBO0NsQ214Q1A7QWtDaHlDRDtFQWdCUSxvQkFBQTtFQUFBLGdCQUFBO1VBQUEsUUFBQTtFQUNBLGFBQUE7Q2xDbXhDUDtBa0NoeENEO0VBQ0ksV0FBQTtDbENreENIO0FrQ254Q0Q7RUFHUSxjQUFBO0NsQ214Q1A7QWtDbHhDTztFQUNJLGNBQUE7Q2xDb3hDWDtBbUNyMkNEO0VBQ0ksbUJBQUE7RUFDQSxpQkFBQTtDbkN1MkNIO0FtQ3IyQ0c7RXRCTEEsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtFQUNBLE9BQUE7RUFDQSxTQUFBO0VBQ0EsWUFBQTtFQUNBLDhCQUFBO0VBQ0EsZUFBQTtFQUNBLDhCQUFBO1VBQUEsc0JBQUE7RUFDQSwrQkFBQTtVQUFBLHVCQUFBO0NiNjJDSDtBbUM5MkNHO0V0QmtCQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0VBQ0EsT0FBQTtFQUNBLFdBQUE7RUFDQSxVQUFBO0VBQ0EsK0JBQUE7RUFDQSxlQUFBO0VBQ0EsOEJBQUE7VUFBQSxzQkFBQTtFQUNBLCtCQUFBO1VBQUEsdUJBQUE7Q2IrMUNIO0FtQ3IzQ0Q7RUFDSSxtQkFBQTtFQUNBLFlBQUE7RUFDQSxtQkFBQTtFQUNBLG9CQUFBO0VBQ0EsdUJBQUE7Q25DdTNDSDtBbUNyM0NHO0V0Qm1CQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxTQUFBO0VBQ0EsT0FBQTtFQUNBLFdBQUE7RUFDQSxVQUFBO0VBQ0EsZ0NBQUE7RUFDQSxlQUFBO0VBQ0EsaUNBQUE7VUFBQSx5QkFBQTtFQUNBLCtCQUFBO1VBQUEsdUJBQUE7Q2JxMkNIO0FtQzkzQ0c7RXRCVkEsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtFQUNBLFVBQUE7RUFDQSxTQUFBO0VBQ0EsWUFBQTtFQUNBLGlDQUFBO0VBQ0EsZUFBQTtFQUNBLGlDQUFBO1VBQUEseUJBQUE7RUFDQSwrQkFBQTtVQUFBLHVCQUFBO0NiMjRDSDtBbUN0NENHO0VBQ0ksMEJBQUE7Q25DdzRDUDtBbUNwNENEO0VBQ0ksWUFBQTtFQUNBLGFBQUE7RUFDQSxlQUFBO0NuQ3M0Q0g7QW1DejRDRDtFQU1RLGVBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtDbkNzNENQO0FtQ240Q0c7RUFDSSxnQkFBQTtDbkNxNENQO0FtQ2o0Q0Q7RUFDSSxlQUFBO0VBQ0EsbUJBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxvQkFBQTtFQUNBLHdCQUFBO0VBQ0EsaUJBQUE7Q25DbTRDSDtBb0N6N0NEO0VBQ0ksZUFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7Q3BDMjdDSDtBb0M5N0NEO0VBS1EsZUFBQTtDcEM0N0NQO0FvQ3o3Q0Q7RUFDSSxnQkFBQTtFQUNBLGNBQUE7RUFDQSxRQUFBO0VBQ0EsU0FBQTtDcEMyN0NIO0FvQ3o3Q0Q7RUFDSSxhQUFBO0NwQzI3Q0g7QW9DejdDRDtFQUNJLHNCQUFBO0VBQ0Esb0JBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0VBQ0EsZ0JBQUE7Q3BDMjdDSDtBb0MxN0NHO0V2QkVBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7RUFDQSxPQUFBO0VBQ0EsV0FBQTtFQUNBLFVBQUE7RUFDQSwrQkFBQTtFQUNBLGVBQUE7RUFDQSw4QkFBQTtVQUFBLHNCQUFBO0VBQ0EsK0JBQUE7VUFBQSx1QkFBQTtFdUJUSSxjQUFBO0VBQ0EsV0FBQTtFQUNBLGNBQUE7Q3BDcThDUDtBb0NsOENPO0VBQ0ksY0FBQTtDcENvOENYO0FvQ2g4Q0Q7RUFDSSxpQkFBQTtFQUNBLGdCQUFBO0NwQ2s4Q0g7QXFDditDRDtFQUNJLHFCQUFBO0VBQUEsc0JBQUE7RUFBQSxjQUFBO0NyQ3krQ0g7QXFDditDRDtFQUNJLG9CQUFBO0VBQUEsZ0JBQUE7VUFBQSxRQUFBO0NyQ3krQ0g7QXNDNytDRDtFQUNJLGdCQUFBO0VBQ0EsY0FBQTtFQUNBLFdBQUE7RUFDQSxpQkFBQTtFQUNBLFNBQUE7RUFDQSxVQUFBO0VBQ0EseUNBQUE7VUFBQSxpQ0FBQTtFQUVBLDBCQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtFQUNBLGlCQUFBO0N0QzgrQ0g7QXNDNStDRDtFQUNJLDJCQUFBO0N0QzgrQ0g7QXNDNStDRDtFQUNJLGlCQUFBO0VBQ0EsZ0JBQUE7Q3RDOCtDSDtBc0M1K0NEO0VBQ0ksdUJBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0EsaUJBQUE7RUFDQSxzQkFBQTtFQUNBLHNCQUFBO0VBQ0EsZUFBQTtDdEM4K0NIO0FzQzcrQ0c7RUFDSSwwQkFBQTtFQUNBLGVBQUE7Q3RDKytDUDtBc0M1K0NEO0VBQ0ksbUJBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EscUJBQUE7RUFBQSxzQkFBQTtFQUFBLGNBQUE7Q3RDOCtDSDtBc0M3K0NHO0V6QnhDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0VBQ0EsT0FBQTtFQUNBLFNBQUE7RUFDQSxZQUFBO0VBQ0EsOEJBQUE7RUFDQSxlQUFBO0VBQ0EsOEJBQUE7VUFBQSxzQkFBQTtFQUNBLCtCQUFBO1VBQUEsdUJBQUE7Q2J3aERIO0FzQ3AvQ0Q7RUFDSSxlQUFBO0VBQ0Esb0JBQUE7RUFBQSxnQkFBQTtVQUFBLFFBQUE7RUFDQSxlQUFBO0VBQ0Esc0JBQUE7RXJDakRBLDhDQUFBO0VxQ3VEQSxtQkFBQTtDdENrL0NIO0FzQ3QvQ0c7RUFDSSwwQkFBQTtDdEN3L0NQO0FzQ3AvQ0c7RXpCOUJBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7RUFDQSxPQUFBO0VBQ0EsV0FBQTtFQUNBLFVBQUE7RUFDQSwrQkFBQTtFQUNBLGVBQUE7RUFDQSw4QkFBQTtVQUFBLHNCQUFBO0VBQ0EsK0JBQUE7VUFBQSx1QkFBQTtDYnFoREg7QXNDMy9DTztFQUNJLGNBQUE7Q3RDNi9DWDtBc0N6L0NEO0VBQ0ksZUFBQTtDdEMyL0NIO0FzQ3ovQ0Q7RUFDSSxlQUFBO0N0QzIvQ0g7QXNDeC9DRDtFQUVRLGlCQUFBO0VBQ0EsNENBQUE7Q3RDeS9DUDtBc0M1L0NEO0VBTVEsZ0JBQUE7Q3RDeS9DUDtBc0MvL0NEO0VBU1EsaUJBQUE7Q3RDeS9DUDtBc0NsZ0REO0VBWVEsZUFBQTtFQUNBLDBCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQkFBQTtDdEN5L0NQO0FzQ3gvQ087RUFDSSx5QkFBQTtFQUNBLGVBQUE7Q3RDMC9DWDtBc0M1Z0REO0VBc0JRLGVBQUE7RUFDQSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSx1QkFBQTtDdEN5L0NQO0FzQ3gvQ087RUFDSSxjQUFBO0N0QzAvQ1g7QXNDdGhERDtFQWdDUSxzQkFBQTtFQUNBLG9CQUFBO0VBQ0EsZ0JBQUE7Q3RDeS9DUDtBc0N4L0NPO0VBQ0ksY0FBQTtDdEMwL0NYO0FzQ3YvQ087RUFDSSxzQ0FBQTtDdEN5L0NYO0FzQ3YvQ087RUFDSSxzQ0FBQTtDdEN5L0NYO0FzQ3YvQ087RUFDSSxxQkFBQTtDdEN5L0NYO0FzQ3ZpREQ7RUFrRFEsZUFBQTtDdEN3L0NQO0FzQ3AvQ0Q7RUFDSTtJQUNJLFdBQUE7R3RDcy9DTDtDQUNGO0F1Q3ZuREQ7RUFDSSxnQkFBQTtFQUNBLGNBQUE7RUFDQSxhQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0VBQ0EsVUFBQTtFQUNBLG9CQUFBO0VBQ0Esa0NBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0VBQ0EsZUFBQTtDdkN5bkRIO0F1Q3ZuREQ7RUFDSSxpQkFBQTtFQUNBLGVBQUE7Q3ZDeW5ESDtBdUN2bkRLO0VBQ0ksZUFBQTtFQUNBLGdCQUFBO0N2Q3luRFQ7QXVDdG5ERztFQUNFLGlCQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSx5QkFBQTtDdkN3bkRMO0F1Q3BuREQ7RUFDSSxpQkFBQTtDdkNzbkRIO0F3Q3JwREQ7RUFDSSxnQkFBQTtFQUNBLGNBQUE7RUFDQSxPQUFBO0VBQ0EsU0FBQTtFQUNBLFFBQUE7RUFDQSxVQUFBO0VBQ0EsK0JBQUE7Q3hDdXBESDtBd0NwcEREO0VBQ0ksZ0JBQUE7RUFDQSxjQUFBO0VBQ0EsT0FBQTtFQUNBLFNBQUE7RUFDQSxRQUFBO0VBQ0EsVUFBQTtDeENzcERIO0F5Q3JxREQ7RUFDSSxnQkFBQTtFQUNBLFFBQUE7RUFDQSxVQUFBO0VBQ0Esc0NBQUE7VUFBQSw4QkFBQTtFQUNBLG9DQUFBO1VBQUEsNEJBQUE7RUFDQSxjQUFBO0VBQ0EsWUFBQTtFQUNBLDBCQUFBO0VBRUEsMENBQUE7RUFBQSxrQ0FBQTtFQUFBLDBCQUFBO0VBQUEsaURBQUE7Q3pDc3FESDtBeUNwcUREO0VBQ0ksMEJBQUE7Q3pDc3FESDtBeUNwcUREO0VBQ0ksZ0JBQUE7RUFDQSwwQkFBQTtDekNzcURIO0F5Q3BxREQ7RUFDSSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxnQkFBQTtDekNzcURIO0F5Q3JxREc7RTVCMUJBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7RUFDQSxPQUFBO0VBQ0EsU0FBQTtFQUNBLFlBQUE7RUFDQSw4QkFBQTtFQUNBLGVBQUE7RUFDQSw4QkFBQTtVQUFBLHNCQUFBO0VBQ0EsK0JBQUE7VUFBQSx1QkFBQTtDYmtzREg7QXlDOXFERztFQUNJLDBCQUFBO0N6Q2dyRFA7QXlDN3FETztFQUNJLGNBQUE7Q3pDK3FEWDtBeUN4cUREO0VBRVEsZ0JBQUE7RUFDQSxVQUFBO0VBQ0EsU0FBQTtFQUNBLGFBQUE7RUFDQSx5Q0FBQTtVQUFBLGlDQUFBO0VBRUEsYUFBQTtFQUNBLHVCQUFBO0VBQ0Esb0NBQUE7VUFBQSw0QkFBQTtFQUNBLHdCQUFBO0VBRUEsMENBQUE7RUFBQSxrQ0FBQTtFQUFBLDBCQUFBO0VBQUEsaURBQUE7Q3pDdXFEUDtBeUNwckREO0VBZ0JRLGNBQUE7Q3pDdXFEUDtBeUN2ckREO0VBbUJRLG1CQUFBO0VBQ0EsNENBQUE7Q3pDdXFEUDtBeUMzckREO0VBdUJRLG1CQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQkFBQTtFQUNBLGlCQUFBO0N6Q3VxRFA7QXlDdHFETztFQUNJLDRCQUFBO0VBQ0EsNkJBQUE7Q3pDd3FEWDtBeUN0cURPO0VBQ0ksK0JBQUE7RUFDQSxnQ0FBQTtDekN3cURYO0F5Q2xxREQ7RUFDSSxtQ0FBQTtVQUFBLDJCQUFBO0N6Q29xREg7QTBDcHZERDtFQUNJLFdBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkFBQTtDMUNzdkRIO0EwQ3B2REQ7RUFDSSxzQkFBQTtFQUNBLHVCQUFBO0MxQ3N2REg7QTBDbnZERDtFQUNJLDhCQUFBO0VBQ0Esa0JBQUE7QzFDcXZESDtBMEN2dkREO0VBSVEsbUJBQUE7RUFDQSxZQUFBO0VBQ0EsaUJBQUE7RUFDQSwwQkFBQTtFQUNBLGVBQUE7QzFDc3ZEUDtBMENudkREO0VBRVEsaUJBQUE7QzFDb3ZEUDtBMENudkRPO0VBQ0ksYUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsbUJBQUE7RUFDQSwwQkFBQTtFQUNBLHNCQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLGFBQUE7QzFDcXZEWDtBMkN4eEREO0VBQ0ksc0JBQUE7RUFDQSxvQkFBQTtFQUNBLGVBQUE7RUFDQSxvQkFBQTtFQUNBLDBCQUFBO0VBQ0EsZUFBQTtFQUNBLGlCQUFBO0VBQ0EsbUJBQUE7RUFDQSxnQkFBQTtFQUNBLHVCQUFBO0MzQzB4REg7QTJDeHhERDtFQUNJLGNBQUE7RUFDQSxhQUFBO0MzQzB4REg7QTRDenlERDtFQUNJLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxxQkFBQTtFQUFBLHNCQUFBO0VBQUEsY0FBQTtFQUNBLHVCQUFBO0VBQ0EsMEJBQUE7QzVDMnlESDtBNEMxeURHO0UvQk5BLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7RUFDQSxPQUFBO0VBQ0EsU0FBQTtFQUNBLFlBQUE7RUFDQSw4QkFBQTtFQUNBLGVBQUE7RUFDQSw4QkFBQTtVQUFBLHNCQUFBO0VBQ0EsK0JBQUE7VUFBQSx1QkFBQTtDYm16REg7QTRDbnpERztFL0JJQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0VBQ0EsVUFBQTtFQUNBLFNBQUE7RUFDQSxZQUFBO0VBQ0EsaUNBQUE7RUFDQSxlQUFBO0VBQ0EsaUNBQUE7VUFBQSx5QkFBQTtFQUNBLCtCQUFBO1VBQUEsdUJBQUE7Q2JrekRIO0E0QzV6REc7RUFFUSxlQUFBO0M1QzZ6RFg7QTRDL3pERztFQUtRLGNBQUE7QzVDNnpEWDtBNEN6ekREO0VBQ0ksbUJBQUE7RUFDQSxvQkFBQTtFQUFBLG1CQUFBO1VBQUEsV0FBQTtFQUNBLDBCQUFBO0M1QzJ6REg7QTRDMXpERztFQUNJLFlBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7RUFDQSxPQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSw4QkFBQTtVQUFBLHNCQUFBO0VBQ0EsOEJBQUE7VUFBQSxzQkFBQTtFQUNBLG9CQUFBO0VBQ0EsMEJBQUE7RUFDQSx1QkFBQTtFQUNBLG9CQUFBO0M1QzR6RFA7QTRDenpERDtFQUNJLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSxvQkFBQTtFQUNBLGFBQUE7RUFDQSxZQUFBO0VBQ0EsdUJBQUE7RUFDQSxXQUFBO0M1QzJ6REg7QTRDbDBERDtFQVNRLGVBQUE7RUFDQSxZQUFBO0VBQ0EscUJBQUE7RUFDQSxVQUFBO0VBQ0EsZ0JBQUE7RUFDQSwwQkFBQTtFQUNBLHdCQUFBO0VBQ0Esd0JBQUE7QzVDNHpEUDtBNEMzekRPO0VBQ0ksY0FBQTtDNUM2ekRYO0E0Qy8wREQ7RUFzQlEsbUJBQUE7RUFDQSxXQUFBO0VBQ0EsT0FBQTtFQUNBLGtCQUFBO0M1QzR6RFA7QTRDcjFERDtFQTRCUSxtQkFBQTtFQUNBLE9BQUE7RUFDQSxTQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtDNUM0ekRQO0E0Q3p6REQ7RUFDSSxtQkFBQTtFQUNBLFNBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLFVBQUE7RUFDQSxXQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7RUFDQSxvQkFBQTtDNUMyekRIO0E0Q3IwREQ7RUFZUSxzQkFBQTtFQUNBLGdCQUFBO0VBQ0EsdUJBQUE7QzVDNHpEUDtBNEMxMEREO0VBaUJRLGtCQUFBO0M1QzR6RFA7QTRDenpERDtFQUNJLGNBQUE7RUFDQSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLG9CQUFBO0M1QzJ6REg7QTRDenpERDtFQUNJLGNBQUE7QzVDMnpESDtBNEN2ekREOzs7O0VBSUksY0FBQTtDNUN5ekRIO0E2Q3Y2REQ7RUFDSSxnQkFBQTtFQUNBLFlBQUE7RUFDQSxRQUFBO0VBQ0EsVUFBQTtFQUNBLGNBQUE7RUFDQSxvQ0FBQTtVQUFBLDRCQUFBO0VBQ0Esc0NBQUE7VUFBQSw4QkFBQTtFQUVBLDBDQUFBO0VBQUEsa0NBQUE7RUFBQSwwQkFBQTtFQUFBLGlEQUFBO0M3Q3c2REg7QTZDcjZERDtFQUNJLHFCQUFBO0VBQUEsc0JBQUE7RUFBQSxjQUFBO0VBQ0EsbUJBQUE7RUFDQSwwQkFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7QzdDdTZESDtBNkN0NkRHO0VoQ05BLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7RUFDQSxVQUFBO0VBQ0EsU0FBQTtFQUNBLFlBQUE7RUFDQSxpQ0FBQTtFQUNBLGVBQUE7RUFDQSxpQ0FBQTtVQUFBLHlCQUFBO0VBQ0EsK0JBQUE7VUFBQSx1QkFBQTtDYis2REg7QTZDNzZERDtFQUNJLGVBQUE7RUFDQSxvQkFBQTtFQUFBLGdCQUFBO1VBQUEsUUFBQTtFQUNBLGVBQUE7QzdDKzZESDtBNkM3NkRHO0VBQ0ksaUJBQUE7QzdDKzZEUDtBNkM3NkRHO0VBQ0ksa0JBQUE7QzdDKzZEUDtBNkMzNkREO0VBQ0kscUJBQUE7RUFBQSxzQkFBQTtFQUFBLGNBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsY0FBQTtFQUNBLGlCQUFBO0M3QzY2REg7QTZDMTZERDtFQUNJLG9CQUFBO0VBQUEsZ0JBQUE7VUFBQSxRQUFBO0VBQ0EsbUJBQUE7RUFDQSxhQUFBO0M3QzQ2REg7QTZDeDZERDtFQUNJLG1CQUFBO0VBQ0EsT0FBQTtFQUNBLFFBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLGVBQUE7RUFDQSxXQUFBO0VBQ0Esb0xBQUE7RUFBQSxxS0FBQTtFQUNBLGlDQUFBO0VBQ0EsNEJBQUE7RUFDQSw2QkFBQTtFQUNBLGlDQUFBO1VBQUEseUJBQUE7QzdDMDZESDtBNkN2NkREO0VBQ0ksWUFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7RUFDQSxXQUFBO0VBQ0EsV0FBQTtDN0N5NkRIO0E2Q3g2REc7RWhDMUVBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7RUFDQSxPQUFBO0VBQ0EsU0FBQTtFQUNBLFlBQUE7RUFDQSw4QkFBQTtFQUNBLGVBQUE7RUFDQSw4QkFBQTtVQUFBLHNCQUFBO0VBQ0EsK0JBQUE7VUFBQSx1QkFBQTtDYnEvREg7QTZDajdERztFaENoRUEsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtFQUNBLFVBQUE7RUFDQSxTQUFBO0VBQ0EsWUFBQTtFQUNBLGlDQUFBO0VBQ0EsZUFBQTtFQUNBLGlDQUFBO1VBQUEseUJBQUE7RUFDQSwrQkFBQTtVQUFBLHVCQUFBO0Niby9ESDtBNkN4N0REO0VBQ0ksbUJBQUE7RUFDQSxPQUFBO0VBQ0EsUUFBQTtFQUNBLFlBQUE7QzdDMDdESDtBNkN2N0REO0VBQ0ksbUJBQUE7RUFDQSxtQkFBQTtFQUNBLFlBQUE7RUFDQSx3QkFBQTtFQUNBLG9CQUFBO0VBQ0EsaUJBQUE7QzdDeTdESDtBNkN0N0REO0VBQ0ksZUFBQTtDN0N3N0RIO0E4QzFoRUQ7RUFDSTtJQUNJLDJDQUFBO1lBQUEsbUNBQUE7RzlDNGhFTDtFOEN6aEVDO0lBQ0ksd0NBQUE7WUFBQSxnQ0FBQTtHOUMyaEVMO0NBQ0Y7QThDbGlFRDtFQUNJO0lBQ0ksMkNBQUE7WUFBQSxtQ0FBQTtHOUM0aEVMO0U4Q3poRUM7SUFDSSx3Q0FBQTtZQUFBLGdDQUFBO0c5QzJoRUw7Q0FDRjtBOEN4aEVEO0VBQ0ksNkNBQUE7VUFBQSxxQ0FBQTtDOUMwaEVIO0E4Q3ZoRUQ7RUFDSTtJQUNJLHdDQUFBO1lBQUEsZ0NBQUE7RzlDeWhFTDtFOEN0aEVDO0lBQ0ksMkNBQUE7WUFBQSxtQ0FBQTtHOUN3aEVMO0NBQ0Y7QThDL2hFRDtFQUNJO0lBQ0ksd0NBQUE7WUFBQSxnQ0FBQTtHOUN5aEVMO0U4Q3RoRUM7SUFDSSwyQ0FBQTtZQUFBLG1DQUFBO0c5Q3doRUw7Q0FDRjtBOENyaEVEO0VBQ0ksK0NBQUE7VUFBQSx1Q0FBQTtDOUN1aEVIO0E4Q3BoRUQ7RUFDSTtJQUNJLFdBQUE7RzlDc2hFTDtFOENwaEVDO0lBQ0ksV0FBQTtHOUNzaEVMO0NBQ0Y7QThDNWhFRDtFQUNJO0lBQ0ksV0FBQTtHOUNzaEVMO0U4Q3BoRUM7SUFDSSxXQUFBO0c5Q3NoRUw7Q0FDRjtBOENuaEVEO0VBQ0ksNENBQUE7VUFBQSxvQ0FBQTtDOUNxaEVIO0E4Q2xoRUQ7RUFDSTtJQUNJLFdBQUE7RzlDb2hFTDtFOENsaEVDO0lBQ0ksV0FBQTtHOUNvaEVMO0NBQ0Y7QThDMWhFRDtFQUNJO0lBQ0ksV0FBQTtHOUNvaEVMO0U4Q2xoRUM7SUFDSSxXQUFBO0c5Q29oRUw7Q0FDRjtBOENqaEVEO0VBQ0ksNkNBQUE7VUFBQSxxQ0FBQTtDOUNtaEVIO0ErQ3RrRUQ7RUFDSSxlQUFBO0VBQ0EsbUJBQUE7RUFDQSxnQkFBQTtDL0N3a0VIO0ErQzNrRUQ7RUFNUSxlQUFBO0MvQ3drRVA7QStDcmtFRDtFQUNJLGVBQUE7Qy9DdWtFSDtBK0Nya0VEO0VBQ0kseUJBQUE7VUFBQSxpQkFBQTtFQUNBLFdBQUE7RUFDQSxhQUFBO0VBRUEsMEJBQUE7RUFDQSwwQkFBQTtFQUNBLG1CQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUVBLGtCQUFBO0VBQ0EsU0FBQTtDL0Nxa0VIO0ErQ2xrRU87RUFDSSxvQkFBQTtFQUNBLG1CQUFBO0VBQ0Esb0JBQUE7RUFDQSxxQkFBQTtFQUNBLHFCQUFBO0VBQ0EsbUJBQUE7RUFDQSxZQUFBO0VBQ0Esc0JBQUE7RUFDQSx1QkFBQTtFQUNBLHlCQUFBO0VBQ0EsaUJBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFFQSxtQkFBQTtFQUNBLFNBQUE7RUFDQSxVQUFBO0VBQ0EscURBQUE7VUFBQSw2Q0FBQTtDL0Nta0VYO0ErQ2hrRUc7RUFDSSwwQkFBQTtDL0Nra0VQO0ErQ2prRU87RUFDSSxlQUFBO0MvQ21rRVg7QWdEdm5FRDtFQUNFLFlBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSx1QkFBQTtFQUNBLDBEQUFBO1VBQUEsa0RBQUE7RUFDQSxrNURBQUE7RUFDQSxzQkFBQTtDaER5bkVEO0FnRHhuRUM7RUFDQywwckRBQUE7Q2hEMG5FRjtBZ0R0bkVEO0VBQ0U7SUFDRSwyQ0FBQTtZQUFBLG1DQUFBO0doRHduRUQ7RWdEcm5FRDtJQUNFLDZDQUFBO1lBQUEscUNBQUE7R2hEdW5FRDtDQUNGO0FnRHBuRUQ7RUFDRTtJQUNFLDJDQUFBO1lBQUEsbUNBQUE7R2hEc25FRDtFZ0RubkVEO0lBQ0UsNkNBQUE7WUFBQSxxQ0FBQTtHaERxbkVEO0NBQ0Y7QWlEbnBFRDtFQUNJLG1CQUFBO0VBQ0EsMEJBQUE7VUFBQSxrQkFBQTtDakRxcEVIO0FpRGxwRUQ7RUFDSSxtQkFBQTtFQUNBLFlBQUE7RUFDQSwwQkFBQTtDakRvcEVIO0FpRGpwRUQ7RUFDSSxZQUFBO0VBQ0EsMEJBQUE7RUFDQSxTQUFBO0NqRG1wRUg7QWlEaHBFRDtFQUNJLG1CQUFBO0VBQ0EsUUFBQTtFQUNBLFNBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLDBCQUFBO0VBQ0EsdUNBQUE7Q2pEa3BFSDtBaUQ5b0VEO0VBQ0kscUJBQUE7RUFBQSxzQkFBQTtFQUFBLGNBQUE7RUFDQSwwQkFBQTtFQUFBLDRCQUFBO1VBQUEsb0JBQUE7Q2pEZ3BFSDtBaURscEVEO0VBSVEsb0JBQUE7RUFBQSxnQkFBQTtVQUFBLFFBQUE7Q2pEaXBFUDtBaUQ5b0VEO0VBQ0ksa0JBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0NqRGdwRUgiLCJmaWxlIjoic3R5bGUvd2V1aS5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAaW1wb3J0IFwiZm5cIjtcblxuaHRtbCB7XG4gICAgLW1zLXRleHQtc2l6ZS1hZGp1c3Q6IDEwMCU7XG4gICAgLXdlYmtpdC10ZXh0LXNpemUtYWRqdXN0OiAxMDAlO1xufVxuXG5ib2R5IHtcbiAgICBsaW5lLWhlaWdodDogMS42O1xuICAgIGZvbnQtZmFtaWx5OiBAd2V1aUZvbnREZWZhdWx0O1xufVxuXG4qIHtcbiAgICBtYXJnaW46IDA7XG4gICAgcGFkZGluZzogMDtcbn1cblxuYSBpbWcge1xuICAgIGJvcmRlcjogMDtcbn1cblxuYSB7XG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgIC5zZXRUYXBDb2xvcigpO1xufSIsImh0bWwge1xuICAtbXMtdGV4dC1zaXplLWFkanVzdDogMTAwJTtcbiAgLXdlYmtpdC10ZXh0LXNpemUtYWRqdXN0OiAxMDAlO1xufVxuYm9keSB7XG4gIGxpbmUtaGVpZ2h0OiAxLjY7XG4gIGZvbnQtZmFtaWx5OiAtYXBwbGUtc3lzdGVtLWZvbnQsIFwiSGVsdmV0aWNhIE5ldWVcIiwgc2Fucy1zZXJpZjtcbn1cbioge1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDA7XG59XG5hIGltZyB7XG4gIGJvcmRlcjogMDtcbn1cbmEge1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gIC13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwKTtcbn1cbkBmb250LWZhY2Uge1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG4gIGZvbnQtZmFtaWx5OiBcIndldWlcIjtcbiAgc3JjOiB1cmwoJ2RhdGE6YXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtO2Jhc2U2NCxBQUVBQUFBTEFJQUFBd0F3UjFOVlFyRCtzKzBBQUFFNEFBQUFRazlUTHpKQUtFeCtBQUFCZkFBQUFGWmpiV0Z3NjVjRkhRQUFBaHdBQUFKUVoyeDVadkNSUi9FQUFBU1VBQUFLdEdobFlXUU1QUk90QUFBQTRBQUFBRFpvYUdWaENDd0QrZ0FBQUx3QUFBQWthRzEwZUVKby8vOEFBQUhVQUFBQVNHeHZZMkVZcWhXNEFBQUViQUFBQUNadFlYaHdBU0VBVlFBQUFSZ0FBQUFnYm1GdFplTmNIdGdBQUE5SUFBQUI1bkJ2YzNUNmJMaExBQUFSTUFBQUFPWUFBUUFBQStnQUFBQmFBK2ovLy8vL0Era0FBUUFBQUFBQUFBQUFBQUFBQUFBQUFCSUFBUUFBQUFFQUFDYlpieHRmRHp6MUFBc0Q2QUFBQUFEVW0yZHZBQUFBQU5TYloyLy8vd0FBQStrRDZnQUFBQWdBQWdBQUFBQUFBQUFCQUFBQUVnQkpBQVVBQUFBQUFBSUFBQUFLQUFvQUFBRC9BQUFBQUFBQUFBRUFBQUFLQUI0QUxBQUJSRVpNVkFBSUFBUUFBQUFBQUFBQUFRQUFBQUZzYVdkaEFBZ0FBQUFCQUFBQUFRQUVBQVFBQUFBQkFBZ0FBUUFHQUFBQUFRQUFBQUFBQVFPd0FaQUFCUUFJQW5vQ3ZBQUFBSXdDZWdLOEFBQUI0QUF4QVFJQUFBSUFCUU1BQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQVVHWkZaQUJBNmdIcUVRUG9BQUFBV2dQcUFBQUFBQUFCQUFBQUFBQUFBQUFBQUFQb0FBQUQ2QUFBQStnQUFBUG9BQUFENkFBQUErZ0FBQVBvQUFBRDZBQUFBK2dBQUFQb0FBQUQ2QUFBQStnQUFBUG9BQUFENkFBQUErai8vd1BvQUFBRDZBQUFBQUFBQlFBQUFBTUFBQUFzQUFBQUJBQUFBWFFBQVFBQUFBQUFiZ0FEQUFFQUFBQXNBQU1BQ2dBQUFYUUFCQUJDQUFBQUJBQUVBQUVBQU9vUi8vOEFBT29CLy84QUFBQUJBQVFBQUFBQkFBSUFBd0FFQUFVQUJnQUhBQWdBQ1FBS0FBc0FEQUFOQUE0QUR3QVFBQkVBQUFFR0FBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUF3QUFBQUFBTndBQUFBQUFBQUFFUUFBNmdFQUFPb0JBQUFBQVFBQTZnSUFBT29DQUFBQUFnQUE2Z01BQU9vREFBQUFBd0FBNmdRQUFPb0VBQUFBQkFBQTZnVUFBT29GQUFBQUJRQUE2Z1lBQU9vR0FBQUFCZ0FBNmdjQUFPb0hBQUFBQndBQTZnZ0FBT29JQUFBQUNBQUE2Z2tBQU9vSkFBQUFDUUFBNmdvQUFPb0tBQUFBQ2dBQTZnc0FBT29MQUFBQUN3QUE2Z3dBQU9vTUFBQUFEQUFBNmcwQUFPb05BQUFBRFFBQTZnNEFBT29PQUFBQURnQUE2ZzhBQU9vUEFBQUFEd0FBNmhBQUFPb1FBQUFBRUFBQTZoRUFBT29SQUFBQUVRQUFBQUFBUmdDTUFOSUJKQUY0QWNRQ01nSmdBcWdDL0FOSUE2WUQvZ1JPQktBRTlBVmFBQUFBQWdBQUFBQURyd090QUJRQUtRQUFBU0lIQmdjR0ZCY1dGeFl5TnpZM05qUW5KaWNtQXlJbkppY21ORGMyTnpZeUZ4WVhGaFFIQmdjR0FmVjRaMlE3UER3N1pHZndabVE3UER3N1pHWjRibDViTmpjM05sdGUyMTViTmpjM05sdGVBNjA4TzJSbjhHZGpPenc4TzJObjhHZGtPeno4cnpjMVcxN2JYbHcxTnpjMVhGN2JYbHMxTndBQUFBQUNBQUFBQUFPekE3TUFGd0F0QUFBQklnY0dCd1lWRkJjV0Z4WXpNamMyTnpZMU5DY21KeVlUQndZaUx3RW1OanNCRVRRMk93RXlGaFVSTXpJV0FlNTJaMlE3UFQwN1pHZDJmR3BtT3o0K08yWnBJWFlPS0E1MkRnMFhYUXNISmdjTFhSY05BN00rTzJacWZIWm5aRHM5UFR0a1ozWjlhV1k3UHYzd21oSVNtaElhQVJjSUN3c0kvdWthQUFNQUFBQUFBK1VENVFBWEFDTUFMQUFBQVNJSEJnY0dGUlFYRmhjV016STNOamMyTlRRbkppY21BeFFyQVNJMUF6UTdBVElISnlJbU5EWXlGaFFHQWU2RWNtOUJSRVJCYjNLRWlYWnhRa1JFUW5GMWFRSXhBd2dDUWdNQkl4SVpHU1FaR1FQa1JFSnhkb21FY205QlJFUkJiM0tFaW5WeFFrVDlIUUlDQVdJQ0FqRVpJeGtaSXhrQUFBQUFBZ0FBQUFBRHNRUGtBQmtBTGdBQUFRWUhCZ2MyQlJFVUZ4WVhGaGMyTnpZM05qVVJKQmNtSnlZVEFRWXZBU1kvQVRZeUh3RVdOamNsTmpJZkFSWUI5VlZWUWsrdi90RkhQbXhlYkd4ZGJUMUkvdEd2VDBKVm8vN1ZCQVNLQXdNU0FRVUJjUUVGQWdFU0FnVUJFUVFENHhNWUVoazNZUDZzam5WbFNEOGNIRDlJWlhXT0FWUmdOeGtTR1A2Mi90a0RBNDhFQkJrQ0FWWUNBUUhsQVFJUUJBQUFBQUFEQUFBQUFBT3hBK1FBR3dBcUFETUFBQUVHQndZSEJnY0dOeEVVRnhZWEZoYzJOelkzTmpVUkpCY21KeVlITXpJV0ZRTVVCaXNCSWljRE5EWVRJaVkwTmpJV0ZBWUI5VUZCT0Rzc08zOGdSejVzWG14c1hXMDlTUDdZcUZCQlZXODBCQVlNQXdJbUJRRUxCaDRQRmhZZUZSVUQ1QThTRGhJT0Vpa0svcTJQZFdSSlBoMGRQa2xrZFk4QlUxNDFHUklZL0FZRS9zWUNBd1VCT2dRRy9rQVZIeFVWSHhVQUFBQUNBQUFBQUFQa0ErUUFGd0F0QUFBQklnY0dCd1lWRkJjV0Z4WXpNamMyTnpZMU5DY21KeVlUQVFZaUx3RW1Qd0UyTWg4QkZqSTNBVFl5SHdFV0FlNkVjbTlCUTBOQ2JuT0RpWFZ4UWtSRVFuRjFrZjZnQVFVQm93TURGZ0VGQVlVQ0JRRUJRd0lGQVJVRUErTkVRbkYxaVlOemJrSkRRMEZ2Y29TSmRYRkNSUDZqL3FVQkFhZ0VCUjRDQVdZQkFRRU5BZ0lWQkFBQUFBUUFBQUFBQTY4RHJRQVVBQ2tBUHdCREFBQUJJZ2NHQndZVUZ4WVhGakkzTmpjMk5DY21KeVlESWljbUp5WTBOelkzTmpJWEZoY1dGQWNHQndZVEJRNEJMd0VtQmc4QkJoWWZBUll5TndFK0FTWWlGekFmQVFIMWVHZGtPenc4TzJSbjhHWmtPenc4TzJSbWVHNWVXelkzTnpaYlh0dGVXelkzTnpaYlhtbis5Z1lTQm1BR0R3VURCUUVHZlFVUUJnRWxCUUVMRUJVQkFRT3RQRHRrWi9Cbll6czhQRHRqWi9CblpEczgvSzgzTlZ0ZTIxNWNOVGMzTlZ4ZTIxNWJOVGNDSnQwRkFRVkpCUUlHQkFjUkJvQUdCUUVoQlE4TEJBRUJBQUFCQUFBQUFBTzdBem9BRndBQUV5NEJQd0UrQVI4QkZqWTNBVFlXRnljV0ZBY0JCaUluUFFvR0J3VUhHZ3pMRENFTEFoMExId3NOQ2dyOXVRb2VDZ0d6Q3lFT0N3MEhDWk1KQVFvQnZna0NDZzBMSFF2OXNRc0tBQUFBQUFJQUFBQUFBK1VENWdBWEFDd0FBQUVpQndZSEJoVVVGeFlYRmpNeU56WTNOalUwSnlZbkpoTUhCaThCSmljbU5STTBOanNCTWhZVkV4Y2VBUUh2aEhKdlFVTkRRbTV6ZzRsMWNVSkVSRUp4ZFZjUUF3VDZBd0lFRUFNQ0t3SUREc1VDQVFQbFJFSnhkWW1EYzI1Q1EwTkJiM0tFaVhWeFFrVDlWaHdFQW5jQ0FnTUdBWG9DQXdNQy9xMkZBZ1FBQUFRQUFBQUFBNjhEclFBREFCZ0FMUUF6QUFBQk1COEJBeUlIQmdjR0ZCY1dGeFl5TnpZM05qUW5KaWNtQXlJbkppY21ORGMyTnpZeUZ4WVhGaFFIQmdjR0F5TVZNelVqQXVVQkFmSjRaMlE3UER3N1pHZndabVE3UER3N1pHWjRibDViTmpjM05sdGUyMTViTmpjM05sdGVteVQ5MlFLREFRRUJMRHc3Wkdmd1oyTTdQRHc3WTJmd1oyUTdQUHl2TnpWYlh0dGVYRFUzTnpWY1h0dGVXelUzQWpIOUpBQUFBQU1BQUFBQUErUUQ1QUFYQUNjQU1BQUFBU0lIQmdjR0ZSUVhGaGNXTXpJM05qYzJOVFFuSmljbUF6TXlGaFVERkFZckFTSW1OUU0wTmhNaUpqUTJNaFlVQmdIdWhISnZRVU5EUW01emc0bDFjVUpFUkVKeGRaNDJCQVlNQXdJbkF3TU1CaDhQRmhZZUZoWUQ0MFJDY1hXSmczTnVRa05EUVc5eWhJbDFjVUpFL3ZZR0JmN0FBZ01EQWdGQUJRYitOaFlmRmhZZkZnQUFCQUFBQUFBRHdBUEFBQWdBRWdBb0FEMEFBQUV5TmpRbUlnWVVGaGNqRlRNUkl4VXpOU01ESWdjR0J3WVZGQllYRmpNeU56WTNOalUwSnk0QkF5SW5KaWNtTkRjMk56WXlGeFlYRmhRSEJnY0dBZlFZSVNFd0lTRlJqems1eVRvcmhHNXJQVDk5YW0rRGRtaGxQRDQrUE15RmJWNWJOVGMzTlZ0ZTJsNWJOVGMzTlZ0ZUFxQWlMeUlpTHlJNUhmN0VIQndDc1Q4OWEyNkVkOHc4UGo0OFpXaDJnMjlxZmZ5ak56VmJYdHBlV3pVM056VmJYdHBlV3pVM0FBQURBQUFBQUFPb0E2Z0FDd0FnQURVQUFBRUhKd2NYQnhjM0Z6Y25Od01pQndZSEJoUVhGaGNXTWpjMk56WTBKeVluSmdNaUp5WW5KalEzTmpjMk1oY1dGeFlVQndZSEJnS09tcG9jbXBvY21wb2NtcHEyZG1aaU9qczdPbUptN0daaU9qczdPbUptZG10ZFdUUTJOalJaWGRaZFdUUTJOalJaWFFLcW1wb2NtcG9jbXBvY21wb0JHVHM2WW1ic1ptSTZPenM2WW1ic1ptSTZPL3pDTmpSWlhkWmRXVFEyTmpSWlhkWmRXVFEyQUFNQUFBQUFBK2tENmdBYUFDOEFNQUFBQVFZSEJpTWlKeVluSmpRM05qYzJNaGNXRnhZVkZBY0dCd0VIQVRJM05qYzJOQ2NtSnlZaUJ3WUhCaFFYRmhjV013S09OVUJDUjIxZFdqVTNOelZhWGRwZFd6VTJHQmNyQVNNNS9lQlhTMGdyS3lzclNFdXVTa2txTEN3cVNVcFhBU01yRnhnMk5WdGQybDFhTlRjM05WcGRiVWRDUURYKzNqa0JHU3NyU0V1dVNra3FMQ3dxU1VxdVMwZ3JLd0FDLy84QUFBUG9BK2dBRkFBd0FBQUJJZ2NHQndZUUZ4WVhGaUEzTmpjMkVDY21KeVlURmc0QklpOEJCd1l1QVRRL0FTY21QZ0VXSHdFM05oNEJCZzhCQWZTSWRIRkRSRVJEY1hRQkVIUnhRMFJFUTNGMFNRb0JGQnNLb3FnS0d4TUtxS0lLQVJRYkNxS29DaHNVQVFxb0EraEVRM0YwL3ZCMGNVTkVSRU54ZEFFUWRIRkRSUDFqQ2hzVENxaWlDZ0VVR3dxaXFBb2JGQUVLcUtJS0FSUWJDcUlBQUFJQUFBQUFBK1FENUFBWEFEUUFBQUVpQndZSEJoVVVGeFlYRmpNeU56WTNOalUwSnlZbkpoTVVCaU1GRnhZVUR3RUdMd0V1QVQ4Qk5oOEJGaFFQQVFVeUZoMEJBZTZFY205QlEwTkNibk9EaVhWeFFrUkVRbkYxZndRQy9wR0RBUUVWQXdUc0FnRUM3QVFFRkFJQmhBRndBZ01ENDBSQ2NYV0pnM051UWtORFFXOXloSWwxY1VKRS9mWUNBd3VWQWdRQ0ZBUUUwQUlGQXRFRUJCUUNCUUdWQ3dNREp3QUFBQVVBQUFBQUE5UUQwd0FqQUNjQU53QkhBRWdBQUFFUkZBWWpJU0ltTlJFaklpWTlBVFEyTXlFMU5EWXpJVElXSFFFaE1oWWRBUlFHSXlFUklSRUhJZ1lWRVJRV093RXlOalVSTkNZaklTSUdGUkVVRmpzQk1qWTFFVFFtS3dFRGV5WWIvWFliSmtNSkRRMEpBUVlaRWdFdkV4a0JCZ2tORFFuOUNRSmMwUWtORFFrdENRME5DZjdzQ1EwTkNTMEpEUTBKTFFNaS9UUWJKaVliQXN3TUNpd0pEUzRTR1JrU0xnMEpMQW9NL1V3Q3RHc05DZjVOQ1EwTkNRR3pDUTBOQ2Y1TkNRME5DUUd6Q1EwQUFBQUFFQURHQUFFQUFBQUFBQUVBQkFBQUFBRUFBQUFBQUFJQUJ3QUVBQUVBQUFBQUFBTUFCQUFMQUFFQUFBQUFBQVFBQkFBUEFBRUFBQUFBQUFVQUN3QVRBQUVBQUFBQUFBWUFCQUFlQUFFQUFBQUFBQW9BS3dBaUFBRUFBQUFBQUFzQUV3Qk5BQU1BQVFRSkFBRUFDQUJnQUFNQUFRUUpBQUlBRGdCb0FBTUFBUVFKQUFNQUNBQjJBQU1BQVFRSkFBUUFDQUIrQUFNQUFRUUpBQVVBRmdDR0FBTUFBUVFKQUFZQUNBQ2NBQU1BQVFRSkFBb0FWZ0NrQUFNQUFRUUpBQXNBSmdENmQyVjFhVkpsWjNWc1lYSjNaWFZwZDJWMWFWWmxjbk5wYjI0Z01TNHdkMlYxYVVkbGJtVnlZWFJsWkNCaWVTQnpkbWN5ZEhSbUlHWnliMjBnUm05dWRHVnNiRzhnY0hKdmFtVmpkQzVvZEhSd09pOHZabTl1ZEdWc2JHOHVZMjl0QUhjQVpRQjFBR2tBVWdCbEFHY0FkUUJzQUdFQWNnQjNBR1VBZFFCcEFIY0FaUUIxQUdrQVZnQmxBSElBY3dCcEFHOEFiZ0FnQURFQUxnQXdBSGNBWlFCMUFHa0FSd0JsQUc0QVpRQnlBR0VBZEFCbEFHUUFJQUJpQUhrQUlBQnpBSFlBWndBeUFIUUFkQUJtQUNBQVpnQnlBRzhBYlFBZ0FFWUFid0J1QUhRQVpRQnNBR3dBYndBZ0FIQUFjZ0J2QUdvQVpRQmpBSFFBTGdCb0FIUUFkQUJ3QURvQUx3QXZBR1lBYndCdUFIUUFaUUJzQUd3QWJ3QXVBR01BYndCdEFBQUFBZ0FBQUFBQUFBQUtBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBU0FRSUJBd0VFQVFVQkJnRUhBUWdCQ1FFS0FRc0JEQUVOQVE0QkR3RVFBUkVCRWdFVEFBWmphWEpqYkdVSVpHOTNibXh2WVdRRWFXNW1id3h6WVdabFgzTjFZMk5sYzNNSmMyRm1aVjkzWVhKdUIzTjFZMk5sYzNNT2MzVmpZMlZ6Y3kxamFYSmpiR1VSYzNWalkyVnpjeTF1YnkxamFYSmpiR1VIZDJGcGRHbHVadzUzWVdsMGFXNW5MV05wY21Oc1pRUjNZWEp1QzJsdVptOHRZMmx5WTJ4bEJtTmhibU5sYkFaelpXRnlZMmdGWTJ4bFlYSUVZbUZqYXdaa1pXeGxkR1VBQUFBQScpIGZvcm1hdCgndHJ1ZXR5cGUnKTtcbn1cbltjbGFzc149XCJ3ZXVpLWljb24tXCJdLFxuW2NsYXNzKj1cIiB3ZXVpLWljb24tXCJdIHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICBmb250OiBub3JtYWwgbm9ybWFsIG5vcm1hbCAxNHB4LzEgXCJ3ZXVpXCI7XG4gIGZvbnQtc2l6ZTogaW5oZXJpdDtcbiAgdGV4dC1yZW5kZXJpbmc6IGF1dG87XG4gIC13ZWJraXQtZm9udC1zbW9vdGhpbmc6IGFudGlhbGlhc2VkO1xufVxuW2NsYXNzXj1cIndldWktaWNvbi1cIl06YmVmb3JlLFxuW2NsYXNzKj1cIiB3ZXVpLWljb24tXCJdOmJlZm9yZSB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgbWFyZ2luLWxlZnQ6IC4yZW07XG4gIG1hcmdpbi1yaWdodDogLjJlbTtcbn1cbi53ZXVpLWljb24tY2lyY2xlOmJlZm9yZSB7XG4gIGNvbnRlbnQ6IFwiXFxFQTAxXCI7XG59XG4vKiAn7qCAJyAqL1xuLndldWktaWNvbi1kb3dubG9hZDpiZWZvcmUge1xuICBjb250ZW50OiBcIlxcRUEwMlwiO1xufVxuLyogJ+6ggCcgKi9cbi53ZXVpLWljb24taW5mbzpiZWZvcmUge1xuICBjb250ZW50OiBcIlxcRUEwM1wiO1xufVxuLyogJ+6ggCcgKi9cbi53ZXVpLWljb24tc2FmZS1zdWNjZXNzOmJlZm9yZSB7XG4gIGNvbnRlbnQ6IFwiXFxFQTA0XCI7XG59XG4vKiAn7qCAJyAqL1xuLndldWktaWNvbi1zYWZlLXdhcm46YmVmb3JlIHtcbiAgY29udGVudDogXCJcXEVBMDVcIjtcbn1cbi8qICfuoIAnICovXG4ud2V1aS1pY29uLXN1Y2Nlc3M6YmVmb3JlIHtcbiAgY29udGVudDogXCJcXEVBMDZcIjtcbn1cbi8qICfuoIAnICovXG4ud2V1aS1pY29uLXN1Y2Nlc3MtY2lyY2xlOmJlZm9yZSB7XG4gIGNvbnRlbnQ6IFwiXFxFQTA3XCI7XG59XG4vKiAn7qCAJyAqL1xuLndldWktaWNvbi1zdWNjZXNzLW5vLWNpcmNsZTpiZWZvcmUge1xuICBjb250ZW50OiBcIlxcRUEwOFwiO1xufVxuLyogJ+6ggCcgKi9cbi53ZXVpLWljb24td2FpdGluZzpiZWZvcmUge1xuICBjb250ZW50OiBcIlxcRUEwOVwiO1xufVxuLyogJ+6ggCcgKi9cbi53ZXVpLWljb24td2FpdGluZy1jaXJjbGU6YmVmb3JlIHtcbiAgY29udGVudDogXCJcXEVBMEFcIjtcbn1cbi8qICfuoIAnICovXG4ud2V1aS1pY29uLXdhcm46YmVmb3JlIHtcbiAgY29udGVudDogXCJcXEVBMEJcIjtcbn1cbi8qICfuoIAnICovXG4ud2V1aS1pY29uLWluZm8tY2lyY2xlOmJlZm9yZSB7XG4gIGNvbnRlbnQ6IFwiXFxFQTBDXCI7XG59XG4vKiAn7qCAJyAqL1xuLndldWktaWNvbi1jYW5jZWw6YmVmb3JlIHtcbiAgY29udGVudDogXCJcXEVBMERcIjtcbn1cbi8qICfuoIAnICovXG4ud2V1aS1pY29uLXNlYXJjaDpiZWZvcmUge1xuICBjb250ZW50OiBcIlxcRUEwRVwiO1xufVxuLyogJ+6ggCcgKi9cbi53ZXVpLWljb24tY2xlYXI6YmVmb3JlIHtcbiAgY29udGVudDogXCJcXEVBMEZcIjtcbn1cbi8qICfuoIAnICovXG4ud2V1aS1pY29uLWJhY2s6YmVmb3JlIHtcbiAgY29udGVudDogXCJcXEVBMTBcIjtcbn1cbi8qICfuoIAnICovXG4ud2V1aS1pY29uLWRlbGV0ZTpiZWZvcmUge1xuICBjb250ZW50OiBcIlxcRUExMVwiO1xufVxuLyogJ+6ggCcgKi9cbltjbGFzc149XCJ3ZXVpLWljb25fXCJdOmJlZm9yZSxcbltjbGFzcyo9XCIgd2V1aS1pY29uX1wiXTpiZWZvcmUge1xuICBtYXJnaW46IDA7XG59XG4ud2V1aS1pY29uLXN1Y2Nlc3Mge1xuICBmb250LXNpemU6IDIzcHg7XG4gIGNvbG9yOiAjMDlCQjA3O1xufVxuLndldWktaWNvbi13YWl0aW5nIHtcbiAgZm9udC1zaXplOiAyM3B4O1xuICBjb2xvcjogIzEwQUVGRjtcbn1cbi53ZXVpLWljb24td2FybiB7XG4gIGZvbnQtc2l6ZTogMjNweDtcbiAgY29sb3I6ICNGNDM1MzA7XG59XG4ud2V1aS1pY29uLWluZm8ge1xuICBmb250LXNpemU6IDIzcHg7XG4gIGNvbG9yOiAjMTBBRUZGO1xufVxuLndldWktaWNvbi1zdWNjZXNzLWNpcmNsZSB7XG4gIGZvbnQtc2l6ZTogMjNweDtcbiAgY29sb3I6ICMwOUJCMDc7XG59XG4ud2V1aS1pY29uLXN1Y2Nlc3Mtbm8tY2lyY2xlIHtcbiAgZm9udC1zaXplOiAyM3B4O1xuICBjb2xvcjogIzA5QkIwNztcbn1cbi53ZXVpLWljb24td2FpdGluZy1jaXJjbGUge1xuICBmb250LXNpemU6IDIzcHg7XG4gIGNvbG9yOiAjMTBBRUZGO1xufVxuLndldWktaWNvbi1jaXJjbGUge1xuICBmb250LXNpemU6IDIzcHg7XG4gIGNvbG9yOiAjQzlDOUM5O1xufVxuLndldWktaWNvbi1kb3dubG9hZCB7XG4gIGZvbnQtc2l6ZTogMjNweDtcbiAgY29sb3I6ICMwOUJCMDc7XG59XG4ud2V1aS1pY29uLWluZm8tY2lyY2xlIHtcbiAgZm9udC1zaXplOiAyM3B4O1xuICBjb2xvcjogIzA5QkIwNztcbn1cbi53ZXVpLWljb24tc2FmZS1zdWNjZXNzIHtcbiAgY29sb3I6ICMwOUJCMDc7XG59XG4ud2V1aS1pY29uLXNhZmUtd2FybiB7XG4gIGNvbG9yOiAjRkZCRTAwO1xufVxuLndldWktaWNvbi1jYW5jZWwge1xuICBjb2xvcjogI0Y0MzUzMDtcbiAgZm9udC1zaXplOiAyMnB4O1xufVxuLndldWktaWNvbi1zZWFyY2gge1xuICBjb2xvcjogI0IyQjJCMjtcbiAgZm9udC1zaXplOiAxNHB4O1xufVxuLndldWktaWNvbi1jbGVhciB7XG4gIGNvbG9yOiAjQjJCMkIyO1xuICBmb250LXNpemU6IDE0cHg7XG59XG4ud2V1aS1pY29uLWRlbGV0ZS53ZXVpLWljb25fZ2FsbGVyeS1kZWxldGUge1xuICBjb2xvcjogI0ZGRkZGRjtcbiAgZm9udC1zaXplOiAyMnB4O1xufVxuLndldWktaWNvbl9tc2cge1xuICBmb250LXNpemU6IDkzcHg7XG59XG4ud2V1aS1pY29uX21zZy53ZXVpLWljb24td2FybiB7XG4gIGNvbG9yOiAjRjc2MjYwO1xufVxuLndldWktaWNvbl9tc2ctcHJpbWFyeSB7XG4gIGZvbnQtc2l6ZTogOTNweDtcbn1cbi53ZXVpLWljb25fbXNnLXByaW1hcnkud2V1aS1pY29uLXdhcm4ge1xuICBjb2xvcjogI0ZGQkUwMDtcbn1cbi53ZXVpLWJ0biB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgZGlzcGxheTogYmxvY2s7XG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICBtYXJnaW4tcmlnaHQ6IGF1dG87XG4gIHBhZGRpbmctbGVmdDogMTRweDtcbiAgcGFkZGluZy1yaWdodDogMTRweDtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgZm9udC1zaXplOiAxOHB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgY29sb3I6ICNGRkZGRkY7XG4gIGxpbmUtaGVpZ2h0OiAyLjU1NTU1NTU2O1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG4gIC13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwKTtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cbi53ZXVpLWJ0bjphZnRlciB7XG4gIGNvbnRlbnQ6IFwiIFwiO1xuICB3aWR0aDogMjAwJTtcbiAgaGVpZ2h0OiAyMDAlO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMDtcbiAgbGVmdDogMDtcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjIpO1xuICB0cmFuc2Zvcm06IHNjYWxlKDAuNSk7XG4gIHRyYW5zZm9ybS1vcmlnaW46IDAgMDtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcbn1cbi53ZXVpLWJ0bl9pbmxpbmUge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG59XG4ud2V1aS1idG5fZGVmYXVsdCB7XG4gIGNvbG9yOiAjMDAwMDAwO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRjhGOEY4O1xufVxuLndldWktYnRuX2RlZmF1bHQ6bm90KC53ZXVpLWJ0bl9kaXNhYmxlZCk6dmlzaXRlZCB7XG4gIGNvbG9yOiAjMDAwMDAwO1xufVxuLndldWktYnRuX2RlZmF1bHQ6bm90KC53ZXVpLWJ0bl9kaXNhYmxlZCk6YWN0aXZlIHtcbiAgY29sb3I6IHJnYmEoMCwgMCwgMCwgMC42KTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI0RFREVERTtcbn1cbi53ZXVpLWJ0bl9wcmltYXJ5IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzFBQUQxOTtcbn1cbi53ZXVpLWJ0bl9wcmltYXJ5Om5vdCgud2V1aS1idG5fZGlzYWJsZWQpOnZpc2l0ZWQge1xuICBjb2xvcjogI0ZGRkZGRjtcbn1cbi53ZXVpLWJ0bl9wcmltYXJ5Om5vdCgud2V1aS1idG5fZGlzYWJsZWQpOmFjdGl2ZSB7XG4gIGNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNik7XG4gIGJhY2tncm91bmQtY29sb3I6ICMxNzlCMTY7XG59XG4ud2V1aS1idG5fd2FybiB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNFNjQzNDA7XG59XG4ud2V1aS1idG5fd2Fybjpub3QoLndldWktYnRuX2Rpc2FibGVkKTp2aXNpdGVkIHtcbiAgY29sb3I6ICNGRkZGRkY7XG59XG4ud2V1aS1idG5fd2Fybjpub3QoLndldWktYnRuX2Rpc2FibGVkKTphY3RpdmUge1xuICBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjYpO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjQ0UzQzM5O1xufVxuLndldWktYnRuX2Rpc2FibGVkIHtcbiAgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC42KTtcbn1cbi53ZXVpLWJ0bl9kaXNhYmxlZC53ZXVpLWJ0bl9kZWZhdWx0IHtcbiAgY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4zKTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI0Y3RjdGNztcbn1cbi53ZXVpLWJ0bl9kaXNhYmxlZC53ZXVpLWJ0bl9wcmltYXJ5IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzlFRDk5RDtcbn1cbi53ZXVpLWJ0bl9kaXNhYmxlZC53ZXVpLWJ0bl93YXJuIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI0VDOEI4OTtcbn1cbi53ZXVpLWJ0bl9sb2FkaW5nIC53ZXVpLWxvYWRpbmcge1xuICBtYXJnaW46IC0wLjJlbSAwLjM0ZW0gMCAwO1xufVxuLndldWktYnRuX2xvYWRpbmcud2V1aS1idG5fcHJpbWFyeSxcbi53ZXVpLWJ0bl9sb2FkaW5nLndldWktYnRuX3dhcm4ge1xuICBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjYpO1xufVxuLndldWktYnRuX2xvYWRpbmcud2V1aS1idG5fcHJpbWFyeSAud2V1aS1sb2FkaW5nLFxuLndldWktYnRuX2xvYWRpbmcud2V1aS1idG5fd2FybiAud2V1aS1sb2FkaW5nIHtcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiZGF0YTppbWFnZS9zdmcreG1sO2NoYXJzZXQ9dXRmLTgsJTNDc3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zycgd2lkdGg9JzEyMCcgaGVpZ2h0PScxMjAnIHZpZXdCb3g9JzAgMCAxMDAgMTAwJyUzRSUzQ3BhdGggZmlsbD0nbm9uZScgZD0nTTAgMGgxMDB2MTAwSDB6Jy8lM0UlM0NyZWN0IHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zycgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHg9JzQ2LjUnIHk9JzQwJyBmaWxsPSdyZ2JhKDI1NSwyNTUsMjU1LC41NiknIHJ4PSc1JyByeT0nNScgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMCAtMzApJy8lM0UlM0NyZWN0IHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyB4PSc0Ni41JyB5PSc0MCcgZmlsbD0ncmdiYSgyNTUsMjU1LDI1NSwuNSknIHJ4PSc1JyByeT0nNScgdHJhbnNmb3JtPSdyb3RhdGUoMzAgMTA1Ljk4IDY1KScvJTNFJTNDcmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjQzKScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSg2MCA3NS45OCA2NSknLyUzRSUzQ3JlY3Qgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHg9JzQ2LjUnIHk9JzQwJyBmaWxsPSdyZ2JhKDI1NSwyNTUsMjU1LC4zOCknIHJ4PSc1JyByeT0nNScgdHJhbnNmb3JtPSdyb3RhdGUoOTAgNjUgNjUpJy8lM0UlM0NyZWN0IHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyB4PSc0Ni41JyB5PSc0MCcgZmlsbD0ncmdiYSgyNTUsMjU1LDI1NSwuMzIpJyByeD0nNScgcnk9JzUnIHRyYW5zZm9ybT0ncm90YXRlKDEyMCA1OC42NiA2NSknLyUzRSUzQ3JlY3Qgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHg9JzQ2LjUnIHk9JzQwJyBmaWxsPSdyZ2JhKDI1NSwyNTUsMjU1LC4yOCknIHJ4PSc1JyByeT0nNScgdHJhbnNmb3JtPSdyb3RhdGUoMTUwIDU0LjAyIDY1KScvJTNFJTNDcmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjI1KScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSgxODAgNTAgNjUpJy8lM0UlM0NyZWN0IHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyB4PSc0Ni41JyB5PSc0MCcgZmlsbD0ncmdiYSgyNTUsMjU1LDI1NSwuMiknIHJ4PSc1JyByeT0nNScgdHJhbnNmb3JtPSdyb3RhdGUoLTE1MCA0NS45OCA2NSknLyUzRSUzQ3JlY3Qgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHg9JzQ2LjUnIHk9JzQwJyBmaWxsPSdyZ2JhKDI1NSwyNTUsMjU1LC4xNyknIHJ4PSc1JyByeT0nNScgdHJhbnNmb3JtPSdyb3RhdGUoLTEyMCA0MS4zNCA2NSknLyUzRSUzQ3JlY3Qgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHg9JzQ2LjUnIHk9JzQwJyBmaWxsPSdyZ2JhKDI1NSwyNTUsMjU1LC4xNCknIHJ4PSc1JyByeT0nNScgdHJhbnNmb3JtPSdyb3RhdGUoLTkwIDM1IDY1KScvJTNFJTNDcmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjEpJyByeD0nNScgcnk9JzUnIHRyYW5zZm9ybT0ncm90YXRlKC02MCAyNC4wMiA2NSknLyUzRSUzQ3JlY3Qgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHg9JzQ2LjUnIHk9JzQwJyBmaWxsPSdyZ2JhKDI1NSwyNTUsMjU1LC4wMyknIHJ4PSc1JyByeT0nNScgdHJhbnNmb3JtPSdyb3RhdGUoLTMwIC01Ljk4IDY1KScvJTNFJTNDL3N2ZyUzRVwiKTtcbn1cbi53ZXVpLWJ0bl9sb2FkaW5nLndldWktYnRuX3ByaW1hcnkge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMTc5QjE2O1xufVxuLndldWktYnRuX2xvYWRpbmcud2V1aS1idG5fd2FybiB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNDRTNDMzk7XG59XG4ud2V1aS1idG5fcGxhaW4tcHJpbWFyeSB7XG4gIGNvbG9yOiAjMWFhZDE5O1xuICBib3JkZXI6IDFweCBzb2xpZCAjMWFhZDE5O1xufVxuLndldWktYnRuX3BsYWluLXByaW1hcnk6bm90KC53ZXVpLWJ0bl9wbGFpbi1kaXNhYmxlZCk6YWN0aXZlIHtcbiAgY29sb3I6IHJnYmEoMjYsIDE3MywgMjUsIDAuNik7XG4gIGJvcmRlci1jb2xvcjogcmdiYSgyNiwgMTczLCAyNSwgMC42KTtcbn1cbi53ZXVpLWJ0bl9wbGFpbi1wcmltYXJ5OmFmdGVyIHtcbiAgYm9yZGVyLXdpZHRoOiAwO1xufVxuLndldWktYnRuX3BsYWluLWRlZmF1bHQge1xuICBjb2xvcjogIzM1MzUzNTtcbiAgYm9yZGVyOiAxcHggc29saWQgIzM1MzUzNTtcbn1cbi53ZXVpLWJ0bl9wbGFpbi1kZWZhdWx0Om5vdCgud2V1aS1idG5fcGxhaW4tZGlzYWJsZWQpOmFjdGl2ZSB7XG4gIGNvbG9yOiByZ2JhKDUzLCA1MywgNTMsIDAuNik7XG4gIGJvcmRlci1jb2xvcjogcmdiYSg1MywgNTMsIDUzLCAwLjYpO1xufVxuLndldWktYnRuX3BsYWluLWRlZmF1bHQ6YWZ0ZXIge1xuICBib3JkZXItd2lkdGg6IDA7XG59XG4ud2V1aS1idG5fcGxhaW4tZGlzYWJsZWQge1xuICBjb2xvcjogcmdiYSgwLCAwLCAwLCAwLjIpO1xuICBib3JkZXItY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4yKTtcbn1cbmJ1dHRvbi53ZXVpLWJ0bixcbmlucHV0LndldWktYnRuIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGJvcmRlci13aWR0aDogMDtcbiAgb3V0bGluZTogMDtcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xufVxuYnV0dG9uLndldWktYnRuOmZvY3VzLFxuaW5wdXQud2V1aS1idG46Zm9jdXMge1xuICBvdXRsaW5lOiAwO1xufVxuYnV0dG9uLndldWktYnRuX2lubGluZSxcbmlucHV0LndldWktYnRuX2lubGluZSxcbmJ1dHRvbi53ZXVpLWJ0bl9taW5pLFxuaW5wdXQud2V1aS1idG5fbWluaSB7XG4gIHdpZHRoOiBhdXRvO1xufVxuYnV0dG9uLndldWktYnRuX3BsYWluLXByaW1hcnksXG5pbnB1dC53ZXVpLWJ0bl9wbGFpbi1wcmltYXJ5LFxuYnV0dG9uLndldWktYnRuX3BsYWluLWRlZmF1bHQsXG5pbnB1dC53ZXVpLWJ0bl9wbGFpbi1kZWZhdWx0IHtcbiAgYm9yZGVyLXdpZHRoOiAxcHg7XG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xufVxuLndldWktYnRuX21pbmkge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIHBhZGRpbmc6IDAgMS4zMmVtO1xuICBsaW5lLWhlaWdodDogMi4zO1xuICBmb250LXNpemU6IDEzcHg7XG59XG4vKmdhcCBiZXR3ZWVuIGJ0biovXG4ud2V1aS1idG4gKyAud2V1aS1idG4ge1xuICBtYXJnaW4tdG9wOiAxNXB4O1xufVxuLndldWktYnRuLndldWktYnRuX2lubGluZSArIC53ZXVpLWJ0bi53ZXVpLWJ0bl9pbmxpbmUge1xuICBtYXJnaW4tdG9wOiBhdXRvO1xuICBtYXJnaW4tbGVmdDogMTVweDtcbn1cbi53ZXVpLWJ0bi1hcmVhIHtcbiAgbWFyZ2luOiAxLjE3NjQ3MDU5ZW0gMTVweCAwLjNlbTtcbn1cbi53ZXVpLWJ0bi1hcmVhX2lubGluZSB7XG4gIGRpc3BsYXk6IGZsZXg7XG59XG4ud2V1aS1idG4tYXJlYV9pbmxpbmUgLndldWktYnRuIHtcbiAgbWFyZ2luLXRvcDogYXV0bztcbiAgbWFyZ2luLXJpZ2h0OiAxNXB4O1xuICB3aWR0aDogMTAwJTtcbiAgZmxleDogMTtcbn1cbi53ZXVpLWJ0bi1hcmVhX2lubGluZSAud2V1aS1idG46bGFzdC1jaGlsZCB7XG4gIG1hcmdpbi1yaWdodDogMDtcbn1cbi53ZXVpLWNlbGxzIHtcbiAgbWFyZ2luLXRvcDogMS4xNzY0NzA1OWVtO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZGRkZGO1xuICBsaW5lLWhlaWdodDogMS40MTE3NjQ3MTtcbiAgZm9udC1zaXplOiAxN3B4O1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG4ud2V1aS1jZWxsczpiZWZvcmUge1xuICBjb250ZW50OiBcIiBcIjtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiAwO1xuICB0b3A6IDA7XG4gIHJpZ2h0OiAwO1xuICBoZWlnaHQ6IDFweDtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNEOUQ5RDk7XG4gIGNvbG9yOiAjRDlEOUQ5O1xuICB0cmFuc2Zvcm0tb3JpZ2luOiAwIDA7XG4gIHRyYW5zZm9ybTogc2NhbGVZKDAuNSk7XG59XG4ud2V1aS1jZWxsczphZnRlciB7XG4gIGNvbnRlbnQ6IFwiIFwiO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDA7XG4gIGJvdHRvbTogMDtcbiAgcmlnaHQ6IDA7XG4gIGhlaWdodDogMXB4O1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI0Q5RDlEOTtcbiAgY29sb3I6ICNEOUQ5RDk7XG4gIHRyYW5zZm9ybS1vcmlnaW46IDAgMTAwJTtcbiAgdHJhbnNmb3JtOiBzY2FsZVkoMC41KTtcbn1cbi53ZXVpLWNlbGxzX190aXRsZSB7XG4gIG1hcmdpbi10b3A6IC43N2VtO1xuICBtYXJnaW4tYm90dG9tOiAuM2VtO1xuICBwYWRkaW5nLWxlZnQ6IDE1cHg7XG4gIHBhZGRpbmctcmlnaHQ6IDE1cHg7XG4gIGNvbG9yOiAjOTk5OTk5O1xuICBmb250LXNpemU6IDE0cHg7XG59XG4ud2V1aS1jZWxsc19fdGl0bGUgKyAud2V1aS1jZWxscyB7XG4gIG1hcmdpbi10b3A6IDA7XG59XG4ud2V1aS1jZWxsc19fdGlwcyB7XG4gIG1hcmdpbi10b3A6IC4zZW07XG4gIGNvbG9yOiAjOTk5OTk5O1xuICBwYWRkaW5nLWxlZnQ6IDE1cHg7XG4gIHBhZGRpbmctcmlnaHQ6IDE1cHg7XG4gIGZvbnQtc2l6ZTogMTRweDtcbn1cbi53ZXVpLWNlbGwge1xuICBwYWRkaW5nOiAxMHB4IDE1cHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cbi53ZXVpLWNlbGw6YmVmb3JlIHtcbiAgY29udGVudDogXCIgXCI7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogMDtcbiAgdG9wOiAwO1xuICByaWdodDogMDtcbiAgaGVpZ2h0OiAxcHg7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjRDlEOUQ5O1xuICBjb2xvcjogI0Q5RDlEOTtcbiAgdHJhbnNmb3JtLW9yaWdpbjogMCAwO1xuICB0cmFuc2Zvcm06IHNjYWxlWSgwLjUpO1xuICBsZWZ0OiAxNXB4O1xufVxuLndldWktY2VsbDpmaXJzdC1jaGlsZDpiZWZvcmUge1xuICBkaXNwbGF5OiBub25lO1xufVxuLndldWktY2VsbF9wcmltYXJ5IHtcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG59XG4ud2V1aS1jZWxsX19iZCB7XG4gIGZsZXg6IDE7XG59XG4ud2V1aS1jZWxsX19mdCB7XG4gIHRleHQtYWxpZ246IHJpZ2h0O1xuICBjb2xvcjogIzk5OTk5OTtcbn1cbi53ZXVpLWNlbGxfYWNjZXNzIHtcbiAgLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOiByZ2JhKDAsIDAsIDAsIDApO1xuICBjb2xvcjogaW5oZXJpdDtcbn1cbi53ZXVpLWNlbGxfYWNjZXNzOmFjdGl2ZSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNFQ0VDRUM7XG59XG4ud2V1aS1jZWxsX2FjY2VzcyAud2V1aS1jZWxsX19mdCB7XG4gIHBhZGRpbmctcmlnaHQ6IDEzcHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cbi53ZXVpLWNlbGxfYWNjZXNzIC53ZXVpLWNlbGxfX2Z0OmFmdGVyIHtcbiAgY29udGVudDogXCIgXCI7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgaGVpZ2h0OiA2cHg7XG4gIHdpZHRoOiA2cHg7XG4gIGJvcmRlci13aWR0aDogMnB4IDJweCAwIDA7XG4gIGJvcmRlci1jb2xvcjogI0M4QzhDRDtcbiAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcbiAgdHJhbnNmb3JtOiBtYXRyaXgoMC43MSwgMC43MSwgLTAuNzEsIDAuNzEsIDAsIDApO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHRvcDogLTJweDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDUwJTtcbiAgbWFyZ2luLXRvcDogLTRweDtcbiAgcmlnaHQ6IDJweDtcbn1cbi53ZXVpLWNlbGxfbGluayB7XG4gIGNvbG9yOiAjNTg2Qzk0O1xuICBmb250LXNpemU6IDE0cHg7XG59XG4ud2V1aS1jZWxsX2xpbms6Zmlyc3QtY2hpbGQ6YmVmb3JlIHtcbiAgZGlzcGxheTogYmxvY2s7XG59XG4ud2V1aS1jaGVja19fbGFiZWwge1xuICAtd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMCk7XG59XG4ud2V1aS1jaGVja19fbGFiZWw6YWN0aXZlIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI0VDRUNFQztcbn1cbi53ZXVpLWNoZWNrIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiAtOTk5OWVtO1xufVxuLndldWktY2VsbHNfcmFkaW8gLndldWktY2VsbF9fZnQge1xuICBwYWRkaW5nLWxlZnQ6IDAuMzVlbTtcbn1cbi53ZXVpLWNlbGxzX3JhZGlvIC53ZXVpLWNoZWNrOmNoZWNrZWQgKyAud2V1aS1pY29uLWNoZWNrZWQ6YmVmb3JlIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIGNvbnRlbnQ6ICdcXEVBMDgnO1xuICBjb2xvcjogIzA5QkIwNztcbiAgZm9udC1zaXplOiAxNnB4O1xufVxuLndldWktY2VsbHNfY2hlY2tib3ggLndldWktY2VsbF9faGQge1xuICBwYWRkaW5nLXJpZ2h0OiAwLjM1ZW07XG59XG4ud2V1aS1jZWxsc19jaGVja2JveCAud2V1aS1pY29uLWNoZWNrZWQ6YmVmb3JlIHtcbiAgY29udGVudDogJ1xcRUEwMSc7XG4gIGNvbG9yOiAjQzlDOUM5O1xuICBmb250LXNpemU6IDIzcHg7XG4gIGRpc3BsYXk6IGJsb2NrO1xufVxuLndldWktY2VsbHNfY2hlY2tib3ggLndldWktY2hlY2s6Y2hlY2tlZCArIC53ZXVpLWljb24tY2hlY2tlZDpiZWZvcmUge1xuICBjb250ZW50OiAnXFxFQTA2JztcbiAgY29sb3I6ICMwOUJCMDc7XG59XG4ud2V1aS1sYWJlbCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICB3aWR0aDogMTA1cHg7XG4gIHdvcmQtd3JhcDogYnJlYWstd29yZDtcbiAgd29yZC1icmVhazogYnJlYWstYWxsO1xufVxuLndldWktaW5wdXQge1xuICB3aWR0aDogMTAwJTtcbiAgYm9yZGVyOiAwO1xuICBvdXRsaW5lOiAwO1xuICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICBmb250LXNpemU6IGluaGVyaXQ7XG4gIGNvbG9yOiBpbmhlcml0O1xuICBoZWlnaHQ6IDEuNDExNzY0NzFlbTtcbiAgbGluZS1oZWlnaHQ6IDEuNDExNzY0NzE7XG59XG4ud2V1aS1pbnB1dDo6LXdlYmtpdC1vdXRlci1zcGluLWJ1dHRvbixcbi53ZXVpLWlucHV0Ojotd2Via2l0LWlubmVyLXNwaW4tYnV0dG9uIHtcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xuICBtYXJnaW46IDA7XG59XG4ud2V1aS10ZXh0YXJlYSB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBib3JkZXI6IDA7XG4gIHJlc2l6ZTogbm9uZTtcbiAgd2lkdGg6IDEwMCU7XG4gIGNvbG9yOiBpbmhlcml0O1xuICBmb250LXNpemU6IDFlbTtcbiAgbGluZS1oZWlnaHQ6IGluaGVyaXQ7XG4gIG91dGxpbmU6IDA7XG59XG4ud2V1aS10ZXh0YXJlYS1jb3VudGVyIHtcbiAgY29sb3I6ICNCMkIyQjI7XG4gIHRleHQtYWxpZ246IHJpZ2h0O1xufVxuLndldWktY2VsbF93YXJuIC53ZXVpLXRleHRhcmVhLWNvdW50ZXIge1xuICBjb2xvcjogI0U2NDM0MDtcbn1cbi53ZXVpLXRvcHRpcHMge1xuICBkaXNwbGF5OiBub25lO1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWigwKTtcbiAgdG9wOiAwO1xuICBsZWZ0OiAwO1xuICByaWdodDogMDtcbiAgcGFkZGluZzogNXB4O1xuICBmb250LXNpemU6IDE0cHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgY29sb3I6ICNGRkY7XG4gIHotaW5kZXg6IDUwMDA7XG4gIHdvcmQtd3JhcDogYnJlYWstd29yZDtcbiAgd29yZC1icmVhazogYnJlYWstYWxsO1xufVxuLndldWktdG9wdGlwc193YXJuIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI0U2NDM0MDtcbn1cbi53ZXVpLWNlbGxzX2Zvcm0gLndldWktY2VsbF9fZnQge1xuICBmb250LXNpemU6IDA7XG59XG4ud2V1aS1jZWxsc19mb3JtIC53ZXVpLWljb24td2FybiB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG4ud2V1aS1jZWxsc19mb3JtIGlucHV0LFxuLndldWktY2VsbHNfZm9ybSB0ZXh0YXJlYSxcbi53ZXVpLWNlbGxzX2Zvcm0gbGFiZWxbZm9yXSB7XG4gIC13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwKTtcbn1cbi53ZXVpLWNlbGxfd2FybiB7XG4gIGNvbG9yOiAjRTY0MzQwO1xufVxuLndldWktY2VsbF93YXJuIC53ZXVpLWljb24td2FybiB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbn1cbi53ZXVpLWZvcm0tcHJldmlldyB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI0ZGRkZGRjtcbn1cbi53ZXVpLWZvcm0tcHJldmlldzpiZWZvcmUge1xuICBjb250ZW50OiBcIiBcIjtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiAwO1xuICB0b3A6IDA7XG4gIHJpZ2h0OiAwO1xuICBoZWlnaHQ6IDFweDtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNEOUQ5RDk7XG4gIGNvbG9yOiAjRDlEOUQ5O1xuICB0cmFuc2Zvcm0tb3JpZ2luOiAwIDA7XG4gIHRyYW5zZm9ybTogc2NhbGVZKDAuNSk7XG59XG4ud2V1aS1mb3JtLXByZXZpZXc6YWZ0ZXIge1xuICBjb250ZW50OiBcIiBcIjtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiAwO1xuICBib3R0b206IDA7XG4gIHJpZ2h0OiAwO1xuICBoZWlnaHQ6IDFweDtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNEOUQ5RDk7XG4gIGNvbG9yOiAjRDlEOUQ5O1xuICB0cmFuc2Zvcm0tb3JpZ2luOiAwIDEwMCU7XG4gIHRyYW5zZm9ybTogc2NhbGVZKDAuNSk7XG59XG4ud2V1aS1mb3JtLXByZXZpZXdfX2hkIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBwYWRkaW5nOiAxMHB4IDE1cHg7XG4gIHRleHQtYWxpZ246IHJpZ2h0O1xuICBsaW5lLWhlaWdodDogMi41ZW07XG59XG4ud2V1aS1mb3JtLXByZXZpZXdfX2hkOmFmdGVyIHtcbiAgY29udGVudDogXCIgXCI7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogMDtcbiAgYm90dG9tOiAwO1xuICByaWdodDogMDtcbiAgaGVpZ2h0OiAxcHg7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjRDlEOUQ5O1xuICBjb2xvcjogI0Q5RDlEOTtcbiAgdHJhbnNmb3JtLW9yaWdpbjogMCAxMDAlO1xuICB0cmFuc2Zvcm06IHNjYWxlWSgwLjUpO1xuICBsZWZ0OiAxNXB4O1xufVxuLndldWktZm9ybS1wcmV2aWV3X19oZCAud2V1aS1mb3JtLXByZXZpZXdfX3ZhbHVlIHtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBmb250LXNpemU6IDEuNmVtO1xufVxuLndldWktZm9ybS1wcmV2aWV3X19iZCB7XG4gIHBhZGRpbmc6IDEwcHggMTVweDtcbiAgZm9udC1zaXplOiAuOWVtO1xuICB0ZXh0LWFsaWduOiByaWdodDtcbiAgY29sb3I6ICM5OTk5OTk7XG4gIGxpbmUtaGVpZ2h0OiAyO1xufVxuLndldWktZm9ybS1wcmV2aWV3X19mdCB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgbGluZS1oZWlnaHQ6IDUwcHg7XG4gIGRpc3BsYXk6IGZsZXg7XG59XG4ud2V1aS1mb3JtLXByZXZpZXdfX2Z0OmFmdGVyIHtcbiAgY29udGVudDogXCIgXCI7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogMDtcbiAgdG9wOiAwO1xuICByaWdodDogMDtcbiAgaGVpZ2h0OiAxcHg7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjRDVENUQ2O1xuICBjb2xvcjogI0Q1RDVENjtcbiAgdHJhbnNmb3JtLW9yaWdpbjogMCAwO1xuICB0cmFuc2Zvcm06IHNjYWxlWSgwLjUpO1xufVxuLndldWktZm9ybS1wcmV2aWV3X19pdGVtIHtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cbi53ZXVpLWZvcm0tcHJldmlld19fbGFiZWwge1xuICBmbG9hdDogbGVmdDtcbiAgbWFyZ2luLXJpZ2h0OiAxZW07XG4gIG1pbi13aWR0aDogNGVtO1xuICBjb2xvcjogIzk5OTk5OTtcbiAgdGV4dC1hbGlnbjoganVzdGlmeTtcbiAgdGV4dC1hbGlnbi1sYXN0OiBqdXN0aWZ5O1xufVxuLndldWktZm9ybS1wcmV2aWV3X192YWx1ZSB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB3b3JkLWJyZWFrOiBub3JtYWw7XG4gIHdvcmQtd3JhcDogYnJlYWstd29yZDtcbn1cbi53ZXVpLWZvcm0tcHJldmlld19fYnRuIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBkaXNwbGF5OiBibG9jaztcbiAgZmxleDogMTtcbiAgY29sb3I6ICMzQ0M1MUY7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOiByZ2JhKDAsIDAsIDAsIDApO1xufVxuYnV0dG9uLndldWktZm9ybS1wcmV2aWV3X19idG4ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgYm9yZGVyOiAwO1xuICBvdXRsaW5lOiAwO1xuICBsaW5lLWhlaWdodDogaW5oZXJpdDtcbiAgZm9udC1zaXplOiBpbmhlcml0O1xufVxuLndldWktZm9ybS1wcmV2aWV3X19idG46YWN0aXZlIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI0VFRUVFRTtcbn1cbi53ZXVpLWZvcm0tcHJldmlld19fYnRuOmFmdGVyIHtcbiAgY29udGVudDogXCIgXCI7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogMDtcbiAgdG9wOiAwO1xuICB3aWR0aDogMXB4O1xuICBib3R0b206IDA7XG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgI0Q1RDVENjtcbiAgY29sb3I6ICNENUQ1RDY7XG4gIHRyYW5zZm9ybS1vcmlnaW46IDAgMDtcbiAgdHJhbnNmb3JtOiBzY2FsZVgoMC41KTtcbn1cbi53ZXVpLWZvcm0tcHJldmlld19fYnRuOmZpcnN0LWNoaWxkOmFmdGVyIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cbi53ZXVpLWZvcm0tcHJldmlld19fYnRuX2RlZmF1bHQge1xuICBjb2xvcjogIzk5OTk5OTtcbn1cbi53ZXVpLWZvcm0tcHJldmlld19fYnRuX3ByaW1hcnkge1xuICBjb2xvcjogIzBCQjIwQztcbn1cbi53ZXVpLWNlbGxfc2VsZWN0IHtcbiAgcGFkZGluZzogMDtcbn1cbi53ZXVpLWNlbGxfc2VsZWN0IC53ZXVpLXNlbGVjdCB7XG4gIHBhZGRpbmctcmlnaHQ6IDMwcHg7XG59XG4ud2V1aS1jZWxsX3NlbGVjdCAud2V1aS1jZWxsX19iZDphZnRlciB7XG4gIGNvbnRlbnQ6IFwiIFwiO1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIGhlaWdodDogNnB4O1xuICB3aWR0aDogNnB4O1xuICBib3JkZXItd2lkdGg6IDJweCAycHggMCAwO1xuICBib3JkZXItY29sb3I6ICNDOEM4Q0Q7XG4gIGJvcmRlci1zdHlsZTogc29saWQ7XG4gIHRyYW5zZm9ybTogbWF0cml4KDAuNzEsIDAuNzEsIC0wLjcxLCAwLjcxLCAwLCAwKTtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB0b3A6IC0ycHg7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiA1MCU7XG4gIHJpZ2h0OiAxNXB4O1xuICBtYXJnaW4tdG9wOiAtNHB4O1xufVxuLndldWktc2VsZWN0IHtcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xuICBib3JkZXI6IDA7XG4gIG91dGxpbmU6IDA7XG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICB3aWR0aDogMTAwJTtcbiAgZm9udC1zaXplOiBpbmhlcml0O1xuICBoZWlnaHQ6IDQ0cHg7XG4gIGxpbmUtaGVpZ2h0OiA0NHB4O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHotaW5kZXg6IDE7XG4gIHBhZGRpbmctbGVmdDogMTVweDtcbn1cbi53ZXVpLWNlbGxfc2VsZWN0LWJlZm9yZSB7XG4gIHBhZGRpbmctcmlnaHQ6IDE1cHg7XG59XG4ud2V1aS1jZWxsX3NlbGVjdC1iZWZvcmUgLndldWktc2VsZWN0IHtcbiAgd2lkdGg6IDEwNXB4O1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xufVxuLndldWktY2VsbF9zZWxlY3QtYmVmb3JlIC53ZXVpLWNlbGxfX2hkIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuLndldWktY2VsbF9zZWxlY3QtYmVmb3JlIC53ZXVpLWNlbGxfX2hkOmFmdGVyIHtcbiAgY29udGVudDogXCIgXCI7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgcmlnaHQ6IDA7XG4gIHRvcDogMDtcbiAgd2lkdGg6IDFweDtcbiAgYm90dG9tOiAwO1xuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjRDlEOUQ5O1xuICBjb2xvcjogI0Q5RDlEOTtcbiAgdHJhbnNmb3JtLW9yaWdpbjogMTAwJSAwO1xuICB0cmFuc2Zvcm06IHNjYWxlWCgwLjUpO1xufVxuLndldWktY2VsbF9zZWxlY3QtYmVmb3JlIC53ZXVpLWNlbGxfX2hkOmJlZm9yZSB7XG4gIGNvbnRlbnQ6IFwiIFwiO1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIGhlaWdodDogNnB4O1xuICB3aWR0aDogNnB4O1xuICBib3JkZXItd2lkdGg6IDJweCAycHggMCAwO1xuICBib3JkZXItY29sb3I6ICNDOEM4Q0Q7XG4gIGJvcmRlci1zdHlsZTogc29saWQ7XG4gIHRyYW5zZm9ybTogbWF0cml4KDAuNzEsIDAuNzEsIC0wLjcxLCAwLjcxLCAwLCAwKTtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB0b3A6IC0ycHg7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiA1MCU7XG4gIHJpZ2h0OiAxNXB4O1xuICBtYXJnaW4tdG9wOiAtNHB4O1xufVxuLndldWktY2VsbF9zZWxlY3QtYmVmb3JlIC53ZXVpLWNlbGxfX2JkIHtcbiAgcGFkZGluZy1sZWZ0OiAxNXB4O1xufVxuLndldWktY2VsbF9zZWxlY3QtYmVmb3JlIC53ZXVpLWNlbGxfX2JkOmFmdGVyIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cbi53ZXVpLWNlbGxfc2VsZWN0LWFmdGVyIHtcbiAgcGFkZGluZy1sZWZ0OiAxNXB4O1xufVxuLndldWktY2VsbF9zZWxlY3QtYWZ0ZXIgLndldWktc2VsZWN0IHtcbiAgcGFkZGluZy1sZWZ0OiAwO1xufVxuLndldWktY2VsbF92Y29kZSB7XG4gIHBhZGRpbmctdG9wOiAwO1xuICBwYWRkaW5nLXJpZ2h0OiAwO1xuICBwYWRkaW5nLWJvdHRvbTogMDtcbn1cbi53ZXVpLXZjb2RlLWltZyB7XG4gIG1hcmdpbi1sZWZ0OiA1cHg7XG4gIGhlaWdodDogNDRweDtcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbn1cbi53ZXVpLXZjb2RlLWJ0biB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgaGVpZ2h0OiA0NHB4O1xuICBtYXJnaW4tbGVmdDogNXB4O1xuICBwYWRkaW5nOiAwIDAuNmVtIDAgMC43ZW07XG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgI0U1RTVFNTtcbiAgbGluZS1oZWlnaHQ6IDQ0cHg7XG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gIGZvbnQtc2l6ZTogMTdweDtcbiAgY29sb3I6ICMzQ0M1MUY7XG59XG5idXR0b24ud2V1aS12Y29kZS1idG4ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgYm9yZGVyLXRvcDogMDtcbiAgYm9yZGVyLXJpZ2h0OiAwO1xuICBib3JkZXItYm90dG9tOiAwO1xuICBvdXRsaW5lOiAwO1xufVxuLndldWktdmNvZGUtYnRuOmFjdGl2ZSB7XG4gIGNvbG9yOiAjNTJhMzQxO1xufVxuLndldWktZ2FsbGVyeSB7XG4gIGRpc3BsYXk6IG5vbmU7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgdG9wOiAwO1xuICByaWdodDogMDtcbiAgYm90dG9tOiAwO1xuICBsZWZ0OiAwO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwMDAwO1xuICB6LWluZGV4OiAxMDAwO1xufVxuLndldWktZ2FsbGVyeV9faW1nIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIHJpZ2h0OiAwO1xuICBib3R0b206IDYwcHg7XG4gIGxlZnQ6IDA7XG4gIGJhY2tncm91bmQ6IGNlbnRlciBjZW50ZXIgbm8tcmVwZWF0O1xuICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XG59XG4ud2V1aS1nYWxsZXJ5X19vcHIge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHJpZ2h0OiAwO1xuICBib3R0b206IDA7XG4gIGxlZnQ6IDA7XG4gIGJhY2tncm91bmQtY29sb3I6ICMwRDBEMEQ7XG4gIGNvbG9yOiAjRkZGRkZGO1xuICBsaW5lLWhlaWdodDogNjBweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuLndldWktZ2FsbGVyeV9fZGVsIHtcbiAgZGlzcGxheTogYmxvY2s7XG59XG4ud2V1aS1jZWxsX3N3aXRjaCB7XG4gIHBhZGRpbmctdG9wOiA2cHg7XG4gIHBhZGRpbmctYm90dG9tOiA2cHg7XG59XG4ud2V1aS1zd2l0Y2gge1xuICBhcHBlYXJhbmNlOiBub25lO1xufVxuLndldWktc3dpdGNoLFxuLndldWktc3dpdGNoLWNwX19ib3gge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHdpZHRoOiA1MnB4O1xuICBoZWlnaHQ6IDMycHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNERkRGREY7XG4gIG91dGxpbmU6IDA7XG4gIGJvcmRlci1yYWRpdXM6IDE2cHg7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIGJhY2tncm91bmQtY29sb3I6ICNERkRGREY7XG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMC4xcywgYm9yZGVyIDAuMXM7XG59XG4ud2V1aS1zd2l0Y2g6YmVmb3JlLFxuLndldWktc3dpdGNoLWNwX19ib3g6YmVmb3JlIHtcbiAgY29udGVudDogXCIgXCI7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwO1xuICBsZWZ0OiAwO1xuICB3aWR0aDogNTBweDtcbiAgaGVpZ2h0OiAzMHB4O1xuICBib3JkZXItcmFkaXVzOiAxNXB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkRGREZEO1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zNXMgY3ViaWMtYmV6aWVyKDAuNDUsIDEsIDAuNCwgMSk7XG59XG4ud2V1aS1zd2l0Y2g6YWZ0ZXIsXG4ud2V1aS1zd2l0Y2gtY3BfX2JveDphZnRlciB7XG4gIGNvbnRlbnQ6IFwiIFwiO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMDtcbiAgbGVmdDogMDtcbiAgd2lkdGg6IDMwcHg7XG4gIGhlaWdodDogMzBweDtcbiAgYm9yZGVyLXJhZGl1czogMTVweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI0ZGRkZGRjtcbiAgYm94LXNoYWRvdzogMCAxcHggM3B4IHJnYmEoMCwgMCwgMCwgMC40KTtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuMzVzIGN1YmljLWJlemllcigwLjQsIDAuNCwgMC4yNSwgMS4zNSk7XG59XG4ud2V1aS1zd2l0Y2g6Y2hlY2tlZCxcbi53ZXVpLXN3aXRjaC1jcF9faW5wdXQ6Y2hlY2tlZCB+IC53ZXVpLXN3aXRjaC1jcF9fYm94IHtcbiAgYm9yZGVyLWNvbG9yOiAjMDRCRTAyO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDRCRTAyO1xufVxuLndldWktc3dpdGNoOmNoZWNrZWQ6YmVmb3JlLFxuLndldWktc3dpdGNoLWNwX19pbnB1dDpjaGVja2VkIH4gLndldWktc3dpdGNoLWNwX19ib3g6YmVmb3JlIHtcbiAgdHJhbnNmb3JtOiBzY2FsZSgwKTtcbn1cbi53ZXVpLXN3aXRjaDpjaGVja2VkOmFmdGVyLFxuLndldWktc3dpdGNoLWNwX19pbnB1dDpjaGVja2VkIH4gLndldWktc3dpdGNoLWNwX19ib3g6YWZ0ZXIge1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMjBweCk7XG59XG4ud2V1aS1zd2l0Y2gtY3BfX2lucHV0IHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiAtOTk5OXB4O1xufVxuLndldWktc3dpdGNoLWNwX19ib3gge1xuICBkaXNwbGF5OiBibG9jaztcbn1cbi53ZXVpLXVwbG9hZGVyX19oZCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIHBhZGRpbmctYm90dG9tOiAxMHB4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuLndldWktdXBsb2FkZXJfX3RpdGxlIHtcbiAgZmxleDogMTtcbn1cbi53ZXVpLXVwbG9hZGVyX19pbmZvIHtcbiAgY29sb3I6ICNCMkIyQjI7XG59XG4ud2V1aS11cGxvYWRlcl9fYmQge1xuICBtYXJnaW4tYm90dG9tOiAtNHB4O1xuICBtYXJnaW4tcmlnaHQ6IC05cHg7XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG4ud2V1aS11cGxvYWRlcl9fZmlsZXMge1xuICBsaXN0LXN0eWxlOiBub25lO1xufVxuLndldWktdXBsb2FkZXJfX2ZpbGUge1xuICBmbG9hdDogbGVmdDtcbiAgbWFyZ2luLXJpZ2h0OiA5cHg7XG4gIG1hcmdpbi1ib3R0b206IDlweDtcbiAgd2lkdGg6IDc5cHg7XG4gIGhlaWdodDogNzlweDtcbiAgYmFja2dyb3VuZDogbm8tcmVwZWF0IGNlbnRlciBjZW50ZXI7XG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XG59XG4ud2V1aS11cGxvYWRlcl9fZmlsZV9zdGF0dXMge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG4ud2V1aS11cGxvYWRlcl9fZmlsZV9zdGF0dXM6YmVmb3JlIHtcbiAgY29udGVudDogXCIgXCI7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwO1xuICByaWdodDogMDtcbiAgYm90dG9tOiAwO1xuICBsZWZ0OiAwO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNSk7XG59XG4ud2V1aS11cGxvYWRlcl9fZmlsZV9zdGF0dXMgLndldWktdXBsb2FkZXJfX2ZpbGUtY29udGVudCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xufVxuLndldWktdXBsb2FkZXJfX2ZpbGUtY29udGVudCB7XG4gIGRpc3BsYXk6IG5vbmU7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiA1MCU7XG4gIGxlZnQ6IDUwJTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XG4gIGNvbG9yOiAjRkZGRkZGO1xufVxuLndldWktdXBsb2FkZXJfX2ZpbGUtY29udGVudCAud2V1aS1pY29uLXdhcm4ge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG59XG4ud2V1aS11cGxvYWRlcl9faW5wdXQtYm94IHtcbiAgZmxvYXQ6IGxlZnQ7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgbWFyZ2luLXJpZ2h0OiA5cHg7XG4gIG1hcmdpbi1ib3R0b206IDlweDtcbiAgd2lkdGg6IDc3cHg7XG4gIGhlaWdodDogNzdweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI0Q5RDlEOTtcbn1cbi53ZXVpLXVwbG9hZGVyX19pbnB1dC1ib3g6YmVmb3JlLFxuLndldWktdXBsb2FkZXJfX2lucHV0LWJveDphZnRlciB7XG4gIGNvbnRlbnQ6IFwiIFwiO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogNTAlO1xuICBsZWZ0OiA1MCU7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRDlEOUQ5O1xufVxuLndldWktdXBsb2FkZXJfX2lucHV0LWJveDpiZWZvcmUge1xuICB3aWR0aDogMnB4O1xuICBoZWlnaHQ6IDM5LjVweDtcbn1cbi53ZXVpLXVwbG9hZGVyX19pbnB1dC1ib3g6YWZ0ZXIge1xuICB3aWR0aDogMzkuNXB4O1xuICBoZWlnaHQ6IDJweDtcbn1cbi53ZXVpLXVwbG9hZGVyX19pbnB1dC1ib3g6YWN0aXZlIHtcbiAgYm9yZGVyLWNvbG9yOiAjOTk5OTk5O1xufVxuLndldWktdXBsb2FkZXJfX2lucHV0LWJveDphY3RpdmU6YmVmb3JlLFxuLndldWktdXBsb2FkZXJfX2lucHV0LWJveDphY3RpdmU6YWZ0ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjOTk5OTk5O1xufVxuLndldWktdXBsb2FkZXJfX2lucHV0IHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB6LWluZGV4OiAxO1xuICB0b3A6IDA7XG4gIGxlZnQ6IDA7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIG9wYWNpdHk6IDA7XG4gIC13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwKTtcbn1cbi53ZXVpLW1zZyB7XG4gIHBhZGRpbmctdG9wOiAzNnB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG4ud2V1aS1tc2dfX2ljb24tYXJlYSB7XG4gIG1hcmdpbi1ib3R0b206IDMwcHg7XG59XG4ud2V1aS1tc2dfX3RleHQtYXJlYSB7XG4gIG1hcmdpbi1ib3R0b206IDI1cHg7XG4gIHBhZGRpbmc6IDAgMjBweDtcbn1cbi53ZXVpLW1zZ19fdGV4dC1hcmVhIGEge1xuICBjb2xvcjogIzU4NkM5NDtcbn1cbi53ZXVpLW1zZ19fdGl0bGUge1xuICBtYXJnaW4tYm90dG9tOiA1cHg7XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG4gIGZvbnQtc2l6ZTogMjBweDtcbn1cbi53ZXVpLW1zZ19fZGVzYyB7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgY29sb3I6ICM5OTk5OTk7XG59XG4ud2V1aS1tc2dfX29wci1hcmVhIHtcbiAgbWFyZ2luLWJvdHRvbTogMjVweDtcbn1cbi53ZXVpLW1zZ19fZXh0cmEtYXJlYSB7XG4gIG1hcmdpbi1ib3R0b206IDE1cHg7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgY29sb3I6ICM5OTk5OTk7XG59XG4ud2V1aS1tc2dfX2V4dHJhLWFyZWEgYSB7XG4gIGNvbG9yOiAjNTg2Qzk0O1xufVxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi1oZWlnaHQ6IDQzOHB4KSB7XG4gIC53ZXVpLW1zZ19fZXh0cmEtYXJlYSB7XG4gICAgcG9zaXRpb246IGZpeGVkO1xuICAgIGxlZnQ6IDA7XG4gICAgYm90dG9tOiAwO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgfVxufVxuLndldWktYXJ0aWNsZSB7XG4gIHBhZGRpbmc6IDIwcHggMTVweDtcbiAgZm9udC1zaXplOiAxNXB4O1xufVxuLndldWktYXJ0aWNsZSBzZWN0aW9uIHtcbiAgbWFyZ2luLWJvdHRvbTogMS41ZW07XG59XG4ud2V1aS1hcnRpY2xlIGgxIHtcbiAgZm9udC1zaXplOiAxOHB4O1xuICBmb250LXdlaWdodDogNDAwO1xuICBtYXJnaW4tYm90dG9tOiAuOWVtO1xufVxuLndldWktYXJ0aWNsZSBoMiB7XG4gIGZvbnQtc2l6ZTogMTZweDtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgbWFyZ2luLWJvdHRvbTogLjM0ZW07XG59XG4ud2V1aS1hcnRpY2xlIGgzIHtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgZm9udC1zaXplOiAxNXB4O1xuICBtYXJnaW4tYm90dG9tOiAuMzRlbTtcbn1cbi53ZXVpLWFydGljbGUgKiB7XG4gIG1heC13aWR0aDogMTAwJTtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgd29yZC13cmFwOiBicmVhay13b3JkO1xufVxuLndldWktYXJ0aWNsZSBwIHtcbiAgbWFyZ2luOiAwIDAgLjhlbTtcbn1cbi53ZXVpLXRhYmJhciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgei1pbmRleDogNTAwO1xuICBib3R0b206IDA7XG4gIHdpZHRoOiAxMDAlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRjdGN0ZBO1xufVxuLndldWktdGFiYmFyOmJlZm9yZSB7XG4gIGNvbnRlbnQ6IFwiIFwiO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDA7XG4gIHRvcDogMDtcbiAgcmlnaHQ6IDA7XG4gIGhlaWdodDogMXB4O1xuICBib3JkZXItdG9wOiAxcHggc29saWQgI0MwQkZDNDtcbiAgY29sb3I6ICNDMEJGQzQ7XG4gIHRyYW5zZm9ybS1vcmlnaW46IDAgMDtcbiAgdHJhbnNmb3JtOiBzY2FsZVkoMC41KTtcbn1cbi53ZXVpLXRhYmJhcl9faXRlbSB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBmbGV4OiAxO1xuICBwYWRkaW5nOiA1cHggMCAwO1xuICBmb250LXNpemU6IDA7XG4gIGNvbG9yOiAjOTk5OTk5O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIC13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwKTtcbn1cbi53ZXVpLXRhYmJhcl9faXRlbS53ZXVpLWJhcl9faXRlbV9vbiAud2V1aS10YWJiYXJfX2ljb24sXG4ud2V1aS10YWJiYXJfX2l0ZW0ud2V1aS1iYXJfX2l0ZW1fb24gLndldWktdGFiYmFyX19pY29uID4gaSxcbi53ZXVpLXRhYmJhcl9faXRlbS53ZXVpLWJhcl9faXRlbV9vbiAud2V1aS10YWJiYXJfX2xhYmVsIHtcbiAgY29sb3I6ICMwOUJCMDc7XG59XG4ud2V1aS10YWJiYXJfX2ljb24ge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIHdpZHRoOiAyN3B4O1xuICBoZWlnaHQ6IDI3cHg7XG59XG5pLndldWktdGFiYmFyX19pY29uLFxuLndldWktdGFiYmFyX19pY29uID4gaSB7XG4gIGZvbnQtc2l6ZTogMjRweDtcbiAgY29sb3I6ICM5OTk5OTk7XG59XG4ud2V1aS10YWJiYXJfX2ljb24gaW1nIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbn1cbi53ZXVpLXRhYmJhcl9fbGFiZWwge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGNvbG9yOiAjOTk5OTk5O1xuICBmb250LXNpemU6IDEwcHg7XG4gIGxpbmUtaGVpZ2h0OiAxLjg7XG59XG4ud2V1aS1uYXZiYXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHotaW5kZXg6IDUwMDtcbiAgdG9wOiAwO1xuICB3aWR0aDogMTAwJTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI0ZBRkFGQTtcbn1cbi53ZXVpLW5hdmJhcjphZnRlciB7XG4gIGNvbnRlbnQ6IFwiIFwiO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDA7XG4gIGJvdHRvbTogMDtcbiAgcmlnaHQ6IDA7XG4gIGhlaWdodDogMXB4O1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI0NDQ0NDQztcbiAgY29sb3I6ICNDQ0NDQ0M7XG4gIHRyYW5zZm9ybS1vcmlnaW46IDAgMTAwJTtcbiAgdHJhbnNmb3JtOiBzY2FsZVkoMC41KTtcbn1cbi53ZXVpLW5hdmJhciArIC53ZXVpLXRhYl9fcGFuZWwge1xuICBwYWRkaW5nLXRvcDogNTBweDtcbiAgcGFkZGluZy1ib3R0b206IDA7XG59XG4ud2V1aS1uYXZiYXJfX2l0ZW0ge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBmbGV4OiAxO1xuICBwYWRkaW5nOiAxM3B4IDA7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgZm9udC1zaXplOiAxNXB4O1xuICAtd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMCk7XG59XG4ud2V1aS1uYXZiYXJfX2l0ZW06YWN0aXZlIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI0VERURFRDtcbn1cbi53ZXVpLW5hdmJhcl9faXRlbS53ZXVpLWJhcl9faXRlbV9vbiB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNFQUVBRUE7XG59XG4ud2V1aS1uYXZiYXJfX2l0ZW06YWZ0ZXIge1xuICBjb250ZW50OiBcIiBcIjtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICByaWdodDogMDtcbiAgdG9wOiAwO1xuICB3aWR0aDogMXB4O1xuICBib3R0b206IDA7XG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNDQ0NDQ0M7XG4gIGNvbG9yOiAjQ0NDQ0NDO1xuICB0cmFuc2Zvcm0tb3JpZ2luOiAxMDAlIDA7XG4gIHRyYW5zZm9ybTogc2NhbGVYKDAuNSk7XG59XG4ud2V1aS1uYXZiYXJfX2l0ZW06bGFzdC1jaGlsZDphZnRlciB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG4ud2V1aS10YWIge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGhlaWdodDogMTAwJTtcbn1cbi53ZXVpLXRhYl9fcGFuZWwge1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBoZWlnaHQ6IDEwMCU7XG4gIHBhZGRpbmctYm90dG9tOiA1MHB4O1xuICBvdmVyZmxvdzogYXV0bztcbiAgLXdlYmtpdC1vdmVyZmxvdy1zY3JvbGxpbmc6IHRvdWNoO1xufVxuLndldWktdGFiX19jb250ZW50IHtcbiAgZGlzcGxheTogbm9uZTtcbn1cbi53ZXVpLXByb2dyZXNzIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cbi53ZXVpLXByb2dyZXNzX19iYXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRUJFQkVCO1xuICBoZWlnaHQ6IDNweDtcbiAgZmxleDogMTtcbn1cbi53ZXVpLXByb2dyZXNzX19pbm5lci1iYXIge1xuICB3aWR0aDogMDtcbiAgaGVpZ2h0OiAxMDAlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDlCQjA3O1xufVxuLndldWktcHJvZ3Jlc3NfX29wciB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBtYXJnaW4tbGVmdDogMTVweDtcbiAgZm9udC1zaXplOiAwO1xufVxuLndldWktcGFuZWwge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZGRkZGO1xuICBtYXJnaW4tdG9wOiAxMHB4O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG4ud2V1aS1wYW5lbDpmaXJzdC1jaGlsZCB7XG4gIG1hcmdpbi10b3A6IDA7XG59XG4ud2V1aS1wYW5lbDpiZWZvcmUge1xuICBjb250ZW50OiBcIiBcIjtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiAwO1xuICB0b3A6IDA7XG4gIHJpZ2h0OiAwO1xuICBoZWlnaHQ6IDFweDtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNFNUU1RTU7XG4gIGNvbG9yOiAjRTVFNUU1O1xuICB0cmFuc2Zvcm0tb3JpZ2luOiAwIDA7XG4gIHRyYW5zZm9ybTogc2NhbGVZKDAuNSk7XG59XG4ud2V1aS1wYW5lbDphZnRlciB7XG4gIGNvbnRlbnQ6IFwiIFwiO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDA7XG4gIGJvdHRvbTogMDtcbiAgcmlnaHQ6IDA7XG4gIGhlaWdodDogMXB4O1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI0U1RTVFNTtcbiAgY29sb3I6ICNFNUU1RTU7XG4gIHRyYW5zZm9ybS1vcmlnaW46IDAgMTAwJTtcbiAgdHJhbnNmb3JtOiBzY2FsZVkoMC41KTtcbn1cbi53ZXVpLXBhbmVsX19oZCB7XG4gIHBhZGRpbmc6IDE0cHggMTVweCAxMHB4O1xuICBjb2xvcjogIzk5OTk5OTtcbiAgZm9udC1zaXplOiAxM3B4O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG4ud2V1aS1wYW5lbF9faGQ6YWZ0ZXIge1xuICBjb250ZW50OiBcIiBcIjtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiAwO1xuICBib3R0b206IDA7XG4gIHJpZ2h0OiAwO1xuICBoZWlnaHQ6IDFweDtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNFNUU1RTU7XG4gIGNvbG9yOiAjRTVFNUU1O1xuICB0cmFuc2Zvcm0tb3JpZ2luOiAwIDEwMCU7XG4gIHRyYW5zZm9ybTogc2NhbGVZKDAuNSk7XG4gIGxlZnQ6IDE1cHg7XG59XG4ud2V1aS1tZWRpYS1ib3gge1xuICBwYWRkaW5nOiAxNXB4O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG4ud2V1aS1tZWRpYS1ib3g6YmVmb3JlIHtcbiAgY29udGVudDogXCIgXCI7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogMDtcbiAgdG9wOiAwO1xuICByaWdodDogMDtcbiAgaGVpZ2h0OiAxcHg7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjRTVFNUU1O1xuICBjb2xvcjogI0U1RTVFNTtcbiAgdHJhbnNmb3JtLW9yaWdpbjogMCAwO1xuICB0cmFuc2Zvcm06IHNjYWxlWSgwLjUpO1xuICBsZWZ0OiAxNXB4O1xufVxuLndldWktbWVkaWEtYm94OmZpcnN0LWNoaWxkOmJlZm9yZSB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG5hLndldWktbWVkaWEtYm94IHtcbiAgY29sb3I6ICMwMDAwMDA7XG4gIC13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwKTtcbn1cbmEud2V1aS1tZWRpYS1ib3g6YWN0aXZlIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI0VDRUNFQztcbn1cbi53ZXVpLW1lZGlhLWJveF9fdGl0bGUge1xuICBmb250LXdlaWdodDogNDAwO1xuICBmb250LXNpemU6IDE3cHg7XG4gIHdpZHRoOiBhdXRvO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgd29yZC13cmFwOiBub3JtYWw7XG4gIHdvcmQtd3JhcDogYnJlYWstd29yZDtcbiAgd29yZC1icmVhazogYnJlYWstYWxsO1xufVxuLndldWktbWVkaWEtYm94X19kZXNjIHtcbiAgY29sb3I6ICM5OTk5OTk7XG4gIGZvbnQtc2l6ZTogMTNweDtcbiAgbGluZS1oZWlnaHQ6IDEuMjtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gIGRpc3BsYXk6IC13ZWJraXQtYm94O1xuICAtd2Via2l0LWJveC1vcmllbnQ6IHZlcnRpY2FsO1xuICAtd2Via2l0LWxpbmUtY2xhbXA6IDI7XG59XG4ud2V1aS1tZWRpYS1ib3hfX2luZm8ge1xuICBtYXJnaW4tdG9wOiAxNXB4O1xuICBwYWRkaW5nLWJvdHRvbTogNXB4O1xuICBmb250LXNpemU6IDEzcHg7XG4gIGNvbG9yOiAjQ0VDRUNFO1xuICBsaW5lLWhlaWdodDogMWVtO1xuICBsaXN0LXN0eWxlOiBub25lO1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuLndldWktbWVkaWEtYm94X19pbmZvX19tZXRhIHtcbiAgZmxvYXQ6IGxlZnQ7XG4gIHBhZGRpbmctcmlnaHQ6IDFlbTtcbn1cbi53ZXVpLW1lZGlhLWJveF9faW5mb19fbWV0YV9leHRyYSB7XG4gIHBhZGRpbmctbGVmdDogMWVtO1xuICBib3JkZXItbGVmdDogMXB4IHNvbGlkICNDRUNFQ0U7XG59XG4ud2V1aS1tZWRpYS1ib3hfdGV4dCAud2V1aS1tZWRpYS1ib3hfX3RpdGxlIHtcbiAgbWFyZ2luLWJvdHRvbTogOHB4O1xufVxuLndldWktbWVkaWEtYm94X2FwcG1zZyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG4ud2V1aS1tZWRpYS1ib3hfYXBwbXNnIC53ZXVpLW1lZGlhLWJveF9faGQge1xuICBtYXJnaW4tcmlnaHQ6IC44ZW07XG4gIHdpZHRoOiA2MHB4O1xuICBoZWlnaHQ6IDYwcHg7XG4gIGxpbmUtaGVpZ2h0OiA2MHB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG4ud2V1aS1tZWRpYS1ib3hfYXBwbXNnIC53ZXVpLW1lZGlhLWJveF9fdGh1bWIge1xuICB3aWR0aDogMTAwJTtcbiAgbWF4LWhlaWdodDogMTAwJTtcbiAgdmVydGljYWwtYWxpZ246IHRvcDtcbn1cbi53ZXVpLW1lZGlhLWJveF9hcHBtc2cgLndldWktbWVkaWEtYm94X19iZCB7XG4gIGZsZXg6IDE7XG4gIG1pbi13aWR0aDogMDtcbn1cbi53ZXVpLW1lZGlhLWJveF9zbWFsbC1hcHBtc2cge1xuICBwYWRkaW5nOiAwO1xufVxuLndldWktbWVkaWEtYm94X3NtYWxsLWFwcG1zZyAud2V1aS1jZWxscyB7XG4gIG1hcmdpbi10b3A6IDA7XG59XG4ud2V1aS1tZWRpYS1ib3hfc21hbGwtYXBwbXNnIC53ZXVpLWNlbGxzOmJlZm9yZSB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG4ud2V1aS1ncmlkcyB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cbi53ZXVpLWdyaWRzOmJlZm9yZSB7XG4gIGNvbnRlbnQ6IFwiIFwiO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDA7XG4gIHRvcDogMDtcbiAgcmlnaHQ6IDA7XG4gIGhlaWdodDogMXB4O1xuICBib3JkZXItdG9wOiAxcHggc29saWQgI0Q5RDlEOTtcbiAgY29sb3I6ICNEOUQ5RDk7XG4gIHRyYW5zZm9ybS1vcmlnaW46IDAgMDtcbiAgdHJhbnNmb3JtOiBzY2FsZVkoMC41KTtcbn1cbi53ZXVpLWdyaWRzOmFmdGVyIHtcbiAgY29udGVudDogXCIgXCI7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogMDtcbiAgdG9wOiAwO1xuICB3aWR0aDogMXB4O1xuICBib3R0b206IDA7XG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgI0Q5RDlEOTtcbiAgY29sb3I6ICNEOUQ5RDk7XG4gIHRyYW5zZm9ybS1vcmlnaW46IDAgMDtcbiAgdHJhbnNmb3JtOiBzY2FsZVgoMC41KTtcbn1cbi53ZXVpLWdyaWQge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGZsb2F0OiBsZWZ0O1xuICBwYWRkaW5nOiAyMHB4IDEwcHg7XG4gIHdpZHRoOiAzMy4zMzMzMzMzMyU7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG59XG4ud2V1aS1ncmlkOmJlZm9yZSB7XG4gIGNvbnRlbnQ6IFwiIFwiO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHJpZ2h0OiAwO1xuICB0b3A6IDA7XG4gIHdpZHRoOiAxcHg7XG4gIGJvdHRvbTogMDtcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgI0Q5RDlEOTtcbiAgY29sb3I6ICNEOUQ5RDk7XG4gIHRyYW5zZm9ybS1vcmlnaW46IDEwMCUgMDtcbiAgdHJhbnNmb3JtOiBzY2FsZVgoMC41KTtcbn1cbi53ZXVpLWdyaWQ6YWZ0ZXIge1xuICBjb250ZW50OiBcIiBcIjtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiAwO1xuICBib3R0b206IDA7XG4gIHJpZ2h0OiAwO1xuICBoZWlnaHQ6IDFweDtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNEOUQ5RDk7XG4gIGNvbG9yOiAjRDlEOUQ5O1xuICB0cmFuc2Zvcm0tb3JpZ2luOiAwIDEwMCU7XG4gIHRyYW5zZm9ybTogc2NhbGVZKDAuNSk7XG59XG4ud2V1aS1ncmlkOmFjdGl2ZSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNFQ0VDRUM7XG59XG4ud2V1aS1ncmlkX19pY29uIHtcbiAgd2lkdGg6IDI4cHg7XG4gIGhlaWdodDogMjhweDtcbiAgbWFyZ2luOiAwIGF1dG87XG59XG4ud2V1aS1ncmlkX19pY29uIGltZyB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuLndldWktZ3JpZF9faWNvbiArIC53ZXVpLWdyaWRfX2xhYmVsIHtcbiAgbWFyZ2luLXRvcDogNXB4O1xufVxuLndldWktZ3JpZF9fbGFiZWwge1xuICBkaXNwbGF5OiBibG9jaztcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBjb2xvcjogIzAwMDAwMDtcbiAgZm9udC1zaXplOiAxNHB4O1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cbi53ZXVpLWZvb3RlciB7XG4gIGNvbG9yOiAjOTk5OTk5O1xuICBmb250LXNpemU6IDE0cHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cbi53ZXVpLWZvb3RlciBhIHtcbiAgY29sb3I6ICM1ODZDOTQ7XG59XG4ud2V1aS1mb290ZXJfZml4ZWQtYm90dG9tIHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICBib3R0b206IC41MmVtO1xuICBsZWZ0OiAwO1xuICByaWdodDogMDtcbn1cbi53ZXVpLWZvb3Rlcl9fbGlua3Mge1xuICBmb250LXNpemU6IDA7XG59XG4ud2V1aS1mb290ZXJfX2xpbmsge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIHZlcnRpY2FsLWFsaWduOiB0b3A7XG4gIG1hcmdpbjogMCAuNjJlbTtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBmb250LXNpemU6IDE0cHg7XG59XG4ud2V1aS1mb290ZXJfX2xpbms6YmVmb3JlIHtcbiAgY29udGVudDogXCIgXCI7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogMDtcbiAgdG9wOiAwO1xuICB3aWR0aDogMXB4O1xuICBib3R0b206IDA7XG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgI0M3QzdDNztcbiAgY29sb3I6ICNDN0M3Qzc7XG4gIHRyYW5zZm9ybS1vcmlnaW46IDAgMDtcbiAgdHJhbnNmb3JtOiBzY2FsZVgoMC41KTtcbiAgbGVmdDogLTAuNjVlbTtcbiAgdG9wOiAuMzZlbTtcbiAgYm90dG9tOiAuMzZlbTtcbn1cbi53ZXVpLWZvb3Rlcl9fbGluazpmaXJzdC1jaGlsZDpiZWZvcmUge1xuICBkaXNwbGF5OiBub25lO1xufVxuLndldWktZm9vdGVyX190ZXh0IHtcbiAgcGFkZGluZzogMCAuMzRlbTtcbiAgZm9udC1zaXplOiAxMnB4O1xufVxuLndldWktZmxleCB7XG4gIGRpc3BsYXk6IGZsZXg7XG59XG4ud2V1aS1mbGV4X19pdGVtIHtcbiAgZmxleDogMTtcbn1cbi53ZXVpLWRpYWxvZyB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgei1pbmRleDogNTAwMDtcbiAgd2lkdGg6IDgwJTtcbiAgbWF4LXdpZHRoOiAzMDBweDtcbiAgdG9wOiA1MCU7XG4gIGxlZnQ6IDUwJTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XG4gIGJhY2tncm91bmQtY29sb3I6ICNGRkZGRkY7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuLndldWktZGlhbG9nX19oZCB7XG4gIHBhZGRpbmc6IDEuM2VtIDEuNmVtIDAuNWVtO1xufVxuLndldWktZGlhbG9nX190aXRsZSB7XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG4gIGZvbnQtc2l6ZTogMThweDtcbn1cbi53ZXVpLWRpYWxvZ19fYmQge1xuICBwYWRkaW5nOiAwIDEuNmVtIDAuOGVtO1xuICBtaW4taGVpZ2h0OiA0MHB4O1xuICBmb250LXNpemU6IDE1cHg7XG4gIGxpbmUtaGVpZ2h0OiAxLjM7XG4gIHdvcmQtd3JhcDogYnJlYWstd29yZDtcbiAgd29yZC1icmVhazogYnJlYWstYWxsO1xuICBjb2xvcjogIzk5OTk5OTtcbn1cbi53ZXVpLWRpYWxvZ19fYmQ6Zmlyc3QtY2hpbGQge1xuICBwYWRkaW5nOiAyLjdlbSAyMHB4IDEuN2VtO1xuICBjb2xvcjogIzM1MzUzNTtcbn1cbi53ZXVpLWRpYWxvZ19fZnQge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGxpbmUtaGVpZ2h0OiA0OHB4O1xuICBmb250LXNpemU6IDE4cHg7XG4gIGRpc3BsYXk6IGZsZXg7XG59XG4ud2V1aS1kaWFsb2dfX2Z0OmFmdGVyIHtcbiAgY29udGVudDogXCIgXCI7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogMDtcbiAgdG9wOiAwO1xuICByaWdodDogMDtcbiAgaGVpZ2h0OiAxcHg7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjRDVENUQ2O1xuICBjb2xvcjogI0Q1RDVENjtcbiAgdHJhbnNmb3JtLW9yaWdpbjogMCAwO1xuICB0cmFuc2Zvcm06IHNjYWxlWSgwLjUpO1xufVxuLndldWktZGlhbG9nX19idG4ge1xuICBkaXNwbGF5OiBibG9jaztcbiAgZmxleDogMTtcbiAgY29sb3I6ICMzQ0M1MUY7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOiByZ2JhKDAsIDAsIDAsIDApO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG4ud2V1aS1kaWFsb2dfX2J0bjphY3RpdmUge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRUVFRUVFO1xufVxuLndldWktZGlhbG9nX19idG46YWZ0ZXIge1xuICBjb250ZW50OiBcIiBcIjtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiAwO1xuICB0b3A6IDA7XG4gIHdpZHRoOiAxcHg7XG4gIGJvdHRvbTogMDtcbiAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjRDVENUQ2O1xuICBjb2xvcjogI0Q1RDVENjtcbiAgdHJhbnNmb3JtLW9yaWdpbjogMCAwO1xuICB0cmFuc2Zvcm06IHNjYWxlWCgwLjUpO1xufVxuLndldWktZGlhbG9nX19idG46Zmlyc3QtY2hpbGQ6YWZ0ZXIge1xuICBkaXNwbGF5OiBub25lO1xufVxuLndldWktZGlhbG9nX19idG5fZGVmYXVsdCB7XG4gIGNvbG9yOiAjMzUzNTM1O1xufVxuLndldWktZGlhbG9nX19idG5fcHJpbWFyeSB7XG4gIGNvbG9yOiAjMEJCMjBDO1xufVxuLndldWktc2tpbl9hbmRyb2lkIC53ZXVpLWRpYWxvZyB7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG4gIGJveC1zaGFkb3c6IDAgNnB4IDMwcHggMCByZ2JhKDAsIDAsIDAsIDAuMSk7XG59XG4ud2V1aS1za2luX2FuZHJvaWQgLndldWktZGlhbG9nX190aXRsZSB7XG4gIGZvbnQtc2l6ZTogMjFweDtcbn1cbi53ZXVpLXNraW5fYW5kcm9pZCAud2V1aS1kaWFsb2dfX2hkIHtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbn1cbi53ZXVpLXNraW5fYW5kcm9pZCAud2V1aS1kaWFsb2dfX2JkIHtcbiAgY29sb3I6ICM5OTk5OTk7XG4gIHBhZGRpbmc6IDAuMjVlbSAxLjZlbSAyZW07XG4gIGZvbnQtc2l6ZTogMTdweDtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbn1cbi53ZXVpLXNraW5fYW5kcm9pZCAud2V1aS1kaWFsb2dfX2JkOmZpcnN0LWNoaWxkIHtcbiAgcGFkZGluZzogMS42ZW0gMS42ZW0gMmVtO1xuICBjb2xvcjogIzM1MzUzNTtcbn1cbi53ZXVpLXNraW5fYW5kcm9pZCAud2V1aS1kaWFsb2dfX2Z0IHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHRleHQtYWxpZ246IHJpZ2h0O1xuICBsaW5lLWhlaWdodDogNDJweDtcbiAgZm9udC1zaXplOiAxNnB4O1xuICBwYWRkaW5nOiAwIDEuNmVtIDAuN2VtO1xufVxuLndldWktc2tpbl9hbmRyb2lkIC53ZXVpLWRpYWxvZ19fZnQ6YWZ0ZXIge1xuICBkaXNwbGF5OiBub25lO1xufVxuLndldWktc2tpbl9hbmRyb2lkIC53ZXVpLWRpYWxvZ19fYnRuIHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xuICBwYWRkaW5nOiAwIC44ZW07XG59XG4ud2V1aS1za2luX2FuZHJvaWQgLndldWktZGlhbG9nX19idG46YWZ0ZXIge1xuICBkaXNwbGF5OiBub25lO1xufVxuLndldWktc2tpbl9hbmRyb2lkIC53ZXVpLWRpYWxvZ19fYnRuOmFjdGl2ZSB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4wNik7XG59XG4ud2V1aS1za2luX2FuZHJvaWQgLndldWktZGlhbG9nX19idG46dmlzaXRlZCB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4wNik7XG59XG4ud2V1aS1za2luX2FuZHJvaWQgLndldWktZGlhbG9nX19idG46bGFzdC1jaGlsZCB7XG4gIG1hcmdpbi1yaWdodDogLTAuOGVtO1xufVxuLndldWktc2tpbl9hbmRyb2lkIC53ZXVpLWRpYWxvZ19fYnRuX2RlZmF1bHQge1xuICBjb2xvcjogIzgwODA4MDtcbn1cbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDEwMjRweCkge1xuICAud2V1aS1kaWFsb2cge1xuICAgIHdpZHRoOiAzNSU7XG4gIH1cbn1cbi53ZXVpLXRvYXN0IHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICB6LWluZGV4OiA1MDAwO1xuICB3aWR0aDogNy42ZW07XG4gIG1pbi1oZWlnaHQ6IDcuNmVtO1xuICB0b3A6IDE4MHB4O1xuICBsZWZ0OiA1MCU7XG4gIG1hcmdpbi1sZWZ0OiAtMy44ZW07XG4gIGJhY2tncm91bmQ6IHJnYmEoMTcsIDE3LCAxNywgMC43KTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG4gIGNvbG9yOiAjRkZGRkZGO1xufVxuLndldWktaWNvbl90b2FzdCB7XG4gIG1hcmdpbjogMjJweCAwIDA7XG4gIGRpc3BsYXk6IGJsb2NrO1xufVxuLndldWktaWNvbl90b2FzdC53ZXVpLWljb24tc3VjY2Vzcy1uby1jaXJjbGU6YmVmb3JlIHtcbiAgY29sb3I6ICNGRkZGRkY7XG4gIGZvbnQtc2l6ZTogNTVweDtcbn1cbi53ZXVpLWljb25fdG9hc3Qud2V1aS1sb2FkaW5nIHtcbiAgbWFyZ2luOiAzMHB4IDAgMDtcbiAgd2lkdGg6IDM4cHg7XG4gIGhlaWdodDogMzhweDtcbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xufVxuLndldWktdG9hc3RfX2NvbnRlbnQge1xuICBtYXJnaW46IDAgMCAxNXB4O1xufVxuLndldWktbWFzayB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgei1pbmRleDogMTAwMDtcbiAgdG9wOiAwO1xuICByaWdodDogMDtcbiAgbGVmdDogMDtcbiAgYm90dG9tOiAwO1xuICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuNik7XG59XG4ud2V1aS1tYXNrX3RyYW5zcGFyZW50IHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICB6LWluZGV4OiAxMDAwO1xuICB0b3A6IDA7XG4gIHJpZ2h0OiAwO1xuICBsZWZ0OiAwO1xuICBib3R0b206IDA7XG59XG4ud2V1aS1hY3Rpb25zaGVldCB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgbGVmdDogMDtcbiAgYm90dG9tOiAwO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAxMDAlKTtcbiAgYmFja2ZhY2UtdmlzaWJpbGl0eTogaGlkZGVuO1xuICB6LWluZGV4OiA1MDAwO1xuICB3aWR0aDogMTAwJTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI0VGRUZGNDtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIC4zcztcbn1cbi53ZXVpLWFjdGlvbnNoZWV0X19tZW51IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI0ZGRkZGRjtcbn1cbi53ZXVpLWFjdGlvbnNoZWV0X19hY3Rpb24ge1xuICBtYXJnaW4tdG9wOiA2cHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICNGRkZGRkY7XG59XG4ud2V1aS1hY3Rpb25zaGVldF9fY2VsbCB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgcGFkZGluZzogMTBweCAwO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGZvbnQtc2l6ZTogMThweDtcbn1cbi53ZXVpLWFjdGlvbnNoZWV0X19jZWxsOmJlZm9yZSB7XG4gIGNvbnRlbnQ6IFwiIFwiO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDA7XG4gIHRvcDogMDtcbiAgcmlnaHQ6IDA7XG4gIGhlaWdodDogMXB4O1xuICBib3JkZXItdG9wOiAxcHggc29saWQgI0Q5RDlEOTtcbiAgY29sb3I6ICNEOUQ5RDk7XG4gIHRyYW5zZm9ybS1vcmlnaW46IDAgMDtcbiAgdHJhbnNmb3JtOiBzY2FsZVkoMC41KTtcbn1cbi53ZXVpLWFjdGlvbnNoZWV0X19jZWxsOmFjdGl2ZSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNFQ0VDRUM7XG59XG4ud2V1aS1hY3Rpb25zaGVldF9fY2VsbDpmaXJzdC1jaGlsZDpiZWZvcmUge1xuICBkaXNwbGF5OiBub25lO1xufVxuLndldWktc2tpbl9hbmRyb2lkIC53ZXVpLWFjdGlvbnNoZWV0IHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICBsZWZ0OiA1MCU7XG4gIHRvcDogNTAlO1xuICBib3R0b206IGF1dG87XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xuICB3aWR0aDogMjc0cHg7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIGJhY2tmYWNlLXZpc2liaWxpdHk6IGhpZGRlbjtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAuM3M7XG59XG4ud2V1aS1za2luX2FuZHJvaWQgLndldWktYWN0aW9uc2hlZXRfX2FjdGlvbiB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG4ud2V1aS1za2luX2FuZHJvaWQgLndldWktYWN0aW9uc2hlZXRfX21lbnUge1xuICBib3JkZXItcmFkaXVzOiAycHg7XG4gIGJveC1zaGFkb3c6IDAgNnB4IDMwcHggMCByZ2JhKDAsIDAsIDAsIDAuMSk7XG59XG4ud2V1aS1za2luX2FuZHJvaWQgLndldWktYWN0aW9uc2hlZXRfX2NlbGwge1xuICBwYWRkaW5nOiAxM3B4IDI0cHg7XG4gIGZvbnQtc2l6ZTogMTZweDtcbiAgbGluZS1oZWlnaHQ6IDEuNDtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbn1cbi53ZXVpLXNraW5fYW5kcm9pZCAud2V1aS1hY3Rpb25zaGVldF9fY2VsbDpmaXJzdC1jaGlsZCB7XG4gIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDJweDtcbiAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDJweDtcbn1cbi53ZXVpLXNraW5fYW5kcm9pZCAud2V1aS1hY3Rpb25zaGVldF9fY2VsbDpsYXN0LWNoaWxkIHtcbiAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMnB4O1xuICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMnB4O1xufVxuLndldWktYWN0aW9uc2hlZXRfdG9nZ2xlIHtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgMCk7XG59XG4ud2V1aS1sb2FkbW9yZSB7XG4gIHdpZHRoOiA2NSU7XG4gIG1hcmdpbjogMS41ZW0gYXV0bztcbiAgbGluZS1oZWlnaHQ6IDEuNmVtO1xuICBmb250LXNpemU6IDE0cHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cbi53ZXVpLWxvYWRtb3JlX190aXBzIHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xufVxuLndldWktbG9hZG1vcmVfbGluZSB7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjRTVFNUU1O1xuICBtYXJnaW4tdG9wOiAyLjRlbTtcbn1cbi53ZXVpLWxvYWRtb3JlX2xpbmUgLndldWktbG9hZG1vcmVfX3RpcHMge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHRvcDogLTAuOWVtO1xuICBwYWRkaW5nOiAwIC41NWVtO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZGRkZGO1xuICBjb2xvcjogIzk5OTk5OTtcbn1cbi53ZXVpLWxvYWRtb3JlX2RvdCAud2V1aS1sb2FkbW9yZV9fdGlwcyB7XG4gIHBhZGRpbmc6IDAgLjE2ZW07XG59XG4ud2V1aS1sb2FkbW9yZV9kb3QgLndldWktbG9hZG1vcmVfX3RpcHM6YmVmb3JlIHtcbiAgY29udGVudDogXCIgXCI7XG4gIHdpZHRoOiA0cHg7XG4gIGhlaWdodDogNHB4O1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIGJhY2tncm91bmQtY29sb3I6ICNFNUU1RTU7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB2ZXJ0aWNhbC1hbGlnbjogMDtcbiAgdG9wOiAtMC4xNmVtO1xufVxuLndldWktYmFkZ2Uge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIHBhZGRpbmc6IC4xNWVtIC40ZW07XG4gIG1pbi13aWR0aDogOHB4O1xuICBib3JkZXItcmFkaXVzOiAxOHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRjQzNTMwO1xuICBjb2xvcjogI0ZGRkZGRjtcbiAgbGluZS1oZWlnaHQ6IDEuMjtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBmb250LXNpemU6IDEycHg7XG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG59XG4ud2V1aS1iYWRnZV9kb3Qge1xuICBwYWRkaW5nOiAuNGVtO1xuICBtaW4td2lkdGg6IDA7XG59XG4ud2V1aS1zZWFyY2gtYmFyIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBwYWRkaW5nOiA4cHggMTBweDtcbiAgZGlzcGxheTogZmxleDtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI0VGRUZGNDtcbn1cbi53ZXVpLXNlYXJjaC1iYXI6YmVmb3JlIHtcbiAgY29udGVudDogXCIgXCI7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogMDtcbiAgdG9wOiAwO1xuICByaWdodDogMDtcbiAgaGVpZ2h0OiAxcHg7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjRDdENkRDO1xuICBjb2xvcjogI0Q3RDZEQztcbiAgdHJhbnNmb3JtLW9yaWdpbjogMCAwO1xuICB0cmFuc2Zvcm06IHNjYWxlWSgwLjUpO1xufVxuLndldWktc2VhcmNoLWJhcjphZnRlciB7XG4gIGNvbnRlbnQ6IFwiIFwiO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDA7XG4gIGJvdHRvbTogMDtcbiAgcmlnaHQ6IDA7XG4gIGhlaWdodDogMXB4O1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI0Q3RDZEQztcbiAgY29sb3I6ICNEN0Q2REM7XG4gIHRyYW5zZm9ybS1vcmlnaW46IDAgMTAwJTtcbiAgdHJhbnNmb3JtOiBzY2FsZVkoMC41KTtcbn1cbi53ZXVpLXNlYXJjaC1iYXIud2V1aS1zZWFyY2gtYmFyX2ZvY3VzaW5nIC53ZXVpLXNlYXJjaC1iYXJfX2NhbmNlbC1idG4ge1xuICBkaXNwbGF5OiBibG9jaztcbn1cbi53ZXVpLXNlYXJjaC1iYXIud2V1aS1zZWFyY2gtYmFyX2ZvY3VzaW5nIC53ZXVpLXNlYXJjaC1iYXJfX2xhYmVsIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cbi53ZXVpLXNlYXJjaC1iYXJfX2Zvcm0ge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGZsZXg6IGF1dG87XG4gIGJhY2tncm91bmQtY29sb3I6ICNFRkVGRjQ7XG59XG4ud2V1aS1zZWFyY2gtYmFyX19mb3JtOmFmdGVyIHtcbiAgY29udGVudDogJyc7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogMDtcbiAgdG9wOiAwO1xuICB3aWR0aDogMjAwJTtcbiAgaGVpZ2h0OiAyMDAlO1xuICB0cmFuc2Zvcm06IHNjYWxlKDAuNSk7XG4gIHRyYW5zZm9ybS1vcmlnaW46IDAgMDtcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI0U2RTZFQTtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgYmFja2dyb3VuZDogI0ZGRkZGRjtcbn1cbi53ZXVpLXNlYXJjaC1iYXJfX2JveCB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgcGFkZGluZy1sZWZ0OiAzMHB4O1xuICBwYWRkaW5nLXJpZ2h0OiAzMHB4O1xuICBoZWlnaHQ6IDEwMCU7XG4gIHdpZHRoOiAxMDAlO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICB6LWluZGV4OiAxO1xufVxuLndldWktc2VhcmNoLWJhcl9fYm94IC53ZXVpLXNlYXJjaC1iYXJfX2lucHV0IHtcbiAgcGFkZGluZzogNHB4IDA7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEuNDI4NTcxNDNlbTtcbiAgYm9yZGVyOiAwO1xuICBmb250LXNpemU6IDE0cHg7XG4gIGxpbmUtaGVpZ2h0OiAxLjQyODU3MTQzZW07XG4gIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbn1cbi53ZXVpLXNlYXJjaC1iYXJfX2JveCAud2V1aS1zZWFyY2gtYmFyX19pbnB1dDpmb2N1cyB7XG4gIG91dGxpbmU6IG5vbmU7XG59XG4ud2V1aS1zZWFyY2gtYmFyX19ib3ggLndldWktaWNvbi1zZWFyY2gge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDEwcHg7XG4gIHRvcDogMDtcbiAgbGluZS1oZWlnaHQ6IDI4cHg7XG59XG4ud2V1aS1zZWFyY2gtYmFyX19ib3ggLndldWktaWNvbi1jbGVhciB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwO1xuICByaWdodDogMDtcbiAgcGFkZGluZzogMCAxMHB4O1xuICBsaW5lLWhlaWdodDogMjhweDtcbn1cbi53ZXVpLXNlYXJjaC1iYXJfX2xhYmVsIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDFweDtcbiAgcmlnaHQ6IDFweDtcbiAgYm90dG9tOiAxcHg7XG4gIGxlZnQ6IDFweDtcbiAgei1pbmRleDogMjtcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGNvbG9yOiAjOUI5QjlCO1xuICBiYWNrZ3JvdW5kOiAjRkZGRkZGO1xufVxuLndldWktc2VhcmNoLWJhcl9fbGFiZWwgc3BhbiB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgZm9udC1zaXplOiAxNHB4O1xuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xufVxuLndldWktc2VhcmNoLWJhcl9fbGFiZWwgLndldWktaWNvbi1zZWFyY2gge1xuICBtYXJnaW4tcmlnaHQ6IDVweDtcbn1cbi53ZXVpLXNlYXJjaC1iYXJfX2NhbmNlbC1idG4ge1xuICBkaXNwbGF5OiBub25lO1xuICBtYXJnaW4tbGVmdDogMTBweDtcbiAgbGluZS1oZWlnaHQ6IDI4cHg7XG4gIGNvbG9yOiAjMDlCQjA3O1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xufVxuLndldWktc2VhcmNoLWJhcl9faW5wdXQ6bm90KDp2YWxpZCkgfiAud2V1aS1pY29uLWNsZWFyIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cbmlucHV0W3R5cGU9XCJzZWFyY2hcIl06Oi13ZWJraXQtc2VhcmNoLWRlY29yYXRpb24sXG5pbnB1dFt0eXBlPVwic2VhcmNoXCJdOjotd2Via2l0LXNlYXJjaC1jYW5jZWwtYnV0dG9uLFxuaW5wdXRbdHlwZT1cInNlYXJjaFwiXTo6LXdlYmtpdC1zZWFyY2gtcmVzdWx0cy1idXR0b24sXG5pbnB1dFt0eXBlPVwic2VhcmNoXCJdOjotd2Via2l0LXNlYXJjaC1yZXN1bHRzLWRlY29yYXRpb24ge1xuICBkaXNwbGF5OiBub25lO1xufVxuLndldWktcGlja2VyIHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICB3aWR0aDogMTAwJTtcbiAgbGVmdDogMDtcbiAgYm90dG9tOiAwO1xuICB6LWluZGV4OiA1MDAwO1xuICBiYWNrZmFjZS12aXNpYmlsaXR5OiBoaWRkZW47XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIDEwMCUpO1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gLjNzO1xufVxuLndldWktcGlja2VyX19oZCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIHBhZGRpbmc6IDEwcHggMTVweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZiZjlmZTtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG4ud2V1aS1waWNrZXJfX2hkOmFmdGVyIHtcbiAgY29udGVudDogXCIgXCI7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogMDtcbiAgYm90dG9tOiAwO1xuICByaWdodDogMDtcbiAgaGVpZ2h0OiAxcHg7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjRTVFNUU1O1xuICBjb2xvcjogI0U1RTVFNTtcbiAgdHJhbnNmb3JtLW9yaWdpbjogMCAxMDAlO1xuICB0cmFuc2Zvcm06IHNjYWxlWSgwLjUpO1xufVxuLndldWktcGlja2VyX19hY3Rpb24ge1xuICBkaXNwbGF5OiBibG9jaztcbiAgZmxleDogMTtcbiAgY29sb3I6ICM1ODZDOTQ7XG59XG4ud2V1aS1waWNrZXJfX2FjdGlvbjpmaXJzdC1jaGlsZCB7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG59XG4ud2V1aS1waWNrZXJfX2FjdGlvbjpsYXN0LWNoaWxkIHtcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XG59XG4ud2V1aS1waWNrZXJfX2JkIHtcbiAgZGlzcGxheTogZmxleDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuICBoZWlnaHQ6IDIzOHB4O1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuLndldWktcGlja2VyX19ncm91cCB7XG4gIGZsZXg6IDE7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuLndldWktcGlja2VyX19tYXNrIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIGxlZnQ6IDA7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIG1hcmdpbjogMCBhdXRvO1xuICB6LWluZGV4OiAzO1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuOTUpLCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNikpLCBsaW5lYXItZ3JhZGllbnQoMGRlZywgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjk1KSwgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjYpKTtcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogdG9wLCBib3R0b207XG4gIGJhY2tncm91bmQtc2l6ZTogMTAwJSAxMDJweDtcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVaKDApO1xufVxuLndldWktcGlja2VyX19pbmRpY2F0b3Ige1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAzNHB4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDA7XG4gIHRvcDogMTAycHg7XG4gIHotaW5kZXg6IDM7XG59XG4ud2V1aS1waWNrZXJfX2luZGljYXRvcjpiZWZvcmUge1xuICBjb250ZW50OiBcIiBcIjtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiAwO1xuICB0b3A6IDA7XG4gIHJpZ2h0OiAwO1xuICBoZWlnaHQ6IDFweDtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNFNUU1RTU7XG4gIGNvbG9yOiAjRTVFNUU1O1xuICB0cmFuc2Zvcm0tb3JpZ2luOiAwIDA7XG4gIHRyYW5zZm9ybTogc2NhbGVZKDAuNSk7XG59XG4ud2V1aS1waWNrZXJfX2luZGljYXRvcjphZnRlciB7XG4gIGNvbnRlbnQ6IFwiIFwiO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDA7XG4gIGJvdHRvbTogMDtcbiAgcmlnaHQ6IDA7XG4gIGhlaWdodDogMXB4O1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI0U1RTVFNTtcbiAgY29sb3I6ICNFNUU1RTU7XG4gIHRyYW5zZm9ybS1vcmlnaW46IDAgMTAwJTtcbiAgdHJhbnNmb3JtOiBzY2FsZVkoMC41KTtcbn1cbi53ZXVpLXBpY2tlcl9fY29udGVudCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwO1xuICBsZWZ0OiAwO1xuICB3aWR0aDogMTAwJTtcbn1cbi53ZXVpLXBpY2tlcl9faXRlbSB7XG4gIHBhZGRpbmc6IDVweCAwIDRweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBjb2xvcjogIzAwMDtcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG4ud2V1aS1waWNrZXJfX2l0ZW1fZGlzYWJsZWQge1xuICBjb2xvcjogIzk5OTk5OTtcbn1cbkBrZXlmcmFtZXMgc2xpZGVVcCB7XG4gIGZyb20ge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgMTAwJSwgMCk7XG4gIH1cbiAgdG8ge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgMCwgMCk7XG4gIH1cbn1cbi53ZXVpLWFuaW1hdGUtc2xpZGUtdXAge1xuICBhbmltYXRpb246IHNsaWRlVXAgZWFzZSAuM3MgZm9yd2FyZHM7XG59XG5Aa2V5ZnJhbWVzIHNsaWRlRG93biB7XG4gIGZyb20ge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgMCwgMCk7XG4gIH1cbiAgdG8ge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgMTAwJSwgMCk7XG4gIH1cbn1cbi53ZXVpLWFuaW1hdGUtc2xpZGUtZG93biB7XG4gIGFuaW1hdGlvbjogc2xpZGVEb3duIGVhc2UgLjNzIGZvcndhcmRzO1xufVxuQGtleWZyYW1lcyBmYWRlSW4ge1xuICBmcm9tIHtcbiAgICBvcGFjaXR5OiAwO1xuICB9XG4gIHRvIHtcbiAgICBvcGFjaXR5OiAxO1xuICB9XG59XG4ud2V1aS1hbmltYXRlLWZhZGUtaW4ge1xuICBhbmltYXRpb246IGZhZGVJbiBlYXNlIC4zcyBmb3J3YXJkcztcbn1cbkBrZXlmcmFtZXMgZmFkZU91dCB7XG4gIGZyb20ge1xuICAgIG9wYWNpdHk6IDE7XG4gIH1cbiAgdG8ge1xuICAgIG9wYWNpdHk6IDA7XG4gIH1cbn1cbi53ZXVpLWFuaW1hdGUtZmFkZS1vdXQge1xuICBhbmltYXRpb246IGZhZGVPdXQgZWFzZSAuM3MgZm9yd2FyZHM7XG59XG4ud2V1aS1hZ3JlZSB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBwYWRkaW5nOiAuNWVtIDE1cHg7XG4gIGZvbnQtc2l6ZTogMTNweDtcbn1cbi53ZXVpLWFncmVlIGEge1xuICBjb2xvcjogIzU4NkM5NDtcbn1cbi53ZXVpLWFncmVlX190ZXh0IHtcbiAgY29sb3I6ICM5OTk5OTk7XG59XG4ud2V1aS1hZ3JlZV9fY2hlY2tib3gge1xuICBhcHBlYXJhbmNlOiBub25lO1xuICBvdXRsaW5lOiAwO1xuICBmb250LXNpemU6IDA7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNEMUQxRDE7XG4gIGJhY2tncm91bmQtY29sb3I6ICNGRkZGRkY7XG4gIGJvcmRlci1yYWRpdXM6IDNweDtcbiAgd2lkdGg6IDEzcHg7XG4gIGhlaWdodDogMTNweDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB2ZXJ0aWNhbC1hbGlnbjogMDtcbiAgdG9wOiAycHg7XG59XG4ud2V1aS1hZ3JlZV9fY2hlY2tib3g6Y2hlY2tlZDpiZWZvcmUge1xuICBmb250LWZhbWlseTogXCJ3ZXVpXCI7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgZm9udC12YXJpYW50OiBub3JtYWw7XG4gIHRleHQtdHJhbnNmb3JtOiBub25lO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHNwZWFrOiBub25lO1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gIHRleHQtZGVjb3JhdGlvbjogaW5oZXJpdDtcbiAgY29udGVudDogXCJcXEVBMDhcIjtcbiAgY29sb3I6ICMwOUJCMDc7XG4gIGZvbnQtc2l6ZTogMTNweDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDUwJTtcbiAgbGVmdDogNTAlO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNDglKSBzY2FsZSgwLjczKTtcbn1cbi53ZXVpLWFncmVlX19jaGVja2JveDpkaXNhYmxlZCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNFMUUxRTE7XG59XG4ud2V1aS1hZ3JlZV9fY2hlY2tib3g6ZGlzYWJsZWQ6YmVmb3JlIHtcbiAgY29sb3I6ICNBREFEQUQ7XG59XG4ud2V1aS1sb2FkaW5nIHtcbiAgd2lkdGg6IDIwcHg7XG4gIGhlaWdodDogMjBweDtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICBhbmltYXRpb246IHdldWlMb2FkaW5nIDFzIHN0ZXBzKDEyLCBlbmQpIGluZmluaXRlO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCB1cmwoZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCNGJXeHVjejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWNpSUhkcFpIUm9QU0l4TWpBaUlHaGxhV2RvZEQwaU1USXdJaUIyYVdWM1FtOTRQU0l3SURBZ01UQXdJREV3TUNJK1BIQmhkR2dnWm1sc2JEMGlibTl1WlNJZ1pEMGlUVEFnTUdneE1EQjJNVEF3U0RCNklpOCtQSEpsWTNRZ2QybGtkR2c5SWpjaUlHaGxhV2RvZEQwaU1qQWlJSGc5SWpRMkxqVWlJSGs5SWpRd0lpQm1hV3hzUFNJalJUbEZPVVU1SWlCeWVEMGlOU0lnY25rOUlqVWlJSFJ5WVc1elptOXliVDBpZEhKaGJuTnNZWFJsS0RBZ0xUTXdLU0l2UGp4eVpXTjBJSGRwWkhSb1BTSTNJaUJvWldsbmFIUTlJakl3SWlCNFBTSTBOaTQxSWlCNVBTSTBNQ0lnWm1sc2JEMGlJems0T1RZNU55SWdjbmc5SWpVaUlISjVQU0kxSWlCMGNtRnVjMlp2Y20wOUluSnZkR0YwWlNnek1DQXhNRFV1T1RnZ05qVXBJaTgrUEhKbFkzUWdkMmxrZEdnOUlqY2lJR2hsYVdkb2REMGlNakFpSUhnOUlqUTJMalVpSUhrOUlqUXdJaUJtYVd4c1BTSWpPVUk1T1RsQklpQnllRDBpTlNJZ2NuazlJalVpSUhSeVlXNXpabTl5YlQwaWNtOTBZWFJsS0RZd0lEYzFMams0SURZMUtTSXZQanh5WldOMElIZHBaSFJvUFNJM0lpQm9aV2xuYUhROUlqSXdJaUI0UFNJME5pNDFJaUI1UFNJME1DSWdabWxzYkQwaUkwRXpRVEZCTWlJZ2NuZzlJalVpSUhKNVBTSTFJaUIwY21GdWMyWnZjbTA5SW5KdmRHRjBaU2c1TUNBMk5TQTJOU2tpTHo0OGNtVmpkQ0IzYVdSMGFEMGlOeUlnYUdWcFoyaDBQU0l5TUNJZ2VEMGlORFl1TlNJZ2VUMGlOREFpSUdacGJHdzlJaU5CUWtFNVFVRWlJSEo0UFNJMUlpQnllVDBpTlNJZ2RISmhibk5tYjNKdFBTSnliM1JoZEdVb01USXdJRFU0TGpZMklEWTFLU0l2UGp4eVpXTjBJSGRwWkhSb1BTSTNJaUJvWldsbmFIUTlJakl3SWlCNFBTSTBOaTQxSWlCNVBTSTBNQ0lnWm1sc2JEMGlJMEl5UWpKQ01pSWdjbmc5SWpVaUlISjVQU0kxSWlCMGNtRnVjMlp2Y20wOUluSnZkR0YwWlNneE5UQWdOVFF1TURJZ05qVXBJaTgrUEhKbFkzUWdkMmxrZEdnOUlqY2lJR2hsYVdkb2REMGlNakFpSUhnOUlqUTJMalVpSUhrOUlqUXdJaUJtYVd4c1BTSWpRa0ZDT0VJNUlpQnllRDBpTlNJZ2NuazlJalVpSUhSeVlXNXpabTl5YlQwaWNtOTBZWFJsS0RFNE1DQTFNQ0EyTlNraUx6NDhjbVZqZENCM2FXUjBhRDBpTnlJZ2FHVnBaMmgwUFNJeU1DSWdlRDBpTkRZdU5TSWdlVDBpTkRBaUlHWnBiR3c5SWlORE1rTXdRekVpSUhKNFBTSTFJaUJ5ZVQwaU5TSWdkSEpoYm5ObWIzSnRQU0p5YjNSaGRHVW9MVEUxTUNBME5TNDVPQ0EyTlNraUx6NDhjbVZqZENCM2FXUjBhRDBpTnlJZ2FHVnBaMmgwUFNJeU1DSWdlRDBpTkRZdU5TSWdlVDBpTkRBaUlHWnBiR3c5SWlORFFrTkNRMElpSUhKNFBTSTFJaUJ5ZVQwaU5TSWdkSEpoYm5ObWIzSnRQU0p5YjNSaGRHVW9MVEV5TUNBME1TNHpOQ0EyTlNraUx6NDhjbVZqZENCM2FXUjBhRDBpTnlJZ2FHVnBaMmgwUFNJeU1DSWdlRDBpTkRZdU5TSWdlVDBpTkRBaUlHWnBiR3c5SWlORU1rUXlSRElpSUhKNFBTSTFJaUJ5ZVQwaU5TSWdkSEpoYm5ObWIzSnRQU0p5YjNSaGRHVW9MVGt3SURNMUlEWTFLU0l2UGp4eVpXTjBJSGRwWkhSb1BTSTNJaUJvWldsbmFIUTlJakl3SWlCNFBTSTBOaTQxSWlCNVBTSTBNQ0lnWm1sc2JEMGlJMFJCUkVGRVFTSWdjbmc5SWpVaUlISjVQU0kxSWlCMGNtRnVjMlp2Y20wOUluSnZkR0YwWlNndE5qQWdNalF1TURJZ05qVXBJaTgrUEhKbFkzUWdkMmxrZEdnOUlqY2lJR2hsYVdkb2REMGlNakFpSUhnOUlqUTJMalVpSUhrOUlqUXdJaUJtYVd4c1BTSWpSVEpGTWtVeUlpQnllRDBpTlNJZ2NuazlJalVpSUhSeVlXNXpabTl5YlQwaWNtOTBZWFJsS0Mwek1DQXROUzQ1T0NBMk5Ta2lMejQ4TDNOMlp6ND0pIG5vLXJlcGVhdDtcbiAgYmFja2dyb3VuZC1zaXplOiAxMDAlO1xufVxuLndldWktbG9hZGluZy53ZXVpLWxvYWRpbmdfdHJhbnNwYXJlbnQge1xuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCJkYXRhOmltYWdlL3N2Zyt4bWw7Y2hhcnNldD11dGYtOCwlM0NzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB3aWR0aD0nMTIwJyBoZWlnaHQ9JzEyMCcgdmlld0JveD0nMCAwIDEwMCAxMDAnJTNFJTNDcGF0aCBmaWxsPSdub25lJyBkPSdNMCAwaDEwMHYxMDBIMHonLyUzRSUzQ3JlY3QgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjU2KScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgwIC0zMCknLyUzRSUzQ3JlY3Qgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHg9JzQ2LjUnIHk9JzQwJyBmaWxsPSdyZ2JhKDI1NSwyNTUsMjU1LC41KScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSgzMCAxMDUuOTggNjUpJy8lM0UlM0NyZWN0IHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyB4PSc0Ni41JyB5PSc0MCcgZmlsbD0ncmdiYSgyNTUsMjU1LDI1NSwuNDMpJyByeD0nNScgcnk9JzUnIHRyYW5zZm9ybT0ncm90YXRlKDYwIDc1Ljk4IDY1KScvJTNFJTNDcmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjM4KScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSg5MCA2NSA2NSknLyUzRSUzQ3JlY3Qgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHg9JzQ2LjUnIHk9JzQwJyBmaWxsPSdyZ2JhKDI1NSwyNTUsMjU1LC4zMiknIHJ4PSc1JyByeT0nNScgdHJhbnNmb3JtPSdyb3RhdGUoMTIwIDU4LjY2IDY1KScvJTNFJTNDcmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjI4KScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSgxNTAgNTQuMDIgNjUpJy8lM0UlM0NyZWN0IHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyB4PSc0Ni41JyB5PSc0MCcgZmlsbD0ncmdiYSgyNTUsMjU1LDI1NSwuMjUpJyByeD0nNScgcnk9JzUnIHRyYW5zZm9ybT0ncm90YXRlKDE4MCA1MCA2NSknLyUzRSUzQ3JlY3Qgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHg9JzQ2LjUnIHk9JzQwJyBmaWxsPSdyZ2JhKDI1NSwyNTUsMjU1LC4yKScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSgtMTUwIDQ1Ljk4IDY1KScvJTNFJTNDcmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjE3KScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSgtMTIwIDQxLjM0IDY1KScvJTNFJTNDcmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjE0KScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSgtOTAgMzUgNjUpJy8lM0UlM0NyZWN0IHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyB4PSc0Ni41JyB5PSc0MCcgZmlsbD0ncmdiYSgyNTUsMjU1LDI1NSwuMSknIHJ4PSc1JyByeT0nNScgdHJhbnNmb3JtPSdyb3RhdGUoLTYwIDI0LjAyIDY1KScvJTNFJTNDcmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjAzKScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSgtMzAgLTUuOTggNjUpJy8lM0UlM0Mvc3ZnJTNFXCIpO1xufVxuQC13ZWJraXQta2V5ZnJhbWVzIHdldWlMb2FkaW5nIHtcbiAgMCUge1xuICAgIHRyYW5zZm9ybTogcm90YXRlM2QoMCwgMCwgMSwgMGRlZyk7XG4gIH1cbiAgMTAwJSB7XG4gICAgdHJhbnNmb3JtOiByb3RhdGUzZCgwLCAwLCAxLCAzNjBkZWcpO1xuICB9XG59XG5Aa2V5ZnJhbWVzIHdldWlMb2FkaW5nIHtcbiAgMCUge1xuICAgIHRyYW5zZm9ybTogcm90YXRlM2QoMCwgMCwgMSwgMGRlZyk7XG4gIH1cbiAgMTAwJSB7XG4gICAgdHJhbnNmb3JtOiByb3RhdGUzZCgwLCAwLCAxLCAzNjBkZWcpO1xuICB9XG59XG4ud2V1aS1zbGlkZXIge1xuICBwYWRkaW5nOiAxNXB4IDE4cHg7XG4gIHVzZXItc2VsZWN0OiBub25lO1xufVxuLndldWktc2xpZGVyX19pbm5lciB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgaGVpZ2h0OiAycHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICNFOUU5RTk7XG59XG4ud2V1aS1zbGlkZXJfX3RyYWNrIHtcbiAgaGVpZ2h0OiAycHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICMxQUFEMTk7XG4gIHdpZHRoOiAwO1xufVxuLndldWktc2xpZGVyX19oYW5kbGVyIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiAwO1xuICB0b3A6IDUwJTtcbiAgd2lkdGg6IDI4cHg7XG4gIGhlaWdodDogMjhweDtcbiAgbWFyZ2luLWxlZnQ6IC0xNHB4O1xuICBtYXJnaW4tdG9wOiAtMTRweDtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZGRkZGO1xuICBib3gtc2hhZG93OiAwIDAgNHB4IHJnYmEoMCwgMCwgMCwgMC4yKTtcbn1cbi53ZXVpLXNsaWRlci1ib3gge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuLndldWktc2xpZGVyLWJveCAud2V1aS1zbGlkZXIge1xuICBmbGV4OiAxO1xufVxuLndldWktc2xpZGVyLWJveF9fdmFsdWUge1xuICBtYXJnaW4tbGVmdDogLjVlbTtcbiAgbWluLXdpZHRoOiAyNHB4O1xuICBjb2xvcjogIzg4ODg4ODtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBmb250LXNpemU6IDE0cHg7XG59XG4iLCIuc2V0VGFwQ29sb3IoQGM6cmdiYSgwLDAsMCwwKSkge1xuICAgIC13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjogQGM7XG59XG5cblxuXG5cbiIsIkBmb250LWZhY2Uge1xuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gICAgZm9udC1zdHlsZTogbm9ybWFsO1xuICAgIGZvbnQtZmFtaWx5OiBcIndldWlcIjtcbiAgICBzcmM6IHVybCgnZGF0YTphcHBsaWNhdGlvbi9vY3RldC1zdHJlYW07YmFzZTY0LEFBRUFBQUFMQUlBQUF3QXdSMU5WUXJEK3MrMEFBQUU0QUFBQVFrOVRMekpBS0V4K0FBQUJmQUFBQUZaamJXRnc2NWNGSFFBQUFod0FBQUpRWjJ4NVp2Q1JSL0VBQUFTVUFBQUt0R2hsWVdRTVBST3RBQUFBNEFBQUFEWm9hR1ZoQ0N3RCtnQUFBTHdBQUFBa2FHMTBlRUpvLy84QUFBSFVBQUFBU0d4dlkyRVlxaFc0QUFBRWJBQUFBQ1p0WVhod0FTRUFWUUFBQVJnQUFBQWdibUZ0WmVOY0h0Z0FBQTlJQUFBQjVuQnZjM1Q2YkxoTEFBQVJNQUFBQU9ZQUFRQUFBK2dBQUFCYUErai8vLy8vQStrQUFRQUFBQUFBQUFBQUFBQUFBQUFBQUJJQUFRQUFBQUVBQUNiWmJ4dGZEenoxQUFzRDZBQUFBQURVbTJkdkFBQUFBTlNiWjIvLy93QUFBK2tENmdBQUFBZ0FBZ0FBQUFBQUFBQUJBQUFBRWdCSkFBVUFBQUFBQUFJQUFBQUtBQW9BQUFEL0FBQUFBQUFBQUFFQUFBQUtBQjRBTEFBQlJFWk1WQUFJQUFRQUFBQUFBQUFBQVFBQUFBRnNhV2RoQUFnQUFBQUJBQUFBQVFBRUFBUUFBQUFCQUFnQUFRQUdBQUFBQVFBQUFBQUFBUU93QVpBQUJRQUlBbm9DdkFBQUFJd0NlZ0s4QUFBQjRBQXhBUUlBQUFJQUJRTUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBVUdaRlpBQkE2Z0hxRVFQb0FBQUFXZ1BxQUFBQUFBQUJBQUFBQUFBQUFBQUFBQVBvQUFBRDZBQUFBK2dBQUFQb0FBQUQ2QUFBQStnQUFBUG9BQUFENkFBQUErZ0FBQVBvQUFBRDZBQUFBK2dBQUFQb0FBQUQ2QUFBQStqLy93UG9BQUFENkFBQUFBQUFCUUFBQUFNQUFBQXNBQUFBQkFBQUFYUUFBUUFBQUFBQWJnQURBQUVBQUFBc0FBTUFDZ0FBQVhRQUJBQkNBQUFBQkFBRUFBRUFBT29SLy84QUFPb0IvLzhBQUFBQkFBUUFBQUFCQUFJQUF3QUVBQVVBQmdBSEFBZ0FDUUFLQUFzQURBQU5BQTRBRHdBUUFCRUFBQUVHQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQXdBQUFBQUFOd0FBQUFBQUFBQUVRQUE2Z0VBQU9vQkFBQUFBUUFBNmdJQUFPb0NBQUFBQWdBQTZnTUFBT29EQUFBQUF3QUE2Z1FBQU9vRUFBQUFCQUFBNmdVQUFPb0ZBQUFBQlFBQTZnWUFBT29HQUFBQUJnQUE2Z2NBQU9vSEFBQUFCd0FBNmdnQUFPb0lBQUFBQ0FBQTZna0FBT29KQUFBQUNRQUE2Z29BQU9vS0FBQUFDZ0FBNmdzQUFPb0xBQUFBQ3dBQTZnd0FBT29NQUFBQURBQUE2ZzBBQU9vTkFBQUFEUUFBNmc0QUFPb09BQUFBRGdBQTZnOEFBT29QQUFBQUR3QUE2aEFBQU9vUUFBQUFFQUFBNmhFQUFPb1JBQUFBRVFBQUFBQUFSZ0NNQU5JQkpBRjRBY1FDTWdKZ0FxZ0MvQU5JQTZZRC9nUk9CS0FFOUFWYUFBQUFBZ0FBQUFBRHJ3T3RBQlFBS1FBQUFTSUhCZ2NHRkJjV0Z4WXlOelkzTmpRbkppY21BeUluSmljbU5EYzJOell5RnhZWEZoUUhCZ2NHQWZWNFoyUTdQRHc3Wkdmd1ptUTdQRHc3WkdaNGJsNWJOamMzTmx0ZTIxNWJOamMzTmx0ZUE2MDhPMlJuOEdkak96dzhPMk5uOEdka096ejhyemMxVzE3YlhsdzFOemMxWEY3YlhsczFOd0FBQUFBQ0FBQUFBQU96QTdNQUZ3QXRBQUFCSWdjR0J3WVZGQmNXRnhZek1qYzJOelkxTkNjbUp5WVRCd1lpTHdFbU5qc0JFVFEyT3dFeUZoVVJNeklXQWU1MloyUTdQVDA3WkdkMmZHcG1PejQrTzJacElYWU9LQTUyRGcwWFhRc0hKZ2NMWFJjTkE3TStPMlpxZkhablpEczlQVHRrWjNaOWFXWTdQdjN3bWhJU21oSWFBUmNJQ3dzSS91a2FBQU1BQUFBQUErVUQ1UUFYQUNNQUxBQUFBU0lIQmdjR0ZSUVhGaGNXTXpJM05qYzJOVFFuSmljbUF4UXJBU0kxQXpRN0FUSUhKeUltTkRZeUZoUUdBZTZFY205QlJFUkJiM0tFaVhaeFFrUkVRbkYxYVFJeEF3Z0NRZ01CSXhJWkdTUVpHUVBrUkVKeGRvbUVjbTlCUkVSQmIzS0VpblZ4UWtUOUhRSUNBV0lDQWpFWkl4a1pJeGtBQUFBQUFnQUFBQUFEc1FQa0FCa0FMZ0FBQVFZSEJnYzJCUkVVRnhZWEZoYzJOelkzTmpVUkpCY21KeVlUQVFZdkFTWS9BVFl5SHdFV05qY2xOaklmQVJZQjlWVlZRayt2L3RGSFBteGViR3hkYlQxSS90R3ZUMEpWby83VkJBU0tBd01TQVFVQmNRRUZBZ0VTQWdVQkVRUUQ0eE1ZRWhrM1lQNnNqblZsU0Q4Y0hEOUlaWFdPQVZSZ054a1NHUDYyL3RrREE0OEVCQmtDQVZZQ0FRSGxBUUlRQkFBQUFBQURBQUFBQUFPeEErUUFHd0FxQURNQUFBRUdCd1lIQmdjR054RVVGeFlYRmhjMk56WTNOalVSSkJjbUp5WUhNeklXRlFNVUJpc0JJaWNETkRZVElpWTBOaklXRkFZQjlVRkJPRHNzTzM4Z1J6NXNYbXhzWFcwOVNQN1lxRkJCVlc4MEJBWU1Bd0ltQlFFTEJoNFBGaFllRlJVRDVBOFNEaElPRWlrSy9xMlBkV1JKUGgwZFBrbGtkWThCVTE0MUdSSVkvQVlFL3NZQ0F3VUJPZ1FHL2tBVkh4VVZIeFVBQUFBQ0FBQUFBQVBrQStRQUZ3QXRBQUFCSWdjR0J3WVZGQmNXRnhZek1qYzJOelkxTkNjbUp5WVRBUVlpTHdFbVB3RTJNaDhCRmpJM0FUWXlId0VXQWU2RWNtOUJRME5DYm5PRGlYVnhRa1JFUW5GMWtmNmdBUVVCb3dNREZnRUZBWVVDQlFFQlF3SUZBUlVFQStORVFuRjFpWU56YmtKRFEwRnZjb1NKZFhGQ1JQNmovcVVCQWFnRUJSNENBV1lCQVFFTkFnSVZCQUFBQUFRQUFBQUFBNjhEclFBVUFDa0FQd0JEQUFBQklnY0dCd1lVRnhZWEZqSTNOamMyTkNjbUp5WURJaWNtSnlZME56WTNOaklYRmhjV0ZBY0dCd1lUQlE0Qkx3RW1CZzhCQmhZZkFSWXlOd0UrQVNZaUZ6QWZBUUgxZUdka096dzhPMlJuOEdaa096dzhPMlJtZUc1ZVd6WTNOelpiWHR0ZVd6WTNOelpiWG1uKzlnWVNCbUFHRHdVREJRRUdmUVVRQmdFbEJRRUxFQlVCQVFPdFBEdGtaL0JuWXpzOFBEdGpaL0JuWkRzOC9LODNOVnRlMjE1Y05UYzNOVnhlMjE1Yk5UY0NKdDBGQVFWSkJRSUdCQWNSQm9BR0JRRWhCUThMQkFFQkFBQUJBQUFBQUFPN0F6b0FGd0FBRXk0QlB3RStBUjhCRmpZM0FUWVdGeWNXRkFjQkJpSW5QUW9HQndVSEdnekxEQ0VMQWgwTEh3c05DZ3I5dVFvZUNnR3pDeUVPQ3cwSENaTUpBUW9CdmdrQ0NnMExIUXY5c1FzS0FBQUFBQUlBQUFBQUErVUQ1Z0FYQUN3QUFBRWlCd1lIQmhVVUZ4WVhGak15TnpZM05qVTBKeVluSmhNSEJpOEJKaWNtTlJNME5qc0JNaFlWRXhjZUFRSHZoSEp2UVVORFFtNXpnNGwxY1VKRVJFSnhkVmNRQXdUNkF3SUVFQU1DS3dJRERzVUNBUVBsUkVKeGRZbURjMjVDUTBOQmIzS0VpWFZ4UWtUOVZod0VBbmNDQWdNR0FYb0NBd01DL3EyRkFnUUFBQVFBQUFBQUE2OERyUUFEQUJnQUxRQXpBQUFCTUI4QkF5SUhCZ2NHRkJjV0Z4WXlOelkzTmpRbkppY21BeUluSmljbU5EYzJOell5RnhZWEZoUUhCZ2NHQXlNVk16VWpBdVVCQWZKNFoyUTdQRHc3Wkdmd1ptUTdQRHc3WkdaNGJsNWJOamMzTmx0ZTIxNWJOamMzTmx0ZW15VDkyUUtEQVFFQkxEdzdaR2Z3WjJNN1BEdzdZMmZ3WjJRN1BQeXZOelZiWHR0ZVhEVTNOelZjWHR0ZVd6VTNBakg5SkFBQUFBTUFBQUFBQStRRDVBQVhBQ2NBTUFBQUFTSUhCZ2NHRlJRWEZoY1dNekkzTmpjMk5UUW5KaWNtQXpNeUZoVURGQVlyQVNJbU5RTTBOaE1pSmpRMk1oWVVCZ0h1aEhKdlFVTkRRbTV6ZzRsMWNVSkVSRUp4ZFo0MkJBWU1Bd0luQXdNTUJoOFBGaFllRmhZRDQwUkNjWFdKZzNOdVFrTkRRVzl5aElsMWNVSkUvdllHQmY3QUFnTURBZ0ZBQlFiK05oWWZGaFlmRmdBQUJBQUFBQUFEd0FQQUFBZ0FFZ0FvQUQwQUFBRXlOalFtSWdZVUZoY2pGVE1SSXhVek5TTURJZ2NHQndZVkZCWVhGak15TnpZM05qVTBKeTRCQXlJbkppY21ORGMyTnpZeUZ4WVhGaFFIQmdjR0FmUVlJU0V3SVNGUmp6azV5VG9yaEc1clBUOTlhbStEZG1obFBENCtQTXlGYlY1Yk5UYzNOVnRlMmw1Yk5UYzNOVnRlQXFBaUx5SWlMeUk1SGY3RUhCd0NzVDg5YTI2RWQ4dzhQajQ4WldoMmcyOXFmZnlqTnpWYlh0cGVXelUzTnpWYlh0cGVXelUzQUFBREFBQUFBQU9vQTZnQUN3QWdBRFVBQUFFSEp3Y1hCeGMzRnpjbk53TWlCd1lIQmhRWEZoY1dNamMyTnpZMEp5WW5KZ01pSnlZbkpqUTNOamMyTWhjV0Z4WVVCd1lIQmdLT21wb2NtcG9jbXBvY21wcTJkbVppT2pzN09tSm03R1ppT2pzN09tSm1kbXRkV1RRMk5qUlpYZFpkV1RRMk5qUlpYUUtxbXBvY21wb2NtcG9jbXBvQkdUczZZbWJzWm1JNk96czZZbWJzWm1JNk8vekNOalJaWGRaZFdUUTJOalJaWGRaZFdUUTJBQU1BQUFBQUEra0Q2Z0FhQUM4QU1BQUFBUVlIQmlNaUp5WW5KalEzTmpjMk1oY1dGeFlWRkFjR0J3RUhBVEkzTmpjMk5DY21KeVlpQndZSEJoUVhGaGNXTXdLT05VQkNSMjFkV2pVM056VmFYZHBkV3pVMkdCY3JBU001L2VCWFMwZ3JLeXNyU0V1dVNra3FMQ3dxU1VwWEFTTXJGeGcyTlZ0ZDJsMWFOVGMzTlZwZGJVZENRRFgrM2prQkdTc3JTRXV1U2trcUxDd3FTVXF1UzBnckt3QUMvLzhBQUFQb0ErZ0FGQUF3QUFBQklnY0dCd1lRRnhZWEZpQTNOamMyRUNjbUp5WVRGZzRCSWk4QkJ3WXVBVFEvQVNjbVBnRVdId0UzTmg0QkJnOEJBZlNJZEhGRFJFUkRjWFFCRUhSeFEwUkVRM0YwU1FvQkZCc0tvcWdLR3hNS3FLSUtBUlFiQ3FLb0Noc1VBUXFvQStoRVEzRjAvdkIwY1VORVJFTnhkQUVRZEhGRFJQMWpDaHNUQ3FpaUNnRVVHd3FpcUFvYkZBRUtxS0lLQVJRYkNxSUFBQUlBQUFBQUErUUQ1QUFYQURRQUFBRWlCd1lIQmhVVUZ4WVhGak15TnpZM05qVTBKeVluSmhNVUJpTUZGeFlVRHdFR0x3RXVBVDhCTmg4QkZoUVBBUVV5RmgwQkFlNkVjbTlCUTBOQ2JuT0RpWFZ4UWtSRVFuRjFmd1FDL3BHREFRRVZBd1RzQWdFQzdBUUVGQUlCaEFGd0FnTUQ0MFJDY1hXSmczTnVRa05EUVc5eWhJbDFjVUpFL2ZZQ0F3dVZBZ1FDRkFRRTBBSUZBdEVFQkJRQ0JRR1ZDd01ESndBQUFBVUFBQUFBQTlRRDB3QWpBQ2NBTndCSEFFZ0FBQUVSRkFZaklTSW1OUkVqSWlZOUFUUTJNeUUxTkRZeklUSVdIUUVoTWhZZEFSUUdJeUVSSVJFSElnWVZFUlFXT3dFeU5qVVJOQ1lqSVNJR0ZSRVVGanNCTWpZMUVUUW1Ld0VEZXlZYi9YWWJKa01KRFEwSkFRWVpFZ0V2RXhrQkJna05EUW45Q1FKYzBRa05EUWt0Q1EwTkNmN3NDUTBOQ1MwSkRRMEpMUU1pL1RRYkppWWJBc3dNQ2l3SkRTNFNHUmtTTGcwSkxBb00vVXdDdEdzTkNmNU5DUTBOQ1FHekNRME5DZjVOQ1EwTkNRR3pDUTBBQUFBQUVBREdBQUVBQUFBQUFBRUFCQUFBQUFFQUFBQUFBQUlBQndBRUFBRUFBQUFBQUFNQUJBQUxBQUVBQUFBQUFBUUFCQUFQQUFFQUFBQUFBQVVBQ3dBVEFBRUFBQUFBQUFZQUJBQWVBQUVBQUFBQUFBb0FLd0FpQUFFQUFBQUFBQXNBRXdCTkFBTUFBUVFKQUFFQUNBQmdBQU1BQVFRSkFBSUFEZ0JvQUFNQUFRUUpBQU1BQ0FCMkFBTUFBUVFKQUFRQUNBQitBQU1BQVFRSkFBVUFGZ0NHQUFNQUFRUUpBQVlBQ0FDY0FBTUFBUVFKQUFvQVZnQ2tBQU1BQVFRSkFBc0FKZ0Q2ZDJWMWFWSmxaM1ZzWVhKM1pYVnBkMlYxYVZabGNuTnBiMjRnTVM0d2QyVjFhVWRsYm1WeVlYUmxaQ0JpZVNCemRtY3lkSFJtSUdaeWIyMGdSbTl1ZEdWc2JHOGdjSEp2YW1WamRDNW9kSFJ3T2k4dlptOXVkR1ZzYkc4dVkyOXRBSGNBWlFCMUFHa0FVZ0JsQUdjQWRRQnNBR0VBY2dCM0FHVUFkUUJwQUhjQVpRQjFBR2tBVmdCbEFISUFjd0JwQUc4QWJnQWdBREVBTGdBd0FIY0FaUUIxQUdrQVJ3QmxBRzRBWlFCeUFHRUFkQUJsQUdRQUlBQmlBSGtBSUFCekFIWUFad0F5QUhRQWRBQm1BQ0FBWmdCeUFHOEFiUUFnQUVZQWJ3QnVBSFFBWlFCc0FHd0Fid0FnQUhBQWNnQnZBR29BWlFCakFIUUFMZ0JvQUhRQWRBQndBRG9BTHdBdkFHWUFid0J1QUhRQVpRQnNBR3dBYndBdUFHTUFid0J0QUFBQUFnQUFBQUFBQUFBS0FBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFTQVFJQkF3RUVBUVVCQmdFSEFRZ0JDUUVLQVFzQkRBRU5BUTRCRHdFUUFSRUJFZ0VUQUFaamFYSmpiR1VJWkc5M2JteHZZV1FFYVc1bWJ3eHpZV1psWDNOMVkyTmxjM01KYzJGbVpWOTNZWEp1QjNOMVkyTmxjM01PYzNWalkyVnpjeTFqYVhKamJHVVJjM1ZqWTJWemN5MXVieTFqYVhKamJHVUhkMkZwZEdsdVp3NTNZV2wwYVc1bkxXTnBjbU5zWlFSM1lYSnVDMmx1Wm04dFkybHlZMnhsQm1OaGJtTmxiQVp6WldGeVkyZ0ZZMnhsWVhJRVltRmphd1prWld4bGRHVUFBQUFBJykgZm9ybWF0KCd0cnVldHlwZScpO1xufVxuXG5cbltjbGFzc149XCJ3ZXVpLWljb24tXCJdLCBbY2xhc3MqPVwiIHdldWktaWNvbi1cIl0ge1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICAgIGZvbnQ6IG5vcm1hbCBub3JtYWwgbm9ybWFsIDE0cHgvMSBcIndldWlcIjtcbiAgICBmb250LXNpemU6IGluaGVyaXQ7XG4gICAgdGV4dC1yZW5kZXJpbmc6IGF1dG87XG4gICAgLXdlYmtpdC1mb250LXNtb290aGluZzogYW50aWFsaWFzZWQ7XG4gICAgJjpiZWZvcmV7XG4gICAgICAgIC8vIOW5s+a7keWNh+e6p1xuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgIG1hcmdpbi1sZWZ0OiAuMmVtO1xuICAgICAgICBtYXJnaW4tcmlnaHQ6IC4yZW07XG4gICAgfVxufVxuXG4ud2V1aS1pY29uLWNpcmNsZTpiZWZvcmUgeyBjb250ZW50OiBcIlxcRUEwMVwiIH0gLyogJ+6ggCcgKi9cbi53ZXVpLWljb24tZG93bmxvYWQ6YmVmb3JlIHsgY29udGVudDogXCJcXEVBMDJcIiB9IC8qICfuoIAnICovXG4ud2V1aS1pY29uLWluZm86YmVmb3JlIHsgY29udGVudDogXCJcXEVBMDNcIiB9IC8qICfuoIAnICovXG4ud2V1aS1pY29uLXNhZmUtc3VjY2VzczpiZWZvcmUgeyBjb250ZW50OiBcIlxcRUEwNFwiIH0gLyogJ+6ggCcgKi9cbi53ZXVpLWljb24tc2FmZS13YXJuOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxFQTA1XCIgfSAvKiAn7qCAJyAqL1xuLndldWktaWNvbi1zdWNjZXNzOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxFQTA2XCIgfSAvKiAn7qCAJyAqL1xuLndldWktaWNvbi1zdWNjZXNzLWNpcmNsZTpiZWZvcmUgeyBjb250ZW50OiBcIlxcRUEwN1wiIH0gLyogJ+6ggCcgKi9cbi53ZXVpLWljb24tc3VjY2Vzcy1uby1jaXJjbGU6YmVmb3JlIHsgY29udGVudDogXCJcXEVBMDhcIiB9IC8qICfuoIAnICovXG4ud2V1aS1pY29uLXdhaXRpbmc6YmVmb3JlIHsgY29udGVudDogXCJcXEVBMDlcIiB9IC8qICfuoIAnICovXG4ud2V1aS1pY29uLXdhaXRpbmctY2lyY2xlOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxFQTBBXCIgfSAvKiAn7qCAJyAqL1xuLndldWktaWNvbi13YXJuOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxFQTBCXCIgfSAvKiAn7qCAJyAqL1xuLndldWktaWNvbi1pbmZvLWNpcmNsZTpiZWZvcmUgeyBjb250ZW50OiBcIlxcRUEwQ1wiIH0gLyogJ+6ggCcgKi9cbi53ZXVpLWljb24tY2FuY2VsOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxFQTBEXCIgfSAvKiAn7qCAJyAqL1xuLndldWktaWNvbi1zZWFyY2g6YmVmb3JlIHsgY29udGVudDogXCJcXEVBMEVcIiB9IC8qICfuoIAnICovXG4ud2V1aS1pY29uLWNsZWFyOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxFQTBGXCIgfSAvKiAn7qCAJyAqL1xuLndldWktaWNvbi1iYWNrOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXFxFQTEwXCIgfSAvKiAn7qCAJyAqL1xuLndldWktaWNvbi1kZWxldGU6YmVmb3JlIHsgY29udGVudDogXCJcXEVBMTFcIiB9IC8qICfuoIAnICovXG4iLCJAaW1wb3J0IFwid2V1aS1mb250XCI7XG5cbltjbGFzc149XCJ3ZXVpLWljb25fXCJdOmJlZm9yZSwgW2NsYXNzKj1cIiB3ZXVpLWljb25fXCJdOmJlZm9yZSB7XG4gICAgbWFyZ2luOiAwO1xufVxuLndldWktaWNvbi1zdWNjZXNzIHtcbiAgICBmb250LXNpemU6IDIzcHg7XG4gICAgY29sb3I6ICMwOUJCMDc7XG59XG4ud2V1aS1pY29uLXdhaXRpbmcge1xuICAgIGZvbnQtc2l6ZTogMjNweDtcbiAgICBjb2xvcjogIzEwQUVGRjtcbn1cbi53ZXVpLWljb24td2FybiB7XG4gICAgZm9udC1zaXplOiAyM3B4O1xuICAgIGNvbG9yOiAjRjQzNTMwO1xufVxuLndldWktaWNvbi1pbmZvIHtcbiAgICBmb250LXNpemU6IDIzcHg7XG4gICAgY29sb3I6ICMxMEFFRkY7XG59XG5cbi53ZXVpLWljb24tc3VjY2Vzcy1jaXJjbGUge1xuICAgIGZvbnQtc2l6ZTogMjNweDtcbiAgICBjb2xvcjogIzA5QkIwNztcbn1cbi53ZXVpLWljb24tc3VjY2Vzcy1uby1jaXJjbGUge1xuICAgIGZvbnQtc2l6ZTogMjNweDtcbiAgICBjb2xvcjogIzA5QkIwNztcbn1cbi53ZXVpLWljb24td2FpdGluZy1jaXJjbGUge1xuICAgIGZvbnQtc2l6ZTogMjNweDtcbiAgICBjb2xvcjogIzEwQUVGRjtcbn1cbi53ZXVpLWljb24tY2lyY2xlIHtcbiAgICBmb250LXNpemU6IDIzcHg7XG4gICAgY29sb3I6ICNDOUM5Qzk7XG59XG4ud2V1aS1pY29uLWRvd25sb2FkIHtcbiAgICBmb250LXNpemU6IDIzcHg7XG4gICAgY29sb3I6ICMwOUJCMDc7XG59XG5cbi53ZXVpLWljb24taW5mby1jaXJjbGUge1xuICAgIGZvbnQtc2l6ZTogMjNweDtcbiAgICBjb2xvcjogIzA5QkIwNztcbn1cblxuLndldWktaWNvbi1zYWZlLXN1Y2Nlc3Mge1xuICAgIGNvbG9yOiAjMDlCQjA3O1xufVxuLndldWktaWNvbi1zYWZlLXdhcm4ge1xuICAgIGNvbG9yOiAjRkZCRTAwO1xufVxuXG4ud2V1aS1pY29uLWNhbmNlbCB7XG4gICAgY29sb3I6ICNGNDM1MzA7XG4gICAgZm9udC1zaXplOiAyMnB4O1xufVxuXG4ud2V1aS1pY29uLXNlYXJjaCB7XG4gICAgY29sb3I6ICNCMkIyQjI7XG4gICAgZm9udC1zaXplOiAxNHB4O1xufVxuXG4ud2V1aS1pY29uLWNsZWFyIHtcbiAgICBjb2xvcjogI0IyQjJCMjtcbiAgICBmb250LXNpemU6IDE0cHg7XG59XG5cbi53ZXVpLWljb24tZGVsZXRlIHtcbiAgICAmLndldWktaWNvbl9nYWxsZXJ5LWRlbGV0ZXtcbiAgICAgICAgY29sb3I6I0ZGRkZGRjtcbiAgICAgICAgZm9udC1zaXplOjIycHg7XG4gICAgfVxufVxuXG4ud2V1aS1pY29uX21zZyB7XG4gICAgZm9udC1zaXplOiA5M3B4O1xuICAgICYud2V1aS1pY29uLXdhcm4ge1xuICAgICAgICBjb2xvcjogI0Y3NjI2MDtcbiAgICB9XG59XG4ud2V1aS1pY29uX21zZy1wcmltYXJ5IHtcbiAgICBmb250LXNpemU6IDkzcHg7XG4gICAgJi53ZXVpLWljb24td2FybiB7XG4gICAgICAgIGNvbG9yOiAjRkZCRTAwO1xuICAgIH1cbn1cbiIsIkBpbXBvcnQgXCIuLi8uLi9iYXNlL2ZuXCI7XG5cbi53ZXVpLWJ0biB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICAgIG1hcmdpbi1yaWdodDogYXV0bztcbiAgICBwYWRkaW5nLWxlZnQ6IDE0cHg7XG4gICAgcGFkZGluZy1yaWdodDogMTRweDtcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgIGZvbnQtc2l6ZTogQHdldWlCdG5Gb250U2l6ZTtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgIGNvbG9yOiBAd2V1aUJ0bkZvbnRDb2xvcjtcbiAgICBsaW5lLWhlaWdodDogdW5pdChAd2V1aUJ0bkhlaWdodC9Ad2V1aUJ0bkZvbnRTaXplKTtcbiAgICBib3JkZXItcmFkaXVzOiBAd2V1aUJ0bkJvcmRlclJhZGl1cztcbiAgICAuc2V0VGFwQ29sb3IoKTtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICY6YWZ0ZXIge1xuICAgICAgICBjb250ZW50OiBcIiBcIjtcbiAgICAgICAgd2lkdGg6IDIwMCU7XG4gICAgICAgIGhlaWdodDogMjAwJTtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0b3A6IDA7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMCwgMCwgMCwgLjIpO1xuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKC41KTtcbiAgICAgICAgdHJhbnNmb3JtLW9yaWdpbjogMCAwO1xuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICBib3JkZXItcmFkaXVzOiBAd2V1aUJ0bkJvcmRlclJhZGl1cyoyO1xuICAgIH1cbn1cbi53ZXVpLWJ0bl9pbmxpbmUge1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbn0iLCJAaW1wb3J0IFwiLi4vLi4vYmFzZS9mblwiO1xuXG4ud2V1aS1idG5fZGVmYXVsdCB7XG4gICAgY29sb3I6IEB3ZXVpQnRuRGVmYXVsdEZvbnRDb2xvcjtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBAd2V1aUJ0bkRlZmF1bHRCZztcbiAgICAmOm5vdCgud2V1aS1idG5fZGlzYWJsZWQpOnZpc2l0ZWQge1xuICAgICAgICBjb2xvcjogQHdldWlCdG5EZWZhdWx0Rm9udENvbG9yO1xuICAgIH1cbiAgICAmOm5vdCgud2V1aS1idG5fZGlzYWJsZWQpOmFjdGl2ZSB7XG4gICAgICAgIGNvbG9yOiBAd2V1aUJ0bkRlZmF1bHRBY3RpdmVGb250Q29sb3I7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IEB3ZXVpQnRuRGVmYXVsdEFjdGl2ZUJnO1xuICAgIH1cbn0iLCJAaW1wb3J0IFwiLi4vLi4vYmFzZS9mblwiO1xuXG4ud2V1aS1idG5fcHJpbWFyeSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogQHdldWlCdG5QcmltYXJ5Qmc7XG4gICAgJjpub3QoLndldWktYnRuX2Rpc2FibGVkKTp2aXNpdGVkIHtcbiAgICAgICAgY29sb3I6IEB3ZXVpQnRuRm9udENvbG9yO1xuICAgIH1cbiAgICAmOm5vdCgud2V1aS1idG5fZGlzYWJsZWQpOmFjdGl2ZSB7XG4gICAgICAgIGNvbG9yOiBAd2V1aUJ0bkFjdGl2ZUZvbnRDb2xvcjtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogQHdldWlCdG5QcmltYXJ5QWN0aXZlQmc7XG4gICAgfVxufVxuIiwiQGltcG9ydCBcIi4uLy4uL2Jhc2UvZm5cIjtcblxuLndldWktYnRuX3dhcm4ge1xuICAgIGJhY2tncm91bmQtY29sb3I6IEB3ZXVpQnRuV2FybkJnO1xuICAgICY6bm90KC53ZXVpLWJ0bl9kaXNhYmxlZCk6dmlzaXRlZCB7XG4gICAgICAgIGNvbG9yOiBAd2V1aUJ0bkZvbnRDb2xvcjtcbiAgICB9XG4gICAgJjpub3QoLndldWktYnRuX2Rpc2FibGVkKTphY3RpdmUge1xuICAgICAgICBjb2xvcjogQHdldWlCdG5BY3RpdmVGb250Q29sb3I7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IEB3ZXVpQnRuV2FybkFjdGl2ZUJnO1xuICAgIH1cbn1cbiIsIkBpbXBvcnQgXCIuLi8uLi9iYXNlL2ZuXCI7XG5cbi53ZXVpLWJ0bl9kaXNhYmxlZCB7XG4gICAgY29sb3I6IEB3ZXVpQnRuRGlzYWJsZWRGb250Q29sb3I7XG4gICAgJi53ZXVpLWJ0bl9kZWZhdWx0IHtcbiAgICAgICAgY29sb3I6IEB3ZXVpQnRuRGVmYXVsdERpc2FibGVkRm9udENvbG9yO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBAd2V1aUJ0bkRlZmF1bHREaXNhYmxlZEJnO1xuICAgIH1cbiAgICAmLndldWktYnRuX3ByaW1hcnkge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBAd2V1aUJ0blByaW1hcnlEaXNhYmxlZEJnO1xuICAgIH1cbiAgICAmLndldWktYnRuX3dhcm4ge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBAd2V1aUJ0bndhcm5EaXNhYmxlZEJnO1xuICAgIH1cbn1cbiIsIkBpbXBvcnQgXCIuLi8uLi9iYXNlL2ZuXCI7XG5cbi53ZXVpLWJ0bl9sb2FkaW5ne1xuXHQud2V1aS1sb2FkaW5ne1xuXHRcdG1hcmdpbjotLjJlbSAuMzRlbSAwIDA7XG5cdH1cbiAgICAmLndldWktYnRuX3ByaW1hcnksICYud2V1aS1idG5fd2FybiB7XG4gICAgICAgIGNvbG9yOiBAd2V1aUJ0bkFjdGl2ZUZvbnRDb2xvcjtcblx0XHQud2V1aS1sb2FkaW5ne1xuXHRcdFx0YmFja2dyb3VuZC1pbWFnZTp1cmwoXCJkYXRhOmltYWdlL3N2Zyt4bWw7Y2hhcnNldD11dGYtOCwlM0NzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB3aWR0aD0nMTIwJyBoZWlnaHQ9JzEyMCcgdmlld0JveD0nMCAwIDEwMCAxMDAnJTNFJTNDcGF0aCBmaWxsPSdub25lJyBkPSdNMCAwaDEwMHYxMDBIMHonLyUzRSUzQ3JlY3QgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjU2KScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgwIC0zMCknLyUzRSUzQ3JlY3Qgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHg9JzQ2LjUnIHk9JzQwJyBmaWxsPSdyZ2JhKDI1NSwyNTUsMjU1LC41KScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSgzMCAxMDUuOTggNjUpJy8lM0UlM0NyZWN0IHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyB4PSc0Ni41JyB5PSc0MCcgZmlsbD0ncmdiYSgyNTUsMjU1LDI1NSwuNDMpJyByeD0nNScgcnk9JzUnIHRyYW5zZm9ybT0ncm90YXRlKDYwIDc1Ljk4IDY1KScvJTNFJTNDcmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjM4KScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSg5MCA2NSA2NSknLyUzRSUzQ3JlY3Qgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHg9JzQ2LjUnIHk9JzQwJyBmaWxsPSdyZ2JhKDI1NSwyNTUsMjU1LC4zMiknIHJ4PSc1JyByeT0nNScgdHJhbnNmb3JtPSdyb3RhdGUoMTIwIDU4LjY2IDY1KScvJTNFJTNDcmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjI4KScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSgxNTAgNTQuMDIgNjUpJy8lM0UlM0NyZWN0IHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyB4PSc0Ni41JyB5PSc0MCcgZmlsbD0ncmdiYSgyNTUsMjU1LDI1NSwuMjUpJyByeD0nNScgcnk9JzUnIHRyYW5zZm9ybT0ncm90YXRlKDE4MCA1MCA2NSknLyUzRSUzQ3JlY3Qgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHg9JzQ2LjUnIHk9JzQwJyBmaWxsPSdyZ2JhKDI1NSwyNTUsMjU1LC4yKScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSgtMTUwIDQ1Ljk4IDY1KScvJTNFJTNDcmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjE3KScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSgtMTIwIDQxLjM0IDY1KScvJTNFJTNDcmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjE0KScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSgtOTAgMzUgNjUpJy8lM0UlM0NyZWN0IHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyB4PSc0Ni41JyB5PSc0MCcgZmlsbD0ncmdiYSgyNTUsMjU1LDI1NSwuMSknIHJ4PSc1JyByeT0nNScgdHJhbnNmb3JtPSdyb3RhdGUoLTYwIDI0LjAyIDY1KScvJTNFJTNDcmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjAzKScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSgtMzAgLTUuOTggNjUpJy8lM0UlM0Mvc3ZnJTNFXCIpO1xuXHRcdH1cbiAgICB9XG5cdCYud2V1aS1idG5fcHJpbWFyeXtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogQHdldWlCdG5QcmltYXJ5QWN0aXZlQmc7XG5cdH1cblx0Ji53ZXVpLWJ0bl93YXJue1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBAd2V1aUJ0bldhcm5BY3RpdmVCZztcblx0fVxufVxuIiwiQGltcG9ydCBcIi4uLy4uL2Jhc2UvZm5cIjtcblxuLndldWktYnRuX3BsYWluLXByaW1hcnkge1xuICAgIGNvbG9yOiBAd2V1aUJ0blBsYWluUHJpbWFyeUNvbG9yO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkIEB3ZXVpQnRuUGxhaW5QcmltYXJ5Qm9yZGVyQ29sb3I7XG4gICAgJjpub3QoLndldWktYnRuX3BsYWluLWRpc2FibGVkKTphY3RpdmUge1xuICAgICAgICBjb2xvcjpAd2V1aUJ0blBsYWluUHJpbWFyeUFjdGl2ZUNvbG9yO1xuICAgICAgICBib3JkZXItY29sb3I6IEB3ZXVpQnRuUGxhaW5QcmltYXJ5QWN0aXZlQm9yZGVyQ29sb3I7XG4gICAgfVxuICAgICY6YWZ0ZXIge1xuICAgICAgICBib3JkZXItd2lkdGg6IDA7XG4gICAgfVxufVxuXG4ud2V1aS1idG5fcGxhaW4tZGVmYXVsdCB7XG4gICAgY29sb3I6IEB3ZXVpQnRuUGxhaW5EZWZhdWx0Q29sb3I7XG4gICAgYm9yZGVyOiAxcHggc29saWQgQHdldWlCdG5QbGFpbkRlZmF1bHRCb3JkZXJDb2xvcjtcbiAgICAmOm5vdCgud2V1aS1idG5fcGxhaW4tZGlzYWJsZWQpOmFjdGl2ZSB7XG4gICAgICAgIGNvbG9yOkB3ZXVpQnRuUGxhaW5EZWZhdWx0QWN0aXZlQ29sb3I7XG4gICAgICAgIGJvcmRlci1jb2xvcjogQHdldWlCdG5QbGFpbkRlZmF1bHRBY3RpdmVCb3JkZXJDb2xvcjtcbiAgICB9XG4gICAgJjphZnRlciB7XG4gICAgICAgIGJvcmRlci13aWR0aDogMDtcbiAgICB9XG59XG4ud2V1aS1idG5fcGxhaW4tZGlzYWJsZWR7XG4gICAgY29sb3I6cmdiYSgwLDAsMCwuMik7XG4gICAgYm9yZGVyLWNvbG9yOnJnYmEoMCwwLDAsLjIpO1xufSIsIkBpbXBvcnQgXCIuLi8uLi9iYXNlL2ZuXCI7XG5AaW1wb3J0IFwid2V1aS1idG5fZ2xvYmFsXCI7XG5AaW1wb3J0IFwid2V1aS1idG5fZGVmYXVsdFwiO1xuQGltcG9ydCBcIndldWktYnRuX3ByaW1hcnlcIjtcbkBpbXBvcnQgXCJ3ZXVpLWJ0bl93YXJuXCI7XG5AaW1wb3J0IFwid2V1aS1idG5fZGlzYWJsZWRcIjtcbkBpbXBvcnQgXCJ3ZXVpLWJ0bl9sb2FkaW5nXCI7XG5AaW1wb3J0IFwid2V1aS1idG5fcGxhaW5cIjtcblxuYnV0dG9uLCBpbnB1dCB7XG4gICAgJi53ZXVpLWJ0biB7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBib3JkZXItd2lkdGg6IDA7XG4gICAgICAgIG91dGxpbmU6IDA7XG4gICAgICAgIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcbiAgICAgICAgJjpmb2N1cyB7XG4gICAgICAgICAgICBvdXRsaW5lOiAwO1xuICAgICAgICB9XG4gICAgfVxuICAgICYud2V1aS1idG5faW5saW5lLCYud2V1aS1idG5fbWluaSB7XG4gICAgICAgIHdpZHRoOiBhdXRvO1xuICAgIH1cbiAgICAmLndldWktYnRuX3BsYWluLXByaW1hcnksJi53ZXVpLWJ0bl9wbGFpbi1kZWZhdWx0e1xuICAgICAgICBib3JkZXItd2lkdGg6IDFweDtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgfVxufVxuXG4ud2V1aS1idG5fbWluaSB7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIHBhZGRpbmc6IDAgMS4zMmVtO1xuICAgIGxpbmUtaGVpZ2h0OiBAd2V1aUJ0bk1pbmlIZWlnaHQ7XG4gICAgZm9udC1zaXplOiBAd2V1aUJ0bk1pbmlGb250U2l6ZTtcbn1cblxuXG4vKmdhcCBiZXR3ZWVuIGJ0biovXG4ud2V1aS1idG4gKyAud2V1aS1idG4ge1xuICAgIG1hcmdpbi10b3A6IEB3ZXVpQnRuRGVmYXVsdEdhcDtcbn1cblxuLndldWktYnRuLndldWktYnRuX2lubGluZSArIC53ZXVpLWJ0bi53ZXVpLWJ0bl9pbmxpbmUge1xuICAgIG1hcmdpbi10b3A6IGF1dG87XG4gICAgbWFyZ2luLWxlZnQ6IEB3ZXVpQnRuRGVmYXVsdEdhcDtcbn1cblxuLndldWktYnRuLWFyZWEge1xuICAgIG1hcmdpbjogQHdldWlDZWxsc01hcmdpblRvcCBAd2V1aUJ0bkRlZmF1bHRHYXAgLjNlbTsgXG59XG4ud2V1aS1idG4tYXJlYV9pbmxpbmUge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgLndldWktYnRuIHtcbiAgICAgICAgbWFyZ2luLXRvcDogYXV0bztcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiBAd2V1aUJ0bkRlZmF1bHRHYXA7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBmbGV4OiAxO1xuICAgICAgICAmOmxhc3QtY2hpbGQge1xuICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiAwO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiQGltcG9ydCBcIi4uLy4uL2Jhc2UvZm5cIjtcblxuLndldWktY2VsbHMge1xuICAgIG1hcmdpbi10b3A6IEB3ZXVpQ2VsbHNNYXJnaW5Ub3A7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogQHdldWlDZWxsQmc7XG4gICAgbGluZS1oZWlnaHQ6IEB3ZXVpQ2VsbExpbmVIZWlnaHQ7XG4gICAgZm9udC1zaXplOiBAd2V1aUNlbGxGb250U2l6ZTsgLy9jZWxs5Lit6Ze05pyJ5pWI6auY5bqmMjNweO+8jOi3n+WuouaIt+err+m7mOiupOWbvuagh+WwuuWvuOS4gOiHtFxuXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjsgLy/lm6DkuLrmr4/kuKpjZWxs55qEYm9yZGVy5L2/55SoYmVmb3Jl5YWD57SgbGVmdOaQnueahO+8jGll5LiL5Lyq5YWD57Sg55qEY29udGFpbmluZyBibG9ja+S8sOiuoei3n+agh+WHhuS4jeWQjO+8jOWcqGNlbGzkuIrnlKhvaOS4jeeUn+aViFxuXG4gICAgLy8gb25lcHhcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgJjpiZWZvcmUge1xuICAgICAgICAuc2V0VG9wTGluZShAd2V1aUNlbGxCb3JkZXJDb2xvcik7XG4gICAgfVxuICAgICY6YWZ0ZXIge1xuICAgICAgICAuc2V0Qm90dG9tTGluZShAd2V1aUNlbGxCb3JkZXJDb2xvcik7XG4gICAgfVxufVxuXG4ud2V1aS1jZWxsc19fdGl0bGUge1xuICAgIG1hcmdpbi10b3A6IC43N2VtOyAvLyAxNXB4IC0g6KGM6auYXG4gICAgbWFyZ2luLWJvdHRvbTogLjNlbTsgLy8gOHB4IC0g6KGM6auYXG4gICAgcGFkZGluZy1sZWZ0OiBAd2V1aUNlbGxHYXBIO1xuICAgIHBhZGRpbmctcmlnaHQ6IEB3ZXVpQ2VsbEdhcEg7XG4gICAgY29sb3I6IEB3ZXVpVGV4dENvbG9yR3JheTtcbiAgICBmb250LXNpemU6IEB3ZXVpQ2VsbFRpcHNGb250U2l6ZTtcblxuICAgICYgKyAud2V1aS1jZWxscyB7XG4gICAgICAgIG1hcmdpbi10b3A6IDA7XG4gICAgfVxufVxuXG4ud2V1aS1jZWxsc19fdGlwcyB7XG4gICAgbWFyZ2luLXRvcDogLjNlbTsgLy8gOHB4IC0g6KGM6auYXG4gICAgY29sb3I6IEB3ZXVpVGV4dENvbG9yR3JheTtcbiAgICBwYWRkaW5nLWxlZnQ6IEB3ZXVpQ2VsbEdhcEg7XG4gICAgcGFkZGluZy1yaWdodDogQHdldWlDZWxsR2FwSDtcbiAgICBmb250LXNpemU6IEB3ZXVpQ2VsbFRpcHNGb250U2l6ZTtcbn1cblxuLndldWktY2VsbCB7XG4gICAgcGFkZGluZzogQHdldWlDZWxsR2FwViBAd2V1aUNlbGxHYXBIO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTsgLy/ov5nkuKrmmK/kuLrkuoblhbzlrrljZWxsc+WuueWZqG9uZXB45pa55qGI6KKrYmVmb3Jl5oyh5L2P6ICM5YGa55qEXG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICY6YmVmb3JlIHtcbiAgICAgICAgLnNldFRvcExpbmUoQHdldWlDZWxsQm9yZGVyQ29sb3IpO1xuICAgICAgICBsZWZ0OiBAd2V1aUNlbGxHYXBIO1xuICAgIH1cbiAgICAmOmZpcnN0LWNoaWxkIHtcbiAgICAgICAgJjpiZWZvcmUge1xuICAgICAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbi53ZXVpLWNlbGxfcHJpbWFyeXtcbiAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbn1cbi53ZXVpLWNlbGxfX2Jke1xuICAgIGZsZXg6IDE7XG59XG4ud2V1aS1jZWxsX19mdCB7XG4gICAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gICAgY29sb3I6IEB3ZXVpVGV4dENvbG9yR3JheTtcbn0iLCIuc2V0VG9wTGluZShAYzogI0M3QzdDNykge1xuICAgIGNvbnRlbnQ6IFwiIFwiO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBsZWZ0OiAwO1xuICAgIHRvcDogMDtcbiAgICByaWdodDogMDtcbiAgICBoZWlnaHQ6IDFweDtcbiAgICBib3JkZXItdG9wOiAxcHggc29saWQgQGM7XG4gICAgY29sb3I6IEBjO1xuICAgIHRyYW5zZm9ybS1vcmlnaW46IDAgMDtcbiAgICB0cmFuc2Zvcm06IHNjYWxlWSgwLjUpO1xufVxuXG4uc2V0Qm90dG9tTGluZShAYzogI0M3QzdDNykge1xuICAgIGNvbnRlbnQ6IFwiIFwiO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBsZWZ0OiAwO1xuICAgIGJvdHRvbTogMDtcbiAgICByaWdodDogMDtcbiAgICBoZWlnaHQ6IDFweDtcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgQGM7XG4gICAgY29sb3I6IEBjO1xuICAgIHRyYW5zZm9ybS1vcmlnaW46IDAgMTAwJTtcbiAgICB0cmFuc2Zvcm06IHNjYWxlWSgwLjUpO1xufVxuXG4uc2V0TGVmdExpbmUoQGM6ICNDN0M3QzcpIHtcbiAgICBjb250ZW50OiBcIiBcIjtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgbGVmdDogMDtcbiAgICB0b3A6IDA7XG4gICAgd2lkdGg6IDFweDtcbiAgICBib3R0b206IDA7XG4gICAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCBAYztcbiAgICBjb2xvcjogQGM7XG4gICAgdHJhbnNmb3JtLW9yaWdpbjogMCAwO1xuICAgIHRyYW5zZm9ybTogc2NhbGVYKDAuNSk7XG59XG5cbi5zZXRSaWdodExpbmUoQGM6ICNDN0M3QzcpIHtcbiAgICBjb250ZW50OiBcIiBcIjtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgcmlnaHQ6IDA7XG4gICAgdG9wOiAwO1xuICAgIHdpZHRoOiAxcHg7XG4gICAgYm90dG9tOiAwO1xuICAgIGJvcmRlci1yaWdodDogMXB4IHNvbGlkIEBjO1xuICAgIGNvbG9yOiBAYztcbiAgICB0cmFuc2Zvcm0tb3JpZ2luOiAxMDAlIDA7XG4gICAgdHJhbnNmb3JtOiBzY2FsZVgoMC41KTtcbn0iLCJAaW1wb3J0IFwiLi4vLi4vYmFzZS9mblwiO1xuXG4ud2V1aS1jZWxsX2FjY2VzcyB7XG4gICAgLnNldFRhcENvbG9yKCk7XG4gICAgY29sb3I6IGluaGVyaXQ7XG4gICAgJjphY3RpdmUge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRUNFQ0VDO1xuICAgIH1cbiAgICAud2V1aS1jZWxsX19mdCB7XG4gICAgICAgIHBhZGRpbmctcmlnaHQ6IDEzcHg7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgJjphZnRlciB7XG4gICAgICAgICAgICBjb250ZW50OiBcIiBcIjtcbiAgICAgICAgICAgIC5zZXRBcnJvdyhyaWdodCwgNnB4LCAjQzhDOENELCAycHgpO1xuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgdG9wOiA1MCU7XG4gICAgICAgICAgICBtYXJnaW4tdG9wOiAtNHB4O1xuICAgICAgICAgICAgcmlnaHQ6IDJweDtcbiAgICAgICAgfVxuICAgIH1cbn1cbi53ZXVpLWNlbGxfbGlua3tcbiAgICBjb2xvcjogQHdldWlMaW5rQ29sb3JEZWZhdWx0O1xuICAgIGZvbnQtc2l6ZTogMTRweDtcblxuICAgIC8vIOeUseS6jndldWktY2VsbDpmaXJzdC1jaGlsZOeahDpiZWZvcmXkuLrpmpDol4/vvIzmiYDku6Xov5nph4zopoHph43mlrDmmL7npLrlh7rmnaVcbiAgICAmOmZpcnN0LWNoaWxke1xuICAgICAgICAmOmJlZm9yZXtcbiAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiLl9zZXRBcnJvdyhAYXJyb3dzaXplLCBAYm9yZGVyQ29sb3IsIEBib3JkZXJXaWR0aCl7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIGhlaWdodDogQGFycm93c2l6ZTtcbiAgICB3aWR0aDogQGFycm93c2l6ZTtcbiAgICBib3JkZXItd2lkdGg6IEBib3JkZXJXaWR0aCBAYm9yZGVyV2lkdGggMCAwO1xuICAgIGJvcmRlci1jb2xvcjogQGJvcmRlckNvbG9yO1xuICAgIGJvcmRlci1zdHlsZTogc29saWQ7XG59XG5cbi5zZXRBcnJvdyhAZGlyZWN0aW9uLCBAYXJyb3dzaXplLCBAYm9yZGVyQ29sb3IsIEBib3JkZXJXaWR0aCkgd2hlbiAoQGRpcmVjdGlvbiA9IHRvcCkge1xuICAgIC5fc2V0QXJyb3coQGFycm93c2l6ZSwgQGJvcmRlckNvbG9yLCBAYm9yZGVyV2lkdGgpO1xuICAgIHRyYW5zZm9ybTogbWF0cml4KDAuNzEsLTAuNzEsMC43MSwwLjcxLDAsMCk7IC8vIHJvdGF0ZSgtNDVkZWcpXG59XG5cbi5zZXRBcnJvdyhAZGlyZWN0aW9uLCBAYXJyb3dzaXplLCBAYm9yZGVyQ29sb3IsQGJvcmRlcldpZHRoKSB3aGVuIChAZGlyZWN0aW9uID0gcmlnaHQpIHtcbiAgICAuX3NldEFycm93KEBhcnJvd3NpemUsIEBib3JkZXJDb2xvciwgQGJvcmRlcldpZHRoKTtcbiAgICB0cmFuc2Zvcm06IG1hdHJpeCgwLjcxLDAuNzEsLTAuNzEsMC43MSwwLDApOyAvLyByb3RhdGUoNDVkZWcpO1xuXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIHRvcDogLTJweDtcbn1cblxuLnNldEFycm93KEBkaXJlY3Rpb24sIEBhcnJvd3NpemUsIEBib3JkZXJDb2xvcixAYm9yZGVyV2lkdGgpIHdoZW4gKEBkaXJlY3Rpb24gPSBkb3duKSB7XG4gICAgLl9zZXRBcnJvdyhAYXJyb3dzaXplLCBAYm9yZGVyQ29sb3IsIEBib3JkZXJXaWR0aCk7XG4gICAgdHJhbnNmb3JtOiBtYXRyaXgoLTAuNzEsMC43MSwtMC43MSwtMC43MSwwLDApOyAvLyByb3RhdGUoMTM1ZGVnKTtcblxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB0b3A6IC0zcHg7XG59XG5cbi5zZXRBcnJvdyhAZGlyZWN0aW9uLCBAYXJyb3dzaXplLCBAYm9yZGVyQ29sb3IsQGJvcmRlcldpZHRoKSB3aGVuIChAZGlyZWN0aW9uID0gbGVmdCkge1xuICAgIC5fc2V0QXJyb3coQGFycm93c2l6ZSwgQGJvcmRlckNvbG9yLCBAYm9yZGVyV2lkdGgpO1xuICAgIHRyYW5zZm9ybTogbWF0cml4KC0wLjcxLC0wLjcxLDAuNzEsLTAuNzEsMCwwKTsgLy8gcm90YXRlKC0xMzVkZWcpO1xuXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIHRvcDogLTJweDtcbn0iLCJAaW1wb3J0IFwiLi4vLi4vLi4vYmFzZS9mblwiO1xuXG4ud2V1aS1jaGVja19fbGFiZWwge1xuICAgIC5zZXRUYXBDb2xvcigpO1xuICAgICY6YWN0aXZlIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI0VDRUNFQztcbiAgICB9XG59XG5cbi53ZXVpLWNoZWNre1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBsZWZ0OiAtOTk5OWVtO1xufVxuIiwiQGltcG9ydCBcIi4uLy4uLy4uL2Jhc2UvZm5cIjtcblxuLy8gbWV0aG9kMiBhY2Nlc3NiaWxpdHlcbi53ZXVpLWNlbGxzX3JhZGlve1xuICAgIC53ZXVpLWNlbGxfX2Z0IHtcbiAgICAgICAgcGFkZGluZy1sZWZ0OiBAd2V1aUNlbGxJbm5lckdhcEg7XG4gICAgfVxufVxuLndldWktY2hlY2sge1xuICAgIC8vIHJhZGlvXG4gICAgLndldWktY2VsbHNfcmFkaW8gJiB7XG4gICAgICAgICY6Y2hlY2tlZCB7XG4gICAgICAgICAgICAmICsgLndldWktaWNvbi1jaGVja2VkIHtcbiAgICAgICAgICAgICAgICAmOmJlZm9yZSB7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiAnXFxFQTA4JztcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICMwOUJCMDc7XG4gICAgICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59IiwiQGltcG9ydCBcIi4uLy4uLy4uL2Jhc2UvZm5cIjtcblxuLndldWktY2VsbHNfY2hlY2tib3gge1xuICAgIC53ZXVpLWNlbGxfX2hkIHtcbiAgICAgICAgcGFkZGluZy1yaWdodDogQHdldWlDZWxsSW5uZXJHYXBIO1xuICAgIH1cbiAgICAud2V1aS1pY29uLWNoZWNrZWQge1xuICAgICAgICAmOmJlZm9yZSB7XG4gICAgICAgICAgICBjb250ZW50OiAnXFxFQTAxJztcbiAgICAgICAgICAgIGNvbG9yOiAjQzlDOUM5O1xuICAgICAgICAgICAgZm9udC1zaXplOiAyM3B4O1xuICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8vIG1ldGhvZDIgYWNjZXNzYmlsaXR5XG4ud2V1aS1jaGVjayB7XG4gICAgLy8gY2hlY2tib3hcbiAgICAud2V1aS1jZWxsc19jaGVja2JveCAmIHtcbiAgICAgICAgJjpjaGVja2VkIHtcbiAgICAgICAgICAgICYgKyAud2V1aS1pY29uLWNoZWNrZWQge1xuICAgICAgICAgICAgICAgICY6YmVmb3JlIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogJ1xcRUEwNic7XG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAjMDlCQjA3O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn0iLCJAaW1wb3J0IFwiLi4vLi4vLi4vYmFzZS9mblwiO1xuXG4ud2V1aS1sYWJlbHtcbiAgZGlzcGxheTpibG9jaztcbiAgd2lkdGg6QHdldWlDZWxsTGFiZWxXaWR0aDtcbiAgLnRleHRfd3JhcCgpO1xufVxuLndldWktaW5wdXQge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGJvcmRlcjogMDtcbiAgICBvdXRsaW5lOiAwO1xuICAgIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICBmb250LXNpemU6IGluaGVyaXQ7XG4gICAgY29sb3I6IGluaGVyaXQ7XG4gICAgaGVpZ2h0OiB1bml0KEB3ZXVpQ2VsbExpbmVIZWlnaHQsIGVtKTtcbiAgICBsaW5lLWhlaWdodDogQHdldWlDZWxsTGluZUhlaWdodDtcblxuICAgIC8vIGhpZGVzIHRoZSBzcGluLWJ1dHRvblxuICAgICY6Oi13ZWJraXQtb3V0ZXItc3Bpbi1idXR0b24sICY6Oi13ZWJraXQtaW5uZXItc3Bpbi1idXR0b257XG4gICAgICAgIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcbiAgICAgICAgbWFyZ2luOiAwO1xuICAgIH1cbn1cbi53ZXVpLXRleHRhcmVhIHtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICBib3JkZXI6IDA7XG4gICAgcmVzaXplOiBub25lO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGNvbG9yOiBpbmhlcml0O1xuICAgIGZvbnQtc2l6ZTogMWVtO1xuICAgIGxpbmUtaGVpZ2h0OiBpbmhlcml0O1xuICAgIG91dGxpbmU6IDA7XG59XG5cbi53ZXVpLXRleHRhcmVhLWNvdW50ZXJ7XG4gICAgY29sb3I6IEB3ZXVpVGV4dENvbG9yVGlwcztcbiAgICB0ZXh0LWFsaWduOiByaWdodDtcbiAgICAud2V1aS1jZWxsX3dhcm4gJntcbiAgICAgICAgY29sb3I6IEB3ZXVpVGV4dENvbG9yV2FybjtcbiAgICB9XG59XG5cbi53ZXVpLXRvcHRpcHMge1xuICAgIGRpc3BsYXk6bm9uZTtcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVaKDApO1xuICAgIHRvcDogMDtcbiAgICBsZWZ0OiAwO1xuICAgIHJpZ2h0OiAwO1xuICAgIHBhZGRpbmc6NXB4O1xuICAgIGZvbnQtc2l6ZToxNHB4O1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBjb2xvcjogI0ZGRjtcbiAgICB6LWluZGV4OiA1MDAwO1xuICAgIC50ZXh0X3dyYXAoKTtcbn1cbi53ZXVpLXRvcHRpcHNfd2FybiB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogQHdldWlDb2xvcldhcm47XG59XG4ud2V1aS1jZWxsc19mb3JtIHtcbiAgICAud2V1aS1jZWxsX19mdHtcbiAgICAgICAgZm9udC1zaXplOjA7XG4gICAgfVxuICAgIC53ZXVpLWljb24td2FybntcbiAgICAgICAgZGlzcGxheTpub25lO1xuICAgIH1cbiAgICBpbnB1dCwgdGV4dGFyZWEsIGxhYmVsW2Zvcl17XG4gICAgICAgIC5zZXRUYXBDb2xvcigpO1xuICAgIH1cbn1cbi53ZXVpLWNlbGxfd2FybntcbiAgICBjb2xvcjpAd2V1aVRleHRDb2xvcldhcm47XG4gICAgLndldWktaWNvbi13YXJue2Rpc3BsYXk6aW5saW5lLWJsb2NrO31cbn1cbiIsIi5lbGxpcHNpcyhAdzphdXRvKSB7XG4gICAgd2lkdGg6IEB3O1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICB3b3JkLXdyYXA6IG5vcm1hbDtcbn1cblxuLmVsbGlwc2lzTG4oQGxpbmUpIHtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICAgIGRpc3BsYXk6IC13ZWJraXQtYm94O1xuICAgIC13ZWJraXQtYm94LW9yaWVudDogdmVydGljYWw7XG4gICAgLXdlYmtpdC1saW5lLWNsYW1wOiBAbGluZTtcbn1cbi50ZXh0X3dyYXAoKSB7XG4gICAgd29yZC13cmFwOmJyZWFrLXdvcmQ7XG4gICAgd29yZC1icmVhazpicmVhay1hbGw7XG59XG4uaHlwaGVucygpIHtcbiAgICB3b3JkLXdyYXA6YnJlYWstd29yZDtcbiAgICAtd2Via2l0LWh5cGhlbnM6YXV0bztcbiAgICBoeXBoZW5zOmF1dG87XG59IiwiQGltcG9ydCBcIi4uLy4uLy4uL2Jhc2UvZm5cIjtcblxuLndldWktZm9ybS1wcmV2aWV3e1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZGRkZGO1xuICAgICY6YmVmb3Jle1xuICAgICAgICAuc2V0VG9wTGluZShAd2V1aUNlbGxCb3JkZXJDb2xvcik7XG4gICAgfVxuICAgICY6YWZ0ZXJ7XG4gICAgICAgIC5zZXRCb3R0b21MaW5lKEB3ZXVpQ2VsbEJvcmRlckNvbG9yKTtcbiAgICB9XG59XG4ud2V1aS1mb3JtLXByZXZpZXdfX2hke1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBwYWRkaW5nOiBAd2V1aUNlbGxHYXBWIEB3ZXVpQ2VsbEdhcEg7XG4gICAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gICAgbGluZS1oZWlnaHQ6IDIuNWVtO1xuICAgICY6YWZ0ZXJ7XG4gICAgICAgIC5zZXRCb3R0b21MaW5lKEB3ZXVpQ2VsbEJvcmRlckNvbG9yKTtcbiAgICAgICAgbGVmdDogQHdldWlDZWxsR2FwSDtcbiAgICB9XG4gICAgLndldWktZm9ybS1wcmV2aWV3X192YWx1ZXtcbiAgICAgICAgZm9udC1zdHlsZTogbm9ybWFsO1xuICAgICAgICBmb250LXNpemU6IDEuNmVtO1xuICAgIH1cbn1cbi53ZXVpLWZvcm0tcHJldmlld19fYmR7XG4gICAgcGFkZGluZzogQHdldWlDZWxsR2FwViBAd2V1aUNlbGxHYXBIO1xuICAgIGZvbnQtc2l6ZTogLjllbTtcbiAgICB0ZXh0LWFsaWduOiByaWdodDtcbiAgICBjb2xvcjogQHdldWlUZXh0Q29sb3JHcmF5O1xuICAgIGxpbmUtaGVpZ2h0OiAyO1xufVxuLndldWktZm9ybS1wcmV2aWV3X19mdHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgbGluZS1oZWlnaHQ6IDUwcHg7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICAmOmFmdGVyIHtcbiAgICAgICAgLnNldFRvcExpbmUoQHdldWlEaWFsb2dMaW5lQ29sb3IpO1xuICAgIH1cbn1cbi53ZXVpLWZvcm0tcHJldmlld19faXRlbXtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xufVxuLndldWktZm9ybS1wcmV2aWV3X19sYWJlbHtcbiAgICBmbG9hdDogbGVmdDtcbiAgICBtYXJnaW4tcmlnaHQ6IDFlbTtcbiAgICBtaW4td2lkdGg6IDRlbTtcbiAgICBjb2xvcjogQHdldWlUZXh0Q29sb3JHcmF5O1xuICAgIHRleHQtYWxpZ246IGp1c3RpZnk7XG4gICAgdGV4dC1hbGlnbi1sYXN0OiBqdXN0aWZ5O1xufVxuLndldWktZm9ybS1wcmV2aWV3X192YWx1ZXtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIHdvcmQtYnJlYWs6bm9ybWFsO1xuICAgIHdvcmQtd3JhcDogYnJlYWstd29yZDtcbn1cbi53ZXVpLWZvcm0tcHJldmlld19fYnRuIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgZmxleDogMTtcbiAgICBjb2xvcjogQHdldWlEaWFsb2dMaW5rQ29sb3I7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIC5zZXRUYXBDb2xvcigpO1xuICAgIGJ1dHRvbiZ7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICBib3JkZXI6IDA7XG4gICAgICAgIG91dGxpbmU6IDA7XG4gICAgICAgIGxpbmUtaGVpZ2h0OiBpbmhlcml0O1xuICAgICAgICBmb250LXNpemU6IGluaGVyaXQ7XG4gICAgfVxuICAgICY6YWN0aXZlIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogQHdldWlEaWFsb2dMaW5rQWN0aXZlQmM7XG4gICAgfVxuICAgICY6YWZ0ZXIge1xuICAgICAgICAuc2V0TGVmdExpbmUoQHdldWlEaWFsb2dMaW5lQ29sb3IpO1xuICAgIH1cbiAgICAmOmZpcnN0LWNoaWxkIHtcbiAgICAgICAgJjphZnRlciB7XG4gICAgICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgICAgICB9XG4gICAgfVxufVxuLndldWktZm9ybS1wcmV2aWV3X19idG5fZGVmYXVsdCB7XG4gICAgY29sb3I6IEB3ZXVpVGV4dENvbG9yR3JheTtcbn1cbi53ZXVpLWZvcm0tcHJldmlld19fYnRuX3ByaW1hcnkge1xuICAgIGNvbG9yOiAjMEJCMjBDO1xufSIsIkBpbXBvcnQgXCIuLi8uLi8uLi9iYXNlL2ZuXCI7XG5cbi53ZXVpLWNlbGxfc2VsZWN0IHtcbiAgICBwYWRkaW5nOiAwO1xuICAgIC53ZXVpLXNlbGVjdCB7XG4gICAgICAgIHBhZGRpbmctcmlnaHQ6IDMwcHg7XG4gICAgfVxuICAgIC53ZXVpLWNlbGxfX2Jke1xuICAgICAgICAmOmFmdGVye1xuICAgICAgICAgICAgY29udGVudDogXCIgXCI7XG4gICAgICAgICAgICAuc2V0QXJyb3cocmlnaHQsIDZweCwgI0M4QzhDRCwgMnB4KTtcblxuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgdG9wOiA1MCU7XG4gICAgICAgICAgICByaWdodDogQHdldWlDZWxsR2FwSDtcbiAgICAgICAgICAgIG1hcmdpbi10b3A6IC00cHg7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi53ZXVpLXNlbGVjdCB7XG4gICAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xuICAgIGJvcmRlcjogMDtcbiAgICBvdXRsaW5lOiAwO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGZvbnQtc2l6ZTogaW5oZXJpdDtcbiAgICBoZWlnaHQ6IEB3ZXVpQ2VsbEhlaWdodDtcbiAgICBsaW5lLWhlaWdodDogQHdldWlDZWxsSGVpZ2h0O1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB6LWluZGV4OiAxO1xuICAgIHBhZGRpbmctbGVmdDogQHdldWlDZWxsR2FwSDtcbn1cblxuLndldWktY2VsbF9zZWxlY3QtYmVmb3JlIHtcbiAgICBwYWRkaW5nLXJpZ2h0OkB3ZXVpQ2VsbEdhcEg7XG4gICAgLndldWktc2VsZWN0e1xuICAgICAgICB3aWR0aDpAd2V1aUNlbGxMYWJlbFdpZHRoO1xuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgIH1cbiAgICAud2V1aS1jZWxsX19oZCB7XG4gICAgICAgIHBvc2l0aW9uOnJlbGF0aXZlO1xuICAgICAgICAmOmFmdGVyIHtcbiAgICAgICAgICAgIC5zZXRSaWdodExpbmUoQHdldWlDZWxsQm9yZGVyQ29sb3IpO1xuICAgICAgICB9XG4gICAgICAgICY6YmVmb3Jle1xuICAgICAgICAgICAgY29udGVudDogXCIgXCI7XG4gICAgICAgICAgICAuc2V0QXJyb3cocmlnaHQsIDZweCwgI0M4QzhDRCwgMnB4KTtcblxuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgdG9wOiA1MCU7XG4gICAgICAgICAgICByaWdodDogQHdldWlDZWxsR2FwSDtcbiAgICAgICAgICAgIG1hcmdpbi10b3A6IC00cHg7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLndldWktY2VsbF9fYmQge1xuICAgICAgICBwYWRkaW5nLWxlZnQ6QHdldWlDZWxsR2FwSDtcbiAgICAgICAgJjphZnRlcntcbiAgICAgICAgICAgIGRpc3BsYXk6bm9uZTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLndldWktY2VsbF9zZWxlY3QtYWZ0ZXIge1xuICAgIHBhZGRpbmctbGVmdDpAd2V1aUNlbGxHYXBIO1xuICAgIC53ZXVpLXNlbGVjdCB7XG4gICAgICAgIHBhZGRpbmctbGVmdDowO1xuICAgIH1cbn0iLCJAaW1wb3J0IFwiLi4vLi4vLi4vYmFzZS9mblwiO1xuXG4ud2V1aS1jZWxsX3Zjb2RlIHtcbiAgICBwYWRkaW5nLXRvcDogMDtcbiAgICBwYWRkaW5nLXJpZ2h0OiAwO1xuICAgIHBhZGRpbmctYm90dG9tOiAwO1xufVxuLndldWktdmNvZGUtaW1ne1xuICAgIG1hcmdpbi1sZWZ0OiA1cHg7XG4gICAgaGVpZ2h0OiBAd2V1aUNlbGxIZWlnaHQ7XG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbn1cblxuLndldWktdmNvZGUtYnRuIHtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgaGVpZ2h0OiBAd2V1aUNlbGxIZWlnaHQ7XG4gICAgbWFyZ2luLWxlZnQ6IDVweDtcbiAgICBwYWRkaW5nOiAwIDAuNmVtIDAgMC43ZW07XG4gICAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCBAd2V1aUxpbmVDb2xvckxpZ2h0O1xuICAgIGxpbmUtaGVpZ2h0OiBAd2V1aUNlbGxIZWlnaHQ7XG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgICBmb250LXNpemU6IEB3ZXVpQ2VsbEZvbnRTaXplO1xuICAgIGNvbG9yOiBAd2V1aURpYWxvZ0xpbmtDb2xvcjtcbiAgICBidXR0b24me1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgYm9yZGVyLXRvcDogMDtcbiAgICAgICAgYm9yZGVyLXJpZ2h0OiAwO1xuICAgICAgICBib3JkZXItYm90dG9tOiAwO1xuICAgICAgICBvdXRsaW5lOiAwO1xuICAgIH1cbiAgICAmOmFjdGl2ZSB7XG4gICAgICAgIGNvbG9yOiBkZXNhdHVyYXRlKEB3ZXVpRGlhbG9nTGlua0NvbG9yLCAzMCUpO1xuICAgIH1cbn0iLCJAaW1wb3J0IFwiLi4vLi4vYmFzZS9mblwiO1xuXG5Ad2V1aUdhbGxlcnlPcHJIZWlnaHQ6IDYwcHg7XG4ud2V1aS1nYWxsZXJ5IHtcbiAgICBkaXNwbGF5OiBub25lO1xuICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICB0b3A6IDA7XG4gICAgcmlnaHQ6IDA7XG4gICAgYm90dG9tOiAwO1xuICAgIGxlZnQ6IDA7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDAwMDtcbiAgICB6LWluZGV4OiAxMDAwO1xufVxuLndldWktZ2FsbGVyeV9faW1nIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAwO1xuICAgIHJpZ2h0OiAwO1xuICAgIGJvdHRvbTogQHdldWlHYWxsZXJ5T3BySGVpZ2h0O1xuICAgIGxlZnQ6IDA7XG4gICAgYmFja2dyb3VuZDogY2VudGVyIGNlbnRlciBuby1yZXBlYXQ7XG4gICAgYmFja2dyb3VuZC1zaXplOiBjb250YWluO1xufVxuLndldWktZ2FsbGVyeV9fb3ByIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgcmlnaHQ6IDA7XG4gICAgYm90dG9tOiAwO1xuICAgIGxlZnQ6IDA7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzBEMEQwRDtcbiAgICBjb2xvcjogI0ZGRkZGRjtcbiAgICBsaW5lLWhlaWdodDogQHdldWlHYWxsZXJ5T3BySGVpZ2h0O1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cbi53ZXVpLWdhbGxlcnlfX2RlbCB7XG4gICAgZGlzcGxheTogYmxvY2s7XG59IiwiQGltcG9ydCBcIi4uLy4uL2Jhc2UvZm5cIjtcblxuLndldWktY2VsbF9zd2l0Y2h7XG4gICAgcGFkZGluZy10b3A6IChAd2V1aUNlbGxIZWlnaHQgLSBAd2V1aVN3aXRjaEhlaWdodCkgLyAyO1xuICAgIHBhZGRpbmctYm90dG9tOiAoQHdldWlDZWxsSGVpZ2h0IC0gQHdldWlTd2l0Y2hIZWlnaHQpIC8gMjtcbn1cbi53ZXVpLXN3aXRjaHtcbiAgICBhcHBlYXJhbmNlOiBub25lO1xufVxuLndldWktc3dpdGNoLFxuLndldWktc3dpdGNoLWNwX19ib3h7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIHdpZHRoOiA1MnB4O1xuICAgIGhlaWdodDogQHdldWlTd2l0Y2hIZWlnaHQ7XG4gICAgYm9yZGVyOiAxcHggc29saWQgI0RGREZERjtcbiAgICBvdXRsaW5lOiAwO1xuICAgIGJvcmRlci1yYWRpdXM6IDE2cHg7XG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjREZERkRGO1xuICAgIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgLjFzLCBib3JkZXIgLjFzO1xuXG4gICAgJjpiZWZvcmV7XG4gICAgICAgIGNvbnRlbnQ6IFwiIFwiO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogMDtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgd2lkdGg6IDUwcHg7XG4gICAgICAgIGhlaWdodDogQHdldWlTd2l0Y2hIZWlnaHQgLSAyO1xuICAgICAgICBib3JkZXItcmFkaXVzOiAxNXB4O1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkRGREZEO1xuICAgICAgICB0cmFuc2l0aW9uOnRyYW5zZm9ybSAuMzVzIGN1YmljLWJlemllcigwLjQ1LCAxLCAwLjQsIDEpO1xuICAgIH1cbiAgICAmOmFmdGVye1xuICAgICAgICBjb250ZW50OiBcIiBcIjtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0b3A6IDA7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIHdpZHRoOiBAd2V1aVN3aXRjaEhlaWdodCAtIDI7XG4gICAgICAgIGhlaWdodDogQHdldWlTd2l0Y2hIZWlnaHQgLSAyO1xuICAgICAgICBib3JkZXItcmFkaXVzOiAxNXB4O1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZGRkZGO1xuICAgICAgICBib3gtc2hhZG93OiAwIDFweCAzcHggcmdiYSgwLCAwLCAwLCAwLjQpO1xuICAgICAgICB0cmFuc2l0aW9uOnRyYW5zZm9ybSAuMzVzIGN1YmljLWJlemllcigwLjQsIDAuNCwgMC4yNSwgMS4zNSk7XG4gICAgfVxufVxuLndldWktc3dpdGNoOmNoZWNrZWQsXG4ud2V1aS1zd2l0Y2gtY3BfX2lucHV0OmNoZWNrZWQgfiAud2V1aS1zd2l0Y2gtY3BfX2JveHtcbiAgICBib3JkZXItY29sb3I6ICMwNEJFMDI7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzA0QkUwMjtcbiAgICAmOmJlZm9yZSB7XG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMCk7XG4gICAgfVxuICAgICY6YWZ0ZXIge1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMjBweCk7XG4gICAgfVxufVxuXG4vLyDlhbzlrrlJRSBFZGdl55qE54mI5pysXG4ud2V1aS1zd2l0Y2gtY3BfX2lucHV0e1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBsZWZ0OiAtOTk5OXB4O1xufVxuLndldWktc3dpdGNoLWNwX19ib3h7XG4gICAgZGlzcGxheTogYmxvY2s7XG59IiwiQGltcG9ydCBcIi4uLy4uL2Jhc2UvZm5cIjtcblxuLndldWktdXBsb2FkZXJ7fVxuLndldWktdXBsb2FkZXJfX2hke1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgcGFkZGluZy1ib3R0b206IEB3ZXVpQ2VsbEdhcFY7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cbi53ZXVpLXVwbG9hZGVyX190aXRsZXtcbiAgICBmbGV4OiAxO1xufVxuLndldWktdXBsb2FkZXJfX2luZm97XG4gICAgY29sb3I6IEB3ZXVpVGV4dENvbG9yVGlwcztcbn1cblxuLndldWktdXBsb2FkZXJfX2Jke1xuICAgIG1hcmdpbi1ib3R0b206IEB3ZXVpQ2VsbEdhcEggLSAoQHdldWlDZWxsR2FwViArIEB3ZXVpVXBsb2FkZXJGaWxlU3BhY2luZyk7XG4gICAgbWFyZ2luLXJpZ2h0OiAtQHdldWlVcGxvYWRlckZpbGVTcGFjaW5nO1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG59XG4ud2V1aS11cGxvYWRlcl9fZmlsZXN7XG4gICAgbGlzdC1zdHlsZTogbm9uZTtcbn1cbi53ZXVpLXVwbG9hZGVyX19maWxle1xuICAgIGZsb2F0OiBsZWZ0O1xuICAgIG1hcmdpbi1yaWdodDogQHdldWlVcGxvYWRlckZpbGVTcGFjaW5nO1xuICAgIG1hcmdpbi1ib3R0b206IEB3ZXVpVXBsb2FkZXJGaWxlU3BhY2luZztcbiAgICB3aWR0aDogQHdldWlVcGxvYWRlclNpemU7XG4gICAgaGVpZ2h0OiBAd2V1aVVwbG9hZGVyU2l6ZTtcbiAgICBiYWNrZ3JvdW5kOiBuby1yZXBlYXQgY2VudGVyIGNlbnRlcjtcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xufVxuLndldWktdXBsb2FkZXJfX2ZpbGVfc3RhdHVze1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAmOmJlZm9yZXtcbiAgICAgICAgY29udGVudDogXCIgXCI7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICByaWdodDogMDtcbiAgICAgICAgYm90dG9tOiAwO1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIC41KTtcbiAgICB9XG4gICAgLndldWktdXBsb2FkZXJfX2ZpbGUtY29udGVudHtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgfVxufVxuLndldWktdXBsb2FkZXJfX2ZpbGUtY29udGVudHtcbiAgICBkaXNwbGF5OiBub25lO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDUwJTtcbiAgICBsZWZ0OiA1MCU7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XG4gICAgY29sb3I6ICNGRkZGRkY7XG4gICAgLndldWktaWNvbi13YXJue1xuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgfVxufVxuLndldWktdXBsb2FkZXJfX2lucHV0LWJveHtcbiAgICBmbG9hdDpsZWZ0O1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBtYXJnaW4tcmlnaHQ6IEB3ZXVpVXBsb2FkZXJGaWxlU3BhY2luZztcbiAgICBtYXJnaW4tYm90dG9tOiBAd2V1aVVwbG9hZGVyRmlsZVNwYWNpbmc7XG4gICAgd2lkdGg6IEB3ZXVpVXBsb2FkZXJTaXplIC0gQHdldWlVcGxvYWRlckJvcmRlcldpZHRoICogMjtcbiAgICBoZWlnaHQ6IEB3ZXVpVXBsb2FkZXJTaXplIC0gQHdldWlVcGxvYWRlckJvcmRlcldpZHRoICogMjtcbiAgICBib3JkZXI6IEB3ZXVpVXBsb2FkZXJCb3JkZXJXaWR0aCBzb2xpZCBAd2V1aVVwbG9hZGVyQm9yZGVyQ29sb3I7XG4gICAgJjpiZWZvcmUsICY6YWZ0ZXJ7XG4gICAgICAgIGNvbnRlbnQ6IFwiIFwiO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogNTAlO1xuICAgICAgICBsZWZ0OiA1MCU7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBAd2V1aVVwbG9hZGVyQm9yZGVyQ29sb3I7XG4gICAgfVxuICAgICY6YmVmb3Jle1xuICAgICAgICB3aWR0aDogQHdldWlVcGxvYWRlckJvcmRlcldpZHRoICsgMTtcbiAgICAgICAgaGVpZ2h0OiBAd2V1aVVwbG9hZGVyU2l6ZSAvIDI7XG4gICAgfVxuICAgICY6YWZ0ZXJ7XG4gICAgICAgIHdpZHRoOiBAd2V1aVVwbG9hZGVyU2l6ZSAvIDI7XG4gICAgICAgIGhlaWdodDogQHdldWlVcGxvYWRlckJvcmRlcldpZHRoICsgMTtcbiAgICB9XG4gICAgJjphY3RpdmV7XG4gICAgICAgIGJvcmRlci1jb2xvcjogQHdldWlVcGxvYWRlckFjdGl2ZUJvcmRlckNvbG9yO1xuICAgICAgICAmOmJlZm9yZSwgJjphZnRlcntcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IEB3ZXVpVXBsb2FkZXJBY3RpdmVCb3JkZXJDb2xvcjtcbiAgICAgICAgfVxuICAgIH1cbn1cbi53ZXVpLXVwbG9hZGVyX19pbnB1dHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgei1pbmRleDogMTtcbiAgICB0b3A6IDA7XG4gICAgbGVmdDogMDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgb3BhY2l0eTogMDtcbiAgICAuc2V0VGFwQ29sb3IoKTtcbn0iLCJAaW1wb3J0IFwiLi4vLi4vYmFzZS9mblwiO1xuQGltcG9ydCBcIi4uL3dldWktYnV0dG9uL3dldWktYnV0dG9uXCI7XG5cbi53ZXVpLW1zZyB7XG4gICAgcGFkZGluZy10b3A6IEB3ZXVpTXNnUGFkZGluZ1RvcDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG4ud2V1aS1tc2dfX2ljb24tYXJlYSB7XG4gICAgbWFyZ2luLWJvdHRvbTogQHdldWlNc2dJY29uR2FwO1xufVxuLndldWktbXNnX190ZXh0LWFyZWEge1xuICAgIG1hcmdpbi1ib3R0b206IEB3ZXVpTXNnVGV4dEdhcDtcbiAgICBwYWRkaW5nOjAgMjBweDtcbn1cbi53ZXVpLW1zZ19fdGV4dC1hcmVhIGF7XG4gICAgY29sb3I6QHdldWlMaW5rQ29sb3JEZWZhdWx0O1xufVxuLndldWktbXNnX190aXRsZSB7XG4gICAgbWFyZ2luLWJvdHRvbTogQHdldWlNc2dUaXRsZUdhcDtcbiAgICBmb250LXdlaWdodDogNDAwO1xuICAgIGZvbnQtc2l6ZTogMjBweDtcbn1cbi53ZXVpLW1zZ19fZGVzYyB7XG4gICAgZm9udC1zaXplOiAxNHB4O1xuICAgIGNvbG9yOiBAd2V1aVRleHRDb2xvckdyYXk7XG59XG4ud2V1aS1tc2dfX29wci1hcmVhIHtcbiAgICBtYXJnaW4tYm90dG9tOiBAd2V1aU1zZ09wckdhcDtcbn1cbi53ZXVpLW1zZ19fZXh0cmEtYXJlYSB7XG4gICAgbWFyZ2luLWJvdHRvbTogQHdldWlNc2dFeHRyYUFyZWFHYXA7XG4gICAgZm9udC1zaXplOiAxNHB4O1xuICAgIGNvbG9yOiBAd2V1aVRleHRDb2xvckdyYXk7XG4gICAgYXtjb2xvcjogQHdldWlMaW5rQ29sb3JEZWZhdWx0O31cbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi1oZWlnaHQ6IEB3ZXVpTXNnRXh0cmFBcmVhT2ZNaW5IZWlnaHQpIHtcbiAgICAud2V1aS1tc2dfX2V4dHJhLWFyZWEge1xuICAgICAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIGJvdHRvbTogMDtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICB9XG59IiwiQGltcG9ydCBcIi4uLy4uL2Jhc2UvZm5cIjtcblxuLndldWktYXJ0aWNsZSB7XG4gICAgcGFkZGluZzogMjBweCAxNXB4O1xuICAgIGZvbnQtc2l6ZTogMTVweDtcbiAgICBzZWN0aW9uIHtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMS41ZW07XG4gICAgfVxuICAgIGgxIHtcbiAgICAgICAgZm9udC1zaXplOiAxOHB4O1xuICAgICAgICBmb250LXdlaWdodDo0MDA7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IC45ZW07XG4gICAgfVxuICAgIGgyIHtcbiAgICAgICAgZm9udC1zaXplOiAxNnB4O1xuICAgICAgICBmb250LXdlaWdodDo0MDA7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IC4zNGVtO1xuICAgIH1cbiAgICBoMyB7XG4gICAgICAgIGZvbnQtd2VpZ2h0OjQwMDtcbiAgICAgICAgZm9udC1zaXplOiAxNXB4O1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAuMzRlbTtcbiAgICB9XG4gICAgKiB7XG4gICAgICAgIG1heC13aWR0aDogMTAwJTtcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgd29yZC13cmFwOiBicmVhay13b3JkO1xuICAgIH1cbiAgICBwIHtcbiAgICAgICAgbWFyZ2luOiAwIDAgLjhlbTtcbiAgICB9XG59IiwiQGltcG9ydCBcIi4uLy4uL2Jhc2UvZm5cIjtcblxuLndldWktdGFiYmFyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB6LWluZGV4OiA1MDA7XG4gICAgYm90dG9tOiAwO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNGN0Y3RkE7XG5cbiAgICAmOmJlZm9yZSB7XG4gICAgICAgIC5zZXRUb3BMaW5lKCNDMEJGQzQpO1xuICAgIH1cbn1cblxuLndldWktdGFiYmFyX19pdGVtIHtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICBmbGV4OiAxO1xuICAgIHBhZGRpbmc6IDVweCAwIDA7XG4gICAgZm9udC1zaXplOiAwO1xuICAgIGNvbG9yOiBAd2V1aVRleHRDb2xvckdyYXk7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIC5zZXRUYXBDb2xvcigpO1xuXG4gICAgJi53ZXVpLWJhcl9faXRlbV9vbiB7XG4gICAgICAgIC53ZXVpLXRhYmJhcl9faWNvbixcbiAgICAgICAgLndldWktdGFiYmFyX19pY29uID4gaSxcbiAgICAgICAgLndldWktdGFiYmFyX19sYWJlbCB7XG4gICAgICAgICAgICBjb2xvcjogIzA5QkIwNztcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLndldWktdGFiYmFyX19pY29uIHtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgd2lkdGg6IDI3cHg7XG4gICAgaGVpZ2h0OiAyN3B4O1xuXG4gICAgaSYsXG4gICAgPiBpIHtcbiAgICAgICAgZm9udC1zaXplOiAyNHB4O1xuICAgICAgICBjb2xvcjogQHdldWlUZXh0Q29sb3JHcmF5O1xuICAgIH1cblxuICAgIGltZyB7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgfVxufVxuXG4ud2V1aS10YWJiYXJfX2xhYmVsIHtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgY29sb3I6IEB3ZXVpVGV4dENvbG9yR3JheTtcbiAgICBmb250LXNpemU6IDEwcHg7XG4gICAgbGluZS1oZWlnaHQ6IDEuODtcbn0iLCJAaW1wb3J0IFwiLi4vLi4vYmFzZS9mblwiO1xuXG4ud2V1aS1uYXZiYXIge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHotaW5kZXg6IDUwMDtcbiAgICB0b3A6IDA7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0ZBRkFGQTtcblxuICAgICY6YWZ0ZXIge1xuICAgICAgICAuc2V0Qm90dG9tTGluZSgjQ0NDQ0NDKTtcbiAgICB9XG5cbiAgICAmICsgLndldWktdGFiX19wYW5lbCB7XG4gICAgICAgIHBhZGRpbmctdG9wOiA1MHB4O1xuICAgICAgICBwYWRkaW5nLWJvdHRvbTogMDtcbiAgICB9XG59XG5cbi53ZXVpLW5hdmJhcl9faXRlbSB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIGZsZXg6IDE7XG4gICAgcGFkZGluZzogMTNweCAwO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBmb250LXNpemU6IDE1cHg7XG4gICAgLnNldFRhcENvbG9yKCk7XG5cbiAgICAmOmFjdGl2ZSB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNFREVERUQ7XG4gICAgfVxuXG4gICAgJi53ZXVpLWJhcl9faXRlbV9vbiB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNFQUVBRUE7XG4gICAgfVxuXG4gICAgJjphZnRlciB7XG4gICAgICAgIC5zZXRSaWdodExpbmUoI0NDQ0NDQyk7XG4gICAgfVxuXG4gICAgJjpsYXN0LWNoaWxkIHtcbiAgICAgICAgJjphZnRlciB7XG4gICAgICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgICAgICB9XG4gICAgfVxufSIsIkBpbXBvcnQgXCIuLi8uLi9iYXNlL2ZuXCI7XG5AaW1wb3J0IFwid2V1aS10YWJiYXJcIjtcbkBpbXBvcnQgXCJ3ZXVpLW5hdmJhclwiO1xuXG4ud2V1aS10YWIge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBoZWlnaHQ6IDEwMCU7XG59XG5cbi53ZXVpLXRhYl9fcGFuZWwge1xuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIHBhZGRpbmctYm90dG9tOiA1MHB4O1xuICAgIG92ZXJmbG93OiBhdXRvO1xuICAgIC13ZWJraXQtb3ZlcmZsb3ctc2Nyb2xsaW5nOiB0b3VjaDtcbn1cbi53ZXVpLXRhYl9fY29udGVudHtcbiAgICBkaXNwbGF5OiBub25lO1xufSIsIkBpbXBvcnQgXCIuLi8uLi9iYXNlL2ZuXCI7XG5cbi53ZXVpLXByb2dyZXNzIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbi53ZXVpLXByb2dyZXNzX19iYXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6IEB3ZXVpUHJvZ3Jlc3NCZztcbiAgICBoZWlnaHQ6IEB3ZXVpUHJvZ3Jlc3NIZWlnaHQ7XG4gICAgZmxleDogMTtcbn1cblxuLndldWktcHJvZ3Jlc3NfX2lubmVyLWJhciB7XG4gICAgd2lkdGg6IDA7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIGJhY2tncm91bmQtY29sb3I6IEB3ZXVpUHJvZ3Jlc3NDb2xvcjtcbn1cblxuLndldWktcHJvZ3Jlc3NfX29wciB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgbWFyZ2luLWxlZnQ6IDE1cHg7XG4gICAgZm9udC1zaXplOiAwO1xufSIsIkBpbXBvcnQgXCIuLi8uLi9iYXNlL2ZuXCI7XG5cblxuLndldWktcGFuZWwge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNGRkZGRkY7XG4gICAgbWFyZ2luLXRvcDogMTBweDtcbiAgICAmOmZpcnN0LWNoaWxkIHtcbiAgICAgICAgbWFyZ2luLXRvcDogMDtcbiAgICB9XG5cbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAmOmJlZm9yZSB7XG4gICAgICAgIC5zZXRUb3BMaW5lKEB3ZXVpTGluZUNvbG9yTGlnaHQpO1xuICAgIH1cbiAgICAmOmFmdGVyIHtcbiAgICAgICAgLnNldEJvdHRvbUxpbmUoQHdldWlMaW5lQ29sb3JMaWdodCk7XG4gICAgfVxufVxuXG4ud2V1aS1wYW5lbF9faGQge1xuICAgIHBhZGRpbmc6IDE0cHggMTVweCAxMHB4O1xuICAgIGNvbG9yOiBAd2V1aVRleHRDb2xvckdyYXk7XG4gICAgZm9udC1zaXplOiAxM3B4O1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAmOmFmdGVyIHtcbiAgICAgICAgLnNldEJvdHRvbUxpbmUoQHdldWlMaW5lQ29sb3JMaWdodCk7XG4gICAgICAgIGxlZnQ6IDE1cHg7XG4gICAgfVxufVxuXG5cblxuXG4iLCJAaW1wb3J0IFwiLi4vLi4vYmFzZS9mblwiO1xuXG4ud2V1aS1tZWRpYS1ib3gge1xuICAgIHBhZGRpbmc6IDE1cHg7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICY6YmVmb3JlIHtcbiAgICAgICAgLnNldFRvcExpbmUoQHdldWlMaW5lQ29sb3JMaWdodCk7XG4gICAgICAgIGxlZnQ6IDE1cHg7XG4gICAgfVxuICAgICY6Zmlyc3QtY2hpbGQge1xuICAgICAgICAmOmJlZm9yZSB7XG4gICAgICAgICAgICBkaXNwbGF5OiBub25lXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhJntcbiAgICAgICAgY29sb3I6IzAwMDAwMDtcbiAgICAgICAgLnNldFRhcENvbG9yKCk7XG4gICAgICAgICY6YWN0aXZle1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjojRUNFQ0VDO1xuICAgICAgICB9XG4gICAgfVxufVxuLndldWktbWVkaWEtYm94X190aXRsZSB7XG4gICAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgICBmb250LXNpemU6IDE3cHg7XG4gICAgLmVsbGlwc2lzKCk7XG4gICAgd29yZC13cmFwOiBicmVhay13b3JkO1xuICAgIHdvcmQtYnJlYWs6IGJyZWFrLWFsbDtcbn1cbi53ZXVpLW1lZGlhLWJveF9fZGVzYyB7XG4gICAgY29sb3I6IEB3ZXVpVGV4dENvbG9yR3JheTtcbiAgICBmb250LXNpemU6IDEzcHg7XG4gICAgbGluZS1oZWlnaHQ6IDEuMjtcbiAgICAuZWxsaXBzaXNMbigyKTtcbn1cbi53ZXVpLW1lZGlhLWJveF9faW5mbyB7XG4gICAgbWFyZ2luLXRvcDogMTVweDtcbiAgICBwYWRkaW5nLWJvdHRvbTogNXB4O1xuICAgIGZvbnQtc2l6ZTogMTNweDtcbiAgICBjb2xvcjogI0NFQ0VDRTtcbiAgICBsaW5lLWhlaWdodDogMWVtO1xuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cbi53ZXVpLW1lZGlhLWJveF9faW5mb19fbWV0YSB7XG4gICAgZmxvYXQ6IGxlZnQ7XG4gICAgcGFkZGluZy1yaWdodDogMWVtO1xufVxuLndldWktbWVkaWEtYm94X19pbmZvX19tZXRhX2V4dHJhIHtcbiAgICBwYWRkaW5nLWxlZnQ6IDFlbTtcbiAgICBib3JkZXItbGVmdDogMXB4IHNvbGlkICNDRUNFQ0U7XG59XG4ud2V1aS1tZWRpYS1ib3hfdGV4dCB7XG4gICAgLndldWktbWVkaWEtYm94X190aXRsZSB7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDhweDtcbiAgICB9XG59XG4ud2V1aS1tZWRpYS1ib3hfYXBwbXNnIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgLndldWktbWVkaWEtYm94X19oZCB7XG4gICAgICAgIG1hcmdpbi1yaWdodDogLjhlbTtcbiAgICAgICAgd2lkdGg6IDYwcHg7XG4gICAgICAgIGhlaWdodDogNjBweDtcbiAgICAgICAgbGluZS1oZWlnaHQ6IDYwcHg7XG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICB9XG4gICAgLndldWktbWVkaWEtYm94X190aHVtYiB7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBtYXgtaGVpZ2h0OiAxMDAlO1xuICAgICAgICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xuICAgIH1cbiAgICAud2V1aS1tZWRpYS1ib3hfX2JkIHtcbiAgICAgICAgZmxleDogMTtcbiAgICAgICAgbWluLXdpZHRoOiAwO1xuICAgIH1cbn1cbi53ZXVpLW1lZGlhLWJveF9zbWFsbC1hcHBtc2cge1xuICAgIHBhZGRpbmc6IDA7XG4gICAgLndldWktY2VsbHMge1xuICAgICAgICBtYXJnaW4tdG9wOiAwO1xuICAgICAgICAmOmJlZm9yZSB7XG4gICAgICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgICAgICB9XG4gICAgfVxufSIsIkBpbXBvcnQgXCIuLi8uLi9iYXNlL2ZuXCI7XG5cbi53ZXVpLWdyaWRzIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcblxuICAgICY6YmVmb3JlIHtcbiAgICAgICAgLnNldFRvcExpbmUoQHdldWlHcmlkQm9yZGVyQ29sb3IpO1xuICAgIH1cbiAgICAmOmFmdGVyIHtcbiAgICAgICAgLnNldExlZnRMaW5lKEB3ZXVpR3JpZEJvcmRlckNvbG9yKTtcbiAgICB9XG59XG5cbi53ZXVpLWdyaWQge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBmbG9hdDogbGVmdDtcbiAgICBwYWRkaW5nOiAyMHB4IDEwcHg7XG4gICAgd2lkdGg6IDEwMCUgLyBAd2V1aUdyaWRDb2x1bW5Db3VudDtcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuXG4gICAgJjpiZWZvcmUge1xuICAgICAgICAuc2V0UmlnaHRMaW5lKEB3ZXVpR3JpZEJvcmRlckNvbG9yKTtcbiAgICB9XG4gICAgJjphZnRlciB7XG4gICAgICAgIC5zZXRCb3R0b21MaW5lKEB3ZXVpR3JpZEJvcmRlckNvbG9yKTtcbiAgICB9XG5cbiAgICAmOmFjdGl2ZSB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IEB3ZXVpQmdDb2xvckFjdGl2ZTtcbiAgICB9XG59XG5cbi53ZXVpLWdyaWRfX2ljb24ge1xuICAgIHdpZHRoOiBAd2V1aUdyaWRJY29uU2l6ZTtcbiAgICBoZWlnaHQ6IEB3ZXVpR3JpZEljb25TaXplO1xuICAgIG1hcmdpbjogMCBhdXRvO1xuXG4gICAgaW1nIHtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgfVxuXG4gICAgJiArIC53ZXVpLWdyaWRfX2xhYmVse1xuICAgICAgICBtYXJnaW4tdG9wOiA1cHg7XG4gICAgfVxufVxuXG4ud2V1aS1ncmlkX19sYWJlbCB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGNvbG9yOiBAd2V1aVRleHRDb2xvclRpdGxlO1xuICAgIGZvbnQtc2l6ZTogQHdldWlHcmlkRm9udFNpemU7XG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xufVxuIiwiQGltcG9ydCBcIi4uLy4uL2Jhc2UvZm5cIjtcblxuLndldWktZm9vdGVyIHtcbiAgICBjb2xvcjogQHdldWlUZXh0Q29sb3JHcmF5O1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgYXtcbiAgICAgICAgY29sb3I6IEB3ZXVpTGlua0NvbG9yRGVmYXVsdDtcbiAgICB9XG59XG4ud2V1aS1mb290ZXJfZml4ZWQtYm90dG9te1xuICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICBib3R0b206IC41MmVtO1xuICAgIGxlZnQ6IDA7XG4gICAgcmlnaHQ6IDA7XG59XG4ud2V1aS1mb290ZXJfX2xpbmtze1xuICAgIGZvbnQtc2l6ZTogMDtcbn1cbi53ZXVpLWZvb3Rlcl9fbGlua3tcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgdmVydGljYWwtYWxpZ246IHRvcDtcbiAgICBtYXJnaW46IDAgLjYyZW07XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICAmOmJlZm9yZXtcbiAgICAgICAgLnNldExlZnRMaW5lKCk7XG4gICAgICAgIGxlZnQ6IC0uNjVlbTtcbiAgICAgICAgdG9wOiAuMzZlbTtcbiAgICAgICAgYm90dG9tOiAuMzZlbTtcbiAgICB9XG4gICAgJjpmaXJzdC1jaGlsZHtcbiAgICAgICAgJjpiZWZvcmV7XG4gICAgICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgICAgICB9XG4gICAgfVxufVxuLndldWktZm9vdGVyX190ZXh0e1xuICAgIHBhZGRpbmc6IDAgLjM0ZW07XG4gICAgZm9udC1zaXplOiAxMnB4O1xufSIsIkBpbXBvcnQgXCIuLi8uLi9iYXNlL2ZuXCI7XG5cbi53ZXVpLWZsZXgge1xuICAgIGRpc3BsYXk6IGZsZXg7XG59XG4ud2V1aS1mbGV4X19pdGVte1xuICAgIGZsZXg6IDE7XG59IiwiQGltcG9ydCBcIi4uLy4uL2Jhc2UvZm5cIjtcblxuLndldWktZGlhbG9nIHtcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgei1pbmRleDogNTAwMDtcbiAgICB3aWR0aDogODAlO1xuICAgIG1heC13aWR0aDogMzAwcHg7XG4gICAgdG9wOiA1MCU7XG4gICAgbGVmdDogNTAlO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xuXG4gICAgYmFja2dyb3VuZC1jb2xvcjogQHdldWlEaWFsb2dCYWNrZ3JvdW5kQ29sb3I7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGJvcmRlci1yYWRpdXM6IDNweDtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xufVxuLndldWktZGlhbG9nX19oZCB7XG4gICAgcGFkZGluZzogMS4zZW0gQHdldWlEaWFsb2dHYXBXaWR0aCAuNWVtO1xufVxuLndldWktZGlhbG9nX190aXRsZSB7XG4gICAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgICBmb250LXNpemU6IDE4cHg7XG59XG4ud2V1aS1kaWFsb2dfX2JkIHtcbiAgICBwYWRkaW5nOiAwIEB3ZXVpRGlhbG9nR2FwV2lkdGggLjhlbTtcbiAgICBtaW4taGVpZ2h0OiA0MHB4O1xuICAgIGZvbnQtc2l6ZTogMTVweDtcbiAgICBsaW5lLWhlaWdodDogMS4zO1xuICAgIHdvcmQtd3JhcDogYnJlYWstd29yZDtcbiAgICB3b3JkLWJyZWFrOiBicmVhay1hbGw7XG4gICAgY29sb3I6IEB3ZXVpVGV4dENvbG9yR3JheTtcbiAgICAmOmZpcnN0LWNoaWxke1xuICAgICAgICBwYWRkaW5nOjIuN2VtIDIwcHggMS43ZW07XG4gICAgICAgIGNvbG9yOiMzNTM1MzU7XG4gICAgfVxufVxuLndldWktZGlhbG9nX19mdCB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGxpbmUtaGVpZ2h0OiA0OHB4O1xuICAgIGZvbnQtc2l6ZTogMThweDtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgICY6YWZ0ZXIge1xuICAgICAgICBjb250ZW50OiBcIiBcIjtcbiAgICAgICAgLnNldFRvcExpbmUoQHdldWlEaWFsb2dMaW5lQ29sb3IpO1xuICAgIH1cbn1cbi53ZXVpLWRpYWxvZ19fYnRuIHtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICBmbGV4OiAxO1xuICAgIGNvbG9yOiBAd2V1aURpYWxvZ0xpbmtDb2xvcjtcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gICAgLnNldFRhcENvbG9yKCk7XG4gICAgJjphY3RpdmUge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBAd2V1aURpYWxvZ0xpbmtBY3RpdmVCYztcbiAgICB9XG5cbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgJjphZnRlciB7XG4gICAgICAgIGNvbnRlbnQ6IFwiIFwiO1xuICAgICAgICAuc2V0TGVmdExpbmUoQHdldWlEaWFsb2dMaW5lQ29sb3IpO1xuICAgIH1cbiAgICAmOmZpcnN0LWNoaWxkIHtcbiAgICAgICAgJjphZnRlciB7XG4gICAgICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgICAgICB9XG4gICAgfVxufVxuLndldWktZGlhbG9nX19idG5fZGVmYXVsdCB7XG4gICAgY29sb3I6ICMzNTM1MzU7XG59XG4ud2V1aS1kaWFsb2dfX2J0bl9wcmltYXJ5IHtcbiAgICBjb2xvcjogIzBCQjIwQztcbn1cblxuLndldWktc2tpbl9hbmRyb2lke1xuICAgIC53ZXVpLWRpYWxvZyB7XG4gICAgICAgIHRleHQtYWxpZ246IGxlZnQ7XG4gICAgICAgIGJveC1zaGFkb3c6IDAgNnB4IDMwcHggMCByZ2JhKDAsIDAsIDAsIC4xKTtcbiAgICB9XG4gICAgLndldWktZGlhbG9nX190aXRsZXtcbiAgICAgICAgZm9udC1zaXplOiAyMXB4O1xuICAgIH1cbiAgICAud2V1aS1kaWFsb2dfX2hke1xuICAgICAgICB0ZXh0LWFsaWduOiBsZWZ0O1xuICAgIH1cbiAgICAud2V1aS1kaWFsb2dfX2Jke1xuICAgICAgICBjb2xvcjpAd2V1aVRleHRDb2xvckdyYXk7XG4gICAgICAgIHBhZGRpbmc6LjI1ZW0gQHdldWlEaWFsb2dHYXBXaWR0aCAyZW07XG4gICAgICAgIGZvbnQtc2l6ZTogMTdweDtcbiAgICAgICAgdGV4dC1hbGlnbjogbGVmdDtcbiAgICAgICAgJjpmaXJzdC1jaGlsZHtcbiAgICAgICAgICAgIHBhZGRpbmc6MS42ZW0gQHdldWlEaWFsb2dHYXBXaWR0aCAyZW07XG4gICAgICAgICAgICBjb2xvcjojMzUzNTM1O1xuICAgICAgICB9XG4gICAgfVxuICAgIC53ZXVpLWRpYWxvZ19fZnR7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICB0ZXh0LWFsaWduOiByaWdodDtcbiAgICAgICAgbGluZS1oZWlnaHQ6IDQycHg7XG4gICAgICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICAgICAgcGFkZGluZzowIEB3ZXVpRGlhbG9nR2FwV2lkdGggLjdlbTtcbiAgICAgICAgJjphZnRlcntcbiAgICAgICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLndldWktZGlhbG9nX19idG57XG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgdmVydGljYWwtYWxpZ246IHRvcDtcbiAgICAgICAgcGFkZGluZzowIC44ZW07XG4gICAgICAgICY6YWZ0ZXJ7XG4gICAgICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgICAgICB9XG5cbiAgICAgICAgJjphY3RpdmV7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsMCwwLC4wNik7XG4gICAgICAgIH1cbiAgICAgICAgJjp2aXNpdGVke1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLDAsMCwuMDYpO1xuICAgICAgICB9XG4gICAgICAgICY6bGFzdC1jaGlsZHtcbiAgICAgICAgICAgIG1hcmdpbi1yaWdodDogLS44ZW07XG4gICAgICAgIH1cbiAgICB9XG4gICAgLndldWktZGlhbG9nX19idG5fZGVmYXVsdCB7XG4gICAgICAgIGNvbG9yOiAjODA4MDgwO1xuICAgIH1cbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMTAyNHB4KSB7XG4gICAgLndldWktZGlhbG9nIHtcbiAgICAgICAgd2lkdGg6IDM1JTtcbiAgICB9XG59XG4iLCJAaW1wb3J0IFwiLi4vLi4vYmFzZS9mblwiO1xuXG4ud2V1aS10b2FzdCB7XG4gICAgcG9zaXRpb246IGZpeGVkO1xuICAgIHotaW5kZXg6IDUwMDA7XG4gICAgd2lkdGg6IDcuNmVtO1xuICAgIG1pbi1oZWlnaHQ6IDcuNmVtO1xuICAgIHRvcDogMTgwcHg7XG4gICAgbGVmdDogNTAlO1xuICAgIG1hcmdpbi1sZWZ0OiAtMy44ZW07XG4gICAgYmFja2dyb3VuZDogcmdiYSgxNywxNywxNywwLjcpO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XG4gICAgY29sb3I6ICNGRkZGRkY7XG59XG4ud2V1aS1pY29uX3RvYXN0IHtcbiAgICBtYXJnaW46IDIycHggMCAwO1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICYud2V1aS1pY29uLXN1Y2Nlc3Mtbm8tY2lyY2xle1xuICAgICAgJjpiZWZvcmUge1xuICAgICAgICAgIGNvbG9yOiAjRkZGRkZGO1xuICAgICAgICAgIGZvbnQtc2l6ZTogNTVweDtcbiAgICAgIH1cbiAgICB9XG4gICAgJi53ZXVpLWxvYWRpbmd7XG4gICAgICBtYXJnaW46MzBweCAwIDA7XG4gICAgICB3aWR0aDozOHB4O1xuICAgICAgaGVpZ2h0OjM4cHg7XG4gICAgICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XG4gICAgfVxufVxuXG4ud2V1aS10b2FzdF9fY29udGVudCB7XG4gICAgbWFyZ2luOiAwIDAgMTVweDtcbn1cbiIsIkBpbXBvcnQgXCIuLi8uLi9iYXNlL2ZuXCI7XG5cbi53ZXVpLW1hc2sge1xuICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICB6LWluZGV4OiAxMDAwO1xuICAgIHRvcDogMDtcbiAgICByaWdodDogMDtcbiAgICBsZWZ0OiAwO1xuICAgIGJvdHRvbTogMDtcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIC42KTtcbn1cblxuLndldWktbWFza190cmFuc3BhcmVudHtcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgei1pbmRleDogMTAwMDtcbiAgICB0b3A6IDA7XG4gICAgcmlnaHQ6IDA7XG4gICAgbGVmdDogMDtcbiAgICBib3R0b206IDA7XG59IiwiQGltcG9ydCBcIi4uLy4uL2Jhc2UvZm5cIjtcbkB3ZXVpQWN0aW9uU2hlZXRBbmRyb2lkQm9yZGVyUmFkaXVzOiAycHg7XG5cbi53ZXVpLWFjdGlvbnNoZWV0IHtcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgbGVmdDogMDtcbiAgICBib3R0b206IDA7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgMTAwJSk7XG4gICAgYmFja2ZhY2UtdmlzaWJpbGl0eTogaGlkZGVuO1xuICAgIHotaW5kZXg6IDUwMDA7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogQHdldWlCZ0NvbG9yRGVmYXVsdDtcbiAgICAvL3NsaWRlIHVwIGFuaW1hdGlvblxuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAuM3M7XG59XG4ud2V1aS1hY3Rpb25zaGVldF9fbWVudXtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZGRkZGO1xufVxuLndldWktYWN0aW9uc2hlZXRfX2FjdGlvbiB7XG4gICAgbWFyZ2luLXRvcDogNnB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNGRkZGRkY7XG59XG4ud2V1aS1hY3Rpb25zaGVldF9fY2VsbCB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIHBhZGRpbmc6IDEwcHggMDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgZm9udC1zaXplOiAxOHB4O1xuICAgICY6YmVmb3JlIHtcbiAgICAgICAgLnNldFRvcExpbmUoQHdldWlDZWxsQm9yZGVyQ29sb3IpO1xuICAgIH1cbiAgICAmOmFjdGl2ZXtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogQHdldWlCZ0NvbG9yQWN0aXZlO1xuICAgIH1cbiAgICAmOmZpcnN0LWNoaWxke1xuICAgICAgICAmOmJlZm9yZXtcbiAgICAgICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuLy9hbmRyb2lkIGFjdGlvblNoZWV0XG4ud2V1aS1za2luX2FuZHJvaWR7XG4gICAgLndldWktYWN0aW9uc2hlZXQge1xuICAgICAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgICAgIGxlZnQ6IDUwJTtcbiAgICAgICAgdG9wOiA1MCU7XG4gICAgICAgIGJvdHRvbTogYXV0bztcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XG4gICAgICAgIC8vcGFkZGluZzogMCA0MHB4O1xuICAgICAgICB3aWR0aDogMjc0cHg7XG4gICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICAgIGJhY2tmYWNlLXZpc2liaWxpdHk6IGhpZGRlbjtcbiAgICAgICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gICAgICAgIC8vc2xpZGUgdXAgYW5pbWF0aW9uXG4gICAgICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAuM3M7XG4gICAgfVxuICAgIC53ZXVpLWFjdGlvbnNoZWV0X19hY3Rpb257XG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgfVxuICAgIC53ZXVpLWFjdGlvbnNoZWV0X19tZW51IHtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogQHdldWlBY3Rpb25TaGVldEFuZHJvaWRCb3JkZXJSYWRpdXM7XG4gICAgICAgIGJveC1zaGFkb3c6IDAgNnB4IDMwcHggMCByZ2JhKDAsMCwwLC4xKTtcbiAgICB9XG4gICAgLndldWktYWN0aW9uc2hlZXRfX2NlbGwge1xuICAgICAgICBwYWRkaW5nOiAxM3B4IDI0cHg7XG4gICAgICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICAgICAgbGluZS1oZWlnaHQ6IDEuNDtcbiAgICAgICAgdGV4dC1hbGlnbjogbGVmdDtcbiAgICAgICAgJjpmaXJzdC1jaGlsZCB7XG4gICAgICAgICAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiBAd2V1aUFjdGlvblNoZWV0QW5kcm9pZEJvcmRlclJhZGl1cztcbiAgICAgICAgICAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiBAd2V1aUFjdGlvblNoZWV0QW5kcm9pZEJvcmRlclJhZGl1cztcbiAgICAgICAgfVxuICAgICAgICAmOmxhc3QtY2hpbGQge1xuICAgICAgICAgICAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogQHdldWlBY3Rpb25TaGVldEFuZHJvaWRCb3JkZXJSYWRpdXM7XG4gICAgICAgICAgICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogQHdldWlBY3Rpb25TaGVldEFuZHJvaWRCb3JkZXJSYWRpdXM7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8vYWN0aW9uU2hlZXQgYW5pYW10aW9uXG4ud2V1aS1hY3Rpb25zaGVldF90b2dnbGV7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgMCk7XG59IiwiQGltcG9ydCBcIi4uLy4uL2Jhc2UvZm5cIjtcblxuLndldWktbG9hZG1vcmV7XG4gICAgd2lkdGg6IDY1JTtcbiAgICBtYXJnaW46MS41ZW0gYXV0bztcbiAgICBsaW5lLWhlaWdodDogMS42ZW07XG4gICAgZm9udC1zaXplOjE0cHg7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuLndldWktbG9hZG1vcmVfX3RpcHN7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG59XG5cbi53ZXVpLWxvYWRtb3JlX2xpbmV7XG4gICAgYm9yZGVyLXRvcDoxcHggc29saWQgQHdldWlMaW5lQ29sb3JMaWdodDtcbiAgICBtYXJnaW4tdG9wOjIuNGVtO1xuICAgIC53ZXVpLWxvYWRtb3JlX190aXBze1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIHRvcDotLjllbTtcbiAgICAgICAgcGFkZGluZzowIC41NWVtO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZGRkZGO1xuICAgICAgICBjb2xvcjpAd2V1aVRleHRDb2xvckdyYXk7XG4gICAgfVxufVxuLndldWktbG9hZG1vcmVfZG90e1xuICAgIC53ZXVpLWxvYWRtb3JlX190aXBze1xuICAgICAgICBwYWRkaW5nOjAgLjE2ZW07XG4gICAgICAgICY6YmVmb3Jle1xuICAgICAgICAgICAgY29udGVudDogXCIgXCI7XG4gICAgICAgICAgICB3aWR0aDo0cHg7XG4gICAgICAgICAgICBoZWlnaHQ6NHB4O1xuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czo1MCU7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBAd2V1aUxpbmVDb2xvckxpZ2h0O1xuICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICAgICAgdmVydGljYWwtYWxpZ246IDA7XG4gICAgICAgICAgICB0b3A6LS4xNmVtO1xuICAgICAgICB9XG4gICAgfVxufSIsIkBpbXBvcnQgXCIuLi8uLi9iYXNlL2ZuXCI7XG5cbi53ZXVpLWJhZGdlIHtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgcGFkZGluZzogLjE1ZW0gLjRlbTtcbiAgICBtaW4td2lkdGg6IDhweDtcbiAgICBib3JkZXItcmFkaXVzOiAxOHB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNGNDM1MzA7XG4gICAgY29sb3I6ICNGRkZGRkY7XG4gICAgbGluZS1oZWlnaHQ6IDEuMjtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgZm9udC1zaXplOiAxMnB4O1xuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG59XG4ud2V1aS1iYWRnZV9kb3Qge1xuICAgIHBhZGRpbmc6IC40ZW07XG4gICAgbWluLXdpZHRoOiAwO1xufSIsIkBpbXBvcnQgXCIuLi8uLi9iYXNlL2ZuXCI7XG4ud2V1aS1zZWFyY2gtYmFyIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgcGFkZGluZzogOHB4IDEwcHg7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNFRkVGRjQ7XG4gICAgJjpiZWZvcmUge1xuICAgICAgICAuc2V0VG9wTGluZSgjRDdENkRDKTtcbiAgICB9XG4gICAgJjphZnRlciB7XG4gICAgICAgIC5zZXRCb3R0b21MaW5lKCNEN0Q2REMpO1xuICAgIH1cbiAgICAmLndldWktc2VhcmNoLWJhcl9mb2N1c2luZ3tcbiAgICAgICAgLndldWktc2VhcmNoLWJhcl9fY2FuY2VsLWJ0bntcbiAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICB9XG4gICAgICAgIC53ZXVpLXNlYXJjaC1iYXJfX2xhYmVse1xuICAgICAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbi53ZXVpLXNlYXJjaC1iYXJfX2Zvcm0ge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBmbGV4OiBhdXRvO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNFRkVGRjQ7XG4gICAgJjphZnRlcntcbiAgICAgICAgY29udGVudDogJyc7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgdG9wOjA7XG4gICAgICAgIHdpZHRoOiAyMDAlO1xuICAgICAgICBoZWlnaHQ6IDIwMCU7XG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoLjUpO1xuICAgICAgICB0cmFuc2Zvcm0tb3JpZ2luOiAwIDA7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNFNkU2RUE7XG4gICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICAgIGJhY2tncm91bmQ6ICNGRkZGRkY7XG4gICAgfVxufVxuLndldWktc2VhcmNoLWJhcl9fYm94IHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgcGFkZGluZy1sZWZ0OiAzMHB4O1xuICAgIHBhZGRpbmctcmlnaHQ6IDMwcHg7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgei1pbmRleDogMTtcbiAgICAud2V1aS1zZWFyY2gtYmFyX19pbnB1dCB7XG4gICAgICAgIHBhZGRpbmc6IDRweCAwO1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgaGVpZ2h0OiAyMC8xNGVtO1xuICAgICAgICBib3JkZXI6IDA7XG4gICAgICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICAgICAgbGluZS1oZWlnaHQ6IDIwLzE0ZW07XG4gICAgICAgIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xuICAgICAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgICAgICAgJjpmb2N1cyB7XG4gICAgICAgICAgICBvdXRsaW5lOiBub25lO1xuICAgICAgICB9XG4gICAgfVxuICAgIC53ZXVpLWljb24tc2VhcmNoIHtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICBsZWZ0OiAxMHB4O1xuICAgICAgICB0b3A6IDA7XG4gICAgICAgIGxpbmUtaGVpZ2h0OiAyOHB4O1xuICAgIH1cbiAgICAud2V1aS1pY29uLWNsZWFyIHtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0b3A6IDA7XG4gICAgICAgIHJpZ2h0OiAwO1xuICAgICAgICBwYWRkaW5nOiAwIDEwcHg7XG4gICAgICAgIGxpbmUtaGVpZ2h0OiAyOHB4O1xuICAgIH1cbn1cbi53ZXVpLXNlYXJjaC1iYXJfX2xhYmVsIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAxcHg7XG4gICAgcmlnaHQ6IDFweDtcbiAgICBib3R0b206IDFweDtcbiAgICBsZWZ0OiAxcHg7XG4gICAgei1pbmRleDogMjtcbiAgICBib3JkZXItcmFkaXVzOiAzcHg7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGNvbG9yOiAjOUI5QjlCO1xuICAgIGJhY2tncm91bmQ6ICNGRkZGRkY7XG4gICAgc3BhbiB7XG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgICAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICAgIH1cbiAgICAud2V1aS1pY29uLXNlYXJjaCB7XG4gICAgICAgIG1hcmdpbi1yaWdodDogNXB4O1xuICAgIH1cbn1cbi53ZXVpLXNlYXJjaC1iYXJfX2NhbmNlbC1idG4ge1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgbWFyZ2luLWxlZnQ6IDEwcHg7XG4gICAgbGluZS1oZWlnaHQ6IDI4cHg7XG4gICAgY29sb3I6ICMwOUJCMDc7XG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbn1cbi53ZXVpLXNlYXJjaC1iYXJfX2lucHV0Om5vdCg6dmFsaWQpIH4gLndldWktaWNvbi1jbGVhciB7XG4gICAgZGlzcGxheTogbm9uZTtcbn1cblxuLy/lubLmjolpbnB1dFtzZWFyY2hd6buY6K6k55qEY2xlYXIgYnV0dG9uXG5pbnB1dFt0eXBlPVwic2VhcmNoXCJdOjotd2Via2l0LXNlYXJjaC1kZWNvcmF0aW9uLFxuaW5wdXRbdHlwZT1cInNlYXJjaFwiXTo6LXdlYmtpdC1zZWFyY2gtY2FuY2VsLWJ1dHRvbixcbmlucHV0W3R5cGU9XCJzZWFyY2hcIl06Oi13ZWJraXQtc2VhcmNoLXJlc3VsdHMtYnV0dG9uLFxuaW5wdXRbdHlwZT1cInNlYXJjaFwiXTo6LXdlYmtpdC1zZWFyY2gtcmVzdWx0cy1kZWNvcmF0aW9uIHtcbiAgICBkaXNwbGF5OiBub25lO1xufSIsIkBpbXBvcnQgXCIuLi8uLi9iYXNlL2ZuXCI7XG5cbi53ZXVpLXBpY2tlciB7XG4gICAgcG9zaXRpb246IGZpeGVkO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGxlZnQ6IDA7XG4gICAgYm90dG9tOiAwO1xuICAgIHotaW5kZXg6IDUwMDA7XG4gICAgYmFja2ZhY2UtdmlzaWJpbGl0eTogaGlkZGVuO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIDEwMCUpO1xuICAgIC8vc2xpZGUgdXAgYW5pbWF0aW9uXG4gICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIC4zcztcbn1cblxuLndldWktcGlja2VyX19oZCB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBwYWRkaW5nOiAxMHB4IDE1cHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZiZjlmZTtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICY6YWZ0ZXIge1xuICAgICAgICAuc2V0Qm90dG9tTGluZShAd2V1aUxpbmVDb2xvckxpZ2h0KTtcbiAgICB9XG59XG5cbi53ZXVpLXBpY2tlcl9fYWN0aW9uIHtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICBmbGV4OiAxO1xuICAgIGNvbG9yOiBAd2V1aUxpbmtDb2xvckRlZmF1bHQ7XG5cbiAgICAmOmZpcnN0LWNoaWxkIHtcbiAgICAgICAgdGV4dC1hbGlnbjogbGVmdDtcbiAgICB9XG4gICAgJjpsYXN0LWNoaWxkIHtcbiAgICAgICAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gICAgfVxufVxuXG4ud2V1aS1waWNrZXJfX2JkIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuICAgIGhlaWdodDogMjM4cHg7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cblxuLndldWktcGlja2VyX19ncm91cCB7XG4gICAgZmxleDogMTtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIC8vLXdlYmtpdC1tYXNrLWJveC1pbWFnZTogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQoYm90dG9tLHRyYW5zcGFyZW50LHRyYW5zcGFyZW50IDUlLCNmZmYgNTAlLCNmZmYgNTAlLHRyYW5zcGFyZW50IDk1JSx0cmFuc3BhcmVudCk7XG59XG5cbi53ZXVpLXBpY2tlcl9fbWFzayB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogMDtcbiAgICBsZWZ0OiAwO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMTAwJTtcbiAgICBtYXJnaW46IDAgYXV0bztcbiAgICB6LWluZGV4OiAzO1xuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxODBkZWcsIGhzbGEoMCwgMCUsIDEwMCUsIC45NSksIGhzbGEoMCwgMCUsIDEwMCUsIC42KSksIGxpbmVhci1ncmFkaWVudCgwZGVnLCBoc2xhKDAsIDAlLCAxMDAlLCAuOTUpLCBoc2xhKDAsIDAlLCAxMDAlLCAuNikpO1xuICAgIGJhY2tncm91bmQtcG9zaXRpb246IHRvcCwgYm90dG9tO1xuICAgIGJhY2tncm91bmQtc2l6ZTogMTAwJSAxMDJweDtcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWigwKTtcbn1cblxuLndldWktcGlja2VyX19pbmRpY2F0b3Ige1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMzRweDtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgbGVmdDogMDtcbiAgICB0b3A6IDEwMnB4O1xuICAgIHotaW5kZXg6IDM7XG4gICAgJjpiZWZvcmUge1xuICAgICAgICAuc2V0VG9wTGluZShAd2V1aUxpbmVDb2xvckxpZ2h0KTtcbiAgICB9XG4gICAgJjphZnRlciB7XG4gICAgICAgIC5zZXRCb3R0b21MaW5lKEB3ZXVpTGluZUNvbG9yTGlnaHQpO1xuICAgIH1cbn1cblxuLndldWktcGlja2VyX19jb250ZW50IHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAwO1xuICAgIGxlZnQ6IDA7XG4gICAgd2lkdGg6IDEwMCU7XG59XG5cbi53ZXVpLXBpY2tlcl9faXRlbSB7XG4gICAgcGFkZGluZzogNXB4IDAgNHB4O1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBjb2xvcjogIzAwMDtcbiAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG59XG5cbi53ZXVpLXBpY2tlcl9faXRlbV9kaXNhYmxlZCB7XG4gICAgY29sb3I6IEB3ZXVpVGV4dENvbG9yR3JheTtcbn0iLCJAaW1wb3J0IFwiLi4vLi4vYmFzZS9mblwiO1xuXG5Aa2V5ZnJhbWVzIHNsaWRlVXAge1xuICAgIGZyb20ge1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDAsIDEwMCUsIDApO1xuICAgIH1cblxuICAgIHRvIHtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCAwLCAwKTtcbiAgICB9XG59XG5cbi53ZXVpLWFuaW1hdGUtc2xpZGUtdXAge1xuICAgIGFuaW1hdGlvbjogc2xpZGVVcCBlYXNlIC4zcyBmb3J3YXJkcztcbn1cblxuQGtleWZyYW1lcyBzbGlkZURvd24ge1xuICAgIGZyb20ge1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDAsIDAsIDApO1xuICAgIH1cblxuICAgIHRvIHtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCAxMDAlLCAwKTtcbiAgICB9XG59XG5cbi53ZXVpLWFuaW1hdGUtc2xpZGUtZG93biB7XG4gICAgYW5pbWF0aW9uOiBzbGlkZURvd24gZWFzZSAuM3MgZm9yd2FyZHM7XG59XG5cbkBrZXlmcmFtZXMgZmFkZUluIHtcbiAgICBmcm9tIHtcbiAgICAgICAgb3BhY2l0eTogMDtcbiAgICB9XG4gICAgdG8ge1xuICAgICAgICBvcGFjaXR5OiAxO1xuICAgIH1cbn1cblxuLndldWktYW5pbWF0ZS1mYWRlLWluIHtcbiAgICBhbmltYXRpb246IGZhZGVJbiBlYXNlIC4zcyBmb3J3YXJkcztcbn1cblxuQGtleWZyYW1lcyBmYWRlT3V0IHtcbiAgICBmcm9tIHtcbiAgICAgICAgb3BhY2l0eTogMTtcbiAgICB9XG4gICAgdG8ge1xuICAgICAgICBvcGFjaXR5OiAwO1xuICAgIH1cbn1cblxuLndldWktYW5pbWF0ZS1mYWRlLW91dCB7XG4gICAgYW5pbWF0aW9uOiBmYWRlT3V0IGVhc2UgLjNzIGZvcndhcmRzO1xufSIsIkBpbXBvcnQgXCIuLi8uLi9iYXNlL2ZuXCI7XG5cbi53ZXVpLWFncmVle1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIHBhZGRpbmc6IC41ZW0gMTVweDtcbiAgICBmb250LXNpemUgOjEzcHg7XG5cbiAgICBhe1xuICAgICAgICBjb2xvcjogQHdldWlMaW5rQ29sb3JEZWZhdWx0O1xuICAgIH1cbn1cbi53ZXVpLWFncmVlX190ZXh0e1xuICAgIGNvbG9yOiBAd2V1aVRleHRDb2xvckdyYXk7XG59XG4ud2V1aS1hZ3JlZV9fY2hlY2tib3h7XG4gICAgYXBwZWFyYW5jZTogbm9uZTtcbiAgICBvdXRsaW5lOiAwO1xuICAgIGZvbnQtc2l6ZTogMDtcblxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNEMUQxRDE7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0ZGRkZGRjtcbiAgICBib3JkZXItcmFkaXVzOiAzcHg7XG4gICAgd2lkdGg6IDEzcHg7XG4gICAgaGVpZ2h0OiAxM3B4O1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcblxuICAgIHZlcnRpY2FsLWFsaWduOiAwO1xuICAgIHRvcDogMnB4O1xuXG4gICAgJjpjaGVja2Vke1xuICAgICAgICAmOmJlZm9yZXtcbiAgICAgICAgICAgIGZvbnQtZmFtaWx5OiBcIndldWlcIjtcbiAgICAgICAgICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gICAgICAgICAgICBmb250LXZhcmlhbnQ6IG5vcm1hbDtcbiAgICAgICAgICAgIHRleHQtdHJhbnNmb3JtOiBub25lO1xuICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICAgICAgc3BlYWs6IG5vbmU7XG4gICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgICAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICAgICAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBpbmhlcml0O1xuICAgICAgICAgICAgY29udGVudDogXCJcXEVBMDhcIjtcbiAgICAgICAgICAgIGNvbG9yOiAjMDlCQjA3O1xuICAgICAgICAgICAgZm9udC1zaXplOiAxM3B4O1xuXG4gICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgICB0b3A6IDUwJTtcbiAgICAgICAgICAgIGxlZnQ6IDUwJTtcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsLTQ4JSkgc2NhbGUoLjczKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAmOmRpc2FibGVke1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiNFMUUxRTE7XG4gICAgICAgICY6YmVmb3Jle1xuICAgICAgICAgICAgY29sb3I6I0FEQURBRDtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJAaW1wb3J0IFwiLi4vLi4vYmFzZS9mblwiO1xuXG4ud2V1aS1sb2FkaW5nIHtcbiAgd2lkdGg6MjBweDtcbiAgaGVpZ2h0OjIwcHg7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgYW5pbWF0aW9uOiB3ZXVpTG9hZGluZyAxcyBzdGVwcygxMiwgZW5kKSBpbmZpbml0ZTtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgdXJsKGRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QjRiV3h1Y3owaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1qQXdNQzl6ZG1jaUlIZHBaSFJvUFNJeE1qQWlJR2hsYVdkb2REMGlNVEl3SWlCMmFXVjNRbTk0UFNJd0lEQWdNVEF3SURFd01DSStQSEJoZEdnZ1ptbHNiRDBpYm05dVpTSWdaRDBpVFRBZ01HZ3hNREIyTVRBd1NEQjZJaTgrUEhKbFkzUWdkMmxrZEdnOUlqY2lJR2hsYVdkb2REMGlNakFpSUhnOUlqUTJMalVpSUhrOUlqUXdJaUJtYVd4c1BTSWpSVGxGT1VVNUlpQnllRDBpTlNJZ2NuazlJalVpSUhSeVlXNXpabTl5YlQwaWRISmhibk5zWVhSbEtEQWdMVE13S1NJdlBqeHlaV04wSUhkcFpIUm9QU0kzSWlCb1pXbG5hSFE5SWpJd0lpQjRQU0kwTmk0MUlpQjVQU0kwTUNJZ1ptbHNiRDBpSXprNE9UWTVOeUlnY25nOUlqVWlJSEo1UFNJMUlpQjBjbUZ1YzJadmNtMDlJbkp2ZEdGMFpTZ3pNQ0F4TURVdU9UZ2dOalVwSWk4K1BISmxZM1FnZDJsa2RHZzlJamNpSUdobGFXZG9kRDBpTWpBaUlIZzlJalEyTGpVaUlIazlJalF3SWlCbWFXeHNQU0lqT1VJNU9UbEJJaUJ5ZUQwaU5TSWdjbms5SWpVaUlIUnlZVzV6Wm05eWJUMGljbTkwWVhSbEtEWXdJRGMxTGprNElEWTFLU0l2UGp4eVpXTjBJSGRwWkhSb1BTSTNJaUJvWldsbmFIUTlJakl3SWlCNFBTSTBOaTQxSWlCNVBTSTBNQ0lnWm1sc2JEMGlJMEV6UVRGQk1pSWdjbmc5SWpVaUlISjVQU0kxSWlCMGNtRnVjMlp2Y20wOUluSnZkR0YwWlNnNU1DQTJOU0EyTlNraUx6NDhjbVZqZENCM2FXUjBhRDBpTnlJZ2FHVnBaMmgwUFNJeU1DSWdlRDBpTkRZdU5TSWdlVDBpTkRBaUlHWnBiR3c5SWlOQlFrRTVRVUVpSUhKNFBTSTFJaUJ5ZVQwaU5TSWdkSEpoYm5ObWIzSnRQU0p5YjNSaGRHVW9NVEl3SURVNExqWTJJRFkxS1NJdlBqeHlaV04wSUhkcFpIUm9QU0kzSWlCb1pXbG5hSFE5SWpJd0lpQjRQU0kwTmk0MUlpQjVQU0kwTUNJZ1ptbHNiRDBpSTBJeVFqSkNNaUlnY25nOUlqVWlJSEo1UFNJMUlpQjBjbUZ1YzJadmNtMDlJbkp2ZEdGMFpTZ3hOVEFnTlRRdU1ESWdOalVwSWk4K1BISmxZM1FnZDJsa2RHZzlJamNpSUdobGFXZG9kRDBpTWpBaUlIZzlJalEyTGpVaUlIazlJalF3SWlCbWFXeHNQU0lqUWtGQ09FSTVJaUJ5ZUQwaU5TSWdjbms5SWpVaUlIUnlZVzV6Wm05eWJUMGljbTkwWVhSbEtERTRNQ0ExTUNBMk5Ta2lMejQ4Y21WamRDQjNhV1IwYUQwaU55SWdhR1ZwWjJoMFBTSXlNQ0lnZUQwaU5EWXVOU0lnZVQwaU5EQWlJR1pwYkd3OUlpTkRNa013UXpFaUlISjRQU0kxSWlCeWVUMGlOU0lnZEhKaGJuTm1iM0p0UFNKeWIzUmhkR1VvTFRFMU1DQTBOUzQ1T0NBMk5Ta2lMejQ4Y21WamRDQjNhV1IwYUQwaU55SWdhR1ZwWjJoMFBTSXlNQ0lnZUQwaU5EWXVOU0lnZVQwaU5EQWlJR1pwYkd3OUlpTkRRa05DUTBJaUlISjRQU0kxSWlCeWVUMGlOU0lnZEhKaGJuTm1iM0p0UFNKeWIzUmhkR1VvTFRFeU1DQTBNUzR6TkNBMk5Ta2lMejQ4Y21WamRDQjNhV1IwYUQwaU55SWdhR1ZwWjJoMFBTSXlNQ0lnZUQwaU5EWXVOU0lnZVQwaU5EQWlJR1pwYkd3OUlpTkVNa1F5UkRJaUlISjRQU0kxSWlCeWVUMGlOU0lnZEhKaGJuTm1iM0p0UFNKeWIzUmhkR1VvTFRrd0lETTFJRFkxS1NJdlBqeHlaV04wSUhkcFpIUm9QU0kzSWlCb1pXbG5hSFE5SWpJd0lpQjRQU0kwTmk0MUlpQjVQU0kwTUNJZ1ptbHNiRDBpSTBSQlJFRkVRU0lnY25nOUlqVWlJSEo1UFNJMUlpQjBjbUZ1YzJadmNtMDlJbkp2ZEdGMFpTZ3ROakFnTWpRdU1ESWdOalVwSWk4K1BISmxZM1FnZDJsa2RHZzlJamNpSUdobGFXZG9kRDBpTWpBaUlIZzlJalEyTGpVaUlIazlJalF3SWlCbWFXeHNQU0lqUlRKRk1rVXlJaUJ5ZUQwaU5TSWdjbms5SWpVaUlIUnlZVzV6Wm05eWJUMGljbTkwWVhSbEtDMHpNQ0F0TlM0NU9DQTJOU2tpTHo0OEwzTjJaejQ9KSBuby1yZXBlYXQ7XG4gIGJhY2tncm91bmQtc2l6ZTogMTAwJTtcbiAgJi53ZXVpLWxvYWRpbmdfdHJhbnNwYXJlbnR7XG4gIFx0YmFja2dyb3VuZC1pbWFnZTp1cmwoXCJkYXRhOmltYWdlL3N2Zyt4bWw7Y2hhcnNldD11dGYtOCwlM0NzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB3aWR0aD0nMTIwJyBoZWlnaHQ9JzEyMCcgdmlld0JveD0nMCAwIDEwMCAxMDAnJTNFJTNDcGF0aCBmaWxsPSdub25lJyBkPSdNMCAwaDEwMHYxMDBIMHonLyUzRSUzQ3JlY3QgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjU2KScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgwIC0zMCknLyUzRSUzQ3JlY3Qgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHg9JzQ2LjUnIHk9JzQwJyBmaWxsPSdyZ2JhKDI1NSwyNTUsMjU1LC41KScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSgzMCAxMDUuOTggNjUpJy8lM0UlM0NyZWN0IHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyB4PSc0Ni41JyB5PSc0MCcgZmlsbD0ncmdiYSgyNTUsMjU1LDI1NSwuNDMpJyByeD0nNScgcnk9JzUnIHRyYW5zZm9ybT0ncm90YXRlKDYwIDc1Ljk4IDY1KScvJTNFJTNDcmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjM4KScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSg5MCA2NSA2NSknLyUzRSUzQ3JlY3Qgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHg9JzQ2LjUnIHk9JzQwJyBmaWxsPSdyZ2JhKDI1NSwyNTUsMjU1LC4zMiknIHJ4PSc1JyByeT0nNScgdHJhbnNmb3JtPSdyb3RhdGUoMTIwIDU4LjY2IDY1KScvJTNFJTNDcmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjI4KScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSgxNTAgNTQuMDIgNjUpJy8lM0UlM0NyZWN0IHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyB4PSc0Ni41JyB5PSc0MCcgZmlsbD0ncmdiYSgyNTUsMjU1LDI1NSwuMjUpJyByeD0nNScgcnk9JzUnIHRyYW5zZm9ybT0ncm90YXRlKDE4MCA1MCA2NSknLyUzRSUzQ3JlY3Qgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHg9JzQ2LjUnIHk9JzQwJyBmaWxsPSdyZ2JhKDI1NSwyNTUsMjU1LC4yKScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSgtMTUwIDQ1Ljk4IDY1KScvJTNFJTNDcmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjE3KScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSgtMTIwIDQxLjM0IDY1KScvJTNFJTNDcmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjE0KScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSgtOTAgMzUgNjUpJy8lM0UlM0NyZWN0IHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyB4PSc0Ni41JyB5PSc0MCcgZmlsbD0ncmdiYSgyNTUsMjU1LDI1NSwuMSknIHJ4PSc1JyByeT0nNScgdHJhbnNmb3JtPSdyb3RhdGUoLTYwIDI0LjAyIDY1KScvJTNFJTNDcmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjAzKScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSgtMzAgLTUuOTggNjUpJy8lM0UlM0Mvc3ZnJTNFXCIpO1xuICB9XG59XG5cbkAtd2Via2l0LWtleWZyYW1lcyB3ZXVpTG9hZGluZyB7XG4gIDAlIHtcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZTNkKDAsIDAsIDEsIDBkZWcpO1xuICB9XG5cbiAgMTAwJSB7XG4gICAgdHJhbnNmb3JtOiByb3RhdGUzZCgwLCAwLCAxLCAzNjBkZWcpO1xuICB9XG59XG5cbkBrZXlmcmFtZXMgd2V1aUxvYWRpbmcge1xuICAwJSB7XG4gICAgdHJhbnNmb3JtOiByb3RhdGUzZCgwLCAwLCAxLCAwZGVnKTtcbiAgfVxuXG4gIDEwMCUge1xuICAgIHRyYW5zZm9ybTogcm90YXRlM2QoMCwgMCwgMSwgMzYwZGVnKTtcbiAgfVxufVxuIiwiQGltcG9ydCBcIi4uLy4uL2Jhc2UvZm5cIjtcblxuLndldWktc2xpZGVyIHtcbiAgICBwYWRkaW5nOiAxNXB4IDE4cHg7XG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XG59XG5cbi53ZXVpLXNsaWRlcl9faW5uZXIge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBoZWlnaHQ6IDJweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRTlFOUU5O1xufVxuXG4ud2V1aS1zbGlkZXJfX3RyYWNrIHtcbiAgICBoZWlnaHQ6IDJweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBAd2V1aUNvbG9yUHJpbWFyeTtcbiAgICB3aWR0aDogMDtcbn1cblxuLndldWktc2xpZGVyX19oYW5kbGVyIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgbGVmdDogMDtcbiAgICB0b3A6IDUwJTtcbiAgICB3aWR0aDogMjhweDtcbiAgICBoZWlnaHQ6IDI4cHg7XG4gICAgbWFyZ2luLWxlZnQ6IC0xNHB4O1xuICAgIG1hcmdpbi10b3A6IC0xNHB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZGRkZGO1xuICAgIGJveC1zaGFkb3c6IDAgMCA0cHggcmdiYSgwLCAwLCAwLCAuMik7XG59XG5cblxuLndldWktc2xpZGVyLWJveHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgLndldWktc2xpZGVye1xuICAgICAgICBmbGV4OiAxO1xuICAgIH1cbn1cbi53ZXVpLXNsaWRlci1ib3hfX3ZhbHVlIHtcbiAgICBtYXJnaW4tbGVmdDogLjVlbTtcbiAgICBtaW4td2lkdGg6IDI0cHg7XG4gICAgY29sb3I6ICM4ODg4ODg7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbn0iXX0= */\r\n", ""]);

// exports


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)();
// imports


// module
exports.push([module.i, "\ndiv{\n\tcolor:red\n}\n", "", {"version":3,"sources":["D:/练习/vue-demo/app/a.vue?25b7a5a6"],"names":[],"mappings":";AAIA;CACA,SAAA;CACA","file":"a.vue","sourcesContent":["<template>\r\n\t<div>a:{{id}}</div>\r\n</template>\r\n<style>\r\n\tdiv{\r\n\t\tcolor:red\r\n\t}\r\n</style>\r\n<script>\r\n\texport default{\r\n\t    data:function () {\r\n\t\t\treturn{\r\n\t\t\t    id:''\r\n\t\t\t}\r\n        },\r\n\t    mounted:function () {\r\n\t\t\tthis.id = this.$route.params.id\r\n        }\r\n\t}\r\n</script>"],"sourceRoot":""}]);

// exports


/***/ }),
/* 9 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 10 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(26)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(16),
  /* template */
  __webpack_require__(22),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "D:\\练习\\vue-demo\\app\\a.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] a.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3746bd08", Component.options)
  } else {
    hotAPI.reload("data-v-3746bd08", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(17),
  /* template */
  __webpack_require__(20),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "D:\\练习\\vue-demo\\app\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-020aefed", Component.options)
  } else {
    hotAPI.reload("data-v-020aefed", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(18),
  /* template */
  __webpack_require__(23),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "D:\\练习\\vue-demo\\app\\panel.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] panel.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4c602fc2", Component.options)
  } else {
    hotAPI.reload("data-v-4c602fc2", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(19),
  /* template */
  __webpack_require__(24),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "D:\\练习\\vue-demo\\app\\searchBar.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] searchBar.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-56434666", Component.options)
  } else {
    hotAPI.reload("data-v-56434666", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  null,
  /* template */
  __webpack_require__(21),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "D:\\练习\\vue-demo\\app\\tabBar.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] tabBar.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0822e6b3", Component.options)
  } else {
    hotAPI.reload("data-v-0822e6b3", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//

	/* harmony default export */ __webpack_exports__["default"] = {
	    data:function () {
			return{
			    id:''
			}
        },
	    mounted:function () {
			this.id = this.$route.params.id
        }
	};


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tabBar_vue__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tabBar_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__tabBar_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__searchBar_vue__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__searchBar_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__searchBar_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__panel_vue__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__panel_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__panel_vue__);
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = {
    components:{
        'tabBar':__WEBPACK_IMPORTED_MODULE_0__tabBar_vue___default.a,
		'search':__WEBPACK_IMPORTED_MODULE_1__searchBar_vue___default.a,
		'panel':__WEBPACK_IMPORTED_MODULE_2__panel_vue___default.a
	}
};


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

    /* harmony default export */ __webpack_exports__["default"] = {
        data:function () {
            return{
                apikey:"0b2bdeda43b5688921839c8ecb20399b",
                city:"广州",
                start:0,
                count:5,
				movices:[],
				toast:true,
				load:''
            }
        },
        methods:{
            loadMore:function () {
                this.load = true;
                this.$http.jsonp('https://api.douban.com/v2/movie/in_theaters',{
                    params:{
                        apikey:this.apikey,
                        city:this.city,
                        start:this.start++,
                        count:this.count
                    }
                }).then(function (data) {
                    this.movices = this.movices.concat(data.data.subjects);
                    this.toast = false;
                    this.load = false;
					console.log(data.data)
                })
            }
        },
        mounted:function () {
            this.loadMore();
        }
    };


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

	/* harmony default export */ __webpack_exports__["default"] = {
	    data:function () {
			return{
				isSearch:false
			}
        },
		methods:{
			search:function () {
				this.isSearch = true
            },
			cancle:function () {
				this.isSearch = false;
            }
		}
	};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('tab-bar'), _vm._v(" "), _c('search'), _vm._v(" "), _c('panel')], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-020aefed", module.exports)
  }
}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "weui-tab"
  }, [_c('div', {
    staticClass: "weui-tab__panel"
  }), _vm._v(" "), _c('div', {
    staticClass: "weui-tabbar"
  }, [_c('a', {
    staticClass: "weui-tabbar__item weui-bar__item_on",
    attrs: {
      "href": "/"
    }
  }, [_c('img', {
    staticClass: "weui-tabbar__icon",
    attrs: {
      "src": "",
      "alt": ""
    }
  }), _vm._v(" "), _c('p', {
    staticClass: "weui-tabbar__label"
  }, [_vm._v("微信")])]), _vm._v(" "), _c('a', {
    staticClass: "weui-tabbar__item",
    attrs: {
      "href": "/a"
    }
  }, [_c('img', {
    staticClass: "weui-tabbar__icon",
    attrs: {
      "src": "",
      "alt": ""
    }
  }), _vm._v(" "), _c('p', {
    staticClass: "weui-tabbar__label"
  }, [_vm._v("通讯录")])]), _vm._v(" "), _c('a', {
    staticClass: "weui-tabbar__item",
    attrs: {
      "href": "javascript:;"
    }
  }, [_c('img', {
    staticClass: "weui-tabbar__icon",
    attrs: {
      "src": "",
      "alt": ""
    }
  }), _vm._v(" "), _c('p', {
    staticClass: "weui-tabbar__label"
  }, [_vm._v("发现")])]), _vm._v(" "), _c('a', {
    staticClass: "weui-tabbar__item",
    attrs: {
      "href": "javascript:;"
    }
  }, [_c('img', {
    staticClass: "weui-tabbar__icon",
    attrs: {
      "src": "",
      "alt": ""
    }
  }), _vm._v(" "), _c('p', {
    staticClass: "weui-tabbar__label"
  }, [_vm._v("我")])])])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-0822e6b3", module.exports)
  }
}

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_vm._v("a:" + _vm._s(_vm.id))])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3746bd08", module.exports)
  }
}

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "weui-panel weui-panel_access"
  }, [_c('div', {
    staticClass: "weui-panel__hd"
  }, [_vm._v("图文组合列表")]), _vm._v(" "), _c('div', {
    staticClass: "weui-panel__bd"
  }, [_vm._l((_vm.movices), function(movice) {
    return _c('a', {
      staticClass: "weui-media-box weui-media-box_appmsg",
      attrs: {
        "href": "javascript:void(0);"
      }
    }, [_c('div', {
      staticClass: "weui-media-box__hd"
    }, [_c('img', {
      staticClass: "weui-media-box__thumb",
      attrs: {
        "src": movice.images.medium,
        "alt": ""
      }
    })]), _vm._v(" "), _c('div', {
      staticClass: "weui-media-box__bd"
    }, [_c('h4', {
      staticClass: "weui-media-box__title"
    }, [_vm._v(_vm._s(movice.title))]), _vm._v(" "), _c('p', {
      staticClass: "weui-media-box__desc"
    }, [_vm._v("上映日期:" + _vm._s(movice.mainland_pubdate))])])])
  }), _vm._v(" "), _c('div', {
    staticClass: "weui-panel__ft"
  }, [_c('a', {
    staticClass: "weui-cell weui-cell_access weui-cell_link",
    attrs: {
      "href": "javascript:void(0);"
    }
  }, [_c('div', {
    staticClass: "weui-cell__bd",
    on: {
      "click": function($event) {
        _vm.loadMore()
      }
    }
  }, [_vm._v("查看更多")]), _vm._v(" "), _c('span', {
    staticClass: "weui-cell__ft"
  })])])], 2)]), _vm._v(" "), (_vm.load) ? _c('div', {
    staticClass: "weui-loadmore"
  }, [_c('i', {
    staticClass: "weui-loading"
  }), _vm._v(" "), _c('span', {
    staticClass: "weui-loadmore__tips"
  }, [_vm._v("正在加载")])]) : _vm._e(), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.toast),
      expression: "toast"
    }],
    attrs: {
      "id": "loadingToast"
    }
  }, [_c('div', {
    staticClass: "weui-mask_transparent"
  }), _vm._v(" "), _vm._m(0)])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "weui-toast"
  }, [_c('i', {
    staticClass: "weui-loading weui-icon_toast"
  }), _vm._v(" "), _c('p', {
    staticClass: "weui-toast__content"
  }, [_vm._v("数据加载中")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4c602fc2", module.exports)
  }
}

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "weui-search-bar",
    class: {
      'weui-search-bar_focusing': _vm.isSearch
    },
    attrs: {
      "id": "search_bar"
    }
  }, [_c('form', {
    staticClass: "weui-search-bar__form"
  }, [_c('div', {
    staticClass: "weui-search-bar__box"
  }, [_c('i', {
    staticClass: "weui-icon-search"
  }), _vm._v(" "), _c('input', {
    staticClass: "weui-search-bar__input",
    attrs: {
      "type": "search",
      "id": "search_input",
      "placeholder": "搜索"
    },
    on: {
      "focus": function($event) {
        _vm.search()
      }
    }
  }), _vm._v(" "), _c('a', {
    staticClass: "weui-icon-clear",
    attrs: {
      "href": "javascript:",
      "id": "search_clear"
    }
  })]), _vm._v(" "), _vm._m(0)]), _vm._v(" "), _c('a', {
    staticClass: "weui-search-bar__cancel-btn",
    attrs: {
      "href": "javascript:",
      "id": "search_cancel"
    },
    on: {
      "click": _vm.cancle
    }
  }, [_vm._v("取消")])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('label', {
    staticClass: "weui-search-bar__label",
    attrs: {
      "for": "search_input",
      "id": "search_text"
    }
  }, [_c('i', {
    staticClass: "weui-icon-search"
  }), _vm._v(" "), _c('span', [_vm._v("搜索")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-56434666", module.exports)
  }
}

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
  * vue-router v2.2.1
  * (c) 2017 Evan You
  * @license MIT
  */
/*  */

function assert (condition, message) {
  if (!condition) {
    throw new Error(("[vue-router] " + message))
  }
}

function warn (condition, message) {
  if (!condition) {
    typeof console !== 'undefined' && console.warn(("[vue-router] " + message));
  }
}

var View = {
  name: 'router-view',
  functional: true,
  props: {
    name: {
      type: String,
      default: 'default'
    }
  },
  render: function render (h, ref) {
    var props = ref.props;
    var children = ref.children;
    var parent = ref.parent;
    var data = ref.data;

    data.routerView = true;

    var name = props.name;
    var route = parent.$route;
    var cache = parent._routerViewCache || (parent._routerViewCache = {});

    // determine current view depth, also check to see if the tree
    // has been toggled inactive but kept-alive.
    var depth = 0;
    var inactive = false;
    while (parent) {
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++;
      }
      if (parent._inactive) {
        inactive = true;
      }
      parent = parent.$parent;
    }
    data.routerViewDepth = depth;

    // render previous view if the tree is inactive and kept-alive
    if (inactive) {
      return h(cache[name], data, children)
    }

    var matched = route.matched[depth];
    // render empty node if no matched route
    if (!matched) {
      cache[name] = null;
      return h()
    }

    var component = cache[name] = matched.components[name];

    // inject instance registration hooks
    var hooks = data.hook || (data.hook = {});
    hooks.init = function (vnode) {
      matched.instances[name] = vnode.child;
    };
    hooks.prepatch = function (oldVnode, vnode) {
      matched.instances[name] = vnode.child;
    };
    hooks.destroy = function (vnode) {
      if (matched.instances[name] === vnode.child) {
        matched.instances[name] = undefined;
      }
    };

    // resolve props
    data.props = resolveProps(route, matched.props && matched.props[name]);

    return h(component, data, children)
  }
};

function resolveProps (route, config) {
  switch (typeof config) {
    case 'undefined':
      return
    case 'object':
      return config
    case 'function':
      return config(route)
    case 'boolean':
      return config ? route.params : undefined
    default:
      warn(false, ("props in \"" + (route.path) + "\" is a " + (typeof config) + ", expecting an object, function or boolean."));
  }
}

/*  */

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function (c) { return '%' + c.charCodeAt(0).toString(16); };
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more comformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function (str) { return encodeURIComponent(str)
  .replace(encodeReserveRE, encodeReserveReplacer)
  .replace(commaRE, ','); };

var decode = decodeURIComponent;

function resolveQuery (
  query,
  extraQuery
) {
  if ( extraQuery === void 0 ) extraQuery = {};

  if (query) {
    var parsedQuery;
    try {
      parsedQuery = parseQuery(query);
    } catch (e) {
      process.env.NODE_ENV !== 'production' && warn(false, e.message);
      parsedQuery = {};
    }
    for (var key in extraQuery) {
      parsedQuery[key] = extraQuery[key];
    }
    return parsedQuery
  } else {
    return extraQuery
  }
}

function parseQuery (query) {
  var res = {};

  query = query.trim().replace(/^(\?|#|&)/, '');

  if (!query) {
    return res
  }

  query.split('&').forEach(function (param) {
    var parts = param.replace(/\+/g, ' ').split('=');
    var key = decode(parts.shift());
    var val = parts.length > 0
      ? decode(parts.join('='))
      : null;

    if (res[key] === undefined) {
      res[key] = val;
    } else if (Array.isArray(res[key])) {
      res[key].push(val);
    } else {
      res[key] = [res[key], val];
    }
  });

  return res
}

function stringifyQuery (obj) {
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return ''
    }

    if (val === null) {
      return encode(key)
    }

    if (Array.isArray(val)) {
      var result = [];
      val.slice().forEach(function (val2) {
        if (val2 === undefined) {
          return
        }
        if (val2 === null) {
          result.push(encode(key));
        } else {
          result.push(encode(key) + '=' + encode(val2));
        }
      });
      return result.join('&')
    }

    return encode(key) + '=' + encode(val)
  }).filter(function (x) { return x.length > 0; }).join('&') : null;
  return res ? ("?" + res) : ''
}

/*  */

var trailingSlashRE = /\/?$/;

function createRoute (
  record,
  location,
  redirectedFrom
) {
  var route = {
    name: location.name || (record && record.name),
    meta: (record && record.meta) || {},
    path: location.path || '/',
    hash: location.hash || '',
    query: location.query || {},
    params: location.params || {},
    fullPath: getFullPath(location),
    matched: record ? formatMatch(record) : []
  };
  if (redirectedFrom) {
    route.redirectedFrom = getFullPath(redirectedFrom);
  }
  return Object.freeze(route)
}

// the starting route that represents the initial state
var START = createRoute(null, {
  path: '/'
});

function formatMatch (record) {
  var res = [];
  while (record) {
    res.unshift(record);
    record = record.parent;
  }
  return res
}

function getFullPath (ref) {
  var path = ref.path;
  var query = ref.query; if ( query === void 0 ) query = {};
  var hash = ref.hash; if ( hash === void 0 ) hash = '';

  return (path || '/') + stringifyQuery(query) + hash
}

function isSameRoute (a, b) {
  if (b === START) {
    return a === b
  } else if (!b) {
    return false
  } else if (a.path && b.path) {
    return (
      a.path.replace(trailingSlashRE, '') === b.path.replace(trailingSlashRE, '') &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query)
    )
  } else if (a.name && b.name) {
    return (
      a.name === b.name &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query) &&
      isObjectEqual(a.params, b.params)
    )
  } else {
    return false
  }
}

function isObjectEqual (a, b) {
  if ( a === void 0 ) a = {};
  if ( b === void 0 ) b = {};

  var aKeys = Object.keys(a);
  var bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) {
    return false
  }
  return aKeys.every(function (key) { return String(a[key]) === String(b[key]); })
}

function isIncludedRoute (current, target) {
  return (
    current.path.replace(trailingSlashRE, '/').indexOf(
      target.path.replace(trailingSlashRE, '/')
    ) === 0 &&
    (!target.hash || current.hash === target.hash) &&
    queryIncludes(current.query, target.query)
  )
}

function queryIncludes (current, target) {
  for (var key in target) {
    if (!(key in current)) {
      return false
    }
  }
  return true
}

/*  */

// work around weird flow bug
var toTypes = [String, Object];
var eventTypes = [String, Array];

var Link = {
  name: 'router-link',
  props: {
    to: {
      type: toTypes,
      required: true
    },
    tag: {
      type: String,
      default: 'a'
    },
    exact: Boolean,
    append: Boolean,
    replace: Boolean,
    activeClass: String,
    event: {
      type: eventTypes,
      default: 'click'
    }
  },
  render: function render (h) {
    var this$1 = this;

    var router = this.$router;
    var current = this.$route;
    var ref = router.resolve(this.to, current, this.append);
    var location = ref.location;
    var route = ref.route;
    var href = ref.href;
    var classes = {};
    var activeClass = this.activeClass || router.options.linkActiveClass || 'router-link-active';
    var compareTarget = location.path ? createRoute(null, location) : route;
    classes[activeClass] = this.exact
      ? isSameRoute(current, compareTarget)
      : isIncludedRoute(current, compareTarget);

    var handler = function (e) {
      if (guardEvent(e)) {
        if (this$1.replace) {
          router.replace(location);
        } else {
          router.push(location);
        }
      }
    };

    var on = { click: guardEvent };
    if (Array.isArray(this.event)) {
      this.event.forEach(function (e) { on[e] = handler; });
    } else {
      on[this.event] = handler;
    }

    var data = {
      class: classes
    };

    if (this.tag === 'a') {
      data.on = on;
      data.attrs = { href: href };
    } else {
      // find the first <a> child and apply listener and href
      var a = findAnchor(this.$slots.default);
      if (a) {
        // in case the <a> is a static node
        a.isStatic = false;
        var extend = _Vue.util.extend;
        var aData = a.data = extend({}, a.data);
        aData.on = on;
        var aAttrs = a.data.attrs = extend({}, a.data.attrs);
        aAttrs.href = href;
      } else {
        // doesn't have <a> child, apply listener to self
        data.on = on;
      }
    }

    return h(this.tag, data, this.$slots.default)
  }
};

function guardEvent (e) {
  // don't redirect with control keys
  if (e.metaKey || e.ctrlKey || e.shiftKey) { return }
  // don't redirect when preventDefault called
  if (e.defaultPrevented) { return }
  // don't redirect on right click
  if (e.button !== undefined && e.button !== 0) { return }
  // don't redirect if `target="_blank"`
  if (e.target && e.target.getAttribute) {
    var target = e.target.getAttribute('target');
    if (/\b_blank\b/i.test(target)) { return }
  }
  // this may be a Weex event which doesn't have this method
  if (e.preventDefault) {
    e.preventDefault();
  }
  return true
}

function findAnchor (children) {
  if (children) {
    var child;
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      if (child.tag === 'a') {
        return child
      }
      if (child.children && (child = findAnchor(child.children))) {
        return child
      }
    }
  }
}

var _Vue;

function install (Vue) {
  if (install.installed) { return }
  install.installed = true;

  _Vue = Vue;

  Object.defineProperty(Vue.prototype, '$router', {
    get: function get () { return this.$root._router }
  });

  Object.defineProperty(Vue.prototype, '$route', {
    get: function get () { return this.$root._route }
  });

  Vue.mixin({
    beforeCreate: function beforeCreate () {
      if (this.$options.router) {
        this._router = this.$options.router;
        this._router.init(this);
        Vue.util.defineReactive(this, '_route', this._router.history.current);
      }
    }
  });

  Vue.component('router-view', View);
  Vue.component('router-link', Link);

  var strats = Vue.config.optionMergeStrategies;
  // use the same hook merging strategy for route hooks
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.created;
}

/*  */

var inBrowser = typeof window !== 'undefined';

/*  */

function resolvePath (
  relative,
  base,
  append
) {
  if (relative.charAt(0) === '/') {
    return relative
  }

  if (relative.charAt(0) === '?' || relative.charAt(0) === '#') {
    return base + relative
  }

  var stack = base.split('/');

  // remove trailing segment if:
  // - not appending
  // - appending to trailing slash (last segment is empty)
  if (!append || !stack[stack.length - 1]) {
    stack.pop();
  }

  // resolve relative path
  var segments = relative.replace(/^\//, '').split('/');
  for (var i = 0; i < segments.length; i++) {
    var segment = segments[i];
    if (segment === '.') {
      continue
    } else if (segment === '..') {
      stack.pop();
    } else {
      stack.push(segment);
    }
  }

  // ensure leading slash
  if (stack[0] !== '') {
    stack.unshift('');
  }

  return stack.join('/')
}

function parsePath (path) {
  var hash = '';
  var query = '';

  var hashIndex = path.indexOf('#');
  if (hashIndex >= 0) {
    hash = path.slice(hashIndex);
    path = path.slice(0, hashIndex);
  }

  var queryIndex = path.indexOf('?');
  if (queryIndex >= 0) {
    query = path.slice(queryIndex + 1);
    path = path.slice(0, queryIndex);
  }

  return {
    path: path,
    query: query,
    hash: hash
  }
}

function cleanPath (path) {
  return path.replace(/\/\//g, '/')
}

/*  */

function createRouteMap (
  routes,
  oldPathMap,
  oldNameMap
) {
  var pathMap = oldPathMap || Object.create(null);
  var nameMap = oldNameMap || Object.create(null);

  routes.forEach(function (route) {
    addRouteRecord(pathMap, nameMap, route);
  });

  return {
    pathMap: pathMap,
    nameMap: nameMap
  }
}

function addRouteRecord (
  pathMap,
  nameMap,
  route,
  parent,
  matchAs
) {
  var path = route.path;
  var name = route.name;
  if (process.env.NODE_ENV !== 'production') {
    assert(path != null, "\"path\" is required in a route configuration.");
    assert(
      typeof route.component !== 'string',
      "route config \"component\" for path: " + (String(path || name)) + " cannot be a " +
      "string id. Use an actual component instead."
    );
  }

  var record = {
    path: normalizePath(path, parent),
    components: route.components || { default: route.component },
    instances: {},
    name: name,
    parent: parent,
    matchAs: matchAs,
    redirect: route.redirect,
    beforeEnter: route.beforeEnter,
    meta: route.meta || {},
    props: route.props == null
      ? {}
      : route.components
        ? route.props
        : { default: route.props }
  };

  if (route.children) {
    // Warn if route is named and has a default child route.
    // If users navigate to this route by name, the default child will
    // not be rendered (GH Issue #629)
    if (process.env.NODE_ENV !== 'production') {
      if (route.name && route.children.some(function (child) { return /^\/?$/.test(child.path); })) {
        warn(
          false,
          "Named Route '" + (route.name) + "' has a default child route. " +
          "When navigating to this named route (:to=\"{name: '" + (route.name) + "'\"), " +
          "the default child route will not be rendered. Remove the name from " +
          "this route and use the name of the default child route for named " +
          "links instead."
        );
      }
    }
    route.children.forEach(function (child) {
      var childMatchAs = matchAs
        ? cleanPath((matchAs + "/" + (child.path)))
        : undefined;
      addRouteRecord(pathMap, nameMap, child, record, childMatchAs);
    });
  }

  if (route.alias !== undefined) {
    if (Array.isArray(route.alias)) {
      route.alias.forEach(function (alias) {
        var aliasRoute = {
          path: alias,
          children: route.children
        };
        addRouteRecord(pathMap, nameMap, aliasRoute, parent, record.path);
      });
    } else {
      var aliasRoute = {
        path: route.alias,
        children: route.children
      };
      addRouteRecord(pathMap, nameMap, aliasRoute, parent, record.path);
    }
  }

  if (!pathMap[record.path]) {
    pathMap[record.path] = record;
  }

  if (name) {
    if (!nameMap[name]) {
      nameMap[name] = record;
    } else if (process.env.NODE_ENV !== 'production' && !matchAs) {
      warn(
        false,
        "Duplicate named routes definition: " +
        "{ name: \"" + name + "\", path: \"" + (record.path) + "\" }"
      );
    }
  }
}

function normalizePath (path, parent) {
  path = path.replace(/\/$/, '');
  if (path[0] === '/') { return path }
  if (parent == null) { return path }
  return cleanPath(((parent.path) + "/" + path))
}

var index$1 = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

var isarray = index$1;

/**
 * Expose `pathToRegexp`.
 */
var index = pathToRegexp;
var parse_1 = parse;
var compile_1 = compile;
var tokensToFunction_1 = tokensToFunction;
var tokensToRegExp_1 = tokensToRegExp;

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g');

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = options && options.delimiter || '/';
  var res;

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length;

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1];
      continue
    }

    var next = str[index];
    var prefix = res[2];
    var name = res[3];
    var capture = res[4];
    var group = res[5];
    var modifier = res[6];
    var asterisk = res[7];

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path);
      path = '';
    }

    var partial = prefix != null && next != null && next !== prefix;
    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var delimiter = res[2] || defaultDelimiter;
    var pattern = capture || group;

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
    });
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index);
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path);
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile (str, options) {
  return tokensToFunction(parse(str, options))
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty (str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk (str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length);

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
    }
  }

  return function (obj, opts) {
    var path = '';
    var data = obj || {};
    var options = opts || {};
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;

        continue
      }

      var value = data[token.name];
      var segment;

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix;
          }

          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j]);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value);

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment;
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys;
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      });
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  var strict = options.strict;
  var end = options.end !== false;
  var route = '';

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (typeof token === 'string') {
      route += escapeString(token);
    } else {
      var prefix = escapeString(token.prefix);
      var capture = '(?:' + token.pattern + ')';

      keys.push(token);

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*';
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?';
        } else {
          capture = prefix + '(' + capture + ')?';
        }
      } else {
        capture = prefix + '(' + capture + ')';
      }

      route += capture;
    }
  }

  var delimiter = escapeString(options.delimiter || '/');
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter;

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?';
  }

  if (end) {
    route += '$';
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)';
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys)
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */ (keys))
  }

  if (isarray(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
  }

  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
}

index.parse = parse_1;
index.compile = compile_1;
index.tokensToFunction = tokensToFunction_1;
index.tokensToRegExp = tokensToRegExp_1;

/*  */

var regexpCache = Object.create(null);

function getRouteRegex (path) {
  var hit = regexpCache[path];
  var keys, regexp;

  if (hit) {
    keys = hit.keys;
    regexp = hit.regexp;
  } else {
    keys = [];
    regexp = index(path, keys);
    regexpCache[path] = { keys: keys, regexp: regexp };
  }

  return { keys: keys, regexp: regexp }
}

var regexpCompileCache = Object.create(null);

function fillParams (
  path,
  params,
  routeMsg
) {
  try {
    var filler =
      regexpCompileCache[path] ||
      (regexpCompileCache[path] = index.compile(path));
    return filler(params || {}, { pretty: true })
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      warn(false, ("missing param for " + routeMsg + ": " + (e.message)));
    }
    return ''
  }
}

/*  */

function normalizeLocation (
  raw,
  current,
  append
) {
  var next = typeof raw === 'string' ? { path: raw } : raw;
  // named target
  if (next.name || next._normalized) {
    return next
  }

  // relative params
  if (!next.path && next.params && current) {
    next = assign({}, next);
    next._normalized = true;
    var params = assign(assign({}, current.params), next.params);
    if (current.name) {
      next.name = current.name;
      next.params = params;
    } else if (current.matched) {
      var rawPath = current.matched[current.matched.length - 1].path;
      next.path = fillParams(rawPath, params, ("path " + (current.path)));
    } else if (process.env.NODE_ENV !== 'production') {
      warn(false, "relative params navigation requires a current route.");
    }
    return next
  }

  var parsedPath = parsePath(next.path || '');
  var basePath = (current && current.path) || '/';
  var path = parsedPath.path
    ? resolvePath(parsedPath.path, basePath, append || next.append)
    : (current && current.path) || '/';
  var query = resolveQuery(parsedPath.query, next.query);
  var hash = next.hash || parsedPath.hash;
  if (hash && hash.charAt(0) !== '#') {
    hash = "#" + hash;
  }

  return {
    _normalized: true,
    path: path,
    query: query,
    hash: hash
  }
}

function assign (a, b) {
  for (var key in b) {
    a[key] = b[key];
  }
  return a
}

/*  */

function createMatcher (routes) {
  var ref = createRouteMap(routes);
  var pathMap = ref.pathMap;
  var nameMap = ref.nameMap;

  function addRoutes (routes) {
    createRouteMap(routes, pathMap, nameMap);
  }

  function match (
    raw,
    currentRoute,
    redirectedFrom
  ) {
    var location = normalizeLocation(raw, currentRoute);
    var name = location.name;

    if (name) {
      var record = nameMap[name];
      if (process.env.NODE_ENV !== 'production') {
        warn(record, ("Route with name '" + name + "' does not exist"));
      }
      var paramNames = getRouteRegex(record.path).keys
        .filter(function (key) { return !key.optional; })
        .map(function (key) { return key.name; });

      if (typeof location.params !== 'object') {
        location.params = {};
      }

      if (currentRoute && typeof currentRoute.params === 'object') {
        for (var key in currentRoute.params) {
          if (!(key in location.params) && paramNames.indexOf(key) > -1) {
            location.params[key] = currentRoute.params[key];
          }
        }
      }

      if (record) {
        location.path = fillParams(record.path, location.params, ("named route \"" + name + "\""));
        return _createRoute(record, location, redirectedFrom)
      }
    } else if (location.path) {
      location.params = {};
      for (var path in pathMap) {
        if (matchRoute(path, location.params, location.path)) {
          return _createRoute(pathMap[path], location, redirectedFrom)
        }
      }
    }
    // no match
    return _createRoute(null, location)
  }

  function redirect (
    record,
    location
  ) {
    var originalRedirect = record.redirect;
    var redirect = typeof originalRedirect === 'function'
        ? originalRedirect(createRoute(record, location))
        : originalRedirect;

    if (typeof redirect === 'string') {
      redirect = { path: redirect };
    }

    if (!redirect || typeof redirect !== 'object') {
      process.env.NODE_ENV !== 'production' && warn(
        false, ("invalid redirect option: " + (JSON.stringify(redirect)))
      );
      return _createRoute(null, location)
    }

    var re = redirect;
    var name = re.name;
    var path = re.path;
    var query = location.query;
    var hash = location.hash;
    var params = location.params;
    query = re.hasOwnProperty('query') ? re.query : query;
    hash = re.hasOwnProperty('hash') ? re.hash : hash;
    params = re.hasOwnProperty('params') ? re.params : params;

    if (name) {
      // resolved named direct
      var targetRecord = nameMap[name];
      if (process.env.NODE_ENV !== 'production') {
        assert(targetRecord, ("redirect failed: named route \"" + name + "\" not found."));
      }
      return match({
        _normalized: true,
        name: name,
        query: query,
        hash: hash,
        params: params
      }, undefined, location)
    } else if (path) {
      // 1. resolve relative redirect
      var rawPath = resolveRecordPath(path, record);
      // 2. resolve params
      var resolvedPath = fillParams(rawPath, params, ("redirect route with path \"" + rawPath + "\""));
      // 3. rematch with existing query and hash
      return match({
        _normalized: true,
        path: resolvedPath,
        query: query,
        hash: hash
      }, undefined, location)
    } else {
      warn(false, ("invalid redirect option: " + (JSON.stringify(redirect))));
      return _createRoute(null, location)
    }
  }

  function alias (
    record,
    location,
    matchAs
  ) {
    var aliasedPath = fillParams(matchAs, location.params, ("aliased route with path \"" + matchAs + "\""));
    var aliasedMatch = match({
      _normalized: true,
      path: aliasedPath
    });
    if (aliasedMatch) {
      var matched = aliasedMatch.matched;
      var aliasedRecord = matched[matched.length - 1];
      location.params = aliasedMatch.params;
      return _createRoute(aliasedRecord, location)
    }
    return _createRoute(null, location)
  }

  function _createRoute (
    record,
    location,
    redirectedFrom
  ) {
    if (record && record.redirect) {
      return redirect(record, redirectedFrom || location)
    }
    if (record && record.matchAs) {
      return alias(record, location, record.matchAs)
    }
    return createRoute(record, location, redirectedFrom)
  }

  return {
    match: match,
    addRoutes: addRoutes
  }
}

function matchRoute (
  path,
  params,
  pathname
) {
  var ref = getRouteRegex(path);
  var regexp = ref.regexp;
  var keys = ref.keys;
  var m = pathname.match(regexp);

  if (!m) {
    return false
  } else if (!params) {
    return true
  }

  for (var i = 1, len = m.length; i < len; ++i) {
    var key = keys[i - 1];
    var val = typeof m[i] === 'string' ? decodeURIComponent(m[i]) : m[i];
    if (key) { params[key.name] = val; }
  }

  return true
}

function resolveRecordPath (path, record) {
  return resolvePath(path, record.parent ? record.parent.path : '/', true)
}

/*  */


var positionStore = Object.create(null);

function setupScroll () {
  window.addEventListener('popstate', function (e) {
    saveScrollPosition();
    if (e.state && e.state.key) {
      setStateKey(e.state.key);
    }
  });
}

function handleScroll (
  router,
  to,
  from,
  isPop
) {
  if (!router.app) {
    return
  }

  var behavior = router.options.scrollBehavior;
  if (!behavior) {
    return
  }

  if (process.env.NODE_ENV !== 'production') {
    assert(typeof behavior === 'function', "scrollBehavior must be a function");
  }

  // wait until re-render finishes before scrolling
  router.app.$nextTick(function () {
    var position = getScrollPosition();
    var shouldScroll = behavior(to, from, isPop ? position : null);
    if (!shouldScroll) {
      return
    }
    var isObject = typeof shouldScroll === 'object';
    if (isObject && typeof shouldScroll.selector === 'string') {
      var el = document.querySelector(shouldScroll.selector);
      if (el) {
        position = getElementPosition(el);
      } else if (isValidPosition(shouldScroll)) {
        position = normalizePosition(shouldScroll);
      }
    } else if (isObject && isValidPosition(shouldScroll)) {
      position = normalizePosition(shouldScroll);
    }

    if (position) {
      window.scrollTo(position.x, position.y);
    }
  });
}

function saveScrollPosition () {
  var key = getStateKey();
  if (key) {
    positionStore[key] = {
      x: window.pageXOffset,
      y: window.pageYOffset
    };
  }
}

function getScrollPosition () {
  var key = getStateKey();
  if (key) {
    return positionStore[key]
  }
}

function getElementPosition (el) {
  var docEl = document.documentElement;
  var docRect = docEl.getBoundingClientRect();
  var elRect = el.getBoundingClientRect();
  return {
    x: elRect.left - docRect.left,
    y: elRect.top - docRect.top
  }
}

function isValidPosition (obj) {
  return isNumber(obj.x) || isNumber(obj.y)
}

function normalizePosition (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : window.pageXOffset,
    y: isNumber(obj.y) ? obj.y : window.pageYOffset
  }
}

function isNumber (v) {
  return typeof v === 'number'
}

/*  */

var supportsPushState = inBrowser && (function () {
  var ua = window.navigator.userAgent;

  if (
    (ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) &&
    ua.indexOf('Mobile Safari') !== -1 &&
    ua.indexOf('Chrome') === -1 &&
    ua.indexOf('Windows Phone') === -1
  ) {
    return false
  }

  return window.history && 'pushState' in window.history
})();

// use User Timing api (if present) for more accurate key precision
var Time = inBrowser && window.performance && window.performance.now
  ? window.performance
  : Date;

var _key = genKey();

function genKey () {
  return Time.now().toFixed(3)
}

function getStateKey () {
  return _key
}

function setStateKey (key) {
  _key = key;
}

function pushState (url, replace) {
  saveScrollPosition();
  // try...catch the pushState call to get around Safari
  // DOM Exception 18 where it limits to 100 pushState calls
  var history = window.history;
  try {
    if (replace) {
      history.replaceState({ key: _key }, '', url);
    } else {
      _key = genKey();
      history.pushState({ key: _key }, '', url);
    }
  } catch (e) {
    window.location[replace ? 'replace' : 'assign'](url);
  }
}

function replaceState (url) {
  pushState(url, true);
}

/*  */

function runQueue (queue, fn, cb) {
  var step = function (index) {
    if (index >= queue.length) {
      cb();
    } else {
      if (queue[index]) {
        fn(queue[index], function () {
          step(index + 1);
        });
      } else {
        step(index + 1);
      }
    }
  };
  step(0);
}

/*  */


var History = function History (router, base) {
  this.router = router;
  this.base = normalizeBase(base);
  // start with a route object that stands for "nowhere"
  this.current = START;
  this.pending = null;
  this.ready = false;
  this.readyCbs = [];
};

History.prototype.listen = function listen (cb) {
  this.cb = cb;
};

History.prototype.onReady = function onReady (cb) {
  if (this.ready) {
    cb();
  } else {
    this.readyCbs.push(cb);
  }
};

History.prototype.transitionTo = function transitionTo (location, onComplete, onAbort) {
    var this$1 = this;

  var route = this.router.match(location, this.current);
  this.confirmTransition(route, function () {
    this$1.updateRoute(route);
    onComplete && onComplete(route);
    this$1.ensureURL();

    // fire ready cbs once
    if (!this$1.ready) {
      this$1.ready = true;
      this$1.readyCbs.forEach(function (cb) {
        cb(route);
      });
    }
  }, onAbort);
};

History.prototype.confirmTransition = function confirmTransition (route, onComplete, onAbort) {
    var this$1 = this;

  var current = this.current;
  var abort = function () { onAbort && onAbort(); };
  if (
    isSameRoute(route, current) &&
    // in the case the route map has been dynamically appended to
    route.matched.length === current.matched.length
  ) {
    this.ensureURL();
    return abort()
  }

  var ref = resolveQueue(this.current.matched, route.matched);
    var updated = ref.updated;
    var deactivated = ref.deactivated;
    var activated = ref.activated;

  var queue = [].concat(
    // in-component leave guards
    extractLeaveGuards(deactivated),
    // global before hooks
    this.router.beforeHooks,
    // in-component update hooks
    extractUpdateHooks(updated),
    // in-config enter guards
    activated.map(function (m) { return m.beforeEnter; }),
    // async components
    resolveAsyncComponents(activated)
  );

  this.pending = route;
  var iterator = function (hook, next) {
    if (this$1.pending !== route) {
      return abort()
    }
    hook(route, current, function (to) {
      if (to === false) {
        // next(false) -> abort navigation, ensure current URL
        this$1.ensureURL(true);
        abort();
      } else if (typeof to === 'string' || typeof to === 'object') {
        // next('/') or next({ path: '/' }) -> redirect
        (typeof to === 'object' && to.replace) ? this$1.replace(to) : this$1.push(to);
        abort();
      } else {
        // confirm transition and pass on the value
        next(to);
      }
    });
  };

  runQueue(queue, iterator, function () {
    var postEnterCbs = [];
    var isValid = function () { return this$1.current === route; };
    var enterGuards = extractEnterGuards(activated, postEnterCbs, isValid);
    // wait until async components are resolved before
    // extracting in-component enter guards
    runQueue(enterGuards, iterator, function () {
      if (this$1.pending !== route) {
        return abort()
      }
      this$1.pending = null;
      onComplete(route);
      if (this$1.router.app) {
        this$1.router.app.$nextTick(function () {
          postEnterCbs.forEach(function (cb) { return cb(); });
        });
      }
    });
  });
};

History.prototype.updateRoute = function updateRoute (route) {
  var prev = this.current;
  this.current = route;
  this.cb && this.cb(route);
  this.router.afterHooks.forEach(function (hook) {
    hook && hook(route, prev);
  });
};

function normalizeBase (base) {
  if (!base) {
    if (inBrowser) {
      // respect <base> tag
      var baseEl = document.querySelector('base');
      base = (baseEl && baseEl.getAttribute('href')) || '/';
    } else {
      base = '/';
    }
  }
  // make sure there's the starting slash
  if (base.charAt(0) !== '/') {
    base = '/' + base;
  }
  // remove trailing slash
  return base.replace(/\/$/, '')
}

function resolveQueue (
  current,
  next
) {
  var i;
  var max = Math.max(current.length, next.length);
  for (i = 0; i < max; i++) {
    if (current[i] !== next[i]) {
      break
    }
  }
  return {
    updated: next.slice(0, i),
    activated: next.slice(i),
    deactivated: current.slice(i)
  }
}

function extractGuards (
  records,
  name,
  bind,
  reverse
) {
  var guards = flatMapComponents(records, function (def, instance, match, key) {
    var guard = extractGuard(def, name);
    if (guard) {
      return Array.isArray(guard)
        ? guard.map(function (guard) { return bind(guard, instance, match, key); })
        : bind(guard, instance, match, key)
    }
  });
  return flatten(reverse ? guards.reverse() : guards)
}

function extractGuard (
  def,
  key
) {
  if (typeof def !== 'function') {
    // extend now so that global mixins are applied.
    def = _Vue.extend(def);
  }
  return def.options[key]
}

function extractLeaveGuards (deactivated) {
  return extractGuards(deactivated, 'beforeRouteLeave', bindGuard, true)
}

function extractUpdateHooks (updated) {
  return extractGuards(updated, 'beforeRouteUpdate', bindGuard)
}

function bindGuard (guard, instance) {
  return function boundRouteGuard () {
    return guard.apply(instance, arguments)
  }
}

function extractEnterGuards (
  activated,
  cbs,
  isValid
) {
  return extractGuards(activated, 'beforeRouteEnter', function (guard, _, match, key) {
    return bindEnterGuard(guard, match, key, cbs, isValid)
  })
}

function bindEnterGuard (
  guard,
  match,
  key,
  cbs,
  isValid
) {
  return function routeEnterGuard (to, from, next) {
    return guard(to, from, function (cb) {
      next(cb);
      if (typeof cb === 'function') {
        cbs.push(function () {
          // #750
          // if a router-view is wrapped with an out-in transition,
          // the instance may not have been registered at this time.
          // we will need to poll for registration until current route
          // is no longer valid.
          poll(cb, match.instances, key, isValid);
        });
      }
    })
  }
}

function poll (
  cb, // somehow flow cannot infer this is a function
  instances,
  key,
  isValid
) {
  if (instances[key]) {
    cb(instances[key]);
  } else if (isValid()) {
    setTimeout(function () {
      poll(cb, instances, key, isValid);
    }, 16);
  }
}

function resolveAsyncComponents (matched) {
  return flatMapComponents(matched, function (def, _, match, key) {
    // if it's a function and doesn't have Vue options attached,
    // assume it's an async component resolve function.
    // we are not using Vue's default async resolving mechanism because
    // we want to halt the navigation until the incoming component has been
    // resolved.
    if (typeof def === 'function' && !def.options) {
      return function (to, from, next) {
        var resolve = once(function (resolvedDef) {
          match.components[key] = resolvedDef;
          next();
        });

        var reject = once(function (reason) {
          warn(false, ("Failed to resolve async component " + key + ": " + reason));
          next(false);
        });

        var res = def(resolve, reject);
        if (res && typeof res.then === 'function') {
          res.then(resolve, reject);
        }
      }
    }
  })
}

function flatMapComponents (
  matched,
  fn
) {
  return flatten(matched.map(function (m) {
    return Object.keys(m.components).map(function (key) { return fn(
      m.components[key],
      m.instances[key],
      m, key
    ); })
  }))
}

function flatten (arr) {
  return Array.prototype.concat.apply([], arr)
}

// in Webpack 2, require.ensure now also returns a Promise
// so the resolve/reject functions may get called an extra time
// if the user uses an arrow function shorthand that happens to
// return that Promise.
function once (fn) {
  var called = false;
  return function () {
    if (called) { return }
    called = true;
    return fn.apply(this, arguments)
  }
}

/*  */


var HTML5History = (function (History$$1) {
  function HTML5History (router, base) {
    var this$1 = this;

    History$$1.call(this, router, base);

    var expectScroll = router.options.scrollBehavior;

    if (expectScroll) {
      setupScroll();
    }

    window.addEventListener('popstate', function (e) {
      this$1.transitionTo(getLocation(this$1.base), function (route) {
        if (expectScroll) {
          handleScroll(router, route, this$1.current, true);
        }
      });
    });
  }

  if ( History$$1 ) HTML5History.__proto__ = History$$1;
  HTML5History.prototype = Object.create( History$$1 && History$$1.prototype );
  HTML5History.prototype.constructor = HTML5History;

  HTML5History.prototype.go = function go (n) {
    window.history.go(n);
  };

  HTML5History.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      pushState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, this$1.current, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      replaceState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, this$1.current, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.ensureURL = function ensureURL (push) {
    if (getLocation(this.base) !== this.current.fullPath) {
      var current = cleanPath(this.base + this.current.fullPath);
      push ? pushState(current) : replaceState(current);
    }
  };

  HTML5History.prototype.getCurrentLocation = function getCurrentLocation () {
    return getLocation(this.base)
  };

  return HTML5History;
}(History));

function getLocation (base) {
  var path = window.location.pathname;
  if (base && path.indexOf(base) === 0) {
    path = path.slice(base.length);
  }
  return (path || '/') + window.location.search + window.location.hash
}

/*  */


var HashHistory = (function (History$$1) {
  function HashHistory (router, base, fallback) {
    History$$1.call(this, router, base);
    // check history fallback deeplinking
    if (fallback && checkFallback(this.base)) {
      return
    }
    ensureSlash();
  }

  if ( History$$1 ) HashHistory.__proto__ = History$$1;
  HashHistory.prototype = Object.create( History$$1 && History$$1.prototype );
  HashHistory.prototype.constructor = HashHistory;

  // this is delayed until the app mounts
  // to avoid the hashchange listener being fired too early
  HashHistory.prototype.setupListeners = function setupListeners () {
    var this$1 = this;

    window.addEventListener('hashchange', function () {
      if (!ensureSlash()) {
        return
      }
      this$1.transitionTo(getHash(), function (route) {
        replaceHash(route.fullPath);
      });
    });
  };

  HashHistory.prototype.push = function push (location, onComplete, onAbort) {
    this.transitionTo(location, function (route) {
      pushHash(route.fullPath);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    this.transitionTo(location, function (route) {
      replaceHash(route.fullPath);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.go = function go (n) {
    window.history.go(n);
  };

  HashHistory.prototype.ensureURL = function ensureURL (push) {
    var current = this.current.fullPath;
    if (getHash() !== current) {
      push ? pushHash(current) : replaceHash(current);
    }
  };

  HashHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    return getHash()
  };

  return HashHistory;
}(History));

function checkFallback (base) {
  var location = getLocation(base);
  if (!/^\/#/.test(location)) {
    window.location.replace(
      cleanPath(base + '/#' + location)
    );
    return true
  }
}

function ensureSlash () {
  var path = getHash();
  if (path.charAt(0) === '/') {
    return true
  }
  replaceHash('/' + path);
  return false
}

function getHash () {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var index = href.indexOf('#');
  return index === -1 ? '' : href.slice(index + 1)
}

function pushHash (path) {
  window.location.hash = path;
}

function replaceHash (path) {
  var i = window.location.href.indexOf('#');
  window.location.replace(
    window.location.href.slice(0, i >= 0 ? i : 0) + '#' + path
  );
}

/*  */


var AbstractHistory = (function (History$$1) {
  function AbstractHistory (router, base) {
    History$$1.call(this, router, base);
    this.stack = [];
    this.index = -1;
  }

  if ( History$$1 ) AbstractHistory.__proto__ = History$$1;
  AbstractHistory.prototype = Object.create( History$$1 && History$$1.prototype );
  AbstractHistory.prototype.constructor = AbstractHistory;

  AbstractHistory.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index + 1).concat(route);
      this$1.index++;
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index).concat(route);
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.go = function go (n) {
    var this$1 = this;

    var targetIndex = this.index + n;
    if (targetIndex < 0 || targetIndex >= this.stack.length) {
      return
    }
    var route = this.stack[targetIndex];
    this.confirmTransition(route, function () {
      this$1.index = targetIndex;
      this$1.updateRoute(route);
    });
  };

  AbstractHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    var current = this.stack[this.stack.length - 1];
    return current ? current.fullPath : '/'
  };

  AbstractHistory.prototype.ensureURL = function ensureURL () {
    // noop
  };

  return AbstractHistory;
}(History));

/*  */

var VueRouter = function VueRouter (options) {
  if ( options === void 0 ) options = {};

  this.app = null;
  this.apps = [];
  this.options = options;
  this.beforeHooks = [];
  this.afterHooks = [];
  this.matcher = createMatcher(options.routes || []);

  var mode = options.mode || 'hash';
  this.fallback = mode === 'history' && !supportsPushState;
  if (this.fallback) {
    mode = 'hash';
  }
  if (!inBrowser) {
    mode = 'abstract';
  }
  this.mode = mode;

  switch (mode) {
    case 'history':
      this.history = new HTML5History(this, options.base);
      break
    case 'hash':
      this.history = new HashHistory(this, options.base, this.fallback);
      break
    case 'abstract':
      this.history = new AbstractHistory(this, options.base);
      break
    default:
      if (process.env.NODE_ENV !== 'production') {
        assert(false, ("invalid mode: " + mode));
      }
  }
};

var prototypeAccessors = { currentRoute: {} };

VueRouter.prototype.match = function match (
  raw,
  current,
  redirectedFrom
) {
  return this.matcher.match(raw, current, redirectedFrom)
};

prototypeAccessors.currentRoute.get = function () {
  return this.history && this.history.current
};

VueRouter.prototype.init = function init (app /* Vue component instance */) {
    var this$1 = this;

  process.env.NODE_ENV !== 'production' && assert(
    install.installed,
    "not installed. Make sure to call `Vue.use(VueRouter)` " +
    "before creating root instance."
  );

  this.apps.push(app);

  // main app already initialized.
  if (this.app) {
    return
  }

  this.app = app;

  var history = this.history;

  if (history instanceof HTML5History) {
    history.transitionTo(history.getCurrentLocation());
  } else if (history instanceof HashHistory) {
    var setupHashListener = function () {
      history.setupListeners();
    };
    history.transitionTo(
      history.getCurrentLocation(),
      setupHashListener,
      setupHashListener
    );
  }

  history.listen(function (route) {
    this$1.apps.forEach(function (app) {
      app._route = route;
    });
  });
};

VueRouter.prototype.beforeEach = function beforeEach (fn) {
  this.beforeHooks.push(fn);
};

VueRouter.prototype.afterEach = function afterEach (fn) {
  this.afterHooks.push(fn);
};

VueRouter.prototype.onReady = function onReady (cb) {
  this.history.onReady(cb);
};

VueRouter.prototype.push = function push (location, onComplete, onAbort) {
  this.history.push(location, onComplete, onAbort);
};

VueRouter.prototype.replace = function replace (location, onComplete, onAbort) {
  this.history.replace(location, onComplete, onAbort);
};

VueRouter.prototype.go = function go (n) {
  this.history.go(n);
};

VueRouter.prototype.back = function back () {
  this.go(-1);
};

VueRouter.prototype.forward = function forward () {
  this.go(1);
};

VueRouter.prototype.getMatchedComponents = function getMatchedComponents (to) {
  var route = to
    ? this.resolve(to).route
    : this.currentRoute;
  if (!route) {
    return []
  }
  return [].concat.apply([], route.matched.map(function (m) {
    return Object.keys(m.components).map(function (key) {
      return m.components[key]
    })
  }))
};

VueRouter.prototype.resolve = function resolve (
  to,
  current,
  append
) {
  var location = normalizeLocation(to, current || this.history.current, append);
  var route = this.match(location, current);
  var fullPath = route.redirectedFrom || route.fullPath;
  var base = this.history.base;
  var href = createHref(base, fullPath, this.mode);
  return {
    location: location,
    route: route,
    href: href,
    // for backwards compat
    normalizedTo: location,
    resolved: route
  }
};

VueRouter.prototype.addRoutes = function addRoutes (routes) {
  this.matcher.addRoutes(routes);
  if (this.history.current !== START) {
    this.history.transitionTo(this.history.getCurrentLocation());
  }
};

Object.defineProperties( VueRouter.prototype, prototypeAccessors );

function createHref (base, fullPath, mode) {
  var path = mode === 'hash' ? '#' + fullPath : fullPath;
  return base ? cleanPath(base + '/' + path) : path
}

VueRouter.install = install;
VueRouter.version = '2.2.1';

if (inBrowser && window.Vue) {
  window.Vue.use(VueRouter);
}

/* harmony default export */ __webpack_exports__["a"] = VueRouter;

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(9)))

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(8);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(27)("578a0a8e", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/css-loader/index.js?sourceMap!../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-3746bd08\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./a.vue", function() {
     var newContent = require("!!../node_modules/css-loader/index.js?sourceMap!../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-3746bd08\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./a.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(28)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = { css: css, media: media, sourceMap: sourceMap }
    if (!newStyles[id]) {
      part.id = parentId + ':0'
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      part.id = parentId + ':' + newStyles[id].parts.length
      newStyles[id].parts.push(part)
    }
  }
  return styles
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')
  var hasSSR = styleElement != null

  // if in production mode and style is already provided by SSR,
  // simply do nothing.
  if (hasSSR && isProduction) {
    return noop
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = styleElement || createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (!hasSSR) {
    update(obj)
  }

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 28 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 29 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 30 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_weui__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_weui___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_weui__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__router_router_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vue_resource__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vue_resource___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_vue_resource__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vuex__ = __webpack_require__(5);
/**
 * Created by ASUS on 2017/3/11.
 */


__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_weui___default.a);
// import index from './app/index.vue';


__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_3_vue_resource___default.a)

__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_4_vuex__["a" /* default */])

var store = new __WEBPACK_IMPORTED_MODULE_4_vuex__["a" /* default */].Store({
    state:{

    },
    mutations:{

    }
})

new __WEBPACK_IMPORTED_MODULE_0_vue___default.a({
    router: __WEBPACK_IMPORTED_MODULE_2__router_router_js__["a" /* default */],
}).$mount('#demo')

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map