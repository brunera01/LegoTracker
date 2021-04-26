/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Controller/LoginController.ts":
/*!*******************************************!*\
  !*** ./src/Controller/LoginController.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


exports.__esModule = true;
var UserManager_1 = __webpack_require__(/*! ../Model/UserManager */ "./src/Model/UserManager.ts");
var LoginController = /** @class */ (function () {
    function LoginController() {
        this.manager = new UserManager_1["default"]();
        console.log('test');
    }
    return LoginController;
}());
exports.default = LoginController;


/***/ }),

/***/ "./src/Model/UserManager.ts":
/*!**********************************!*\
  !*** ./src/Model/UserManager.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {


exports.__esModule = true;
var UserManager = /** @class */ (function () {
    function UserManager() {
        this.createUser = function (username, password, APIKey) {
            //todo implement me
        };
    }
    return UserManager;
}());
exports.default = UserManager;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/

exports.__esModule = true;
var LoginController_1 = __webpack_require__(/*! ./Controller/LoginController */ "./src/Controller/LoginController.ts");
new LoginController_1["default"]();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9sZWdvdHJhY2tlci8uL3NyYy9Db250cm9sbGVyL0xvZ2luQ29udHJvbGxlci50cyIsIndlYnBhY2s6Ly9sZWdvdHJhY2tlci8uL3NyYy9Nb2RlbC9Vc2VyTWFuYWdlci50cyIsIndlYnBhY2s6Ly9sZWdvdHJhY2tlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9sZWdvdHJhY2tlci8uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTtBQUNiLGtCQUFrQjtBQUNsQixvQkFBb0IsbUJBQU8sQ0FBQyx3REFBc0I7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELGVBQWtCOzs7Ozs7Ozs7OztBQ1ZMO0FBQ2Isa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELGVBQWtCOzs7Ozs7O1VDVmxCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7Ozs7QUN0QmE7QUFDYixrQkFBa0I7QUFDbEIsd0JBQXdCLG1CQUFPLENBQUMseUVBQThCO0FBQzlEIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xyXG52YXIgVXNlck1hbmFnZXJfMSA9IHJlcXVpcmUoXCIuLi9Nb2RlbC9Vc2VyTWFuYWdlclwiKTtcclxudmFyIExvZ2luQ29udHJvbGxlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIExvZ2luQ29udHJvbGxlcigpIHtcclxuICAgICAgICB0aGlzLm1hbmFnZXIgPSBuZXcgVXNlck1hbmFnZXJfMVtcImRlZmF1bHRcIl0oKTtcclxuICAgICAgICBjb25zb2xlLmxvZygndGVzdCcpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIExvZ2luQ29udHJvbGxlcjtcclxufSgpKTtcclxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBMb2dpbkNvbnRyb2xsZXI7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xyXG52YXIgVXNlck1hbmFnZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBVc2VyTWFuYWdlcigpIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZVVzZXIgPSBmdW5jdGlvbiAodXNlcm5hbWUsIHBhc3N3b3JkLCBBUElLZXkpIHtcclxuICAgICAgICAgICAgLy90b2RvIGltcGxlbWVudCBtZVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gVXNlck1hbmFnZXI7XHJcbn0oKSk7XHJcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gVXNlck1hbmFnZXI7XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcclxudmFyIExvZ2luQ29udHJvbGxlcl8xID0gcmVxdWlyZShcIi4vQ29udHJvbGxlci9Mb2dpbkNvbnRyb2xsZXJcIik7XHJcbm5ldyBMb2dpbkNvbnRyb2xsZXJfMVtcImRlZmF1bHRcIl0oKTtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==