"use strict";
exports.__esModule = true;
var app_1 = require("firebase/app");
require("firebase/analytics");
require("firebase/auth");
require("firebase/firestore");
var LoginController_1 = require("./Controller/LoginController");
var CreateAccountController_1 = require("./Controller/CreateAccountController");
var UserManager_1 = require("./Model/UserManager");
var CollectionController_1 = require("./Controller/CollectionController");
var firebaseConfig = {
    apiKey: 'AIzaSyB0j0AJr111FHLNuH6_7lJdgo4E-h92C6c',
    authDomain: 'legotracker-63157.firebaseapp.com',
    projectId: 'legotracker-63157',
    storageBucket: 'legotracker-63157.appspot.com',
    messagingSenderId: '510283508339',
    appId: '1:510283508339:web:6598cea8db658d749f9806',
    measurementId: 'G-4RCL0VVXHB'
};
app_1["default"].initializeApp(firebaseConfig);
var authStateChanged = function (user) {
    var _a, _b;
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    if (!user && !document.querySelector('#loginPage') && !document.querySelector('#createAccountPage')) {
        console.log('here');
        document.location.href = '/';
    }
    else if (user && (document.querySelector('#loginPage') || document.querySelector('#createAccountPage'))) {
        console.log('sign in successful');
        document.location.href = "/collection.html?uid=" + user.uid;
    }
    else {
        if (user) {
            new CollectionController_1.CollectionController(user, (_a = urlParams.get('page')) !== null && _a !== void 0 ? _a : '1', (_b = urlParams.get('uid')) !== null && _b !== void 0 ? _b : undefined);
        }
    }
};
var userManager = new UserManager_1.UserManager(authStateChanged);
if (document.querySelector('#loginPage')) {
    new LoginController_1["default"](userManager);
}
else if (document.querySelector('#createAccountPage')) {
    new CreateAccountController_1["default"]();
}
