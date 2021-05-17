"use strict";
exports.__esModule = true;
var UserManager_1 = require("../Model/UserManager");
var LoginController = /** @class */ (function () {
    function LoginController() {
        var _this = this;
        this.handleCreateAccountFailed = function (error) {
            var errorMessage = document.querySelector('#errorMessage');
            if (!errorMessage) {
                console.error('unable to find error message element');
                return;
            }
            var errorCode = error.code;
            if (errorCode === 'auth/weak-password') {
                errorMessage.innerHTML = 'Your password is too weak';
            }
            else if (errorCode === 'auth/email-already-in-use') {
                errorMessage.innerHTML = 'There is already an account associated with this email';
            }
            else if (errorCode === 'auth/invalid-email') {
                errorMessage.innerHTML = 'The provided email is invalid';
            }
            else {
                errorMessage.innerHTML = 'Unexpected error while attempting to create an account';
            }
            console.error(errorCode);
            console.error(error.message);
            errorMessage.style.display = 'block';
        };
        var signUpButton = document.querySelector('#SignUpButton');
        if (!signUpButton) {
            console.error('unable to find signup button');
            return;
        }
        signUpButton.addEventListener('click', function () {
            var emailInput = document.querySelector('#InputEmail');
            var passwordInput = document.querySelector('#InputPassword');
            var apiKeyInput = document.querySelector('#InputKey');
            if (!emailInput || !passwordInput || !apiKeyInput) {
                console.error('unable to find input elements');
                return;
            }
            UserManager_1.createUser(emailInput.value, passwordInput.value, apiKeyInput.value, _this.handleCreateAccountFailed);
        });
    }
    return LoginController;
}());
exports["default"] = LoginController;
