import UserManager from '../Model/UserManager';

export default class LoginController {
	manager: UserManager;

	constructor() {
		this.manager = new UserManager();
		console.log('test');
	}
}
