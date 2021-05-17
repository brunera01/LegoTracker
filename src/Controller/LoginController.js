"use strict";
exports.__esModule = true;
var LoginController = /** @class */ (function () {
    function LoginController(manager) {
        var logInButton = document.querySelector('#LogInButton');
        if (!logInButton) {
            console.log('No logInButton');
            return;
        }
        logInButton.addEventListener('click', function () {
            var emailInput = document.querySelector('#InputEmail');
            var passwordInput = document.querySelector('#InputPassword');
            if (!emailInput || !passwordInput) {
                console.error('unable to find input elements');
                return;
            }
            var handleSignInFailed = function (error) {
                console.log('Error is: error');
                var errorMessage = document.querySelector('#errorMessage');
                if (!errorMessage) {
                    console.error('unable to find error message element');
                    return;
                }
                errorMessage.innerHTML = error;
                errorMessage.style.display = 'block';
            };
            manager.signIn(emailInput.value, passwordInput.value, handleSignInFailed);
        });
    }
    return LoginController;
}());
exports["default"] = LoginController;
