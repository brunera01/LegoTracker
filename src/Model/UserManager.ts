import firebase from 'firebase';
import User from '../Data/User';

const COLLECTION_NAME = 'users';
const API_KEY = 'apiKey';

export class UserManager {
	_user: User | null = null;
	_unsubscribe: () => void;

	constructor(changeListener: (user: User | null) => void) {
		this._unsubscribe = firebase.auth().onAuthStateChanged((user) => {
			console.log('Here');
			if (!user) {
				this._user = null;
				changeListener(null);
				return;
			}
			this.getApiKey(user.uid).then((APIKey) => {
				if (user.email == null) {
					console.error('null email');
					return;
				}
				this._user = { uid: user.uid, email: user.email, APIKey };
				changeListener(this._user);
			});
		});
	}

	stopListening(): void {
		this._unsubscribe();
	}

	signIn(email: string, password: string, handleSignInFailed: (error1: string) => void): void {
		firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
			handleSignInFailed(error.message);
			console.error(error.message);
		});
	}

	async getApiKey(uid: string): Promise<string> {
		const doc = await firebase.firestore().collection(COLLECTION_NAME).doc(uid).get();
		return doc.get(API_KEY);
	}

	isUserSignedIn(): boolean {
		return !!this._user;
	}


}

export function createUser(
	username: string,
	password: string,
	APIKey: string,
	handleCreateAccountFailed: (error: firebase.auth.Error) => void
): void {
	firebase.auth().createUserWithEmailAndPassword(username, password).then(credentials => {
		if(!credentials.user) {
			console.error('Error');
			return;
		}
		firebase.firestore().collection(COLLECTION_NAME).doc(credentials.user.uid).set({
			[API_KEY]: APIKey	
		});
	}).catch(error => {
		handleCreateAccountFailed(error);
	});
}

