(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["SnackBarAlert"],{

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