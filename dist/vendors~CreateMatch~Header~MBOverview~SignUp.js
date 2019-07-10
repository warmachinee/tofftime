(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~CreateMatch~Header~MBOverview~SignUp"],{

/***/ "./node_modules/@material-ui/core/esm/CssBaseline/CssBaseline.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@material-ui/core/esm/CssBaseline/CssBaseline.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ \"./node_modules/@babel/runtime/helpers/extends.js\");\n/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../styles */ \"./node_modules/@material-ui/core/esm/styles/index.js\");\n/* harmony import */ var _material_ui_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/utils */ \"./node_modules/@material-ui/utils/esm/index.js\");\n\n\n\n\n\nvar useStyles = Object(_styles__WEBPACK_IMPORTED_MODULE_3__[\"makeStyles\"])(function (theme) {\n  return {\n    '@global': {\n      html: {\n        WebkitFontSmoothing: 'antialiased',\n        // Antialiasing.\n        MozOsxFontSmoothing: 'grayscale',\n        // Antialiasing.\n        // Change from `box-sizing: content-box` so that `width`\n        // is not affected by `padding` or `border`.\n        boxSizing: 'border-box'\n      },\n      '*, *::before, *::after': {\n        boxSizing: 'inherit'\n      },\n      'strong, b': {\n        fontWeight: theme.typography.fontWeightMedium\n      },\n      body: _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({\n        margin: 0,\n        // Remove the margin in all browsers.\n        color: theme.palette.text.primary\n      }, theme.typography.body2, {\n        backgroundColor: theme.palette.background.default,\n        '@media print': {\n          // Save printer ink.\n          backgroundColor: theme.palette.common.white\n        }\n      })\n    }\n  };\n}, {\n  name: 'MuiCssBaseline'\n});\n/**\n * Kickstart an elegant, consistent, and simple baseline to build upon.\n */\n\nfunction CssBaseline(props) {\n  var _props$children = props.children,\n      children = _props$children === void 0 ? null : _props$children;\n  useStyles();\n  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, children);\n}\n\n true ? CssBaseline.propTypes = {\n  /**\n   * You can wrap a node.\n   */\n  children: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.node\n} : undefined;\n\nif (true) {\n  // eslint-disable-next-line\n  CssBaseline['propTypes' + ''] = Object(_material_ui_utils__WEBPACK_IMPORTED_MODULE_4__[\"exactProp\"])(CssBaseline.propTypes);\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (CssBaseline);\n\n//# sourceURL=webpack:///./node_modules/@material-ui/core/esm/CssBaseline/CssBaseline.js?");

/***/ }),

/***/ "./node_modules/@material-ui/core/esm/CssBaseline/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@material-ui/core/esm/CssBaseline/index.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _CssBaseline__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CssBaseline */ \"./node_modules/@material-ui/core/esm/CssBaseline/CssBaseline.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _CssBaseline__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n\n\n//# sourceURL=webpack:///./node_modules/@material-ui/core/esm/CssBaseline/index.js?");

/***/ }),

/***/ "./node_modules/@material-ui/core/esm/Menu/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@material-ui/core/esm/Menu/index.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Menu */ \"./node_modules/@material-ui/core/esm/Menu/Menu.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _Menu__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n\n\n//# sourceURL=webpack:///./node_modules/@material-ui/core/esm/Menu/index.js?");

/***/ }),

/***/ "./node_modules/@material-ui/core/esm/MenuItem/MenuItem.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@material-ui/core/esm/MenuItem/MenuItem.js ***!
  \*****************************************************************/
/*! exports provided: styles, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"styles\", function() { return styles; });\n/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ \"./node_modules/@babel/runtime/helpers/objectWithoutProperties.js\");\n/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ \"./node_modules/@babel/runtime/helpers/extends.js\");\n/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! clsx */ \"./node_modules/clsx/dist/clsx.m.js\");\n/* harmony import */ var _styles_withStyles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../styles/withStyles */ \"./node_modules/@material-ui/core/esm/styles/withStyles.js\");\n/* harmony import */ var _ListItem__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../ListItem */ \"./node_modules/@material-ui/core/esm/ListItem/index.js\");\n\n\n\n\n\n\n\nvar styles = function styles(theme) {\n  return {\n    /* Styles applied to the root element. */\n    root: _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({}, theme.typography.subtitle1, {\n      minHeight: 48,\n      paddingTop: 4,\n      paddingBottom: 4,\n      boxSizing: 'border-box',\n      width: 'auto',\n      overflow: 'hidden',\n      whiteSpace: 'nowrap'\n    }),\n\n    /* Styles applied to the root element if `disableGutters={false}`. */\n    gutters: {\n      paddingLeft: 16,\n      paddingRight: 16\n    },\n\n    /* Styles applied to the root element if `selected={true}`. */\n    selected: {}\n  };\n};\nvar MenuItem = react__WEBPACK_IMPORTED_MODULE_2___default.a.forwardRef(function MenuItem(props, ref) {\n  var classes = props.classes,\n      className = props.className,\n      _props$component = props.component,\n      component = _props$component === void 0 ? 'li' : _props$component,\n      _props$disableGutters = props.disableGutters,\n      disableGutters = _props$disableGutters === void 0 ? false : _props$disableGutters,\n      _props$role = props.role,\n      role = _props$role === void 0 ? 'menuitem' : _props$role,\n      selected = props.selected,\n      tabIndexProp = props.tabIndex,\n      other = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0___default()(props, [\"classes\", \"className\", \"component\", \"disableGutters\", \"role\", \"selected\", \"tabIndex\"]);\n\n  var tabIndex;\n\n  if (!props.disabled) {\n    tabIndex = tabIndexProp !== undefined ? tabIndexProp : -1;\n  }\n\n  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_ListItem__WEBPACK_IMPORTED_MODULE_6__[\"default\"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({\n    button: true,\n    role: role,\n    tabIndex: tabIndex,\n    component: component,\n    selected: selected,\n    disableGutters: disableGutters,\n    className: Object(clsx__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(classes.root, className, selected && classes.selected, !disableGutters && classes.gutters),\n    ref: ref\n  }, other));\n});\n true ? MenuItem.propTypes = {\n  /**\n   * Menu item contents.\n   */\n  children: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.node,\n\n  /**\n   * Override or extend the styles applied to the component.\n   * See [CSS API](#css) below for more details.\n   */\n  classes: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.object.isRequired,\n\n  /**\n   * @ignore\n   */\n  className: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,\n\n  /**\n   * The component used for the root node.\n   * Either a string to use a DOM element or a component.\n   */\n  component: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.elementType,\n\n  /**\n   * @ignore\n   */\n  disabled: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,\n\n  /**\n   * If `true`, the left and right padding is removed.\n   */\n  disableGutters: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,\n\n  /**\n   * @ignore\n   */\n  role: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,\n\n  /**\n   * @ignore\n   */\n  selected: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,\n\n  /**\n   * @ignore\n   */\n  tabIndex: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.number\n} : undefined;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(_styles_withStyles__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(styles, {\n  name: 'MuiMenuItem'\n})(MenuItem));\n\n//# sourceURL=webpack:///./node_modules/@material-ui/core/esm/MenuItem/MenuItem.js?");

/***/ }),

/***/ "./node_modules/@material-ui/core/esm/MenuItem/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/@material-ui/core/esm/MenuItem/index.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _MenuItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MenuItem */ \"./node_modules/@material-ui/core/esm/MenuItem/MenuItem.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _MenuItem__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n\n\n//# sourceURL=webpack:///./node_modules/@material-ui/core/esm/MenuItem/index.js?");

/***/ }),

/***/ "./node_modules/@material-ui/core/esm/Slide/Slide.js":
/*!***********************************************************!*\
  !*** ./node_modules/@material-ui/core/esm/Slide/Slide.js ***!
  \***********************************************************/
/*! exports provided: setTranslateValue, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setTranslateValue\", function() { return setTranslateValue; });\n/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ \"./node_modules/@babel/runtime/helpers/extends.js\");\n/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ \"./node_modules/@babel/runtime/helpers/objectWithoutProperties.js\");\n/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var debounce__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! debounce */ \"./node_modules/debounce/index.js\");\n/* harmony import */ var debounce__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(debounce__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var react_transition_group__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-transition-group */ \"./node_modules/react-transition-group/esm/index.js\");\n/* harmony import */ var _material_ui_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/utils */ \"./node_modules/@material-ui/utils/esm/index.js\");\n/* harmony import */ var _utils_reactHelpers__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/reactHelpers */ \"./node_modules/@material-ui/core/esm/utils/reactHelpers.js\");\n/* harmony import */ var _styles_withTheme__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../styles/withTheme */ \"./node_modules/@material-ui/core/esm/styles/withTheme.js\");\n/* harmony import */ var _styles_transitions__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../styles/transitions */ \"./node_modules/@material-ui/core/esm/styles/transitions.js\");\n/* harmony import */ var _transitions_utils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../transitions/utils */ \"./node_modules/@material-ui/core/esm/transitions/utils.js\");\n\n\n\n\n\n // < 1kb payload overhead when lodash/debounce is > 3kb.\n\n\n\n\n\n\n\nvar GUTTER = 24; // Translate the node so he can't be seen on the screen.\n// Later, we gonna translate back the node to his original location\n// with `translate3d(0, 0, 0)`.`\n\nfunction getTranslateValue(direction, node) {\n  var rect = node.getBoundingClientRect();\n  var transform;\n\n  if (node.fakeTransform) {\n    transform = node.fakeTransform;\n  } else {\n    var computedStyle = window.getComputedStyle(node);\n    transform = computedStyle.getPropertyValue('-webkit-transform') || computedStyle.getPropertyValue('transform');\n  }\n\n  var offsetX = 0;\n  var offsetY = 0;\n\n  if (transform && transform !== 'none' && typeof transform === 'string') {\n    var transformValues = transform.split('(')[1].split(')')[0].split(',');\n    offsetX = parseInt(transformValues[4], 10);\n    offsetY = parseInt(transformValues[5], 10);\n  }\n\n  if (direction === 'left') {\n    return \"translateX(100vw) translateX(-\".concat(rect.left - offsetX, \"px)\");\n  }\n\n  if (direction === 'right') {\n    return \"translateX(-\".concat(rect.left + rect.width + GUTTER - offsetX, \"px)\");\n  }\n\n  if (direction === 'up') {\n    return \"translateY(100vh) translateY(-\".concat(rect.top - offsetY, \"px)\");\n  } // direction === 'down'\n\n\n  return \"translateY(-\".concat(rect.top + rect.height + GUTTER - offsetY, \"px)\");\n}\n\nfunction setTranslateValue(direction, node) {\n  var transform = getTranslateValue(direction, node);\n\n  if (transform) {\n    node.style.webkitTransform = transform;\n    node.style.transform = transform;\n  }\n}\nvar defaultTimeout = {\n  enter: _styles_transitions__WEBPACK_IMPORTED_MODULE_10__[\"duration\"].enteringScreen,\n  exit: _styles_transitions__WEBPACK_IMPORTED_MODULE_10__[\"duration\"].leavingScreen\n};\n/**\n * The Slide transition is used by the [Drawer](/components/drawers/) component.\n * It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.\n */\n\nvar Slide = react__WEBPACK_IMPORTED_MODULE_2___default.a.forwardRef(function Slide(props, ref) {\n  var children = props.children,\n      _props$direction = props.direction,\n      direction = _props$direction === void 0 ? 'down' : _props$direction,\n      inProp = props.in,\n      onEnter = props.onEnter,\n      onEntering = props.onEntering,\n      onExit = props.onExit,\n      onExited = props.onExited,\n      style = props.style,\n      theme = props.theme,\n      _props$timeout = props.timeout,\n      timeout = _props$timeout === void 0 ? defaultTimeout : _props$timeout,\n      other = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default()(props, [\"children\", \"direction\", \"in\", \"onEnter\", \"onEntering\", \"onExit\", \"onExited\", \"style\", \"theme\", \"timeout\"]);\n\n  var childrenRef = react__WEBPACK_IMPORTED_MODULE_2___default.a.useRef(null);\n  /**\n   * used in cloneElement(children, { ref: handleRef })\n   */\n\n  var handleOwnRef = react__WEBPACK_IMPORTED_MODULE_2___default.a.useCallback(function (instance) {\n    // #StrictMode ready\n    childrenRef.current = react_dom__WEBPACK_IMPORTED_MODULE_4___default.a.findDOMNode(instance);\n  }, []);\n  var handleRefIntermediary = Object(_utils_reactHelpers__WEBPACK_IMPORTED_MODULE_8__[\"useForkRef\"])(children.ref, handleOwnRef);\n  var handleRef = Object(_utils_reactHelpers__WEBPACK_IMPORTED_MODULE_8__[\"useForkRef\"])(handleRefIntermediary, ref);\n\n  var handleEnter = function handleEnter() {\n    var node = childrenRef.current;\n    setTranslateValue(direction, node);\n    Object(_transitions_utils__WEBPACK_IMPORTED_MODULE_11__[\"reflow\"])(node);\n\n    if (onEnter) {\n      onEnter(node);\n    }\n  };\n\n  var handleEntering = function handleEntering() {\n    var node = childrenRef.current;\n    var transitionProps = Object(_transitions_utils__WEBPACK_IMPORTED_MODULE_11__[\"getTransitionProps\"])({\n      timeout: timeout,\n      style: style\n    }, {\n      mode: 'enter'\n    });\n    node.style.webkitTransition = theme.transitions.create('-webkit-transform', _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, transitionProps, {\n      easing: theme.transitions.easing.easeOut\n    }));\n    node.style.transition = theme.transitions.create('transform', _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, transitionProps, {\n      easing: theme.transitions.easing.easeOut\n    }));\n    node.style.webkitTransform = 'translate(0, 0)';\n    node.style.transform = 'translate(0, 0)';\n\n    if (onEntering) {\n      onEntering(node);\n    }\n  };\n\n  var handleExit = function handleExit() {\n    var node = childrenRef.current;\n    var transitionProps = Object(_transitions_utils__WEBPACK_IMPORTED_MODULE_11__[\"getTransitionProps\"])({\n      timeout: timeout,\n      style: style\n    }, {\n      mode: 'exit'\n    });\n    node.style.webkitTransition = theme.transitions.create('-webkit-transform', _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, transitionProps, {\n      easing: theme.transitions.easing.sharp\n    }));\n    node.style.transition = theme.transitions.create('transform', _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, transitionProps, {\n      easing: theme.transitions.easing.sharp\n    }));\n    setTranslateValue(direction, node);\n\n    if (onExit) {\n      onExit(node);\n    }\n  };\n\n  var handleExited = function handleExited() {\n    var node = childrenRef.current; // No need for transitions when the component is hidden\n\n    node.style.webkitTransition = '';\n    node.style.transition = '';\n\n    if (onExited) {\n      onExited(node);\n    }\n  };\n\n  var updatePosition = react__WEBPACK_IMPORTED_MODULE_2___default.a.useCallback(function () {\n    if (childrenRef.current) {\n      setTranslateValue(direction, childrenRef.current);\n    }\n  }, [direction]);\n  react__WEBPACK_IMPORTED_MODULE_2___default.a.useEffect(function () {\n    // Skip configuration where the position is screen size invariant.\n    if (!inProp && direction !== 'down' && direction !== 'right') {\n      var handleResize = debounce__WEBPACK_IMPORTED_MODULE_5___default()(function () {\n        if (childrenRef.current) {\n          setTranslateValue(direction, childrenRef.current);\n        }\n      }, 166); // Corresponds to 10 frames at 60 Hz.\n\n      window.addEventListener('resize', handleResize);\n      return function () {\n        handleResize.clear();\n        window.removeEventListener('resize', handleResize);\n      };\n    }\n\n    return undefined;\n  }, [direction, inProp]);\n  react__WEBPACK_IMPORTED_MODULE_2___default.a.useEffect(function () {\n    if (!inProp) {\n      // We need to update the position of the drawer when the direction change and\n      // when it's hidden.\n      updatePosition();\n    }\n  }, [inProp, updatePosition]);\n  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_transition_group__WEBPACK_IMPORTED_MODULE_6__[\"Transition\"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({\n    onEnter: handleEnter,\n    onEntering: handleEntering,\n    onExit: handleExit,\n    onExited: handleExited,\n    appear: true,\n    in: inProp,\n    timeout: timeout\n  }, other), function (state, childProps) {\n    return react__WEBPACK_IMPORTED_MODULE_2___default.a.cloneElement(children, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({\n      ref: handleRef,\n      style: _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({\n        visibility: state === 'exited' && !inProp ? 'hidden' : undefined\n      }, style, children.props.style)\n    }, childProps));\n  });\n});\n true ? Slide.propTypes = {\n  /**\n   * A single child content element.\n   */\n  children: _material_ui_utils__WEBPACK_IMPORTED_MODULE_7__[\"elementAcceptingRef\"],\n\n  /**\n   * Direction the child node will enter from.\n   */\n  direction: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.oneOf(['left', 'right', 'up', 'down']),\n\n  /**\n   * If `true`, show the component; triggers the enter or exit animation.\n   */\n  in: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,\n\n  /**\n   * @ignore\n   */\n  onEnter: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func,\n\n  /**\n   * @ignore\n   */\n  onEntering: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func,\n\n  /**\n   * @ignore\n   */\n  onExit: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func,\n\n  /**\n   * @ignore\n   */\n  onExited: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func,\n\n  /**\n   * @ignore\n   */\n  style: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.object,\n\n  /**\n   * @ignore\n   */\n  theme: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.object.isRequired,\n\n  /**\n   * The duration for the transition, in milliseconds.\n   * You may specify a single timeout for all transitions, or individually with an object.\n   */\n  timeout: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.number, prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.shape({\n    enter: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.number,\n    exit: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.number\n  })])\n} : undefined;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(_styles_withTheme__WEBPACK_IMPORTED_MODULE_9__[\"default\"])(Slide));\n\n//# sourceURL=webpack:///./node_modules/@material-ui/core/esm/Slide/Slide.js?");

/***/ }),

/***/ "./node_modules/@material-ui/core/esm/Slide/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/@material-ui/core/esm/Slide/index.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Slide__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Slide */ \"./node_modules/@material-ui/core/esm/Slide/Slide.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _Slide__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n\n\n//# sourceURL=webpack:///./node_modules/@material-ui/core/esm/Slide/index.js?");

/***/ }),

/***/ "./node_modules/@material-ui/core/esm/Toolbar/Toolbar.js":
/*!***************************************************************!*\
  !*** ./node_modules/@material-ui/core/esm/Toolbar/Toolbar.js ***!
  \***************************************************************/
/*! exports provided: styles, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"styles\", function() { return styles; });\n/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ \"./node_modules/@babel/runtime/helpers/extends.js\");\n/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ \"./node_modules/@babel/runtime/helpers/objectWithoutProperties.js\");\n/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"./node_modules/@babel/runtime/helpers/defineProperty.js\");\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! clsx */ \"./node_modules/clsx/dist/clsx.m.js\");\n/* harmony import */ var _styles_withStyles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../styles/withStyles */ \"./node_modules/@material-ui/core/esm/styles/withStyles.js\");\n\n\n\n\n\n\n\nvar styles = function styles(theme) {\n  return {\n    /* Styles applied to the root element. */\n    root: {\n      position: 'relative',\n      display: 'flex',\n      alignItems: 'center'\n    },\n\n    /* Styles applied to the root element if `disableGutters={false}`. */\n    gutters: _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()({\n      paddingLeft: theme.spacing(2),\n      paddingRight: theme.spacing(2)\n    }, theme.breakpoints.up('sm'), {\n      paddingLeft: theme.spacing(3),\n      paddingRight: theme.spacing(3)\n    }),\n\n    /* Styles applied to the root element if `variant=\"regular\"`. */\n    regular: theme.mixins.toolbar,\n\n    /* Styles applied to the root element if `variant=\"dense\"`. */\n    dense: {\n      minHeight: 48\n    }\n  };\n};\nvar Toolbar = react__WEBPACK_IMPORTED_MODULE_3___default.a.forwardRef(function Toolbar(props, ref) {\n  var classes = props.classes,\n      classNameProp = props.className,\n      _props$component = props.component,\n      Component = _props$component === void 0 ? 'div' : _props$component,\n      _props$disableGutters = props.disableGutters,\n      disableGutters = _props$disableGutters === void 0 ? false : _props$disableGutters,\n      _props$variant = props.variant,\n      variant = _props$variant === void 0 ? 'regular' : _props$variant,\n      other = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default()(props, [\"classes\", \"className\", \"component\", \"disableGutters\", \"variant\"]);\n\n  var className = Object(clsx__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(classes.root, classes[variant], classNameProp, !disableGutters && classes.gutters);\n  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Component, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({\n    className: className,\n    ref: ref\n  }, other));\n});\n true ? Toolbar.propTypes = {\n  /**\n   * Toolbar children, usually a mixture of `IconButton`, `Button` and `Typography`.\n   */\n  children: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.node,\n\n  /**\n   * Override or extend the styles applied to the component.\n   * See [CSS API](#css) below for more details.\n   */\n  classes: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.object.isRequired,\n\n  /**\n   * @ignore\n   */\n  className: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string,\n\n  /**\n   * The component used for the root node.\n   * Either a string to use a DOM element or a component.\n   */\n  component: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.elementType,\n\n  /**\n   * If `true`, disables gutter padding.\n   */\n  disableGutters: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.bool,\n\n  /**\n   * The variant to use.\n   */\n  variant: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.oneOf(['regular', 'dense'])\n} : undefined;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(_styles_withStyles__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(styles, {\n  name: 'MuiToolbar'\n})(Toolbar));\n\n//# sourceURL=webpack:///./node_modules/@material-ui/core/esm/Toolbar/Toolbar.js?");

/***/ }),

/***/ "./node_modules/@material-ui/core/esm/Toolbar/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/@material-ui/core/esm/Toolbar/index.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Toolbar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Toolbar */ \"./node_modules/@material-ui/core/esm/Toolbar/Toolbar.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _Toolbar__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n\n\n//# sourceURL=webpack:///./node_modules/@material-ui/core/esm/Toolbar/index.js?");

/***/ }),

/***/ "./node_modules/@material-ui/core/esm/useScrollTrigger/index.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@material-ui/core/esm/useScrollTrigger/index.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _useScrollTrigger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./useScrollTrigger */ \"./node_modules/@material-ui/core/esm/useScrollTrigger/useScrollTrigger.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _useScrollTrigger__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n\n\n//# sourceURL=webpack:///./node_modules/@material-ui/core/esm/useScrollTrigger/index.js?");

/***/ }),

/***/ "./node_modules/@material-ui/core/esm/useScrollTrigger/useScrollTrigger.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@material-ui/core/esm/useScrollTrigger/useScrollTrigger.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return useScrollTrigger; });\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ \"./node_modules/@babel/runtime/helpers/slicedToArray.js\");\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ \"./node_modules/@babel/runtime/helpers/objectWithoutProperties.js\");\n/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\nfunction getScrollY(ref) {\n  return ref.pageYOffset !== undefined ? ref.pageYOffset : ref.scrollTop;\n}\n\nfunction defaultTrigger(event, store, options) {\n  var _options$disableHyste = options.disableHysteresis,\n      disableHysteresis = _options$disableHyste === void 0 ? false : _options$disableHyste,\n      _options$threshold = options.threshold,\n      threshold = _options$threshold === void 0 ? 100 : _options$threshold;\n  var previous = store.current;\n  store.current = event ? getScrollY(event.currentTarget) : previous;\n\n  if (!disableHysteresis && previous !== undefined) {\n    if (store.current < previous) {\n      return false;\n    }\n  }\n\n  return store.current > threshold;\n}\n\nvar defaultTarget = typeof window !== 'undefined' ? window : null;\nfunction useScrollTrigger() {\n  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n\n  var _options$getTrigger = options.getTrigger,\n      getTrigger = _options$getTrigger === void 0 ? defaultTrigger : _options$getTrigger,\n      _options$target = options.target,\n      target = _options$target === void 0 ? defaultTarget : _options$target,\n      other = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default()(options, [\"getTrigger\", \"target\"]);\n\n  var store = react__WEBPACK_IMPORTED_MODULE_2___default.a.useRef();\n\n  var _React$useState = react__WEBPACK_IMPORTED_MODULE_2___default.a.useState(function () {\n    return getTrigger(null, store, other);\n  }),\n      _React$useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_React$useState, 2),\n      trigger = _React$useState2[0],\n      setTrigger = _React$useState2[1];\n\n  react__WEBPACK_IMPORTED_MODULE_2___default.a.useEffect(function () {\n    var handleScroll = function handleScroll(event) {\n      setTrigger(getTrigger(event, store, other));\n    };\n\n    handleScroll(null); // Re-evaluate trigger when dependencies change\n\n    target.addEventListener('scroll', handleScroll);\n    return function () {\n      target.removeEventListener('scroll', handleScroll);\n    }; // See Option 3. https://github.com/facebook/react/issues/14476#issuecomment-471199055\n    // eslint-disable-next-line react-hooks/exhaustive-deps\n  }, [target, getTrigger, JSON.stringify(other)]);\n  return trigger;\n}\n\n//# sourceURL=webpack:///./node_modules/@material-ui/core/esm/useScrollTrigger/useScrollTrigger.js?");

/***/ })

}]);