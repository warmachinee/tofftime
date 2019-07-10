(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["Slider"],{

/***/ "./src/components/Announcement/Pagination.js":
/*!***************************************************!*\
  !*** ./src/components/Announcement/Pagination.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/@babel/runtime/helpers/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"./node_modules/@babel/runtime/helpers/createClass.js\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ \"./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js\");\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ \"./node_modules/@babel/runtime/helpers/getPrototypeOf.js\");\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ \"./node_modules/@babel/runtime/helpers/assertThisInitialized.js\");\n/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ \"./node_modules/@babel/runtime/helpers/inherits.js\");\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"./node_modules/@babel/runtime/helpers/defineProperty.js\");\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var _PaginationDot__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./PaginationDot */ \"./src/components/Announcement/PaginationDot.js\");\n\n\n\n\n\n\n\n\n\n\nvar styles = {\n  root: {\n    position: 'absolute',\n    bottom: 8,\n    right: 8,\n    display: 'flex',\n    flexDirection: 'row'\n  }\n};\n\nvar Pagination =\n/*#__PURE__*/\nfunction (_React$Component) {\n  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(Pagination, _React$Component);\n\n  function Pagination() {\n    var _getPrototypeOf2;\n\n    var _this;\n\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Pagination);\n\n    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {\n      args[_key] = arguments[_key];\n    }\n\n    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, (_getPrototypeOf2 = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Pagination)).call.apply(_getPrototypeOf2, [this].concat(args)));\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), \"handleClick\", function (event, index) {\n      _this.props.onChangeIndex(index);\n    });\n\n    return _this;\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Pagination, [{\n    key: \"render\",\n    value: function render() {\n      var _this$props = this.props,\n          index = _this$props.index,\n          dots = _this$props.dots;\n      var children = [];\n\n      for (var i = 0; i < dots; i += 1) {\n        children.push(react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_PaginationDot__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n          key: i,\n          index: i,\n          active: i === index,\n          onClick: this.handleClick\n        }));\n      }\n\n      return react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(\"div\", {\n        style: styles.root\n      }, children);\n    }\n  }]);\n\n  return Pagination;\n}(react__WEBPACK_IMPORTED_MODULE_7___default.a.Component);\n\nPagination.propTypes = {\n  dots: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.number.isRequired,\n  index: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.number.isRequired,\n  onChangeIndex: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.func.isRequired\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (Pagination);\n\n//# sourceURL=webpack:///./src/components/Announcement/Pagination.js?");

/***/ }),

/***/ "./src/components/Announcement/PaginationDot.js":
/*!******************************************************!*\
  !*** ./src/components/Announcement/PaginationDot.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/@babel/runtime/helpers/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"./node_modules/@babel/runtime/helpers/createClass.js\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ \"./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js\");\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ \"./node_modules/@babel/runtime/helpers/getPrototypeOf.js\");\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ \"./node_modules/@babel/runtime/helpers/assertThisInitialized.js\");\n/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ \"./node_modules/@babel/runtime/helpers/inherits.js\");\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"./node_modules/@babel/runtime/helpers/defineProperty.js\");\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var _material_ui_core_colors_teal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/colors/teal */ \"./node_modules/@material-ui/core/colors/teal.js\");\n/* harmony import */ var _material_ui_core_colors_teal__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_colors_teal__WEBPACK_IMPORTED_MODULE_9__);\n\n\n\n\n\n\n\n\n\n\nvar styles = {\n  root: {\n    height: 18,\n    width: 18,\n    cursor: 'pointer',\n    border: 0,\n    background: 'none',\n    padding: 0\n  },\n  dot: {\n    backgroundColor: '#e4e6e7',\n    height: 12,\n    width: 12,\n    borderRadius: 6,\n    margin: 3\n  },\n  active: {\n    backgroundColor: _material_ui_core_colors_teal__WEBPACK_IMPORTED_MODULE_9___default.a[600]\n  }\n};\n\nvar PaginationDot =\n/*#__PURE__*/\nfunction (_React$Component) {\n  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(PaginationDot, _React$Component);\n\n  function PaginationDot() {\n    var _getPrototypeOf2;\n\n    var _this;\n\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, PaginationDot);\n\n    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {\n      args[_key] = arguments[_key];\n    }\n\n    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, (_getPrototypeOf2 = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(PaginationDot)).call.apply(_getPrototypeOf2, [this].concat(args)));\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), \"handleClick\", function (event) {\n      _this.props.onClick(event, _this.props.index);\n    });\n\n    return _this;\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(PaginationDot, [{\n    key: \"render\",\n    value: function render() {\n      var active = this.props.active;\n      var styleDot;\n\n      if (active) {\n        styleDot = Object.assign({}, styles.dot, styles.active);\n      } else {\n        styleDot = styles.dot;\n      }\n\n      return react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(\"button\", {\n        type: \"button\",\n        style: styles.root,\n        onClick: this.handleClick\n      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(\"div\", {\n        style: styleDot\n      }));\n    }\n  }]);\n\n  return PaginationDot;\n}(react__WEBPACK_IMPORTED_MODULE_7___default.a.Component);\n\nPaginationDot.propTypes = {\n  active: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.bool.isRequired,\n  index: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.number.isRequired,\n  onClick: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.func.isRequired\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (PaginationDot);\n\n//# sourceURL=webpack:///./src/components/Announcement/PaginationDot.js?");

/***/ }),

/***/ "./src/components/Announcement/Slider.js":
/*!***********************************************!*\
  !*** ./src/components/Announcement/Slider.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ \"./node_modules/@babel/runtime/helpers/slicedToArray.js\");\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"./node_modules/@babel/runtime/helpers/defineProperty.js\");\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_swipeable_views__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-swipeable-views */ \"./node_modules/react-swipeable-views/lib/index.js\");\n/* harmony import */ var react_swipeable_views__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_swipeable_views__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react_swipeable_views_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-swipeable-views-utils */ \"./node_modules/react-swipeable-views-utils/lib/index.js\");\n/* harmony import */ var react_swipeable_views_utils__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_swipeable_views_utils__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/styles */ \"./node_modules/@material-ui/core/esm/styles/index.js\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/esm/react-router-dom.js\");\n/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/IconButton */ \"./node_modules/@material-ui/core/esm/IconButton/index.js\");\n/* harmony import */ var _material_ui_icons_KeyboardArrowLeft__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/icons/KeyboardArrowLeft */ \"./node_modules/@material-ui/icons/KeyboardArrowLeft.js\");\n/* harmony import */ var _material_ui_icons_KeyboardArrowLeft__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_KeyboardArrowLeft__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var _material_ui_icons_KeyboardArrowRight__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/icons/KeyboardArrowRight */ \"./node_modules/@material-ui/icons/KeyboardArrowRight.js\");\n/* harmony import */ var _material_ui_icons_KeyboardArrowRight__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_KeyboardArrowRight__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var _material_ui_core_colors_teal__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/core/colors/teal */ \"./node_modules/@material-ui/core/colors/teal.js\");\n/* harmony import */ var _material_ui_core_colors_teal__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_colors_teal__WEBPACK_IMPORTED_MODULE_10__);\n/* harmony import */ var _material_ui_core_colors_grey__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/core/colors/grey */ \"./node_modules/@material-ui/core/colors/grey.js\");\n/* harmony import */ var _material_ui_core_colors_grey__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_colors_grey__WEBPACK_IMPORTED_MODULE_11__);\n/* harmony import */ var _Pagination__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Pagination */ \"./src/components/Announcement/Pagination.js\");\n/* harmony import */ var _img_slide1_png__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../img/slide1.png */ \"./src/components/img/slide1.png\");\n/* harmony import */ var _img_slide1_png__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_img_slide1_png__WEBPACK_IMPORTED_MODULE_13__);\n/* harmony import */ var _img_slide2_jpg__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../img/slide2.jpg */ \"./src/components/img/slide2.jpg\");\n/* harmony import */ var _img_slide2_jpg__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_img_slide2_jpg__WEBPACK_IMPORTED_MODULE_14__);\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nvar AutoPlaySwipeableViews = Object(react_swipeable_views_utils__WEBPACK_IMPORTED_MODULE_4__[\"autoPlay\"])(react_swipeable_views__WEBPACK_IMPORTED_MODULE_3___default.a);\nvar useStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__[\"makeStyles\"])(function (theme) {\n  var _slide;\n\n  return {\n    root: {\n      position: 'relative',\n      maxWidth: 1200,\n      width: '100%',\n      margin: 'auto'\n    },\n    slide: (_slide = {\n      height: 200,\n      width: '100%',\n      color: 'black',\n      display: 'block',\n      backgroundColor: '#ccc',\n      backgroundSize: 'cover',\n      backgroundRepeat: 'no-repeat',\n      backgroundPosition: 'center',\n      objectFit: 'cover',\n      cursor: 'pointer'\n    }, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_slide, theme.breakpoints.up(400), {\n      height: 250\n    }), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_slide, theme.breakpoints.up(500), {\n      height: 300\n    }), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_slide, theme.breakpoints.up(600), {\n      height: 350\n    }), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_slide, theme.breakpoints.up(750), {\n      height: 350\n    }), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_slide, theme.breakpoints.up(900), {\n      height: 400\n    }), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_slide, theme.breakpoints.up(1000), {\n      height: 450\n    }), _slide),\n    arrow: {\n      fontSize: '2.75rem',\n      color: _material_ui_core_colors_teal__WEBPACK_IMPORTED_MODULE_10___default.a[700]\n    },\n    leftArrow: {\n      left: '2%',\n      top: '40%',\n      position: 'absolute',\n      zIndex: '10',\n      backgroundColor: 'white',\n      opacity: .6,\n      '&:hover': {\n        backgroundColor: Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__[\"fade\"])(_material_ui_core_colors_teal__WEBPACK_IMPORTED_MODULE_10___default.a[700], 0.25),\n        opacity: 1\n      }\n    },\n    rightArrow: {\n      right: '2%',\n      top: '40%',\n      position: 'absolute',\n      zIndex: '10',\n      backgroundColor: 'white',\n      opacity: .6,\n      '&:hover': {\n        backgroundColor: Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__[\"fade\"])(_material_ui_core_colors_teal__WEBPACK_IMPORTED_MODULE_10___default.a[700], 0.25),\n        opacity: 1\n      }\n    },\n    label: {\n      position: 'absolute',\n      bottom: 0,\n      width: '100%',\n      color: _material_ui_core_colors_teal__WEBPACK_IMPORTED_MODULE_10___default.a[900],\n      backgroundColor: _material_ui_core_colors_grey__WEBPACK_IMPORTED_MODULE_11___default.a[50],\n      opacity: .8,\n      fontSize: 16,\n      fontWeight: 500,\n      cursor: 'pointer',\n      fontFamily: 'monospace',\n      textAlign: 'center',\n      padding: '8px 16px',\n      '&:hover': {\n        backgroundColor: _material_ui_core_colors_grey__WEBPACK_IMPORTED_MODULE_11___default.a[300]\n      }\n    }\n  };\n});\nvar styles = {};\n\nfunction Slider() {\n  var classes = useStyles();\n\n  var _React$useState = react__WEBPACK_IMPORTED_MODULE_2___default.a.useState(0),\n      _React$useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_React$useState, 2),\n      index = _React$useState2[0],\n      setIndex = _React$useState2[1];\n\n  var data = [{\n    id: 1,\n    label: ['ผู้ชนะ SNT 4-2019 วันที่ 4 กรกฎาคม 2562', 'ณ Watermill Golf Club & Resort'],\n    picture: _img_slide2_jpg__WEBPACK_IMPORTED_MODULE_14___default.a\n  }, {\n    id: 2,\n    label: ['SNT ระเบิดศึกดวลสวิงอาชีพอาวุโส วันที่ 4 กรกฎาคม 2562', 'ณ Watermill Golf Club & Resort'],\n    picture: _img_slide1_png__WEBPACK_IMPORTED_MODULE_13___default.a\n  }];\n\n  function handleChangeIndex(index) {\n    setIndex(index);\n  }\n\n  ;\n\n  function backHandler() {\n    if (index <= 0) {\n      setIndex(data.length - 1);\n    } else {\n      setIndex(index - 1);\n    }\n  }\n\n  function nextHandler() {\n    if (index >= data.length - 1) {\n      setIndex(0);\n    } else {\n      setIndex(index + 1);\n    }\n  }\n\n  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(\"div\", {\n    className: classes.root\n  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(AutoPlaySwipeableViews, {\n    interval: 10000,\n    enableMouseEvents: true,\n    index: index,\n    onChangeIndex: handleChangeIndex\n  }, data.map(function (d) {\n    return d && react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(\"div\", {\n      key: d.id\n    }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_6__[\"Link\"], {\n      to: \"/detail/\".concat(d.id),\n      style: {\n        textDecoration: 'none'\n      }\n    }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(\"img\", {\n      src: d.picture,\n      className: classes.slide\n    })), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_6__[\"Link\"], {\n      to: \"/detail/\".concat(data.id),\n      style: {\n        textDecoration: 'none'\n      }\n    }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(\"div\", {\n      className: classes.label\n    }, d.label.map(function (text) {\n      return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, {\n        key: text\n      }, text, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(\"br\", null));\n    }))));\n  })), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_Pagination__WEBPACK_IMPORTED_MODULE_12__[\"default\"], {\n    dots: data.length,\n    index: index,\n    onChangeIndex: handleChangeIndex\n  }), window.innerWidth > 500 && react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n    classes: {\n      root: classes.iconButton\n    },\n    className: classes.leftArrow,\n    onClick: backHandler\n  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_icons_KeyboardArrowLeft__WEBPACK_IMPORTED_MODULE_8___default.a, {\n    classes: {\n      root: classes.arrow\n    }\n  })), window.innerWidth > 500 && react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n    classes: {\n      root: classes.iconButton\n    },\n    className: classes.rightArrow,\n    onClick: nextHandler\n  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_icons_KeyboardArrowRight__WEBPACK_IMPORTED_MODULE_9___default.a, {\n    classes: {\n      root: classes.arrow\n    }\n  })));\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Slider);\n\n//# sourceURL=webpack:///./src/components/Announcement/Slider.js?");

/***/ }),

/***/ "./src/components/img/slide1.png":
/*!***************************************!*\
  !*** ./src/components/img/slide1.png ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"src/components/img/slide1.png\";\n\n//# sourceURL=webpack:///./src/components/img/slide1.png?");

/***/ }),

/***/ "./src/components/img/slide2.jpg":
/*!***************************************!*\
  !*** ./src/components/img/slide2.jpg ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"src/components/img/slide2.jpg\";\n\n//# sourceURL=webpack:///./src/components/img/slide2.jpg?");

/***/ })

}]);