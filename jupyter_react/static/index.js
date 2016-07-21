define(function() { return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _react_area = __webpack_require__(1);

	var _react_area2 = _interopRequireDefault(_react_area);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	if (window.require) {
	    window.require.config({
	        map: {
	            "*": {
	                "react": "https://fb.me/react-15.2.1.min.js",
	                "react-dom": "https://fb.me/react-dom-15.2.1.min.js"
	            }
	        }
	    });
	}

	var handle_cell = function handle_cell(cell) {
	    if (cell.cell_type === 'code') {
	        var domEl = new _react_area2.default(cell);
	        cell.react_dom = domEl;
	    }
	};

	function register_events(Jupyter, events) {
	    var cells = Jupyter.notebook.get_cells();
	    cell.forEach(function (cell) {
	        handle_cell(cell);
	    });

	    events.on('create.Cell', function (event, data) {
	        handle_cell(data.cell);
	    });
	    events.on('delete.Cell', function (event, data) {
	        if (data.cell && data.cell.widgetarea) {
	            data.cell.widgetarea.dispose();
	        }
	    });
	}

	function load_ipython_extension() {
	    return new Promise(function (resolve) {
	        requirejs(["base/js/namespace", "base/js/events", 'react', 'react-dom'], function (Jupyter, events, React, ReactDom) {
	            window.React = React;
	            window.ReactDom = ReactDom;
	            register_events(Jupyter, events);
	            resolve();
	        });
	    });
	}

	module.exports = {
	    load_ipython_extension: load_ipython_extension
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (cell) {
	    var widget_area = document.createElement('div');
	    widget_area.classList.add('widget-area');
	    //widget_area.style.display = 'none';

	    this.widget_area = widget_area;

	    var widget_prompt = document.createElement('div');
	    widget_prompt.classList.add('prompt');
	    widget_area.appendChild(widget_prompt);

	    var widget_subarea = document.createElement('div');
	    widget_subarea.classList.add('widget-subarea');
	    widget_area.appendChild(widget_subarea);

	    this.widget_subarea = widget_subarea;

	    if (cell.input) {
	        cell.input.after(widget_area);
	    } else {
	        throw new Error('Cell does not have an `input` element.  Is it not a CodeCell?');
	    }
	};

	module.exports = exports['default'];

/***/ }
/******/ ])});;