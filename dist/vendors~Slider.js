(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~Slider"],{

/***/ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/assertThisInitialized.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _assertThisInitialized(self) {\n  if (self === void 0) {\n    throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\");\n  }\n\n  return self;\n}\n\nmodule.exports = _assertThisInitialized;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/assertThisInitialized.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/classCallCheck.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _classCallCheck(instance, Constructor) {\n  if (!(instance instanceof Constructor)) {\n    throw new TypeError(\"Cannot call a class as a function\");\n  }\n}\n\nmodule.exports = _classCallCheck;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/classCallCheck.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/createClass.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/createClass.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _defineProperties(target, props) {\n  for (var i = 0; i < props.length; i++) {\n    var descriptor = props[i];\n    descriptor.enumerable = descriptor.enumerable || false;\n    descriptor.configurable = true;\n    if (\"value\" in descriptor) descriptor.writable = true;\n    Object.defineProperty(target, descriptor.key, descriptor);\n  }\n}\n\nfunction _createClass(Constructor, protoProps, staticProps) {\n  if (protoProps) _defineProperties(Constructor.prototype, protoProps);\n  if (staticProps) _defineProperties(Constructor, staticProps);\n  return Constructor;\n}\n\nmodule.exports = _createClass;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/createClass.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/getPrototypeOf.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _getPrototypeOf(o) {\n  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {\n    return o.__proto__ || Object.getPrototypeOf(o);\n  };\n  return _getPrototypeOf(o);\n}\n\nmodule.exports = _getPrototypeOf;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/getPrototypeOf.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/inherits.js":
/*!*********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/inherits.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf */ \"./node_modules/@babel/runtime/helpers/setPrototypeOf.js\");\n\nfunction _inherits(subClass, superClass) {\n  if (typeof superClass !== \"function\" && superClass !== null) {\n    throw new TypeError(\"Super expression must either be null or a function\");\n  }\n\n  subClass.prototype = Object.create(superClass && superClass.prototype, {\n    constructor: {\n      value: subClass,\n      writable: true,\n      configurable: true\n    }\n  });\n  if (superClass) setPrototypeOf(subClass, superClass);\n}\n\nmodule.exports = _inherits;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/inherits.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/objectWithoutProperties.js":
/*!************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/objectWithoutProperties.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var objectWithoutPropertiesLoose = __webpack_require__(/*! ./objectWithoutPropertiesLoose */ \"./node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js\");\n\nfunction _objectWithoutProperties(source, excluded) {\n  if (source == null) return {};\n  var target = objectWithoutPropertiesLoose(source, excluded);\n  var key, i;\n\n  if (Object.getOwnPropertySymbols) {\n    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);\n\n    for (i = 0; i < sourceSymbolKeys.length; i++) {\n      key = sourceSymbolKeys[i];\n      if (excluded.indexOf(key) >= 0) continue;\n      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;\n      target[key] = source[key];\n    }\n  }\n\n  return target;\n}\n\nmodule.exports = _objectWithoutProperties;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/objectWithoutProperties.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _objectWithoutPropertiesLoose(source, excluded) {\n  if (source == null) return {};\n  var target = {};\n  var sourceKeys = Object.keys(source);\n  var key, i;\n\n  for (i = 0; i < sourceKeys.length; i++) {\n    key = sourceKeys[i];\n    if (excluded.indexOf(key) >= 0) continue;\n    target[key] = source[key];\n  }\n\n  return target;\n}\n\nmodule.exports = _objectWithoutPropertiesLoose;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _typeof = __webpack_require__(/*! ../helpers/typeof */ \"./node_modules/@babel/runtime/helpers/typeof.js\");\n\nvar assertThisInitialized = __webpack_require__(/*! ./assertThisInitialized */ \"./node_modules/@babel/runtime/helpers/assertThisInitialized.js\");\n\nfunction _possibleConstructorReturn(self, call) {\n  if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) {\n    return call;\n  }\n\n  return assertThisInitialized(self);\n}\n\nmodule.exports = _possibleConstructorReturn;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/setPrototypeOf.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/setPrototypeOf.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _setPrototypeOf(o, p) {\n  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {\n    o.__proto__ = p;\n    return o;\n  };\n\n  return _setPrototypeOf(o, p);\n}\n\nmodule.exports = _setPrototypeOf;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/setPrototypeOf.js?");

/***/ }),

/***/ "./node_modules/fbjs/lib/shallowEqual.js":
/*!***********************************************!*\
  !*** ./node_modules/fbjs/lib/shallowEqual.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/**\n * Copyright (c) 2013-present, Facebook, Inc.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n *\n * @typechecks\n * \n */\n\n/*eslint-disable no-self-compare */\n\n\n\nvar hasOwnProperty = Object.prototype.hasOwnProperty;\n\n/**\n * inlined Object.is polyfill to avoid requiring consumers ship their own\n * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is\n */\nfunction is(x, y) {\n  // SameValue algorithm\n  if (x === y) {\n    // Steps 1-5, 7-10\n    // Steps 6.b-6.e: +0 != -0\n    // Added the nonzero y check to make Flow happy, but it is redundant\n    return x !== 0 || y !== 0 || 1 / x === 1 / y;\n  } else {\n    // Step 6.a: NaN == NaN\n    return x !== x && y !== y;\n  }\n}\n\n/**\n * Performs equality by iterating through keys on an object and returning false\n * when any key has values which are not strictly equal between the arguments.\n * Returns true when the values of all keys are strictly equal.\n */\nfunction shallowEqual(objA, objB) {\n  if (is(objA, objB)) {\n    return true;\n  }\n\n  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {\n    return false;\n  }\n\n  var keysA = Object.keys(objA);\n  var keysB = Object.keys(objB);\n\n  if (keysA.length !== keysB.length) {\n    return false;\n  }\n\n  // Test for A's keys different from B.\n  for (var i = 0; i < keysA.length; i++) {\n    if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {\n      return false;\n    }\n  }\n\n  return true;\n}\n\nmodule.exports = shallowEqual;\n\n//# sourceURL=webpack:///./node_modules/fbjs/lib/shallowEqual.js?");

/***/ }),

/***/ "./node_modules/keycode/index.js":
/*!***************************************!*\
  !*** ./node_modules/keycode/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// Source: http://jsfiddle.net/vWx8V/\n// http://stackoverflow.com/questions/5603195/full-list-of-javascript-keycodes\n\n/**\n * Conenience method returns corresponding value for given keyName or keyCode.\n *\n * @param {Mixed} keyCode {Number} or keyName {String}\n * @return {Mixed}\n * @api public\n */\n\nfunction keyCode(searchInput) {\n  // Keyboard Events\n  if (searchInput && 'object' === typeof searchInput) {\n    var hasKeyCode = searchInput.which || searchInput.keyCode || searchInput.charCode\n    if (hasKeyCode) searchInput = hasKeyCode\n  }\n\n  // Numbers\n  if ('number' === typeof searchInput) return names[searchInput]\n\n  // Everything else (cast to string)\n  var search = String(searchInput)\n\n  // check codes\n  var foundNamedKey = codes[search.toLowerCase()]\n  if (foundNamedKey) return foundNamedKey\n\n  // check aliases\n  var foundNamedKey = aliases[search.toLowerCase()]\n  if (foundNamedKey) return foundNamedKey\n\n  // weird character?\n  if (search.length === 1) return search.charCodeAt(0)\n\n  return undefined\n}\n\n/**\n * Compares a keyboard event with a given keyCode or keyName.\n *\n * @param {Event} event Keyboard event that should be tested\n * @param {Mixed} keyCode {Number} or keyName {String}\n * @return {Boolean}\n * @api public\n */\nkeyCode.isEventKey = function isEventKey(event, nameOrCode) {\n  if (event && 'object' === typeof event) {\n    var keyCode = event.which || event.keyCode || event.charCode\n    if (keyCode === null || keyCode === undefined) { return false; }\n    if (typeof nameOrCode === 'string') {\n      // check codes\n      var foundNamedKey = codes[nameOrCode.toLowerCase()]\n      if (foundNamedKey) { return foundNamedKey === keyCode; }\n    \n      // check aliases\n      var foundNamedKey = aliases[nameOrCode.toLowerCase()]\n      if (foundNamedKey) { return foundNamedKey === keyCode; }\n    } else if (typeof nameOrCode === 'number') {\n      return nameOrCode === keyCode;\n    }\n    return false;\n  }\n}\n\nexports = module.exports = keyCode;\n\n/**\n * Get by name\n *\n *   exports.code['enter'] // => 13\n */\n\nvar codes = exports.code = exports.codes = {\n  'backspace': 8,\n  'tab': 9,\n  'enter': 13,\n  'shift': 16,\n  'ctrl': 17,\n  'alt': 18,\n  'pause/break': 19,\n  'caps lock': 20,\n  'esc': 27,\n  'space': 32,\n  'page up': 33,\n  'page down': 34,\n  'end': 35,\n  'home': 36,\n  'left': 37,\n  'up': 38,\n  'right': 39,\n  'down': 40,\n  'insert': 45,\n  'delete': 46,\n  'command': 91,\n  'left command': 91,\n  'right command': 93,\n  'numpad *': 106,\n  'numpad +': 107,\n  'numpad -': 109,\n  'numpad .': 110,\n  'numpad /': 111,\n  'num lock': 144,\n  'scroll lock': 145,\n  'my computer': 182,\n  'my calculator': 183,\n  ';': 186,\n  '=': 187,\n  ',': 188,\n  '-': 189,\n  '.': 190,\n  '/': 191,\n  '`': 192,\n  '[': 219,\n  '\\\\': 220,\n  ']': 221,\n  \"'\": 222\n}\n\n// Helper aliases\n\nvar aliases = exports.aliases = {\n  'windows': 91,\n  '⇧': 16,\n  '⌥': 18,\n  '⌃': 17,\n  '⌘': 91,\n  'ctl': 17,\n  'control': 17,\n  'option': 18,\n  'pause': 19,\n  'break': 19,\n  'caps': 20,\n  'return': 13,\n  'escape': 27,\n  'spc': 32,\n  'spacebar': 32,\n  'pgup': 33,\n  'pgdn': 34,\n  'ins': 45,\n  'del': 46,\n  'cmd': 91\n}\n\n/*!\n * Programatically add the following\n */\n\n// lower case chars\nfor (i = 97; i < 123; i++) codes[String.fromCharCode(i)] = i - 32\n\n// numbers\nfor (var i = 48; i < 58; i++) codes[i - 48] = i\n\n// function keys\nfor (i = 1; i < 13; i++) codes['f'+i] = i + 111\n\n// numpad keys\nfor (i = 0; i < 10; i++) codes['numpad '+i] = i + 96\n\n/**\n * Get by code\n *\n *   exports.name[13] // => 'Enter'\n */\n\nvar names = exports.names = exports.title = {} // title for backward compat\n\n// Create reverse mapping\nfor (i in codes) names[codes[i]] = i\n\n// Add aliases\nfor (var alias in aliases) {\n  codes[alias] = aliases[alias]\n}\n\n\n//# sourceURL=webpack:///./node_modules/keycode/index.js?");

/***/ }),

/***/ "./node_modules/react-event-listener/dist/react-event-listener.cjs.js":
/*!****************************************************************************!*\
  !*** ./node_modules/react-event-listener/dist/react-event-listener.cjs.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, '__esModule', { value: true });\n\nfunction _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }\n\nvar _classCallCheck = _interopDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/@babel/runtime/helpers/classCallCheck.js\"));\nvar _createClass = _interopDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ \"./node_modules/@babel/runtime/helpers/createClass.js\"));\nvar _possibleConstructorReturn = _interopDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ \"./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js\"));\nvar _getPrototypeOf = _interopDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ \"./node_modules/@babel/runtime/helpers/getPrototypeOf.js\"));\nvar _inherits = _interopDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ \"./node_modules/@babel/runtime/helpers/inherits.js\"));\nvar _typeof = _interopDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ \"./node_modules/@babel/runtime/helpers/typeof.js\"));\nvar _objectWithoutProperties = _interopDefault(__webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ \"./node_modules/@babel/runtime/helpers/objectWithoutProperties.js\"));\nvar _extends = _interopDefault(__webpack_require__(/*! @babel/runtime/helpers/extends */ \"./node_modules/@babel/runtime/helpers/extends.js\"));\nvar React = _interopDefault(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\nvar PropTypes = _interopDefault(__webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\"));\nvar warning = _interopDefault(__webpack_require__(/*! warning */ \"./node_modules/warning/warning.js\"));\n\nfunction defineProperty(object, property, attr) {\n  return Object.defineProperty(object, property, attr);\n} // Passive options\n// Inspired by https://github.com/Modernizr/Modernizr/blob/master/feature-detects/dom/passiveeventlisteners.js\n\n\nvar passiveOption = function () {\n  var cache = null;\n  return function () {\n    if (cache !== null) {\n      return cache;\n    }\n\n    var supportsPassiveOption = false;\n\n    try {\n      window.addEventListener('test', null, defineProperty({}, 'passive', {\n        get: function get() {\n          supportsPassiveOption = true;\n        }\n      }));\n    } catch (err) {//\n    }\n\n    cache = supportsPassiveOption;\n    return supportsPassiveOption;\n  }();\n}();\n\nvar defaultEventOptions = {\n  capture: false,\n  passive: false\n};\n\nfunction mergeDefaultEventOptions(options) {\n  return _extends({}, defaultEventOptions, options);\n}\n\nfunction getEventListenerArgs(eventName, callback, options) {\n  var args = [eventName, callback];\n  args.push(passiveOption ? options : options.capture);\n  return args;\n}\n\nfunction on(target, eventName, callback, options) {\n  // eslint-disable-next-line prefer-spread\n  target.addEventListener.apply(target, getEventListenerArgs(eventName, callback, options));\n}\n\nfunction off(target, eventName, callback, options) {\n  // eslint-disable-next-line prefer-spread\n  target.removeEventListener.apply(target, getEventListenerArgs(eventName, callback, options));\n}\n\nfunction forEachListener(props, iteratee) {\n  var children = props.children,\n      target = props.target,\n      eventProps = _objectWithoutProperties(props, [\"children\", \"target\"]);\n\n  Object.keys(eventProps).forEach(function (name) {\n    if (name.substring(0, 2) !== 'on') {\n      return;\n    }\n\n    var prop = eventProps[name];\n\n    var type = _typeof(prop);\n\n    var isObject = type === 'object';\n    var isFunction = type === 'function';\n\n    if (!isObject && !isFunction) {\n      return;\n    }\n\n    var capture = name.substr(-7).toLowerCase() === 'capture';\n    var eventName = name.substring(2).toLowerCase();\n    eventName = capture ? eventName.substring(0, eventName.length - 7) : eventName;\n\n    if (isObject) {\n      iteratee(eventName, prop.handler, prop.options);\n    } else {\n      iteratee(eventName, prop, mergeDefaultEventOptions({\n        capture: capture\n      }));\n    }\n  });\n}\n\nfunction withOptions(handler, options) {\n   true ? warning(options, 'react-event-listener: should be specified options in withOptions.') : undefined;\n  return {\n    handler: handler,\n    options: mergeDefaultEventOptions(options)\n  };\n}\n\nvar EventListener =\n/*#__PURE__*/\nfunction (_React$PureComponent) {\n  _inherits(EventListener, _React$PureComponent);\n\n  function EventListener() {\n    _classCallCheck(this, EventListener);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(EventListener).apply(this, arguments));\n  }\n\n  _createClass(EventListener, [{\n    key: \"componentDidMount\",\n    value: function componentDidMount() {\n      this.applyListeners(on);\n    }\n  }, {\n    key: \"componentDidUpdate\",\n    value: function componentDidUpdate(prevProps) {\n      this.applyListeners(off, prevProps);\n      this.applyListeners(on);\n    }\n  }, {\n    key: \"componentWillUnmount\",\n    value: function componentWillUnmount() {\n      this.applyListeners(off);\n    }\n  }, {\n    key: \"applyListeners\",\n    value: function applyListeners(onOrOff) {\n      var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.props;\n      var target = props.target;\n\n      if (target) {\n        var element = target;\n\n        if (typeof target === 'string') {\n          element = window[target];\n        }\n\n        forEachListener(props, onOrOff.bind(null, element));\n      }\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      return this.props.children || null;\n    }\n  }]);\n\n  return EventListener;\n}(React.PureComponent);\n\nEventListener.propTypes =  true ? {\n  /**\n   * You can provide a single child too.\n   */\n  children: PropTypes.node,\n\n  /**\n   * The DOM target to listen to.\n   */\n  target: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired\n} : undefined;\n\nexports.withOptions = withOptions;\nexports.default = EventListener;\n\n\n//# sourceURL=webpack:///./node_modules/react-event-listener/dist/react-event-listener.cjs.js?");

/***/ }),

/***/ "./node_modules/react-swipeable-views-utils/lib/autoPlay.js":
/*!******************************************************************!*\
  !*** ./node_modules/react-swipeable-views-utils/lib/autoPlay.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/react-swipeable-views-utils/node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = autoPlay;\n\nvar _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/extends */ \"./node_modules/react-swipeable-views-utils/node_modules/@babel/runtime/helpers/extends.js\"));\n\nvar _objectWithoutProperties2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ \"./node_modules/react-swipeable-views-utils/node_modules/@babel/runtime/helpers/objectWithoutProperties.js\"));\n\nvar _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/react-swipeable-views-utils/node_modules/@babel/runtime/helpers/classCallCheck.js\"));\n\nvar _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ \"./node_modules/react-swipeable-views-utils/node_modules/@babel/runtime/helpers/createClass.js\"));\n\nvar _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ \"./node_modules/react-swipeable-views-utils/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js\"));\n\nvar _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ \"./node_modules/react-swipeable-views-utils/node_modules/@babel/runtime/helpers/getPrototypeOf.js\"));\n\nvar _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ \"./node_modules/react-swipeable-views-utils/node_modules/@babel/runtime/helpers/inherits.js\"));\n\nvar _react = _interopRequireDefault(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\n\nvar _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\"));\n\nvar _shallowEqual = _interopRequireDefault(__webpack_require__(/*! fbjs/lib/shallowEqual */ \"./node_modules/fbjs/lib/shallowEqual.js\"));\n\nvar _reactEventListener = _interopRequireDefault(__webpack_require__(/*! react-event-listener */ \"./node_modules/react-event-listener/dist/react-event-listener.cjs.js\"));\n\nvar _reactSwipeableViewsCore = __webpack_require__(/*! react-swipeable-views-core */ \"./node_modules/react-swipeable-views-core/lib/index.js\");\n\nfunction autoPlay(MyComponent) {\n  var AutoPlay =\n  /*#__PURE__*/\n  function (_React$Component) {\n    (0, _inherits2.default)(AutoPlay, _React$Component);\n\n    function AutoPlay(props) {\n      var _this;\n\n      (0, _classCallCheck2.default)(this, AutoPlay);\n      _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(AutoPlay).call(this, props));\n      _this.timer = null;\n      _this.state = {};\n\n      _this.handleInterval = function () {\n        var _this$props = _this.props,\n            children = _this$props.children,\n            direction = _this$props.direction,\n            onChangeIndex = _this$props.onChangeIndex,\n            slideCount = _this$props.slideCount;\n        var indexLatest = _this.state.index;\n        var indexNew = indexLatest;\n\n        if (direction === 'incremental') {\n          indexNew += 1;\n        } else {\n          indexNew -= 1;\n        }\n\n        if (slideCount || children) {\n          indexNew = (0, _reactSwipeableViewsCore.mod)(indexNew, slideCount || _react.default.Children.count(children));\n        } // Is uncontrolled\n\n\n        if (_this.props.index === undefined) {\n          _this.setState({\n            index: indexNew\n          });\n        }\n\n        if (onChangeIndex) {\n          onChangeIndex(indexNew, indexLatest);\n        }\n      };\n\n      _this.handleChangeIndex = function (index, indexLatest) {\n        // Is uncontrolled\n        if (_this.props.index === undefined) {\n          _this.setState({\n            index: index\n          });\n        }\n\n        if (_this.props.onChangeIndex) {\n          _this.props.onChangeIndex(index, indexLatest);\n        }\n      };\n\n      _this.handleSwitching = function (index, type) {\n        if (_this.timer) {\n          clearInterval(_this.timer);\n          _this.timer = null;\n        } else if (type === 'end') {\n          _this.startInterval();\n        }\n\n        if (_this.props.onSwitching) {\n          _this.props.onSwitching(index, type);\n        }\n      };\n\n      _this.handleVisibilityChange = function (e) {\n        if (e.target.hidden) {\n          clearInterval(_this.timer);\n        } else {\n          _this.startInterval();\n        }\n      };\n\n      _this.state.index = props.index || 0;\n      return _this;\n    }\n\n    (0, _createClass2.default)(AutoPlay, [{\n      key: \"componentDidMount\",\n      value: function componentDidMount() {\n        this.startInterval();\n      }\n    }, {\n      key: \"componentWillReceiveProps\",\n      value: function componentWillReceiveProps(nextProps) {\n        var index = nextProps.index;\n\n        if (typeof index === 'number' && index !== this.props.index) {\n          this.setState({\n            index: index\n          });\n        }\n      }\n    }, {\n      key: \"componentDidUpdate\",\n      value: function componentDidUpdate(prevProps) {\n        var shouldResetInterval = !(0, _shallowEqual.default)({\n          index: prevProps.index,\n          interval: prevProps.interval,\n          autoplay: prevProps.autoplay\n        }, {\n          index: this.props.index,\n          interval: this.props.interval,\n          autoplay: this.props.autoplay\n        });\n\n        if (shouldResetInterval) {\n          this.startInterval();\n        }\n      }\n    }, {\n      key: \"componentWillUnmount\",\n      value: function componentWillUnmount() {\n        clearInterval(this.timer);\n      }\n    }, {\n      key: \"startInterval\",\n      value: function startInterval() {\n        var _this$props2 = this.props,\n            autoplay = _this$props2.autoplay,\n            interval = _this$props2.interval;\n        clearInterval(this.timer);\n\n        if (autoplay) {\n          this.timer = setInterval(this.handleInterval, interval);\n        }\n      }\n    }, {\n      key: \"render\",\n      value: function render() {\n        var _this$props3 = this.props,\n            autoplay = _this$props3.autoplay,\n            direction = _this$props3.direction,\n            indexProp = _this$props3.index,\n            interval = _this$props3.interval,\n            onChangeIndex = _this$props3.onChangeIndex,\n            other = (0, _objectWithoutProperties2.default)(_this$props3, [\"autoplay\", \"direction\", \"index\", \"interval\", \"onChangeIndex\"]);\n        var index = this.state.index;\n\n        if (!autoplay) {\n          return _react.default.createElement(MyComponent, (0, _extends2.default)({\n            index: index,\n            onChangeIndex: onChangeIndex\n          }, other));\n        }\n\n        return _react.default.createElement(_reactEventListener.default, {\n          target: \"document\",\n          onVisibilityChange: this.handleVisibilityChange\n        }, _react.default.createElement(MyComponent, (0, _extends2.default)({\n          index: index,\n          onChangeIndex: this.handleChangeIndex,\n          onSwitching: this.handleSwitching\n        }, other)));\n      }\n    }]);\n    return AutoPlay;\n  }(_react.default.Component);\n\n  AutoPlay.propTypes =  true ? {\n    /**\n     * If `false`, the auto play behavior is disabled.\n     */\n    autoplay: _propTypes.default.bool,\n\n    /**\n     * @ignore\n     */\n    children: _propTypes.default.node,\n\n    /**\n     * This is the auto play direction.\n     */\n    direction: _propTypes.default.oneOf(['incremental', 'decremental']),\n\n    /**\n     * @ignore\n     */\n    index: _propTypes.default.number,\n\n    /**\n     * Delay between auto play transitions (in ms).\n     */\n    interval: _propTypes.default.number,\n\n    /**\n     * @ignore\n     */\n    onChangeIndex: _propTypes.default.func,\n\n    /**\n     * @ignore\n     */\n    onSwitching: _propTypes.default.func,\n\n    /**\n     * @ignore\n     */\n    slideCount: _propTypes.default.number\n  } : undefined;\n  AutoPlay.defaultProps = {\n    autoplay: true,\n    direction: 'incremental',\n    interval: 3000\n  };\n  return AutoPlay;\n}\n\n//# sourceURL=webpack:///./node_modules/react-swipeable-views-utils/lib/autoPlay.js?");

/***/ }),

/***/ "./node_modules/react-swipeable-views-utils/lib/bindKeyboard.js":
/*!**********************************************************************!*\
  !*** ./node_modules/react-swipeable-views-utils/lib/bindKeyboard.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/react-swipeable-views-utils/node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = bindKeyboard;\n\nvar _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/extends */ \"./node_modules/react-swipeable-views-utils/node_modules/@babel/runtime/helpers/extends.js\"));\n\nvar _objectWithoutProperties2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ \"./node_modules/react-swipeable-views-utils/node_modules/@babel/runtime/helpers/objectWithoutProperties.js\"));\n\nvar _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/react-swipeable-views-utils/node_modules/@babel/runtime/helpers/classCallCheck.js\"));\n\nvar _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ \"./node_modules/react-swipeable-views-utils/node_modules/@babel/runtime/helpers/createClass.js\"));\n\nvar _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ \"./node_modules/react-swipeable-views-utils/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js\"));\n\nvar _getPrototypeOf3 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ \"./node_modules/react-swipeable-views-utils/node_modules/@babel/runtime/helpers/getPrototypeOf.js\"));\n\nvar _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ \"./node_modules/react-swipeable-views-utils/node_modules/@babel/runtime/helpers/inherits.js\"));\n\nvar _react = _interopRequireDefault(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\n\nvar _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\"));\n\nvar _keycode = _interopRequireDefault(__webpack_require__(/*! keycode */ \"./node_modules/keycode/index.js\"));\n\nvar _reactEventListener = _interopRequireDefault(__webpack_require__(/*! react-event-listener */ \"./node_modules/react-event-listener/dist/react-event-listener.cjs.js\"));\n\nvar _reactSwipeableViewsCore = __webpack_require__(/*! react-swipeable-views-core */ \"./node_modules/react-swipeable-views-core/lib/index.js\");\n\nfunction bindKeyboard(MyComponent) {\n  var BindKeyboard =\n  /*#__PURE__*/\n  function (_React$Component) {\n    (0, _inherits2.default)(BindKeyboard, _React$Component);\n\n    function BindKeyboard() {\n      var _getPrototypeOf2;\n\n      var _this;\n\n      (0, _classCallCheck2.default)(this, BindKeyboard);\n\n      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {\n        args[_key] = arguments[_key];\n      }\n\n      _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(BindKeyboard)).call.apply(_getPrototypeOf2, [this].concat(args)));\n      _this.state = {};\n\n      _this.handleKeyDown = function (event) {\n        var action;\n        var _this$props = _this.props,\n            _this$props$axis = _this$props.axis,\n            axis = _this$props$axis === void 0 ? 'x' : _this$props$axis,\n            children = _this$props.children,\n            onChangeIndex = _this$props.onChangeIndex,\n            slideCount = _this$props.slideCount;\n\n        switch ((0, _keycode.default)(event)) {\n          case 'page down':\n          case 'down':\n            if (axis === 'y') {\n              action = 'decrease';\n            } else if (axis === 'y-reverse') {\n              action = 'increase';\n            }\n\n            break;\n\n          case 'left':\n            if (axis === 'x') {\n              action = 'decrease';\n            } else if (axis === 'x-reverse') {\n              action = 'increase';\n            }\n\n            break;\n\n          case 'page up':\n          case 'up':\n            if (axis === 'y') {\n              action = 'increase';\n            } else if (axis === 'y-reverse') {\n              action = 'decrease';\n            }\n\n            break;\n\n          case 'right':\n            if (axis === 'x') {\n              action = 'increase';\n            } else if (axis === 'x-reverse') {\n              action = 'decrease';\n            }\n\n            break;\n\n          default:\n            break;\n        }\n\n        if (action) {\n          var indexLatest = _this.state.index;\n          var indexNew = indexLatest;\n\n          if (action === 'increase') {\n            indexNew += 1;\n          } else {\n            indexNew -= 1;\n          }\n\n          if (slideCount || children) {\n            indexNew = (0, _reactSwipeableViewsCore.mod)(indexNew, slideCount || _react.default.Children.count(children));\n          } // Is uncontrolled\n\n\n          if (_this.props.index === undefined) {\n            _this.setState({\n              index: indexNew\n            });\n          }\n\n          if (onChangeIndex) {\n            onChangeIndex(indexNew, indexLatest);\n          }\n        }\n      };\n\n      _this.handleChangeIndex = function (index, indexLatest) {\n        // Is uncontrolled\n        if (_this.props.index === undefined) {\n          _this.setState({\n            index: index\n          });\n        }\n\n        if (_this.props.onChangeIndex) {\n          _this.props.onChangeIndex(index, indexLatest);\n        }\n      };\n\n      return _this;\n    }\n\n    (0, _createClass2.default)(BindKeyboard, [{\n      key: \"componentWillMount\",\n      value: function componentWillMount() {\n        this.setState({\n          index: this.props.index || 0\n        });\n      }\n    }, {\n      key: \"componentWillReceiveProps\",\n      value: function componentWillReceiveProps(nextProps) {\n        var index = nextProps.index;\n\n        if (typeof index === 'number' && index !== this.props.index) {\n          this.setState({\n            index: index\n          });\n        }\n      }\n    }, {\n      key: \"render\",\n      value: function render() {\n        var _this$props2 = this.props,\n            indexProp = _this$props2.index,\n            onChangeIndex = _this$props2.onChangeIndex,\n            other = (0, _objectWithoutProperties2.default)(_this$props2, [\"index\", \"onChangeIndex\"]);\n        var index = this.state.index;\n        return _react.default.createElement(_reactEventListener.default, {\n          target: \"window\",\n          onKeyDown: this.handleKeyDown\n        }, _react.default.createElement(MyComponent, (0, _extends2.default)({\n          index: index,\n          onChangeIndex: this.handleChangeIndex\n        }, other)));\n      }\n    }]);\n    return BindKeyboard;\n  }(_react.default.Component);\n\n  BindKeyboard.propTypes =  true ? {\n    /**\n     * @ignore\n     */\n    axis: _propTypes.default.oneOf(['x', 'x-reverse', 'y', 'y-reverse']),\n\n    /**\n     * @ignore\n     */\n    children: _propTypes.default.node,\n\n    /**\n     * @ignore\n     */\n    index: _propTypes.default.number,\n\n    /**\n     * @ignore\n     */\n    onChangeIndex: _propTypes.default.func,\n\n    /**\n     * @ignore\n     */\n    slideCount: _propTypes.default.number\n  } : undefined;\n  return BindKeyboard;\n}\n\n//# sourceURL=webpack:///./node_modules/react-swipeable-views-utils/lib/bindKeyboard.js?");

/***/ }),

/***/ "./node_modules/react-swipeable-views-utils/lib/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/react-swipeable-views-utils/lib/index.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/react-swipeable-views-utils/node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nObject.defineProperty(exports, \"autoPlay\", {\n  enumerable: true,\n  get: function get() {\n    return _autoPlay.default;\n  }\n});\nObject.defineProperty(exports, \"bindKeyboard\", {\n  enumerable: true,\n  get: function get() {\n    return _bindKeyboard.default;\n  }\n});\nObject.defineProperty(exports, \"virtualize\", {\n  enumerable: true,\n  get: function get() {\n    return _virtualize.default;\n  }\n});\n\nvar _autoPlay = _interopRequireDefault(__webpack_require__(/*! ./autoPlay */ \"./node_modules/react-swipeable-views-utils/lib/autoPlay.js\"));\n\nvar _bindKeyboard = _interopRequireDefault(__webpack_require__(/*! ./bindKeyboard */ \"./node_modules/react-swipeable-views-utils/lib/bindKeyboard.js\"));\n\nvar _virtualize = _interopRequireDefault(__webpack_require__(/*! ./virtualize */ \"./node_modules/react-swipeable-views-utils/lib/virtualize.js\"));\n\n//# sourceURL=webpack:///./node_modules/react-swipeable-views-utils/lib/index.js?");

/***/ }),

/***/ "./node_modules/react-swipeable-views-utils/lib/virtualize.js":
/*!********************************************************************!*\
  !*** ./node_modules/react-swipeable-views-utils/lib/virtualize.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ \"./node_modules/react-swipeable-views-utils/node_modules/@babel/runtime/helpers/interopRequireWildcard.js\");\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/react-swipeable-views-utils/node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = virtualize;\n\nvar _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/extends */ \"./node_modules/react-swipeable-views-utils/node_modules/@babel/runtime/helpers/extends.js\"));\n\nvar _objectWithoutProperties2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ \"./node_modules/react-swipeable-views-utils/node_modules/@babel/runtime/helpers/objectWithoutProperties.js\"));\n\nvar _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/react-swipeable-views-utils/node_modules/@babel/runtime/helpers/classCallCheck.js\"));\n\nvar _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ \"./node_modules/react-swipeable-views-utils/node_modules/@babel/runtime/helpers/createClass.js\"));\n\nvar _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ \"./node_modules/react-swipeable-views-utils/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js\"));\n\nvar _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ \"./node_modules/react-swipeable-views-utils/node_modules/@babel/runtime/helpers/getPrototypeOf.js\"));\n\nvar _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ \"./node_modules/react-swipeable-views-utils/node_modules/@babel/runtime/helpers/inherits.js\"));\n\nvar _react = _interopRequireWildcard(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\n\nvar _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\"));\n\nvar _reactSwipeableViewsCore = __webpack_require__(/*! react-swipeable-views-core */ \"./node_modules/react-swipeable-views-core/lib/index.js\");\n\nfunction virtualize(MyComponent) {\n  var Virtualize =\n  /*#__PURE__*/\n  function (_PureComponent) {\n    (0, _inherits2.default)(Virtualize, _PureComponent);\n\n    function Virtualize(props) {\n      var _this;\n\n      (0, _classCallCheck2.default)(this, Virtualize);\n      _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Virtualize).call(this, props));\n      _this.timer = null;\n      _this.state = {};\n\n      _this.handleChangeIndex = function (indexContainer, indexLatest) {\n        var _this$props = _this.props,\n            slideCount = _this$props.slideCount,\n            onChangeIndex = _this$props.onChangeIndex;\n        var indexDiff = indexContainer - indexLatest;\n        var index = _this.state.index + indexDiff;\n\n        if (slideCount) {\n          index = (0, _reactSwipeableViewsCore.mod)(index, slideCount);\n        } // Is uncontrolled\n\n\n        if (_this.props.index === undefined) {\n          _this.setIndex(index, indexContainer, indexDiff);\n        }\n\n        if (onChangeIndex) {\n          onChangeIndex(index, _this.state.index);\n        }\n      };\n\n      _this.handleTransitionEnd = function () {\n        // Delay the update of the window to fix an issue with react-motion.\n        _this.timer = setTimeout(function () {\n          _this.setWindow();\n        }, 0);\n\n        if (_this.props.onTransitionEnd) {\n          _this.props.onTransitionEnd();\n        }\n      };\n\n      _this.state.index = props.index || 0;\n      return _this;\n    }\n    /**\n     *\n     *           index          indexStop\n     *             |              |\n     * indexStart  |       indexContainer\n     *   |         |         |    |\n     * ------------|-------------------------->\n     *  -2    -1   0    1    2    3    4    5\n     */\n\n\n    (0, _createClass2.default)(Virtualize, [{\n      key: \"componentWillMount\",\n      value: function componentWillMount() {\n        this.setWindow(this.state.index);\n      }\n    }, {\n      key: \"componentWillReceiveProps\",\n      value: function componentWillReceiveProps(nextProps) {\n        var index = nextProps.index;\n\n        if (typeof index === 'number' && index !== this.props.index) {\n          var indexDiff = index - this.props.index;\n          this.setIndex(index, this.state.indexContainer + indexDiff, indexDiff);\n        }\n      }\n    }, {\n      key: \"componentWillUnmount\",\n      value: function componentWillUnmount() {\n        clearInterval(this.timer);\n      }\n    }, {\n      key: \"setIndex\",\n      value: function setIndex(index, indexContainer, indexDiff) {\n        var nextState = {\n          index: index,\n          indexContainer: indexContainer,\n          indexStart: this.state.indexStart,\n          indexStop: this.state.indexStop\n        }; // We are going forward, let's render one more slide ahead.\n\n        if (indexDiff > 0 && (!this.props.slideCount || nextState.indexStop < this.props.slideCount - 1)) {\n          nextState.indexStop += 1;\n        } // Extend the bounds if needed.\n\n\n        if (index > nextState.indexStop) {\n          nextState.indexStop = index;\n        }\n\n        var beforeAhead = nextState.indexStart - index; // Extend the bounds if needed.\n\n        if (beforeAhead > 0) {\n          nextState.indexContainer += beforeAhead;\n          nextState.indexStart -= beforeAhead;\n        }\n\n        this.setState(nextState);\n      }\n    }, {\n      key: \"setWindow\",\n      value: function setWindow() {\n        var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state.index;\n        var slideCount = this.props.slideCount;\n        var beforeAhead = this.props.overscanSlideBefore;\n        var afterAhead = this.props.overscanSlideAfter;\n\n        if (slideCount) {\n          if (beforeAhead > index) {\n            beforeAhead = index;\n          }\n\n          if (afterAhead + index > slideCount - 1) {\n            afterAhead = slideCount - index - 1;\n          }\n        }\n\n        this.setState({\n          indexContainer: beforeAhead,\n          indexStart: index - beforeAhead,\n          indexStop: index + afterAhead\n        });\n      }\n    }, {\n      key: \"render\",\n      value: function render() {\n        var _this$props2 = this.props,\n            children = _this$props2.children,\n            indexProp = _this$props2.index,\n            onChangeIndex = _this$props2.onChangeIndex,\n            onTransitionEnd = _this$props2.onTransitionEnd,\n            overscanSlideAfter = _this$props2.overscanSlideAfter,\n            overscanSlideBefore = _this$props2.overscanSlideBefore,\n            slideCount = _this$props2.slideCount,\n            slideRenderer = _this$props2.slideRenderer,\n            other = (0, _objectWithoutProperties2.default)(_this$props2, [\"children\", \"index\", \"onChangeIndex\", \"onTransitionEnd\", \"overscanSlideAfter\", \"overscanSlideBefore\", \"slideCount\", \"slideRenderer\"]);\n        var _this$state = this.state,\n            indexContainer = _this$state.indexContainer,\n            indexStart = _this$state.indexStart,\n            indexStop = _this$state.indexStop;\n        var slides = [];\n\n        for (var slideIndex = indexStart; slideIndex <= indexStop; slideIndex += 1) {\n          slides.push(slideRenderer({\n            index: slideIndex,\n            key: slideIndex\n          }));\n        }\n\n        return _react.default.createElement(MyComponent, (0, _extends2.default)({\n          index: indexContainer,\n          onChangeIndex: this.handleChangeIndex,\n          onTransitionEnd: this.handleTransitionEnd\n        }, other), slides);\n      }\n    }]);\n    return Virtualize;\n  }(_react.PureComponent);\n\n  Virtualize.propTypes =  true ? {\n    /**\n     * @ignore\n     */\n    children: function children(props, propName) {\n      if (props[propName] !== undefined) {\n        return new Error(\"The children property isn't supported.\");\n      }\n\n      return null;\n    },\n\n    /**\n     * @ignore\n     */\n    index: _propTypes.default.number,\n\n    /**\n     * @ignore\n     */\n    onChangeIndex: _propTypes.default.func,\n\n    /**\n     * @ignore\n     */\n    onTransitionEnd: _propTypes.default.func,\n\n    /**\n     * Number of slide to render after the visible slide.\n     */\n    overscanSlideAfter: _propTypes.default.number,\n\n    /**\n     * Number of slide to render before the visible slide.\n     */\n    overscanSlideBefore: _propTypes.default.number,\n\n    /**\n     * When set, it's adding a limit to the number of slide: [0, slideCount].\n     */\n    slideCount: _propTypes.default.number,\n\n    /**\n     * Responsible for rendering a slide given an index.\n     * ({ index: number }): node.\n     */\n    slideRenderer: _propTypes.default.func.isRequired\n  } : undefined;\n  Virtualize.defaultProps = {\n    overscanSlideAfter: 2,\n    // Render one more slide for going backward as it's more difficult to\n    // keep the window up to date.\n    overscanSlideBefore: 3\n  };\n  return Virtualize;\n}\n\n//# sourceURL=webpack:///./node_modules/react-swipeable-views-utils/lib/virtualize.js?");

/***/ }),

/***/ "./node_modules/react-swipeable-views-utils/node_modules/@babel/runtime/helpers/assertThisInitialized.js":
/*!***************************************************************************************************************!*\
  !*** ./node_modules/react-swipeable-views-utils/node_modules/@babel/runtime/helpers/assertThisInitialized.js ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _assertThisInitialized(self) {\n  if (self === void 0) {\n    throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\");\n  }\n\n  return self;\n}\n\nmodule.exports = _assertThisInitialized;\n\n//# sourceURL=webpack:///./node_modules/react-swipeable-views-utils/node_modules/@babel/runtime/helpers/assertThisInitialized.js?");

/***/ }),

/***/ "./node_modules/react-swipeable-views-utils/node_modules/@babel/runtime/helpers/classCallCheck.js":
/*!********************************************************************************************************!*\
  !*** ./node_modules/react-swipeable-views-utils/node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _classCallCheck(instance, Constructor) {\n  if (!(instance instanceof Constructor)) {\n    throw new TypeError(\"Cannot call a class as a function\");\n  }\n}\n\nmodule.exports = _classCallCheck;\n\n//# sourceURL=webpack:///./node_modules/react-swipeable-views-utils/node_modules/@babel/runtime/helpers/classCallCheck.js?");

/***/ }),

/***/ "./node_modules/react-swipeable-views-utils/node_modules/@babel/runtime/helpers/createClass.js":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/react-swipeable-views-utils/node_modules/@babel/runtime/helpers/createClass.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _defineProperties(target, props) {\n  for (var i = 0; i < props.length; i++) {\n    var descriptor = props[i];\n    descriptor.enumerable = descriptor.enumerable || false;\n    descriptor.configurable = true;\n    if (\"value\" in descriptor) descriptor.writable = true;\n    Object.defineProperty(target, descriptor.key, descriptor);\n  }\n}\n\nfunction _createClass(Constructor, protoProps, staticProps) {\n  if (protoProps) _defineProperties(Constructor.prototype, protoProps);\n  if (staticProps) _defineProperties(Constructor, staticProps);\n  return Constructor;\n}\n\nmodule.exports = _createClass;\n\n//# sourceURL=webpack:///./node_modules/react-swipeable-views-utils/node_modules/@babel/runtime/helpers/createClass.js?");

/***/ }),

/***/ "./node_modules/react-swipeable-views-utils/node_modules/@babel/runtime/helpers/extends.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/react-swipeable-views-utils/node_modules/@babel/runtime/helpers/extends.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _extends() {\n  module.exports = _extends = Object.assign || function (target) {\n    for (var i = 1; i < arguments.length; i++) {\n      var source = arguments[i];\n\n      for (var key in source) {\n        if (Object.prototype.hasOwnProperty.call(source, key)) {\n          target[key] = source[key];\n        }\n      }\n    }\n\n    return target;\n  };\n\n  return _extends.apply(this, arguments);\n}\n\nmodule.exports = _extends;\n\n//# sourceURL=webpack:///./node_modules/react-swipeable-views-utils/node_modules/@babel/runtime/helpers/extends.js?");

/***/ }),

/***/ "./node_modules/react-swipeable-views-utils/node_modules/@babel/runtime/helpers/getPrototypeOf.js":
/*!********************************************************************************************************!*\
  !*** ./node_modules/react-swipeable-views-utils/node_modules/@babel/runtime/helpers/getPrototypeOf.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _getPrototypeOf(o) {\n  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {\n    return o.__proto__ || Object.getPrototypeOf(o);\n  };\n  return _getPrototypeOf(o);\n}\n\nmodule.exports = _getPrototypeOf;\n\n//# sourceURL=webpack:///./node_modules/react-swipeable-views-utils/node_modules/@babel/runtime/helpers/getPrototypeOf.js?");

/***/ }),

/***/ "./node_modules/react-swipeable-views-utils/node_modules/@babel/runtime/helpers/inherits.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/react-swipeable-views-utils/node_modules/@babel/runtime/helpers/inherits.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf */ \"./node_modules/react-swipeable-views-utils/node_modules/@babel/runtime/helpers/setPrototypeOf.js\");\n\nfunction _inherits(subClass, superClass) {\n  if (typeof superClass !== \"function\" && superClass !== null) {\n    throw new TypeError(\"Super expression must either be null or a function\");\n  }\n\n  subClass.prototype = Object.create(superClass && superClass.prototype, {\n    constructor: {\n      value: subClass,\n      writable: true,\n      configurable: true\n    }\n  });\n  if (superClass) setPrototypeOf(subClass, superClass);\n}\n\nmodule.exports = _inherits;\n\n//# sourceURL=webpack:///./node_modules/react-swipeable-views-utils/node_modules/@babel/runtime/helpers/inherits.js?");

/***/ }),

/***/ "./node_modules/react-swipeable-views-utils/node_modules/@babel/runtime/helpers/interopRequireDefault.js":
/*!***************************************************************************************************************!*\
  !*** ./node_modules/react-swipeable-views-utils/node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _interopRequireDefault(obj) {\n  return obj && obj.__esModule ? obj : {\n    default: obj\n  };\n}\n\nmodule.exports = _interopRequireDefault;\n\n//# sourceURL=webpack:///./node_modules/react-swipeable-views-utils/node_modules/@babel/runtime/helpers/interopRequireDefault.js?");

/***/ }),

/***/ "./node_modules/react-swipeable-views-utils/node_modules/@babel/runtime/helpers/interopRequireWildcard.js":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/react-swipeable-views-utils/node_modules/@babel/runtime/helpers/interopRequireWildcard.js ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _interopRequireWildcard(obj) {\n  if (obj && obj.__esModule) {\n    return obj;\n  } else {\n    var newObj = {};\n\n    if (obj != null) {\n      for (var key in obj) {\n        if (Object.prototype.hasOwnProperty.call(obj, key)) {\n          var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};\n\n          if (desc.get || desc.set) {\n            Object.defineProperty(newObj, key, desc);\n          } else {\n            newObj[key] = obj[key];\n          }\n        }\n      }\n    }\n\n    newObj.default = obj;\n    return newObj;\n  }\n}\n\nmodule.exports = _interopRequireWildcard;\n\n//# sourceURL=webpack:///./node_modules/react-swipeable-views-utils/node_modules/@babel/runtime/helpers/interopRequireWildcard.js?");

/***/ }),

/***/ "./node_modules/react-swipeable-views-utils/node_modules/@babel/runtime/helpers/objectWithoutProperties.js":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/react-swipeable-views-utils/node_modules/@babel/runtime/helpers/objectWithoutProperties.js ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var objectWithoutPropertiesLoose = __webpack_require__(/*! ./objectWithoutPropertiesLoose */ \"./node_modules/react-swipeable-views-utils/node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js\");\n\nfunction _objectWithoutProperties(source, excluded) {\n  if (source == null) return {};\n  var target = objectWithoutPropertiesLoose(source, excluded);\n  var key, i;\n\n  if (Object.getOwnPropertySymbols) {\n    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);\n\n    for (i = 0; i < sourceSymbolKeys.length; i++) {\n      key = sourceSymbolKeys[i];\n      if (excluded.indexOf(key) >= 0) continue;\n      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;\n      target[key] = source[key];\n    }\n  }\n\n  return target;\n}\n\nmodule.exports = _objectWithoutProperties;\n\n//# sourceURL=webpack:///./node_modules/react-swipeable-views-utils/node_modules/@babel/runtime/helpers/objectWithoutProperties.js?");

/***/ }),

/***/ "./node_modules/react-swipeable-views-utils/node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js":
/*!**********************************************************************************************************************!*\
  !*** ./node_modules/react-swipeable-views-utils/node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _objectWithoutPropertiesLoose(source, excluded) {\n  if (source == null) return {};\n  var target = {};\n  var sourceKeys = Object.keys(source);\n  var key, i;\n\n  for (i = 0; i < sourceKeys.length; i++) {\n    key = sourceKeys[i];\n    if (excluded.indexOf(key) >= 0) continue;\n    target[key] = source[key];\n  }\n\n  return target;\n}\n\nmodule.exports = _objectWithoutPropertiesLoose;\n\n//# sourceURL=webpack:///./node_modules/react-swipeable-views-utils/node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js?");

/***/ }),

/***/ "./node_modules/react-swipeable-views-utils/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js":
/*!*******************************************************************************************************************!*\
  !*** ./node_modules/react-swipeable-views-utils/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _typeof = __webpack_require__(/*! ../helpers/typeof */ \"./node_modules/react-swipeable-views-utils/node_modules/@babel/runtime/helpers/typeof.js\");\n\nvar assertThisInitialized = __webpack_require__(/*! ./assertThisInitialized */ \"./node_modules/react-swipeable-views-utils/node_modules/@babel/runtime/helpers/assertThisInitialized.js\");\n\nfunction _possibleConstructorReturn(self, call) {\n  if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) {\n    return call;\n  }\n\n  return assertThisInitialized(self);\n}\n\nmodule.exports = _possibleConstructorReturn;\n\n//# sourceURL=webpack:///./node_modules/react-swipeable-views-utils/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js?");

/***/ }),

/***/ "./node_modules/react-swipeable-views-utils/node_modules/@babel/runtime/helpers/setPrototypeOf.js":
/*!********************************************************************************************************!*\
  !*** ./node_modules/react-swipeable-views-utils/node_modules/@babel/runtime/helpers/setPrototypeOf.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _setPrototypeOf(o, p) {\n  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {\n    o.__proto__ = p;\n    return o;\n  };\n\n  return _setPrototypeOf(o, p);\n}\n\nmodule.exports = _setPrototypeOf;\n\n//# sourceURL=webpack:///./node_modules/react-swipeable-views-utils/node_modules/@babel/runtime/helpers/setPrototypeOf.js?");

/***/ }),

/***/ "./node_modules/react-swipeable-views-utils/node_modules/@babel/runtime/helpers/typeof.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/react-swipeable-views-utils/node_modules/@babel/runtime/helpers/typeof.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _typeof2(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof2(obj); }\n\nfunction _typeof(obj) {\n  if (typeof Symbol === \"function\" && _typeof2(Symbol.iterator) === \"symbol\") {\n    module.exports = _typeof = function _typeof(obj) {\n      return _typeof2(obj);\n    };\n  } else {\n    module.exports = _typeof = function _typeof(obj) {\n      return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : _typeof2(obj);\n    };\n  }\n\n  return _typeof(obj);\n}\n\nmodule.exports = _typeof;\n\n//# sourceURL=webpack:///./node_modules/react-swipeable-views-utils/node_modules/@babel/runtime/helpers/typeof.js?");

/***/ })

}]);