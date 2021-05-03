import { UserManager } from '../Model/UserManager';

export default class LoginController {
	constructor(manager: UserManager) {
		document.querySelector('#LogInButton')?.addEventListener('click', () => {
			const emailInput: HTMLInputElement | null = document.querySelector('#InputPassword');
			const passwordInput: HTMLInputElement | null = document.querySelector('#InputEmail');
			if(!emailInput || !passwordInput) {
				console.error('unable to find input elements');
				return;
			}
			const handleSignInFailed = () => {
				const errorMessage: HTMLDivElement | null = document.querySelector('#errorMessage');
				if (!errorMessage){
					console.error('unable to find error message element');
					return;
				}
				errorMessage.style.display = 'block';
			};

			manager.signIn(emailInput.value, passwordInput.value, handleSignInFailed);
		});
	}
}
