import { SetsResponse } from '../Data/Set';
import User from '../Data/User';
import Set from '../Data/Set'
import firebase from 'firebase';


const COLLECTION_NAME = "setInfo";
const IMAGE = "imgUrl";
const PIECE_COUNT = "pieces";
const SET_NUM = "setNum";
const YEAR = "year";
const UID = "uid";
const SET_NAME = "setName";
export interface ICollectionManager {
	getItems: (user: User, page: number) => SetsResponse;
}

export function addToCollection(set: Set, uid: string) {
	return firebase.firestore().collection(COLLECTION_NAME).add({
			IMAGE: set.image,
			PIECE_COUNT: set.pieceCount,
			SET_NUM: set.setNumber,
			YEAR: set.year,
			UID: uid,
			SET_NAME: set.name
	});
}

interface rebrickableResponse {
	count: number;
	next: string;
	results: rebrickableSet[];
}

interface rebrickableSet {
	set_num: string;
	name: string;
	year: number;
	num_parts: number;
	set_img_url: string;
}

interface rebrickableSetRequest extends Record<string, string>{
	page: string;
	page_size: string;
	search: string;
	ordering: string;
	min_parts: string;
}
