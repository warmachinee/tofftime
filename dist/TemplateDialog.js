(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["TemplateDialog"],{

/***/ "./node_modules/@material-ui/icons/Close.js":
/*!**************************************************!*\
  !*** ./node_modules/@material-ui/icons/Close.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _react = _interopRequireDefault(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\n\nvar _createSvgIcon = _interopRequireDefault(__webpack_require__(/*! ./utils/createSvgIcon */ \"./node_modules/@material-ui/icons/utils/createSvgIcon.js\"));\n\nvar _default = (0, _createSvgIcon.default)(_react.default.createElement(_react.default.Fragment, null, _react.default.createElement(\"path\", {\n  d: \"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\"\n}), _react.default.createElement(\"path\", {\n  fill: \"none\",\n  d: \"M0 0h24v24H0z\"\n})), 'Close');\n\nexports.default = _default;\n\n//# sourceURL=webpack:///./node_modules/@material-ui/icons/Close.js?");

/***/ }),

/***/ "./src/components/Dashboard/TemplateDialog.js":
/*!****************************************************!*\
  !*** ./src/components/Dashboard/TemplateDialog.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return TemplateDialog; });\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ \"./node_modules/@babel/runtime/helpers/slicedToArray.js\");\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"./node_modules/@babel/runtime/helpers/defineProperty.js\");\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_loadable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-loadable */ \"./node_modules/react-loadable/lib/index.js\");\n/* harmony import */ var react_loadable__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_loadable__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/styles */ \"./node_modules/@material-ui/core/esm/styles/index.js\");\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../api */ \"./src/api/index.js\");\n/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/Typography */ \"./node_modules/@material-ui/core/esm/Typography/index.js\");\n/* harmony import */ var _material_ui_core_Modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/Modal */ \"./node_modules/@material-ui/core/esm/Modal/index.js\");\n/* harmony import */ var _material_ui_core_Portal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/Portal */ \"./node_modules/@material-ui/core/esm/Portal/index.js\");\n/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/IconButton */ \"./node_modules/@material-ui/core/esm/IconButton/index.js\");\n/* harmony import */ var _material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/icons/Close */ \"./node_modules/@material-ui/icons/Close.js\");\n/* harmony import */ var _material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_10__);\n/* harmony import */ var _loading_LDCircular__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../loading/LDCircular */ \"./src/components/loading/LDCircular.js\");\n\n\n\n\n\n\n\n\n\n\n\n\n\nfunction getModalStyle() {\n  var top = 50;\n  var left = 50;\n  return {\n    top: \"\".concat(top, \"%\"),\n    left: \"\".concat(left, \"%\"),\n    transform: \"translate(-\".concat(top, \"%, -\").concat(left, \"%)\")\n  };\n}\n\nvar useStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__[\"makeStyles\"])(function (theme) {\n  var _paper;\n\n  return {\n    paper: (_paper = {\n      position: 'absolute',\n      width: '100%',\n      maxWidth: '100%',\n      backgroundColor: theme.palette.background.paper,\n      boxShadow: theme.shadows[5],\n      padding: theme.spacing(4),\n      outline: 'none',\n      height: '100%',\n      overflow: 'auto',\n      overflowScrolling: 'touch',\n      WebkitOverflowScrolling: 'touch'\n    }, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_paper, theme.breakpoints.up(500), {\n      height: 'auto',\n      maxWidth: 600\n    }), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_paper, \"maxHeight\", window.innerHeight * .8), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_paper, \"height\", '100%'), _paper),\n    close: {\n      position: 'absolute',\n      top: 8,\n      right: 8\n    },\n    closeIcon: {\n      fontSize: '2rem'\n    }\n  };\n});\nfunction TemplateDialog(props) {\n  var classes = useStyles();\n\n  var _React$useState = react__WEBPACK_IMPORTED_MODULE_2___default.a.useState(getModalStyle),\n      _React$useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_React$useState, 1),\n      modalStyle = _React$useState2[0];\n\n  var open = props.open,\n      handleClose = props.handleClose;\n  var container = react__WEBPACK_IMPORTED_MODULE_2___default.a.useRef(null);\n  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(\"div\", null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core_Portal__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n    container: container.current\n  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core_Modal__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n    open: open,\n    onClose: handleClose\n  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(\"div\", {\n    style: modalStyle,\n    className: classes.paper\n  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n    className: classes.close,\n    onClick: handleClose\n  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_10___default.a, {\n    classes: {\n      root: classes.closeIcon\n    }\n  })), props.children))), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(\"div\", {\n    ref: container\n  }));\n}\n\n//# sourceURL=webpack:///./src/components/Dashboard/TemplateDialog.js?");

/***/ })

}]);