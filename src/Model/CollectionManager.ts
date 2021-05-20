import { SetsResponse } from '../Data/Set';
import User from '../Data/User';
import Set from '../Data/Set'
import firebase from 'firebase';


const SET_COLLECTION = 'setInfo';

const IMAGE = 'imgUrl';
const PIECE_COUNT = 'pieces';
const SET_NUM = 'setNum';
const YEAR = 'year';
const UID = 'uid';
const SET_NAME = 'setName';
export interface ICollectionManager {
	getItems: (user: User, page: number) => SetsResponse;
}

export function addSetToCollection(set: Set, uid: string): void{
	firebase.firestore().collection(SET_COLLECTION).add({
		[IMAGE]: set.image,
		[PIECE_COUNT]: set.pieceCount,
		[SET_NUM]: set.setNumber,
		[YEAR]: set.year,
		[UID]: uid,
		[SET_NAME]: set.name
	});
}

export class SetManager {
	user: User;
	_documentSnapshot: firebase.firestore.QuerySnapshot;
	ref: firebase.firestore.CollectionReference;
	_unsubscribe: ()=>void;
	constructor(user: User) {
		this.user = user;
		this._documentSnapshot = {} as firebase.firestore.QuerySnapshot;
		this.ref = firebase.firestore().collection(SET_COLLECTION);
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		this._unsubscribe = () => {};
	}
	beginListening(uid: string, changeListener: ()=>void): void {
		// changeListener();
		const query = this.ref.where(UID,'==',uid);
		this._unsubscribe = query.onSnapshot((querySnapshot) => {
			console.log('update received');
			this._documentSnapshot = querySnapshot;
			console.log(this._documentSnapshot);
			changeListener();
		})
	}
	stopListening(): void{
		this._unsubscribe();
	}
	getSetAtindex(index: number): Set {
		const snapshot = this._documentSnapshot.docs[index];
		const set: Set = {
			image: snapshot.get(IMAGE),
			name: snapshot.get(SET_NAME),
			setNumber: snapshot.get(SET_NUM),
			year: snapshot.get(YEAR),
			pieceCount: snapshot.get(PIECE_COUNT)
		}
		return set;
	}
	getSets(): Set[] {
		return this._documentSnapshot.docs.map((snapShotElement) => 
			({
				name: snapShotElement.get(SET_NAME),
				image: snapShotElement.get(IMAGE),
				setNumber: snapShotElement.get(SET_NUM),
				year: snapShotElement.get(YEAR),
				pieceCount: snapShotElement.get(PIECE_COUNT),
				id: snapShotElement.id
			})
		)
	}

	removeSet(setId: string): void {
		this.ref.doc(setId).delete();
	}
}
