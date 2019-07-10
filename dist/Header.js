(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["Header"],{

/***/ "./node_modules/@material-ui/core/colors/blue.js":
/*!*******************************************************!*\
  !*** ./node_modules/@material-ui/core/colors/blue.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\nvar blue = {\n  50: '#e3f2fd',\n  100: '#bbdefb',\n  200: '#90caf9',\n  300: '#64b5f6',\n  400: '#42a5f5',\n  500: '#2196f3',\n  600: '#1e88e5',\n  700: '#1976d2',\n  800: '#1565c0',\n  900: '#0d47a1',\n  A100: '#82b1ff',\n  A200: '#448aff',\n  A400: '#2979ff',\n  A700: '#2962ff'\n};\nvar _default = blue;\nexports.default = _default;\n\n//# sourceURL=webpack:///./node_modules/@material-ui/core/colors/blue.js?");

/***/ }),

/***/ "./node_modules/@material-ui/core/esm/AppBar/AppBar.js":
/*!*************************************************************!*\
  !*** ./node_modules/@material-ui/core/esm/AppBar/AppBar.js ***!
  \*************************************************************/
/*! exports provided: styles, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"styles\", function() { return styles; });\n/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ \"./node_modules/@babel/runtime/helpers/extends.js\");\n/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ \"./node_modules/@babel/runtime/helpers/objectWithoutProperties.js\");\n/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! clsx */ \"./node_modules/clsx/dist/clsx.m.js\");\n/* harmony import */ var _styles_withStyles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../styles/withStyles */ \"./node_modules/@material-ui/core/esm/styles/withStyles.js\");\n/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/helpers */ \"./node_modules/@material-ui/core/esm/utils/helpers.js\");\n/* harmony import */ var _Paper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Paper */ \"./node_modules/@material-ui/core/esm/Paper/index.js\");\n\n\n\n\n\n\n\n\nvar styles = function styles(theme) {\n  var backgroundColorDefault = theme.palette.type === 'light' ? theme.palette.grey[100] : theme.palette.grey[900];\n  return {\n    /* Styles applied to the root element. */\n    root: {\n      display: 'flex',\n      flexDirection: 'column',\n      width: '100%',\n      boxSizing: 'border-box',\n      // Prevent padding issue with the Modal and fixed positioned AppBar.\n      zIndex: theme.zIndex.appBar,\n      flexShrink: 0\n    },\n\n    /* Styles applied to the root element if `position=\"fixed\"`. */\n    positionFixed: {\n      position: 'fixed',\n      top: 0,\n      left: 'auto',\n      right: 0\n    },\n\n    /* Styles applied to the root element if `position=\"absolute\"`. */\n    positionAbsolute: {\n      position: 'absolute',\n      top: 0,\n      left: 'auto',\n      right: 0\n    },\n\n    /* Styles applied to the root element if `position=\"sticky\"`. */\n    positionSticky: {\n      position: 'sticky',\n      top: 0,\n      left: 'auto',\n      right: 0\n    },\n\n    /* Styles applied to the root element if `position=\"static\"`. */\n    positionStatic: {\n      position: 'static'\n    },\n\n    /* Styles applied to the root element if `position=\"relative\"`. */\n    positionRelative: {\n      position: 'relative'\n    },\n\n    /* Styles applied to the root element if `color=\"default\"`. */\n    colorDefault: {\n      backgroundColor: backgroundColorDefault,\n      color: theme.palette.getContrastText(backgroundColorDefault)\n    },\n\n    /* Styles applied to the root element if `color=\"primary\"`. */\n    colorPrimary: {\n      backgroundColor: theme.palette.primary.main,\n      color: theme.palette.primary.contrastText\n    },\n\n    /* Styles applied to the root element if `color=\"secondary\"`. */\n    colorSecondary: {\n      backgroundColor: theme.palette.secondary.main,\n      color: theme.palette.secondary.contrastText\n    }\n  };\n};\nvar AppBar = react__WEBPACK_IMPORTED_MODULE_2___default.a.forwardRef(function AppBar(props, ref) {\n  var classes = props.classes,\n      className = props.className,\n      _props$color = props.color,\n      color = _props$color === void 0 ? 'primary' : _props$color,\n      _props$position = props.position,\n      position = _props$position === void 0 ? 'fixed' : _props$position,\n      other = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default()(props, [\"classes\", \"className\", \"color\", \"position\"]);\n\n  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_Paper__WEBPACK_IMPORTED_MODULE_7__[\"default\"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({\n    square: true,\n    component: \"header\",\n    elevation: 4,\n    className: Object(clsx__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(classes.root, classes[\"position\".concat(Object(_utils_helpers__WEBPACK_IMPORTED_MODULE_6__[\"capitalize\"])(position))], className, color !== 'inherit' && classes[\"color\".concat(Object(_utils_helpers__WEBPACK_IMPORTED_MODULE_6__[\"capitalize\"])(color))], position === 'fixed' && 'mui-fixed'),\n    ref: ref\n  }, other));\n});\n true ? AppBar.propTypes = {\n  /**\n   * The content of the component.\n   */\n  children: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.node.isRequired,\n\n  /**\n   * Override or extend the styles applied to the component.\n   * See [CSS API](#css) below for more details.\n   */\n  classes: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.object.isRequired,\n\n  /**\n   * @ignore\n   */\n  className: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,\n\n  /**\n   * The color of the component. It supports those theme colors that make sense for this component.\n   */\n  color: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.oneOf(['inherit', 'primary', 'secondary', 'default']),\n\n  /**\n   * The positioning type. The behavior of the different options is described\n   * [in the MDN web docs](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Positioning).\n   * Note: `sticky` is not universally supported and will fall back to `static` when unavailable.\n   */\n  position: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.oneOf(['fixed', 'absolute', 'sticky', 'static', 'relative'])\n} : undefined;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(_styles_withStyles__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(styles, {\n  name: 'MuiAppBar'\n})(AppBar));\n\n//# sourceURL=webpack:///./node_modules/@material-ui/core/esm/AppBar/AppBar.js?");

/***/ }),

/***/ "./node_modules/@material-ui/core/esm/AppBar/index.js":
/*!************************************************************!*\
  !*** ./node_modules/@material-ui/core/esm/AppBar/index.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _AppBar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AppBar */ \"./node_modules/@material-ui/core/esm/AppBar/AppBar.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _AppBar__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n\n\n//# sourceURL=webpack:///./node_modules/@material-ui/core/esm/AppBar/index.js?");

/***/ }),

/***/ "./node_modules/@material-ui/core/esm/transitions/utils.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@material-ui/core/esm/transitions/utils.js ***!
  \*****************************************************************/
/*! exports provided: reflow, getTransitionProps */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"reflow\", function() { return reflow; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getTransitionProps\", function() { return getTransitionProps; });\nvar reflow = function reflow(node) {\n  return node.scrollTop;\n};\nfunction getTransitionProps(props, options) {\n  var timeout = props.timeout,\n      _props$style = props.style,\n      style = _props$style === void 0 ? {} : _props$style;\n  return {\n    duration: style.transitionDuration || typeof timeout === 'number' ? timeout : timeout[options.mode],\n    delay: style.transitionDelay\n  };\n}\n\n//# sourceURL=webpack:///./node_modules/@material-ui/core/esm/transitions/utils.js?");

/***/ }),

/***/ "./node_modules/@material-ui/icons/AccountCircle.js":
/*!**********************************************************!*\
  !*** ./node_modules/@material-ui/icons/AccountCircle.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _react = _interopRequireDefault(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\n\nvar _createSvgIcon = _interopRequireDefault(__webpack_require__(/*! ./utils/createSvgIcon */ \"./node_modules/@material-ui/icons/utils/createSvgIcon.js\"));\n\nvar _default = (0, _createSvgIcon.default)(_react.default.createElement(_react.default.Fragment, null, _react.default.createElement(\"path\", {\n  d: \"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z\"\n}), _react.default.createElement(\"path\", {\n  fill: \"none\",\n  d: \"M0 0h24v24H0z\"\n})), 'AccountCircle');\n\nexports.default = _default;\n\n//# sourceURL=webpack:///./node_modules/@material-ui/icons/AccountCircle.js?");

/***/ }),

/***/ "./node_modules/@material-ui/icons/MoreVert.js":
/*!*****************************************************!*\
  !*** ./node_modules/@material-ui/icons/MoreVert.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _react = _interopRequireDefault(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\n\nvar _createSvgIcon = _interopRequireDefault(__webpack_require__(/*! ./utils/createSvgIcon */ \"./node_modules/@material-ui/icons/utils/createSvgIcon.js\"));\n\nvar _default = (0, _createSvgIcon.default)(_react.default.createElement(_react.default.Fragment, null, _react.default.createElement(\"path\", {\n  fill: \"none\",\n  d: \"M0 0h24v24H0z\"\n}), _react.default.createElement(\"path\", {\n  d: \"M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z\"\n})), 'MoreVert');\n\nexports.default = _default;\n\n//# sourceURL=webpack:///./node_modules/@material-ui/icons/MoreVert.js?");

/***/ }),

/***/ "./node_modules/@material-ui/icons/Notifications.js":
/*!**********************************************************!*\
  !*** ./node_modules/@material-ui/icons/Notifications.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _react = _interopRequireDefault(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\n\nvar _createSvgIcon = _interopRequireDefault(__webpack_require__(/*! ./utils/createSvgIcon */ \"./node_modules/@material-ui/icons/utils/createSvgIcon.js\"));\n\nvar _default = (0, _createSvgIcon.default)(_react.default.createElement(_react.default.Fragment, null, _react.default.createElement(\"path\", {\n  d: \"M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z\"\n})), 'Notifications');\n\nexports.default = _default;\n\n//# sourceURL=webpack:///./node_modules/@material-ui/icons/Notifications.js?");

/***/ }),

/***/ "./node_modules/@material-ui/icons/Search.js":
/*!***************************************************!*\
  !*** ./node_modules/@material-ui/icons/Search.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _react = _interopRequireDefault(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\n\nvar _createSvgIcon = _interopRequireDefault(__webpack_require__(/*! ./utils/createSvgIcon */ \"./node_modules/@material-ui/icons/utils/createSvgIcon.js\"));\n\nvar _default = (0, _createSvgIcon.default)(_react.default.createElement(_react.default.Fragment, null, _react.default.createElement(\"path\", {\n  d: \"M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z\"\n}), _react.default.createElement(\"path\", {\n  fill: \"none\",\n  d: \"M0 0h24v24H0z\"\n})), 'Search');\n\nexports.default = _default;\n\n//# sourceURL=webpack:///./node_modules/@material-ui/icons/Search.js?");

/***/ }),

/***/ "./src/components/Header.js":
/*!**********************************!*\
  !*** ./src/components/Header.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ \"./node_modules/@babel/runtime/regenerator/index.js\");\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/asyncToGenerator.js\");\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ \"./node_modules/@babel/runtime/helpers/slicedToArray.js\");\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"./node_modules/@babel/runtime/helpers/defineProperty.js\");\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/esm/react-router-dom.js\");\n/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/styles */ \"./node_modules/@material-ui/core/esm/styles/index.js\");\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../api */ \"./src/api/index.js\");\n/* harmony import */ var _material_ui_core_AppBar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/AppBar */ \"./node_modules/@material-ui/core/esm/AppBar/index.js\");\n/* harmony import */ var _material_ui_core_Toolbar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/Toolbar */ \"./node_modules/@material-ui/core/esm/Toolbar/index.js\");\n/* harmony import */ var _material_ui_core_Portal__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/core/Portal */ \"./node_modules/@material-ui/core/esm/Portal/index.js\");\n/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/core/Typography */ \"./node_modules/@material-ui/core/esm/Typography/index.js\");\n/* harmony import */ var _material_ui_core_CssBaseline__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @material-ui/core/CssBaseline */ \"./node_modules/@material-ui/core/esm/CssBaseline/index.js\");\n/* harmony import */ var _material_ui_core_useScrollTrigger__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @material-ui/core/useScrollTrigger */ \"./node_modules/@material-ui/core/esm/useScrollTrigger/index.js\");\n/* harmony import */ var _material_ui_core_Slide__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @material-ui/core/Slide */ \"./node_modules/@material-ui/core/esm/Slide/index.js\");\n/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @material-ui/core/IconButton */ \"./node_modules/@material-ui/core/esm/IconButton/index.js\");\n/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @material-ui/core/Button */ \"./node_modules/@material-ui/core/esm/Button/index.js\");\n/* harmony import */ var _material_ui_core_Menu__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @material-ui/core/Menu */ \"./node_modules/@material-ui/core/esm/Menu/index.js\");\n/* harmony import */ var _material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @material-ui/core/MenuItem */ \"./node_modules/@material-ui/core/esm/MenuItem/index.js\");\n/* harmony import */ var _material_ui_core_InputBase__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @material-ui/core/InputBase */ \"./node_modules/@material-ui/core/esm/InputBase/index.js\");\n/* harmony import */ var _material_ui_icons_Search__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @material-ui/icons/Search */ \"./node_modules/@material-ui/icons/Search.js\");\n/* harmony import */ var _material_ui_icons_Search__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Search__WEBPACK_IMPORTED_MODULE_20__);\n/* harmony import */ var _material_ui_icons_MoreVert__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @material-ui/icons/MoreVert */ \"./node_modules/@material-ui/icons/MoreVert.js\");\n/* harmony import */ var _material_ui_icons_MoreVert__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_MoreVert__WEBPACK_IMPORTED_MODULE_21__);\n/* harmony import */ var _material_ui_icons_AccountCircle__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @material-ui/icons/AccountCircle */ \"./node_modules/@material-ui/icons/AccountCircle.js\");\n/* harmony import */ var _material_ui_icons_AccountCircle__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_AccountCircle__WEBPACK_IMPORTED_MODULE_22__);\n/* harmony import */ var _material_ui_icons_Notifications__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @material-ui/icons/Notifications */ \"./node_modules/@material-ui/icons/Notifications.js\");\n/* harmony import */ var _material_ui_icons_Notifications__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Notifications__WEBPACK_IMPORTED_MODULE_23__);\n/* harmony import */ var _material_ui_core_colors_blue__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @material-ui/core/colors/blue */ \"./node_modules/@material-ui/core/colors/blue.js\");\n/* harmony import */ var _material_ui_core_colors_blue__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_colors_blue__WEBPACK_IMPORTED_MODULE_24__);\n/* harmony import */ var _img_logoX2_png__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./img/logoX2.png */ \"./src/components/img/logoX2.png\");\n/* harmony import */ var _img_logoX2_png__WEBPACK_IMPORTED_MODULE_25___default = /*#__PURE__*/__webpack_require__.n(_img_logoX2_png__WEBPACK_IMPORTED_MODULE_25__);\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nvar useStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_6__[\"makeStyles\"])(function (theme) {\n  var _search, _inputInput;\n\n  return {\n    grow: {\n      flexGrow: 1\n    },\n    appBar: {\n      backgroundColor: _material_ui_core_colors_blue__WEBPACK_IMPORTED_MODULE_24___default.a['600'],\n      color: 'white'\n    },\n    toolbar: _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()({}, theme.breakpoints.up('md'), {\n      maxWidth: 1200,\n      width: '100%',\n      marginLeft: 'auto',\n      marginRight: 'auto'\n    }),\n    title: _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()({\n      marginRight: theme.spacing(1),\n      display: 'none'\n    }, theme.breakpoints.up(500), {\n      display: 'block'\n    }),\n    moreIcon: _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()({\n      display: 'flex'\n    }, theme.breakpoints.up('sm'), {\n      display: 'none'\n    }),\n    afterLoginIcon: _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()({\n      display: 'none'\n    }, theme.breakpoints.up('sm'), {\n      display: 'flex'\n    }),\n    logo: _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()({\n      padding: 'none',\n      height: 56,\n      width: 56\n    }, theme.breakpoints.up('sm'), {\n      height: 64,\n      width: 64,\n      marginLeft: theme.spacing(2),\n      marginRight: theme.spacing(1)\n    }),\n    logoImg: {\n      height: '100%',\n      width: '100%'\n    },\n    search: (_search = {\n      position: 'relative',\n      borderRadius: theme.shape.borderRadius,\n      backgroundColor: Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_6__[\"fade\"])(theme.palette.common.white, 0.15),\n      '&:hover': {\n        backgroundColor: Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_6__[\"fade\"])(theme.palette.common.white, 0.25)\n      },\n      marginLeft: theme.spacing(1),\n      marginRight: theme.spacing(1),\n      width: '100%'\n    }, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(_search, theme.breakpoints.up(500), {\n      width: '50%'\n    }), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(_search, theme.breakpoints.up('sm'), {\n      marginLeft: theme.spacing(2),\n      width: 'auto'\n    }), _search),\n    searchIcon: _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()({\n      width: theme.spacing(7),\n      height: '100%',\n      position: 'absolute',\n      pointerEvents: 'none',\n      display: 'flex',\n      alignItems: 'center',\n      justifyContent: 'center'\n    }, theme.breakpoints.down(500), {\n      width: theme.spacing(5)\n    }),\n    inputRoot: {\n      color: 'inherit'\n    },\n    inputInput: (_inputInput = {\n      padding: theme.spacing(1, 1, 1, 7),\n      transition: theme.transitions.create('width')\n    }, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(_inputInput, theme.breakpoints.down(500), {\n      padding: theme.spacing(1, 1, 1, 5)\n    }), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(_inputInput, theme.breakpoints.up('sm'), {\n      width: 120,\n      '&:focus': {\n        width: 200\n      }\n    }), _inputInput)\n  };\n});\n\nfunction HideOnScroll(props) {\n  var children = props.children,\n      window = props.window,\n      setCSRFToken = props.setCSRFToken;\n  var trigger = Object(_material_ui_core_useScrollTrigger__WEBPACK_IMPORTED_MODULE_13__[\"default\"])({\n    target: window ? window() : undefined\n  });\n  return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Slide__WEBPACK_IMPORTED_MODULE_14__[\"default\"], {\n    appear: false,\n    direction: \"down\",\n    in: !trigger\n  }, children);\n}\n\nfunction Header(props) {\n  var classes = useStyles();\n  var setResponse = props.setResponse,\n      response = props.response,\n      sess = props.sess,\n      setCSRFToken = props.setCSRFToken;\n\n  var _React$useState = react__WEBPACK_IMPORTED_MODULE_4___default.a.useState(null),\n      _React$useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default()(_React$useState, 2),\n      anchorEl = _React$useState2[0],\n      setAnchorEl = _React$useState2[1];\n\n  var container = react__WEBPACK_IMPORTED_MODULE_4___default.a.useRef(null);\n  var auth = response;\n\n  function menuOpenHandler(event) {\n    setAnchorEl(event.currentTarget);\n  }\n\n  function menuCloseHandler() {\n    setAnchorEl(null);\n  }\n\n  function handleLogin() {\n    if (anchorEl) {\n      menuCloseHandler();\n      props.handleOpen();\n    } else {\n      props.handleOpen();\n    }\n  }\n\n  function handleGetToken() {\n    return _handleGetToken.apply(this, arguments);\n  }\n\n  function _handleGetToken() {\n    _handleGetToken = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(\n    /*#__PURE__*/\n    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {\n      var res;\n      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {\n        while (1) {\n          switch (_context.prev = _context.next) {\n            case 0:\n              _context.next = 2;\n              return _api__WEBPACK_IMPORTED_MODULE_7__[\"xhrGet\"]('getcsrf');\n\n            case 2:\n              res = _context.sent;\n              setCSRFToken(res.token);\n\n              try {\n                setResponse('logged out');\n                menuCloseHandler();\n              } catch (err) {\n                console.log(err.message);\n              }\n\n            case 5:\n            case \"end\":\n              return _context.stop();\n          }\n        }\n      }, _callee);\n    }));\n    return _handleGetToken.apply(this, arguments);\n  }\n\n  function handleLogout() {\n    return _handleLogout.apply(this, arguments);\n  }\n\n  function _handleLogout() {\n    _handleLogout = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(\n    /*#__PURE__*/\n    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {\n      var data;\n      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {\n        while (1) {\n          switch (_context2.prev = _context2.next) {\n            case 0:\n              _context2.next = 2;\n              return _api__WEBPACK_IMPORTED_MODULE_7__[\"xhrGet\"]('logout');\n\n            case 2:\n              data = _context2.sent;\n\n              if (!(data && data.response.status === 'success')) {\n                _context2.next = 8;\n                break;\n              }\n\n              _context2.next = 6;\n              return handleGetToken();\n\n            case 6:\n              _context2.next = 9;\n              break;\n\n            case 8:\n              console.log(data);\n\n            case 9:\n            case \"end\":\n              return _context2.stop();\n          }\n        }\n      }, _callee2);\n    }));\n    return _handleLogout.apply(this, arguments);\n  }\n\n  react__WEBPACK_IMPORTED_MODULE_4___default.a.useEffect(function () {}, [window.location.pathname]);\n  return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_4___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_CssBaseline__WEBPACK_IMPORTED_MODULE_12__[\"default\"], null), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(HideOnScroll, props, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_AppBar__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n    color: \"default\",\n    classes: {\n      colorDefault: classes.appBar\n    }\n  }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Toolbar__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n    className: classes.toolbar\n  }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__[\"Link\"], {\n    to: \"/\",\n    style: {\n      textDecoration: 'none'\n    }\n  }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_15__[\"default\"], {\n    edge: \"start\",\n    className: classes.logo,\n    color: \"inherit\"\n  }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(\"img\", {\n    src: _img_logoX2_png__WEBPACK_IMPORTED_MODULE_25___default.a,\n    className: classes.logoImg\n  }))), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_11__[\"default\"], {\n    className: classes.title,\n    variant: \"h6\",\n    noWrap: true\n  }, \"T-off Time\"), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(\"div\", {\n    className: classes.search\n  }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(\"div\", {\n    className: classes.searchIcon\n  }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_icons_Search__WEBPACK_IMPORTED_MODULE_20___default.a, null)), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_InputBase__WEBPACK_IMPORTED_MODULE_19__[\"default\"], {\n    placeholder: \"Search\",\n    classes: {\n      root: classes.inputRoot,\n      input: classes.inputInput\n    },\n    inputProps: {\n      'aria-label': 'Search'\n    }\n  })), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(\"div\", {\n    className: classes.grow\n  }), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(\"div\", {\n    className: classes.moreIcon\n  }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_15__[\"default\"], {\n    edge: \"end\",\n    \"aria-label\": \"Show more\",\n    \"aria-haspopup\": \"true\",\n    color: \"inherit\",\n    onClick: menuOpenHandler\n  }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_icons_MoreVert__WEBPACK_IMPORTED_MODULE_21___default.a, null))), (auth === 'logged in' || sess && sess.status === 1) && react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_4___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(\"div\", {\n    className: classes.afterLoginIcon\n  }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_15__[\"default\"], {\n    color: \"inherit\",\n    onClick: menuOpenHandler\n  }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_icons_AccountCircle__WEBPACK_IMPORTED_MODULE_22___default.a, null)))), !(auth === 'logged in' || sess && sess.status === 1) && window.innerWidth > 600 && react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_16__[\"default\"], {\n    className: classes.loginBtn,\n    color: \"inherit\",\n    onClick: handleLogin\n  }, \"Login\")))), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Toolbar__WEBPACK_IMPORTED_MODULE_9__[\"default\"], null), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Portal__WEBPACK_IMPORTED_MODULE_10__[\"default\"], {\n    container: container.current\n  }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Menu__WEBPACK_IMPORTED_MODULE_17__[\"default\"], {\n    anchorEl: anchorEl,\n    keepMounted: true,\n    open: Boolean(anchorEl),\n    onClose: menuCloseHandler\n  }, window.location.pathname === '/user' && (auth === 'logged in' || sess && sess.status === 1) && react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__[\"Link\"], {\n    to: \"/\",\n    style: {\n      textDecoration: 'none',\n      color: 'inherit'\n    }\n  }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_18__[\"default\"], {\n    onClick: menuCloseHandler\n  }, \"Home\")), window.location.pathname === '/' && (auth === 'logged in' || sess && sess.status === 1) && react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__[\"Link\"], {\n    to: \"/user\",\n    style: {\n      textDecoration: 'none',\n      color: 'inherit'\n    }\n  }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_18__[\"default\"], {\n    onClick: menuCloseHandler\n  }, \"User\")), (auth === 'logged in' || sess && sess.status === 1) && react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_18__[\"default\"], {\n    onClick: handleLogout\n  }, \"Logout\"), !(auth === 'logged in' || sess && sess.status === 1) && react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_18__[\"default\"], {\n    onClick: handleLogin\n  }, \"Login\"), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(\"div\", null))), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(\"div\", {\n    ref: container\n  }));\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Header);\n\n//# sourceURL=webpack:///./src/components/Header.js?");

/***/ }),

/***/ "./src/components/img/logoX2.png":
/*!***************************************!*\
  !*** ./src/components/img/logoX2.png ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"src/components/img/logoX2.png\";\n\n//# sourceURL=webpack:///./src/components/img/logoX2.png?");

/***/ })

}]);