import { UserManager } from '../Model/UserManager';

export default class LoginController {
	constructor(manager: UserManager) {
		const logInButton = document.querySelector('#LogInButton');
		if (!logInButton) {
			console.log("No logInButton");
			return;
		}
		logInButton.addEventListener('click', () => {
			const emailInput: HTMLInputElement | null = document.querySelector('#InputEmail');
			const passwordInput: HTMLInputElement | null = document.querySelector('#InputPassword');
			if (!emailInput || !passwordInput) {
				console.error('unable to find input elements');
				return;
			}
			const handleSignInFailed = (error: string) => {
				console.log("Error is: error");
				const errorMessage: HTMLDivElement | null = document.querySelector('#errorMessage');
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
}
