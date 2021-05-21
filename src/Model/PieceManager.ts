import { SetsResponse } from '../Data/Set';
import User from '../Data/User';
import firebase from 'firebase/app';
import 'firebase/firestore';
import Piece from '../Data/Piece';



const PIECE_COLLECTION = 'pieceInfo';

const IMAGE = 'imgUrl';
const PART_NUM = 'partNum';
const UID = 'uid';
const PART_NAME = 'partName';
const COLOR = 'color';
export interface ICollectionManager {
	getItems: (user: User, page: number) => SetsResponse;
}

export function addPieceToCollection(piece: Piece, uid: string): void{
	firebase.firestore().collection(PIECE_COLLECTION).add({
		[IMAGE]: piece.image,
		[PART_NUM]: piece.partNumber,
		[UID]: uid,
		[PART_NAME]: piece.name,
		[COLOR]: piece.color
	});
}

export class PieceManager {
	user: User;
	_documentSnapshot: firebase.firestore.QuerySnapshot;
	ref: firebase.firestore.CollectionReference;
	_unsubscribe: ()=>void;
	constructor(user: User) {
		this.user = user;
		this._documentSnapshot = {} as firebase.firestore.QuerySnapshot;
		this.ref = firebase.firestore().collection(PIECE_COLLECTION);
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
	getPieces(): Piece[] {
		return this._documentSnapshot.docs.map((snapshotElement) => 
			({
				name: snapshotElement.get(PART_NAME),
				image: snapshotElement.get(IMAGE),
				partNumber: snapshotElement.get(PART_NUM),
				id: snapshotElement.id,
				color: snapshotElement.get(COLOR)
			})
		);
	}

	removePiece(setId: string): void {
		this.ref.doc(setId).delete();
	}
}


