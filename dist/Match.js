(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["Match"],{

/***/ "./src/components/Dashboard/Match/Match.js":
/*!*************************************************!*\
  !*** ./src/components/Dashboard/Match/Match.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Match; });\n/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ \"./node_modules/@babel/runtime/helpers/extends.js\");\n/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_loadable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-loadable */ \"./node_modules/react-loadable/lib/index.js\");\n/* harmony import */ var react_loadable__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_loadable__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/esm/react-router-dom.js\");\n/* harmony import */ var _loading_LDCircular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../loading/LDCircular */ \"./src/components/loading/LDCircular.js\");\n\n\n\n\n\nvar RouteMatchBody = react_loadable__WEBPACK_IMPORTED_MODULE_2___default.a.Map({\n  loader: {\n    MatchBody: function MatchBody() {\n      return Promise.all(/*! import() | MatchBody */[__webpack_require__.e(\"vendors~Header~MBOverview~MBPlayerBody~MBPlayoffBody~MBRewardBody~MBScoreEditorBody~MatchBody~MatchD~6e074237\"), __webpack_require__.e(\"vendors~Dialog~GeneralDetail~Header~MatchBody~MatchDetailBody~MatchEditor~MatchList~Slider~SnackBarA~b0403196\"), __webpack_require__.e(\"vendors~GeneralDetail~MatchBody~MatchDetailBody~MatchEditor~MatchList~SignIn~SignUp\"), __webpack_require__.e(\"vendors~MBOverview~MBPlayerBody~MatchBody~SignUp\"), __webpack_require__.e(\"MatchBody\")]).then(__webpack_require__.bind(null, /*! ./MatchBody */ \"./src/components/Dashboard/Match/MatchBody.js\"));\n    }\n  },\n  render: function render(loaded, props) {\n    var Component = loaded.MatchBody.default;\n    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__[\"Route\"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, props, {\n      render: function render() {\n        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Component, props);\n      }\n    }));\n  },\n  loading: function loading() {\n    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_loading_LDCircular__WEBPACK_IMPORTED_MODULE_4__[\"LDCircular\"], null);\n  }\n});\nvar RouteMatchEditor = react_loadable__WEBPACK_IMPORTED_MODULE_2___default.a.Map({\n  loader: {\n    MatchEditor: function MatchEditor() {\n      return Promise.all(/*! import() | MatchEditor */[__webpack_require__.e(\"vendors~Dialog~GeneralDetail~Header~MatchBody~MatchDetailBody~MatchEditor~MatchList~Slider~SnackBarA~b0403196\"), __webpack_require__.e(\"vendors~GeneralDetail~MatchBody~MatchDetailBody~MatchEditor~MatchList~SignIn~SignUp\"), __webpack_require__.e(\"MatchEditor\")]).then(__webpack_require__.bind(null, /*! ./MatchEditor */ \"./src/components/Dashboard/Match/MatchEditor.js\"));\n    }\n  },\n  render: function render(loaded, props) {\n    var Component = loaded.MatchEditor.default;\n    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__[\"Route\"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, props, {\n      render: function render() {\n        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Component, props);\n      }\n    }));\n  },\n  loading: function loading() {\n    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_loading_LDCircular__WEBPACK_IMPORTED_MODULE_4__[\"LDCircular\"], null);\n  }\n});\nfunction Match(props) {\n  var token = props.token,\n      setCSRFToken = props.setCSRFToken,\n      handleSnackBar = props.handleSnackBar;\n  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__[\"Switch\"], null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(RouteMatchBody, {\n    exact: true,\n    path: \"/user/match\",\n    token: token,\n    setCSRFToken: setCSRFToken,\n    handleSnackBar: handleSnackBar\n  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(RouteMatchEditor, {\n    path: \"/user/match/:matchparam\",\n    token: token,\n    setCSRFToken: setCSRFToken,\n    handleSnackBar: handleSnackBar\n  }));\n}\n\n//# sourceURL=webpack:///./src/components/Dashboard/Match/Match.js?");

/***/ })

}]);