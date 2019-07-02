(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["MBPlayoff"],{

/***/ "./node_modules/@material-ui/core/colors/grey.js":
/*!*******************************************************!*\
  !*** ./node_modules/@material-ui/core/colors/grey.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\nvar grey = {\n  50: '#fafafa',\n  100: '#f5f5f5',\n  200: '#eeeeee',\n  300: '#e0e0e0',\n  400: '#bdbdbd',\n  500: '#9e9e9e',\n  600: '#757575',\n  700: '#616161',\n  800: '#424242',\n  900: '#212121',\n  A100: '#d5d5d5',\n  A200: '#aaaaaa',\n  A400: '#303030',\n  A700: '#616161'\n};\nvar _default = grey;\nexports.default = _default;\n\n//# sourceURL=webpack:///./node_modules/@material-ui/core/colors/grey.js?");

/***/ }),

/***/ "./node_modules/@material-ui/core/esm/Collapse/Collapse.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@material-ui/core/esm/Collapse/Collapse.js ***!
  \*****************************************************************/
/*! exports provided: styles, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"styles\", function() { return styles; });\n/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ \"./node_modules/@babel/runtime/helpers/extends.js\");\n/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ \"./node_modules/@babel/runtime/helpers/objectWithoutProperties.js\");\n/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! clsx */ \"./node_modules/clsx/dist/clsx.m.js\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var react_transition_group__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-transition-group */ \"./node_modules/react-transition-group/esm/index.js\");\n/* harmony import */ var _styles_withStyles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../styles/withStyles */ \"./node_modules/@material-ui/core/esm/styles/withStyles.js\");\n/* harmony import */ var _styles_transitions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../styles/transitions */ \"./node_modules/@material-ui/core/esm/styles/transitions.js\");\n/* harmony import */ var _transitions_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../transitions/utils */ \"./node_modules/@material-ui/core/esm/transitions/utils.js\");\n\n\n\n\n\n\n\n\n\nvar styles = function styles(theme) {\n  return {\n    /* Styles applied to the container element. */\n    container: {\n      height: 0,\n      overflow: 'hidden',\n      transition: theme.transitions.create('height')\n    },\n\n    /* Styles applied to the container element when the transition has entered. */\n    entered: {\n      height: 'auto',\n      overflow: 'visible'\n    },\n\n    /* Styles applied to the container element when the transition has exited and `collapsedHeight` != 0px. */\n    hidden: {\n      visibility: 'hidden'\n    },\n\n    /* Styles applied to the outer wrapper element. */\n    wrapper: {\n      // Hack to get children with a negative margin to not falsify the height computation.\n      display: 'flex'\n    },\n\n    /* Styles applied to the inner wrapper element. */\n    wrapperInner: {\n      width: '100%'\n    }\n  };\n};\n/**\n * The Collapse transition is used by the\n * [Vertical Stepper](/components/steppers/#vertical-stepper) StepContent component.\n * It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.\n */\n\nvar Collapse = react__WEBPACK_IMPORTED_MODULE_2___default.a.forwardRef(function Collapse(props, ref) {\n  var children = props.children,\n      classes = props.classes,\n      className = props.className,\n      _props$collapsedHeigh = props.collapsedHeight,\n      collapsedHeight = _props$collapsedHeigh === void 0 ? '0px' : _props$collapsedHeigh,\n      _props$component = props.component,\n      Component = _props$component === void 0 ? 'div' : _props$component,\n      inProp = props.in,\n      onEnter = props.onEnter,\n      onEntered = props.onEntered,\n      onEntering = props.onEntering,\n      onExit = props.onExit,\n      onExiting = props.onExiting,\n      style = props.style,\n      theme = props.theme,\n      _props$timeout = props.timeout,\n      timeout = _props$timeout === void 0 ? _styles_transitions__WEBPACK_IMPORTED_MODULE_7__[\"duration\"].standard : _props$timeout,\n      other = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default()(props, [\"children\", \"classes\", \"className\", \"collapsedHeight\", \"component\", \"in\", \"onEnter\", \"onEntered\", \"onEntering\", \"onExit\", \"onExiting\", \"style\", \"theme\", \"timeout\"]);\n\n  var timer = react__WEBPACK_IMPORTED_MODULE_2___default.a.useRef();\n  var wrapperRef = react__WEBPACK_IMPORTED_MODULE_2___default.a.useRef(null);\n  var autoTransitionDuration = react__WEBPACK_IMPORTED_MODULE_2___default.a.useRef();\n  react__WEBPACK_IMPORTED_MODULE_2___default.a.useEffect(function () {\n    return function () {\n      clearTimeout(timer.current);\n    };\n  }, []);\n\n  var handleEnter = function handleEnter(node) {\n    node.style.height = collapsedHeight;\n\n    if (onEnter) {\n      onEnter(node);\n    }\n  };\n\n  var handleEntering = function handleEntering(node) {\n    var wrapperHeight = wrapperRef.current ? wrapperRef.current.clientHeight : 0;\n\n    var _getTransitionProps = Object(_transitions_utils__WEBPACK_IMPORTED_MODULE_8__[\"getTransitionProps\"])({\n      style: style,\n      timeout: timeout\n    }, {\n      mode: 'enter'\n    }),\n        transitionDuration = _getTransitionProps.duration;\n\n    if (timeout === 'auto') {\n      var duration2 = theme.transitions.getAutoHeightDuration(wrapperHeight);\n      node.style.transitionDuration = \"\".concat(duration2, \"ms\");\n      autoTransitionDuration.current = duration2;\n    } else {\n      node.style.transitionDuration = typeof transitionDuration === 'string' ? transitionDuration : \"\".concat(transitionDuration, \"ms\");\n    }\n\n    node.style.height = \"\".concat(wrapperHeight, \"px\");\n\n    if (onEntering) {\n      onEntering(node);\n    }\n  };\n\n  var handleEntered = function handleEntered(node) {\n    node.style.height = 'auto';\n\n    if (onEntered) {\n      onEntered(node);\n    }\n  };\n\n  var handleExit = function handleExit(node) {\n    var wrapperHeight = wrapperRef.current ? wrapperRef.current.clientHeight : 0;\n    node.style.height = \"\".concat(wrapperHeight, \"px\");\n\n    if (onExit) {\n      onExit(node);\n    }\n  };\n\n  var handleExiting = function handleExiting(node) {\n    var wrapperHeight = wrapperRef.current ? wrapperRef.current.clientHeight : 0;\n\n    var _getTransitionProps2 = Object(_transitions_utils__WEBPACK_IMPORTED_MODULE_8__[\"getTransitionProps\"])({\n      style: style,\n      timeout: timeout\n    }, {\n      mode: 'exit'\n    }),\n        transitionDuration = _getTransitionProps2.duration;\n\n    if (timeout === 'auto') {\n      var duration2 = theme.transitions.getAutoHeightDuration(wrapperHeight);\n      node.style.transitionDuration = \"\".concat(duration2, \"ms\");\n      autoTransitionDuration.current = duration2;\n    } else {\n      node.style.transitionDuration = typeof transitionDuration === 'string' ? transitionDuration : \"\".concat(transitionDuration, \"ms\");\n    }\n\n    node.style.height = collapsedHeight;\n\n    if (onExiting) {\n      onExiting(node);\n    }\n  };\n\n  var addEndListener = function addEndListener(_, next) {\n    if (timeout === 'auto') {\n      timer.current = setTimeout(next, autoTransitionDuration.current || 0);\n    }\n  };\n\n  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_transition_group__WEBPACK_IMPORTED_MODULE_5__[\"Transition\"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({\n    in: inProp,\n    onEnter: handleEnter,\n    onEntered: handleEntered,\n    onEntering: handleEntering,\n    onExit: handleExit,\n    onExiting: handleExiting,\n    addEndListener: addEndListener,\n    timeout: timeout === 'auto' ? null : timeout\n  }, other), function (state, childProps) {\n    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Component, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({\n      className: Object(clsx__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(classes.container, className, state === 'entered' && classes.entered, state === 'exited' && !inProp && collapsedHeight === '0px' && classes.hidden),\n      style: _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({\n        minHeight: collapsedHeight\n      }, style),\n      ref: ref\n    }, childProps), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(\"div\", {\n      className: classes.wrapper,\n      ref: wrapperRef\n    }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(\"div\", {\n      className: classes.wrapperInner\n    }, children)));\n  });\n});\n true ? Collapse.propTypes = {\n  /**\n   * The content node to be collapsed.\n   */\n  children: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.node,\n\n  /**\n   * Override or extend the styles applied to the component.\n   * See [CSS API](#css) below for more details.\n   */\n  classes: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.object.isRequired,\n\n  /**\n   * @ignore\n   */\n  className: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string,\n\n  /**\n   * The height of the container when collapsed.\n   */\n  collapsedHeight: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string,\n\n  /**\n   * The component used for the root node.\n   * Either a string to use a DOM element or a component.\n   */\n  component: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.elementType,\n\n  /**\n   * If `true`, the component will transition in.\n   */\n  in: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.bool,\n\n  /**\n   * @ignore\n   */\n  onEnter: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,\n\n  /**\n   * @ignore\n   */\n  onEntered: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,\n\n  /**\n   * @ignore\n   */\n  onEntering: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,\n\n  /**\n   * @ignore\n   */\n  onExit: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,\n\n  /**\n   * @ignore\n   */\n  onExiting: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,\n\n  /**\n   * @ignore\n   */\n  style: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.object,\n\n  /**\n   * @ignore\n   */\n  theme: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.object.isRequired,\n\n  /**\n   * The duration for the transition, in milliseconds.\n   * You may specify a single timeout for all transitions, or individually with an object.\n   *\n   * Set to 'auto' to automatically calculate transition time based on height.\n   */\n  timeout: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.number, prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.shape({\n    enter: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.number,\n    exit: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.number\n  }), prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.oneOf(['auto'])])\n} : undefined;\nCollapse.muiSupportAuto = true;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(_styles_withStyles__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(styles, {\n  withTheme: true,\n  name: 'MuiCollapse'\n})(Collapse));\n\n//# sourceURL=webpack:///./node_modules/@material-ui/core/esm/Collapse/Collapse.js?");

/***/ }),

/***/ "./node_modules/@material-ui/core/esm/Collapse/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/@material-ui/core/esm/Collapse/index.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Collapse__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Collapse */ \"./node_modules/@material-ui/core/esm/Collapse/Collapse.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _Collapse__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n\n\n//# sourceURL=webpack:///./node_modules/@material-ui/core/esm/Collapse/index.js?");

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

/***/ "./node_modules/@material-ui/icons/ExpandMore.js":
/*!*******************************************************!*\
  !*** ./node_modules/@material-ui/icons/ExpandMore.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _react = _interopRequireDefault(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\n\nvar _createSvgIcon = _interopRequireDefault(__webpack_require__(/*! ./utils/createSvgIcon */ \"./node_modules/@material-ui/icons/utils/createSvgIcon.js\"));\n\nvar _default = (0, _createSvgIcon.default)(_react.default.createElement(_react.default.Fragment, null, _react.default.createElement(\"path\", {\n  d: \"M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z\"\n}), _react.default.createElement(\"path\", {\n  fill: \"none\",\n  d: \"M0 0h24v24H0z\"\n})), 'ExpandMore');\n\nexports.default = _default;\n\n//# sourceURL=webpack:///./node_modules/@material-ui/icons/ExpandMore.js?");

/***/ }),

/***/ "./src/components/Dashboard/MBPlayoff.js":
/*!***********************************************!*\
  !*** ./src/components/Dashboard/MBPlayoff.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return MBPlayoff; });\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ \"./node_modules/@babel/runtime/helpers/slicedToArray.js\");\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_loadable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-loadable */ \"./node_modules/react-loadable/lib/index.js\");\n/* harmony import */ var react_loadable__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_loadable__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/styles */ \"./node_modules/@material-ui/core/esm/styles/index.js\");\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../api */ \"./src/api/index.js\");\n/* harmony import */ var _material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/Paper */ \"./node_modules/@material-ui/core/esm/Paper/index.js\");\n/* harmony import */ var _material_ui_core_Collapse__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/Collapse */ \"./node_modules/@material-ui/core/esm/Collapse/index.js\");\n/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/IconButton */ \"./node_modules/@material-ui/core/esm/IconButton/index.js\");\n/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/Typography */ \"./node_modules/@material-ui/core/esm/Typography/index.js\");\n/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/Button */ \"./node_modules/@material-ui/core/esm/Button/index.js\");\n/* harmony import */ var _material_ui_core_Box__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/core/Box */ \"./node_modules/@material-ui/core/esm/Box/index.js\");\n/* harmony import */ var _material_ui_icons_ExpandMore__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/icons/ExpandMore */ \"./node_modules/@material-ui/icons/ExpandMore.js\");\n/* harmony import */ var _material_ui_icons_ExpandMore__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_ExpandMore__WEBPACK_IMPORTED_MODULE_11__);\n/* harmony import */ var _material_ui_core_colors_teal__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @material-ui/core/colors/teal */ \"./node_modules/@material-ui/core/colors/teal.js\");\n/* harmony import */ var _material_ui_core_colors_teal__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_colors_teal__WEBPACK_IMPORTED_MODULE_12__);\n/* harmony import */ var _material_ui_core_colors_grey__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @material-ui/core/colors/grey */ \"./node_modules/@material-ui/core/colors/grey.js\");\n/* harmony import */ var _material_ui_core_colors_grey__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_colors_grey__WEBPACK_IMPORTED_MODULE_13__);\n/* harmony import */ var _loading_LDCircular__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../loading/LDCircular */ \"./src/components/loading/LDCircular.js\");\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nvar MBPlayoffBody = react_loadable__WEBPACK_IMPORTED_MODULE_2___default()({\n  loader: function loader() {\n    return Promise.all(/*! import() | MBPlayoffBody */[__webpack_require__.e(\"vendors~CreateMatch~MBOverview~MBPlayoffBody~MBScoreEditorBody~MatchDetailBody~SignUp\"), __webpack_require__.e(\"vendors~MBPlayoffBody~MBScoreEditorBody~MatchDetail\"), __webpack_require__.e(\"MBPlayoffBody\")]).then(__webpack_require__.bind(null, /*! ./MBPlayoffBody */ \"./src/components/Dashboard/MBPlayoffBody.js\"));\n  },\n  loading: function loading() {\n    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_loading_LDCircular__WEBPACK_IMPORTED_MODULE_14__[\"LDCircular\"], null);\n  }\n});\nvar useStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__[\"makeStyles\"])(function (theme) {\n  return {\n    root: {\n      position: 'relative',\n      padding: theme.spacing(1, 2),\n      width: '100%',\n      backgroundColor: _material_ui_core_colors_grey__WEBPACK_IMPORTED_MODULE_13___default.a[50],\n      cursor: 'pointer',\n      marginTop: 24\n    },\n    title: {\n      color: _material_ui_core_colors_teal__WEBPACK_IMPORTED_MODULE_12___default.a[900],\n      fontSize: 18\n    },\n    expandIcon: {\n      position: 'absolute',\n      right: 16,\n      top: 8,\n      marginLeft: 'auto',\n      transition: theme.transitions.create('transform', {\n        duration: theme.transitions.duration.shortest\n      })\n    }\n  };\n});\nfunction MBPlayoff(props) {\n  var classes = useStyles();\n  var token = props.token,\n      setCSRFToken = props.setCSRFToken,\n      matchid = props.matchid,\n      handleSnackBar = props.handleSnackBar;\n\n  var _React$useState = react__WEBPACK_IMPORTED_MODULE_1___default.a.useState(false),\n      _React$useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_React$useState, 2),\n      expanded = _React$useState2[0],\n      setExpanded = _React$useState2[1];\n\n  function expandHandler() {\n    setExpanded(!expanded);\n  }\n\n  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n    className: classes.root,\n    onClick: function onClick() {\n      return !expanded ? expandHandler() : console.log();\n    }\n  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n    component: \"div\"\n  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Box__WEBPACK_IMPORTED_MODULE_10__[\"default\"], {\n    className: classes.title,\n    fontWeight: 600,\n    m: 1\n  }, \"Playoff\")), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n    className: classes.expandIcon,\n    style: {\n      transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)'\n    },\n    onClick: expandHandler\n  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_icons_ExpandMore__WEBPACK_IMPORTED_MODULE_11___default.a, null)), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Collapse__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n    in: expanded,\n    timeout: \"auto\",\n    unmountOnExit: true\n  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(MBPlayoffBody, {\n    token: token,\n    setCSRFToken: setCSRFToken,\n    matchid: matchid,\n    handleSnackBar: handleSnackBar\n  })));\n}\n\n//# sourceURL=webpack:///./src/components/Dashboard/MBPlayoff.js?");

/***/ })

}]);