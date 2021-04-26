import firebase from 'firebase';
import User from '../Data/User';

const COLLECTION_NAME = 'users';
const API_KEY = 'apiKey';
const UUID = 'uuid';

export class UserManager {
	User: User;
	_ref: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;
	_unsubscribe: () => void; 

	constructor(uid: string, username: string, password: string) {
		this._ref = firebase.firestore().collection(COLLECTION_NAME);
		this.User = {username: 'test', APIKey: 'test', uid: 'test'};
		this._unsubscribe = this._ref.where(UUID, '==', uid).onSnapshot(snapshot => {
			if(snapshot.docs.length != 1){
				console.log('error getting user');
				return;
			}
			this.User.APIKey = snapshot.docs[0].get(API_KEY);
		});
	}

	stopListening(): void {
		this._unsubscribe();
	}
}

export const createUser = async (username: string, password: string, APIKey: string): Promise<void> => {
	const credentials = await firebase.auth().createUserWithEmailAndPassword(username, password);
	await firebase.firestore().collection(COLLECTION_NAME).add({
		[UUID]: credentials.user?.uid,
		[API_KEY]: APIKey
	});
};

