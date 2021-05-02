import firebase from 'firebase';
import User from '../Data/User';

const COLLECTION_NAME = 'users';
const API_KEY = 'apiKey';
const UUID = 'uuid';

export class AuthManager {
	_user: User | null = null;
	// _ref: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;
	_unsubscribe: () => void;

	constructor() {
		this._unsubscribe = () => { return };
	}

	beginListening(changeListener: () => void): void {
		firebase.auth().onAuthStateChanged((user) => {
			if (user == null || user == undefined) {
				this._user = null;
				changeListener();
				return;
			}
			this.getApiKey(user.uid).then((APIKey) => {
				if (user.email == null) {
					console.error('null email');
					return;
				}
				this._user = { uid: user.uid, email: user.email, APIKey };
				changeListener();
			});
		})
	}

	stopListening(): void {
		this._unsubscribe();
	}

	signIn(email: string, password: string): void {
		firebase.auth().signInWithEmailAndPassword(email, password);
	}

	async getApiKey(uid: string): Promise<string> {
		const doc = await firebase.firestore().collection(COLLECTION_NAME).doc(uid).get();
		return doc.get(API_KEY);
	}
}

export const createUser = async (username: string, password: string, APIKey: string): Promise<void> => {
	const credentials = await firebase.auth().createUserWithEmailAndPassword(username, password);
	await firebase.firestore().collection(COLLECTION_NAME).add({
		[UUID]: credentials.user?.uid,
		[API_KEY]: APIKey
	});
};

