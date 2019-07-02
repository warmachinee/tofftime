(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["News"],{

/***/ "./node_modules/@material-ui/core/esm/Avatar/Avatar.js":
/*!*************************************************************!*\
  !*** ./node_modules/@material-ui/core/esm/Avatar/Avatar.js ***!
  \*************************************************************/
/*! exports provided: styles, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"styles\", function() { return styles; });\n/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ \"./node_modules/@babel/runtime/helpers/extends.js\");\n/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ \"./node_modules/@babel/runtime/helpers/objectWithoutProperties.js\");\n/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! clsx */ \"./node_modules/clsx/dist/clsx.m.js\");\n/* harmony import */ var _styles_withStyles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../styles/withStyles */ \"./node_modules/@material-ui/core/esm/styles/withStyles.js\");\n\n\n\n\n\n\nvar styles = function styles(theme) {\n  return {\n    /* Styles applied to the root element. */\n    root: {\n      position: 'relative',\n      display: 'flex',\n      alignItems: 'center',\n      justifyContent: 'center',\n      flexShrink: 0,\n      width: 40,\n      height: 40,\n      fontFamily: theme.typography.fontFamily,\n      fontSize: theme.typography.pxToRem(20),\n      borderRadius: '50%',\n      overflow: 'hidden',\n      userSelect: 'none'\n    },\n\n    /* Styles applied to the root element if there are children and not `src` or `srcSet`. */\n    colorDefault: {\n      color: theme.palette.background.default,\n      backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[400] : theme.palette.grey[600]\n    },\n\n    /* Styles applied to the img element if either `src` or `srcSet` is defined. */\n    img: {\n      width: '100%',\n      height: '100%',\n      textAlign: 'center',\n      // Handle non-square image. The property isn't supported by IE 11.\n      objectFit: 'cover'\n    }\n  };\n};\nvar Avatar = react__WEBPACK_IMPORTED_MODULE_2___default.a.forwardRef(function Avatar(props, ref) {\n  var alt = props.alt,\n      childrenProp = props.children,\n      childrenClassNameProp = props.childrenClassName,\n      classes = props.classes,\n      classNameProp = props.className,\n      _props$component = props.component,\n      Component = _props$component === void 0 ? 'div' : _props$component,\n      imgProps = props.imgProps,\n      sizes = props.sizes,\n      src = props.src,\n      srcSet = props.srcSet,\n      other = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default()(props, [\"alt\", \"children\", \"childrenClassName\", \"classes\", \"className\", \"component\", \"imgProps\", \"sizes\", \"src\", \"srcSet\"]);\n\n  var children = null;\n  var img = src || srcSet;\n\n  if (img) {\n    children = react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(\"img\", _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({\n      alt: alt,\n      src: src,\n      srcSet: srcSet,\n      sizes: sizes,\n      className: classes.img\n    }, imgProps));\n  } else if (childrenClassNameProp && react__WEBPACK_IMPORTED_MODULE_2___default.a.isValidElement(childrenProp)) {\n    children = react__WEBPACK_IMPORTED_MODULE_2___default.a.cloneElement(childrenProp, {\n      className: Object(clsx__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(childrenClassNameProp, childrenProp.props.className)\n    });\n  } else {\n    children = childrenProp;\n  }\n\n  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Component, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({\n    className: Object(clsx__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(classes.root, classes.system, classNameProp, !img && classes.colorDefault),\n    ref: ref\n  }, other), children);\n});\n true ? Avatar.propTypes = {\n  /**\n   * Used in combination with `src` or `srcSet` to\n   * provide an alt attribute for the rendered `img` element.\n   */\n  alt: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,\n\n  /**\n   * Used to render icon or text elements inside the Avatar.\n   * `src` and `alt` props will not be used and no `img` will\n   * be rendered by default.\n   *\n   * This can be an element, or just a string.\n   */\n  children: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.node,\n\n  /**\n   * @ignore\n   * The className of the child element.\n   * Used by Chip and ListItemIcon to style the Avatar icon.\n   */\n  childrenClassName: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,\n\n  /**\n   * Override or extend the styles applied to the component.\n   * See [CSS API](#css) below for more details.\n   */\n  classes: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.object.isRequired,\n\n  /**\n   * @ignore\n   */\n  className: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,\n\n  /**\n   * The component used for the root node.\n   * Either a string to use a DOM element or a component.\n   */\n  component: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.elementType,\n\n  /**\n   * Attributes applied to the `img` element if the component\n   * is used to display an image.\n   */\n  imgProps: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.object,\n\n  /**\n   * The `sizes` attribute for the `img` element.\n   */\n  sizes: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,\n\n  /**\n   * The `src` attribute for the `img` element.\n   */\n  src: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,\n\n  /**\n   * The `srcSet` attribute for the `img` element.\n   */\n  srcSet: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string\n} : undefined;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(_styles_withStyles__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(styles, {\n  name: 'MuiAvatar'\n})(Avatar));\n\n//# sourceURL=webpack:///./node_modules/@material-ui/core/esm/Avatar/Avatar.js?");

/***/ }),

/***/ "./node_modules/@material-ui/core/esm/Avatar/index.js":
/*!************************************************************!*\
  !*** ./node_modules/@material-ui/core/esm/Avatar/index.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Avatar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Avatar */ \"./node_modules/@material-ui/core/esm/Avatar/Avatar.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _Avatar__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n\n\n//# sourceURL=webpack:///./node_modules/@material-ui/core/esm/Avatar/index.js?");

/***/ }),

/***/ "./node_modules/@material-ui/core/esm/ListItemAvatar/ListItemAvatar.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@material-ui/core/esm/ListItemAvatar/ListItemAvatar.js ***!
  \*****************************************************************************/
/*! exports provided: styles, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"styles\", function() { return styles; });\n/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ \"./node_modules/@babel/runtime/helpers/extends.js\");\n/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ \"./node_modules/@babel/runtime/helpers/objectWithoutProperties.js\");\n/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! clsx */ \"./node_modules/clsx/dist/clsx.m.js\");\n/* harmony import */ var _styles_withStyles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../styles/withStyles */ \"./node_modules/@material-ui/core/esm/styles/withStyles.js\");\n/* harmony import */ var _List_ListContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../List/ListContext */ \"./node_modules/@material-ui/core/esm/List/ListContext.js\");\n\n\n\n\n\n\n\nvar styles = {\n  /* Styles applied to the root element. */\n  root: {\n    minWidth: 56,\n    flexShrink: 0\n  },\n\n  /* Styles applied to the root element when the parent `ListItem` uses `alignItems=\"flex-start\"`. */\n  alignItemsFlexStart: {\n    marginTop: 8\n  }\n};\n/**\n * A simple wrapper to apply `List` styles to an `Avatar`.\n */\n\nvar ListItemAvatar = react__WEBPACK_IMPORTED_MODULE_2___default.a.forwardRef(function ListItemAvatar(props, ref) {\n  var classes = props.classes,\n      className = props.className,\n      other = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default()(props, [\"classes\", \"className\"]);\n\n  var context = react__WEBPACK_IMPORTED_MODULE_2___default.a.useContext(_List_ListContext__WEBPACK_IMPORTED_MODULE_6__[\"default\"]);\n  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(\"div\", _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({\n    className: Object(clsx__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(classes.root, className, context.alignItems === 'flex-start' && classes.alignItemsFlexStart),\n    ref: ref\n  }, other));\n});\n true ? ListItemAvatar.propTypes = {\n  /**\n   * The content of the component – normally `Avatar`.\n   */\n  children: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.element.isRequired,\n\n  /**\n   * Override or extend the styles applied to the component.\n   * See [CSS API](#css) below for more details.\n   */\n  classes: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.object.isRequired,\n\n  /**\n   * @ignore\n   */\n  className: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string\n} : undefined;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(_styles_withStyles__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(styles, {\n  name: 'MuiListItemAvatar'\n})(ListItemAvatar));\n\n//# sourceURL=webpack:///./node_modules/@material-ui/core/esm/ListItemAvatar/ListItemAvatar.js?");

/***/ }),

/***/ "./node_modules/@material-ui/core/esm/ListItemAvatar/index.js":
/*!********************************************************************!*\
  !*** ./node_modules/@material-ui/core/esm/ListItemAvatar/index.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ListItemAvatar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ListItemAvatar */ \"./node_modules/@material-ui/core/esm/ListItemAvatar/ListItemAvatar.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _ListItemAvatar__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n\n\n//# sourceURL=webpack:///./node_modules/@material-ui/core/esm/ListItemAvatar/index.js?");

/***/ }),

/***/ "./node_modules/@material-ui/icons/Image.js":
/*!**************************************************!*\
  !*** ./node_modules/@material-ui/icons/Image.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _react = _interopRequireDefault(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\n\nvar _createSvgIcon = _interopRequireDefault(__webpack_require__(/*! ./utils/createSvgIcon */ \"./node_modules/@material-ui/icons/utils/createSvgIcon.js\"));\n\nvar _default = (0, _createSvgIcon.default)(_react.default.createElement(_react.default.Fragment, null, _react.default.createElement(\"path\", {\n  fill: \"none\",\n  d: \"M0 0h24v24H0z\"\n}), _react.default.createElement(\"path\", {\n  d: \"M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z\"\n})), 'Image');\n\nexports.default = _default;\n\n//# sourceURL=webpack:///./node_modules/@material-ui/icons/Image.js?");

/***/ }),

/***/ "./src/components/News/News.js":
/*!*************************************!*\
  !*** ./src/components/News/News.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return FolderList; });\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"./node_modules/@babel/runtime/helpers/defineProperty.js\");\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/styles */ \"./node_modules/@material-ui/core/esm/styles/index.js\");\n/* harmony import */ var _material_ui_core_List__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/List */ \"./node_modules/@material-ui/core/esm/List/index.js\");\n/* harmony import */ var _material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/Divider */ \"./node_modules/@material-ui/core/esm/Divider/index.js\");\n/* harmony import */ var _NewsListItem__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./NewsListItem */ \"./src/components/News/NewsListItem.js\");\n\n\n\n\n\n\nvar useStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__[\"makeStyles\"])(function (theme) {\n  var _root;\n\n  return {\n    root: (_root = {\n      width: '100%',\n      maxHeight: 250,\n      overflow: 'auto',\n      overflowScrolling: 'touch',\n      WebkitOverflowScrolling: 'touch',\n      backgroundColor: theme.palette.background.paper,\n      padding: 0,\n      marginLeft: 'auto',\n      marginRight: 'auto',\n      marginTop: 16\n    }, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_root, theme.breakpoints.up(750), {\n      maxWidth: 240,\n      marginTop: 0,\n      maxHeight: 300\n    }), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_root, theme.breakpoints.up(900), {\n      maxWidth: 300,\n      marginTop: 0,\n      maxHeight: 350\n    }), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_root, theme.breakpoints.up(1000), {\n      maxWidth: 300,\n      marginTop: 0,\n      maxHeight: 400\n    }), _root)\n  };\n});\nfunction FolderList() {\n  var classes = useStyles();\n  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_List__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n    className: classes.root\n  }, [0, 1, 2, 3, 4].map(function (d) {\n    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"div\", {\n      key: d\n    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_NewsListItem__WEBPACK_IMPORTED_MODULE_5__[\"default\"], null), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_4__[\"default\"], null));\n  }));\n}\n\n//# sourceURL=webpack:///./src/components/News/News.js?");

/***/ }),

/***/ "./src/components/News/NewsListItem.js":
/*!*********************************************!*\
  !*** ./src/components/News/NewsListItem.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return FolderList; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/styles */ \"./node_modules/@material-ui/core/esm/styles/index.js\");\n/* harmony import */ var _material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/ListItem */ \"./node_modules/@material-ui/core/esm/ListItem/index.js\");\n/* harmony import */ var _material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/ListItemText */ \"./node_modules/@material-ui/core/esm/ListItemText/index.js\");\n/* harmony import */ var _material_ui_core_ListItemAvatar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/ListItemAvatar */ \"./node_modules/@material-ui/core/esm/ListItemAvatar/index.js\");\n/* harmony import */ var _material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/Avatar */ \"./node_modules/@material-ui/core/esm/Avatar/index.js\");\n/* harmony import */ var _material_ui_icons_Image__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/icons/Image */ \"./node_modules/@material-ui/icons/Image.js\");\n/* harmony import */ var _material_ui_icons_Image__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Image__WEBPACK_IMPORTED_MODULE_6__);\n\n\n\n\n\n\n\nvar useStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__[\"makeStyles\"])(function (theme) {\n  return {};\n});\nfunction FolderList() {\n  var classes = useStyles();\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n    button: true\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItemAvatar__WEBPACK_IMPORTED_MODULE_4__[\"default\"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_5__[\"default\"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Image__WEBPACK_IMPORTED_MODULE_6___default.a, null))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n    primary: \"Photos\",\n    secondary: \"Jan 9, 2014\"\n  }));\n}\n\n//# sourceURL=webpack:///./src/components/News/NewsListItem.js?");

/***/ })

}]);