import firebase from 'firebase/app';
import 'firebase/auth';
import { createUser } from '../Model/UserManager';

export default class LoginController {
	constructor() {
		const signUpButton = document.querySelector('#SignUpButton');
		if (!signUpButton) {
			console.error('unable to find signup button');
			return;
		}
		signUpButton.addEventListener('click', () => {
			const emailInput: HTMLInputElement | null = document.querySelector('#InputEmail');
			const passwordInput: HTMLInputElement | null = document.querySelector('#InputPassword');
			const apiKeyInput: HTMLInputElement | null = document.querySelector('#InputKey');

			if (!emailInput || !passwordInput || !apiKeyInput) {
				console.error('unable to find input elements');
				return;
			}
			createUser(
				emailInput.value,
				passwordInput.value,
				apiKeyInput.value,
				this.handleCreateAccountFailed
			);
		});
	}

	handleCreateAccountFailed = (error: firebase.auth.Error): void => {
		const errorMessage: HTMLDivElement | null = document.querySelector('#errorMessage');
		if (!errorMessage) {
			console.error('unable to find error message element');
			return;
		}
		const errorCode = error.code;
		if (errorCode === 'auth/weak-password') {
			errorMessage.innerHTML = 'Your password is too weak';
		} else if (errorCode === 'auth/email-already-in-use') {
			errorMessage.innerHTML = 'There is already an account associated with this email';
		} else if (errorCode === 'auth/invalid-email') {
			errorMessage.innerHTML = 'The provided email is invalid';
		} else {
			errorMessage.innerHTML = 'Unexpected error while attempting to create an account';
		}
		console.error(errorCode);
		console.error(error.message);
		errorMessage.style.display = 'block';
	};
}
