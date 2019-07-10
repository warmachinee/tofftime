(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["SnackBarAlert"],{

/***/ "./node_modules/@material-ui/core/colors/green.js":
/*!********************************************************!*\
  !*** ./node_modules/@material-ui/core/colors/green.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\nvar green = {\n  50: '#e8f5e9',\n  100: '#c8e6c9',\n  200: '#a5d6a7',\n  300: '#81c784',\n  400: '#66bb6a',\n  500: '#4caf50',\n  600: '#43a047',\n  700: '#388e3c',\n  800: '#2e7d32',\n  900: '#1b5e20',\n  A100: '#b9f6ca',\n  A200: '#69f0ae',\n  A400: '#00e676',\n  A700: '#00c853'\n};\nvar _default = green;\nexports.default = _default;\n\n//# sourceURL=webpack:///./node_modules/@material-ui/core/colors/green.js?");

/***/ }),

/***/ "./node_modules/@material-ui/core/esm/Grow/Grow.js":
/*!*********************************************************!*\
  !*** ./node_modules/@material-ui/core/esm/Grow/Grow.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ \"./node_modules/@babel/runtime/helpers/extends.js\");\n/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ \"./node_modules/@babel/runtime/helpers/objectWithoutProperties.js\");\n/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react_transition_group__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-transition-group */ \"./node_modules/react-transition-group/esm/index.js\");\n/* harmony import */ var _styles_withTheme__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../styles/withTheme */ \"./node_modules/@material-ui/core/esm/styles/withTheme.js\");\n/* harmony import */ var _transitions_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../transitions/utils */ \"./node_modules/@material-ui/core/esm/transitions/utils.js\");\n/* harmony import */ var _utils_reactHelpers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/reactHelpers */ \"./node_modules/@material-ui/core/esm/utils/reactHelpers.js\");\n\n\n\n\n\n\n\n\n\nfunction getScale(value) {\n  return \"scale(\".concat(value, \", \").concat(Math.pow(value, 2), \")\");\n}\n\nvar styles = {\n  entering: {\n    opacity: 1,\n    transform: getScale(1)\n  },\n  entered: {\n    opacity: 1,\n    // Use translateZ to scrolling issue on Chrome.\n    transform: \"\".concat(getScale(1), \" translateZ(0)\")\n  }\n};\n/**\n * The Grow transition is used by the [Tooltip](/components/tooltips/) and\n * [Popover](/components/popover/) components.\n * It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.\n */\n\nvar Grow = react__WEBPACK_IMPORTED_MODULE_2___default.a.forwardRef(function Grow(props, ref) {\n  var children = props.children,\n      inProp = props.in,\n      onEnter = props.onEnter,\n      onExit = props.onExit,\n      style = props.style,\n      theme = props.theme,\n      _props$timeout = props.timeout,\n      timeout = _props$timeout === void 0 ? 'auto' : _props$timeout,\n      other = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default()(props, [\"children\", \"in\", \"onEnter\", \"onExit\", \"style\", \"theme\", \"timeout\"]);\n\n  var timer = react__WEBPACK_IMPORTED_MODULE_2___default.a.useRef();\n  var autoTimeout = react__WEBPACK_IMPORTED_MODULE_2___default.a.useRef();\n  var handleRef = Object(_utils_reactHelpers__WEBPACK_IMPORTED_MODULE_7__[\"useForkRef\"])(children.ref, ref);\n\n  var handleEnter = function handleEnter(node) {\n    Object(_transitions_utils__WEBPACK_IMPORTED_MODULE_6__[\"reflow\"])(node); // So the animation always start from the start.\n\n    var _getTransitionProps = Object(_transitions_utils__WEBPACK_IMPORTED_MODULE_6__[\"getTransitionProps\"])({\n      style: style,\n      timeout: timeout\n    }, {\n      mode: 'enter'\n    }),\n        transitionDuration = _getTransitionProps.duration,\n        delay = _getTransitionProps.delay;\n\n    var duration = 0;\n\n    if (timeout === 'auto') {\n      duration = theme.transitions.getAutoHeightDuration(node.clientHeight);\n      autoTimeout.current = duration;\n    } else {\n      duration = transitionDuration;\n    }\n\n    node.style.transition = [theme.transitions.create('opacity', {\n      duration: duration,\n      delay: delay\n    }), theme.transitions.create('transform', {\n      duration: duration * 0.666,\n      delay: delay\n    })].join(',');\n\n    if (onEnter) {\n      onEnter(node);\n    }\n  };\n\n  var handleExit = function handleExit(node) {\n    var duration = 0;\n\n    var _getTransitionProps2 = Object(_transitions_utils__WEBPACK_IMPORTED_MODULE_6__[\"getTransitionProps\"])({\n      style: style,\n      timeout: timeout\n    }, {\n      mode: 'exit'\n    }),\n        transitionDuration = _getTransitionProps2.duration,\n        delay = _getTransitionProps2.delay;\n\n    if (timeout === 'auto') {\n      duration = theme.transitions.getAutoHeightDuration(node.clientHeight);\n      autoTimeout.current = duration;\n    } else {\n      duration = transitionDuration;\n    }\n\n    node.style.transition = [theme.transitions.create('opacity', {\n      duration: duration,\n      delay: delay\n    }), theme.transitions.create('transform', {\n      duration: duration * 0.666,\n      delay: delay || duration * 0.333\n    })].join(',');\n    node.style.opacity = '0';\n    node.style.transform = getScale(0.75);\n\n    if (onExit) {\n      onExit(node);\n    }\n  };\n\n  var addEndListener = function addEndListener(_, next) {\n    if (timeout === 'auto') {\n      timer.current = setTimeout(next, autoTimeout.current || 0);\n    }\n  };\n\n  react__WEBPACK_IMPORTED_MODULE_2___default.a.useEffect(function () {\n    return function () {\n      clearTimeout(timer.current);\n    };\n  }, []);\n  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_transition_group__WEBPACK_IMPORTED_MODULE_4__[\"Transition\"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({\n    appear: true,\n    in: inProp,\n    onEnter: handleEnter,\n    onExit: handleExit,\n    addEndListener: addEndListener,\n    timeout: timeout === 'auto' ? null : timeout\n  }, other), function (state, childProps) {\n    return react__WEBPACK_IMPORTED_MODULE_2___default.a.cloneElement(children, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({\n      style: _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({\n        opacity: 0,\n        transform: getScale(0.75),\n        visibility: state === 'exited' && !inProp ? 'hidden' : undefined\n      }, styles[state], style, children.props.style),\n      ref: handleRef\n    }, childProps));\n  });\n});\n true ? Grow.propTypes = {\n  /**\n   * A single child content element.\n   */\n  children: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.element,\n\n  /**\n   * If `true`, show the component; triggers the enter or exit animation.\n   */\n  in: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,\n\n  /**\n   * @ignore\n   */\n  onEnter: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func,\n\n  /**\n   * @ignore\n   */\n  onExit: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func,\n\n  /**\n   * @ignore\n   */\n  style: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.object,\n\n  /**\n   * @ignore\n   */\n  theme: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.object.isRequired,\n\n  /**\n   * The duration for the transition, in milliseconds.\n   * You may specify a single timeout for all transitions, or individually with an object.\n   *\n   * Set to 'auto' to automatically calculate transition time based on height.\n   */\n  timeout: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.number, prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.shape({\n    enter: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.number,\n    exit: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.number\n  }), prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.oneOf(['auto'])])\n} : undefined;\nGrow.muiSupportAuto = true;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(_styles_withTheme__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(Grow));\n\n//# sourceURL=webpack:///./node_modules/@material-ui/core/esm/Grow/Grow.js?");

/***/ }),

/***/ "./node_modules/@material-ui/core/esm/Grow/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@material-ui/core/esm/Grow/index.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Grow__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Grow */ \"./node_modules/@material-ui/core/esm/Grow/Grow.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _Grow__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n\n\n//# sourceURL=webpack:///./node_modules/@material-ui/core/esm/Grow/index.js?");

/***/ }),

/***/ "./node_modules/@material-ui/core/esm/utils/ownerDocument.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@material-ui/core/esm/utils/ownerDocument.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction ownerDocument(node) {\n  return node && node.ownerDocument || document;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (ownerDocument);\n\n//# sourceURL=webpack:///./node_modules/@material-ui/core/esm/utils/ownerDocument.js?");

/***/ }),

/***/ "./node_modules/@material-ui/icons/CheckCircle.js":
/*!********************************************************!*\
  !*** ./node_modules/@material-ui/icons/CheckCircle.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _react = _interopRequireDefault(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\n\nvar _createSvgIcon = _interopRequireDefault(__webpack_require__(/*! ./utils/createSvgIcon */ \"./node_modules/@material-ui/icons/utils/createSvgIcon.js\"));\n\nvar _default = (0, _createSvgIcon.default)(_react.default.createElement(_react.default.Fragment, null, _react.default.createElement(\"path\", {\n  fill: \"none\",\n  d: \"M0 0h24v24H0z\"\n}), _react.default.createElement(\"path\", {\n  d: \"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z\"\n})), 'CheckCircle');\n\nexports.default = _default;\n\n//# sourceURL=webpack:///./node_modules/@material-ui/icons/CheckCircle.js?");

/***/ }),

/***/ "./node_modules/@material-ui/icons/Close.js":
/*!**************************************************!*\
  !*** ./node_modules/@material-ui/icons/Close.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _react = _interopRequireDefault(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\n\nvar _createSvgIcon = _interopRequireDefault(__webpack_require__(/*! ./utils/createSvgIcon */ \"./node_modules/@material-ui/icons/utils/createSvgIcon.js\"));\n\nvar _default = (0, _createSvgIcon.default)(_react.default.createElement(_react.default.Fragment, null, _react.default.createElement(\"path\", {\n  d: \"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\"\n}), _react.default.createElement(\"path\", {\n  fill: \"none\",\n  d: \"M0 0h24v24H0z\"\n})), 'Close');\n\nexports.default = _default;\n\n//# sourceURL=webpack:///./node_modules/@material-ui/icons/Close.js?");

/***/ }),

/***/ "./node_modules/@material-ui/icons/Error.js":
/*!**************************************************!*\
  !*** ./node_modules/@material-ui/icons/Error.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _react = _interopRequireDefault(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\n\nvar _createSvgIcon = _interopRequireDefault(__webpack_require__(/*! ./utils/createSvgIcon */ \"./node_modules/@material-ui/icons/utils/createSvgIcon.js\"));\n\nvar _default = (0, _createSvgIcon.default)(_react.default.createElement(_react.default.Fragment, null, _react.default.createElement(\"path\", {\n  fill: \"none\",\n  d: \"M0 0h24v24H0z\"\n}), _react.default.createElement(\"path\", {\n  d: \"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z\"\n})), 'Error');\n\nexports.default = _default;\n\n//# sourceURL=webpack:///./node_modules/@material-ui/icons/Error.js?");

/***/ }),

/***/ "./src/components/SnackBarAlert.js":
/*!*****************************************!*\
  !*** ./src/components/SnackBarAlert.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return SnackBarAlert; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/styles */ \"./node_modules/@material-ui/core/esm/styles/index.js\");\n/* harmony import */ var _material_ui_core_Snackbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/Snackbar */ \"./node_modules/@material-ui/core/esm/Snackbar/index.js\");\n/* harmony import */ var _material_ui_core_SnackbarContent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/SnackbarContent */ \"./node_modules/@material-ui/core/esm/SnackbarContent/index.js\");\n/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/IconButton */ \"./node_modules/@material-ui/core/esm/IconButton/index.js\");\n/* harmony import */ var _material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/icons/Close */ \"./node_modules/@material-ui/icons/Close.js\");\n/* harmony import */ var _material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _material_ui_icons_CheckCircle__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/icons/CheckCircle */ \"./node_modules/@material-ui/icons/CheckCircle.js\");\n/* harmony import */ var _material_ui_icons_CheckCircle__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_CheckCircle__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _material_ui_icons_Error__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/icons/Error */ \"./node_modules/@material-ui/icons/Error.js\");\n/* harmony import */ var _material_ui_icons_Error__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Error__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _material_ui_core_colors_green__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/colors/green */ \"./node_modules/@material-ui/core/colors/green.js\");\n/* harmony import */ var _material_ui_core_colors_green__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_colors_green__WEBPACK_IMPORTED_MODULE_8__);\n\n\n\n\n\n\n\n\n\nvar useStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__[\"makeStyles\"])(function (theme) {\n  return {\n    close: {\n      padding: 8,\n      marginRight: 8\n    },\n    success: {\n      backgroundColor: _material_ui_core_colors_green__WEBPACK_IMPORTED_MODULE_8___default.a[600]\n    },\n    error: {\n      backgroundColor: theme.palette.error.dark\n    },\n    closeIcon: {\n      fontSize: 20,\n      opacity: 0.9\n    },\n    icon: {\n      marginRight: 8,\n      fontSize: 20,\n      opacity: 0.9\n    },\n    message: {\n      display: 'flex',\n      alignItems: 'center'\n    }\n  };\n});\nfunction SnackBarAlert(props) {\n  var classes = useStyles();\n  var open = props.open,\n      onClose = props.onClose,\n      autoHideDuration = props.autoHideDuration,\n      message = props.message,\n      variant = props.variant;\n  var VariantIcon = {\n    success: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_CheckCircle__WEBPACK_IMPORTED_MODULE_6___default.a, {\n      className: classes.icon\n    }),\n    error: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Error__WEBPACK_IMPORTED_MODULE_7___default.a, {\n      className: classes.icon\n    })\n  };\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Snackbar__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n    key: message,\n    anchorOrigin: {\n      vertical: 'bottom',\n      horizontal: 'left'\n    },\n    open: open,\n    autoHideDuration: autoHideDuration,\n    onClose: onClose\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_SnackbarContent__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n    className: classes[variant],\n    message: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n      className: classes.message\n    }, VariantIcon[variant], message),\n    action: [react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n      key: \"close\",\n      color: \"inherit\",\n      className: classes.close,\n      onClick: onClose\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_5___default.a, {\n      className: classes.closeIcon\n    }))]\n  }));\n}\n\n//# sourceURL=webpack:///./src/components/SnackBarAlert.js?");

/***/ })

}]);