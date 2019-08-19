(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["AddPlayerModal"],{

/***/ "./src/components/Dashboard/Match/AddPlayerModal.js":
/*!**********************************************************!*\
  !*** ./src/components/Dashboard/Match/AddPlayerModal.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return AddPlayerModal; });\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ \"./node_modules/@babel/runtime/regenerator/index.js\");\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/asyncToGenerator.js\");\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ \"./node_modules/@babel/runtime/helpers/slicedToArray.js\");\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"./node_modules/@babel/runtime/helpers/defineProperty.js\");\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var fuse_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! fuse.js */ \"./node_modules/fuse.js/dist/fuse.js\");\n/* harmony import */ var fuse_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(fuse_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! socket.io-client */ \"./node_modules/socket.io-client/lib/index.js\");\n/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(socket_io_client__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/styles */ \"./node_modules/@material-ui/core/esm/styles/index.js\");\n/* harmony import */ var _material_ui_styles__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/styles */ \"./node_modules/@material-ui/styles/esm/index.js\");\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./../../../api */ \"./src/api/index.js\");\n/* harmony import */ var _api_palette__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./../../../api/palette */ \"./src/api/palette.js\");\n/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/core/IconButton */ \"./node_modules/@material-ui/core/esm/IconButton/index.js\");\n/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @material-ui/core/Button */ \"./node_modules/@material-ui/core/esm/Button/index.js\");\n/* harmony import */ var _material_ui_core_List__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @material-ui/core/List */ \"./node_modules/@material-ui/core/esm/List/index.js\");\n/* harmony import */ var _material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @material-ui/core/ListItem */ \"./node_modules/@material-ui/core/esm/ListItem/index.js\");\n/* harmony import */ var _material_ui_core_ListItemIcon__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @material-ui/core/ListItemIcon */ \"./node_modules/@material-ui/core/esm/ListItemIcon/index.js\");\n/* harmony import */ var _material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @material-ui/core/ListItemText */ \"./node_modules/@material-ui/core/esm/ListItemText/index.js\");\n/* harmony import */ var _material_ui_core_InputAdornment__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @material-ui/core/InputAdornment */ \"./node_modules/@material-ui/core/esm/InputAdornment/index.js\");\n/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @material-ui/core/TextField */ \"./node_modules/@material-ui/core/esm/TextField/index.js\");\n/* harmony import */ var _material_ui_core_Collapse__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @material-ui/core/Collapse */ \"./node_modules/@material-ui/core/esm/Collapse/index.js\");\n/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @material-ui/core/Typography */ \"./node_modules/@material-ui/core/esm/Typography/index.js\");\n/* harmony import */ var _material_ui_core_Box__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @material-ui/core/Box */ \"./node_modules/@material-ui/core/esm/Box/index.js\");\n/* harmony import */ var _material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @material-ui/core/Divider */ \"./node_modules/@material-ui/core/esm/Divider/index.js\");\n/* harmony import */ var _material_ui_icons_AddCircle__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @material-ui/icons/AddCircle */ \"./node_modules/@material-ui/icons/AddCircle.js\");\n/* harmony import */ var _material_ui_icons_AddCircle__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_AddCircle__WEBPACK_IMPORTED_MODULE_23__);\n/* harmony import */ var _material_ui_icons_Search__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @material-ui/icons/Search */ \"./node_modules/@material-ui/icons/Search.js\");\n/* harmony import */ var _material_ui_icons_Search__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Search__WEBPACK_IMPORTED_MODULE_24__);\n/* harmony import */ var _material_ui_icons_Clear__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @material-ui/icons/Clear */ \"./node_modules/@material-ui/icons/Clear.js\");\n/* harmony import */ var _material_ui_icons_Clear__WEBPACK_IMPORTED_MODULE_25___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Clear__WEBPACK_IMPORTED_MODULE_25__);\n/* harmony import */ var _material_ui_icons_ExpandMore__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @material-ui/icons/ExpandMore */ \"./node_modules/@material-ui/icons/ExpandMore.js\");\n/* harmony import */ var _material_ui_icons_ExpandMore__WEBPACK_IMPORTED_MODULE_26___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_ExpandMore__WEBPACK_IMPORTED_MODULE_26__);\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nvar useStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_7__[\"makeStyles\"])(function (theme) {\n  return {\n    root: {\n      position: 'relative',\n      width: '100%',\n      backgroundColor: _api_palette__WEBPACK_IMPORTED_MODULE_10__[\"grey\"][50],\n      cursor: 'pointer',\n      marginTop: 36,\n      maxHeight: '100%'\n    },\n    margin: {\n      margin: theme.spacing(1),\n      width: '100%'\n    },\n    listText: {\n      width: '100%',\n      textAlign: 'left'\n    },\n    createGrid: {\n      display: 'flex',\n      flexDirection: 'flex-end',\n      marginBottom: 24\n    },\n    createButton: _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()({\n      marginTop: 'auto',\n      padding: '8px 16px 8px 0',\n      width: '100%'\n    }, theme.breakpoints.up(500), {\n      width: 'auto'\n    }),\n    expandIcon: {\n      marginRight: 8,\n      marginLeft: 12\n    },\n    textFieldGrid: {\n      padding: 16,\n      marginBottom: 24,\n      borderRadius: 4,\n      border: \"1.5px solid \".concat(_api_palette__WEBPACK_IMPORTED_MODULE_10__[\"primary\"][600])\n    },\n    buttonGrid: {\n      display: 'flex'\n    },\n    confirmButton: _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()({\n      width: '100%',\n      marginTop: 16,\n      padding: theme.spacing(1, 3)\n    }, theme.breakpoints.up(500), {\n      width: 'auto'\n    }),\n    textField: {\n      width: '100%',\n      margin: theme.spacing(1, 0)\n    },\n    searchBox: _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()({\n      width: '100%'\n    }, theme.breakpoints.up(500), {\n      width: 'auto'\n    }),\n    notice: {\n      fontFamily: 'monospace',\n      color: _api_palette__WEBPACK_IMPORTED_MODULE_10__[\"grey\"][600],\n      fontWeight: 600\n    },\n    listItemIcon: {\n      margin: theme.spacing(2, 0)\n    },\n    addCircleIcon: {\n      color: _api_palette__WEBPACK_IMPORTED_MODULE_10__[\"primary\"][600]\n    }\n  };\n});\nvar GreenButton = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_7__[\"withStyles\"])(function (theme) {\n  return {\n    root: {\n      color: theme.palette.getContrastText(_api_palette__WEBPACK_IMPORTED_MODULE_10__[\"primary\"][500]),\n      backgroundColor: _api_palette__WEBPACK_IMPORTED_MODULE_10__[\"primary\"][500],\n      '&:hover': {\n        backgroundColor: _api_palette__WEBPACK_IMPORTED_MODULE_10__[\"primary\"][700]\n      }\n    }\n  };\n})(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_12__[\"default\"]);\nvar GreenTextButton = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_7__[\"withStyles\"])(function (theme) {\n  return {\n    root: {\n      color: _api_palette__WEBPACK_IMPORTED_MODULE_10__[\"primary\"][600],\n      '&:hover': {\n        backgroundColor: _api_palette__WEBPACK_IMPORTED_MODULE_10__[\"primary\"][100]\n      }\n    }\n  };\n})(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_12__[\"default\"]);\nvar theme = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_7__[\"createMuiTheme\"])({\n  palette: {\n    primary: _api_palette__WEBPACK_IMPORTED_MODULE_10__[\"primary\"]\n  }\n});\nfunction AddPlayerModal(props) {\n  var classes = useStyles();\n  var playerAction = props.playerAction,\n      sess = props.sess,\n      token = props.token,\n      setCSRFToken = props.setCSRFToken,\n      matchid = props.matchid,\n      handleSnackBar = props.handleSnackBar;\n\n  var _React$useState = react__WEBPACK_IMPORTED_MODULE_4___default.a.useState(null),\n      _React$useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default()(_React$useState, 2),\n      data = _React$useState2[0],\n      setData = _React$useState2[1];\n\n  var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_4___default.a.useState(false),\n      _React$useState4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default()(_React$useState3, 2),\n      createState = _React$useState4[0],\n      setCreateState = _React$useState4[1];\n\n  var _React$useState5 = react__WEBPACK_IMPORTED_MODULE_4___default.a.useState(''),\n      _React$useState6 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default()(_React$useState5, 2),\n      searchUser = _React$useState6[0],\n      setSearchUser = _React$useState6[1];\n\n  var _React$useState7 = react__WEBPACK_IMPORTED_MODULE_4___default.a.useState(''),\n      _React$useState8 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default()(_React$useState7, 2),\n      fullname = _React$useState8[0],\n      setFullname = _React$useState8[1];\n\n  var _React$useState9 = react__WEBPACK_IMPORTED_MODULE_4___default.a.useState(''),\n      _React$useState10 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default()(_React$useState9, 2),\n      lastname = _React$useState10[0],\n      setLastname = _React$useState10[1];\n\n  function handleSearch() {\n    if (data) {\n      var options = {\n        shouldSort: true,\n        caseSensitive: true,\n        minMatchCharLength: 2,\n        keys: [\"fullname\", \"lastname\"]\n      };\n      var fuse = new fuse_js__WEBPACK_IMPORTED_MODULE_5___default.a(data, options);\n      var result = fuse.search(searchUser);\n      return result;\n    }\n  }\n\n  function handleInviteUser(d) {\n    var hd = /www/.test(window.location.href) ? 'https://www.' : 'https://';\n    var socket = socket_io_client__WEBPACK_IMPORTED_MODULE_6___default()(hd + _api__WEBPACK_IMPORTED_MODULE_9__[\"webURL\"]()); //[0] : hostid , [1] : targetuserid\n\n    socket.emit('match-request-client-message', {\n      action: \"invite\",\n      matchid: matchid,\n      userid: [sess.userid, d.userid]\n    });\n  }\n\n  function handleCreatePlayer() {\n    return _handleCreatePlayer.apply(this, arguments);\n  }\n\n  function _handleCreatePlayer() {\n    _handleCreatePlayer = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(\n    /*#__PURE__*/\n    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {\n      var resToken;\n      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {\n        while (1) {\n          switch (_context.prev = _context.next) {\n            case 0:\n              if (!token) {\n                _context.next = 4;\n                break;\n              }\n\n              _context.t0 = token;\n              _context.next = 7;\n              break;\n\n            case 4:\n              _context.next = 6;\n              return _api__WEBPACK_IMPORTED_MODULE_9__[\"xhrGet\"]('getcsrf');\n\n            case 6:\n              _context.t0 = _context.sent;\n\n            case 7:\n              resToken = _context.t0;\n              _context.next = 10;\n              return _api__WEBPACK_IMPORTED_MODULE_9__[\"xhrPost\"](token ? token : resToken.token, 'usersystem', {\n                action: 'create',\n                fullname: fullname,\n                lastname: lastname\n              }, function (csrf, d) {\n                setCSRFToken(csrf);\n                handleSnackBar({\n                  state: true,\n                  message: d.status,\n                  variant: d.status === 'success' ? 'success' : 'error',\n                  autoHideDuration: d.status === 'success' ? 2000 : 5000\n                });\n              });\n\n            case 10:\n            case \"end\":\n              return _context.stop();\n          }\n        }\n      }, _callee);\n    }));\n    return _handleCreatePlayer.apply(this, arguments);\n  }\n\n  function handleLoadUser() {\n    return _handleLoadUser.apply(this, arguments);\n  }\n\n  function _handleLoadUser() {\n    _handleLoadUser = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(\n    /*#__PURE__*/\n    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {\n      var resToken;\n      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {\n        while (1) {\n          switch (_context2.prev = _context2.next) {\n            case 0:\n              if (!token) {\n                _context2.next = 4;\n                break;\n              }\n\n              _context2.t0 = token;\n              _context2.next = 7;\n              break;\n\n            case 4:\n              _context2.next = 6;\n              return _api__WEBPACK_IMPORTED_MODULE_9__[\"xhrGet\"]('getcsrf');\n\n            case 6:\n              _context2.t0 = _context2.sent;\n\n            case 7:\n              resToken = _context2.t0;\n              _context2.next = 10;\n              return _api__WEBPACK_IMPORTED_MODULE_9__[\"xhrPost\"](token ? token : resToken.token, sess.typeid === 'admin' ? 'loaduser' : 'mloaduser', {\n                action: 'userlist'\n              }, function (csrf, d) {\n                setCSRFToken(csrf);\n                setData(d);\n              });\n\n            case 10:\n            case \"end\":\n              return _context2.stop();\n          }\n        }\n      }, _callee2);\n    }));\n    return _handleLoadUser.apply(this, arguments);\n  }\n\n  function handleAddUser(_x) {\n    return _handleAddUser.apply(this, arguments);\n  }\n\n  function _handleAddUser() {\n    _handleAddUser = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(\n    /*#__PURE__*/\n    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(d) {\n      var resToken;\n      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {\n        while (1) {\n          switch (_context3.prev = _context3.next) {\n            case 0:\n              if (!token) {\n                _context3.next = 4;\n                break;\n              }\n\n              _context3.t0 = token;\n              _context3.next = 7;\n              break;\n\n            case 4:\n              _context3.next = 6;\n              return _api__WEBPACK_IMPORTED_MODULE_9__[\"xhrGet\"]('getcsrf');\n\n            case 6:\n              _context3.t0 = _context3.sent;\n\n            case 7:\n              resToken = _context3.t0;\n              _context3.next = 10;\n              return _api__WEBPACK_IMPORTED_MODULE_9__[\"xhrPost\"](token ? token : resToken.token, sess.typeid === 'admin' ? 'matchmember' : 'mmatchmember', {\n                action: 'add',\n                matchid: matchid,\n                userid: d.userid\n              }, function (csrf, d) {\n                setCSRFToken(csrf);\n                handleSnackBar({\n                  state: true,\n                  message: d.status,\n                  variant: d.status === 'add member success' ? 'success' : 'error',\n                  autoHideDuration: d.status === 'success' ? 2000 : 5000\n                });\n              });\n\n            case 10:\n            case \"end\":\n              return _context3.stop();\n          }\n        }\n      }, _callee3);\n    }));\n    return _handleAddUser.apply(this, arguments);\n  }\n\n  function handleFetchMatchDetail() {\n    return _handleFetchMatchDetail.apply(this, arguments);\n  }\n\n  function _handleFetchMatchDetail() {\n    _handleFetchMatchDetail = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(\n    /*#__PURE__*/\n    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4() {\n      var resToken;\n      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {\n        while (1) {\n          switch (_context4.prev = _context4.next) {\n            case 0:\n              if (!matchid) {\n                _context4.next = 11;\n                break;\n              }\n\n              if (!token) {\n                _context4.next = 5;\n                break;\n              }\n\n              _context4.t0 = token;\n              _context4.next = 8;\n              break;\n\n            case 5:\n              _context4.next = 7;\n              return _api__WEBPACK_IMPORTED_MODULE_9__[\"xhrGet\"]('getcsrf');\n\n            case 7:\n              _context4.t0 = _context4.sent;\n\n            case 8:\n              resToken = _context4.t0;\n              _context4.next = 11;\n              return _api__WEBPACK_IMPORTED_MODULE_9__[\"xhrPost\"](token ? token : resToken.token, sess.typeid === 'admin' ? 'loadmatchsystem' : 'mloadmatch', {\n                action: 'detail',\n                matchid: matchid\n              }, function (csrf, d) {\n                setCSRFToken(csrf);\n\n                if (d.status !== 'class database error' || d.status !== 'wrong matchid' || d.status !== 'wrong action' || d.status !== 'wrong params') {\n                  setMBMatchDetail(d);\n                  handleLoadUser();\n                } else {\n                  handleSnackBar({\n                    state: true,\n                    message: d.status,\n                    variant: 'error',\n                    autoHideDuration: 5000\n                  });\n                }\n              });\n\n            case 11:\n            case \"end\":\n              return _context4.stop();\n          }\n        }\n      }, _callee4);\n    }));\n    return _handleFetchMatchDetail.apply(this, arguments);\n  }\n\n  react__WEBPACK_IMPORTED_MODULE_4___default.a.useEffect(function () {\n    handleLoadUser();\n  }, []);\n  return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(\"div\", {\n    className: classes.root\n  }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(\"div\", {\n    className: classes.createGrid\n  }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(GreenTextButton, {\n    variant: \"outlined\",\n    className: classes.createButton,\n    onClick: function onClick() {\n      return setCreateState(!createState);\n    }\n  }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_icons_ExpandMore__WEBPACK_IMPORTED_MODULE_26___default.a, {\n    className: classes.expandIcon,\n    style: {\n      transform: createState ? 'rotate(180deg)' : 'rotate(0deg)'\n    }\n  }), \"Create Player\")), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Collapse__WEBPACK_IMPORTED_MODULE_19__[\"default\"], {\n    in: createState,\n    timeout: \"auto\",\n    unmountOnExit: true\n  }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(\"div\", {\n    className: classes.textFieldGrid\n  }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_styles__WEBPACK_IMPORTED_MODULE_8__[\"ThemeProvider\"], {\n    theme: theme\n  }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_18__[\"default\"], {\n    className: classes.textField,\n    variant: \"outlined\",\n    label: \"Full name\",\n    value: fullname,\n    onChange: function onChange(e) {\n      return setFullname(e.target.value);\n    }\n  }), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_18__[\"default\"], {\n    className: classes.textField,\n    variant: \"outlined\",\n    label: \"Last name\",\n    value: lastname,\n    onChange: function onChange(e) {\n      return setLastname(e.target.value);\n    }\n  })), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(\"div\", {\n    className: classes.buttonGrid\n  }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_20__[\"default\"], {\n    component: \"div\"\n  }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Box__WEBPACK_IMPORTED_MODULE_21__[\"default\"], {\n    className: classes.notice,\n    m: 1\n  }, \"Fill the form and click confirm \", react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(\"br\", null), \"to create a new player.\")), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(\"div\", {\n    style: {\n      flex: 1\n    }\n  }), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(GreenButton, {\n    className: classes.confirmButton,\n    onClick: handleCreatePlayer\n  }, \"Confirm\")))), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_styles__WEBPACK_IMPORTED_MODULE_8__[\"ThemeProvider\"], {\n    theme: theme\n  }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_18__[\"default\"], {\n    autoFocus: true,\n    disabled: data === null,\n    className: classes.searchBox,\n    variant: \"outlined\",\n    placeholder: !searchUser ? \"Search player\" : '',\n    value: searchUser,\n    onChange: function onChange(e) {\n      return setSearchUser(e.target.value);\n    },\n    InputProps: {\n      startAdornment: react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_InputAdornment__WEBPACK_IMPORTED_MODULE_17__[\"default\"], {\n        position: \"start\"\n      }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_icons_Search__WEBPACK_IMPORTED_MODULE_24___default.a, {\n        color: \"primary\"\n      })),\n      endAdornment: react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_InputAdornment__WEBPACK_IMPORTED_MODULE_17__[\"default\"], {\n        position: \"end\"\n      }, searchUser ? react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_11__[\"default\"], {\n        onClick: function onClick() {\n          return setSearchUser('');\n        }\n      }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_icons_Clear__WEBPACK_IMPORTED_MODULE_25___default.a, {\n        color: \"inherit\",\n        fontSize: \"small\"\n      })) : react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(\"div\", {\n        style: {\n          width: 44\n        }\n      }))\n    }\n  })), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_List__WEBPACK_IMPORTED_MODULE_13__[\"default\"], {\n    className: classes.root\n  }, data && !data.status && handleSearch().map(function (value) {\n    return value && react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_4___default.a.Fragment, {\n      key: value.firstname + \"(\".concat(value.userid, \")\")\n    }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_14__[\"default\"], {\n      role: undefined,\n      dense: true,\n      button: true,\n      onClick: function onClick() {\n        return playerAction === 'add' ? handleAddUser(value) : handleInviteUser(value);\n      }\n    }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_ListItemIcon__WEBPACK_IMPORTED_MODULE_15__[\"default\"], {\n      className: classes.listItemIcon\n    }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_icons_AddCircle__WEBPACK_IMPORTED_MODULE_23___default.a, {\n      classes: {\n        root: classes.addCircleIcon\n      }\n    })), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_16__[\"default\"], {\n      className: classes.listText,\n      primary: value.fullname\n    }), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_16__[\"default\"], {\n      className: classes.listText,\n      primary: value.lastname\n    })), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_22__[\"default\"], null));\n  }), searchUser && handleSearch().length === 0 && react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_14__[\"default\"], null, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_20__[\"default\"], {\n    component: \"div\",\n    style: {\n      width: '100%'\n    }\n  }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Box__WEBPACK_IMPORTED_MODULE_21__[\"default\"], {\n    style: {\n      textAlign: 'center',\n      color: _api_palette__WEBPACK_IMPORTED_MODULE_10__[\"primary\"][900]\n    },\n    fontWeight: 500,\n    fontSize: 24,\n    m: 1\n  }, \"No Reult\")))));\n}\n\n//# sourceURL=webpack:///./src/components/Dashboard/Match/AddPlayerModal.js?");

/***/ }),

/***/ 0:
/*!********************!*\
  !*** ws (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) */\n\n//# sourceURL=webpack:///ws_(ignored)?");

/***/ })

}]);