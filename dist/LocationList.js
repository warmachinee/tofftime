(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["LocationList"],{

/***/ "./node_modules/@material-ui/icons/Delete.js":
/*!***************************************************!*\
  !*** ./node_modules/@material-ui/icons/Delete.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _react = _interopRequireDefault(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\n\nvar _createSvgIcon = _interopRequireDefault(__webpack_require__(/*! ./utils/createSvgIcon */ \"./node_modules/@material-ui/icons/utils/createSvgIcon.js\"));\n\nvar _default = (0, _createSvgIcon.default)(_react.default.createElement(_react.default.Fragment, null, _react.default.createElement(\"path\", {\n  d: \"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z\"\n}), _react.default.createElement(\"path\", {\n  fill: \"none\",\n  d: \"M0 0h24v24H0z\"\n})), 'Delete');\n\nexports.default = _default;\n\n//# sourceURL=webpack:///./node_modules/@material-ui/icons/Delete.js?");

/***/ }),

/***/ "./src/components/Dashboard/Match/LocationList.js":
/*!********************************************************!*\
  !*** ./src/components/Dashboard/Match/LocationList.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return LocationList; });\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ \"./node_modules/@babel/runtime/regenerator/index.js\");\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/asyncToGenerator.js\");\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ \"./node_modules/@babel/runtime/helpers/slicedToArray.js\");\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react_loadable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-loadable */ \"./node_modules/react-loadable/lib/index.js\");\n/* harmony import */ var react_loadable__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_loadable__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/styles */ \"./node_modules/@material-ui/core/esm/styles/index.js\");\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../api */ \"./src/api/index.js\");\n/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/Button */ \"./node_modules/@material-ui/core/esm/Button/index.js\");\n/* harmony import */ var _material_ui_core_List__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/List */ \"./node_modules/@material-ui/core/esm/List/index.js\");\n/* harmony import */ var _material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/ListItem */ \"./node_modules/@material-ui/core/esm/ListItem/index.js\");\n/* harmony import */ var _material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/core/ListItemText */ \"./node_modules/@material-ui/core/esm/ListItemText/index.js\");\n/* harmony import */ var _material_ui_core_ListItemSecondaryAction__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/core/ListItemSecondaryAction */ \"./node_modules/@material-ui/core/esm/ListItemSecondaryAction/index.js\");\n/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @material-ui/core/IconButton */ \"./node_modules/@material-ui/core/esm/IconButton/index.js\");\n/* harmony import */ var _material_ui_icons_Delete__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @material-ui/icons/Delete */ \"./node_modules/@material-ui/icons/Delete.js\");\n/* harmony import */ var _material_ui_icons_Delete__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Delete__WEBPACK_IMPORTED_MODULE_13__);\n/* harmony import */ var _loading_LDCircular__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../loading/LDCircular */ \"./src/components/loading/LDCircular.js\");\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nvar TemplateDialog = react_loadable__WEBPACK_IMPORTED_MODULE_4___default()({\n  loader: function loader() {\n    return Promise.all(/*! import() | TemplateDialog */[__webpack_require__.e(\"vendors~CreateMatch~Dialog~Header~MBOverview~MBPlayerBody~MBRewardBody~MBScoreEditorBody~TemplateDia~37acbcba\"), __webpack_require__.e(\"TemplateDialog\")]).then(__webpack_require__.bind(null, /*! ../TemplateDialog */ \"./src/components/Dashboard/TemplateDialog.js\"));\n  },\n  loading: function loading() {\n    return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_loading_LDCircular__WEBPACK_IMPORTED_MODULE_14__[\"LDCircular\"], null);\n  }\n});\nvar useStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__[\"makeStyles\"])(function (theme) {\n  return {\n    root: {\n      marginTop: 48,\n      maxHeight: window.innerHeight * .8\n    }\n  };\n});\nfunction LocationList(props) {\n  var classes = useStyles();\n  var token = props.token,\n      setCSRFToken = props.setCSRFToken,\n      setSelectedField = props.setSelectedField,\n      handleSnackBar = props.handleSnackBar;\n\n  var _React$useState = react__WEBPACK_IMPORTED_MODULE_3___default.a.useState(null),\n      _React$useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default()(_React$useState, 2),\n      data = _React$useState2[0],\n      setData = _React$useState2[1];\n\n  var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_3___default.a.useState(false),\n      _React$useState4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default()(_React$useState3, 2),\n      open = _React$useState4[0],\n      setOpen = _React$useState4[1];\n\n  var _React$useState5 = react__WEBPACK_IMPORTED_MODULE_3___default.a.useState(false),\n      _React$useState6 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default()(_React$useState5, 2),\n      editting = _React$useState6[0],\n      setEditting = _React$useState6[1];\n\n  var _React$useState7 = react__WEBPACK_IMPORTED_MODULE_3___default.a.useState(''),\n      _React$useState8 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default()(_React$useState7, 2),\n      selected = _React$useState8[0],\n      setSelected = _React$useState8[1];\n\n  function handleDelete() {\n    handleDeleteField();\n  }\n\n  function handleOpen(d) {\n    setOpen(true);\n    setSelected(d);\n  }\n\n  function handleClose() {\n    setOpen(false);\n  }\n\n  function handleLoadField(_x) {\n    return _handleLoadField.apply(this, arguments);\n  }\n\n  function _handleLoadField() {\n    _handleLoadField = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(\n    /*#__PURE__*/\n    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(d) {\n      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {\n        while (1) {\n          switch (_context.prev = _context.next) {\n            case 0:\n              _context.next = 2;\n              return _api__WEBPACK_IMPORTED_MODULE_6__[\"xhrPost\"](props.token, 'loadfield', {\n                action: 'list'\n              }, function (csrf, d) {\n                setCSRFToken(csrf);\n                setData(d);\n              });\n\n            case 2:\n            case \"end\":\n              return _context.stop();\n          }\n        }\n      }, _callee);\n    }));\n    return _handleLoadField.apply(this, arguments);\n  }\n\n  function handleDeleteField() {\n    return _handleDeleteField.apply(this, arguments);\n  }\n\n  function _handleDeleteField() {\n    _handleDeleteField = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(\n    /*#__PURE__*/\n    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {\n      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {\n        while (1) {\n          switch (_context2.prev = _context2.next) {\n            case 0:\n              _context2.next = 2;\n              return _api__WEBPACK_IMPORTED_MODULE_6__[\"xhrPost\"](props.token, 'fieldsystem', {\n                action: 'delete'\n              }, function (csrf, d) {\n                setCSRFToken(csrf);\n                handleSnackBar({\n                  state: true,\n                  message: d.status,\n                  variant: d.status === 'success' ? d.status : 'error',\n                  autoHideDuration: d.status === 'success' ? 2000 : 5000\n                });\n              });\n\n            case 2:\n            case \"end\":\n              return _context2.stop();\n          }\n        }\n      }, _callee2);\n    }));\n    return _handleDeleteField.apply(this, arguments);\n  }\n\n  react__WEBPACK_IMPORTED_MODULE_3___default.a.useEffect(function () {\n    handleLoadField();\n  }, []);\n  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"div\", null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"div\", {\n    style: {\n      display: 'flex'\n    }\n  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"div\", {\n    style: {\n      flex: 1\n    }\n  }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n    onClick: function onClick() {\n      return setEditting(!editting);\n    }\n  }, \"Edit\")), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_material_ui_core_List__WEBPACK_IMPORTED_MODULE_8__[\"default\"], null, data && data.map(function (d) {\n    return d && react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n      key: d.fieldid,\n      button: true,\n      onClick: function onClick() {\n        return setSelectedField(d);\n      }\n    }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_10__[\"default\"], {\n      primary: d.fieldname\n    }), editting && react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_material_ui_core_ListItemSecondaryAction__WEBPACK_IMPORTED_MODULE_11__[\"default\"], null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_12__[\"default\"], {\n      onClick: function onClick() {\n        return handleOpen(d);\n      }\n    }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_material_ui_icons_Delete__WEBPACK_IMPORTED_MODULE_13___default.a, null))));\n  })), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(TemplateDialog, {\n    open: open,\n    handleClose: handleClose\n  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"div\", null, \"Are you sure you want to delete \", selected && selected.fieldname, \"?\"), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"div\", {\n    style: {\n      display: 'flex',\n      marginTop: 48,\n      marginBottom: 16\n    }\n  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n    fullWidth: true,\n    onClick: handleClose\n  }, \"Cancel\"), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n    fullWidth: true,\n    variant: \"contained\",\n    color: \"secondary\",\n    onClick: handleDelete\n  }, \"Delete\"))));\n}\n\n//# sourceURL=webpack:///./src/components/Dashboard/Match/LocationList.js?");

/***/ })

}]);