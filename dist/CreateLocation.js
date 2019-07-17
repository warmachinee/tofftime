(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["CreateLocation"],{

/***/ "./src/components/Dashboard/Match/CreateLocation.js":
/*!**********************************************************!*\
  !*** ./src/components/Dashboard/Match/CreateLocation.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return CreateLocation; });\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ \"./node_modules/@babel/runtime/regenerator/index.js\");\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/asyncToGenerator.js\");\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ \"./node_modules/@babel/runtime/helpers/toConsumableArray.js\");\n/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ \"./node_modules/@babel/runtime/helpers/slicedToArray.js\");\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/styles */ \"./node_modules/@material-ui/core/esm/styles/index.js\");\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../api */ \"./src/api/index.js\");\n/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/TextField */ \"./node_modules/@material-ui/core/esm/TextField/index.js\");\n/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/Button */ \"./node_modules/@material-ui/core/esm/Button/index.js\");\n\n\n\n\n\n\n\n\n\nvar useStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__[\"makeStyles\"])(function (theme) {\n  return {\n    root: {\n      marginTop: 36\n    },\n    button: {\n      padding: '12px 8px'\n    }\n  };\n});\nfunction CreateLocation(props) {\n  var classes = useStyles();\n  var token = props.token,\n      setCSRFToken = props.setCSRFToken,\n      handleSnackBar = props.handleSnackBar,\n      setPageState = props.setPageState;\n  var tempArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];\n\n  var _React$useState = react__WEBPACK_IMPORTED_MODULE_4___default.a.useState(''),\n      _React$useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3___default()(_React$useState, 2),\n      location = _React$useState2[0],\n      setLocation = _React$useState2[1];\n\n  var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_4___default.a.useState([]),\n      _React$useState4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3___default()(_React$useState3, 2),\n      holeScore = _React$useState4[0],\n      setHoleScore = _React$useState4[1];\n\n  var _React$useState5 = react__WEBPACK_IMPORTED_MODULE_4___default.a.useState([]),\n      _React$useState6 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3___default()(_React$useState5, 2),\n      hcpScore = _React$useState6[0],\n      setHCPScore = _React$useState6[1];\n\n  function handleHole(value, index) {\n    var newArr = _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2___default()(holeScore);\n\n    newArr[index] = parseInt(value);\n    setHoleScore(newArr);\n  }\n\n  function handleHCP(value, index) {\n    var newArr = _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2___default()(holeScore);\n\n    newArr[index] = parseInt(value);\n    setHCPScore(newArr);\n  }\n\n  function handleCreate() {\n    return _handleCreate.apply(this, arguments);\n  }\n\n  function _handleCreate() {\n    _handleCreate = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(\n    /*#__PURE__*/\n    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {\n      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {\n        while (1) {\n          switch (_context.prev = _context.next) {\n            case 0:\n              _context.next = 2;\n              return _api__WEBPACK_IMPORTED_MODULE_6__[\"xhrPost\"](props.token, 'fieldsystem', {\n                action: 'createcustom',\n                fieldname: location,\n                fieldscore: holeScore,\n                hcfieldscore: hcpScore\n              }, function (csrf, d) {\n                setCSRFToken(csrf);\n                handleSnackBar({\n                  state: true,\n                  message: d.status,\n                  variant: d.status === 'success' ? d.status : 'error',\n                  autoHideDuration: d.status === 'success' ? 2000 : 5000\n                });\n                setPageState('select');\n              });\n\n            case 2:\n            case \"end\":\n              return _context.stop();\n          }\n        }\n      }, _callee);\n    }));\n    return _handleCreate.apply(this, arguments);\n  }\n\n  return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(\"div\", {\n    className: classes.root\n  }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(\"div\", null, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n    fullWidth: true,\n    label: \"Location name\",\n    value: location || '',\n    onChange: function onChange(e) {\n      return setLocation(e.target.value);\n    },\n    variant: \"outlined\"\n  })), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(\"div\", {\n    style: {\n      marginTop: 16\n    }\n  }, \"Hole Score\"), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(\"div\", {\n    style: {\n      marginTop: 8,\n      display: 'flex'\n    }\n  }, tempArr.slice(0, 9).map(function (d) {\n    return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n      key: d,\n      label: d + 1,\n      variant: \"outlined\",\n      onChange: function onChange(e) {\n        return handleHole(e.target.value, d);\n      }\n    });\n  })), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(\"div\", {\n    style: {\n      display: 'flex'\n    }\n  }, tempArr.slice(9, 18).map(function (d) {\n    return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n      key: d,\n      label: d + 1,\n      variant: \"outlined\",\n      onChange: function onChange(e) {\n        return handleHole(e.target.value, d);\n      }\n    });\n  })), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(\"div\", {\n    style: {\n      marginTop: 16\n    }\n  }, \"HCP Score\"), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(\"div\", {\n    style: {\n      marginTop: 8,\n      display: 'flex'\n    }\n  }, tempArr.slice(0, 9).map(function (d) {\n    return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n      key: d,\n      label: d + 1,\n      variant: \"outlined\",\n      onChange: function onChange(e) {\n        return handleHCP(e.target.value, d);\n      }\n    });\n  })), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(\"div\", {\n    style: {\n      display: 'flex'\n    }\n  }, tempArr.slice(9, 18).map(function (d) {\n    return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n      key: d,\n      label: d + 1,\n      variant: \"outlined\",\n      onChange: function onChange(e) {\n        return handleHCP(e.target.value, d);\n      }\n    });\n  })), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(\"div\", {\n    style: {\n      display: 'flex',\n      marginTop: 24\n    }\n  }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(\"div\", {\n    style: {\n      flex: 2\n    }\n  }), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n    fullWidth: true,\n    className: classes.button\n  }, \"Cancel\"), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n    fullWidth: true,\n    variant: \"contained\",\n    color: \"primary\",\n    className: classes.button,\n    onClick: handleCreate\n  }, \"Create\")));\n}\n\n//# sourceURL=webpack:///./src/components/Dashboard/Match/CreateLocation.js?");

/***/ })

}]);