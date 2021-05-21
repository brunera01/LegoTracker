import { UserManager, setApiKey } from '../Model/UserManager';
import firebase from 'firebase/app';
import 'firebase/auth';

export class ProfileController {
	constructor(userManager: UserManager) {
		const apiKeyInput = document.querySelector('#apiKeyInput') as HTMLInputElement;
		if (!userManager._user) {
			console.error('attempting to modify profile while not signed in');
			return;
		}

		const uid = userManager._user.uid;
		const myCollectionButton = document.querySelector('#myCollectionButton') as HTMLAnchorElement;
		myCollectionButton.href = `/collection.html?set=true&uid=${uid}`;
		const signOut = document.querySelector('#signOutButton') as HTMLAnchorElement;
		signOut.addEventListener('click', () => {
			firebase.auth().signOut();
		})
		apiKeyInput.value = userManager._user.APIKey;
		const submitButton = document.querySelector('#submitApiKey') as HTMLButtonElement;
		submitButton.addEventListener('click', () => {
			const apiKey = apiKeyInput.value;
			setApiKey(apiKey, uid);
		});
	}
}
