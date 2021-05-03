import firebase from 'firebase';
import User from '../Data/User';

const COLLECTION_NAME = 'users';
const API_KEY = 'apiKey';

export class UserManager {
	_user: User | null = null;
	_unsubscribe: () => void;

	constructor(changeListener: (user: User | null) => void) {
		this._unsubscribe = firebase.auth().onAuthStateChanged((user) => {
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

	signIn(email: string, password: string, handleSignInFailed: () => void): void {
		firebase.auth().signInWithEmailAndPassword(email, password).catch(() => {
			handleSignInFailed();
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
		firebase.firestore().collection(COLLECTION_NAME).doc(credentials.user?.uid).set({
			[API_KEY]: APIKey
		});
	}).catch(error => {
		handleCreateAccountFailed(error);
	});
}

