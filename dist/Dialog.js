(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["Dialog"],{

/***/ "./node_modules/@material-ui/icons/ArrowBack.js":
/*!******************************************************!*\
  !*** ./node_modules/@material-ui/icons/ArrowBack.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _react = _interopRequireDefault(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\n\nvar _createSvgIcon = _interopRequireDefault(__webpack_require__(/*! ./utils/createSvgIcon */ \"./node_modules/@material-ui/icons/utils/createSvgIcon.js\"));\n\nvar _default = (0, _createSvgIcon.default)(_react.default.createElement(\"path\", {\n  d: \"M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z\"\n}), 'ArrowBack');\n\nexports.default = _default;\n\n//# sourceURL=webpack:///./node_modules/@material-ui/icons/ArrowBack.js?");

/***/ }),

/***/ "./node_modules/@material-ui/icons/Close.js":
/*!**************************************************!*\
  !*** ./node_modules/@material-ui/icons/Close.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _react = _interopRequireDefault(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\n\nvar _createSvgIcon = _interopRequireDefault(__webpack_require__(/*! ./utils/createSvgIcon */ \"./node_modules/@material-ui/icons/utils/createSvgIcon.js\"));\n\nvar _default = (0, _createSvgIcon.default)(_react.default.createElement(\"path\", {\n  d: \"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\"\n}), 'Close');\n\nexports.default = _default;\n\n//# sourceURL=webpack:///./node_modules/@material-ui/icons/Close.js?");

/***/ }),

/***/ "./src/components/Account/Dialog.js":
/*!******************************************!*\
  !*** ./src/components/Account/Dialog.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Dialog; });\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ \"./node_modules/@babel/runtime/regenerator/index.js\");\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/asyncToGenerator.js\");\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ \"./node_modules/@babel/runtime/helpers/slicedToArray.js\");\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"./node_modules/@babel/runtime/helpers/defineProperty.js\");\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var react_loadable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-loadable */ \"./node_modules/react-loadable/lib/index.js\");\n/* harmony import */ var react_loadable__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_loadable__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/styles */ \"./node_modules/@material-ui/core/esm/styles/index.js\");\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./../../api */ \"./src/api/index.js\");\n/* harmony import */ var _material_ui_core_Modal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/Modal */ \"./node_modules/@material-ui/core/esm/Modal/index.js\");\n/* harmony import */ var _material_ui_core_Portal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/Portal */ \"./node_modules/@material-ui/core/esm/Portal/index.js\");\n/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/core/IconButton */ \"./node_modules/@material-ui/core/esm/IconButton/index.js\");\n/* harmony import */ var _material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/icons/Close */ \"./node_modules/@material-ui/icons/Close.js\");\n/* harmony import */ var _material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_11__);\n/* harmony import */ var _material_ui_icons_ArrowBack__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @material-ui/icons/ArrowBack */ \"./node_modules/@material-ui/icons/ArrowBack.js\");\n/* harmony import */ var _material_ui_icons_ArrowBack__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_ArrowBack__WEBPACK_IMPORTED_MODULE_12__);\n/* harmony import */ var _loading_LDCircular__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./../loading/LDCircular */ \"./src/components/loading/LDCircular.js\");\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nvar SignInComponent = react_loadable__WEBPACK_IMPORTED_MODULE_5___default()({\n  loader: function loader() {\n    return __webpack_require__.e(/*! import() | SignIn */ \"SignIn\").then(__webpack_require__.bind(null, /*! ./SignInComponent */ \"./src/components/Account/SignInComponent.js\"));\n  },\n  loading: function loading() {\n    return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_loading_LDCircular__WEBPACK_IMPORTED_MODULE_13__[\"LDCircular\"], null);\n  }\n});\nvar SignUpComponent = react_loadable__WEBPACK_IMPORTED_MODULE_5___default()({\n  loader: function loader() {\n    return Promise.all(/*! import() | SignUp */[__webpack_require__.e(\"vendors~CreateMatch~MBOverview~MBPlayoffBody~MBRewardBody~MBScoreEditorBody~MatchDetailBody~SignUp~l~ae862dd7\"), __webpack_require__.e(\"vendors~CreateMatch~History~MBOverview~MatchList~SignUp~UpcomingModal~listReadNoti~listUnreadNoti\"), __webpack_require__.e(\"vendors~CreateMatch~MBOverview~SignUp~SnackBarAlert~SnackBarLong~listReadNoti~listUnreadNoti\"), __webpack_require__.e(\"vendors~MBOverview~MBPlayerBody~MBScheduleBody~MatchBody~SignUp~listReadNoti~listUnreadNoti\"), __webpack_require__.e(\"vendors~CreateMatch~MBOverview~MatchDetailBody~SignUp~listReadNoti~listUnreadNoti\"), __webpack_require__.e(\"vendors~CreateMatch~MBOverview~PagePostEditor~SignUp~listReadNoti~listUnreadNoti\"), __webpack_require__.e(\"vendors~CreateMatch~MBOverview~MatchCard~SignUp~listReadNoti~listUnreadNoti\"), __webpack_require__.e(\"vendors~CreateMatch~MBOverview~SignUp~listReadNoti~listUnreadNoti\"), __webpack_require__.e(\"vendors~CreateMatch~Header~MBOverview~SignUp\"), __webpack_require__.e(\"vendors~CreateMatch~MBOverview~SignUp\"), __webpack_require__.e(\"vendors~SignUp\"), __webpack_require__.e(\"SignUp\")]).then(__webpack_require__.bind(null, /*! ./SignUpComponent */ \"./src/components/Account/SignUpComponent.js\"));\n  },\n  loading: function loading() {\n    return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_loading_LDCircular__WEBPACK_IMPORTED_MODULE_13__[\"LDCircular\"], null);\n  }\n});\nvar ForgotPassword = react_loadable__WEBPACK_IMPORTED_MODULE_5___default()({\n  loader: function loader() {\n    return __webpack_require__.e(/*! import() | ForgotPassword */ \"ForgotPassword\").then(__webpack_require__.bind(null, /*! ./ForgotPassword */ \"./src/components/Account/ForgotPassword.js\"));\n  },\n  loading: function loading() {\n    return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_loading_LDCircular__WEBPACK_IMPORTED_MODULE_13__[\"LDCircular\"], null);\n  }\n});\nvar TemplateDialog = react_loadable__WEBPACK_IMPORTED_MODULE_5___default()({\n  loader: function loader() {\n    return __webpack_require__.e(/*! import() | TemplateDialog */ \"TemplateDialog\").then(__webpack_require__.bind(null, /*! ./../TemplateDialog */ \"./src/components/TemplateDialog.js\"));\n  },\n  loading: function loading() {\n    return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_loading_LDCircular__WEBPACK_IMPORTED_MODULE_13__[\"LDCircular\"], null);\n  }\n});\n\nfunction getModalStyle() {\n  var top = 50;\n  var left = 50;\n  return {\n    top: \"\".concat(top, \"%\"),\n    left: \"\".concat(left, \"%\"),\n    transform: \"translate(-\".concat(top, \"%, -\").concat(left, \"%)\")\n  };\n}\n\nvar useStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_6__[\"makeStyles\"])(function (theme) {\n  var _paper;\n\n  return {\n    paper: (_paper = {\n      position: 'absolute',\n      width: '100%',\n      maxWidth: '100%',\n      backgroundColor: theme.palette.background.paper,\n      boxShadow: theme.shadows[5],\n      padding: theme.spacing(4),\n      outline: 'none',\n      height: '100%',\n      overflow: 'auto',\n      overflowScrolling: 'touch',\n      WebkitOverflowScrolling: 'touch'\n    }, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(_paper, \"height\", 'auto'), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(_paper, \"maxHeight\", '100%'), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(_paper, theme.breakpoints.up(500), {\n      maxWidth: 450\n    }), _paper),\n    back: _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()({\n      position: 'absolute',\n      top: 8,\n      left: 8\n    }, theme.breakpoints.up(500), {\n      left: 16\n    }),\n    backIcon: _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()({\n      fontSize: '2rem'\n    }, theme.breakpoints.up(500), {\n      fontSize: '2.5rem'\n    }),\n    close: {\n      position: 'absolute',\n      top: 8,\n      right: 8\n    },\n    closeIcon: {\n      fontSize: '2rem'\n    }\n  };\n});\nfunction Dialog(props) {\n  var classes = useStyles();\n  var open = props.open,\n      token = props.token,\n      handleClose = props.handleClose,\n      handleSess = props.handleSess,\n      setCSRFToken = props.setCSRFToken,\n      handleSnackBar = props.handleSnackBar;\n\n  var _React$useState = react__WEBPACK_IMPORTED_MODULE_4___default.a.useState(getModalStyle),\n      _React$useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default()(_React$useState, 1),\n      modalStyle = _React$useState2[0];\n\n  var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_4___default.a.useState('signin'),\n      _React$useState4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default()(_React$useState3, 2),\n      pageState = _React$useState4[0],\n      setPageState = _React$useState4[1];\n\n  var _React$useState5 = react__WEBPACK_IMPORTED_MODULE_4___default.a.useState(false),\n      _React$useState6 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default()(_React$useState5, 2),\n      forgotState = _React$useState6[0],\n      setForgotState = _React$useState6[1];\n\n  var _React$useState7 = react__WEBPACK_IMPORTED_MODULE_4___default.a.useState(''),\n      _React$useState8 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default()(_React$useState7, 2),\n      username = _React$useState8[0],\n      setUsername = _React$useState8[1];\n\n  var _React$useState9 = react__WEBPACK_IMPORTED_MODULE_4___default.a.useState(''),\n      _React$useState10 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default()(_React$useState9, 2),\n      password = _React$useState10[0],\n      setPassword = _React$useState10[1];\n\n  var _React$useState11 = react__WEBPACK_IMPORTED_MODULE_4___default.a.useState(null),\n      _React$useState12 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default()(_React$useState11, 2),\n      actionStatus = _React$useState12[0],\n      handleActionStatus = _React$useState12[1];\n\n  var container = react__WEBPACK_IMPORTED_MODULE_4___default.a.useRef(null);\n\n  function handleGetUserinfo() {\n    return _handleGetUserinfo.apply(this, arguments);\n  }\n\n  function _handleGetUserinfo() {\n    _handleGetUserinfo = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(\n    /*#__PURE__*/\n    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {\n      var resToken;\n      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {\n        while (1) {\n          switch (_context.prev = _context.next) {\n            case 0:\n              if (!token) {\n                _context.next = 4;\n                break;\n              }\n\n              _context.t0 = token;\n              _context.next = 7;\n              break;\n\n            case 4:\n              _context.next = 6;\n              return _api__WEBPACK_IMPORTED_MODULE_7__[\"xhrGet\"]('getcsrf');\n\n            case 6:\n              _context.t0 = _context.sent;\n\n            case 7:\n              resToken = _context.t0;\n              _context.next = 10;\n              return _api__WEBPACK_IMPORTED_MODULE_7__[\"xhrPost\"](token ? token : resToken.token, 'userinfo', {}, function (csrf, d) {\n                setCSRFToken(csrf);\n                handleSess(d);\n              });\n\n            case 10:\n            case \"end\":\n              return _context.stop();\n          }\n        }\n      }, _callee);\n    }));\n    return _handleGetUserinfo.apply(this, arguments);\n  }\n\n  function handleSignIn() {\n    return _handleSignIn.apply(this, arguments);\n  }\n\n  function _handleSignIn() {\n    _handleSignIn = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(\n    /*#__PURE__*/\n    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {\n      var resToken;\n      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {\n        while (1) {\n          switch (_context2.prev = _context2.next) {\n            case 0:\n              if (!token) {\n                _context2.next = 4;\n                break;\n              }\n\n              _context2.t0 = token;\n              _context2.next = 7;\n              break;\n\n            case 4:\n              _context2.next = 6;\n              return _api__WEBPACK_IMPORTED_MODULE_7__[\"xhrGet\"]('getcsrf');\n\n            case 6:\n              _context2.t0 = _context2.sent;\n\n            case 7:\n              resToken = _context2.t0;\n              _context2.next = 10;\n              return _api__WEBPACK_IMPORTED_MODULE_7__[\"xhrPost\"](token ? token : resToken.token, 'login', {\n                username: username,\n                password: password\n              }, function (csrf, d) {\n                setCSRFToken(csrf);\n                handleActionStatus(d.status);\n                handleSnackBar({\n                  state: true,\n                  message: d.status,\n                  variant: d.status === 'success' ? 'success' : 'error',\n                  autoHideDuration: d.status === 'success' ? 2000 : 5000\n                });\n\n                if (d.status === 'success') {\n                  try {\n                    handleGetUserinfo();\n                    handleClose();\n                    handleActionStatus(null);\n                  } catch (err) {\n                    console.log(err.message);\n                  }\n                }\n              });\n\n            case 10:\n            case \"end\":\n              return _context2.stop();\n          }\n        }\n      }, _callee2);\n    }));\n    return _handleSignIn.apply(this, arguments);\n  }\n\n  function handleSignInWith(_x) {\n    return _handleSignInWith.apply(this, arguments);\n  }\n\n  function _handleSignInWith() {\n    _handleSignInWith = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(\n    /*#__PURE__*/\n    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(action) {\n      var url, resToken, d;\n      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {\n        while (1) {\n          switch (_context3.prev = _context3.next) {\n            case 0:\n              url = '';\n\n              if (action === 'facebook') {\n                url = 'facebooklogin';\n              }\n\n              if (action === 'google') {\n                url = 'googlelogin';\n              }\n\n              if (!token) {\n                _context3.next = 7;\n                break;\n              }\n\n              _context3.t0 = token;\n              _context3.next = 10;\n              break;\n\n            case 7:\n              _context3.next = 9;\n              return _api__WEBPACK_IMPORTED_MODULE_7__[\"xhrGet\"]('getcsrf');\n\n            case 9:\n              _context3.t0 = _context3.sent;\n\n            case 10:\n              resToken = _context3.t0;\n              _context3.next = 13;\n              return _api__WEBPACK_IMPORTED_MODULE_7__[\"xhrGet\"](url, \"?_csrf=\".concat(token ? token : resToken.token));\n\n            case 13:\n              d = _context3.sent;\n              console.log(d);\n              setCSRFToken(d.token); //setData(d.response)\n\n            case 16:\n            case \"end\":\n              return _context3.stop();\n          }\n        }\n      }, _callee3);\n    }));\n    return _handleSignInWith.apply(this, arguments);\n  }\n\n  function handleSignUp(_x2) {\n    return _handleSignUp.apply(this, arguments);\n  }\n\n  function _handleSignUp() {\n    _handleSignUp = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(\n    /*#__PURE__*/\n    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4(d) {\n      var tempUsername, tempPassword, resToken;\n      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {\n        while (1) {\n          switch (_context4.prev = _context4.next) {\n            case 0:\n              tempUsername = d.username;\n              tempPassword = d.password;\n\n              if (!token) {\n                _context4.next = 6;\n                break;\n              }\n\n              _context4.t0 = token;\n              _context4.next = 9;\n              break;\n\n            case 6:\n              _context4.next = 8;\n              return _api__WEBPACK_IMPORTED_MODULE_7__[\"xhrGet\"]('getcsrf');\n\n            case 8:\n              _context4.t0 = _context4.sent;\n\n            case 9:\n              resToken = _context4.t0;\n              _context4.next = 12;\n              return _api__WEBPACK_IMPORTED_MODULE_7__[\"xhrPost\"](token ? token : resToken.token, 'register', {\n                username: d.username,\n                password: d.password,\n                tel: d.tel,\n                fullname: d.fullname,\n                lastname: d.lastname,\n                gender: d.gender,\n                birthdate: d.birthdate\n              }, function (csrf, d) {\n                setCSRFToken(csrf);\n                handleActionStatus(d.status);\n                handleSnackBar({\n                  state: true,\n                  message: d.log,\n                  variant: d.log === 'success' ? 'success' : 'error',\n                  autoHideDuration: d.status === 'success' ? 2000 : 5000\n                });\n\n                if (d.status === 'success') {\n                  try {\n                    setUsername(tempUsername);\n                    setPassword(tempPassword);\n                    handleActionStatus(null);\n                    setPageState('signin');\n                  } catch (err) {\n                    console.log(err.message);\n                  }\n                }\n              });\n\n            case 12:\n            case \"end\":\n              return _context4.stop();\n          }\n        }\n      }, _callee4);\n    }));\n    return _handleSignUp.apply(this, arguments);\n  }\n\n  return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(\"div\", null, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Portal__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n    container: container.current\n  }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Modal__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n    open: open,\n    onClose: handleClose\n  }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(\"div\", {\n    style: modalStyle,\n    className: classes.paper\n  }, pageState === 'signup' && react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_10__[\"default\"], {\n    className: classes.back,\n    onClick: function onClick() {\n      return setPageState('signin');\n    }\n  }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_icons_ArrowBack__WEBPACK_IMPORTED_MODULE_12___default.a, {\n    classes: {\n      root: classes.backIcon\n    }\n  })), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_10__[\"default\"], {\n    className: classes.close,\n    onClick: handleClose\n  }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_11___default.a, {\n    classes: {\n      root: classes.closeIcon\n    }\n  })), pageState === 'signin' && react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(SignInComponent, {\n    username: username,\n    password: password,\n    setUsername: setUsername,\n    setPassword: setPassword,\n    actionStatus: actionStatus,\n    handleSignIn: handleSignIn,\n    handleSignInWith: handleSignInWith,\n    setPageState: setPageState,\n    setForgotState: setForgotState\n  }), pageState === 'signup' && react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(SignUpComponent, {\n    actionStatus: actionStatus,\n    handleSignUp: handleSignUp\n  })))), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(\"div\", {\n    ref: container\n  }), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(TemplateDialog, {\n    open: forgotState,\n    maxWidth: 500,\n    handleClose: function handleClose() {\n      return setForgotState(!forgotState);\n    }\n  }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(ForgotPassword, {\n    token: token,\n    setCSRFToken: setCSRFToken,\n    handleSnackBar: handleSnackBar\n  })));\n}\n\n//# sourceURL=webpack:///./src/components/Account/Dialog.js?");

/***/ })

}]);